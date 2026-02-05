import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';

export function FilterDateMap() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-background hover:bg-background shadow-lg/40 shadow-primary text-foreground px-3 border-none">
          <div className="flex items-center gap-2">
            <Filter />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-20 mr-4 z-40 bg-white text-accent border-none"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>24 horas</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-green-100" />

          <DropdownMenuItem>7 dias</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-green-100" />

          <DropdownMenuItem>30 dias</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-green-100" />

          <DropdownMenuItem>Todo periodo</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
