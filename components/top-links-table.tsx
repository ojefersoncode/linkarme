"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { CopyLinkButton } from "@/components/copy-link-button"

interface TopLink {
  id: string
  slug: string
  title: string | null
  destination_url: string
  domains: { domain: string } | null
  click_count: number
}

interface TopLinksTableProps {
  links: TopLink[]
}

export function TopLinksTable({ links }: TopLinksTableProps) {
  if (links.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhum link com cliques no período selecionado</div>
  }

  return (
    <div className="rounded-md border border-accent/40 dark:bg-accent/40">
      <Table className="bg-foreground">
        <TableHeader>
          <TableRow>
            <TableHead className="text-muted dark:text-muted">Link</TableHead>
            <TableHead className="text-muted dark:text-muted">
              Destino
            </TableHead>
            <TableHead className="text-right text-muted dark:text-muted">
              Cliques
            </TableHead>
            <TableHead className="w-[100px] text-muted dark:text-muted">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link, index) => {
            const shortUrl = `https://${link.domains?.domain}/${link.slug}`;

            return (
              <TableRow key={link.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs text-muted dark:text-muted"
                      >
                        #{index + 1}
                      </Badge>
                      <span className="font-medium text-muted">{shortUrl}</span>
                    </div>
                    {link.title && (
                      <div className="text-sm text-muted">{link.title}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs truncate text-sm text-muted-foreground">
                    {link.destination_url}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge className="bg-transparent dark:bg-transparent text-muted dark:text-muted">
                    {link.click_count.toLocaleString()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CopyLinkButton url={shortUrl} />
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="h-6 w-6 p-0"
                    >
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
