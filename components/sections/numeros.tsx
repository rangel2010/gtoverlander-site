import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';

// O slot s2 era o Help Overlander, removido em 04/09/2026 (feature desligada
// no app). Os demais mantêm a numeração original das chaves de tradução pra
// evitar renomear em três idiomas sem ganho nenhum.
const CARDS = [
  { chave: 's1', href: '/recursos/gt-social' },
  { chave: 's3', href: '/recursos/explorer' },
  { chave: 's4', href: '/recursos/desapega' },
];

export async function Numeros() {
  const t = await getTranslations('home.numeros');

  const items = CARDS.map((c) => ({
    titulo: t(`${c.chave}valor`),
    desc: t(`${c.chave}ctx`),
    href: c.href,
  }));

  return (
    <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">{t('label')}</p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-12">{t('titulo')}</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <ScrollReveal key={i.href} delay={idx * 80}>
              <Link href={i.href} className="block bg-gt-card rounded-lg p-7 border border-gt-border hover:border-gt-orange transition-colors group relative h-full">
                <span className="absolute top-5 right-5 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded font-sans">
                  {t('label')}
                </span>
                <h3 className="text-xl md:text-2xl text-gt-text mb-3 group-hover:text-gt-orange-text transition-colors pr-20">{i.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{i.desc}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <p className="text-xs text-gt-text-dim mt-10 md:mt-12 font-sans">{t('rodape')}</p>
      </div>
    </section>
  );
}
