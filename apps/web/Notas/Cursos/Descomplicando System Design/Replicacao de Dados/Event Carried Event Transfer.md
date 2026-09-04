---
title: "Event Carried Event Transfer"
---

Em grandes sistemas, especialmente em arquiteturas corporativas complexas, uma solução eficaz para lidar com a alta disponibilidade de grandes volumes de dados é o **Event-Carried State Transfer**.

Esse padrão **permite que o estado de um objeto seja transmitido entre serviços ou domínios de software por meio de eventos**. Ele **combina estratégias de cache, sistemas baseados em eventos e replicação de dados**, proporcionando uma maneira custosa, porém poderosa, de lidar com grandes volumes de dados sem aumentar o nível de acoplamento.

A ideia central é que, **sempre que houver uma atualização em uma entidade de um domínio**, essa mudança seja publicada em tópicos de eventos. **Os demais serviços que dependem desse domínio podem consumir esses eventos e atualizar suas próprias bases de dados locais**, **criando uma cópia em cache do estado**.