# Fase 2 — homologação

Data: 10/11/2026. Site testado: <https://melhores-restaurantes.up.railway.app/>, deploy `e5567f5e` do Railway, commit `4ecf4f2` (merge do PR #10). Este documento junta os testes do site publicado e o que ainda falta para fechar a Fase 2 (etapa 2.6 do [plano](../fase-2-plano.md)).

## Situação

**Homologação técnica: aprovada no escopo automatizado registrado.** A pendência de Performance da home foi retestada no deploy `e5567f5e` / commit `4ecf4f2`: mediana 96 e pior resultado 91, acima da meta 90. Nenhum novo P0 ou P1 foi identificado nesse reteste. Isso não substitui os testes manuais e o aceite humano abaixo.

**A Fase 2 ainda não está concluída.** Faltam três coisas que só uma pessoa pode fazer:

1. Os testes manuais com leitor de tela, Safari/iOS e celular, seguindo o [roteiro manual](../qa-frontend/ROTEIRO-MANUAL.md).
2. A revisão humana dos dados com fonte única, não verificados ou divergentes (tabela abaixo).
3. O aceite de produto, com nome e data.

Perfis integralmente homologados: **0/100**. Os 100 estão em `verificationStatus: partial` até o revisor humano decidir.

## Publicação

| Item | Resultado |
|---|---|
| Deploy | `e5567f5e-0016-49bb-8589-143aa2e6524c`, status `SUCCESS`, branch `main`, commit `4ecf4f2`, criado às 21h25 BRT de 10/11/2026 |
| Logs do container (verificação anterior, deploy `4bb3bab5`) | `serve dist` aceitando conexões na porta 8080; só um aviso do npm sobre `--omit=dev`, sem erro da aplicação |
| CI no GitHub | Workflow `Frontend QA` passou no PR #9 (build, validação HTTP, matriz de layout e 100 rotas) |

## Testes no site publicado

| Teste | Como | Resultado | Evidência |
|---|---|---|---|
| HTML próprio de cada rota | `validate-seo.mjs --http-static=<site>` | 103 rotas sem barra e 102 com barra entregam o próprio HTML | saída do comando (reproduzível) |
| 404 real | mesmo comando | Página e perfil inexistentes respondem HTTP 404 com `noindex,follow` | idem |
| Sitemap | `GET /sitemap.xml` | 103 URLs | idem |
| 100 perfis no navegador | `rotas-final.mjs` com `QA_URL` público | 100/100 com o nome certo em acesso direto e recarga; canonical próprio em todos | `evidencias/homologacao/rotas-publicas.json` |
| Layout no WebKit (motor do Safari) | `layout.mjs` com `QA_BROWSER=webkit` | 144 casos (9 rotas × 8 tamanhos × 2 temas) sem overflow, sem violação axe e sem erro de página | `evidencias/homologacao/webkit/` |
| Menus no WebKit | `independente.mjs` com `QA_BROWSER=webkit` | 64 menus de país e continente contidos na tela; Esc e seleção fecham e devolvem o foco; sem violação axe | `evidencias/homologacao/webkit-menus/resultados.json` |
| Comparação visual | Responsively App, 320, 390, 768, 1024 e 1440 px | Home, lista e perfil de nome longo (Le Louis XV) sem corte nem sobreposição | inspeção visual nesta sessão |
| Lighthouse mobile | `lighthouse.mjs` com `QA_URL` público | ver tabela abaixo | `evidencias/homologacao/lighthouse-publico.json` |

No Responsively, os títulos aparecem com uma franja colorida nos celulares. Não é efeito do site: o CSS não tem `text-shadow`, e a franja vem da redução da captura de telas de alta densidade.

Os testes de função dos filtros (busca sem acento, contagens, limpar, URL) só rodam no Chromium, por desenho do script. O WebKit cobriu geometria, teclado e acessibilidade dos menus.

### Lighthouse mobile no site publicado

Três novas execuções por rota contra o site publicado (deploy `e5567f5e`, commit `4ecf4f2`), com simulação mobile padrão. Evidência: `evidencias/homologacao/lighthouse-reteste-4ecf4f2.json`. São valores de laboratório, sem INP de campo.

| Rota | Perf. (mediana / pior) | A11y | Boas práticas | SEO | LCP mediana / pior (ms) | CLS pior |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 96 / 91 | 100 | 100 | 100 | 913 / 933 | 0.0020 |
| `/restaurantes` | 99 / 98 | 100 | 100 | 100 | 911 / 913 | 0.0000 |
| `/restaurante/asador-etxebarri` | 100 / 100 | 100 | 100 | 100 | 1064 / 1074 | 0.0000 |

No deploy anterior (`e5f0b6a`), a home tinha mediana 87 e LCP mediano de cerca de 3 s porque o título usava `.fade`. A retirada dessa animação já está publicada no commit `4ecf4f2`. Nesta rodada, a home atingiu mediana 96, pior Performance 91 e LCP mediano de 913 ms; a pendência técnica de Performance ficou resolvida no escopo medido. As quatro categorias ficaram acima de 90 nas nove execuções. São resultados de laboratório; não há aprovação de Core Web Vitals de campo.

A matriz de layout/WebKit e os demais testes acima pertencem à rodada anterior documentada. Neste reteste foram repetidos o build, o SEO por HTTP no domínio público e as 100 páginas em acesso direto/recarga, com novas evidências. Não foram repetidos leitor de tela, aparelho físico ou inspeção visual completa.

## Dados estruturados

Cada perfil passa a ter um bloco `application/ld+json` do tipo `Restaurant`, gerado só com fatos já publicados no perfil:

