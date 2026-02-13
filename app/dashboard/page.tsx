import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Globe, Link2, BarChart3, TrendingUp } from 'lucide-react';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDashboard } from '@/components/Dashboard/Calendar';
import Activities from '@/components/Dashboard/Activities';
import QrcodeSaves from '@/components/Dashboard/qrcode-saves';

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

      <div className=" space-y-4 md:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-md:px-4">
          <div className="bg-foreground shadow shadow-primary pr-1 rounded-2xl">
            <Card className="bg-white border-none gap-2">
              <CardHeader className="flex flex-row items-center justify-between pb-0">
                <CardTitle className="text-sm text-black font-medium py-0">
                  Domínios
                </CardTitle>
                <Globe className="h-5 w-5 text-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-black">
                  {stats.domains}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-foreground shadow shadow-primary pr-1 rounded-2xl">
            <Card className="bg-white border-none gap-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm text-black font-medium">
                  Links
                </CardTitle>
                <Link2 className="h-5 w-5 text-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">
                  {stats.links}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-foreground pr-1 rounded-2xl">
            <Card className="bg-white border-none gap-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm text-black font-medium">
                  Cliques
                </CardTitle>

                <BarChart3 className="h-5 w-5 text-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">
                  {stats.clicks}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-foreground shadow shadow-primary pr-1 rounded-2xl">
            <Card className="bg-white border-none gap-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-black text-sm font-medium">
                  Taxa de Cliques
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">
                  {stats.links > 0 ? Math.round(stats.clicks / stats.links) : 0}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pb-6 max-md:px-4 shadow shadow-primary">
          <Card className="bg-white shadow shadow-primary p-4 border-none">
            <CardHeader className="p-0">
              <h1 className="text-xl px-2 pt-2 md:text-3xl font-semibold text-black">
                Seus Links
              </h1>
            </CardHeader>
            <Activities />
          </Card>

          <Card className="bg-white shadow shadow-primary border-none p-4">
            <CardHeader className="p-0">
              <h1 className="text-xl px-2 pt-2 md:text-3xl font-semibold text-black">
                Seus Qrcodes
              </h1>
            </CardHeader>
            <QrcodeSaves />
          </Card>
        </div>
      </div>
    </div>
  );
}
