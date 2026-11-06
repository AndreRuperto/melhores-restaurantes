# Páginas de restaurante com história e fotos

**Data:** 6 nov. 2026 · **Status:** piloto (Asador Etxebarri, Tuju, Lasai)

## Objetivo

Cada página `/restaurante/:slug` deixa de mostrar só números e passa a contar a história da casa, como as páginas de cidade do Good Cities: de onde veio, quem cozinha, o que pedir, que prêmios ganhou. Com muitas fotos. O visual continua o da A Carta (papel creme, vinho, serifas de cardápio).

## Estrutura da página

1. **Capa com foto**: bandeira e cidade, nome, posição, frase de abertura e crédito da foto.
2. **Na lista**: os quatro números (mundo, continente, país, cidade) e as notas. Já existe.
3. **História, "De onde veio"** e **A cozinha, "O que se come"**, em duas colunas.
4. **O chef**: nome e uma bio curta.
5. **Pratos, "O que pedir"**: de 3 a 5 cards com foto.
6. **Prêmios, "Na parede"**: linha do tempo por ano.
7. **Galeria**: de 2 a 4 fotos da casa, da região e dos ingredientes.
8. **Na prática**: preço, reserva, endereço e site oficial.
9. **Onde fica** (mapa), **Vizinhos de posição** e **Mais por perto**. Já existem.
10. **Fontes**: links usados no texto.

Restaurante sem perfil continua com a página atual. Nada quebra enquanto os outros 97 não ficam prontos.

## Dados

- Um JSON por restaurante em `src/data/profiles/<slug>.json`.
- Os JSONs são carregados sob demanda com `import.meta.glob`, para o pacote inicial não crescer com o conteúdo dos 100.
- Os campos podem vir `null` quando o fato não foi confirmado. A seção some em vez de mostrar dado inventado.

## Fotos

- Só fotos com licença livre: Wikimedia Commons primeiro, Unsplash como alternativa.
- Cada foto leva autor, licença e link da página de origem, e o crédito aparece na legenda.
- Quando não existe foto do prato exato, entra uma foto ilustrativa do ingrediente ou do tipo de prato, marcada como "ilustrativa" na legenda.
- Toda foto é conferida a olho antes de entrar no site. No Good Cities, a busca automática trouxe fotos erradas.
- As imagens são carregadas direto do Commons ou do Unsplash, nos tamanhos de miniatura, com `loading="lazy"`.

## Perfil curto do 51º ao 100º

Decidido em 6 nov. 2026, depois do lote 1. Restaurantes menores têm menos fotos livres e menos cobertura de imprensa. Por isso, do 51º ao 100º o perfil é mais curto: lede, 1 ou 2 parágrafos de história, a cozinha em um parágrafo, uma bio curta do chef, 2 ou 3 pratos com foto opcional, prêmios, informações práticas e uma capa. A galeria pode ficar vazia. Os componentes já escondem as seções sem dado, então a página não muda de código, só de tamanho.

## Texto

- O texto é em pt-BR, num tom jornalístico simples e sem adjetivos de propaganda.
- Cada fato precisa ter fonte listada no JSON.
