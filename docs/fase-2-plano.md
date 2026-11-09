# A Carta — plano detalhado da Fase 2

**Data de abertura:** 9 de novembro de 2026  
**Estado:** em execução — L0 iniciado; estrutura e rotas conferidas, revisão factual e de imagens pendente  
**Escopo:** os 100 perfis do acervo de 2026, suas imagens, dados, navegação e publicação  
**Entrega deste documento:** plano vivo, atualizado com inventários, medições e correções verificadas  
**Fluxo de publicação:** commits pequenos diretamente na `main`, conforme orientação do projeto

## 1. Objetivo e referências

Transformar a primeira rodada editorial em uma experiência consistente, verificável e acessível: 100 páginas funcionando, informações práticas rastreáveis, fotografias corretamente identificadas e autorizadas, filtros confiáveis e publicação homologada.

O Asador Etxebarri é referência de profundidade editorial, não prova de cobertura fotográfica atual nem obrigação de repetir a quantidade de texto ou imagens em todos os perfis. Ausências confirmadas devem ter tratamento neutro e explícito; não serão preenchidas com fatos ou imagens inventados.

Referências do repositório:

- [Encerramento da Fase 1](fase-1-encerramento.md).
- [Histórico e auditorias por lote](lotes/), incluindo [o lote 96–100](lotes/perfis-96-a-100.md).
- [Situação editorial de 2026](perfis-status-2026.md).
- [Identidade visual](identidade-visual.md).
- [Desenho inicial das páginas](plans/2026-11-06-paginas-restaurante-design.md).
- [Regras e histórico de fachadas licenciadas](lotes/fachadas-licenciadas.md) e [auditoria de fachadas 1–40](lotes/auditoria-fachadas-1-a-40.md).

A Fase 2 amplia a verificação do desenho inicial: não autoriza reaproveitar automaticamente as permissões presumidas em documentos antigos. Licenças e identidade das fotos serão conferidas por arquivo.

## 2. Ponto de partida comprovado e limites

