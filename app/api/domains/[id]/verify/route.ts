import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
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
    const verifyPrefix = "linktraces-verify" // padronizado

    if (domain.verification_method === "dns") {
      // Verify DNS TXT record
      try {
        const name = `_${verifyPrefix}.${domain.domain}`
        const dnsResponse = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=TXT`)
        if (dnsResponse.ok) {
          const dnsData = await dnsResponse.json()
          if (dnsData.Answer && Array.isArray(dnsData.Answer)) {
            const txtRecords = dnsData.Answer.filter((record: any) => record.type === 16)
            verified = txtRecords.some((record: any) => {
              // record.data pode vir com aspas: "\"token\""
              const txt = String(record.data).replace(/^"|"$/g, "")
              return txt.includes(domain.verification_token)
            })
          }
        } else {
          console.error("DNS provider returned non-ok response:", dnsResponse.status)
        }
      } catch (error) {
        console.error("DNS verification error:", error)
      }
    } else if (domain.verification_method === "file") {
      // Verify file upload
      try {
        const fileName = `${verifyPrefix}-${domain.verification_token}.txt`
        const fileUrl = `https://${domain.domain}/.well-known/${fileName}`

        const fileResponse = await fetch(fileUrl)
        if (fileResponse.ok) {
          const fileContent = await fileResponse.text()
          verified = fileContent.trim() === domain.verification_token
        } else {
          console.error("File verification returned non-ok:", fileResponse.status)
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