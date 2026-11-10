# Fase 2 — L8: perfis 63 a 72

**Data:** 10/11/2026 · **Estado:** em revisão; nenhum perfil homologado.  
**Base:** `faa4a7a` (main). **Execução:** Claude, com cinco agentes de checagem de fontes (dois perfis cada) e conferência própria de imagens, correções e testes. **Revisor e aceite de produto:** a designar.  
**Lista nominal:** The Jane (63), Seroja (64), FYN (65), Willem Hiele (66), Arpège (67), Evvai (68), Cocina Hermanos Torres (69), Kol (70), Salsify at the Roundhouse (71), Eatanic Garden (72).

Mesmo método dos lotes anteriores. Nenhuma reserva, formulário ou mensagem foi enviado. Ficaram ilegíveis para leitura automática, sem tentativa de contornar bloqueio:
- as páginas do Guia Michelin e do ViaMichelin;
- o site do Cocina Hermanos Torres (403);
- as páginas de reserva do SevenRooms e da Meitre;
- alguns veículos de imprensa.

## 1. Imagens

[Evidência do Commons](fase-2-evidencias/commons-L08.json).

- **15 usos, 14 arquivos únicos**, todos no Wikimedia Commons, com HTTP 200; autor e licença conferem com o Commons.
- **Inspeção visual de todas as fotos.** Só o Arpège tem fotos reais da casa: letreiro na esquina da rue de Bourgogne (2013), tortinhas de vegetais (2013), retrato de Alain Passard (2013) e a tarte Bouquet de Rose (2009). The Jane e Seroja aparecem pelo prédio — a antiga capela e as torres do DUO. As demais mostram bairro ou região, e as legendas dizem isso.
- **L08-KO-DIREITO (Kol, P1): retrato retirado.**
  - **Por quê:** o retrato de Santiago Lastra está registrado no Commons como obra própria do usuário que o enviou. A descrição do próprio arquivo, porém, credita a fotógrafa Rebecca Dickson, e não há autorização registrada. Com a autoria em conflito, o direito não foi aprovado.
  - **O que mudou:** a foto de Marylebone, que estava na galeria, passou a ser a capa.
- **Legendas precisadas:**
  - **Arpège:** a "entrada" do restaurante passou a ser descrita como letreiro na esquina; o registro genérico da galeria passou a nomear o prato.
  - **Seroja:** a legenda deixa claro que a identificação do DUO vem do nome do arquivo. As coordenadas do Commons não batem com Bugis, mas as placas visíveis (North Bridge Road e Arab Street) batem.
- **Notas da referência externa:**
  - **Salsify:** a nota falava em "entrada circular", numa página atrás de assinatura e sem conferência; foi corrigida.
  - **Kol:** a nota foi atualizada, porque o retrato saiu.
- **Situação por perfil:** `licensed-real` no Arpège; `historical-or-context` nos outros nove.

## 2. Segurança

**L08-KO-SITE (Kol):** a página `kolrestaurant.com/contact/`, ligada ao menu do site oficial, exibe hoje conteúdo de apostas indonésio, com links externos; o site parece comprometido. Nenhum perfil do A Carta aponta para essa página. O A Carta usa a página inicial e `/reservations/`, que estavam normais na consulta.

## 3. Correções aplicadas

