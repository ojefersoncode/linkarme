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
      <h1 className="text-accent font-bold text-2xl">Linkarme</h1>

      {/* Menu Desktop */}
      <div className="hidden md:flex items-center gap-10 font-semibold text-white/80">
        <span>Início</span>
        <span>Preços</span>
        <span>Contatos</span>
        <span>Sobre</span>
      </div>

      {/* Botões Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/auth/sign-up" className="flex w-full">
          <Button className="flex w-full rounded-sm bg-white hover:bg-white/80 text-accent">
            <span className="whitespace-pre-wrap text-center text-sm font-bold px-4">
              Cadastrar
            </span>
          </Button>
        </Link>

        <Link href="/auth/login" className="flex w-full">
          <Button className="flex w-full bg-accent hover:bg-accent/80 text-white">
            <span className="whitespace-pre-wrap text-center text-sm font-bold px-4">
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
              className="bg-transparent hover:bg-transparent text-foreground dark:text-foreground"
              size="icon"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex flex-col bg-background text-accent dark:text-accent"
          >
            <SheetHeader className="text-text-muted">
              <SheetTitle className="text-accent dark:text-accent">
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 font-semibold text-foreground/90 dark:text-foreground/90 px-4">
              <span className="cursor-pointer">Início</span>
              <span className="cursor-pointer">Preços</span>
              <span className="cursor-pointer">Contatos</span>
              <span className="cursor-pointer">Sobre</span>
            </div>
            <div className="flex flex-col gap-4 mt-auto p-4 w-full">
              <Link href="/auth/sign-up" className="flex w-full">
                <Button className="flex w-full rounded-sm bg-white hover:bg-white/90 text-white">
                  <span className="whitespace-pre-wrap text-center text-sm font-bold text-foreground dark:text-foreground">
                    Cadastrar
                  </span>
                </Button>
              </Link>

              <Link href="/auth/login" className="flex w-full">
                <Button className="flex w-full bg-foreground hover:bg-foreground/90">
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
