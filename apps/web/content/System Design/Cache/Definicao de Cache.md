---
tags:
  - area/system-design
  - topic/cache
type: note
aliases:
  - Cache
  - Definição de Cache
---

related:: [[Arquiteturas de Cache (Cache Patterns)]], [[Métricas de Eficiência em Sistemas de Cache]], [[Políticas de Evicção e Substituição]]

# Definição de Cache

Cache, de forma simplificada, pode ser descrito como uma **técnica de otimização** que consiste em **criar uma camada intermediária de dados entre dois componentes**. Representa técnicas usadas para **armazenar temporariamente dados que são custosos ou demorados de serem recuperados de sua origem**, funcionando também como camadas temporárias de resiliência.

Normalmente, os dados armazenados em um cache **são o resultado de uma operação anterior ou cópias de dados armazenados em outro lugar**. Isso significa que o cache pode ser utilizado para evitar a sobrecarga de dependências e diminuir a consulta de dados que não mudam com grande frequência, aproximando esses dados do cliente ou armazenando os dados de um local mais custoso em outro mais acessível.
