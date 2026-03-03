import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ChartOverViewClient } from './chart-overview-client';

export default async function ChartOverView({
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
    const userLinksQuery = await supabase
      .from('links')
      .select('id')
      .eq('user_id', user.id);

    if (userLinksQuery.error) {
      throw userLinksQuery.error;
    }

    const userLinkIds = userLinksQuery.data.map((link) => link.id);

    const [totalClicksResult, uniqueVisitorsResult, clicksByCountryResult] =
      await Promise.all([
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

        supabase
          .from('links')
          .select('id, slug, title, domains (domain)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      ]);

    if (totalClicksResult.error) throw totalClicksResult.error;
    if (uniqueVisitorsResult.error) throw uniqueVisitorsResult.error;
    if (clicksByCountryResult.error) throw clicksByCountryResult.error;

    const totalClicks = totalClicksResult.count || 0;
    const uniqueVisitors = uniqueVisitorsResult.data
      ? new Set(uniqueVisitorsResult.data.map((item: any) => item.ip_hash)).size
      : 0;

    const clicksByCountry =
      clicksByCountryResult.data?.reduce(
        (acc: Record<string, number>, click: any) => {
          const country = click.country || 'Unknown';
          acc[country] = (acc[country] || 0) + 1;
          return acc;
        },
        {}
      ) || {};

    return (
      <ChartOverViewClient
        totalClicks={totalClicks}
        uniqueVisitors={uniqueVisitors}
        clicksByCountry={clicksByCountry}
        days={days}
      />
    );
  } catch (err) {
    console.error('Analytics error:', err);
    return <div>Error loading analytics.</div>;
  }
}
