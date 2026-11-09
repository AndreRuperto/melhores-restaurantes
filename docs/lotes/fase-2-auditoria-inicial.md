# Fase 2 — L0: auditoria inicial e primeira correção

**Data:** 09/11/2026 · **Estado:** em andamento, sem homologação integral.  
**Base dos dados e da aplicação pública medida:** `9efc8eb0b4149a653c01e6a6541cca62081f9c97`.  
**Execução:** Codex. Revisão factual/editorial e aceite de produto: a designar.  
**Escopo desta rodada:** leitura programática dos 100 JSONs, inventários, rotas, filtros, amostras visuais, medições de laboratório e correção do cabeçalho em celular.

## Entregas e rastreabilidade

- [Inventário de 100 perfis](fase-2-inventario.csv): presença de campos, contagens, testes e pendências por slug.
- [Inventário de imagens](fase-2-imagens.csv): 339 ocorrências de imagem, com URLs, legendas, autores e licenças declarados; direitos e identidade ainda não verificados.
- [Resumo estrutural](fase-2-evidencias/resumo-L0.json) e [campos/captions por perfil](fase-2-evidencias/campos-L0.json).
- [Plano atualizado](../fase-2-plano.md); [histórico da Fase 1](../fase-1-encerramento.md).

Os inventários descrevem o acervo, não certificam sua exatidão. `presente-nao-verificado` significa dado existente. `heroDeclaredKind` foi classificado por leitura das legendas dos 100 perfis, sem conferir a fotografia e sua fonte original; não deve ser confundido com `imageStatus` homologado. Datas de revisão factual permanecem vazias.

## 1. Linha de base estrutural

| Medida | Resultado observado | Limite da conclusão |
| --- | ---: | --- |
| Perfis/arquivos JSON | 100/100 | Todos parseados; zero órfãos, slugs duplicados ou divergências nos ranks presentes |
| Perfis com capa | 92 | Capa pode ser contexto, chef, prato ou outra unidade |
| Perfis com campo de fachada | 30 | Campo declarado não garante fachada atual nem licença |
| Referências fotográficas externas | 84 | Não contam como foto incorporada |
| Perfis com galeria | 49 | Sem aprovação individual dos arquivos |
| Biografias de chef presentes | 100 | Atualidade e fatos ainda precisam de revisão |
| Preparações / preparações com foto | 532 / 88 | Fotos e pratos atuais não comprovados por presença |
| Ocorrências de imagens | 339 | Conta cada uso em hero/facade/gallery/dishes; inclui repetição |
| URLs de imagem / páginas de origem distintas | 317 / 316 | Deduplicação por string, não por conteúdo binário |
| Perfis sem campo rank | 17 | Atualmente opcional no validador; ranking continua derivado da lista |
| Perfis sem reservationUrl | 29 | Exige revisão do canal; não significa ausência de reserva |

As 92 capas foram classificadas **pelo que a legenda declara**: 58 de contexto, 18 fachadas/entradas, 7 edifícios, 4 retratos de chef, 3 interiores/espaços, 1 prato e 1 outra unidade. As oito restantes não têm capa. Datas históricas devem continuar explícitas; nenhuma dessas categorias comprova atualidade ou direito de uso.

### Dez avisos do validador

**Sem capa (8):** Eliane, FZN, Baan Tepa, Den, Lamdre, Khufu’s, Labyrinth e Fauna.  
**Sem website em practical (2):** Meet the Bund e Ru Yuan.  
Todos os 100 possuem campo de endereço e texto de preço; este último pode conter ressalvas e não comprova preço confirmado.

## 2. Comandos executados

| Comando | Resultado | Evidência |
| --- | --- | --- |
| npm ci --no-audit --no-fund | Saída 0; 177 pacotes instalados | Ambiente do executor; lockfile preservado |
| npm run check:profiles | Saída 0; 100 perfis; 10 avisos; nenhum erro estrutural | [Log](fase-2-evidencias/check-profiles-L0.txt) |
| npm run build (base) | Saída 0; 167 módulos | [Log](fase-2-evidencias/build-L0.txt) |
| npm run build (correção mobile) | Saída 0 | [Log](fase-2-evidencias/build-mobile.txt) |

Ambiente: Windows, Node 26.13.0, npm 11.20.0. O projeto declara Node >=20. O npm informou scripts de instalação de esbuild/oxide sem aprovação própria do npm; o build foi executado com sucesso. Vite emitiu aviso não bloqueante de depreciação `module.register()` neste Node. Os logs preservam o aviso; não foi alterada dependência para ocultá-lo.

## 3. Rotas, filtros e amostra pública

