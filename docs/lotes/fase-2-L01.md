# Fase 2 — L1 piloto: revisão de fontes, imagens e canais

**Data:** 10/11/2026 · **Estado:** em revisão; nenhum perfil homologado.  
**Base:** `e9e736a` (main). **Execução:** Claude (revisão de fontes). **Revisor e aceite de produto:** a designar.  
**Lista nominal:** [Asador Etxebarri](../../src/data/profiles/asador-etxebarri.json) (1), [Steirereck](../../src/data/profiles/steirereck.json) (30), [Den](../../src/data/profiles/den.json) (91), [Khufu’s](../../src/data/profiles/khufus.json) (97), [Aponiente](../../src/data/profiles/aponiente.json) (100).

Esta rodada continua o L0 a partir dos cinco perfis do piloto. Ela conferiu dados práticos nos sites oficiais, metadados e sujeitos das imagens incorporadas e alguns fatos de prêmios. **Ainda não** foram implementados os metadados novos (seções 4.3 e 4.4 do plano), a revisão linha a linha de história e biografias, nem os testes de layout do piloto.

## 1. Imagens incorporadas

Método: API do Wikimedia Commons (`imageinfo/extmetadata`) para autor, licença, data e descrição de cada arquivo; requisição ao `src` publicado; inspeção visual de miniatura das capas, fachadas e galerias. [Evidência bruta](fase-2-evidencias/commons-L01.json).

| Perfil | Usos | Arquivos únicos | Autor/licença declarados = Commons | Carregamento | Sujeito conferido visualmente |
| --- | ---: | ---: | --- | --- | --- |
| Asador Etxebarri | 10 | 10 | 10/10 (CC BY 2.0 e CC BY-SA 4.0) | 10/10 HTTP 200 | Fachada e porta com o nome “etxebarri”; capa é paisagem de Axpe, praça e serra são contexto, como as legendas já dizem |
| Steirereck | 4 | 4 | 4/4 (CC BY-SA 4.0 e CC0) | 4/4 HTTP 200 | Edifício da Meierei e pavilhões espelhados do Stadtpark, categorizados como Restaurant Steirereck |
| Aponiente | 2 | 1 | 2/2 (CC BY-SA 4.0) | 2/2 HTTP 200 | Passarela e edifício do moinho de marés, 2022 |
| Den, Khufu’s | 0 | 0 | Não aplicável | Não aplicável | Sem foto incorporada; `photoReference` aponta para fontes oficiais, sem republicar imagens |

Resultado: **16 usos, 15 arquivos únicos, zero divergência de autor ou licença, zero falha de carregamento** no momento da consulta. As cinco fotos de pratos do Etxebarri são de 2011 e 2014 e estão identificadas como tal; servem como registro histórico, não como prova do menu atual. A identidade dos pratos foi aceita pela fonte do fotógrafo (título no Flickr/Commons), não por reconhecimento visual.

Pendências de imagem, todas sem exposição incorreta demonstrada:

- **L01-ETX-CAPA (P2):** a capa do Etxebarri é uma paisagem do vilarejo, embora exista fachada licenciada e conferida. Decidir no layout do piloto se a capa deve ser a fachada.
- **L01-APO-DUPLICADA (P2):** capa e fachada do Aponiente usam o mesmo arquivo. A interface já evita exibi-lo duas vezes (`Profile.jsx` omite a fachada igual à capa e deduplica os créditos), mas o dado é redundante e a legenda longa da fachada não aparece. Decidir na migração se o campo `facade` fica vazio até haver segunda foto licenciada.
- Os campos `capturedAt`, `licenseUrl`, `rightsStatus` e `kind` ainda não existem nos JSONs; a URL da licença e a data já estão registradas na evidência acima, para a migração do piloto.

## 2. Dados práticos e correções aplicadas

Fontes oficiais lidas em 10/11/2026. Nenhuma reserva, mensagem ou pagamento foi feito.

