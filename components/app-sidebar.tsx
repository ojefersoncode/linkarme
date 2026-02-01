'use client';

import {
  Home,
  Link2,
  BarChart3,
  Settings,
  Globe,
  LogOut,
  QrCode
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home
  },
  {
    title: 'Analytics',
    url: '/dashboard/analytics',
    icon: BarChart3
  },
  {
    title: 'Domínios',
    url: '/dashboard/domains',
    icon: Globe
  },
  {
    title: 'Links',
    url: '/dashboard/links',
    icon: Link2
  },
  {
    title: 'QR code',
    url: '/dashboard/links',
    icon: QrCode
  },

  {
    title: 'Configurações',
    url: '/dashboard/settings',
    icon: Settings
  }
];

export function AppSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <Sidebar className="bg-foreground border-accent/40">
      <SidebarHeader className="bg-foreground p-4">
        <div className="flex items-center">
          <h1 className="text-white font-bold text-2xl">Linkarme</h1>
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
                    className="text-white hover:text-white hover:bg-background/20  transition-all duration-200"
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
            className="w-full justify-center bg-white text-black hover:bg-white/80 dark:hover:bg-white hover:text-black/80 transition-all duration-300"
          >
            Gerenciar plano
          </Button>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t bg-foreground border-background">
        <Button
          className="w-full justify-start bg-transparent hover:bg-transparent text-white cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
