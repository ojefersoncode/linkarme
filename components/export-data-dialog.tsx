'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
        if (selectedLink !== 'all') {
          params.append('link_id', selectedLink);
        }
        if (startDate) {
          params.append('start_date', startDate);
        }
        if (endDate) {
          params.append('end_date', endDate);
        }
        if (includePersonalData) {
          params.append('include_personal_data', 'true');
        }

        const response = await fetch(`/api/export/clicks?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Erro ao exportar dados');
        }

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
      } else if (exportType === 'links') {
        const response = await fetch('/api/export/links');

        if (!response.ok) {
          throw new Error('Erro ao exportar dados');
        }

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
        <Button className="flex items-center justify-center cursor-pointer text-white bg-foreground hover:bg-foreground shadow-xl/40 shadow-primary border-none">
          <Download className="h-4 w-4 md:mr-1" />
          <span className="max-md:text-xs font-semibold"> Exportar Dados </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 bg-white border-none text-black">
        <DialogHeader className="max-md:justify-start">
          <DialogTitle className="max-md:justify-start text-start">
            Exportar Dados
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="link" className="font-semibold">
                Link Específico (Opcional)
              </Label>
              <Select value={selectedLink} onValueChange={setSelectedLink}>
                <SelectTrigger className="border-black/40 text-black bg-white dark:bg-white hover:bg-white hover:dark:bg-white w-full">
                  <SelectValue className="text-foreground" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-white text-black dark:text-black border-bone">
                  <SelectItem value="all">Todos os links</SelectItem>
                  {links.map((link) => (
                    <SelectItem key={link.id} value={link.id}>
                      {Array.isArray(link.domains)
                        ? link.domains.map((d) => d.domain).join(', ')
                        : typeof link.domains === 'object'
                          ? link.domains.domain
                          : link.domains}
                      /{link.slug} {link.title && `- ${link.title}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exportType" className="font-semibold">
                Tipo de Dados
              </Label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger className="border-black/40 text-black bg-white dark:bg-white hover:bg-white hover:dark:bg-white w-full">
                  <SelectValue className="text-foreground" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-white text-black dark:text-black border-bone">
                  <SelectItem value="clicks">Dados de Cliques</SelectItem>
                  <SelectItem value="links">Lista de Links</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {exportType === 'clicks' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="font-semibold">
                    Data Inicial
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="font-semibold border-black/40 bg-white dark:bg-white text-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="font-semibold">
                    Data Final
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="font-semibold border-black/40 bg-white dark:bg-white text-black"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-none text-green-500"
                  id="includePersonalData"
                  checked={includePersonalData}
                  onCheckedChange={(checked) =>
                    setIncludePersonalData(checked as boolean)
                  }
                />
                <Label htmlFor="includePersonalData" className="text-sm">
                  Incluir dados demograficos
                </Label>
              </div>
            </>
          )}
        </div>
        <DialogFooter className="">
          <Button
            className="bg-red-600 hover:bg-red-600 cursor-pointer border-none px-8 text-white"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-foreground hover:bg-foreground/80 transition-all duration-300 px-8 text-white max-md:text-sm cursor-pointer"
          >
            {isExporting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isExporting ? 'Exportando...' : 'Exportar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
