import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';
import MyTask from '@/components/TaskComponent/my-task';

export default function Task() {
  return (
    <div className="space-y-4 bg-background min-h-screen">
      <NavbarDashboard />

      <div className="px-4">
        <MyTask />
      </div>
    </div>
  );
}