- **100/100 rotas locais:** acesso direto em Chromium, nome do h1 e lede iguais aos do perfil esperado; nenhum erro JavaScript capturado. [Resultados](fase-2-evidencias/rotas-L0.json).
- As requisições a hosts externos foram bloqueadas nos ensaios locais de rotas e filtros para isolar o conteúdo: eles **não testam carregamento das fotos nem fontes externas**.
- **9/9 cenários de filtros:** 100 sem filtro; 50 por faixa; busca `sao paulo` = 3; Brasil = 4; Ásia = 33; Europa + faixa estendida = 20; termo inexistente = 0; Ásia + Japão + top50 = 0. Identidades dos resultados conciliadas com a lista, além da contagem. [Resultados](fase-2-evidencias/filtros-L0.json).
- Selecionar Brasil pela interface, fechar dropdown com Escape, devolver foco ao botão e limpar filtros: aprovados. Navegação completa por teclado/leitor de tela ainda pendente.
- **5 páginas públicas abertas:** home, lista, Asador, Khufu’s e Aponiente; status 200 e título principal esperado. Perfis aguardados até carregar a seção de história. Sem falhas de requisição observadas na janela curta do teste, sem scroll integral. [Resultados](fase-2-evidencias/publico-L0.json).
- Slug inexistente mostra a página de erro, mas responde 200 no preview SPA. Não declarar HTTP 404 real; comportamento público de slug inexistente ainda deve ser conferido.

O primeiro ensaio de navegador não alcançou o servidor local. O teste foi corrigido para iniciar servidor e navegador no mesmo ambiente, após encerrar o servidor anterior. Os resultados publicados são os ensaios que efetivamente carregaram as páginas. Uma comparação de contagem também foi ajustada para desconsiderar as maiúsculas visuais aplicadas por CSS; não era defeito do filtro.

## 4. Correção entregue: cabeçalho em telas pequenas

**Problema:** na lista a 320 px o documento tinha largura de 383 px; o link Como funciona e o seletor de tema ficavam fora da tela. A 375 px o seletor ainda ficava parcialmente fora.

**Causa:** linha de cabeçalho com altura fixa e sem quebra, cujo conteúdo ultrapassava a largura disponível.  
**Correção:** permitir quebra e altura natural no cabeçalho em telas pequenas, mantendo a linha única a partir de sm. Arquivo: `src/components/ui.jsx`. Identidade, links e rótulos preservados.

**Teste antes:** falhou em 320/375; passou em 768/1024/1440. [Evidência](fase-2-evidencias/mobile-before.json).  
**Teste depois:** passou nas cinco larguras, incluindo limites dos links/botões; scrollWidth igual à largura da tela. [Evidência](fase-2-evidencias/mobile-after.json).

A matriz adicional cobriu lista, nome longo de Le Louis XV e Khufu’s em 320/375/768/1024/1440, temas claro/escuro: **30 casos sem overflow horizontal após a correção**, contra quatro casos com overflow antes. Isso mede overflow, não aprovação integral de layout, zoom ou acessibilidade. [Antes](fase-2-evidencias/layout-before.json) · [Depois](fase-2-evidencias/layout-L0.json).

[Screenshot antes, 320 px](fase-2-evidencias/screenshots/header-320-before.png) · [Depois, 320 px](fase-2-evidencias/screenshots/header-320-after.png) · [Tema escuro](fase-2-evidencias/screenshots/lista-320-dark.png) · [Desktop](fase-2-evidencias/screenshots/lista-1440-light.png).

## 5. Performance, acessibilidade automática e SEO

**Método:** Lighthouse 13.6.0, Chrome Headless 156, mobile com throttling simulado padrão, multiplicador de CPU 4; três execuções por URL pública no mesmo computador/navegador. Os resultados são da versão pública de base, **antes de publicar a correção do cabeçalho**. Mediana por métrica; intervalo indica mínimo/máximo de Performance.

| URL | Performance (intervalo) | Acessibilidade | Boas Práticas | SEO | LCP mediano | CLS mediano | TBT mediano |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| / | 95 (83–96) | 100 | 100 | 92 | 1.77 s | 0.0020 | 94 ms |
| /restaurantes | 98 (98–98) | 100 | 100 | 92 | 1.77 s | 0.0000 | 116 ms |
| /restaurante/asador-etxebarri | 88 (88–88) | 100 | 77 | 92 | 3.78 s | 0.0000 | 62 ms |
| /restaurante/khufus | 88 (88–88) | 100 | 100 | 92 | 3.77 s | 0.0000 | 59 ms |
| /restaurante/aponiente | 88 (88–88) | 100 | 77 | 92 | 3.77 s | 0.0000 | 60 ms |

[15 execuções e achados](fase-2-evidencias/lighthouse-L0.json) · [Medianas](fase-2-evidencias/lighthouse-mediana-L0.json).

**Achados verificáveis:** 100 rotas locais sem canonical; mesma descrição genérica nos 100 perfis; og:url apontando para a home. Nas medições públicas, `/robots.txt` devolveu HTML da SPA, gerando 33 erros de sintaxe no Lighthouse. Nos perfis Asador/Aponiente, Lighthouse apontou cookies de terceiros/Issues e entregas de imagens a otimizar. As três páginas de perfil ficaram abaixo de 90 em Performance e acima de 2,5 s de LCP; metas ainda não cumpridas. Acessibilidade automática 100 não comprova WCAG ou revisão com leitor de tela. Sem dados de INP de campo.

