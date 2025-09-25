import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Card } from '../ui/card';

export default function Footer() {
  return (
    <footer className="w-full border-t border-accent/40 bg-background p-6">
      {/* Topo */}
      <div className="grid grid-cols-1 md:gap-8 md:grid-cols-3 lg:grid-cols-4">
        {/* Marca */}
        <Card className="border-none bg-transparent shadow-none max-w-sm">
          <h1 className="text-xl font-bold text-white">LinKarme</h1>
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

        {/* Contato */}
        <Card className="p-4 border border-accent/50 bg-accent/40 dark:bg-accent/20 shadow-none h-min">
          <h2 className="font-semibold text-white">Entre em contato</h2>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-white/80">Email: contato@linkarme.com</p>
            <p className="text-sm text-white/80">WhatsApp: (99) 9999-9999</p>
          </div>
        </Card>
      </div>

      {/* Base */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-6 text-sm text-white/80 md:flex-row">
        <span>
          © {new Date().getFullYear()} LinKarme. Todos os direitos reservados.
        </span>
        <div className="flex gap-4 text-white">
          <Linkedin className="size-5 cursor-pointer hover:text-white/80" />
          <Instagram className="size-5 cursor-pointer hover:text-white/80" />
          <Facebook className="size-5 cursor-pointer hover:text-white/80" />
          <Youtube className="size-5 cursor-pointer hover:text-white/80" />
        </div>
      </div>
    </footer>
  );
}
