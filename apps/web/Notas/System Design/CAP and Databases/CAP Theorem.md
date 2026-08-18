---
tags:
  - course/system-design
  - topic/cap
  - topic/distributed-systems
---

# Teorema CAP

## O que é o Teorema CAP?

O [[CAP Theorem|Teorema CAP]] afirma que em um sistema distribuído, só é possível garantir duas das três propriedades a seguir:

- [[Consistency|Consistência]]: Todos os nós veem os mesmos dados ao mesmo tempo. Quando uma escrita é feita em um nó, todas as leituras subsequentes em qualquer nó retornarão o valor atualizado.

- [[Availability|Disponibilidade]]: Toda requisição a um nó que não falhou recebe uma resposta — sem garantia de que ela contém a versão mais recente dos dados.

- [[Partition Tolerance|Tolerância a Partições]]: O sistema continua operando apesar de perda arbitrária de mensagens ou falha de parte do sistema (ou seja, partições de rede entre nós).

**Insight fundamental:** Em qualquer sistema distribuído, a tolerância a partições é obrigatória. Falhas de rede vão acontecer e o sistema precisa lidar com elas.

Isso significa que, na prática, o Teorema CAP se resume a uma única escolha: priorizar **consistência** ou **disponibilidade** quando uma partição de rede ocorre.

## Exemplo prático

Imagine um site com dois servidores — um nos EUA e um na Europa. Quando um usuário atualiza seu perfil público:

1. Usuário A conecta ao servidor mais próximo (EUA) e atualiza o nome
2. A atualização é replicada para o servidor na Europa
3. Quando Usuário B na Europa visualiza o perfil de A, vê o nome atualizado

Tudo funciona bem até ocorrer uma partição de rede — a conexão entre EUA e Europa cai. Agora surge uma decisão crítica:

Quando Usuário B tenta ver o perfil de A, o sistema deve:

- **Opção A:** Retornar erro porque não pode garantir que os dados estão atualizados → prioriza **Consistência**
- **Opção B:** Mostrar dados potencialmente desatualizados → prioriza **Disponibilidade**

## Quando escolher Consistência

Alguns sistemas exigem [[Consistency|consistência]] mesmo ao custo da disponibilidade:

1. **Reserva de ingressos:** Se Usuário A reservou o assento 6A em um voo, mas por partição de rede Usuário B vê o assento como disponível e também reserva, dois passageiros aparecem para o mesmo lugar.
2. **Estoque de e-commerce:** Se a Amazon tem uma unidade de um produto e o sistema a exibe como disponível para múltiplos usuários durante uma partição, ocorre venda além do estoque.
3. **Sistemas financeiros:** Plataformas de trading precisam mostrar o livro de ordens preciso e atualizado. Dados desatualizados podem gerar negociações a preços incorretos.

## Quando escolher Disponibilidade

A maioria dos sistemas tolera alguma inconsistência e deve priorizar [[Availability|disponibilidade]]. Nesses casos, consistência eventual é suficiente.

1. **Redes sociais:** Se Usuário A atualiza a foto de perfil, é perfeitamente aceitável que Usuário B veja a foto antiga por alguns minutos.
2. **Plataformas de conteúdo (como Netflix):** Se alguém atualiza a descrição de um filme, mostrar a descrição antiga temporariamente para alguns usuários não é catastrófico.
3. **Sites de avaliações (como Yelp):** Se um restaurante atualiza os horários, mostrar informações ligeiramente desatualizadas por um breve período é melhor do que não mostrar informação alguma.

**Pergunta-chave:** "Seria catastrófico se os usuários vissem dados inconsistentes por um breve momento?" Se a resposta for sim, escolha consistência. Se não, escolha disponibilidade.
