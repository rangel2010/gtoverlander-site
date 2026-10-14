import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getStats } from '@/lib/stats';

/**
 * /criadores — deck de convite pra criadores de conteúdo e influenciadores
 * (moto, 4x4, motorhome, viagem) virarem Parceiro GT: o programa de código com
 * desconto pro seguidor e comissão pro criador.
 *
 * Criado em 14/10/2026 a pedido do Rangel, no mesmo molde do /convite (deck por
 * link, um slide por tela, pensado pro celular, só português, fora do menu, do
 * sitemap e com noindex). Decisões dele no mesmo dia:
 *  - mostrar os valores da comissão em reais (são fixos e já aparecem no painel
 *    do parceiro dentro do app);
 *  - porta de entrada: WhatsApp ou e-mail/formulário — não existe autocadastro,
 *    quem aprova e cadastra é o time.
 *
 * Os números do programa vêm de um lugar só (PROGRAMA, abaixo), copiados do
 * briefing medido no código do app em 14/10/2026. Se a oferta ou a régua mudar,
 * muda aqui — nunca no texto solto.
 *
 * PRINTS: ficam em public/criadores/ e são listados em PRINTS (lista à mão, pelo
 * mesmo motivo do /convite: a Vercel não deixa "olhar se o arquivo existe").
 * Print fora da lista = slide sem imagem, nada quebra.
 */

export const revalidate = 3600;

/** Dados do programa — fonte única do deck. */
const PROGRAMA = {
  desconto: '20%',
  meses: 12,
  precoPro: 'R$ 29,90',
  precoProComCodigo: 'R$ 23,90',
  precoPlus: 'R$ 19,90',
  precoPlusComCodigo: 'R$ 15,90',
  comissaoPro: 'R$ 18,47',
  comissaoPlus: 'R$ 12,29',
  // Exemplo de projeção do slide 5: 20 assinantes Pro × R$ 18,47.
  exemploQtd: 20,
  exemploTotal: 'R$ 369',
};

/**
 * WhatsApp do convite. Número com DDI e DDD, só dígitos (ex.: 5541999999999).
 * Vazio = o botão de WhatsApp não aparece e sobra o formulário/e-mail.
 */
const WHATSAPP = '';
const WHATSAPP_MSG =
  'Oi, Rangel! Vi o convite e quero ser Parceiro GT. Meu perfil é @______ e meu público é de ______.';
const EMAIL = 'business@gtoverlander.com.br';
const FORM_URL = '/parcerias#formulario';

export const metadata: Metadata = {
  title: { absolute: 'Parceiro GT · Convite para criadores de conteúdo' },
  description:
    'Seu código, seu público, sua comissão. O GT Overlander convida criadores de moto, 4x4 e motorhome a serem Parceiros GT.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Parceiro GT · Um convite para quem leva gente pra estrada',
    description: `Quem assina com o seu código paga ${PROGRAMA.desconto} a menos por ${PROGRAMA.meses} meses. Você recebe por cada assinante.`,
    type: 'website',
    // Arte 1200x630 em public/criadores/compartilhar.jpg (a fazer). Ao trocar, mude o ?v=.
    images: [
      {
        url: 'https://www.gtoverlander.com.br/criadores/compartilhar.jpg?v=1',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Convite Parceiro GT · GT Overlander',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.gtoverlander.com.br/criadores/compartilhar.jpg?v=1'],
  },
  alternates: { canonical: 'https://www.gtoverlander.com.br/criadores' },
};

const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.overlander';
const APP_STORE = 'https://apps.apple.com/br/app/gt-overlander/id6745626026';
const TOTAL = 7;
const LARANJA = '#E06226';
const LARANJA_TEXTO = '#b84916';

/** Prints já colocados em public/criadores/ (nome → arquivo). */
const PRINTS: Record<string, string> = {
  // '02-app-roteiro': '02-app-roteiro.jpg',
  // '02-app-rotas': '02-app-rotas.jpg',
  // '04-tela-planos': '04-tela-planos.jpg',
  // '06-painel-parceiro': '06-painel-parceiro.jpg',
};

function print(nome: string): string | null {
  return PRINTS[nome] ? `/criadores/${PRINTS[nome]}` : null;
}

type Tom = 'escuro' | 'claro';

