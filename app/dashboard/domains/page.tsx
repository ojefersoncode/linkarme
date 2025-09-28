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
import { Plus, Globe } from 'lucide-react';
import Link from 'next/link';
import { DeleteDomainButton } from '@/components/delete-domain-button';
import { MenuMobile } from '@/components/menu-mobile';

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

  const getStatusBadge = (verified: boolean) => {
    if (verified) {
      return (
        <Badge variant="default" className="bg-green-200 text-green-900">
          Verificado
        </Badge>
      );
    }
    return <Badge variant="secondary">Pendente</Badge>;
  };

  return (
    <div className="p-6 max-md:p-0 space-y-6">
      <div className="flex items-center justify-between bg-foreground border-b border-accent/20 md:hidden">
        <div className="flex items-center gap-1 py-3">
          <MenuMobile /> <img src="/Linklogo.png" alt="" className="h-5" />
        </div>
      </div>

      <div className="flex items-center justify-between max-md:px-4">
        <div>
          <h1 className="text-2xl max-md:text-xl font-bold text-muted dark:text-muted">
            Domínios
          </h1>
        </div>
        <Button
          asChild
          className="text-muted dark:text-muted bg-accent/40 dark:bg-accent/40 hover:bg-accent/40 dark:hover:bg-accent/40 border border-muted/40 dark:border-muted/40"
        >
          <Link href="/dashboard/domains/add">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Domínio
          </Link>
        </Button>
      </div>

      {domains && domains.length > 0 ? (
        <div className="grid gap-4 max-md:px-4">
          {domains.map((domain) => (
            <Card key={domain.id} className="bg-foreground border-accent/40">
              <CardHeader className="bg-foreground border-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-lg">{domain.domain}</CardTitle>
                      <CardDescription>
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
                    <p className="text-sm text-muted-foreground">
                      Método de verificação:{' '}
                      {domain.verification_method === 'dns'
                        ? 'DNS TXT'
                        : 'Upload de arquivo'}
                    </p>
                    {!domain.verified && (
                      <p className="text-sm text-yellow-600">
                        Domínio aguardando verificação
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!domain.verified && (
                      <Button
                        className="bg-foreground dark:bg-foreground border border-accent/40 dark:border-accent/40 text-muted dark:text-muted"
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
        <div className="max-md:px-4">
          <Card className="bg-foreground border-accent/40">
            <CardHeader>
              <CardTitle>Nenhum domínio encontrado</CardTitle>
              <CardDescription>
                Você ainda não adicionou nenhum domínio. Adicione seu primeiro
                domínio para começar a criar links personalizados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="text-muted">
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
