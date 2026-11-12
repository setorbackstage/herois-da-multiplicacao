# 07 — HANDOFF PARA O NOVO CHAT (PASTA ATUAL: `D:\downloads backup 2026nov\Criativos`)

**Data de atualização:** 11/11/2026  
**Objetivo da Operação V2.1:** Validar vendas com tráfego pago Meta Ads (`R$ 30/dia`) no funil sazonal de Novembro (**Revisão de Fim de Ano**), mantendo a variante de férias (`operacao_v2/preview_dez_jan_ferias.html`) guardada **sem publicação** até Dezembro.

---

## 1. Repositório, Produção e Identificadores Confirmados

- **Diretório ativo do projeto:** `D:\downloads backup 2026nov\Criativos`
- **Repositório GitHub:** `https://github.com/setorbackstage/herois-da-multiplicacao` (branch `main`)
- **Site em produção (Vercel):** `https://heroisdamultiplicacao.vercel.app/`
- **Meta Pixel ID oficial:** `2683241518773685`
- **Conta Meta Ads (checagem anterior):** `CA - XD OFertas` (`963451476522179`, `BRL`) — estava `ACTIVE`, porém com `has_payment_method: false` (e o MCP `meta-ads` falhou por timeout/sem resposta na última sessão).
- **Loja GGCheckout de produção (documentada em `AI_AGENT_HANDOFF.md`):**
  - Conta `setorbackstage` (`businessId: 97NDgszuaZQQCbErVLgw7jWmNAf1`)
  - Checkout Básico (`R$ 10,00` — Missão Tabuada): `https://ggcheckout.app/checkout/X7MW1ajXduVAyxH95jw6lT` (UID `dc050f22-81f8-46e1-92e8-6db95f44c18e`)
  - Checkout Combo (`R$ 27,00` — Liga dos Heróis): `https://ggcheckout.app/checkout/buJIuO7Th5tjHRGQB8dIQ8` (UID `f8598902-9a59-4fe4-acdf-fb59671ff109`)
  - **Atenção sobre MCP GGCheckout:** o token configurado atualmente no MCP `ggcheckout` ainda responde pelo `businessId` antigo (`JxqoFLG6dJdztFuabJh7wYTlGOk1`, com `webhooks: []`), e **não** pela conta `setorbackstage` (`97NDgszuaZQQCbErVLgw7jWmNAf1`). Por isso, conferências via MCP na conta real de produção exigem trocar a chave do MCP ou conferir manualmente no painel da GGCheckout.

---

## 2. Estado Verificado em Produção vs. Alterações Locais Pendentes

### Já verificado ao vivo em `https://heroisdamultiplicacao.vercel.app/` (11/11/2026):
- **Landing Page (`/`):** versão V2 Novembro (`REVISÃO DE FIM DE ANO`) está no ar, com Pixel `2683241518773685` disparando `PageView` e `ViewContent`.
- **Página de Obrigado (`/obrigado?plan=basic`):** HTTP 200, Pixel `2683241518773685` disparando `PageView` e `Purchase` (`value: 10`, `order_id: plan_10`), `#upgradeComboBox` visível e elementos `.combo-only` ocultos.
- **WebApp (`/app?tab=workbooks`):** trava VIP no ar (`Biblioteca Exclusiva do Combo R$ 27,00`, zero PDFs expostos no DOM e modal pedindo `Código de Acesso VIP:` `LIGA27`).
- **Endpoints API na Vercel:**
  - `GET /api/meta-capi` -> `405` (`{"error":"Method not allowed. Use POST."}`)
  - `GET /api/webhook-entrega` -> `405` (`{"error":"Method not allowed. Use POST."}`)
  - `POST /api/meta-capi` (`PageView`) -> HTTP `200`, `content-length: 52` (`x-vercel-cache: MISS`; corpo literal descartado pelo transporte `ping` do navegador; em `api/meta-capi.js`, o retorno de sucesso `{"success":true,"skipped":false,"events_received":1}` tem 52 bytes). Recomenda-se validar a recepção real no **Gerenciador de Eventos → Visão Geral / Testar Eventos**.

