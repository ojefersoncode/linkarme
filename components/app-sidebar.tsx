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
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Domínios', url: '/dashboard/domains', icon: Globe },
  { title: 'Links', url: '/dashboard/links', icon: Link2 },
  { title: 'Analytics', url: '/dashboard/analytics', icon: BarChart3 },
  { title: 'Configurações', url: '/dashboard/settings', icon: Settings }
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <Sidebar className="bg-foreground border-accent/40">
      <SidebarHeader className="bg-foreground border-b border-accent/40 p-4">
        <div className="flex items-center ">
          <img
            src="/Linklogo.png"
            alt="logo-name"
            className="h-8 px-0 opacity-80"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="justify-between bg-foreground">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`transition-all duration-200 ${
                        isActive
                          ? 'bg-accent/40 text-white hover:bg-accent/50'
                          : 'hover:bg-accent/30 text-muted-foreground hover:text-white'
                      }`}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="p-4 justify-end">
          <Button
            variant="ghost"
            className="w-full justify-center bg-accent/40 text-white hover:bg-white dark:hover:bg-accent/40 hover:text-muted"
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
