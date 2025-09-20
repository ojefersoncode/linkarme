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
    const groupBy = searchParams.get("group_by") || "day" // day, hour

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    let query = supabase
      .from("clicks")
      .select(`
        clicked_at,
        links!inner (user_id)
      `)
      .eq("links.user_id", user.id)
      .gte("clicked_at", startDate.toISOString())
      .order("clicked_at", { ascending: true })

    if (linkId) {
      query = query.eq("link_id", linkId)
    }

    const { data: clicks, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group clicks by time period
    const groupedClicks =
      clicks?.reduce((acc: Record<string, number>, click) => {
        const date = new Date(click.clicked_at)
        let key: string

        if (groupBy === "hour") {
          key = `${date.toISOString().split("T")[0]} ${date.getHours().toString().padStart(2, "0")}:00`
        } else {
          key = date.toISOString().split("T")[0]
        }

        acc[key] = (acc[key] || 0) + 1
        return acc
      }, {}) || {}

    return NextResponse.json({ data: groupedClicks })
  } catch (error) {
    console.error("Error fetching clicks by time:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
