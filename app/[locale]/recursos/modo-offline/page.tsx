import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';
import { getRegua, plano } from '@/lib/planos';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Modo Offline',
    description:
      'O mapa e os pontos do seu país ficam no seu celular pra sempre, em qualquer plano. Sem sinal, o GT continua desenhando o mapa e mostrando o caminho até o ponto, sem depender de nenhum outro app.',
    alternates: getPageAlternates(locale, '/recursos/modo-offline'),
    ...(locale !== "pt" && { robots: { index: false, follow: false } }),
  };
}

// Reescrito em 09/09/2026, na build 77 do app. O que mudou: quem faz o caminho
// até o ponto agora é o GT, não mais o Google Maps. Exportar pro Maps continua
// existindo, mas como saída secundária, não como requisito pra navegar.
// Regras de copy desta página (decisões, não esquecimento):
//   - não dizer "navegação passo a passo" nem "turn-by-turn"
//   - não prometer o "Ir" pra um roteiro inteiro, só pra um ponto
//   - não falar em "mapa detalhado" nem em nível de detalhe por plano
//   - não citar quantos países têm mapa, porque todos vão ter
const oQueFaz = [
  {
    titulo: 'O mapa e os pontos ficam no seu celular',
    desc: 'O pacote do seu país traz o mapa inteiro, com estradas, cidades e relevo, junto com os pontos da comunidade: postos, hospedagem, oficinas, campings e atrações. Sem sinal, é o próprio aparelho que desenha o mapa, e o radar continua mostrando o que existe ao seu redor, com busca por região e por categoria.',
  },
  {
    titulo: 'O caminho até o ponto, dentro do app',
    desc: 'Tocou em "Ir" sem sinal, o GT limpa a tela e deixa só o essencial: onde você está, o destino, a distância, pra que lado ele fica e a linha entre os dois. Um toque em "Seguir" e o mapa fecha o zoom e anda com você. Aparecendo sinal no meio do caminho, a linha vira a estrada de verdade sozinha.',
  },
  {
    titulo: 'Cadastrar e validar sem sinal nenhum',
    desc: 'Achou um camping que não está no mapa? Cadastra ali, na hora, e responde as perguntas do lugar, que ficam guardadas no aparelho justamente pra esse momento. Tudo sobe quando você reconectar, com a coordenada de onde você estava quando cadastrou: o selo de verificado no local continua valendo mesmo que o envio só aconteça 200 km depois.',
  },
  {
    titulo: 'Suas rotas e seus pontos, sempre à mão',
    desc: 'Roteiros salvos, paradas, distâncias e a sua coleção de waypoints abrem sem sinal, na última versão que o app recebeu. Criar ou editar uma rota continua precisando de internet.',
  },
];

const precisaInternet = [
  'Gerar ou editar um roteiro com a IA',
  'Baixar ou atualizar o mapa e a base de pontos',
  'Sincronizar os cadastros e validações que ficaram na fila',
  'GT Desapega (anúncios e contato com o vendedor)',
  'Recursos em tempo real do GT Social',
];

const faq = (extraPlus: number, extraPro: number) => [
  {
    q: 'Como ativo o Modo Offline?',
    a: 'Não precisa ativar nada. Ao entrar, o GT já baixa o pacote do seu país, mapa e pontos juntos, e se você tiver países extras no plano é só escolher quais quer levar. Depois disso funciona sozinho: quando falta sinal, o app troca de mapa e segue.',
  },
  {
    q: 'Quanto ocupa no celular?',
    a: 'Menos do que você imagina. O Brasil inteiro cabe em 51 MB, a Argentina em 13 MB e o Uruguai em pouco mais de 1 MB. Pra comparar, o Brasil inteiro ocupa menos espaço que vinte fotos do seu celular. E dá pra apagar e baixar de novo quando quiser.',
  },
  {
    q: 'Preciso baixar o mapa no Google Maps também?',
    a: 'Não. Essa era a realidade das primeiras versões do app e não é mais. O GT desenha o próprio mapa a partir do arquivo que já está no seu celular, e mostra o caminho até o ponto dentro do app mesmo. Se você preferir seguir pelo Google Maps ou pelo Waze, os dois continuam a um toque, mas aí valem as regras deles.',
  },
  {
    q: 'O GT faz navegação por voz, passo a passo?',
    a: 'Não, e é decisão nossa. O que ele faz é te manter no mapa: o zoom fecha, a tela aponta pra onde você está indo e a linha até o destino fica na frente. Numa estrada de terra sem placa, é isso que resolve. E funciona sem sinal nenhum, que é justamente onde a voz do navegador some de qualquer jeito.',
  },
  {
    q: 'O país de origem é grátis mesmo no Free?',
    a: 'É, e pra sempre. O pacote do seu país não custa nada em nenhum plano, com o mapa e todas as categorias de pontos. O país de origem é escolhido uma vez e não muda depois.',
  },
  {
    q: 'Como funcionam os países extras do Plus e do Pro?',
    a: `São países offline ALÉM do seu, pra quem cruza fronteira. O Plus soma ${extraPlus} e o Pro soma ${extraPro}, trocáveis quando você quiser: terminou a viagem pela Argentina, troca por outro país na próxima. O seu país de origem continua incluso e não ocupa nenhuma dessas vagas.`,
  },
  {
    q: 'Posso validar e cadastrar pontos offline?',
    a: 'Sim, em qualquer plano e sem limite. E o que mais importa: a validação guarda a coordenada do momento em que você validou, não a de quando o celular conseguiu enviar. Quem confirmou o lugar estando lá continua recebendo o selo de verificado no local, mesmo que só reconecte no dia seguinte. Validar ainda te rende viagens.',
  },
  {
    q: 'Quem é Free recebe uma base pior?',
    a: 'Não. O mapa e as categorias de pontos são iguais em todos os planos. Nunca entregamos uma base menor pra quem é Free. O que muda é só quantos países você leva junto.',
  },
  {
    q: 'Como a base se atualiza?',
    a: 'O app cuida disso sozinho sempre que há conexão. E quem viaja com dados contados manda no assunto: dá pra pedir que o download do mapa aconteça só no Wi-Fi, e desligar a sincronização automática, e aí nada sobe até você mandar. Offline, o que você vê é o da última sincronização.',
  },
];

