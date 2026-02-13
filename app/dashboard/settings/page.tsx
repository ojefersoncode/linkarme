import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Database } from 'lucide-react';
import { UpdateProfileForm } from '@/components/update-profile-form';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/auth/login');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <main>
      <NavbarDashboard />

      <div className="p-4 md:p-6 space-y-6">
        <div className="grid gap-6 bg-white shadow shadow-primary rounded-lg">
          <Card className="bg-white border-none shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                <h1 className="font-bold text-black"> Perfil do Usuário</h1>
                <div className="bg-primary p-1 rounded-sm">
                  <User className="h-5 w-5 text-foreground" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UpdateProfileForm profile={profile} />
            </CardContent>
          </Card>

          <Card className="bg-white text-black border-none shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                <h1 className="font-bold">Privacidade e Segurança</h1>
                <div className="bg-primary p-1 rounded-sm">
                  <Shield className="h-5 w-5 text-foreground" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-black">
                    Anonimização de IPs
                  </h4>
                  <Badge
                    variant="default"
                    className="bg-primary text-foreground"
                  >
                    Ativo
                  </Badge>
                </div>
                <p className="text-sm w-xs text-black/50">
                  IPs dos visitantes são automaticamente hasheados para proteger
                  a privacidade
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-black">Geolocalização</h4>
                  <Badge
                    variant="default"
                    className="bg-primary text-foreground"
                  >
                    Ativo
                  </Badge>
                </div>
                <p className="text-sm w-xs text-black/50">
                  Coletamos dados de localização aproximada (país, estado,
                  cidade) para analytics
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-black">
                    Retenção de Dados
                  </h4>
                  <Badge className="bg-primary text-foreground">
                    Permanente
                  </Badge>
                </div>
                <p className="text-sm w-xs text-black/50">
                  Dados de cliques são mantidos indefinidamente para análises
                  históricas
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white text-black border-none shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                <h1 className="font-bold text-black/50">
                  {' '}
                  Informações da conta
                </h1>
                <div className="bg-primary p-1 rounded-sm">
                  <Database className="h-5 w-5 text-foreground" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm">ID do Usuário</h4>
                  <p className="text-sm text-black/50 font-mono">{user.id}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Email</h4>
                  <p className="text-sm text-black/50">{user.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Conta Criada</h4>
                  <p className="text-sm text-black/50">
                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Último Login</h4>
                  <p className="text-sm text-black/50">
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleDateString(
                          'pt-BR'
                        )
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
