import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BUSINESS_SIGNUP_URL } from '@/lib/product-config';
import { getStats, porExtenso } from '@/lib/stats';
import { Fase, Contagem } from '@/components/convite/fase';

/**
 * /convite — deck de convite pra parceiros (lojas, guias, donos de ponto).
 * Criado em 30/09/2026 a pedido do Rangel.
 *
 * Página SÓ POR LINK: fora do menu, fora do sitemap e com noindex. Ela cobre o
 * cabeçalho e o rodapé do site (camada fixa em tela cheia) pra parecer uma
 * apresentação, não uma página de site. Pensada primeiro pro celular — o link
 * circula por WhatsApp.
 *
 * Só português. O site manda o visitante pro idioma do navegador na primeira
 * visita, então /en/convite e /es/convite também respondem — com o mesmo texto em
 * português — pra um parceiro de navegador em espanhol não cair num 404.
 * Textos escolhidos por ele, slide a slide (ver o documento do site no projeto).
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
const TOTAL = 7;

function Slide({
  n,
  tom = 'verde',
  children,
}: {
  n: number;
  tom?: 'verde' | 'escuro' | 'laranja';
  children: React.ReactNode;
}) {
  const fundo =
    tom === 'laranja' ? 'bg-[#c04d18]' : tom === 'escuro' ? 'bg-[#0f2318]' : 'bg-[#163725]';
  return (
    <section className={`${fundo} snap-start min-h-[100dvh] relative flex items-center`}>
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-20">{children}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-gt-contorno.svg" alt="GT Overlander" className="absolute top-4 left-6 md:left-12 h-9 md:h-10 w-auto" />
      <div className="absolute top-6 right-6 md:right-12 text-xs text-white/60 font-sans tabular-nums">
        {String(n).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
      </div>
      {n < TOTAL && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-sans animate-bounce" aria-hidden>
          ↓
        </div>
      )}
    </section>
  );
}

const Kicker = ({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) => (
  <p className={`text-xs uppercase tracking-[0.2em] mb-5 font-sans ${claro ? 'text-white/80' : 'text-[#E06226]'}`}>
    {children}
  </p>
);

const Titulo = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display uppercase text-white text-4xl md:text-6xl leading-[1.2] md:leading-[1.2] mb-6 max-w-4xl">
    {children}
  </h2>
);

const Apoio = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">{children}</p>
);

const BotaoCTA = () => (
  <a
    href={CTA_URL}
    className="inline-flex items-center justify-center bg-white text-[#c04d18] font-sans font-semibold text-lg px-8 py-4 rounded-md hover:bg-white/90 transition-colors"
  >
    Entrar na aba de parceiros →
  </a>
);

export default async function ConvitePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const stats = await getStats();
  const nf = new Intl.NumberFormat('pt-BR');

  const numeros = [
    { valor: porExtenso(stats.waypoints, 'pt-BR'), label: 'pontos no mapa' },
    { valor: nf.format(stats.paises), label: 'países' },
    { valor: nf.format(stats.usuarios), label: 'viajantes' },
    { valor: nf.format(stats.rotasCriadas), label: 'rotas ativas' },
  ];

  const frentes = [
    {
      tag: 'Seu ponto no mapa',
      desc: 'Assuma o seu estabelecimento e apresente com as suas fotos, o seu contato, os seus horários e tudo o que você oferece.',
    },
    {
      tag: 'Seus produtos',
      desc: 'Mostre seus produtos no Shopping, com o caminho direto pra sua loja ou pro seu WhatsApp.',
    },
    {
      tag: 'Seus serviços',
      desc: 'Guia, expedição, aluguel de equipamento. Divulgue suas saídas pra quem está planejando a viagem.',
    },
  ];

  const porque = [
    { t: 'Controle', d: 'Você decide como o seu negócio aparece.' },
    { t: 'Alcance', d: 'Quem te vê já decidiu viajar pela sua região.' },
    { t: 'Métricas', d: 'Rotas que passam perto de você, aparições no mapa, pessoas que visitaram o seu perfil.' },
  ];

  return (
    // Camada em tela cheia por cima do cabeçalho e do rodapé do site (z-40),
    // abaixo do aviso de cookies (z-50). Rolagem própria, um slide por vez.
    <div className="dark fixed inset-0 z-[45] overflow-y-auto snap-y snap-mandatory scroll-smooth text-white">
      {/* 1 · O convite */}
      <Slide n={1} tom="escuro">
        <Kicker>Convite · Parceiros GT Overlander</Kicker>
        <h1 className="font-display uppercase text-white text-5xl md:text-7xl leading-[1.15] md:leading-[1.15] mb-8 max-w-4xl">
          Você está convidado a fazer parte do <span className="text-[#E06226]">GT Overlander</span>
        </h1>
        <Apoio>
          Pousadas, campings, lojas, guias e oficinas: estamos abrindo espaço para os parceiros que fazem a estrada
          acontecer.
        </Apoio>
      </Slide>

      {/* 2 · O app */}
      <Slide n={2}>
        <Kicker>O app</Kicker>
        <Titulo>Planejar a viagem nunca foi tão simples</Titulo>
        <Apoio>
          O viajante descreve a viagem numa conversa e a inteligência artificial monta o roteiro, com paradas, pontos
          de apoio e mapa offline.
        </Apoio>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 mb-10">
          {numeros.map((n) => (
            <div key={n.label}>
              <div className="font-display text-4xl md:text-5xl text-white uppercase">{n.valor}</div>
              <div className="text-sm text-white/70 font-sans mt-1">{n.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="border border-white/40 hover:bg-white/10 rounded-md px-5 py-3 font-sans text-sm">
            Baixar na Google Play
          </a>
          <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="border border-white/40 hover:bg-white/10 rounded-md px-5 py-3 font-sans text-sm">
            Baixar na App Store
          </a>
        </div>
      </Slide>

      {/* 3 · O que o parceiro faz */}
      <Slide n={3} tom="escuro">
        <Kicker>O que você faz no GT</Kicker>
        <Titulo>Seu negócio, do seu jeito, no mapa de quem viaja</Titulo>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-8">
          {frentes.map((f) => (
            <div key={f.tag} className="bg-white/5 border border-white/10 rounded-lg p-6">
              <p className="text-xs uppercase tracking-wider text-[#E06226] font-sans font-medium mb-3">{f.tag}</p>
              <p className="font-sans text-white/85 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 4 · Por que estar com a gente */}
      <Slide n={4}>
        <Kicker>Por que estar com a gente</Kicker>
        <Titulo>Quem conhece o seu negócio é você</Titulo>
        <div className="space-y-6 mt-8 max-w-2xl">
          {porque.map((p) => (
            <div key={p.t} className="border-l-2 border-[#E06226] pl-5">
              <p className="font-display uppercase text-2xl md:text-3xl text-white leading-tight">{p.t}</p>
              <p className="font-sans text-white/80 text-lg leading-relaxed mt-1">{p.d}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 5 · O Shopping */}
      <Slide n={5} tom="escuro">
        <Kicker>O Shopping</Kicker>
        <Titulo>Tudo o que a estrada pede, num só lugar</Titulo>
        <Apoio>
          Produtos de lojas e usados de viajantes, guias e aluguel de equipamento, organizados por categoria, dentro do
          app que o overlander já usa pra planejar a viagem.
        </Apoio>
        <Fase
          antes={
            <p className="mt-8 inline-block bg-[#c04d18] text-white font-sans font-semibold px-5 py-3 rounded-md">
              Quem cadastrar até 9 de outubro já entra na vitrine da inauguração.
            </p>
          }
          depois={
            <p className="mt-8 inline-block bg-[#c04d18] text-white font-sans font-semibold px-5 py-3 rounded-md">
              O Shopping está aberto. Sua vitrine pode estar lá hoje.
            </p>
          }
        />
      </Slide>

      {/* 6 · A data */}
      <Slide n={6} tom="laranja">
        <Fase
          antes={
            <>
              <Kicker claro>Inauguração</Kicker>
              <Titulo>Sexta, 9 de outubro. O Shopping abre as portas.</Titulo>
              <div className="mt-10">
                <Contagem />
              </div>
            </>
          }
          depois={
            <>
              <Kicker claro>Inaugurado em 9 de outubro</Kicker>
              <Titulo>O Shopping está aberto.</Titulo>
              <Apoio>E a vitrine continua recebendo parceiros todos os dias.</Apoio>
            </>
          }
        />
      </Slide>

      {/* 7 · A chamada */}
      <Slide n={7} tom="escuro">
        <div className="text-center flex flex-col items-center">
          <Kicker>Parceiros</Kicker>
          <Fase
            antes={<Titulo>Garanta o seu lugar na inauguração</Titulo>}
            depois={<Titulo>Pronto pra assumir o seu lugar no mapa?</Titulo>}
          />
          <div className="mt-4">
            <BotaoCTA />
          </div>
          <p className="font-sans text-white/60 text-sm mt-8">
            Dúvidas:{' '}
            <a href="mailto:business@gtoverlander.com.br" className="text-[#E06226] hover:underline">
              business@gtoverlander.com.br
            </a>
          </p>
        </div>
      </Slide>
    </div>
  );
}
