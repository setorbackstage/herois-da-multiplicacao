# 04 — INVENTÁRIO DE ASSETS, IDENTIDADE VISUAL E POLÍTICA DE USO

Este diretório concentra o catálogo validado dos arquivos reais da marca **Heróis da Multiplicação** para abastecer a prévia V2 e o envio ao **ChatGPT** (criativos estáticos `1440×1800`, `1440×2560`, `1440×1440`).

> [!IMPORTANT]
> **Nota técnica sobre cópia binária:** Como a pasta do projeto foi movida para `D:\downloads backup 2026nov\Criativos` após a abertura da sessão do IDE, comandos de terminal estão impedidos de rodar no diretório anterior (`c:\Users\Admin\Downloads\Criativos`). Por segurança e integridade, **nenhum arquivo binário foi duplicado por comando neste momento**. Para replicar fisicamente apenas os arquivos aprovados para subpastas locais dentro de `operacao_v2/04_ASSETS_CRIATIVOS/`, reabra o workspace em `D:\downloads backup 2026nov\Criativos` e execute [`copiar_assets_v2.ps1`](file:///D:/downloads%20backup%202026nov/Criativos/operacao_v2/04_ASSETS_CRIATIVOS/copiar_assets_v2.ps1).

---

## 1. Identidade Visual e Tipografia (Tokens do Projeto)

*(Não redistribuir arquivos binários de fonte; utilizar via Google Fonts ou tipografia equivalente no design).*

### Paleta Oficial
| Token | Hex | Uso na Marca |
| :--- | :---: | :--- |
| `--purple-hero` / `--purple-dark` | `#713D9D` / `#522675` | Fundos de destaque, seção de ofertas e selos premium |
| `--blue-hero` / `--blue-dark` / `--blue-light` | `#176DB3` / `#0F4E82` / `#38BFE3` | Títulos secundários, plano básico e elementos didáticos |
| `--yellow-hero` / `--yellow-dark` | `#FFC928` / `#D4A017` | Badges principais, card Combo, CTA amarelo e destaque de preço |
| `--red-hero` / `--red-dark` | `#E9433B` / `#BD2B24` | CTA principal do Hero e elementos de alerta |
| `--green-action` / `--duo-green` | `#16A34A` / `#58CC02` | Botão de checkout, checkmarks e badges do WebApp |
| `--creme-bg` / `--creme-alt` | `#FFF8E9` / `#FBF4E4` | Fundo principal editorial quente |
| `--ink-title` / `--ink-body` / `--ink-muted` | `#1B2A4A` / `#334155` / `#64748B` | Hierarquia de textos |

### Tipografia
- **Títulos / Display:** `Fredoka` (`500`, `600`, `700`) — Google Fonts: `https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap`
- **Corpo / UI / Bullets:** `Nunito` (`500`, `600`, `700`, `800`, `900`) — Google Fonts: `https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&display=swap`

---

## 2. Assets APROVADOS (Verificados Visualmente na Pasta Real)

### A. Logotipos
- `../../tabuada-assets/logo-transparente.png` — Logotipo oficial *Heróis da Multiplicação* com fundo transparente (prioritário).
- `../../tabuada-assets/logo-oficial.png` — Logotipo oficial sobre fundo branco (para templates com fundo claro/e-mails).

### B. Personagens Originais (Léo, Maya, Buggy)
- `../../tabuada-assets/heroi-menino-oficial.png` — **Léo**, menino herói com máscara azul, capa vermelha, estrela "1" e símbolo `×` dourado. *(Aprovado e limpo).*
- `../../tabuada-assets/heroi-menino-transparente.png` — Cópia limpa equivalente do Léo. *(Aprovado).*
- `../../tabuada-assets/monstro-oficial.png` — **Buggy**, monstrinho roxo com números e sinais matemáticos coloridos. *(Aprovado e limpo).*
- `../../tabuada-assets/heroi-menina-oficial.png` e `heroi-menina-voando.png` — **Maya**, menina heroína com máscara vermelha e capa azul. *(Atenção: a folhinha na mão esquerda contém texto de IA `"PDF FLOÇAS"`; usar cobrindo/recortando o folheto ou extrair a pose limpa da Maya na capa `capa-missao-tabuada.jpg`).*

### C. Capas Reais e Mockups de Produto
- `../../tabuada-assets/capa-missao-tabuada.jpg` — Capa oficial limpa **"MISSÃO TABUADA — Volume 1: A Tabuada Completa do 1 ao 10!"** (com Léo e Maya em texto limpo em português).
- `../../tabuada-assets/preview_clean_p1_cover.png` — Versão de capa com quadro editável para nome do aluno e escola.
- `../../tabuada-assets/capa-liga-dos-herois.jpg` — Capa **"LIGA DOS HERÓIS DA MATEMÁTICA — Volume 2: Desafios e Problemas de Matemática!"** (com Léo, Maya, Buggy e Lápis Herói). *(Nota: no texto comercial não chamar o kit de "Volume 2", pois os entregáveis atuais são o Vol 1 + 5 cadernos bônus; útil como referência visual dos personagens).*
- `../../tabuada-assets/conteudo-6.png` — Mockup físico em mesa de madeira (*Heróis da Multiplicação*).
- `../../tabuada-assets/conteudo-7.png` — Mockup segurado nas mãos (*Liga dos Heróis da Matemática*).

### D. Páginas Internas Reais (Sem Erros Matemáticos)
- `../../tabuada-assets/preview_clean_p3_tracker.png` — **Página 3 real do PDF:** *Mapa de Conquistas do Herói* (escudos do 1 ao 10 para colorir).
- `../../tabuada-assets/preview_clean_p4_worksheetA.png` — **Página 4 de 43 real do PDF:** *Tabuada do 1 • O Início do Poder*, com cronômetro e 100% das contas corretas. *(Nota editorial: rodapé traz frase informal sobre "gravar durante o sono", recomendável manter discrição em peças publicitárias).*
- `../../tabuada-assets/preview_clean_p43_certificate.png` — **Página 43 real do PDF:** *Certificado de Herói da Multiplicação*.

### E. Lifestyle / Ambiente Doméstico
- `../../tabuada-assets/mae_brasileira_filtro_barro_2.jpg` — Foto realista de mãe e filho brasileiros estudando na mesa de madeira com o material. *(Único lifestyle validado; sem erros de cálculo aparentes em tamanho normal).*

### F. Capturas de Tela do WebApp (`/app`) — Com Ressalva
- `../../tabuada-assets/duolingo_app_mapa_screen.png` e `../../tabuada-assets/duolingo_app_licao_screen.png` — Capturas do protótipo anterior (UI verde/azul sem os avatares atuais do Léo/Maya/Buggy). Para anúncios que exibam o `/app` atual, capture novas telas em `https://heroisdamultiplicacao.vercel.app/app` em formato `390×844` após abrir em desktop/celular.

---

## 3. Assets REPROVADOS / BLOQUEADOS (NÃO ENVIAR AO CHATGPT NEM USAR NA LP V2)

| Arquivo | Motivo Técnico da Reprovação (Observado na Inspeção Visual) |
| :--- | :--- |
| `tabuada-assets/kit-completo-mesa.jpg` | **Erros graves de tabuada em destaque:** `2×3=5`, `1×1=8`, `6×6=50`, `8×8=29`, `7×7=24`, além de texto corrompido (`"Tcicdetro ou falso"`, `"Nomo:"`). |
| `tabuada-assets/jogos-recortaveis-pintura.jpg` | **Idioma inglês + erros matemáticos:** títulos `"MULTIPLICATION ISLAND ADVENTURE"`, `"MATH DOMINOES"`, `"MULTIPLICATION BINGO"` e contas falsas (`4×6 \| 36`, `6×7 \| 45`). *(Substituir futuramente por exportação real das páginas de `Jogos_da_Tabuada_Trilha_Domino_Bingo.pdf`).* |
| `tabuada-assets/mockup_kit_completo_aberto_2k.jpg` | Exibe produto inexistente (`"JORNADA DAS 4 OPERAÇÕES"`), gibberish (`"Jorm-monlração plenfância"`) e hexadecimais impressos. |
| `tabuada-assets/hero-bundle-3d.jpg` | Pintura e dominós com erros matemáticos (`2×2=3`, `2×2=10`) e texto misturado em inglês. |
| `tabuada-assets/crianca-segurando-ficha.jpg` | Menina segurando ficha marcada com ✓ vermelho em contas erradas (`2×4=16 ✓`, `3×2=27 ✓`), incompatível com texto *"Meu filho Pedro"*. |
| `tabuada-assets/banner-checkout-liga-herois.png` | Texto afirma `"PACOTE COMPLETO 4 OPERAÇÕES"` e `"+ DE 200 PÁGINAS"`, divergindo da oferta real de Multiplicação. |
| `video_demonstrativo.mp4` / `frame_promocional.jpg` / `child_holding_math_worksheet_282ab985_2k.jpg` | Arquivos retornam **HTTP 404** em produção. |
