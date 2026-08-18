---
tags:
  - course/system-design
  - topic/api-gateway
  - topic/communication
---

# API Gateway

Um [[API Gateway]] é uma **camada de abstração** posicionada entre os clientes e os serviços internos de uma arquitetura, funcionando como um ponto de entrada único e centralizador para comunicações síncronas. Ele recebe todas as chamadas de API, encaminha-as para os serviços apropriados com base em regras predefinidas (como caminhos e métodos) e retorna a resposta ao cliente, fazendo com que diversos microserviços pareçam um sistema único para o usuário final.

### O Problema que Resolve

Em arquiteturas de microserviços, a exposição direta de múltiplos serviços é complexa porque exige que o cliente conheça todos os endpoints, URLs e documentações específicas. O API Gateway simplifica isso ao **encapsular a complexidade do backend**, permitindo que os times internos alterem ou substituam serviços sem impactar as integrações dos clientes.

### Principais Componentes e Funcionalidades

Os API Gateways centralizam funções comuns que, de outra forma, precisariam ser implementadas individualmente em cada microserviço:

- **Roteamento de Requisições:** Direciona o tráfego com base em prefixos de caminho (_path-prefix_) ou regras de cabeçalho.
- **Autenticação e Autorização:** Verifica a identidade do usuário e suas permissões de acesso de forma centralizada.
- **Gestão de Tráfego (Rate Limiting e Throttling):** Utiliza algoritmos como o **Token Bucket** (que permite picos curtos de tráfego) ou o **Leaky Bucket** (que mantém uma saída constante e rígida) para proteger o backend de sobrecargas.
- **Gerenciamento de Cache:** Armazena respostas frequentes para reduzir a latência e a carga nos serviços de origem.
- **Versionamento de APIs:** Facilita a coexistência de múltiplas versões de uma API e permite estratégias de lançamento gradual, como o _canary deployment_.

### API Gateway vs. Load Balancer

Embora ambos intermediem requisições, o **Load Balancer** foca em distribuir o tráfego entre várias réplicas da **mesma aplicação** (atuando frequentemente nas Camadas 4 ou 7 do modelo OSI). Já o **API Gateway** foca em criar uma abstração para **diversos endpoints e serviços diferentes**, resolvendo problemas de governança e organização específicos de APIs REST. Na prática, é comum que ambos trabalhem juntos, com o Gateway utilizando Load Balancers como seus backends.

Exemplos de tecnologias que podem atuar ou sustentar API Gateways incluem o **Envoy Proxy**, **Nginx**, **HAProxy** e **Traefik**.
