import { Card, CardContent, CardHeader } from '../ui/card';

export default function Companies() {
  return (
    <Card className="w-full flex flex-col justify-center items-center border-none shadow-none bg-transparent">
      <CardHeader className="w-full flex flex-row justify-center items-center">
        <h1 className="text-lg text-black/80 font-medium">
          Empresas que confiam em nossos serviços
        </h1>
      </CardHeader>
      <CardContent className="w-full flex flex-row justify-center items-center gap-6 md:gap-12 border-none shadow-none bg-transparent grayscale">
        <img src="/icon.png" alt="" className="w-10" />
        <img src="/icon.png" alt="" className="w-10" />
        <img src="/icon.png" alt="" className="w-10" />
        <img src="/icon.png" alt="" className="w-10" />
        <img src="/icon.png" alt="" className="w-10" />
      </CardContent>
    </Card>
  );
}
