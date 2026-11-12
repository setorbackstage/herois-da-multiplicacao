# 06 — CHANGELOG V2 (FASE A A C)

Registro factual das análises, testes e arquivos preparados nesta operação V2. **Produção pública permanece 100% inalterada nesta etapa.**

---

## 11/11/2026 — Fases A, B e C (Auditoria, Planejamento e Preparação Isolada)

### Testes e Auditorias Executadas (Evidência Observada)
1. **Inspeção estática do repositório local (`D:\downloads backup 2026nov\Criativos`):**
   - Lidos `index.html`, `app.html`, `obrigado.html`, `vercel.json`, `api/webhook-entrega.js`, `email/email-boas-vindas.html`, `banner1_mobile.html`, `banner2_mobile.html`, `scripts/tools/apply_fix_new_checkouts.js`, `AI_AGENT_HANDOFF.md` e `knowledge_base/`.
2. **Inspeção visual direta das mídias em `tabuada-assets/`:**
   - Identificados arquivos limpos (`logo-transparente.png`, `heroi-menino-oficial.png`, `monstro-oficial.png`, `capa-missao-tabuada.jpg`, `capa-liga-dos-herois.jpg`, `preview_clean_p1_cover.png`, `preview_clean_p3_tracker.png`, `preview_clean_p4_worksheetA.png`, `preview_clean_p43_certificate.png`, `mae_brasileira_filtro_barro_2.jpg`).
   - Identificados arquivos com erros de IA/matemática/idioma (`kit-completo-mesa.jpg`, `jogos-recortaveis-pintura.jpg`, `mockup_kit_completo_aberto_2k.jpg`, `hero-bundle-3d.jpg`, `crianca-segurando-ficha.jpg`, detalhe `"PDF FLOÇAS"` em `heroi-menina-oficial.png`).
3. **Auditoria ao vivo via navegador (`browser` subagent):**
   - `https://heroisdamultiplicacao.vercel.app/` (viewport `390×844`): confirmado `scrollHeight = 12.971 px`, `#ofertas` em `11.164 px`, sem overflow horizontal (`390 = 390`), 404 em `video_demonstrativo.mp4`, `frame_promocional.jpg` e `child_holding_math_worksheet_282ab985_2k.jpg`; `fbq` ausente sem `?pixel=`.
   - `https://heroisdamultiplicacao.vercel.app/app` e `/obrigado`: confirmados os **6 PDFs em HTTP 200 OK**, aba `Apostilas` desprotegida no `/app`, preço `R$ 27,90` na aba `Loja`, e zero script/disparo de Meta Pixel `Purchase` no `/obrigado`.
   - Checkouts ao vivo `https://ggcheckout.app/checkout/X7MW1ajXduVAyxH95jw6lT` (`R$ 10,00` + bump `R$ 9,90`) e `https://ggcheckout.app/checkout/buJIuO7Th5tjHRGQB8dIQ8` (`R$ 27,00` + bumps `R$ 9,90` e `R$ 5,90`): redirecionamento para `/checkout/v2/...` preservando todas as UTMs testadas na URL, PIX e Cartão ativos, **Pixel do Meta ausente** em ambos e bloco de depoimentos no rodapé.
4. **Consultas MCP:**
   - `meta-ads:ads_get_ad_accounts`: identificada conta `CA - XD OFertas` (`963451476522179`, `BRL`, `ACTIVE`, `has_payment_method: false`, `is_ads_mcp_enabled: false`).
   - `ggcheckout`: `get_my_business_id`, `list_products`, `list_checkouts`, `list_webhooks`, `list_payments`, `get_billing_status` confirmaram que a chave conectada pertence ao Business antigo (`JxqoFLG6dJdztFuabJh7wYTlGOk1`, 0 pagamentos) e não à conta de produção (`97NDgszuaZQQCbErVLgw7jWmNAf1` / `setorbackstage`).

### Arquivos Criados na Pasta `operacao_v2/`
- `operacao_v2/01_AUDITORIA_OFERTA.md`
- `operacao_v2/02_PLANO_CRO.md`
- `operacao_v2/03_CREATIVE_HANDOFF.md`
- `operacao_v2/04_ASSETS_CRIATIVOS/README_ASSETS_E_IDENTIDADE.md`
- `operacao_v2/04_ASSETS_CRIATIVOS/copiar_assets_v2.ps1`
- `operacao_v2/05_QA_CHECKLIST.md`
- `operacao_v2/06_CHANGELOG_V2.md`
- `operacao_v2/preview_novembro_revisao.html` (Prévia isolada Novembro — Revisão de Fim de Ano, com Meta Pixel `2683241518773685` integrado)
- `operacao_v2/preview_dez_jan_ferias.html` (Prévia isolada Dez/Jan — Férias Educativas, com Meta Pixel `2683241518773685` integrado)
- `operacao_v2/preview_obrigado_v2.html` (Prévia isolada de `/obrigado` com Meta Pixel `2683241518773685`, evento `Purchase` protegido contra F5 e separação `?plan=basic` vs `?plan=premium`)

