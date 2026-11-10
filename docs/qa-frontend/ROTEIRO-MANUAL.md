# Roteiro manual — leitor de tela, Safari/iOS e celular

Testes que a automação não substitui. Faça no site publicado, <https://melhores-restaurantes.up.railway.app/>, e anote o resultado na tabela do fim. Cada bloco leva de 5 a 10 minutos.

## 1. Leitor de tela (NVDA no Windows)

**Preparar:** instale o NVDA (gratuito, nvaccess.org) e abra o site no Chrome ou no Firefox. Atalhos úteis:

- **H:** próximo título. **Shift+H:** título anterior.
- **D:** próxima região (cabeçalho, conteúdo principal).
- **Tab:** próximo link ou botão.
- **Insert+F7:** lista de links e títulos da página.
- **Ctrl:** cala a fala.

| # | Onde | O que fazer | O que deve acontecer |
|---|---|---|---|
| 1.1 | Home | Abra a página e pressione Tab uma vez | O primeiro item anunciado é "Pular para o conteúdo". Com Enter, o foco vai para o conteúdo principal |
| 1.2 | Home | Pressione H várias vezes | Os títulos aparecem numa ordem que faz sentido, com um único título principal ("Os cem melhores restaurantes do mundo") |
| 1.3 | Home | Se a abertura animada aparecer, use Tab até "Pular introdução" | O botão é anunciado e, com Enter, a animação fecha |
| 1.4 | Lista | Vá até a busca, digite "sao paulo" sem acento | A busca é anunciada como "Buscar restaurante, cidade ou país". A contagem de resultados é lida sozinha quando muda |
| 1.5 | Lista | Abra o filtro de países (Enter), use as setas e escolha Brasil | O menu é anunciado ao abrir, as setas leem os países e, ao escolher, a contagem muda e o foco volta ao botão |
| 1.6 | Lista | Abra o filtro e pressione Esc | O menu fecha e o foco volta ao botão do filtro |
| 1.7 | Mapa | Use Tab até os pontos do mapa | Cada ponto é lido como "posição, nome, cidade, país". Enter abre o restaurante; Esc tira a seleção |
| 1.8 | Perfil | Abra um perfil e pressione H | O nome do restaurante é o título principal. As seções ("Antes de ir" e as outras) aparecem como títulos |
| 1.9 | Perfil | Passe pelas fotos com a seta para baixo | Cada foto tem uma descrição, e o crédito é lido. Nenhuma imagem é lida como "gráfico" sem descrição |
| 1.10 | Perfil | Use Tab até o link de reserva | O link diz para onde leva (site, telefone ou e-mail), sem ser apenas "clique aqui" |
| 1.11 | Página inexistente | Abra `/restaurante/teste-nvda` | O título anuncia que a página não foi encontrada e há um link de volta para a lista |
| 1.12 | Qualquer página | Use o botão de tema | O nome do botão diz o que ele faz e qual tema está ativo |

## 2. Safari no iPhone (ou iPad)

| # | O que fazer | O que deve acontecer |
|---|---|---|
| 2.1 | Abra a home e role até o fim | Nada fica cortado na lateral e não existe rolagem para os lados |
| 2.2 | Toque em "Restaurantes", abra o filtro de países e toque na busca dele | O teclado aparece sem esconder o campo nem empurrar o menu para fora da tela |
| 2.3 | Toque num ponto do mapa e depois toque de novo | O primeiro toque mostra o restaurante; o segundo abre o perfil |
| 2.4 | Faça zoom com os dedos no perfil e volte | O texto não se sobrepõe e o layout volta ao normal |
| 2.5 | Gire o aparelho para paisagem na lista e num perfil | Cabeçalho, filtros e textos continuam legíveis |
| 2.6 | Ajustes > Acessibilidade > Movimento > Reduzir Movimento, depois recarregue a home | A abertura animada não roda ou fica sem movimento |
| 2.7 | Mude o iPhone para o modo escuro e recarregue | O site acompanha o tema escuro, sem texto apagado |
| 2.8 | No perfil, toque no telefone e no link de reserva | O telefone abre o discador e o link abre o site certo. Não conclua a reserva |
| 2.9 | Compartilhe o link de um perfil no WhatsApp ou no iMessage | A prévia mostra o nome e a descrição do restaurante, não os da home |

## 3. Celular Android de verdade

Repita 2.1, 2.2, 2.3, 2.5, 2.7 e 2.9 no Chrome do Android. Acrescente:

| # | O que fazer | O que deve acontecer |
|---|---|---|
| 3.1 | Abra um perfil com a conexão em 4G (Wi-Fi desligado) | O texto aparece rápido e as fotos vêm depois, sem o texto pular de lugar |
| 3.2 | Use o botão "voltar" do aparelho depois de filtrar a lista | A lista volta com os mesmos filtros |
| 3.3 | Aumente a fonte do sistema (Configurações > Tela > Tamanho da fonte) e abra a lista | Os botões de filtro continuam legíveis e clicáveis |

## Registro

| Bloco | Aparelho e navegador | Data | Quem testou | Resultado | Problemas encontrados |
|---|---|---|---|---|---|
| 1. NVDA | | | | | |
| 2. Safari/iOS | | | | | |
| 3. Android | | | | | |

Problema que bloqueia o uso (não dá para filtrar, abrir um perfil ou ler o conteúdo) é P0 ou P1 e segura a homologação. Detalhe visual vira P2.
