// Serverless Function para Vercel — Webhook Oficial de Entrega ggCheckout
// Rota gerada na Vercel: /api/webhook-entrega

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Apenas aceita requisições POST do ggCheckout
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const payload = req.body || {};
    const event = payload.event || payload.type || 'unknown';
    
    console.log(`[ggCheckout Webhook] Recebido evento: ${event}`);

    // Dados do comprador enviados pelo ggCheckout
    const customer = payload.customer || payload.buyer || {};
    const customerEmail = customer.email || payload.email;
    const customerName = customer.name || payload.name || 'Herói da Matemática';

    // Dispara apenas quando o pagamento for aprovado (PIX ou Cartão)
    if (event === 'pix.paid' || event === 'card.paid' || event === 'paid' || payload.status === 'paid') {
      
      console.log(`[ggCheckout Webhook] Pagamento confirmado para: ${customerEmail} (${customerName})`);

      // Links oficiais de entrega
      const downloadPdfUrl = 'https://xavier2bit.github.io/missao-tabuada/Missao_Tabuada_Volume_1.pdf';
      const webappUrl = 'https://xavier2bit.github.io/missao-tabuada/index.html';

      // 1. Opcional: Integração com Resend (Open-Source / 3.000 emails grátis/mês)
      const RESEND_API_KEY = process.env.RESEND_API_KEY;

      if (RESEND_API_KEY && customerEmail) {
        // Carrega o template HTML
        let htmlTemplate = '';
        try {
          const templatePath = path.join(process.cwd(), 'email', 'email-boas-vindas.html');
          htmlTemplate = fs.readFileSync(templatePath, 'utf8');
        } catch (e) {
          htmlTemplate = `<p>Olá, ${customerName}! Seu material está disponível: <a href="${downloadPdfUrl}">Baixar PDF</a></p>`;
        }

        // Substitui variáveis do template
        const populatedHtml = htmlTemplate
          .replace(/{{nome}}/g, customerName)
          .replace(/{{link_download_pdf}}/g, downloadPdfUrl)
          .replace(/{{link_webapp}}/g, webappUrl);

        // Disparo via API do Resend (sem dependências externas pesadas)
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.SENDER_EMAIL || 'Heróis da Multiplicação <acesso@seudominio.com>',
            to: [customerEmail],
            subject: '🎉 Acesso Liberado: Liga dos Heróis da Matemática!',
            html: populatedHtml
          })
        });

        const emailResult = await emailResponse.json();
        console.log('[ggCheckout Webhook] Resend disparado:', emailResult);
      } else {
        console.log('[ggCheckout Webhook] RESEND_API_KEY não configurada. Entrega padrão delegada ao ggCheckout.');
      }

      return res.status(200).json({
        success: true,
        message: 'Entrega processada com sucesso!',
        recipient: customerEmail
      });
    }

    // Se for outro evento (ex: abandono, pix gerado), retorna 200 para liberar o webhook
    return res.status(200).json({
      received: true,
      event: event
    });

  } catch (error) {
    console.error('[ggCheckout Webhook Error]:', error);
    // Retorna 200 com flag de erro para evitar retentativas agressivas da plataforma se houver erro interno
    return res.status(500).json({ error: error.message });
  }
}
