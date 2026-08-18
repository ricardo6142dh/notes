---
status: unread
source: https://srekubecraft.io/posts/llm-d-distributed-inference/
created: 2026-08-18
tags:
  - distributed-inference
  - llm-d
  - model-serving
  - infrastructure
  - sre
---

# llm-d - Kubernetes-Native Distributed LLM Inference at Scale :: SREKubeCraft | Nick Nikolakakis

## TL;DR

LLM-D presents a distributed inference architecture for large language models emphasizing model parallelism, elastic scaling, and reduced latency through coordinated worker pools and efficient routing.

## Summary

The post describes LLM-D, an approach for distributed inference that partitions model execution across a cluster of workers, coordinates input routing, and balances latency vs throughput. It covers system design, worker orchestration, batching strategies, and failure handling for production-grade LLM serving.


Search posts... /explorer ~home %archives >projects #tags @whoaminetwork system tokyo-night49 posts · 110 tags SREKubeCraft ~/posts/llm-d-distributed-inference.md21 min · 4271 wordsllm-d - Kubernetes-Native Distributed LLM Inference at Scale// A hands-on tour of llm-d, the CNCF Sandbox framework for distributed LLM inference on Kubernetes - inference-aware routing, prefill/decode disaggregation, and KV-cache offload. Includes a GPU-free demo on Kind using the vLLM simulator, wired with Flux GitOps.

Three months ago I wrote about KServe and how the InferenceService CRD had become the closest thing cloud-native has to a standard for putting a trained model behind an API. That post ended on a deliberate cliffhanger: KServe gives you a great single-model serving primitive, but it does not solve GPU sharing, fractional scheduling, or how you load-balance inference traffic across many replicas of a large model. I pointed at Volcano and Kueue and moved on.

This post is the other half of that story. Once your models get big enough and your traffic high enough, the interesting problem is no longer “how do I serve one model” - it is “how do I route, disaggregate, and cache inference across a fleet of GPUs so tail latency stays flat under load.” A plain Kubernetes Service in front of eight vLLM pods is inference-blind: it round-robins requests as if every token cost the same. It does not. That gap is exactly what llm-d fills.

llm-d joined the CNCF as a Sandbox project at KubeCon EU 2026, jointly donated by IBM Research, Red Hat, and Google Cloud, with founding support from NVIDIA, AMD, CoreWeave, Hugging Face, Intel, Lambda, and Mistral AI. It is a Kubernetes-native distributed inference framework built on top of vLLM, the Gateway API Inference Extension, and LeaderWorkerSet. This post walks through what it is, why plain Kubernetes load balancing falls short for LLMs, and how to run the whole orchestration layer on a Kind cluster on your laptop - no GPU required - using the vLLM simulator and Flux GitOps. The full demo lives in srekubecraft-demo/llm-d/.


## Key Concepts

- Model parallelism: splitting a models layers or tensors across multiple workers to handle models larger than a single device memory.
- Sharding and replication: techniques to distribute model shards and replicas to balance load and provide redundancy.
- Elastic scaling: adding/removing workers dynamically to match inference load while managing state and model placement.
- Batching and scheduling: grouping requests to utilize GPU throughput while meeting latency SLOs.

## Technical Insights

- Architecture: coordinator service routes requests to appropriate shard replicas, manages pipeline parallelism, and orchestrates micro-batches across GPUs.
- Performance: discusses trade-offs between batch size, latency, and GPU utilization; recommends adaptive batching and optimistic execution to reduce tail latency.
- Fault tolerance: use of health checks, fallback replicas, and re-routing on worker failure; state checkpointing and quick rewarm strategies to restore capacity.
- Trade-offs: complexity of distributed state and synchronization versus ability to serve very large models; network overhead and cross-device communication are primary bottlenecks.

## Why This Matters

For SREs and platform engineers running model serving, LLM-D outlines patterns to serve large models efficiently while controlling costs and meeting latency SLOs; it informs capacity planning, deployment automation, and observability needs for ML infra.

## Open Questions

- What are the exact shard placement algorithms and heuristics used for latency optimization?
- How are model updates and versioning handled without disrupting in-flight requests?
- Concrete numbers: p50/p95/p99 latencies, GPU utilisation, network overhead for sample deployments?

## Review Points

- Prototype a small LLM-D-style pipeline for a medium-sized model to measure batching vs latency trade-offs.
- Evaluate existing open-source tools (Ray Serve, TorchServe, NVIDIA Triton) for parts of the architecture before building custom components.
- Define SLOs and observability for per-shard latency, queue lengths, and rewarm times.

## Source

https://srekubecraft.io/posts/llm-d-distributed-inference/
