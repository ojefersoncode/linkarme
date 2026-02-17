import { Link, QrCode, Scissors } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-12 px-6 max-md:px-4">
      <Card className="bg-white border-2 border-primary shadow-none gap-4">
        <CardHeader className="flex flex-col gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Scissors className="h-5 w-5 text-foreground" />
          </div>

          <CardTitle className="text-xl text-black font-semibold py-0">
            Encurtador
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm font-normal text-black">
            Crie Links curtos e personalizados usando seu dominio crie campanhas
            usando nossos links e acompanhe o desempenho de cada campanha.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white border-2 border-primary shadow-none gap-4">
        <CardHeader className="flex flex-col gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <QrCode className="h-5 w-5 text-foreground" />
          </div>
          <CardTitle className="text-xl text-black font-semibold py-0">
            Qrcodes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm font-normal text-black">
            Crie qrcodes usando seu link e personalize-os, edite cor e adicione
            imagem ao seu qrcode, voçe támbem pode acompanhar o desempenho dos
            seus qrcodes na dashboard.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white border-2 border-primary shadow-none gap-4">
        <CardHeader className="flex flex-col gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Link className="h-5 w-5 text-foreground" />
          </div>
          <CardTitle className="text-xl text-black font-semibold py-0">
            Linkbio
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm font-normal text-black">
            Cronstrua seu linkbio usando uma ferramenta simples e intuitiva, use
            seu dominio, acompanhe o desempenho do seu linkbio.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
