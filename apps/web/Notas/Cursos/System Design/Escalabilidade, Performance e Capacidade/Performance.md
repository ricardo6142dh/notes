

> [!quote] Definicao
> A **performance** refere-se a **quão rápido e eficiente um sistema ou algoritmo pode ser ao processar uma única transação**, seja de forma isolada ou concorrendo com um grande volume de outras transações. 


Para monitorar e avaliar o desempenho de forma contínua e garantir a estabilidade de sistemas distribuídos, a engenharia adota as métricas conhecidas como os **Four Golden Signals** (Quatro Sinais de Ouro).

- **Utilização e Saturação de Recursos:**
    
    - **Utilização** mede a porcentagem de uso de um recurso computacional disponível (como CPU, memória, disco ou rede).
    - **Saturação** ocorre quando o consumo desse recurso se aproxima do valor máximo esperado ou possível.
    - Sua fórmula básica de cálculo é: \[\text{Utilização de Recurso} = \left( \frac{\text{Recurso Utilizado}}{\text{Recurso Disponível}} \right) \times 100\]
    - Um ponto crítico é que **um recurso pode estar saturado e degradar o desempenho geral do sistema bem antes de sua utilização física atingir 100%**.
    
- **Throughput (Tráfego):**
    
    - Descreve o **número de operações ou unidades de trabalho (como requisições HTTP, vendas ou eventos) que um sistema consegue realizar dentro de um determinado período de tempo**.
    - Em protocolos de comunicação web, ele é contabilizado a partir da quantidade de requisições HTTP que a aplicação recebe e responde.
    - Sua fórmula de cálculo é: \[\text{Throughput} = \frac{\text{Unidades de Trabalho Processadas}}{\text{Tempo}}\]
    - Essa métrica ajuda a entender o limite de carga que o sistema suporta antes de começar a afetar o tempo de resposta ou a taxa de erros.
    
- **Tempo de Resposta:**
    
    - Corresponde ao **tempo total decorrido desde o envio de uma solicitação pelo cliente até o recebimento completo da resposta**.
    - Ele é composto pela soma da **latência** (atraso físico de rede para a viagem de ida e volta do pacote de dados) com o **tempo de processamento** interno do servidor.
    - Seu cálculo baseia-se na diferença de timestamps: \[\text{Tempo de Resposta} = \text{Timestamp da Resposta} - \text{Timestamp da Requisição}\]
    
- **Taxa de Erros:**
    
    - Corresponde à **porcentagem de todas as requisições que resultam em falha em relação ao total de tentativas ou eventos**.
    - É calculada como: \[\text{Taxa de Erro} = \left( \frac{\text{Número de Erros}}{\text{Número Total de Tentativas}} \right) \times 100\]
    - Em sistemas escaláveis e bem planejados, **a taxa de erro deve se manter estável ou diminuir à medida que a carga de trabalho aumenta**.

---

#### O Papel dos Percentis nas Métricas de Performance

Apoiar-se apenas no tempo médio de resposta para avaliar a performance de um sistema é perigoso, pois a média esconde variações extremas e picos de lentidão (_outliers_). Por essa razão, os engenheiros utilizam **percentis** (como p50, p90, p95 ou p99), que dividem os dados ordenados em cem partes iguais para fornecer uma visão precisa da distribuição.

Um **p90 de 800ms**, por exemplo, indica o valor abaixo do qual 90% das respostas foram mais rápidas, evidenciando que os 10% restantes dos usuários experimentaram tempos de resposta superiores a 800ms. Analisar esses percentis mais altos permite identificar comportamentos anômalos e direcionar otimizações de forma muito mais eficiente do que olhando apenas para o comportamento médio.