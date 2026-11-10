# 🤖 AI Agent Handoff & Architecture Blueprint
# ⚡ Heróis da Multiplicação & Missão Tabuada

> **Para qualquer IA ou Desenvolvedor:** Este documento é a fonte única da verdade técnica, comercial e de infraestrutura deste repositório. Leia este guia na íntegra antes de realizar qualquer alteração no código, nos entregáveis em PDF, na página de vendas, no webapp ou na integração com o checkout.

---

## 📌 1. Visão Geral do Projeto

- **Produto:** "Missão Tabuada" e "Liga dos Heróis da Matemática".
- **Nicho:** Educação Infantil / Ensino Fundamental I (crianças de 6 a 10 anos).
- **Público-Alvo:** Mães de 25 a 45 anos, das classes B, C e D no Brasil, que enfrentam batalhas diárias de lição de casa com filhos travando, chorando ou desmotivados na tabuada e na matemática básica.
- **Proposta Única de Valor (UVP):** Método lúdico progressivo de 15 minutos diários com heróis e missões gamificadas que destrava a tabuada e o cálculo mental sem brigas, com PDFs prontos para impressão física e webapp interativo estilo Duolingo.
- **Repositório Oficial:** `https://github.com/setorbackstage/herois-da-multiplicacao` (Branch: `main`)
- **Repositório Espelho:** `https://github.com/xavier2bit/missao-tabuada` (Branch: `main`)
- **Hospedagem Principal de Produção:** **Vercel Edge Network**

---

## 🌐 2. Mapa de URLs Oficiais Ativas (Produção)

| Destino | URL Pública | Finalidade |
| :--- | :--- | :--- |
| **Página de Vendas Oficial** | `https://heroisdamultiplicacao.vercel.app/` | Landing page de vendas de alta conversão (Tráfego Direto) |
| **Webapp Gamificado (Estilo Duolingo)** | `https://heroisdamultiplicacao.vercel.app/app` | Webapp com voz falada (Speech API), carteirinha e 10 missões |
| **Página de Obrigado Oficial** | `https://heroisdamultiplicacao.vercel.app/obrigado` | Entrega imediata pós-compra, confetes e download dos 6 PDFs |
| **Checkout R$ 10 (Front-End 1)** | `https://ggcheckout.app/checkout/X7MW1ajXduVAyxH95jw6lT` | Checkout direto do Kit Básico de Multiplicação |
| **Checkout R$ 27 (Front-End 2)** | `https://ggcheckout.app/checkout/buJIuO7Th5tjHRGQB8dIQ8` | Checkout direto do Pacote Completo 4 Operações + App |

---

## 💳 3. Arquitetura do Funil no ggCheckout (Conta de Produção)

- **Business ID de Produção:** `97NDgszuaZQQCbErVLgw7jWmNAf1` (Conta `setorbackstage`)
- **Gateways Ativos:** **PushinPay** (PIX instantâneo) e **AmploPay** (Cartão de Crédito até 12x).
- **Campos do Formulário:** CPF desativado (`haveCpf: false`) para máxima velocidade de conversão; Nome e WhatsApp obrigatórios.
- **Entrega Automática:** Webhook em `https://heroisdamultiplicacao.vercel.app/api/webhook-entrega`.

### Checkouts de Produção:
1. **Front-End 1 (R$ 10,00):** `Missão Tabuada — Volume 1 (Digital & Interativo)`
   - Public ID: `X7MW1ajXduVAyxH95jw6lT` (UID: `dc050f22-81f8-46e1-92e8-6db95f44c18e`)
   - Order Bump (R$ 9,90): `Mega Fichas de Cálculo Rápido & Desafios Antitelas`
   - 1-Click Upsell (R$ 17,00): `UPGRADE EXCLUSIVO: Adicione Todos os 5 Bônus + WebApp`
   - Redirecionamento Pós-Venda: `https://heroisdamultiplicacao.vercel.app/obrigado`
2. **Front-End 2 (R$ 27,00):** `Liga dos Heróis da Matemática — Kit Completo + App Duolingo`
   - Public ID: `buJIuO7Th5tjHRGQB8dIQ8` (UID: `f8598902-9a59-4fe4-acdf-fb59671ff109`)
   - Order Bump 1 (R$ 9,90): `Mega Fichas de Cálculo Rápido & Desafios Antitelas`
   - Order Bump 2 (R$ 5,90): `Gabarito Ilustrado Passo a Passo & Guia para Pais`
   - 1-Click Upsell (R$ 29,90): `Coleção Completa das 4 Operações (55% OFF)`
   - Redirecionamento Pós-Venda: `https://heroisdamultiplicacao.vercel.app/obrigado`

