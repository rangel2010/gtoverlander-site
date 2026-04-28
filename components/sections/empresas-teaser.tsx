import { Button } from '../ui/button';

export function EmpresasTeaser() {
  return (
    <section className="bg-gt-brown text-white py-16 md:py-20">
      <div className="container-wide">
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-tight">
              Você vende pra quem viaja?
            </h2>
            <p className="text-white/85 leading-relaxed max-w-xl">
              Postos, campings, pousadas, oficinas e restaurantes podem aparecer
              no mapa do GT pra viajantes que vão passar pela sua região.
              Conta Business em breve.
            </p>
          </div>
          <div className="md:text-right">
            <Button href="/empresas" variant="outline">
              Cadastre seu interesse →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