## 6. Backlog derivado desta rodada

Nenhuma irregularidade de direito autoral foi demonstrada nesta rodada; há **verificação pendente**, não prova de licença nem prova de infração. Não foi concluída uma busca por todos os possíveis P0.

| ID | Prioridade | Escopo | Ação e critério de saída | Estado |
| --- | --- | --- | --- | --- |
| L0-MOBILE | P1 | Cabeçalho compartilhado | Zero overflow e links/tema acessíveis em 320/375/768/1024/1440 | Corrigido; testes locais e públicos aprovados no deploy d08fab7 |
| L0-SITES | P1 | Meet the Bund, Ru Yuan | Confirmar canal oficial, fonte e data; preencher ou explicar ausência | A fazer |
| L0-CAPAS | P1 | 8 perfis sem hero | Foto autorizada ou fallback neutro deliberado e registrado | A fazer |
| L0-CANAIS | P1 | 29 sem reservationUrl | Classificar online/telefone/e-mail/contato; não fabricar botão online | A fazer |
| L0-DIREITOS | P1; P0 se exposição incorreta confirmada | 339 usos de imagem | Conferir fontes, sujeitos, épocas, licença e atribuição por arquivo | A fazer |
| L0-KADEAU | P1 | Kadeau | Revisar uso da capa de Bornholm na página da unidade de Copenhague; legenda já identifica a outra unidade; não presumir foto da unidade ranqueada | A fazer |
| L0-FATOS | P1 | 100 perfis | Revisar fatos/chef/preços/prêmios nas fontes e registrar datas | A fazer |
| L0-SEO | P1 | 100 rotas | Canonical/descrição/OG específicos; validar HTML/prévias | A fazer |
| L0-ROBOTS | P1 | robots.txt e sitemap | Servir arquivos próprios válidos, sem HTML de fallback | A fazer |
| L0-PERF | P1 | Home/lista/perfis | Resolver achados medidos e repetir três medições por URL | A fazer |
| L0-404 | P1 | Slug desconhecido | Conferir resposta pública e resolver HTTP/SEO sem perder rotas válidas | A fazer |
| L0-MATRIZ | P1 | Navegação/acessibilidade | Completar Safari/Firefox, zoom 200%, teclado integral e leitor de tela | A fazer |
| L0-SCHEMA | P2 | 17 perfis sem rank | Decidir migração compatível; ausência hoje não quebra a posição exibida | A fazer |

Responsável pelo próximo levantamento: Codex; revisão factual/direitos e aceite final precisam de identificação no lote correspondente. As pendências não foram distribuídas a pessoas sem autorização.

## 7. Checklist e próximo passo

- [x] Fixar base, ler/parsear os 100 JSONs e conciliar arquivos/identidades.
- [x] Executar validador e build; preservar os dez avisos.
- [x] Criar inventários com estados não verificados explícitos.
- [x] Testar 100 rotas locais, nove cenários de filtro e cinco páginas públicas.
- [x] Medir as cinco URLs públicas, três vezes cada.
- [x] Reproduzir e corrigir a falha de cabeçalho; teste antes/depois e regressão local.
- [ ] Completar revisão factual e de licença/sujeito dos 100 perfis e 339 usos.
- [ ] Completar matriz de navegação, imagens em scroll e acessibilidade.
- [x] Conferir o SHA publicado e Railway: d08fab7 em SUCCESS, com cabeçalho aprovado publicamente nas cinco larguras; ver registro de publicação abaixo.
- [ ] Nomear revisor/aceite de produto; homologar L0 somente quando seus critérios integrais forem atendidos.

**Próximo passo:** concluir a auditoria de imagens e canais começando pelo lote piloto (Asador, Steirereck, Den, Khufu’s e Aponiente), mantendo os perfis em revisão até que fatos e direitos tenham evidência. Este checkpoint não libera a expansão em massa como se L0 estivesse encerrado.

## Revisão do checkpoint

Revisão técnica independente por agente: números e limites conferidos, sem achado importante na correção do cabeçalho. A evidência de filtros foi ampliada com os slugs esperados/observados e o texto de isolamento de rede foi esclarecido. Isso não substitui revisão factual, de direitos ou aceite de produto.


## Publicação conferida — 09/11/2026, 18h08 BRT

Commit de código e auditoria: [d08fab7de5a6afe9698492df74548f9e1a689a70](https://github.com/AndreRuperto/melhores-restaurantes/commit/d08fab7de5a6afe9698492df74548f9e1a689a70). Railway: deploy 9c39bd01-fed1-470b-a193-ad81c91f2186 em SUCCESS para esse SHA, ambiente production. O teste da lista pública confirmou status 200, cabeçalho com quebra em 320/375 e linha única em 768/1024/1440, sem links/botões fora da tela nem overflow do documento. [Evidência pública](fase-2-evidencias/publicacao-L0.json).

Este registro documenta uma publicação já observada. Não equivale à homologação integral das 100 páginas e não altera as medições Lighthouse históricas da base anterior.
