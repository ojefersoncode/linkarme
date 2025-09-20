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

    // Get all user links with click counts
    const { data: links, error } = await supabase
      .from("links")
      .select(`
        *,
        domains (domain, verified),
        clicks (id)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Generate CSV content
    const headers = [
      "Link Curto",
      "Título",
      "URL de Destino",
      "Descrição",
      "Domínio",
      "Status",
      "Total de Cliques",
      "Data de Criação",
      "Última Atualização",
    ]

    let csvContent = headers.join(",") + "\n"

    links?.forEach((link) => {
      const clickCount = Array.isArray(link.clicks) ? link.clicks.length : 0
      const shortUrl = `https://${link.domains?.domain}/${link.slug}`

      const row = [
        `"${shortUrl}"`,
        `"${link.title || ""}"`,
        `"${link.destination_url}"`,
        `"${link.description || ""}"`,
        `"${link.domains?.domain || ""}"`,
        `"${link.active ? "Ativo" : "Inativo"}"`,
        `"${clickCount}"`,
        `"${new Date(link.created_at).toLocaleString("pt-BR")}"`,
        `"${new Date(link.updated_at).toLocaleString("pt-BR")}"`,
      ]

      csvContent += row.join(",") + "\n"
    })

    // Generate filename
    const now = new Date()
    const dateStr = now.toISOString().split("T")[0]
    const filename = `linkshort-links-${dateStr}.csv`

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("Error exporting links:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
