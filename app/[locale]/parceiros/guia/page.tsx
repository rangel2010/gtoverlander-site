import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BUSINESS_SIGNUP_URL } from '@/lib/product-config';

/**
 * Guia rápido do parceiro (05/10/2026): www.gtoverlander.com.br/parceiros/guia
 *
 * Passo a passo do painel da Conta Business, com os prints do Rangel. Mesmo
 * conteúdo do PDF (public/parceiros/guia-do-parceiro-gt-overlander.pdf), que é
 * o que vai pelo WhatsApp. Mudou o painel: atualizar os dois juntos.
 * Fora do Google, igual ao convite. O convite aponta pra cá.
 */

export const metadata: Metadata = {
  title: { absolute: 'Guia rápido do parceiro · GT Overlander' },
  description: 'Passo a passo para colocar seu negócio no mapa e publicar produtos e serviços na vitrine do GT Overlander.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.gtoverlander.com.br/parceiros/guia' },
};

const PDF = '/parceiros/guia-do-parceiro-gt-overlander.pdf';
const CTA_URL = `${BUSINESS_SIGNUP_URL}?utm_source=guia`;
const LARANJA = '#E06226';
const LARANJA_TEXTO = '#b84916';

type Marca = { x: number; y: number };
interface Passo {
  titulo: string;
  intro: React.ReactNode;
  img: string;
  alt: string;
  /** largura máxima do print no computador (prints em pé ficam mais estreitos) */
  largura?: string;
  marcas: Marca[];
  itens: React.ReactNode[];
  aviso?: React.ReactNode;
}

const B = ({ children }: { children: React.ReactNode }) => <strong className="text-[#122E1F]">{children}</strong>;

