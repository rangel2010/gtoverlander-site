// Brevo (ex-Sendinblue) — helper pra criar/atualizar contato + adicionar a listas
// API docs: https://developers.brevo.com/reference/createcontact
//
// Tolerante a falha: se BREVO_API_KEY não estiver setada, ou API der erro,
// o erro é logado mas NÃO interrompe o fluxo principal (envio de email continua).

const BREVO_API_URL = 'https://api.brevo.com/v3';

interface CreateBrevoContactArgs {
  /** E-mail do contato (chave única) */
  email: string;
  /** Atributos customizados — chaves devem existir no Brevo (FIRSTNAME, EMPRESA, etc) */
  attributes?: Record<string, string | number | boolean | null>;
  /** IDs das listas que o contato será adicionado */
  listIds?: number[];
  /** Se true, atualiza contato existente em vez de retornar erro */
  updateEnabled?: boolean;
}

interface BrevoResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
}

/**
 * Cria ou atualiza contato no Brevo. Tolerante a falha.
 *
 * Uso típico após salvar lead num form:
 * ```
 * await createBrevoContact({
 *   email: data.email,
 *   attributes: { FIRSTNAME: data.nome, EMPRESA: data.empresa, SOURCE: 'site:/empresas' },
 *   listIds: [Number(process.env.BREVO_LIST_BUSINESS_ID)],
 * });
 * ```
 */
export async function createBrevoContact(
  args: CreateBrevoContactArgs
): Promise<BrevoResult> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    // Em dev local sem Brevo configurado, deixa passar sem barulho
    console.warn(
      '[brevo] BREVO_API_KEY não configurada — contato não enviado.'
    );
    return { ok: false, skipped: true };
  }

  const body = {
    email: args.email,
    attributes: args.attributes ?? {},
    listIds: args.listIds ?? [],
    updateEnabled: args.updateEnabled ?? true,
  };

  try {
    const res = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      console.error(
        `[brevo] Falha ao criar contato (HTTP ${res.status}):`,
        errorText
      );
      return { ok: false, error: `HTTP ${res.status}: ${errorText}` };
    }

    return { ok: true };
  } catch (err) {
    console.error('[brevo] Erro de rede ao chamar API:', err);
    return { ok: false, error: String(err) };
  }
}
