# Fase 2 — L2: perfis 2 a 11

**Data:** 10/11/2026 · **Estado:** em revisão; nenhum perfil homologado.  
**Base:** `501c941` (main). **Execução:** Claude, com cinco agentes de checagem de fontes (dois perfis cada) e conferência própria de imagens, correções e testes. **Revisor e aceite de produto:** a designar.  
**Lista nominal** (rank crescente, sem os perfis do piloto): Gaggan (2), Alchemist (3), Quintonil (4), Wing (5), The Chairman (6), Kjolle (7), Kadeau (8), DiverXO (9), Plénitude (10), Atomix (11).

Mesmo método do [piloto L1](fase-2-L01.md): dados práticos nas fontes oficiais, prêmios em páginas oficiais ou listas do ano, imagens pela API do Commons e por inspeção visual, e o contrato de metadados F2-04 aplicado a cada perfil. Nenhuma reserva, formulário ou mensagem foi enviado.

## 1. Imagens

[Evidência do Commons](fase-2-evidencias/commons-L02.json).

- **73 usos, 68 arquivos únicos**, todos no Wikimedia Commons, todos com HTTP 200.
- **Autor e licença:** 71 iguais ao Commons. Nas duas restantes, a licença confere, mas o crédito estava escrito de outra forma. Uma é a colher de caviar do Alchemist, cuja obra derivada está creditada corretamente. A outra é o caranguejo do The Chairman, creditado como “usuário do Wikimedia Commons”: o crédito passou a ser o do autor, **Almandine**, como a CC BY-SA 3.0 exige (L02-CH-CREDITO, corrigido).
- **Inspeção visual** de todas as fotos em pranchas. As fotos reais mostram a casa certa: placas e fachadas de Gaggan (endereço antigo), Alchemist, Quintonil, DiverXO e Atomix; salões e cozinha do Alchemist, Quintonil e DiverXO; os chefs Pía León, Dabiz Muñoz e Arnaud Donckele. **Todas as fotos genéricas** (pratos, ingredientes, mercados, skyline) já estavam marcadas como ilustrativas e diziam isso na legenda. Nenhuma foto foi encontrada atribuída à casa errada.
- **Correção de legenda:** a foto do Gaggan descrita como “fachada do primeiro endereço” é a placa com o nome do restaurante; legenda ajustada.
- **Situação por perfil (`imageStatus`):** `licensed-real` em sete; `historical-or-context` em Wing e The Chairman (só bairro e edifício) e Kadeau (fotos reais da casa de Bornholm, não da casa ranqueada de Copenhague, já identificadas nas legendas; a legenda da capa agora diz isso explicitamente — L0-KADEAU tratado no texto, troca da foto fica como P2 até haver imagem licenciada de Copenhague).
- Fotos ilustrativas receberam `kind: context`, para não contarem como foto real do estabelecimento.

## 2. Correções aplicadas

| Perfil | Achado | Prioridade | Correção |
| --- | --- | --- | --- |
| Alchemist | O perfil não mencionava o “Intermission”: a partir de dezembro de 2026, pausa de cerca de cinco meses por ano, com reabertura sem data e preço fixo com bebidas, segundo comunicado do restaurante | P1 | Apresentação, história, reserva e preço atualizados; comunicado acrescentado às fontes |
| The Chairman | O Chairman & Yip ficava “em Sydney”; fica em Canberra. Telefone, WhatsApp e e-mail apareciam como canais de reserva, mas o site os lista só como contato. O título Best Restaurant in China estava em 2022, mas está confirmado em 2020 | P1 | Texto corrigido; alerta do restaurante sobre sites falsos acrescentado; preço marcado como fonte secundária |
| Kadeau | “Imóvel menor, com 24 lugares”, sem fonte; 2023 não foi a estreia na lista, foi um retorno; “seis dias” de defumação sem fonte; reserva é pela Tock | P1 | Trechos sem fonte retirados; pratos antigos marcados como versões de anos anteriores; fonte do 50 Best atualizada |
| Kjolle | Preço de junho de 2025 com harmonização sem álcool que não existe mais; dois pratos com receita antiga | P1 | Preço e regras de reserva atuais (Mesa 24/7, até seis pessoas, IGV e serviço incluídos); pratos atualizados |
| Quintonil | Pratos descritos como “ainda no cardápio”, mas ausentes do menu de novembro de 2026 | P1 | Textos ajustados; telefone do site oficial (o do 50 Best diverge) |
| Wing | Biografia dava a entender que o Vea abriu em 2011 (abriu em 2015); “desde a abertura” sem fonte; ovo com ostra fora do menu atual | P1 | Biografia e pratos ajustados; horários e regra de cancelamento de 72 horas acrescentados |
| Atomix | “Harmonização incluída” vale só para o menu do bar; Art of Hospitality foi dado ao restaurante, não a Ellia Park; “Naro no Rockefeller Center” sem fonte | P1 | Preço, história e regras de reserva corrigidos; Somssi (2026) acrescentado; prêmio de melhor da América do Norte 2026 acrescentado |
| Gaggan | Preço apresentado como US$ sem fonte oficial; telefone e WhatsApp apresentados como canal de reserva; “corantes vegetais” sem fonte | P1 | Preço datado e atribuído ao guia Discovery; canal SevenRooms; texto do prato neutro; Raga by Gaggan (2026) acrescentado |
| DiverXO | “Escola de cozinha aos 17 anos” sem fonte; reserva e preço incompletos | P1 | Biografia ajustada; ticket pré-pago com IVA, liberação de datas em 90 dias e reembolso com duas semanas |
| Plénitude | Horário de início divergente entre fontes; “cinco toques” do Gault&Millau sem confirmação | P1 | Horário retirado; prêmio descrito pela nota 19/20 |

