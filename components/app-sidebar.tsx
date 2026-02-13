'use client';

import { Home, Link2, BarChart3, Settings, Globe, QrCode } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { title: 'Inicio', url: '/dashboard', icon: Home },
  { title: 'Links', url: '/dashboard/links', icon: Link2 },
  { title: 'QR codes', url: '/dashboard/qrcode', icon: QrCode },
  { title: 'Analytics', url: '/dashboard/analytics', icon: BarChart3 },
  { title: 'Domínios', url: '/dashboard/domains', icon: Globe },
  { title: 'Configurações', url: '/dashboard/settings', icon: Settings }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="shadow shadow-primary border-none">
      <SidebarHeader className="bg-white px-4 pt-4 pb-5">
        <div className="flex items-center">
          <img src="/icon.png" alt="Linktraces" className="w-8 h-8" />

          <h1 className="ml-2 text-foreground font-semibold text-lg">
            Linktraces
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="justify-between bg-white border-t pt-1 border-primary">
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`text-foreground dark:text-foreground hover:text-foreground bg-transparent dark:bg-transparent hover:bg-primary/40 transition-all duration-200 gap-3 py-4 px-3
                        ${isActive ? 'bg-primary/70 dark:bg-primary/70 hover:bg-primary/65 dark:hover:bg-primary/65 text-foreground/70 hover:text-foreground/70 shadow/70 shadow-primary transition-all duration-200' : ''}`}
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
      </SidebarContent>
    </Sidebar>
  );
}
