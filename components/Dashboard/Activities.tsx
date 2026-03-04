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
import { ArrowLeft, ArrowRight, Copy, Download, Eye } from 'lucide-react';

const campaign = [
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

const campaigns = [
  {
    link: 'Rastrear cliques',
    linkData: '12/02/2026'
  },
  {
    link: 'Campanha de teste',
    linkData: '09/02/2026'
  }
];

export default async function Activities() {
  return (
    <Tabs defaultValue="overview" className="bg-white">
      <TabsList className="w-full bg-background ">
        <TabsTrigger
          className="border-none text-black/80 dark:text-black/80 data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
          value="campaigns"
        >
          Campanhas
        </TabsTrigger>
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
      <TabsContent value="campaigns">
        <Card className="bg-white text-black shadow-none border-none py-2">
          <CardContent className="text-black text-sm p-0">
            <Table className="py-0">
              <TableBody className="border-b border-gray-400">
                {campaigns.map((campaign) => (
                  <TableRow
                    className="border-b border-gray-400"
                    key={campaign.link}
                  >
                    <TableCell className="font-medium">
                      {campaign.link}
                    </TableCell>
                    <TableCell className="font-medium">
                      {campaign.linkData}
                    </TableCell>
                    <TableCell className="text-right ">
                      <Button className="bg-transparent hover:bg-transparente dark:hover:bg-transparente cursor-pointer border-none">
                        <Eye className="w-5 h-5 text-black" />
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
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="overview">
        <Card className="bg-white text-black shadow-none border-none py-2">
          <CardContent className="text-black text-sm p-0">
            <Table className="py-0">
              <TableBody className="border-b border-gray-400">
                {campaign.map((links) => (
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
                {campaign.map((links) => (
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