### Alterações locais recentes ainda NÃO compiladas / NÃO enviadas via `git push`:
*(Na sessão anterior o terminal estava preso na pasta antiga `c:\Users\Admin\Downloads\Criativos` e não conseguiu executar comandos aqui.)*
1. **Landing Page (`index.html`):** adicionada a seção `.family-spotlight` em `#como-funciona` usando a foto limpa de mãe e filho brasileiros estudando à mesa (`tabuada-assets/mae_brasileira_filtro_barro_2.jpg`). *Nota:* `tabuada-assets/crianca-segurando-ficha.jpg` permanece fora da LP porque a folha contém contas incorretas (`2×5=15 ✓`, `2×4=16 ✓`, `3×2=27 ✓`); só publicar após editar/corrigir as contas da folha, se desejado. Não adicionar depoimentos fictícios apresentados como "avaliações reais".
2. **WebApp React (`webapp/src/`):** restaurada a trava VIP das 6 apostilas + código `LIGA27` + desbloqueio via `?vip=liga27` em `storage.js`, `ShopView.jsx`, `WorkbooksView.jsx`, `HeroPortalModal.jsx` e `App.jsx`. Como `vercel.json` roteia `/app` e `/jogar` para `/app-dist/index.html`, é obrigatório rodar **`npm run app:build`** antes do `git push`.
3. **Banner Checkout 2 (`banner2_mobile.html` + `render_mobile_banners.js`):** o HTML do banner 2 já foi corrigido (`COMBO COMPLETO + WEBAPP` / `6 LIVROS EM PDF + APP`), e `render_mobile_banners.js` foi atualizado para usar `__dirname` em vez de `c:/Users/Admin/Downloads/Criativos/`. Falta rodar **`node render_mobile_banners.js`** para gerar os PNGs atualizados em `tabuada-assets/`.
4. **Pasta de entrega para o ChatGPT (`operacao_v2/04_ASSETS_CRIATIVOS/`):** falta executar `.\operacao_v2\copiar_assets_v2.ps1` para preencher as subpastas com os assets aprovados.

---

## 3. O que Falta Fazer Neste Novo Chat (Em Ordem)

1. **Rodar build, renderização dos banners, cópia de assets e Git Push:**
   - `npm run app:build`
   - `node render_mobile_banners.js`
   - `powershell -ExecutionPolicy Bypass -File .\operacao_v2\copiar_assets_v2.ps1`
   - Conferir `git status` / `git diff`, testar `/app` compilado se necessário e subir commit + `git push`.
2. **Validar Meta CAPI e Pixel pós-deploy:**
   - Confirmar que `META_CAPI_TOKEN` está ativo no deploy mais recente da Vercel (opcional: usar `META_TEST_EVENT_CODE` temporário para validar Browser + Servidor desduplicados em **Testar Eventos** na Meta e depois remover a variável de teste).
3. **Conferência no painel GGCheckout (`setorbackstage` — `97NDgszuaZQQCbErVLgw7jWmNAf1`):**
   - **Webhook (`/api/webhook-entrega`):** verificar na aba de Webhooks se JÁ existe webhook apontando para `https://heroisdamultiplicacao.vercel.app/api/webhook-entrega` (usado pelo `api/webhook-entrega.js` para disparar `Purchase` server-side na Meta CAPI + e-mail de entrega via Resend se `RESEND_API_KEY` estiver configurada). Se não existir nessa conta, criar 1 webhook marcando apenas os eventos suportados de aprovação **`pix.paid`** e **`card.paid`** (não existe evento nativo de reembolso/chargeback na GGCheckout).
   - **Pixel nos 2 checkouts:** garantir Pixel `2683241518773685` instalado nos checkouts `X7MW1ajXduVAyxH95jw6lT` (`R$ 10`) e `buJIuO7Th5tjHRGQB8dIQ8` (`R$ 27`).
   - **Redirecionamento pós-aprovação:**
     - Plano R$ 10 (`X7MW1ajXduVAyxH95jw6lT`): `https://heroisdamultiplicacao.vercel.app/obrigado?plan=basic`
     - Plano R$ 27 (`buJIuO7Th5tjHRGQB8dIQ8`): `https://heroisdamultiplicacao.vercel.app/obrigado?plan=premium`
   - **Banner do Checkout 2:** subir o novo `tabuada-assets/banner-checkout-liga-herois.png` (e conferir `banner-checkout-missao-tabuada.png`).
   - **Taxas líquidas:** registrar as taxas reais da conta para recalcular o CPA de equilíbrio em `operacao_v2/`.
4. **Conta Meta Ads & Criativos (`C01`, `C02`, `C03`):**
   - Confirmar forma de pagamento ativa em `963451476522179`.
   - Entregar `operacao_v2/03_CREATIVE_HANDOFF.md` + arquivos de `operacao_v2/04_ASSETS_CRIATIVOS/` ao ChatGPT para produzir os criativos estáticos iniciais.
   - Registrar métricas reais e respeitar o orçamento inicial de `R$ 30/dia` sem inventar números ou publicar campanhas automaticamente sem aprovação.

---

## 4. Documentos de Referência em `operacao_v2/`

- `operacao_v2/01_AUDITORIA_OFERTA.md`
- `operacao_v2/02_PLANO_CRO.md`
- `operacao_v2/03_CREATIVE_HANDOFF.md`
- `operacao_v2/04_ASSETS_CRIATIVOS/README_ASSETS_E_IDENTIDADE.md`
- `operacao_v2/05_QA_CHECKLIST.md`
- `operacao_v2/06_CHANGELOG_V2.md`
- `operacao_v2/preview_dez_jan_ferias.html` *(NÃO publicar até Dezembro)*
