# 05 — QA CHECKLIST PRÉ-LANÇAMENTO (TRÁFEGO PAGO R$ 30/DIA)

**Regra de Ouro:** Não subir campanha paga no Meta Ads até marcar todos os itens `BLOQUEADOR` abaixo.

---

## 1. Experiência Mobile e Velocidade (`375px` / `390px`)
- [ ] **Sem overflow horizontal:** `document.documentElement.scrollWidth <= window.innerWidth` em `375×667` e `390×844`.
- [ ] **Distância até a oferta:** Usuário visualiza o resumo da oferta e preços (`R$ 10` / `R$ 27`) nas primeiras **3 a 5 dobras** mobile.
- [ ] **Zero erros 404 de mídia:** Todas as `<img>` carregam com `naturalWidth > 0`; nenhum `<video>` aponta para arquivo inexistente.
- [ ] **Correção de CSS:** `:root` limpo (variáveis `--ink-title`, `--ink-body`, `--ink-muted` válidas) e todos os CTAs com aparência de botão íntegra (sem `.btn.btn-primary` quebrado).
- [ ] **Contraste e legibilidade:** Fontes mínimas >= `14px` em texto corrido; barra fixa mobile não cobre texto de botões ao rolar até o final.

## 2. Conteúdo, Oferta e Compliance
- [ ] **Coerência sazonal:** Versão pública de Novembro exibe `REVISÃO DE FIM DE ANO` e headline aprovada (*"A tabuada ainda é um desafio?..."*). Variante de férias (`preview_dez_jan_ferias.html`) guardada sem publicação até Dezembro.
- [ ] **Provas sociais e promessas:** Zero menção não comprovada a `"3.400 famílias"`, `"Avaliações Verificadas"`, `"economia de R$ 1.000"`, `"em 2 semanas"`, `"aprovação garantida"` ou termos de `"dopamina / áreas neurais"` sem fonte.
- [ ] **Clareza Impresso vs WebApp:** Visitante entende imediatamente antes de clicar em comprar: (a) 6 PDFs são digitais em A4 para imprimir (não envia pelos Correios), (b) WebApp roda no navegador sem instalar, (c) WebApp e os 5 bônus pertencem ao Combo R$ 27.
- [ ] **Coerência de preços e páginas:** LP, WebApp (`app.html` -> corrigir `R$ 27,90` para `R$ 27,00`) e checkouts exibem exatamente **R$ 10,00** e **R$ 27,00**.
- [ ] **Banner do Checkout 2 atualizado:** Substituir texto `"PACOTE COMPLETO 4 OPERAÇÕES / + DE 200 PÁGINAS"` na GGCheckout por comunicação fiel à Liga dos Heróis (Multiplicação).
- [ ] **Imagens matematicamente corretas:** Nenhuma imagem pública ou criativo de anúncio contém contas erradas (conferido contra lista de bloqueados em `04_ASSETS_CRIATIVOS/README_ASSETS_E_IDENTIDADE.md`).

## 3. Checkout GGCheckout e Meio de Pagamento
- [ ] **Chave MCP / API atualizada:** Conectar `GGCHECKOUT_API_KEY` da conta de produção `setorbackstage` (`97NDgszuaZQQCbErVLgw7jWmNAf1`) para confirmar taxas, order bumps, upsell e configurações de pixel.
- [ ] **Teste real PIX e Cartão (conta de produção):** Testar geração de PIX (PushinPay) e formulário de Cartão (AmploPay) nos checkouts `X7MW1ajXduVAyxH95jw6lT` e `buJIuO7Th5tjHRGQB8dIQ8`.
- [ ] **Taxa líquida registrada:** Confirmar taxas exatas de plataforma + gateway no painel `setorbackstage` e calcular CPA de equilíbrio real.
- [ ] **Conta Meta Ads pronta:** Cadastrar forma de pagamento ativa em `CA - XD OFertas` (`963451476522179`).

## 4. Rastreamento, Pixel (`2683241518773685`), CAPI e UTMs
- [x] **Meta Pixel + CAPI na LP (`index.html`) e `/obrigado` (`obrigado.html`) em código local:** Pixel oficial **`2683241518773685`** + disparo servidor via `/api/meta-capi` (`api/meta-capi.js` + `api/_meta-capi.js`) e `Purchase` server-side no webhook (`api/webhook-entrega.js`) com `event_id` para desduplicação e proteção anti-F5 (`sessionStorage`).
- [ ] **Variável `META_CAPI_TOKEN` na Vercel:** Cadastrar o Access Token da Conversions API (e opcionalmente `META_TEST_EVENT_CODE` para validar no Gerenciador de Eventos) nas Environment Variables da Vercel. *(Sem esse token, o site funciona normalmente só com Pixel de navegador até o token ser salvo).*
- [ ] **Validação pós-deploy com Meta Pixel Helper & Eventos de Teste:** Confirmar em `https://heroisdamultiplicacao.vercel.app/` (e `/obrigado`) após publicar: `PageView`, `ViewContent`, `InitiateCheckout` (pausa de `250ms`), `Purchase` (`BRL`) e desduplicação Browser + CAPI.
- [ ] **Checkouts na GGCheckout (`setorbackstage`):** Instalar Pixel **`2683241518773685`**, configurar redirecionamentos pós-compra (`?plan=basic` no Checkout `X7MW1ajXduVAyxH95jw6lT` e `?plan=premium` no Checkout `buJIuO7Th5tjHRGQB8dIQ8`), apontar webhook para `https://heroisdamultiplicacao.vercel.app/api/webhook-entrega`, remover depoimentos do rodapé e atualizar banner do Checkout 2 (`node render_mobile_banners.js` já com fonte `banner2_mobile.html` corrigida).
- [ ] **Preservação ponta a ponta das UTMs:** Navegar com `?utm_source=meta&utm_medium=paid_social&utm_campaign=tabuada_nov26&utm_content=C01_teste&utm_term=alerta`, clicar no CTA e confirmar que os 5 parâmetros aparecem na URL final do checkout `/checkout/v2/...` **E** ficam gravados no pedido/webhook da GGCheckout.

## 5. Pós-Compra, Build do `/app` e Acesso aos Entregáveis
- [ ] **Recompilar `/app-dist` (`npm run app:build`):** Código-fonte em `webapp/src/` e `app.html` já corrigidos para `R$ 27,00`, trava VIP em Apostilas A4 e desbloqueio via `/app?vip=liga27` ou código `LIGA27`. Rodar `npm run app:build` em `D:\downloads backup 2026nov\Criativos` antes do deploy para atualizar `app-dist/` servido na rota `/app`.
- [ ] **Re-renderizar banner do Checkout 2 (`node render_mobile_banners.js`):** Fonte `banner2_mobile.html` atualizada; gerar novo PNG em `tabuada-assets/` e subir na GGCheckout.
- [ ] **Redirecionamento pós-pagamento:** Testar fluxo real PIX/Cartão com redirect `?plan=basic` vs `?plan=premium`.
- [ ] **E-mail transacional funcional:** `email/email-boas-vindas.html` atualizado com `src` absoluto e bloco condicional `COMBO_ONLY`; configurar `RESEND_API_KEY` e `SENDER_EMAIL` em domínio verificado na Vercel e testar envio real.
- [ ] **WhatsApp de suporte:** Testar link `https://wa.me/5521993923582` no mobile e desktop.
