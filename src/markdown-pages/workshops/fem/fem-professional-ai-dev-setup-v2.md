---
title: Professional AI Dev Setup v2
date: 2026-10-06
tags:
  - workshop
  - masters.dev
---

https://master.dev/workshops/pro-ai-v2/

https://stevekinney.com/courses/ai-development-setup

`gh repo clone stevekinney/front-desk`

## Harness Agnostic by Default

- Skills are an open standard, Codex hooks are a direct port of CLaude subagents. Its subagents are slightly different, but roughly the same.

For people who aren't building agentic products but are using Claude Code, every six months, delete your CLAUDE.md file, delete your skills, and delete your hooks. 
-- Boris Cherny, creator of Claude Code, at Y Combinator Startup School in 2026.

The small system you understand almost always beats seven plugins and hope. 

Code doesn't cost tokens, this happens in the harness.

## Choosing the Right Model

- Everyday execution: Sol or Sonnet
- Difficult and sustained work, or ambigious investigation: Astra, Opus, Fable, or Kimi K3
- Bounded, high-volume transformation: Luna or Haiku. The providers position these models around efficient high-volume work.
- Mixed media workflows: Gemini

https://stevekinney.com/experiments/model-calculator

## Cost and Caching

- You pay for input tokens
- You pay for output tokens

## Cache Rules

- The cache is model bound. Switch models is a new cache.
- It used to be universally true that changing effort levels invalidated the cache.
- With Fable 5.1, Opus 5.5, and Sonnet 5.5, you can change effort without invalidating it, on an API key or Claude subscription.
- It does not hold on Amazon Bedrock, Google Cloud's Agent Platform, or a Claude apps gateway.
- Nor with `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` set, of with a HIPAA configuration. 
- 1 hour typically, start fresh with model choice, end with summary

## Leveraging Existing Research

- Fork a conversation: do the stable research up front, then fork into the tasks
- Durable research: dedicate a session to research and capture it in an external resource, which can be as simple as as text file.
- I use Obsidian as a second brain. It let's me audit, edit, and tweak the research with my own insights. -- Steve
- use tmp/markdowns in repo ignored on a branch can help

https://stevekinney.com/experiments/compact-or-clear

https://claude.com/code-with-claude/session/sf-getting-more-out-of-the-claude-platform

## What reloads and what doesn't

- After /clear or /compact, it rereads AGENTS.md, CLAUDE.md

## Skills

A skill says how to perform a reocurring task. It should be narrow. 

### Lazy-loaded instructions

- And agent can, and should, decide to read up on a skill and add it to it's context
- Supporting detail loads only when needed.

### Anatomy

- Name and description: the discovery surface
- Main body: the procedure after activation
- Reference files: read when needed
- Scripts: for deterministic work
- Assets: templates

Too many skills is overhead.

https://claudemarketplaces.com/skills/mattpocock/skills/grill-me

## Claude Code Frontmatter

- context: fork, the body becomes a fresh subagents task.
- agent: type, gives the fork that agent's prompt, tools, and model. Does nothing without context: fork. 
- allowed-tools: pre-approves tools for invoking
- hooks: registered when the skill is invoked
- background: whether a fork runs in the background. Background edits land outside /rewind checkpoints

## Configuring Invocation

- disable-model-invocation: true, only a slash command invokes
- Such a skill also can't be preloaded into subagents or used as a scheduled task.
- Codex equivalent in agents/openai.yaml: policy.allow_implicit_implication: false

### Anti-patterns
- Two or more schools with near-duplicate descriptions
- Buring critical exclusions or reasons to call a skill
- Saying 'read all the references'. It will listen

https://stevekinney.com/courses/ai-development-setup/skill-configuration

https://stevekinney.com/experiments/skill-editor

Claude skill doctor. 

Aim for five to seven well-scoped agents.

## Git Trick

`.git/info/exclude`: files only on your machine, not committed, like private .gitignore

## Model / Secret Options

https://code.claude.com/docs/en/model-config#opusplan-model-setting


## Workflows

consider:

- you want to cover a large surface in parallel
- you want adversarial checks before you accept a finding

skip it when:

- nothing can run in parallel
- the plan may change mid-run
- you need human approval mid-way
- the important gates (merges, external writes) belong to the cordinator

### models and cost

- Each agent's model is picked in order: the model on the agent() call, the definition's model:, CLAUDE_CODE_SUBAGENT_MODEL, your session's model
- Leave the first and third unset, and an opus session runs every agent on opus
- field reports put runs at hundreds of thousands to millions of tokens

## Goals and Loops

`/loop` when the value is in noticing a change, like a deploy finishing. Use `/goal` when the value is in moving toward something you can check.

## Evaluator

A separate model looks at what the agent did and decide whether it did the thing. 

- the more clear you make 'did the thing' the better the results
- it can assess surfaced evidence.
- Codex ships a command with the same name, and it is not the same pattern: the model doing the work audits itself

## Ralph Loop vs. Goal

| Property      | /goal                                                     | /External loop                      |
|---------------|-----------------------------------------------------------|-------------------------------------|
| Context       | Continuing thread                                         | Fresh context, each attempt         |
| Judge         | A separate model (Claude Code) or the worker tool (Codex) | A derterministic script verifies it |
| Governor      | Budget and/or stated condition                            | Deterministic part of the script    |
| Durable state | The continuing thread                                     | Git, files, logs                    |

https://claude.com/code-with-claude/session/sf-caching-harnesses-and-advisors-building-on-claude-at-github-scale