'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ArrowLeft, Link2, Shuffle } from 'lucide-react';
import Link from 'next/link';

interface Domain {
  id: string;
  domain: string;
  verified: boolean;
}

export default function CreateLinkPage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [slug, setSlug] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadDomains();
  }, []);

  const loadDomains = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('domains')
      .select('id, domain, verified')
      .eq('verified', true)
      .order('domain');

    if (data) {
      setDomains(data);
      if (data.length > 0) {
        setSelectedDomain(data[0].id);
      }
    }
  };

  const generateRandomSlug = () => {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSlug(result);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      // Validate inputs
      if (!selectedDomain) {
        throw new Error('Selecione um domínio');
      }

      if (!slug.trim()) {
        throw new Error('Digite um slug para o link');
      }

      if (!destinationUrl.trim()) {
        throw new Error('Digite a URL de destino');
      }

      if (!validateUrl(destinationUrl)) {
        throw new Error('URL de destino inválida');
      }

      // Validate slug format
      const slugRegex = /^[a-zA-Z0-9_-]+$/;
      if (!slugRegex.test(slug)) {
        throw new Error(
          'Slug deve conter apenas letras, números, hífens e underscores'
        );
      }

      // Get current user
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // Check if slug already exists for this domain
      const { data: existingLink } = await supabase
        .from('links')
        .select('id')
        .eq('domain_id', selectedDomain)
        .eq('slug', slug.toLowerCase())
        .single();

      if (existingLink) {
        throw new Error('Este slug já existe para o domínio selecionado');
      }

      // Insert link
      const { error: insertError } = await supabase.from('links').insert({
        user_id: user.id,
        domain_id: selectedDomain,
        slug: slug.toLowerCase(),
        destination_url: destinationUrl.trim(),
        title: title.trim() || null,
        description: description.trim() || null,
        active: true
      });

      if (insertError) throw insertError;

      router.push('/dashboard/links');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Ocorreu um erro');
    } finally {
      setIsLoading(false);
    }
  };

  if (domains.length === 0) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-1">
          <Button
            className="bg-foreground/25 hover:bg-foreground/20 dark:hover:bg-foreground/20 dark:hover:text-foreground text-foreground hover:text-foreground"
            size="sm"
            asChild
          >
            <Link href="/dashboard/links">
              <ArrowLeft className="size-5 " />
            </Link>
          </Button>
        </div>

        <Card className="bg-white border-none">
          <CardHeader>
            <CardTitle className="text-black">
              Nenhum domínio verificado
            </CardTitle>
            <CardDescription className="text-black">
              Você precisa ter pelo menos um domínio verificado para criar
              links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              className="bg-foreground hover:bg-foreground/80 transition-all duration-300 px-8 text-white max-md:text-sm"
            >
              <Link href="/dashboard/domains">Gerenciar Domínios</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="bg-transparent hover:bg-transparent dark:hover:bg-transparent dark:hover:text-foreground text-foreground"
        >
          <Link href="/home/links">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Criar Link</h1>
        </div>
      </div>

      <div className="flex w-full">
        <Card className="w-full bg-foreground border-none text-white">
          <CardHeader>
            <CardTitle className="flex w-full justify-between items-center">
              <span> Configurar Link </span>
              <div className="bg-background p-1 rounded-sm">
                <Link2 className="h-5 w-5 text-accent" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="domain">Domínio</Label>
                <Select
                  value={selectedDomain}
                  onValueChange={setSelectedDomain}
                >
                  <SelectTrigger className="border-none text-foreground bg-white dark:bg-white hover:bg-white hover:dark:bg-white">
                    <SelectValue placeholder="Selecione um domínio" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-white text-foreground dark:text-foreground border-bone">
                    {domains.map((domain) => (
                      <SelectItem key={domain.id} value={domain.id}>
                        {domain.domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug do Link</Label>
                <div className="flex gap-2">
                  <Input
                    id="slug"
                    type="text"
                    placeholder="meu-link"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    className="border-none bg-background dark:bg-background text-foreground dark:text-foreground placeholder:text-foreground dark:placeholder:text-foreground"
                  />
                  <Button
                    type="button"
                    className="bg-white hover:bg-white/90 text-foreground"
                    onClick={generateRandomSlug}
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Apenas letras, números, hífens e underscores são permitidos
                </p>
                {selectedDomain && slug && (
                  <div className="p-2 bg-muted rounded-lg">
                    <p className="text-sm font-medium">
                      Link final: https://
                      {domains.find((d) => d.id === selectedDomain)?.domain}/
                      {slug}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destinationUrl">URL de Destino</Label>
                <Input
                  id="destinationUrl"
                  type="url"
                  placeholder="https://exemplo.com/pagina"
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                  required
                  className="border-none bg-background dark:bg-background text-foreground dark:text-foreground placeholder:text-foreground dark:placeholder:text-foreground"
                />
                <p className="text-sm text-muted-foreground">
                  URL completa para onde o link deve redirecionar
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título (Opcional)</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Título descritivo do link"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-none bg-background dark:bg-background text-foreground dark:text-foreground placeholder:text-foreground dark:placeholder:text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (Opcional)</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição detalhada do link"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="border-none bg-background dark:bg-background text-foreground dark:text-foreground placeholder:text-foreground dark:placeholder:text-foreground"
                />
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white hover:bg-white/80 transition-all duration-300 px-8 text-foreground max-md:text-sm"
                >
                  {isLoading ? 'Criando...' : 'Criar Link'}
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-600 border-none px-8 text-white"
                  asChild
                >
                  <Link href="/dashboard/links">Cancelar</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
