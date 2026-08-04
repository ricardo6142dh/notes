---
tags:
  - course/system-design
  - topic/cache
  - topic/cache-patterns
type: note
aliases:
  - Cache Patterns
  - Arquiteturas de Cache
---

related:: [[Métricas de Eficiência em Sistemas de Cache]], [[Políticas de Evicção e Substituição]], [[HTTP & REST]]

# Arquiteturas de Cache (Cache Patterns)

As arquiteturas de cache definem os padrões de leitura e escrita entre a aplicação, a camada de cache e o banco de dados. A escolha do padrão impacta diretamente a **performance**, a **consistência** e a **complexidade** do sistema.

## 1. Cache-Aside (Lazy Loading)

Este é o padrão mais comum e deve ser a escolha padrão em entrevistas de System Design.

- **Como funciona:**
    1. A aplicação verifica primeiro o cache.
    2. Se os dados estiverem lá (**Cache Hit**), eles são retornados imediatamente.
    3. Se não estiverem (**Cache Miss**), a aplicação busca os dados no banco de dados, armazena-os no cache para uso futuro e os retorna ao usuário.
- **Tradeoffs:** Mantém o cache "enxuto" (apenas dados necessários), mas o primeiro acesso após um _miss_ é mais lento. Introduz complexidade na gestão da consistência, pois o cache pode ficar desatualizado se o banco for alterado sem uma invalidação correspondente.
- **Casos de Uso:** Uso geral em aplicações web e sistemas onde o cache é criado sob demanda.

## 2. Write-Through (Escrita Dupla)

Nesta estratégia, a aplicação escreve os dados primeiro no cache, e o cache escreve de forma **síncrona** no banco de dados antes de confirmar a operação.

- **Como funciona:** O dado é inserido ou modificado simultaneamente em ambas as camadas. A escrita só é considerada completa quando o cache e o banco são atualizados.
- **Tradeoffs:** Garante alta consistência (o cache é um reflexo fiel do banco), mas torna as **escritas mais lentas** devido à espera pela confirmação de dois sistemas. Pode "poluir" o cache com dados que nunca serão lidos.
- **Casos de Uso:** Cenários onde as leituras devem sempre retornar dados frescos e o sistema pode tolerar escritas levemente mais lentas.

## 3. Write-Behind (Write-Back / Lazy Writing)

Foca na performance extrema de escrita, minimizando a latência imediata sobre a fonte de dados persistente.

- **Como funciona:** A aplicação escreve apenas no cache. O cache agrupa essas escritas e as sincroniza com o banco de dados de forma **assíncrona** em segundo plano.
- **Tradeoffs:** Oferece escritas muito rápidas e reduz a carga no banco de dados. O grande risco é a **perda de dados** se o cache cair antes de realizar a sincronização (flush) para o disco.
- **Casos de Uso:** Oleodutos de métricas, sistemas de analytics e cenários com altíssimo volume de escrita onde a consistência eventual é aceitável.

## 4. Read-Through

Neste modelo, o cache atua como um "proxy inteligente" entre a aplicação e o banco.

- **Como funciona:** A aplicação nunca fala diretamente com o banco de dados. No caso de um _cache miss_, o próprio cache busca o dado na origem, armazena-o e o entrega à aplicação.
- **Tradeoffs:** Centraliza a lógica de busca no cache, mas exige infraestrutura especializada ou bibliotecas específicas.
- **Casos de Uso:** Implementações de **CDNs** funcionam essencialmente como um cache de _read-through_.

---

### 📊 Tabela Comparativa de Estratégias

|Característica|Cache-Aside|Write-Through|Write-Behind|Read-Through|
|:--|:--|:--|:--|:--|
|**Escrita**|No banco de dados|Cache + Banco (Síncrono)|Cache (Async para Banco)|Banco de dados|
|**Leitura**|App gerencia Miss/Hit|Sempre do Cache|Sempre do Cache|Cache gerencia Miss|
|**Vantagem**|Cache enxuto|Alta consistência|Alta performance de escrita|Lógica centralizada|
|**Risco**|Dados obsoletos|Escritas lentas|Perda de dados em falhas|Dependência do cache|

### 💡 Dicas de Invalidação e Evicção

- **TTL (Time To Live):** Essencial para prevenir dados obsoletos, definindo um tempo de vida para o item no cache.
- **LRU (Least Recently Used):** Política de evicção padrão que remove o item menos acessado recentemente quando o cache atinge sua capacidade máxima.
- **Cache Invalidation:** É a obrigação das operações de escrita deletar ou atualizar as chaves de cache correspondentes para evitar que o usuário leia dados incorretos (ex: um endereço mudado).
