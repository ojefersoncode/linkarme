'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Filter } from 'lucide-react';

interface Link {
  id: string;
  slug: string;
  title: string | null;
  domains: { domain: string } | null;
}

interface AnalyticsFiltersProps {
  links: Link[];
  currentDays: number;
  currentLinkId: string | null;
}

export function AnalyticsFilters({
  links,
  currentDays,
  currentLinkId
}: AnalyticsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDaysChange = (days: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('days', days);
    router.push(`/dashboard/analytics?${params.toString()}`);
  };

  const handleLinkChange = (linkId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (linkId === 'all') {
      params.delete('link_id');
    } else {
      params.set('link_id', linkId);
    }
    router.push(`/dashboard/analytics?${params.toString()}`);
  };

  return (
          <Card className="bg-foreground border-zinc-700">
      <CardContent>
        <div className="flex items-center w-full justify-between pb-4">
          <h1 className='font-bold '>Filtro</h1>
          <Filter className="h-4 w-4 text-yellow-500" />
        </div>
        <div className="flex w-full items-center gap-4">
          <Select
            value={currentDays.toString()}
            onValueChange={handleDaysChange}
          >
            <SelectTrigger className="w-[180px] bg-yellow-500 dark:bg-background hover:bg-background dark:hover:bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='bg-background dark:bg-background hover:bg-background dark:hover:bg-background'>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="365">Último ano</SelectItem>
            </SelectContent>
          </Select>

          <Select
        
            value={currentLinkId || 'all'}
            onValueChange={handleLinkChange}
          >
            <SelectTrigger className="w-[250px] bg-background dark:bg-background hover:bg-background dark:hover:bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className='bg-background dark:bg-background hover:bg-background dark:hover:bg-background' value="all">Todos os links</SelectItem>
              {links.map((link) => (
                <SelectItem key={link.id} value={link.id}>
                  {link.domains?.domain}/{link.slug}{' '}
                  {link.title && `- ${link.title}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
