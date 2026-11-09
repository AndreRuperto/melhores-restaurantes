# A Carta — encerramento da fase 1

**Data:** 9 de novembro de 2026  
**Escopo:** enriquecimento editorial dos perfis individuais dos **100 restaurantes** da classificação de 2026  
**Branch de entrega:** `main`  
**Estado:** **concluído editorialmente, com pendências de homologação técnica e cobertura fotográfica**.

## O que foi entregue

1. As fichas editoriais foram percorridas em lotes sucessivos, até a última faixa de posições **96–100**.
2. O repositório contém **100 arquivos JSON** em `src/data/profiles/`, verificados por listagem da API do GitHub.
3. Os cinco últimos perfis — Rosetta, Khufu's, Labyrinth, Fauna e Aponiente — foram ampliados com história em quatro parágrafos, cozinha em três, biografia do chef, de cinco a sete preparações, prêmios e informações práticas. **Esses cinco passaram em checagem estrutural dos JSONs após os commits**.
4. Cada perfil final tem fontes de pesquisa e orientação de reservas. Links de sites e plataformas foram incluídos apenas quando identificados; nenhum horário disponível foi presumido como confirmação em tempo real.
5. O último lote contém fotos reais e licenciadas das fachadas de **Rosetta (2024)** e **Aponiente (2022)**. Para **Khufu's, Labyrinth e Fauna**, mantiveram-se referências externas em vez de copiar imagens protegidas.
6. A documentação por lote registra pesquisa, créditos, dúvidas e pendências. Último lote: [perfis 96–100](lotes/perfis-96-a-100.md).

## O que concluído significa

Este marco **não** equivale a afirmar que os 100 restaurantes têm fotografias atuais das fachadas, galerias completas, cardápios idênticos aos do dia da visita ou preços definitivamente atualizados.

A fase 1 entregou o **enriquecimento editorial** dos perfis. Algumas fotos publicadas mostram o contexto da cidade, o edifício histórico ou pratos servidos em outro ano. Essas imagens devem continuar identificadas como tal, sem ser confundidas com o restaurante atual. As imagens de terceiros cuja licença de republicação não foi verificada permaneceram apenas como referências externas.

A lista principal e os arquivos individuais usam posições próprias da classificação de 2026; a posição não substitui a análise de atualidade dos prêmios de cada restaurante.

## Conferências realizadas

- **100 arquivos `.json`** encontrados no diretório de perfis na `main`.
- Leitura e parsing dos **cinco JSONs finais** após atualização. Conferência de posições, slugs, campos editoriais, endereço, reservas, URLs e metadados de imagens sem lacunas estruturais.
- Fontes externas atuais verificadas em novembro de 2026 para o lote 96–100: páginas oficiais de menu e reserva, Guia Michelin e rankings 50 Best.
- Tentativa de fazer uma **varredura programática dos 100 JSONs em uma chamada**; a execução excedeu o limite de chamadas do conector. **Não foi concluída a validação integral de todos os 100 campos nesta sessão**.
- O terminal não conseguiu clonar o repositório devido a falha de resolução de `github.com`. Portanto **`npm run check:profiles` e `npm run build` não foram executados localmente**.
- O último status conhecido do Railway para os commits finais era **pending**; não foi verificado um deploy bem-sucedido nem a aparência final de todas as páginas no ambiente público.

## Checklist de homologação antes de chamar o produto de totalmente concluído

- [ ] Executar `npm ci`, `npm run check:profiles` e `npm run build` no ambiente com acesso ao repositório.
- [ ] Conferir conclusão do deploy Railway e abertura pública de todas as 100 URLs.
- [ ] Fazer auditoria de foto por perfil: **fachada real atual, interior, chef, pratos, autoria, licença, link de fonte e legenda**. Quando não houver licença, manter apenas link de referência, sem representação enganosa.
- [ ] Testar carregamento de imagens, responsividade mobile, conteúdo longo e estilos de dropdowns e filtros por país.
- [ ] Validar fonte e link direto de reservas dos perfis, principalmente os que só permitem reserva telefônica ou têm canais externos específicos.
- [ ] Rever preços e cardápios que mudam rapidamente, preservando a data da fonte e impedindo alegações de disponibilidade em tempo real.
- [ ] Executar verificação estrutural em lote de todo o conjunto de 100 perfis, com relatório automático de campos ausentes e links inválidos.
- [ ] Testar acessibilidade: foco por teclado, contraste, leitura de imagens e estrutura de títulos.

## Critério de aceite da fase 1

**Aceito para a etapa editorial:** 100 perfis existentes, enriquecimento realizado em lotes documentados e últimos cinco perfis validados estruturalmente.

**Ainda não aceito como homologação visual/técnica integral:** fotos completas com autorização, compilação da aplicação e deploy público verificado. Esses pontos são responsabilidades da fase 2, não pré-requisitos para afirmar que a **primeira rodada editorial** chegou a 100/100.

## Próxima fase recomendada

**Fase 2 — imagens reais, qualidade da informação e homologação do site.** Priorizar as páginas sem foto do restaurante, eliminar imagens contextuais que possam confundir o usuário, checar as reservas e concluir os testes automáticos e visuais. Manter commits diretamente na `main`, conforme fluxo escolhido para o projeto.
