// generate_curriculum.js
// Generates the full 43-page curriculum data for Volume 1: Missão Tabuada (Do 1 ao 10)
// Every calculation is computed mathematically to guarantee 100% accuracy.

const fs = require('fs');
const path = require('path');

function createCurriculum() {
  const pages = [];

  // PAGE 1: Capa Oficial
  pages.push({
    pageNumber: 1,
    type: 'cover',
    title: 'Missão Tabuada',
    subtitle: 'A Tabuada Completa do 1 ao 10',
    volume: 'Volume 1',
    description: 'O Método Definitivo dos Campeões para Dominar a Multiplicação com Confiança e Diversão!'
  });

  // PAGE 2: Manual do Guardião
  pages.push({
    pageNumber: 2,
    type: 'guide',
    title: 'Manual do Guardião',
    subtitle: 'Guia Prático para Pais e Educadores',
    rules: [
      {
        number: '1',
        title: 'O Cronômetro de Herói (Sem Pressão!)',
        desc: 'O objetivo do cronômetro NÃO é pressionar ou acelerar a criança de forma estressante. Ele serve para despertar o espírito de autossuperação: a criança compete apenas com o seu próprio tempo anterior. Anote o tempo com naturalidade e comemore cada segundo conquistado!'
      },
      {
        number: '2',
        title: 'Regra de Ouro: Jamais Apague os Erros!',
        desc: 'NUNCA use borracha para apagar uma resposta errada. Quando houver erro, faça um círculo com caneta vermelha ou colorida e escreva o resultado correto ao lado. O erro não é vergonha: é o rastro da evolução neurológica e ensina o cérebro onde redobrar a atenção.'
      },
      {
        number: '3',
        title: 'Constância de 15 Minutos por Dia',
        desc: 'A memorização da tabuada ocorre por consolidação sináptica durante o sono. Praticar 15 minutos diários com foco leve é infinitamente mais eficaz do que estudar horas cansativas em um único dia. Mantenha o ritmo diário e veja a mágica acontecer!'
      },
      {
        number: '4',
        title: 'O Ciclo Sagrado dos 3 Micro-Passos',
        desc: 'Cada número é dividido em 3 páginas: Página A (início do poder, 1 ao 5), Página B (força máxima, 6 ao 10) e Página C (O Chefão do Número). Esse método divide o desafio em etapas digeríveis que constroem autoconfiança imediata.'
      },
      {
        number: '5',
        title: 'Celebração e Mapa de Conquistas',
        desc: 'A cada Chefão derrotado na Página C, oriente a criança a correr para a Página 3 e pintar o Escudo de Poder correspondente. Essa pequena recompensa visual ativa o sistema de dopamina e mantém a motivação em alta até o final!'
      }
    ]
  });

  // PAGE 3: Mapa de Conquistas (Tracker)
  pages.push({
    pageNumber: 3,
    type: 'tracker',
    title: 'Mapa de Conquistas do Herói',
    subtitle: 'Pinte cada Escudo de Poder assim que derrotar o Chefão de cada número!',
    shields: Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      name: `Tabuada do ${i + 1}`,
      bossName: `Chefão do ${i + 1}`,
      badgeColor: getTabuadaColor(i + 1)
    }))
  });

  // PAGES 4 to 33: Tabuadas do 1 ao 10 (Ciclo de 3 páginas cada)
  for (let n = 1; n <= 10; n++) {
    const pageANum = 4 + (n - 1) * 3;
    const pageBNum = pageANum + 1;
    const pageCNum = pageANum + 2;
    const color = getTabuadaColor(n);

    // --- PÁGINA A: O Início do Poder (Micro-passos 1 ao 5) ---
    // Bloco 1: Ordem regular
    const baseA1 = [1, 2, 3, 4, 5].map(m => ({ a: n, b: m, ans: n * m }));
    // Bloco 2: Ordem embaralhada
    const baseA2 = [3, 1, 5, 2, 4].map(m => ({ a: n, b: m, ans: n * m }));
    // Bloco 3: Ordem alternativa
    const baseA3 = [5, 4, 2, 3, 1].map(m => ({ a: n, b: m, ans: n * m }));
    // Bloco 4: Desafio rápido
    const baseA4 = [2, 5, 3, 4, 1].map(m => ({ a: n, b: m, ans: n * m }));

    // Invasão Surpresa: tabuada anterior (ou revisão simples se n=1)
    let invasionA = [];
    if (n === 1) {
      invasionA = [
        { a: 1, b: 2, ans: 2 },
        { a: 1, b: 4, ans: 4 },
        { a: 1, b: 1, ans: 1 },
        { a: 1, b: 5, ans: 5 }
      ];
    } else {
      const prev = n - 1;
      const multipliers = [2, 4, 3, 5];
      invasionA = multipliers.map(m => ({ a: prev, b: m, ans: prev * m }));
    }

    pages.push({
      pageNumber: pageANum,
      type: 'worksheet_a',
      n: n,
      themeColor: color,
      title: `Tabuada do ${n} • O Início do Poder`,
      subtitle: `Micro-passos: Multiplicando do 1 ao 5`,
      blocks: [
        { label: 'Treinamento Passo 1', items: baseA1 },
        { label: 'Treinamento Passo 2', items: baseA2 },
        { label: 'Treinamento Passo 3', items: baseA3 },
        { label: 'Treinamento Passo 4', items: baseA4 }
      ],
      invasion: {
        title: n === 1 ? '⚡ Invasão Relâmpago: Desafio Inicial!' : `⚡ Invasão Surpresa: Relembrando o ${n - 1}!`,
        desc: n === 1 ? 'Resolva com rapidez heróica!' : `O Chefão do ${n - 1} tentou invadir! Prove que sua memória é imbatível:`,
        items: invasionA
      }
    });

    // --- PÁGINA B: Força Máxima (Micro-passos 6 ao 10) ---
    const baseB1 = [6, 7, 8, 9, 10].map(m => ({ a: n, b: m, ans: n * m }));
    const baseB2 = [8, 6, 10, 7, 9].map(m => ({ a: n, b: m, ans: n * m }));
    const baseB3 = [9, 7, 6, 10, 8].map(m => ({ a: n, b: m, ans: n * m }));
    const baseB4 = [7, 10, 8, 9, 6].map(m => ({ a: n, b: m, ans: n * m }));

    // Invasão Surpresa: mistura com contas da Página A (1 ao 5)
    const invasionB = [
      { a: n, b: 3, ans: n * 3 },
      { a: n, b: 5, ans: n * 5 },
      { a: n, b: 2, ans: n * 2 },
      { a: n, b: 4, ans: n * 4 }
    ];

    pages.push({
      pageNumber: pageBNum,
      type: 'worksheet_b',
      n: n,
      themeColor: color,
      title: `Tabuada do ${n} • Força Máxima`,
      subtitle: `Micro-passos: Multiplicando do 6 ao 10`,
      blocks: [
        { label: 'Avançando no Poder 1', items: baseB1 },
        { label: 'Avançando no Poder 2', items: baseB2 },
        { label: 'Avançando no Poder 3', items: baseB3 },
        { label: 'Avançando no Poder 4', items: baseB4 }
      ],
      invasion: {
        title: '⚡ Invasão Surpresa: Mistura de Poder!',
        desc: 'As contas do início voltaram para testar sua concentração total:',
        items: invasionB
      }
    });

    // --- PÁGINA C: O Chefão do Número (Revisão Geral e Monstro) ---
    // Toda a tabuada do n de 1 a 10 completamente embaralhada (24 contas)
    const orderC = [7, 2, 9, 4, 1, 6, 10, 3, 8, 5, 2, 7, 4, 9, 6, 1, 8, 3, 10, 5, 3, 8, 6, 9];
    const bossItems = orderC.map(m => ({ a: n, b: m, ans: n * m }));

    pages.push({
      pageNumber: pageCNum,
      type: 'worksheet_c',
      n: n,
      themeColor: color,
      title: `O Chefão do ${n} • Batalha Final`,
      subtitle: `Toda a Tabuada do ${n} Embaralhada • Derrote o Monstro!`,
      bossName: `Chefão do ${n}`,
      bossTaunt: getBossTaunt(n),
      items: bossItems,
      rewardText: `Você derrotou o Chefão do ${n}! Vá até a Página 3 e pinte com orgulho o seu Escudo de Poder ${n}!`
    });
  }

  // PAGE 34: Mega Batalha 1 (Fase Ouro) - Multiplicadores 1 ao 5 misturados
  // 36 contas embaralhadas com multiplicadores 1..5
  const goldItems = [];
  const goldCombos = [
    [2, 3], [4, 5], [1, 8], [3, 4], [5, 2], [2, 7],
    [4, 3], [3, 9], [5, 5], [1, 9], [2, 6], [4, 4],
    [3, 6], [5, 4], [2, 9], [4, 2], [3, 7], [5, 3],
    [1, 7], [2, 8], [4, 6], [3, 8], [5, 6], [2, 4],
    [4, 8], [3, 5], [5, 7], [1, 6], [2, 5], [4, 7],
    [3, 3], [5, 8], [2, 2], [4, 9], [3, 2], [5, 9]
  ];
  goldCombos.forEach(([a, b]) => {
    goldItems.push({ a, b, ans: a * b });
  });

  pages.push({
    pageNumber: 34,
    type: 'mega_battle',
    tier: 'gold',
    themeColor: '#D97706',
    title: 'Mega Batalha 1 • Fase Ouro',
    subtitle: 'Grande Desafio Geral: Multiplicadores do 1 ao 5 Totalmente Embaralhados!',
    desc: 'O reino dos números do 1 ao 5 foi invadido! Mostre sua agilidade mental e resolva as 36 contas no menor tempo possível!',
    items: goldItems
  });

  // PAGE 35: Mega Batalha 2 (Fase Diamante) - Multiplicadores 6 ao 10 misturados
  const diamondItems = [];
  const diamondCombos = [
    [6, 7], [7, 8], [8, 9], [9, 6], [10, 7], [6, 6],
    [7, 7], [8, 8], [9, 9], [10, 10], [6, 8], [7, 9],
    [8, 6], [9, 7], [10, 8], [6, 9], [7, 6], [8, 7],
    [9, 8], [10, 6], [6, 10], [7, 10], [8, 10], [9, 10],
    [7, 3], [8, 4], [6, 5], [9, 4], [8, 5], [7, 5],
    [6, 4], [9, 5], [7, 4], [8, 3], [6, 3], [10, 5]
  ];
  diamondCombos.forEach(([a, b]) => {
    diamondItems.push({ a, b, ans: a * b });
  });

  pages.push({
    pageNumber: 35,
    type: 'mega_battle',
    tier: 'diamond',
    themeColor: '#0284C7',
    title: 'Mega Batalha 2 • Fase Diamante',
    subtitle: 'Grande Desafio dos Titãs: Tabuadas do 6 ao 10 em Ação Máxima!',
    desc: 'As contas mais poderosas da matemática estão aqui! Mantenha a calma, respire fundo e conquiste a cobiçada Insígnia Diamante!',
    items: diamondItems
  });

  // PAGE 36: A Batalha Épica (O Monstro Gigante) - Prova Final
  const epicItems = [];
  const epicCombos = [
    [7, 7], [8, 6], [9, 8], [6, 7], [4, 9], [3, 8],
    [5, 7], [8, 8], [7, 9], [6, 9], [9, 9], [8, 7],
    [7, 6], [6, 8], [9, 4], [8, 4], [5, 9], [4, 7],
    [3, 7], [6, 6], [7, 8], [8, 9], [9, 7], [10, 9],
    [2, 9], [4, 8], [5, 8], [3, 9], [7, 4], [8, 5],
    [6, 4], [9, 6], [7, 5], [8, 3], [9, 3], [10, 7]
  ];
  epicCombos.forEach(([a, b]) => {
    epicItems.push({ a, b, ans: a * b });
  });

  pages.push({
    pageNumber: 36,
    type: 'epic_battle',
    themeColor: '#7C3AED',
    title: 'A Batalha Épica • O Monstro Gigante',
    subtitle: 'A Grande Prova Final do Volume 1 • Lápis Herói ao Resgate!',
    desc: 'O Monstro Gigante da Tabuada tentou dominar a Escola da Matemática! Junto com o Lápis Herói e seus companheiros, vença o desafio definitivo!',
    items: epicItems
  });

  // PAGES 37 to 42: O Gabarito Secreto
  // Pág 37: Tabuadas 1 e 2
  pages.push({
    pageNumber: 37,
    type: 'answer_key',
    title: 'O Gabarito Secreto',
    subtitle: 'Respostas Oficiais • Tabuada do 1 e Tabuada do 2',
    sections: [
      getAnswerSection(pages, 1),
      getAnswerSection(pages, 2)
    ]
  });

  // Pág 38: Tabuadas 3 e 4
  pages.push({
    pageNumber: 38,
    type: 'answer_key',
    title: 'O Gabarito Secreto',
    subtitle: 'Respostas Oficiais • Tabuada do 3 e Tabuada do 4',
    sections: [
      getAnswerSection(pages, 3),
      getAnswerSection(pages, 4)
    ]
  });

  // Pág 39: Tabuadas 5 e 6
  pages.push({
    pageNumber: 39,
    type: 'answer_key',
    title: 'O Gabarito Secreto',
    subtitle: 'Respostas Oficiais • Tabuada do 5 e Tabuada do 6',
    sections: [
      getAnswerSection(pages, 5),
      getAnswerSection(pages, 6)
    ]
  });

  // Pág 40: Tabuadas 7 e 8
  pages.push({
    pageNumber: 40,
    type: 'answer_key',
    title: 'O Gabarito Secreto',
    subtitle: 'Respostas Oficiais • Tabuada do 7 e Tabuada do 8',
    sections: [
      getAnswerSection(pages, 7),
      getAnswerSection(pages, 8)
    ]
  });

  // Pág 41: Tabuadas 9 e 10
  pages.push({
    pageNumber: 41,
    type: 'answer_key',
    title: 'O Gabarito Secreto',
    subtitle: 'Respostas Oficiais • Tabuada do 9 e Tabuada do 10',
    sections: [
      getAnswerSection(pages, 9),
      getAnswerSection(pages, 10)
    ]
  });

  // Pág 42: Mega Batalhas 1, 2 e Batalha Épica
  pages.push({
    pageNumber: 42,
    type: 'answer_key_battles',
    title: 'O Gabarito Secreto • As Grandes Batalhas',
    subtitle: 'Respostas Oficiais • Mega Batalhas 1, 2 e Batalha Épica',
    sections: [
      {
        title: 'Página 34: Mega Batalha 1 (Fase Ouro)',
        items: pages.find(p => p.pageNumber === 34).items
      },
      {
        title: 'Página 35: Mega Batalha 2 (Fase Diamante)',
        items: pages.find(p => p.pageNumber === 35).items
      },
      {
        title: 'Página 36: A Batalha Épica (Monstro Gigante)',
        items: pages.find(p => p.pageNumber === 36).items
      }
    ]
  });

  // PAGE 43: Certificado de Herói da Multiplicação
  pages.push({
    pageNumber: 43,
    type: 'certificate',
    title: 'Certificado de Herói da Multiplicação',
    subtitle: 'Ordem Suprema dos Heróis da Matemática',
    pledgeText: 'Certificamos com honra e reconhecimento supremo que este(a) valoroso(a) estudante completou com louvor e bravura todos os 30 treinamentos de micro-passos, derrotou os 10 Chefões do Reino dos Números e venceu com coragem a Grande Batalha Épica do Volume 1, conquistando o honrado título oficial de:'
  });

  return pages;
}

