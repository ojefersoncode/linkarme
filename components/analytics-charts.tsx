"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyticsTablesProps {
  clicksByDay: Record<string, number>
  clicksByCountry: Record<string, number>
  days: number
}

export function AnalyticsCharts({ clicksByDay, clicksByCountry, days }: AnalyticsTablesProps) {
  // Preparar dados dos cliques por dia
  const dayEntries = Object.entries(clicksByDay)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())

  // Preparar dados dos cliques por país (ordenado por quantidade de cliques)
  const countryEntries = Object.entries(clicksByCountry)
    .sort(([, a], [, b]) => b - a)

  // Calcular totais
  const totalClicksByDay = Object.values(clicksByDay).reduce((sum, clicks) => sum + clicks, 0)
  const totalClicksByCountry = Object.values(clicksByCountry).reduce((sum, clicks) => sum + clicks, 0)

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-popover">
        <CardHeader>
          <CardTitle>Cliques ao Longo do Tempo</CardTitle>
          <CardDescription>
            Evolução dos cliques nos últimos {days} dias (Total:{' '}
            {totalClicksByDay} cliques)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-background border-b">
                <tr>
                  <th className="text-left py-2 px-3 font-medium">Data</th>
                  <th className="text-right py-2 px-3 font-medium">Cliques</th>
                  <th className="text-right py-2 px-3 font-medium">%</th>
                </tr>
              </thead>
              <tbody>
                {dayEntries.map(([day, clicks]) => {
                  const percentage =
                    totalClicksByDay > 0
                      ? ((clicks / totalClicksByDay) * 100).toFixed(1)
                      : '0.0';
                  return (
                    <tr key={day} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-3">{formatDate(day)}</td>
                      <td className="text-right py-2 px-3 font-mono">
                        {clicks}
                      </td>
                      <td className="text-right py-2 px-3 text-muted-foreground">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {dayEntries.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum dado disponível para o período selecionado
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição Geográfica</CardTitle>
          <CardDescription>
            Cliques por país (Total: {totalClicksByCountry} cliques)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-background border-b">
                <tr>
                  <th className="text-left py-2 px-3 font-medium">País</th>
                  <th className="text-right py-2 px-3 font-medium">Cliques</th>
                  <th className="text-right py-2 px-3 font-medium">%</th>
                </tr>
              </thead>
              <tbody>
                {countryEntries.map(([country, clicks]) => {
                  const percentage =
                    totalClicksByCountry > 0
                      ? ((clicks / totalClicksByCountry) * 100).toFixed(1)
                      : '0.0';
                  return (
                    <tr key={country} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-3">{country || 'Desconhecido'}</td>
                      <td className="text-right py-2 px-3 font-mono">
                        {clicks}
                      </td>
                      <td className="text-right py-2 px-3 text-muted-foreground">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {countryEntries.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum dado geográfico disponível
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}