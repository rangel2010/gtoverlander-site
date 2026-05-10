import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';
import { FeatureScreenshot } from '@/components/sections/feature-screenshot';

export const metadata: Metadata = {
  title: 'GT Explorer',
  description:
    'Sua jornada vira XP, níveis, conquistas e ranking regional. Cada quilômetro rodado, cada ponto validado, cada rota concluída — tudo conta. A estrada vira progressão.',
};

const niveis = [
  { nv: 1, nome: 'Iniciante', faixa: '0–1.000 XP' },
  { nv: 2, nome: 'Aprendiz', faixa: '1.000–2.500 XP' },
  { nv: 3, nome: 'Viajante', faixa: '2.500–5.000 XP' },
  { nv: 4, nome: 'Explorador', faixa: '5.000–10.000 XP' },
  { nv: 5, nome: 'Aventureiro', faixa: '10.000–20.000 XP' },
  { nv: 6, nome: 'Overlander Experiente', faixa: '20.000–40.000 XP' },
  { nv: 7, nome: 'Guia de Estrada', faixa: '40.000–75.000 XP' },
  { nv: 8, nome: 'Mestre da Estrada', faixa: '75.000+ XP' },
];

const ganhos = [
  { titulo: 'Quilômetros rodados', desc: 'Cada km de viagem registrada vira XP. Estrada longa rende mais.' },
  { titulo: 'Pontos validados', desc: 'Confirmou ou refutou facilidade num waypoint? XP. Ajudou a base a melhorar.' },
  { titulo: 'Pontos novos cadastrados', desc: 'Encontrou local que ainda não estava no GT? Cadastra com foto e ganha XP.' },
  { titulo: 'Rotas públicas concluídas', desc: 'Compartilhou rota e completou a viagem? XP no fim, mais XP por avaliação positiva.' },
  { titulo: 'Avaliações úteis', desc: 'Avaliou estabelecimento, prestador, rota? Avaliação detalhada e relevante rende XP.' },
  { titulo: 'Ajuda em Help Overlander', desc: 'Atendeu pedido de socorro como prestador? Bons serviços viram XP e reputação.' },
];

const ranking = [
  {
    titulo: 'Liga Regional',
    desc: 'Ranking por estado e país. Você compete com overlanders próximos, vê quem mais explora a sua região.',
  },
  {
    titulo: 'Temporadas',
    desc: 'A cada trimestre, ranking reseta. Quem sobe consistentemente cria reputação. Quem para, perde posição.',
  },
  {
    titulo: 'Medalhas e desafios',
    desc: 'Conquistas específicas — "Cruzou 5 estados", "100 pontos validados", "Trilha Dakar completa". Medalha vira selo permanente no perfil.',
  },
  {
    titulo: 'Reputação acumulada',
    desc: 'Avaliações em rotas, validações úteis, conduta na comunidade — tudo soma. Reputação alta destrava destaques editoriais e visibilidade extra.',
  },
];

const faq = [
  {
    q: 'XP e conquistas valem dinheiro? Trocam por algo?',
    a: 'Não. São selos simbólicos de reputação dentro da comunidade GT. Servem pra construir status, destrava visibilidade no perfil público, e podem influenciar quando o GT seleciona overlanders pra destaques editoriais. Mas não viram dinheiro nem prêmio físico.',
  },
  {
    q: 'Posso burlar o sistema cadastrando coisas falsas?',
    a: 'Vai ser banido. Cadastros fictícios, validações inventadas, autoavaliação fraudulenta — tudo isso é detectado pela moderação e pela própria comunidade. Quem for pego perde XP, conquistas e pode ser banido permanentemente da plataforma.',
  },
  {
    q: 'Onde vejo meu progresso?',
    a: 'Aba GT Explorer dentro do app. Mostra teu nível, próxima meta, ranking regional, conquistas desbloqueadas e em progresso. Pra quem já participa de redes sociais é visualmente similar ao que você já conhece.',
  },
  {
    q: 'O ranking é público?',
    a: 'Por padrão sim, mas você pode ocultar seu perfil do ranking nas configurações de privacidade. Conta privada não aparece em ranking público — só pra seguidores aprovados.',
  },
  {
    q: 'Quanto XP cada coisa vale exatamente?',
    a: 'Os pontos exatos por ação podem ser ajustados pela GT pra manter equilíbrio do sistema. Em geral: validar ponto vale pouco (mas é frequente), cadastrar ponto novo com foto vale mais, completar rota pública longa vale bastante. Ações que beneficiam a comunidade pesam mais.',
  },
];

export default function ExplorerPage() {
  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="Sua jornada vira progressão"
        subline="Cada km rodado, cada ponto validado, cada rota concluída soma XP. Você sobe de nível, desbloqueia conquistas, sobe no ranking regional. A comunidade GT reconhece quem realmente vive a estrada."
        primaryCta={{ label: 'Baixar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Ver planos', href: '/planos' }}
      />

      <FeatureScreenshot
        kicker="Seu perfil overlander"
        title="Visão geral, sempre à mão"
        desc="Nível atual, título conquistado (Overlander Experiente, Guia de Estrada...), próximo nível e quanto falta pra desbloquear. Stats principais visíveis: km rodados, pontos criados. Tudo num cartão limpo, sem competir com a função principal do app."
        src="/screenshots/recursos/explorer-perfil.png"
        alt="Tela do GT Explorer mostrando o perfil do overlander Rangel no nível 6 com 7.840/10.000 XP"
        bg="card"
      />

      <FeatureScreenshot
        kicker="Liga Regional"
        title="Compete com a comunidade da sua região"
        desc="Ranking por liga regional (estado + país). Você vê sua posição, quem está acima, quanto falta pra subir. Avaliações úteis, rotas concluídas — tudo conta. Cada trimestre rola reset, então sempre tem chance de subir mesmo pra quem começou tarde."
        src="/screenshots/recursos/explorer-ranking.png"
        alt="Ranking GT Explorer mostrando posição #18 na Liga Expedição Brasil"
        reverse
      />

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            O que rende XP
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans">
            Ações que constroem comunidade contam mais. Quanto mais você contribui, mais a base GT cresce — e mais você sobe junto.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ganhos.map((g) => (
              <div key={g.titulo} className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <h3 className="font-sans font-medium text-gt-text mb-2 normal-case">{g.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            Os 8 níveis da jornada
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-xl font-sans">
            De Iniciante a Mestre da Estrada. Você começa em zero — quem chega no topo já contribuiu muito.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {niveis.map((n) => (
              <div
                key={n.nv}
                className="bg-gt-card rounded-lg p-5 border border-gt-border flex flex-col"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-3xl text-gt-orange uppercase tracking-display">
                    NV {n.nv}
                  </span>
                </div>
                <h3 className="font-sans font-medium text-gt-text mb-1 normal-case leading-tight">{n.nome}</h3>
                <p className="text-xs text-gt-text-muted font-sans">{n.faixa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            Mais que XP — reputação
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans">
            GT Explorer é sistema de reputação real, não só pontuação solta. Quem sobe no ranking ganha visibilidade, vira referência regional e influencia a comunidade.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {ranking.map((r) => (
              <div key={r.titulo} className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case">{r.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            App de mapa não te reconhece. Strava reconhece corrida. GT Explorer reconhece quem vive a estrada — quem cruza fronteira, quem documenta região nova, quem ajuda outros viajantes. Sua jornada deixa de ser solo e vira história rastreável.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="explorer" />
    </>
  );
}
