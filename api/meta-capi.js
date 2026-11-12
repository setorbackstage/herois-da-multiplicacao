// Serverless Function Vercel — Meta Conversions API (Browser <-> Server Deduplication)
// Rota: POST /api/meta-capi

import {
  extractClientIp,
  isAllowedMetaEvent,
  parseCookies,
  sendMetaCapiEvent,
} from './_meta-capi.js';

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = parseBody(req);
    const eventName = body.eventName || body.event_name;

    if (!isAllowedMetaEvent(eventName)) {
      return res.status(400).json({ error: 'Unsupported eventName' });
    }

    const cookies = parseCookies(req.headers.cookie);
    const eventSourceUrl = body.eventSourceUrl || req.headers.referer || 'https://heroisdamultiplicacao.vercel.app/';

    const result = await sendMetaCapiEvent({
      eventName,
      eventId: body.eventId || body.event_id,
      eventSourceUrl,
      clientIp: extractClientIp(req),
      userAgent: req.headers['user-agent'] || '',
      fbp: body.fbp || cookies._fbp || '',
      fbc: body.fbc || cookies._fbc || '',
      fbclid: body.fbclid || '',
      customData: body.customData || body.custom_data,
    });

    return res.status(200).json({
      success: Boolean(result.ok),
      skipped: Boolean(result.skipped),
      reason: result.reason || undefined,
      events_received: result.data?.events_received,
    });
  } catch (error) {
    console.error('[api/meta-capi Error]:', error);
    return res.status(500).json({ error: 'Internal CAPI proxy error' });
  }
}
