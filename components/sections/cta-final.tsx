import { Button } from '../ui/button';

export function CtaFinal() {
  return (
    <section className="bg-gt-bg py-20 md:py-28 border-t border-gt-border">
      <div className="container-narrow text-center">
        <h2 className="text-4xl md:text-5xl text-gt-text mb-4 leading-[0.95]">
          Sua próxima viagem começa em uma conversa
        </h2>
        <p className="text-gt-text-muted mb-10 max-w-md mx-auto leading-relaxed font-sans">
          Grátis pra começar. Premium pra quem viaja muito. Off Road pra quem
          sai do asfalto.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href="/baixar">Baixar grátis</Button>
          <Button href="/planos" variant="outline">
            Ver planos
          </Button>
        </div>
      </div>
    </section>
  );
}
