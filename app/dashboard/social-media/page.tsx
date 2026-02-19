'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';
import { EditPost } from '@/components/SocialMediaComponents/EditPost';
import { NewPost } from '@/components/SocialMediaComponents/NewPost';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const mycampaigns = [
  {
    Title: 'Post 1',
    postStatus: 'Arquivado',
    postData: '29/01/2025'
  },
  {
    Title: 'Post 2',
    postStatus: 'Arquivado',
    postData: '29/01/2025'
  },
  {
    Title: 'Post 3',
    postStatus: 'Ativo',
    postData: '29/01/2025'
  },
  {
    Title: 'Post 4',
    postStatus: 'Ativo',
    postData: '29/01/2025'
  },
  {
    Title: 'Post 5',
    postStatus: 'Em breve',
    postData: '29/02/2025'
  }
];

export default function SociaMedia() {
  const router = useRouter();

  return (
    <div className="space-y-6 bg-background min-h-screen">
      <NavbarDashboard />

      <div className="px-4 md:px-6">
        <Card className="flex flex-col py-4 bg-white border-none text-black w-full">
          <CardHeader className="flex items-center w-full justify-between font-bold text-xl max-md:text-xl">
            <h1>Suas campanhas</h1>

            <Link href="/dashboard/social-media/new-post">
              <Button className="bg-foreground hover:bg-foreground/80 transition-all duration-300 cursor-pointer border-none">
                <div className="flex items-center gap-2 text-white">
                  <Plus className="w-5 h-5" /> Novo Post
                </div>
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="font-medium text-black text-xl max-md:text-base">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black dark:text-black font-bold">
                    Post
                  </TableHead>
                  <TableHead className="text-black dark:text-black font-bold">
                    Status
                  </TableHead>
                  <TableHead className="text-black dark:text-black font-bold">
                    Data do post
                  </TableHead>
                  <TableHead className="justify-end text-black dark:text-black font-bold">
                    Editar
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mycampaigns.map((campaign) => (
                  <TableRow key={campaign.Title}>
                    <TableCell className="font-medium">
                      {campaign.Title}
                    </TableCell>
                    <TableCell>{campaign.postStatus}</TableCell>
                    <TableCell>{campaign.postData}</TableCell>

                    <TableCell className="justify-end">
                      <EditPost />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
