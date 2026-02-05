'use client';

import { Home, Link2, BarChart3, Settings, Globe, QrCode } from 'lucide-react';
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
import Image from 'next/image';
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
    url: '/dashboard/qrcode',
    icon: QrCode
  }
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-white shadow-xl/40 shadow-primary border-foreground/20">
      <SidebarHeader className="bg-white p-4">
        <div className="flex items-center">
          <Image
            src={'icon.png'}
            height={1024}
            width={1024}
            alt="Linktraces"
            className="w-8 h-8"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="justify-between bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-foreground hover:text-foreground hover:bg-background/80  transition-all duration-200"
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
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <Link href={'/dashboard/settings'}>
          <Button className="w-full justify-start bg-transparent hover:bg-background/80 text-foreground cursor-pointer">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
