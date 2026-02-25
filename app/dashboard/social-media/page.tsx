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
import { Button } from '@/components/ui/button';
import {
  Facebook,
  Instagram,
  Music2,
  Plus,
  Radio,
  X,
  Youtube
} from 'lucide-react';
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
  return (
    <div className="space-y-6 bg-background min-h-screen">
      <NavbarDashboard />

      <div className="px-4 md:px-6">
        <Card className="flex flex-col w-full gap-6 p-4 bg-white text-black dark:text-black border-none shadow-none">
          <div className="flex items-center gap-4">
            <Radio className="size-6" />
            <h1 className="text-base font-semibold">Conectados</h1>
          </div>
          <div className="flex w-full gap-4">
            <Button className="bg-foreground hover:bg-foreground/80 transition-all duration-300 cursor-pointer border-none text-white">
              <Music2 className="w-5 h-5" />
            </Button>
            <Button className="bg-foreground hover:bg-foreground/80 transition-all duration-300 cursor-pointer border-none text-white">
              <Youtube className="w-5 h-5" />
            </Button>
            <Button className="bg-foreground hover:bg-foreground/80 transition-all duration-300 cursor-pointer border-none text-white">
              <Instagram className="w-5 h-5" />
            </Button>
            <Button className="bg-white hover:bg-white/80 transition-all duration-300 cursor-pointer border text-black">
              <Facebook className="w-5 h-5" />
            </Button>

            <Button className="bg-white hover:bg-white/80 transition-all duration-300 cursor-pointer border text-black">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>

      <div className="px-4 pb-4 md:pb-6 md:px-6">
        <Card className="flex flex-col py-4 px-0 bg-white border-none text-black w-full">
          <CardHeader className="flex items-center w-full justify-between max-md:text-xl">
            <h1 className="font-semibold text-xl">Postagens Recentes</h1>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/social-media/new-post">
              <Button className="bg-foreground hover:bg-foreground/80 transition-all duration-300 cursor-pointer border-none text-white">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5" /> Novo Post
                </div>
              </Button>
            </Link>
          </CardContent>
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
