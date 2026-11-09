# A Carta — segundo piloto do Guia Frontend IA v2.1

**Escopo:** dropdown de país/continente, posicionamento em tela baixa, temas, teclado, geometria e qualidade editorial.
**Status:** primeiro CI executado; 5/7 cenários passaram e 2 revelaram corte horizontal. Correção de posicionamento implementada; reteste pendente.
**Branch:** test/piloto-frontend-css-v21.

## Baseline verificável por código

- React 18, Vite 5, React Router 6 e Tailwind CSS 4.
- src/main.jsx importa src/index.css; src/index.css começa importando Tailwind.
- Tokens declarados em :root e sobrescritos por :root[data-theme='dark'].
- FilterDropdown.jsx implementa menu absoluto, busca, lista scroll, posicionamento, foco e Escape.
- CountryDropdown reutiliza FilterDropdown nas páginas /restaurantes, home e ranking.
- Nesta revisão estática não foi demonstrado o mesmo conflito do Truco. A ausência de conflito real NÃO está confirmada sem CSS do navegador.

## Matriz inicial

| ID | Cenário | Critério | Evidência | Estado |
|---|---|---|---|---|
| CSS01 | fontes/layers/ordem | CSS carregado completo e origem registrada | imports + DevTools | parcial estático |
| CSS02 | computed | valores capturados em menu/tema | JSON computed | não testado |
| CSS03 | vencedor | regra vencedora identificada, não deduzida | DevTools Styles | não testado |
| CSS04 | 320x568, 360x740, 390x844 | menu não sai da viewport e mantém rolagem | screenshots/rect | FALHOU antes da correção em 320x568 dark e 360x740 light; reteste pendente |
| CSS05 | claro/escuro | tokens resolvidos e legibilidade mantida | JSON + inspeção visual | não testado |
| CSS06 | reteste depois de mudança | sem regressão em consumidores | antes/depois | não aplicável |
| UX01 | teclado e busca | selecionar Brasil, Escape e retorno ao foco | Playwright trace | PASSOU no primeiro CI |
| VIS01 | direção editorial | hierarquia, densidade e fotos coerentes | capturas revisadas por QA | não testado |

## Como executar

1. npm ci
2. npm run check:profiles
3. npm run build
4. npm install --no-save --package-lock=false @playwright/test@1.63.0
5. npx playwright install chromium --with-deps
6. npx playwright test --config=playwright.frontend.config.cjs

O comando sobe Vite em localhost:5182. A suíte anexa JSON de computed style e screenshots ao relatório HTML. A declaração vencedora requer inspeção DevTools/Chrome CDP quando disponível: computed style, isoladamente, não revela de qual seletor/arquivo veio o valor.

## Política de aceitação

Sem CI executado, não afirmar que passou. CI verde também não prova estética ótima: inspecionar screenshots e fluxo teclado/manual. Não alterar UI sem antes medir o defeito e aprovar critérios de correção. Documentar bugs que só aparecem em dispositivos reais como limitações da emulação. O primeiro projeto (Truco) demonstrou que ler só uma folha CSS pode inverter o diagnóstico.

## Achado A-CARTA-CSS-001 — dropdown cortado na borda esquerda

- **Ambiente:** Playwright Chromium (GitHub Actions run 42664269085), rota /restaurantes, menu de país aberto.
- **Casos que falharam:** 320x568 dark, left = -51.40625 px; 360x740 light, left = -64.59375 px. Outros 5 cenários passaram (incluindo seleção Brasil e Escape).
- **Evidências:** screenshots em artifacts/frontend-css-evidencias e logs do workflow. As duas capturas foram inspecionadas visualmente e mostram o painel cortado à esquerda.
- **Causa respaldada pelo código:** quando o painel de ~304px não cabe à direita, a lógica antiga aplicava classe utilitária right-0, alinhando a borda direita do painel ao botão estreito; isso podia gerar posição x negativa. Identificar a regra vencedora exata no DevTools/CDP permanece etapa de aprofundamento.
- **Correção proposta/implementada na branch:** medir largura real do painel, calcular alinhamento horizontal com margem de 16px da viewport e aplicar offset left inline; preservar cálculo de abertura para cima.
- **Reteste:** execução do novo CI após a correção; checar seis combinações, busca/teclado, capturas. Ainda não marcar o achado como corrigido e retestado sem o CI passar.
- **Risco residual:** dropdown em outras rotas/containers, zoom, outros navegadores e teclado virtual ainda requerem cobertura adicional.
