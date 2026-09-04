import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/scroll-reveal';

// c2 era o Help Overlander, desligado em 04/09/2026. Chaves mantidas nos JSONs
// pra quando a feature voltar — ver HELP_OVERLANDER_ATIVO.
const CARDS = [
  { icon: '🌐', chave: 'c1' },
  { icon: '🏆', chave: 'c3' },
  { icon: '🛒', chave: 'c4' },
];

export async function PilarComunidade() {
  const t = await getTranslations('home.pilarComunidade');

  const cards = CARDS.map((c) => ({
    icon: c.icon,
    titulo: t(`${c.chave}titulo`),
    desc: t(`${c.chave}desc`),
  }));

  return (
    <section className="bg-gt-card py-20 md:py-28 border-t border-gt-border">
      <div className="container-wide">

        {/* Cabeçalho centralizado */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.18em] text-gt-orange-text mb-4 font-sans">
              {t('label')}
            </p>
            <h2 className="text-4xl md:text-5xl text-gt-text mb-5 leading-tight">
              {t('titulo')}
            </h2>
            <p className="text-gt-text-muted leading-relaxed font-sans max-w-xl mx-auto">
              {t('desc')}
            </p>
          </div>
        </ScrollReveal>

        {/* Grid 2x2 de cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, idx) => (
            <ScrollReveal key={card.titulo} delay={idx * 80}>
              <div className="bg-gt-bg rounded-xl p-7 border border-gt-border h-full relative group">
                {/* Badge Em breve */}
                <span className="absolute top-5 right-5 bg-gt-orange/10 text-gt-orange-text text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full font-sans border border-gt-orange/20">
                  {t('badge')}
                </span>
                {/* Ícone */}
                <span className="text-2xl mb-4 block">{card.icon}</span>
                {/* Título */}
                <h3 className="text-lg md:text-xl text-gt-text mb-2.5 pr-16 leading-snug">
                  {card.titulo}
                </h3>
                {/* Descrição */}
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Rodapé sutil */}
        <ScrollReveal delay={200}>
          <p className="text-xs text-gt-text-dim mt-10 text-center font-sans">
            {t('rodape')}
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
