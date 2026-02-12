import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const invoices = [
  {
    invoice: 'miiurl.com/abc123',
    totalAmount: 'copiar'
  },
  {
    invoice: 'Imiiurl.com/teste',
    totalAmount: 'copiar'
  },
  {
    invoice: 'Imiiurl.com/teste2',
    totalAmount: 'copiar'
  },
  {
    invoice: 'Imiiurl.com/site1',
    totalAmount: 'copiar'
  },
  {
    invoice: 'miiurl.com/abc123',
    totalAmount: 'copiar'
  }
];

export function Activities() {
  return (
    <Tabs defaultValue="overview" className="bg-white">
      <TabsList className="w-full bg-background ">
        <TabsTrigger
          className="data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
          value="overview"
        >
          Ativos
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
          value="analytics"
        >
          Arquivados
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card className="bg-white text-black shadow-none border-none">
          <CardHeader className="px-0">
            <CardTitle>Links ativos</CardTitle>
          </CardHeader>
          <CardContent className="text-black text-sm px-0">
            <Table>
              <TableBody className="border-b border-gray-400">
                {invoices.map((invoice) => (
                  <TableRow
                    className="border-b border-gray-400"
                    key={invoice.invoice}
                  >
                    <TableCell className="font-medium">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell className="text-right cursor-pointer">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="flex w-full bg-transparent border-none">
                <div className="flex w-full items-center gap-4 pt-4">
                  <Button className="text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
                    <ArrowLeft />
                  </Button>
                  <Button className="text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
                    <ArrowRight />
                  </Button>
                </div>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card className="bg-white text-black shadow-none border-none">
          <CardHeader className="px-0">
            <CardTitle>Links arquivados</CardTitle>
          </CardHeader>
          <CardContent className="text-black text-sm px-0">
            <Table>
              <TableBody className="border-b border-gray-400">
                {invoices.map((invoice) => (
                  <TableRow
                    className="border-b border-gray-400"
                    key={invoice.invoice}
                  >
                    <TableCell className="font-medium">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell className="text-right cursor-pointer">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="flex w-full bg-transparent border-none">
                <div className="flex w-full items-center gap-4 pt-4">
                  <Button className="text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
                    <ArrowLeft />
                  </Button>
                  <Button className="text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
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
