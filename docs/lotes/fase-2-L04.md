# Fase 2 — L4: perfis 22 a 32 (sem o Steirereck)

**Data:** 10/11/2026 · **Estado:** em revisão; nenhum perfil homologado.  
**Base:** `c3f5007` (main). **Execução:** Claude, com cinco agentes de checagem de fontes (dois perfis cada) e conferência própria de imagens, correções e testes. **Revisor e aceite de produto:** a designar.  
**Lista nominal** (dez perfis ainda não homologados, em ordem de rank; o Steirereck, 30º, já passou pelo piloto L1): Boragó (22), Vyn (23), Al Gatto Verde (24), Lasai (25), Masque (26), Reale (27), Trèsind Studio (28), Enigma (29), Celele (31), Potong (32).

Mesmo método dos lotes anteriores. Nenhuma reserva, formulário ou mensagem foi enviado. Ficaram ilegíveis para leitura automática, sem tentativa de contornar bloqueio: as páginas do Guia Michelin, a Tock e o site da Modena Today.

## 1. Imagens

[Evidência do Commons](fase-2-evidencias/commons-L04.json).

- **53 usos, 52 arquivos únicos**, todos no Wikimedia Commons, com HTTP 200. Autor e licença conferem com o Commons em todos.
- **Inspeção visual** de todas as fotos: **nenhuma foto atribuída à casa errada**. Só o Boragó tem fotos reais do restaurante: fachada e painel com o nome, em Vitacura, 2024. Nos outros nove, as fotos mostram bairro, região, ingredientes ou o restaurante anterior do chef (Vyn), e as legendas dizem isso. Em vários perfis, o aviso de “não é o restaurante” já vinha da Fase 1.
- **Legenda ajustada:** o pani puri do Masque era apresentado como prato atual, mas não aparece no último menu publicado.
- **Situação por perfil:** `licensed-real` no Boragó; `historical-or-context` nos outros nove (P2: buscar fotos licenciadas dos próprios restaurantes).

## 2. Correções aplicadas

| Perfil | Achado | Correção |
| --- | --- | --- |
| Lasai | O perfil não mencionava a mudança, anunciada pela imprensa em 2026, para o 21º andar do Sofitel Ipanema, com inauguração prevista para dezembro; o preço era de junho de 2025 | Endereço, apresentação, história e preço da reabertura (R$ 1.550, imprensa) atualizados; e-mail e telefones acrescentados; o site oficial ainda mostra o Humaitá, e isso está registrado |
| Reale | O texto dizia que o menu-degustação não tem carne nem peixe “desde 2022”; o cardápio oficial de outubro de 2026 voltou a ter baccalà, truta e porco. A casa fecha de 2 a 12 de novembro de 2026. “12 etapas” não confere com o cardápio | Cozinha, preço e reserva atualizados com base no cardápio oficial; canal passou a telefone e e-mail |
| Masque | A reserva parecia online, mas o site aceita só telefone, WhatsApp ou e-mail, com depósito; pratos apresentados como do menu de 2026 sem menu publicado | Canal corrigido para telefone; pratos ajustados ao menu de fevereiro de 2025, o último publicado; harmonizações acrescentadas |
| Al Gatto Verde | Dias de funcionamento errados (eram os da hospedaria); telefone divergente entre duas páginas do The 50 Best e ausente do site; faixa de preço das massas; carta a Bottura e passagens por Chez L’Épicier e Bearfoot Bistro sem fonte | Dias e regras de cancelamento do site oficial; telefone retirado; preço e biografia corrigidos |
| Celele | O link de reserva apontava para um diretório, não para o botão oficial; o aviso de acessibilidade era brando: o restaurante informa que não recebe pessoas com mobilidade reduzida | Link oficial da Mesa 24/7; aviso reforçado; preço com harmonização; dois detalhes de pratos corrigidos |
| Potong | Primeira estrela datada em 2022, mas é da edição 2023 do guia (anúncio em novembro de 2022); 2025 descrito como estreia, mas foi a estreia no top 50 | Prêmio, história e apresentação corrigidos |
| Enigma | Primeira estrela e primeiro Sol Repsol com ano trocado; quatro dos seis pratos fora do menu de outono de 2026; “aos 15 anos” sem fonte | Anos corrigidos; pratos marcados com o que segue ou não no menu atual; reserva com lista de espera on-line e WhatsApp |
| Boragó | Em 2018 foi 4º na lista latino-americana, não 5º | Prêmio corrigido, com o título de melhor do Chile; reserva com CoverManager e WhatsApp |
| Trèsind Studio | “Seis mesas” e significado do nome sem fonte | Retirados; mudança do hotel Voco para os St. Regis Gardens acrescentada |
| Vyn | Passagem pelo Guldapan sem fonte; prêmio do La Liste com nome impreciso | Biografia e prêmio ajustados; harmonizações e regras de cancelamento acrescentadas |

