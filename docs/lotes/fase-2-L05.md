# Fase 2 — L5: perfis 33 a 42

**Data:** 10/11/2026 · **Estado:** em revisão; nenhum perfil homologado.  
**Base:** `ae27eb0` (main). **Execução:** Claude, com cinco agentes de checagem de fontes (dois perfis cada) e conferência própria de imagens, correções e testes. **Revisor e aceite de produto:** a designar.  
**Lista nominal:** Elkano (33), Le Coquillage (34), La Colombe (35), Ru Yuan (36), Nuema (37), Atelier Moessmer Norbert Niederkofler (38), Schloss Schauenstein (39), Jordnær (40), Onjium (41), Bozar (42).

Mesmo método dos lotes anteriores. Nenhuma reserva, formulário ou mensagem foi enviado. Ficaram ilegíveis para leitura automática, sem tentativa de contornar bloqueio: as páginas do Guia Michelin, o site do Onjium, a CatchTable, a Superb Experience, o Gambero Rosso e alguns veículos de imprensa.

## 1. Imagens

[Evidência do Commons](fase-2-evidencias/commons-L05.json).

- **44 usos, 41 arquivos únicos**, todos no Wikimedia Commons, com HTTP 200; autor e licença conferem com o Commons. Dois arquivos em domínio público, sem URL de licença, apontam para a política de licenciamento do Commons.
- **Inspeção visual de todas as fotos.** Fotos reais da própria casa:
  - Schloss Schauenstein: castelo, jardim e salão, de 2005 a 2023;
  - Bozar: salão do restaurante em 2015;
  - Le Coquillage: Château Richeux;
  - Atelier Moessmer: Villa Moessmer antes da reforma;
  - Jordnær: o hotel que abriga o restaurante.

  As demais mostram bairro, região ou ingredientes, e as legendas dizem isso.
- **Duas legendas com identidade errada, corrigidas:**
  - **L05-ON-CAPA (Onjium):** a legenda falava no portão Gwanghwamun, entrada do palácio Gyeongbokgung, mas a foto mostra torres de escritórios de vidro na região de Gwanghwamun. Legenda corrigida, sem atribuir o lugar ao restaurante.
  - **L05-BZ-CAPA (Bozar):** a legenda dizia “entrada da área do restaurante”, mas o arquivo, segundo a própria descrição no Commons, é o salão do restaurante em 2015. Legenda corrigida, com aviso de que a decoração pode ter mudado.
- **Situação por perfil:** `licensed-real` no Schauenstein e no Bozar; `historical-or-context` nos outros oito.

## 2. Correções aplicadas

| Perfil | Achado | Correção |
| --- | --- | --- |
| Atelier Moessmer | Nenhum dos seis pratos citados consta do cardápio-modelo atual; o prêmio Tradizione Futura foi para o subchef Matteo Delvai, não para o restaurante; aviso de alergias com dois dias e proibição de animais sem fonte; biografia com datas e mestres que não constam da página oficial | Pratos trocados pelos do cardápio de outono; prêmio, reserva e preço (harmonizações, clássicos a € 40) corrigidos; lista de cidades da biografia conforme o site oficial |
| Ru Yuan | “Início da década de 2020” (abriu em 2023); faltavam a primeira estrela (2024) e o 59º lugar na lista asiática estendida (2025), e o perfil dizia que a casa “entrou diretamente” em 10º; fonte de uma reportagem trocada; símbolo de preço Michelin divergente | História e prêmios corrigidos; fonte ajustada; símbolo retirado. Sem site oficial: só telefone e Instagram (L0-SITES mantido) |
| Nuema | Estreia mundial em 2023 foi em 79º, não 76º; o casal não se conheceu “no Astrid y Gastón de Quito” (ele trabalhou em Lima); faixa de preço sem fonte | Prêmio, história e preço corrigidos |
| Onjium | Primeira estrela datada em 2019 (é da edição 2020); reserva descrita como direta, mas a única fonte indica CatchTable | Prêmios e canal corrigidos; preço indicativo do guia Discovery |
| Bozar | Vitela citada no menu, que não tem vitela; fechamentos incompletos | Pratos do menu atual; fechamentos dos almoços de terça e sábado; preços com menus clássicos |
| Le Coquillage | “Laminaria digitata” não está nos menus atuais; nome “Pain maritime” sem fonte | Prato retirado; Chemin des Douaniers marcado como fora do menu; pão renomeado |
| La Colombe | Mês da mudança e “salão ampliado” sem fonte; a estreia na lista em 2006 era atribuída ao período seguinte | História ajustada; título regional de 2010 acrescentado |
| Elkano | María José Artano listada como fundadora (o dossiê da família diz que se juntou depois); mês da morte de Pedro sem fonte | Fundador e história corrigidos; horário de verão acrescentado |
| Schloss Schauenstein | Walserhof e Wiesengrund ficam na Suíça, não na Alemanha; regra sobre animais de fonte secundária | Biografia corrigida; harmonizações acrescentadas |
| Jordnær | Frase sobre serviços cobrados à parte sem fonte; “sem investidores” e reforma sem fonte | Preço conforme o cardápio; trechos retirados; papel de Eric no Almanak precisado |

