import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'O GT Overlander é o ecossistema do viajante overland — um companheiro de estrada que une praticidade, inteligência artificial e comunidade.',
};

const numeros = [
  { valor: 'Milhares', contexto: 'de viajantes ativos' },
  { valor: '+40%', contexto: 'de recorrência mensal' },
  { valor: '+4 mi', contexto: 'de waypoints próprios' },
  { valor: '209', contexto: 'países cobertos' },
];

const proximas = [
  {
    titulo: 'Motor próprio de waypoints',
    desc: 'A maior base do universo overlander já em produção no backend. Integração final com o app no caminho.',
  },
  {
    titulo: 'Modo Offline universal',
    desc: 'Use o GT em qualquer lugar do mundo, sem depender de sinal. Em desenvolvimento.',
  },
  {
    titulo: 'Off Road manual',
    desc: 'Crie rotas off-road desenhando sobre os waypoints. Pra quem sai do asfalto.',
  },
  {
    titulo: 'Conta Business',
    desc: 'Postos, campings, pousadas e oficinas aparecem pra quem já decidiu viajar. Em construção.',
  },
];

export default function SobrePage() {
  return (
    <>
      <section className="bg-gt-green text-white">
        <div className="container-wide py-16 md:py-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-white/60 mb-5">
            Sobre o GT Overlander
          </p>
          <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-6">
            Mais do que um planejador de rotas — um companheiro de estrada
          </h1>
          <p className="text-base md:text-lg text-white/75 leading-relaxed">
            O GT existe pra transformar o planejamento de viagens por terra em
            uma experiência simples, inteligente e inspiradora.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-6">
            Nossa missão
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-5">
            O GT Overlander é um aplicativo criado para viajantes que exploram
            o mundo por terra — seja de carro, moto, 4x4 ou motorhome. Nossa
            missão é transformar o planejamento de viagens em uma experiência
            simples, inteligente e inspiradora.
          </p>
          <p className="text-gt-gray-dark leading-relaxed mb-5">
            Com tecnologia de inteligência artificial, o app cria rotas
            personalizadas com base nas suas preferências e conecta você a
            pontos de interesse úteis, como postos de combustível, campings,
            hospedagens e atrações locais. Tudo é integrado ao Google Maps para
            facilitar a navegação, e você ainda conta com um radar de waypoints
            para encontrar recursos próximos durante a viagem.
          </p>
          <p className="text-gt-gray-dark leading-relaxed">
            Mais do que um planejador de rotas, o GT Overlander é um
            companheiro de estrada que une praticidade, segurança e
            comunidade — ajudando você a descobrir novos destinos e aproveitar
            ao máximo cada quilômetro.
          </p>
        </div>
      </section>

      <section className="bg-gt-cream py-16 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-12">
            O fundador
          </h2>

          <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
            <div className="aspect-square bg-gt-green/5 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/rangel.jpg"
                alt="Rangel Machado, fundador do GT Overlander, em frente a paisagem patagônica"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-medium text-gt-green mb-2">
                Rangel Machado
              </h3>
              <p className="text-sm text-gt-orange mb-5 uppercase tracking-wider">
                Fundador
              </p>
              <p className="text-gt-gray-dark leading-relaxed mb-4">
                Empresário e viajante baseado em Londrina, no Paraná. Vê o
                overlanding como um dos modos mais ricos de conhecer o
                continente — e fundou o GT pra ser o app que ele mesmo queria
                ter na primeira longa viagem.
              </p>
              <p className="text-gt-gray-dark leading-relaxed">
                Não tem background técnico. Toma decisões de produto, ouve a
                comunidade, e trabalha lado a lado com o time pra transformar
                cada viagem real em melhoria do app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-6">
            A tese: intenção de destino conhecida
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-5">
            Usuários no GT não estão navegando aleatoriamente pela internet.
            Eles já decidiram viajar, já sabem pra onde vão, e estão no momento
            exato de planejar onde parar, o que comprar e o que fazer.
          </p>
          <p className="text-gt-gray-dark leading-relaxed mb-5">
            Esse dado de <em>intenção de destino conhecida</em> é o ativo mais
            valioso do GT — e ele sustenta cada camada do que estamos
            construindo. Da rota gerada por IA, à recomendação de waypoints,
            ao matchmaking entre viajantes e estabelecimentos da Conta Business.
          </p>
          <p className="text-gt-gray-dark leading-relaxed">
            Não é um app de mapas. É a base de um ecossistema completo de
            suporte ao viajante overland.
          </p>
        </div>
      </section>

      <section className="bg-gt-green text-white py-16 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-medium mb-12">
            Onde estamos hoje
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {numeros.map((n, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-medium mb-2">
                  {n.valor}
                </div>
                <p className="text-sm text-white/70 leading-snug">
                  {n.contexto}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/60 mt-10">
            App rodando em iOS, Android, CarPlay e Android Auto, em 3 idiomas
            (português, inglês, espanhol).
          </p>
        </div>
      </section>

      <section className="bg-gt-cream py-16 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-3">
            Pra onde vamos
          </h2>
          <p className="text-gt-gray-mid mb-12 max-w-xl">
            O GT é um ecossistema em construção. Cada frente abre uma nova
            camada de valor — e uma nova fonte de receita.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {proximas.map((p) => (
              <div
                key={p.titulo}
                className="bg-white rounded-lg p-6 border border-gt-green/10"
              >
                <h3 className="font-medium text-gt-green mb-2">{p.titulo}</h3>
                <p className="text-sm text-gt-gray-mid leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-green text-white py-16 md:py-20">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            Faça parte
          </h2>
          <p className="text-white/75 mb-8 max-w-md mx-auto">
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
