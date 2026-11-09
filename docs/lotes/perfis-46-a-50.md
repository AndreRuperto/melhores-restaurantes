# A Carta — Lote editorial 46–50

**Revisão:** 9 de novembro de 2026 · **Branch:** `main`.

## Escopo
Ampliação e conferência dos cinco restaurantes antes cadastrados de forma resumida, com história de abertura e evolução, chef e conceito de cozinha, pratos ou preparações documentadas, prêmios, reservas e imagens creditadas.

| Rank | Perfil | História / cozinha | Pratos | Prêmios | Fotografia exibida diretamente | Reservas |
|---:|---|---|---:|---:|---|---|
| 46 | El Chato | 4 / 3 parágrafos | 5 | 9 | Rua próxima no Chapinero (imagem **contextual**, não fachada) | Site oficial e contato |
| 47 | Le Louis XV – Alain Ducasse | 4 / 3 parágrafos | 5 | 4 | **Foto real do salão** em 2016 e **fachada do Hôtel de Paris** em 2020 (ambas CC BY-SA 4.0) | Ducasse Paris / telefone oficial |
| 48 | Ikoyi | 4 / 3 parágrafos | 4 | 6 | Rua Strand (contextual) e arroz jollof tradicional (ilustrativo; não prato do Ikoyi) | SevenRooms |
| 49 | Naar | 4 / 3 parágrafos | 4 | 4 | Contrafortes do Himalaia vistos de Chandigarh (contextual) | Página de reservas oficial, telefone e e-mail |
| 50 | Saint Peter | 4 / 3 parágrafos | 5 | 5 | Edifício histórico de Paddington (contextual, **não** a sede) | Página oficial de reservas |

## Verificações e correções
- **El Chato:** aberto em 2017; site oficial registra o nº 1 da América Latina em 2025. O cardápio público com pratos à la carte foi conferido no OpenTable em novembro de 2026.
- **Le Louis XV:** fundado em 1987 e três estrelas Michelin desde 1990. O chef executivo atual é Emmanuel Pilon. A foto interna livre retrata **2016**, não comprova decoração atual. A fotografia externa é do edifício correto, o Hôtel de Paris.
- **Ikoyi:** fundado em 2017 por Jeremy Chan e Iré Hassan-Odukale; primeira estrela em 2018, segunda em 2022; mudou para 180 Strand em 2022. O site informa menus de £395 e £180 e o calendário de liberação de reservas.
- **Naar:** abriu em novembro de 2023; restaurante 30º do Asia's 50 Best em 2026, 49º mundial e ganhador do Sustainable Restaurant Award 2026. O site oficial escreve **173206** para o código postal de Darwa/Kasauli; o perfil do 50 Best apresenta **173236**. Usou-se o código do site oficial; confirmar o destino ao viajar.
- **Saint Peter:** fundado em 2016 e transferido para o Grand National Hotel em agosto de 2024. O hotel de 14 quartos abriu em janeiro de 2025. As reservas oficiais informam AUD 195 no almoço e AUD 395 no jantar, com cancelamento de 48 horas. Os três chapéus foram mantidos na edição **2027 do Sydney Good Food Guide, anunciada em outubro de 2026**.

## Fontes e imagens
Todos os perfis têm lista de URLs em `sources` e referência de fotógrafo/arquivo/licença das imagens publicadas; em `photoReference` estão links para imagens reais que pertencem a terceiros, **sem republicação**. Não representar fotografias de bairros ou pratos genéricos como se fossem do restaurante.

- El Chato: https://www.elchato.co/ ; https://www.the50.com/restaurants/best-in-the-world/the-list/el-chato.html
- Le Louis XV: https://guide.michelin.com/us/en/monaco-region/monaco/restaurant/le-louis-xv-alain-ducasse-a-l-hotel-de-paris ; https://www.ducasse-paris.com/en/addresses/le-louis-xv-alain-ducasse-a-lhotel-de-paris/
- Ikoyi: https://ikoyilondon.com/ ; https://guide.michelin.com/gb/en/article/dining-out/ikoyi-inspectors-two-michelin-star-restaurant-london
- Naar: https://restaurantnaar.com/ ; https://restaurantnaar.com/reservations ; https://www.the50.com/restaurants/best-in-the-world/the-list/naar.html
- Saint Peter: https://www.saintpeter.com.au/reservations ; https://www.saintpeter.com.au/menu/ ; https://www.the50.com/restaurants/best-in-the-world/the-list/saint-peter.html

### Licenças de imagens publicadas
| Perfil | Wikimedia Commons | Autor | Licença |
|---|---|---|---|
| El Chato (contextual) | https://commons.wikimedia.org/wiki/File:2017_Bogot%C3%A1_fachada_calle_64_con_carrera_3.jpg | Felipe Restrepo Acosta | CC BY-SA 4.0 |
| Le Louis XV (salão real) | https://commons.wikimedia.org/wiki/File:2016_Hotel_de_Paris_-_Monaco_03_Restaurant_Louis_XV.jpg | Jordiferrer | CC BY-SA 4.0 |
| Le Louis XV (hotel real) | https://commons.wikimedia.org/wiki/File:H%C3%B4tel_de_Paris_Monte-Carlo_001.jpg | Arnaud 25 | CC BY-SA 4.0 |
| Ikoyi (rua Strand, contextual) | https://commons.wikimedia.org/wiki/File:The_Strand_Londres.jpg | CVB | CC BY-SA 4.0 |
| Ikoyi (jollof ilustrativo) | https://commons.wikimedia.org/wiki/File:JOLLOF_RICE.JPG | Ask4ugo | CC BY-SA 4.0 |
| Naar (paisagem contextual) | https://commons.wikimedia.org/wiki/File:Kasauli_Hills_Snow.jpg | Pankykh | CC BY-SA 4.0 |
| Saint Peter (Paddington, contextual) | https://commons.wikimedia.org/wiki/File:Paddington_Post_Office.JPG | J Bar | CC BY 3.0 |

## Verificação de qualidade
- **Passou:** leitura dos cinco JSONs via API do GitHub e checagem de presença de apresentação, quatro parágrafos de história, três de cozinha, chef, ao menos quatro preparações, ao menos quatro reconhecimentos, URLs HTTPS de fontes e reservas, fotografia com `src`, `page`, `author`, `license` e `caption`.
- **Não executado:** `npm run check:profiles`, `npm run build` e conferência visual do deploy. O terminal de teste não conseguiu resolver `github.com`; o código foi editado por conexão direta ao GitHub.
- **Pendente:** confirmação de carregamento de todos os links de imagem em desktop/mobile e novas fotos do próprio El Chato, Ikoyi, Naar e Saint Peter com licença de republicação. Essas páginas **não** devem ser declaradas visualmente equivalentes ao melhor perfil até que a pendência seja resolvida.
- **Próximo lote:** restaurantes **51º–55º** (Uliassi, La Cime, Ling Long, Nelita e Alcalde).
