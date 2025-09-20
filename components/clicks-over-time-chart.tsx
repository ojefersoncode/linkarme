"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ClicksOverTimeChartProps {
  data: Record<string, number>
  days: number
}

export function ClicksOverTimeChart({ data, days }: ClicksOverTimeChartProps) {
  // Generate array of dates for the period
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
        month: "short",
        day: "numeric",
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
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="var(--color-clicks)"
            strokeWidth={2}
            dot={{ fill: "var(--color-clicks)", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
