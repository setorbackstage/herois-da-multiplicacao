import crypto from 'node:crypto';

const DEFAULT_PIXEL_ID = '2683241518773685';
const META_GRAPH_VERSION = 'v21.0';
const ALLOWED_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'InitiateCheckout',
  'Purchase',
]);

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function normalizeEmail(email) {
  const clean = normalizeText(email);
  return clean && clean.includes('@') ? clean : '';
}

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D+/g, '');
  if (!digits) return '';
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  return digits;
}

function splitName(fullName) {
  const parts = normalizeText(fullName)
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return { fn: '', ln: '' };
  if (parts.length === 1) return { fn: parts[0], ln: '' };
  return { fn: parts[0], ln: parts[parts.length - 1] };
}

export function extractClientIp(req) {
  const forwarded = req?.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req?.headers?.['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }
  return req?.socket?.remoteAddress || '';
}

export function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader || typeof cookieHeader !== 'string') return cookies;
  cookieHeader.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx <= 0) return;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    if (key) {
      try {
        cookies[key] = decodeURIComponent(val);
      } catch {
        cookies[key] = val;
      }
    }
  });
  return cookies;
}

function sanitizeCustomData(customData = {}) {
  if (!customData || typeof customData !== 'object') return undefined;
  const out = {};
  if (typeof customData.content_name === 'string' && customData.content_name.trim()) {
    out.content_name = customData.content_name.trim().slice(0, 200);
  }
  if (typeof customData.content_category === 'string' && customData.content_category.trim()) {
    out.content_category = customData.content_category.trim().slice(0, 120);
  }
  if (typeof customData.content_type === 'string' && customData.content_type.trim()) {
    out.content_type = customData.content_type.trim().slice(0, 60);
  }
  if (Array.isArray(customData.content_ids) && customData.content_ids.length > 0) {
    out.content_ids = customData.content_ids
      .map((id) => String(id).trim())
      .filter(Boolean)
      .slice(0, 20);
  }
  if (typeof customData.order_id === 'string' && customData.order_id.trim()) {
    out.order_id = customData.order_id.trim().slice(0, 120);
  }
  const numVal = Number(customData.value);
  if (Number.isFinite(numVal) && numVal > 0) {
    out.value = Number(numVal.toFixed(2));
    out.currency =
      typeof customData.currency === 'string' && /^[A-Z]{3}$/.test(customData.currency)
        ? customData.currency
        : 'BRL';
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export function isAllowedMetaEvent(eventName) {
  return ALLOWED_EVENTS.has(eventName);
}

/**
 * Envia um evento para a Meta Conversions API com suporte à desduplicação via event_id.
 * Requer variável de ambiente META_CAPI_TOKEN configurada na Vercel.
 */
export async function sendMetaCapiEvent({
  eventName,
  eventId,
  eventSourceUrl,
  clientIp,
  userAgent,
  fbp,
  fbc,
  fbclid,
  email,
  phone,
  fullName,
  externalId,
  customData,
}) {
  if (!isAllowedMetaEvent(eventName)) {
    return { ok: false, skipped: true, reason: `UNSUPPORTED_EVENT:${eventName}` };
  }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    return { ok: true, skipped: true, reason: 'META_CAPI_TOKEN_NOT_CONFIGURED' };
  }

  const pixelId = process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
  const userData = {};

  if (clientIp) userData.client_ip_address = String(clientIp).trim();
  if (userAgent) userData.client_user_agent = String(userAgent).trim();
  if (fbp) userData.fbp = String(fbp).trim();

  if (fbc) {
    userData.fbc = String(fbc).trim();
  } else if (fbclid) {
    userData.fbc = `fb.1.${Date.now()}.${String(fbclid).trim()}`;
  }

  const cleanEmail = normalizeEmail(email);
  if (cleanEmail) userData.em = [sha256(cleanEmail)];

  const cleanPhone = normalizePhone(phone);
  if (cleanPhone) userData.ph = [sha256(cleanPhone)];

  const { fn, ln } = splitName(fullName);
  if (fn) userData.fn = [sha256(fn)];
  if (ln) userData.ln = [sha256(ln)];

  if (cleanEmail || cleanPhone) {
    userData.country = [sha256('br')];
  }

  if (externalId) {
    userData.external_id = [sha256(normalizeText(externalId))];
  }

  const eventPayload = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    user_data: userData,
  };

  if (eventId) {
    eventPayload.event_id = String(eventId).trim().slice(0, 120);
  }
  if (eventSourceUrl && /^https?:\/\//i.test(String(eventSourceUrl))) {
    eventPayload.event_source_url = String(eventSourceUrl).slice(0, 500);
  }

  const cleanCustomData = sanitizeCustomData(customData);
  if (cleanCustomData) {
    eventPayload.custom_data = cleanCustomData;
  }

  const body = {
    data: [eventPayload],
  };

  if (process.env.META_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_TEST_EVENT_CODE.trim();
  }

  const endpoint = `https://graph.facebook.com/${META_GRAPH_VERSION}/${encodeURIComponent(
    pixelId
  )}/events?access_token=${encodeURIComponent(token)}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error('[Meta CAPI Error]', response.status, data);
    return { ok: false, status: response.status, data };
  }

  return { ok: true, status: response.status, data };
}
