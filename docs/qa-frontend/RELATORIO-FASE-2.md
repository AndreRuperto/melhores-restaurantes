# Fase 2 — QA de interface, performance e SEO

Data: 10/11/2026. Base: `e193d94` (main com o lote L10). Branch: `qa/fase-2-interface-seo`. Os critérios de aceite foram escritos antes dos testes, em [CRITERIOS-FASE-2.md](CRITERIOS-FASE-2.md).

## O que este relatório libera

Este é um candidato local validado por amostragem. Ele não equivale à homologação dos 100 perfis nem ao aceite editorial humano, e não prova conformidade WCAG completa. O relatório também não afirma que o Railway já publicou este código: a publicação depende do merge e de um smoke test público.

## Problemas encontrados e corrigidos

| Problema | Medição antes | Correção | Evidência |
|---|---|---|---|
| Menu de país cortado em 320×568 | topo do painel em −4,5 px; `right-0` alinhava pelo botão, não pela janela | Posição fixa calculada nas duas direções. Depois, o cálculo passou a respeitar o cabeçalho fixo, que encobria a busca | `baseline-dropdown.json`, `menu-oclusao-before.json`, `independente/hit-retest.json` |
| Home com rolagem lateral em 1024×768 | `scrollWidth` 1061/1063 px; botão de tema além da borda | Links de seção no cabeçalho só a partir de `xl` | `header-before.json`, `layout.json`, `matriz-executada.csv` |
| Contraste dos contadores no menu claro | `#857a6d` sobre `#ece5d8`, 3,35:1 | Token `muted` passou para `#706456` (4,60:1), sem `!important` | `contraste-before.json`, `independente/reteste-fontes-contraste/` |
| Pontos do mapa sem teclado | sem foco nem nome acessível | Foco, nome acessível, Enter e Espaço, Escape. No toque, o foco só seleciona com `:focus-visible` | `toque.json`, `independente/mapa-final.json` |
| Perfil empurrava o conteúdo ao carregar | CLS ≈ 0,28 no Etxebarri | Dados do perfil inicial no HTML, lidos de forma síncrona | `lighthouse-before.json`, `lighthouse.json` |
| HTML específico não chegava ao navegador | URL sem barra recebia o HTML da home | Aliases `.html` gerados; `serve -s` saiu do `start`; 404 real com `noindex` | `http-producao.json`, `independente/seo-final.json` |
| LCP alto no perfil | texto de abertura com opacidade 0 durante 0,7 s | Animação retirada só desse parágrafo; fontes servidas localmente (OFL), com preload | `lcp-animation-before.json`, `lighthouse.json` |
| JavaScript inicial pesado | ≈ 391 kB (131 kB gzip) | Mapa carregado sob demanda: ≈ 258 kB (80 kB gzip) | saída do `npm run build` |
| Imagens sem tamanhos e sem fallback | — | `srcset`/`sizes` nas miniaturas oficiais; fallback neutro mantém alt, legenda e crédito | `estados.json`, `imagem-falhando.png` |

Nenhum conteúdo, fonte ou direito de imagem dos perfis foi alterado nesta entrega.

## Cobertura e resultados

- **Layout:** 9 rotas × 8 tamanhos × 2 temas = 144 casos, sem overflow na rodada final. Tamanhos: 320, 360, 390, 430, 768, 1024 e 1440 px, mais 640×400, que equivale ao reflow de uma janela de 1280×800 com zoom de 200%. Não é o controle de zoom real do navegador. Movimento reduzido foi alternado por largura.
- **Axe (WCAG 2.2 AA):** 18 combinações de rota e tema, sem violações. Os menus abertos foram avaliados à parte no QA independente.
- **QA independente:** 128 menus testados (64 no Chromium e 64 no Firefox) nos três consumidores da home e no da lista. Foram cobertos busca sem acento, contagens, filtros Brasil/Europa, limpar, estado vazio, restauração pela URL e os 100 pontos do mapa. O reteste de contraste cobriu mais 64 menus abertos, com as fontes já locais.
- **100 perfis:** acesso direto e recarga mostram o nome certo. O HTML inicial traz título, descrição, canonical e dados próprios, e 91 perfis têm imagem social aprovada. O sitemap tem 103 URLs, sem parâmetros. O corpo continua renderizado pelo React (não há SSR).
- **Fotos:** 315 URLs únicas (316 registros). Na primeira passagem 307 carregaram e oito receberam bloqueio do Wikimedia (429 com `Retry-After: 600`). Depois da espera, as oito voltaram com HTTP 200. Os direitos não foram reauditados.
- **Estados:** abertura com e sem movimento reduzido, Escape, imagem que falha sem ícone quebrado, filtro offline, skip-link e 404.
- **Validações:** `check:profiles` com 100 perfis, 316 direitos aprovados e 13 avisos editoriais já existentes. `build` e `check:seo` passaram. A CI (`.github/workflows/frontend-qa.yml`) repete build, teste HTTP, matriz de layout e rotas, mas só vale como prova quando for vista rodando no GitHub.

