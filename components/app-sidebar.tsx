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
import Image from 'next/image';
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
    <Sidebar className="shadow-xl/40 shadow-primary">
      <SidebarHeader className="bg-secondary pb-4 p-4">
        <div className="flex items-center">
          <Image
            src={'whiteicon.png'}
            height={1024}
            width={1024}
            alt="Linktraces"
            priority
            className="w-8 h-8"
          />
          <h1 className="ml-2 font-extralight text-white/90 text-xl">
            Linktraces
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="justify-between bg-secondary">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`text-white/70 hover:text-white hover:bg-background/10 transition-all duration-200 py-5 px-3
                        ${isActive ? 'bg-background/20 hover:bg-background/15 text-white hover:text-white/80 transition-all duration-200' : ''}`}
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
