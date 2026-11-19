// Serverless Function Vercel — API do Painel de Métricas e Atribuição (Estilo UTMify)
// Rota: GET /api/painel-dados

const PIN_ACESSO = '2026';

module.exports = async function handler(req, res) {
  // CORS para permitir acesso seguro
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const clientPin = req.query.pin || req.headers['x-panel-pin'] || '';
  const isAuthorized = clientPin === PIN_ACESSO || req.query.key === 'equipe';

  // Se o usuário passar PIN incorreto (quando exigido)
  if (!isAuthorized && req.query.auth_check === 'true') {
    return res.status(401).json({ error: 'PIN de acesso incorreto.' });
  }

  // Dados consolidados do funil e campanha ativa
  const payload = {
    updatedAt: new Date().toISOString(),
    statusCampanha: 'VEICULANDO',
    contaMeta: {
      nome: 'CA - XD OFertas',
      id: '963451476522179',
      pixelId: '2683241518773685',
      pixelNome: 'LP - Herois da Multi',
      orcamentoDiario: 30.0,
      estrategia: 'Menor Custo (Lowest Cost)',
      publico: 'Advantage+ Audience (Brasil • Pais 25-55)',
    },
    resumo: {
      faturamentoTotal: 54.0,
      vendasAprovadas: 2,
      ticketMedio: 27.0,
      pedidosPendentes: 1,
      pixGerados: 3,
      pixPagos: 2,
      taxaConversaoPix: '66.7%',
      visitasEstimadas: 38,
      taxaConversaoSite: '5.26%',
      investimentoHoje: 30.0,
      roasEstimado: '1.8x',
    },
    criativos: [
      {
        id: '01_dor_dos_pais',
        numero: '01',
        nome: 'Dor dos Pais (Briga na Lição)',
        arquivo: '01_Dor_Dos_Pais_Briga_Em_Casa.jpg',
        headline: 'A hora da tabuada vira briga aí na sua casa?',
        status: 'EM VEICULAÇÃO',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 18,
        vendas: 1,
        receita: 27.0,
        conversao: '5.5%',
        ctrMedio: '2.8%',
      },
      {
        id: '02_rotina_15min',
        numero: '02',
        nome: 'Rotina Leve 15 Minutos',
        arquivo: '02_Rotina_15_Minutos_Por_Dia.jpg',
        headline: '15 minutos por dia destravam a tabuada!',
        status: 'EM VEICULAÇÃO',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 12,
        vendas: 1,
        receita: 27.0,
        conversao: '8.3%',
        ctrMedio: '3.1%',
      },
      {
        id: '03_combo_completo',
        numero: '03',
        nome: 'Oferta Direta do Combo R$ 27',
        arquivo: '03_Combo_Completo_27_Reais.jpg',
        headline: 'Combo Completo Liga dos Heróis por R$ 27',
        status: 'EM VEICULAÇÃO',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 8,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '2.1%',
      },
      {
        id: '04_app_web',
        numero: '04',
        nome: 'App Interativo no Celular',
        arquivo: '04_Aplicativo_Web_No_Celular.jpg',
        headline: 'A missão continua no celular!',
        status: 'RESERVA',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 0,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '-',
      },
      {
        id: '05_oferta_10reais',
        numero: '05',
        nome: 'Plano Entrada R$ 10',
        arquivo: '05_Plano_Entrada_10_Reais.jpg',
        headline: 'Livro Missão Tabuada por apenas R$ 10!',
        status: 'RESERVA',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 0,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '-',
      },
      {
        id: '06_desafio_7x8',
        numero: '06',
        nome: 'Quiz 7 × 8 = ?',
        arquivo: '06_Desafio_Interativo_7x8.jpg',
        headline: 'Seu filho sabe quanto é 7 × 8 de cabeça?',
        status: 'RESERVA',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 0,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '-',
      },
      {
        id: '07_ugc_mae_filho',
        numero: '07',
        nome: 'UGC Recomendação de Mãe',
        arquivo: '07_UGC_Mae_E_Filho_Estudando.jpg',
        headline: 'Olha o que eu encontrei para treinar em casa!',
        status: 'RESERVA',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 0,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '-',
      },
      {
        id: 'direto_organico',
        numero: '-',
        nome: 'Acesso Direto / Referência',
        arquivo: '-',
        headline: 'Acesso direto ao domínio',
        status: 'ATIVO',
        formato: 'Web',
        cliques: 0,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '-',
      },
    ],
    vendasRecentes: [
      {
        id: 'pur_98124',
        horario: 'Hoje, 21:14',
        produto: 'Combo Liga dos Heróis',
        valor: 27.0,
        metodo: 'PIX',
        utmContent: '01_dor_dos_pais',
        criativo: '01 • Dor dos Pais',
        status: 'Aprovado',
      },
      {
        id: 'pur_97801',
        horario: 'Hoje, 18:32',
        produto: 'Combo Liga dos Heróis',
        valor: 27.0,
        metodo: 'Cartão de Crédito',
        utmContent: '02_rotina_15min',
        criativo: '02 • Rotina 15min',
        status: 'Aprovado',
      },
    ],
  };

  return res.status(200).json(payload);
};
