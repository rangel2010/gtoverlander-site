/**
 * GT Overlander — Fonte única de verdade do produto
 *
 * Altere AQUI quando mudar preços, limites, contagens ou status de features.
 * Componentes e JSON-LD consomem este arquivo — não editar valores diretamente neles.
 */

/**
 * Endereço do webapp — o "Acessar pelo computador" do header, do rodapé e da
 * página de download.
 *
 * Aponta pro beta desde 06/09/2026: o `app.` ainda serve a V1 e o beta já está
 * mais próximo do produto real. Na virada de domínio o beta vira `app.`, e aí
 * é trocar AQUI — ou definir WEB_APP_URL no ambiente, que sobrepõe sem deploy.
 * Ver a seção "três domínios" no CLAUDE.md do gtoverlander-app.
 */
export const WEB_APP_URL =
  process.env.WEB_APP_URL ?? 'https://beta.gtoverlander.com.br';

/**
 * Canais de acesso exibidos no site. Ambos desligados em 06/09/2026, por
 * motivos diferentes — e os dois são temporários.
 *
 * WEBAPP: o beta ainda tem páginas de marketing duplicadas e um formulário de
 * assinatura que submete sem gateway configurado, devolvendo erro justamente
 * pra quem tentou pagar. Religar quando a reorganização do beta estiver feita.
 *
 * Quem está no computador não fica sem caminho: a página /baixar tem QR code.
 */
export const MOSTRAR_WEBAPP = false;

export const MOSTRAR_IOS = true;

/**
 * Onde o empresário cria a Conta Business — todos os "Criar minha conta" do
 * site apontam pra cá. A criação mora no webapp (é lá que ele assume o ponto e
 * gerencia produtos e serviços), aberto só nessa parte desde 28/09/2026.
 * Trocar AQUI na virada de domínio, ou definir BUSINESS_SIGNUP_URL no ambiente.
 */
export const BUSINESS_SIGNUP_URL =
  process.env.BUSINESS_SIGNUP_URL ?? `${WEB_APP_URL}/business/cadastrar`;

/**
 * Desapega aberto a todos (28/09/2026, decisão do Rangel, TEMPORÁRIO): qualquer
 * conta, inclusive Free, pode anunciar usado no Shopping. Enquanto true, o site
 * não cita "anúncios" como diferença entre planos — a régua da API ainda traz
 * os números antigos, e mostrá-los diria que o Free não pode anunciar.
 * Quando o limite voltar, é trocar pra false: tabela, cards e FAQ voltam juntos.
 */
export const DESAPEGA_ABERTO_A_TODOS = true;

/**
 * A V2 subiu na App Store em 27/09/2026, fechando a janela em que o link levava
 * à versão ANTIGA do app. Enquanto isto for true, o card do iOS destaca que a
 * versão nova já está no ar, igual ao do Android. Desligar quando deixar de ser
 * novidade — algumas semanas.
 */
export const IOS_VERSAO_NOVA = true;

/**
 * A V2 subiu na Play em 06/09/2026. Enquanto isto for true, o card do Android
 * destaca que a versão nova já está no ar. Desligar quando deixar de ser
 * novidade — algumas semanas.
 */
export const ANDROID_VERSAO_NOVA = true;

export const PRODUCT = {
  // ── Base de waypoints ────────────────────────────────────────────────────
  waypointCount: 4_000_000,
  waypointCountLabel: '4M+',
  // Piso pra quando a API não responder — o valor real vem de lib/stats.ts.
  // 209 = /public/stats em 09/10/2026, depois que o acervo tirou as duplicatas
  // ("Bolivia, Plurinational State of", "Venezuela, Bolivarian Republic of").
  // Categorias e filtros não ficam mais aqui: vêm do catálogo (lib/demo/catalogo.ts).
  countries: 209,

  // ── Planos ───────────────────────────────────────────────────────────────
  plans: {
    // ATENÇÃO: estes valores são PISO, não fonte.
    //
    // O preço exibido vem da API (lib/planos.ts). Em 05/09/2026 o desconto do
    // site acabou junto com a subida do app novo: o preço de tabela passou a ser
    // o preço cobrado, e não existe mais riscado nos planos pessoais. Só a Conta
    // Business mantém "de/por" — ela está fora da régua.
    //
    // Os limites de plano (viagens, países offline, anúncios, aparelhos) saíram
    // daqui em 04/09/2026 e também vêm da API — ver
    // PLANOS_O_QUE_CADA_UM_ENTREGA.md. Não reintroduza limite neste arquivo:
    // ele volta a envelhecer calado, que foi exatamente o problema.
    free: {
      monthlyPrice: 0,
      annualPrice: 0,
    },
    plus: {
      monthlyPrice: 19.90,
      annualPrice: 199.90,
    },
    pro: {
      monthlyPrice: 29.90,
      annualPrice: 299.90,
    },
  },

  // ── Status das features ──────────────────────────────────────────────────
  features: {
    offline:          'AVAILABLE'  as const,
    social:           'AVAILABLE'  as const,
    shopping:         'AVAILABLE'  as const, // Desapega é subcategoria do Shopping desde 28/09/2026
    explorer:         'AVAILABLE'  as const,
    business:         'AVAILABLE'  as const,
    // Desligado em 04/09/2026: a feature saiu do app na V2, mas volta no
    // futuro. A página em /recursos/help-overlander continua no repo e é
    // religada trocando isto pra 'COMING_SOON' ou 'AVAILABLE' — ver
    // HELP_OVERLANDER_ATIVO em app/[locale]/recursos/help-overlander/page.tsx.
    helpOverlander:   'DISABLED'   as const,
  },

  // ── Plataformas ──────────────────────────────────────────────────────────
  platforms: {
    android:      true,
    ios:          true,
    web:          true,
    carplay:      true,
    androidAuto:  true,
  },
} as const;

// Helpers de formatação
export function formatPrice(value: number, locale = 'pt-BR'): string {
  if (value === 0) return 'R$ 0';
  return value.toLocaleString(locale, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

export function annualSavingsPct(monthly: number, annual: number): number {
  if (monthly === 0) return 0;
  return Math.round(((monthly * 12 - annual) / (monthly * 12)) * 100);
}

/**
 * Desconto do preço atual em relação ao preço cheio que passa a valer na
 * virada do app novo. É esse número que aparece no selo dos cards, no lugar
 * da antiga comparação anual-vs-mensal (que continua comunicada pelo
 * "Equivale a X por mês").
 */
export function discountPct(original: number, current: number): number {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
