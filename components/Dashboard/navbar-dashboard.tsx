import { ProfileButton } from '../profile-button';
import { SidebarTrigger } from '../ui/sidebar';
import { Search } from './Search';

export function NavbarDashboard() {
  return (
    <div className="flex items-center justify-between md:justify-end bg-white shadow shadow-primary w-full p-4 ">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger className="bg-white hover:bg-white dark:bg-white dark:hover:bg-white hover:text-black dark:hover:text-black" />
        <img src="/icon.png" alt="Linktraces" className="w-6 h-6" />
      </div>

      <div className="flex items-center gap-4 max-md:justify-end max-md:w-full">
        <Search />
        <ProfileButton />
      </div>
    </div>
  );
}
