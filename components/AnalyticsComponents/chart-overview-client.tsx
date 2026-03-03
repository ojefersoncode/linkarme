'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
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

interface Link {
  id: string;
  slug: string;
  title: string | null;
  domains: { domain: string }[];
}

interface ChartOverViewClientProps {
  totalClicks: number;
  uniqueVisitors: number;
  clicksByCountry: Record<string, number>;
  days: number;
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

export function ChartOverViewClient({
  totalClicks,
  uniqueVisitors,
  clicksByCountry,
  days
}: ChartOverViewClientProps) {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card className="flex flex-col bg-white border-none text-black  pb-0">
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
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
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
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
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
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
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

          <CardDescription className="pb-4">Paises alcançados</CardDescription>
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
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
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
}
