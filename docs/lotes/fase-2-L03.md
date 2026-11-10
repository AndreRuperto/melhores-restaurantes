# Fase 2 — L3: perfis 12 a 21

**Data:** 10/11/2026 · **Estado:** em revisão; nenhum perfil homologado.  
**Base:** `4f465c9` (main). **Execução:** Claude, com cinco agentes de checagem de fontes (dois perfis cada) e conferência própria de imagens, correções e testes. **Revisor e aceite de produto:** a designar.  
**Lista nominal:** Sorn (12), Mérito (13), Sühring (14), Odette (15), Tuju (16), Mingles (17), Nusara (18), JAN (19), Piazza Duomo (20), Meet the Bund (21).

Mesmo método dos lotes [L1](fase-2-L01.md) e [L2](fase-2-L02.md). Nenhuma reserva, formulário ou mensagem foi enviado. Páginas que bloquearam a leitura automática (sites do Piazza Duomo e do Mingles, Tock, páginas do Guia Michelin) foram registradas como ilegíveis, sem tentativa de contornar o bloqueio.

## 1. Imagens

[Evidência do Commons](fase-2-evidencias/commons-L03.json).

- **75 usos, 73 arquivos únicos**, todos no Wikimedia Commons, todos com HTTP 200; autor e licença conferem com o Commons em todos. Três casos de forma, sem erro: o caranguejo do Sorn tem crédito “self” no Commons (o autor é Almandine, como já estava), a jabuticabeira do Tuju está em domínio público, e a foto dos jang do Mingles usa a licença coreana KOGL Tipo 1.
- **Inspeção visual** de todas as fotos em pranchas: **nenhuma foto atribuída à casa errada**. Só três mostram o restaurante ou sua gente: o chef Julien Royer (Odette) e o Rhaetenhaus, prédio onde funciona o JAN (capa, fachada e sgraffito). As demais mostram bairro, região, ingredientes ou pratos genéricos, e as legendas dizem isso.
- **Legendas ajustadas por afirmarem fatos sem fonte:** a louça do JAN “vem” da Nymphenburg; o bar do Tuju fica “ao lado de uma jabuticabeira”; o Bund Finance Center é o endereço do Meet the Bund (ver §3).
- **Situação por perfil:** `licensed-real` só no Odette (retrato do chef); nos outros nove, `historical-or-context`. Faltam fotos licenciadas dos próprios restaurantes nesses nove (P2).

## 2. Correções aplicadas

| Perfil | Achado | Correção |
| --- | --- | --- |
| Sorn | Preço de fevereiro de 2025 (7.200 bahts); faltavam a terceira estrela mantida em 2026, o 11º na Ásia em 2021 e o 56º no mundo em 2023; “um único serviço” sem fonte | Preços do TableCheck (7.800 bahts até 30/11, 8.800 a partir de 1/12, Seasonal Menu para clientes recorrentes), regra de abertura da agenda, prêmios completados |
| Nusara | 2025 descrito como estreia na lista mundial, mas foi 74º na lista 51–100 em 2023 e 2024; “mercado financeiro” e “Eleven Madison Park” sem fonte; dois pratos com versão antiga | História e prêmios corrigidos; reserva com e-mail e regra de pagamento integral; pratos ajustados ao menu de 2026 |
| Odette | Preços de dezembro de 2025 e menus que mudaram (Terre & Mer saiu); “comanda o Louise”; prêmio de melhor sommelière de 2026 ausente | Menus e preços atuais; depósito e remarcação com 72 horas; papel no Louise e no Claudine suavizado; prêmio acrescentado |
| Sühring | Spätzle e labskaus apresentados como pratos do menu, mas são extras; Brotzeit é histórico | Cozinha e pratos ajustados ao cardápio de agosto de 2026; harmonização sem álcool acrescentada |
| Mingles | Preço abaixo do valor de 2025 e uso do CatchTable sem fonte | Reserva por telefone (único canal confirmado); preço datado como relato de 2025; Best Restaurant in Korea de 2016 e 2021 acrescentados |
| Tuju | Primeira estrela “poucos meses depois” (foi no ano seguinte); “única cidade com dois duas estrelas” sem fonte | História corrigida; preço com sinal de R$ 230 e serviço à parte |
| JAN | Almoço “de cinco etapas” e “julho de 2021” sem fonte | Retirados; contato por e-mail e telefone acrescentados |
| Piazza Duomo | Faltava a estreia de 2013 (41º); “menus só de degustação” (há a seleção Vorrei e o almoço Art Bites); ano de 1996 em Kobe sem fonte | Prêmio, cozinha e biografia ajustados; dois pratos marcados como de menus anteriores |
| Mérito | Preço da imprensa apresentado como dado do restaurante; Michelle Sikic, “27 anos” e “sul da França” sem fonte | Preço explicitado como não oficial; trechos retirados |
| Meet the Bund | “Primeira estrela para a cozinha de Fujian” e passagem pelo grupo Yanyu sem fonte | Texto ajustado ao comunicado do Michelin; endereço com a divergência registrada |

