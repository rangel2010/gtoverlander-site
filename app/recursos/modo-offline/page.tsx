import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';

export const metadata: Metadata = {
  title: 'Modo Offline',
  description:
    'Em breve. Use o GT em qualquer lugar do mundo, sem depender de sinal. Baixe e parta. Universal pra Free, Plus e Pro.',
};

const funciona = [
  'Abrir o app e ver rotas salvas',
  'Radar interativo de waypoints com seu GPS',
  'Detalhes de cada ponto (horário, telefone, "aceita RV")',
  'Filtros de planejamento ao longo da rota',
  'Editar rota — sincroniza quando o sinal voltar',
];

const precisaInternet = [
  'Gerar nova rota com a IA',
  'Sincronizar atualizações dos waypoints',
  'Compartilhar rota com outras pessoas',
];

const faq = [
  {
    q: 'Quando lança?',
    a: 'Está em desenvolvimento. Sem data fechada ainda. Cadastre seu interesse abaixo pra ser avisado quando estiver disponível.',
  },
  {
    q: 'Funciona em qualquer país?',
    a: 'Sim. O Modo Offline cobre todos os 209 países onde o GT tem waypoints. Baixou, leva o GT na bagagem.',
  },
  {
    q: 'Posso navegar offline com voz?',
    a: 'A navegação turn-by-turn com voz acontece pelo Google Maps (que tem o cache offline próprio dele). O GT em modo offline mostra o mapa, os waypoints e a rota — você ativa a navegação por voz no Maps quando quiser.',
  },
  {
    q: 'É grátis ou pago?',
    a: 'Universal pra todos os planos: Free, Plus e Pro têm acesso completo ao Modo Offline, sem limite de armazenamento ou bloqueio por país.',
  },
];

export default function ModoOfflinePage() {
  return (
    <>
      <FeatureHero
        status="em-breve"
        title="O mundo no seu bolso, sem depender de sinal"
        subline="Em breve. Baixe o app, baixe o mundo. Use o GT em qualquer lugar do planeta — online ou offline."
        primaryCta={{ label: 'Avise quando lançar', href: '/contato' }}
        secondaryCta={{ label: 'Baixar o app agora', href: '/baixar' }}
      />

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-6">
            Use em qualquer lugar do mundo
          </h2>
          <p className="text-gt-text leading-relaxed mb-5 font-sans">
            Outros apps oferecem mapa offline. O GT te dá o app inteiro
            funcionando offline — planejamento, radar, waypoints, detalhes,
            edição de rota. Tudo na palma da mão sem depender de sinal.
          </p>
          <p className="text-gt-text leading-relaxed font-sans">
            Você não precisa pensar em região, em país, em quanto vai ocupar.
            O GT cuida do download em background quando você abre o app pela
            primeira vez. Quando você for viajar, simplesmente funciona.
          </p>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-sans text-xl font-medium text-gt-text mb-5 normal-case">
                Funciona offline
              </h3>
              <ul className="space-y-3 font-sans">
                {funciona.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gt-text"
                  >
                    <span className="text-gt-orange flex-shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-sans text-xl font-medium text-gt-text mb-5 normal-case">
                Precisa de internet
              </h3>
              <ul className="space-y-3 font-sans">
                {precisaInternet.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gt-text"
                  >
                    <span className="text-gt-text-dim flex-shrink-0">○</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            Universal pra Free, Plus e Pro. Sem trava por plano, sem download
            bloqueado por país. Todos os viajantes têm acesso completo.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="modo-offline" />
    </>
  );
}
