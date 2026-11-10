# Fase 2 — L9: perfis 73 a 82

**Data:** 10/11/2026 · **Estado:** em revisão; nenhum perfil homologado.  
**Base:** `7a60bdc` (main). **Execução:** Claude, com cinco agentes de checagem de fontes (dois perfis cada) e conferência própria de imagens, correções e testes. **Revisor e aceite de produto:** a designar.  
**Lista nominal:** Chef Tam's Seasons (73), Le Du (74), Belcanto (75), Nobelhart & Schmutzig (76), Caprice (77), Mosu (78), Huniik (79), Txispa (80), Septime (81), CODA (82).

Mesmo método dos lotes anteriores. Nenhuma reserva, formulário ou mensagem foi enviado. Ficaram ilegíveis para leitura automática, sem tentativa de contornar bloqueio:
- as páginas do Guia Michelin;
- as páginas do Four Seasons (403) e do Mosu;
- OpenTable, CoverManager e SevenRooms;
- alguns veículos de imprensa.

Nenhum site apresentou sinal de comprometimento.

## 1. Imagens

[Evidência do Commons](fase-2-evidencias/commons-L09.json).

- **13 usos, 13 arquivos**, todos no Wikimedia Commons, com HTTP 200; licenças conferem com o Commons.
- **Inspeção visual de todas as fotos.** Só o Caprice tem fotos reais da casa: dois registros do salão (2006 e 2009) e um da cozinha aberta (2009). Chef Tam's Seasons aparece pelo prédio do Wynn Palace, e o Caprice também pelo hotel Four Seasons. As demais mostram rua, bairro ou paisagem, e as legendas dizem isso.
- **Crédito e direitos:**
  - **L09-CP-CREDITO (Caprice, foto do hotel):** o perfil creditava "Prosperity Horizons", que é quem enviou o arquivo. O campo de autor do Commons registra "Exploringlife", e o crédito passou a "Exploringlife (Prosperity Horizons)". O agente de fontes indica que é o mesmo usuário renomeado, e a licença é do próprio autor.
  - **Caprice, foto de 2006:** está em domínio público, mas a autoria é presumida pelo Commons ("own assumed"). Como nada a contradiz, a foto foi mantida, com a ressalva registrada.
- **Txispa:** a legenda passou a dizer que a foto foi feita da própria propriedade Mendi Goikoa, onde fica o restaurante, segundo o Commons.
- **Situação por perfil:** `licensed-real` no Caprice; `historical-or-context` nos outros nove.

## 2. Textos editoriais retirados

Quatro perfis traziam frases que falavam do próprio processo de verificação do A Carta, não do restaurante. Todas foram reescritas ou retiradas:
- **Mosu:** como a mudança de estrelas "não deve ser descrita";
- **Septime:** "a chefia atual não foi confirmada", na biografia e na história;
- **Nobelhart:** "explica a escassez de imagens";
- **Huniik:** a biografia citava "a ficha do OpenTable".

## 3. Correções aplicadas

| Perfil | Achado | Correção |
| --- | --- | --- |
| Belcanto | Preço e quatro pratos vinham da carta anterior; o menu atual custa €295 (antes €265); faltava o 42º lugar de 2025 | Preços, pratos e sobremesas da carta de novembro de 2026; história e prêmios atualizados |
| Chef Tam's Seasons | Preços já publicados no cardápio oficial (MOP 888 a 2.888, mais 10%); "abriu em agosto" (inauguração em 17/10/2023); faltava o 72º lugar mundial de 2025 | Preços, abertura, prêmios e pratos da carta atual |
| Mosu | Primeira e segunda estrelas datadas de 2020 e 2021 (são das edições de 2019 e 2020); almoço, regras de reserva e chef de cozinha sem fonte | Prêmios corrigidos; reserva só pela Catchtable; trechos sem fonte retirados; preço da reabertura (KRW 420.000) |
| Nobelhart & Schmutzig | "Heimat" descrito como linha de memória local (é uma série de cozinheiros convidados); "pimenta" no leitão (é chili); prato duplicado | Cozinha, pratos, reserva (Zenchef e telefone) e fechamento de janeiro corrigidos |
| Caprice | Menus Découverte e Connaisseur, caviar Osciètre, idade mínima e traje sem fonte; a fase de duas estrelas (2015–2018) não era citada | Texto e reserva ajustados; Galliot desde 2017; preço só de guia secundário |
| Septime | Faltava o 40º lugar de 2025; data exata de abertura sem fonte; frases editoriais | Prêmio, história e prato corrigidos |
| CODA | "Laboratórios" e "escolas" sem fonte; "pimenta" no pêssego (é pimentão); endereço original de 2016 sem fonte | Biografia, prato e história corrigidos; e-mail de grupos acrescentado |
| Huniik | Chef executiva e papel do maître sem fonte legível; horários divergentes; faltava o 32º lugar latino-americano de 2025 | Biografia, prêmio de serviço (equipe), reserva e prêmios ajustados |
| Txispa | Reserva descrita como formulário (é TheFork); chegada às 13h pontual; telefone e e-mail ausentes | Reserva, contatos e legenda corrigidos |
| Le Du | Horários atribuídos ao Michelin sem leitura do guia; correspondência entre menu e número de etapas sem fonte; faltava o 30º lugar mundial de 2025 | Trechos retirados; prêmio acrescentado; erro de grafia corrigido |

