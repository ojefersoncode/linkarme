'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'basico',
    title: 'Básico',
    price: 29.9,
    color: 'white',
    features: [
      '50 Links',
      'QR Codes Personalizados',
      '3 Domínios Personalizados',
      'Organize seus Links',
      '30 Dias de Histórico de Cliques'
    ]
  },
  {
    id: 'pro',
    title: 'Pro',
    price: 49.9,
    color: 'foreground',
    features: [
      '100 Links',
      'Exportar dados',
      '10 Domínios Personalizados',
      '3 Contas Colaboração',
      '3 Meses de Histórico de Cliques'
    ]
  },
  {
    id: 'premium',
    title: 'Premium',
    price: 199.9,
    color: 'white',
    features: [
      'Links Ilimitados',
      'Estatísticas de Cliques por Tipo de Dispositivo',
      '50 Domínios Personalizados',
      '10 Contas Colaboração',
      '1 Ano de Histórico'
    ]
  }
];

export default function Prices() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState('monthly');

  function handleSelectPlan() {
    router.push('/auth/login');
  }

  return (
    <div className="space-y-6 p-4 md:items-center bg-transparent min-h-screen">
      <div className="flex flex-col pt-4 text-black justify-center items-center w-full">
        <h1 className="font-bold text-3xl max-md:text-xl">
          Atualize sua assinatura
        </h1>
        <h2 className="font-medium text-slate-800 text-xl max-md:text-base">
          Escolha um plano que combina com seu negoçio
        </h2>
        <div className="flex items-center py-4 gap-4">
          <span className="font-medium text-slate-900 text-lg"> Mensal</span>
          <Switch
            className="bg-white border-none"
            checked={billingCycle === 'annual'}
            onCheckedChange={(checked) =>
              setBillingCycle(checked ? 'annual' : 'monthly')
            }
          />
          <span className="font-medium text-slate-900 text-lg"> Anual</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pb-8 px-8 md:px-12 bg-transparent">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`${
              plan.color === 'foreground'
                ? 'bg-white text-black border-2 border-foreground'
                : 'bg-white text-black border-primary'
            }  space-y-4 w-full `}
          >
            <CardHeader className="flex flex-col justify-start pb-0">
              <CardTitle className="text-lg font-bold py-4">
                <div className="bg-primary text-black rounded-xl py-1 px-6">
                  {plan.title}
                </div>
              </CardTitle>
              <CardDescription className="flex justify-start items-center text-4xl text-nowrap text-black font-extrabold py-0 px-1 w-full">
                R$:
                {billingCycle === 'monthly'
                  ? plan.price.toFixed(2)
                  : (plan.price * 10).toFixed(2)}
                <span className="text-sm pt-1 ml-2">
                  /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 w-full justify-start space-y-6">
              <ul className="flex flex-col w-full justify-start gap-4 text-sm font-medium text-black/70">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-foreground" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex w-full pb-4 justify-center items-center">
              <Button
                onClick={handleSelectPlan}
                className={`cursor-pointer text-sm md:text-base font-semibold py-4 md:py-6 w-full ${
                  plan.color === 'foreground'
                    ? 'bg-foreground text-white hover:bg-foreground'
                    : 'bg-white border md:border-2 border-black text-black hover:bg-white/90'
                }`}
              >
                Escolher seu plano
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
