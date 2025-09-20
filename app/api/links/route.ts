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

    // Get user's links with domain info
    const { data: links, error } = await supabase
      .from("links")
      .select(`
        *,
        domains (domain, verified)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ links })
  } catch (error) {
    console.error("Error fetching links:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { domain_id, slug, destination_url, title, description } = body

    // Validate required fields
    if (!domain_id || !slug || !destination_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if domain belongs to user and is verified
    const { data: domain, error: domainError } = await supabase
      .from("domains")
      .select("*")
      .eq("id", domain_id)
      .eq("user_id", user.id)
      .eq("verified", true)
      .single()

    if (domainError || !domain) {
      return NextResponse.json({ error: "Domain not found or not verified" }, { status: 404 })
    }

    // Check if slug already exists for this domain
    const { data: existingLink } = await supabase
      .from("links")
      .select("id")
      .eq("domain_id", domain_id)
      .eq("slug", slug.toLowerCase())
      .single()

    if (existingLink) {
      return NextResponse.json({ error: "Slug already exists for this domain" }, { status: 409 })
    }

    // Create link
    const { data: link, error: insertError } = await supabase
      .from("links")
      .insert({
        user_id: user.id,
        domain_id,
        slug: slug.toLowerCase(),
        destination_url,
        title: title || null,
        description: description || null,
        active: true,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ link }, { status: 201 })
  } catch (error) {
    console.error("Error creating link:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
