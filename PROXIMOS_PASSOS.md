# Próximos passos — A Carta

Atualizado em 11/11/2026, na `main` (`02a4df1`, deploy `160e5af2` em `SUCCESS`).

## O que foi feito (10 e 11/11/2026)

- **Varredura de frases:** frases de instrução e de processo retiradas dos perfis revisados (`docs/lotes/fase-2-varredura-frases.md`).
- **PR #9, QA de interface, performance e SEO:** menus, cabeçalho, contraste, mapa por teclado, HTML próprio por rota, 404 real, sitemap, fontes locais e CI `Frontend QA`. Mesclado.
- **PR #10, homologação do site publicado:** testes HTTP, 100 rotas, WebKit e Responsively no site público; dados estruturados `Restaurant` nos 100 perfis; correção do LCP da home; roteiro de testes manuais. Mesclado e publicado (deploy `4ecf4f2`).
- **PR #11, Lighthouse depois da correção:** home de 87 para 94; lista e perfil em 100. Mesclado e publicado (deploy `02a4df1`).

## Estado atual

- **Funciona e está testado no site publicado:** 103 rotas, 404 real, sitemap, 100 perfis, layout no Chromium e no WebKit, menus no Chromium, no Firefox e no WebKit, e Lighthouse acima de 90 nas três rotas medidas.
- **Não testado:** leitor de tela, Safari no iPhone, celular físico e Core Web Vitals de usuários reais.
- **Homologação:** técnica aprovada no que a automação cobre; 0/100 perfis homologados até o revisor humano decidir.

## Próximos passos

- [x] Mesclar o PR #11.
- [ ] Rodar o roteiro manual (`docs/qa-frontend/ROTEIRO-MANUAL.md`): NVDA, Safari/iOS e Android, e preencher a tabela de registro.
- [ ] Revisar os 233 registros não confirmados em `fieldReviews` (149 com fonte única, 47 não verificados, 37 divergentes) e marcar como `verified` os perfis aceitos.
- [ ] Resolver ou aceitar os 13 avisos editoriais: 9 fotos de capa pendentes e 4 perfis com dados práticos parciais (lista em `docs/lotes/fase-2-homologacao.md`).
- [ ] Registrar o aceite de produto na tabela do fim de `docs/lotes/fase-2-homologacao.md`.
- [ ] Reconferir as informações voláteis (preços e reservas) se a homologação passar de 30 dias depois das revisões.

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
node scripts/validate-seo.mjs --http-static=https://melhores-restaurantes.up.railway.app
QA_URL=https://melhores-restaurantes.up.railway.app QA_OUT=/tmp/rotas.json node scripts/qa/rotas-final.mjs
QA_BROWSER=webkit QA_URL=https://melhores-restaurantes.up.railway.app QA_OUT=/tmp/webkit node scripts/qa/layout.mjs
QA_URL=https://melhores-restaurantes.up.railway.app QA_OUT=/tmp/lh.json node scripts/qa/lighthouse.mjs
```
