import { Card, CardContent } from '../ui/card';

export default function Climate() {
  return (
    <div>
      <Card className="py-6 bg-gradient-to-l to-20% from-cyan-200 to-white text-black shadow shadow-primary border-none gap-2">
        <CardContent className="flex w-full justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl max-md:text-xl font-bold">
              Bem vindo, Jeferson!
            </h1>
            <h2 className="text-sm font-medium">
              Vamos para mais um dia produtivo!
            </h2>
            <div className="flex gap-2 pt-8">
              <span className=" text-6xl max-md:text-4xl font-bold">10:36</span>
              <p className="text-lg max-md:text-sm pt-8 max-md:pt-4">PM</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 justify-end">
              <img
                className="w-14 h-14 max-md:w-10  max-md:h-10"
                src="/clima/chuva.png"
                alt=""
              />
              <h2 className="text-6xl max-md:text-4xl font-bold">26°</h2>
            </div>

            <div className="flex flex-col">
              <span className="text-end text-base font-medium">Chuvoso</span>
              <span className="text-end text-base font-medium">Ponte Nova</span>
              <span className="text-end text-base font-medium">
                Quinta-feira, 12/02/2026
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
