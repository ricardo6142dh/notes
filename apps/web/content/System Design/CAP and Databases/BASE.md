---
tags:
  - area/system-design
  - topic/databases
  - topic/distributed-systems
type: note
aliases:
  - Basically Available Soft State Eventual Consistency
---

related:: [[ACID]], [[CAP Theorem]], [[Availability]], [[Consistency]]

# BASE

BASE stands for **Basically Available**, **Soft state**, and **Eventual consistency**.

### Basically Available

This means the system guarantees [[Availability|availability]]. If a user tries to read data, they will get a response.

**Behind the Scenes:** In an [[ACID]] system, if a part of the database is broken or busy, the system might say, “Error, please try again.”

In a BASE system, the goal is to always give an answer.

If the main server with the most up-to-date data is down, the system might route the user to a backup server.

That backup server might have slightly old data, but the system decides it is better to show _something_ rather than show an error page.

### Soft State

“Soft State” is a fancy way of saying that the state of the system might change over time, even without new input.

**Behind the Scenes:** In a strict banking system, the balance only changes when a transaction happens. In a BASE system, the data is constantly “settling.”

Because the data is being copied (replicated) across many different servers, the true “state” of the data is somewhat fluid until all those copies match up. The system doesn’t promise that the data you see right now is the absolute, frozen truth.

### Eventual Consistency

This is the most famous and important part of the BASE acronym. It means that if the system stops receiving inputs, eventually all the servers will catch up and have the same data.

**Behind the Scenes:** Think about posting a photo on Instagram. You hit “post,” and it appears on your phone instantly. However, your friend sitting next to you might not see it on their feed for another 10 seconds.

The system didn’t lock everyone’s phone to update the feed instantly. That would crash the internet. Instead, the update propagated to your local server first, then slowly (in computer time) spread to the servers in your friend’s region.

The system promises that the data will become consistent _eventually_. It might take a few milliseconds, or it might take a few seconds. But it will happen.

https://designgurus.substack.com/p/acid-vs-base-the-system-design-interview