const PASSOS: Passo[] = [
  {
    titulo: 'Entre ou crie a sua conta',
    intro: 'Abra o link do convite. Se você já usa o app GT Overlander, entre com o mesmo e-mail. Se é a primeira vez, crie a conta em poucos segundos.',
    img: 'g01-entrar.jpg',
    alt: 'Tela de entrada do painel',
    largura: 'max-w-md',
    marcas: [{ x: 81, y: 86 }, { x: 22, y: 71 }],
    itens: [
      <><B>Primeira vez?</B> Clique em <B>Criar conta</B> e preencha e-mail e senha.</>,
      <><B>Mais rápido:</B> entre com sua conta do <B>Google</B> ou da <B>Apple</B>, sem criar senha nova.</>,
    ],
    aviso: <><b style={{ color: LARANJA_TEXTO }}>Dica:</b> use o e-mail da empresa, que outras pessoas da equipe também acessam. Assim a loja não fica presa ao e-mail pessoal de ninguém.</>,
  },
  {
    titulo: 'Conheça o seu painel',
    intro: 'Tudo da sua loja fica numa tela só, dividida em três blocos. Clique no título de cada bloco para abrir ou fechar.',
    img: 'g02-painel.jpg',
    alt: 'Painel Business',
    marcas: [{ x: 6, y: 26 }, { x: 6, y: 38.5 }, { x: 6, y: 75 }, { x: 36, y: 56 }, { x: 72, y: 16.8 }],
    itens: [
      <><B>Pontos no mapa:</B> o seu negócio no mapa do app, com endereço, contato e fotos.</>,
      <><B>Produtos na vitrine:</B> o que você vende. <B>+ Novo produto</B> cadastra; <B>Minhas ofertas</B> mostra os publicados.</>,
      <><B>Serviços e expedições:</B> oficina, instalação, guia, passeio. Mesmo jeito: <B>+ Novo serviço</B>.</>,
      <><B>Seus números:</B> quantas vezes seus itens apareceram, quantos abriram a ficha e quantos foram até a sua loja.</>,
      <><B>Marca e Cupons:</B> o logo e a cor da loja, e os cupons de desconto.</>,
    ],
  },
  {
    titulo: 'Coloque o seu negócio no mapa',
    intro: 'Muita loja, oficina e pousada já está no mapa do app. Antes de cadastrar, procure pelo nome: se achar, você assume o ponto que já existe.',
    img: 'g03-mapa.jpg',
    alt: 'Tela Colocar no mapa',
    marcas: [{ x: 51, y: 44 }, { x: 24, y: 55 }, { x: 50, y: 78.6 }],
    itens: [
      <><B>Digite o nome do seu negócio.</B> Se ele aparecer na lista, escolha e assuma. Ele já chega com as avaliações que a comunidade deixou, e você passa a corrigir nome, categoria, contato e facilidades.</>,
      <><B>Ou toque num pino do mapa</B> para ver quem é. Reconheceu o seu lugar? Também dá para assumir por ali.</>,
      <><B>Não achou?</B> Clique em <B>Não é nenhum desses, cadastrar o meu</B> e marque o seu ponto no mapa.</>,
    ],
    aviso: <><b style={{ color: LARANJA_TEXTO }}>Atenção:</b> um ponto cadastrado hoje só aparece na busca por nome depois da próxima atualização do mapa, que acontece às 6h10 e às 18h10.</>,
  },
  {
    titulo: 'Deixe a loja com a sua cara',
    intro: <>No painel, clique em <B>Marca</B>. É aqui que o viajante reconhece você na vitrine.</>,
    img: 'g09-marca.jpg',
    alt: 'Tela A marca da sua loja',
    largura: 'max-w-md',
    marcas: [{ x: 34, y: 51 }, { x: 3, y: 76 }, { x: 21, y: 94.5 }],
    itens: [
      <><B>Logo:</B> aparece no topo da ficha da loja, ao lado do nome. Use imagem quadrada, em JPG, PNG ou WEBP.</>,
      <><B>Cor da marca:</B> pinta o topo da ficha e o seu selo. Se você tiver um ponto em destaque no mapa, ela pinta o pino também. Sem cor própria? Deixe marcado o laranja do GT.</>,
      <><B>Salvar.</B> Pronto.</>,
    ],
  },
  {
    titulo: 'Cadastre um produto',
    intro: <>No painel, em <B>Produtos na vitrine</B>, clique em <B>+ Novo produto</B>. O que você preenche aqui é o que o viajante vê no app.</>,
    img: 'g05-produto.jpg',
    alt: 'Tela Novo produto',
    largura: 'max-w-md',
    marcas: [{ x: 4, y: 48.8 }, { x: 4, y: 66 }, { x: 4, y: 94 }],
    itens: [
      <><B>Nome do produto:</B> claro, do jeito que o cliente procuraria. Ex.: &quot;Barraca de teto para caminhonete, 2 pessoas&quot;.</>,
      <><B>Categoria:</B> é a gaveta em que a oferta aparece na vitrine. Escolha a mais próxima do item.</>,
      <><B>O que é, e para quem serve:</B> material, medidas, o que acompanha, em que veículos encaixa, garantia. Depois é só seguir o formulário até o fim, com fotos e os demais dados, e publicar.</>,
    ],
  },
  {
    titulo: 'Cadastre um serviço ou expedição',
    intro: <>Passeio, aluguel de equipamento, oficina ou instalação: no bloco <B>Serviços e expedições</B>, clique em <B>+ Novo serviço</B>. O caminho é o mesmo do produto.</>,
    img: 'g06-servico.jpg',
    alt: 'Tela Novo serviço',
    largura: 'max-w-md',
    marcas: [{ x: 4, y: 45 }, { x: 4, y: 57.5 }, { x: 4, y: 76 }],
    itens: [
      <><B>Nome do serviço:</B> se for expedição, coloque o destino e a data no nome. Ex.: &quot;Expedição Chapada dos Veadeiros, 12 a 19 de outubro&quot;.</>,
      <><B>Categoria:</B> Passeios e expedições, Aluguel de equipamento, Oficina e instalação ou Outros serviços.</>,
      <><B>O que está incluído:</B> roteiro, duração, tamanho do grupo, nível de dificuldade e o que a pessoa precisa levar. Depois, fotos e os demais dados, e publicar.</>,
    ],
  },
  {
    titulo: 'Cuide das suas ofertas',
    intro: <>Em <B>Minhas ofertas</B> ficam todos os itens publicados, separados em produtos e serviços. Dá para mudar tudo a qualquer hora.</>,
    img: 'g07-ofertas.jpg',
    alt: 'Tela Minhas ofertas',
    marcas: [{ x: 80, y: 29.6 }, { x: 3, y: 40 }, { x: 3, y: 83 }, { x: 32, y: 83 }, { x: 52, y: 83 }],
    itens: [
      <><B>Nova oferta:</B> atalho para cadastrar outro produto ou serviço.</>,
      <><B>Produtos e Serviços:</B> troque de aba para ver cada lista.</>,
      <><B>Editar</B> muda texto, foto e preço. <B>Pausar</B> tira da vitrine sem perder o cadastro. <B>Clonar</B> copia o item para criar outro parecido.</>,
      <><B>Destacada:</B> coloca o item em evidência na vitrine.</>,
      <><B>Cupom:</B> escolha um cupom seu e clique em <B>Anexar</B> para ligar o desconto a este item.</>,
    ],
    aviso: <><b style={{ color: LARANJA_TEXTO }}>Até a inauguração</b> os números do painel ficam em zero: suas ofertas já estão guardadas e prontas, mas a vitrine só abre para os viajantes no dia 9. <b style={{ color: LARANJA_TEXTO }}>Prefira Pausar a Apagar</b> quando quiser tirar um item do ar por um tempo.</>,
  },
  {
    titulo: 'Crie um cupom de desconto',
    intro: <>Um cupom é um bom motivo para o viajante escolher você. No painel, clique em <B>Cupons</B>.</>,
    img: 'g08-cupons.jpg',
    alt: 'Tela Meus cupons',
    marcas: [{ x: 71, y: 39 }, { x: 2.5, y: 55 }, { x: 73, y: 73 }],
    itens: [
      <><B>Novo cupom:</B> crie o código, o desconto e até quando ele vale.</>,
      <><B>Escolha onde ele aparece.</B> O cupom não entra sozinho na vitrine: você decide se vale para todos os seus itens, para a página da loja ou só para alguns, item por item, em Minhas ofertas.</>,
      <><B>Editar, Pausar:</B> mude ou tire o cupom do ar quando quiser.</>,
    ],
    aviso: <><b style={{ color: LARANJA_TEXTO }}>Importante:</b> o GT Overlander mostra o código para o viajante. Quem aplica o desconto é você, na sua loja, no momento da venda.</>,
  },
];