## 4. Contrato F2-04

Os dez perfis estão em modo estrito (`partial`); todos com canal `online`. Caprice fica com `priceDetails.amount` nulo: o preço citado vem só de guia secundário.

As revisões de campo somam 60 registros: 32 confirmados, 18 com fonte única, 3 não verificados e 7 divergentes. Os divergentes são:
- preço do Belcanto;
- cozinha do Nobelhart;
- telefone do Caprice;
- prêmios do Mosu;
- horários do Huniik;
- reserva e preço do Txispa.

Somando os nove lotes, há **85 perfis no contrato e 304 fotos com direito aprovado**.

## 5. Verificação

| Verificação | Resultado |
| --- | --- |
| `npm run check:profiles` | Saída 0; os mesmos 11 avisos ([log](fase-2-evidencias/check-profiles-L09.txt)) |
| `npm run build` | Saída 0 |
| Layout (Chromium, local) | 20 casos sem rolagem horizontal: os dez perfis em 320 px claro e 1440 px escuro; coluna de rótulos com 128 px; nenhuma imagem sem atributo `alt` ([evidência](fase-2-evidencias/layout-L09.json)) |

O console mostrou apenas erros `ERR_CONNECTION_REFUSED` herdados da aba, dos servidores de lotes anteriores já encerrados.

**Não testado:** 375, 768 e 1024 px, teclado, Firefox, Safari, zoom de 200% e leitor de tela.

## 6. Pendências do lote

- **Caprice:** o telefone de reservas diverge entre as fontes (3196 8882 e 3196 8860), e o preço oficial não pôde ser lido.
- **Txispa:** duas páginas oficiais trazem preços (€295 e €275) e dias de fechamento diferentes.
- **Septime:** o sucessor de Bertrand Grébaut na cozinha não foi anunciado.
- **Estrelas Michelin:** sem leitura do próprio guia nos dez perfis.

## 7. Checklist do lote

- [x] Lista nominal fechada.
- [x] Imagens conferidas no Commons e visualmente; crédito do Caprice ajustado.
- [x] Reservas, preços e prêmios conferidos; correções aplicadas.
- [x] Contrato F2-04 aplicado e validado.
- [x] Validador, build e layout amostral.
- [ ] Itens com fonte única resolvidos ou aceitos pelo revisor.
- [ ] Matriz completa de navegadores, teclado e acessibilidade.
- [ ] Revisor e aceite de produto.

## Publicação conferida — 10/11/2026

Commit [faee24f](https://github.com/AndreRuperto/melhores-restaurantes/commit/faee24f); o domínio público passou a servir o build novo (`index-FIJFzl2W.js`), e os pacotes dos perfis foram conferidos por download direto:

- **Belcanto:** traz o menu de €295.
- **Chef Tam's Seasons:** traz o menu de MOP 1.888.
- **Mosu:** traz a primeira estrela na edição de 2019.
- **Nobelhart:** traz a série "We cook Heimat".

Não aparecem mais as frases sobre "chefia não confirmada" (Septime) e "escassez de imagens" (Nobelhart). A conferência achou mais uma frase de instrução no Septime: "a proposta não deve ser descrita como estritamente vegetariana". Ela virou "a proposta não é estritamente vegetariana" neste commit de registro, com validador e build sem mudança. O mesmo tipo de frase existe em perfis de outros lotes (por exemplo FZN, Sazenka, Celele e Khufu's) e fica como pendência de varredura geral. A conferência foi feita por conteúdo, não por navegador.
