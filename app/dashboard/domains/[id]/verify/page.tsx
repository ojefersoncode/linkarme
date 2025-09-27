import type React from "react"
import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { VerifyDomainButton } from "@/components/verify-domain-button"
import { CopyButton } from "@/components/copy-button"

export default async function VerifyDomainPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: domain } = await supabase.from("domains").select("*").eq("id", id).eq("user_id", user.id).single()

  if (!domain) {
    notFound()
  }

  const dnsRecord = `linkshort-verify=${domain.verification_token}`
  const fileName = `linkshort-verify-${domain.verification_token}.txt`
  const fileContent = domain.verification_token

  return (
    <div className="p-6 space-y-6 bg-background ">
      <div className="flex items-center gap-4">
        <Button
          className="text-muted dark:text-muted bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent"
          size="sm"
          asChild
        >
          <Link href="/dashboard/domains">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl max-md:text-xl font-bold text-white">
            Verificar Domínio
          </h1>
          <p className="text-muted-foreground max-md:text-base">
            Confirme a propriedade do domínio {domain.domain}
          </p>
        </div>
      </div>

      <div className="max-w-4xl space-y-6">
        <Card className="bg-foreground border-zinc-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Status da Verificação</CardTitle>
                <CardDescription>Domínio: {domain.domain}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {domain.verified ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Verificado
                    </Badge>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <Badge variant="secondary">Pendente</Badge>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          {domain.verified && (
            <CardContent>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ Seu domínio foi verificado com sucesso! Agora você pode
                  criar links usando este domínio.
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {!domain.verified && (
          <>
            {domain.verification_method === 'dns' && (
              <Card className="bg-foreground border-zinc-700">
                <CardHeader>
                  <CardTitle>Verificação via DNS TXT</CardTitle>
                  <CardDescription>
                    Adicione o seguinte registro TXT no seu provedor de DNS
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nome/Host:</Label>
                    <div className="flex items-center gap-2 p-3 bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40 rounded-lg">
                      <code className="flex-1 text-sm">_linkshort-verify</code>
                      <CopyButton text="_linkshort-verify" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Valor:</Label>
                    <div className="flex items-center gap-2 p-3 bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40 rounded-lg">
                      <code className="flex-1 text-sm break-all">
                        {domain.verification_token}
                      </code>
                      <CopyButton text={domain.verification_token} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tipo:</Label>
                    <div className="p-3 bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40 rounded-lg">
                      <code className="text-sm">TXT</code>
                    </div>
                  </div>

                  <div className="p-4 bg-foreground dark:bg-foreground border-accent/40 dark:border-accent/40 rounded-lg">
                    <h4 className="font-medium text-muted dark:text-muted mb-2">
                      Instruções:
                    </h4>
                    <ol className="text-sm text-muted dark:text-muted space-y-1 list-decimal list-inside">
                      <li>
                        Acesse o painel do seu provedor de DNS (Cloudflare,
                        GoDaddy, etc.)
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
              <Card className="bg-foreground border-zinc-700">
                <CardHeader>
                  <CardTitle>Verificação via Upload de Arquivo</CardTitle>
                  <CardDescription>
                    Faça upload do arquivo de verificação para seu servidor
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Nome do arquivo:
                    </Label>
                    <div className="flex items-center gap-2 p-3 bg-background rounded-lg">
                      <code className="flex-1 text-sm">{fileName}</code>
                      <CopyButton text={fileName} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Conteúdo do arquivo:
                    </Label>
                    <div className="flex items-center gap-2 p-3 bg-background rounded-lg">
                      <code className="flex-1 text-sm">{fileContent}</code>
                      <CopyButton text={fileContent} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      URL de acesso:
                    </Label>
                    <div className="p-3 bg-background rounded-lg">
                      <code className="text-sm">
                        https://{domain.domain}/.well-known/{fileName}
                      </code>
                    </div>
                  </div>

                  <div className="p-4 bg-background border border-zinc-700 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Instruções:</h4>
                    <ol className="text-sm text-zinc-300 space-y-1 list-decimal list-inside">
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

            <Card className="bg-foreground border-zinc-700">
              <CardContent>
                <div className="flex w-full justify-between gap-12">
                  <VerifyDomainButton domainId={domain.id} />
                  <Button
                    className="max-sm:flex-1 bg-red-600 text-muted dark:text-muted hover:bg-red-700"
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

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
