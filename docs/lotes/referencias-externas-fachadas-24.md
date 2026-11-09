# Referências externas das fachadas e dos ambientes — posições 1–40

Data: 8 de novembro de 2026

## Situação

- **16/40** perfis têm fotografia de fachada, entrada ou edifício real publicada diretamente com créditos/licença no site A Carta (lote anterior).
- **24/40** perfis restantes ganharam `photoReference`, link para a fotografia ou galeria na **fonte original**, com identificação do que é mostrado. Não há upload, cópia, hotlink, embed ou republicação dessas imagens pelo A Carta.
- Destes 24, **12** fontes foram classificadas como imagens de fachada ou entrada; as demais **12** como imagens dos ambientes ou da arquitetura — não como fachada confirmada.
- O componente `Facade` apresenta esses links em uma caixa editorial, respeitando o estilo das páginas individuais. Nos casos com foto licenciada, segue mostrando a foto de fachada como antes.

## Inventário das fontes

| Posição | Restaurante | Tipo | Publicação | Link |
|---:|---|---|---|---|
| 2 | gaggan | fachada | Guia Michelin | https://guide.michelin.com/gb/en/bangkok-region/bangkok/restaurant/gaggan-anand?millesime=prioritizedtocompletedata |
| 7 | kjolle | fachada | RF Studio | https://raffreyre.com/es/kjolle/ |
| 8 | kadeau | ambientes | Firstserved | https://www.firstserved.dk/restaurant/kadeau |
| 12 | sorn | fachada | Nation Thailand / The Star | https://www.nationthailand.com/life/food/40044763 |
| 13 | merito | ambientes | ArchDaily | https://www.archdaily.cl/cl/905039/restaurant-merito-ghezzi-novak |
| 14 | suhring | fachada | Sühring | https://restaurantsuhring.com/contact |
| 16 | tuju | fachada | Folha de S.Paulo | https://www1.folha.uol.com.br/amp/mercado/2026/03/pinheiros-tem-muitas-atracoes-e-metro-quadrado-nas-alturas.shtml |
| 17 | mingles | ambientes | Guia Michelin | https://guide.michelin.com/my/en/seoul-capital-area/kr-seoul/restaurant/mingles |
| 18 | nusara | ambientes | Nusara | https://www.nusarabkk.com/nusara |
| 20 | piazza-duomo | ambientes | Guia Michelin | https://guide.michelin.com/us/en/piemonte/alba/restaurant/piazza-duomo |
| 21 | meet-the-bund | ambientes | Guia Michelin | https://guide.michelin.com/gb/en/shanghai-municipality/shanghai/restaurant/meet-the-bund?millesime=um3g85 |
| 23 | vyn | ambientes | FOJAB | https://fojab.se/en/project/vyn-restaurant-hotel-food-bar/ |
| 24 | al-gatto-verde | fachada | Italia a Tavola | https://www.italiaatavola.net/check-in/2023/9/12/al-gatto-verde-ecco-come-nuovo-ristorante-di-massimo-bottura-a-modena/99359/ |
| 25 | lasai | ambientes | Guia Michelin | https://guide.michelin.com/br/pt_BR/rio-de-janeiro-region/rio-de-janeiro/restaurant/lasai |
| 26 | masque | ambientes | The Infatuation | https://www.theinfatuation.com/mumbai/reviews/masque |
| 27 | reale | fachada | Accademia Niko Romito | https://www.accademianikoromito.it/wp-content/uploads/2025/06/Brochure-ING-bozza-2_250618_093409.pdf |
| 28 | tresind-studio | fachada | Identità Golose | https://en.identitagolose.it/place/it/98/35790/incredibly-good/Trsind-study-vertigo-from-the-Himalayas-to-the-Indian-Ocean.html |
| 29 | enigma | fachada | Architectural Record | https://www.architecturalrecord.com/articles/12938-enigma-restaurant-by-rcr-arquitectes-and-pau-llimona |
| 31 | celele | fachada | CNN Brasil Viagem & Gastronomia | https://www.cnnbrasil.com.br/viagemegastronomia/gastronomia/celele-e-mais-que-um-restaurante-e-a-alma-do-caribe-colombiano-a-mesa/ |
| 32 | potong | ambientes | Potong (site oficial) | https://www.restaurantpotong.com/aboutpotongbuilding |
| 33 | elkano | fachada | Turismo Euskadi | https://turismo.euskadi.eus/en/restaurants/elkano-restaurant/webtur00-content/en/ |
| 35 | la-colombe | ambientes | La Colombe (site oficial) | https://www.lacolombe.restaurant/la-colombe |
| 36 | ru-yuan | ambientes | Tatler Asia | https://www.tatlerasia.com/dining/ru-yuan |
| 37 | nuema | fachada | Expreso | https://www.expreso.ec/actualidad/economia/nuema-100-mejores-restaurantes-mundo-200939.html |

## Regras
- Uma foto estar disponível em jornal, guia, portfólio de fotógrafo, restaurante ou rede social **não implica licença para copiá-la**. Os links levam ao site de origem para o usuário consultar.
- Não copiar imagens para `public/`, `src/` ou hospedar em CDN sem licença ou autorização de reutilização aplicável.
- Uma foto do interior não é rotulada como fachada, e fotos de sedes antigas não são apresentadas como atuais.
- Atenção ao Lasai: o Michelin registra mudança de endereço prevista para dezembro de 2026, de Humaitá para Ipanema.
- Para transformar links em fotos renderizadas pelo A Carta, obter licença/autor/fonte e preencher a estrutura `facade`, mantendo legendas e autorias.

## Testes pendentes
Rodar `npm run check:profiles`, `npm run build`, verificar os links externos e testar os layouts em desktop/mobile depois do deploy. A conferência deste lote cobre os arquivos e referências no GitHub, não a renderização em navegador.
