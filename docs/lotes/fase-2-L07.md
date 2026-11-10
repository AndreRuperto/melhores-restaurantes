# Fase 2 — L7: perfis 53 a 62

**Data:** 10/11/2026 · **Estado:** em revisão; nenhum perfil homologado.  
**Base:** `28969d0` (main). **Execução:** Claude, com cinco agentes de checagem de fontes (dois perfis cada) e conferência própria de imagens, correções e testes. **Revisor e aceite de produto:** a designar.  
**Lista nominal:** Ling Long (53), Nelita (54), Alcalde (55), Sazenka (56), Koan (57), Frantzén (58), Narisawa (59), Hiša Franko (60), Florilège (61), Fu He Hui (62).

Mesmo método dos lotes anteriores. Nenhuma reserva, formulário ou mensagem foi enviado. Ficaram ilegíveis para leitura automática, sem tentativa de contornar bloqueio:
- as páginas do Guia Michelin;
- os sites do Frantzén, do Hiša Franko e de Ana Roš, que pedem verificação anti-robô;
- hilton.com, OpenTable, OMAKASE, Superb Experience e a página de design citada no Sazenka.

## 1. Imagens

[Evidência do Commons](fase-2-evidencias/commons-L07.json).

- **19 usos, 15 arquivos únicos**, todos no Wikimedia Commons, com HTTP 200; autor e licença conferem com o Commons. Em dois arquivos o perfil grava "CC0 1.0" e o Commons "CC0", que são a mesma licença.
- **Inspeção visual de todas as fotos.** Fotos reais da própria casa:
  - Alcalde: fachada com o letreiro, em 2020;
  - Frantzén: entrada com o nome e o número 26, em 2017, e o prédio da Klara Norra Kyrkogata, em 2018;
  - Narisawa: entrada curva de vidro, em 2017;
  - Hiša Franko: casa e terraço, em 2006, e três pratos de agosto de 2022, conferidos com as descrições do Commons.

  O Ling Long aparece pelo prédio do hotel que o abriga, fotografado antes da abertura. As demais mostram bairro ou região, e as legendas dizem isso.
- **Uma legenda errada, corrigida:**
  - **L07-FR-GALERIA (Frantzén):** a legenda chamava a foto de "uma das etapas da experiência", mas ela mostra o cardápio impresso de setembro de 2023, com menu e harmonizações. A legenda foi corrigida e o tipo passou a `context`.
- **Alcalde:** a história do restaurante trazia uma frase sobre a própria foto do site; a frase foi retirada.
- **Situação por perfil:** `licensed-real` no Alcalde, Frantzén, Narisawa e Hiša Franko; `historical-or-context` nos outros seis.

## 2. Correções aplicadas

| Perfil | Achado | Correção |
| --- | --- | --- |
| Fu He Hui | O site e o link de reserva apontavam para a ficha do Guia Michelin, que não é página oficial; horários atribuídos ao Michelin sem leitura do guia; CEP divergente; faltava a manutenção das duas estrelas em 2026 | Site e link retirados (sem site oficial identificado; L0-SITES); canal por telefone; prêmio de 2026 com o comunicado da Michelin; CEP retirado |
| Frantzén | O preço de SEK 5.500, a regra de abertura da agenda e a ausência de pré-pagamento não foram encontrados (o site oficial está bloqueado); mês do fechamento de 2016 e local de nascimento do chef sem fonte | Preço retirado do texto (fontes secundárias divergem); reserva com contatos conferidos; 35º (2024) e 38º (2025) acrescentados |
| Ling Long | "Nova entrada mais alta" listado como prêmio, mas é só leitura da lista; faltava a estreia asiática de 2024 (36º); telefone oficial do hotel tratado como secundário | Prêmio retirado; 2024 acrescentado; telefone do hotel como principal; dois pratos sem fonte marcados |
| Nelita | O preço vinha de reportagem, mas o cardápio oficial de setembro de 2026 publica valores; a descrição das opções era atribuída ao Michelin; faltava o 21º lugar de 2023; a burrata mudou | Preços oficiais (R$ 790 e R$ 450, serviço opcional); fonte trocada pelo cardápio; prêmio, história e prato corrigidos |
| Sazenka | O preço agora está publicado (cursos de caranguejo de Xangai, a partir de ¥ 71.500); faltava o 29º lugar asiático de 2020; tempo no Azabu Chōkō diverge entre as fontes | Preço, reserva e cancelamento do site oficial; prêmio acrescentado; biografia ajustada |
| Hiša Franko | Estrela Verde datada de 2020 sem fonte (o anúncio de 2020 não a cita); preço atribuído a um "menu oficial" ilegível; regra de uma semana para restrições sem fonte | Estrela Verde ligada a 2023; preço com a plataforma Venuo; reserva com as regras do Venuo e temporada de 2027 |
| Alcalde | Trabalho em navios sem fonte; o andar superior é uma sala reservada; preço mais recente na imprensa; faltavam prêmios de 2016 e 2017 | Biografia, salão, preço (MXN 3.150) e prêmios corrigidos; link do OpenTable usado pelo site oficial |
| Koan | Manteiga de gergelim, mel de ginseng, morangos fermentados e banchan sem fonte; dias de serviço incompletos | Pratos conforme as descrições de 2024; horários da página de contato; telefone marcado como fora do site oficial |
| Florilège | Link de reserva era a página informativa; horários eram de último pedido, não de chegada; impostos incluídos não informados; "balcão em U" sem fonte | TableCheck, horários, fechamentos fixos e preço corrigidos |
| Narisawa | "Regras especiais de confirmação" e replantio em aldeias sem fonte | Reserva com as regras da página oficial; trechos retirados |

