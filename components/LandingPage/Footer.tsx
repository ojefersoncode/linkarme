import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Card } from '../ui/card';
import { GridBeams } from '../ui/grid-beams';

export default function Footer() {
  return (
    <footer className="w-full border-t border-accent/40 bg-background p-6">
      {/* Topo */}
      <div className="grid grid-cols-1 md:gap-8 md:grid-cols-3 lg:grid-cols-4">
        {/* Marca */}
        <Card className="border-none bg-transparent shadow-none max-w-sm">
          <img
            src="/Linklogo.png"
            alt="logo-name"
            className="h-12 max-md:h-5 max-md:w-32 px-0"
          />
          <p className=" text-sm text-white/70 max-w-xs">
            Plataforma de encurtamento e rastreamento de links para
            empreendedores digitais.
          </p>
        </Card>

        {/* Plataforma */}
        <Card className="border-none bg-transparent shadow-none">
          <h2 className="font-semibold text-white">Plataforma</h2>
          <div className=" flex flex-col gap-2 text-sm text-white/70">
            <span>Preços</span>
            <span>Afiliados</span>
            <span>Sobre</span>
          </div>
        </Card>

        {/* Legais */}
        <Card className="border-none bg-transparent shadow-none">
          <h2 className="font-semibold text-white">Legais</h2>
          <div className=" flex flex-col gap-2 text-sm text-white/70">
            <span>Termos de serviços</span>
            <span>Política de privacidade</span>
          </div>
        </Card>

        <GridBeams className="h-28 px-4 pt-4 border border-accent/60 dark:border-accent/60 rounded-lg">
          <div>
            <h2 className="font-bold text-white dark:text-white">
              Entre em contato
            </h2>

            <div className="flex flex-col gap-2 mt-2">
              <p className="text-sm font-normal text-muted">
                Email: contato@linkarme.com
              </p>
              <p className="text-sm font-normal text-muted">
                WhatsApp: (99) 9999-9999
              </p>
            </div>
          </div>
        </GridBeams>
      </div>

      {/* Base */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-6 text-sm md:flex-row">
        <div className="flex gap-4">
          <Instagram className="size-5 cursor-pointer text-muted dark:text-muted hover:text-muted/80" />
          <Linkedin className="size-5 cursor-pointer text-muted dark:text-muted hover:text-muted/80" />
          <Youtube className="size-5 cursor-pointer text-muted dark:text-muted hover:text-muted/80" />
        </div>
        <span className="text-muted-foreground">
          © {new Date().getFullYear()} Linktraces. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}