## 3. Defeito de interface encontrado e corrigido

**L05-UI-EMAIL (P1):** a 320 px, o perfil do Atelier Moessmer ficava com 384 px de largura. O e-mail `reservations@ateliernorbertniederkofler.com`, que entrou com o F2-04, não quebrava linha e alargava a coluna. Correção em `src/components/Profile.jsx`: colunas `minmax(0, 1fr)` e `overflow-wrap: anywhere` nas linhas das informações práticas. Reteste: 320 px de largura; no desktop, a coluna de rótulos segue com 128 px (8rem). A correção vale para todos os perfis.

## 4. Contrato F2-04

Os dez perfis estão em modo estrito (`partial`). Canais:
- **`online`:** oito perfis;
- **`phone`:** Ru Yuan;
- **`contact`:** Schauenstein, por formulário de pedido.

As revisões de campo somam 58 registros: 39 confirmados, 13 com fonte única, 5 não verificados e 1 divergente (preços do Elkano). Somando os cinco lotes, há **45 perfis no contrato e 249 fotos com direito aprovado**.

## 5. Verificação

| Verificação | Resultado |
| --- | --- |
| `npm run check:profiles` | Saída 0; mesmos 10 avisos ([log](fase-2-evidencias/check-profiles-L05.txt)) |
| `npm run build` | Saída 0, antes e depois da correção de interface |
| Layout (Chromium, local) | 20 casos sem rolagem horizontal após a correção: os dez perfis em 320 px claro e 1440 px escuro; nenhuma imagem sem `alt`; sem erros de console ([evidência](fase-2-evidencias/layout-L05.json)) |

**Não testado:** 375, 768 e 1024 px, teclado, Firefox, Safari, zoom de 200% e leitor de tela.

## 6. Checklist do lote

- [x] Lista nominal fechada.
- [x] Imagens conferidas no Commons e visualmente; duas legendas com identidade errada corrigidas.
- [x] Reservas, preços e prêmios conferidos; correções aplicadas.
- [x] Contrato F2-04 aplicado e validado.
- [x] Validador, build e layout amostral; defeito de layout corrigido.
- [ ] Itens com fonte única resolvidos ou aceitos pelo revisor.
- [ ] Matriz completa de navegadores, teclado e acessibilidade.
- [ ] Revisor e aceite de produto.

## Publicação conferida — 10/11/2026

Commit [d50ba9c](https://github.com/AndreRuperto/melhores-restaurantes/commit/d50ba9c711b9cdda1384a8c9f549442e5118f024); Railway `f4121a19-9b28-448b-afdf-9b135fedb123` em SUCCESS. No domínio público, por acesso direto:

- **Atelier Moessmer:** a 320 px a página tem 320 px de largura, com a correção do e-mail aplicada. Mostra os pratos do cardápio de outono e o prêmio do subchef, sem os pratos antigos.
- **Onjium:** traz a legenda corrigida da capa, a CatchTable e a edição 2020 do Guia Michelin.
- **Ru Yuan:** traz a abertura em 2023 e o 59º lugar de 2025, sem a frase "estreia em 10º".
- **Bozar:** não cita mais vitela; mostra a poulette de Racan e a legenda corrigida do salão, sem imagens quebradas.

Sem erros de console.
