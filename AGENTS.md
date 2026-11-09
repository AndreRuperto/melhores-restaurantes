# A Carta — agentes Design, Frontend e QA (Guia v2.1)

A Carta usa React/Vite, Tailwind CSS 4 e React Router. Preserve a identidade editorial (papel, vinho, serifas), ranking e fotos.

## Gate obrigatório antes de editar CSS

1. Inventariar TODOS os estilos de src/main.jsx, src/index.css, imports de componentes, Tailwind, folhas de terceiros, regras inline e tokens.
2. Verificar ordem real de carregamento no navegador, @layer, importância, especificidade, media/container queries e estados de menu/foco/tema.
3. Registrar valor computado e geometria do elemento afetado com URL, commit, viewport WxH, zoom, tema e estado.
4. Achar a declaração vencedora no DevTools Styles/Computed ou CDP. getComputedStyle mostra valor, não identifica origem/linha.
5. Propor a menor correção e testar os outros consumidores do componente. Não alterar expectativas de teste apenas para fazê-lo passar.
6. Se só houver código, sinalizar hipótese em vez de afirmar bug renderizado.

## Papéis

Designer: direção editorial, layout, contraste e critérios por viewport/tema/estado.
Frontend: corrigir a causa, preservar arquitetura, tokens, acessibilidade e dados.
QA: executar browser, revisar screenshots, testar menu longo, teclado, tema, overflow e foco.
Orquestrador: registrar handoffs, evidências, lacunas e decisão final.

Piloto atual: docs/qa-frontend/PILOTO-V21.md. A suíte Playwright é isolada em tests/frontend/ e não altera o app de produção.
