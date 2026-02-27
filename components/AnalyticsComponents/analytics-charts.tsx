'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ClicksOverTimeChart } from '@/components/AnalyticsComponents/clicks-over-time-chart';
import { GeographicChart } from '@/components/AnalyticsComponents/geographic-chart';

interface AnalyticsChartsProps {
  clicksByDay: Record<string, number>;
  clicksByCountry: Record<string, number>;
  days: number;
}

export function AnalyticsCharts({
  clicksByDay,
  clicksByCountry,
  days
}: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 ">
      <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Distribuição Geográfica</CardTitle>
          <CardDescription>Cliques por país</CardDescription>
        </CardHeader>
        <CardContent>
          <GeographicChart data={clicksByCountry} />
        </CardContent>
      </Card>
    </div>
  );
}
