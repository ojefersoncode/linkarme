import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, Copy, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const links = [
  {
    link: 'miiurl.com/abc123',
    linkData: '12/02/2026'
  },
  {
    link: 'Imiiurl.com/teste',
    linkData: '09/02/2026'
  }
];

export default async function QrcodeSaves() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  return (
    <Tabs defaultValue="overview" className="bg-white">
      <TabsList className="w-full bg-background ">
        <TabsTrigger
          className="border-none text-black/80 dark:text-black/80 data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
          value="overview"
        >
          Ativos
        </TabsTrigger>
        <TabsTrigger
          className="border-none text-black/80 dark:text-black/80 data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
          value="analytics"
        >
          Arquivados
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card className="bg-white text-black shadow-none border-none py-2">
          <CardContent className="text-black text-sm p-0">
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
                      <Button className="cursor-pointer text-accent dark:text-accent bg-primary dark:bg-primary hover:bg-primary/40 dark:hover:bg-primary/40 transition-all duration-300">
                        <Copy />
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
                  <Link href="/dashboard/qrcode">
                    <Button className="px-8 cursor-pointer text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
                      <Plus /> <span>Novo Qrcode</span>
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
                      <Button className="cursor-pointer text-accent dark:text-accent bg-primary dark:bg-primary hover:bg-primary/40 dark:hover:bg-primary/40 transition-all duration-300">
                        <Copy />
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
