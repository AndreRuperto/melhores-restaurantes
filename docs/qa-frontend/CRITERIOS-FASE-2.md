# Critérios de aceite — QA transversal da Fase 2

Base: main clonada em 10/11/2026. Avaliação do candidato local; publicação será tratada separadamente.

1. Home, lista, como funciona, 404 e cinco perfis representativos devem renderizar sem overflow nem conteúdo essencial cortado: 320x568, 360x640, 390x844, 430x932, 768x1024, 1024x768, 1440x900 e 640x400 (equivalência de zoom 200%), nos temas claro e escuro; movimento reduzido alternado. Total: 144 combinações.
2. País e continente: menu contido na viewport, navegação por setas, seleção, Escape e retorno de foco; consumidores home e lista. Busca sem acento, limpar, vazio, faixas e URL devem corresponder aos dados.
3. Axe WCAG 2.2 AA nas nove rotas de amostra, dois temas; teclado independente. Leitor de tela e dispositivo físico ficam explicitamente pendentes se indisponíveis.
4. Cem perfis em acesso direto e recarga devem mostrar o nome esperado, texto do próprio perfil e metadados próprios; imagem ausente ou falhando não deve impedir leitura.
5. HTML inicial deve conter título, descrição, canonical e metadados sociais próprios; sitemap apenas com URLs válidas e canônicas. Slug desconhecido sem indexação.
6. Performance: três Lighthouse mobile por rota de amostra, mediana e pior valor, LCP/CLS/TBT registrados. Meta 90 nas quatro categorias; nenhum dado de campo será inferido.
7. CI/build/validador com logs, QA independente, matriz e evidências versionadas. Publicação só será declarada após confirmação do SHA e smoke público.
