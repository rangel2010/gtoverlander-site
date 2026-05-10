import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Recursos',
  description:
    'Roteiros com IA, waypoints próprios, comunidade Overlanders, Help Overlander, GT Explorer e GT Desapega. O ecossistema completo pra quem viaja por terra.',
};

interface Feature {
  slug: string;
  titulo: string;
  desc: string;
  status: 'disponivel' | 'em-breve';
}

const planejamento: Feature[] = [
  {
    slug: 'roteiros-ia',
    titulo: 'Roteiros com IA',
    desc: 'Trajeto montado pela IA em uma conversa — estradas, cidades e destino, pronto em segundos.',
    status: 'disponivel',
  },
  {
    slug: 'waypoints',
    titulo: 'Waypoints próprios',
    desc: 'Mais de 4 milhões de pontos em 209 países — postos, campings, hospedagem, atrações, oficinas.',
    status: 'disponivel',
  },
  {
    slug: 'off-road',
    titulo: 'Modo Off Road',
    desc: 'Você desenha a rota ponto a ponto no mapa. Trilhas, ripio, estradas de terra — sem IA, funciona offline.',
    status: 'em-breve',
  },
  {
    slug: 'modo-offline',
    titulo: 'Modo Offline',
    desc: 'Escolha as regiões da sua viagem. O GT roda em qualquer canto do mundo, mesmo sem sinal.',
    status: 'em-breve',
  },
];

const comunidade: Feature[] = [
  {
    slug: 'overlanders',
    titulo: 'Overlanders',
    desc: 'Rede de viajantes do GT. Siga overlanders, descubra rotas públicas, copie roteiros que outros já testaram.',
    status: 'disponivel',
  },
  {
    slug: 'help-overlander',
    titulo: 'Help Overlander',
    desc: 'Comunidade que se ajuda na estrada. Pediu socorro, alguém próximo aparece — pane, pneu, bateria, combustível.',
    status: 'disponivel',
  },
  {
    slug: 'explorer',
    titulo: 'GT Explorer',
    desc: 'Sua jornada vira XP, níveis, conquistas e ranking regional. Cada validação, cada rota, cada quilômetro conta.',
    status: 'disponivel',
  },
  {
    slug: 'desapega',
    titulo: 'GT Desapega',
    desc: 'Compra, venda e troca de equipamento overlander entre quem realmente viaja. Vitrine entre overlanders, sem intermediação.',
    status: 'disponivel',
  },
];

function FeatureCard({ f }: { f: Feature }) {
  return (
    <Link
      href={`/recursos/${f.slug}`}
      className="bg-gt-card rounded-lg p-7 md:p-8 border border-gt-border hover:border-gt-border-strong hover:bg-gt-card-hover transition-colors group relative"
    >
      {f.status === 'em-breve' && (
        <span className="absolute top-5 right-5 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded font-sans">
          Em breve
        </span>
      )}
      <h3 className="text-2xl md:text-3xl text-gt-text mb-3 group-hover:text-gt-orange transition-colors pr-24">
        {f.titulo}
      </h3>
      <p className="text-sm text-gt-text-muted leading-relaxed mb-5 font-sans">
        {f.desc}
      </p>
      <span className="text-gt-orange text-sm font-medium font-sans">
        Saiba mais →
      </span>
    </Link>
  );
}

export default function RecursosPage() {
  return (
    <>
      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-16 md:py-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-5 font-sans">
            O que o GT entrega
          </p>
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
            Tudo que você precisa pra rodar
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            Da rota gerada por IA aos pontos de apoio na estrada. Da viagem solo à
            comunidade que se ajuda. O maior ecossistema overlander do mundo.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
            Planejamento e mapa
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-10 leading-tight">
            Da ideia da viagem à rota pronta
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {planejamento.map((f) => <FeatureCard key={f.slug} f={f} />)}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
            Comunidade e marketplace
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-10 leading-tight">
            A estrada é melhor com gente junto
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {comunidade.map((f) => <FeatureCard key={f.slug} f={f} />)}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-4">
            Pronto pra começar?
          </h2>
          <p className="text-gt-text-muted mb-8 max-w-md mx-auto font-sans">
            Comece grátis. Sem cartão, sem compromisso.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/baixar">Baixar grátis</Button>
            <Button href="/planos" variant="outline">
              Ver planos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
