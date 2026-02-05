import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Link2, BarChart3, TrendingUp } from 'lucide-react';
import { ExportDataDialog } from '@/components/export-data-dialog';
import { MenuMobile } from '@/components/menu-mobile';
import DemographicCard from '@/components/Map/DemographicCard';
import { ProfileButton } from '@/components/profile-button';
import Image from 'next/image';
import { Search } from '@/components/Dashboard/Search';

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
    <div className="md:p-6 space-y-6 bg-background h-screen">
      <div className="flex items-center justify-between bg-white shadow-xl/40 shadow-primary border-b border-accent/30 md:hidden">
        <div className="flex items-center gap-1 px-2 py-3">
          <MenuMobile />
          <Image
            src={'icon.png'}
            height={100}
            width={100}
            alt="logo"
            className="w-8 h-8"
          />
        </div>

        <div className="flex items-center gap-4 pr-4">
          <Search />
          <ProfileButton />
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-md:py-2 max-md:hidden">
        <h1 className="text-base md:text-xl font-bold text-foreground">
          Dashboard
        </h1>

        <div className="flex items-center gap-4 max-md:justify-end max-md:w-full">
          <Search />

          <ExportDataDialog links={linksForExport} />

          <ProfileButton />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-md:px-4 bg-background">
        <div className="md:hidden">
          <ExportDataDialog links={linksForExport} />
        </div>
        <Card className="bg-white shadow-xl/40 shadow-primary border-none gap-2">
          <CardHeader className="flex flex-row items-center justify-between pb-0">
            <CardTitle className="text-sm text-accent font-medium py-0">
              Domínios
            </CardTitle>
            <div className="bg-background p-1 rounded-sm">
              <Globe className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-foreground">
              {stats.domains}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl/40 shadow-primary border-none gap-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-accent font-medium">
              Links
            </CardTitle>
            <div className="bg-background p-1 rounded-sm">
              <Link2 className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.links}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl/40 shadow-primary border-none gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm text-accent font-medium">
              Cliques
            </CardTitle>
            <div className="bg-background p-1 rounded-sm">
              <BarChart3 className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.clicks}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl/40 shadow-primary border-none gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-accent text-sm font-medium">
              Taxa de Cliques
            </CardTitle>
            <div className="bg-background p-1 rounded-sm">
              <TrendingUp className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.links > 0 ? Math.round(stats.clicks / stats.links) : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pb-6 max-md:px-4 flex-1 w-full">
        <DemographicCard />
      </div>
    </div>
  );
}
