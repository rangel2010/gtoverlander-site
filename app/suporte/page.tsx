import type { Metadata } from 'next';
import Link from 'next/link';
import { SupportForm } from '@/components/sections/support-form';

export const metadata: Metadata = {
  title: 'Suporte',
  description:
    'Centro de ajuda do GT Overlander. Tópicos populares, FAQ aprofundado e abertura de ticket — pra resolver seu problema rápido.',
};

const topicosPopulares = [
  {
    titulo: 'Não consigo entrar na minha conta',
    desc: 'Recuperação de senha, problemas de login, e-mail não chega.',
  },
  {
    titulo: 'Cancelei e ainda foi cobrado',
    desc: 'Cobrança após cancelamento, ciclo de billing, reembolso.',
  },
  {
    titulo: 'App travando ou com erro',
    desc: 'Crash, tela branca, função que não funciona.',
  },
  {
    titulo: 'Como assinar Pro / Plus',
    desc: 'Como fazer upgrade, formas de pagamento aceitas.',
  },
  {
    titulo: 'Como cancelar minha assinatura',
    desc: 'Cancelamento direto, prazo, o que acontece com suas rotas.',
  },
  {
    titulo: 'A IA gerou rota com erro',
    desc: 'Endereço errado, parada inexistente, rota sem sentido.',
  },
];

const faqAprofundado = [
  {
    q: 'Não estou recebendo o e-mail de redefinição de senha',
    a: 'Verifique a pasta de spam. Se não chegar em 10 minutos, abre um ticket abaixo informando o e-mail da conta — a gente reseta manualmente.',
  },
  {
    q: 'O app travou no meio de uma viagem',
    a: 'Tenta forçar fechar e reabrir o app. Se persistir, abre ticket informando: marca/modelo do celular, sistema operacional e versão, versão do app, e o que estava fazendo no momento do trava.',
  },
  {
    q: 'Cancelei a assinatura mas continua aparecendo como Pro',
    a: 'O plano fica ativo até o fim do ciclo já pago. Depois disso volta automaticamente pro Free. Se passou desse prazo e ainda aparece como Pro, abre ticket que verificamos.',
  },
  {
    q: 'Comprei Pro pelo Google Play e não foi liberado',
    a: 'Pode ser delay de sincronização entre Google Play e nosso servidor. Aguarda 30 minutos. Se persistir, abre ticket com print do recibo do Google Play.',
  },
  {
    q: 'Quero excluir minha conta',
    a: 'No app: Perfil → Configurações → Excluir conta. Suas rotas e dados pessoais são removidos em até 30 dias. Backups técnicos podem ficar mais alguns dias por questão de continuidade do serviço.',
  },
  {
    q: 'A rota da IA me mandou pra um lugar fechado',
    a: 'IA pode errar — por isso o passo de revisão é parte do fluxo. Mesmo assim, abre ticket com o roteiro problemático: a gente usa pra melhorar o motor.',
  },
];

export default function SuportePage() {
  return (
    <>
      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-16 md:py-20 max-w-3xl">
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-5">
            Suporte
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            Resolve dúvidas comuns abaixo, ou abre um ticket que a gente
            responde em até 24 horas em dias úteis.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Tópicos populares
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            Comece olhando se sua dúvida cai em algum dos casos abaixo.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicosPopulares.map((t) => (
              <div
                key={t.titulo}
                className="bg-gt-card rounded-lg p-5 border border-gt-border"
              >
                <h3 className="font-sans font-medium text-gt-text mb-2 normal-case">
                  {t.titulo}
                </h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Perguntas frequentes
          </h2>
          <p className="text-gt-text-muted mb-10 font-sans">
            Respostas mais detalhadas pra problemas técnicos comuns.
          </p>

          <div className="space-y-3">
            {faqAprofundado.map((p, i) => (
              <details
                key={i}
                className="group bg-gt-bg border border-gt-border rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                  <span className="font-sans font-medium text-gt-text pr-4">
                    {p.q}
                  </span>
                  <span className="text-gt-orange flex-shrink-0 text-xl leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gt-text-muted leading-relaxed font-sans">
                  {p.a}
                </div>
              </details>
            ))}
          </div>

          <p className="text-sm text-gt-text-muted mt-8 font-sans">
            Não achou? Veja também o{' '}
            <Link href="/faq" className="text-gt-orange hover:underline">
              FAQ geral
            </Link>{' '}
            ou abra um ticket abaixo.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
            Não resolveu? Abra um ticket
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Conta o que aconteceu
          </h2>
          <p className="text-gt-text-muted mb-10 font-sans">
            Quanto mais detalhe você der (versão do app, marca do celular, em
            que tela aconteceu), mais rápido a gente resolve.
          </p>

          <SupportForm />

          <p className="text-xs text-gt-text-dim mt-8 font-sans">
            Antes de abrir ticket de problema técnico, atualize o app pra
            versão mais recente — boa parte dos problemas se resolve assim.
          </p>
        </div>
      </section>
    </>
  );
}