function Slide({ n, tom = 'claro', children }: { n: number; tom?: Tom; children: React.ReactNode }) {
  const escuro = tom === 'escuro';
  return (
    <section
      className={`min-h-[100dvh] relative flex items-center ${
        escuro ? 'bg-[#122E1F] text-white' : 'bg-[#f8f5ee] text-[#122E1F] border-b border-[#e0dcce]'
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24">{children}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={escuro ? '/images/logo-gt-contorno.svg' : '/images/logo-gt.svg'}
        alt="GT Overlander"
        className={escuro ? 'absolute top-4 left-6 md:left-12 h-9 md:h-10 w-auto' : 'absolute top-0 left-3 md:left-9 h-16 md:h-[72px] w-auto'}
      />
      <div className={`absolute top-6 right-6 md:right-12 text-xs font-sans tabular-nums ${escuro ? 'text-white/50' : 'text-[#122E1F]/50'}`}>
        {String(n).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
      </div>
      {n < TOTAL && (
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-sans animate-bounce ${escuro ? 'text-white/40' : 'text-[#122E1F]/40'}`} aria-hidden>
          ↓
        </div>
      )}
    </section>
  );
}

const Kicker = ({ children, escuro = false }: { children: React.ReactNode; escuro?: boolean }) => (
  <p className="text-xs uppercase tracking-[0.2em] mb-5 font-sans" style={{ color: escuro ? LARANJA : LARANJA_TEXTO }}>
    {children}
  </p>
);

const Titulo = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display uppercase text-4xl md:text-6xl leading-[1.2] md:leading-[1.2] mb-6 max-w-4xl">
    {children}
  </h2>
);

const Apoio = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans opacity-80 text-lg md:text-xl leading-relaxed max-w-2xl">{children}</p>
);

