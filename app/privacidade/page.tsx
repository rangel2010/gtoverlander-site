import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description:
    'Política de privacidade do GT Overlander, em conformidade com a LGPD.',
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
            Última atualização: 28 de abril de 2026
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container-narrow prose-content">
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Esta Política de Privacidade explica como o GT Overlander
            (&ldquo;GT&rdquo;, &ldquo;nós&rdquo;) coleta, usa, compartilha e
            protege os dados pessoais dos usuários do nosso aplicativo e site,
            em conformidade com a Lei Geral de Proteção de Dados (Lei
            13.709/2018 — LGPD).
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            1. Quem somos
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            O GT Overlander é um aplicativo de planejamento de rotas operado
            por Rangel Machado, com sede em Londrina, Paraná, Brasil. Contato:{' '}
            <a
              href="mailto:contato@gtoverlander.com.br"
              className="text-gt-orange hover:underline"
            >
              contato@gtoverlander.com.br
            </a>
            .
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            2. Quais dados coletamos
          </h2>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>
              <strong>Dados de cadastro</strong>: nome, e-mail, idioma
              preferido — quando você cria conta no app.
            </li>
            <li>
              <strong>Dados de uso</strong>: rotas criadas, paradas
              selecionadas, waypoints favoritados, configurações de
              preferência.
            </li>
            <li>
              <strong>Dados de localização</strong>: posição do dispositivo
              durante o uso ativo do app, pra calcular rotas e mostrar pontos
              próximos. Você pode desativar a qualquer momento nas
              configurações do sistema.
            </li>
            <li>
              <strong>Dados de pagamento</strong>: processados pelo Asaas (no
              Android) ou pela App Store (no iOS, quando disponível). Não
              armazenamos número de cartão.
            </li>
            <li>
              <strong>Dados técnicos</strong>: tipo de dispositivo, sistema
              operacional, versão do app, identificadores anônimos pra
              troubleshooting e melhorias.
            </li>
            <li>
              <strong>Dados de analytics no site</strong>: coletamos pageviews
              anonimizados via Plausible Analytics (sem cookies, sem
              fingerprint).
            </li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            3. Como usamos seus dados
          </h2>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>
              Pra fornecer o serviço (gerar rotas, sincronizar entre
              dispositivos, mostrar waypoints relevantes).
            </li>
            <li>Pra processar pagamentos e gerenciar sua assinatura.</li>
            <li>Pra responder seus contatos e dar suporte.</li>
            <li>
              Pra melhorar o produto — em base agregada e anonimizada, sem
              identificar você individualmente.
            </li>
          </ul>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            4. Com quem compartilhamos
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-4">
            Compartilhamos dados apenas com fornecedores essenciais à operação
            do serviço, sob contratos que garantem a proteção:
          </p>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>Asaas (processamento de pagamentos)</li>
            <li>OpenAI (geração de roteiros via IA)</li>
            <li>Microsoft Azure (hospedagem da infraestrutura)</li>
            <li>Vercel (hospedagem do site)</li>
            <li>Plausible Analytics (estatísticas anonimizadas do site)</li>
            <li>Sentry (monitoramento técnico de erros)</li>
            <li>Resend (envio de e-mails transacionais)</li>
          </ul>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Não vendemos dados pra terceiros pra fins de marketing.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            5. Seus direitos
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-4">
            Conforme a LGPD, você tem direito de:
          </p>
          <ul className="text-gt-gray-dark leading-relaxed mb-6 space-y-2 list-disc pl-6">
            <li>Confirmar que tratamos seus dados</li>
            <li>Acessar os dados que temos sobre você</li>
            <li>Corrigir dados incorretos</li>
            <li>Solicitar a exclusão dos seus dados</li>
            <li>Portar seus dados pra outro serviço</li>
            <li>Revogar consentimentos previamente concedidos</li>
          </ul>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Pra exercer qualquer direito, escreva pra{' '}
            <a
              href="mailto:contato@gtoverlander.com.br"
              className="text-gt-orange hover:underline"
            >
              contato@gtoverlander.com.br
            </a>
            . Respondemos em até 15 dias.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            6. Por quanto tempo guardamos
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Mantemos seus dados enquanto sua conta estiver ativa. Após exclusão
            de conta, removemos os dados em até 30 dias. Backups técnicos podem
            persistir por mais alguns dias por motivos de continuidade do
            serviço, mas são limitados ao mínimo necessário.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            7. Segurança
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Usamos criptografia em trânsito (HTTPS) e em repouso, controles de
            acesso baseados em função, e auditoria contínua. Mesmo assim,
            nenhum sistema é 100% inviolável — em caso de incidente, seguimos o
            protocolo da LGPD pra notificar a ANPD e os usuários afetados.
          </p>

          <h2 className="text-xl font-medium text-gt-green mt-10 mb-4">
            8. Alterações nesta política
          </h2>
          <p className="text-gt-gray-dark leading-relaxed mb-6">
            Podemos atualizar esta política conforme o produto evolui. Mudanças
            significativas serão comunicadas por e-mail ou notificação no app.
            A data da última atualização aparece no topo desta página.
          </p>

          <p className="text-sm text-gt-gray-mid italic mt-12 pt-8 border-t border-gt-green/10">
            Este documento foi redigido com base em modelo padrão LGPD e está
            sujeito a revisão por nosso departamento jurídico antes da
            publicação oficial. Em caso de dúvida sobre seus direitos, consulte
            a ANPD (gov.br/anpd) ou um advogado especializado.
          </p>
        </div>
      </section>
    </>
  );
}
