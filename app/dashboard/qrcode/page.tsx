import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';
import { QrGenerator } from '@/components/qr-generator';

export default async function Qrcode() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  return (
    <div className="space-y-6 bg-background h-screen">
      <NavbarDashboard />

      <div className="px-4 w-full">
        <Card className="bg-white shadow shadow-primary border-none gap-2 w-full">
          {/* FORM */}
          <CardContent className="w-full">
            <QrGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
