import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Globe, Link2, BarChart3, TrendingUp } from 'lucide-react';
import { ExportDataDialog } from '@/components/export-data-dialog';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';
import Climate from '@/components/Dashboard/Climate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activities } from '@/components/Dashboard/Activities';
import { CalendarDashboard } from '@/components/Dashboard/Calendar';

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
    <div className="space-y-6 bg-[#eeeeee] h-screen">
      <NavbarDashboard />

      <div className="px-4 md:px-6">
        <Climate />
      </div>

      <div className=" space-y-4 md:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-md:px-4">
          <Card className="bg-white shadow shadow-primary border-none gap-2">
            <CardHeader className="flex flex-row items-center justify-between pb-0">
              <CardTitle className="text-sm text-accent font-medium py-0">
                Domínios
              </CardTitle>
              <div className="bg-primary p-1 rounded-sm">
                <Globe className="h-4 w-4 text-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-accent">
                {stats.domains}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow shadow-primary border-none gap-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-accent font-medium">
                Links
              </CardTitle>
              <div className="bg-primary p-1 rounded-sm">
                <Link2 className="h-4 w-4 text-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {stats.links}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow shadow-primary border-none gap-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-accent font-medium">
                Cliques
              </CardTitle>
              <div className="bg-primary p-1 rounded-sm">
                <BarChart3 className="h-4 w-4 text-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {stats.clicks}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow shadow-primary border-none gap-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-accent text-sm font-medium">
                Taxa de Cliques
              </CardTitle>
              <div className="bg-primary p-1 rounded-sm">
                <TrendingUp className="h-4 w-4 text-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {stats.links > 0 ? Math.round(stats.clicks / stats.links) : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pb-6 max-md:px-4 shadow shadow-primary">
          <Card className="bg-white shadow shadow-primary p-4 border-none">
            <Activities />
          </Card>

          <Card className="bg-white shadow shadow-primary border-none p-4">
            <CalendarDashboard />
          </Card>
        </div>
      </div>
    </div>
  );
}
