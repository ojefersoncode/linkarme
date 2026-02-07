import Footer from '@/components/LandingPage/Footer';
import Navbar from '@/components/LandingPage/Navbar';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b to-35% from-primary to-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center mx-auto px-4 md:h-[400px] max-md:min-h-screen">
        <div className="text-center space-y-4">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-6xl md:max-w-5xl max-md:px-8 font-bold text-accent">
              Dashboard completa para rastreia os clicks nos seus anuncios
            </h1>
            <p className="text-lg md:text-2xl font-semibold text-foreground max-md:max-w-sm md:max-w-2xl mx-auto">
              links curtos personalizados com seu próprio domínio e acompanhe
              estatísticas detalhadas sobre seus leads.
            </p>
          </div>

          <div className="flex w-full justify-center items-center max-md:py-4">
            <ShimmerButton className="shadow-2xl max-md:w-sm">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight bg-accent dark:bg-accent text-white/90 dark:from-white dark:to-accent">
                Teste gratis por 14 dias
              </span>
            </ShimmerButton>
          </div>

          <div className="pb-4 px-2 md:hidden">
            <img
              className="border-0.5 shadow-lg shadow-primary rounded-md"
              src="/dashboard.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="md:p-12 max-md:hidden">
        <img
          className="shadow-xl shadow-primary rounded-lg"
          src="/dashboard.png"
          alt=""
        />
      </div>
      <Footer />
    </div>
  );
}
