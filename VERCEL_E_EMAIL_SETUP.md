# ⚡ Guia de Infraestrutura: Vercel de Alta Velocidade & E-mails Transacionais

Este guia orienta como colocar a landing page dos **Heróis da Multiplicação** rodando na **Vercel** com carregamento instantâneo (< 1s) para não perder nenhum lead do tráfego pago, além de configurar a entrega de e-mails blindada contra caixa de spam.

---

## 🚀 1. Hospedagem na Vercel (Carregamento "Full Liso")

Em tráfego pago direto (Meta Ads / TikTok Ads), **cada 1 segundo de atraso no carregamento faz você perder de 10% a 20% das vendas**. A Vercel entrega seu site a partir de servidores Edge no Brasil (São Paulo - `gru1`), garantindo TTFB (Time to First Byte) inferior a 150ms.

### O que já está configurado no arquivo `vercel.json`:
1. **Rotas Limpas (Clean URLs):**
   - `https://seudominio.com/` → Carrega direto a página de vendas (`tabuada-offer.html`).
   - `https://seudominio.com/obrigado` → Carrega a página de obrigado (`obrigado.html`).
   - `https://seudominio.com/app` → Carrega o webapp interativo (`index.html`).
   - `https://seudominio.com/download` → Baixa o livro PDF oficial.
2. **Cache Agressivo de Mídias (Edge CDN):**
   - Imagens, mockups 3D, fontes e PDF são cacheados por **1 ano** (`immutable`). Na segunda visita ou troca de página, o carregamento é instantâneo (0 milissegundos).
3. **Otimizações no HTML:**
   - Imagens da primeira dobra com `fetchpriority="high"`.
   - Imagens abaixo da dobra com `loading="lazy" decoding="async"`.
   - Preconnect automático do Google Fonts e ggCheckout.

### Como subir na Vercel (Passo a Passo em 2 Minutos):
1. Acesse [vercel.com](https://vercel.com) e faça login com seu GitHub (`xavier2bit`).
2. Clique em **"Add New..." > "Project"**.
3. Selecione o repositório **`missao-tabuada`**.
4. *(Se estiver hospedando a partir do repositório direto, clique em **Deploy**).*
5. Pronto! Seu domínio Vercel (ex: `heroisdamultiplicacao.vercel.app`) estará ativo com SSL gratuito e velocidade máxima.

---

## 📧 2. Entrega de E-mails: Como Garantir que Chegue na Caixa de Entrada (Sem Spam)

### O Segredo da Entregabilidade (Os 3 Registros DNS)
Provedores como Gmail, Yahoo e Outlook bloqueiam ou jogam para o Spam qualquer e-mail cujo domínio não tenha estes 3 registros configurados:

1. **SPF (Sender Policy Framework):** Autoriza os servidores do seu disparador a enviar e-mails em nome do seu domínio.
2. **DKIM (DomainKeys Identified Mail):** Assinatura criptográfica que garante que o e-mail não foi alterado no caminho.
3. **DMARC (Domain-based Message Authentication):** Instrução para os provedores aceitarem seus e-mails legítimos:
   - Tipo TXT, Nome: `_dmarc.seudominio.com`
   - Valor: `v=DMARC1; p=none; rua=mailto:dmarc@seudominio.com`

---

## 🛠️ 3. Stack Open-Source / Custo Zero Recomendada

Para não ficar preso a ferramentas caras e pesadas (como ActiveCampaign ou RD Station):

### 🥇 Opção 1: Resend (Criadores do React-Email — Recomendado)
- **Base Open-Source:** Mantenedores do projeto open-source `react-email`.
- **Custo:** **Gratuito até 3.000 e-mails/mês** (ou 100/dia).
- **Vantagem:** Integração nativa com a Vercel Serverless Function em 5 linhas de código.
- **Como Ativar:**
  1. Crie uma conta gratuita em [resend.com](https://resend.com).
  2. Adicione e verifique seu domínio (o Resend te dá os registros DNS na hora).
  3. No painel da Vercel do seu projeto, vá em **Settings > Environment Variables** e adicione:
     - `RESEND_API_KEY`: sua chave `re_...`
     - `SENDER_EMAIL`: `Heróis da Multiplicação <acesso@seudominio.com>`
  4. Automaticamente, a rota `/api/webhook-entrega` disparará o template [`email/email-boas-vindas.html`](file:///c:/Users/setor/Downloads/Low%20Ticket%20Herois%20Multi/ofertas/herois-da-multiplicacao/email/email-boas-vindas.html)!

### 🥈 Opção 2: E-mail Nativo ggCheckout (Sem Configuração Extra)
- Se você não quiser configurar nenhum serviço externo agora, o **ggCheckout já envia o e-mail de entrega automático** para todo cliente que paga por PIX ou cartão, entregando o link da página de obrigado e o material.
