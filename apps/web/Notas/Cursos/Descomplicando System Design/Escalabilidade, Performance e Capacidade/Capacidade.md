
> [!quote] Definicao
> A **capacidade** refere-se à **quantidade máxima de trabalho que um sistema consegue receber e processar de maneira eficaz dentro de um determinado período de tempo**.


Os pontos fundamentais que definem e afetam a capacidade são:

### 1. Gargalos de Capacidade (Bottlenecks)

- **O que são:** Pontos do sistema onde o desempenho geral é limitado porque **a demanda atual supera a capacidade daquele componente específico** (Gargalo = Demanda > Capacidade).
- **Origem:** Embora possam ser causados por restrições físicas de hardware (como falta de CPU, memória ou rede), é muito comum que os gargalos surjam de **código mal otimizado, algoritmos ineficientes ou problemas de concorrência**, como _deadlocks_ ou uso excessivo de bloqueios de recursos.
- **Natureza Dinâmica:** A identificação de gargalos é um processo contínuo: **ao resolver um gargalo em um componente, a carga nos sistemas subsequentes aumenta**, o que frequentemente gera um novo gargalo mais adiante no fluxo.

### 2. Backpressure de Capacidade (Repressão de Fluxo)

- **O que é:** Ocorre quando um serviço em uma arquitetura distribuída ou de microsserviços **passa a receber mais dados ou requisições do que é capaz de processar**.
- **Impacto:** Esse represamento gera aumento no tempo de resposta, lentidão, falhas e até perda de dados.
- **Limitação do Fluxo:** Como "uma corrente é tão forte quanto seu elo mais fraco", o _throughput_ (vazão) e a capacidade real de um sistema completo serão sempre **limitados pelo componente de menor capacidade**, fazendo com que serviços mais performáticos fiquem ociosos.

### 3. Custo de Transação por Capacidade

- **Métrica Financeira:** Avalia se a capacidade de infraestrutura alocada está sendo usada de forma eficiente, dividindo o **Custo Total Operacional pelo Total de Transações** executadas em um período.
- **Eficiência:** Em ambientes de nuvens públicas, monitorar essa métrica ajuda a otimizar gastos, já que **um custo por transação mais baixo indica que os recursos disponíveis estão sendo utilizados com maior eficiência**.

### 4. Adaptação de Capacidade (Escalabilidade)

- Para manter a experiência do usuário estável perante variações de demanda, os sistemas modernos usam a **escalabilidade horizontal (elasticidade)** para adicionar ou remover capacidade computacional (servidores, contêineres ou réplicas) dinamicamente.
- No Kubernetes, por exemplo, o **Horizontal Pod Autoscaler (HPA)** implementa essa lógica ao monitorar continuamente a utilização média de recursos (como CPU ou memória) ou métricas customizadas, calculando e ajustando automaticamente a quantidade necessária de pods para equilibrar a carga.

