import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { personalInfo } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

// Imagem de compartilhamento (LinkedIn, WhatsApp, X...) gerada no build, na identidade "Prancha técnica".
// O Next adiciona automaticamente as meta tags og:image correspondentes.
export const alt = `${personalInfo.name} - ${personalInfo.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPEL = '#eef0eb';
const TINTA = '#16233f';
const TINTA_2 = '#47536a';
const TINTA_3 = '#5e6779';
const REVISAO = '#c93a1b';

export default async function OpengraphImage() {
  const [foto, archivo400, archivo800] = await Promise.all([
    readFile(join(process.cwd(), 'public', personalInfo.avatar.replace(/^\//, ''))),
    readFile(join(process.cwd(), 'src/assets/fonts/archivo-latin-400-normal.woff')),
    readFile(join(process.cwd(), 'src/assets/fonts/archivo-latin-800-normal.woff')),
  ]);
  const fotoSrc = `data:image/jpeg;base64,${foto.toString('base64')}`;
  const dominio = new URL(SITE_URL).host;

  const celula = (rotulo: string, valor: string, sinal = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '14px 20px', borderRight: `2px solid ${TINTA}` }}>
      <div style={{ display: 'flex', fontSize: 17, color: TINTA_3 }}>{rotulo}</div>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 23, fontWeight: 800, marginTop: 4 }}>
        {sinal && <div style={{ display: 'flex', width: 12, height: 12, backgroundColor: REVISAO, marginRight: 10 }} />}
        {valor}
      </div>
    </div>
  );

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', padding: 40, backgroundColor: PAPEL, fontFamily: 'Archivo', color: TINTA }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', border: `2px solid ${TINTA}` }}>
          <div style={{ display: 'flex', flex: 1, padding: '40px 44px 32px', gap: 44 }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', fontSize: 24, color: TINTA_2 }}>
                {personalInfo.name}, desenvolvedor full-stack
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: 62, fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.03em' }}>
                {['Sistemas que', 'modernizam e', 'automatizam a', 'gestão pública.'].map((linha) => (
                  <div key={linha} style={{ display: 'flex' }}>
                    {linha}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', fontSize: 24, fontWeight: 800, color: REVISAO }}>{dominio}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
              <img src={fotoSrc} alt="" width={250} height={250} style={{ border: `2px solid ${TINTA}` }} />
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: `2px solid ${TINTA}` }}>
            {celula('Atuação', 'Desenvolvedor full-stack')}
            {celula('Especialidade', 'Sistemas de gestão pública')}
            {celula('Em formação', 'MBA em Eng. de Software com IA')}
            <div style={{ display: 'flex', flexDirection: 'column', padding: '14px 20px' }}>
              <div style={{ display: 'flex', fontSize: 17, color: TINTA_3 }}>Desde</div>
              <div style={{ display: 'flex', fontSize: 23, fontWeight: 800, marginTop: 4 }}>2018</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Archivo', data: archivo400, weight: 400, style: 'normal' },
        { name: 'Archivo', data: archivo800, weight: 800, style: 'normal' },
      ],
    }
  );
}
