---
title: SRE Interview Questions
status: unread
source: https://syedali.net/engineer-interview-questions/
created: 2026-08-26
tags:
  - source/article
  - topic/sre
  - topic/interviews
  - topic/career
  - topic/system-design
---

## TL;DR

A curated list of common engineering interview questions across systems, algorithms, design, and behavioral topics useful for candidate preparation and hiring calibration.

## Summary

Unix Processes What is the difference between a process and a thread? A thread is a lightweight process. Each process has a separate stack, text, data and heap. Threads have their own stack, but share text, data and heap with the process. Text is the actual program itself, data is the input to the program…

The page aggregates questions spanning system design, algorithms, databases, networking, and behavioral prompts, often with brief pointers or structure for answers. It is intended as a study aid and reference for interviewers and candidates.

A thread is a lightweight process. Each process has a separate stack, text, data and heap. Threads have their own stack, but share text, data and heap with the process. Text is the actual program itself, data is the input to the program and heap is the memory which stores files, locks, sockets. Reference: https://computing.llnl.gov/tutorials/pthreads/#Thread

A zombie process is a one which has completed execution, however it’s entry is still in the process table to allow the parent to read the child’s exit status. The reason the process is a zombie is because it is “dead” but not yet “reaped” by it’s parent. Parent processes normally issue the wait system call to read the child’s exit status whereupon the zombie is removed. The kill command does not work on zombie process. When a child dies the parent receives a SIGCHLD signal. Zombie processes do not take up system resources, except for the tiny amount of space they use up when appearing in the process id table.

Zombie processes are created when the parent does not reap the child. This can happen due to parent not executing the wait() system call after forking.

Let’s take the example of /bin/ls. When you run ‘ls’ the shell searches in its path for an executable named ‘ls, when it finds it, the shell will forks off a copy of itself using the fork system call. If the fork succeeds, then in the child process the shell will run ‘exec /bin/ls’ which will replace the copy of the child shell with itself. Any parameters that that are passed to ‘ls’ are done so by exec.

Signals are an inter process communication method. The default signal in Linux is SIG-TERM. SIG-KILL cannot be ignored and causes an application to be forcefully killed. Use the ‘kill’ command to send signals to a process. Another popular signal is the ‘HUP’ signal which is used to ‘reset’ or ‘hang up’ applications. A list of signals can be found here http://man7.org/linux/man-pages/man7/signal.7.html. A snipet from the man page is below.

Signal Value Action Comment SIGHUP 1 Term Hangup detected on controlling terminal or death of controlling process SIGINT 2 Term Interrupt from keyboard SIGQUIT 3 Core Quit from keyboard SIGILL 4 Core Illegal Instruction SIGABRT 6 Core Abort signal from abort(3) SIGFPE 8 Core Floating point exception SIGKILL 9 Term Kill signal SIGSEGV 11 Core Invalid memory reference SIGPIPE 13 Term Broken pipe: write to pipe with no readers SIGALRM 14 Term Timer signal from alarm(2) SIGTERM 15 Term Termination signal (Default) SIGUSR1 30,10,16 Term User-defined signal 1 SIGUSR2 31,12,17 Term User-defined signal 2 SIGCHLD 20,17,18 Ign Child stopped or terminated SIGCONT 19,18,25 Cont Continue if stopped SIGSTOP 17,19,23 Stop Stop process SIGTSTP 18,20,24 Stop Stop typed at terminal SIGTTIN 21,21,26 Stop Terminal input for background process SIGTTOU 22,22,27 Stop Terminal output for background process

## Key Concepts

- System design questions: high-level architecture, trade-offs, scaling, and SLO considerations.
- Algorithm and data structure prompts: complexity, correctness, and optimizations.
- Behavioral and cultural fit: past experience, incident handling, and teamwork.
- Practical coding tasks: edge cases, testing, and performance considerations.

## Technical Insights

- Coverage: the list covers practical real-world scenarios (rate limiting, caching, consistency) not just whiteboard puzzles.
- Use in hiring: good for calibrating interview rounds, creating rubrics, and standardizing evaluation across interviewers.
- Trade-offs: such lists risk encouraging rote memorization; best used with paired practice and open-ended discussion to test depth of understanding.

## Why This Matters

For hiring managers and candidates, a curated question set accelerates preparation, improves interview consistency, and helps align expectations on required skills and levels.

## Open Questions

- Are answer rubrics provided or linked for each question?
- What level (junior/senior/staff) are the questions targeted at?
- Are there suggested time allocations per question for interviewers?

## Review Points

- Use the list to update our interview rubric and add representative questions for each role level.
- Run mock interviews with this set to identify gaps in our current process.
- Provide guided answer outlines for consistent scoring by interviewers.

## Source

https://syedali.net/engineer-interview-questions/

## Connections

- [[Links/Interviews|Interviews]]
- [[Cursos/Descomplicando System Design/Concepts/Availability|Availability]]
- [[Cursos/Descomplicando System Design/Escalabilidade, Performance e Capacidade/Performance|Performance]]
