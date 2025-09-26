import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Database } from "lucide-react"
import { UpdateProfileForm } from "@/components/update-profile-form"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas configurações de conta e privacidade
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        <Card className="bg-foreground border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil do Usuário
            </CardTitle>
            <CardDescription>
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateProfileForm profile={profile} />
          </CardContent>
        </Card>

        <Card className="bg-foreground border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacidade e Segurança
            </CardTitle>
            <CardDescription>
              Configure suas preferências de privacidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Anonimização de IPs</h4>
                <p className="text-sm text-muted-foreground">
                  IPs dos visitantes são automaticamente hasheados para proteger
                  a privacidade
                </p>
              </div>
              <Badge
                variant="default"
                className="bg-accent/30 dark:bg-accent/30 text-muted dark:text-muted"
              >
                Ativo
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Geolocalização</h4>
                <p className="text-sm text-muted-foreground">
                  Coletamos dados de localização aproximada (país, estado,
                  cidade) para analytics
                </p>
              </div>
              <Badge
                variant="default"
                className="bg-accent/30 dark:bg-accent/30 text-muted dark:text-muted"
              >
                Ativo
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Retenção de Dados</h4>
                <p className="text-sm text-muted-foreground">
                  Dados de cliques são mantidos indefinidamente para análises
                  históricas
                </p>
              </div>
              <Badge
                variant="default"
                className="bg-accent/30 dark:bg-accent/30 text-muted dark:text-muted"
              >
                Permanente
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-foreground border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Informações da Conta
            </CardTitle>
            <CardDescription>Detalhes técnicos da sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm">ID do Usuário</h4>
                <p className="text-sm text-muted-foreground font-mono">
                  {user.id}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Email</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Conta Criada</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Último Login</h4>
                <p className="text-sm text-muted-foreground">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString('pt-BR')
                    : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
