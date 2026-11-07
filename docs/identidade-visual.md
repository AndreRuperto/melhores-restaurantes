# Identidade visual — A Carta

## Marca oficial

A marca usa o florão **❦**, antes presente apenas nos separadores da página.
A versão vetorial está em `public/brand-mark.svg`: um traçado real (`<path>`),
sem dependência de fonte instalada no navegador.

O contorno foi vetorizado a partir do glifo U+2766 do **Noto Sans Symbols 2**,
fonte distribuída sob a SIL Open Font License. É um ornamento tipográfico
tradicional, portanto a forma isolada **não é exclusiva da marca**.

## Cores

| Uso | Tema claro | Tema escuro |
| --- | --- | --- |
| Papel | `#f4efe6` | `#15110e` |
| Vinho / florão | `#7a1f2b` | `#d0707f` |

Na animação do cardápio, a marca usa o dourado `#e8d1a7`.

## Onde usar

- Navegação, separadores e rodapé: componente `BrandMark`, com a mesma cor `text-wine` que o resto da identidade.
- Abertura 3D: `MenuOpening`, usando o mesmo SVG via máscara CSS.
- Favicon: `public/favicon.svg`, com variantes para navegador claro e escuro.

A máscara CSS é importante: permite reutilizar um único desenho e fazer o
símbolo acompanhar a troca de tema do site, sem duplicar os caminhos SVG em
cada componente.

## Manutenção

Nunca substituir `❦` por outro glifo no código visual: usar `BrandMark`
para garantir a mesma silhueta em todos os navegadores. O nome `A Carta`
continua sendo a parte textual da marca.

Fonte tipográfica do ornamento: [Noto Sans Symbols 2](https://github.com/notofonts/symbols)
(SIL OFL 1.1).