Nomes de lista em 2026 padronizados como “The 50 Best Restaurants”, como nas páginas oficiais.

## 3. Contrato F2-04

Os dez perfis estão em modo estrito: `verificationStatus: partial`, data de revisão, canal de reserva (nove `online`, Plénitude `email`), telefone e e-mail quando publicados, `priceDetails` com fonte e data, e metadados de direito nas 73 imagens. As revisões de campo somam 59 registros: 40 confirmados, 14 com fonte única, 4 não verificados e 1 divergente (telefone do Quintonil, entre o site oficial e o 50 Best). Nenhum perfil recebeu `verified`.

**Itens com fonte única ou não verificados**, todos registrados em `fieldReviews`:
- preços do Gaggan, The Chairman, Plénitude e Atomix, que não são publicados nos sites oficiais ou que os sites bloquearam;
- página de reservas do The Chairman e site do Plénitude, ilegíveis para leitura automática;
- “cinco pratos novos por ano” e “ganso de nove meses” do The Chairman;
- tema de “doação de órgãos” no Alchemist;
- episódios da fundação do DiverXO;
- estrelas Michelin de vários perfis, porque o site do guia não carrega para leitura automática.

## 4. Verificação

| Verificação | Resultado |
| --- | --- |
| `npm run check:profiles` | Saída 0; mesmos 10 avisos; 15 perfis no contrato e 83 fotos com direito aprovado ([log](fase-2-evidencias/check-profiles-L02.txt)) |
| `npm run build` | Saída 0 |
| Layout (Chromium, local) | 20 casos sem rolagem horizontal: os dez perfis em 320 px claro e 1440 px escuro; nenhuma imagem sem `alt`; telefone, e-mail e reserva renderizados; sem erros de console ([evidência](fase-2-evidencias/layout-L02.json)) |

**Não testado:** 375, 768 e 1024 px, teclado, Firefox, Safari, zoom de 200% e leitor de tela.

## 5. Checklist do lote

- [x] Lista nominal fechada.
- [x] Imagens conferidas no Commons e visualmente; nenhuma exposição incorreta.
- [x] Reservas, preços e prêmios conferidos; correções aplicadas.
- [x] Contrato F2-04 aplicado e validado.
- [x] Validador, build e layout amostral.
- [ ] Itens com fonte única resolvidos ou aceitos pelo revisor.
- [ ] Matriz completa de navegadores, teclado e acessibilidade.
- [ ] Revisor e aceite de produto.

## Publicação conferida — 10/11/2026

Commit [37d8b15](https://github.com/AndreRuperto/melhores-restaurantes/commit/37d8b155cd597ddc012de77717fc47c4771df3d8); Railway `1cbb3cc1-86c6-45ec-a33a-53ad060271f8` em SUCCESS. No domínio público, por acesso direto: Alchemist mostra o Intermission e o e-mail de reservas, sem imagens quebradas; The Chairman mostra Canberra (e não Sydney), o crédito de Almandine e o alerta sobre sites falsos; Kjolle mostra a Mesa 24/7 e o prato Vaca y Tarwi, sem o preço antigo de S/ 256; Kadeau traz a nota sobre Copenhague na capa e não fala mais em 24 lugares; Plénitude não cita mais os cinco toques e mostra telefone e e-mail. Sem erros de console.
