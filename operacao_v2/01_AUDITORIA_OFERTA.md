# 01 — AUDITORIA COMPLETA DA OFERTA, PÁGINA, CHECKOUTS E RASTREAMENTO

**Projeto:** Heróis da Multiplicação & Missão Tabuada  
**Data da Auditoria:** 11/11/2026  
**URL Pública Auditada:** `https://heroisdamultiplicacao.vercel.app/`  
**Repositório Local Ativo:** `D:\downloads backup 2026nov\Criativos`  
**Status:** Somente diagnóstico e preparação (nenhuma alteração publicada em produção).

---

## 1. Resumo Executivo da Auditoria

A oferta possui boa base visual, entregáveis reais em PDF (todos respondendo `HTTP 200 OK`) e um WebApp interativo funcional (`/app`), além de dois checkouts ativos na GGCheckout preservando parâmetros UTM na URL. Contudo, **a operação atual NÃO está pronta para escalar nem para otimizar compras no Meta Ads** pelos seguintes motivos bloqueadores:

1. **Rastreamento quebrado de ponta a ponta:** Meta Pixel desativado por padrão na LP (`"SEU_PIXEL_AQUI"`), ausente nos checkouts da GGCheckout, ausente na página `/obrigado` (zero disparo de `Purchase`) e sem Conversions API (CAPI) no `/api/webhook-entrega`.
2. **Conta Meta Ads sem método de pagamento:** A conta `CA - XD OFertas` (`963451476522179`) está `ACTIVE` em `BRL`, mas com `has_payment_method: false` (e `is_ads_mcp_enabled: false`).
3. **Problemas graves de credibilidade e compliance na LP e nas imagens:** Afirmações e provas sociais sem comprovação (`3.400 famílias`, `Avaliações Verificadas`, economia de `R$ 1.000` em 2 semanas, jargões neurocientíficos sem referência), somadas a **mockups gerados por IA com erros de tabuada graves no Hero e na Galeria** (`2 × 3 = 5`, `1 × 1 = 8`, `6 × 6 = 50`), erros **HTTP 404** (vídeo demonstrativo e imagens quebradas) e um banner no Checkout 2 prometendo `"4 OPERAÇÕES"` e `"+ DE 200 PÁGINAS"` enquanto o produto entrega apenas Multiplicação (6 cadernos).
4. **Fricção alta no mobile e vazamento do produto pago:** São **11.164 px (~13,2 dobras)** em tela `390×844` até chegar ao bloco de preços `#ofertas`, e o WebApp (`/app`) deixa a aba `"Apostilas"` aberta sem login, entregando os **6 PDFs gratuitamente** para qualquer visitante, enquanto a aba `"Loja"` cobra `R$ 27,90` (divergindo dos `R$ 27,00` da LP/checkout).

---

## 2. Produtos, Preços e Materiais Efetivamente Confirmados

### A. Produtos e Preços na Página Pública (`index.html`) e Checkouts Ativos
| Plano | Nome na LP (`index.html`) | Nome no Checkout GGCheckout (ao vivo) | Preço Confirmado | Order Bumps Ativos no Checkout | Formas de Pagamento |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Básico** | Missão Tabuada | `Missão Tabuada — Kit Digital Completo em PDF` (`X7MW1ajXduVAyxH95jw6lT`) | **R$ 10,00** | 1. `Mega Fichas de Treino da Tabuada` (**+ R$ 9,90**) | PIX e Cartão |
| **Combo (Principal)** | LIGA DOS HERÓIS COMBO COMPLETO | `Liga dos Heróis da Matemática — Combo Completo` (`buJIuO7Th5tjHRGQB8dIQ8`) | **R$ 27,00** | 1. `Mega Fichas de Treino da Tabuada` (**+ R$ 9,90**)<br>2. `Gabarito Ilustrado Passo a Passo` (**+ R$ 5,90**) | PIX e Cartão |

> **Divergência detectada no WebApp (`app.html`, linha 1778):** Na aba "Loja", o botão do Passe VIP exibe **`R$ 27,90`** (desalinhado com os **R$ 27,00** da LP e do checkout `buJIuO7Th5tjHRGQB8dIQ8`).

