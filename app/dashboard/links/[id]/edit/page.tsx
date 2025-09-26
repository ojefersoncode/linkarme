"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Link2 } from "lucide-react"
import Link from "next/link"

interface Domain {
  id: string
  domain: string
  verified: boolean
}

interface LinkData {
  id: string
  domain_id: string
  slug: string
  destination_url: string
  title: string | null
  description: string | null
  active: boolean
}

export default function EditLinkPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [linkId, setLinkId] = useState<string>("")
  const [domains, setDomains] = useState<Domain[]>([])
  const [linkData, setLinkData] = useState<LinkData | null>(null)
  const [selectedDomain, setSelectedDomain] = useState("")
  const [slug, setSlug] = useState("")
  const [destinationUrl, setDestinationUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [active, setActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const initPage = async () => {
      const resolvedParams = await params
      setLinkId(resolvedParams.id)
      await Promise.all([loadDomains(), loadLinkData(resolvedParams.id)])
    }
    initPage()
  }, [params])

  const loadDomains = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("domains").select("id, domain, verified").eq("verified", true).order("domain")

    if (data) {
      setDomains(data)
    }
  }

  const loadLinkData = async (id: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.from("links").select("*").eq("id", id).single()

    if (error) {
      setError("Link não encontrado")
      return
    }

    if (data) {
      setLinkData(data)
      setSelectedDomain(data.domain_id)
      setSlug(data.slug)
      setDestinationUrl(data.destination_url)
      setTitle(data.title || "")
      setDescription(data.description || "")
      setActive(data.active)
    }
  }

  const validateUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      // Validate inputs
      if (!selectedDomain) {
        throw new Error("Selecione um domínio")
      }

      if (!slug.trim()) {
        throw new Error("Digite um slug para o link")
      }

      if (!destinationUrl.trim()) {
        throw new Error("Digite a URL de destino")
      }

      if (!validateUrl(destinationUrl)) {
        throw new Error("URL de destino inválida")
      }

      // Validate slug format
      const slugRegex = /^[a-zA-Z0-9_-]+$/
      if (!slugRegex.test(slug)) {
        throw new Error("Slug deve conter apenas letras, números, hífens e underscores")
      }

      // Check if slug already exists for this domain (excluding current link)
      const { data: existingLink } = await supabase
        .from("links")
        .select("id")
        .eq("domain_id", selectedDomain)
        .eq("slug", slug.toLowerCase())
        .neq("id", linkId)
        .single()

      if (existingLink) {
        throw new Error("Este slug já existe para o domínio selecionado")
      }

      // Update link
      const { error: updateError } = await supabase
        .from("links")
        .update({
          domain_id: selectedDomain,
          slug: slug.toLowerCase(),
          destination_url: destinationUrl.trim(),
          title: title.trim() || null,
          description: description.trim() || null,
          active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", linkId)

      if (updateError) throw updateError

      router.push("/dashboard/links")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro")
    } finally {
      setIsLoading(false)
    }
  }

  if (!linkData) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/links">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-muted dark:text-muted">
              Editar Link
            </h1>
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/links">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Editar Link</h1>
          <p className="text-muted-foreground">
            Edite as informações do seu link
          </p>
        </div>
      </div>

      <div className="">
        <Card className="bg-foreground border-accent/30 dark:border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Editar Link
            </CardTitle>
            <CardDescription>
              Atualize as informações do seu link curto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="domain">Domínio</Label>
                <Select
                  value={selectedDomain}
                  onValueChange={setSelectedDomain}
                >
                  <SelectTrigger className="bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40">
                    <SelectValue placeholder="Selecione um domínio" />
                  </SelectTrigger>
                  <SelectContent className="bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40">
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
                <Input
                  id="slug"
                  type="text"
                  placeholder="meu-link"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Apenas letras, números, hífens e underscores são permitidos
                </p>
                {selectedDomain && slug && (
                  <div className="p-2 bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40 rounded-lg">
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
                  className="bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título (Opcional)</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Título descritivo do link"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (Opcional)</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição detalhada do link"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={active}
                  onCheckedChange={setActive}
                />
                <Label htmlFor="active">Link ativo</Label>
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
                  className="text-muted dark:text-muted"
                >
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <Button
                  asChild
                  className="bg-accent/10 dark:bg-accent/10 text-muted dark:text-muted border border-accent/40 dark:border-accent/40"
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