## Reteste final (10/11/2026, depois da última mudança no mapa)

A última alteração em `WorldMap.jsx` veio depois das medições de Lighthouse. Por isso repeti `check:profiles`, `build`, `check:seo` e o teste HTTP em dois servidores: preview na porta 4184 e `serve dist` na 4177. Todos passaram: 103 rotas sem barra e 102 com barra entregaram o próprio HTML, e o 404 estático respondeu com `noindex`. A matriz de layout terminou com 144 casos, nenhum overflow, nenhuma violação axe nas 18 combinações e nenhum erro de página. As 100 rotas passaram em acesso direto e recarga, sem falhas. Os resultados estão em `layout.json`, `axe.json`, `console.json` e `rotas-final.json`. O Lighthouse não foi repetido nesse reteste.

## Lighthouse mobile

Três execuções por rota, com Lighthouse 13.6 em simulação mobile padrão, Chrome headless e Node 26.13. Os valores são de laboratório e não incluem INP de campo.

| Rota | Perf. (mediana) | A11y | Boas práticas | SEO | LCP mediana / pior (ms) | CLS pior |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 100 | 100 | 100 | 100 | 908 / 908 | 0,0056 |
| `/restaurantes` | 100 | 100 | 100 | 100 | 906 / 906 | 0,0019 |
| `/restaurante/asador-etxebarri` | 100 | 100 | 100 | 100 | 905 / 906 | 0,0000 |

Antes das correções, o perfil do Etxebarri marcava 61 a 75 em Performance, com LCP de 3,7 a 8,2 s e CLS de 0,27 a 0,28.

## Lacunas e riscos

- Não testados: Safari/iOS, dispositivo físico, leitor de tela e zoom real do navegador. Nenhuma aprovação vale para eles.
- Não há Core Web Vitals de usuários reais. Lighthouse e axe não comprovam WCAG completa.
- Não testados de forma determinística: falha no carregamento do chunk do perfil e variações do teclado virtual.
- As fotos vêm de hotlink externo e dependem da disponibilidade e dos limites de terceiros.
- Os 13 avisos editoriais e a revisão humana das fontes continuam pendentes.
- Os arquivos `*-before.json` e `independente/before/` registram o estado anterior e não substituem as evidências finais.
- Só alguns screenshots entram no Git, para não inflar o repositório (os PNGs somam cerca de 28 MB). A CI publica as evidências completas como artefato.

## Como reproduzir e reverter

```bash
npm ci
npm run check:profiles
npm run build
npx playwright install chromium firefox
```

Em seguida, suba `npm run preview -- --host 127.0.0.1 --port 4174` e `npx serve dist -l tcp://127.0.0.1:4177`, e rode:

```bash
node scripts/validate-seo.mjs --http=http://127.0.0.1:4174 --http-static=http://127.0.0.1:4177
node scripts/qa/layout.mjs
node scripts/qa/rotas-final.mjs
```

`layout.mjs` aceita `QA_URL` para trocar a porta. No Windows, defina `PLAYWRIGHT_BROWSERS_PATH` se os navegadores estiverem em outro cache.

Para reverter, desfaça o commit desta entrega e reconstrua. Não volte só o `start` para `serve -s`: sem reverter o SEO junto, o HTML inicial volta a ser genérico.