### B. Materiais Digitais Efetivamente Disponíveis e Verificados (`HTTP 200 OK` na Vercel)
Todos os 6 PDFs abaixo existem na produção e responderam `HTTP 200`:
1. `Missao_Tabuada_Volume_1.pdf` — Livro Principal Ilustrado (43 páginas, tabuada de 1 a 10, Manual do Guardião, gabarito e certificado).
2. `Cronograma_Mestre_12_Semanas.pdf` — Roteiro de 12 semanas (rotina sugerida de 15 min).
3. `Caderno_de_Atividades_Fichas_Diarias.pdf` — Fichas diárias destacáveis.
4. `Caderno_de_Pintura_Multiplicacao.pdf` — Desenhos educativos guiados pela multiplicação.
5. `Jogos_da_Tabuada_Trilha_Domino_Bingo.pdf` — Trilha, dominó e bingo para imprimir e recortar.
6. `Desafios_Semanais_Acompanhamento.pdf` — Desafios de acompanhamento semanal.

**WebApp Interativo (`/app` e `/jogar` -> `app.html`):**
- Roda no navegador (mobile-first, sem instalação).
- 4 unidades e **10 fases progressivas** (Unidade 1: Tabuadas 2 e 3; Unidade 2: 4, 5 e 6; Unidade 3: 7, 8 e 9; Unidade 4: 10 + Batalha Chefão com Monstrinho), efeitos sonoros (Web Audio API) e leitura de voz `pt-BR` (`SpeechSynthesis`).

> **Inconsistência comercial crítica:** O banner exibido no topo do Checkout 2 (`banner2_mobile.html` / `banner-checkout-liga-herois.png?v=3`) afirma **`"🏆 PACOTE COMPLETO 4 OPERAÇÕES"`** e **`"+ DE 200 PÁGINAS • ACESSO IMEDIATO"`**, e a capa `conteudo-7.png` / certificado `preview_clean_p43_certificate.png` citam **"Volume 2"**. Os 6 PDFs efetivamente entregues são exclusivamente de **Multiplicação** (e não das 4 operações nem +200 páginas). É necessário alinhar a comunicação do banner para evitar pedidos de reembolso.

---

## 3. Auditoria Obrigatória dos 7 Pontos (Seção 3 do Briefing V2.1)

| # | Item Auditado | Localização Exata | Evidência Encontrada | Impacto na Conversão / Confiança | Correção Recomendada | Depende de Aprovação? |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **1** | **"Mais de 3.400 famílias atendidas"** | `index.html`, linha `2956` (`#familias`) | Texto literal: `"Mais de 3.400 famílias já destravaram a tabuada sem lágrimas e sem brigas na lição de casa:"`. Sem registro no MCP conectado (`payments: []`). | Risco alto de reprovação de anúncios por prova social infundada e desconfiança de pais. | Remover número não comprovado; focar na proposta educacional real do material. | **Sim** |
| **2** | **Depoimentos apresentados como verificados** | `index.html`, linhas `2952` e `2962–3014`; rodapé dos 2 checkouts GGCheckout | Selos `"⭐ Avaliações Verificadas"` (2952) e `"✓ Compra Confirmada"` (2980). Cards nominais (`Mariana S.`, `Carla Dias`, `Profa. Fernanda S.`, `Carlos Eduardo`). A foto `crianca-segurando-ficha.jpg` (2966) mostra uma **menina** enquanto o texto fala `"Meu filho Pedro"`, e a ficha tem contas erradas com visto (`2×4=16 ✓`, `3×2=27 ✓`). Nos checkouts também há depoimentos no rodapé. | Quebra severa de confiança: pai que lê `"2×4=16 ✓"` e vê foto divergente do texto abandona a compra na hora. | Remover depoimentos simulados e selos de verificação da LP e dos checkouts; exibir amostras reais das páginas do PDF até ter depoimentos reais. | **Sim** |
| **3** | **Economia financeira com reforço escolar** | `index.html`, linhas `2983–2984` (`Carla Dias`) | Texto literal: `"“Economizei mais de R$ 1.000 em reforço”"` e `"cotando professor particular a R$ 160 por mês... destravou em 2 semanas o que a escola não conseguiu no semestre todo."` | Viola políticas do Meta Ads (ganho financeiro/resultado garantido em prazo curto `"2 semanas"`) e contraria a diretriz do Briefing V2.1. | Remover integralmente esse depoimento. | **Sim** |
| **4** | **Afirmações científicas sem referência** | `index.html`, linhas `2610`, `2750`, `2868`, `2997` (+ rodapé PDF `preview_clean_p4_worksheetA.png`) | `"Pedagogos comprovam: ... estimula áreas neurais"` (2610); `"Dopamina Positiva nos Estudos"` (2750); `"gerando dopamina"` (2868); `"O cérebro infantil aprende por matrizes visuais e não por tabelas estáticas"` (2997); `"seu cérebro gravará tudo durante o sono!"` (rodapé pág. 4). | Tom pseudocientífico sem fonte citada reduz credibilidade diante de mães exigentes e professores. | Substituir por linguagem pedagógica prática e verificável (ex.: prática guiada no papel + reforço visual lúdico + constância diária). | **Sim** |
| **5** | **Confusão Impresso PDF vs WebApp** | `index.html` (`2440-2454`, `2766`, `3032`, `3170`); `app.html` (`1778`, `1847-1917`); `obrigado.html` (`374-449`) | Hero promete `"KIT COMPLETO PRONTO PARA IMPRESSÃO"` junto com `"📱 WebApp Gamificado"` sem dizer que o app é exclusivo do plano R$ 27. Subtítulo de `#ofertas` só fala em PDF. Botão na aba `No Celular` (`2766`) usa classes `.btn.btn-primary` inexistentes (renderiza como link azul sublinhado quebrado). WebApp exibe R$ 27,90 e libera todos os 6 PDFs sem login. | Risco de compra achando que vai chegar caixa física em casa, dúvida no comparativo dos planos e pirataria/vazamento dos bônus via `/app`. | Explicar em bloco dedicado o que é PDF para imprimir, o que é WebApp no navegador e quem acessa cada plano; corrigir `.btn.btn-primary`, corrigir `R$ 27,90` e proteger `/app` + diferenciar entrega de R$ 10 vs R$ 27. | **Sim** |
| **6** | **Página extensa antes da oferta** | `index.html`, linhas `2412–3023` (medido ao vivo no mobile `390×844`) | `scrollHeight` total: **12.971 px**. Distância (`offsetTop`) até `#ofertas`: **11.164 px (~13,2 dobras mobile)**. Ainda há erros **HTTP 404** (`video_demonstrativo.mp4`, `frame_promocional.jpg`, `child_holding_math_worksheet_282ab985_2k.jpg`) e erro de CSS no `:root` (`linhas 49–60`). | Alto abandono no tráfego pago mobile antes mesmo de o usuário ver o preço (R$ 10 / R$ 27). | Reestruturar para fluxo enxuto mobile-first (apresentar planos após explicação objetiva nas primeiras 3–4 dobras) e remover mídias 404 / corrompidas. | **Sim** |
| **7** | **Comunicação genérica vs fim do ano** | `index.html`, linhas `2339–2374`, `2424–2428`, `3230–3231` | Headline `"A matemática pode virar uma grande aventura!"` e ticker genéricos sem gancho de Novembro (revisão escolar final). | Baixa congruência com anúncios sazonais de Novembro (C01 `"NOVEMBRO CHEGOU. E A TABUADA?"`). | Adotar headline e selo `"REVISÃO DE FIM DE ANO"` para Novembro, mantendo variante de férias (Dez/Jan) isolada até autorização. | **Sim** |

