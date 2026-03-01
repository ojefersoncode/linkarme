import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';
import WorkTabs from '@/components/WorkFlowComponents/WorkTabs';

export default async function Workflow() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  return (
    <div className="space-y-4 bg-[#eeeeee] min-h-screen">
      <NavbarDashboard />

      <div className="px-4">
        <WorkTabs />
      </div>
    </div>
  );
}
