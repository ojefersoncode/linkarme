'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Link2,
  BarChart3,
  Settings,
  Globe,
  QrCode,
  Layers,
  Radio,
  ListTodo,
  Plus
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useState } from 'react';

const menuItems = [
  { title: 'Inicio', url: '/dashboard', icon: Home },
  { title: 'Tarefas', url: '/dashboard/task', icon: ListTodo },
  { title: 'Metricas', url: '/dashboard/analytics', icon: BarChart3 },
  { title: 'Encurtar links', url: '/dashboard/links', icon: Link2 },
  { title: 'Social Media', url: '/dashboard/social-media', icon: Radio },
  { title: 'Campanhas', url: '/dashboard/campaigns', icon: Layers },
  { title: 'QR codes', url: '/dashboard/qrcode', icon: QrCode },
  { title: 'Domínios', url: '/dashboard/domains', icon: Globe },
  { title: 'Configurações', url: '/dashboard/settings', icon: Settings }
];

export function AppSidebar() {
  const [profiles] = useState([{ id: 'profile-1', title: 'Jeferson' }]);

  const [selectedProfile, setSelectedProfile] = useState('profile-1');
  const pathname = usePathname();

  return (
    <Sidebar className="shadow shadow-primary border-none">
      <SidebarHeader className="bg-white p-4">
        <Select value={selectedProfile} onValueChange={setSelectedProfile}>
          <SelectTrigger className="flex gap-2 w-full border-none shadow-none text-black bg-white dark:bg-white hover:bg-background hover:dark:bg-background cursor-pointer">
            <span className="h-6 w-6 rounded-full text-center text-sm font-semibold bg-foreground text-background">
              J
            </span>

            <SelectValue className="text-foreground font-bold text-base" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-white text-black dark:text-black border-gray-300 shadow-xl shadow-black/10">
            {profiles.map((profile) => (
              <SelectItem
                className="cursor-pointer"
                key={profile.id}
                value={profile.id}
              >
                {profile.title}
              </SelectItem>
            ))}
            <SelectItem
              value="new-profile"
              className="cursor-pointer mt-2 text-black dark:text-black hover:text-black dark:hover:text-black flex items-center gap-2"
            >
              <Plus className="size-4" />
              <span className="text-xs font-normal">Criar</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </SidebarHeader>

      <SidebarContent className="justify-between bg-white border-t pt-1 border-primary shadow-none">
        <SidebarGroup>
          <SidebarGroupContent className="px-2 border-none shadow-none">
            <SidebarMenu className="border-none shadow-none">
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