Leitura realizada na `main`, com base no commit [60012058ab2f60c7289e218df01b9c5efb387d49](https://github.com/AndreRuperto/melhores-restaurantes/commit/60012058ab2f60c7289e218df01b9c5efb387d49).

| Item | Evidência consultada | O que se pode afirmar |
| --- | --- | --- |
| Acervo | Árvore recursiva do GitHub, sem truncamento; `src/data/restaurants.js` | Existem 100 JSONs, correspondentes aos 100 slugs da lista, sem ausência no cruzamento de nomes de arquivo |
| Encerramento editorial | `docs/fase-1-encerramento.md` | A Fase 1 registrou a conclusão editorial e deixou pendentes a homologação técnica e a cobertura fotográfica |
| Estrutura e comandos | `package.json`, `scripts/validate-profiles.mjs` | Existem `check:profiles` e `build`; Node declarado como `>=20`; aplicação React/Vite |
| Carregamento | `src/data/profiles.js` | JSONs carregados sob demanda; estados `undefined`, `null` e objeto representam carregamento, indisponibilidade e conteúdo |
| Imagens e apresentação | `src/components/Profile.jsx`, `src/pages/Restaurant.jsx`; amostras Asador e Khufu’s | Há suporte a capa, fachada, galeria, fotos de pratos, créditos e referências externas |
| Identidade | `docs/identidade-visual.md`, `index.html` | Papel creme, vinho, serifas e marca vetorial já definidos; há temas claro e escuro |
| Filtros | `CountryDropdown.jsx`, `FilterDropdown.jsx`, `Restaurants.jsx` | Existem busca, continentes, países e faixas; dropdown já tem rolagem, Escape e foco. O comportamento precisa ser testado antes de se declarar um defeito |
| Railway | Consulta ao projeto `carta`, ambiente `production`, em 09/11/2026, aproximadamente 15h53 BRT | Serviço `melhores-restaurantes`, origem `AndreRuperto/melhores-restaurantes@main`; deploy `1643d92d-71a7-4ca8-9a41-a00fa2d4b7d7` em `SUCCESS`, associado ao SHA de referência |

O deploy acima foi criado às 11h53 BRT e atualizado às 11h53min42s BRT de 09/11/2026. Domínio informado pelo Railway: [melhores-restaurantes.up.railway.app](https://melhores-restaurantes.up.railway.app/). Isso atualiza a informação histórica de deploy pendente da Fase 1, mas não comprova inspeção pública das 100 páginas ou aprovação de fotos e reservas.

**Não realizados na preparação deste plano:** execução de `npm run check:profiles` ou `npm run build`, revisão factual individual dos 100 JSONs, navegação pública completa, medição Lighthouse e auditoria de todas as licenças. Não há percentual medido de cobertura fotográfica, qualidade factual ou conformidade de acessibilidade. A existência dos arquivos não equivale à aprovação de seu conteúdo.

## 3. Prioridades, estados e responsabilidades

| Prioridade | Regra de decisão | Exemplos | Condição de saída |
| --- | --- | --- | --- |
| P0 | Bloqueia a aprovação do lote ou a homologação; tratar antes de ampliar o acervo | Foto atribuída ao restaurante errado ou sem direito demonstrado; reserva para outra casa; rota quebrada; erro estrutural; build falhando; fluxo principal inacessível | Correção ou remoção da exposição incorreta, seguida de reteste documentado |
| P1 | Necessário para concluir a Fase 2 | Revisão dos 100 perfis; créditos completos; preços datados; responsividade; filtros e SEO; performance dentro das metas | Critério de aceite atendido com evidência |
| P2 | Melhoria que pode seguir em backlog após a homologação | Galeria adicional autorizada, novos detalhes editoriais, refinamentos sem impacto no uso | Entrega validada ou adiamento explícito com responsável e justificativa |

Estados do trabalho: **a fazer → em andamento → em revisão → validado**. Usar **bloqueado** quando falta uma dependência externa e **adiado** somente com justificativa. Arquivo existente, commit criado e deploy em sucesso são evidências distintas; nenhum deles sozinho significa perfil homologado.

Responsáveis serão nomeados na abertura de cada lote: **editorial/dados**, **imagens/direitos**, **interface/técnico** e **homologação/produto**. Uma pessoa pode acumular funções, mas cada tarefa deve ter responsável e revisor identificados. Não há nomes ou prazos assumidos neste plano.

## 4. Inventário dos perfis e contrato dos dados

### 4.1 Registro operacional a produzir na etapa 2.1

O inventário nominal do [Apêndice A](#apêndice-a--inventário-nominal-dos-100-perfis) cruza a lista com os arquivos existentes. O inventário detalhado será criado em `docs/lotes/fase-2-inventario.csv`, uma linha por slug, com estas colunas:

| Grupo | Colunas mínimas | Regra de preenchimento |
| --- | --- | --- |
| Identidade | `rank`, `name`, `slug`, `profilePath`, `route`, `countryCode`, `batchId` | Derivar da lista e cruzar com arquivo; preservar slugs e ranking de referência |
| Editorial | `ledeStatus`, `historyStatus`, `cuisineStatus`, `chefStatus`, `dishesCount`, `awardsStatus`, `sourcesStatus` | Marcar presente, ausente, divergente ou não verificado; presença não comprova correção |
| Fotografia | `heroStatus`, `facadeStatus`, `interiorStatus`, `chefPhotoStatus`, `dishPhotoCount`, `contextPhotoCount`, `licenseStatus` | Separar real atual, histórica, edifício, contexto, apenas referência e ausente |
| Dados práticos | `addressStatus`, `websiteStatus`, `reservationMode`, `reservationStatus`, `priceStatus`, `lastReviewedAt` | Registrar fonte, data e resultado, incluindo informação indisponível |
| Testes | `routeStatus`, `imageLoadStatus`, `mobileStatus`, `keyboardStatus`, `checkProfilesStatus`, `buildStatus`, `deploymentId`, `commitSha` | Não preencher como aprovado por inferência; vincular ao relatório |
| Gestão | `priority`, `issueIds`, `owner`, `reviewer`, `status`, `evidencePath`, `nextAction` | Toda pendência tem ação concreta e responsável |

Valores desconhecidos ficam vazios ou como `nao-verificado`, conforme o tipo definido no cabeçalho do relatório. Datas em ISO 8601; contagens só após leitura. Separar `nao-aplicavel` de `ausente`, e nenhuma célula vazia pode ser interpretada como aprovação.

### 4.2 Campos JSON já encontrados

| Caminho existente | Tipo/uso atual | Conferência planejada |
| --- | --- | --- |
| `slug`, `rank` | Identidade quando presente no perfil | Igualdade com a lista; tornar presença obrigatória somente após migração compatível |
| `lede`, `history[]` | Apresentação e história | Clareza, fonte e ausência de contradições; sem impor texto artificial para atingir tamanho |
| `founded`, `founders[]` | Fundação e fundadores | Distinguir abertura, mudança de sede e reinauguração |
| `cuisine.style`, `cuisine.paragraphs[]` | Estilo e descrição da cozinha | Fidelidade à proposta e distinção de menu atual/histórico |
| `chef.name`, `chef.bio` | Equipe e biografia | Chef atual, função e fonte |
| `dishes[].name`, `desc`, `photo` | Preparações e foto opcional | Identidade, sazonalidade, ano e ausência de promessa de disponibilidade |
| `awards[].year`, `title` | Histórico de prêmios | Ano/edição e categoria; presença no Michelin não implica estrela |
| `practical.address`, `website`, `reservationUrl`, `reservation`, `price` | Dados práticos, links e textos | Destino correto, modalidade de reserva, moeda, taxas e data |
| `sources[]` | Array de URLs | URL válida e evidência do fato correspondente |
| `hero`, `facade`, `gallery[]`, `dishes[].photo` | Objetos de imagem ou ausência | Identidade, licença, créditos, legenda e carregamento |
| `photoReference` | `kind`, `publisher`, `url`, `note` e fontes adicionais | Link externo é referência, não arquivo autorizado a incorporar |
| `photoReference.featuredGalleryIndex`, `previewContext`, `previewTitle`, `previewKicker` | Seleção de imagem contextual e rótulos opcionais | Índice válido e contexto visível, sem chamar foto histórica/contextual de fachada atual |

`src/data/restaurants.js` fornece `rank`, `name`, `city`, `code`, `country`, `continent`, `lat`, `lng`, `slug`, `tier` e notas de classificação. Coordenadas são descritas no próprio arquivo como aproximadas para o mapa: não tratá-las como localização exata da porta do restaurante.

### 4.3 Metadados propostos, ainda não implementados

Adicionar sem quebrar os campos consumidos hoje, primeiro no piloto, depois nos demais lotes:

| Campo proposto | Tipo/valores | Finalidade e validação |
| --- | --- | --- |
| `lastReviewedAt` | String de data ISO, ou `null` | Data de revisão do perfil; não inventar data retroativa |
| `verificationStatus` | `pending`, `partial`, `verified`, `needs-review` | `verified` exige relatório completo e ausência de bloqueios |
| `imageStatus` | `pending`, `licensed-real`, `historical-or-context`, `reference-only`, `none` | Resumo da imagem principal; detalhamento por arquivo continua obrigatório |
| `fieldReviews[]` | Objetos `field`, `sourceUrl`, `checkedAt`, `status`, `note` | Relacionar afirmações e fontes, preservando `sources[]` |
| `practical.reservationMode` | `online`, `phone`, `email`, `contact`, `unknown` | Não exigir reserva online de quem só atende por telefone |
| `practical.phone`, `email` | String ou `null` | Contato verificado; renderizar ação adequada sem fabricar URL |
| `practical.priceDetails` | Objeto ou `null` | `amount` numérico ou `null`, `currency`, `basis`, `taxesIncluded` booleano ou `null`, `sourceUrl`, `checkedAt`, `note` |

Preservar `practical.price` como texto compatível durante a migração. Não converter ausência de preço em zero, nem `unknown` em informação confirmada. Acrescentar regras ao validador junto com a migração; o código atual não valida esses novos campos.

### 4.4 Metadados de cada imagem

Hoje o validador exige `src`, `page`, `author`, `license` e `caption` para fotos publicadas. Também existe `illustrative`. O booleano sozinho não distingue cidade, prédio histórico e restaurante atual.

| Campo | Situação | Regra proposta |
| --- | --- | --- |
| `src`, `page` | Existentes | Arquivo servido e página original, respectivamente; manter origem mesmo se houver hospedagem própria |
| `author`, `license`, `caption`, `illustrative` | Existentes | Crédito legível, licença específica e descrição honesta; revisar o booleano no contexto da foto |
| `kind` | Novo | `facade`, `interior`, `chef`, `dish`, `building` ou `context` |
| `subject`, `alt` | Novos | Identidade do sujeito e texto alternativo; legenda e alt podem ter funções diferentes |
| `capturedAt`, `verifiedAt` | Novos | Data/ano conhecido da foto e data da verificação; captura desconhecida permanece `null` |
| `licenseUrl`, `rightsStatus` | Novos | Link dos termos; `pending`, `approved` ou `rejected`; só `approved` permite publicação |
| `rightsEvidence`, `attribution`, `modifications` | Novos | Referência à licença/autorização, crédito exigido e adaptações realizadas |
| `width`, `height`, `bytes`, `format` | Novos | Valores medidos do derivado servido; apoiar proporção e orçamento de performance |
| `originalSrc`, `localPath` | Novos, opcionais | Rastrear original e derivado quando a licença permitir cópia e otimização |

Autorizações privadas devem ficar em armazenamento restrito; o repositório público recebe apenas referência e resumo de escopo, sem dados pessoais ou documentos privados. Os nomes e enums acima constituem proposta de contrato para o piloto, não declaração de que já existem em todos os JSONs.

## 5. Etapas de execução

### 2.1 — Auditoria dos 100 perfis

**Prioridade:** P0 para diagnóstico bloqueante; P1 para cobertura integral.  
**Entradas:** lista principal, 100 JSONs, documentação da Fase 1 e relatórios de lotes.  
**Entregas:** inventário detalhado, linha de base de métricas e backlog rastreável.

Tarefas e checklist:

- [x] Fixar o SHA de referência e cruzar lista, slugs, ranks, arquivos e rotas `/restaurante/:slug`; detectar duplicados, ausências e perfis fora da lista.
- [ ] Ler os 100 JSONs em grupos de dez; registrar campos vazios, divergências, extensão editorial e fontes, sem extrapolar da amostra.
- [ ] Classificar cada imagem por sujeito, época, licença e local de uso; contar arquivos únicos sem duplicar capa/fachada idênticas.
- [x] Executar o validador e o build; guardar saída completa, avisos, erros, ambiente e SHA. Ver evidências do L0.
- [ ] Testar home, lista, mapa, filtros, página individual e rota desconhecida; documentar problemas reproduzíveis.
- [x] Preencher `fase-2-inventario.csv` e criar `docs/lotes/fase-2-auditoria-inicial.md` com totais, limites e links de evidência. Primeira versão estrutural; campos não verificados continuam explícitos.
- [ ] Triar cada achado como P0/P1/P2; indicar responsável, dependência e teste que comprovará a correção.

**Aceite verificável:** 100 linhas únicas conciliadas com os 100 arquivos e rotas; todos os campos de auditoria classificados; cada problema com ID, prioridade e evidência. Registrar o resultado real dos comandos, inclusive falha. Auditoria concluída não significa que seus problemas estejam corrigidos.

### 2.2 — Fotos reais, fontes e licenças

**Prioridade:** P0 para imagem incorreta ou direito não demonstrado; P1 para tratamento consistente das ausências; P2 para expansão adicional da galeria.  
**Arquivos:** perfis afetados, `Profile.jsx`, `Restaurant.jsx` e, se adotado no piloto, `public/images/restaurants/<slug>/`.

Tarefas e checklist:

- [ ] Priorizar páginas com imagem enganosa ou quebrada, depois as sem foto real autorizada; pesquisar fachada/entrada, interior, chef e pratos.
- [ ] Conferir visualmente restaurante, endereço, unidade, chef e preparação. Uma URL válida e uma legenda existente não comprovam identidade.
- [ ] Conferir os termos de cada arquivo e guardar fonte, autoria, licença, versão, data e condições de reutilização.
- [ ] Distinguir fachada atual, fotografia histórica, edifício que abriga a casa e paisagem contextual na própria apresentação.
- [ ] Publicar apenas material com direito demonstrado; quando houver somente referência oficial, usar `photoReference` e apresentação neutra.
- [ ] Preencher os metadados definidos em 4.4; implementar renderização e validação dos novos campos antes da migração em massa.
- [ ] Quando permitido, gerar derivados WebP/AVIF, medir dimensões e bytes, preservar origem/crédito e conferir o resultado visual.
- [ ] Testar falha do servidor externo e ausência de imagem: manter texto e navegação, sem ícone quebrado ou foto genérica atribuída à casa.

**Cautelas de direito autoral:** crédito não substitui licença; acesso público, presença no site oficial ou em busca de imagens não demonstram autorização de republicação. Não copiar Google Street View, redes sociais, avaliações ou imprensa automaticamente. Licenças com restrições de uso, adaptação ou atribuição exigem leitura específica; dúvida fica bloqueada para incorporação. Para Creative Commons, conferir a licença e versão do arquivo, atribuição, link e obrigações aplicáveis a adaptações; não presumir que todas as licenças de um mesmo site são iguais. Contato com titulares e eventual autorização devem ser registrados; este plano não pressupõe mensagens já enviadas ou permissões obtidas.

**Aceite verificável:** zero imagens publicadas com identidade errada, direito pendente ou falha de carregamento; 100% das fotos incorporadas com evidência e crédito acessível; 100 perfis com situação fotográfica registrada. Foto ausente pode ser aceita com fallback neutro e pendência explícita: não contar referência externa como foto incorporada nem declarar cobertura real de 100% por causa do fallback.

### 2.3 — Identidade visual, responsividade e filtros

**Prioridade:** P0 para navegação bloqueada; P1 para consistência e acessibilidade; P2 para refinamento ornamental.  
**Base:** preservar `BrandMark`, papel `#f4efe6` / escuro `#15110e`, vinho `#7a1f2b` / escuro `#d0707f`, Cormorant Garamond e Source Serif 4, conforme identidade existente.

Tarefas e checklist:

- [ ] Revisar home, ranking, perfis, cabeçalhos, créditos, estados vazios e botões de reserva com os mesmos tokens e componentes.
- [ ] Padronizar proporção das imagens, ritmo dos textos, alinhamento dos itens e tratamento de títulos longos; manter leitura confortável em mobile.
- [ ] Usar `BrandMark` nas ocorrências visuais da marca, inclusive placeholders; revisar o glifo isolado usado hoje no fallback de pratos.
- [ ] Validar telas de 320, 375, 768, 1024 e 1440 px, temas claro/escuro e zoom de 200%; não cortar nomes, créditos, menu ou ações.
- [ ] Exercitar dropdowns no alto e no fim da tela: rolagem interna, bandeiras, alinhamento, fechamento externo, Escape, setas e retorno de foco.
- [ ] Verificar busca com e sem acento, país, continente, faixa 1–50/51–100, combinações, limpar filtros e resultados vazios.
- [ ] Definir a semântica das contagens: manter, inicialmente, países contados no continente selecionado, como no código atual; a contagem do resultado final considera todos os filtros ativos. Explicitar essa diferença na interface se causar ambiguidade.
- [ ] Testar mudança de continente limpando país, restauração dos parâmetros da URL em recarga e navegação entre home/lista/mapa.
- [ ] Conferir contraste, foco visível, nomes acessíveis, ordem de títulos, alt e `prefers-reduced-motion`; revisar a abertura animada com movimento reduzido.

**Aceite verificável:** sem sobreposição, corte ou rolagem horizontal indevida nas larguras acima; fluxos principais completos por teclado; todas as combinações testadas retornam a mesma lista e contagem do conjunto de dados. Sem filtro, 100 resultados; faixas isoladas, 50 cada. Registrar screenshots e resultados em pelo menos Chromium e Firefox, além de Safari/iOS ou dispositivo equivalente quando disponível. Indisponibilidade de navegador deve aparecer como lacuna, não como teste aprovado.

### 2.4 — Qualidade de dados e reservas

**Prioridade:** P0 para identidade/destino incorreto e afirmações enganosas; P1 para revisão factual completa.  
**Arquivos:** `restaurants.js`, perfis, validador e componentes de informações práticas quando necessário.

Tarefas e checklist:

- [ ] Conferir nome, cidade, país, endereço e unidade; preservar ranking/edição de referência e registrar divergências com fontes oficiais.
- [ ] Revisar fundação, chef, história, pratos e prêmios; separar reconhecimentos históricos de situação atual.
- [ ] Relacionar fatos e URLs em `fieldReviews[]`, com data, status e nota de divergência.
- [ ] Abrir cada canal de reserva e conferir o restaurante no destino final; verificar redirecionamentos, HTTPS, unidade e idioma.
- [ ] Tratar reservas online, telefone, e-mail e contato; não substituir reserva exclusivamente telefônica por botão genérico de disponibilidade.
- [ ] Se o destino retornar 403/429 ou bloquear automação, fazer conferência manual e registrar resultado; não considerar link morto por um único bloqueio.
- [ ] Registrar moeda original, valor por pessoa/menu, inclusões, impostos, serviço e data; preservar `++` com explicação e preços desconhecidos como não confirmados.
- [ ] Conferir políticas práticas nas fontes oficiais; não prometer vaga, preço vigente ou atendimento de restrição alimentar em tempo real.
- [ ] Migrar os metadados de revisão primeiro no piloto; ampliar o validador para tipos, datas, enums e relações obrigatórias.
- [ ] Registrar telefone/e-mail apenas quando confirmados; testar a ação de abrir canal sem enviar mensagens, efetuar reserva ou pagamento.

**Aceite verificável:** 100 perfis revisados com fonte e data; zero links de reserva que apontem comprovadamente para outra casa; cada perfil tem canal confirmado ou aviso explícito de indisponibilidade de confirmação. Informações voláteis devem ser reconferidas nos 30 dias anteriores à homologação; se isso não for possível, o dado antigo deve ser retirado da afirmação de atualidade e a limitação exibida. Divergências sem resolução permanecem sinalizadas e não recebem `verified`.

### 2.5 — Performance e SEO

**Prioridade:** P1; P0 se houver regressão que impeça acesso.  
**Arquivos:** `Restaurant.jsx`, `Profile.jsx`, `profiles.js`, `index.html`, `vite.config.js` e arquivos de SEO a criar somente após definir a estratégia.

Tarefas e checklist:

- [ ] Medir antes de alterar: home, lista, Asador, um perfil com muitas imagens e um com fallback; registrar URL, SHA, data, ferramenta, versão e configuração.
- [ ] Preservar carregamento dos perfis sob demanda; verificar chunks para evitar incorporar os 100 textos no pacote inicial.
- [ ] Definir largura/altura ou proporção estável; usar imagens responsivas, carregamento adiado abaixo da dobra e prioridade adequada à imagem LCP.
- [ ] Tratar fontes e abertura animada sem bloquear leitura; respeitar movimento reduzido e verificar layout após carregamento de fontes.
- [ ] Revisar título individual já existente e acrescentar descrição, canonical e metadados sociais específicos, sem reutilizar a URL da home em todos os perfis.
- [ ] Avaliar prerenderização das rotas para crawlers e prévias sociais; escolher no piloto se os metadados precisam estar no HTML inicial. Mudança só por JavaScript não comprova prévia social correta.
- [ ] Gerar sitemap com URLs canônicas da home, lista e 100 perfis; criar robots conforme domínio final, sem rotas de parâmetros desnecessárias.
- [ ] Validar dados estruturados de restaurante quando houver dados confirmados; não transformar posição do ranking em nota de avaliação, nem inventar estrelas ou reviews.
- [ ] Testar acesso direto/recarga nas rotas e comportamento de slug desconhecido; planejar tratamento de 404 real na camada de publicação quando o fallback de SPA devolver 200.

**Aceite verificável e método:** três execuções Lighthouse mobile por URL de amostra, no mesmo ambiente, usando a mediana; meta mínima 90 em Performance, Acessibilidade, Boas Práticas e SEO. Registrar também pior resultado e variação. Como metas de laboratório, LCP ≤ 2,5 s e CLS ≤ 0,1; acompanhar TBT e interações sob throttling. INP ≤ 200 ms no percentil 75 é meta de campo quando houver dados suficientes; ausência de amostra não permite alegar Core Web Vitals aprovados. Lighthouse não comprova WCAG.

Em todas as 100 rotas, conferir título, descrição, canonical, conteúdo e ausência de duplicação indevida. Sitemap deve ter somente URLs canônicas válidas; prévias sociais devem corresponder ao perfil nas amostras e usar imagem autorizada. Valores são metas, não resultados obtidos.

### 2.6 — Testes, publicação e homologação

**Prioridade:** P0 para bloqueios; P1 para fechamento.  
**Entradas:** lotes revisados, backlog atualizado e candidato de publicação identificado por SHA.

Tarefas e checklist:

- [ ] Executar `npm ci`, `npm run check:profiles` e `npm run build` no candidato exato; guardar códigos de saída e logs.
- [ ] Abrir as 100 rotas em acesso direto e recarga; comprovar que o conteúdo é do slug esperado, não apenas resposta HTTP 200 da SPA.
- [ ] Conferir carregamento de todas as fotos incorporadas, créditos e links; não navegar automaticamente para concluir uma reserva.
- [ ] Repetir os fluxos de busca, filtros, mapa, anterior/próximo, links externos e estados de carregamento/ausência/erro.
- [ ] Testar layout, temas e teclado na matriz da etapa 2.3; combinar análise automatizada de acessibilidade com inspeção manual e leitor de tela.
- [ ] Revisar especialmente nomes longos, reservas só por telefone, imagens históricas, ausência de foto e mudança rápida entre slugs.
- [ ] Consultar Railway após o commit e conferir branch, SHA, ID do deploy, status, logs e domínio; testar o site público no deploy correspondente.
- [ ] Se houver falha, interromper avanço dos lotes; corrigir com commit pequeno ou reverter somente a alteração problemática, preservando trabalho alheio.
- [ ] Consolidar `docs/lotes/fase-2-homologacao.md` com testes, métricas, limitações, P2 adiados e aceite identificado de produto.

**Aceite verificável:** 100/100 rotas com conteúdo correto; zero P0/P1 abertos; 100 perfis com decisão sobre imagens e dados; comandos com saída zero; deploy correspondente em `SUCCESS` e smoke test público aprovado. Alvo de acessibilidade: WCAG 2.2 AA nos fluxos avaliados; não declarar conformidade integral só com pontuação automatizada. P2 podem permanecer se documentados. A Fase 2 só chega a 100% após esses critérios e aceite de produto.

## 6. Sequência de implementação por lotes

Auditar todo o acervo antes da expansão visual. Resolver P0 assim que identificados. Trabalhar metadados, fotos e dados do mesmo perfil no mesmo lote para reduzir divergência.

| Ordem/lote | Escopo | Entrega e dependência | Saída |
| --- | --- | --- | --- |
| L0 | 2.1, posições 1–100 em dez grupos de dez | Inventário, comandos de base, métricas e triagem; depende de checkout e acesso às fontes | Auditoria completa e fila ordenada por gravidade |
| L1 piloto | Asador Etxebarri, Steirereck, Den, Khufu’s e Aponiente | Contrato de metadados e layout em casos distintos; confirmar situações no L0 antes de usá-las como exemplos | Cinco perfis passam pelo fluxo 2.2–2.6; componentes e validação compatíveis |
| LT | Componentes compartilhados de 2.3 e fundação de 2.5 | Filtros, acessibilidade, imagens e metadados; depende do piloto | Regressão do piloto e das páginas principais aprovada |
| L2–L10 | Nove lotes de dez perfis ainda não homologados | Pendências P0/P1 primeiro; desempate por rank crescente; lista nominal fixada no relatório de cada lote | 90 perfis adicionais validados, sem duplicar os cinco do piloto |
| L11 | Cinco perfis restantes | Fechar a cobertura e revalidar itens alterados após o piloto | 100 perfis com registro e aceite de lote |
| LF | Conjunto completo, 2.5 final e 2.6 | Medições finais, revisão transversal e publicação; depende de todos os lotes | Relatório final e aceite de produto |

A aritmética de migração é **5 + 9 × 10 + 5 = 100 perfis**. LT não adiciona perfis à contagem. O ranking não muda por causa da ordem dos trabalhos. Se uma licença atrasar, aplicar fallback neutro validado e manter a aquisição da foto em P2; foto incorreta ou uso sem direito continua P0.

Cada lote recebe `docs/lotes/fase-2-LNN.md`, com lista nominal dos slugs, checklist, antes/depois, fontes, resultado dos comandos, SHA e Railway. Não iniciar o lote seguinte enquanto houver P0 no lote atual; P1 também precisam ser resolvidos para marcá-lo como validado. Dependências externas podem mudar a ordem, com registro explícito.

## 7. Backlog inicial priorizado

A tabela abaixo registra o backlog originalmente planejado. Consulte a seção 12 e o relatório L0 para o estado atual, os achados confirmados e as tarefas já executadas.

| ID | Etapa | Prioridade | Tarefa concreta | Dependência | Evidência de aceite |
| --- | --- | --- | --- | --- | --- |
| F2-01 | 2.1 | P1 | Criar inventário detalhado e cruzar 100 registros | SHA de base | CSV com 100 slugs únicos e sem campos de auditoria indefinidos |
| F2-02 | 2.1 | P1 | Rodar validador/build e medir linha de base | Node, lockfile, ambiente | Logs e métricas vinculados ao SHA |
| F2-03 | 2.1/2.2 | P0 quando confirmado | Retirar/corrigir foto enganosa, quebrada ou sem direito | Auditoria por arquivo | Identidade e autorização comprovadas ou fallback sem exposição incorreta |
| F2-04 | 2.2/2.4 | P1 | Implementar metadados e validação no piloto | F2-01 | Tipos/enums/datas validados, renderização compatível |
| F2-05 | 2.2 | P1 | Documentar direitos e créditos do acervo publicado | F2-03/04 | Cada imagem com fonte, condição e prova |
| F2-06 | 2.3 | P1 | Padronizar imagens, textos e fallback com identidade existente | Piloto | Matriz de telas/temas e screenshots |
| F2-07 | 2.3 | P1 | Testar/corrigir dropdowns, filtros, busca e contagens | L0 | Casos de teclado, combinações e contagens aprovados |
| F2-08 | 2.4 | P0 quando confirmado | Corrigir canal de reserva incorreto ou afirmação enganosa | Fonte oficial | Destino e texto corretos, reteste registrado |
| F2-09 | 2.4 | P1 | Revisar fatos, preços e modalidades dos 100 perfis | F2-01/04 | Fontes e datas por campo, ressalvas visíveis |
| F2-10 | 2.5 | P1 | Otimizar imagens, fontes, carregamento e estabilidade | F2-02/06 | Medianas e metas da etapa 2.5 |
| F2-11 | 2.5 | P1 | Implementar canonical, descrição, sitemap e estratégia de prévias | Domínio e piloto | Validação das 100 rotas e HTML/prévias de amostra |
| F2-12 | 2.6 | P1 | Regressão completa, Railway e aceite | Todos os P0/P1 | Relatório final, SHA e deploy correspondente |
| F2-13 | 2.2 | P2 | Ampliar galerias com interior, chef e pratos autorizados | Direitos disponíveis | Novas imagens verificadas e sem regressão |
| F2-14 | 2.3 | P2 | Refinar detalhes ornamentais sem afetar leitura | Layout homologado | Revisão visual e acessibilidade preservadas |

O relatório de cada lote detalha as linhas em tarefas por slug. Campos mínimos do backlog operacional: ID, lote, slug/escopo, descrição reproduzível, prioridade, responsável, revisor, dependência, estado, critério, evidência, SHA e próxima ação. Não estimar prazo antes de conhecer volume de pendências e tempo de licenciamento.

## 8. Métricas e critérios de acompanhamento

| Métrica | Como medir | Meta | Linha de base nesta abertura |
| --- | --- | --- | --- |
| Arquivos conciliados | JSONs esperados existentes / 100 | 100/100 | 100/100 por árvore e lista; conteúdo não auditado integralmente |
| Perfis auditados | Linhas com todas as classificações / 100 | 100/100 | Ainda não medido |
| Perfis homologados | Perfis que passaram todos os gates / 100 | 100/100 | Ainda não medido |
| Cobertura real autorizada | Perfis com ao menos uma foto real do estabelecimento e direito demonstrado / 100 | Maximizar; publicar valor real | Ainda não medido; fallback não entra no numerador |
| Situação fotográfica registrada | Perfis com classificação/fallback deliberado / 100 | 100/100 | Ainda não medido |
| Direitos rastreáveis | Fotos incorporadas únicas com prova / total de fotos incorporadas únicas | 100% | Ainda não medido |
| Falhas visuais de imagem | Fotos com erro de carregamento ou atribuição incorreta | 0 | Ainda não medido |
| Dados práticos revisados | Perfis com fonte/data/decisão de contato e preço / 100 | 100/100 | Ainda não medido |
| Rotas válidas | URLs que renderizam identidade/conteúdo esperado / 100 | 100/100 | Ainda não medido |
| Defeitos bloqueantes | P0 e P1 abertos, contados separadamente | 0/0 no fechamento | Ainda não medido |
| Performance/SEO | Medianas de três execuções por URL, conforme 2.5 | ≥90; LCP/CLS nas metas | Ainda não medido |
| Comandos | Saída de check:profiles/build no SHA candidato | Ambos 0; avisos triados | Não executados nesta entrega |
| Publicação | SHA, ID/status do deploy e smoke test público | SUCCESS + teste aprovado | SUCCESS da base; smoke test integral pendente |

Se não houver fotos incorporadas no denominador de um recorte, marcar a taxa de direitos como não aplicável, sem transformar ausência em cobertura fotográfica de 100%. Não somar percentuais editoriais, fotos e deploy em uma porcentagem arbitrária.

Para progresso da Fase 2, usar perfis homologados/100 e, separadamente, marcos transversais 2.1–2.6. Conclusão dos perfis isolados não dispensa os testes transversais finais.

## 9. Verificação técnica e Railway

Executar em checkout do SHA candidato, com Node compatível e o lockfile versionado:

```bash
npm ci
npm run check:profiles
npm run build
```

- Registrar `node --version`, `npm --version`, SHA, data, códigos de saída e logs completos.
- `check:profiles` verifica estrutura e fontes sintaticamente válidas; conta capas, fachadas e outros elementos. Não faz prova factual, jurídica, HTTP ou visual.
- Avisos de capa/dados práticos hoje não bloqueiam o script; todos precisam de classificação e decisão. Saída zero não significa ausência de pendência editorial.
- `npm run build` executa Vite e é independente do validador no `package.json` atual; executar ambos explicitamente.
- Para conferência local de produção, usar `npm run preview` após o build; o Railway usa `npm start`, que serve `dist/` com fallback de SPA e a porta do ambiente.
- Testar o modo de produção, não apenas o servidor de desenvolvimento.

Checklist de publicação:

- [ ] Confirmar que a `main` contém apenas as alterações previstas para o lote e registrar SHA anterior/candidato.
- [ ] Consultar o projeto [carta no Railway](https://railway.com/project/ef7ba885-aa9d-4f0a-b583-f85d3cd8a911), ambiente `production`, serviço `melhores-restaurantes`.
- [ ] Associar o deploy ao SHA candidato; `SUCCESS` de commit anterior não valida a publicação nova.
- [ ] Conferir build/start, logs e domínio. `pending`, `BUILDING`, `DEPLOYING`, `FAILED` ou `CRASHED` não são publicação aprovada.
- [ ] Se um commit só documental for ignorado por regras de deploy, registrar o skip e o SHA que continua em produção; não confundir publicação do Markdown no GitHub com versão do site.
- [ ] Abrir domínio público, lista e rotas alteradas em acesso direto; no fechamento, todas as 100.
- [ ] Registrar falhas de console, imagens, links e comportamento de rota inexistente; HTTP 200 sozinho não basta.
- [ ] Em falha, guardar logs, corrigir/reverter o commit do lote e conferir novamente o deploy. Evitar alterações não relacionadas e reescrita do histórico da `main`.

Não alterar configurações do Railway nem disparar redeploy manual apenas para afirmar que o plano foi publicado; esta entrega é documental. A verificação de referência em 2 é um retrato datado, e cada lote deve produzir sua própria evidência.

## 10. Riscos e dependências

| Risco/dependência | Impacto | Tratamento e gatilho | Responsabilidade a atribuir |
| --- | --- | --- | --- |
| Licença ausente, ambígua ou restritiva | Uso indevido e atraso nas fotos | Bloquear incorporação; fallback neutro; registrar referência e eventual autorização | Imagens/direitos |
| Foto histórica ou unidade errada | Usuário induzido a erro | Conferir local/data; rotular ou retirar antes de aprovar | Editorial + imagens |
| Mudanças em preço, chef, menu ou reservas | Dado desatualizado | Fonte/data por campo; rever dados voláteis na janela de homologação | Editorial/dados |
| Bloqueios e limites de fontes/APIs | Auditoria incompleta | Lotes de dez, guardar checkpoint, tratar 403/429 manualmente e não inventar resultado | Dados/técnico |
| Dependência de hotlink e fontes externas | Foto indisponível, lentidão | Derivados locais só com direito; fallback e testes de falha | Técnico |
| Mudança de schema sem compatibilidade | Perfil sem renderização ou validação insuficiente | Migrar no piloto; preservar campos existentes e testar estados ausentes | Técnico |
| SPA com 200 genérico e metadados só no cliente | Falso positivo de rota e prévia/indexação errada | Testar conteúdo, HTML inicial, canonical e 404; decidir prerender no piloto | Técnico/SEO |
| Acesso a Node, dependências ou Railway | Checks/deploy não verificáveis | Registrar impedimento e ambiente; não marcar aceito sem evidência | Técnico |
| Mudanças concorrentes na main | Sobrescrita e evidência de SHA diferente | Reler o head antes de publicar; commit pequeno, sem force push | Executor do lote |
| Cobertura de navegadores/dispositivos incompleta | Regressão não detectada | Matriz explícita; manter lacunas abertas até teste ou decisão documentada | Homologação |
| Métricas de laboratório variáveis e pouco tráfego | Alegação incorreta de desempenho real | Três execuções comparáveis; separar laboratório de campo | Técnico/homologação |

## 11. Registro de progresso e aceite por lote

### 11.1 Diário inicial

| Data | Registro | Evidência | Estado |
| --- | --- | --- | --- |
| 09/11/2026 | Leitura da documentação existente, código de apresentação/filtros/validação e amostras Asador/Khufu’s | Arquivos e SHA de referência da seção 2 | Planejamento fundamentado |
| 09/11/2026 | Cruzamento da lista de 100 nomes/slugs com 100 arquivos JSON | Árvore recursiva do GitHub no SHA de referência | Existência confirmada; revisão integral pendente |
| 09/11/2026 | Consulta Railway: deploy da base em SUCCESS | ID e SHA da seção 2 | Estado de infraestrutura consultado; homologação pública pendente |
| 09/11/2026 | Definição deste plano de seis etapas | Este documento | Execução da Fase 2 ainda não realizada nesta entrega |

O SHA de publicação deste plano deve ser consultado no histórico do arquivo; não inserir no próprio documento um SHA futuro ou presumido.

### 11.2 Modelo para os próximos registros

Usar este formato nos relatórios de `docs/lotes/`:

| Data/hora BRT | Lote/etapa | Slugs/escopo | Tarefa/ID | Antes → depois | Responsável/revisor | Comandos e resultado | SHA/deploy | Evidência | Pendência/próxima ação |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A preencher na execução | — | — | — | — | A designar | Não executados | — | — | — |

Checklist obrigatório antes de marcar um lote como validado:

- [ ] Lista nominal fechada, inventário atualizado e critérios das etapas aplicáveis atendidos.
- [ ] Fontes, datas, licença e natureza de cada imagem conferidas; ausência tratada explicitamente.
- [ ] Reservas/preços revisados sem alegação de disponibilidade em tempo real.
- [ ] Validador e build executados no candidato; avisos triados.
- [ ] Testes de produção e matriz visual/funcional registrados.
- [ ] Commit e estado Railway conferidos; falhas e limitações preservadas no relatório.
- [ ] Zero P0/P1 em aberto no lote; P2 com destino e responsável.
- [ ] Revisor identificado e decisão de aceite registrada.

**Próxima ação executável:** completar a revisão factual/fotográfica do L0, usando os inventários já criados e priorizando o piloto. A varredura estrutural, rotas e medições foram realizadas; a homologação permanece pendente. Ver seção 12.

## 12. Atualização de execução — 09/11/2026, checkpoint L0

Relatório detalhado: [auditoria inicial](lotes/fase-2-auditoria-inicial.md). Inventários: [100 perfis](lotes/fase-2-inventario.csv) e [339 usos de imagens](lotes/fase-2-imagens.csv).

| Frente | Progresso comprovado | O que continua aberto |
| --- | --- | --- |
| 2.1 / L0 | 100 JSONs parseados e conciliados; 100 rotas locais com nome/lede corretos; nove cenários de filtro; cinco páginas públicas abertas | Revisão factual, fotografias/direitos, matriz completa e aceite de lote |
| 2.2 | 339 usos, 317 URLs e 316 páginas de origem inventariados; 92 capas e 30 campos de fachada | Fontes/identidade/licenças por arquivo; números de presença não comprovam cobertura real |
| 2.3 | Cabeçalho corrigido após teste falhar em 320/375 px; reteste passou nas cinco larguras; 30 casos de layout sem overflow | Firefox/Safari, zoom, teclado integral e acessibilidade manual |
| 2.4 | Identificados dois websites ausentes e 29 perfis sem reservationUrl | Confirmar canais e dados voláteis nas fontes; não equivale a 29 reservas inexistentes |
| 2.5 | 15 medições públicas; medianas de Performance: home 95, lista 98, Asador/Khufu’s/Aponiente 88 | Metas dos perfis, robots inválido, canonical ausente e metadados genéricos |
| 2.6 | check:profiles e build com saída zero; dez avisos preservados; correção em SUCCESS no Railway e teste público aprovado | Homologação integral; nenhuma fase integralmente homologada |

Os logs e medições identificam a base `9efc8eb0b4149a653c01e6a6541cca62081f9c97`; medições públicas ocorreram antes da publicação da correção mobile. Não reescrever os resultados históricos da abertura como se tivessem sido medidos naquela ocasião.

**Decisão registrada:** antecipar apenas a correção estreita do cabeçalho compartilhado, pois o corte de links/tema foi reproduzido durante L0. A mudança preserva identidade e tem evidência antes/depois; não libera os demais lotes sem completar a auditoria. **Perfis integralmente homologados neste checkpoint: 0/100.**

**Publicação verificada:** commit [d08fab7](https://github.com/AndreRuperto/melhores-restaurantes/commit/d08fab7de5a6afe9698492df74548f9e1a689a70), deploy Railway `9c39bd01-fed1-470b-a193-ad81c91f2186` em SUCCESS. Teste público da lista em 320/375/768/1024/1440 aprovado, sem corte dos links/tema; [evidência](lotes/fase-2-evidencias/publicacao-L0.json). Registro de 09/11/2026, 18h08 BRT, referente à versão de código observada.

**Registro de testes:** npm ci, check:profiles e build executados; presença estrutural dos 100 perfis e rotas locais conferida. Resultados e limites no [relatório L0](lotes/fase-2-auditoria-inicial.md). Fontes, direitos e fatos não verificados continuam pendentes; não foram enviadas solicitações de autorização nem realizadas reservas.

## Apêndice A — Inventário nominal dos 100 perfis

Base: `src/data/restaurants.js` e árvore do GitHub no SHA da seção 2. **Todos os arquivos abaixo existem** no cruzamento realizado. A coluna de auditoria distingue a conferência estrutural/rota já feita da revisão integral ainda pendente da Fase 2 e não apaga a conclusão editorial da Fase 1. Os nomes/posições são reproduzidos do acervo, sem nova verificação externa do ranking.

A rota de cada linha é `/restaurante/<nome-do-arquivo-sem-.json>`. Este inventário não atribui cobertura fotográfica, validade factual ou aceite individual.

| Posição | Restaurante | País (código do acervo) | Arquivo JSON | Auditoria Fase 2 |
| ---: | --- | --- | --- | --- |
| 1 | Asador Etxebarri | ES | [asador-etxebarri.json](../src/data/profiles/asador-etxebarri.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 2 | Gaggan | TH | [gaggan.json](../src/data/profiles/gaggan.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 3 | Alchemist | DK | [alchemist.json](../src/data/profiles/alchemist.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 4 | Quintonil | MX | [quintonil.json](../src/data/profiles/quintonil.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 5 | Wing | CN | [wing.json](../src/data/profiles/wing.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 6 | The Chairman | CN | [the-chairman.json](../src/data/profiles/the-chairman.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 7 | Kjolle | PE | [kjolle.json](../src/data/profiles/kjolle.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 8 | Kadeau | DK | [kadeau.json](../src/data/profiles/kadeau.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 9 | DiverXO | ES | [diverxo.json](../src/data/profiles/diverxo.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 10 | Plénitude | FR | [plenitude.json](../src/data/profiles/plenitude.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 11 | Atomix | US | [atomix.json](../src/data/profiles/atomix.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 12 | Sorn | TH | [sorn.json](../src/data/profiles/sorn.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 13 | Mérito | PE | [merito.json](../src/data/profiles/merito.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 14 | Sühring | TH | [suhring.json](../src/data/profiles/suhring.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 15 | Odette | SG | [odette.json](../src/data/profiles/odette.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 16 | Tuju | BR | [tuju.json](../src/data/profiles/tuju.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 17 | Mingles | KR | [mingles.json](../src/data/profiles/mingles.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 18 | Nusara | TH | [nusara.json](../src/data/profiles/nusara.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 19 | Jan | DE | [jan.json](../src/data/profiles/jan.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 20 | Piazza Duomo | IT | [piazza-duomo.json](../src/data/profiles/piazza-duomo.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 21 | Meet the Bund | CN | [meet-the-bund.json](../src/data/profiles/meet-the-bund.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 22 | Boragó | CL | [borago.json](../src/data/profiles/borago.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 23 | Vyn | SE | [vyn.json](../src/data/profiles/vyn.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 24 | Al Gatto Verde | IT | [al-gatto-verde.json](../src/data/profiles/al-gatto-verde.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 25 | Lasai | BR | [lasai.json](../src/data/profiles/lasai.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 26 | Masque | IN | [masque.json](../src/data/profiles/masque.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 27 | Reale | IT | [reale.json](../src/data/profiles/reale.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 28 | Trèsind Studio | AE | [tresind-studio.json](../src/data/profiles/tresind-studio.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 29 | Enigma | ES | [enigma.json](../src/data/profiles/enigma.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 30 | Steirereck | AT | [steirereck.json](../src/data/profiles/steirereck.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 31 | Celele | CO | [celele.json](../src/data/profiles/celele.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 32 | Potong | TH | [potong.json](../src/data/profiles/potong.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 33 | Elkano | ES | [elkano.json](../src/data/profiles/elkano.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 34 | Le Coquillage | FR | [le-coquillage.json](../src/data/profiles/le-coquillage.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 35 | La Colombe | ZA | [la-colombe.json](../src/data/profiles/la-colombe.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 36 | Ru Yuan | CN | [ru-yuan.json](../src/data/profiles/ru-yuan.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 37 | Nuema | EC | [nuema.json](../src/data/profiles/nuema.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 38 | Atelier Moessmer Norbert Niederkofler | IT | [atelier-moessmer-norbert-niederkofler.json](../src/data/profiles/atelier-moessmer-norbert-niederkofler.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 39 | Schloss Schauenstein | CH | [schloss-schauenstein.json](../src/data/profiles/schloss-schauenstein.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 40 | Jordnær | DK | [jordn-r.json](../src/data/profiles/jordn-r.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 41 | Onjium | KR | [onjium.json](../src/data/profiles/onjium.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 42 | Bozar | BE | [bozar.json](../src/data/profiles/bozar.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 43 | Le Calandre | IT | [le-calandre.json](../src/data/profiles/le-calandre.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 44 | Don Julio | AR | [don-julio.json](../src/data/profiles/don-julio.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 45 | Mayta | PE | [mayta.json](../src/data/profiles/mayta.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 46 | El Chato | CO | [el-chato.json](../src/data/profiles/el-chato.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 47 | Le Louis XV-Alain Ducasse à l’Hôtel de Paris | MC | [le-louis-xv-alain-ducasse-a-lhotel-de-paris.json](../src/data/profiles/le-louis-xv-alain-ducasse-a-lhotel-de-paris.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 48 | Ikoyi | GB | [ikoyi.json](../src/data/profiles/ikoyi.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 49 | Naar | IN | [naar.json](../src/data/profiles/naar.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 50 | Saint Peter | AU | [saint-peter.json](../src/data/profiles/saint-peter.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 51 | Uliassi | IT | [uliassi.json](../src/data/profiles/uliassi.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 52 | La Cime | JP | [la-cime.json](../src/data/profiles/la-cime.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 53 | Ling Long | CN | [ling-long.json](../src/data/profiles/ling-long.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 54 | Nelita | BR | [nelita.json](../src/data/profiles/nelita.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 55 | Alcalde | MX | [alcalde.json](../src/data/profiles/alcalde.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 56 | Sazenka | JP | [sazenka.json](../src/data/profiles/sazenka.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 57 | Koan | DK | [koan.json](../src/data/profiles/koan.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 58 | Frantzén | SE | [frantzen.json](../src/data/profiles/frantzen.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 59 | Narisawa | JP | [narisawa.json](../src/data/profiles/narisawa.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 60 | Hiša Franko | SI | [hisa-franko.json](../src/data/profiles/hisa-franko.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 61 | Florilège | JP | [florilege.json](../src/data/profiles/florilege.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 62 | Fu He Hui | CN | [fu-he-hui.json](../src/data/profiles/fu-he-hui.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 63 | The Jane | BE | [the-jane.json](../src/data/profiles/the-jane.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 64 | Seroja | SG | [seroja.json](../src/data/profiles/seroja.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 65 | Fyn | ZA | [fyn.json](../src/data/profiles/fyn.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 66 | Willem Hiele | BE | [willem-hiele.json](../src/data/profiles/willem-hiele.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 67 | Arpège | FR | [arpege.json](../src/data/profiles/arpege.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 68 | Evvai | BR | [evvai.json](../src/data/profiles/evvai.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 69 | Cocina Hermanos Torres | ES | [cocina-hermanos-torres.json](../src/data/profiles/cocina-hermanos-torres.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 70 | Kol | GB | [kol.json](../src/data/profiles/kol.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 71 | Salsify at the Roundhouse | ZA | [salsify-at-the-roundhouse.json](../src/data/profiles/salsify-at-the-roundhouse.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 72 | Eatanic Garden | KR | [eatanic-garden.json](../src/data/profiles/eatanic-garden.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 73 | Chef Tam’s Seasons | CN | [chef-tams-seasons.json](../src/data/profiles/chef-tams-seasons.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 74 | Le Du | TH | [le-du.json](../src/data/profiles/le-du.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 75 | Belcanto | PT | [belcanto.json](../src/data/profiles/belcanto.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 76 | Nobelhart & Schmutzig | DE | [nobelhart-e-schmutzig.json](../src/data/profiles/nobelhart-e-schmutzig.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 77 | Caprice | CN | [caprice.json](../src/data/profiles/caprice.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 78 | Mosu | KR | [mosu.json](../src/data/profiles/mosu.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 79 | Huniik | MX | [huniik.json](../src/data/profiles/huniik.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 80 | Txispa | ES | [txispa.json](../src/data/profiles/txispa.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 81 | Septime | FR | [septime.json](../src/data/profiles/septime.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 82 | Coda | DE | [coda.json](../src/data/profiles/coda.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 83 | The Ledbury | GB | [the-ledbury.json](../src/data/profiles/the-ledbury.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 84 | Le Doyenné | FR | [le-doyenne.json](../src/data/profiles/le-doyenne.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 85 | Tim Raue | DE | [tim-raue.json](../src/data/profiles/tim-raue.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 86 | Eliane | BE | [eliane.json](../src/data/profiles/eliane.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 87 | Arca | MX | [arca.json](../src/data/profiles/arca.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 88 | FZN | AE | [fzn.json](../src/data/profiles/fzn.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 89 | Burnt Ends | SG | [burnt-ends.json](../src/data/profiles/burnt-ends.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 90 | Baan Tepa | TH | [baan-tepa.json](../src/data/profiles/baan-tepa.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 91 | Den | JP | [den.json](../src/data/profiles/den.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 92 | Lamdre | CN | [lamdre.json](../src/data/profiles/lamdre.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 93 | SingleThread | US | [singlethread.json](../src/data/profiles/singlethread.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 94 | Neolokal | TR | [neolokal.json](../src/data/profiles/neolokal.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 95 | Mil | PE | [mil.json](../src/data/profiles/mil.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 96 | Rosetta | MX | [rosetta.json](../src/data/profiles/rosetta.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 97 | Khufu’s | EG | [khufus.json](../src/data/profiles/khufus.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 98 | Labyrinth | SG | [labyrinth.json](../src/data/profiles/labyrinth.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 99 | Fauna | MX | [fauna.json](../src/data/profiles/fauna.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
| 100 | Aponiente | ES | [aponiente.json](../src/data/profiles/aponiente.json) | Estrutura/rota conferidas; fatos/direitos pendentes |
