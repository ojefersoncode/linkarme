import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Globe, Link2, BarChart3, TrendingUp } from 'lucide-react';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Activities from '@/components/Dashboard/Activities';
import Campaigns from '@/components/Dashboard/Campaigns';

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
    <div className="space-y-4 bg-[#eeeeee] min-h-screen">
      <NavbarDashboard />

      <div className="grid md:grid-cols-2 gap-4 pb-6 px-4 shadow shadow-primary">
        <Card className="bg-white shadow shadow-primary p-4 rounded border-none">
          <CardHeader className="p-0">
            <h1 className="text-xl px-2 pt-2 md:text-3xl font-semibold text-black">
              Atividades Recentes
            </h1>
          </CardHeader>
          <Activities />
        </Card>
        <Card className="bg-white shadow shadow-primary border-none rounded p-4">
          <CardHeader className="p-0">
            <h1 className="text-xl px-2 pt-2 md:text-3xl font-semibold text-black">
              Campanhas Recentes
            </h1>
          </CardHeader>
          <Campaigns />
        </Card>
      </div>
    </div>
  );
}
