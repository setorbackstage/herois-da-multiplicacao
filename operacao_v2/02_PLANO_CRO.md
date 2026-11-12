# 02 — PLANO DE CRO, ESTRUTURA SAZONAL E MÉTRICAS (V2.1)

**Objetivo:** Preparar o funil do **Heróis da Multiplicação** para testar vendas com **R$ 30/dia no Meta Ads** (imagem estática), eliminando fricção no mobile, removendo afirmações não comprovadas e corrigindo a mensuração antes de qualquer tráfego pago.

---

## 1. Estratégia Sazonal (Sem Publicar Antes da Aprovação)

### Fase 1: Novembro — REVISÃO DE FIM DE ANO (Prévia: `preview_novembro_revisao.html`)
- **Identificador sazonal:** `REVISÃO DE FIM DE ANO`
- **Headline proposta:** *"A tabuada ainda é um desafio? Transforme a revisão em uma aventura!"*
- **Subheadline proposta:** *"Ajude seu filho a praticar multiplicação com missões ilustradas, jogos e atividades para imprimir."*
- **Enquadramento de compliance:** Foco na revisão prática de final de ano letivo em casa, sem prometer aprovação escolar garantida, notas exatas ou resultado em prazo determinado.
- **Oferta priorizada nos anúncios:** Combo **Liga dos Heróis — R$ 27,00**, mantendo **Missão Tabuada — R$ 10,00** como opção de entrada visível na seção de ofertas.

### Fase 2: Dezembro e Janeiro — FÉRIAS EDUCATIVAS (Prévia: `preview_dez_jan_ferias.html`)
- **Identificador sazonal:** `FÉRIAS EDUCATIVAS`
- **Headline proposta:** *"Continue praticando tabuada nas férias com jogos e missões divertidas."*
- **Regra de lançamento:** Arquivo mantido em prévia isolada (`operacao_v2/preview_dez_jan_ferias.html`) para troca controlada apenas quando o calendário escolar entrar em férias e mediante aprovação do proprietário.

---

## 2. Prioridades de CRO e Arquitetura da Nova Página

| Prioridade | Problema Atual | Mudança Proposta na Prévia V2 | Justificativa de Conversão |
| :---: | :--- | :--- | :--- |
| **P0** | 11.164 px (~13,2 dobras mobile) até chegar aos preços; bounce alto antes da oferta. | **Reduzir jornada até a oferta para ~3 a 4 dobras mobile:** Hero sazonal -> Clareza do produto (Impresso PDF vs WebApp) -> Como funciona e quem pode usar -> Amostras visuais reais e limpas -> Planos R$ 10 e R$ 27 -> Suporte, Acesso e Garantia 7 dias -> FAQ. | Visitantes vindos de anúncios diretos de oferta (`C01`, `C02`, `C03`) precisam ver o que estão comprando e o preço em poucos segundos no celular. |
| **P0** | Confusão entre PDF impresso e WebApp + dúvida do que entra em cada plano. | Criar seção/quadro explícito comparando **O que é para Imprimir (PDF A4)** vs **O que é Interativo no Navegador (WebApp)** + comparativo claro dos dois planos (R$ 10 vs R$ 27). | Reduz atrito de compra e previne pedidos de reembolso por expectativa errada ("achei que vinha livro físico pelo Correio" ou "comprei o de R$ 10 esperando o aplicativo"). |
| **P0** | Mídias com erros matemáticos de IA (`kit-completo-mesa.jpg`, `jogos-recortaveis-pintura.jpg`, `mockup_kit_completo_aberto_2k.jpg`, `crianca-segurando-ficha.jpg`) e erros 404 (`video_demonstrativo.mp4`). | Substituir integralmente por imagens reais e limpas das páginas do PDF (`preview_clean_p1_cover.png`, `preview_clean_p3_tracker.png`, `preview_clean_p4_worksheetA.png`, `preview_clean_p43_certificate.png`) e capas oficiais (`capa-missao-tabuada.jpg`, `capa-liga-dos-herois.jpg`). | Pais comprando reforço de matemática rejeitam imediatamente qualquer material que mostre contas erradas (`2×3=5`, `1×1=8`) ou texto em inglês. |
| **P1** | Provas sociais não verificadas (`3.400 famílias`, `Avaliações Verificadas`, `R$ 1.000 em 2 semanas`, jargões de dopamina/áreas neurais). | Remover na prévia V2 todas as afirmações sem comprovação e jargões neurocientíficos, substituindo por clareza didática e amostras reais do material. | Blindagem contra rejeição no Meta Ads e alinhamento ao Código de Defesa do Consumidor e diretriz V2.1. |
| **P1** | Bug de CSS no `:root` e botão `.btn.btn-primary` quebrado + clipping no frame do Hero mobile. | Corrigir fechamento de `:root`, padronizar botões `.btn-hero` e eliminar `overflow: hidden` conflitante no card do Hero. | Garante leitura limpa e CTAs visualmente íntegros em `375px`/`390px`. |
| **P2** | Vazamento dos 6 PDFs no `/app` (`Apostilas`) e divergência `R$ 27,90` vs `R$ 27,00`. | *Dependente de aprovação para Fase E:* Corrigir preço para `R$ 27,00` no `app.html`, restringir/separar acesso de PDFs no `/app` e criar fluxo distinto de entrega entre plano R$ 10 e R$ 27. | Preserva o valor percebido do Combo R$ 27 e protege os bônus de acesso indevido. |

