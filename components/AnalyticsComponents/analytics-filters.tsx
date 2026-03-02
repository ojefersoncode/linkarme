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
import { Filter, Grid, Grid2x2, Layout } from 'lucide-react';
import { Button } from '../ui/button';

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
    <div className="flex items-center gap-4">
      <Select value={currentDays.toString()} onValueChange={handleDaysChange}>
        <SelectTrigger className="w-full flex-1 bg-white dark:bg-white hover:bg-white dark:hover:bg-white text-black border-none cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-none shadow-xl bg-white text-black dark:text-black">
          <SelectItem
            className="hover:bg-primary dark:hover:bg-primary"
            value="7"
          >
            7 dias
          </SelectItem>
          <SelectItem
            className="hover:bg-primary dark:hover:bg-primary"
            value="30"
          >
            30 dias
          </SelectItem>
          <SelectItem
            className="hover:bg-primary dark:hover:bg-primary"
            value="90"
          >
            90 dias
          </SelectItem>
          <SelectItem
            className="hover:bg-primary dark:hover:bg-primary"
            value="365"
          >
            Último ano
          </SelectItem>
        </SelectContent>
      </Select>

      <Select value={currentLinkId || 'all'} onValueChange={handleLinkChange}>
        <SelectTrigger className="w-full flex-1 bg-white dark:bg-white hover:bg-white dark:hover:bg-white text-black border-none cursor-pointer">
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
      <Button className="max-sm:hidden bg-white dark:bg-white hover:bg-white dark:hover:bg-white text-black border-none cursor-pointer">
        <Grid2x2 className="size-5" />
      </Button>
    </div>
  );
}
