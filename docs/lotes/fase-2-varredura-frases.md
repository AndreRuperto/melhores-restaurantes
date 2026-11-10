# Fase 2 — varredura de frases de instrução

Data: 2026-11-10. Escopo: os 85 perfis com `verificationStatus` em `src/data/profiles/`. Campos varridos: todos os textos exibidos (lede, history, cuisine.paragraphs, chef.bio, dishes[].desc, practical.reservation, practical.price, legendas, `photoReference.note` e `photoReference.previewContext`, que aparecem na seção "O lugar"). Ficaram de fora `fieldReviews`, `priceDetails` e `sources`.

## Critério

Saíram as frases que instruem o leitor ("não deve ser tratada como…", "não considere…", "deve ser confirmada…") ou que falam do processo de verificação do A Carta ("não confirmado em fonte oficial", "fonte ilegível ou não encontrada", "nesta página", "o perfil não representa…"). Cada uma virou fato neutro sobre o restaurante, sem informação nova. As ressalvas úteis continuam: preço de experiência temporária, prato de temporada passada, menu que muda, casa distinta de outra unidade.

## O que ficou como estava, de propósito

- Notas de licença de imagem em `photoReference.note` (por exemplo "sem licença aberta de republicação identificada") e legendas de capa contextual ("NÃO representa sua fachada"). Elas explicam a imagem mostrada na própria caixa de fonte, e o projeto quer manter essa função.
- Créditos de fonte entre parênteses ("site oficial, consultado em novembro de 2026") e "segundo o Guia Michelin".
- **Fora do escopo:** FZN, Arca e Tim Raue, citados como exemplos no pedido, não têm `verificationStatus`. Eles são do lote L10 (posições 83 a 100), que outra sessão está revisando. As frases deles ficam para essa revisão.
- **Atenção a conflito:** Den (91) e Khufu's (97) são da faixa do L10, mas já têm `verificationStatus`, então entraram aqui. Se a sessão do L10 mexer nos mesmos campos, pode haver conflito no merge.

## Frases alteradas (47 trocas em 31 perfis)