const ANTES = [
  { ic: '💻', t: 'Use o computador', d: 'O painel do parceiro funciona melhor numa tela grande. Dá para fazer pelo celular, mas no computador você enxerga o formulário inteiro.' },
  { ic: '📸', t: 'Fotos reais', d: 'Do produto, do serviço e do seu espaço. Foto bem iluminada vende mais do que qualquer texto.' },
  { ic: '📝', t: 'Textos curtos', d: 'O nome de cada item, uma descrição honesta e o preço, se quiser mostrar.' },
  { ic: '🎨', t: 'Sua marca', d: 'O logo (de preferência quadrado) e a cor da sua loja. Se não tiver, o laranja do GT entra no lugar.' },
];

const DICAS = [
  { ic: '📸', t: 'Foto real, bem iluminada', d: 'Do item de verdade, não de catálogo. Mostre o produto instalado ou em uso, se puder.' },
  { ic: '🎯', t: 'Nome que se procura', d: '"Kit de reparo de pneu" é melhor que "Kit Pro X". Escreva como o cliente falaria.' },
  { ic: '🤝', t: 'Descrição honesta', d: 'Para que serve, para qual veículo, o que vem junto. Viajante desconfia de exagero.' },
  { ic: '📍', t: 'Contato que responde', d: 'Telefone e WhatsApp atualizados. Quem está na estrada não espera até amanhã.' },
  { ic: '📊', t: 'Olhe os números', d: 'Muita aparição e pouca gente abrindo a ficha? Troque a foto ou o nome e veja o que muda.' },
];