function getAnswerSection(pages, n) {
  const pageA = pages.find(p => p.n === n && p.type === 'worksheet_a');
  const pageB = pages.find(p => p.n === n && p.type === 'worksheet_b');
  const pageC = pages.find(p => p.n === n && p.type === 'worksheet_c');

  return {
    n: n,
    title: `Tabuada do ${n}`,
    pageA: {
      num: pageA.pageNumber,
      blocks: pageA.blocks.map(b => b.items),
      invasion: pageA.invasion.items
    },
    pageB: {
      num: pageB.pageNumber,
      blocks: pageB.blocks.map(b => b.items),
      invasion: pageB.invasion.items
    },
    pageC: {
      num: pageC.pageNumber,
      items: pageC.items
    }
  };
}

function getTabuadaColor(n) {
  const colors = {
    1: '#0284C7', // Azul Céu Heróico
    2: '#EA580C', // Laranja Solar
    3: '#16A34A', // Verde Esmeralda
    4: '#9333EA', // Roxo Mágico
    5: '#E11D48', // Vermelho Escarlate
    6: '#0D9488', // Verde Azulado Marinho
    7: '#D97706', // Âmbar Dourado
    8: '#4F46E5', // Índigo Noturno
    9: '#C026D3', // Magenta Choque
    10: '#2563EB' // Azul Real Supremo
  };
  return colors[n] || '#4F46E5';
}

function getBossTaunt(n) {
  const taunts = {
    1: 'Haha! O número 1 é moleza? Quero ver você fazer tudo voando sem piscar!',
    2: 'O dobro do perigo! Você vai tropeçar nos números pares!',
    3: 'Três vezes mais difícil! Ninguém decora a tabuada do 3 tão rápido!',
    4: 'Quatro cantos de confusão! Minhas garras matemáticas vão te confundir!',
    5: 'Termina com zero ou cinco? Duvido você responder antes do cronômetro zerar!',
    6: 'Agora o jogo ficou sério! O 6 é o pesadelo de muitos heróis!',
    7: 'O temido 7! Ninguém passa por mim sem errar pelo menos uma vez!',
    8: 'Oito tentáculos de cálculos! O Chefão do 8 é quase invencível!',
    9: 'O misterioso 9! Cheio de truques e magias para tentar te derrotar!',
    10: 'O Chefão Supremo! Coloque zeros e mostre se você é um herói lendário!'
  };
  return taunts[n] || 'Duvido você me derrotar!';
}

const curriculum = createCurriculum();
fs.writeFileSync('curriculum.json', JSON.stringify(curriculum, null, 2));
console.log(`Generated curriculum with ${curriculum.length} verified pages!`);
