'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { ShimmerButton } from '../ui/shimmer-button';
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
    <nav className="flex items-center w-full justify-between p-4 border-b text-white">
      {/* Logo */}
      <h1 className="font-black text-lg">Linkarme</h1>

      {/* Menu Desktop */}
      <div className="hidden md:flex items-center gap-10 font-mono text-white/80">
        <span>Início</span>
        <span>Preços</span>
        <span>Contatos</span>
        <span>Sobre</span>
      </div>

      {/* Botões Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/auth/sign-up">
          <ShimmerButton>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white/90">
              Cadastrar
            </span>
          </ShimmerButton>
        </Link>

        <Link href="/auth/login">
          <ShimmerButton>
            <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-primary">
              Entrar
            </span>
          </ShimmerButton>
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
          <SheetContent side="right" className="flex flex-col bg-background text-white">
            <SheetHeader className='text-white'>
              <SheetTitle className='text-white'>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 font-mono text-white/80 px-4">
              <span>Início</span>
              <span>Preços</span>
              <span>Contatos</span>
              <span>Sobre</span>
            </div>
            <div className="flex flex-col gap-4 mt-auto p-4 w-full">
               <Link href="/auth/sign-up" className='flex w-full'>
              <ShimmerButton className='flex w-full'>
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white/90">
                  Cadastrar
                </span>
              </ShimmerButton>
               </Link>

                <Link href="/auth/login" className='flex w-full'>
              <ShimmerButton className='flex w-full'>
                <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white/90">
                  Entrar
                </span>
              </ShimmerButton>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