---

## 3. Os 7 Blocos Informativos Obrigatórios na Nova Estrutura (Seção 4 do Briefing)

A prévia `preview_novembro_revisao.html` foi estruturada para responder explicitamente a todas as perguntas abaixo antes e junto da decisão de compra:
1. **Quem pode utilizar:** Crianças em fase de introdução, revisão ou fixação da tabuada (1º ao 5º ano / Ensino Fundamental I), acompanhadas por pais ou responsáveis.
2. **O que vem em cada plano:**
   - **Missão Tabuada (R$ 10,00):** Livro principal ilustrado em PDF (43 páginas, tabuadas do 1 ao 10), Manual do Guardião para pais, Gabarito oficial e Certificado em PDF.
   - **Liga dos Heróis — Combo Completo (R$ 27,00):** Tudo do plano básico + Cronograma Mestre de 12 Semanas (PDF) + Caderno de Atividades & Fichas Diárias (PDF) + Caderno de Pintura por Multiplicação (PDF) + Jogos de Tabuleiro, Dominó e Bingo para recortar (PDF) + Desafios Semanais de Acompanhamento (PDF) + Acesso ao WebApp Interativo no navegador.
3. **Como o material é entregue:** Entrega 100% digital e imediata após confirmação do pagamento (redirecionamento para página de acesso e envio por e-mail cadastrado — *sem entrega física pelos Correios*).
4. **O que é impresso e o que é digital/interativo:** Os **6 cadernos e jogos são arquivos em PDF tamanho A4** para imprimir em casa/gráfica (ou visualizar em tablet/computador); já o **WebApp** (exclusivo do Combo R$ 27) funciona direto no navegador do celular, tablet ou computador sem ocupar memória nem exigir loja de aplicativos.
5. **Como utilizar as atividades:** Rotina leve sugerida de cerca de 15 minutos por dia (acompanhamento pelo cronograma, treino gradual por tabuada no papel/telas, jogos recortáveis em família e marcação no Mapa de Escudos).
6. **Como comprar e acessar:** Escolha do plano na página -> preenchimento no checkout seguro da GGCheckout (PIX com liberação na hora ou Cartão de Crédito) -> redirecionamento imediato para baixar os arquivos e acessar o WebApp (além do recebimento por e-mail).
7. **Condições de suporte e reembolso:** Garantia de 7 dias para conhecer os materiais (conforme regras apresentadas no checkout/legislação aplicável) e canal direto de atendimento aos pais via WhatsApp `(21) 99392-3582`.

---

## 4. Plano de Mídia e Métricas de Acompanhamento (R$ 30/dia)

