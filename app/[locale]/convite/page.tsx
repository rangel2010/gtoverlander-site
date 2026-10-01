import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BUSINESS_SIGNUP_URL } from '@/lib/product-config';
import { getStats } from '@/lib/stats';
import { Fase, Contagem } from '@/components/convite/fase';

/**
 * /convite — deck de convite pra parceiros (lojas, guias, donos de ponto).
 * Criado em 30/09/2026 a pedido do Rangel; reorganizado em 01/10 depois da
 * revisão dele:
 *  - uma cor só de fundo (verde GT), laranja apenas como destaque — "estava um
 *    carnaval de cores";
 *  - o app não é o assunto: só "a nova versão já está no ar" + quase 10 mil
 *    viajantes + links das lojas + 2 prints;
 *  - a história é o ECOSSISTEMA: viajantes já trocam rotas e pontos entre si, e
 *    a peça que faltava são as empresas;
 *  - os prints do painel do parceiro são a estrela dos slides do parceiro.
 *
 * Página SÓ POR LINK: fora do menu, fora do sitemap e com noindex. Cobre o
 * cabeçalho e o rodapé do site (camada fixa em tela cheia). Pensada primeiro
 * pro celular — o link circula por WhatsApp.
 *
 * Só português. O site manda o visitante pro idioma do navegador na primeira
 * visita, então /en/convite e /es/convite também respondem — com o mesmo texto em
 * português — pra um parceiro de navegador em espanhol não cair num 404.
 *
 * PRINTS: ficam em public/convite/ e são listados em PRINTS abaixo (lista
 * escrita à mão de propósito: na Vercel a página é refeita fora da pasta public,
 * então "olhar se o arquivo existe" não funciona). Print fora da lista = slide
 * sem imagem — nada quebra.
 */

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: 'Convite GT Overlander · Seja parceiro' },
  description:
    'Você está convidado a fazer parte do GT Overlander. Inauguração do Shopping: sexta, 9 de outubro.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Você está convidado a fazer parte do GT Overlander',
    description: 'Pousadas, campings, lojas, guias e oficinas: inauguração do Shopping em 9 de outubro.',
    type: 'website',
    // Endereço direto da imagem: o gerado automaticamente leva /pt/ e passa por
    // um redirecionamento antes de chegar nela.
    images: [{ url: 'https://www.gtoverlander.com.br/convite/opengraph-image', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.gtoverlander.com.br/convite' },
};

const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.overlander';
const APP_STORE = 'https://apps.apple.com/br/app/gt-overlander/id6745626026';
const CTA_URL = `${BUSINESS_SIGNUP_URL}?utm_source=convite`;
const TOTAL = 8;
const LARANJA = '#E06226';

/** Prints já colocados em public/convite/ (nome → arquivo). */
const PRINTS: Record<string, string> = {
  // '01-app-inicio': '01-app-inicio.png',
  // '02-app-roteiro': '02-app-roteiro.png',
  // '05-shopping': '05-shopping.png',
  // '07-painel-parceiro': '07-painel-parceiro.png',
  // '08-metricas': '08-metricas.png',
};

/** Caminho público do print, ou null se ele ainda não foi colocado. */
function print(nome: string): string | null {
  return PRINTS[nome] ? `/convite/${PRINTS[nome]}` : null;
}

function Slide({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <section className="bg-[#122E1F] snap-start min-h-[100dvh] relative flex items-center border-b border-white/5">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24">{children}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-gt-contorno.svg" alt="GT Overlander" className="absolute top-4 left-6 md:left-12 h-9 md:h-10 w-auto" />
      <div className="absolute top-6 right-6 md:right-12 text-xs text-white/50 font-sans tabular-nums">
        {String(n).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
      </div>
      {n < TOTAL && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-sans animate-bounce" aria-hidden>
          ↓
        </div>
      )}
    </section>
  );
}

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs uppercase tracking-[0.2em] mb-5 font-sans" style={{ color: LARANJA }}>
    {children}
  </p>
);

const Titulo = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display uppercase text-white text-4xl md:text-6xl leading-[1.2] md:leading-[1.2] mb-6 max-w-4xl">
    {children}
  </h2>
);

const Apoio = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-white/75 text-lg md:text-xl leading-relaxed max-w-2xl">{children}</p>
);

