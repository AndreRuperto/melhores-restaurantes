# QA independente — reteste de contraste e fontes

Medições executadas em **index-BTVpDEkj.js**, no preview 4174. Último build informado: index-B8jHFkRK.js, cuja alteração de fade do lede de perfil ficou fora deste reteste; não se atribuem as medições a esse bundle. Nenhuma mudança em componentes ou estilos; sem commit/push.

## Resultado comprovado

**P1 A11Y-01 corrigido e retestado.** O contador selecionado do menu de país em tema claro passou de **3,35:1 para 4,598:1**: foreground #706456 sobre #ece5d8, 12 px normal, mínimo 4,5:1.

Amostra: **64 menus abertos**, 32 Chromium + 32 Firefox; home e lista; 320×568, 1024×768, 1440×900 e 640×400; dois temas. São 48 menus de país e 16 de continente. **Zero violações axe** no escopo dos diálogos, zero falhas de geometria, zero oclusões nos hit-tests da busca e duas primeiras opções, zero overflow horizontal, Escape retornou foco em 64/64. Axe também registrou itens inconclusivos relativos a símbolos decorativos (◎ e ✓); zero violações não significa auditoria integral de acessibilidade.

Todas as medições aguardaram **document.fonts.ready**. As famílias **Source Serif 4** e **Cormorant Garamond** tinham faces carregadas, checks das fontes de contador/busca/título retornaram true, recursos WOFF2 foram servidos no próprio host 4174 e havia dois preloads locais. Nenhuma requisição de fonte falhou. Faces declaradas para subconjuntos não utilizados podem permanecer unloaded, sem invalidar as faces efetivamente carregadas. Screenshots de 640 claro Chromium e 320 claro Firefox foram inspecionados.

**SEO-01 resolvido no servidor 4177.** GET sem executar JavaScript em /slug-inexistente-qa e /restaurante/slug-inexistente-qa retornou **HTTP 404** com **meta robots noindex,follow**, título Página não encontrada · A Carta. O fallback SPA de 4174 continua sendo limitação conhecida desse preview e não foi confundido com a resposta do servidor 4177.

## Evidências e reprodução

- reteste-fontes-contraste/chromium.json e firefox.json: valores, fontes, geometria, hit-tests, axe, screenshots e bundle por caso (diretório real: reteste-fontes-contraste).
- reteste-fontes-contraste/verificacao.json: consolidação com zero falhas.
- HTMLs iniciais 4177_slug-inexistente-qa.html e 4177_restaurante_slug-inexistente-qa.html no mesmo diretório.
- Script: scripts/qa/independente-reteste-contraste.mjs. Definir PLAYWRIGHT_BROWSERS_PATH, executar node; QA_FIREFOX=1 seleciona Firefox. JSON persistido progressivamente.
- Relatório e resumo da rodada anterior preservados em before/RELATORIO-FINAL-YT_mXq5K.md e before/resumo-final-YT_mXq5K.json.

## Limites

Este reteste cobre apenas contraste de menus abertos, fontes carregadas, geometria/oclusão nos quatro tamanhos e a resposta 404 em 4177. Os 128 testes e funcionalidades anteriores permanecem evidência do bundle anterior; não foram todos repetidos com as novas fontes. Sem novos cenários de perfis/LCP, Lighthouse, leitor de tela, dispositivo físico, zoom real 200% ou publicação. Os 144 cenários dos critérios não foram integralmente auditados.

**Nenhuma falha aberta na rodada delimitada; P1 de contraste encerrado. Sem declaração de liberação global ou validação pública.**