### Atualização Pós-Envio do Pixel ID (`2683241518773685`)
- Inserido o Meta Pixel oficial `2683241518773685` (`PageView`, `ViewContent` e `InitiateCheckout` com `eventID`) nas prévias isoladas em `operacao_v2/`.
- Criado [`preview_obrigado_v2.html`](file:///D:/downloads%20backup%202026nov/Criativos/operacao_v2/preview_obrigado_v2.html) para validação prévia de `Purchase` antes da aplicação em produção.
- Registrado em [`05_QA_CHECKLIST.md`](file:///D:/downloads%20backup%202026nov/Criativos/operacao_v2/05_QA_CHECKLIST.md) a limitação confirmada no schema `create_webhook` da GGCheckout: não existem eventos nativos de webhook para reembolso ou chargeback.

### Atualização Fase E — Implementação Autorizada Local (11/11/2026)
- **Landing Page de Produção (`index.html`):** Promovida a estrutura V2 sazonal de Novembro (`REVISÃO DE FIM DE ANO`) com Pixel **`2683241518773685`**, CAPI (`/api/meta-capi`), OpenGraph limpo (`capa-liga-dos-herois.jpg`), amostras reais dos PDFs e remoção de provas sociais/mídias sem comprovação. *(Variante `operacao_v2/preview_dez_jan_ferias.html` atualizada com helper CAPI e mantida não publicada até Dezembro).*
- **Página Pós-Compra (`obrigado.html`):** Adicionado `noindex`, Pixel `2683241518773685` (`PageView` + `Purchase` com `sessionStorage` anti-F5), disparo `/api/meta-capi`, separação `?plan=basic` vs `?plan=premium` e link `/app?vip=liga27` no Combo.
- **Meta Conversions API Serverless (`api/_meta-capi.js`, `api/meta-capi.js`, `api/webhook-entrega.js`):**
  - Criado proxy `/api/meta-capi` para eventos de funil com `event_id`, `_fbp`, `_fbc`, `fbclid`, IP e User-Agent server-side usando variável `META_CAPI_TOKEN`.
  - Atualizado `/api/webhook-entrega` para enviar `Purchase` server-side com PII hasheada em SHA-256 (e-mail, telefone BR, nome, `order_id`), diferenciar plano básico (`R$ 10`) vs combo (`R$ 27`) e filtrar bloco exclusivo do Combo no e-mail transacional.
- **E-mail Transacional (`email/email-boas-vindas.html`):** Corrigido `src` da logo para URL absoluta `https://heroisdamultiplicacao.vercel.app/tabuada-assets/logo-oficial.png` e adicionada marcação condicional `<!-- COMBO_ONLY_START -->` / `<!-- COMBO_ONLY_END -->`.
- **WebApp (`webapp/src/` + `app.html`):** Corrigido preço do Passe VIP (`R$ 27,90` -> `R$ 27,00`), implementada trava VIP na aba Apostilas A4 com desbloqueio automático via `/app?vip=liga27` ou código `LIGA27` em `Pais / Nuvem`. *(Pendente rodar `npm run app:build` para recompilar `/app-dist` servido pela Vercel).*
- **Banner Checkout 2 (`banner2_mobile.html`):** Removidas referências a `"4 OPERAÇÕES"` e `"+ DE 200 PÁGINAS"`, substituídas por `"COMBO COMPLETO + WEBAPP"` e `"6 LIVROS EM PDF + APP"`. *(Pendente rodar `node render_mobile_banners.js` e reenviar PNG para GGCheckout).*

### Pendências de Execução / Publicação Externa
- **Terminal neste IDE:** Permanece preso no diretório removido (`c:\Users\Admin\Downloads\Criativos`); ao reabrir o workspace em `D:\downloads backup 2026nov\Criativos`, executar `npm run app:build`, `node render_mobile_banners.js`, `copiar_assets_v2.ps1`, validar localmente e enviar commit/deploy.
- **Credenciais e Painéis Externos:** Cadastrar `META_CAPI_TOKEN` (+ opcional `META_TEST_EVENT_CODE`) na Vercel; ativar pagamento na conta Meta Ads `963451476522179`; configurar Pixel `2683241518773685`, URLs `?plan=basic`/`?plan=premium`, webhook e banner no painel `setorbackstage` da GGCheckout.
