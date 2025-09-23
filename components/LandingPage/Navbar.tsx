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
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center w-full justify-between p-4 text-white">
      {/* Logo */}
      <img className='h-8' src='/logo.png' alt='linkarme' />

      {/* Menu Desktop */}
      <div className="hidden md:flex items-center gap-10 font-mono text-white/80">
        <span>Início</span>
        <span>Preços</span>
        <span>Contatos</span>
        <span>Sobre</span>
      </div>

      {/* Botões Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/auth/sign-up" className="flex w-full">
          <Button className="flex w-full rounded-sm bg-primary text-white">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white/90">
              Cadastrar
            </span>
          </Button>
        </Link>

        <Link href="/auth/login" className="flex w-full">
          <Button className="flex w-full">
            <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white/90">
              Entrar
            </span>
          </Button>
        </Link>
      </div>

      {/* Menu Mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex flex-col bg-background text-white"
          >
            <SheetHeader className="text-white">
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 font-mono text-white/80 px-4">
              <span>Início</span>
              <span>Preços</span>
              <span>Contatos</span>
              <span>Sobre</span>
            </div>
            <div className="flex flex-col gap-4 mt-auto p-4 w-full">
              <Link href="/auth/sign-up" className="flex w-full">
                <Button className="flex w-full rounded-sm bg-primary text-white">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white/90">
                    Cadastrar
                  </span>
                </Button>
              </Link>

              <Link href="/auth/login" className="flex w-full">
                <Button className="flex w-full">
                  <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white/90">
                    Entrar
                  </span>
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
