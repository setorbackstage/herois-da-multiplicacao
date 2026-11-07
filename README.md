# ⚡ Heróis da Multiplicação & Missão Tabuada

> Projeto educacional completo para o ensino lúdico e progressivo da tabuada no Ensino Fundamental I (rotina de 15 minutos diários). Inclui aplicação interativa, livro digital em PDF preenchível e landing page de vendas de alta conversão.

---

## 🌐 Links Online (GitHub Pages)

- 🛒 **Página de Vendas Oficial (Oferta R$ 10 / R$ 27):**  
  [https://xavier2bit.github.io/missao-tabuada/tabuada-offer.html](https://xavier2bit.github.io/missao-tabuada/tabuada-offer.html)

- 🎮 **Webapp Interativo do Livro (Volume 1):**  
  [https://xavier2bit.github.io/missao-tabuada/](https://xavier2bit.github.io/missao-tabuada/)

---

## 📂 Estrutura do Repositório

### 1. 🛍️ Landing Page Comercial & Marketing
- **`tabuada-offer.html`**: Landing page oficial responsiva de alta conversão.
  - Design lúdico/gamificado estilo Duolingo/livro infantil premium (fontes Fredoka e Inter).
  - Primeira dobra com livro 3D e heróis voando animados.
  - Seção UGC ("Na Prática") com fotos reais de famílias e crianças usando o material.
  - Estratégia de planos: **Missão Tabuada (R$ 10,00)** e **Liga dos Heróis da Matemática (R$ 27,00)**.
  - Integração pronta para **ggCheckout** com repasse automático de parâmetros de rastreamento (`utm_source`, `utm_campaign`, `fbclid`, etc.).
- **`tabuada-assets/`**: Mockups 3D, fotos UGC tratadas, logos e personagens em PNG transparente.

### 2. 🎮 Produto & Webapp Interativo
- **`index.html`**: Aplicação interativa gamificada com cronômetro em tempo real, validação sonora de respostas e efeitos visuais com confetes.
- **`book.html`** / **`book_styles.css`**: Estrutura visual e diagramação das páginas do livro.
- **`Missao_Tabuada_Volume_1.pdf`**: Livro completo em PDF com 43 páginas em formato A4, com 944 campos preenchíveis digitais (AcroForms) e pronto para impressão.
- **`assets/`**: Mascotes, escudos e elementos gráficos em alta resolução do livro.

### 3. 🛠️ Scripts de Automação e Geração
- **`generate_curriculum.js`**: Gera a matriz pedagógica e o cronograma de 12 semanas.
- **`render_book_html.js`**: Compila o HTML completo de todas as 43 páginas do livro.
- **`build_interactive_webapp.js`**: Monta o webapp interativo compilando áudios e interações.
- **`build_interactive_pdf.js`** / **`build_pdf.js`**: Gera o PDF preenchível via Puppeteer.

---

## 💻 Como Trabalhar Neste Projeto em Outros Dispositivos / IAs

Para continuar o desenvolvimento em qualquer outro computador ou com assistentes de IA (Cursor, VS Code, Claude, ChatGPT, etc.):

```bash
# 1. Clone o repositório
git clone https://github.com/xavier2bit/missao-tabuada.git

# 2. Acesse a pasta
cd missao-tabuada

# 3. Instale as dependências (para os scripts geradores de PDF e imagem)
npm install
```

Para visualizar a landing page localmente, basta abrir o arquivo `tabuada-offer.html` em qualquer navegador.
