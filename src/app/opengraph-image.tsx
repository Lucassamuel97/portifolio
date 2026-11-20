import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { personalInfo } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

// Imagem de compartilhamento (LinkedIn, WhatsApp, X...) gerada no build.
// O Next adiciona automaticamente as meta tags og:image correspondentes.
export const alt = `${personalInfo.name} - ${personalInfo.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const GREEN = '#22c55e';

export default async function OpengraphImage() {
  const [avatar, interRegular, interBold] = await Promise.all([
    readFile(join(process.cwd(), 'public/avatar.png')),
    readFile(join(process.cwd(), 'src/assets/fonts/inter-latin-400-normal.woff')),
    readFile(join(process.cwd(), 'src/assets/fonts/inter-latin-700-normal.woff')),
  ]);
  const avatarSrc = `data:image/png;base64,${avatar.toString('base64')}`;
  const domain = new URL(SITE_URL).host;

  // Nome em duas linhas para caber ao lado do avatar ("Lucas Samuel" / "Pereira Godoy")
  const words = personalInfo.name.split(' ');
  const middle = Math.ceil(words.length / 2);
  const nameLines = [words.slice(0, middle).join(' '), words.slice(middle).join(' ')].filter(Boolean);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 80px',
          gap: 64,
          backgroundColor: '#09090b',
          backgroundImage:
            'radial-gradient(circle at 18% 50%, rgba(34,197,94,0.28), rgba(9,9,11,0) 45%), radial-gradient(circle at 100% 0%, rgba(34,197,94,0.12), rgba(9,9,11,0) 40%)',
          fontFamily: 'Inter',
          color: '#fafafa',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 320,
            height: 320,
            flexShrink: 0,
            borderRadius: '50%',
            border: `6px solid ${GREEN}`,
            backgroundColor: '#18181b',
            overflow: 'hidden',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <img src={avatarSrc} alt="" width={300} height={300} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', fontSize: 28, color: GREEN, marginBottom: 12 }}>
            {'</> SamucaDev'}
          </div>
          {nameLines.map((line) => (
            <div key={line} style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
              {line}
            </div>
          ))}
          <div style={{ display: 'flex', fontSize: 38, color: GREEN, marginTop: 16 }}>
            {personalInfo.title}
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#a1a1aa', marginTop: 24, lineHeight: 1.4 }}>
            PHP · Laravel · Java · Spring Boot · React · Next.js
          </div>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              marginTop: 40,
              padding: '10px 24px',
              borderRadius: 999,
              border: '2px solid #3f3f46',
              fontSize: 26,
              color: '#e4e4e7',
            }}
          >
            {domain}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      ],
    }
  );
}
