import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { SearchIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function Search() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent cursor-pointer border-none text-black/80 dark:text-black/80">
            <SearchIcon className="size-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md w-full border-none shadow-xl bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-black">Pesquisar</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="Pesquisar..."
                className="border-black/40 bg-white dark:bg-white focus:ring-0 p-4"
              />
              <Button className="p-4 bg-foreground hover:bg-foreground/90 border-none cursor-pointer text-white">
                <SearchIcon className="size-5" />
              </Button>
            </div>

            <Card className="bg-white gap-2 text-black border-none shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="py-0 text-sm font-semibold">
                  Resultados da pesquisa
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-0">
                <ul className="flex flex-col gap-2 text-xs font-normal">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Resultado 1
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Resultado 2
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Resultado 3
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Resultado 4
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Resultado 5
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button className="w-full text-black bg-white hover:bg-white border-none cursor-pointer underline">
              Ver todos os resultados
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
