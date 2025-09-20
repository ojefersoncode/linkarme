import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const days = Number.parseInt(searchParams.get("days") || "30")
    const linkId = searchParams.get("link_id")
    const level = searchParams.get("level") || "country" // country, region, city

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    let query = supabase
      .from("clicks")
      .select(`
        country,
        region,
        city,
        links!inner (user_id)
      `)
      .eq("links.user_id", user.id)
      .gte("clicked_at", startDate.toISOString())

    if (linkId) {
      query = query.eq("link_id", linkId)
    }

    // Filter out null values based on level
    if (level === "country") {
      query = query.not("country", "is", null)
    } else if (level === "region") {
      query = query.not("region", "is", null)
    } else if (level === "city") {
      query = query.not("city", "is", null)
    }

    const { data: clicks, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group clicks by geographic level
    const groupedClicks =
      clicks?.reduce((acc: Record<string, number>, click) => {
        let key: string

        if (level === "country") {
          key = click.country || "Unknown"
        } else if (level === "region") {
          key = click.region || "Unknown"
        } else if (level === "city") {
          key = click.city || "Unknown"
        } else {
          key = click.country || "Unknown"
        }

        acc[key] = (acc[key] || 0) + 1
        return acc
      }, {}) || {}

    return NextResponse.json({ data: groupedClicks })
  } catch (error) {
    console.error("Error fetching geographic data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
