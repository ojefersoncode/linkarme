import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '../ui/card';
import { Plus } from 'lucide-react';

export function Integration() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-foreground hover:bg-foreground/80 transition-all duration-300 cursor-pointer border-none">
            <div className="flex items-center gap-2 text-white">
              <Plus className="w-5 h-5" /> Integrações
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm border-none bg-white">
          <DialogHeader>
            <DialogTitle className="flex justify-start text-black dark:text-black">
              Nova Campanha
            </DialogTitle>
          </DialogHeader>
          <Card className="border-none shadow-none px-0 bg-white text-black w-full">
            <CardContent className="px-0">
              <Label htmlFor="name-1">Nome da campanha</Label>
              <Input
                className="mt-2 text-black/70 dark:text-black/70 bg-white dark:bg-white border border-black/40 placeholder:text-black/40"
                id="name-1"
                name="name"
                placeholder="Dê um nome à sua campanha"
              />
            </CardContent>

            <CardContent className="px-0">
              <Label htmlFor="username-1">Numero de Membros</Label>
              <Input
                className="mt-2 text-black/70 dark:text-black/70 bg-white dark:bg-white border border-black/40 placeholder:text-black/40"
                id="members-number"
                name="members-number"
                placeholder="ex:10"
              />
            </CardContent>
            <CardContent className="px-0">
              <Label htmlFor="username-1">Membros</Label>
              <Input
                className="mt-2 text-black/70 dark:text-black/70 bg-white dark:bg-white border border-black/40 placeholder:text-black/40"
                id="username-1"
                name="username"
                placeholder="ex:lucas, ana, italo"
              />
            </CardContent>
          </Card>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-red-600 hover:bg-red-500 text-white dark:text-white cursor-pointer border-none">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-foreground hover:bg-foreground text-white dark:text-white cursor-pointer border-none"
            >
              Criar Campanha
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
