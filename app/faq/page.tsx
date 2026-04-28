import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Perguntas frequentes',
  description:
    'Dúvidas mais comuns sobre o GT Overlander — o app, como funciona, planos, conta e dados, Conta Business.',
};

interface FaqCategory {
  titulo: string;
  perguntas: { q: string; a: string }[];
}

const categorias: FaqCategory[] = [
  {
    titulo: 'Sobre o app',
    perguntas: [
      {
        q: 'O que é o GT Overlander?',
        a: 'É um app de planejamento de rotas pra viajantes overlander — quem viaja de carro, moto e veículo 4x4 por longas distâncias. Você descreve a viagem em linguagem natural pra uma IA que monta o roteiro com paradas, contexto regional e opções de trajeto.',
      },
      {
        q: 'Em quais plataformas funciona?',
        a: 'iOS (iPhone e iPad), Android (celular e tablet), com integração nativa pra Apple CarPlay e Android Auto. Tudo sincronizado entre dispositivos.',
      },
      {
        q: 'Em quais idiomas?',
        a: 'Português, inglês e espanhol. Você descreve a viagem no idioma que preferir.',
      },
      {
        q: 'Custa quanto?',
        a: 'O plano Free é grátis pra sempre — não é trial. Plus a partir de R$ 14,90/mês ou R$ 79,90/ano. Pro a partir de R$ 19,90/mês ou R$ 99,90/ano. Veja todos os planos em /planos.',
      },
      {
        q: 'O GT funciona em qualquer país?',
        a: 'A base de waypoints cobre 209 países nos 6 continentes habitados. O motor de IA gera rotas pro mundo todo. Cobertura regional pode variar conforme densidade de pontos na área.',
      },
    ],
  },
  {
    titulo: 'Como funciona',
    perguntas: [
      {
        q: 'Como a IA gera as rotas?',
        a: 'Você descreve sua viagem em linguagem natural — destino, dias, ritmo, perfil. A IA monta a espinha dorsal do trajeto em segundos. Daí você refina, personaliza e adiciona paradas. Você no controle, sempre.',
      },
      {
        q: 'O que é Modo Off Road?',
        a: 'Em breve. Vai permitir você desenhar suas próprias rotas off-road ligando os waypoints da nossa base num mapa interativo dedicado a trilhas. Universal pra todos os planos, com limites de execução por mês.',
      },
      {
        q: 'O que é Modo Offline?',
        a: 'Em breve. Use o GT em qualquer lugar do mundo, sem depender de sinal. Universal pra Free, Plus e Pro.',
      },
      {
        q: 'Funciona com CarPlay e Android Auto?',
        a: 'Sim, integração nativa. Você planeja a viagem no celular, conecta no carro, e tudo continua funcionando na tela do veículo.',
      },
      {
        q: 'Os waypoints são confiáveis?',
        a: 'Os dados vêm de fontes consolidadas (OpenStreetMap, iOverlander, MaCamp) processadas e classificadas pelo time GT. Em construção: validação por comunidade — overlanders contribuindo e validando pontos.',
      },
    ],
  },
  {
    titulo: 'Planos e pagamento',
    perguntas: [
      {
        q: 'Posso testar antes de assinar?',
        a: 'Free não é trial. Você usa o GT grátis pra sempre, com Standard Free de IA, todos os waypoints, CarPlay e Android Auto. 1 rota a cada 90 dias e 1 consulta de radar por dia. Quando precisar de mais, sobe pra Plus ou Pro.',
      },
      {
        q: 'Posso cancelar quando quiser?',
        a: 'Sim, sem multa. O plano segue ativo até o fim do ciclo já pago e depois volta pro Free automaticamente. Suas rotas e configurações ficam guardadas — não são apagadas.',
      },
      {
        q: 'Tenho assinatura no iOS?',
        a: 'Hoje a assinatura está disponível só no Android (via Asaas). A assinatura no iOS está em desenvolvimento. Quando estiver pronta, todos os planos ficam disponíveis nas duas plataformas.',
      },
      {
        q: 'Qual a diferença entre Plus e Pro?',
        a: 'Mesmas features de IA e de Off Road. A diferença está em quotas: Plus tem 2 rotas/mês e 5 consultas radar/dia. Pro é ilimitado.',
      },
    ],
  },
  {
    titulo: 'Conta e dados',
    perguntas: [
      {
        q: 'Como vocês tratam meus dados?',
        a: 'Conforme LGPD. Coletamos só o necessário pra rodar o app: e-mail pra autenticação, rotas que você cria pra sincronizar entre dispositivos, dados de pagamento via Asaas (não armazenamos cartão). Veja a política completa em /privacidade.',
      },
      {
        q: 'Posso excluir minha conta?',
        a: 'Sim. No app, vai em Perfil → Configurações → Excluir conta. Suas rotas e dados pessoais são removidos em até 30 dias. Backups técnicos podem ficar mais alguns dias por questões de continuidade do serviço.',
      },
      {
        q: 'Posso usar o GT sem criar conta?',
        a: 'Você pode baixar e abrir o app sem conta, mas pra salvar rotas, sincronizar entre dispositivos e usar a IA, precisa criar conta com e-mail.',
      },
    ],
  },
  {
    titulo: 'Empresas',
    perguntas: [
      {
        q: 'Tenho um posto / camping / pousada. Como aparecer no GT?',
        a: 'A Conta Business está em desenvolvimento. Quando lançar, qualquer estabelecimento na rota dos viajantes (postos, campings, pousadas, oficinas, restaurantes) poderá criar perfil e aparecer pra quem passa na região. Cadastre-se na lista de espera em /empresas.',
      },
      {
        q: 'Quanto vai custar a Conta Business?',
        a: 'O modelo está sendo finalizado. Vai ser self-service e ROI mensurável (você acompanha quantos viajantes passaram, viram seu perfil, foram até você).',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-12 md:py-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl leading-[1.05] mb-3">
            Perguntas frequentes
          </h1>
          <p className="text-base text-gt-text-muted font-sans">
            As dúvidas mais comuns sobre o GT Overlander. Não achou a sua?{' '}
            <Link
              href="/contato"
              className="text-gt-text underline underline-offset-4 hover:text-gt-orange"
            >
              fala com a gente
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-12 md:py-16 border-t border-gt-border">
        <div className="container-narrow space-y-10">
          {categorias.map((cat) => (
            <div key={cat.titulo}>
              <h2 className="text-2xl md:text-3xl text-gt-text mb-5 pb-3 border-b border-gt-border">
                {cat.titulo}
              </h2>
              <div className="space-y-3">
                {cat.perguntas.map((p, i) => (
                  <details
                    key={i}
                    className="group bg-gt-card border border-gt-border rounded-lg overflow-hidden"
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
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-16 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl text-gt-text mb-3">
            Não achou sua dúvida?
          </h2>
          <p className="text-gt-text-muted mb-6 font-sans">
            Nossa equipe responde em horário comercial.
          </p>
          <Button href="/contato" variant="secondary">
            Falar com a gente
          </Button>
        </div>
      </section>
    </>
  );
}
