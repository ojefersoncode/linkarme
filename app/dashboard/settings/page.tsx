import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Database } from 'lucide-react';
import { UpdateProfileForm } from '@/components/update-profile-form';
import { MenuMobile } from '@/components/menu-mobile';

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
      <div className="flex items-center justify-between bg-foreground border-b border-accent/30 md:hidden">
        <div className="flex items-center gap-1 py-3">
          <MenuMobile />
          <h1 className="text-white font-bold text-xl">Linkarme</h1>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl max-md:text-xl font-bold text-foreground">
            Configurações
          </h1>
        </div>

        <div className="grid gap-6 bg-foreground rounded-lg">
          <Card className="bg-foreground border-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                <h1 className="font-bold text-white"> Perfil do Usuário</h1>
                <div className="bg-background/40 p-1 rounded-sm">
                  <User className="h-5 w-5 text-white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UpdateProfileForm profile={profile} />
            </CardContent>
          </Card>

          <Card className="bg-foreground border-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                <h1 className="font-bold text-white">
                  Privacidade e Segurança
                </h1>
                <div className="bg-background/40 p-1 rounded-sm">
                  <Shield className="h-5 w-5 text-white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">
                    Anonimização de IPs
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    IPs dos visitantes são automaticamente hasheados para
                    proteger a privacidade
                  </p>
                </div>
                <Badge variant="default" className="bg-white text-foreground">
                  Ativo
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">Geolocalização</h4>
                  <p className="text-sm text-muted-foreground">
                    Coletamos dados de localização aproximada (país, estado,
                    cidade) para analytics
                  </p>
                </div>
                <Badge variant="default" className="bg-white text-foreground">
                  Ativo
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">
                    Retenção de Dados
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Dados de cliques são mantidos indefinidamente para análises
                    históricas
                  </p>
                </div>
                <Badge className="bg-white text-foreground">Permanente</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-foreground border-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                <h1 className="font-bold text-white"> Informações da conta</h1>
                <div className="bg-background/40 p-1 rounded-sm">
                  <Database className="h-5 w-5 text-white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-white">
                    ID do Usuário
                  </h4>
                  <p className="text-sm text-muted-foreground font-mono">
                    {user.id}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">Email</h4>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">
                    Conta Criada
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">
                    Último Login
                  </h4>
                  <p className="text-sm text-muted-foreground">
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
