---
tags:
  - area/system-design
  - type/note
  - topic/communication
  - topic/synchronous-communication
  - topic/http
  - topic/rest
type: note
aliases:
  - REST
  - HTTP
  - RESTful APIs
---

up:: [[System Design]]
related:: [[RPC]], [[GRPC]], [[GraphQL]], [[Webhooks & Pooling]], [[API Gateway]], [[Definicao de Cache|Definição de Cache]]

# HTTP & REST

O **REST** (Representational State Transfer) não é um protocolo, mas um conjunto de **princípios arquitetônicos** criado por Roy Fielding em 2000. Ele utiliza as bases do **protocolo HTTP** para permitir que sistemas distribuídos se comuniquem de forma simples, escalável e intuitiva.

## 1. Recursos e Identificadores

No modelo REST, tudo é tratado como um **recurso** (dados, imagens, documentos ou coleções).

- **URI (Uniform Resource Identifier):** É a string que identifica um recurso de forma única e universal.
- **URL (Uniform Resource Locator):** É um subtipo de URI que, além de identificar o recurso, especifica o caminho para acessá-lo (como `https://api.exemplo.com/usuarios`).
- **Paths (Caminhos):** Organizam os recursos de forma hierárquica e lógica, como `/artigos/1/comentarios` para acessar comentários de um artigo específico.

## 2. Métodos HTTP e Idempotência

Os métodos (ou verbos) definem a ação semântica a ser realizada sobre o recurso. Um conceito chave aqui é a **idempotência**, que garante que múltiplas chamadas idênticas resultem no mesmo estado final, sem efeitos colaterais extras.

|Método|Ação|Idempotente?|
|:--|:--|:--|
|**GET**|Recupera a representação de um recurso.|**Sim**|
|**POST**|Cria um novo recurso.|**Não**|
|**PUT**|Atualiza ou substitui um recurso inteiro.|**Sim**|
|**PATCH**|Aplica atualizações parciais ao recurso.|Depende|
|**DELETE**|Remove um recurso.|**Sim**|

## 3. Componentes da Requisição

- **Headers (Cabeçalhos):** Transportam metadados, como o tipo de conteúdo (`Content-Type`), credenciais de segurança (`Authorization`) ou regras de cache (`Cache-Control`).
- **Query Strings:** Parâmetros adicionados após o `?` na URL para realizar **filtragem, paginação ou ordenação** de dados (ex: `/produtos?categoria=eletronicos`).
- **Status Codes:** Códigos numéricos enviados pelo servidor para indicar o resultado da operação (ex: **200 OK**, **201 Created**, **404 Not Found**, **500 Internal Error**).

## 4. Princípios Centrais do REST

Para que uma API seja considerada **RESTful**, ela deve seguir certas restrições:

- **Interface Uniforme:** Padronização na forma como os recursos são identificados e os dados são representados (geralmente JSON ou XML).
- **Stateless (Sem Estado):** O servidor não armazena sessões do cliente; cada requisição deve conter todas as informações necessárias para ser processada (ex: via tokens JWT).
- **Sistema em Camadas:** O cliente não precisa saber se está falando diretamente com o servidor ou com um intermediário (como um **API Gateway** ou **Proxy**).
- **Cacheabilidade:** As respostas devem ser explícitas sobre a possibilidade de serem armazenadas em cache para reduzir a latência e a carga no servidor.

## 5. Diferença: Over-fetching vs Under-fetching

Enquanto o REST expõe endpoints fixos, ele pode sofrer com:

- **Over-fetching:** O servidor envia mais dados do que o cliente realmente precisa.
- **Under-fetching:** O cliente precisa fazer várias chamadas a diferentes endpoints para compor as informações necessárias.
