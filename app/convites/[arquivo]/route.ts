import { sanityClient } from '@/lib/sanity/client';

/**
 * Convites individuais (15/10/2026, página adicionada em 16/10/2026)
 *
 *   /convites/<endereço>      → página do convite (é o link que vai na mensagem)
 *   /convites/<endereço>.pdf  → o PDF original, guardado no Studio ("Convite em PDF")
 *
 * Por que a página: no Instagram do Android, link sem prévia (a "caixinha" com
 * imagem e título) não reage ao toque, e o navegador embutido do app não abre
 * PDF. A página tem prévia e mostra as páginas do PDF desenhadas na tela
 * (pdf.js), então funciona em qualquer celular.
 *
 * Sempre com noindex: convite não aparece no Google.
 */
export const dynamic = 'force-dynamic';

const SEM_GOOGLE = 'noindex, nofollow, noarchive';
const SITE = 'https://www.gtoverlander.com.br';
const WHATSAPP = '5543999081100';
const IMAGEM_PREVIA = `${SITE}/convite/convite-pessoal.jpg?v=1`;
const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174';

type Convite = { url?: string; parceiro?: string };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function GET(_req: Request, { params }: { params: { arquivo: string } }) {
  const pedido = decodeURIComponent(params.arquivo).trim().toLowerCase();
  const querPdf = /\.pdf$/.test(pedido);
  const slug = pedido.replace(/\.pdf$/, '').replace(/[^a-z0-9]+$/, '');

  const naoEncontrado = () =>
    new Response(paginaNaoEncontrada(), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': SEM_GOOGLE },
    });

  if (!sanityClient || !/^[a-z0-9-]{1,80}$/.test(slug)) return naoEncontrado();

  const convite = await sanityClient.fetch<Convite | null>(
    `*[_type == "convitePdf" && slug.current == $slug && ativo != false][0]{ "url": arquivo.asset->url, parceiro }`,
    { slug },
    { cache: 'no-store' }
  );
  if (!convite?.url) return naoEncontrado();

  if (!querPdf) {
    return new Response(paginaDoConvite(slug, convite.parceiro ?? ''), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': SEM_GOOGLE,
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
      },
    });
  }

  const pdf = await fetch(convite.url, { cache: 'no-store' });
  if (!pdf.ok || !pdf.body) return naoEncontrado();

  return new Response(pdf.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Convite GT Overlander.pdf"',
      'X-Robots-Tag': SEM_GOOGLE,
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
    },
  });
}

function paginaDoConvite(slug: string, parceiro: string) {
  const nome = esc(parceiro);
  const titulo = parceiro ? `Convite pessoal para ${nome}` : 'Seu convite pessoal';
  const descricao = 'Programa de Parceiros GT Overlander: 3 meses de GT Pro grátis, código exclusivo para seus seguidores e comissão por indicação.';
  const pdf = `/convites/${slug}.pdf`;
  const textoZap = encodeURIComponent(
    `Oi Rangel! Recebi o convite do Programa de Parceiros GT Overlander${parceiro ? ` (${parceiro})` : ''} e quero fazer parte.`
  );

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${titulo} · GT Overlander</title>
<meta name="robots" content="noindex, nofollow, noarchive">
<meta name="description" content="${descricao}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="GT Overlander">
<meta property="og:locale" content="pt_BR">
<meta property="og:url" content="${SITE}/convites/${slug}">
<meta property="og:title" content="${titulo}">
<meta property="og:description" content="${descricao}">
<meta property="og:image" content="${IMAGEM_PREVIA}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1d3a29">
<style>
  :root { --verde:#1d3a29; --verde2:#24482f; --laranja:#d9622a; --creme:#f1ebdd; }
  * { box-sizing:border-box; }
  html,body { margin:0; background:var(--verde); color:var(--creme); font:16px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; }
  main { max-width:560px; margin:0 auto; padding:16px 12px calc(120px + env(safe-area-inset-bottom,0px)); }
  #paginas canvas { display:block; width:100%; height:auto; margin:0 0 12px; border-radius:6px; box-shadow:0 4px 18px rgba(0,0,0,.35); }
  #aviso { text-align:center; padding:48px 12px; opacity:.85; }
  #aviso a { color:var(--creme); }
  .acoes { position:fixed; left:0; right:0; bottom:0; background:rgba(20,40,28,.96); padding:12px 12px calc(12px + env(safe-area-inset-bottom,0px)); display:flex; gap:10px; justify-content:center; border-top:1px solid rgba(255,255,255,.08); }
  .acoes a { flex:1; max-width:270px; text-align:center; text-decoration:none; font-weight:700; padding:14px 10px; border-radius:10px; }
  .zap { background:var(--laranja); color:#fff; }
  .baixar { background:transparent; color:var(--creme); border:1px solid rgba(241,235,221,.4); }
</style>
</head>
<body>
<main>
  <div id="paginas"></div>
  <p id="aviso">Carregando o seu convite…</p>
</main>
<nav class="acoes">
  <a class="zap" href="https://wa.me/${WHATSAPP}?text=${textoZap}">Quero fazer parte</a>
  <a class="baixar" href="${pdf}" target="_blank" rel="noopener">Baixar PDF</a>
</nav>
<script src="${PDFJS}/pdf.min.js"></script>
<script>
(function () {
  var aviso = document.getElementById('aviso');
  var area = document.getElementById('paginas');
  function falhou() {
    aviso.innerHTML = 'Não foi possível mostrar o convite aqui. <a href="${pdf}">Toque para abrir o PDF</a>.';
  }
  if (!window.pdfjsLib) return falhou();
  pdfjsLib.GlobalWorkerOptions.workerSrc = '${PDFJS}/pdf.worker.min.js';
  pdfjsLib.getDocument('${pdf}').promise.then(function (doc) {
    var largura = Math.min(area.clientWidth || window.innerWidth, 560);
    var densidade = Math.min(window.devicePixelRatio || 1, 2.5);
    var fila = Promise.resolve();
    for (var n = 1; n <= doc.numPages; n++) {
      (function (n) {
        fila = fila.then(function () {
          return doc.getPage(n).then(function (pagina) {
            var base = pagina.getViewport({ scale: 1 });
            var vp = pagina.getViewport({ scale: (largura / base.width) * densidade });
            var c = document.createElement('canvas');
            c.width = vp.width; c.height = vp.height;
            c.setAttribute('aria-label', 'Página ' + n + ' do convite');
            area.appendChild(c);
            if (n === 1) aviso.hidden = true;
            return pagina.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
          });
        });
      })(n);
    }
    return fila;
  }).catch(falhou);
})();
</script>
</body>
</html>`;
}

function paginaNaoEncontrada() {
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive"><title>Convite não encontrado · GT Overlander</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1d3a29;color:#f1ebdd;font:16px/1.5 system-ui,sans-serif;text-align:center;padding:24px}a{color:#f1ebdd}</style></head>
<body><div><h1 style="font-size:1.4rem">Convite não encontrado</h1><p>Confira se o link chegou completo. Se precisar, fale com a gente pelo WhatsApp <a href="https://wa.me/${WHATSAPP}">+55 43 99908-1100</a>.</p></div></body></html>`;
}
