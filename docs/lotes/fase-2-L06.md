# Fase 2 — L6: perfis 43 a 52

**Data:** 10/11/2026 · **Estado:** em revisão; nenhum perfil homologado.  
**Base:** `85c4610` (main). **Execução:** Claude, com cinco agentes de checagem de fontes (dois perfis cada) e conferência própria de imagens, correções e testes. **Revisor e aceite de produto:** a designar.  
**Lista nominal:** Le Calandre (43), Don Julio (44), Mayta (45), El Chato (46), Le Louis XV – Alain Ducasse à l'Hôtel de Paris (47), Ikoyi (48), Naar (49), Saint Peter (50), Uliassi (51), La Cime (52).

Mesmo método dos lotes anteriores. Nenhuma reserva, formulário ou mensagem foi enviado. Ficaram ilegíveis para leitura automática, sem tentativa de contornar bloqueio:
- as páginas do Guia Michelin (vazias em todas as edições testadas);
- as páginas de reserva da SevenRooms, Meitre, Apparta e OpenTable;
- o Brisbane Times.

## 1. Imagens

[Evidência do Commons](fase-2-evidencias/commons-L06.json).

- **15 usos, 14 arquivos únicos**, todos no Wikimedia Commons, com HTTP 200; autor e licença conferem com o Commons.
- **Inspeção visual de todas as fotos.** Fotos reais da própria casa ou do chef:
  - Don Julio: balcão da grelha e salão, em 2024;
  - Le Louis XV: fachada com o letreiro, em 2016, e o Hôtel de Paris, em 2020;
  - retratos de Massimiliano Alajmo (2010) e Mauro Uliassi (2017).

  As demais mostram bairro, cidade ou região, e as legendas dizem isso.
- **Três problemas de identidade, corrigidos:**
  - **L06-LX-CAPA (Le Louis XV):** a legenda falava em “salão”, mas a foto mostra a fachada externa com o letreiro do restaurante. Legenda e tipo (`facade`) corrigidos.
  - **L06-DJ-FACHADA (Don Julio):** o campo de fachada repetia a foto da capa, que mostra o balcão da grelha, não a fachada. O campo foi retirado; capa e galeria passaram a ser descritas como balcão e salão (`interior`).
  - **L06-EC-CAPA (El Chato):** a legenda dizia “casa na Calle 64”, mas a foto mostra um trecho de rua com prédios. Legenda corrigida; o aviso de que não é o restaurante continua.
- **La Cime:** a nota da referência externa citava “fachada preta”, que não aparece na matéria; nota e tipo corrigidos.
- **Situação por perfil:** `licensed-real` no Le Calandre, Don Julio, Le Louis XV e Uliassi; `historical-or-context` nos outros seis.

## 2. Correções aplicadas

