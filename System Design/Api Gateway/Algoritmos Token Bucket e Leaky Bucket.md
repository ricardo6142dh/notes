---
tags:
  - area/system-design
  - type/note
  - topic/api-gateway
  - topic/rate-limiting
type: note
aliases:
  - Token Bucket
  - Leaky Bucket
  - Rate Limiting
---

up:: [[API Gateway]]
related:: [[HTTP & REST]], [[Load Balancing (Balanceamento de Carga)]]

# Algoritmos Token Bucket e Leaky Bucket

Os algoritmos **Token Bucket** e **Leaky Bucket** são mecanismos fundamentais utilizados por **API Gateways** para implementar **Rate Limiting** (limitação de taxa) e **Throttling**, protegendo o backend contra sobrecargas.

### 1. Token Bucket (Balde de Tokens)

É um dos algoritmos mais populares para sistemas distribuídos devido à sua flexibilidade.

- **Funcionamento:** Imagine um balde com uma **capacidade máxima limitada**. Tokens são adicionados a esse balde de forma **fixa e constante** ao longo do tempo (ex: 10 tokens por segundo).
- **Processamento de Requisições:** Cada requisição que chega retira um token do balde. Se o balde estiver vazio, a requisição é negada.
- **Capacidade de Bursts:** Sua principal característica é permitir **picos curtos de tráfego (bursts)**. Por exemplo, se um balde tem capacidade para 200 tokens mas uma taxa de reposição de 100/segundo, o sistema pode aceitar 200 requisições de uma só vez usando o estoque acumulado, voltando depois ao ritmo de 100/segundo.
- **Consistência:** É frequentemente implementado com **Redis** para manter contadores centralizados, embora possua uma consistência "flexível", podendo ocasionalmente deixar passar alguns pedidos a mais do que o limite estrito.

### 2. Leaky Bucket (Balde Furado)

Diferente do anterior, o Leaky Bucket foca em manter uma **saída constante** de dados para o backend.

- **Funcionamento:** Independentemente da velocidade com que as requisições chegam (a "entrada"), elas são processadas e enviadas ao backend em uma **taxa de saída sempre mantida e rígida**.
- **Suavização de Tráfego:** Ele funciona como um estabilizador, garantindo uma cadência controlada e previsível. É ideal para sistemas que não suportam variações bruscas de carga.
- **Sem Bursts:** Ao contrário do Token Bucket, ele **não permite rajadas** de uso acima da taxa definida. Geralmente, o tamanho do balde é igual à sua taxa de reposição, impedindo qualquer flexibilização no limite.

### Resumo das Diferenças

|Característica|Token Bucket|Leaky Bucket|
|:--|:--|:--|
|**Picos (Bursts)**|Permite o acúmulo de tokens para lidar com picos.|Não permite picos; a saída é constante.|
|**Foco**|Limites seguros, mas flexíveis.|Suavização total e cadência rígida.|
|**Uso Ideal**|API Gateways de uso geral e planos comerciais.|Sistemas que precisam de fluxo de dados estável.|

Esses algoritmos garantem que os recursos do sistema operem dentro da capacidade disponível sem comprometer a qualidade do serviço.
