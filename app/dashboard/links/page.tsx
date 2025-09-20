import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Link2, ExternalLink, BarChart3 } from "lucide-react"
import Link from "next/link"
import { DeleteLinkButton } from "@/components/delete-link-button"
import { CopyLinkButton } from "@/components/copy-link-button"
import { ToggleLinkButton } from "@/components/toggle-link-button"
import { ExportDataDialog } from "@/components/export-data-dialog"

export default async function LinksPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get links with domain information and click counts
  const { data: links } = await supabase
    .from("links")
    .select(`
      *,
      domains (domain, verified),
      clicks (id)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const getStatusBadge = (active: boolean) => {
    if (active) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Ativo
        </Badge>
      )
    }
    return <Badge variant="secondary">Inativo</Badge>
  }

  // Prepare links for export dialog
  const linksForExport =
    links?.map((link) => ({
      id: link.id,
      slug: link.slug,
      title: link.title,
      domains: link.domains,
    })) || []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Links</h1>
          <p className="text-muted-foreground">Gerencie seus links curtos personalizados</p>
        </div>
        <div className="flex gap-2">
          <ExportDataDialog links={linksForExport} />
          <Button asChild>
            <Link href="/dashboard/links/create">
              <Plus className="h-4 w-4 mr-2 text-white" />
              Criar Link
            </Link>
          </Button>
        </div>
      </div>

      {links && links.length > 0 ? (
        <div className="grid gap-4">
          {links.map((link) => {
            const clickCount = Array.isArray(link.clicks) ? link.clicks.length : 0
            const shortUrl = `https://${link.domains?.domain}/${link.slug}`

            return (
              <Card key={link.id} className="bg-foreground border-zinc-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-lg">{link.title || link.slug}</CardTitle>
                        {getStatusBadge(link.active)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-primary">{shortUrl}</span>
                          <CopyLinkButton url={shortUrl} />
                          <Button variant="ghost" size="sm" asChild className="h-6 w-6 p-0">
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>→</span>
                          <span className="truncate max-w-md">{link.destination_url}</span>
                        </div>
                      </div>
                      {link.description && <CardDescription className="mt-2">{link.description}</CardDescription>}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <BarChart3 className="h-4 w-4" />
                          {clickCount}
                        </div>
                        <div className="text-xs text-muted-foreground">cliques</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Criado em {new Date(link.created_at).toLocaleDateString("pt-BR")} • Domínio:{" "}
                      {link.domains?.domain}
                      {!link.domains?.verified && (
                        <Badge variant="destructive" className="ml-2">
                          Domínio não verificado
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <ToggleLinkButton linkId={link.id} currentStatus={link.active} />
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/links/${link.id}/edit`}>Editar</Link>
                      </Button>
                      <DeleteLinkButton linkId={link.id} linkTitle={link.title || link.slug} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="bg-foreground border border-zinc-700">
          <CardHeader>
            <CardTitle>Nenhum link encontrado</CardTitle>
            <CardDescription>
              Você ainda não criou nenhum link. Crie seu primeiro link curto personalizado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/links/create">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Link
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