| Perfil | Campo | Antes | Depois |
|---|---|---|---|
| alcalde | dishes[2].desc | ; não confirmado no menu de 2026. | ; pode não estar no menu de 2026. |
| alcalde | dishes[3].desc | ; não confirmado no menu de 2026. | ; pode não estar no menu de 2026. |
| arpege | cuisine.paragraphs[2] | A fotografia licenciada que acompanha esta página é de 2009; nessa versão histórica o prato tinha caramelo com leite e, portanto, não representa necessariamente a carta vegetal vigente. | A fotografia licenciada do prato é de 2009; nessa versão histórica a tarte levava caramelo com leite, diferente da carta vegetal atual. |
| celele | practical.price | Esse valor é exclusivo da experiência anunciada e não deve ser considerado preço permanente do restaurante. | Esse valor vale apenas para essa experiência temporária, não para a carta regular do restaurante. |
| cocina-hermanos-torres | cuisine.paragraphs[2] | As preparações descritas nesta página documentam diferentes momentos do restaurante e não asseguram presença em todas as visitas. | Os pratos citados vêm de diferentes momentos do restaurante, e nem todos aparecem em cada visita. |
| cocina-hermanos-torres | dishes[1].desc | ; composição sazonal; fonte ilegível ou não encontrada; não confirmado. | ; composição sazonal. |
| cocina-hermanos-torres | dishes[2].desc | ; preparação documentada em 2026; fonte ilegível ou não encontrada; não confirmado. | ; preparação documentada em 2026. |
| cocina-hermanos-torres | dishes[3].desc | , descrita em crítica de 2026; fonte ilegível ou não encontrada; não confirmado. | , descrita em crítica de 2026. |
| cocina-hermanos-torres | dishes[4].desc | , tratadas em passagens sazonais da degustação; fonte ilegível ou não encontrada; não confirmado. | , tratadas em passagens sazonais da degustação. |
| cocina-hermanos-torres | dishes[5].desc | , citada em entrevista dos chefs ao Guia Michelin; fonte ilegível ou não encontrada; não confirmado. | , citada em entrevista dos chefs ao Guia Michelin. |
| den | practical.price | preço exato atualizado não confirmado em página oficial pública. Solicitar a tarifa ao telefone no momento da reserva. | a casa não publica o valor em página oficial, e a tarifa pode ser pedida por telefone na reserva. |
| el-chato | practical.reservation | disponibilidade deve ser confirmada na plataforma. | a disponibilidade aparece na plataforma. |
| evvai | cuisine.paragraphs[2] | , mas não devem ser apresentadas como itens confirmados no menu vigente. | , mas podem não fazer parte do menu vigente. |
| evvai | dishes[4].desc | , sem confirmação de presença no cardápio atual. | , que pode não estar no cardápio atual. |
| frantzen | gallery[0].caption | Registro histórico; não representa o cardápio atual. | O cardápio atual é outro. |
| fu-he-hui | dishes[4].desc | ideia citada pelo 50 Best como possível etapa, sem confirmação no menu atual. | ideia citada pelo 50 Best como possível etapa do menu. |
| fu-he-hui | practical.reservation | Não há site oficial nem sistema de reservas online identificado. Os horários de almoço e jantar não foram confirmados em fonte oficial; recomenda-se consultar o restaurante antes da visita. | A casa não tem site oficial nem sistema de reservas online. Os horários de almoço e jantar não são publicados pela casa; o telefone é o canal para consultá-los. |
| jordn-r | practical.reservation | A política de cancelamento não foi confirmada em fonte oficial aberta: leia as condições antes de reservar. | O site oficial não publica a política de cancelamento. |
| kadeau | photoReference.previewContext | as duas unidades não devem ser confundidas. | são duas casas distintas. |
| khufus | cuisine.paragraphs[2] | não deve ser confundida com o restaurante principal. | é uma casa distinta do restaurante principal. |
| kol | cuisine.paragraphs[2] | O restaurante oferece um percurso de degustação que muda regularmente; o perfil não representa o cardápio fixo de uma data específica. | O restaurante oferece um percurso de degustação que muda regularmente. |
| la-colombe | practical.reservation | A disponibilidade deve ser confirmada na plataforma. | A disponibilidade aparece na plataforma. |
| lasai | practical.price | O valor praticado no endereço atual não foi confirmado no site oficial. | O site oficial não informa o preço. |
| le-coquillage | dishes[4].desc | Não há confirmação de que continue no menu em 2026. | Pode não estar no menu de 2026. |
| masque | photoReference.note | ; fachada específica não confirmada. | ; a fonte não traz foto específica da fachada. |
| mayta | cuisine.paragraphs[2] | Esses são exemplos do repertório do chef, não garantia de presença no menu do dia. | Esses são exemplos do repertório do chef; o menu do dia varia. |
| meet-the-bund | photoReference.note | ; fachada específica não confirmada. | ; a fonte não traz foto específica da fachada. |
| meet-the-bund | photoReference.previewContext | O Meet the Bund fica no complexo, mas esta imagem não confirma a entrada do restaurante. | O Meet the Bund fica no complexo; a imagem mostra o edifício, não a entrada do restaurante. |
| mingles | practical.price | O valor de 2026 não foi confirmado em fonte oficial. | A casa não divulga o valor de 2026 em canal oficial. |
| mingles | photoReference.note | ; não há confirmação de uma foto da fachada na fonte. | ; a fonte não traz foto da fachada. |
| mosu | practical.price | ; o valor atual deve ser conferido no Catchtable. | ; o valor atual aparece no Catchtable. |
| naar | cuisine.paragraphs[2] | ; a presença dessas preparações na visita deve ser confirmada com a equipe. | ; essas preparações podem não estar no menu de uma visita específica. |
| nelita | cuisine.paragraphs[2] | A composição atual deve ser confirmada no menu da casa. | A composição atual aparece no menu da casa. |
| onjium | cuisine.paragraphs[2] | Esses nomes descrevem o repertório estudado pela casa; não devem ser confundidos com a composição confirmada de um menu vigente, que muda conforme a época. | Esses nomes descrevem o repertório estudado pela casa; o menu muda conforme a época. |
| onjium | dishes[0].desc | ; exemplo de receita histórica associada à pesquisa da equipe, sem confirmação no cardápio atual. | ; exemplo de receita histórica associada à pesquisa da equipe, que pode não estar no cardápio atual. |
| onjium | practical.price | ; preço oficial em wons não confirmado. Confirmar com o restaurante. | ; a casa não publica o preço em wons em página oficial. |
| onjium | practical.reservation | Disponibilidade não verificada em tempo real. | (retirada) |
| ru-yuan | practical.reservation | Não foi verificado um link público de reserva direta; não considere as páginas de avaliação como confirmação de mesa. | Não há link público de reserva direta, e páginas de avaliação não garantem mesa. |
| salsify-at-the-roundhouse | cuisine.paragraphs[2] | A descrição corresponde à carta publicada durante a consulta e não garante que todas as etapas estarão disponíveis em uma reserva futura. | Esses pratos constam da carta publicada pela casa, que muda com o tempo. |
| sazenka | cuisine.paragraphs[2] | e não deve ser tratada como cardápio fixo. | e muda conforme a estação. |
| sazenka | dishes[1].desc | ; sem confirmação no menu atual. | ; pode não estar no menu atual. |
| sazenka | dishes[2].desc | ; não há confirmação de presença no menu atual. | ; pode não estar no menu atual. |
| schloss-schauenstein | cuisine.paragraphs[2] | O restaurante revê os menus periodicamente; os exemplos documentados não devem ser interpretados como garantia do que estará disponível numa data específica. | O restaurante revê os menus periodicamente, e essas preparações podem não estar disponíveis numa data específica. |
| septime | dishes[4].desc | ; não representa um prato fixo. | . |
| septime | practical.reservation | Disponibilidade de mesas não verificada em tempo real. | (retirada) |
| tresind-studio | dishes[3].desc | Prato de temporada passada; presença atual não confirmada. | Prato de temporada passada, que pode não estar no menu atual. |
| willem-hiele | cuisine.paragraphs[2] | Esses são registros de repertório, não confirmação do menu de uma reserva específica. | Esses são exemplos do repertório; o menu muda ao longo das temporadas. |

## Verificação

- `npm run check:profiles`: saída 0, 11 avisos editoriais (os mesmos de antes).
- `npm run build`: concluído.
- Formato mantido: `JSON.stringify(o, null, 2)` com CRLF e CRLF final. O script recusava qualquer arquivo que não estivesse nesse formato antes da troca.
