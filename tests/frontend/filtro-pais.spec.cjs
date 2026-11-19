const { test, expect } = require('@playwright/test');

// Regressão do menu "Filtrar por país" (FilterDropdown): ele já saiu da tela em celulares
// estreitos e ficou encoberto pelo cabeçalho fixo. Aqui se mede só a geometria; a avaliação
// visual continua manual. Teste trazido do PR #8 e adaptado à implementação atual.
const viewports = [
  { width: 320, height: 568 },
  { width: 360, height: 740 },
  { width: 390, height: 844 },
];
const paginas = ['/', '/restaurantes'];

// A home tem dois menus de país (mapa e lista completa); a página de restaurantes, um.
async function abrirFiltro(page, indice = 0) {
  const trigger = page.getByRole('button', { name: /Filtrar por país/ }).nth(indice);
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const panel = page.getByRole('dialog', { name: 'Filtrar por país' });
  await expect(panel).toBeVisible();
  return { trigger, panel };
}

for (const pagina of paginas) {
  for (const viewport of viewports) {
    for (const tema of ['light', 'dark']) {
      test(`menu de país dentro da janela — ${pagina} ${viewport.width}x${viewport.height} ${tema}`, async ({ page }, testInfo) => {
        await page.setViewportSize(viewport);
        await page.goto(pagina);
        if (tema === 'dark') {
          await page.getByRole('button', { name: 'Mudar para o tema escuro' }).click();
          await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
        }
        const total = await page.getByRole('button', { name: /Filtrar por país/ }).count();
        expect(total, 'nenhum menu de país na página').toBeGreaterThan(0);
        for (let i = 0; i < total; i++) {
        const { panel } = await abrirFiltro(page, i);
        const geo = await panel.evaluate((el) => {
          const r = el.getBoundingClientRect();
          const header = document.querySelector('header');
          const hs = header && getComputedStyle(header);
          const headerFixo = !!hs && (hs.position === 'fixed' || hs.position === 'sticky');
          return {
            left: r.left, top: r.top, right: r.right, bottom: r.bottom,
            vw: document.documentElement.clientWidth, vh: innerHeight,
            headerBottom: headerFixo ? header.getBoundingClientRect().bottom : null,
          };
        });
        const image = testInfo.outputPath(`filtro-pais-${pagina === '/' ? 'home' : 'restaurantes'}-menu${i + 1}-${viewport.width}x${viewport.height}-${tema}.png`);
        await page.screenshot({ path: image });
        await testInfo.attach('captura', { path: image, contentType: 'image/png' });
        await testInfo.attach('geometria.json', { body: Buffer.from(JSON.stringify(geo, null, 2)), contentType: 'application/json' });

        expect(geo.left, 'menu cortado à esquerda').toBeGreaterThanOrEqual(-1);
        expect(geo.right, 'menu cortado à direita').toBeLessThanOrEqual(geo.vw + 1);
        expect(geo.top, 'menu cortado em cima').toBeGreaterThanOrEqual(-1);
        expect(geo.bottom, 'menu cortado embaixo').toBeLessThanOrEqual(geo.vh + 1);
        if (geo.headerBottom !== null) {
          expect(geo.top, 'menu encoberto pelo cabeçalho fixo').toBeGreaterThanOrEqual(geo.headerBottom - 1);
        }
        await expect(panel.getByRole('searchbox', { name: 'Buscar país' })).toBeVisible();
        await expect(panel.getByRole('button', { name: /Todos os países/ })).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(panel).toBeHidden();
        }
      });
    }
  }
}

test('busca e seleção de país; Escape fecha e devolve o foco', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/restaurantes');
  let { trigger, panel } = await abrirFiltro(page);
  const search = panel.getByRole('searchbox', { name: 'Buscar país' });
  await search.fill('Brasil');
  await search.press('Enter');
  await expect(panel).toBeHidden();
  await expect(page).toHaveURL(/pais=Brasil/);
  trigger = page.getByRole('button', { name: /Filtrar por país/ });
  await trigger.click();
  panel = page.getByRole('dialog', { name: 'Filtrar por país' });
  await expect(panel).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});
