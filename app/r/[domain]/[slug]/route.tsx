import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const headersList = headers()

  // Try various headers that might contain the real IP
  const forwardedFor = headersList.get("x-forwarded-for")
  const realIP = headersList.get("x-real-ip")
  const cfConnectingIP = headersList.get("cf-connecting-ip")

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim()
  }

  if (realIP) return realIP
  if (cfConnectingIP) return cfConnectingIP

  // Fallback to request IP
  return request.ip || "127.0.0.1"
}

// Helper function to hash IP for privacy
function hashIP(ip: string): string {
  // Simple hash function for IP anonymization
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

// Helper function to get geolocation from IP
async function getGeolocation(ip: string) {
  try {
    // Using a free IP geolocation service
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,status`)
    const data = await response.json()

    if (data.status === "success") {
      return {
        country: data.country || null,
        region: data.regionName || null,
        city: data.city || null,
      }
    }
  } catch (error) {
    console.error("Geolocation error:", error)
  }

  return {
    country: null,
    region: null,
    city: null,
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ domain: string; slug: string }> }) {
  try {
    const { domain, slug } = await params
    const supabase = await createClient()

    // Find the link by domain and slug
    const { data: link, error: linkError } = await supabase
      .from("links")
      .select(`
        *,
        domains (domain, verified)
      `)
      .eq("slug", slug.toLowerCase())
      .eq("domains.domain", domain)
      .eq("active", true)
      .single()

    if (linkError || !link) {
      // Return 404 page for non-existent links
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
        <head>
          <title>Link não encontrado - LinkShort</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              margin: 0; 
              padding: 2rem; 
              background: #f8fafc; 
              color: #334155;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
            .container {
              text-align: center;
              max-width: 400px;
            }
            .error-code {
              font-size: 4rem;
              font-weight: bold;
              color: #059669;
              margin-bottom: 1rem;
            }
            .error-message {
              font-size: 1.25rem;
              margin-bottom: 2rem;
            }
            .description {
              color: #64748b;
              margin-bottom: 2rem;
            }
            .button {
              display: inline-block;
              background: #059669;
              color: white;
              padding: 0.75rem 1.5rem;
              text-decoration: none;
              border-radius: 0.5rem;
              font-weight: 500;
            }
            .button:hover {
              background: #047857;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error-code">404</div>
            <div class="error-message">Link não encontrado</div>
            <div class="description">
              O link que você está procurando não existe ou foi removido.
            </div>
            <a href="/" class="button">Voltar ao início</a>
          </div>
        </body>
        </html>`,
        {
          status: 404,
          headers: {
            "Content-Type": "text/html",
          },
        },
      )
    }

    // Check if domain is verified
    if (!link.domains?.verified) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
        <head>
          <title>Domínio não verificado - LinkShort</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              margin: 0; 
              padding: 2rem; 
              background: #f8fafc; 
              color: #334155;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
            .container {
              text-align: center;
              max-width: 400px;
            }
            .error-code {
              font-size: 4rem;
              font-weight: bold;
              color: #dc2626;
              margin-bottom: 1rem;
            }
            .error-message {
              font-size: 1.25rem;
              margin-bottom: 2rem;
            }
            .description {
              color: #64748b;
              margin-bottom: 2rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error-code">⚠️</div>
            <div class="error-message">Domínio não verificado</div>
            <div class="description">
              Este domínio ainda não foi verificado pelo proprietário.
            </div>
          </div>
        </body>
        </html>`,
        {
          status: 403,
          headers: {
            "Content-Type": "text/html",
          },
        },
      )
    }

    // Get client information for analytics
    const headersList = await headers()
    const clientIP = getClientIP(request)
    const userAgent = headersList.get("user-agent") || ""
    const referer = headersList.get("referer") || ""

    // Get geolocation (async, don't wait for it to complete the redirect)
    const geolocation = await getGeolocation(clientIP)

    // Record the click asynchronously (don't block the redirect)
    const clickData = {
      link_id: link.id,
      ip_address: clientIP,
      ip_hash: hashIP(clientIP), // Store hashed version for privacy
      user_agent: userAgent.substring(0, 500), // Limit length
      referer: referer.substring(0, 500), // Limit length
      country: geolocation.country,
      region: geolocation.region,
      city: geolocation.city,
      clicked_at: new Date().toISOString(),
    }

    // Insert click record (fire and forget)
    supabase
      .from("clicks")
      .insert(clickData)
      .then(({ error }) => {
        if (error) {
          console.error("Error recording click:", error)
        }
      })

    // Redirect to destination URL
    return NextResponse.redirect(link.destination_url, {
      status: 302, // Temporary redirect for better caching behavior
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Redirect error:", error)

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Erro interno - LinkShort</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            margin: 0; 
            padding: 2rem; 
            background: #f8fafc; 
            color: #334155;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .container {
            text-align: center;
            max-width: 400px;
          }
          .error-code {
            font-size: 4rem;
            font-weight: bold;
            color: #dc2626;
            margin-bottom: 1rem;
          }
          .error-message {
            font-size: 1.25rem;
            margin-bottom: 2rem;
          }
          .description {
            color: #64748b;
            margin-bottom: 2rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-code">500</div>
          <div class="error-message">Erro interno</div>
          <div class="description">
            Ocorreu um erro interno. Tente novamente mais tarde.
          </div>
        </div>
      </body>
      </html>`,
      {
        status: 500,
        headers: {
          "Content-Type": "text/html",
        },
      },
    )
  }
}
