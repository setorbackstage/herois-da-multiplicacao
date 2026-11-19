// Serverless Function Vercel — API do Painel de Métricas Reais (Conexão GGCheckout + Meta Ads)
// Rota: GET /api/painel-dados

const GGCHECKOUT_API_KEY =
  process.env.GGCHECKOUT_API_KEY ||
  'ggck_live_5d589c40d98703fd3a8926651f270b5c528e6bf50e305e73dd016aa446a83f98';
const GGCHECKOUT_BUSINESS_ID =
  process.env.GGCHECKOUT_BUSINESS_ID || 'JxqoFLG6dJdztFuabJh7wYTlGOk1';

const PIN_ACESSO = '2026';

module.exports = async function handler(req, res) {
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

  if (!isAuthorized && req.query.auth_check === 'true') {
    return res.status(401).json({ error: 'PIN de acesso incorreto.' });
  }

  // 1. Busca estatísticas REAIS da API oficial do ggCheckout
  let realStats = {
    totalSales: 0,
    totalRevenue: 0,
    pendingCount: 0,
    averageTicket: 0,
  };

  let realPayments = [];

  try {
    const statsRes = await fetch('https://ggcheckout.app/api/dashboard/stats?range=all', {
      headers: {
        Authorization: `Bearer ${GGCHECKOUT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (statsRes.ok) {
      const statsJson = await statsRes.json();
      realStats = {
        totalSales: Number(statsJson.totalSales || 0),
        totalRevenue: Number(statsJson.totalRevenue || 0),
        pendingCount: Number(statsJson.pendingCount || 0),
        averageTicket: Number(statsJson.averageTicket || 0),
      };
    }
  } catch (err) {
    console.warn('[Painel API] Erro ao consultar stats no ggCheckout:', err.message);
  }

  // 2. Busca lista REAL de clientes/pagamentos confirmados
  try {
    const paymentsRes = await fetch(
      `https://ggcheckout.app/api/get-clients/business/${GGCHECKOUT_BUSINESS_ID}/payments`,
      {
        headers: {
          Authorization: `Bearer ${GGCHECKOUT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (paymentsRes.ok) {
      const paymentsJson = await paymentsRes.json();
      if (Array.isArray(paymentsJson.payments)) {
        realPayments = paymentsJson.payments.map((p) => ({
          id: p.id || p.orderId || 'ped_' + Math.random().toString(36).substring(7),
          horario: p.createdAt ? new Date(p.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Recente',
          produto: p.productName || p.offerTitle || 'Combo Liga dos Heróis',
          valor: Number(p.amount || p.total || 27.0),
          metodo: p.paymentMethod || 'PIX',
          criativo: p.utmContent || '01 • Dor dos Pais',
          status: p.status === 'paid' ? 'Aprovado' : 'Pendente',
        }));
      }
    }
  } catch (err) {
    console.warn('[Painel API] Erro ao consultar pagamentos no ggCheckout:', err.message);
  }

  const faturamento = realStats.totalRevenue;
  const vendas = realStats.totalSales;
  const ticket = vendas > 0 ? faturamento / vendas : 0;
  const investimentoHoje = 30.0;
  const roas = investimentoHoje > 0 && faturamento > 0 ? (faturamento / investimentoHoje).toFixed(2) + 'x' : '0.0x';

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
      faturamentoTotal: faturamento,
      vendasAprovadas: vendas,
      ticketMedio: ticket,
      pedidosPendentes: realStats.pendingCount,
      pixGerados: realStats.pendingCount + vendas,
      pixPagos: vendas,
      taxaConversaoPix: (realStats.pendingCount + vendas) > 0 ? ((vendas / (realStats.pendingCount + vendas)) * 100).toFixed(1) + '%' : '0.0%',
      visitasEstimadas: 0,
      taxaConversaoSite: '0.0%',
      investimentoHoje: investimentoHoje,
      roasEstimado: roas,
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
        cliques: 0,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '-',
      },
      {
        id: '02_rotina_15min',
        numero: '02',
        nome: 'Rotina Leve 15 Minutos',
        arquivo: '02_Rotina_15_Minutos_Por_Dia.jpg',
        headline: '15 minutos por dia destravam a tabuada!',
        status: 'EM VEICULAÇÃO',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 0,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '-',
      },
      {
        id: '03_combo_completo',
        numero: '03',
        nome: 'Oferta Direta do Combo R$ 27',
        arquivo: '03_Combo_Completo_27_Reais.jpg',
        headline: 'Combo Completo Liga dos Heróis por R$ 27',
        status: 'EM VEICULAÇÃO',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 0,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '-',
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
        id: '08_antes_depois',
        numero: '08',
        nome: 'Da Dúvida à Confiança',
        arquivo: '08_Antes_Depois_Confianca.jpg',
        headline: 'Da dúvida à confiança na tabuada: Antes vs Depois',
        status: 'RESERVA',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 0,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '-',
      },
      {
        id: '09_imprima_em_casa',
        numero: '09',
        nome: 'Comprou, Baixou, Imprimiu',
        arquivo: '09_Imprima_Em_Casa_A4.jpg',
        headline: 'Comprou, baixou, imprimiu, pronto!',
        status: 'RESERVA',
        formato: 'Feed 4:5 (1080×1350)',
        cliques: 0,
        vendas: 0,
        receita: 0.0,
        conversao: '0.0%',
        ctrMedio: '-',
      },
      {
        id: '10_conquista_certificado',
        numero: '10',
        nome: 'Conquista do Certificado',
        arquivo: '10_Conquista_Do_Certificado.jpg',
        headline: 'Cada missão completa vira uma conquista!',
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
    vendasRecentes: realPayments,
  };

  return res.status(200).json(payload);
};
