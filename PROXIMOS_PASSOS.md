# Próximos passos — A Carta

Atualizado em 19/11/2026, na `main` (`a24617d`, deploy `e90fc118` em `SUCCESS`).

## O que foi feito (10 a 19/11/2026)

- **Varredura de frases:** frases de instrução e de processo retiradas dos perfis revisados (`docs/lotes/fase-2-varredura-frases.md`).
- **PR #9, QA de interface, performance e SEO:** menus, cabeçalho, contraste, mapa por teclado, HTML próprio por rota, 404 real, sitemap, fontes locais e CI `Frontend QA`. Mesclado.
- **PR #10, homologação do site publicado:** testes HTTP, 100 rotas, WebKit e Responsively no site público; dados estruturados `Restaurant` nos 100 perfis; correção do LCP da home; roteiro de testes manuais. Mesclado e publicado (deploy `4ecf4f2`).
- **PR #11, Lighthouse depois da correção:** home de 87 para 94; lista e perfil em 100. Mesclado e publicado (deploy `02a4df1`).
- **PR #16, nova abertura:** a carta abre ao toque ou clique (sozinha em 4,5 s), e o título dela cresce até virar o título da home. Mantidos "Pular introdução", Esc e o modo sem movimento.
- **PR #17, mapa:** restaurantes da mesma cidade aparecem afastados, com uma linha até o ponto, em todos os mapas. Antes, 18 cidades escondiam pontos (no Brasil, Nelita e Evvai ficavam sob o Tuju).
- **PR #18, reteste público e fila de revisão:** reteste no deploy `2cc0041` (HTTP, 100 rotas, Lighthouse home 97, lista 97, perfil 100) e a planilha `docs/lotes/fase-2-revisao-humana.csv` com os 233 registros a decidir.
- **PR #14, teste do menu de país:** teste Playwright na CI (`npm run test:frontend`) que confere o menu dentro da janela, a busca, a seleção e o Esc.
- **PR #15, rodapé:** créditos do autor separados da navegação do site, com links "GitHub de André Ruperto" e "LinkedIn de André Ruperto".

## Estado atual

- **Funciona e está testado no site publicado:** 103 rotas, 404 real, sitemap, 100 perfis, layout no Chromium e no WebKit, menus no Chromium, no Firefox e no WebKit, e Lighthouse acima de 90 nas três rotas medidas (repetido em 17/11, depois da nova abertura e do mapa).
- **WebKit depois dos PRs #16 e #17:** matriz, menus e abertura aprovados em 19/11. O WebKit do Playwright no Windows mostra a carta fechada espelhada porque ignora `backface-visibility`; conferir no iPhone (item 2.0 do roteiro manual).
- **Não testado:** leitor de tela, Safari no iPhone, celular físico e Core Web Vitals de usuários reais.
- **Homologação:** técnica aprovada no que a automação cobre; 0/100 perfis homologados até o revisor humano decidir.

## Próximos passos

- [x] Mesclar os PRs #11 a #18.
- [x] Repetir a matriz WebKit e os menus no site publicado e testar a nova abertura (19/11: tudo aprovado; ver `docs/lotes/fase-2-homologacao.md`).
- [ ] Rodar o roteiro manual (`docs/qa-frontend/ROTEIRO-MANUAL.md`): NVDA, Safari/iOS e Android, e preencher a tabela de registro.
- [ ] Revisar os 233 registros não confirmados (149 com fonte única, 47 não verificados, 37 divergentes) preenchendo as colunas de decisão de `docs/lotes/fase-2-revisao-humana.csv`, e marcar como `verified` os perfis aceitos.
- [ ] Resolver ou aceitar os 13 avisos editoriais: 9 fotos de capa pendentes e 4 perfis com dados práticos parciais (lista em `docs/lotes/fase-2-homologacao.md`).
- [ ] Registrar o aceite de produto na tabela do fim de `docs/lotes/fase-2-homologacao.md`.
- [ ] Reconferir as informações voláteis (preços e reservas) se o aceite passar de 10/12/2026, 30 dias depois das revisões.

## Decisões e problemas conhecidos

- **Screenshots:** só alguns PNGs de evidência entram no Git (`docs/qa-frontend/.gitignore`); a CI publica o conjunto completo como artefato.
- **Dados estruturados:** a foto só entra quando mostra o próprio restaurante, e nunca há nota ou estrelas.
- **Quebra de linha:** builds no Windows saem com CRLF. O `validate-seo.mjs` já ignora essa diferença ao comparar com o deploy Linux.
- **Servidor esquecido:** um `vite preview` antigo do Codex pode continuar na porta 4174; use outra porta para testes locais.

## Comandos úteis

```bash
npm ci
npm run check:profiles
npm run build
npm run check:seo
npm run test:frontend
node scripts/validate-seo.mjs --http-static=https://melhores-restaurantes.up.railway.app
QA_URL=https://melhores-restaurantes.up.railway.app QA_OUT=/tmp/rotas.json node scripts/qa/rotas-final.mjs
QA_BROWSER=webkit QA_URL=https://melhores-restaurantes.up.railway.app QA_OUT=/tmp/webkit node scripts/qa/layout.mjs
QA_URL=https://melhores-restaurantes.up.railway.app QA_OUT=/tmp/lh.json node scripts/qa/lighthouse.mjs
QA_BROWSER=webkit QA_URL=https://melhores-restaurantes.up.railway.app QA_OUT=/tmp/abertura node scripts/qa/abertura.mjs
```
