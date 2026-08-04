---
tags:
  - course/system-design
  - topic/cap
  - topic/distributed-systems
type: note
aliases:
  - CAP
  - CAP Theorem
---

related:: [[CAP Combinations]], [[PACELC]], [[Consistency]], [[Availability]], [[Partition Tolerance]]

# CAP Theorem


## What is CAP Theorem?

At its core, [[CAP Theorem |CAP]] theorem states that in a distributed system, you can only have two out of three of the following properties:

- [[Consistency]]: All nodes see the same data at the same time. When a write is made to one node, all subsequent reads from any node will return that updated value.

- [[Availability]]: Every request to a non-failing node receives a response, without the guarantee that it contains the most recent version of the data.

- [[Partition Tolerance]]: The system continues to operate despite arbitrary message loss or failure of part of the system (i.e., network partitions between nodes).

Here's the key insight that makes CAP theorem much simpler to reason about in interviews: In any distributed system, partition tolerance is a must. Network failures will happen, and your system needs to handle them.

This means that in practice, CAP theorem really boils down to a single choice: Do you prioritize consistency or availability when a network partition occurs?

Imagine you're running a website with two servers - one in the USA and one in Europe. When a user updates their public profile (let's say their display name), here's what happens:

1. User A connects to their closest server (USA) and updates their name
2. This update is replicated to the server in Europe
3. When User B in Europe views User A's profile, they see the updated name

Everything works smoothly until we encounter a network partition - the connection between our USA and Europe servers goes down. Now we have a critical decision to make:

When User B tries to view User A's profile, should we:

- Option A: Return an error because we can't guarantee the data is up-to-date (choosing consistency)
- Option B: Show potentially stale data (choosing availability)

### When to Choose Consistency

Some systems absolutely require [[Consistency]], even at the cost of availability:

1. **Ticket Booking Systems**: Imagine if User A booked seat 6A on a flight, but due to a network partition, User B sees the seat as available and books it too. You'd have two people showing up for the same seat!
2. **E-commerce Inventory**: If Amazon has one toothbrush left and the system shows it as available to multiple users during a network partition, they could oversell their inventory.
3. **Financial Systems**: Stock trading platforms need to show accurate, up-to-date order books. Showing stale data could lead to trades at incorrect prices.

### When to Choose Availability

The majority of systems can tolerate some inconsistency and should prioritize [[Availability]]. 
In these cases, eventual consistency is fine. Meaning, the system will eventually become consistent, but it may take a few seconds or minutes.

1. **Social Media**: If User A updates their profile picture, it's perfectly fine if User B sees the old picture for a few minutes.
2. **Content Platforms (like Netflix)**: If someone updates a movie description, showing the old description temporarily to some users isn't catastrophic.
3. **Review Sites (like Yelp)**: If a restaurant updates their hours, showing slightly outdated information briefly is better than showing no information at all.

The key question to ask yourself is: "Would it be catastrophic if users briefly saw inconsistent data?" If the answer is yes, choose consistency. If not, choose availability.
