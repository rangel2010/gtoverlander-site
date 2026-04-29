import type { Metadata } from 'next';
import { PartnershipForm } from '@/components/sections/partnership-form';

export const metadata: Metadata = {
  title: 'Parcerias',
  description:
    'Criadores de conteúdo, marcas e serviços de viagem que sustentam o ecossistema overlander. Programa de afiliados, embaixadores, co-marketing e integrações.',
};

const categorias = [
  {
    titulo: 'Criadores de conteúdo',
    desc: 'Blogueiros, youtubers, podcasters e influenciadores que falam de overlanding, vanlife, motorhome, 4x4 ou viagem por terra.',
    exemplos: 'YouTube · Instagram · TikTok · Blog · Podcast',
  },
  {
    titulo: 'Marcas e produtos',
    desc: 'Lojas especializadas, marcas de equipamento, acessórios 4x4, vestuário outdoor, autopeças relacionadas a overlanding.',
    exemplos: 'Equipamento · Vestuário · Acessórios · Autopeças',
  },
  {
    titulo: 'Serviços de viagem',
    desc: 'Locadoras de motorhome e 4x4, operadoras de turismo de aventura, agências, seguradoras de viagem, assistência 24h.',
    exemplos: 'Locação · Operadora · Agência · Seguro',
  },
];

const oferta = [
  {
    titulo: 'Audiência qualificada',
    desc: 'Você conversa com quem já decidiu viajar por terra. Não é tráfego frio — é viajante no momento exato de planejar.',
  },
  {
    titulo: 'Programa de afiliados',
    desc: 'Link único de indicação com comissão recorrente sobre cada assinatura que vier do seu canal.',
  },
  {
    titulo: 'Co-marketing e conteúdo',
    desc: 'Campanhas em conjunto, divulgação cruzada, conteúdo editorial sobre o que vocês oferecem.',
  },
  {
    titulo: 'Acesso e produto',
    desc: 'Acesso Pro grátis pra você usar e criar conteúdo autêntico. Bundles com sua oferta quando faz sentido.',
  },
];

const formatos = [
  {
    titulo: 'Afiliado',
    desc: 'Link de indicação com comissão recorrente sobre assinaturas Pro/Plus. Modelo simples — você indica, ganha.',
  },
  {
    titulo: 'Embaixador',
    desc: 'Pra figuras públicas do universo overlander. Benefícios estendidos, presença no app, reconhecimento.',
  },
  {
    titulo: 'Conteúdo patrocinado',
    desc: 'Review honesto do app, com base em uso real. GT entra com Pro grátis e suporte pra produção.',
  },
  {
    titulo: 'Co-marketing',
    desc: 'Campanhas conjuntas, Stories cruzados, conteúdo editorial sobre seu produto/serviço no nosso blog.',
  },
  {
    titulo: 'Integração tecnológica',
    desc: 'Pra parceiros estratégicos com produto digital. APIs, integrações no app, bundles. Caso a caso.',
  },
];

export default function ParceriasPage() {
  return (
    <>
      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-16 md:py-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-5 font-sans">
            Parcerias
          </p>
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
            Construa overlanding com a gente
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            O maior ecossistema overlander do mundo não é só app — é todo
            mundo que sustenta esse universo. Criadores que contam histórias de
            estrada, marcas que equipam quem viaja, serviços que cuidam do
            caminho. Vamos fazer juntos.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Quem buscamos
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            Três grandes frentes. Se você se enquadra em alguma, queremos
            conversar.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {categorias.map((c) => (
              <div
                key={c.titulo}
                className="bg-gt-card rounded-lg p-7 border border-gt-border"
              >
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case text-lg">
                  {c.titulo}
                </h3>
                <p className="text-sm text-gt-text-muted leading-relaxed mb-4 font-sans">
                  {c.desc}
                </p>
                <p className="text-xs uppercase tracking-wider text-gt-orange/80 font-sans">
                  {c.exemplos}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            O que o GT oferece
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            Parceria boa é via de mão dupla. Aqui é o nosso lado.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {oferta.map((o) => (
              <div
                key={o.titulo}
                className="bg-gt-bg rounded-lg p-6 border border-gt-border"
              >
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case">
                  {o.titulo}
                </h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                  {o.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Formatos de parceria
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            Não é tamanho único. A gente adapta o formato pro que faz sentido
            no seu caso.
          </p>

          <div className="space-y-3">
            {formatos.map((f, i) => (
              <details
                key={i}
                className="group bg-gt-card border border-gt-border rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                  <span className="font-sans font-medium text-gt-text pr-4">
                    {f.titulo}
                  </span>
                  <span className="text-gt-orange flex-shrink-0 text-xl leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gt-text-muted leading-relaxed font-sans">
                  {f.desc}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-24 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
            Mande sua proposta
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Vamos conversar
          </h2>
          <p className="text-gt-text-muted mb-10 font-sans">
            Conte quem você é e o que tá imaginando. Lemos cada proposta e
            respondemos em até 5 dias úteis. Se fizer sentido, marcamos uma
            conversa pra desenhar a parceria juntos.
          </p>

          <PartnershipForm />
        </div>
      </section>
    </>
  );
}
