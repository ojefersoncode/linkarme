'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Filter } from 'lucide-react';

interface Link {
  id: string;
  slug: string;
  title: string | null;
  domains: { domain: string }[];
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
    <Card className="flex-1 bg-white border-none rounded-md text-black">
      <CardContent className="space-y-6">
        <div className="flex items-center w-full gap-4">
          <Filter className="h-4 w-4 text-black" />
          <h1 className="font-semibold text-sm">Filtro</h1>
        </div>
        <div className="flex w-full items-center gap-4">
          <Select
            value={currentDays.toString()}
            onValueChange={handleDaysChange}
          >
            <SelectTrigger className="w-full flex-1 bg-white dark:bg-white hover:bg-white dark:hover:bg-white border-black/40 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-none shadow-xl bg-white text-black dark:text-black">
              <SelectItem
                className="hover:bg-primary dark:hover:bg-primary"
                value="7"
              >
                Últimos 7 dias
              </SelectItem>
              <SelectItem
                className="hover:bg-primary dark:hover:bg-primary"
                value="30"
              >
                Últimos 30 dias
              </SelectItem>
              <SelectItem
                className="hover:bg-primary dark:hover:bg-primary"
                value="90"
              >
                Últimos 90 dias
              </SelectItem>
              <SelectItem
                className="hover:bg-primary dark:hover:bg-primary"
                value="365"
              >
                Último ano
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={currentLinkId || 'all'}
            onValueChange={handleLinkChange}
          >
            <SelectTrigger className="w-full flex-1 bg-white dark:bg-white hover:bg-white dark:hover:bg-white border-black/40 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-none shadow-xl bg-white text-black dark:text-black">
              <SelectItem
                className="hover:bg-background dark:hover:bg-background text-black dark:text-black"
                value="all"
              >
                Todos os links
              </SelectItem>
              {links.map((link) => (
                <SelectItem key={link.id} value={link.id}>
                  {link.domains?.[0]?.domain}/{link.slug}{' '}
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
