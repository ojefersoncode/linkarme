import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

const plans = {
  basico: {
    name: 'Básico',
    price_monthly: 2990, // R$ 29.90 em centavos
    price_annual: 29900, // R$ 299.00 em centavos
  },
  pro: {
    name: 'Pro',
    price_monthly: 4990, // R$ 49.90 em centavos
    price_annual: 49900, // R$ 499.00 em centavos
  },
  premium: {
    name: 'Premium',
    price_monthly: 19990, // R$ 199.90 em centavos
    price_annual: 199900, // R$ 1999.00 em centavos
  },
};

export async function POST(request: NextRequest) {
  try {
    const { planId, billingCycle } = await request.json();

    // Validar entrada
    if (!planId || !billingCycle) {
      return NextResponse.json(
        { error: 'planId and billingCycle are required' },
        { status: 400 }
      );
    }

    if (!['basico', 'pro', 'premium'].includes(planId)) {
      return NextResponse.json({ error: 'Invalid planId' }, { status: 400 });
    }

    if (!['monthly', 'annual'].includes(billingCycle)) {
      return NextResponse.json(
        { error: 'Invalid billingCycle' },
        { status: 400 }
      );
    }

    // Validar variáveis de ambiente
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY não configurada');
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Obter usuário do Supabase
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const plan = plans[planId as keyof typeof plans];
    const price = billingCycle === 'monthly' ? plan.price_monthly : plan.price_annual;

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: plan.name,
              description: `Plano ${plan.name} - ${billingCycle === 'monthly' ? 'Mensal' : 'Anual'}`,
            },
            unit_amount: price,
            recurring: {
              interval: billingCycle === 'monthly' ? 'month' : 'year',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        planId: planId,
        billingCycle: billingCycle,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/checkout?cancelled=true`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
