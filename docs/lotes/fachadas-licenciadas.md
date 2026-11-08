# Fotografias das fachadas — A Carta

## Implementação (08/11/2026)

As páginas individuais agora aceitam uma chave opcional `facade` nos arquivos JSON de `src/data/profiles/`. A foto é exibida em uma seção **A fachada** antes de **Antes de ir**, com legenda, autoria e link de licença. Quando a imagem é idêntica à foto de capa, aparece o identificador **Vista externa verificada** na capa, sem repetição. Nenhuma imagem genérica de rua ou bairro é apresentada como fachada real.

## Primeiros cinco perfis

| Restaurante | Evidência | Autor/licença | Observação |
|---|---|---|---|
| #1 Asador Etxebarri | https://commons.wikimedia.org/wiki/File:Across_the_square_to_Asador_Etxebarri_(17910009633).jpg | Winniepix, CC BY 2.0 | Casa e fachada na praça de Axpe, 2015 |
| #30 Steirereck | https://commons.wikimedia.org/wiki/File:Wien_03_Steirereck_a.jpg | Gugerell, CC0 1.0 | Edifício no Stadtpark de Viena, 2021 |
| #38 Atelier Moessmer | https://commons.wikimedia.org/wiki/File:Villa_Moessmer.jpg | Alletto, CC BY-SA 3.0 | Villa histórica em 2014, antes da adaptação para restaurante |
| #39 Schloss Schauenstein | https://commons.wikimedia.org/wiki/File:Unteres_Schloss_F%C3%BCrstenau_Front.jpg | Adrian Michael, CC BY-SA 1.0 | Vista frontal do castelo, 2011 |
| #40 Jordnær | https://commons.wikimedia.org/wiki/File:Gentofte_Hotel.jpg | PaigePhault, CC0 1.0 | Fachada do Gentofte Hotel, onde fica o restaurante; não do salão |

## Regras editoriais

1. Usar **somente fotos comprovadamente do edifício, entrada ou fachada**; não confundir imagens contextuais de bairros com o estabelecimento.
2. Confirmar **direito de republicação** (Creative Commons, domínio público ou autorização escrita) e guardar autor, licença, fonte e ano na legenda.
3. Diferenciar **fachada histórica**, **edifício onde o restaurante funciona** e fachada recente. Fotos antigas não mostram necessariamente o aspecto atual.
4. Não copiar Google Street View, páginas de avaliação ou imagens promocionais sem checar as condições e a autorização.
5. Para novos restaurantes, preencher `facade` quando houver imagem verificada; se não houver, não exibir a seção. A ausência é preferível a atribuição incorreta.
6. Quando licença exigir atribuição e compartilhamento pela mesma licença para adaptações, observar as condições específicas. O componente liga diretamente à página de arquivo e ao texto da licença Creative Commons.

## Testes pendentes

Confirmar renderização responsiva, carregamento das imagens e build de produção. O conteúdo atualizado no GitHub foi conferido estruturalmente, mas não foi compilado nem inspecionado em navegador.
