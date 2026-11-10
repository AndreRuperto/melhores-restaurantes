# Fase 2 — L10: perfis 83 a 100 (sem The Den, Khufu's e Aponiente)

**Data:** 10/11/2026 · **Estado:** em revisão; nenhum perfil homologado.  
**Base:** `99b8131` (main). **Execução:** Claude, com cinco agentes de checagem de fontes (três perfis cada) e conferência própria de imagens, correções e testes. **Revisor e aceite de produto:** a designar.

**Lista nominal:** 15 perfis ainda fora do contrato, em ordem de rank. The Den (91), Khufu's (97) e Aponiente (100) já tinham passado pelo piloto L1.

| Rank | Perfil |
| --- | --- |
| 83 | The Ledbury |
| 84 | Le Doyenné |
| 85 | Tim Raue |
| 86 | Eliane |
| 87 | ARCA |
| 88 | FZN |
| 89 | Burnt Ends |
| 90 | Baan Tepa |
| 92 | Lamdre |
| 93 | SingleThread |
| 94 | Neolokal |
| 95 | MIL |
| 96 | Rosetta |
| 98 | Labyrinth |
| 99 | Fauna |

Mesmo método dos lotes anteriores. Nenhuma reserva, formulário ou mensagem foi enviado.

Ficaram ilegíveis para leitura automática, sem tentativa de contornar bloqueio:
- as páginas do Guia Michelin;
- os sites do The Ledbury e do FZN;
- OpenTable, SevenRooms, CoverManager e Tock.

Nenhum site apresentou sinal de comprometimento. O site do Tim Raue avisa sobre um incidente de phishing no seu sistema de reservas, e o perfil passou a reproduzir esse alerta.

## 1. Imagens

[Evidência do Commons](fase-2-evidencias/commons-L10.json).

- **16 usos, 13 arquivos**, todos no Wikimedia Commons, com HTTP 200; licenças conferem com o Commons.
- **Inspeção visual de todas as fotos.** Fotos reais da casa:
  - The Ledbury: fachada em 2011 e 2014;
  - SingleThread: fachada em 2022;
  - Rosetta: entrada em 2024;
  - Burnt Ends: dois pratos de 2013, na sede antiga;
  - Tim Raue: retrato do chef.

  O Neolokal aparece pelo prédio do SALT Galata, e o MIL pelas terrazas de Moray, com o edifício ao fundo segundo a descrição do Commons. As demais mostram bairro ou região, e as legendas dizem isso.
- **L10-AR-DIREITO (ARCA, P1): foto retirada.**
  - **Autoria:** o EXIF do arquivo credita Sara Kolster como autora e detentora dos direitos, mas a licença foi concedida pela conta de Paul Keller no Flickr, sem autorização registrada.
  - **Licença:** os campos do próprio Commons divergem (CC BY 2.0 e CC BY 4.0).
  - **Decisão:** é o mesmo critério aplicado ao retrato do Kol no L8. O ARCA fica só com a referência externa ao site oficial.
- **Seis perfis sem foto licenciada:** Eliane, FZN, Baan Tepa, Lamdre, Labyrinth e Fauna já não tinham foto; o ARCA passou a não ter. Os sete ficam como `reference-only`.
- **Situação por perfil:**
  - `licensed-real`: The Ledbury, Tim Raue, Burnt Ends, SingleThread e Rosetta;
  - `historical-or-context`: Le Doyenné, Neolokal e MIL;
  - `reference-only`: os outros sete.

## 2. Textos editoriais retirados

Os perfis traziam muitas frases sobre o próprio processo do site, e todas foram reescritas ou retiradas:
- "disponibilidade não verificada em tempo real";
- "não deve ser confundida com…";
- "as imagens publicadas no A Carta…";
- "não tratar esse valor histórico como vigente".

## 3. Correções aplicadas

