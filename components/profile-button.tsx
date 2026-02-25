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
        <Button className="bg-white hover:bg-white text-accent border border-accent/30 max-md:px-3">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center text-center rounded-full w-6 h-6 bg-foreground">
              <span className="text-white text-sm font-bold"> J </span>
            </div>
            <ChevronDown className="text-black" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 mr-4 bg-white shadow-xl/10 shadow-black text-accent border-none"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="bg-white hover:bg-white">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-sm">Email@mail.com</h2>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary" />
        <DropdownMenuGroup>
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
          <DropdownMenuItem>Atualizar plano</DropdownMenuItem>

          <DropdownMenuItem>Termos de uso</DropdownMenuItem>
          <DropdownMenuItem>Ajuda e suporte</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary" />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
