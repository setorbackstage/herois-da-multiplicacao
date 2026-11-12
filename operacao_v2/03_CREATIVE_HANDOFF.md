# 03 — CREATIVE HANDOFF (PARA PRODUÇÃO DE ANÚNCIOS NO CHATGPT)

**Destinatário:** ChatGPT (Design e Copy de Anúncios Estáticos)  
**Regra de Produção:** Criar **APENAS imagens estáticas** nos 3 formatos abaixo. **Não gerar vídeos.**

---

## 1. Formatos e Dimensões Obrigatórias (Meta Ads)

| Posicionamento | Proporção | Resolução Exata | Observação de Área Segura |
| :--- | :---: | :---: | :--- |
| **Feed / Instagram** | `4:5` | **`1440 × 1800 px`** | Margem de segurança de 80 px nas bordas |
| **Stories / Reels** | `9:16` | **`1440 × 2560 px`** | Deixar topo (250 px) e rodapé (380 px) livres para UI do Instagram/CTA |
| **Quadrado / Catálogo / Fallback** | `1:1` | **`1440 × 1440 px`** | Composição centralizada e legível em miniatura |

---

## 2. Dados Verificados da Marca, Oferta e Preços

> **Use APENAS os dados abaixo (todos confirmados nos arquivos e checkouts reais):**

- **Nome da Marca:** Heróis da Multiplicação
- **Oferta Principal para os Anúncios (prioridade de teste):** **Liga dos Heróis — Combo Completo por R$ 27,00** (pagamento único, acesso imediato).
- **O que vem no Combo Completo (R$ 27,00):**
  - Livro ilustrado *Missão Tabuada* (43 páginas em PDF, tabuada do 1 ao 10, Manual do Guardião, gabarito e certificado).
  - Cronograma Mestre de 12 Semanas (PDF).
  - Caderno de Atividades & Fichas Diárias (PDF).
  - Caderno de Pintura por Multiplicação (PDF).
  - Jogos de Tabuleiro, Dominó e Bingo para imprimir e recortar (PDF).
  - Desafios Semanais de Acompanhamento (PDF).
  - WebApp interativo no navegador (estilo jogo com fases de 1 a 10 e sons — roda no celular ou tablet sem instalar nada).
- **Plano Básico de Entrada (opção disponível na página):** **Missão Tabuada por R$ 10,00** (Livro ilustrado de 43 páginas em PDF, tabuada 1 a 10, Manual para pais, gabarito e certificado).
- **Momento Sazonal Atual:** **Novembro — Revisão de Fim de Ano** (pais buscando ajudar filhos do Ensino Fundamental I a revisar multiplicação antes do fechamento do ano letivo).
- **Público-Alvo:** Pais, mães e responsáveis de crianças que estão aprendendo ou revisando a tabuada (Ensino Fundamental I).

---

## 3. Identidade Visual, Fontes, Cores e Personagens Oficiais

### Paleta Oficial (Extraída do `:root` de `index.html` e `app.html`)
- **Roxo Herói (Principal):** `#713D9D` (Escuro: `#522675` | Suave: `#F5EEFB`)
- **Azul Herói (Apoio/Didático):** `#176DB3` (Escuro: `#0F4E82` | Claro: `#38BFE3`)
- **Amarelo Herói (Destaques / Preço / Selos):** `#FFC928` (Escuro: `#D4A017` | Suave: `#FFF9E6`)
- **Vermelho Herói (Ação / Alerta):** `#E9433B` (Escuro: `#BD2B24`)
- **Verde Ação (Sucesso / Checklist):** `#16A34A` / `#58CC02`
- **Fundo Creme Leve:** `#FFF8E9` | **Texto Título Azul-Marinho:** `#1B2A4A` | **Texto Corpo:** `#334155`

### Tipografia Oficial (Google Fonts — não redistribuir binários)
- **Títulos e Headlines:** **`Fredoka`** (pesos 600, 700 — estilo lúdico, arredondado, infantil premium)
- **Corpo, Subtítulos e Listas:** **`Nunito`** (pesos 600, 700, 800, 900)

### Personagens Confirmados (Veja pasta `04_ASSETS_CRIATIVOS/`)
- **Léo (O Herói dos Números):** Menino com máscara azul, capa e luvas vermelhas, estrela azul com número `1` no peito, segurando um **`×` dourado**.
- **Maya (A Guardiã da Tabuada):** Menina com máscara vermelha, capa azul, camiseta branca com **`×` vermelho**. *(Atenção: o arquivo PNG isolado dela mostra um caderninho com texto borrado "PDF FLOÇAS"; prefira usar a pose limpa dela vinda da capa `capa-missao-tabuada.jpg` ou cobrir/corrigir a capa na arte final).*
- **Buggy (O Monstrinho das Contas):** Monstro roxo fofinho e simpático cercado por números e símbolos (`3`, `5`, `4`, `7`, `×`, `?`), representando o "chefão" das contas difíceis (como `7 × 8`).
- *(Apoio nos PDFs: **Lápis Herói**, lápis amarelo com óculos/máscara azul e capa amarela que aparece nas páginas reais dos PDFs e capas).*

---

## 4. Primeira Rodada de Anúncios (Briefs para Execução no ChatGPT)

