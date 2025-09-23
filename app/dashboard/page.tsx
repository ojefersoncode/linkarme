import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Globe, Link2, BarChart3, TrendingUp } from 'lucide-react';
import { ExportDataDialog } from '@/components/export-data-dialog';
import { MenuMobile } from '@/components/menu-mobile';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  // Buscar domínios e links em paralelo
  const [domainsResult, linksResult] = await Promise.all([
    supabase.from('domains').select('id').eq('user_id', user.id),
    supabase
      .from('links')
      .select('id, slug, title, domains (domain)')
      .eq('user_id', user.id)
  ]);

  // Extrair ids dos links
  const linkIds = linksResult.data?.map((l) => l.id) || [];

  // Buscar cliques
  const clicksResult = linkIds.length
    ? await supabase.from('clicks').select('id').in('link_id', linkIds)
    : { data: [], error: null };

  const stats = {
    domains: domainsResult.data?.length || 0,
    links: linksResult.data?.length || 0,
    clicks: clicksResult.data?.length || 0
  };

  // Links para exportação
  const linksForExport =
    linksResult.data?.map((link) => ({
      id: link.id,
      slug: link.slug,
      title: link.title,
      domains: link.domains
    })) || [];

  return (
    <div className="md:p-6 space-y-6">
      <div className="flex items-center justify-between bg-foreground border-b border-accent/30 md:hidden">
        <div className="flex items-center gap-1 px-2 py-3">
          <MenuMobile /> <img src="/logo.png" alt="" className="h-6" />
        </div>
        <div className="px-4">
          <ExportDataDialog links={linksForExport} />
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-md:py-2 max-md:hidden">
        <h1 className="text-base md:text-xl font-bold text-muted-foreground">Dashboard</h1>
        <div className="max-md:justify-end max-md:w-full">
          <ExportDataDialog links={linksForExport} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-md:px-4">
        <Card className="bg-foreground border-accent/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Domínios</CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.domains}</div>
            <p className="text-xs text-muted-foreground">
              domínios configurados
            </p>
          </CardContent>
        </Card>

        <Card className="bg-foreground border-accent/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Links</CardTitle>
            <Link2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.links}</div>
            <p className="text-xs text-muted-foreground">links criados</p>
          </CardContent>
        </Card>

        <Card className="bg-foreground border-accent/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cliques</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clicks}</div>
            <p className="text-xs text-muted-foreground">cliques totais</p>
          </CardContent>
        </Card>

        <Card className="bg-foreground border-accent/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Cliques
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.links > 0 ? Math.round(stats.clicks / stats.links) : 0}
            </div>
            <p className="text-xs text-muted-foreground">cliques por link</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 max-md:px-4 pb-4 md:grid-cols-2">
        <Card className="bg-foreground border-accent/30">
          <CardHeader>
            <CardTitle>Primeiros Passos</CardTitle>
            <CardDescription>
              Configure seu primeiro domínio para começar a criar links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">1. Adicione um domínio personalizado</p>
              <p className="text-sm">2. Verifique a propriedade do domínio</p>
              <p className="text-sm">3. Crie seus primeiros links curtos</p>
              <p className="text-sm">4. Acompanhe as estatísticas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-foreground border-accent/30">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Suas últimas ações na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Nenhuma atividade recente encontrada.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
