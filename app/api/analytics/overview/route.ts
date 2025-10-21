import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Obter usuário autenticado
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const days = Number.parseInt(searchParams.get("days") || "30")
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Buscar IDs dos links do usuário
    const { data: userLinks, error: linksQueryError } = await supabase
      .from("links")
      .select("id")
      .eq("user_id", user.id)

    if (linksQueryError) {
      return NextResponse.json({ error: linksQueryError.message }, { status: 500 })
    }

    const linkIds = userLinks?.map((l) => l.id) || []

    // Caso o usuário não tenha links ainda
    if (linkIds.length === 0) {
      return NextResponse.json({
        total_clicks: 0,
        clicks_by_day: {},
        clicks_by_country: {},
        top_links: [],
      })
    }

    // Total de cliques no período
    const { data: totalClicks, error: totalError } = await supabase
      .from("clicks")
      .select("id", { count: "exact" })
      .in("link_id", linkIds)
      .gte("clicked_at", startDate.toISOString())

    if (totalError) {
      return NextResponse.json({ error: totalError.message }, { status: 500 })
    }

    // Cliques por dia
    const { data: clicksByDay, error: dayError } = await supabase
      .from("clicks")
      .select(`
        clicked_at,
        links!inner (user_id)
      `)
      .eq("links.user_id", user.id)
      .gte("clicked_at", startDate.toISOString())
      .order("clicked_at", { ascending: true })

    if (dayError) {
      return NextResponse.json({ error: dayError.message }, { status: 500 })
    }

    const clicksGrouped =
      clicksByDay?.reduce((acc: Record<string, number>, click) => {
        const date = new Date(click.clicked_at).toISOString().split("T")[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
      }, {}) || {}

    // Cliques por país
    const { data: clicksByCountry, error: countryError } = await supabase
      .from("clicks")
      .select(`
        country,
        links!inner (user_id)
      `)
      .eq("links.user_id", user.id)
      .gte("clicked_at", startDate.toISOString())
      .not("country", "is", null)

    if (countryError) {
      return NextResponse.json({ error: countryError.message }, { status: 500 })
    }

    const countryGrouped =
      clicksByCountry?.reduce((acc: Record<string, number>, click) => {
        const country = click.country || "Unknown"
        acc[country] = (acc[country] || 0) + 1
        return acc
      }, {}) || {}

    // Top links
    const { data: topLinks, error: linksError } = await supabase
      .from("links")
      .select(`
        id,
        slug,
        title,
        destination_url,
        domains (domain),
        clicks (id)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (linksError) {
      return NextResponse.json({ error: linksError.message }, { status: 500 })
    }

    const linksWithCounts =
      topLinks
        ?.map((link) => ({
          ...link,
          click_count: Array.isArray(link.clicks) ? link.clicks.length : 0,
        }))
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 10) || []

    // Retornar tudo consolidado
    return NextResponse.json({
      total_clicks: totalClicks?.length || 0,
      clicks_by_day: clicksGrouped,
      clicks_by_country: countryGrouped,
      top_links: linksWithCounts,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
