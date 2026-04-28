import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description:
    'Política de privacidade do GT Overlander, em conformidade com a LGPD (Lei nº 13.709/2018) e GDPR.',
};

export default function PrivacidadePage() {
  return (
    <>
      <section className="bg-gt-green text-white">
        <div className="container-wide py-12 md:py-16 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-medium leading-[1.15] mb-3">
            Política de privacidade
          </h1>
          <p className="text-sm text-white/70">
            Última atualização: 11 de agosto de 2025
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container-narrow">
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            O GT Overlander respeita sua privacidade e está comprometido em
            proteger os seus dados pessoais. Esta política explica como
            coletamos, usamos, armazenamos e compartilhamos suas informações,
            bem como seus direitos previstos na Lei Geral de Proteção de Dados
            (LGPD — Lei nº 13.709/2018) e no Regulamento Geral de Proteção de
            Dados da União Europeia (GDPR).
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            1. Informações que Coletamos
          </h2>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>
              <strong>Dados de conta:</strong> nome, e-mail, foto de perfil
              (opcional) e senha.
            </li>
            <li>
              <strong>Dados de uso:</strong> interações com o app, histórico
              de rotas criadas, preferências de viagem.
            </li>
            <li>
              <strong>Dados de localização:</strong> coletados apenas com sua
              permissão, para gerar rotas e exibir pontos próximos (waypoints).
            </li>
            <li>
              <strong>Dados de pagamento:</strong> processados por parceiros
              de pagamento seguro (não armazenamos os dados completos do seu
              cartão).
            </li>
            <li>
              <strong>Comunicações:</strong> mensagens enviadas ao nosso
              suporte ou feedbacks.
            </li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            2. Como Utilizamos Seus Dados
          </h2>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>Criar e gerenciar sua conta.</li>
            <li>Gerar rotas e exibir pontos de interesse relevantes.</li>
            <li>
              Melhorar a experiência no app e desenvolver novas
              funcionalidades.
            </li>
            <li>Processar pagamentos e assinaturas.</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
            <li>
              Enviar comunicações importantes (como mudanças nos termos ou
              avisos de segurança).
            </li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            3. Compartilhamento de Informações
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-4">
            Podemos compartilhar seus dados apenas nas seguintes situações:
          </p>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>
              Com prestadores de serviço (como processadores de pagamento e
              provedores de hospedagem) que atuam em nosso nome e seguem
              nossas instruções.
            </li>
            <li>Por exigência legal ou decisão judicial.</li>
            <li>
              Com seu consentimento explícito para integrações ou serviços
              adicionais.
            </li>
          </ul>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Não vendemos, alugamos ou comercializamos seus dados pessoais.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            4. Armazenamento e Segurança
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Adotamos medidas técnicas e organizacionais para proteger suas
            informações contra acesso não autorizado, perda ou uso indevido.
            Seus dados são armazenados em servidores seguros localizados no
            Brasil e/ou em outros países com proteção equivalente.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            5. Seus Direitos
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-4">
            Você pode, a qualquer momento:
          </p>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>Acessar, corrigir ou atualizar seus dados.</li>
            <li>Solicitar a exclusão da sua conta e informações pessoais.</li>
            <li>Revogar consentimentos concedidos.</li>
            <li>Solicitar informações sobre como tratamos seus dados.</li>
          </ul>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Para exercer seus direitos, entre em contato pelo e-mail:{' '}
            <a
              href="mailto:suporte@gtoverlander.com.br"
              className="text-gt-orange hover:underline"
            >
              suporte@gtoverlander.com.br
            </a>
            .
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            6. Uso de Cookies e Tecnologias Semelhantes
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-4">
            Utilizamos cookies e tecnologias de rastreamento para:
          </p>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>Melhorar o desempenho e a funcionalidade do app.</li>
            <li>Entender o uso e comportamento dos usuários.</li>
            <li>Personalizar conteúdo e ofertas.</li>
          </ul>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Você pode gerenciar suas preferências de cookies nas configurações
            do seu navegador ou dispositivo.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            7. Alterações nesta Política
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Podemos atualizar esta política periodicamente. A versão mais
            recente estará sempre disponível no app e no site, indicando a
            data da última atualização.
          </p>
        </div>
      </section>
    </>
  );
}
