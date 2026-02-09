'use client';

import type React from 'react';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      router.push('/dashboard');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Ocorreu um erro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col space-y-6">
          <Card className="bg-white border-none">
            <CardHeader>
              <CardTitle className="text-2xl text-accent">
                Acesse sua conta
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white dark:bg-white text-black border-black/40"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-foreground">
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white dark:bg-white text-black border-black/40"
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full text-sm text-white bg-foreground hover:bg-foreground/80"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </div>

                <div className="flex flex-col w-full justify-center gap-4 py-4">
                  <div className="flex w-full items-center gap-2">
                    <div className="h-px flex-1 bg-black/40"></div>
                    <span className="text-foreground text-sm">OU</span>
                    <div className="h-px flex-1 bg-accent/70"></div>
                  </div>

                  <Button
                    type="submit"
                    className="flex items-center w-full text-sm font-semibold text-foreground bg-white hover:bg-white/80 border border-black/40 cursor-pointer"
                    disabled={isLoading}
                  >
                    <Image
                      width="100"
                      height="100"
                      src={'/google-icon.svg'}
                      alt={'Google icon'}
                      className="size-4"
                    />
                    Entrar com o Google
                  </Button>
                </div>

                <div className="flex w-full items-center justify-center gap-2 mt-4 text-center text-black text-sm ">
                  Não tem uma conta?
                  <Link
                    href="/auth/sign-up"
                    className="font-semibold text-sm text-foreground hover:text-foreground/70"
                  >
                    Criar conta
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
