import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { AnalyticsFilters } from '@/components/analytics-filters';
import { TopLinksTable } from '@/components/top-links-table';
import { ClicksOverTimeChart } from '@/components/clicks-over-time-chart';
import { GeographicChart } from '@/components/geographic-chart';
import { ExportDataDialog } from '@/components/export-data-dialog';
import { BarChart3, TrendingUp, Globe, Users } from 'lucide-react';
import { MenuMobile } from '@/components/menu-mobile';



export default async function AnalyticsPage({
  searchParams
}: {
  searchParams: Promise<{ days?: string; link_id?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  const days = Number.parseInt(params.days || '30');
  const linkId = params.link_id || null;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    // Get user's links first for subquery
    const userLinksQuery = await supabase
      .from('links')
      .select('id')
      .eq('user_id', user.id);

    if (userLinksQuery.error) {
      throw userLinksQuery.error;
    }

    const userLinkIds = userLinksQuery.data.map((link) => link.id);

    // Get analytics data
    const [
      totalClicksResult,
      uniqueVisitorsResult,
      clicksByDayResult,
      clicksByCountryResult,
      topLinksResult,
      userLinksResult
    ] = await Promise.all([
      // Total clicks
      linkId
        ? supabase
            .from('clicks')
            .select('id', { count: 'exact' })
            .eq('link_id', linkId)
            .gte('clicked_at', startDate.toISOString())
        : supabase
            .from('clicks')
            .select('id', { count: 'exact' })
            .in('link_id', userLinkIds)
            .gte('clicked_at', startDate.toISOString()),

      // Unique visitors
      linkId
        ? supabase
            .from('clicks')
            .select('ip_hash')
            .eq('link_id', linkId)
            .gte('clicked_at', startDate.toISOString())
        : supabase
            .from('clicks')
            .select('ip_hash')
            .in('link_id', userLinkIds)
            .gte('clicked_at', startDate.toISOString()),

      // Clicks by day
      linkId
        ? supabase
            .from('clicks')
            .select('clicked_at')
            .eq('link_id', linkId)
            .gte('clicked_at', startDate.toISOString())
        : supabase
            .from('clicks')
            .select('clicked_at')
            .in('link_id', userLinkIds)
            .gte('clicked_at', startDate.toISOString()),

      // Clicks by country
      linkId
        ? supabase
            .from('clicks')
            .select('country')
            .eq('link_id', linkId)
            .gte('clicked_at', startDate.toISOString())
            .not('country', 'is', null)
        : supabase
            .from('clicks')
            .select('country')
            .in('link_id', userLinkIds)
            .gte('clicked_at', startDate.toISOString())
            .not('country', 'is', null),

      // Top links
      supabase
        .from('links')
        .select(
          `
          id,
          slug,
          title,
          destination_url,
          domains (domain),
          clicks (
            id,
            clicked_at
          )
        `
        )
        .eq('user_id', user.id)
        .gte('clicks.clicked_at', startDate.toISOString()),

      // User's links for filter
      supabase
        .from('links')
        .select('id, slug, title, domains (domain)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
    ]);

    // Check for errors in results
    if (totalClicksResult.error) throw totalClicksResult.error;
    if (uniqueVisitorsResult.error) throw uniqueVisitorsResult.error;
    if (clicksByDayResult.error) throw clicksByDayResult.error;
    if (clicksByCountryResult.error) throw clicksByCountryResult.error;
    if (topLinksResult.error) throw topLinksResult.error;
    if (userLinksResult.error) throw userLinksResult.error;

    // Process data
    const totalClicks = totalClicksResult.count || 0;
    const uniqueVisitors = uniqueVisitorsResult.data
      ? new Set(uniqueVisitorsResult.data.map((item: any) => item.ip_hash)).size
      : 0;

    // Group clicks by day
    const clicksByDay =
      clicksByDayResult.data?.reduce(
        (acc: Record<string, number>, click: any) => {
          const date = new Date(click.clicked_at).toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {}
      ) || {};

    // Group clicks by country
    const clicksByCountry =
      clicksByCountryResult.data?.reduce(
        (acc: Record<string, number>, click: any) => {
          const country = click.country || 'Unknown';
          acc[country] = (acc[country] || 0) + 1;
          return acc;
        },
        {}
      ) || {};

    // Process top links
    const topLinks =
      topLinksResult.data
        ?.map((link: any) => ({
          ...link,
          click_count: Array.isArray(link.clicks) ? link.clicks.length : 0
        }))
        .sort((a: any, b: any) => b.click_count - a.click_count)
        .slice(0, 10) || [];

    const userLinks = userLinksResult.data || [];

    return (
      <div className="p-6 max-md:p-0 space-y-6">
        <div className="flex items-center justify-between bg-foreground border-b border-accent/30 md:hidden">
          <div className="flex items-center gap-1 py-3">
            <MenuMobile /> <img src="/logo.png" alt="" className="h-6" />
          </div>
          <div className="flex items-center px-4">
            <ExportDataDialog links={userLinks} />
          </div>
        </div>

        <div className="flex items-center justify-between max-md:hidden">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
          </div>

          <div className="flex items-center gap-4">
            <ExportDataDialog links={userLinks} />
          </div>
        </div>

        <div className="max-md:px-4">
          <AnalyticsFilters
            links={userLinks}
            currentDays={days}
            currentLinkId={linkId}
          />
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-md:px-4">
          <Card className="bg-foreground border-accent/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Cliques
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalClicks.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                últimos {days} dias
              </p>
            </CardContent>
          </Card>

          <Card className="bg-foreground border-accent/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Visitantes Únicos
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {uniqueVisitors.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                baseado em IPs únicos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-foreground border-accent/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taxa de Cliques
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {uniqueVisitors > 0
                  ? (totalClicks / uniqueVisitors).toFixed(1)
                  : '0'}
              </div>
              <p className="text-xs text-muted-foreground">
                cliques por visitante
              </p>
            </CardContent>
          </Card>

          <Card className="bg-foreground border-accent/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Países</CardTitle>
              <Globe className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.keys(clicksByCountry).length}
              </div>
              <p className="text-xs text-muted-foreground">países diferentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 max-md:px-4">
          <Card className="bg-foreground border-accent/40">
            <CardHeader>
              <CardTitle>Cliques ao Longo do Tempo</CardTitle>
              <CardDescription>
                Visualize a evolução dos cliques nos últimos {days} dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClicksOverTimeChart data={clicksByDay} days={days} />
            </CardContent>
          </Card>

          <Card className="bg-foreground border-accent/40">
            <CardHeader>
              <CardTitle>Distribuição Geográfica</CardTitle>
              <CardDescription>Cliques por país</CardDescription>
            </CardHeader>
            <CardContent>
              <GeographicChart data={clicksByCountry} />
            </CardContent>
          </Card>
        </div>

        {/* Top Links Table */}
        <div className="max-md:px-4 max-md:pb-4">
          <Card className="bg-foreground border-accent/40">
            <CardHeader>
              <CardTitle>Links Mais Acessados</CardTitle>
              <CardDescription>
                Seus links com melhor performance nos últimos {days} dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TopLinksTable links={topLinks} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Analytics page error:', error);
    // Você pode retornar uma página de erro ou redirecionar
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Erro ao carregar analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Ocorreu um erro ao buscar os dados. Tente novamente.
          </p>
        </div>
      </div>
    );
  }
}
