'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area'; // ajuste conforme seu projeto

interface Link {
  id: string;
  slug: string;
  title: string | null;
  domains: { domain: string }[];
}

interface ExportDataDialogProps {
  links: Link[];
}

export function ExportDataDialog({ links }: ExportDataDialogProps) {
  const [open, setOpen] = useState(false);
  const [exportType, setExportType] = useState('clicks');
  const [selectedLink, setSelectedLink] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includePersonalData, setIncludePersonalData] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const params = new URLSearchParams();
      if (exportType === 'clicks') {
        if (selectedLink !== 'all') params.append('link_id', selectedLink);
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        if (includePersonalData) params.append('include_personal_data', 'true');

        const response = await fetch(`/api/export/clicks?${params.toString()}`);
        if (!response.ok) throw new Error('Erro ao exportar dados');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `linkshort-clicks-${
          new Date().toISOString().split('T')[0]
        }.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const response = await fetch('/api/export/links');
        if (!response.ok) throw new Error('Erro ao exportar dados');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `linkshort-links-${
          new Date().toISOString().split('T')[0]
        }.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
      setOpen(false);
    } catch (error) {
      console.error('Export error:', error);
      alert('Erro ao exportar dados. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center cursor-pointer text-muted bg-accent/40 hover:bg-accent/50 border border-secondary">
          <Download className="h-4 w-4 md:mr-2" />
          <span className="max-md:text-xs"> Exportar Dados </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full border-popover-foreground sm:m-0 sm:max-w-xl max-h-[calc(100vh-3.5rem)] sm:max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Exportar Dados</DialogTitle>
          <DialogDescription>
            Exporte seus dados em formato CSV
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="exportType">Tipo de Dados</Label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger className="bg-accent/40 dark:bg-accent/40 hover:bg-accent/40 dark:hover:bg-accent/40 text-muted dark:*:text-muted border border-secondary/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem
                    className="bg-background dark:bg-background hover:bg-accent/40 dark:hover:bg-accent/40"
                    value="clicks"
                  >
                    Dados de Cliques
                  </SelectItem>
                  <SelectItem
                    className="bg-background dark:bg-background hover:bg-accent/40 dark:hover:bg-accent/40"
                    value="links"
                  >
                    Lista de Links
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {exportType === 'clicks' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="link">Link Específico (Opcional)</Label>
                  <Select value={selectedLink} onValueChange={setSelectedLink}>
                    <SelectTrigger className="bg-accent/40 dark:bg-accent/40 hover:bg-accent/40 dark:hover:bg-accent/40 text-muted dark:*:text-muted border border-secondary/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem
                        className="bg-background dark:bg-background hover:bg-accent/40 dark:hover:bg-accent/40"
                        value="all"
                      >
                        Todos os links
                      </SelectItem>
                      {links.map((link) => (
                        <SelectItem
                          className="bg-background dark:bg-background hover:bg-accent/40 dark:hover:bg-accent/40"
                          key={link.id}
                          value={link.id}
                        >
                          {Array.isArray(link.domains)
                            ? link.domains.map((d) => d.domain).join(', ')
                            : ''}
                          /{link.slug}
                          {link.title ? ` - ${link.title}` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data Inicial</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-accent/40 dark:bg-accent/40 hover:bg-accent/40 dark:hover:bg-accent/40 text-muted dark:*:text-muted border border-secondary/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data Final</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-accent/40 dark:bg-accent/40 hover:bg-accent/40 dark:hover:bg-accent/40 text-muted dark:*:text-muted border border-secondary/60"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    className="bg-accent/70 dark:bg-accent/70 text-white dark:text-white"
                    id="includePersonalData"
                    checked={includePersonalData}
                    onCheckedChange={(checked) =>
                      setIncludePersonalData(checked as boolean)
                    }
                  />
                  <Label htmlFor="includePersonalData" className="text-sm">
                    Incluir dados geograficos (IP hash)
                  </Label>
                </div>
              </>
            )}

            <div className="p-4 border border-popover bg-foreground/60 rounded-lg">
              <h4 className="font-medium mb-2">
                Informações sobre Privacidade
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • IPs são automaticamente hasheados para proteger a
                  privacidade
                </li>
                <li>
                  • Dados de geolocalização são aproximados (país, estado,
                  cidade)
                </li>
                <li>• Nenhuma informação pessoal identificável é coletada</li>
              </ul>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            className="bg-popover hover:bg-popover border border-popover-foreground dark:hover:bg-popover/80 text-muted dark:text-muted"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="text-muted dark:text-muted border border-secondary bg-accent/50 hover:bg-accent/40"
          >
            {isExporting && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted dark:text-muted" />
            )}
            {isExporting ? 'Exportando...' : 'Exportar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