| ID | Perfil | Achado | Prioridade | Correção |
| --- | --- | --- | --- | --- |
| L01-DEN-RESERVA | Den | O botão “Abrir página de reservas” levava à home de um restaurante que só aceita reserva por telefone | P1 | Link trocado para a página oficial de reservas, que explica o canal telefônico; texto revisado com horários, política de cancelamento e regra de segunda-feira |
| L01-APO-RESERVA | Aponiente | Link para a home em vez da página de reservas; faltava o segundo telefone; duas afirmações não encontradas nas fontes oficiais: alerta sobre sites não oficiais e regra de cinco dias para grupos de sete pessoas ou mais | P1 | Link para `/reservas/`; condições substituídas pelas do guia oficial da temporada 2027 (pré-autorização de €300, 72 h, alergias com 48 h, grupos por e-mail); afirmações sem fonte retiradas |
| L01-APO-PRECO | Aponiente | Preço de €400 confirmado no PDF oficial de 2026, mas a temporada terminou e o preço de 2027 ainda não foi divulgado; duração divergente (três horas em 2026, cerca de quatro no guia de 2027); “cerca de 20 hectares” não é atribuído ao Aponiente pela fonte | P1 | Preço datado como temporada 2026 com harmonizações; duração com as duas fontes; frase dos hectares reescrita sem número |
| L01-STEI-PRATOS | Steirereck | Os cinco pratos do menu citados no perfil não aparecem no cardápio oficial vigente; uma das fontes (`steirereck.net`, PDF de almoço) não responde | P1 | Pratos trocados pelos do cardápio oficial de jantar de novembro de 2026, com aviso de sazonalidade; preços, harmonizações e couvert detalhados; fonte inacessível removida |
| L01-STEI-RESERVA | Steirereck | Horário do almoço e regra para grupos ausentes | P2 | Almoço 11h30–16h e atendimento de grupos acima de seis pessoas acrescentados |
| L01-KHU-ACESSO | Khufu’s | Faltava a regra prática de acesso: entrada só pelo portão de Fayoum e ingresso obrigatório do planalto de Gizé | P1 | Acrescentado, junto com opções vegetarianas e ônibus interno |
| — | Asador Etxebarri | Preço, IVA, reserva por solicitação, grupos de 2 a 6, prazos e fechamentos conferem com o site oficial | — | Sem alteração |

## 3. Prêmios e fatos — segunda rodada (10/11/2026)

Cada prêmio e posição de ranking dos cinco perfis foi conferido em página oficial do 50 Best ou do Guia Michelin, ou em ao menos uma lista publicada no ano correspondente.

| ID | Perfil | Resultado | Estado |
| --- | --- | --- | --- |
| L01-KHU-PREMIOS | Khufu’s | MENA nº 5 em 2024 confirmado pela lista publicada; nº 4 em 2025 e nº 1 em 2026 confirmados. Acrescentado o Resy One To Watch Award do The World's 50 Best 2025, citado na página oficial. A biografia dizia “Top Chef Arabia 2017”; o programa é o Top Chef Middle East, segunda temporada, exibida a partir de outubro de 2017, e páginas do próprio 50 Best datam o título de 2017 ou 2018. O texto agora registra essa diferença | Corrigido |
| L01-DEN-PREMIOS | Den | One To Watch 2016, nº 11 no mundo em 2021 e nº 1 da Ásia em 2022 confirmados. Acrescentados Chefs’ Choice Award do Asia’s 50 Best 2019, nº 32 no mundo em 2024 e nº 22 na Ásia em 2025 (página oficial). A primeira estrela em 2011 e as duas estrelas atuais aparecem em várias fontes secundárias; a página do Guia Michelin não carregou | Corrigido; estrela de 2011 com fonte secundária |
| L01-ETX-FATOS | Asador Etxebarri | Abertura em 1990, oito mesas, cerca de 400 vinhos, estreia em 2008, nº 13 com Highest Climber em 2015, nº 10 em 2016, nº 6 em 2017, nº 10 em 2018, nº 3 em 2019 e 2021, nº 6 em 2022, nº 4 em 2023, nº 2 em 2024 e 2025, nº 1 em 2026, Chefs’ Choice 2021 e prêmio de sommelier 2025 conferidos. Premio Nacional de Gastronomía 2016 confirmado na categoria Melhor Chefe de Cozinha. Biografia ajustada: a fonte fala em casa sem eletricidade (não menciona gás) e em prêmio “talvez” o mais importante da carreira. A Wikipédia em espanhol dá 1991 para a abertura; prevalece 1990, da página oficial do 50 Best | Corrigido |
| L01-STEI-FATOS | Steirereck | Nº 9 em 2013, nº 12 em 2021, nº 13 em 2022, nº 18 em 2023, nº 22 em 2024 e nº 30 em 2026 conferidos; nº 33 em 2025 deduzido da reportagem de 2026, que fala em subida de três posições; terceira estrela anunciada pelo Guia Michelin em janeiro de 2025. Acrescentado o Art of Hospitality Award 2021, que faltava. Os toques do Gault&Millau de 1983, 1986 e 1992 vêm de fonte regional e não foram reconferidos | Corrigido; Gault&Millau com fonte única |
| L01-APO-FATOS | Aponiente | Abertura em 2007 (artigo do Guia Michelin; outras fontes citam 2005), estrelas em 2010, 2014 e 2017 (anunciada para a edição de 2018) e Sustainable Restaurant Award 2022 confirmados. O perfil não cita a estrela verde Michelin, mencionada por fontes secundárias sem ano | Sem alteração; estrela verde fica como P2 |

