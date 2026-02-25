import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, Copy, Download, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ExportDataDialog } from '../export-data-dialog';

const links = [
  {
    link: 'Minhaurl.com/abc123',
    linkData: '12/02/2026'
  },
  {
    link: 'Minhaurl.com/teste',
    linkData: '09/02/2026'
  },
  {
    link: 'Minhaurl.com/teste2',
    linkData: '08/02/2026'
  }
];

export default async function Activities() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  // Buscar domínios e links em paralelo
  const [domainsResult, linksResult] = await Promise.all([
    supabase.from('domains').select('id').eq('user_id', user.id),
    supabase
      .from('links')
      .select('id, slug, title, domains (domain)')
      .eq('user_id', user.id)
  ]);

  // Extrair ids dos links
  const linkIds = linksResult.data?.map((l) => l.id) || [];

  // Buscar cliques
  const clicksResult = linkIds.length
    ? await supabase.from('clicks').select('id').in('link_id', linkIds)
    : { data: [], error: null };

  const stats = {
    domains: domainsResult.data?.length || 0,
    links: linksResult.data?.length || 0,
    clicks: clicksResult.data?.length || 0
  };

  // Links para exportação
  const linksForExport =
    linksResult.data?.map((link) => ({
      id: link.id,
      slug: link.slug,
      title: link.title,
      domains: link.domains
    })) || [];
  return (
    <Tabs defaultValue="overview" className="bg-white">
      <TabsList className="w-full bg-background ">
        <TabsTrigger
          className="border-none text-black/80 dark:text-black/80 data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
          value="overview"
        >
          Links
        </TabsTrigger>
        <TabsTrigger
          className="border-none text-black/80 dark:text-black/80 data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
          value="analytics"
        >
          Qrcodes
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card className="bg-white text-black shadow-none border-none py-2">
          <CardContent className="text-black text-sm p-0">
            <div className="flex w-full justify-end px-2 pt-2 pb-4">
              <ExportDataDialog links={linksForExport} />
            </div>
            <Table className="py-0">
              <TableBody className="border-b border-gray-400">
                {links.map((links) => (
                  <TableRow
                    className="border-b border-gray-400"
                    key={links.link}
                  >
                    <TableCell className="font-medium">{links.link}</TableCell>
                    <TableCell className="font-medium">
                      {links.linkData}
                    </TableCell>
                    <TableCell className="text-right ">
                      <Button className="bg-transparent hover:bg-transparente dark:hover:bg-transparente cursor-pointer border-none">
                        <Copy className="w-5 h-5 text-black" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex max-w-full bg-transparent border-none">
              <div className="flex w-full items-center justify-between pt-4">
                <div className="flex items-center gap-4">
                  <Button className="cursor-pointer text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
                    <ArrowLeft />
                  </Button>
                  <Button className="cursor-pointer text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
                    <ArrowRight />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <Link href="/dashboard/links">
                    <Button className="px-8 cursor-pointer text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
                      <Plus /> <span>Novo link</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card className="bg-white text-black shadow-none border-none">
          <CardContent className="text-black text-sm px-0">
            <Table>
              <TableBody className="border-b border-gray-400">
                {links.map((links) => (
                  <TableRow
                    className="border-b border-gray-400"
                    key={links.link}
                  >
                    <TableCell className="font-medium">{links.link}</TableCell>
                    <TableCell className="font-medium">
                      {links.linkData}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button className="bg-foreground hover:bg-foreground/80 transition-all duration-300 cursor-pointer border-none">
                        <Download className="w-5 h-5 text-white" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="flex w-full bg-transparent border-none">
                <div className="flex w-full items-center gap-4 pt-4">
                  <Button className="cursor-pointer text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
                    <ArrowLeft />
                  </Button>
                  <Button className="cursor-pointer text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
                    <ArrowRight />
                  </Button>
                </div>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
