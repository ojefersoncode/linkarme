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
    <Sidebar className="bg-background/70  dark:bg-background border-popover">
      <SidebarHeader className="bg-background/70 border-b border-popover px-4 ">
        <div className="flex items-center justify-center bg-background/70 px-4">
          <img
            src="/Linklogo.png"
            alt="logo-name"
            className="px-0 opacity-90"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="justify-between bg-background/70 pt-2">
        <SidebarGroup className="bg-background/70">
          <SidebarGroupContent className="bg-background/70">
            <SidebarMenu className="bg-background/70">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`transition-all duration-200 ${
                        isActive
                          ? 'bg-accent/40 text-white hover:bg-accent/50 border border-secondary/80'
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
          <Button className="w-full justify-center bg-accent/50 text-white hover:bg-white dark:hover:bg-accent/40 hover:text-muted border border-secondary">
            Gerenciar plano
          </Button>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t bg-background/70 border-popover">
        <Button
          className="w-full justify-start bg-transparent cursor-pointer py-6 hover:bg-transparent text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
