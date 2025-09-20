import { updateSession } from "@/lib/supabase/middleware"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Handle public redirects first (before auth check)
  if (request.nextUrl.pathname.startsWith("/r/")) {
    return NextResponse.next()
  }

  // Handle auth for other routes
  return await updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
