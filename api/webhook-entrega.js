// Serverless Function para Vercel — Webhook Oficial de Entrega ggCheckout + Meta CAPI
// Rota gerada na Vercel: /api/webhook-entrega

import fs from 'node:fs';
import path from 'node:path';
import { sendMetaCapiEvent } from './_meta-capi.js';

const BASE_SITE_URL = 'https://heroisdamultiplicacao.vercel.app';
const BASIC_DOWNLOAD_URL = `${BASE_SITE_URL}/download`;
const PREMIUM_WEBAPP_URL = `${BASE_SITE_URL}/app?vip=liga27`;

function normalizeAmount(rawValue) {
  if (rawValue === null || rawValue === undefined || rawValue === '') return null;
  if (typeof rawValue === 'string') {
    const trimmed = rawValue.trim();
    if (/^\d+$/.test(trimmed) && Number(trimmed) >= 500) {
      return Number(trimmed) / 100;
    }
    const parsed = parseFloat(trimmed.replace(',', '.'));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  const num = Number(rawValue);
  if (!Number.isFinite(num) || num <= 0) return null;
  // Gateways brasileiros enviam centavos em inteiros altos (ex: 1000 -> R$ 10,00; 2700 -> R$ 27,00)
  if (Number.isInteger(num) && num >= 500) {
    return num / 100;
  }
  return num;
}

function resolvePurchaseDetails(payload) {
  const product = payload.product || payload.offer || {};
  const productName = String(
    product.name || product.title || payload.product_name || payload.offer_name || ''
  ).toLowerCase();

  const rawAmount =
    payload.amount ??
    payload.total ??
    payload.price ??
    payload.value ??
    payload.payment?.amount ??
    payload.payment?.total ??
    product.price;

  const parsedAmount = normalizeAmount(rawAmount);

  const looksBasicByName =
    productName.includes('miss') && !productName.includes('liga') && !productName.includes('combo');
  const looksBasicByPrice = parsedAmount !== null && parsedAmount <= 15;
  const isBasic = looksBasicByPrice || (parsedAmount === null && looksBasicByName);

  return {
    isBasic,
    value: parsedAmount ?? (isBasic ? 10.0 : 27.0),
    contentId: isBasic ? 'tabuada-10' : 'liga-27',
    contentName: isBasic ? 'Missão Tabuada' : 'Liga dos Heróis da Matemática',
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const event = payload.event || payload.type || 'unknown';

    console.log(`[ggCheckout Webhook] Recebido evento: ${event}`);

    const customer = payload.customer || payload.buyer || {};
    const customerEmail = customer.email || payload.email;
    const customerName = customer.name || payload.name || 'Herói da Matemática';
    const customerPhone = customer.phone || customer.whatsapp || payload.phone || payload.whatsapp || '';
    const orderId = String(
      payload.order_id || payload.payment_id || payload.transaction_id || payload.id || ''
    ).trim();

    if (event === 'pix.paid' || event === 'card.paid' || event === 'paid' || payload.status === 'paid') {
      const purchase = resolvePurchaseDetails(payload);
      const purchaseEventId = orderId ? `pur_${orderId}` : `pur_wh_${Date.now()}`;

      console.log(
        `[ggCheckout Webhook] Pagamento confirmado para: ${customerEmail || 'sem-email'} (${customerName}) | Plano=${purchase.contentId} | R$${purchase.value}`
      );

      // 1. Disparo server-side Meta Conversions API (Purchase com dados hasheados + event_id)
      const capiResult = await sendMetaCapiEvent({
        eventName: 'Purchase',
        eventId: purchaseEventId,
        eventSourceUrl: `${BASE_SITE_URL}/obrigado?plan=${purchase.isBasic ? 'basic' : 'premium'}`,
        clientIp: payload.ip || customer.ip || '',
        userAgent: payload.user_agent || customer.user_agent || '',
        fbp: payload.fbp || payload.tracking?.fbp || '',
        fbc: payload.fbc || payload.tracking?.fbc || '',
        fbclid: payload.fbclid || payload.tracking?.fbclid || payload.utm?.fbclid || '',
        email: customerEmail,
        phone: customerPhone,
        fullName: customerName,
        externalId: orderId || customerEmail,
        customData: {
          content_name: purchase.contentName,
          content_ids: [purchase.contentId],
          content_type: 'product',
          value: purchase.value,
          currency: 'BRL',
          order_id: orderId || undefined,
        },
      });

      if (capiResult.skipped) {
        console.log('[ggCheckout Webhook] Meta CAPI ignorado:', capiResult.reason);
      } else {
        console.log('[ggCheckout Webhook] Meta CAPI Purchase enviado:', capiResult);
      }

      // 2. E-mail transacional via Resend diferenciado por plano
      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      let emailStatus = 'skipped_no_key_or_email';

      if (RESEND_API_KEY && customerEmail) {
        let htmlTemplate = '';
        try {
          const templatePath = path.join(process.cwd(), 'email', 'email-boas-vindas.html');
          htmlTemplate = fs.readFileSync(templatePath, 'utf8');
        } catch {
          htmlTemplate = `<p>Olá, ${customerName}! Seu material está disponível: <a href="${BASIC_DOWNLOAD_URL}">Baixar PDF</a></p>`;
        }

        if (purchase.isBasic) {
          htmlTemplate = htmlTemplate.replace(
            /<!-- COMBO_ONLY_START -->[\s\S]*?<!-- COMBO_ONLY_END -->/g,
            ''
          );
        } else {
          htmlTemplate = htmlTemplate
            .replace(/<!-- COMBO_ONLY_START -->/g, '')
            .replace(/<!-- COMBO_ONLY_END -->/g, '');
        }

        const populatedHtml = htmlTemplate
          .replace(/{{nome}}/g, customerName)
          .replace(/{{link_download_pdf}}/g, BASIC_DOWNLOAD_URL)
          .replace(/{{link_webapp}}/g, PREMIUM_WEBAPP_URL);

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.SENDER_EMAIL || 'Heróis da Multiplicação <acesso@seudominio.com>',
            to: [customerEmail],
            subject: purchase.isBasic
              ? '🎉 Acesso Liberado: Missão Tabuada (Volume 1)!'
              : '🎉 Acesso Liberado: Liga dos Heróis da Matemática!',
            html: populatedHtml,
          }),
        });

        const emailResult = await emailResponse.json().catch(() => ({}));
        emailStatus = emailResponse.ok ? 'sent' : 'failed';
        console.log('[ggCheckout Webhook] Resend disparado:', emailResult);
      } else {
        console.log('[ggCheckout Webhook] RESEND_API_KEY não configurada ou sem e-mail. Entrega delegada à GGCheckout.');
      }

      return res.status(200).json({
        success: true,
        message: 'Entrega e rastreamento processados com sucesso!',
        recipient: customerEmail || null,
        plan: purchase.contentId,
        capi: capiResult.skipped ? capiResult.reason : capiResult.ok,
        email: emailStatus,
      });
    }

    return res.status(200).json({
      received: true,
      event,
    });
  } catch (error) {
    console.error('[ggCheckout Webhook Error]:', error);
    return res.status(500).json({ error: error.message });
  }
}
