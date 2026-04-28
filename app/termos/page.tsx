import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de uso',
  description:
    'Termos de uso do app e site GT Overlander. Condições para utilização dos serviços.',
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
            Última atualização: 11 de agosto de 2025
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container-narrow">
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Bem-vindo ao GT Overlander. Estes Termos de Uso estabelecem as
            condições para utilização do nosso aplicativo e site. Ao criar uma
            conta e utilizar nossos serviços, você concorda com estes termos.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            1. Objeto
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            O GT Overlander é um aplicativo voltado para viajantes terrestres,
            que oferece criação de rotas personalizadas, radar de pontos de
            interesse (waypoints) e recursos adicionais integrados ao Google
            Maps e outros serviços.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            2. Criação e Uso da Conta
          </h2>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>
              Para utilizar determinadas funcionalidades, é necessário criar
              uma conta fornecendo informações verdadeiras e atualizadas.
            </li>
            <li>
              Você é responsável por manter a confidencialidade da sua senha e
              por todas as atividades realizadas na sua conta.
            </li>
            <li>
              O uso é pessoal e intransferível. Contas compartilhadas podem
              ser suspensas sem aviso prévio.
            </li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            3. Assinaturas e Pagamentos
          </h2>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>
              Alguns recursos do app são pagos e requerem assinatura ativa.
            </li>
            <li>
              Os valores e condições estão descritos na página de planos do
              app ou site.
            </li>
            <li>
              A cobrança é recorrente, podendo ser mensal ou anual, de acordo
              com a escolha do usuário.
            </li>
            <li>
              Assinaturas podem ser canceladas a qualquer momento, respeitando
              as regras das lojas de aplicativos (Google Play ou App Store).
            </li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            4. Uso Permitido e Proibido
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-4">É proibido:</p>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>
              Utilizar o app para atividades ilegais ou que violem direitos de
              terceiros.
            </li>
            <li>
              Tentar acessar, copiar ou modificar o código-fonte ou banco de
              dados do app.
            </li>
            <li>Inserir informações falsas, enganosas ou fraudulentas.</li>
            <li>
              Usar o GT Overlander de forma que possa danificar, sobrecarregar
              ou prejudicar seu funcionamento.
            </li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            5. Propriedade Intelectual
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-4">
            Todo o conteúdo, design, marcas e funcionalidades do GT Overlander
            pertencem à GT Overlander Ltda e são protegidos por leis de
            direitos autorais e propriedade industrial.
          </p>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            É proibida a reprodução, modificação ou distribuição sem
            autorização expressa.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            6. Limitação de Responsabilidade
          </h2>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>
              O GT Overlander fornece informações e rotas com base em dados
              disponíveis e tecnologias de terceiros (Google Maps, OSM etc.).
            </li>
            <li>
              Não nos responsabilizamos por mudanças de condições de estrada,
              clima, restrições locais ou outros fatores externos.
            </li>
            <li>
              O usuário é responsável por seguir as leis de trânsito e se
              preparar adequadamente para a viagem.
            </li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            7. Privacidade e Proteção de Dados
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            O tratamento de dados pessoais segue nossa{' '}
            <a
              href="/privacidade"
              className="text-gt-orange hover:underline"
            >
              Política de Privacidade
            </a>
            . Ao utilizar o app, você concorda com a coleta e uso de dados
            conforme descrito nela.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            8. Alterações nos Termos
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Podemos alterar estes Termos a qualquer momento. A versão mais
            recente estará sempre disponível no app e no site.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            9. Legislação Aplicável e Foro
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-4">
            Estes Termos são regidos pela legislação brasileira.
          </p>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Qualquer disputa será resolvida no foro da comarca de Londrina —
            PR, Brasil.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            10. Contato
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            <strong>GT Overlander Ltda</strong>
            <br />
            CNPJ: 59.840.412/0001-82
            <br />
            E-mail:{' '}
            <a
              href="mailto:suporte@gtoverlander.com.br"
              className="text-gt-orange hover:underline"
            >
              suporte@gtoverlander.com.br
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
