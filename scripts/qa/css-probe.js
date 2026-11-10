/**
 * css-probe — mede valores computados e geometria de um elemento, sem expor texto, cookies ou tokens.
 * NÃO diz qual regra venceu: para isso use regra-vencedora.js (CSSOM) ou regra-vencedora-cdp.mjs (CDP).
 *
 * No console do DevTools: cole o arquivo inteiro e chame
 *   cssProbe('.seletor', ['height', 'max-height', '--minha-variavel'])
 * No Playwright:
 *   await page.addScriptTag({ path: 'caminho/para/css-probe.js' });
 *   const r = await page.evaluate(([s, p]) => cssProbe(s, p), ['.seletor', ['height']]);
 */
globalThis.cssProbe = function cssProbe(selector, properties) {
  if (!selector) throw new Error('cssProbe: informe o seletor do elemento');
  const props = properties && properties.length ? properties : [
    'display', 'position', 'width', 'height', 'max-height', 'min-height',
    'overflow-x', 'overflow-y', 'z-index', 'color', 'background-color',
  ];
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!el) throw new Error(`cssProbe: seletor não encontrado: ${selector}`);
  const style = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  const root = document.documentElement;
  const body = document.body;
  const media = (q) => matchMedia(q).matches;

  const theme = {
    dataTheme: root.dataset.theme ?? body?.dataset.theme ?? null,
    classeDark: root.classList.contains('dark') || !!body?.classList.contains('dark'),
    colorScheme: getComputedStyle(root).colorScheme || null,
    prefersDark: media('(prefers-color-scheme: dark)'),
  };

  return {
    selector: typeof selector === 'string' ? selector : el.tagName.toLowerCase(),
    timestamp: new Date().toISOString(),
    url: location.origin + location.pathname, // sem query string
    viewport: {
      width: innerWidth, height: innerHeight, dpr: devicePixelRatio,
      visualViewport: visualViewport ? { width: visualViewport.width, height: visualViewport.height, scale: visualViewport.scale } : null,
      hoverNone: media('(hover: none)'), pointerCoarse: media('(pointer: coarse)'),
      reducedMotion: media('(prefers-reduced-motion: reduce)'),
    },
    theme,
    tagName: el.tagName,
    bounds: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom },
    foraDaTela: rect.right > innerWidth || rect.bottom > innerHeight || rect.x < 0 || rect.y < 0,
    scroll: { scrollWidth: el.scrollWidth, scrollHeight: el.scrollHeight, clientWidth: el.clientWidth, clientHeight: el.clientHeight },
    // overflow-x: hidden em html/body esconde estouro horizontal em vez de corrigi-lo
    overflowPagina: {
      documentoMaisLargoQueViewport: root.scrollWidth > root.clientWidth + 1,
      htmlOverflowX: getComputedStyle(root).overflowX,
      bodyOverflowX: body ? getComputedStyle(body).overflowX : null,
    },
    computed: Object.fromEntries(props.map((p) => [p, style.getPropertyValue(p).trim()])),
    stylesheets: Array.from(document.styleSheets).map((sheet, index) => ({
      index,
      href: sheet.href ? new URL(sheet.href, location.href).pathname : 'inline/constructed',
      disabled: sheet.disabled,
    })),
    regraVencedora: 'use regra-vencedora.js ou regra-vencedora-cdp.mjs',
  };
};
