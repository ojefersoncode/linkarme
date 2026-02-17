import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, Eye, Pencil, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const links = [
  {
    link: 'Rastrear cliques',
    linkData: '12/02/2026'
  },
  {
    link: 'Campanha de teste',
    linkData: '09/02/2026'
  }
];

export default async function Campaigns() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  return (
    <Card className="bg-white text-black shadow-none border-none py-2">
      <CardContent className="text-black text-sm p-0">
        <Table className="py-0">
          <TableBody className="border-b border-gray-400">
            {links.map((links) => (
              <TableRow className="border-b border-gray-400" key={links.link}>
                <TableCell className="font-medium">{links.link}</TableCell>
                <TableCell className="font-medium">{links.linkData}</TableCell>
                <TableCell className="text-right ">
                  <div className="flex flex-row justify-end items-center gap-4">
                    <Button className="bg-foreground hover:bg-foreground/80 transition-all duration-300 cursor-pointer border-none">
                      <Eye className="w-5 h-5 text-white" />
                    </Button>

                    <Button className="bg-foreground hover:bg-foreground/80 transition-all duration-300 cursor-pointer border-none">
                      <Pencil className="w-5 h-5 text-white" />
                    </Button>
                  </div>
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
                  <Plus /> <span>Nova campanha</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