---

## 4. Auditoria Visual de Ativos e Erros Técnicos Adicionais Encontrados

### A. Imagens em Produção com Erros de Matemática / IA / Idioma (Risco Crítico de Confiança)
Durante a inspeção direta dos arquivos usados na LP e OpenGraph, foram constatados erros visuais graves nas artes de IA:
- **`tabuada-assets/kit-completo-mesa.jpg` (Imagem PRINCIPAL do Hero):** Exibe cálculos matematicamente errados no centro da imagem (`2 × 3 = 5`, `1 × 1 = 8`, `6 × 6 = 50`, `8 × 8 = 29`, `7 × 7 = 24`, `9 × 5 = 18`, `10 × 3 = 28`) e palavras distorcidas (`"Tcicdetro ou falso"`, `"Nomo:"`, `"Foxitatutos e na multiplicattos"`).
- **`tabuada-assets/jogos-recortaveis-pintura.jpg` (Galeria Card 4):** Materiais em **inglês** (`MULTIPLICATION ISLAND ADVENTURE`, `MULTIPLICATION BINGO`, `MATH DOMINOES`) com erros de cálculo (`4×6 | 36`, `6×7 | 45`, `9×1 | 59`).
- **`tabuada-assets/mockup_kit_completo_aberto_2k.jpg` (Aba No Papel):** Exibe `"JORNADA DAS 4 OPERAÇÕES"`, texto corrompido `"Jorm-monlração plenfância"` e códigos hexadecimais impressos (`#1D3347`, `#438FC5`, `#F3C95B`, `#91B99A`).
- **`tabuada-assets/hero-bundle-3d.jpg` (`og:image` compartilhado):** Folha de pintura com `2×2=3` e `2×2=10`, textos em inglês (`Name:`) e `"Malhlplicação Mágica"`.
- **`tabuada-assets/heroi-menina-oficial.png` / `heroi-menina-voando.png`:** O caderno na mão da Maya exibe `"PDF FLOÇAS"` (ao contrário da capa `capa-missao-tabuada.jpg`, onde está escrito corretamente `"MISSÃO TABUADA"`).

