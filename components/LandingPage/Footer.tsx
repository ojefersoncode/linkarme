import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Card } from '../ui/card';

export default function Footer() {
  return (
    <footer className="w-full border-t border-accent/40 bg-foreground p-6">
      {/* Topo */}
      <div className="grid grid-cols-1 md:gap-8 md:grid-cols-3 lg:grid-cols-4">
        {/* Marca */}
        <Card className="border-none bg-transparent shadow-none max-w-sm">
          <h1 className="text-xl font-bold text-white">Linktraces</h1>
          <p className=" text-sm text-white max-w-xs">
            Plataforma de encurtamento e rastreamento de links para
            empreendedores digitais.
          </p>
        </Card>

        {/* Plataforma */}
        <Card className="border-none bg-transparent shadow-none">
          <h2 className="font-semibold text-white">Plataforma</h2>
          <div className=" flex flex-col gap-2 text-sm text-white">
            <span>Preços</span>
            <span>Afiliados</span>
            <span>Sobre</span>
          </div>
        </Card>

        {/* Legais */}
        <Card className="border-none bg-transparent shadow-none">
          <h2 className="font-semibold text-white">Legais</h2>
          <div className=" flex flex-col gap-2 text-sm text-white">
            <span>Termos de serviços</span>
            <span>Política de privacidade</span>
          </div>
        </Card>

        {/* Contato */}
        <Card className="border-none bg-transparent shadow-none">
          <h2 className="font-semibold text-white">Entre em contato</h2>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-white">Email: contato@linktraces.com</p>
            <p className="text-sm text-white">WhatsApp: (99) 9999-9999</p>
          </div>
        </Card>
      </div>

      {/* Base */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 pt-6 text-sm text-white md:flex-row">
        <span>
          © {new Date().getFullYear()} Linktraces. Todos os direitos reservados.
        </span>
        <div className="flex gap-4 text-white">
          <Linkedin className="size-5 cursor-pointer" />
          <Instagram className="size-5 cursor-pointer" />
          <Facebook className="size-5 cursor-pointer" />
          <Youtube className="size-5 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