Nomes de lista em 2026 padronizados como “The 50 Best Restaurants” (Mingles e JAN).

## 3. Pendência que as fontes não resolvem

**L03-MB-ENDERECO (P1):** a ficha do The 50 Best 2026 do Meet the Bund dá o endereço do Bund Finance Center, mas o próprio texto dela e a ficha do Asia’s 50 Best 2026 descrevem a unidade Skyline, no 56º andar do Raffles City The Bund. O perfil mantém o endereço da ficha mundial e registra as duas unidades (e a de Xintiandi). Não há site oficial, conta de WeChat ou página de reservas; o canal confirmado é o telefone. Isso continua como L0-SITES.

## 4. Contrato F2-04

Os dez perfis estão em modo estrito (`partial`). Canais: oito `online`, Mingles e Meet the Bund `phone`. As revisões de campo somam 62 registros: 35 confirmados, 17 com fonte única, 7 não verificados e 3 divergentes. Os divergentes são o telefone do Sühring (site oficial e The 50 Best diferentes), o número de etapas do Tuju e o endereço do Meet the Bund. Somando os três lotes, há **25 perfis no contrato e 156 fotos com direito aprovado**.

## 5. Verificação

| Verificação | Resultado |
| --- | --- |
| `npm ci` | Saída 0 (cópia de trabalho nova) |
| `npm run check:profiles` | Saída 0; mesmos 10 avisos ([log](fase-2-evidencias/check-profiles-L03.txt)) |
| `npm run build` | Saída 0 |
| Layout (Chromium, local) | 20 casos sem rolagem horizontal: os dez perfis em 320 px claro e 1440 px escuro; nenhuma imagem sem `alt`; canais renderizados; sem erros de console ([evidência](fase-2-evidencias/layout-L03.json)) |

**Não testado:** 375, 768 e 1024 px, teclado, Firefox, Safari, zoom de 200% e leitor de tela.

## 6. Checklist do lote

- [x] Lista nominal fechada.
- [x] Imagens conferidas no Commons e visualmente; nenhuma exposição incorreta.
- [x] Reservas, preços e prêmios conferidos; correções aplicadas.
- [x] Contrato F2-04 aplicado e validado.
- [x] Validador, build e layout amostral.
- [ ] Endereço do Meet the Bund e itens com fonte única resolvidos ou aceitos pelo revisor.
- [ ] Matriz completa de navegadores, teclado e acessibilidade.
- [ ] Revisor e aceite de produto.

## Publicação conferida — 10/11/2026

Commit [098625a](https://github.com/AndreRuperto/melhores-restaurantes/commit/098625a6472b6447d2fa220111b6c7b24931fd6b); Railway `7cb84878-2508-44c3-a7b2-ec4619edcc05` em SUCCESS. No domínio público, por acesso direto:
- Sorn mostra o preço de 7.800 bahts (sem o antigo 7.200) e as três estrelas mantidas, sem imagens quebradas.
- Nusara traz o 74º lugar na lista estendida e o e-mail de reservas, sem a menção ao Eleven Madison Park.
- Odette mostra os menus Delight e o prêmio de Lesley Liu, sem o Terre & Mer.
- Meet the Bund cita a casa de Xintiandi e as quatro novas estrelas, sem a passagem pelo Yanyu.
- Mingles não cita mais o CatchTable e traz o preço de 2025 e a nota de conferência.

Sem erros de console.
