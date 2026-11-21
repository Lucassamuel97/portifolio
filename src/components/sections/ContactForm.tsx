'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { contactService } from '@/firebase/services';
import { CONTACT_LIMITS, CONTACT_MIN_MESSAGE_LENGTH } from '@/lib/contact';
import { validateEmail } from '@/lib/utils';
import type { WindowWithGtag } from '@/types';

type Campo = 'name' | 'email' | 'subject' | 'message';
type Erros = Partial<Record<Campo, string>>;

const VAZIO = { name: '', email: '', subject: '', message: '' };

function validar(dados: typeof VAZIO): Erros {
  const erros: Erros = {};
  if (!dados.name.trim()) erros.name = 'Informe seu nome.';
  if (!dados.email.trim()) erros.email = 'Informe seu e-mail.';
  else if (!validateEmail(dados.email.trim())) erros.email = 'Confira o e-mail: falta algo como nome@dominio.com.';
  if (!dados.subject.trim()) erros.subject = 'Informe o assunto.';
  if (dados.message.trim().length < CONTACT_MIN_MESSAGE_LENGTH)
    erros.message = `Escreva pelo menos ${CONTACT_MIN_MESSAGE_LENGTH} caracteres.`;
  return erros;
}

export function ContactForm() {
  const [dados, setDados] = useState(VAZIO);
  const [erros, setErros] = useState<Erros>({});
  // Honeypot anti-spam: campo invisível que só robôs preenchem
  const [honeypot, setHoneypot] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState<{ tipo: 'ok' | 'erro'; texto: string } | null>(null);
  const form = useRef<HTMLFormElement>(null);

  const mudar = (campo: Campo, valor: string) => {
    setDados((d) => ({ ...d, [campo]: valor }));
    if (erros[campo]) setErros((e) => ({ ...e, [campo]: undefined }));
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const encontrados = validar(dados);
    setErros(encontrados);
    const primeiro = (Object.keys(encontrados) as Campo[])[0];
    if (primeiro) {
      setStatus(null);
      form.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }

    const payload = {
      name: dados.name.trim(),
      email: dados.email.trim(),
      subject: dados.subject.trim(),
      message: dados.message.trim(),
    };
    setEnviando(true);
    setStatus(null);
    try {
      const resposta = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, website: honeypot }),
      });
      const resultado: { success?: boolean; error?: string } = await resposta.json().catch(() => ({}));

      // Backup no Firestore (não bloqueia e não interfere no resultado do envio)
      if (!honeypot) void contactService.submitMessage({ ...payload, userAgent: navigator.userAgent, ipAddress: '' });

      if (resposta.ok && resultado.success) {
        setStatus({ tipo: 'ok', texto: 'Mensagem enviada. Respondo em até 24 horas.' });
        setDados(VAZIO);
        (window as WindowWithGtag).gtag?.('event', 'form_submit', { event_category: 'Contact', event_label: 'Contact Form', value: 1 });
      } else {
        setStatus({
          tipo: 'erro',
          texto: `${resultado.error ? `${resultado.error} ` : ''}Tente novamente ou envie um e-mail diretamente.`,
        });
      }
    } catch {
      setStatus({ tipo: 'erro', texto: 'Não foi possível enviar agora. Tente novamente ou envie um e-mail diretamente.' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form ref={form} onSubmit={enviar} noValidate className="relative grid content-start gap-4">
      <Input id="contato-nome" name="name" label="Nome" autoComplete="name" maxLength={CONTACT_LIMITS.name} value={dados.name} onChange={(e) => mudar('name', e.target.value)} error={erros.name} disabled={enviando} required />
      <Input id="contato-email" name="email" type="email" label="E-mail" autoComplete="email" maxLength={CONTACT_LIMITS.email} value={dados.email} onChange={(e) => mudar('email', e.target.value)} error={erros.email} disabled={enviando} required />
      <Input id="contato-assunto" name="subject" label="Assunto" maxLength={CONTACT_LIMITS.subject} value={dados.subject} onChange={(e) => mudar('subject', e.target.value)} error={erros.subject} disabled={enviando} required />
      <Textarea id="contato-mensagem" name="message" label="Mensagem" rows={6} maxLength={CONTACT_LIMITS.message} value={dados.message} onChange={(e) => mudar('message', e.target.value)} error={erros.message} disabled={enviando} required />

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contato-website">Website</label>
        <input id="contato-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <Button type="submit" fullWidth loading={enviando}>
        {enviando ? 'Enviando...' : 'Enviar mensagem'}
      </Button>
      <p role="status" className={status ? (status.tipo === 'ok' ? 'border-l-[3px] border-revisao bg-papel px-4 py-3 text-pequeno' : 'text-pequeno font-semibold text-revisao') : 'min-h-[1.5em]'}>
        {status?.texto}
      </p>
    </form>
  );
}
