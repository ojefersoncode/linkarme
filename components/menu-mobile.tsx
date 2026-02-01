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
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Domínios', url: '/dashboard/domains', icon: Globe },
  { title: 'Links', url: '/dashboard/links', icon: Link2 },
  { title: 'Analytics', url: '/dashboard/analytics', icon: BarChart3 },
  { title: 'Configurações', url: '/dashboard/settings', icon: Settings }
];

export function MenuMobile() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent text-white border-none m-0 p-2 cursor-pointer">
          <Menu className="size-5 p-0 m-0" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-foreground pt-2 pb-4 w-64">
        <SheetHeader className="flex w-full px-0 text-muted">
          <SheetTitle className="flex items-center pb-2 text-white border-b border-accent/30 w-full">
            <img src="/logo.png" alt="" className="h-6 px-4" />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col w-full h-screen justify-between px-2">
          <nav className="flex flex-col gap-2 mb-4">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white hover:text-muted/80 transition-all duration-300"
              >
                <item.icon className="size-4" />
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col px-2 gap-4">
            <div>
              <Button
                variant="ghost"
                className="w-full justify-center bg-white text-black hover:bg-white/80 dark:hover:bg-white hover:text-black/80 transition-all duration-300"
              >
                Gerenciar plano
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white bg-red-600 hover:bg-red-500 dark:hover:bg-red-500 transition-all duration-300"
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