| Perfil | Achado | Correção |
| --- | --- | --- |
| El Chato | O link de reserva apontava para a home; a “carta de 5/11/2026”, com pratos a partir de COP 24.000, e os cinco pratos citados não foram encontrados em nenhuma fonte | Link da Apparta; preço e pratos sem fonte retirados; três pratos citados pelo Latin America's 50 Best, marcados como possivelmente fora do menu; horários do site oficial |
| Le Louis XV | Guia Michelin com nome errado (é “França e Mônaco”); horários atribuídos ao Michelin; faixa €€€€ sem fonte; alcachofra, peixe confitado e açafrão sem fonte | Guia renomeado; reserva, horários e paletó conforme a SBM; menu Agape a € 420 e almoço Riviera; pratos trocados pelos citados nas fontes; “chef executivo” retirado |
| Mayta | Link de reserva sem a página do restaurante; prato de pato com descrição errada; 2018 descrito como reforma, mas foi mudança de endereço | Link da Mesa 24/7 corrigido; sartén de pato conforme a carta de 2026; história, prêmios (nº 32 em 2022) e preço com harmonizações |
| Don Julio | Parrilla em V, carvão de quebracho, família ligada à pecuária e fachadas avermelhadas sem fonte; e-mail ausente | Trechos retirados; e-mail oficial; guia Michelin Buenos Aires e Mendoza nomeado |
| Ikoyi | O texto situava a fundação em 180 Strand e a segunda estrela no endereço atual (as duas estrelas vieram em St James's); carvalho e pedra sem fonte; o suya acompanha moleja; aviso de alergias diferente do site | História, prato, alergias e prêmios corrigidos; telefone acrescentado |
| Naar | E-mail errado (`reservas@` em vez de `reservations@`); formação e papel no Masque imprecisos; preço oficial não usado; CEP divergente | E-mail, biografia, preço (Rs. 7.500, sem impostos) e pagamento antecipado; CEP retirado; canal por telefone |
| Le Calandre | Preços já publicados na carta de outono de 2026; fechamentos de fim de ano ausentes; “inaugurado” em 1981 (os pais assumiram um restaurante existente); louças sem fonte | Preços, fechamentos, lede e decoração (mesas de um freixo de 300 anos) corrigidos |
| Uliassi | Título de chef executivo de Mauro Paolini sem fonte; segunda estrela datada de 2009 (fontes dizem 2008 ou 2009); Senigallia-Brest é pré-sobremesa | Frase retirada; ano suavizado; reserva, temporada e cobrança de cancelamento do site oficial |
| La Cime | Faltava o 44º lugar mundial de 2025; frase atribuída ao Michelin sem leitura do guia; descrição da tempura imprecisa | Prêmio e história acrescentados; frase retirada; prato e horários do site oficial |
| Saint Peter | “Expandiu” para o Grand National (foi mudança); sobretaxas ausentes; dois pratos fora dos menus atuais | Biografia, preço com sobretaxas e marcação dos pratos |

## 3. Contrato F2-04

Os dez perfis estão em modo estrito (`partial`). Canais:
- **`online`:** oito perfis;
- **`phone`:** Naar;
- **`contact`:** Le Calandre, porque não foi possível confirmar se a página oficial reserva na hora ou só recebe pedidos.

Don Julio e El Chato ficam com `priceDetails.amount` nulo: nenhum dos dois publica preços.

As revisões de campo somam 62 registros: 36 confirmados, 18 com fonte única, 5 não verificados e 3 divergentes (endereço do Don Julio, CEP do Naar, ano da segunda estrela do Uliassi). Somando os seis lotes, há **55 perfis no contrato e 263 fotos com direito aprovado**.

## 4. Verificação

| Verificação | Resultado |
| --- | --- |
| `npm run check:profiles` | Saída 0; mesmos 10 avisos ([log](fase-2-evidencias/check-profiles-L06.txt)) |
| `npm run build` | Saída 0 |
| Layout (Chromium, local) | 20 casos sem rolagem horizontal: os dez perfis em 320 px claro e 1440 px escuro; coluna de rótulos com 128 px; nenhuma imagem sem atributo `alt`; “Ver instruções de reserva” no Naar; sem erros de console ([evidência](fase-2-evidencias/layout-L06.json)) |

**Não testado:** 375, 768 e 1024 px, teclado, Firefox, Safari, zoom de 200% e leitor de tela.

## 5. Pendências do lote

- **Estrelas Michelin:** nenhuma confirmada no próprio guia nos dez perfis.
- **El Chato:** encontrar carta ou menu publicado para voltar a citar pratos atuais e preço.
- **Le Calandre:** confirmar se a página oficial reserva na hora (o canal passaria a `online`).
- **Don Julio:** número da rua (4699 no site oficial, 4691 no The 50 Best) e ano exato de fundação.

## 6. Checklist do lote

- [x] Lista nominal fechada.
- [x] Imagens conferidas no Commons e visualmente; três problemas de identidade corrigidos.
- [x] Reservas, preços e prêmios conferidos; correções aplicadas.
- [x] Contrato F2-04 aplicado e validado.
- [x] Validador, build e layout amostral.
- [ ] Itens com fonte única resolvidos ou aceitos pelo revisor.
- [ ] Matriz completa de navegadores, teclado e acessibilidade.
- [ ] Revisor e aceite de produto.
