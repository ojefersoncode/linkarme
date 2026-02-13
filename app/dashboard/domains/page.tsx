import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Globe, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { DeleteDomainButton } from '@/components/delete-domain-button';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';

export default async function DomainsPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/auth/login');
  }

  const { data: domains } = await supabase
    .from('domains')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const getStatusIcon = (verified: boolean) => {
    if (verified) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <Clock className="h-4 w-4 text-yellow-500" />;
  };

  const getStatusBadge = (verified: boolean) => {
    if (verified) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Verificado
        </Badge>
      );
    }
    return <Badge variant="secondary">Pendente</Badge>;
  };

  return (
    <div className="max-md:p-0 space-y-6">
      <NavbarDashboard />
      <div className="flex items-center justify-end px-4">
        <Button
          asChild
          className="bg-foreground hover:bg-foreground/80 transition-all duration-300 px-8 text-white max-md:text-sm shadow shadow-primary"
        >
          <Link href="/dashboard/domains/add">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Domínio
          </Link>
        </Button>
      </div>

      {domains && domains.length > 0 ? (
        <div className="grid gap-4 px-4">
          {domains.map((domain) => (
            <Card key={domain.id} className="bg-white text-black border-none">
              <CardHeader className="bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-lg text-white">
                        <Globe className="h-5 w-5 text-white" /> {domain.domain}
                      </CardTitle>
                      <CardDescription className="text-green-100">
                        Adicionado em{' '}
                        {new Date(domain.created_at).toLocaleDateString(
                          'pt-BR'
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(domain.verified)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-green-100">
                      Método de verificação:{' '}
                      {domain.verification_method === 'dns'
                        ? 'DNS TXT'
                        : 'Upload de arquivo'}
                    </p>
                    {!domain.verified && (
                      <p className="text-sm text-green-100">
                        Domínio aguardando verificação
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!domain.verified && (
                      <Button
                        className="bg-foreground hover:bg-foreground/80 transition-all duration-300 text-white max-md:text-sm"
                        size="sm"
                        asChild
                      >
                        <Link href={`/dashboard/domains/${domain.id}/verify`}>
                          Verificar
                        </Link>
                      </Button>
                    )}
                    <DeleteDomainButton
                      domainId={domain.id}
                      domainName={domain.domain}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="px-4">
          <Card className="bg-white border-none shadow-xl/40 shadow-primary">
            <CardHeader>
              <CardTitle className="text-black dark:text-black">
                Nenhum domínio encontrado
              </CardTitle>
              <CardDescription className="text-black dark:text-black">
                Você ainda não adicionou nenhum domínio. Adicione seu primeiro
                domínio para começar a criar links personalizados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="bg-foreground hover:bg-foreground/80 transition-all duration-300 text-white max-md:text-sm"
              >
                <Link href="/dashboard/domains/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Domínio
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
