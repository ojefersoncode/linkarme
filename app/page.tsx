import Footer from '@/components/LandingPage/Footer';
import Navbar from '@/components/LandingPage/Navbar';
import { GridBeams } from '@/components/ui/grid-beams';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export default function HomePage() {
  return (
    <GridBeams>
      <div className="min-h-screen">
        <Navbar />

        <div className="flex flex-col items-center justify-center mx-auto px-4 md:h-[400px] max-md:h-[600px]">
          <div className="text-center space-y-4">
            <div className="space-y-4 w-full flex flex-col justify-center items-center text-center">
              <h1 className="text-2xl md:text-6xl md:max-w-5xl text-center max-md:max-w-sm font-bold bg-[linear-gradient(to_right,var(--primary),var(--muted),var(--muted),var(--primary))] bg-clip-text text-transparent">
                Dashboard completa para rastrear os clicks nos seus links
              </h1>
              <p className="text-base font-semibold md:text-2xl text-muted-foreground max-md:max-w-sm md:max-w-2xl mx-auto">
                Crie links curtos personalizados com seu próprio domínio e
                acompanhe estatísticas detalhadas sobre seus leads.
              </p>
            </div>

            <div className="flex w-full justify-center items-center py-4">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-base max-md:text-sm font-medium leading-none tracking-tight bg-blue-600/5 dark:bg-blue-600/5 text-white/90 dark:from-white dark:to-slate-900/10">
                  Teste gratis por 14 dias
                </span>
              </ShimmerButton>
            </div>

            <div className="py-4 px-2 md:hidden flex  w-full justify-center">
              <img
                className="border border-accent/40 rounded-md"
                src="/dashboard.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className=" max-md:hidden px-12 pb-12 flex w-full justify-center">
          <img
            className="border border-accent/40 rounded-lg"
            src="/dashboard.png"
            alt=""
          />
        </div>
      </div>

      <Footer />
    </GridBeams>
  );
}