---

## 🎨 4. Esquema de Estilização & Correção de Contraste no ggCheckout

> [!WARNING]
> **Atenção Crítica de UI:** O ggCheckout usa Tailwind CSS com `next-themes`. Celulares de clientes em modo escuro herdam a classe `dark` no elemento `<html>`, o que torna títulos herdados brancos (`#FAFAFA`). Como o card do bump tem fundo branco fixo, os títulos tornam-se completamente invisíveis caso não sejam explicitamente sobrescritos na API!

### O Payload Obrigatório no `update_checkout` (já aplicado e testado com sucesso):
```json
{
  "checkout": {
    "theme": "light",
    "primaryColor": "#2563EB",
    "buttonColor": "#16A34A",
    "buttonTextColor": "#FFFFFF",
    "section": {
      "bgColor": "#F8FAFC",
      "borderColor": "#E2E8F0",
      "orderBumps": {
        "title": "⚡ Aproveite e Adicione ao Pedido:",
        "colorTitle": "#0F172A",
        "bgColor": "#FFFFFF",
        "bgOrderbumpBorder": "#2563EB",
        "buttonText": "+ Adicionar ao Pedido",
        "hideDescription": false,
        "showInstallments": true
      },
      "cardPhotoAndTitle": {
        "colorTitle": "#0F172A",
        "authorTextColor": "#475569"
      },
      "summaryOrder": {
        "summaryBgColor": "#FFFFFF",
        "borderColor": "#E2E8F0",
        "colorTitle": "#0F172A",
        "colorOrderBumpsTitle": "#0F172A",
        "dividerColor": "#E2E8F0"
      },
      "cardPayment": {
        "buttonColor": "#16A34A",
        "buttonTextColor": "#FFFFFF",
        "titleTextColor": "#0F172A"
      }
    }
  }
}
```
* **Mapeamento:** O parâmetro `section.orderBumps.colorTitle: "#0F172A"` força um estilo inline `style="color: #0F172A"` no `<h3>` do componente React do checkout, garantindo 100% de contraste em qualquer celular (tanto em modo claro quanto escuro).

---

## 📱 5. Banners Mobile-First do Checkout

- **Proporção:** 2.2:1 (750x340 px rendered @2x retina).
- **Modelos HTML:**
  - [`banner1_mobile.html`](file:///c:/Users/Admin/Downloads/Criativos/banner1_mobile.html): Banner para a Missão Tabuada (Front-End 1).
  - [`banner2_mobile.html`](file:///c:/Users/Admin/Downloads/Criativos/banner2_mobile.html): Banner para a Liga dos Heróis (Front-End 2).
- **Re-renderização:** `node render_mobile_banners.js`.

---

## 📚 6. Os 6 Entregáveis em PDF A4 Prontos para Impressão

1. **`Missao_Tabuada_Volume_1.pdf`** (43 págs) — Livro oficial mestre com 944 AcroForms interativos, contas verificadas e Certificado de Herói.
2. **`Cronograma_Mestre_12_Semanas.pdf`** (6 págs) — Planejamento pedagógico semana a semana de 15 minutos para os pais.
3. **`Caderno_de_Atividades_Fichas_Diarias.pdf`** (10 págs) — 20 fichas diárias destacáveis (360 contas rápidas).
4. **`Caderno_de_Pintura_Multiplicacao.pdf`** (8 págs) — 6 artes para colorir com os resultados da tabuada ("Color by Number").
5. **`Desafios_Semanais_Acompanhamento.pdf`** (8 págs) — 12 testes de progresso contínuo e gabarito.
6. **`Jogos_da_Tabuada_Trilha_Domino_Bingo.pdf`** (8 págs) — Tabuleiro gigante, peões 3D, dominó, baralho e bingo.

---

## 🎯 7. Arsenal de 20 Criativos & Estratégia de Mídia (Meta Ads)

Consulte o playbook completo em [`knowledge_base/PLAYBOOK_MESTRE_HEROIS_DA_MULTIPLICACAO.md`](file:///c:/Users/Admin/Downloads/Criativos/knowledge_base/PLAYBOOK_MESTRE_HEROIS_DA_MULTIPLICACAO.md):

- **Meta de CPA / CAC:** R$ 7,00 a R$ 12,00.
- **Ticket Médio (AOV Projetado):** R$ 23,00 a R$ 28,00.
- **ROAS Esperado:** 2.2x a 3.0x no front-end.
- **Público:** Mulheres de 28 a 48 anos, Brasil, Aberto (Broad).
- **Estratégia de Lance:** CBO com Bid Cap de R$ 10,00 ou maior volume para validação inicial de 48h.
