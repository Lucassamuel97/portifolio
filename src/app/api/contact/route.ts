import { NextResponse } from 'next/server';
import { personalInfo } from '@/lib/data';
import { CONTACT_LIMITS, CONTACT_MIN_MESSAGE_LENGTH } from '@/lib/contact';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limit simples em memória: no máximo 5 envios por IP a cada 10 minutos.
// Em serverless é "melhor esforço" (cada instância tem sua memória), mas já barra abuso básico.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const hitsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (hitsByIp.size > 1000) {
    for (const [key, hits] of hitsByIp) {
      if (hits.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) hitsByIp.delete(key);
    }
  }

  const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hitsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Requisição inválida.' }, { status: 400 });
  }

  // Honeypot: campo invisível que só robôs preenchem. Finge sucesso e descarta.
  if (asText(body.website) !== '') {
    return NextResponse.json({ success: true });
  }

  const name = singleLine(asText(body.name));
  const email = asText(body.email);
  const subject = singleLine(asText(body.subject));
  const message = asText(body.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ success: false, error: 'Preencha todos os campos.' }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, error: 'Email inválido.' }, { status: 400 });
  }
  if (message.length < CONTACT_MIN_MESSAGE_LENGTH) {
    return NextResponse.json(
      { success: false, error: `A mensagem deve ter pelo menos ${CONTACT_MIN_MESSAGE_LENGTH} caracteres.` },
      { status: 400 }
    );
  }
  if (
    name.length > CONTACT_LIMITS.name ||
    email.length > CONTACT_LIMITS.email ||
    subject.length > CONTACT_LIMITS.subject ||
    message.length > CONTACT_LIMITS.message
  ) {
    return NextResponse.json({ success: false, error: 'Algum campo excede o tamanho máximo.' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Muitas mensagens em pouco tempo. Tente novamente em alguns minutos.' },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY não definida. Configure-a no .env.local / Vercel.');
    return NextResponse.json(
      { success: false, error: 'Envio de email não configurado.' },
      { status: 500 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || personalInfo.email;
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfólio <onboarding@resend.dev>';
  const sentAt = new Date().toLocaleString('pt-BR', { timeZone: personalInfo.timezone });

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#111">
      <h2 style="margin:0 0 16px">Nova mensagem pelo portfólio</h2>
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px">
        <tr><td style="padding:6px 0;width:90px;color:#555"><strong>Nome</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#555"><strong>Assunto</strong></td><td>${escapeHtml(subject)}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><strong>Data</strong></td><td>${escapeHtml(sentAt)}</td></tr>
      </table>
      <div style="padding:16px;background:#f4f4f5;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</div>
      <p style="margin-top:16px;font-size:12px;color:#777">Responda este email para falar direto com ${escapeHtml(name)}.</p>
    </div>`;

  const text = [
    'Nova mensagem pelo portfólio',
    '',
    `Nome: ${name}`,
    `Email: ${email}`,
    `Assunto: ${subject}`,
    `Data: ${sentAt}`,
    '',
    message,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Portfólio] ${subject}`,
        html,
        text,
      }),
    });

    if (!response.ok) {
      console.error('[contact] Resend respondeu', response.status, await response.text());
      return NextResponse.json(
        { success: false, error: 'Não foi possível enviar o email agora.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[contact] Falha ao chamar o Resend:', error);
    return NextResponse.json(
      { success: false, error: 'Não foi possível enviar o email agora.' },
      { status: 502 }
    );
  }
}
