import Avatars from '@/components/LandingPage/Avatars';
import Companies from '@/components/LandingPage/Companies';
import Faq from '@/components/LandingPage/Faq';
import Footer from '@/components/LandingPage/Footer';
import Navbar from '@/components/LandingPage/Navbar';
import Prices from '@/components/LandingPage/Prices';
import ProductsCards from '@/components/LandingPage/ProductsCards';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-background to-background space-y-8">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center px-4 md:px-6 py-16 text-center">
        <div className="md:text-start space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-5xl font-semibold text-black">
              Solução completa para personalizar e gerenciar seus links
            </h1>
            <p className="text-base md:text-start md:text-xl font-medium text-black/80">
              Gerencie e acompanhe o desempenho de seus links, atraves de uma
              plataforma pensada para agencias de marketing, profissionais de
              marketing e criadores de conteúdo.
            </p>
          </div>

          <div className="flex items-center gap-4 md:gap-6 w-full justify-center md:justify-start max-md:px-4">
            <Button className="cursor-pointer py-5 w-full flex-1 font-medium text-base text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
              Começar Agora
            </Button>

            <Button className="px-0 bg-transparent hover:bg-transparent flex-nowrap items-center gap-2">
              <div className="flex flex-row flex-nowrap items-center gap-1">
                <Plus className="w-4 h-4 md:w-5 md:h-5 text-black" />
                <p className="text-xs md:text-sm text-nowrap text-black/80 font-normal">
                  de 1000 clientes satisfeitos
                </p>
              </div>

              <Avatars />
            </Button>
          </div>
        </div>

        <div className="w-full">
          <img src="/dashboard.png" alt="" className="w-full rounded-xl" />
        </div>
      </div>

      <div>
        <Companies />
      </div>

      <div>
        <ProductsCards />
      </div>

      <div>
        <Prices />
      </div>

      <div className="flex w-full px-4 md:px-6">
        <Faq />
      </div>
      <Footer />
    </div>
  );
}