Ficam como pendência P2, sem bloquear o piloto: Art of Hospitality 2019 do Den (fonte única) e estrela verde do Aponiente.

## 4. Layout, temas e teclado

Servidor de desenvolvimento e Chromium, com os textos novos. [Evidência](fase-2-evidencias/layout-L01.json).

- **25 casos sem rolagem horizontal:** os cinco perfis em 320, 375 e 768 px no tema claro e em 320 e 1440 px no tema escuro. Nenhum elemento fora da tela além de traços do mapa vetorial, que ficam recortados pelo contêiner.
- **Acessibilidade básica:** em 320 px, nenhuma imagem sem `alt` e nenhum link ou botão sem nome acessível nos cinco perfis.
- **Teclado:** no Aponiente, 45 Tabs percorreram logotipo, voltar, tema, créditos, reserva, site, controles do mapa, lista lateral e rodapé, voltando ao início; todos os 45 focos tinham contorno visível.
- **Não testado:** 1024 px, tema escuro em 375/768/1024, Firefox, Safari, zoom de 200% e leitor de tela. São lacunas, não aprovação.

## 5. Comandos e verificação

| Comando | Resultado |
| --- | --- |
| `npm run check:profiles` | Saída 0; 100 perfis; os mesmos 10 avisos do L0 |
| `npm run build` | Saída 0 |
| Servidor de desenvolvimento, Chromium | Den e Aponiente renderizam o novo link de reserva; Steirereck exibe os pratos novos; Khufu’s exibe a regra de acesso; sem erros de console |

Ambiente: Windows, Node 26.13.0. Validador e build repetidos após a segunda rodada de correções, com o mesmo resultado.

## 6. Checklist do lote

- [x] Lista nominal fechada.
- [x] Licença, autor, data e carregamento das imagens incorporadas conferidos; sujeitos das capas, fachadas e galerias conferidos visualmente.
- [x] Canais de reserva e preços conferidos nas fontes oficiais; correções aplicadas sem alegar disponibilidade.
- [x] Validador e build executados após as correções.
- [x] Prêmios e rankings conferidos; divergências corrigidas ou registradas.
- [x] Layout sem overflow e foco visível na amostra do piloto (Chromium).
- [ ] Metadados novos implementados e validados (F2-04).
- [ ] Firefox, Safari, zoom de 200% e leitor de tela.
- [ ] Commit, deploy no Railway e teste público.
- [ ] Revisor e aceite de produto registrados.

**P1 do piloto ainda abertos:** F2-04 (metadados e validador), matriz de navegadores e acessibilidade manual, e L0-SEO (canonical, descrição e metadados sociais por perfil), que é transversal. **Próximo passo:** publicar estas correções e implementar o contrato de metadados no piloto.

## Publicação conferida — 10/11/2026

