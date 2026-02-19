'use client';

import {
  Home,
  Link2,
  BarChart3,
  Settings,
  Globe,
  QrCode,
  ChartNoAxesCombined,
  Layers,
  CircleFadingPlus,
  Radio
} from 'lucide-react';
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
  { title: 'Metricas', url: '/dashboard/analytics', icon: BarChart3 },
  { title: 'Social Media', url: '/dashboard/social-media', icon: Radio },
  { title: 'Encurtar links', url: '/dashboard/links', icon: Link2 },
  { title: 'Campanhas', url: '/dashboard/campaigns', icon: Layers },
  { title: 'QR codes', url: '/dashboard/qrcode', icon: QrCode },
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
          <SidebarGroupContent className="px-2 ">
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`text-black dark:text-black hover:text-black bg-transparent dark:bg-transparent hover:bg-primary/40 transition-all duration-200 gap-3 py-4 px-3
                        ${isActive ? 'bg-foreground dark:bg-foreground hover:bg-foreground/65 dark:hover:bg-foreground text-white dark:text-white hover:text-white/70 shadow/70 shadow-primary transition-all duration-200' : 'hover:bg-primary dark:hover:bg-primary text-black/70 hover:text-black/70'}`}
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
