const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/frontend',
  timeout: 90_000,
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
    command: 'npm run dev -- --host 127.0.0.1 --port 5182 --strictPort',
    url: 'http://127.0.0.1:5182/restaurantes',
    reuseExistingServer: !process.env.CI,
    timeout: 90_000,
  },
});
