import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de uso',
  description: 'Termos e condições de uso do app e site GT Overlander.',
};

export default function TermosPage() {
  return (
    <>
      <section className="bg-gt-green text-white">
        <div className="container-wide py-12 md:py-16 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-medium leading-[1.15] mb-3">
            Termos de uso
          </h1>
          <p className="text-sm text-white/70">
            Última atualização: 28 de abril de 2026
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container-narrow">
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Ao usar o GT Overlander (aplicativo móvel ou site), você concorda
            com estes Termos. Leia com atenção. Caso não concorde, não use o
            serviço.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            1. Quem oferece o serviço
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            O GT Overlander é operado por Rangel Machado, com sede em Londrina,
            Paraná, Brasil. Contato:{' '}
            <a
              href="mailto:contato@gtoverlander.com.br"
              className="text-gt-orange hover:underline"
            >
              contato@gtoverlander.com.br
            </a>
            .
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            2. O que o serviço faz
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            O GT é uma ferramenta de planejamento de rotas pra viajantes
            overlander, com geração de roteiros por IA, base própria de
            waypoints e integração com mapas convencionais. Não somos uma
            plataforma de navegação turn-by-turn — usamos integrações com
            Google Maps pra essa função.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            3. Conta e responsabilidades
          </h2>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>
              Você é responsável por manter as credenciais da sua conta em
              segurança.
            </li>
            <li>
              Você se compromete a fornecer informações verdadeiras durante o
              cadastro.
            </li>
            <li>
              Você é responsável pelas ações praticadas com sua conta.
            </li>
            <li>
              Conta de menores de 18 anos requer consentimento de responsável
              legal.
            </li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            4. Planos e pagamento
          </h2>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>
              O plano Free é gratuito sem prazo de validade, sujeito aos
              limites descritos em{' '}
              <a href="/planos" className="text-gt-orange hover:underline">
                /planos
              </a>
              .
            </li>
            <li>
              Planos Plus e Pro são pagos. A cobrança é feita pelo Asaas
              (Android) ou pela loja de aplicativos (quando disponível pra
              iOS).
            </li>
            <li>
              Você pode cancelar a qualquer momento. Sem multa de cancelamento.
              O plano segue ativo até o fim do ciclo já pago e depois volta
              automaticamente pro Free.
            </li>
            <li>
              Reajustes de preço são comunicados com no mínimo 30 dias de
              antecedência.
            </li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            5. Uso aceitável
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-4">
            Você concorda em não:
          </p>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>Usar o serviço pra atividades ilegais</li>
            <li>
              Tentar acessar dados, contas ou sistemas que não são seus
            </li>
            <li>Fazer engenharia reversa ou tentar extrair o código-fonte</li>
            <li>
              Usar bots, scrapers ou automação não autorizada pra extrair dados
              em massa
            </li>
            <li>Revender o acesso ao serviço sem autorização</li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            6. Propriedade intelectual
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            O GT Overlander, suas marcas, logo, design, código e conteúdo
            editorial são de propriedade do GT. Os roteiros que você cria,
            paradas que você adiciona e dados pessoais permanecem seus —
            licenciamos pra hospedagem e processamento conforme nossa{' '}
            <a href="/privacidade" className="text-gt-orange hover:underline">
              Política de Privacidade
            </a>
            .
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            7. Limitação de responsabilidade
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            O GT é uma ferramenta de planejamento. As decisões de viagem,
            condições da rota, segurança no trajeto e cumprimento de leis
            locais (incluindo trânsito, fronteiras e visto) são responsabilidade
            do usuário. Não nos responsabilizamos por: imprecisões em waypoints
            de terceiros, mudanças nas condições da rota após o planejamento,
            falhas de equipamento ou perda de sinal celular. Faça sempre uma
            checagem prévia das condições críticas antes de partir.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            8. Suspensão e encerramento
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Reservamos o direito de suspender ou encerrar contas que violem
            estes Termos. Em caso de encerramento por nossa parte, devolvemos
            valores proporcionais não usados (quando aplicável).
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            9. Alterações nos Termos
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Podemos atualizar estes Termos conforme o produto evolui. Mudanças
            significativas serão comunicadas por e-mail ou notificação no app
            com antecedência mínima de 30 dias. Continuar usando o serviço após
            essa comunicação implica aceitação dos novos Termos.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            10. Foro
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro
            da comarca de Londrina/PR pra dirimir quaisquer questões
            decorrentes do uso do serviço.
          </p>

          <p className="text-sm text-gt-gray-mid italic mt-12 pt-8 border-t border-gt-green/10">
            Este documento foi redigido com base em modelos padrão de Termos de
            Uso de SaaS e está sujeito a revisão por advogado especializado
            antes da publicação oficial. Recomendamos a consulta a um
            profissional jurídico em caso de dúvida sobre seus direitos.
          </p>
        </div>
      </section>
    </>
  );
}
