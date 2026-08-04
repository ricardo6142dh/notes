---
tags:
  - topic/cache
  - topic/eviction
type: note
aliases:
  - Cache Eviction
  - Políticas de Evicção
---

related:: [[Métricas de Eficiência em Sistemas de Cache]], [[Arquiteturas de Cache (Cache Patterns)]]

# Políticas de Evicção e Substituição

A **Evicção** ou **Política de Substituição** refere-se às políticas e mecanismos que um sistema de cache usa para **decidir quais itens remover quando a capacidade de alocação de cache atinge seu máximo**. Imagine um mecanismo de cache que possua capacidade para alocar 1000 itens e que esteja totalmente utilizado. Esse mecanismo recebe a solicitação de salvar um item novo, porém não há espaço disponível. De acordo com a política estabelecida, a operação irá excluir o item mais antigo, menos acessado e removê-lo para dar espaço a esse novo item. As estratégias de evicção são utilizadas para garantir que os itens mais relevantes e frequentemente acessados sejam mantidos, deletando primeiro os itens que raramente são requisitados. As políticas de evicção incluem:

- **Least Recently Used** (`LRU`): Neste método, o item que não foi usado há mais tempo é removido primeiro. Baseia-se na suposição de que, se um item não foi usado recentemente, é menos provável que seja usado no futuro próximo.

- **Least Frequently Used** (`LFU`): Faz a evicção pelos itens que são menos frequentemente acessados. Este método remove os itens que foram usados com menos frequência. Pode ser mais eficiente que o LRU em alguns casos, mas é mais difícil de implementar, porque requer o rastreamento da frequência de uso de cada item.

- **First In, First Out** (`FIFO`): Elimina os itens na ordem em que foram adicionados. Este é um método simples, onde o primeiro item a entrar no cache é o primeiro a sair. Embora fácil de implementar, pode não ser o mais eficaz, pois não considera a frequência de uso dos itens.

- **Random Replacement** (`RR`): Neste método, um item aleatório é selecionado para ser removido. Embora seja simples de implementar, não leva em conta a frequência de uso dos itens.
