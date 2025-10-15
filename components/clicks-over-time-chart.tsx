"use client"

import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface ClicksOverTimeTableProps {
  data: Record<string, number>;
}

export function ClicksOverTimeChart({ data }: ClicksOverTimeTableProps) {
  const [days, setDays] = useState<number | 'all'>(7); // valor inicial: 7 dias

  const tableData = useMemo(() => {
    const arr: { date: string; displayDate: string; clicks: number }[] = [];
    const endDate = new Date();

    // pega todas as datas disponíveis se for "all"
    const totalDays =
      days === 'all' ? Object.keys(data).length : (days as number);

    for (let i = totalDays - 1; i >= 0; i--) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      arr.push({
        date: dateStr,
        clicks: data[dateStr] || 0,
        displayDate: date.toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'short'
        })
      });
    }

    return arr;
  }, [data, days]);

  return (
    <div className="w-full space-y-4">
      {/* Select para mudar o período */}
      <div className="flex justify-end">
        <Select
          onValueChange={(val) =>
            setDays(val === 'all' ? 'all' : parseInt(val))
          }
          defaultValue="7"
        >
          <SelectTrigger className="w-[160px] bg-accent/40 dark:bg-accent/40 hover:bg-accent/40 dark:hover:bg-accent/40">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent className="bg-foreground dark:bg-foreground">
            <SelectItem
              className="hover:bg-accent/40 dark:hover:bg-accent/40 text-muted dark:text-muted"
              value="1"
            >
              Últimas 24 horas
            </SelectItem>
            <SelectItem
              className="hover:bg-accent/40 dark:hover:bg-accent/40 text-muted dark:text-muted"
              value="7"
            >
              Últimos 7 dias
            </SelectItem>
            <SelectItem
              className="hover:bg-accent/40 dark:hover:bg-accent/40 text-muted dark:text-muted"
              value="30"
            >
              Últimos 30 dias
            </SelectItem>
            <SelectItem
              className="hover:bg-accent/40 dark:hover:bg-accent/40 text-muted dark:text-muted"
              value="all"
            >
              Todo período
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela */}
      <div className="w-full">
        <Table className="border border-popover dark:border-popover rounded-xl">
          <TableHeader className="px-2 border border-popover dark:border-popover">
            <TableRow className="border border-popover dark:border-popover">
              <TableHead className="text-muted dark:text-muted px-4">
                Data
              </TableHead>
              <TableHead className="text-right text-muted dark:text-muted px-4">
                Cliques
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border border-popover dark:border-popover">
            {tableData.map((row) => (
              <TableRow
                key={row.date}
                className="border border-popover dark:border-popover"
              >
                <TableCell className="px-4">{row.displayDate}</TableCell>
                <TableCell className="text-right px-4">{row.clicks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
