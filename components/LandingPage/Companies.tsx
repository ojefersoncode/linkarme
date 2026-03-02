import { Card, CardContent, CardHeader } from '../ui/card';

const Logos = [
  { imagem: '/companies/localiza.png' },
  { imagem: '/companies/petlove.png' },
  { imagem: '/companies/zelo.png' },
  { imagem: '/companies/trocafone.png' }
];

export default function Companies() {
  return (
    <Card className="w-full flex flex-col justify-center items-center border-none shadow-none bg-transparent space-y-0">
      <CardHeader className="w-full flex flex-row justify-center items-center pb-0">
        <h1 className="text-2xl text-black/80 font-semibold">
          Empresas que confiam em nossos serviços
        </h1>
      </CardHeader>
      <CardContent className="w-full flex flex-row justify-center items-center pt-0 gap-6 md:gap-12 border-none shadow-none bg-transparent grayscale">
        {Logos.map((logo, index) => (
          <img
            key={index}
            src={logo.imagem}
            alt={`logo-${index}`}
            className="w-20 md:w-32 bg-transparent"
          />
        ))}
      </CardContent>
    </Card>
  );
}