**Ativos 100% limpos e recomendados para uso imediato:** `logo-transparente.png`, `logo-oficial.png`, `heroi-menino-oficial.png` (Léo), `monstro-oficial.png` (Buggy), `capa-missao-tabuada.jpg`, `capa-liga-dos-herois.jpg`, `preview_clean_p1_cover.png`, `preview_clean_p3_tracker.png`, `preview_clean_p4_worksheetA.png`, `preview_clean_p43_certificate.png`, `conteudo-6.png`, `conteudo-7.png`, e `mae_brasileira_filtro_barro_2.jpg` (em tamanho de galeria).

### B. Bugs Técnicos na LP, Checkout e Entrega
1. **CSS `:root` quebrado (`index.html`, linhas 49–64):** Regras `body { ... }` e `img { ... }` foram inseridas dentro do bloco `:root { ... }` antes das variáveis `--ink-title`, `--ink-body`, `--ink-muted` e `--border-soft`.
2. **Botão quebrado (`index.html`, linha 2766):** `<a href="#ofertas" class="btn btn-primary">` não tem definição CSS, aparecendo como link de texto azul sublinhado.
3. **Recorte no Hero Mobile (`390×844`):** `padding` e tag verde no topo da `.hero-visual-frame` sofrem leve corte superior (`overflow: hidden` inline na linha `2449` sobrescrevendo o CSS da linha `583`).
4. **Checkout GGCheckout desconectado do MCP:** O MCP `ggcheckout` ativo aponta para o Business ID antigo (`JxqoFLG6dJdztFuabJh7wYTlGOk1`, 0 vendas, 0 webhooks, checkouts antigos `p8JH5jQwcxR0SLjkv7kiFN` / `DJ7r66JatfLqr0LXVPjm17`). Os checkouts vivos da LP pertencem ao Business ID `97NDgszuaZQQCbErVLgw7jWmNAf1` (`setorbackstage`), sem visibilidade de leitura/edição via MCP enquanto a chave da API não for atualizada.
5. **E-mail pós-compra (`email/email-boas-vindas.html` + `api/webhook-entrega.js`):**
   - `img src="tabuada-assets/logo-oficial.png"` é caminho relativo (quebra na caixa de entrada dos clientes de e-mail por não ter `https://heroisdamultiplicacao.vercel.app/...`).
   - `SENDER_EMAIL` fallback é `'Heróis da Multiplicação <acesso@seudominio.com>'` (necessita domínio verificado no Resend).
   - Entrega no `/obrigado` e `/api/webhook-entrega.js` não distingue quem comprou R$ 10 vs R$ 27.

---

## 5. Diagnóstico Técnico de Rastreamento e Mídia

| Componente | Estado Observado em 11/11/2026 | Veredito |
| :--- | :--- | :---: |
| **Meta Pixel na LP (`/`)** | Só carrega se `?pixel=` vier na URL. Sem parâmetro, `META_PIXEL_ID = "SEU_PIXEL_AQUI"` e **`window.fbq` é `undefined`**. | **FALHOU** |
| **`ViewContent`** | Só dispara dentro do `if (META_PIXEL_ID !== "SEU_PIXEL_AQUI")` com valor fixo `10.00 BRL`. | **INCOMPLETO** |
| **`InitiateCheckout`** | Dispara na LP apenas se `fbq` existir, e redireciona imediatamente (`window.location.href = finalUrl`) sem delay de segurança (~250ms). **No checkout GGCheckout (`X7MW...` e `buJI...`), `fbq` está AUSENTE.** | **CRÍTICO** |
| **`Purchase` Browser (`/obrigado`)** | **Ausente** na página `/obrigado` (`obrigado.html`) e sem `value`/`currency` dinâmicos por plano. | **CRÍTICO (0% medido)** |
| **Conversions API (CAPI)** | **Inexistente** em `api/webhook-entrega.js` (não envia evento servidor para Graph API nem gera `event_id` para desduplicação). | **AUSENTE** |
| **Preservação de UTMs** | LP salva UTMs em `localStorage` e repassa para checkout; GGCheckout redireciona para `/checkout/v2/...` mantendo **100% das UTMs** na URL visível. *(Atenção: resta confirmar no painel `setorbackstage` se a GGCheckout salva essas UTMs no registro do pedido/webhook!)* | **PARCIALMENTE VALIDADO** |
| **Meta Ads (`ads_get_ad_accounts`)** | Conta `CA - XD OFertas` (`963451476522179`) `ACTIVE`, `BRL`, **`has_payment_method: false`**, `is_ads_mcp_enabled: false`. | **BLOQUEADO (sem pagamento)** |
