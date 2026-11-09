const { test, expect } = require('@playwright/test');

// O teste mede geometria e captura evidências; avaliação estética requer inspeção.
const viewports = [
  { width: 320, height: 568 },
  { width: 360, height: 740 },
  { width: 390, height: 844 },
];

async function abrirFiltro(page) {
  await page.goto('/restaurantes');
  const trigger = page.getByRole('button', { name: /Filtrar por país/ });
  await expect(trigger).toBeVisible();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const panel = page.getByRole('dialog', { name: 'Filtrar por país' });
  await expect(panel).toBeVisible();
  return { trigger, panel };
}

for (const viewport of viewports) {
  for (const tema of ['light', 'dark']) {
    test('dropdown country '+viewport.width+'x'+viewport.height+' '+tema, async ({ page }, testInfo) => {
      await page.setViewportSize(viewport);
      await page.goto('/restaurantes');
      if (tema === 'dark') {
        await page.getByRole('button', { name: 'Mudar para o tema escuro' }).click();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      }
      const trigger = page.getByRole('button', { name: /Filtrar por país/ });
      await trigger.scrollIntoViewIfNeeded();
      await trigger.click();
      const panel = page.getByRole('dialog', { name: 'Filtrar por país' });
      await expect(panel).toBeVisible();
      const audit = await panel.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const c = getComputedStyle(el);
        const root = getComputedStyle(document.documentElement);
        return {
          rect: { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom },
          viewport: { width: innerWidth, height: innerHeight },
          color: c.color, background: c.backgroundColor, position: c.position,
          overflow: c.overflow, zIndex: c.zIndex,
          tokens: {
            paper: root.getPropertyValue('--c-paper').trim(),
            ink: root.getPropertyValue('--c-ink').trim(),
          },
          sheets: Array.from(document.styleSheets, (s, i) => ({
            order: i, path: s.href ? new URL(s.href).pathname : 'inline/constructed',
          })),
          winningRule: 'PENDENTE_DE_INSPECAO_DEVTOOLS',
        };
      });
      await testInfo.attach('css-computado.json', {
        body: Buffer.from(JSON.stringify({ tema, ...audit }, null, 2)),
        contentType: 'application/json',
      });
      const image = testInfo.outputPath('dropdown-'+viewport.width+'x'+viewport.height+'-'+tema+'.png');
      await page.screenshot({ path: image, fullPage: false });
      await testInfo.attach('captura-dropdown', { path: image, contentType: 'image/png' });
      expect(audit.rect.x, 'menu cortado à esquerda').toBeGreaterThanOrEqual(-2);
      expect(audit.rect.y, 'menu cortado em cima').toBeGreaterThanOrEqual(-2);
      expect(audit.rect.right, 'menu cortado à direita').toBeLessThanOrEqual(viewport.width + 2);
      expect(audit.rect.bottom, 'menu cortado embaixo').toBeLessThanOrEqual(viewport.height + 2);
      await expect(panel.getByRole('button', { name: /Todos os países/ })).toBeVisible();
    });
  }
}

test('pesquisa e seleção Brasil, Escape restaura foco', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
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
