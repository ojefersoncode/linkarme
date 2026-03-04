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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '../ui/card';
import { Plus } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';

export function NewCampaig() {
  const [profiles] = useState([{ id: 'profile-1', title: 'Jeferson' }]);

  const [selectedProfile, setSelectedProfile] = useState('profile-1');

  const [status] = useState([
    { id: 'status-1', title: 'Diurno' },
    { id: 'status-2', title: 'Noturno' }
  ]);

  const [selectedStatus, setSelectedStatus] = useState('status-1');

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-foreground hover:bg-foreground/80 transition-all duration-300 cursor-pointer border-none">
            <div className="flex items-center gap-2 text-white">
              <Plus className="w-5 h-5" /> Nova campanha
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md border-none bg-white">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-black">
              Nova Campanha
            </DialogTitle>
          </DialogHeader>
          <Card className="border-none shadow-none px-0 bg-white text-black w-full">
            <CardContent className="flex flex-col gap-2 px-0">
              <Label htmlFor="name-1">Nome da campanha</Label>
              <Input
                className="text-black/70 dark:text-black/70 bg-white dark:bg-white border border-black/40 placeholder:text-black/40"
                id="name-1"
                name="name"
                placeholder="Dê um nome à sua campanha"
              />
            </CardContent>

            <CardContent className="grid grid-cols-2 gap-4 px-0">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Selecione um perfil</Label>

                <Select
                  value={selectedProfile}
                  onValueChange={setSelectedProfile}
                >
                  <SelectTrigger className="flex gap-2 w-full border border-gray-400 shadow text-black bg-white dark:bg-white hover:bg-background hover:dark:bg-background cursor-pointer">
                    <span className="h-6 w-6 rounded-full text-center text-sm font-semibold bg-foreground text-background">
                      J
                    </span>

                    <SelectValue className="text-foreground font-bold text-base" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-white text-black dark:text-black border-gray-300 shadow-xl shadow-black/10">
                    {profiles.map((profile) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={profile.id}
                        value={profile.id}
                      >
                        {profile.title}
                      </SelectItem>
                    ))}
                    <SelectItem
                      value="new-profile"
                      className="cursor-pointer mt-2 text-black dark:text-black hover:text-black dark:hover:text-black flex items-center gap-2"
                    >
                      <Plus className="size-4" />
                      <span className="text-xs font-normal">Criar</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Programar para:</Label>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="border border-gray-400 text-black bg-white dark:bg-white hover:bg-background hover:dark:bg-background cursor-pointer w-44">
                    <SelectValue className="text-foreground" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-white text-black dark:text-black border-none shadow-xl shadow-black/20">
                    {status.map((status) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={status.id}
                        value={status.id}
                      >
                        {status.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>

            <CardContent className="grid grid-cols-2 px-0 gap-4 items-center">
              <div className="flex flex-col gap-2">
                <Label htmlFor="username-1">Inicio da campanha</Label>
                <Input
                  className="text-black/70 dark:text-black/70 bg-white dark:bg-white hover:bg-background hover:dark:bg-background border border-black/40 placeholder:text-black/40"
                  id="start-date"
                  type="date"
                  name="start-date"
                  placeholder="ex:01/01/2023"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="username-1">Fim da campanha</Label>
                <Input
                  className="text-black/70 dark:text-black/70 bg-white dark:bg-white hover:bg-background hover:dark:bg-background border border-black/40 placeholder:text-black/40"
                  id="start-date"
                  type="date"
                  name="start-date"
                  placeholder="ex:01/01/2023"
                />
              </div>
            </CardContent>
            <CardContent className="flex flex-col gap-2 px-0">
              <Label htmlFor="username-1">Segmentos</Label>
              <Textarea
                className="text-black/70 dark:text-black/70 bg-white dark:bg-white border border-black/40 placeholder:text-black/40 resize-none"
                rows={2}
                id="segments"
                name="segments"
                placeholder="ex:musicas, esporte, noticias..."
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
