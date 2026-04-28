import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/sections/contact-form';

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Fale com a equipe GT Overlander. Suporte, parcerias, imprensa, dúvidas comerciais — todos os canais reunidos numa só página.',
};

export default function ContatoPage() {
  return (
    <>
      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-16 md:py-20 max-w-3xl">
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-5">
            Fala com a gente
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            Manda mensagem por aqui, ou usa um dos canais diretos abaixo.
            Respondemos em horário comercial.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <div className="grid md:grid-cols-[1fr_320px] gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl text-gt-text mb-8">
                Mande sua mensagem
              </h2>
              <ContactForm />
            </div>

            <aside className="space-y-8">
              <div>
                <h3 className="font-sans text-sm font-medium text-gt-text-muted uppercase tracking-wider mb-3">
                  Canais diretos
                </h3>
                <a
                  href="mailto:suporte@gtoverlander.com.br"
                  className="text-gt-text hover:text-gt-orange transition-colors font-sans block mb-1"
                >
                  suporte@gtoverlander.com.br
                </a>
                <p className="text-sm text-gt-text-muted font-sans">
                  E-mail principal pra qualquer assunto
                </p>
              </div>

              <div>
                <h3 className="font-sans text-sm font-medium text-gt-text-muted uppercase tracking-wider mb-3">
                  Tem dúvida sobre o app?
                </h3>
                <Link
                  href="/suporte"
                  className="text-gt-text hover:text-gt-orange transition-colors font-sans block mb-1"
                >
                  Ir pro suporte →
                </Link>
                <p className="text-sm text-gt-text-muted font-sans">
                  FAQ, tópicos populares e abertura de ticket
                </p>
              </div>

              <div>
                <h3 className="font-sans text-sm font-medium text-gt-text-muted uppercase tracking-wider mb-3">
                  Empresas
                </h3>
                <Link
                  href="/empresas"
                  className="text-gt-text hover:text-gt-orange transition-colors font-sans block mb-1"
                >
                  Conta Business →
                </Link>
                <p className="text-sm text-gt-text-muted font-sans">
                  Pra estabelecimentos que querem aparecer no mapa
                </p>
              </div>

              <div>
                <h3 className="font-sans text-sm font-medium text-gt-text-muted uppercase tracking-wider mb-3">
                  Empresa
                </h3>
                <p className="text-sm text-gt-text font-sans">
                  GT Overlander Ltda
                </p>
                <p className="text-sm text-gt-text-muted font-sans">
                  CNPJ 59.840.412/0001-82
                </p>
                <p className="text-sm text-gt-text-muted font-sans">
                  Londrina, PR — Brasil
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