export default async function ModoOfflinePage() {
  // Os números de países vêm da régua — ver lib/planos.ts.
  const regua = await getRegua();
  const extraPlus = plano(regua, 'plus').paisesEstrangeiros;
  const extraPro = plano(regua, 'pro').paisesEstrangeiros;

  const planos = [
    {
      nome: 'Free',
      badge: 'Incluso em todos os planos',
      titulo: 'O seu país inteiro, offline, pra sempre',
      items: [
        'O mapa completo do seu país gravado no celular. O Brasil inteiro cabe em 51 MB',
        'Todas as categorias de pontos: postos, hospedagem, mecânica, camping, atração',
        'O caminho até qualquer ponto, com acompanhamento no mapa, sem sinal',
        'Cadastro e validação de pontos offline, sem limite',
        'O país de origem é escolhido uma vez e não muda depois',
      ],
    },
    {
      nome: 'Plus e Pro',
      badge: 'Pra quem cruza fronteira',
      titulo: `Países extras além do seu: ${extraPlus} no Plus, ${extraPro} no Pro`,
      items: [
        'Somam-se ao país de origem, que continua incluso',
        'Trocáveis quando quiser: terminou a viagem, troca pelo próximo destino',
        'Mesmas categorias e mesmo mapa do pacote de origem',
        'Sincronização automática das atualizações',
      ],
    },
  ];

  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="Estrada de verdade tem trecho sem sinal. O GT foi feito pra esse trecho."
        subline="O mapa do seu país e os pontos da comunidade ficam gravados no celular, em qualquer plano, inclusive no Free. Sem sinal, o GT desenha o mapa sozinho, encontra o que está ao seu redor e traça o caminho até lá. Quem cruza fronteira soma países extras no Plus e no Pro."
        primaryCta={{ label: 'Começar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Explorar planos', href: '/planos' }}
      />

      {/* Cena de abertura: coloca o leitor no momento em que a feature importa,
          antes de explicar como ela funciona. */}
      <section className="bg-gt-card py-14 md:py-16 border-t border-gt-border">
        <div className="container-narrow">
          <p className="font-sans text-lg md:text-xl leading-relaxed text-gt-text">
            O sinal sumiu faz uma hora. O sol está caindo, a estrada continua, e
            você precisa saber uma coisa só: tem posto antes de escurecer, ou é
            melhor parar aqui mesmo?
          </p>
          <p className="font-sans text-lg md:text-xl leading-relaxed text-gt-text-muted mt-4">
            É pra essa hora que o Modo Offline existe. Não pra você abrir o app e
            ver uma tela cinza pedindo conexão.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            O que funciona offline
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans leading-relaxed">
            Com o país baixado, o GT não fica meio útil sem sinal. Ele continua
            fazendo o trabalho, porque o mapa é desenhado pelo próprio celular, a
            partir de um arquivo que já está no aparelho.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {oQueFaz.map((o) => (
              <div key={o.titulo} className="bg-gt-card rounded-lg p-6 border border-gt-border">
                <h3 className="font-sans font-medium text-gt-text mb-2 normal-case">{o.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            Como funciona em cada plano
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans leading-relaxed">
            O seu país é grátis em todos os planos, pra sempre. Plus e Pro somam
            países extras pra quem cruza fronteira. Em qualquer caso, a base
            offline tem todas as categorias de pontos: não entregamos uma base
            pior pra quem é Free.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {planos.map((p) => (
              <div
                key={p.nome}
                className={`rounded-lg p-7 border ${
                  p.nome === 'Free'
                    ? 'bg-gt-bg border-gt-border'
                    : 'bg-gt-bg border-2 border-gt-orange'
                }`}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-display text-3xl text-gt-text uppercase tracking-display">
                    {p.nome}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-gt-orange-text font-sans font-medium">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-medium text-gt-text mb-4 normal-case leading-snug">
                  {p.titulo}
                </h3>
                <ul className="space-y-2 font-sans text-sm text-gt-text-muted">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-gt-orange-text flex-shrink-0">✓</span>
                      <span className="leading-relaxed">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            O que ainda precisa de internet
          </h2>
          <p className="text-gt-text-muted mb-8 max-w-2xl font-sans leading-relaxed">
            Algumas funções dependem de servidor por natureza: a IA, a
            comunicação em tempo real, o marketplace. Nenhuma delas é necessária
            pra usar o mapa na estrada, e todas retomam sozinhas quando você
            reconecta.
          </p>
          <div className="bg-gt-card rounded-lg border border-gt-border p-6 max-w-2xl">
            <ul className="space-y-3 font-sans text-sm text-gt-text">
              {precisaInternet.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-gt-text-muted flex-shrink-0">○</span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            Mapa offline todo mundo tem. O que o GT faz de diferente é continuar
            sendo o mesmo app quando o sinal acaba: o mapa é desenhado pelo
            celular, os pontos da comunidade continuam lá, o caminho até o
            próximo posto aparece na tela, e o que você cadastrar no meio do nada
            entra na base com a coordenada certa assim que voltar o sinal.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq(extraPlus, extraPro)} />

      <OutrasFeatures currentSlug="modo-offline" />
    </>
  );
}
