'use client';

import {
  Home,
  Link2,
  BarChart3,
  Settings,
  Globe,
  LogOut,
  Menu,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogoutButton } from './Dashboard/Logout';

const menuItems = [
  { title: 'Inicio', url: '/dashboard', icon: Home },
  { title: 'Links', url: '/dashboard/links', icon: Link2 },
  { title: 'QR codes', url: '/dashboard/qrcode', icon: QrCode },
  { title: 'Analytics', url: '/dashboard/analytics', icon: BarChart3 },
  { title: 'Domínios', url: '/dashboard/domains', icon: Globe },
  { title: 'Configurações', url: '/dashboard/settings', icon: Settings }
];
export function MenuMobile() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-white hover:bg-white dark:text-black text-black border-none m-0 p-2 cursor-pointer">
          <Menu className="size-8 p-0 m-0" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-white dark:text-black text-black w-64"
      >
        <SheetHeader className="flex w-full px-0 dark:text-black text-black">
          <SheetTitle className="flex items-center pb-3 dark:text-black text-black border-b border-primary/50 w-full">
            <div className="flex items-center px-4">
              <Image
                src={'icon.png'}
                height={1024}
                width={1024}
                alt="Linktraces"
                className="w-8 h-8"
              />
              <h1 className="ml-2 font-extralight text-white/90 text-xl">
                Linktraces
              </h1>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col w-full px-2">
          <nav className="flex flex-col gap-2 mb-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.url;

              return (
                <Link className="w-full px-2" key={item.title} href={item.url}>
                  <Button
                    className={`w-full justify-start text-foreground bg-white hover:text-foreground hover:bg-primary/50 transition-all duration-200
        ${isActive ? 'bg-primary hover:bg-primary/85 text-foreground hover:text-foreground shadow shadow-primary' : ''}`}
                  >
                    <item.icon className="size-4" />
                    {item.title}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
