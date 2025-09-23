"use client"

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ClicksOverTimeChartProps {
  data: Record<string, number>
  days: number
}

export function ClicksOverTimeChart({ data, days }: ClicksOverTimeChartProps) {
  const chartData = []
  const endDate = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(endDate)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]

    chartData.push({
      date: dateStr,
      clicks: data[dateStr] || 0,
      displayDate: date.toLocaleDateString("pt-BR", {
        day: "numeric", // 👈 agora só o dia
      }),
    })
  }

  return (
    <ChartContainer
      config={{
        clicks: {
          label: "Cliques",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px] max-w-sm"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="clicks"
            fill="var(--color-clicks)"
            radius={[6, 6, 0, 0]} // arredonda topo
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
