import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Analytics } from "@vercel/analytics/next"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
       <div className="flex-1 w-full justify-center bg-black/30">
       <Analytics/>
          <main className="flex-1 overflow-auto">{children}</main>
       </div>
      
      </div>
    </SidebarProvider>
  )
}
