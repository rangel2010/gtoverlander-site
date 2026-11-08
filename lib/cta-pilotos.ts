/**
 * Pilotos da ponte blog → app (08/11/2026, aprovado pelo Rangel na proposta
 * claude/GT_Overlander_Site_Posicionamento_Proposta_07nov.md, v2).
 *
 * Cada piloto põe um cartão DEPOIS da resposta que a pessoa buscou, sem mexer
 * no texto, no título nem no endereço do artigo. O ponto de entrada é o título
 * de seção (##) ANTES do qual o cartão aparece. Se o título mudar no Studio, o
 * cartão simplesmente não aparece (nada quebra) — por isso conferir aqui.
 *
 * Só em português: as páginas de rota e a de waypoints são PT.
 */
export type VarianteCta = 'rota' | 'copiloto' | 'radar';

export interface PilotoCta {
  variante: VarianteCta;
  /** Texto do título "## ..." antes do qual o cartão entra. */
  antesDe: string;
  /** Nome curto da posição, vai pra medição. */
  posicao: string;
  titulo: string;
  /** Na variante 'rota', a frase é montada com os dados da rota. */
  frase?: string;
  botao: string;
  /** Destino fixo (copiloto e radar). A variante 'rota' usa a rota do artigo. */
  destino?: string;
  /** O que fazer com o cartão "Essa viagem tem rota pronta" do topo. */
  cartaoRotaTopo: 'manter' | 'ocultar' | 'fim';
}

export const PILOTOS: Record<string, PilotoCta> = {
  'pedagios-uruguai-como-passar': {
    variante: 'rota',
    antesDe: 'Onde estão os pedágios que importam',
    posicao: 'apos-resposta',
    titulo: 'Vai rodar o Uruguai?',
    botao: 'Ver a rota do Uruguai',
    cartaoRotaTopo: 'ocultar',
  },
  'rota-biker-monumentos-mototurismo-brasil': {
    variante: 'copiloto',
    antesDe: 'Por que isso importa pro mototurismo brasileiro',
    posicao: 'apos-roteiro',
    titulo: 'Quer juntar carimbos numa viagem só?',
    frase:
      'Conte ao Copiloto do GT de onde você sai e por quais cidades quer passar: ele monta o trajeto e você adiciona as paradas do caminho.',
    botao: 'Planejar meu passeio de moto',
    destino: '/baixar',
    cartaoRotaTopo: 'fim',
  },
  'dormir-dentro-do-carro-e-seguro-o-que-diz-a-lei': {
    variante: 'radar',
    antesDe: 'Perguntas frequentes',
    posicao: 'apos-onde-parar',
    titulo: 'Onde parar esta noite?',
    frase:
      'O Radar do GT mostra postos, campings e áreas de descanso perto de você, com o que outros viajantes já contaram sobre cada lugar.',
    botao: 'Ver pontos perto de mim',
    destino: '/recursos/waypoints',
    cartaoRotaTopo: 'manter',
  },
};

/** Divide o markdown logo antes da linha "## <titulo>". null se não achar. */
export function dividirAntesDoTitulo(md: string, titulo: string): [string, string] | null {
  if (!md) return null;
  const linhas = md.split('\n');
  const i = linhas.findIndex((l) => /^##\s+/.test(l) && l.replace(/^##\s+/, '').trim() === titulo.trim());
  if (i < 0) return null;
  return [linhas.slice(0, i).join('\n'), linhas.slice(i).join('\n')];
}