Commit [077c8b4](https://github.com/AndreRuperto/melhores-restaurantes/commit/077c8b499ed518bacfd8009dc0e80a9e501e6b0e) enviado à `main`. Railway: deploy `2cf4c1e4-9e15-4c7b-a79a-c80e032537dc` em SUCCESS para esse SHA, ambiente production.

Teste no domínio público, por acesso direto a cada rota:

| Perfil | Conferido no site público | Resultado |
| --- | --- | --- |
| Den | Link de reserva para `/en/reserve/`; regra de reserva de segunda-feira; Chefs’ Choice 2019 | Aprovado |
| Aponiente | Link de reserva para `/reservas/`; pré-autorização de €300; alerta sem fonte sobre sites não oficiais ausente | Aprovado |
| Steirereck | Prato “Badger Flame” presente; Art of Hospitality 2021 presente; prato antigo “Truta de montanha” ausente | Aprovado |
| Khufu’s | Portão de Fayoum; Resy One To Watch 2025; Top Chef Middle East | Aprovado |
| Asador Etxebarri | Categoria do Premio Nacional; biografia ajustada; zero imagens quebradas | Aprovado |

Sem erros de console. O teste confirma o conteúdo publicado, não a homologação do lote: F2-04, a matriz de navegadores e o aceite de produto continuam pendentes.

## F2-04 — contrato de metadados no piloto (10/11/2026)

**Validador** (`scripts/validate-profiles.mjs`): os campos das seções 4.3 e 4.4 do plano passam a ser conferidos sempre que existem, em qualquer perfil. Um perfil que declara `verificationStatus` entra no modo estrito e precisa ter `lastReviewedAt`, `imageStatus`, `fieldReviews` e `practical.reservationMode`, além de `kind`, `subject`, `alt` e `rightsStatus` em todas as imagens. Os outros 95 perfis seguem válidos sem os campos novos.

Regras principais: datas ISO reais e não futuras; vocabulários fechados para os status; `fieldReviews` com fonte HTTPS, data e nota obrigatória quando o status não é `confirmed`; telefone em formato internacional e e-mail válido; `reservationMode` coerente com o canal (`phone` exige telefone, `online` exige link HTTPS); `priceDetails` com valor positivo ou `null`, moeda ISO 4217, base, impostos booleano ou `null`, fonte e data; imagem `rejected` bloqueia, `pending` gera aviso, `approved` exige licença, evidência, atribuição e data; `licensed-real` exige foto real do estabelecimento aprovada; `reference-only` exige referência externa e nenhuma foto incorporada; `verified` exige todas as revisões confirmadas e todas as imagens aprovadas.

**Teste negativo:** um perfil adulterado de propósito com 14 violações (data inexistente, data futura, fonte HTTP, status sem nota, e-mail inválido, modo telefone sem telefone, seis falhas em `priceDetails`, `licensed-real` sem foto e `verified` com revisão divergente) gerou exatamente os 14 erros esperados. O arquivo foi restaurado sem diferença.

**Dados do piloto:**

| Perfil | verificationStatus | imageStatus | Canal | Revisões de campo | Imagens com direito aprovado |
| --- | --- | --- | --- | --- | ---: |
| Asador Etxebarri | partial | licensed-real | online | 7 (1 com fonte única) | 10 |
| Steirereck | partial | licensed-real | online + telefone | 5 (1 com fonte única) | 4 |
| Den | partial | reference-only | phone | 4 (1 com fonte única, 1 não verificada) | 0 |
| Khufu’s | partial | reference-only | contact | 5 (1 divergente) | 0 |
| Aponiente | partial | licensed-real | online + telefone + e-mail | 6 (1 com fonte única) | 1 arquivo (capa e fachada) |

Nenhum perfil recebeu `verified`: há revisões não confirmadas e falta o aceite de produto. A aprovação de direito das 15 fotos se baseia na licença aberta conferida no Commons; o revisor humano continua a designar. Os campos `width`, `height`, `bytes`, `format`, `originalSrc` e `localPath` ficam para a etapa de derivados locais (2.2), porque hoje as imagens são servidas pelo próprio Commons.

**Interface:** `alt` próprio nas imagens (capa, galeria, fachada e pratos), com a legenda como reserva; linhas de telefone (`tel:`) e e-mail (`mailto:`) nas informações práticas; o link do Den passa a se chamar “Ver instruções de reserva”, em vez de sugerir reserva online; nota com a data da conferência abaixo das informações práticas. Os perfis sem metadados não mudam (conferido no Gaggan).

**Verificação:** check:profiles com saída 0 ([log](fase-2-evidencias/check-profiles-L01.txt)), com os mesmos 10 avisos, 5 perfis no contrato e 15 fotos com direito aprovado; build com saída 0; Den, Aponiente, Etxebarri e Gaggan conferidos no servidor local, sem erros de console.
