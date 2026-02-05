import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';

export function Search() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white hover:bg-white md:shadow-lg/40 md:shadow-primary text-foreground px-3 border-none">
          <div className="flex items-center gap-2">
            <SearchIcon />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full mr-4 z-40 bg-white text-accent border-none"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-4 rounded-lg shadow-4xl shadow-accent">
            <div className="flex items-center gap-2">
              <Input
                placeholder="buscar..."
                className="bg-white dark:bg-white hover:bg-background border-black/40 text-black placeholder:text-black/80"
              />
              <Button className="bg-foreground hover:bg-foreground text-white hover:text-white">
                <SearchIcon />
              </Button>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
