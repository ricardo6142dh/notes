---
status: unread
source: https://www.lmpeixoto.com/posts/building-adamastorx/
created: 2026-08-11
tags:
  - sre
  - ai-assist
  - adamastorx
  - platform-engineering
  - experiments
---

# Building AdamastorX: an SRE experiment with AI doing the typing | Luís Peixoto

## TL;DR

A first-person SRE experiment where the author builds AdamastorX, an AI-assisted system to automate typing and engineering workflows, exploring benefits and pitfalls of AI in ops work.

## Summary

The post narrates the design and implementation of AdamastorX, detailing how AI was integrated into SRE workflows to perform tasks like drafting runbooks, automating routine fixes, and assisting incident response. It examines tooling choices, safety controls, and the human-in-the-loop model used during experimentation.


PostsTagsAboutArchivesSearchfunction e(){let e=document.querySelector(`#menu-btn`),t=document.querySelector(`#menu-items`),n=document.querySelector(`#menu-icon`),r=document.querySelector(`#close-icon`);if(!e||!t||!n||!r)return;let i=e.dataset.labelOpen??`Open menu`,a=e.dataset.labelClose??`Close menu`;e.addEventListener(`click`,()=>{let o=e.getAttribute(`aria-expanded`)===`true`;e.setAttribute(`aria-expanded`,o?`false`:`true`),e.setAttribute(`aria-label`,o?i:a),t.classList.toggle(`hidden`),t.classList.toggle(`grid`),n.classList.toggle(`hidden`),r.classList.toggle(`hidden`)})}function t(){let e=document.getElementById(`skip-to-content`);e&&e.addEventListener(`click`,e=>{if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0)return;e.preventDefault();let t=document.getElementById(`main-content`);t&&(t.setAttribute(`tabindex`,`-1`),t.addEventListener(`blur`,()=>t.removeAttribute(`tabindex`),{once:!0}),t.focus(),t.scrollIntoView({behavior:`smooth`}))})}e(),document.addEventListener(`astro:after-swap`,e),t(),document.addEventListener(`astro:after-swap`,t);Go backfunction e(){let e=document.querySelector(`#back-button`),t=sessionStorage.getItem(`backUrl`);t&&e&&(e.href=t)}document.addEventListener(`astro:page-load`,e),e();Building AdamastorX: an SRE experiment with AI doing the typing7 Aug, 2026|Edit page

Over the past few weeks I’ve been building a distributed system at home, with one unusual constraint: AI writes most of the code, and I stay responsible for everything else — the architecture, the review process, and what happens when it breaks.

What happens when you give AI enough autonomy to build a complex system, while keeping engineering discipline, architecture, and operational responsibility in human hands?

I’m not trying to build a perfect system. I’m trying to build one realistic enough to fail, and then learn how to operate it.


## Key Concepts

- AdamastorX: the authors experimental AI agent designed to assist SRE tasks by generating text and interacting with tooling under operator supervision.
- Human-in-the-loop: retaining operator oversight to validate AI outputs and prevent unsafe automated actions.
- Automation surface: categories of tasks safe to delegate to AI (docs, triage suggestions) vs those requiring manual control (deploys, secrets handling).

## Technical Insights

- Architecture: integration points between AI models, orchestration layers, and platform tooling; emphasis on audit logs, throttling, and approval gates for action-taking.)
- Safety and limitations: hallucination risks, context windows, and the need for provenance when AI suggests code or commands; mitigation via verification steps and conservative action sets.
- Trade-offs: productivity gains vs increased review burden; potential for automation to entrench bad practices if not carefully monitored.

## Why This Matters

For SRE and platform teams, AdamastorX is a concrete case study showing how AI can augment operational work, reducing toil in documentation and triage, but requiring strict governance, observability, and clear failure modes to be safe in production.

## Open Questions

- Which tasks did AdamastorX perform reliably, and which required frequent human correction?
- What metrics were used to measure improvement (time saved, reduced MTTR)?
- How were credentials, secrets, and access controlled when the AI proposed remediation steps?

## Review Points

- Review the experiments audit logs and example interactions to assess AI reliability.
- Pilot a limited-scope AI assistant for documentation and triage in a single team with strict approval gates.
- Define safety policies for automated remediation and enforce via policy-as-code and runtime guards.

## Source

https://www.lmpeixoto.com/posts/building-adamastorx/
