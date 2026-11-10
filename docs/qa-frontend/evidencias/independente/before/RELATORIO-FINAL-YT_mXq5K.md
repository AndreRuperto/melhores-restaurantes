# QA independente final

Bundle verificado: index-YT_mXq5K.js. Preview http://127.0.0.1:4174. Nenhuma alteração em componentes, estilos ou implementação; sem commit/push.

## Resultado

128 casos de dropdown: 64 Chromium + 64 Firefox. Home tem 3 consumidores; lista tem 1. Oito viewports e dois temas. Geometria: 0 falhas; Escape/foco: 0; seleção/foco: 0; setas sem deslocamento: 0; overflow horizontal: 0. Hit-test: 16 interceptações pela animação inicial foram repetidas após ela encerrar; 0 falhas remanescentes. A amostra comprova ausência de oclusão nos centros da busca e das duas primeiras opções após a introdução; não mede cada pixel de todas as opções.

Busca sao paulo: Tuju, Nelita e Evvai nas duas páginas. Faixas: 50/50; Brasil: 4; Europa: 41 e país redefinido. Limpar na lista retorna 100 e remove parâmetros; busca e continente restaurados em reload. Home tem paginação inicial de 20 itens; contagens de faixa medidas no resumo. Mapa: 100 pontos focáveis por navegador; primeiro ponto abre Aponiente por Enter e Espaço; Escape mantém foco. Evidência: mapa-final.json e screenshots.

100/100 perfis têm título próprio, descrição, canonical e títulos sociais no HTML inicial no reteste sem cache (seo-final.json). A medição anterior em resultados.json.seo divergiu; não é o resultado SEO final.

## Falhas abertas

- **P1 A11Y-01:** home e lista, tema claro, abrir país com Enter. Contador 100 em Todos os países tem contraste **3,35:1**, foreground #857a6d, background #ece5d8, 12px normal. Esperado >=4,5:1. Evidência: complementar.json, axeMenus, color-contrast; menu-axe-light-home.png e menu-axe-light-lista.png.
- **P2 SEO-01:** GET /restaurante/slug-inexistente-qa sem JavaScript retorna HTTP 200, robots index,follow e canonical da home. Esperado: slug desconhecido sem indexação já no HTML inicial. Evidência: seo-final.json, seo-direto.json e seo-raw-_restaurante_slug-inexistente-qa.html.

**Liberação geral vetada pelo P1 de contraste. Posicionamento do dropdown aprovado na amostra final após a introdução.**

## Limites e integridade

- Sem auditoria completa dos 144 cenários dos critérios
- Sem Lighthouse, leitor de tela, dispositivo físico, zoom real 200%, falha de imagens ou 100 perfis em recarga interativa
- Axe somente Chromium, home/lista em desktop; nenhum claim de conformidade integral
- Snapshots anteriores foram parcialmente sobrescritos; before/complementar.json preservado, JSONs integrais anteriores da matriz não preservados
- resultados.json.seo é uma medição anterior divergente; seo-final.json e seo-direto.json prevalecem para HTML inicial
- Axe dark da home pode ter sido afetado pela animação; demais alertas não promovidos a achados confirmados

Reprodução: definir PLAYWRIGHT_BROWSERS_PATH e executar node scripts/qa/independente.mjs; QA_FIREFOX=1 executa Firefox. Scripts complementar, mapa, seo-final e hit-reteste registram verificações adicionais. JSON gravado progressivamente.
