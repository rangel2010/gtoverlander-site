import { getTranslations } from 'next-intl/server';
// Link do i18n, não o de 'next/link' — mantém o prefixo /es e /en.
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';

// c2 era o Help Overlander, desligado em 04/09/2026. Chaves mantidas nos JSONs
// pra quando a feature voltar — ver HELP_OVERLANDER_ATIVO.
const CARDS = [
  { icon: '🌐', chave: 'c1', href: '/recursos/gt-social' },
  { icon: '🏆', chave: 'c3', href: '/recursos/explorer' },
  { icon: '🛒', chave: 'c4', href: '/recursos/desapega' },
];

export async function PilarComunidade() {
  const t = await getTranslations('home.pilarComunidade');

  const cards = CARDS.map((c) => ({
    icon: c.icon,
    href: c.href,
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
              {/* O card inteiro é o link, não só o título: alvo grande é mais
                  fácil de acertar no celular do que um texto de uma linha. */}
              <Link
                href={card.href}
                className="bg-gt-bg rounded-xl p-7 border border-gt-border h-full relative group block hover:border-gt-orange transition-colors"
              >
                {/* Badge de status — texto vem do i18n */}
                <span className="absolute top-5 right-5 bg-gt-orange/10 text-gt-orange-text text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full font-sans border border-gt-orange/20">
                  {t('badge')}
                </span>
                {/* Ícone */}
                <span className="text-2xl mb-4 block">{card.icon}</span>
                {/* Título */}
                <h3 className="text-lg md:text-xl text-gt-text mb-2.5 pr-16 leading-snug group-hover:text-gt-orange-text transition-colors">
                  {card.titulo}
                </h3>
                {/* Descrição */}
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans mb-4">
                  {card.desc}
                </p>
                <span className="text-gt-orange-text text-sm font-medium font-sans">
                  {t('saibaMais')}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
