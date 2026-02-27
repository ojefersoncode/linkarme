"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface GeographicChartProps {
  data: Record<string, number>
}

export function GeographicChart({ data }: GeographicChartProps) {
  // Convert data to chart format and sort by clicks
  const chartData = Object.entries(data)
    .map(([country, clicks]) => ({
      country: country.length > 12 ? `${country.substring(0, 12)}...` : country,
      fullCountry: country,
      clicks,
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10) // Top 10 countries

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        Nenhum dado geográfico disponível
      </div>
    )
  }

  return (
    <ChartContainer
      config={{
        clicks: {
          label: "Cliques",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="horizontal">
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="country" tick={{ fontSize: 12 }} width={80} />
          <ChartTooltip
            content={<ChartTooltipContent />}
            labelFormatter={(label, payload) => {
              const item = payload?.[0]?.payload
              return item?.fullCountry || label
            }}
          />
          <Bar dataKey="clicks" fill="var(--color-clicks)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