| Perfil | Achado | Correção |
| --- | --- | --- |
| Arpège | O texto dizia não haver link de reserva, mas o botão oficial leva ao Zenchef; preços publicados nos PDFs oficiais não eram usados; horta "do Mont-Saint-Michel" só em texto do Michelin | Reserva pelo Zenchef; menus a € 260 e € 380, serviço incluído; hortas do site oficial; três pratos fora do cardápio de 2026 marcados |
| Cocina Hermanos Torres | O preço de € 330, os horários do telefone e o formulário de reserva não foram encontrados (site oficial com 403); Estrela Verde datada de 2023 (já existia em 2021); faltava o 78º lugar de 2025 | Preço retirado (fontes divergem entre € 295 e € 310); reserva simplificada; prêmios corrigidos; cinco pratos sem fonte marcados |
| Salsify | O preço era de outra carta (ZAR 2.100); havia um almoço especial que não existe mais; não há reserva online; os pratos eram de outra carta; a história trazia uma frase editorial sobre o próprio site | Preço de ZAR 2.395 com serviço de 13%; canal por telefone e e-mail; pratos do menu atual; frase retirada |
| Evvai | O preço já era publicado (R$ 1.650); ostra com pistache e jambu sem fonte; "chef paulistano" sem fonte | Preço e harmonizações do cardápio oficial; prato trocado pelo do menu de 2026 |
| FYN | Trufa do Drakensberg, lagostim de KwaZulu-Natal, corrente de Agulhas e "alho-buchu" não constam do menu; faltava a taxa de serviço de 13,5% | Pratos, seções e preço corrigidos |
| Willem Hiele | Horários apresentados como divergentes (todas as páginas oficiais trazem os mesmos); faltavam a primeira estrela de 2021 e três listas mundiais; estrela de 2025 sem fonte | Horários, menu De Spoelakker, prêmios e história da primeira casa corrigidos |
| Kol | Retrato com autoria em conflito; o preço podia ser derivado do vale-presente oficial; pimenta defumada no taco e dois pratos sem fonte | Retrato retirado; preço de £ 145 mais 15% de serviço; trechos retirados |
| The Jane | Política vegetariana e vegana sem fonte; instalação de DJ sem fonte; faltavam depósito, telefone, e-mail, fechamento de fim de ano e o 36º lugar de 2024 | Reserva, restrições e prêmios conforme o site oficial |
| Eatanic Garden | Passagens por Quince e COI sem fonte primária; o texto dizia que a Catchtable era acessível pelo site do hotel (não é) | Biografia e reserva corrigidas; etapa de arroz sem fonte marcada |
| Seroja | O chef não cresceu em Port Klang (nasceu ao sul de Klang); tamarindo sem fonte; regras de cartão e política alimentar imprecisas | História, cozinha e reserva corrigidas |

## 4. Contrato F2-04

Os dez perfis estão em modo estrito (`partial`). Canais:
- **`online`:** nove perfis;
- **`phone`:** Salsify.

Cocina Hermanos Torres e Eatanic Garden ficam com `priceDetails.amount` nulo.

As revisões de campo somam 59 registros: 35 confirmados, 16 com fonte única, 4 não verificados e 4 divergentes:
- cozinha do The Jane;
- história do Seroja;
- preço do Cocina Hermanos Torres;
- retrato do Kol.

Somando os oito lotes, há **75 perfis no contrato e 291 fotos com direito aprovado**.

## 5. Verificação

| Verificação | Resultado |
| --- | --- |
| `npm run check:profiles` | Saída 0; os mesmos 11 avisos do L7 ([log](fase-2-evidencias/check-profiles-L08.txt)) |
| `npm run build` | Saída 0 |
| Layout (Chromium, local) | 20 casos sem rolagem horizontal: os dez perfis em 320 px claro e 1440 px escuro; coluna de rótulos com 128 px; nenhuma imagem sem atributo `alt`; o Kol carrega só a foto de Marylebone ([evidência](fase-2-evidencias/layout-L08.json)) |

O console mostrou erros `ERR_CONNECTION_REFUSED` herdados da aba, dos servidores de lotes anteriores já encerrados; recarregar um perfil não gerou erro novo.

**Não testado:** 375, 768 e 1024 px, teclado, Firefox, Safari, zoom de 200% e leitor de tela.

## 6. Pendências do lote

- **Kol:** buscar retrato com autoria e licença claras; avisar o restaurante sobre a página comprometida fica a critério do responsável pelo produto.
- **Cocina Hermanos Torres:** confirmar preço e canal de reserva quando o site oficial for legível.
- **Estrelas Michelin:** sem leitura do próprio guia nos dez perfis.

## 7. Checklist do lote

- [x] Lista nominal fechada.
- [x] Imagens conferidas no Commons e visualmente; uma foto retirada por autoria em conflito.
- [x] Reservas, preços e prêmios conferidos; correções aplicadas.
- [x] Contrato F2-04 aplicado e validado.
- [x] Validador, build e layout amostral.
- [ ] Itens com fonte única resolvidos ou aceitos pelo revisor.
- [ ] Matriz completa de navegadores, teclado e acessibilidade.
- [ ] Revisor e aceite de produto.
