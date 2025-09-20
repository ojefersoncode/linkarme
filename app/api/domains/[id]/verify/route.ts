import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get domain
    const { data: domain, error: domainError } = await supabase
      .from("domains")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single()

    if (domainError || !domain) {
      return NextResponse.json({ error: "Domain not found" }, { status: 404 })
    }

    if (domain.verified) {
      return NextResponse.json({ verified: true })
    }

    let verified = false

    if (domain.verification_method === "dns") {
      // Verify DNS TXT record
      try {
        const dnsResponse = await fetch(`https://dns.google/resolve?name=_linkshort-verify.${domain.domain}&type=TXT`)
        const dnsData = await dnsResponse.json()

        if (dnsData.Answer) {
          const txtRecords = dnsData.Answer.filter((record: any) => record.type === 16)
          verified = txtRecords.some((record: any) => record.data.includes(domain.verification_token))
        }
      } catch (error) {
        console.error("DNS verification error:", error)
      }
    } else if (domain.verification_method === "file") {
      // Verify file upload
      try {
        const fileName = `linkshort-verify-${domain.verification_token}.txt`
        const fileUrl = `https://${domain.domain}/.well-known/${fileName}`

        const fileResponse = await fetch(fileUrl)
        if (fileResponse.ok) {
          const fileContent = await fileResponse.text()
          verified = fileContent.trim() === domain.verification_token
        }
      } catch (error) {
        console.error("File verification error:", error)
      }
    }

    if (verified) {
      // Update domain as verified
      const { error: updateError } = await supabase.from("domains").update({ verified: true }).eq("id", id)

      if (updateError) {
        return NextResponse.json({ error: "Failed to update domain" }, { status: 500 })
      }
    }

    return NextResponse.json({ verified })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
