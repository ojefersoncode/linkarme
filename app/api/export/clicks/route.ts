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
    const linkId = searchParams.get("link_id")
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")
    const includePersonalData = searchParams.get("include_personal_data") === "true"

    let query = supabase
      .from("clicks")
      .select(`
        *,
        links!inner (
          slug,
          title,
          destination_url,
          user_id,
          domains (domain)
        )
      `)
      .eq("links.user_id", user.id)
      .order("clicked_at", { ascending: false })

    if (linkId) {
      query = query.eq("link_id", linkId)
    }

    if (startDate) {
      query = query.gte("clicked_at", startDate)
    }

    if (endDate) {
      query = query.lte("clicked_at", endDate)
    }

    const { data: clicks, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Generate CSV content
    const headers = [
      "Data/Hora",
      "Link",
      "Título",
      "URL de Destino",
      "País",
      "Estado/Região",
      "Cidade",
      "User Agent",
      "Referrer",
    ]

    if (includePersonalData) {
      headers.push("IP Hash")
    }

    let csvContent = headers.join(",") + "\n"

    clicks?.forEach((click) => {
      const row = [
        `"${new Date(click.clicked_at).toLocaleString("pt-BR")}"`,
        `"https://${click.links.domains?.domain}/${click.links.slug}"`,
        `"${click.links.title || ""}"`,
        `"${click.links.destination_url}"`,
        `"${click.country || ""}"`,
        `"${click.region || ""}"`,
        `"${click.city || ""}"`,
        `"${click.user_agent || ""}"`,
        `"${click.referer || ""}"`,
      ]

      if (includePersonalData) {
        row.push(`"${click.ip_hash || ""}"`)
      }

      csvContent += row.join(",") + "\n"
    })

    // Generate filename
    const now = new Date()
    const dateStr = now.toISOString().split("T")[0]
    const filename = `linkshort-clicks-${dateStr}.csv`

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("Error exporting clicks:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
