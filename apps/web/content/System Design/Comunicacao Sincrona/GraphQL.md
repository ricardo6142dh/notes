---
tags:
  - topic/communication
  - topic/synchronous-communication
  - topic/graphql
type: note
aliases:
  - GraphQL
---

related:: [[HTTP & REST]], [[API Gateway]], [[WebSockets]]

# GraphQL

O **GraphQL** pode ser definido tanto como uma **linguagem de consulta** para APIs do lado do cliente quanto como um **runtime** para a execução dessas consultas no lado do servidor. Desenvolvido pelo Facebook, ele propõe uma abordagem distinta do modelo tradicional REST, permitindo que o cliente defina exatamente a estrutura dos dados que deseja receber.

Abaixo, detalho os principais conceitos e o funcionamento dessa tecnologia:

### Problemas Solucionados

O grande diferencial do GraphQL é resolver dois problemas comuns em APIs REST:

- **Over-fetching:** Ocorre quando o servidor envia mais dados do que o cliente realmente necessita.
- **Under-fetching:** Ocorre quando o cliente não recebe todos os dados necessários em uma única chamada, precisando consultar vários recursos diferentes para compor a informação. Ao oferecer um **único ponto de consulta**, o GraphQL reduz a necessidade de implementar múltiplos endpoints para diferentes demandas.

### Componentes Fundamentais

- **Schema (Esquema):** Definido através da linguagem **SDL** (_Schema Definition Language_), funciona como um **contrato** entre o cliente e o servidor. Ele limita e define quais dados podem ser consultados ou modificados e as relações entre as entidades.
- **Queries (Consultas):** São as requisições de leitura feitas pelo cliente. O cliente escolhe exatamente quais campos deseja recuperar, moldando o payload de resposta conforme sua necessidade.
- **Mutations (Mutações):** São utilizadas para **modificar dados** no servidor, incluindo operações de criação, atualização e deleção.
- **Resolvers (Resolutores):** São funções responsáveis por buscar os dados em suas fontes originais. Cada campo definido no schema é associado a um resolver, que é acionado quando o campo é solicitado.

### Integração e Arquitetura

O GraphQL não é um banco de dados, mas sim uma **interface flexível**. Ele pode recuperar dados de diversas fontes simultaneamente, como bancos de dados SQL, NoSQL, APIs REST ou serviços RPC.

Em termos de arquitetura de sistemas, ele pode ser utilizado em uma **convergência de protocolos**. Por exemplo, um domínio de software pode ser exposto externamente via GraphQL ou REST para facilitar o consumo, enquanto a comunicação interna entre microserviços utiliza protocolos mais leves e performáticos, como o **gRPC**.

Deseja que eu crie um **infográfico** comparando GraphQL e REST ou talvez um **quiz** para testar seus conhecimentos sobre esses padrões de comunicação? Apenas me confirme se tiver interesse.
