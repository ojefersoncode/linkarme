'use client';

import { useState, useEffect } from 'react';
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
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2, Check } from 'lucide-react';

const plans = [
  {
    id: 'basico',
    title: 'Básico',
    price: 29.9,
    color: 'foreground',
    features: [
      '500 links',
      '10 QR Codes personalizados',
      'Domínio personalizado',
      'Organize seus links',
      'Tenha métricas reais'
    ]
  },
  {
    id: 'pro',
    title: 'Pro',
    price: 49.9,
    color: 'white',
    features: [
      '1000 links',
      '20 QR Codes personalizados',
      'Domínio personalizado',
      'Organize seus links',
      'Tenha métricas reais'
    ]
  },
  {
    id: 'premium',
    title: 'Premium',
    price: 199.9,
    color: 'white',
    features: [
      'Links ilimitados',
      '50 QR Codes personalizados',
      'Domínio personalizado',
      'Organize seus links',
      'Tenha métricas reais'
    ]
  }
];

export default function Checkout() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se vem de um sucesso na URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setSuccess(true);
      toast.success('Pagamento realizado com sucesso!');
      // Limpar URL
      window.history.replaceState({}, document.title, '/dashboard/checkout');
    }
    if (params.get('cancelled') === 'true') {
      toast.error('Pagamento cancelado');
      window.history.replaceState({}, document.title, '/dashboard/checkout');
    }
  }, []);

  async function handleSelectPlan(planId: string) {
    try {
      setLoading(planId);
      setError(null);

      const response = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          planId,
          billingCycle
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar sessão de pagamento');
      }

      const { url } = await response.json();

      if (url) {
        // Redirecionar para o Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error('Erro ao gerar URL de checkout');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao processar pagamento';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6 bg-background min-h-screen">
      <NavbarDashboard />

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mx-28 flex items-center gap-3">
          <Check className="text-green-600" />
          <div>
            <h3 className="font-semibold text-green-900">
              Pagamento realizado com sucesso!
            </h3>
            <p className="text-sm text-green-700">
              Sua assinatura foi ativada. Você pode acessar todos os recursos.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-28">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="flex flex-col pt-4 text-black justify-center items-center w-full">
        <h1 className="font-bold text-2xl max-md:text-xl">
          Atualize sua assinatura
        </h1>
        <h2 className="font-semibold text-slate-700 text-xl max-md:text-lg">
          Escolha um plano que combina com seu negoçio
        </h2>
        <div className="flex items-center py-4 gap-4">
          <span className="font-semibold text-slate-800 text-xl"> Mensal</span>
          <Switch
            className="bg-white border-none"
            checked={billingCycle === 'annual'}
            onCheckedChange={(checked) =>
              setBillingCycle(checked ? 'annual' : 'monthly')
            }
          />
          <span className="font-semibold text-slate-800 text-xl"> Anual</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pb-8 px-28 bg-background">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`${
              plan.color === 'foreground'
                ? 'bg-foreground text-white border-none shadow-lg shadow-foreground'
                : 'bg-white text-black border-none shadow-xl/20 shadow-foreground'
            } justify-center items-center border-none space-y-4 w-full `}
          >
            <CardHeader className="flex flex-col justify-center items-center pb-0">
              <CardTitle className="text-lg font-bold py-0">
                {plan.title}
              </CardTitle>
              <CardDescription
                className={`text-center flex justify-center text-2xl text-nowrap text-black font-extrabold py-0 w-full ${
                  plan.color === 'foreground' ? ' text-white' : ' text-black'
                }`}
              >
                R$:{' '}
                {billingCycle === 'monthly'
                  ? plan.price.toFixed(2)
                  : (plan.price * 10).toFixed(2)}
                <span className="text-sm ml-2">
                  /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="py-2 px-12 w-full justify-start space-y-6">
              <ul className="flex flex-col w-full justify-start gap-4 list-disc text-sm font-semibold">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex w-full pb-4 justify-center items-center">
              <Button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={loading !== null}
                className={`cursor-pointer text-base font-semibold py-6 w-full ${
                  plan.color === 'foreground'
                    ? 'bg-white text-black hover:bg-white'
                    : 'bg-foreground text-white hover:bg-foreground'
                }`}
              >
                {loading === plan.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Escolha seu plano'
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
