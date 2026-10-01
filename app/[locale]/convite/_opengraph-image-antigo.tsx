import { ImageResponse } from 'next/og';

// Imagem que aparece quando o link do convite é colado no WhatsApp.
export const runtime = 'edge';
export const alt = 'Convite GT Overlander';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#122E1F',
          padding: '72px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: '#E06226', fontWeight: 700 }}>
          CONVITE · PARCEIROS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 1000 }}>
            Você está convidado a fazer parte do GT Overlander
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#E06226',
              color: '#ffffff',
              fontSize: 30,
              fontWeight: 700,
              padding: '14px 26px',
              borderRadius: 10,
            }}
          >
            Inauguração do Shopping · 9 de outubro
          </div>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 800, letterSpacing: 2 }}>GT OVERLANDER</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
