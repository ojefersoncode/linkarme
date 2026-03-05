'use client';

import type React from 'react';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName
          }
        }
      });
      if (error) throw error;
      router.push('/auth/sign-up-success');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Ocorreu um erro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="bg-white border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">
              Criar sua conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nome completo"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white dark:bg-white placeholder:text-gray-700 text-black border-black/40"
                />

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
                  className="w-full text-white bg-foreground hover:bg-foreground/80 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </div>
              <div className="flex items-center w-full justify-center gap-2 mt-6 text-black text-center text-sm">
                Já tem uma conta?
                <Link
                  href="/auth/login"
                  className="text-sm font-bold text-foreground hover:text-foreground/80"
                >
                  Entrar
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
