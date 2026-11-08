# Situação editorial dos 100 perfis (novembro de 2026)

## O que esta atualização entrega
- Os 100 restaurantes têm seus próprios arquivos em `src/data/profiles/<slug>.json`.
- A página `/restaurante/:slug` continua usando os componentes editoriais existentes.
- Os perfis 28–50 passaram por uma segunda rodada de pesquisa, baseada nas **páginas individuais oficiais de 2026**.
- Os perfis 51–100 foram ampliados com base na **publicação oficial da lista estendida de 2026** e, quando foi possível confirmar, nos sites oficiais e no Guia Michelin.
- Fotografias reais são usadas somente quando a página do Wikimedia Commons identifica a foto, o autor e a licença. O próprio perfil mostra o crédito.
- Nenhum valor de reserva ou preço foi adivinhado; quando publicado, o dado informa a origem e deve ser reconfirmado antes de uma visita.

## Limitação editorial importante
**Cobertura não é sinônimo de profundidade uniforme.** O perfil do Asador Etxebarri
continua sendo uma referência mais detalhada, com fotos de pratos e longa cronologia.
Os novos perfis contêm história, cozinha e fontes, mas vários ainda não possuem
fotografia licenciada, pratos com fotos, biografia extensa, preços, reservas ou um
histórico de prêmios comparável ao do 1º colocado. Nesses casos, o bloco fica oculto
em vez de publicar informação não verificada.

## Fontes principais
- Ranking 1–50 e perfis individuais:
  https://www.the50.com/restaurants/best-in-the-world/list/1-50
- Lista estendida 51–100:
  https://www.the50.com/stories/News/the-50-best-restaurants-2026-51-100-extended-list-revealed.html
- Nas páginas: veja a seção **Fontes** de cada restaurante.

## Verificação local
```bash
npm run check:profiles
npm run build
```

A checagem valida estrutura, presença de arquivos, imagens com autoria/crédito
e fontes sintaticamente válidas. Ela não garante que links externos continuem ativos,
nem substitui revisão factual e visual em navegador.
