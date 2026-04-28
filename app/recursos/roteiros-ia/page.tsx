import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';
import { CtaFinal } from '@/components/sections/cta-final';

export const metadata: Metadata = {
  title: 'Roteiros com IA',
  description:
    'A IA do GT monta a espinha dorsal do seu roteiro de viagem em linguagem natural. Free pra começar, Premium pra ir mais fundo. Para qualquer estrada.',
};

const motores = [
  {
    nome: 'Standard Free',
    modelo: 'gpt-5.4-mini',
    pra: 'Disponível pra todos',
    desc: 'Onboarding e descoberta. Roteiros base pra quem tá conhecendo o app ou planejando uma viagem mais simples.',
  },
  {
    nome: 'Premium',
    modelo: 'gpt-5.4',
    pra: 'Plus e Pro',
    desc: 'Roteiros mais ricos, mais paradas, contexto cultural mais profundo. Narrativa de viagem em vez de só lista de pontos.',
  },
];

const passos = [
  {
    num: 1,
    titulo: 'Você descreve a viagem',
    desc: 'Conta o destino, os dias, o ritmo, o perfil — em linguagem natural. Sem formulário, sem dropdown.',
  },
  {
    num: 2,
    titulo: 'A IA monta a espinha dorsal',
    desc: 'O trajeto base com paradas, contexto regional e ritmo do dia — em segundos.',
  },
  {
    num: 3,
    titulo: 'Você deixa com a sua cara',
    desc: 'Refina, personaliza, inclui paradas, postos, hotéis e campings — você decide o que entra.',
  },
  {
    num: 4,
    titulo: 'Você roda',
    desc: 'Parte com CarPlay ou Android Auto. Tudo na palma da mão, online ou offline.',
  },
];

const faq = [
  {
    q: 'A IA erra alguma vez?',
    a: 'Acontece — IA generativa pode sugerir uma parada que não existe mais ou não está aberta. Por isso o passo 3 é parte do fluxo: você revisa e ajusta antes de partir. A base própria de waypoints do GT minimiza esse risco porque os pontos são curados.',
  },
  {
    q: 'Posso editar paradas depois que a rota tá pronta?',
    a: 'Sim. Adiciona, remove e reordena paradas o quanto quiser. Cada modificação atualiza a rota no mapa.',
  },
  {
    q: 'Funciona offline?',
    a: 'Gerar uma nova rota com a IA precisa de internet (a IA roda no servidor). Mas quando o Modo Offline lançar, você verá a rota gerada, paradas e waypoints sem sinal — só a geração nova precisa estar online.',
  },
  {
    q: 'Em quantos idiomas?',
    a: 'Português, inglês e espanhol. Você descreve a viagem no idioma que preferir e a IA responde no mesmo.',
  },
  {
    q: 'Qual a diferença entre Free e Premium?',
    a: 'Free usa o motor gpt-5.4-mini, suficiente pra rotas convencionais. Premium usa o gpt-5.4 full, com roteiros mais ricos, mais paradas e contexto cultural mais profundo.',
  },
];

export default function RoteirosIaPage() {
  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="Roteiros personalizados em uma conversa"
        subline="Descreva sua viagem em linguagem natural. A IA monta a espinha dorsal do trajeto e você personaliza com paradas, postos, hotéis e campings."
        primaryCta={{ label: 'Baixar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Ver planos', href: '/planos' }}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-3">
            2 motores de IA, calibrados pra cada perfil
          </h2>
          <p className="text-gt-gray-mid mb-10 max-w-xl">
            Free pra começar e descobrir. Premium pra quem viaja com mais frequência e quer mais densidade.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {motores.map((m) => (
              <div
                key={m.nome}
                className="bg-gt-cream rounded-lg p-6 border border-gt-green/10"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="font-medium text-gt-green text-lg">
                    {m.nome}
                  </h3>
                  <code className="text-xs text-gt-gray-mid bg-white px-2 py-0.5 rounded">
                    {m.modelo}
                  </code>
                </div>
                <p className="text-xs uppercase tracking-wider text-gt-orange/80 mb-3">
                  {m.pra}
                </p>
                <p className="text-sm text-gt-gray-mid leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-cream py-16 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-3">
            Como funciona
          </h2>
          <p className="text-gt-gray-mid mb-12 max-w-xl">
            Da ideia ao roteiro pronto, em 4 passos. Você no controle, sempre.
          </p>

          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {passos.map((p) => (
              <div
                key={p.num}
                className="border-l-2 border-gt-orange pl-5"
              >
                <div className="text-gt-orange font-medium text-sm mb-2">
                  {p.num.toString().padStart(2, '0')}
                </div>
                <h3 className="font-medium text-gt-green mb-2 leading-snug">
                  {p.titulo}
                </h3>
                <p className="text-sm text-gt-gray-mid leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-green text-white py-12 md:py-14">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-white/60 mb-3">
            Diferencial
          </p>
          <p className="text-xl md:text-2xl font-medium leading-snug">
            Outros apps te dão um mapa. O GT te dá um roteiro pensado e
            adaptável — uma narrativa de viagem que você ajusta no seu jeito.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <CtaFinal />

      <OutrasFeatures currentSlug="roteiros-ia" />
    </>
  );
}
