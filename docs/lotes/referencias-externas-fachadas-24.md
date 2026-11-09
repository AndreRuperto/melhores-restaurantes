# Referências externas das fachadas e dos ambientes — posições 1–40

Data: 8 de novembro de 2026

## Situação

- **16/40** perfis têm fotografia de fachada, entrada ou edifício real publicada diretamente com créditos/licença no site A Carta (lote anterior).
- **24/40** perfis restantes ganharam `photoReference`, link para a fotografia ou galeria na **fonte original**, com identificação do que é mostrado. Não há upload, cópia, hotlink, embed ou republicação dessas imagens pelo A Carta.
- Destes 24, **12** fontes foram classificadas como imagens de fachada ou entrada; as demais **12** como imagens dos ambientes ou da arquitetura — não como fachada confirmada.
- O componente `Facade` apresenta esses links em uma caixa editorial, respeitando o estilo das páginas individuais. Nos casos com foto licenciada, segue mostrando a foto de fachada como antes.

## Continuação do lote: fotos em destaque e créditos no rodapé (08/11/2026)

- A seção **Créditos fotográficos** agora aparece no fim de cada página individual e reúne fonte, autoria e licença das fotos de capa, galeria, fachada e pratos, além do site responsável por referência externa.
- **Gaggan (2º):** a foto já licenciada da fachada de 2015 foi destacada na seção **A primeira sede**, com aviso de que não é a casa atual.
- **Kadeau (8º):** a foto já licenciada da unidade de Bornholm ganhou destaque, com aviso de que a posição do ranking corresponde a Copenhague.
- **Meet the Bund (21º):** a foto licenciada do edifício da Fundação Fosun foi destacada, sem tratá-la como entrada comprovada do restaurante.
- Essas três imagens foram **realocadas da galeria**, sem duplicá-las nem criar novas licenças. Portanto, **não alteram a contagem de 16/40 fachadas/edifícios previamente cadastrados**.
- O validador passou a incluir o campo `facade`, a checar URL e editor das referências externas, e a exigir atribuição e explicação quando uma foto licenciada da galeria é destacada.
- **Ainda faltam** fotos externas atuais e reutilizáveis nos 24 perfis anteriores. Mencionar a fonte abaixo da página não concede automaticamente licença de cópia ou incorporação.
- Não houve execução local de `npm run check:profiles` ou `npm run build` nesta sessão por indisponibilidade de acesso ao repositório pela rede do ambiente de testes. Os commits foram feitos diretamente na `main`; verificar o build do deploy no Railway.

## Novo lote de 5 perfis — fotografias editoriais em destaque (08/11/2026)

A aplicação do mesmo componente de destaque já utilizado em Gaggan, Kadeau e Meet the Bund foi estendida às páginas abaixo. Em todos os casos a imagem já constava da galeria com autor, URL de origem e licença registrada no JSON. Ela agora aparece na seção **O lugar**, sem duplicação na galeria, e seus créditos continuam acessíveis no rodapé.

| Posição | Perfil | Foto exibida no próprio A Carta | Restrição de identificação |
|---:|---|---|---|
| 7 | Kjolle | Pía León, Virgilio Martínez e Malena Martínez — Mater Iniciativa | Retrata pessoas ligadas ao restaurante, **não** sua fachada |
| 12 | Sorn | Vagens de sato no mercado de Phuket | Fotografia da culinária regional, **não** a sede do restaurante |
| 13 | Mérito | Fachadas do bairro Barranco, em Lima | Fotografia da região, **não** da fachada do Mérito |
| 14 | Sühring | Passarela de Chong Nonsi, Bangcoc | Fotografia do entorno, **não** da vila do Sühring |
| 16 | Tuju | Jardim Paulistano, São Paulo, em 2010 | Fotografia antiga do bairro, **não** a fachada atual do Tuju |

**Resultado:** cinco perfis têm uma fotografia licenciada e creditada em destaque. A contagem de fachadas de estabelecimentos **permanece 16/40**: este lote **não** acrescentou fotografia verificada das fachadas que faltam.

**Fontes de fachada pendentes:** RF Studio (Kjolle), Nation Thailand/The Star (Sorn), ArchDaily (Mérito — arquitetura), site oficial do Sühring e Folha de S.Paulo (Tuju). Os links continuam disponíveis nas páginas individuais. A atribuição no rodapé não autoriza copiar imagens dessas fontes sem licença.

## Lote seguinte de cinco — Mingles, Nusara, Piazza Duomo, Vyn, Al Gatto Verde (08/11/2026)

A seção editorial **O lugar** dos cinco perfis foi ajustada para exibir uma foto pré-existente com licença (ou, em Piazza Duomo, uma nova fotografia CC BY-SA 4.0 do centro de Alba). Os títulos foram particularizados para evitar apresentar ingredientes, pessoas ou o entorno como fachada do restaurante. Cada fotografia destacada é retirada da galeria para não duplicar a mesma imagem.

| Posição | Restaurante | Foto reproduzida com licença no A Carta | Registro direto do estabelecimento (link, não cópia) |
|---:|---|---|---|
| 17 | Mingles | Jangdok tradicionais (fermentação coreana, não o restaurante) | Michelin e fotos de pratos no site do Mingles |
| 18 | Nusara | Sobrados de Tha Tien (bairro, não a fachada) | Fotografia da sede do Nusara em ROOM / Baan Lae Suan |
| 20 | Piazza Duomo | Praça central de Alba, imagem CC BY-SA 4.0 de Zairon (não a entrada) | Foto da entrada em TerroirSense e do salão no site oficial |
| 23 | Vyn | Daniel Berlin Krog (sede **anterior** do chef, não o Vyn atual) | Arquitetura do Vyn atual em FOJAB e Njord Design |
| 24 | Al Gatto Verde | Retrato de Massimo Bottura (2015, não o restaurante) | Pátio e ambiente reais no site oficial Al Gatto Verde |

**Direitos:** as fotos de restaurantes hospedadas pelas fontes externas não foram copiadas nem incorporadas: a presença de crédito no rodapé não basta para republicá-las. As fotos reproduzidas são registros licenciados com autoria e fonte documentadas. O novo campo `photoReference.additionalSources` lista fontes específicas de imagens do local, exibidas na seção editorial e no rodapé.

**Contagem:** cinco perfis adicionais têm destaques editoriais; a quantidade de **16/40** com fachadas/edifícios efetivamente cadastrados não mudou. A prioridade nos próximos lotes continua sendo encontrar **fotografias do restaurante com direito de reutilização comprovado**. O deploy ainda precisa passar na validação visual e no build.

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
