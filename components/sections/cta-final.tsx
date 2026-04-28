import { Button } from '../ui/button';

export function CtaFinal() {
  return (
    <section className="bg-gt-green text-white py-20 md:py-28">
      <div className="container-narrow text-center">
        <h2 className="text-3xl md:text-4xl font-medium mb-4 leading-tight">
          Sua próxima viagem começa em uma conversa
        </h2>
        <p className="text-white/75 mb-10 max-w-md mx-auto leading-relaxed">
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
