import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { AnalyticsFilters } from '@/components/AnalyticsComponents/analytics-filters';
import { TopLinksTable } from '@/components/AnalyticsComponents/top-links-table';
import { ExportDataDialog } from '@/components/export-data-dialog';
import { BarChart3, TrendingUp, Globe, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';
import { ChartClicks } from '@/components/AnalyticsComponents/Chart-clicks';
import ChartOverView from '@/components/AnalyticsComponents/ChartOverView';

interface Link {
  id: string;
  slug: string;
  title: string | null;
  domains: { domain: string }[];
}

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
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-foreground border-b border-accent/30 ">
          <NavbarDashboard />
        </div>

        <div className="flex items-center justify-between px-4">
          <ExportDataDialog links={userLinks} />

          <AnalyticsFilters
            links={userLinks}
            currentDays={days}
            currentLinkId={linkId}
          />
        </div>

        <div className="px-4">
          <ChartOverView searchParams={searchParams} />
        </div>

        {/* Charts */}
        <div className="grid px-4">
          <ChartClicks />
        </div>

        {/* Top Links Table */}
        <div className="px-4 pb-4">
          <Card className="bg-white text-black border-none rounded-md gap-2">
            <CardHeader>
              <CardTitle className="text-black">Links Mais Acessados</CardTitle>
              <CardDescription className="text-black">
                Seus links com melhor performance nos últimos {days} dias
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
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
      <div className="flex w-full h-screen justify-center px-6">
        <div className="flex flex-col w-full justify-center text-center">
          <div className="justify-center text-center mb-2">
            <span className="bg-foreground/20 py-1 px-2 font-mono rounded-sm text-lg">
              404
            </span>
          </div>
          <h1 className="text-2xl md:text-5xl font-bold text-accent/90">
            Voçe não possui links cadastrados
          </h1>
          <p className="text-xl md:text-3xl font-semibold text-foreground/80 mb-4">
            Cadastre um link e tente novamente
          </p>

          <div>
            <Button className="px-8 md:w-40 cursor-pointer text-sm font-semibold bg-white hover:bg-white/80 text-foreground hover:text-foreground transition-all duration-200">
              <Link href={'/dashboard/links'}>Criar link </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
