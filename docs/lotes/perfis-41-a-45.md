# A Carta — Lote de perfis 41–45

**Atualizado:** 8 de novembro de 2026. **Branch:** main.

## Objetivo
Ampliar os cinco perfis individuais anteriormente resumidos para padrão editorial: história, cozinha, chef, repertório de pratos, premiações datadas, endereço, site, orientação para reservas e fotografias com autoria e licença quando autorizadas. Cada perfil é um JSON em `src/data/profiles/`. Referências originais estão em `sources`.

## Resumo por restaurante

| Posição | Perfil | Histórico | Pratos descritos | Premiações | Reservas | Fotografia efetivamente exibida |
|---:|---|---|---:|---:|---|---|
| 41 | Onjium | Instituto cultural, abertura de 2018, equipe de pesquisa, 2026 | 3 | 4 | Telefone Michelin +82 2-6952-0024, sem link direto confirmado | Gwanghwamun (entorno, CC BY-SA 4.0); tangpyeongchae e galbi-jjim tradicionais (ilustrativos, CC) |
| 42 | Bozar | Arquitetura de Victor Horta, Karen Torosyan, trabalho de massas | 5 | 4 | https://bozarrestaurant.be/en/reservation | Foto licenciada da entrada/área do restaurante no edifício BOZAR (Fred Romero, CC BY 2.0); pâté en croûte ilustrativo |
| 43 | Le Calandre | Fundação 1981, passagem para irmãos 1994, estrelas 1992/1997/2002 | 4 | 5 | https://alajmo.it/en/pages/booking-le-calandre | Retrato histórico real de Massimiliano Alajmo (Mario Reggiani, CC BY-SA 3.0) |
| 44 | Don Julio | Fundação 1999, Pablo Rivero e Guido Tassi, cadeia de produção | 5 | 7 | https://donjulio.meitre.com/ (link exposto pelo site oficial) | Duas fotos reais do restaurante (Roberto Fiadone, CC BY 4.0), já cadastradas antes |
| 45 | Mayta | Fundação 2008, reformulação 2018, Yachay, evolução de ranking | 5 | 8 | https://mayta.mesa247.pe/ (link exposto pelo site oficial) | Miraflores em 2023 (contextual, Mojnsen, CC BY-SA 4.0) |

## Correções factuais importantes
- Le Calandre foi fundado em **1981** por Rita Chimetto e Erminio Alajmo; **1994** é o ano em que Max assumiu a cozinha, e não a fundação. A terceira estrela foi anunciada em novembro de 2002 para o guia seguinte.
- Don Julio usa **Guatemala 4699** no site oficial e no Michelin; fontes antigas registram 4691. O site oficial liga à plataforma **Meitre**.
- A página do Bozar identifica os menus e preços publicados em novembro de 2026: menu de 7 etapas por €275, de 5 etapas por €195 e almoço de 3 etapas por €115; checar mudanças antes da visita.
- O Mayta informa **S/998** para sua experiência de dez etapas no site oficial. O enlace de reservas é da Mesa 24/7.
- Onjium não teve a disponibilidade e o preço corrente confirmados em fonte oficial aberta. O contato telefônico do Michelin é a informação prática mais confiável consultada.

## Créditos e restrições
Fotos de guias, imprensa, sites institucionais e galerias oficiais do restaurante não foram copiadas quando os direitos de republicação não estavam demonstrados. No caso dos perfis 41, 43 e 45, **não** se deve apresentar a imagem principal como fachada da casa: ela mostra respectivamente um marco geográfico, o chef e o bairro. O Bozar tem imagem de uma área real do complexo que abriga o restaurante, e o Don Julio tem exterior próprio.

Os campos `photoReference` registram links externos com fotografias reais mesmo quando elas não podem ser incorporadas, e a página apresenta créditos das fotos publicadas no rodapé.

## Fontes principais
- Ranking mundial: https://www.the50.com/restaurants/best-in-the-world/list/1-50
- Onjium: https://www.the50.com/restaurants/best-in-asia/the-list/onjium.html ; https://guide.michelin.com/us/en/seoul-capital-area/kr-seoul/restaurant/onjium
- Bozar: https://bozarrestaurant.be/en/menu ; https://bozarrestaurant.be/en/reservation ; https://www.bozar.be/en/bozar-restaurant
- Le Calandre: https://alajmo.it/en/pages/the-story ; https://alajmo.it/en/pages/homepage-le-calandre ; https://alajmo.it/en/pages/booking-le-calandre
- Don Julio: https://www.parrilladonjulio.com/ ; https://www.the50.com/restaurants/best-in-the-world/the-list/don.html ; https://www.argentina.travel/pt/novidades/don-julio-o-corte-de-carne-que-voce-nao-pode-deixar-de-experimentar
- Mayta: https://maytalima.com.pe/en/carta/ ; https://maytalima.com.pe/en/chef/ ; https://mayta.mesa247.pe/

## Validação e pendências
1. Revisão de consistência JSON e presença das seções feita por leitura direta da main.
2. Execução completa de `npm run check:profiles` e `npm run build` **não realizada** nesta sessão: o ambiente local não conseguiu resolver o host do GitHub para clonar o projeto.
3. Conferir visualmente os cinco perfis no desktop e celular após deploy e validar carregamento de cada arquivo do Wikimedia Commons.
4. Buscar, quando possível, fotografias do próprio Onjium, Le Calandre e Mayta em fonte que autorize reprodução; fotos atuais das casas ainda são externas, não copiadas.
5. Próximo lote editorial: posições 46–50.