## 3. Contrato F2-04

Os dez perfis estão em modo estrito (`partial`). Canais:
- **`online`:** sete perfis;
- **`phone`:** Ling Long, Nelita e Fu He Hui.

Ling Long, Frantzén e Fu He Hui ficam com `priceDetails.amount` nulo: nenhum deles tem preço oficial legível.

As revisões de campo somam 60 registros: 34 confirmados, 18 com fonte única, 4 não verificados e 4 divergentes (preço e endereço do Frantzén, prêmios do Hiša Franko, CEP do Fu He Hui). Somando os sete lotes, há **65 perfis no contrato e 278 fotos com direito aprovado**.

## 4. Verificação

| Verificação | Resultado |
| --- | --- |
| `npm run check:profiles` | Saída 0; 11 avisos, um a mais que antes: "dados práticos parciais" no Fu He Hui, que ficou sem site ([log](fase-2-evidencias/check-profiles-L07.txt)) |
| `npm run build` | Saída 0 |
| Layout (Chromium, local) | 20 casos sem rolagem horizontal: os dez perfis em 320 px claro e 1440 px escuro; coluna de rótulos com 128 px; nenhuma imagem sem atributo `alt`; "Ver instruções de reserva" nos três perfis por telefone ([evidência](fase-2-evidencias/layout-L07.json)) |

O console mostrou 55 erros `ERR_CONNECTION_REFUSED` herdados da aba, do servidor do lote anterior já encerrado; recarregar um perfil não gerou erro novo.

**Não testado:** 375, 768 e 1024 px, teclado, Firefox, Safari, zoom de 200% e leitor de tela.

## 5. Pendências do lote

- **Frantzén:** preço, regra de reserva e pré-pagamento dependem do site oficial, hoje bloqueado para leitura automática.
- **Fu He Hui:** sem site oficial, preço ou horários confirmados.
- **Hiša Franko:** data da pausa de inverno de 2026–2027 e sócios (Valter Kramar) a confirmar.
- **Estrelas Michelin:** sem leitura do próprio guia nos dez perfis.

## 6. Checklist do lote

- [x] Lista nominal fechada.
- [x] Imagens conferidas no Commons e visualmente; uma legenda corrigida.
- [x] Reservas, preços e prêmios conferidos; correções aplicadas.
- [x] Contrato F2-04 aplicado e validado.
- [x] Validador, build e layout amostral.
- [ ] Itens com fonte única resolvidos ou aceitos pelo revisor.
- [ ] Matriz completa de navegadores, teclado e acessibilidade.
- [ ] Revisor e aceite de produto.

## Publicação conferida — 10/11/2026

Commit [937eb2e](https://github.com/AndreRuperto/melhores-restaurantes/commit/937eb2eef44f893b1abebc1d2e8cb1bdf3250991); Railway `29d9e994-2935-4b30-bab6-30f020c36484` em SUCCESS. O domínio público passou a servir o build novo (`index-BR7xhwuv.js`), e os pacotes dos perfis foram conferidos por download direto:

- **Fu He Hui:** traz as duas estrelas de 2026 (Guia Xangai, Jiangsu e Zhejiang). O link do Michelin ficou só na lista de fontes e na referência externa de fotos, não como site ou reserva.
- **Frantzén:** traz a legenda do cardápio impresso.
- **Nelita:** traz os preços do cardápio oficial e a burrata com tomates.
- **Hiša Franko:** traz o link do Venuo.
- **Sazenka:** traz o preço de ¥ 71.500 e o sistema de reserva oficial.

“SEK 5.500” (Frantzén) só aparece em `priceDetails.note`, e “Nova entrada mais alta” (Ling Long) só nas notas de `fieldReviews`; nenhum componente exibe esses campos. A conferência pública foi feita por conteúdo, não por navegador; o layout foi testado no ambiente local.
