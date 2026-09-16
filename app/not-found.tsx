import Link from 'next/link';

/**
 * 404 de último recurso, fora do segmento [locale].
 *
 * O middleware de i18n não roda em /studio, /api nem em caminhos com extensão,
 * então essas URLs nunca chegam no layout do locale e caem aqui. Como o layout
 * raiz é só um pass-through, essa página precisa montar o próprio <html>.
 *
 * A 404 que o visitante normal vê é a de app/[locale]/not-found.tsx.
 */
export default function RootNotFound() {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          backgroundColor: '#f8f5ee',
          color: '#122e1f',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <p style={{ fontSize: '3rem', margin: 0, color: '#b84916' }}>404</p>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
          Essa estrada não existe no mapa
        </h1>
        <p style={{ margin: 0, maxWidth: '28rem', lineHeight: 1.6 }}>
          A página que você procurou saiu do ar ou mudou de endereço.
        </p>
        <Link
          href="/"
          style={{
            marginTop: '0.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            backgroundColor: '#c04d18',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Voltar pro início
        </Link>
      </body>
    </html>
  );
}
