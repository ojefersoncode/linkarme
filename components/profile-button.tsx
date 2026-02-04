import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { LogoutButton } from './Dashboard/Logout';

export function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white hover:bg-white text-accent border-none">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center text-center rounded-full w-7 h-7 bg-foreground">
              <span className="text-white text-sm font-bold"> J </span>
            </div>
            <h1 className="text-sm max-md:hidden">Jeferson Vidal</h1>
            <ChevronDown />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 mr-4 bg-white text-accent border-none"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="bg-white hover:bg-white">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xs pb-1">Email@mail.com</h2>
                <div className="bg-foreground cursor-pointer rounded px-1 text-white text-[0.60rem]">
                  Atualizar
                </div>
              </div>
              <h2 className="font-semibold text-[0.70rem]">Plano gratuito</h2>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-green-200" />
        <DropdownMenuGroup>
          <DropdownMenuItem>Projetos</DropdownMenuItem>
          <DropdownMenuItem>Novo projeto</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Convidar usuarios</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-40 bg-white text-accent border-none">
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Whatsapp</DropdownMenuItem>
                <DropdownMenuItem>Link</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>Ajuda</DropdownMenuItem>
          <DropdownMenuItem>Termos</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-green-200" />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