| Perfil | Achado | Correção |
| --- | --- | --- |
| The Ledbury | Preços (£ 220 a £ 295) não confirmados, porque o site oficial está ilegível; almoços de quinta e idade mínima sem fonte; link de reserva era a página inicial; cultivo próprio de cogumelos sem fonte | Preço retirado do texto; reserva pelo OpenTable; trechos retirados |
| Le Doyenné | Os cinco pratos eram do menu de verão; "mais de cem" variedades (são centenas); Spring e animais criados na propriedade sem fonte; telefone e e-mail ausentes | Pratos do menu de outono; história, biografia e reserva corrigidas |
| Tim Raue | O preço foi confirmado (€292, cardápio de abril de 2026); dois pratos descritos como antigos estão no menu atual; faltavam os lugares de 2022 e 2023 | Preço, pratos, prêmios e e-mail |
| Eliane | Disposição do salão e cidade do Chambre Séparée sem fonte; quatro pratos sem fonte | Pratos trocados pelos da avaliação atual do Gault&Millau; reserva e preço com harmonizações |
| ARCA | Foto com autoria em conflito; 2026 não foi estreia (67º em 2025); link de reserva era a home | Foto retirada; prêmios e reserva pelo OpenTable |
| FZN | Telefone, e-mail, sinal de 50%, horários e La Liste 2025 sem fonte | Retirados; reserva e preço com o que tem fonte |
| Burnt Ends | Faltavam o 93º mundial de 2025 e o 59º asiático de 2026; preço "não identificado" virou texto neutro | Prêmios, reserva com e-mail oficial |
| Baan Tepa | Preço desatualizado (THB 6.200, hoje THB 6.800++); Estrela Verde datada de 2024 (é de 2025); reforma de 2026 ausente | Preço, prêmios (Young Chef 2024, Sustainable 2026), história e reserva |
| Lamdre | O site e a reserva apontavam para páginas do The 50 Best e do Michelin; a sala é 01, não 04; abriu no fim de 2022; faltava a primeira estrela (2024) | Site e link retirados (canal por telefone); endereço, fundação e prêmios corrigidos |
| SingleThread | "Mais de 70%" da fazenda e variedades citadas sem fonte; faltavam quatro listas mundiais e o North America's 50 Best | Prêmios, reserva (transferência permitida, fechamentos) e preço de segunda a quarta |
| Neolokal | Dias de fechamento sem fonte (o formulário diz que abre todo dia às 18h); terraço e vista sem fonte; faltavam listas de 2019 e 2025 e o prêmio de sommelier de 2026 | Reserva, história e prêmios corrigidos |
| MIL | Apresentado como vencedor do Off-Map 2019 (foi finalista); faltavam quatro listas; "por pessoa" não consta da página de preços | Prêmios e preço ajustados |
| Rosetta | Faltavam o 34º (2024), o 46º (2025) e o 39º latino-americano de 2025 | Prêmios e datas da carta |
| Labyrinth | O perfil trocava as páginas de preço (a atual diz SGD 288++, não 298++); carreira no setor financeiro e início molecular sem fonte; três pratos fora do menu; faltavam listas mundiais de 2023 a 2025 | Preço, biografia, pratos e prêmios corrigidos |
| Fauna | O site oficial agora é o do Bruma Wine Resort; o preço já era publicado (MXN 2.535); CEP errado; faltava a estreia mundial de 2024 | Site, reserva, preço, endereço, pratos e prêmios |

## 4. Contrato F2-04

Os 15 perfis estão em modo estrito (`partial`). Canais:
- **`online`:** catorze perfis;
- **`phone`:** Lamdre.

The Ledbury, Burnt Ends e Rosetta ficam com `priceDetails.amount` nulo.

As revisões de campo somam 90 registros: 50 confirmados, 18 com fonte única, 10 não verificados e 12 divergentes.

**Com este lote, os 100 perfis estão no contrato F2-04, com 316 fotos com direito aprovado.** Nenhum está homologado: isso depende do revisor.

## 5. Verificação

| Verificação | Resultado |
| --- | --- |
| `npm run check:profiles` | Saída 0. 13 avisos: os 11 anteriores mais "foto de capa pendente" no ARCA e "dados práticos parciais" no Lamdre ([log](fase-2-evidencias/check-profiles-L10.txt)) |
| `npm run build` | Saída 0 |
| Layout (Chromium, local) | 30 casos sem rolagem horizontal: os 15 perfis em 320 px claro e 1440 px escuro; coluna de rótulos com 128 px; nenhuma imagem sem atributo `alt`; o ARCA não carrega imagem do Commons ([evidência](fase-2-evidencias/layout-L10.json)) |

**Não testado:** 375, 768 e 1024 px, teclado, Firefox, Safari, zoom de 200% e leitor de tela.

## 6. Pendências do lote

- **The Ledbury:** confirmar preços e horários quando o site oficial for legível.
- **FZN:** confirmar regras de reserva, telefone e e-mail.
- **Baan Tepa:** data de reabertura após a reforma de 2026.
- **ARCA:** buscar foto com autoria e licença claras.
- **Estrelas Michelin:** sem leitura do próprio guia nos 15 perfis.

## 7. Checklist do lote

- [x] Lista nominal fechada.
- [x] Imagens conferidas no Commons e visualmente; uma foto retirada por autoria e licença em conflito.
- [x] Reservas, preços e prêmios conferidos; correções aplicadas.
- [x] Contrato F2-04 aplicado e validado.
- [x] Validador, build e layout amostral.
- [ ] Itens com fonte única resolvidos ou aceitos pelo revisor.
- [ ] Matriz completa de navegadores, teclado e acessibilidade.
- [ ] Revisor e aceite de produto.

## Publicação conferida — 10/11/2026

Commit [e8aca2c](https://github.com/AndreRuperto/melhores-restaurantes/commit/e8aca2c); o domínio público passou a servir o build novo (`index-QEtj3I6Y.js`), e os pacotes dos perfis foram conferidos por download direto:

- **ARCA:** não referencia mais a foto retirada.
- **The Ledbury:** não traz mais o preço de £220.
- **Tim Raue:** traz o menu de €292.
- **Fauna:** traz o site do Bruma Wine Resort.
- **Baan Tepa:** traz o menu de THB 6.800++.
- **Lamdre:** o link do Michelin ficou só na lista de fontes e na referência externa de fotos, não como site ou reserva.

As frases "não verificada em tempo real" e "não deve ser" não aparecem nos perfis conferidos. A conferência foi feita por conteúdo, não por navegador.
