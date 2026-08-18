---
tags:
  - course/system-design
  - topic/cache
  - topic/metrics
---

# Métricas de Eficiência em Sistemas de Cache

Em sistemas que utilizam estratégias de cache para otimizar o acesso a dados, o monitoramento dos eventos de **Cache Hit**, **Cache Miss** e da métrica **Hit Rate** é fundamental para avaliar o desempenho e a efetividade da solução.

**Cache Hit**

Um **Cache Hit** (acerto no cache) ocorre quando uma solicitação de dados encontra o conteúdo desejado **já armazenado na camada de cache**.

- **Vantagem:** O sistema entrega o dado diretamente do cache, evitando o acesso à fonte original (como um banco de dados), que é significativamente mais lenta.
- **Significado:** Uma alta taxa de hits indica que o sistema está bem otimizado e reduzindo efetivamente a carga sobre as fontes de dados principais.

**Cache Miss**

Um **Cache Miss** (falha no cache) acontece quando o dado solicitado **não é encontrado no cache**.

- **Consequência:** O sistema é obrigado a buscar a informação na **fonte original**, o que gera maior latência e custo computacional.
- **Otimização:** Minimizar os misses envolve estratégias como prever padrões de acesso e ajustar políticas de evicção (como remover itens menos usados para dar espaço a novos).
- **Alerta:** Um volume constante de misses muito superior ao de hits pode indicar que a camada de cache está ineficiente e precisa ser ajustada ou até removida.

**Hit Rate (Taxa de Acertos)**

O **Hit Rate** é a métrica que define a eficácia do sistema de cache, expressando a relação entre acertos e o total de pedidos realizados.

- **Cálculo:** É calculado dividindo o número de **Cache Hits** pelo total de solicitações (Hits + Misses), multiplicado por 100 para obter a porcentagem.
- **Fórmula:** `Taxa de Acertos = (Cache Hits / (Cache Hits + Cache Misses)) × 100`.
- **Exemplo:** Se um sistema tem 800 hits e 200 misses, o total de solicitações é 1000, resultando em um **Hit Rate de 80%**.

**Resumo de Eficiência:** Quanto **maior o Hit Rate**, mais eficiente é o cache. Taxas baixas sugerem que os dados cacheados não são os que os usuários estão buscando ou que o tempo de vida (TTL) dos dados está curto demais
