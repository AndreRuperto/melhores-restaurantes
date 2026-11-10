/**
 * regra-vencedora-cdp — a mesma pergunta do regra-vencedora.js, respondida pelo motor do Chromium via
 * Chrome DevTools Protocol: lista as regras que casam com o elemento, com arquivo:linha, camada e media,
 * e marca a vencedora para uma propriedade. Só Chromium.
 *
 * Uso dentro de um teste ou script Playwright:
 *   import { regraVencedoraCDP } from './regra-vencedora-cdp.mjs';
 *   const r = await regraVencedoraCDP(page, '.filtros', 'max-height');
 *   console.log(JSON.stringify(r, null, 2));
 *
 * Uso direto (abre a URL, mede e imprime JSON):
 *   node regra-vencedora-cdp.mjs <url> <seletor> <propriedade> [largura] [altura]
 *   (precisa de `playwright` ou `@playwright/test` resolvível a partir da pasta onde roda)
 *
 * A vencedora é escolhida pela regra do CDP: entre as declarações ativas da propriedade, vence a última da
 * lista de regras casadas (o Chromium já as devolve na ordem da cascata), com !important antes das normais e
 * o atributo style por último. Confira sempre `vencedora.valor` contra `computado`.
 */

export async function regraVencedoraCDP(page, selector, property) {
  const client = await page.context().newCDPSession(page);
  const sheets = new Map();
  client.on('CSS.styleSheetAdded', ({ header }) => sheets.set(header.styleSheetId, header));
  await client.send('DOM.enable');
  await client.send('CSS.enable');
  try {
    const { root } = await client.send('DOM.getDocument', { depth: 0 });
    const { nodeId } = await client.send('DOM.querySelector', { nodeId: root.nodeId, selector });
    if (!nodeId) throw new Error(`seletor não encontrado: ${selector}`);
    const matched = await client.send('CSS.getMatchedStylesForNode', { nodeId });
    const { computedStyle } = await client.send('CSS.getComputedStyleForNode', { nodeId });
    const computado = computedStyle.find((p) => p.name === property)?.value ?? null;

    const where = (styleSheetId, range) => {
      const h = sheets.get(styleSheetId);
      const base = h?.sourceURL ? (h.sourceURL.startsWith('http') ? new URL(h.sourceURL).pathname : h.sourceURL) : '<style> inline';
      const line = range ? (h?.startLine ?? 0) + range.startLine + 1 : null;
      return { arquivo: h?.isInline ? `${base} (bloco <style>)` : base, linha: line };
    };

    const candidatas = [];
    (matched.matchedCSSRules || []).forEach((m, ordem) => {
      const { rule } = m;
      if (rule.origin !== 'regular' && rule.origin !== 'inspector') return; // ignora user-agent
      for (const decl of rule.style.cssProperties || []) {
        if (decl.name !== property || decl.disabled || decl.parsedOk === false || decl.implicit) continue;
        candidatas.push({
          ...where(rule.styleSheetId, decl.range || rule.style.range),
          seletor: rule.selectorList.text,
          seletoresQueCasaram: m.matchingSelectors.map((i) => rule.selectorList.selectors[i]?.text),
          especificidade: m.matchingSelectors.map((i) => rule.selectorList.selectors[i]?.specificity).filter(Boolean)[0] ?? null,
          camada: (rule.layers || []).map((l) => l.text).join('.') || null,
          condicoes: [...(rule.media || []).map((x) => x.text), ...(rule.containerQueries || []).map((x) => `@container ${x.text}`),
            ...(rule.supports || []).map((x) => `@supports ${x.text}`)],
          important: !!decl.important,
          valor: decl.value.replace(/\s*!important\s*$/i, ''),
          ordem,
        });
      }
    });
    for (const decl of matched.inlineStyle?.cssProperties || []) {
      if (decl.name === property && !decl.disabled && decl.parsedOk !== false) {
        candidatas.push({ arquivo: 'atributo style', linha: null, seletor: '(inline)', important: !!decl.important,
          valor: decl.value.replace(/\s*!important\s*$/i, ''), ordem: Infinity, inline: true });
      }
    }
    // Normal: a última vence. !important: o CDP mantém a ordem das camadas; entre important, a camada declarada
    // primeiro vence e a sem camada perde — por isso a escolha abaixo separa os dois grupos.
    const importantes = candidatas.filter((c) => c.important);
    let vencedora;
    if (importantes.length) {
      const inlineImp = importantes.find((c) => c.inline);
      const comCamada = importantes.filter((c) => c.camada && !c.inline);
      vencedora = inlineImp || (comCamada.length ? comCamada[0] : importantes[importantes.length - 1]);
    } else {
      vencedora = candidatas[candidatas.length - 1] || null;
    }
    const avisos = [];
    if (!vencedora) avisos.push('Nenhuma declaração no próprio elemento: valor padrão do navegador ou herdado. Para seguir a herança, use regra-vencedora.js.');
    if (importantes.length && importantes.some((c) => c.camada) && importantes.some((c) => !c.camada && !c.inline)) {
      avisos.push('Há !important com e sem camada: confira a vencedora no DevTools (regra de camadas invertida).');
    }
    return { elemento: selector, propriedade: property, computado, vencedora, candidatas: [...candidatas].reverse(), avisos, metodo: 'CDP CSS.getMatchedStylesForNode' };
  } finally {
    await client.detach().catch(() => {});
  }
}

// Execução direta: node regra-vencedora-cdp.mjs <url> <seletor> <propriedade> [largura] [altura]
const { realpathSync } = await import('node:fs');
const { fileURLToPath } = await import('node:url');
const real = (p) => { try { return realpathSync.native(p).toLowerCase(); } catch { return null; } };
const isMain = !!process.argv[1] && real(process.argv[1]) === real(fileURLToPath(import.meta.url));
if (isMain) {
  const [url, selector, property, w = '390', h = '844'] = process.argv.slice(2);
  if (!url || !selector || !property) {
    console.error('Uso: node regra-vencedora-cdp.mjs <url> <seletor> <propriedade> [largura] [altura]');
    process.exit(2);
  }
  let chromium;
  try { ({ chromium } = await import('playwright')); } catch { ({ chromium } = await import('@playwright/test')); }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
  await page.goto(url, { waitUntil: 'load' });
  console.log(JSON.stringify(await regraVencedoraCDP(page, selector, property), null, 2));
  await browser.close();
}
