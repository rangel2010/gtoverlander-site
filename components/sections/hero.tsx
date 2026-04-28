import { Button } from '../ui/button';

export function Hero() {
  return (
    <section className="bg-gt-green text-white">
      <div className="container-wide grid md:grid-cols-2 gap-10 md:gap-12 items-center py-16 md:py-24 lg:py-28">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/60 mb-5">
            O ecossistema do viajante overland
          </p>

          {/*
            TODO: H1 final ainda a definir com Rangel.
            3 opções no spec §4.1, derivadas da mescla F+B:
            1. "Seu parceiro de roteiros personalizados pra qualquer estrada"  ← usado aqui
            2. "Roteiros personalizados, seu parceiro em qualquer estrada"
            3. "Roteiros personalizados pra qualquer viagem — parceiro em qualquer estrada"
          */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-medium leading-[1.1] mb-6 max-w-xl">
            Seu parceiro de roteiros personalizados pra qualquer estrada
          </h1>

          <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-md mb-8">
            Descreva sua viagem em linguagem natural. A gente monta a espinha dorsal do trajeto e você personaliza com paradas, postos, hotéis e campings.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="/baixar">Baixar grátis</Button>
            <Button href="#como-funciona" variant="outline">
              Como funciona
            </Button>
          </div>

          <p className="text-[11px] uppercase tracking-[0.15em] text-white/55 mt-8">
            App Store · Play Store · CarPlay · Android Auto
          </p>
        </div>

        <div className="hidden md:block">
          {/* Placeholder pro mockup do app — substituir por screenshot real na fase de assets */}
          <div className="aspect-[3/4] max-w-[360px] mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
            <p className="text-white/40 text-sm text-center px-8">
              Mockup do app
              <br />
              <span className="text-xs">(screenshot real entra aqui)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
