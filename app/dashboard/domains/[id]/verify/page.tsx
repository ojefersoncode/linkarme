import type React from 'react';
import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { VerifyDomainButton } from '@/components/verify-domain-button';
import { CopyButton } from '@/components/copy-button';

export default async function VerifyDomainPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/auth/login');
  }

  const { data: domain } = await supabase
    .from('domains')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!domain) {
    notFound();
  }

  const dnsRecord = `linktraces-verify=${domain.verification_token}`;
  const fileName = `linktraces-verify-${domain.verification_token}.txt`;
  const fileContent = domain.verification_token;

  return (
    <div className="p-4 md:p-6 space-y-6 bg-background">
      <div className="flex items-center gap-4">
        <Button
          className="bg-white hover:bg-white/80 dark:hover:bg-white/80"
          size="sm"
          asChild
        >
          <Link href="/dashboard/domains">
            <ArrowLeft className="h-4 w-4 text-black" />
          </Link>
        </Button>

        <h1 className="text-xl font-bold text-black/90">
          Verificar Seu Domínio
        </h1>
      </div>

      <div className="w-full bg-white rounded-lg">
        <Card className="bg-transparent shadow-none text-black border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-black">
                  Status da Verificação
                </CardTitle>
                <CardDescription className="text-black">
                  Domínio: {domain.domain}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {domain.verified ? (
                  <>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Verificado
                    </Badge>
                  </>
                ) : (
                  <>
                    <Badge className="bg-background text-accent">
                      Pendente
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          {domain.verified && (
            <CardContent>
              <div className="p-4 bg-white text-black rounded-lg">
                <p className="text-sm text-green-800">
                  Seu domínio foi verificado com sucesso! Agora você pode criar
                  links usando este domínio.
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {!domain.verified && (
          <>
            {domain.verification_method === 'dns' && (
              <Card className="bg-transparent shadow-none text-black border-none">
                <CardHeader>
                  <CardTitle className="text-black">
                    Verificação via DNS TXT
                  </CardTitle>
                  <CardDescription className="text-black/70">
                    Adicione o seguinte registro TXT no seu provedor de DNS
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm pb-2 text-black font-medium">
                      Nome/Host:
                    </Label>
                    <div className="flex items-center mt-2 gap-2 py-1 px-3 bg-background rounded-lg">
                      <code className="flex-1 text-sm text-black dark:text-black">
                        _linktraces-verify
                      </code>
                      <CopyButton text="_linktraces-verify" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm mb-2 text-black font-medium">
                      Valor:
                    </Label>
                    <div className="flex items-center mt-2 gap-2 py-1 px-3 bg-background rounded-lg">
                      <code className="flex-1 text-sm text-black dark:text-black break-all">
                        {domain.verification_token}
                      </code>
                      <CopyButton text={domain.verification_token} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-black font-medium">
                      Tipo:
                    </Label>
                    <div className="py-2 mt-2 px-3 bg-background rounded-lg">
                      <code className="text-sm text-black dark:text-black">
                        TXT
                      </code>
                    </div>
                  </div>

                  <div className="py-4">
                    <h4 className="font-bold text-black dark:text-black mb-2">
                      Instruções:
                    </h4>
                    <ol className="text-sm text-black dark:text-black space-y-1 list-decimal list-inside">
                      <li>
                        Acesse o painel do seu provedor de DNS (Cloudflare,
                        Hostinger, etc.)
                      </li>
                      <li>Adicione um novo registro TXT</li>
                      <li>Use "_linkshort-verify" como nome/host</li>
                      <li>Cole o token como valor</li>
                      <li>
                        Salve as alterações e aguarde a propagação (pode levar
                        até 24h)
                      </li>
                      <li>Clique em "Verificar Domínio" abaixo</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}

            {domain.verification_method === 'file' && (
              <Card className="bg-transparent shadow-none text-black border-none">
                <CardHeader>
                  <CardTitle className="text-black dark:text-black">
                    Verificação via Upload de Arquivo
                  </CardTitle>
                  <CardDescription className="text-black dark:text-black">
                    Faça upload do arquivo de verificação para seu servidor
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-black font-medium">
                      Nome do arquivo:
                    </Label>
                    <div className="flex items-center gap-2 py-2 px-3 bg-background rounded-lg">
                      <code className="flex-1 text-sm">{fileName}</code>
                      <CopyButton text={fileName} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-black font-medium">
                      Conteúdo do arquivo:
                    </Label>
                    <div className="flex items-center gap-2 py-2 px-3 bg-background rounded-lg">
                      <code className="flex-1 text-sm text-foreground dark:text-foreground">
                        {fileContent}
                      </code>
                      <CopyButton text={fileContent} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-black font-medium">
                      URL de acesso:
                    </Label>
                    <div className="py-2 px-3 bg-background rounded-lg">
                      <code className="text-sm text-black dark:text-black">
                        https://{domain.domain}/.well-known/{fileName}
                      </code>
                    </div>
                  </div>

                  <div className="py-4">
                    <h4 className="font-medium text-black dark:text-black mb-2">
                      Instruções:
                    </h4>
                    <ol className="text-sm text-black dark:text-black space-y-1 list-decimal list-inside">
                      <li>Crie um arquivo com o nome especificado</li>
                      <li>Adicione o token como conteúdo do arquivo</li>
                      <li>
                        Faça upload para a pasta /.well-known/ do seu servidor
                      </li>
                      <li>
                        Certifique-se de que o arquivo está acessível via HTTPS
                      </li>
                      <li>Clique em "Verificar Domínio" abaixo</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-transparent shadow-none text-black border-none">
              <CardContent>
                <div className="flex w-full justify-between gap-12">
                  <VerifyDomainButton domainId={domain.id} />
                  <Button
                    className="bg-foreground text-white dark:text-white hover:bg-foreground/90 dark:hover:bg-foreground/90 cursor-pointer"
                    asChild
                  >
                    <Link href="/dashboard/domains">Voltar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

function Label({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <label className={className}>{children}</label>;
}
