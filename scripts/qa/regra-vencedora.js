/**
 * regra-vencedora — lista as declarações que disputam uma propriedade num elemento e aponta a vencedora,
 * percorrendo o CSSOM (document.styleSheets). Funciona em qualquer navegador, sem DevTools.
 *
 * Console:   cole o arquivo e chame  regraVencedora('.seletor', 'max-height')
 * Playwright: await page.addScriptTag({ path: '.../regra-vencedora.js' });
 *             const r = await page.evaluate(([s, p]) => regraVencedora(s, p), ['.seletor', 'max-height']);
 *
 * Limites (o resultado traz avisos quando algum se aplica):
 * - Não dá número de linha: o CSSOM não guarda. Para arquivo:linha use regra-vencedora-cdp.mjs (Chromium).
 * - Folhas de outra origem sem CORS não podem ser lidas; aparecem em `folhasIlegiveis`.
 * - Especificidade calculada por aproximação (:is/:not/:has pelo argumento mais específico, :where = 0).
 * - @container não é avaliado; ordem de @layer pela primeira aparição; shadow DOM, animações e transições
 *   não entram. Confira se `vencedora.valor` bate com `computado`: se não bater, há algo fora do alcance.
 */
globalThis.regraVencedora = function regraVencedora(selector, property, options = {}) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!el) throw new Error(`regraVencedora: seletor não encontrado: ${selector}`);
  if (!property) throw new Error('regraVencedora: informe a propriedade (ex.: "max-height")');
  const prop = property.trim();
  const avisos = [];
  const folhasIlegiveis = [];
  const layerOrder = [];
  const noteLayer = (name) => { if (name && !layerOrder.includes(name)) layerOrder.push(name); };

  // ---------- especificidade aproximada ----------
  function splitTop(sel) {
    const out = []; let depth = 0; let cur = '';
    for (const ch of sel) {
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  function specificity(sel) {
    let a = 0, b = 0, c = 0;
    let s = sel;
    // pseudo-classes com argumento
    s = s.replace(/:(is|not|has|matches|where|nth-child|nth-last-child)\(((?:[^()]|\([^()]*\))*)\)/g, (m, name, arg) => {
      if (name === 'where') return ' ';
      if (name === 'nth-child' || name === 'nth-last-child') {
        b++;
        const of = arg.split(/\s+of\s+/)[1];
        if (of) { const sp = maxSpec(of); a += sp[0]; b += sp[1]; c += sp[2]; }
        return ' ';
      }
      const sp = maxSpec(arg); a += sp[0]; b += sp[1]; c += sp[2];
      return ' ';
    });
    s = s.replace(/\[[^\]]*\]/g, () => { b++; return ' '; });        // atributos
    s = s.replace(/::[\w-]+(\([^)]*\))?/g, () => { c++; return ' '; }); // pseudo-elementos
    s = s.replace(/#[\w-]+/g, () => { a++; return ' '; });              // ids
    s = s.replace(/\.[\w-]+/g, () => { b++; return ' '; });             // classes
    s = s.replace(/:(before|after|first-line|first-letter)\b/g, () => { c++; return ' '; });
    s = s.replace(/:[\w-]+(\([^)]*\))?/g, () => { b++; return ' '; });  // demais pseudo-classes
    s = s.replace(/[>+~*&|]/g, ' ');
    (s.match(/[a-zA-Z][\w-]*/g) || []).forEach(() => c++);              // tipos
    return [a, b, c];
  }
  function maxSpec(list) {
    return splitTop(list).map(specificity).reduce((m, x) => (cmp(x, m) > 0 ? x : m), [0, 0, 0]);
  }
  function cmp(x, y) { for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i]; return 0; }

  // ---------- coleta ----------
  function sheetName(sheet, index) {
    if (sheet.href) return new URL(sheet.href, location.href).pathname;
    const owner = sheet.ownerNode;
    if (owner && owner.tagName === 'STYLE') {
      const styles = Array.from(document.querySelectorAll('style'));
      return `<style> #${styles.indexOf(owner) + 1}`;
    }
    return `folha construída #${index}`;
  }

  function collect(target) {
    const found = [];
    let order = 0;
    function walk(rules, ctx, origin) {
      for (const rule of Array.from(rules)) {
        order++;
        const type = rule.constructor.name;
        if (type === 'CSSImportRule') {
          if (rule.media && rule.media.mediaText && !matchMedia(rule.media.mediaText).matches) continue;
          try { walk(rule.styleSheet.cssRules, { ...ctx, layer: rule.layerName ? [...ctx.layer, rule.layerName] : ctx.layer }, origin + ' → @import'); }
          catch { folhasIlegiveis.push(rule.href); }
          if (rule.layerName) noteLayer([...ctx.layer, rule.layerName].join('.'));
          continue;
        }
        if (type === 'CSSLayerStatementRule') { rule.nameList.forEach((n) => noteLayer([...ctx.layer, n].join('.'))); continue; }
        if (type === 'CSSLayerBlockRule') {
          const layer = [...ctx.layer, rule.name || `(anônima ${order})`];
          noteLayer(layer.join('.'));
          walk(rule.cssRules, { ...ctx, layer }, origin);
          continue;
        }
        if (type === 'CSSMediaRule') {
          if (!matchMedia(rule.conditionText || rule.media.mediaText).matches) continue;
          walk(rule.cssRules, { ...ctx, media: [...ctx.media, rule.conditionText || rule.media.mediaText] }, origin);
          continue;
        }
        if (type === 'CSSSupportsRule') {
          if (!CSS.supports(rule.conditionText)) continue;
          walk(rule.cssRules, { ...ctx, media: [...ctx.media, `@supports ${rule.conditionText}`] }, origin);
          continue;
        }
        if (type === 'CSSContainerRule') {
          walk(rule.cssRules, { ...ctx, media: [...ctx.media, `@container ${rule.conditionText} (NÃO AVALIADO)`], container: true }, origin);
          continue;
        }
        if (type === 'CSSStyleRule') {
          let matched = null;
          try {
            for (const part of splitTop(rule.selectorText)) {
              if (target.matches(part)) {
                const sp = specificity(part);
                if (!matched || cmp(sp, matched.sp) > 0) matched = { part, sp };
              }
            }
          } catch { /* seletor que o navegador não aceita em matches() (ex.: aninhado com &) */ }
          const value = rule.style.getPropertyValue(prop);
          if (matched && value !== '') {
            found.push({
              origem: origin, seletor: rule.selectorText, seletorQueCasou: matched.part,
              especificidade: matched.sp, camada: ctx.layer.length ? ctx.layer.join('.') : null,
              condicoes: ctx.media, important: rule.style.getPropertyPriority(prop) === 'important',
              valor: value.trim(), ordem: order, containerNaoAvaliado: !!ctx.container,
            });
          }
          if (rule.cssRules && rule.cssRules.length) walk(rule.cssRules, ctx, origin); // CSS aninhado
          continue;
        }
        if (rule.cssRules) walk(rule.cssRules, ctx, origin);
      }
    }
    Array.from(document.styleSheets).forEach((sheet, i) => {
      if (sheet.disabled) return;
      if (sheet.media && sheet.media.mediaText && !matchMedia(sheet.media.mediaText).matches) return;
      let rules;
      try { rules = sheet.cssRules; } catch { folhasIlegiveis.push(sheet.href || sheetName(sheet, i)); return; }
      walk(rules, { layer: [], media: [] }, sheetName(sheet, i));
    });
    (document.adoptedStyleSheets || []).forEach((sheet, i) => walk(sheet.cssRules, { layer: [], media: [] }, `adoptedStyleSheets #${i}`));
    const inline = target.style.getPropertyValue(prop);
    if (inline !== '') {
      found.push({
        origem: 'atributo style', seletor: '(inline)', seletorQueCasou: '(inline)', especificidade: [1, 0, 0, 0],
        camada: null, condicoes: [], important: target.style.getPropertyPriority(prop) === 'important',
        valor: inline.trim(), ordem: Infinity, inline: true,
      });
    }
    return found;
  }

  // ---------- ordenação pela cascata (autor) ----------
  function rankLayer(c) {
    // normal: camadas na ordem de declaração; sem camada vence. important: ordem invertida; sem camada perde.
    const idx = c.camada === null ? layerOrder.length : layerOrder.indexOf(c.camada);
    return c.important ? (c.camada === null ? -1 : layerOrder.length - idx) : idx;
  }
  function compareCascade(x, y) {
    if (x.important !== y.important) return x.important ? 1 : -1;
    if (!!x.inline !== !!y.inline) return x.inline ? 1 : -1;
    const lx = rankLayer(x), ly = rankLayer(y);
    if (lx !== ly) return lx - ly;
    const s = cmp(x.especificidade, y.especificidade);
    if (s !== 0) return s;
    return x.ordem - y.ordem;
  }

  const inheritedLike = prop.startsWith('--') || /^(color|font|line-height|letter-spacing|word-spacing|text-|visibility|cursor|white-space|direction|quotes|list-style)/.test(prop);
  let target = el;
  let herdadoDe = null;
  let candidatas = collect(target);
  while (!candidatas.length && inheritedLike && options.herdar !== false && target.parentElement) {
    target = target.parentElement;
    candidatas = collect(target);
    if (candidatas.length) herdadoDe = target.tagName.toLowerCase() + (target.id ? '#' + target.id : '') +
      (target.classList.length ? '.' + Array.from(target.classList).join('.') : '');
  }
  candidatas.sort(compareCascade);
  const vencedora = candidatas.length ? candidatas[candidatas.length - 1] : null;
  const computado = getComputedStyle(el).getPropertyValue(prop).trim();

  if (!vencedora) avisos.push('Nenhuma declaração de autor encontrada: o valor vem do padrão do navegador, de herança não seguida, de folha ilegível ou de shadow DOM.');
  if (herdadoDe) avisos.push(`Sem declaração no próprio elemento; valor herdado de ${herdadoDe}.`);
  if (folhasIlegiveis.length) avisos.push(`${folhasIlegiveis.length} folha(s) ilegível(is) por CORS — a vencedora pode estar nelas.`);
  if (candidatas.some((c) => c.containerNaoAvaliado)) avisos.push('Há regras em @container que não foram avaliadas: confira se a condição vale.');
  // Valores relativos (dvh, %, em, calc, var...) viram px no computado: aí a diferença é esperada.
  const relativo = vencedora && /(%|[a-z]*v[hwbi]|v(min|max)|r?em|ch|ex|lh|calc\(|var\(|min\(|max\(|clamp\()/i.test(vencedora.valor);
  if (vencedora && vencedora.valor !== computado && !relativo) {
    avisos.push('O valor da vencedora difere do computado: pode haver animação, transição, shadow DOM ou regra ilegível. Confira com regra-vencedora-cdp.mjs ou no DevTools.');
  }
  const reverse = [...candidatas].reverse();
  return {
    elemento: typeof selector === 'string' ? selector : el.tagName.toLowerCase(),
    propriedade: prop,
    computado,
    vencedora,
    candidatas: reverse, // da que vence para a que perde
    ordemDasCamadas: layerOrder,
    folhasIlegiveis,
    viewport: { width: innerWidth, height: innerHeight },
    avisos,
    metodo: 'CSSOM (aproximação; sem número de linha)',
  };
};
