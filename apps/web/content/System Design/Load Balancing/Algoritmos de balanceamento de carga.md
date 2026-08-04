---
tags:
  - course/system-design
  - topic/load-balancing
---

# Algoritmos de Balanceamento de Carga

### 1. **Round Robin**

- **Funcionamento:** Distribui as requisições de forma **uniforme e cíclica** entre os servidores disponíveis. Cada nova solicitação é enviada ao próximo servidor da fila.
- **Vantagens:** Simplicidade e "justiça" na distribuição em ambientes onde os servidores possuem capacidades similares.
- **Limitações:** Não considera que diferentes requisições podem exigir níveis distintos de processamento, o que pode levar a ineficiências se um servidor receber apenas tarefas pesadas.

### 2. **Least Request**

- **Funcionamento:** Direciona a requisição para o servidor que processou o **menor número total de requisições** até aquele momento, utilizando um contador por host.
- **Uso Ideal:** Cenários com requisições uniformes e curtas, como microserviços de consulta rápida.
- **Limitações:** Assim como o Round Robin, ignora a saturação real do host e a duração/complexidade de cada tarefa.

### 3. **Least Connection**

- **Funcionamento:** Foca no estado atual dos servidores, enviando a requisição para aquele com o **menor número de conexões ativas** (sessões ou interações em andamento).
- **Vantagens:** Mais sofisticado por considerar a carga de trabalho atual em vez de apenas contar requisições passadas.
- **Limitações:** Não avalia a "intensidade" de cada conexão; um servidor com poucas conexões muito pesadas pode parecer menos ocupado do que realmente está.

### 4. **Least Outstanding Requests (LOR)**

- **Funcionamento:** Considera o número de **requisições pendentes** (iniciadas, mas não concluídas), independentemente de serem parte de uma conexão ativa contínua.
- **Vantagens:** É mais eficiente que o _Least Connection_ para identificar hosts com alta carga de processamento e tempos de resposta longos.
- **Limitações:** Exige monitoramento contínuo e detalhado do estado de cada servidor, aumentando a complexidade e o consumo de recursos do balanceador.

### 5. **IP Hash Balancing**

- **Funcionamento:** Cria um **hash consistente** a partir do endereço IP do cliente para determinar o host de destino.
- **Vantagens:** Garante a **persistência da sessão**, fazendo com que um cliente específico seja sempre atendido pelo mesmo servidor (enquanto este estiver disponível).
- **Limitações:** Menos eficaz se muitos usuários estiverem atrás de um mesmo NAT ou proxy, o que pode gerar uma distribuição desigual de carga.

### 6. **Maglev (Google)**

- **Funcionamento:** Técnica avançada que utiliza tabelas de **hash consistentes** para mapear clientes a servidores de forma determinística e equilibrada.
- **Uso Ideal:** Sistemas de computação distribuída complexos onde o cache de dados e a manutenção da sessão são prioridades.

### 7. **Random Load Balancing**

- **Funcionamento:** Seleciona um host do pool de forma **aleatória**.
- **Vantagens:** Implementação extremamente simples, sem necessidade de gerenciar estados ou monitorar servidores, resultando em baixa latência de decisão.
- **Limitações:** Pode resultar em distribuição desigual, especialmente com baixo volume de requisições.

---

### 💡 Camadas de Atuação (Modelo OSI)

As fontes também distinguem onde esses algoritmos operam:

- **Layer 4 (Transporte):** Atua com protocolos TCP/UDP. É mais rápido por lidar apenas com IPs e portas, sem interpretar o conteúdo da mensagem.
- **Layer 7 (Aplicação):** Atua com HTTP, gRPC e WebSockets. Permite decisões inteligentes baseadas em URLs, headers e cookies.
