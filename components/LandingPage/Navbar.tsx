'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import Image from 'next/image';

import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center w-full justify-between p-4 text-white">
      <Image
        src={'icon.png'}
        height={1024}
        width={1024}
        alt="Linktraces"
        priority
        className="w-8 h-8"
      />

      <div className="flex items-center gap-4">
        <Link href="/auth/sign-up" className="flex w-full">
          <Button className="flex w-full cursor-pointer bg-white hover:bg-white/80 shadow/10 shadow-black text-accent">
            <span className="whitespace-pre-wrap text-center text-sm font-bold px-4">
              Cadastrar
            </span>
          </Button>
        </Link>

        <Link href="/auth/login" className="flex w-full">
          <Button className="flex w-full cursor-pointer bg-foreground hover:bg-foreground/80 text-white">
            <span className="whitespace-pre-wrap text-center text-sm font-bold px-4">
              Entrar
            </span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
