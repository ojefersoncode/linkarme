import { Instagram, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white  px-6">
      {/* Base */}
      <div className="flex flex-col max-md:flex-col-reverse items-center justify-between py-8 gap-4 text-sm text-black md:flex-row">
        <span>
          © {new Date().getFullYear()} Linktraces. Todos os direitos reservados.
        </span>
        <div className="flex gap-4 text-black">
          <Phone className="size-5 cursor-pointer" />
          <Instagram className="size-5 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
