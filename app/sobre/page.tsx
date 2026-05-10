import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { aboutPagePersonLd, jsonLdScriptProps } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'O GT Overlander é o maior ecossistema overlander do mundo — um companheiro de estrada que une praticidade, inteligência artificial e comunidade.',
};

const numeros = [
  { valor: 'Milhares', contexto: 'de viajantes cadastrados' },
  { valor: '+30%', contexto: 'de crescimento de usuários ao mês' },
  { valor: '+4 mi', contexto: 'de waypoints na nossa base — ajude a crescer ainda mais' },
  { valor: '209', contexto: 'países cobertos' },
];

const proximas = [
  {
    titulo: 'Comunidade GT viva',
    desc: 'Help Overlander pra socorro na estrada, Overlanders pra rede social entre viajantes, GT Explorer pra reputação e ranking, GT Desapega pra marketplace. Tudo já no ar — agora cresce com você.',
  },
  {
    titulo: 'Conta Business 3 frentes',
    desc: 'POI físico, vendedor de produtos e serviços guiados de expedição numa só conta comercial. Disponível agora, com escalonamento por volume pra redes maiores.',
  },
  {
    titulo: 'Modo Offline universal',
    desc: 'Vem com o v2 do app. Free baixa o país onde está com todas as categorias de waypoints; Plus e Pro liberam os 209 países com atualização automática.',
  },
  {
    titulo: 'Expansão internacional',
    desc: 'A base de waypoints já cobre 209 países. Próximos passos: localização da interface, parcerias com guias regionais e canais comerciais multi-país.',
  },
];

export default function SobrePage() {
  return (
    <>
      {/* Schema.org AboutPage + Person */}
      <script {...jsonLdScriptProps(aboutPagePersonLd())} />

      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-16 md:py-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-5 font-sans">
            Sobre o GT Overlander
          </p>
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
            Mais do que um planejador de rotas — um companheiro de estrada
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            O GT existe pra transformar o planejamento de viagens por terra
            numa experiência simples, inteligente e prática — feita por quem
            viaja, pra quem viaja.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-6">
            Nossa missão
          </h2>
          <p className="text-gt-text leading-relaxed mb-5 font-sans">
            O GT Overlander é um aplicativo pra quem viaja por terra — de
            carro, moto, 4x4 ou motorhome. Nasceu da frustração com apps
            genéricos que não entendem a realidade de quem cruza fronteira,
            dorme em camping selvagem, ou roda 5 mil km numa só viagem.
          </p>
          <p className="text-gt-text leading-relaxed mb-5 font-sans">
            O GT entende quem viaja: a IA monta o trajeto pelas estradas que
            fazem sentido, com cidades pelo caminho e contexto regional. A base
            própria de mais de 4 milhões de waypoints em 209 países cobre o que
            importa pra quem já decidiu pra onde vai — postos, hospedagem,
            campings, oficinas, atrações. E a integração com Google Maps,
            CarPlay e Android Auto leva tudo pro painel do carro.
          </p>
          <p className="text-gt-text leading-relaxed font-sans">
            Mais que um planejador, o GT é um companheiro de estrada — feito
            pra quem não vê a viagem só como deslocamento, mas como uma
            experiência única.
          </p>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-12">
            O fundador
          </h2>

          <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
            <div className="aspect-square bg-gt-bg rounded-lg overflow-hidden border border-gt-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/rangel.png"
                alt="Rangel Machado, fundador do GT Overlander, em frente a paisagem patagônica"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="font-sans text-xl font-medium text-gt-text mb-2 normal-case">
                Rangel Machado
              </h3>
              <p className="text-sm text-gt-orange mb-5 uppercase tracking-wider font-sans">
                Fundador
              </p>
              <p className="text-gt-text leading-relaxed mb-4 font-sans">
                Empresário paranaense e viajante. Vê o overlanding como um dos
                modos mais ricos de conhecer o mundo — e fundou o GT pra ser o
                app que ele mesmo queria ter na própria estrada.
              </p>
              <p className="text-gt-text leading-relaxed font-sans">
                Não vem do background técnico. Toma decisões de produto, ouve a
                comunidade, e trabalha lado a lado com o time pra transformar
                cada experiência pessoal em melhoria do app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-6">
            Conhecer quem viaja pra construir junto
          </h2>
          <p className="text-gt-text leading-relaxed mb-5 font-sans">
            Usuários no GT não estão navegando aleatoriamente pela internet.
            Eles já decidiram viajar, já sabem pra onde vão, e estão no momento
            exato de planejar onde parar, o que comprar e o que fazer.
          </p>
          <p className="text-gt-text leading-relaxed mb-5 font-sans">
            Conhecer essa jornada — quem viaja, pra onde, com qual veículo,
            qual estilo — é o que permite o GT melhorar continuamente. Cada
            viagem real ensina algo: rotas que funcionam, paradas que faltam,
            contextos regionais que ainda não cobrimos. É daí que cada camada
            do app evolui.
          </p>
          <p className="text-gt-text leading-relaxed font-sans">
            Não é um app de mapas. É um ecossistema vivo, construído junto com
            quem viaja — feito pra crescer com a comunidade overlander do
            mundo.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-12">
            Onde estamos hoje
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {numeros.map((n, i) => (
              <div key={i}>
                <div className="font-display text-4xl md:text-5xl text-gt-text mb-2 uppercase tracking-display">
                  {n.valor}
                </div>
                <p className="text-sm text-gt-text-muted leading-snug font-sans">
                  {n.contexto}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gt-text-muted mt-10 font-sans">
            App em iOS, Android e Web — compatível com CarPlay e Android Auto,
            em 3 idiomas (português, inglês, espanhol).
          </p>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Pra onde vamos
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            O GT é um ecossistema em construção. Cada frente abre uma nova
            camada de valor — e uma nova fonte de receita.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {proximas.map((p) => (
              <div
                key={p.titulo}
                className="bg-gt-bg rounded-lg p-6 border border-gt-border"
              >
                <h3 className="font-sans font-medium text-gt-text mb-2 normal-case">
                  {p.titulo}
                </h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-4">
            Faça parte
          </h2>
          <p className="text-gt-text-muted mb-8 max-w-md mx-auto font-sans">
            Baixe o app e comece sua próxima viagem. Ou, se você representa um
            estabelecimento na rota dos viajantes, conheça a Conta Business.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/baixar">Baixar grátis</Button>
            <Button href="/empresas" variant="outline">
              Conta Business
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
