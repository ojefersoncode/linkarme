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
      <img
        src="/Linktraces.png"
        alt="logo-name"
        className="h-8 max-md:h-5 max-md:w-32 px-0"
      />

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
          <Button className="flex w-full rounded-sm bg-accent/50 hover:bg-accent/50 text-muted">
            <span className="whitespace-pre-wrap text-center text-sm font-medium">
              Cadastrar
            </span>
          </Button>
        </Link>

        <Link href="/auth/login" className="flex w-full">
          <Button className="flex w-full bg-accent/50 hover:bg-accent/50 text-muted">
            <span className="whitespace-pre-wrap text-center text-sm font-bold">
              Entrar
            </span>
          </Button>
        </Link>
      </div>

      {/* Menu Mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="bg-transparent hover:bg-transparent text-muted dark:text-muted"
              size="icon"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex flex-col bg-background text-white"
          >
            <SheetHeader className="text-text-muted">
              <SheetTitle className="text-muted">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 font-mono text-white/80 px-4">
              <span>Início</span>
              <span>Preços</span>
              <span>Contatos</span>
              <span>Sobre</span>
            </div>
            <div className="flex flex-col gap-4 mt-auto p-4 w-full">
              <Link href="/auth/sign-up" className="flex w-full">
                <Button className="flex w-full rounded-sm bg-accent/50 hover:bg-accent/50 text-white">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium text-muted">
                    Cadastrar
                  </span>
                </Button>
              </Link>

              <Link href="/auth/login" className="flex w-full">
                <Button className="flex w-full bg-accent/50 hover:bg-accent/50">
                  <span className="whitespace-pre-wrap text-center text-sm font-bold text-muted">
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
