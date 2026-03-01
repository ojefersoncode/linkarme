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
    Type: 'story',
    Status: 'Desativado',
    Duration: '15 dias',
    Members: 'Luiz, matheus, carla, maria, jose, camila'
  },
  {
    Title: 'Campanha 2',
    Type: 'story',
    Status: 'Desativado',
    Duration: '15 dias',
    Members:
      'Luiz, matheus, carla, maria, jose, pedro, ana, lucas, sophia, rafael, camila'
  },
  {
    Title: 'Campanha 3',
    Type: 'story',
    Status: 'Ativo',
    Duration: '30 dias',
    Members: 'Hiago, maria, jose, pedro, ana, lucas, sophia, rafael, camila'
  },
  {
    Title: 'Campanha 4',
    Type: 'story',
    Status: 'Ativo',
    Duration: '15 dias',
    Members: 'Luiz, matheus, carla, maria, jose, pedro, ana, lucas, camila'
  },
  {
    Title: 'Campanha 5',
    Type: 'story',
    Status: 'Ativo',
    Duration: '15 dias',
    Members: 'Luiz, matheus, carla, maria, jose, ana, lucas, sophia, rafael'
  }
];

export default function Campaigns() {
  return (
    <div className="space-y-4 bg-background min-h-screen">
      <NavbarDashboard />

      <div className="px-4">
        <Card className="flex flex-col p-4 bg-white border-none rounded text-black w-full">
          <CardHeader className="flex items-center w-full justify-between font-bold text-xl max-md:text-xl px-0">
            <h1>Suas campanhas</h1>

            <NewCampaig />
          </CardHeader>
          <CardContent className="font-medium px-2 text-black text-xl max-md:text-base">
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
                    <TableCell>{campaign.Type}</TableCell>
                    <TableCell>{campaign.Duration}</TableCell>
                    <TableCell>{campaign.Status}</TableCell>
                    <TableCell>{campaign.Members}</TableCell>

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
