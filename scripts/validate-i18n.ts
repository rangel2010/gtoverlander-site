/**
 * GT Overlander — Validador de traduções i18n
 *
 * Uso:
 *   npx tsx scripts/validate-i18n.ts
 *
 * Verifica:
 *   1. Chaves ausentes em EN ou ES que existem em PT
 *   2. Chaves órfãs em EN/ES que não existem em PT
 *   3. Valores vazios em qualquer idioma
 *   4. Strings em EN/ES idênticas ao PT com palavras portuguesas (não traduzidas)
 *   5. Expressões proibidas / antigas em todos os idiomas
 */

import fs from 'fs';
import path from 'path';

// ─── Config ────────────────────────────────────────────────────────────────

const MESSAGES_DIR = path.join(process.cwd(), 'messages');

// Nomes próprios que legitimamente ficam iguais nos três idiomas
const PROPER_NOUNS = new Set([
  'GT Overlander', 'Help Overlander', 'GT Social', 'GT Explorer', 'GT Desapega',
  'CarPlay', 'Android Auto', 'App Store', 'Play Store', 'Web', 'Plus', 'Pro', 'Free',
  'Google Maps', 'OpenStreetMap', 'OSM', 'Base de Waypoints', 'Waypoints', 'waypoints',
  'Conta Business', 'Business', 'overlander', 'overlanders', 'Overlander',
  'App Store · Play Store · Web', 'CarPlay / Android Auto',
]);

// Palavras que indicam texto português num arquivo EN/ES
const PT_MARKERS = /\b(você|uma|pra|para(?=\s+quem|\s+que|\s+os|\s+as|\s+um|\s+uma)|não|mais|também|mas|dos|das|pelo|pela|está|são|seu|sua|plano|grátis|esse|essa|isso|onde|quando|como(?!\s+funciona))\b/i;

// Expressões proibidas por idioma
const FORBIDDEN: Record<string, string[]> = {
  pt: [
    'maior ecossistema', 'único ecossistema', 'base própria', 'waypoints próprios',
    'exatamente do jeito', 'self-service', 'ativação em 2 dias', 'mais escolhido',
    '10 categorias', 'país do dispositivo', 'disponível agora',
  ],
  en: [
    "world's largest", 'own waypoints', 'proprietary database', 'self-service',
    'available now', 'device country', 'universal offline', 'most chosen',
    'exactly the way you asked',
  ],
  es: [
    'mayor ecosistema', 'base propia', 'waypoints propios', 'self-service',
    'disponible ahora', 'país del dispositivo', 'universal offline', 'más elegido',
    'exactamente como pediste',
  ],
};

// ─── Helpers ───────────────────────────────────────────────────────────────

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function flatten(obj: JsonValue, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof obj === 'string') {
    out[prefix] = obj;
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => Object.assign(out, flatten(v, `${prefix}[${i}]`)));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      Object.assign(out, flatten(v, prefix ? `${prefix}.${k}` : k));
    }
  }
  return out;
}

function load(locale: string): Record<string, string> {
  const file = path.join(MESSAGES_DIR, `${locale}.json`);
  return flatten(JSON.parse(fs.readFileSync(file, 'utf-8')));
}

// ─── Main ──────────────────────────────────────────────────────────────────

let errors = 0;
let warnings = 0;

function error(msg: string) {
  console.error(`  ❌ ${msg}`);
  errors++;
}

function warn(msg: string) {
  console.warn(`  ⚠️  ${msg}`);
  warnings++;
}

const pt = load('pt');
const en = load('en');
const es = load('es');

// ── 1. Chaves ausentes ────────────────────────────────────────────────────
console.log('\n── 1. Chaves ausentes ───────────────────────────────────────');
for (const k of Object.keys(pt)) {
  if (!(k in en)) error(`EN faltando: ${k}`);
  if (!(k in es)) error(`ES faltando: ${k}`);
}

// ── 2. Chaves órfãs ───────────────────────────────────────────────────────
console.log('\n── 2. Chaves órfãs (EN/ES sem par em PT) ───────────────────');
for (const k of Object.keys(en)) {
  if (!(k in pt)) warn(`EN órfã: ${k}`);
}
for (const k of Object.keys(es)) {
  if (!(k in pt)) warn(`ES órfã: ${k}`);
}

// ── 3. Valores vazios ─────────────────────────────────────────────────────
console.log('\n── 3. Valores vazios ────────────────────────────────────────');
for (const [k, v] of Object.entries(pt)) {
  if (v.trim() === '') error(`PT vazio: ${k}`);
}
for (const [k, v] of Object.entries(en)) {
  if (v.trim() === '') error(`EN vazio: ${k}`);
}
for (const [k, v] of Object.entries(es)) {
  if (v.trim() === '') error(`ES vazio: ${k}`);
}

// ── 4. Strings PT não traduzidas em EN/ES ─────────────────────────────────
console.log('\n── 4. Strings possivelmente não traduzidas ──────────────────');
for (const [k, ptVal] of Object.entries(pt)) {
  if (ptVal.length < 20) continue;
  if (PROPER_NOUNS.has(ptVal)) continue;

  const enVal = en[k];
  if (enVal === ptVal && PT_MARKERS.test(ptVal)) {
    error(`EN idêntico ao PT com palavras PT: [${k}]\n     "${ptVal.slice(0, 90)}"`);
  }

  const esVal = es[k];
  if (esVal === ptVal && PT_MARKERS.test(ptVal)) {
    error(`ES idêntico ao PT com palavras PT: [${k}]\n     "${ptVal.slice(0, 90)}"`);
  }
}

// ── 5. Expressões proibidas ───────────────────────────────────────────────
console.log('\n── 5. Expressões proibidas ──────────────────────────────────');
for (const [locale, flat] of [['pt', pt], ['en', en], ['es', es]] as const) {
  for (const expr of FORBIDDEN[locale]) {
    for (const [k, v] of Object.entries(flat)) {
      if (v.toLowerCase().includes(expr.toLowerCase())) {
        error(`${locale.toUpperCase()} expressão proibida "${expr}" em [${k}]:\n     "${v.slice(0, 90)}"`);
      }
    }
  }
}

// ── Resultado ─────────────────────────────────────────────────────────────
console.log('\n─────────────────────────────────────────────────────────────');
if (errors === 0 && warnings === 0) {
  console.log('✅ Tudo OK — nenhum problema encontrado.\n');
  process.exit(0);
} else {
  if (warnings > 0) console.warn(`\n⚠️  ${warnings} aviso(s) encontrado(s).`);
  if (errors > 0) {
    console.error(`\n❌ ${errors} erro(s) encontrado(s). Corrija antes do deploy.\n`);
    process.exit(1);
  }
  process.exit(0);
}