- **Sempre presentes:** nome, página do perfil (`mainEntityOfPage`) e a posição como prêmio em texto ("12º lugar no The 50 Best Restaurants 2026").
- **Quando o perfil traz:** site oficial (HTTPS), endereço, telefone, estilo de cozinha e foto.
- **Foto:** só entra foto aprovada que mostra o próprio restaurante (fachada, salão, prato ou chef), o que acontece em 29 perfis. Fotos de contexto, como bairro ou edifício, ficam de fora. Por isso o Sorn não leva imagem: a capa dele é um parque das redondezas.
- **Nunca entram:** nota, avaliação ou estrelas (`aggregateRating`, `review`, `starRating`).

O `check:seo` confere tudo isso nas 100 páginas.

## Revisão humana dos dados

Contagem atual dos registros de revisão (`fieldReviews`) nos 100 perfis:

| Situação | Registros |
|---|---:|
| Confirmado | 362 |
| Fonte única | 149 |
| Não verificado | 47 |
| Divergente | 37 |
| **Total** | **595** |

Nenhum registro tem mais de 30 dias. Os detalhes de cada lote estão nos relatórios `fase-2-L01.md` a `fase-2-L10.md`.

## Avisos editoriais (13)

O `check:profiles` mantém 13 avisos, que não bloqueiam o build:

- **Foto de capa pendente:** Eliane, ARCA, FZN, Baan Tepa, Den, Lamdre, Khufu's, Labyrinth e Fauna.
- **Dados práticos parciais:** Meet the Bund, Ru Yuan, Fu He Hui e Lamdre.

São P2: o perfil funciona com o fallback neutro, e a foto fica pendente até haver uma com direito demonstrado.

## Correções desta rodada

- **Home:** o bloco do título principal deixa de usar a animação `.fade`, que atrasava o LCP no site publicado.
- **Dados estruturados:** bloco `Restaurant` nas 100 páginas de perfil (ver acima), conferido pelo `check:seo`.
- **`validate-seo.mjs`:** a comparação de HTML ignora a diferença de quebra de linha. Um build feito num checkout do Windows (CRLF) falhava contra o deploy Linux (LF) mesmo com o conteúdo igual.
- **Scripts de QA:** `layout.mjs`, `independente.mjs`, `rotas-final.mjs` e `lighthouse.mjs` aceitam `QA_URL`, `QA_OUT` e, nos dois primeiros, `QA_BROWSER` (`chromium`, `firefox` ou `webkit`). Os padrões continuam os mesmos.

## Checklist da etapa 2.6

| Item | Situação |
|---|---|
| `npm ci`, `check:profiles` e `build` no candidato | Feito: saída 0 |
| 100 rotas em acesso direto e recarga | Feito, no site publicado |
| Fotos, créditos e links | Feito na rodada do PR #9 (315 URLs únicas carregaram) |
| Busca, filtros, mapa e estados | Feito no Chromium (PR #9); menus também no Firefox e no WebKit |
| Layout, temas e teclado na matriz | Feito no Chromium e no WebKit; **leitor de tela pendente** |
| Nomes longos, reservas por telefone, imagens históricas, falta de foto | Feito por amostra (Le Louis XV, Fu He Hui, fallback do Etxebarri) |
| Railway: branch, SHA, deploy, status, logs, domínio | Feito |
| Consolidar este documento | Feito |
| Aceite de produto | **Pendente** |

## Fila para revisão humana

O arquivo [fase-2-revisao-humana.csv](fase-2-revisao-humana.csv) reúne os **233 registros** que ainda não estão confirmados: 37 divergentes, 47 não verificados e 149 com fonte única. A ordenação começa por divergências, depois itens não verificados e fonte única, com rank crescente em cada grupo. Cada linha preserva campo, valor, fonte, data e nota da revisão anterior.

O revisor preenche `decisao_humana` (`aceitar`, `corrigir` ou `manter-pendente`), `valor_corrigido` quando houver, `fonte_adicional`, `revisor`, `data_decisao` (AAAA-MM-DD) e `observacao_revisor`. Todas essas colunas começam vazias. São registros por campo, não 233 restaurantes.

Gerador reproduzível: `python scripts/qa/exportar-revisao-humana.py`. Ele confere os 100 perfis, as 595 revisões e 233 IDs únicos. Manifesto: `evidencias/homologacao/revisao-humana-inventario.json`. O CSV não é importado automaticamente e não altera `fieldReviews` ou `verificationStatus`. Antes de aprovar um perfil, resolver ou aceitar explicitamente todas as suas pendências e registrar o aceite de produto.

## Para fechar a Fase 2

1. Rodar o [roteiro manual](../qa-frontend/ROTEIRO-MANUAL.md) e preencher a tabela de registro.
2. O revisor decide sobre os 233 registros que não estão confirmados (fonte única, não verificados e divergentes) e marca como `verified` os perfis aceitos.
3. Registrar o aceite de produto aqui:

| Data | Responsável | Decisão | Observações |
|---|---|---|---|
| | | | |

## Evidências do reteste no commit 4ecf4f2

- `evidencias/homologacao/deploy-reteste-4ecf4f2.json`: vínculo do deploy, SHA e status consultado.
- `evidencias/homologacao/build-reteste-4ecf4f2.txt`: build local da base publicada, saída zero.
- `evidencias/homologacao/seo-reteste-4ecf4f2.txt`: HTML próprio das 103 rotas e 102 variantes com barra, dados estruturados e 404 no domínio público.
- `evidencias/homologacao/rotas-reteste-4ecf4f2.json`: identidade dos 100 perfis em acesso direto e recarga.
- `evidencias/homologacao/lighthouse-reteste-4ecf4f2.json`: nove medições novas; resultados anteriores permanecem em `lighthouse-publico.json`.