function Celular({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-[28px] border-4 border-[#122E1F] bg-black overflow-hidden shadow-2xl w-[150px] md:w-[230px] shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

function ComImagem({ texto, imagem }: { texto: React.ReactNode; imagem: React.ReactNode | null }) {
  if (!imagem) return <>{texto}</>;
  return (
    <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-center">
      <div>{texto}</div>
      <div>{imagem}</div>
    </div>
  );
}

/** Cartão de valor (slide 5): plano em cima, número grande embaixo. */
function Valor({ plano, preco, valor, nota }: { plano: string; preco: string; valor: string; nota: string }) {
  return (
    <div className="rounded-lg border border-[#e0dcce] bg-white p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider font-sans font-medium mb-1" style={{ color: LARANJA_TEXTO }}>
        {plano}
      </p>
      <p className="font-sans text-sm opacity-60 mb-4">{preco}</p>
      <p className="font-display text-4xl md:text-5xl leading-none mb-2">{valor}</p>
      <p className="font-sans text-sm opacity-70">{nota}</p>
    </div>
  );
}

export default async function CriadoresPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const stats = await getStats();
  const mil = Math.floor(stats.usuarios / 1000);
  const viajantes =
    stats.usuarios < 10_000 && stats.usuarios >= 9_000 ? 'Quase 10 mil' : `Mais de ${mil} mil`;

  const pRoteiro = print('02-app-roteiro');
  const pRotas = print('02-app-rotas');
  const pPlanos = print('04-tela-planos');
  const pPainel = print('06-painel-parceiro');

  const whatsappUrl = WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MSG)}` : null;

  const oApp = [
    'Você descreve a viagem. A IA monta o roteiro, com paradas, contexto da região e opção de trajeto normal ou fora do asfalto.',
    'Rotas prontas da comunidade: Ruta 40, Carretera Austral, Serras do Sul, Estrada Real, Chapada Diamantina, Rastro da Serpente.',
    'Radar de pontos pra quem viaja: posto, camping, oficina, pousada — validados por quem esteve lá.',
  ];

  const passos = [
    {
      t: 'Você recebe um código com o seu nome',
      d: 'Tipo FULANO. É o seu, não é cupom genérico. Você fala dele onde quiser: vídeo, legenda, descrição, grupo.',
    },
    {
      t: `Quem assina com ele paga ${PROGRAMA.desconto} a menos por ${PROGRAMA.meses} meses`,
      d: 'Nos dois planos, Plus e Pro. Android e iPhone. A cobrança é da própria loja: ninguém digita cartão em site de terceiro.',
    },
    {
      t: 'Você recebe por cada assinante que trouxe',
      d: 'Uma mensalidade líquida por assinatura, paga via Pix. Sem link, sem cadastrar seguidor, sem cobrar ninguém. O código resolve.',
    },
  ];

  const painel = [
    'O seu código e quanto você ganha por plano',
    'Saldo a receber, aguardando a loja, em conferência e já recebido',
    'Quantas pessoas usaram o seu código e a lista de comissões, uma a uma',
    'A sua chave Pix, cadastrada por você quando quiser',
  ];

  return (
    <div className="fixed inset-0 z-[45] overflow-y-auto scroll-smooth bg-[#f8f5ee]">
      {/* 1 · Abertura */}
      <Slide n={1} tom="escuro">
        <Kicker escuro>Convite · Parceiro GT</Kicker>
        <h1 className="font-display uppercase text-white text-5xl md:text-7xl leading-[1.15] md:leading-[1.15] mb-8 max-w-4xl">
          O GT Overlander mudou. E agora tem lugar <span style={{ color: LARANJA }}>pra você</span> nele.
        </h1>
        <Apoio>Um convite pra quem leva gente pra estrada: criadores de moto, 4x4, motorhome e viagem.</Apoio>
      </Slide>

      {/* 2 · O app em 30 segundos */}
      <Slide n={2}>
        <ComImagem
          texto={
            <>
              <Kicker>O app</Kicker>
              <Titulo>Você descreve a viagem. A IA monta o roteiro.</Titulo>
              <ul className="space-y-3 mb-8">
                {oApp.map((i) => (
                  <li key={i} className="font-sans opacity-85 text-lg leading-relaxed flex gap-3">
                    <span style={{ color: LARANJA_TEXTO }}>—</span>
                    {i}
                  </li>
                ))}
              </ul>
              <p className="font-display uppercase text-3xl md:text-4xl mb-1">{viajantes}</p>
              <p className="font-sans opacity-70 mb-8">de viajantes já usam o app</p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="hover:opacity-85 transition-opacity">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/convite/selo-google-play.png" alt="Disponível no Google Play" className="h-11 md:h-12 w-auto block" />
                </a>
                <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="hover:opacity-85 transition-opacity">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/convite/selo-app-store.svg" alt="Baixar na App Store" className="h-11 md:h-12 w-auto block" />
                </a>
              </div>
            </>
          }
          imagem={
            pRoteiro || pRotas ? (
              <div className="flex gap-4 md:gap-6 justify-center">
                {pRoteiro && <Celular src={pRoteiro} alt="Roteiro montado pela IA no app GT Overlander" />}
                {pRotas && <Celular src={pRotas} alt="Rotas prontas no app GT Overlander" />}
              </div>
            ) : null
          }
        />
      </Slide>

      {/* 3 · Por que o público dele vai gostar */}
      <Slide n={3}>
        <Kicker>O seu público</Kicker>
        <Titulo>
          Quem te segue já está planejando <span style={{ color: LARANJA_TEXTO }}>a próxima</span>
        </Titulo>
        <Apoio>
          O seu público é exatamente quem usa o GT: gente de moto, 4x4 e motorhome que passa horas montando trajeto no
          mapa e no grupo do WhatsApp. O GT faz isso em minutos e deixa a pessoa com um roteiro pronto no bolso. Você
          indica uma ferramenta que ela ia procurar de qualquer jeito.
        </Apoio>
      </Slide>

      {/* 4 · Como funciona */}
      <Slide n={4}>
        <ComImagem
          texto={
            <>
              <Kicker>Como funciona</Kicker>
              <Titulo>Três passos. O resto é com a gente.</Titulo>
              <div className="space-y-6 mt-6">
                {passos.map((p, i) => (
                  <div key={p.t} className="flex gap-5">
                    <span className="font-display text-3xl md:text-4xl leading-none shrink-0" style={{ color: LARANJA_TEXTO }}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-sans font-semibold text-lg leading-snug mb-1">{p.t}</p>
                      <p className="font-sans opacity-75 leading-relaxed">{p.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          }
          imagem={
            pPlanos ? (
              <div className="flex justify-center">
                <Celular src={pPlanos} alt="Tela de planos do app, onde o seguidor digita o código" />
              </div>
            ) : null
          }
        />
      </Slide>

      {/* 5 · Quanto você ganha — valores em reais, decisão do Rangel (14/10) */}
      <Slide n={5}>
        <Kicker>Quanto você ganha</Kicker>
        <Titulo>Por assinante que você trouxe</Titulo>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mt-2 mb-8">
          <Valor
            plano="Plano Pro"
            preco={`O assinante paga ${PROGRAMA.precoProComCodigo}/mês em vez de ${PROGRAMA.precoPro}`}
            valor={PROGRAMA.comissaoPro}
            nota="pra você, por assinatura"
          />
          <Valor
            plano="Plano Plus"
            preco={`O assinante paga ${PROGRAMA.precoPlusComCodigo}/mês em vez de ${PROGRAMA.precoPlus}`}
            valor={PROGRAMA.comissaoPlus}
            nota="pra você, por assinatura"
          />
        </div>
        <p className="font-display uppercase text-2xl md:text-3xl mb-2">
          {PROGRAMA.exemploQtd} assinantes Pro no mês = <span style={{ color: LARANJA_TEXTO }}>{PROGRAMA.exemploTotal}</span>
        </p>
        <p className="font-sans opacity-75 leading-relaxed max-w-2xl">
          O valor é o líquido de uma mensalidade: o que entra depois das taxas da loja e do imposto. Libera quando o
          assinante renova — você ganha em cima de assinante de verdade, e a gente paga em cima de dinheiro que entrou.
          No plano anual, libera 90 dias depois da compra.
        </p>
      </Slide>

      {/* 6 · O painel dentro do app */}
      <Slide n={6}>
        <ComImagem
          texto={
            <>
              <Kicker>Transparência</Kicker>
              <Titulo>Você acompanha tudo dentro do app</Titulo>
              <ul className="space-y-3 mt-2">
                {painel.map((i) => (
                  <li key={i} className="font-sans opacity-85 text-lg leading-relaxed flex gap-3">
                    <span style={{ color: LARANJA_TEXTO }}>—</span>
                    {i}
                  </li>
                ))}
              </ul>
              <p className="font-sans opacity-70 mt-8">
                O que está liberado, o que está esperando a loja, o que já foi pago. Tudo à vista, no celular ou no site.
              </p>
            </>
          }
          imagem={
            pPainel ? (
              <div className="flex justify-center">
                <Celular src={pPainel} alt="Painel do Parceiro GT dentro do app" />
              </div>
            ) : null
          }
        />
      </Slide>

      {/* 7 · Fecho — a chamada */}
      <Slide n={7} tom="escuro">
        <div className="text-center flex flex-col items-center">
          <Kicker escuro>Parceiro GT</Kicker>
          <Titulo>Vagas por convite.</Titulo>
          <Apoio>
            Os primeiros parceiros entram com o Pro liberado pra conhecer o app por dentro antes de falar dele. Me conta
            quem é o seu público e a gente monta o seu código.
          </Apoio>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-white font-sans font-semibold text-lg px-8 py-4 rounded-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#c04d18' }}
              >
                Quero ser Parceiro GT · WhatsApp →
              </a>
            )}
            <a
              href={FORM_URL}
              className={
                whatsappUrl
                  ? 'inline-flex items-center justify-center font-sans font-semibold text-lg px-8 py-4 rounded-md border border-white/40 text-white hover:bg-white/10 transition-colors'
                  : 'inline-flex items-center justify-center text-white font-sans font-semibold text-lg px-8 py-4 rounded-md hover:opacity-90 transition-opacity'
              }
              style={whatsappUrl ? undefined : { backgroundColor: '#c04d18' }}
            >
              {whatsappUrl ? 'Prefiro por e-mail →' : 'Quero ser Parceiro GT →'}
            </a>
          </div>
          <p className="font-sans text-white/60 text-sm mt-8">
            Ou escreva pra{' '}
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Quero ser Parceiro GT')}`} className="hover:underline" style={{ color: LARANJA }}>
              {EMAIL}
            </a>
          </p>
        </div>
      </Slide>
    </div>
  );
}
