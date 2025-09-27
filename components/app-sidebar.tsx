"use client"

import { Home, Link2, BarChart3, Settings, Globe, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Domínios",
    url: "/dashboard/domains",
    icon: Globe,
  },
  {
    title: "Links",
    url: "/dashboard/links",
    icon: Link2,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }



  return (
    <Sidebar className="bg-foreground border-accent/40">
      <SidebarHeader className="bg-foreground border-b border-accent/40 p-4">
        <div className="flex items-center ">
          <img
            src="/Link.png"
            alt="logo-name"
            className="h-10 px-0 opacity-80"
          />

          <img
            src="/Linktraces.png"
            alt="logo-name"
            className="h-8 px-0 opacity-80"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="justify-between bg-foreground">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/40 transition-all duration-200"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="p-4 justify-end">
          <Button
            variant="ghost"
            className="w-full justify-center bg-white text-background hover:bg-white dark:hover:bg-white hover:text-background"
          >
            Gerenciar plano
          </Button>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t p-4 bg-foreground border-accent/40">
        <Button
          className="w-full justify-start bg-transparent hover:bg-transparent text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}



