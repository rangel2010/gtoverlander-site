import { Button } from '../ui/button';

export function EmpresasTeaser() {
  return (
    <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
              Conta Business — em breve
            </p>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-4 leading-tight">
              Quer aparecer pra quem já decidiu viajar?
            </h2>
            <p className="text-gt-text-muted leading-relaxed max-w-xl font-sans">
              Postos, campings, pousadas, oficinas e restaurantes ganham
              visibilidade pra viajantes que já decidiram passar pela sua região.
            </p>
          </div>
          <div className="md:text-right">
            <Button href="/empresas" variant="secondary">
              Quero saber mais →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
