/**
 * GT Overlander — Script de tradução automática via DeepL
 *
 * Uso:
 *   npx tsx scripts/translate.ts              → atualiza EN e ES
 *   npx tsx scripts/translate.ts en           → atualiza só EN
 *   npx tsx scripts/translate.ts es it de     → atualiza ES, IT e DE
 *
 * Comportamento:
 *   - Lê messages/pt.json como fonte da verdade
 *   - Compara com o JSON alvo existente
 *   - Traduz APENAS chaves novas ou alteradas (economiza caracteres)
 *   - Preserva chaves que já existem e não mudaram
 *   - Cria o arquivo se ainda não existir
 *
 * Requisitos:
 *   - DEEPL_API_KEY no .env.local
 *   - npx tsx instalado (já vem com o projeto via devDependencies ou npx)
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

// ─── Config ────────────────────────────────────────────────────────────────

const MESSAGES_DIR = path.join(process.cwd(), 'messages');
const SOURCE_LOCALE = 'pt';

// Mapeamento locale → código DeepL
const DEEPL_LANG: Record<string, string> = {
  en: 'EN',
  es: 'ES',
  it: 'IT',
  de: 'DE',
  fr: 'FR',
  ja: 'JA',
};

// Chaves que NUNCA devem ser traduzidas (preços, e-mails, URLs, etc.)
const SKIP_PATTERNS = [
  /^.*\.(href|url|email|link)$/,
  /R\$\s*[\d,.]+/,           // valores em Real
  /^https?:\/\//,            // URLs
  /@[\w.-]+\.\w+/,           // e-mails
];

// ─── DeepL API ──────────────────────────────────────────────────────────────

function loadApiKey(): string {
  // Tenta carregar do .env.local manualmente
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    const match = content.match(/^DEEPL_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
  }
  if (process.env.DEEPL_API_KEY) return process.env.DEEPL_API_KEY;
  throw new Error('DEEPL_API_KEY não encontrada. Adicione no .env.local');
}

function deeplTranslate(text: string, targetLang: string, apiKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const isFreeKey = apiKey.endsWith(':fx');
    const hostname = isFreeKey ? 'api-free.deepl.com' : 'api.deepl.com';

    const body = new URLSearchParams({
      auth_key: apiKey,
      text,
      source_lang: 'PT',
      target_lang: targetLang,
      preserve_formatting: '1',
    }).toString();

    const req = https.request(
      {
        hostname,
        path: '/v2/translate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.translations?.[0]?.text) {
              resolve(json.translations[0].text);
            } else {
              reject(new Error(`DeepL error: ${data}`));
            }
          } catch {
            reject(new Error(`DeepL parse error: ${data}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function shouldSkip(value: string): boolean {
  return SKIP_PATTERNS.some((p) => p.test(value));
}

/** Achata objeto aninhado em chaves com ponto: { a: { b: 'x' } } → { 'a.b': 'x' } */
function flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') {
      result[fullKey] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(result, flatten(val as Record<string, unknown>, fullKey));
    }
  }
  return result;
}

/** Reconstrói objeto aninhado a partir de chaves com ponto */
function unflatten(flat: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(flat)) {
    const parts = key.split('.');
    let cur = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!cur[parts[i]]) cur[parts[i]] = {};
      cur = cur[parts[i]] as Record<string, unknown>;
    }
    cur[parts[parts.length - 1]] = val;
  }
  return result;
}

function loadJson(locale: string): Record<string, unknown> {
  const file = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function saveJson(locale: string, data: Record<string, unknown>) {
  const file = path.join(MESSAGES_DIR, `${locale}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function translateLocale(targetLocale: string, apiKey: string) {
  const deeplLang = DEEPL_LANG[targetLocale];
  if (!deeplLang) {
    console.warn(`⚠️  Locale "${targetLocale}" não tem mapeamento DeepL — adicione em DEEPL_LANG`);
    return;
  }

  console.log(`\n🌐 Traduzindo PT → ${targetLocale.toUpperCase()}...`);

  const source = flatten(loadJson(SOURCE_LOCALE));
  const existing = flatten(loadJson(targetLocale));
  const result: Record<string, string> = { ...existing };

  const toTranslate: Array<{ key: string; value: string }> = [];

  for (const [key, value] of Object.entries(source)) {
    if (!value.trim()) continue;
    if (shouldSkip(value)) {
      result[key] = value; // copia sem traduzir
      continue;
    }
    // Traduz se chave não existe no alvo OU se o valor PT mudou
    if (!existing[key] || existing[key] === value) {
      if (!existing[key]) {
        toTranslate.push({ key, value });
      }
      // Se existing[key] === value, provavelmente nunca foi traduzido — traduz
      if (existing[key] === value) {
        toTranslate.push({ key, value });
      }
    }
  }

  if (toTranslate.length === 0) {
    console.log(`  ✅ Nenhuma chave nova — ${targetLocale}.json já está atualizado`);
    return;
  }

  console.log(`  📝 ${toTranslate.length} chave(s) para traduzir...`);

  let translated = 0;
  let skipped = 0;

  for (const { key, value } of toTranslate) {
    try {
      const translatedText = await deeplTranslate(value, deeplLang, apiKey);
      result[key] = translatedText;
      translated++;
      process.stdout.write(`  ✓ ${key}\n`);
    } catch (err) {
      console.warn(`  ⚠️  Falha em "${key}": ${err}`);
      result[key] = value; // mantém PT como fallback
      skipped++;
    }

    // Pequena pausa pra não sobrecarregar a API
    await new Promise((r) => setTimeout(r, 100));
  }

  // Reconstrói na mesma ordem do source para consistência
  const ordered: Record<string, string> = {};
  for (const key of Object.keys(source)) {
    if (result[key] !== undefined) ordered[key] = result[key];
  }

  saveJson(targetLocale, unflatten(ordered));
  console.log(`  ✅ ${translated} traduzidas, ${skipped} com fallback → messages/${targetLocale}.json salvo`);
}

async function main() {
  const apiKey = loadApiKey();

  // Locales alvo: args da CLI ou EN+ES por padrão
  const targets = process.argv.slice(2).length > 0
    ? process.argv.slice(2)
    : ['en', 'es'];

  console.log(`🚀 GT Overlander — Tradução automática via DeepL`);
  console.log(`   Fonte: messages/pt.json`);
  console.log(`   Alvos: ${targets.join(', ')}`);

  for (const locale of targets) {
    await translateLocale(locale, apiKey);
  }

  console.log('\n✨ Concluído! Revise as traduções e faça commit se estiver ok.\n');
}

main().catch((err) => {
  console.error('❌ Erro:', err.message);
  process.exit(1);
});
