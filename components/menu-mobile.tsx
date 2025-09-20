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
        <Button className="m-2 bg-foreground hover:bg-foreground text-yellow-400 border">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-foreground p-4 w-64">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 mb-4 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Link2 className="h-4 w-4" />
            </div>
            Linkasme
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col w-full h-screen justify-between">
          <nav className="flex flex-col gap-2 mb-4">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:text-white transition-all duration-300"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col">
            <div>
              <Button
                variant="ghost"
                className="w-full mb-4 justify-center text-white border border-zinc-700 bg-background hover:bg-background dark:hover:bg-background hover:text-white"
              >
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
