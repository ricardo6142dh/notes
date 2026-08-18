

---

## 🎯 Highlights & Principais Aprendizados

* **Zero Network Hops Internos:** Mover a decisão de roteamento para dentro do processo da aplicação reduz a latência $p99$ e elimina o risco de *Shared Fate* com proxies compartilhados.
* **Consistent Hashing em Memória:** Garantir **100% de paridade de hash** com a borda preserva a eficiência do cache local e evita estouro no banco de dados (*Cache Stampede* no DynamoDB).
* **Service Discovery via Streaming:** Usar `Informers` (Watch API do K8s) em vez de *Polling* evita ataques acidentais de negação de serviço (DoS) contra o Control Plane do Kubernetes.
* **Gradual Warm-up (N-Ring Fade-In):** Usar curvas exponenciais ($t^{2.5}$) para fazer o *fade-in* de novos pods permite aquecer o cache apenas com os dados que eles realmente manterão.
* **Sinal de Carga Baseado na Lei de Little:** Medir **Ocupação** ($\text{Vazão} \times \text{Latência}$) em vez de puramente *Throughput* (req/s) evita falsos diagnósticos de sobrecarga em rotas de alto *Cache Hit*.
* **Bandeira de Segurança no Anel (Capping the Walk):** Garantir complexidade $O(1)$ na busca de pods limita o tempo gasto caminhando no anel e evita contágio de cache entre nós distantes.
* **Cultura de CD Libera Inovação:** Reduzir o tempo de deploy de dias para minutos é pré-requisito técnico para validar experimentos complexos de infraestrutura com segurança.

---

## 🛠️ Problemas Resolvidos & Soluções de System Design

### 1. Shared Fate & Fan-Out Amplificado no Ingress
* **Problema:** O serviço de lote desfaz 1 requisição em até **100 chamadas paralelas**. Antes, todas as 100 chamadas passavam pelo proxy central (Skipper). Uma pequena oscilação no proxy multiplicava o atraso da requisição por 100 (*Tail Latency* sensível ao elo mais lento).
* **Solução:** Implementação de um **Client-Side Load Balancer (CSLB)** direto no código Java. O cliente calcula o pod de destino e faz a chamada HTTP **direta via IP**, pulando o proxy intermediário.

### 2. Preservação do Cache Local & Paridade de Hash
* **Problema:** Se o cliente escolhesse um pod diferente do que o proxy escolheria, o tráfego seria dividido, destruindo o cache local (RAM) dos pods e duplicando leituras no DynamoDB.
* **Solução:** A biblioteca cliente implementou rigorosamente o mesmo algoritmo do Skipper (`xxHash64` com 100 *virtual nodes* por pod), garantindo **paridade perfeita de roteamento**.

### 3. Proteção do Control Plane do Kubernetes
* **Problema:** Centenas de pods consultando a API do K8s via *polling* a cada segundo poderiam derrubar o servidor da API em eventos de pico.
* **Solução:** Padrão **Informer (List + Watch streaming)** com um **debounce de 2 segundos** para coalescer eventos de autoscaling, combinado com retenção de mapa estático em memória caso a API do K8s fique temporariamente indisponível.

### 4. Cold-Start de Cache em Scale-Ups (N-Ring Fade-In)
* **Problema:** Quando o HPA adicionava novos pods, eles recebiam tráfego total com cache frio, gerando picos de latência e chamadas em massa ao banco.
* **Solução:** **N-Ring Fade-In**. Cada evento de escala cria um novo anel em memória. O tráfego migra do anel antigo para o novo em uma rampa gradual de 30 segundos usando a curva $t^{2.5}$ (0.3% nos primeiros 3s até 100% no segundo 30).

### 5. Medição de Carga Incorreta (Lei de Little & Bounded Load)
* **Problema:** Usar *Throughput* (req/s) puro fazia o algoritmo de *Bounded Load* achar que pods com $1.000\text{ req/s}$ (com $99\%$ de cache hit a $1\text{ ms}$) estavam lotados, redirecionando tráfego sem necessidade.
* **Solução:** Aplicação da **Lei de Little ($L = \lambda \times W$)** para medir **Ocupação real**.

### 6. Complexidade do Pior Caso na Busca do Anel (Capping the Walk)
* **Problema:** Quando o pod ideal do anel estava cheio, o algoritmo "caminhava" no sentido horário procurando o próximo pod. Sob estresse, testar dezenas de posições consumia CPU na JVM e gerava picos na latência $p99$.
* **Solução:** **Capping the Walk**. Delimitaram um **limite fixo de tentativas** (ex: 3 a 5 pulos). Se nenhum estivesse vago, a requisição é direcionada ao menos ocupado dentre os testados. Isso garante complexidade **$O(1)$** constante e protege a localidade do cache nos demais nós.

### 7. Pipeline de CD Fragilizada por Acúmulo de Travas
* **Problema:** Anos de travas manuais acumuladas fizeram o tempo mediano de deploy subir para 4h49m, impedindo testes rápidos e aumentando o tamanho dos pacotes de release.
* **Solução:** Otimização do build (cache de 21m para 12m), colapso de 40 passos manuais em 1 e adoção de **rollout sequencial entre regiões com buffer de alarmes** e *Kill Switch* via ConfigMap.

---


```mermaid
graph TD
    subgraph Cliente ["Cliente (App Chamadora)"]
        A[K8s Informer] -->|Watch Streaming| B[Lista de IPs RAM]
        B --> C[Executa xxHash64 no Hash Ring]
        C --> D{Valida Bounded Load & Cap Walk}
    end

    subgraph Cluster ["Cluster K8s"]
        D -->|Chamada HTTP Direta via IP| E[Pod Destino]
    end

    subgraph Servidor ["Pod Destino (Worker)"]
        E --> F{Cache Hit em RAM?}
        F -->|Sim| G[Retorna em ~1ms]
        F -->|Não| H[Busca no DynamoDB em ~8ms]
        H --> I[Guarda na RAM e Retorna]
    end
 ```   

## Impacto dos Resultados

- **Latência:** Eliminação completa dos picos diários no $p99$; baseline de latência estável e previsível.
    
- **Custos:** A frota de proxies do Skipper diminuiu de **>50 pods para 8 pods**, reduzindo drasticamente os custos operacionais do cluster.
    
- **Velocidade de Engenharia:** Tempo mediano de deploy reduzido de **289 minutos para 128 minutos**.