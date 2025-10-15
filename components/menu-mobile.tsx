'use client';

import {
  Home,
  Link2,
  BarChart3,
  Settings,
  Globe,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Domínios', url: '/dashboard/domains', icon: Globe }, // corrigido
  { title: 'Links', url: '/dashboard/links', icon: Link2 },
  { title: 'Analytics', url: '/dashboard/analytics', icon: BarChart3 },
  { title: 'Configurações', url: '/dashboard/settings', icon: Settings }
];

export function MenuMobile() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent text-muted dark:text-muted border-none m-0 px-1 py-4">
          <Menu className="size-5 p-0 m-0" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-background border-popover/20 pt-2 pb-4 w-64"
      >
        <SheetHeader className="flex w-full px-0 text-muted">
          <SheetTitle className="flex items-center px-4 pb-4 text-white border-b border-popover/20 w-full">
            <span className="text-muted dark:text-muted font-bold text-sm">
              Menu
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col w-full h-screen justify-between px-2">
          <nav className="flex flex-col gap-2 mb-4">
            {menuItems.map((item) => {
              const isActive =
                item.url === '/dashboard'
                  ? pathname === '/dashboard' // dashboard só ativa na raiz
                  : pathname === item.url ||
                    pathname.startsWith(item.url + '/');

              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
                    isActive
                      ? 'bg-accent/40 text-white hover:bg-accent/50  border border-secondary'
                      : 'text-white hover:text-muted/80 hover:bg-accent/40 '
                  }`}
                >
                  <item.icon className="size-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col px-2">
            <div>
              <Button className="w-full mb-4 text-muted bg-accent/60 hover:bg-accent/50 border border-secondary">
                Gerenciar plano
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start text-white bg-red-600 hover:bg-red-500 dark:hover:bg-red-500"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