function Bola({ n, grande = false }: { n: number; grande?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full text-white font-display ${grande ? 'w-10 h-10 text-lg' : 'w-7 h-7 text-sm'}`}
      style={{ backgroundColor: LARANJA }}
    >
      {n}
    </span>
  );
}

function Print({ passo }: { passo: Passo }) {
  return (
    <div className={`${passo.largura ?? 'max-w-3xl'} mx-auto rounded-lg border border-[#d8d0bc] overflow-hidden shadow-xl bg-[#1c2d20]`}>
      <div className="flex gap-1.5 px-3 py-2 bg-[#e9e4d8]" aria-hidden>
        <span className="w-2.5 h-2.5 rounded-full bg-[#c9c1ae]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#c9c1ae]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#c9c1ae]" />
      </div>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/parceiros/guia/${passo.img}`} alt={passo.alt} className="block w-full h-auto" loading="lazy" />
        {passo.marcas.map((m, i) => (
          <span
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full text-white font-display text-xs md:text-base flex items-center justify-center ring-2 md:ring-4 ring-white/85 shadow-lg"
            style={{ left: `${m.x}%`, top: `${m.y}%`, backgroundColor: LARANJA }}
            aria-hidden
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

function BotaoPdf({ claro = false }: { claro?: boolean }) {
  return (
    <a
      href={PDF}
      download
      className={`inline-flex items-center justify-center font-sans font-semibold px-6 py-3 rounded-md border transition-colors ${
        claro ? 'border-white/40 text-white hover:bg-white/10' : 'border-[#122E1F]/30 text-[#122E1F] hover:bg-[#122E1F]/5'
      }`}
    >
      Baixar o guia em PDF
    </a>
  );
}

export default async function GuiaParceiroPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <div className="bg-[#f8f5ee] text-[#1d211e]">
      {/* Capa */}
      <section className="bg-[#122E1F] text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] mb-5 font-sans font-semibold" style={{ color: LARANJA }}>
            Guia rápido do parceiro
          </p>
          <h1 className="font-display uppercase text-4xl md:text-6xl leading-[1.1] md:leading-[1.1] mb-6">
            Sua loja na vitrine do <span style={{ color: LARANJA }}>GT Overlander</span>
          </h1>
          <p className="font-sans text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
            Passo a passo para entrar no painel, colocar seu negócio no mapa e publicar seus produtos e serviços para quem
            viaja de carro pela América do Sul.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={CTA_URL}
              className="inline-flex items-center justify-center text-white font-sans font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#c04d18' }}
            >
              Entrar no painel →
            </a>
            <BotaoPdf claro />
          </div>
          <p className="font-sans text-white/60 text-sm mt-4">💻 O painel do parceiro funciona melhor no computador.</p>
        </div>
      </section>

      {/* Antes de começar */}
      <section className="border-b border-[#e0dcce]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <p className="text-xs uppercase tracking-[0.2em] mb-4 font-sans font-semibold" style={{ color: LARANJA_TEXTO }}>
            Antes de começar
          </p>
          <h2 className="font-display uppercase text-3xl md:text-4xl leading-[1.15] text-[#122E1F] mb-4">Dez minutos e o material na mão</h2>
          <p className="font-sans text-[#5b6159] text-lg mb-8">O cadastro é rápido quando você já tem tudo separado. Antes de abrir o painel, confira:</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {ANTES.map((c) => (
              <div key={c.t} className="bg-white border border-[#e4ddcc] rounded-lg p-5">
                <div className="text-2xl mb-2">{c.ic}</div>
                <h3 className="font-display uppercase text-lg text-[#122E1F] mb-1">{c.t}</h3>
                <p className="font-sans text-[#5b6159] text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-[#122E1F] text-white rounded-lg p-6">
            <p className="text-xs uppercase tracking-[0.18em] font-sans font-semibold" style={{ color: LARANJA }}>
              O endereço de entrada
            </p>
            <a href={CTA_URL} className="block mt-2 font-sans font-semibold text-lg md:text-xl break-all hover:underline">
              beta.gtoverlander.com.br/<wbr />business/cadastrar
            </a>
            <p className="font-sans text-white/70 text-sm mt-1">É o mesmo link do botão &quot;Entrar&quot; do convite.</p>
          </div>
        </div>
      </section>

      {/* Passos */}
      {PASSOS.map((p, i) => (
        <section key={p.titulo} className="border-b border-[#e0dcce]">
          <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 md:py-20">
            <div className="flex items-center gap-3 mb-3">
              <Bola n={i + 1} grande />
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold" style={{ color: LARANJA_TEXTO }}>
                Passo {i + 1}
              </span>
            </div>
            <h2 className="font-display uppercase text-3xl md:text-4xl leading-[1.15] text-[#122E1F] mb-4">{p.titulo}</h2>
            <p className="font-sans text-[#5b6159] text-lg leading-relaxed mb-8 max-w-3xl">{p.intro}</p>
            <Print passo={p} />
            <ol className="mt-8 grid gap-3 max-w-3xl">
              {p.itens.map((it, j) => (
                <li key={j} className="flex gap-3 font-sans text-base leading-relaxed">
                  <Bola n={j + 1} />
                  <div className="pt-0.5">{it}</div>
                </li>
              ))}
            </ol>
            {p.aviso && (
              <div
                className="mt-8 max-w-3xl bg-white border border-[#e4ddcc] rounded-md px-5 py-4 font-sans text-sm leading-relaxed"
                style={{ borderLeft: `4px solid ${LARANJA}` }}
              >
                {p.aviso}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Dicas */}
      <section className="border-b border-[#e0dcce]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <p className="text-xs uppercase tracking-[0.2em] mb-4 font-sans font-semibold" style={{ color: LARANJA_TEXTO }}>
            Para vender mais
          </p>
          <h2 className="font-display uppercase text-3xl md:text-4xl leading-[1.15] text-[#122E1F] mb-4">O que faz uma oferta funcionar</h2>
          <p className="font-sans text-[#5b6159] text-lg mb-8">Quem viaja de carro decide rápido, muitas vezes na estrada. Facilite a escolha.</p>
          <div className="grid gap-3">
            {DICAS.map((c) => (
              <div key={c.t} className="bg-white border border-[#e4ddcc] rounded-lg p-5 flex gap-4 items-start">
                <div className="text-2xl">{c.ic}</div>
                <div>
                  <h3 className="font-display uppercase text-lg text-[#122E1F] mb-1">{c.t}</h3>
                  <p className="font-sans text-[#5b6159] text-sm leading-relaxed">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fechamento */}
      <section className="bg-[#122E1F] text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24 text-center flex flex-col items-center">
          <h2 className="font-display uppercase text-4xl md:text-5xl leading-[1.15] mb-5">
            Pronto para a <span style={{ color: LARANJA }}>inauguração</span>
          </h2>
          <p className="font-sans text-white/80 text-lg max-w-2xl">
            Cadastre seus itens antes de 9 de outubro de 2026 para estar na vitrine desde o primeiro dia.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={CTA_URL}
              className="inline-flex items-center justify-center text-white font-sans font-semibold text-lg px-8 py-4 rounded-md hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#c04d18' }}
            >
              Entrar no painel →
            </a>
            <BotaoPdf claro />
          </div>
          <p className="font-sans text-white/60 text-sm mt-8">
            Dúvidas:{' '}
            <a href="mailto:business@gtoverlander.com.br" className="hover:underline" style={{ color: LARANJA }}>
              business@gtoverlander.com.br
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
