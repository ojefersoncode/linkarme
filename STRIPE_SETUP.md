# Guia de Integração Stripe - LinkArme

## 📋 O que foi feito

A integração com Stripe foi completamente implementada! Aqui está o que foi criado:

### 1. **Dependências Instaladas**

- `stripe` - Biblioteca oficial do Stripe
- `@stripe/react-stripe-js` - Componentes React do Stripe

### 2. **Rotas API Criadas**

#### `/api/stripe/checkout-session` (POST)

- Cria uma sessão de checkout no Stripe
- Requer autenticação do usuário
- Aceita: `planId` (basico, pro, premium) e `billingCycle` (monthly, annual)
- Retorna: URL de redirecionamento para o Stripe Checkout

#### `/api/stripe/webhook` (POST)

- Recebe eventos do Stripe
- Atualiza o banco de dados Supabase quando:
  - ✅ Pagamento é concluído
  - ✅ Inscrição é criada
  - ✅ Inscrição é atualizada
  - ✅ Inscrição é cancelada
  - ✅ Pagamento falha

### 3. **Página Checkout Atualizada**

- Agora é uma página client-side com interatividade
- Toggle funcional entre **Mensal** e **Anual**
- Preços ajustados dinamicamente
- Botões integrados com Stripe
- Estados de carregamento
- Feedback de sucesso/erro

## 🔧 Como Configurar

### Passo 1: Obter Credenciais do Stripe

1. Acesse [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Se não tiver conta, crie uma (Stripe oferece teste gratuito)
3. Vá para **Developers** → **API keys**
4. Copie:
   - **Publishable key** (começa com `pk_`)
   - **Secret key** (começa com `sk_`)

### Passo 2: Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (sua chave pública)
STRIPE_SECRET_KEY=sk_test_... (sua chave secreta)
STRIPE_WEBHOOK_SECRET=whsec_... (veja como obter abaixo)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Passo 3: Configurar Webhook

1. No Stripe Dashboard, vá para **Developers** → **Webhooks**
2. Clique em **Add endpoint**
3. Insira a URL (em produção): `https://seu-dominio.com/api/stripe/webhook`
   - Em desenvolvimento local use: `http://localhost:3000/api/stripe/webhook`
   - Para testar localmente, use [Stripe CLI](#stripe-cli)
4. Selecione os eventos que deseja receber:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copie o **Signing secret** e adicione em `.env.local` como `STRIPE_WEBHOOK_SECRET`

### Passo 4: Atualizar Banco de Dados

Você precisa adicionar colunas à tabela `profiles` no Supabase:

```sql
ALTER TABLE profiles ADD COLUMN subscription_plan VARCHAR(50) DEFAULT 'free';
ALTER TABLE profiles ADD COLUMN stripe_customer_id VARCHAR(255);
ALTER TABLE profiles ADD COLUMN stripe_subscription_id VARCHAR(255);
ALTER TABLE profiles ADD COLUMN subscription_status VARCHAR(50);
```

## 🧪 Testando Localmente

### Com Stripe CLI (Recomendado)

1. Instale [Stripe CLI](https://stripe.com/en-br/docs/stripe-cli)
2. Faça login:
   ```bash
   stripe login
   ```
3. Inicie o forwarding:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. Copie o `whsec_...` mostrado e adicione em `.env.local` como `STRIPE_WEBHOOK_SECRET`

### Cartões de Teste

Use estes números de cartão para testar:

| Cartão              | Status       | CVV      | Data   |
| ------------------- | ------------ | -------- | ------ |
| 4242 4242 4242 4242 | ✅ Sucesso   | Qualquer | Futuro |
| 4000 0000 0000 0002 | ❌ Falha     | Qualquer | Futuro |
| 4000 0000 0000 3220 | ⚠️ 3D Secure | Qualquer | Futuro |

## 🎯 Fluxo de Pagamento

1. Usuário seleciona um plano na página `/dashboard/checkout`
2. Clica em **"Escolha seu plano"**
3. É redirecionado para o Stripe Checkout
4. Preenche dados de cartão (use cartões de teste)
5. Conclui o pagamento
6. Webhook recebe o evento `checkout.session.completed`
7. Perfil do usuário é atualizado no Supabase com:
   - `subscription_plan` = plano escolhido
   - `stripe_customer_id` = ID do cliente no Stripe
8. Usuário é redirecionado de volta com mensagem de sucesso

## 📊 Monitorar Eventos

No Stripe Dashboard:

- Vá para **Developers** → **Events**
- Veja todos os eventos processados
- Verifique logs de qualquer webhook que falhou

## 💳 Preços Configurados

### Mensal

- **Básico**: R$ 29,90
- **Pro**: R$ 49,90
- **Premium**: R$ 199,90

### Anual

- **Básico**: R$ 299,00 (economia de ~75%)
- **Pro**: R$ 499,00 (economia de ~75%)
- **Premium**: R$ 1.999,00 (economia de ~75%)

_Você pode ajustar os preços em `/app/api/stripe/checkout-session/route.ts`_

## 🚀 Próximos Passos Opcionais

1. **Portal do Cliente Stripe**: Permitir que clientes gerenciem assinaturas
2. **Verificar Plano**: Criar middleware para verificar `subscription_plan` nas rotas
3. **Cancelamento**: Implementar rota para cancelar assinatura
4. **Recuperação de Faturas**: Mostrar histórico de faturas ao usuário
5. **E-mails de Confirmação**: Integrar com Resend ou SendGrid

## 📞 Suporte

Para dúvidas:

- [Documentação Stripe](https://stripe.com/docs)
- [Documentação Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Comunidade Stripe](https://stripe.com/community)

---

**Status**: ✅ Integração completa e pronta para uso!