“The 50 Best Restaurants” padronizado em 2026 no Lasai.

## 3. Contrato F2-04

Os dez perfis estão em modo estrito (`partial`). Canais: oito `online`, Masque e Reale `phone`. As revisões de campo somam 58 registros: 40 confirmados, 13 com fonte única, 4 não verificados e 1 divergente (sobrenome da sommelière do Lasai, Freire ou Freitas). Somando os quatro lotes, há **35 perfis no contrato e 208 fotos com direito aprovado**.

## 4. Verificação

| Verificação | Resultado |
| --- | --- |
| `npm run check:profiles` | Saída 0; mesmos 10 avisos ([log](fase-2-evidencias/check-profiles-L04.txt)) |
| `npm run build` | Saída 0 |
| Layout (Chromium, local) | 20 casos sem rolagem horizontal: os dez perfis em 320 px claro e 1440 px escuro; nenhuma imagem sem `alt`; canais renderizados, com “Ver instruções de reserva” no Masque e no Reale; sem erros de console ([evidência](fase-2-evidencias/layout-L04.json)) |

**Não testado:** 375, 768 e 1024 px, teclado, Firefox, Safari, zoom de 200% e leitor de tela.

## 5. Pendências do lote

- **Lasai:** confirmar a data da última sessão no Humaitá e a inauguração em Ipanema, e atualizar o endereço quando o site oficial mudar.
- **Reale:** o aviso de fechamento de novembro de 2026 perde validade no dia 13; revisar na próxima rodada.
- **Masque:** reconferir pratos quando o menu de 2026 for publicado.
- **Estrelas Michelin:** sem confirmação no próprio guia nos dez perfis.

## 6. Checklist do lote

- [x] Lista nominal fechada.
- [x] Imagens conferidas no Commons e visualmente; nenhuma exposição incorreta.
- [x] Reservas, preços e prêmios conferidos; correções aplicadas.
- [x] Contrato F2-04 aplicado e validado.
- [x] Validador, build e layout amostral.
- [ ] Itens com fonte única resolvidos ou aceitos pelo revisor.
- [ ] Matriz completa de navegadores, teclado e acessibilidade.
- [ ] Revisor e aceite de produto.

## Publicação conferida — 10/11/2026

Commit [4976870](https://github.com/AndreRuperto/melhores-restaurantes/commit/4976870a4b43d899fed21fcdf0c879f4a5456fa2); Railway `8c6976a8-223f-4ad1-92d8-87346bca8da9` em SUCCESS. Conferido no domínio público, por acesso direto, sem erros de console:

- **Lasai:** traz a mudança para o Sofitel Ipanema e o e-mail; não há mais o preço antigo de R$ 1.380 nem imagens quebradas.
- **Reale:** mostra o baccalà do menu atual e "Ver instruções de reserva"; não diz mais "desde março de 2022".
- **Masque:** mostra o e-mail de reservas, as harmonizações e "Ver instruções de reserva".
- **Celele:** o link de reserva aponta para `celele.mesa247.co/reservas/celele` e o aviso de acessibilidade aparece.
- **Potong:** traz a estreia no top 50 e a edição 2023 do Guia Michelin.