### A. Estratégia Inicial (Sujeita à Validação Técnica Prévia)
- **Pré-requisito obrigatório antes de veicular:**
  1. Cadastrar forma de pagamento ativa na conta Meta Ads `CA - XD OFertas` (`963451476522179`).
  2. Instalar Pixel fixo na LP (`ViewContent` + `InitiateCheckout`), no checkout GGCheckout (`InitiateCheckout`) e na página `/obrigado` (`Purchase` com `value` e `currency: 'BRL'`), preferencialmente com **Conversions API + `event_id`** no `/api/webhook-entrega`.
  3. Validar que a GGCheckout registra os parâmetros UTM no pedido/webhook.
- **Estrutura de teste inicial:**
  - **Objetivo:** Vendas (otimizado para evento `Purchase` somente após validar disparo real do pixel/CAPI).
  - **Orçamento:** **R$ 30,00/dia** (1 campanha + 1 conjunto amplo/aberto para pais/responsáveis Brasil + 3 anúncios estáticos visualmente distintos: `C01`, `C02`, `C03`).
  - **Estratégia de lance inicial:** **Maior Volume** nas primeiras 48h–72h para medir CTR, CPC, IC e CPA reais sem travar entrega.
  - **Sobre Bid Cap:** Conforme o briefing V2.1, o uso de **Bid Cap** deverá ser avaliado **após** obter dados reais e confiáveis de entrega, taxa de conversão de checkout (PIX/Cartão), taxa real de aceitação dos order bumps e recebimento líquido efetivo.

### B. Padrão Obrigatório de UTMs
```text
utm_source=meta
utm_medium=paid_social
utm_campaign=tabuada_nov26
utm_content={creative_id}   (ex: C01_alerta_v1, C02_comparacao_v1, C03_oferta_v1)
utm_term={angle_id}         (ex: revisao_nov, comparacao, oferta_combo27)
```

### C. Estrutura da Planilha / Registro de Métricas e Cálculo do CPA de Equilíbrio

#### Fórmula do Recebimento Líquido e CPA de Equilíbrio (Break-even)
$$\text{Recebimento Líquido} = \text{Preço Bruto} - \text{Taxa Gateway} - \text{Taxa Plataforma} - \text{Custo de Saque/Antecipação} - \text{Provisão Reembolso}$$
$$\text{CPA de Equilíbrio} = \text{Recebimento Líquido Real por Pedido}$$

> **Nota de Transparência sobre Dados Não Observados:** A conta conectada ao MCP atualmente (`JxqoFLG6dJdztFuabJh7wYTlGOk1`) tem histórico vazio (`payments: []`), e a conta ativa de produção (`setorbackstage` / `97NDgszuaZQQCbErVLgw7jWmNAf1` — que opera via **PushinPay** no PIX e **AmploPay** no Cartão) ainda não está conectada ao MCP. Por isso, **não foram inseridas taxas fictícias**. Assim que você informar a taxa exata cobrada pela GGCheckout + PushinPay + AmploPay na sua conta `setorbackstage`, aplicaremos o percentual exato abaixo.

| Cenário / Plano | Preço Bruto | Taxa Real (GGCheckout + Gateway) | Recebimento Líquido Real (= CPA Máximo de Equilíbrio) |
| :--- | :---: | :---: | :---: |
| **Teto teórico sem taxas (referência)** — Missão Tabuada | R$ 10,00 | *A confirmar no painel `setorbackstage`* | <= R$ 10,00 *(descontando taxas reais)* |
| **Teto teórico sem taxas (referência)** — Liga dos Heróis | R$ 27,00 | *A confirmar no painel `setorbackstage`* | <= R$ 27,00 *(descontando taxas reais)* |
| **Combo + Bump 1 (`Mega Fichas R$ 9,90`)** | R$ 36,90 | *A confirmar no painel `setorbackstage`* | <= R$ 36,90 *(descontando taxas reais)* |

#### Tabela Modelo de Controle Diário (Deixar em branco até haver dados reais)
| Data | Campanha / Anúncio (`utm_content`) | Investimento (R$) | Impressões | CPM (R$) | Cliques no Link | CTR Link (%) | CPC Link (R$) | ViewContent (LP) | InitiateCheckout | Compras (`Purchase`) | CPA (R$) | Faturamento Bruto (R$) | Taxas Gateway/Plat. (R$) | Reembolsos (R$) | Resultado de Contribuição após Mídia (R$) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| *Aguardando início* | `C01` / `C02` / `C03` | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
