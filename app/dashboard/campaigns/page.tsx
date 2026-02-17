'use client';

import { useRouter } from 'next/navigation';
import { Pencil, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { NewCampaig } from '@/components/CampaignsComponents/NewCampaig';
import { EditCampaig } from '@/components/CampaignsComponents/EditCampaig';

const mycampaigns = [
  {
    Title: 'Campanha 1',
    paymentStatus: 'Desativado',
    paymentMethod: 'Luiz, matheus, carla, maria, jose camila'
  },
  {
    Title: 'Campanha 2',
    paymentStatus: 'Desativado',
    paymentMethod:
      'Luiz, matheus, carla, maria, jose, pedro, ana, lucas, sophia, rafael, camila'
  },
  {
    Title: 'Campanha 3',
    paymentStatus: 'Ativo',
    paymentMethod:
      'Hiago, maria, jose, pedro, ana, lucas, sophia, rafael, camila'
  },
  {
    Title: 'Campanha 4',
    paymentStatus: 'Ativo',
    paymentMethod:
      'Luiz, matheus, carla, maria, jose, pedro, ana, lucas, camila'
  },
  {
    Title: 'Campanha 5',
    paymentStatus: 'Ativo',
    paymentMethod:
      'Luiz, matheus, carla, maria, jose, ana, lucas, sophia, rafael'
  }
];

export default function Campaigns() {
  const router = useRouter();

  return (
    <div className="space-y-6 bg-background min-h-screen">
      <NavbarDashboard />

      <div className="px-4 md:px-6">
        <Card className="flex flex-col p-4 bg-white border-none text-black w-full">
          <CardHeader className="flex items-center w-full justify-between font-bold text-xl max-md:text-xl">
            <h1>Suas campanhas</h1>

            <NewCampaig />
          </CardHeader>
          <CardContent className="font-medium text-black text-xl max-md:text-base">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black dark:text-black font-bold w-[100px]">
                    Nome da campanha
                  </TableHead>
                  <TableHead className="text-black dark:text-black font-bold">
                    Status
                  </TableHead>
                  <TableHead className="text-black dark:text-black font-bold">
                    Membros
                  </TableHead>
                  <TableHead className="text-black dark:text-black font-bold">
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
                    <TableCell>{campaign.paymentStatus}</TableCell>
                    <TableCell>{campaign.paymentMethod}</TableCell>

                    <TableCell>
                      <EditCampaig />
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
