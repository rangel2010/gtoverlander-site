import { Button } from '../ui/button';

export function Hero() {
  return (
    <section className="bg-gt-bg text-gt-text relative overflow-hidden">
      <div className="container-wide grid md:grid-cols-2 gap-10 md:gap-12 items-center py-16 md:py-24 lg:py-28 relative">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-5 font-sans">
            O ecossistema do viajante overland
          </p>

          {/*
            TODO: H1 final ainda a definir com Rangel.
            3 opções no spec §4.1, derivadas da mescla F+B:
            1. "Seu parceiro de roteiros personalizados pra qualquer estrada"  ← usado aqui
            2. "Roteiros personalizados, seu parceiro em qualquer estrada"
            3. "Roteiros personalizados pra qualquer viagem — parceiro em qualquer estrada"
          */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 max-w-2xl">
            Seu parceiro de roteiros personalizados{' '}
            <span className="text-gt-orange">pra qualquer estrada</span>
          </h1>

          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed max-w-md mb-8 font-sans">
            Descreva sua viagem em linguagem natural. A gente monta a espinha
            dorsal do trajeto e você personaliza com paradas, postos, hotéis e
            campings.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="/baixar">Baixar grátis</Button>
            <Button href="#como-funciona" variant="secondary">
              Como funciona
            </Button>
          </div>

          <p className="text-[11px] uppercase tracking-[0.15em] text-gt-text-dim mt-8 font-sans">
            App Store · Play Store · CarPlay · Android Auto
          </p>
        </div>

        <div className="hidden md:flex justify-center">
          {/* Screenshot real da home do app GT Overlander */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/screenshots/app-home.jpg"
            alt="Tela inicial do app GT Overlander mostrando a saudação ao usuário, hero com Jeep na estrada e botão Comece um novo roteiro"
            className="max-h-[640px] w-auto rounded-3xl border border-gt-border shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
