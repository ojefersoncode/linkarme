'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';
import { NewCampaig } from '@/components/CampaignsComponents/NewCampaig';
import { EditCampaig } from '@/components/CampaignsComponents/EditCampaig';
import { CopyIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const mycampaigns = [
  {
    Title: 'Campanha 1',
    Type: 'story',
    Status: 'Desativado',
    Duration: '15 dias',
    Segments: 'Musicas, TV, Games, Esportes, Noticias'
  },
  {
    Title: 'Campanha 2',
    Type: 'story',
    Status: 'Desativado',
    Duration: '15 dias',
    Segments: 'Musicas, TV, Filmes, Games, Noticias'
  },
  {
    Title: 'Campanha 3',
    Type: 'story',
    Status: 'Ativo',
    Duration: '30 dias',
    Segments: 'Musicas, Filmes, Games, Esportes, Noticias'
  },
  {
    Title: 'Campanha 4',
    Type: 'story',
    Status: 'Ativo',
    Duration: '15 dias',
    Segments: 'Musicas, TV, Filmes, Esportes, Noticias'
  },
  {
    Title: 'Campanha 5',
    Type: 'story',
    Status: 'Ativo',
    Duration: '15 dias',
    Segments: 'Musicas, Filmes, Games, Esportes, Noticias'
  }
];

const CampaignsTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="text-black dark:text-black font-bold w-[100px]">
          Nome
        </TableHead>
        <TableHead className="text-black dark:text-black font-bold">
          Tipo
        </TableHead>
        <TableHead className="text-black dark:text-black font-bold">
          Duração
        </TableHead>
        <TableHead className="text-black dark:text-black font-bold">
          Status
        </TableHead>
        <TableHead className="text-black dark:text-black font-bold">
          Segmentos
        </TableHead>
        <TableHead className="text-black dark:text-black font-bold">
          Editar
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {mycampaigns.map((campaign) => (
        <TableRow key={campaign.Title}>
          <TableCell className="font-medium">{campaign.Title}</TableCell>
          <TableCell>{campaign.Type}</TableCell>
          <TableCell>{campaign.Duration}</TableCell>
          <TableCell>{campaign.Status}</TableCell>
          <TableCell>{campaign.Segments}</TableCell>
          <TableCell>
            <EditCampaig />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function Campaigns() {
  const [tabs] = useState([
    { id: 'tab-1', title: 'Meta' },
    { id: 'tab-2', title: 'Tiktok' },
    { id: 'tab-3', title: 'Google' }
  ]);
  const [activeTab, setActiveTab] = useState('tab-1');

  const [profiles] = useState([{ id: 'profile-1', title: 'Jeferson' }]);

  const [selectedProfile, setSelectedProfile] = useState('profile-1');

  return (
    <div className=" bg-background h-screen">
      <NavbarDashboard />

      <div className="p-4">
        <Card className="flex flex-col p-4 bg-white border-none rounded text-black w-full">
          <CardHeader className="flex items-center w-full justify-between font-bold text-xl max-md:text-xl px-0">
            <h1>Suas campanhas</h1>
          </CardHeader>
          <CardContent className="font-medium px-0 text-black text-xl max-md:text-base">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="flex gap-2 px-1 items-center bg-background dark:bg-background">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 group pr-2 border-none text-black/80 dark:text-black/80 bg-transparent dark:bg-transparent data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex w-full max-md:grid grid-cols-2 items-center gap-4 pt-4">
                <Select
                  value={selectedProfile}
                  onValueChange={setSelectedProfile}
                >
                  <SelectTrigger className="border border-gray-400 text-black bg-white dark:bg-white hover:bg-white hover:dark:bg-white cursor-pointer w-full md:w-44">
                    <SelectValue className="text-foreground" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-white text-black dark:text-black border-none shadow-xl">
                    {profiles.map((profile) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={profile.id}
                        value={profile.id}
                      >
                        {profile.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  className="w-full md:max-w-40 border border-gray-400 bg-white dark:bg-white text-black dark:text-black focus:ring-0 focus:ring-foreground cursor-pointer"
                />
                <Button className="border border-gray-400 text-black hover:text-black bg-white dark:bg-white hover:bg-white hover:dark:bg-white cursor-pointer">
                  <CopyIcon className="size-4" />
                  <span className="text-xs font-semibold">Duplicar</span>
                </Button>
                <NewCampaig />
              </div>

              {tabs.map((tab) => (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  className="p-4 text-black bg-white rounded"
                >
                  <CampaignsTable />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
