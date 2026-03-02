'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { createClient } from '@/lib/supabase/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import { redirect } from 'next/navigation';
interface Link {
  id: string;
  slug: string;
  title: string | null;
  domains: { domain: string }[];
}

const chartData = [{ month: 'january', desktop: 1260, mobile: 570 }];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)'
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig;

export default async function ChartOverView({
  searchParams
}: {
  searchParams: Promise<{ days?: string; link_id?: string }>;
}) {
  const supabase = createClient();
  const params = await searchParams;

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  const totalVisitors = chartData[0].desktop + chartData[0].mobile;

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
      topLinksResult
    ] = await Promise.all([
      // Total de clicks
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

      // Visitas unicas
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
    if (clicksByCountryResult.error) throw clicksByCountryResult.error;

    // Process data
    const totalClicks = totalClicksResult.count || 0;
    const uniqueVisitors = uniqueVisitorsResult.data
      ? new Set(uniqueVisitorsResult.data.map((item: any) => item.ip_hash)).size
      : 0;

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

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="flex flex-col bg-white border-none text-black pb-0">
          <CardHeader className="items-center pb-0">
            <CardTitle>Total de clicks</CardTitle>
            <CardDescription className="pb-4">
              Quantidade de cliques geral
            </CardDescription>
          </CardHeader>
          <CardContent className="flex  items-center pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[250px] pb-0"
            >
              <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-black text-2xl font-bold"
                            >
                              {totalClicks.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              {days} dias
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="desktop"
                  stackId="a"
                  cornerRadius={5}
                  fill="var(--color-desktop)"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="mobile"
                  fill="var(--color-mobile)"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col bg-white border-none text-black pb-0">
          <CardHeader className="items-center pb-0">
            <CardTitle>Visitantes unicos</CardTitle>
            <CardDescription className="pb-4">
              Quantidade de cliques unicos
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[250px] pb-0"
            >
              <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-black text-2xl font-bold"
                            >
                              {uniqueVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              Visitas
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="desktop"
                  stackId="a"
                  cornerRadius={5}
                  fill="var(--color-desktop)"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="mobile"
                  fill="var(--color-mobile)"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col bg-white border-none text-black pb-0">
          <CardHeader className="items-center pb-0">
            <CardTitle>Taxa de conversão</CardTitle>
            <CardDescription className="pb-4">
              Conversões validadas
            </CardDescription>
          </CardHeader>

          <CardContent className="flex items-center pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[250px] pb-0"
            >
              <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-black text-2xl font-bold"
                            >
                              {uniqueVisitors > 0
                                ? (totalClicks / uniqueVisitors).toFixed(1)
                                : '0'}
                              %
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              Clicks
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="desktop"
                  stackId="a"
                  cornerRadius={5}
                  fill="var(--color-desktop)"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="mobile"
                  fill="var(--color-mobile)"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col space-y-0 gap-4 bg-white border-none text-black pb-0">
          <CardHeader className="items-center pb-0">
            <CardTitle>Paises</CardTitle>

            <CardDescription className="pb-4">
              Paises alcançados
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[250px] pb-0"
            >
              <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-black text-2xl font-bold"
                            >
                              {Object.keys(clicksByCountry).length}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="desktop"
                  stackId="a"
                  cornerRadius={5}
                  fill="var(--color-desktop)"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="mobile"
                  fill="var(--color-mobile)"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  } catch (err) {
    console.error('Analytics error:', err);
    return <div>Error loading analytics.</div>;
  }
}
