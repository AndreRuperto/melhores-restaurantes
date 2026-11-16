const { defineConfig, devices } = require('@playwright/test');

// Testes de regressão do frontend em Chromium, contra o build de produção (vite preview).
// Rode `npm run build` antes; no CI o build já existe quando este passo roda.
module.exports = defineConfig({
  testDir: './tests/frontend',
  timeout: 60_000,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'frontend-playwright-report' }]],
  outputDir: 'frontend-test-results',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:5182',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    locale: 'pt-BR',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 5182 --strictPort',
    url: 'http://127.0.0.1:5182/restaurantes',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
