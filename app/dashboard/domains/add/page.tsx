"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Globe } from "lucide-react"
import Link from "next/link"

export default function AddDomainPage() {
  const [domain, setDomain] = useState("")
  const [verificationMethod, setVerificationMethod] = useState("dns")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      // Validate domain format
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/
      if (!domainRegex.test(domain)) {
        throw new Error("Formato de domínio inválido")
      }

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Usuário não autenticado")

      // Generate verification token
      const verificationToken =
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      // Insert domain
      const { error: insertError } = await supabase.from("domains").insert({
        user_id: user.id,
        domain: domain.toLowerCase(),
        verification_method: verificationMethod,
        verification_token: verificationToken,
        verified: false,
      })

      if (insertError) {
        if (insertError.code === "23505") {
          // Unique constraint violation
          throw new Error("Este domínio já está cadastrado")
        }
        throw insertError
      }

      router.push("/dashboard/domains")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6 flex flex-col justify-center  w-full">
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
      </div>

      <div className="flex justify-center w-full">
        <Card className="bg-background/70 border-popover max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-accent" />
              Adicionar Domínio
            </CardTitle>
            <CardDescription>
              Digite seu domínio e escolha o método de verificação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="domain">Domínio</Label>
                <Input
                  id="domain"
                  type="text"
                  placeholder="links.meudominio.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                  className="bg-background/70 dark:bg-background/70 border-popover"
                />
                <p className="text-sm text-muted-foreground">
                  Digite apenas o domínio, sem http:// ou https://
                </p>
              </div>

              <div className="space-y-3">
                <Label>Método de Verificação</Label>
                <RadioGroup
                  value={verificationMethod}
                  onValueChange={setVerificationMethod}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dns" id="dns" />
                    <Label htmlFor="dns" className="cursor-pointer">
                      DNS TXT Record (Recomendado)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="file" id="file" />
                    <Label htmlFor="file" className="cursor-pointer">
                      Upload de Arquivo
                    </Label>
                  </div>
                </RadioGroup>

                {verificationMethod === 'dns' && (
                  <div className="p-4 bg-background border border-popover/70 rounded-lg my-4 py-4">
                    <p className="text-sm">
                      <strong>DNS TXT:</strong> Você precisará adicionar um
                      registro TXT no seu provedor de DNS. Este método é mais
                      seguro e recomendado.
                    </p>
                  </div>
                )}

                {verificationMethod === 'file' && (
                  <div className="p-4 bg-background border border-popover/70 rounded-lg my-4 py-4">
                    <p className="text-sm">
                      <strong>Upload de Arquivo:</strong> Você precisará fazer
                      upload de um arquivo específico para o seu servidor web.
                    </p>
                  </div>
                )}
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
                  className="text-muted dark:text-muted bg-accent/40 dark:bg-accent/40 hover:bg-accent/40 dark:hover:bg-accent/40 border border-accent dark:border-accent"
                >
                  {isLoading ? 'Adicionando...' : 'Adicionar Domínio'}
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-500 border border-red-600 text-white"
                  asChild
                >
                  <Link href="/dashboard/domains">Cancelar</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