/** Print de celular (em pé). */
function Celular({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-[28px] border-4 border-white/15 bg-black overflow-hidden shadow-2xl w-[150px] md:w-[230px] shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

/** Print de tela de computador (painel do parceiro). */
function Tela({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-lg border border-white/15 bg-black overflow-hidden shadow-2xl w-full">
      <div className="flex gap-1.5 px-3 py-2 bg-white/10" aria-hidden>
        <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

/** Texto à esquerda e imagem à direita no computador; empilhados no celular. */
function ComImagem({ texto, imagem }: { texto: React.ReactNode; imagem: React.ReactNode | null }) {
  if (!imagem) return <>{texto}</>;
  return (
    <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-center">
      <div>{texto}</div>
      <div>{imagem}</div>
    </div>
  );
}

export default async function ConvitePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const stats = await getStats();

  // "Quase 10 mil" enquanto não chega lá; depois, "mais de N mil". Vem do servidor.
  const mil = Math.floor(stats.usuarios / 1000);
  const viajantes =
    stats.usuarios < 10_000 && stats.usuarios >= 9_000 ? 'Quase 10 mil' : `Mais de ${mil} mil`;

  const pInicio = print('01-app-inicio');
  const pRotas = print('02-app-roteiro');
  const pPainel = print('07-painel-parceiro');
  const pMetricas = print('08-metricas');
  const pShopping = print('05-shopping');

  const frentes = [
    { tag: 'Seu ponto no mapa', desc: 'Assuma o seu estabelecimento e apresente com as suas fotos, o seu contato, os seus horários e tudo o que você oferece.' },
    { tag: 'Seus produtos', desc: 'Mostre seus produtos no Shopping, com o caminho direto pra sua loja ou pro seu WhatsApp.' },
    { tag: 'Seus serviços', desc: 'Guia, expedição, aluguel de equipamento. Divulgue suas saídas pra quem está planejando a viagem.' },
  ];

  const porque = [
    { t: 'Controle', d: 'Você decide como o seu negócio aparece.' },
    { t: 'Alcance', d: 'Quem te vê já decidiu viajar pela sua região.' },
    { t: 'Métricas', d: 'Rotas que passam perto de você, aparições no mapa, pessoas que visitaram o seu perfil.' },
  ];

  return (
    // Camada em tela cheia por cima do cabeçalho e do rodapé do site (z-40),
    // abaixo do aviso de cookies (z-50). Rolagem própria, um slide por vez.
    <div className="dark fixed inset-0 z-[45] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#122E1F] text-white">
      {/* 1 · O convite */}
      <Slide n={1}>
        <Kicker>Convite · Parceiros GT Overlander</Kicker>
        <h1 className="font-display uppercase text-white text-5xl md:text-7xl leading-[1.15] md:leading-[1.15] mb-8 max-w-4xl">
          Você está convidado a fazer parte do <span style={{ color: LARANJA }}>GT Overlander</span>
        </h1>
        <Apoio>
          Pousadas, campings, lojas, guias e oficinas: estamos abrindo espaço para os parceiros que fazem a estrada
          acontecer.
        </Apoio>
      </Slide>

      {/* 2 · O app — curto: versão nova no ar, comunidade, lojas */}
      <Slide n={2}>
        <ComImagem
          texto={
            <>
              <Kicker>O app</Kicker>
              <Titulo>A nova versão do GT Overlander já está no ar</Titulo>
              <ul className="space-y-3 mb-8">
                {[
                  'Muito mais recursos pra planejar a viagem',
                  'Viajantes compartilhando rotas e pontos entre si',
                  'Uma IA muito mais inteligente montando os roteiros',
                ].map((i) => (
                  <li key={i} className="font-sans text-white/80 text-lg leading-relaxed flex gap-3">
                    <span style={{ color: LARANJA }}>—</span>
                    {i}
                  </li>
                ))}
              </ul>
              <p className="font-display uppercase text-3xl md:text-4xl text-white mb-1">{viajantes}</p>
              <p className="font-sans text-white/60 mb-8">de viajantes já usam o app</p>
              <div className="flex flex-wrap gap-3">
                <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="border border-white/30 hover:bg-white/10 rounded-md px-5 py-3 font-sans text-sm">
                  Conhecer na Google Play
                </a>
                <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="border border-white/30 hover:bg-white/10 rounded-md px-5 py-3 font-sans text-sm">
                  Conhecer na App Store
                </a>
              </div>
            </>
          }
          imagem={
            pInicio || pRotas ? (
              <div className="flex gap-4 md:gap-6 justify-center">
                {pInicio && <Celular src={pInicio} alt="Tela inicial do app GT Overlander" />}
                {pRotas && <Celular src={pRotas} alt="Rotas no app GT Overlander" />}
              </div>
            ) : null
          }
        />
      </Slide>

      {/* 3 · O ecossistema — a peça que faltava são as empresas */}
      <Slide n={3}>
        <Kicker>O ecossistema</Kicker>
        <Titulo>
          A peça que faltava é <span style={{ color: LARANJA }}>você</span>
        </Titulo>
        <Apoio>
          O GT Overlander é um ecossistema: viajantes trocam rotas, pontos e experiências entre si, todos os dias. O que
          faltava pra fechar esse círculo são as empresas que recebem quem está na estrada.
        </Apoio>
      </Slide>

      {/* 4 · O que o parceiro faz — com o painel */}
      <Slide n={4}>
        <ComImagem
          texto={
            <>
              <Kicker>O que você faz no GT</Kicker>
              <Titulo>Seu negócio, do seu jeito, no mapa de quem viaja</Titulo>
              <div className="space-y-5 mt-6">
                {frentes.map((f) => (
                  <div key={f.tag} className="border-l-2 border-white/15 pl-5">
                    <p className="text-xs uppercase tracking-wider font-sans font-medium mb-1" style={{ color: LARANJA }}>
                      {f.tag}
                    </p>
                    <p className="font-sans text-white/80 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </>
          }
          imagem={pPainel ? <Tela src={pPainel} alt="Painel do parceiro GT Overlander" /> : null}
        />
      </Slide>

      {/* 5 · Por que estar com a gente — com as métricas */}
      <Slide n={5}>
        <ComImagem
          texto={
            <>
              <Kicker>Por que estar com a gente</Kicker>
              <Titulo>Quem conhece o seu negócio é você</Titulo>
              <div className="space-y-5 mt-6">
                {porque.map((p) => (
                  <div key={p.t} className="border-l-2 border-white/15 pl-5">
                    <p className="font-display uppercase text-2xl text-white leading-tight">{p.t}</p>
                    <p className="font-sans text-white/75 leading-relaxed mt-1">{p.d}</p>
                  </div>
                ))}
              </div>
            </>
          }
          imagem={pMetricas ? <Tela src={pMetricas} alt="Métricas do parceiro GT Overlander" /> : null}
        />
      </Slide>

      {/* 6 · O Shopping */}
      <Slide n={6}>
        <ComImagem
          texto={
            <>
              <Kicker>O Shopping</Kicker>
              <Titulo>Tudo o que a estrada pede, num só lugar</Titulo>
              <Apoio>
                Produtos de lojas e usados de viajantes, guias e aluguel de equipamento, organizados por categoria,
                dentro do app que o overlander já usa pra planejar a viagem.
              </Apoio>
              <p className="mt-8 font-sans font-semibold text-lg" style={{ color: LARANJA }}>
                <Fase
                  antes="Quem cadastrar até 9 de outubro já entra na vitrine da inauguração."
                  depois="O Shopping está aberto. Sua vitrine pode estar lá hoje."
                />
              </p>
            </>
          }
          imagem={pShopping ? <div className="flex justify-center"><Celular src={pShopping} alt="Shopping no app GT Overlander" /></div> : null}
        />
      </Slide>

      {/* 7 · A data */}
      <Slide n={7}>
        <Fase
          antes={
            <>
              <Kicker>Inauguração</Kicker>
              <Titulo>Sexta, 9 de outubro. O Shopping abre as portas.</Titulo>
              <div className="mt-10">
                <Contagem />
              </div>
            </>
          }
          depois={
            <>
              <Kicker>Inaugurado em 9 de outubro</Kicker>
              <Titulo>O Shopping está aberto.</Titulo>
              <Apoio>E a vitrine continua recebendo parceiros todos os dias.</Apoio>
            </>
          }
        />
      </Slide>

      {/* 8 · A chamada — o único botão laranja do deck */}
      <Slide n={8}>
        <div className="text-center flex flex-col items-center">
          <Kicker>Parceiros</Kicker>
          <Fase
            antes={<Titulo>Garanta o seu lugar na inauguração</Titulo>}
            depois={<Titulo>Pronto pra assumir o seu lugar no mapa?</Titulo>}
          />
          <a
            href={CTA_URL}
            className="mt-4 inline-flex items-center justify-center text-white font-sans font-semibold text-lg px-8 py-4 rounded-md hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#c04d18' }}
          >
            Entrar na aba de parceiros →
          </a>
          <p className="font-sans text-white/50 text-sm mt-8">
            Dúvidas:{' '}
            <a href="mailto:business@gtoverlander.com.br" className="hover:underline" style={{ color: LARANJA }}>
              business@gtoverlander.com.br
            </a>
          </p>
        </div>
      </Slide>
    </div>
  );
}
