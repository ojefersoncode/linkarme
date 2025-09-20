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
    const limit = Number.parseInt(searchParams.get("limit") || "100")

    let query = supabase
      .from("clicks")
      .select(`
        *,
        links!inner (
          id,
          slug,
          title,
          user_id,
          domains (domain)
        )
      `)
      .eq("links.user_id", user.id)
      .order("clicked_at", { ascending: false })
      .limit(limit)

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

    return NextResponse.json({ clicks })
  } catch (error) {
    console.error("Error fetching clicks:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