### C01 — Alerta Escolar (Editorial / Notícia Publicitária)
- **Formato visual:** Visual editorial limpo estilo alerta/capa informativa (alto contraste, leitura rápida em 1 segundo no feed), com fundo claro ou jornal/aviso escolar + ilustração do Léo/Maya ou página real `preview_clean_p4_worksheetA.png`.
- **Headline exata:** **`NOVEMBRO CHEGOU. E A TABUADA?`**
- **Subtexto sugerido:** *"Ainda dá tempo de transformar a revisão do fim de ano em uma rotina leve de 15 min/dia — com missões impressas, jogos e aplicativo infantil."*
- **Objetivo:** Testar interesse/clique para o gancho de revisão de fim de ano.
- **CTA visual na peça:** `"VER MISSÕES DE REVISÃO →"` | **UTM:** `utm_content=C01_alerta_nov&utm_term=alerta_escolar`

### C02 — Comparação (Meio a Meio / Split Screen)
- **Formato visual:** Dividido ao meio (`Antes / Sem método` vs `Com os Heróis da Multiplicação`). Lado A: caderno tradicional confuso/cansaço; Lado B: páginas coloridas reais (`preview_clean_p3_tracker.png` + `preview_clean_p4_worksheetA.png`) + Léo e Maya.
- **Headline exata:** **`A MESMA TABUADA. UMA EXPERIÊNCIA DIFERENTE.`**
- **Subtexto sugerido:** *"Deixe a decoreba pesada de lado: pratique no papel em 15 min/dia + jogos recortáveis e desafios no celular."*
- **Objetivo:** Demonstrar visualmente o diferencial didático e lúdico.
- **CTA visual na peça:** `"CONHECER O MATERIAL →"` | **UTM:** `utm_content=C02_comparacao&utm_term=comparacao`

### C03 — Oferta Direta (Apresentação Comercial do Combo)
- **Formato visual:** Composição de oferta direta clara: capas reais (`capa-missao-tabuada.jpg` + `capa-liga-dos-herois.jpg`), páginas limpas, Léo/Maya/Buggy + selo de preço claro **`R$ 27`** (pagamento único) + lista curta: *6 Cadernos em PDF para imprimir + Jogos de Mesa + App Interativo no Navegador*.
- **Headline exata:** **`TRANSFORME A TABUADA EM MISSÕES.`**
- **Subtexto sugerido:** *"Combo Liga dos Heróis: 6 apostilas em PDF A4 + Jogos + WebApp por R$ 27 (ou plano inicial por R$ 10)."*
- **Objetivo:** Testar compra direta motivada por clareza de entregáveis e preço.
- **CTA visual na peça:** `"QUERO POR R$ 27 →"` | **UTM:** `utm_content=C03_oferta_combo27&utm_term=oferta_direta`

---

## 5. Segunda Rodada Planejada (Backlog para Pós-Validação)
1. **POV (Ponto de vista dos pais):** Atividade impressa vista de cima na mesa com lápis de cor e ficha real limpa (`preview_clean_p4_worksheetA.png`), transmitindo momento tranquilo em casa.
2. **UGC Estático:** Foto ambiente doméstico real de mãe e filho estudando (`mae_brasileira_filtro_barro_2.jpg`) com legenda nativa estilo recomendação de mãe (sem inventar depoimento falso verificável).
3. **Desafio Matemático:** Visual interativo com pergunta grande **`"7 × 8 = ?"`** e Buggy desafiando — gancho para revisão rápida do 7, 8 e 9.
4. **Carrossel Educativo (4–5 cards `1440×1440` ou `1440×1800`):** Card 1 problema -> Card 2 rotina 15 min -> Card 3 fichas + jogos impressos -> Card 4 WebApp -> Card 5 Oferta R$ 27.
5. **Oferta de Férias (Dezembro/Janeiro):** Adaptação futura para *"Férias leves: 15 minutos brincando com tabuada"*.

---

## 6. Restrições Obrigatórias de Compliance e Copy (NÃO VIOLAR)

1. **NUNCA prometer** aprovação escolar garantida, aumento garantido de notas, ou domínio completo em prazo fechado (ex.: *"aprenda em 7 dias"*, *"nunca mais tire nota vermelha"*).
2. **NUNCA citar** *"mais de 3.400 famílias"*, *"economizei R$ 1.000"* ou depoimentos fictícios como verificados.
3. **NUNCA afirmar** promessas médicas/neurocientíficas sem fonte (evitar *"dopamina"*, *"comprovado cientificamente que altera o cérebro"*).
4. **NUNCA prometer entrega física pelos Correios** ou **"4 Operações / +200 páginas"** — o produto confirmado cobre **Multiplicação (1 ao 10)** em **6 PDFs digitais A4 para imprimir + WebApp no navegador**.
5. **ALERTA DE ASSETS (NÃO USAR ESTES ARQUIVOS EM ANÚNCIOS):** Não utilize `kit-completo-mesa.jpg`, `mockup_kit_completo_aberto_2k.jpg`, `jogos-recortaveis-pintura.jpg`, `hero-bundle-3d.jpg` nem `crianca-segurando-ficha.jpg` — todos contêm erros matemáticos de IA (`2×3=5`, `1×1=8`, `2×4=16`), textos em inglês ou textos distorcidos que destroem a credibilidade do anúncio. Use **apenas** os arquivos limpos listados em `04_ASSETS_CRIATIVOS/README_ASSETS_E_IDENTIDADE.md`.
6. Em qualquer arte que exibir contas matemáticas visíveis, **conferir 100% dos resultados** (`7 × 8 = 56`, `6 × 7 = 42`, etc.).
