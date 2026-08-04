---
tags:
  - course/system-design
  - topic/cap
  - topic/distributed-systems
---

# Combinações CAP

## CP (Consistência e Tolerância a Partições)

Essa escolha prioriza [[Consistency|Consistência]] e [[Partition Tolerance|Tolerância a Partições]].

O sistema mantém consistência entre todos os nós que continuam funcionando durante uma falha. Quando ocorre uma partição entre dois ou mais nós, o sistema deve ser capaz de remover os nós inconsistentes, tornando-os indisponíveis.

**Exemplos de uso:** Sistemas financeiros, cálculos de crédito, reserva de ingressos, bolsa de valores.

### Exemplos de bancos de dados

- [MongoDB](https://www.mongodb.com/)
- [Cassandra (dependendo da configuração)](https://cassandra.apache.org/)
- [Couchbase](https://www.couchbase.com/)
- [Etcd](https://etcd.io/)
- [Consul](https://www.consul.io/)

## AP (Disponibilidade e Tolerância a Partições)

Nessa configuração, o sistema prioriza alta [[Availability|disponibilidade]] e tolerância a partições, sacrificando a consistência.

Quando uma partição de rede ocorre, todos os nós permanecem disponíveis para consultas, independente do estado de atualização. Mesmo durante processos de ressincronização, todos os nós continuam respondendo — potencialmente com dados atualizados ou desatualizados.

### Exemplos de bancos de dados

- [CouchDB](https://couchdb.apache.org/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [Cassandra (dependendo da configuração)](https://cassandra.apache.org/)
- [SimpleDB](https://aws.amazon.com/simpledb/)

## CA (Consistência e Disponibilidade)

Nessa configuração, o sistema prioriza consistência e disponibilidade das requisições, mas se torna sensível a partições de rede. Ou seja, se uma falha ou partição de rede ocorrer, o sistema pode se tornar completamente inoperante.

Na prática, CA não é viável em sistemas verdadeiramente distribuídos — partições de rede são inevitáveis.

### Exemplos de bancos de dados

- [MySQL/MariaDB](https://www.mysql.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Oracle](https://www.oracle.com/database/)
- [SQL Server](https://www.microsoft.com/sql-server/)
- [Redis Standalone](https://redis.io/)
- [Memcached Standalone](https://memcached.org/)
