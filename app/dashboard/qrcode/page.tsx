import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Globe, Link2 } from 'lucide-react';
import { ExportDataDialog } from '@/components/export-data-dialog';
import { MenuMobile } from '@/components/menu-mobile';
import { ProfileButton } from '@/components/profile-button';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default async function Qrcode() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  // Buscar domínios e links em paralelo
  const [domainsResult, linksResult] = await Promise.all([
    supabase.from('domains').select('id').eq('user_id', user.id),
    supabase
      .from('links')
      .select('id, slug, title, domains (domain)')
      .eq('user_id', user.id)
  ]);

  // Extrair ids dos links
  const linkIds = linksResult.data?.map((l) => l.id) || [];

  // Buscar cliques
  const clicksResult = linkIds.length
    ? await supabase.from('clicks').select('id').in('link_id', linkIds)
    : { data: [], error: null };

  const stats = {
    domains: domainsResult.data?.length || 0,
    links: linksResult.data?.length || 0,
    clicks: clicksResult.data?.length || 0
  };

  // Links para exportação
  const linksForExport =
    linksResult.data?.map((link) => ({
      id: link.id,
      slug: link.slug,
      title: link.title,
      domains: link.domains
    })) || [];

  return (
    <div className="md:p-6 space-y-6 bg-background h-screen">
      <div className="flex items-center justify-between bg-accent border-b border-accent/30 md:hidden">
        <div className="flex items-center gap-1 px-2 py-3">
          <MenuMobile />
          <Image
            src={'favicon.png'}
            height={100}
            width={100}
            alt="logo"
            className="w-8 h-8"
          />
        </div>
        <div className="pr-4">
          <ProfileButton />
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-md:py-2 max-md:hidden">
        <h1 className="text-base md:text-xl font-bold text-foreground">
          Gerar QRcode
        </h1>
        <div className="flex items-center gap-4 max-md:justify-end max-md:w-full">
          <ExportDataDialog links={linksForExport} />

          <ProfileButton />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 max-md:p-4 bg-background">
        <Card className="bg-white border-none gap-2 w-full rounded">
          <CardHeader className="flex flex-col pb-0">
            <CardTitle className="text-lg text-black font-bold py-0">
              Detalhes
            </CardTitle>
            <CardDescription className="text-sm text-black font-bold py-0">
              Você pode criar 10 qrcodes por mês. Faça o upgrade para mais.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            <div className="flex flex-col gap-2">
              <Label className="text-black">Url de destino</Label>
              <Input
                className="bg-white dark:bg-white rounded border-black/40 text-black placeholder:text-black/80"
                id="fullName"
                type="text"
                placeholder="https://exemplo.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-black">Titulo do Url</Label>
              <Input
                className="bg-white dark:bg-white rounded border-black/40 text-black placeholder:text-black/60"
                id="fullName"
                type="text"
              />
            </div>
            <div>
              <Button className="text-white hover:text-white rounded bg-foreground hover:bg-foreground">
                Gerar QRcode
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col bg-white dark:bg-white border-none gap-2 rounded">
          <CardHeader className="flex items-center justify-center">
            <CardTitle className="flex justify-center text-center text-lg text-black font-bold">
              Visualizar
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="w-40 h-40 text-2xl font-bold text-black">
              Code gerado
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
