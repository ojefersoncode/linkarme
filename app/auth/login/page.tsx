'use client';

import type React from 'react';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email ou numero de telefone"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white dark:bg-white placeholder:text-gray-700 text-black border-black/40"
                  />

                  <Input
                    id="password"
                    type="password"
                    placeholder="Senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white dark:bg-white placeholder:text-gray-700 text-black border-black/40"
                  />

                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full text-sm text-white bg-foreground hover:bg-foreground/80"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </div>

                <div className="flex flex-col w-full items-center justify-center mt-2 gap-4">
                  <span className="p-2 text-black hover:underline cursor-pointer text-sm">
                    Esqueçeu a senha?
                  </span>

                  <Link
                    href="/auth/sign-up"
                    className="flex w-full justify-center items-center mt-4 font-semibold text-sm text-foreground hover:text-foreground/70"
                  >
                    <Button className="w-full bg-white hover:bg-green-500/10 text-foreground cursor-pointer border border-foreground">
                      Criar nova conta
                    </Button>
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
