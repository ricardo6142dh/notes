---
tags:
  - course/system-design
  - topic/load-balancing
  - topic/networking
---

# Load Balancing (Balanceamento de Carga)

### 1. Load Balancing (Balanceamento de Carga)

O **Load Balancer** é um padrão arquitetural de rede utilizado para gerenciar o tráfego em ambientes com múltiplos servidores.

- **Objetivo Principal:** Distribuir as requisições de entrada entre vários hosts de maneira estratégica para otimizar o uso de recursos, reduzir a carga individual de cada servidor e garantir a disponibilidade do serviço, evitando que um único servidor se torne um **ponto único de falha**.
- **Resiliência:** Ele verifica constantemente a saúde (_health checks_) dos hosts para garantir que o tráfego não seja enviado a servidores com falha.

### 2. Proxy Reverso

O **Proxy Reverso** atua como um intermediário entre o cliente e um ou mais servidores internos.

- **Funcionamento:** Ele recebe a requisição do cliente, encaminha para o servidor apropriado e, após o processamento, devolve a resposta ao cliente original.
- **Funcionalidades Adicionais:** Além do roteamento, é frequentemente utilizado para gestão de pools de conexões, limites de upload, segurança, **cacheamento** e **offload de SSL/TLS** (removendo a carga de processamento de criptografia das aplicações).

### 3. Diferenças entre Load Balancer e Proxy Reverso

Embora ambos atuem entre clientes e servidores e possam ser viabilizados pelas mesmas tecnologias, seus usos ideais diferem:

- **Escala:** O Load Balancer é ideal para pools com **muitos hosts** e volumes extensos de requisições, sendo projetado para escalabilidade horizontal constante (adição e remoção de hosts).
- **Relação de Uso:** O Proxy Reverso pode ser aplicado em uma relação de **1:1** (ex: um Nginx na frente de uma aplicação Node.js) para gerenciar aspectos de segurança e performance que a aplicação não trata nativamente.
- **Convergência:** Soluções modernas de mercado frequentemente desempenham ambos os papéis simultaneamente.

### 4. Algoritmos de Balanceamento de Carga

A escolha do algoritmo define como a carga será distribuída entre os servidores disponíveis:

- **Round Robin:** Distribui as requisições de forma uniforme e cíclica. É simples e eficaz em ambientes onde os servidores têm capacidades similares, mas ignora a complexidade de cada request.
- **Least Connection:** Direciona a requisição para o servidor com o menor número de **conexões ativas** (sessões em andamento).
- **Least Outstanding Requests (LOR):** Um algoritmo mais sofisticado que foca na saturação, direcionando o tráfego para quem tem menos **requisições pendentes** (ainda em processamento), sendo ideal para tempos de resposta variáveis.
- **IP Hash:** Cria um hash do IP do cliente para garantir que ele seja sempre enviado para o mesmo servidor (persistência de sessão), desde que o host esteja disponível.
- **Random:** Seleciona um host aleatoriamente. É simples e tem baixa latência de decisão, mas pode gerar distribuição desigual.

### 5. Camadas de Atuação (Modelo OSI)

- **Layer 4 (Transporte):** Atua com protocolos TCP e UDP. Trabalha apenas com IPs e portas, sem interpretar o conteúdo da mensagem. É extremamente rápido e eficiente para alto throughput.
- **Layer 7 (Aplicação):** Atua com protocolos como HTTP, gRPC e WebSocket. Consegue ler headers, URLs e cookies para tomar decisões de roteamento inteligentes e aplicar cache ou compressão.

### 6. Tecnologias Comuns

As fontes destacam diversas tecnologias que implementam essas funções:

- **Nginx:** Servidor web e proxy reverso de alto desempenho e baixo consumo de recursos.
- **Envoy Proxy:** Focado em aplicações _Cloud Native_ e microserviços, sendo o "coração" de ferramentas como Kubernetes.
- **HAProxy:** Reconhecido pela robustez e algoritmos sofisticados em ambientes de alto tráfego.
- **Traefik:** Popular pela integração automática com containers e atualização dinâmica de rotas sem downtime.
- **Cloud Load Balancers:** Soluções específicas e escaláveis de provedores como AWS, GCP e Azure.
