import Footer from '@/components/LandingPage/Footer';
import Navbar from '@/components/LandingPage/Navbar';
import Prices from '@/components/LandingPage/Prices';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center mx-auto px-4 py-16 text-center">
        <div className="text-start space-y-4">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-6xl md:max-w-5xl max-md:px-6 font-semibold text-accent">
              Solução completa para criar links curtos e personalizados
            </h1>
            <p className="text-base text-start md:text-2xl max-md:px-6 font-medium text-accent/80 md:max-w-2xl">
              Solução completa para encurtar URLs, personalizar links e
              acompanhar o desempenho de seus links.
            </p>
          </div>

          <div className="flex w-full justify-start max-md:px-6 items-center">
            <Button className="cursor-pointer py-6 px-12 font-medium text-base text-white dark:text-white bg-foreground dark:bg-foreground hover:bg-foreground/90 dark:hover:bg-foreground/90">
              Começar Agora
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Prices />
      </div>
      <Footer />
    </div>
  );
}
