'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

interface ClicksOverTimeChartProps {
  data: Record<string, number>;
  days: number;
}

const chartConfig = {
  clicks: {
    label: 'Cliques',
    color: 'hsl(var(--chart-1))'
  }
};

export function ClicksOverTimeChart({ data, days }: ClicksOverTimeChartProps) {
  const chartData = [];
  const endDate = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    chartData.push({
      date: dateStr,
      clicks: data[dateStr] || 0,
      displayDate: date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short'
      })
    });
  }

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart data={chartData}>
        <XAxis
          dataKey="displayDate"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          allowDecimals={false}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => payload?.[0]?.payload?.date ?? ''}
            />
          }
        />
        <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
