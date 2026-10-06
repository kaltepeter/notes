---
title: Automate with Claude Code
date: 2026-09-27
tags:
- claude
- mcp
- course
- mammoth-club
---

[Automate with Claude Code](https://mammothclub.com/course-learn/automate-with-claude-code-ai-coding-assistant/93895-prerequisites)

## Claude.md

Use `/init` to create one or a prompt to generate or update.

A good claude.md should have four sections: 
- overview
- commands
- architecture
- conventions

## Lean principle

Less = more reliable. Claude.md is loaded on every request. 

Leave out:
- full source code files
- external library documentation
- frequently changing content
- things claude can infer. e.g. tsconfig.json, says you have typescript

> An outdated CLAUDE.md is worse than no CLAUDE.md at all. If the file says your app uses Context API for state and you have since migrated to Zustand, Claude will confidently write code for an architecture that no longer exists. Review the file whenever you make a significant structural change to your project.

> You can have multiple CLAUDE.md files at different levels of your project. A global one at **~/.claude/CLAUDE.md** sets preferences for all projects (like your preferred code style or language), while project-level ones hold project-specific details. Claude reads both and merges them at session start.

> Most effective CLAUDE.md files are between 20 and 60 lines. That is enough to cover the four core sections without eating into the context budget. Treat anything over 100 lines as a sign that the file needs a trim.

## Context Window

Claude's working memory. 

### Fixed Items (Always Present)

System instructions, tool definitions, and your CLAUDE.md file. These are loaded before your first message and stay for the entire session. You cannot remove them.

### Growing Items (Session Content)

Every message you send, every file Claude reads, every command it runs. These accumulate steadily as your session continues and are the primary reason the window fills up.

The context window holds **200,000 tokens** at the time of writing — roughly equivalent to a 150,000-word novel. That sounds vast. But a moderately complex session with many file reads and long exchanges can consume it faster than you would expect. The important thing is not the size of the window — it is knowing what is filling it.

> Claude does not abruptly stop working when the window fills. It compresses. Earlier parts of the conversation get summarized or deprioritized to make room for recent content. The architecture discussion from the start of the session becomes a vague summary. The convention you stated an hour ago fades. Claude is not ignoring you — it literally cannot see that far back anymore.

Space

- system prompt ~2,400 tokens
- tools - ~7,800 tokens. Only connect MCP servers you actually need.
- claude.md - ~420 tokens for a lean file. A 400-line file can grow to 3,000+ tokens.
- mesages - ~20,000 tokens. Fastest growing segment.
- files read - ~ 7,500 tokens. The contents of every file claude has opened during a session.. A 300-line typescript file may cost 3,000 tokens.
- available - ~152,000 tokens remaining.

> Every time you send a message, Claude receives the _entire_ conversation history — not just your latest message. That means as the session grows, each new request costs more tokens than the last, even if your messages stay the same length. A session that uses 5,000 tokens per exchange at the start may use 30,000 tokens per exchange an hour later.

`/context` command shows a live breakdown at any point in the session.

THe most useful number to watch is not the total percentage, it's the messages line. When it reaches 40% or more of the window, your session is approaching the zone where quality begins to degrade and you should consider `/compact`

> Anthropic recommends treating 70% total usage as your action threshold. At that point Claude Code will often trigger automatic compaction. Getting ahead of it by running **/compact** yourself at 50–60% usage gives you more control over what gets preserved in the summary versus what gets discarded.

> When Claude runs out of context, the failure is subtle before it is obvious. First, it starts producing code that contradicts conventions you stated early in the session. Then it "forgets" architectural decisions and suggests refactors that undo earlier work. Only at extreme usage does it start producing outright nonsense. The early signs are easy to miss if you are not watching for them.

## Managing Sessions

- `/compact` compresses the conversation history into a compact symmary. 
- `/clear` wipes the conversation history. 

## Paying

- subscription (pro/max): fixed monthly fee gives you a usage quota measured as a percentage with `/usage`.
- API (pay as you go): billed per token, separately for input and output. Monitor with `/cost`

## Strong prompts

A strong prompt has four things: context, action, constraints, and format.

### Three patterns of prompts

1. Targeted fix

```txt
// [function] in [file] [symptom].
// [Specific fix]. Do not change [thing to preserve].

The handleSubmit function in src/components/LoginForm.tsx
throws an unhandled promise rejection when offline.
Wrap the API call in a try/catch and set an error state on failure.
Do not change the form validation logic above the API call.
```

2. Scoped addition

```txt
// Add [specific thing] to [location].
// It should [behavior]. Do not [scope boundary].

Add a rate limiting middleware to src/middleware/.
Allow 100 requests per IP per 15-minute window,
return 429 with a Retry-After header when exceeded.
Do not apply it to auth routes.
Do not modify the existing error handling middleware.
```

3. Extraction

```txt

// Extract [logic] from [source] into [destination].
// [Source] should use [destination] and behave identically.
// Keep [interface] unchanged.

Extract the pagination logic from src/components/UserList.tsx
into a custom hook at src/hooks/usePagination.ts.
UserList.tsx should use the hook and render identically.
Keep the component\'s existing props interface unchanged.
```

> Anthropic researchers found that adding a single constraint clause to an otherwise vague prompt reduces unwanted side effects by roughly 70%. The constraint is often more valuable than the action description — Claude is good at figuring out how to do things, but it needs you to tell it what not to touch.

## Checklist before opening a project

Claude can do it all, but it wastes tokens and efforts.

- [ ] Install dependencies
- [ ] Make sure the project runs
- [ ] Check that claude.md exists
- [ ] know your specific task
- [ ] check your usage/cost baseline

## Cold start vs. warm start

❌ Cold Start

- 🔒No CLAUDE.md — Claude asks you to describe the project
- 🔍Claude scans the entire src/ folder to orient itself
- ❓You re-explain your tech stack and folder conventions
- ⚠First real output arrives after 5 to 8 messages
- 📈Context window is already 15 to 20% full before any work is done
- 🔄Claude may suggest approaches that contradict earlier decisions

✓ Warm Start

- 📄CLAUDE.md loaded — project context instantly available
- 🎯First prompt targets a specific file via @ reference
- ⚡Claude reads only what it needs for the current task
- ✓First real output arrives after 1 to 2 messages
- 📈Context window starts at 10 to 12% — mostly CLAUDE.md + tools
- ✅Claude works within your established conventions from message one

Run `/init` before the first real session. Claude will explore the project, generate a claude.md draft in about 30 sec, and then you have a warm start for every session.

## the @ operator

Targeted file access. Using `@` with specific files makes it so claude doesn't have to search.

In VS Code with Claude code open in the terminal, the open file is automatically loaded.

## The first prompt of the session

The first prompt in any session does double duty. It gives Claude the task and it frames the context. A weak prompt will leave Claude guessing.

> Developers who write a "read-only" first prompt — asking Claude to understand before acting — report 60 to 70% fewer correction cycles in a session compared to those who jump straight to "add this feature." The extra thirty seconds of planning at the start saves an average of fifteen minutes of cleanup at the end.

### Session Prompt Template

**Today we are [goal].** Read [@ file reference] to understand the current state. We [one key project constraint not in CLAUDE.md]. Do not make any changes yet — confirm your understanding and tell me [specific question].

## Bug Fixes

Calude will gravitate toward root cause fix when given enough context. If it is fixing the symptoms, it needs more.

Give it:
- The exact error message, full stack trace
- The file and function where it occurs
- What you expect to happen
- What actually happened

> Before sending a bug report prompt, check whether you can complete this sentence: "In **[file/function]**, when **[specific condition]**, the code produces **[actual output]** but I expected **[correct output]**." If you cannot complete it, you do not yet have the context Claude needs to find the root cause.

## The three-step fix loop

// STEP 1: Read — make Claude understand before it touches anything
> I am getting this error when the transactions array is empty:
  TypeError: Cannot read properties of undefined (reading 'amount')
    at getTotal (src/utils/math.ts:12:38)
    at Summary (src/components/Summary.tsx:8:24)
  Read @src/utils/math.ts. Expected: getTotal([]) returns 0.
  Actual: throws TypeError. Do not change anything yet.

// Claude reads the file, identifies the missing guard clause
Found: reduce() called on empty array with no initialValue.
Root cause: missing initialValue argument in reduce call.
Fix: add 0 as second argument to reduce.

// STEP 2: Fix — now Claude has a precise diagnosis
> Apply the fix. Do not change anything else in the file.

✓ Edited src/utils/math.ts  +1 line  -1 line

// STEP 3: Verify — confirm root cause, not just passing output
> Run the tests and confirm the fix works for edge cases:
  empty array, single-item array, and mixed positive/negative.

Running npm test
✓ 6 of 6 tests passing  ← including 3 new edge case tests

Follow up

// After Claude applies a fix, ask it to verify three things
> Before we call this done, answer three questions:
  1. What was the root cause (not the symptom)?
  2. Does this fix handle the edge cases: [list them]?
  3. Does this change affect any other code that calls
     this function? Run a search if needed.

## Plan before change

Any refactor that touches more than one function or involves moving code across files, use the plan mode.

The `/plan` slash command puts Claude into read only mode.

## Mid-feature session restart template

_"We are continuing [feature name]. Completed so far: [list]. Next: [one specific slice]. Before writing anything, read [@ existing file that shows the pattern to follow]."_

## How to Review

Revieing the code Claude wrote requires a different lens.

Reviewing human code

Main question: is the implementation correct? Errors are usually logic errors, missed edge cases, or misunderstandings of requirements. The code reflects the developer's mental model.

Reviewing AI code

Two questions: is the implementation correct, and is it implementing what I actually wanted? Errors are often specification gaps — Claude built the letter of the prompt, not the spirit of the intent.

### Good PR Checklist

- [ ] The diff is small and targeted
- [ ] Logic matches existing patterns exactly
- [ ] No new imports you didn't expect
- [ ] Error handling is explicit, not swallowed
- [ ] Edge cases are handled at the data source

### Systematic review process

1. Scope check first. Before reading checked changed filesj. 
2. Interface check. Look at the public interface of every function or component that changed. 
3. Logic check. Read the core logic. 
4. Edge case check. For each input, ask what happens if null, empty, a negative number, or a very large value.
5. Security check. Look for input used without sanitization, permissions checked too late, and data that is returned to unauthorized callers.

Ask Claude to review it's own code.

## Building your first AI powered app

With traditional development, unclear requirements emerge overtime, with quick refactors. With AI, these gaps can generate a lot of wrong things quickly, the cost is different. 

A ten min planning session prevents two-hour cleanup of code that solved the wrong problem.

### Five decisions to make first

1. What does this app do Write a single sentance that describes the app from the users perspective. "[type of user] can [primary action] so that [outcome]"
2. What is explicitly not in scope? List the features that sound related but are not part of this version.
3. What is the tech stack? Name every layer: frontend framework, backend framework, database, ORM, authentication approach, testing library, CSS method. Be specific. 
4. What are the data entities and their relationships? Sketch the main data on paper or in a doc. What are the 3-5 core entities? How do they relate?
5. What are the coding conventions? Named exports or default exports?


### Sample claude.md

```markdown
# Project: humble bundle library

## Overview
View and manage my humble bundle library.

## Tech Stack
Frontend:  React 19 + TypeScript + Vite 7
Backend:   Python + FastAPI
Database:  PostgreSQL + Prisma ORM

## Commands
- npm run dev     → start dev server
- npm run build   → production build
- npm test        → run test suite
- npm run lint    → lint + type check

## Conventions
- Default exports for components, named for utilities

## Out of scope (v1)
- yo

When a prompt is ambiguous, default to the simpler
implementation within the above scope.
```

> The generated file is a starting point. After you run **/init** in your project, compare what Claude generates with this brief and merge the best of both. Add your data model entities and relationships as a final section before your first build session.

```markdown
## Scope: Version 1

### In scope
- User authentication (login and registration only)
- Ticket creation, listing, and status updates
- Role-based access: customer, agent, admin
- Basic email notification on ticket assignment

### NOT in scope for this version
- Payment processing or billing
- Mobile application
- Real-time chat (use polling, not WebSockets)
- Third-party integrations (Slack, Jira, etc.)
- AI-powered features (planned for v2)
- Multi-tenant / white-label support

# When a prompt is ambiguous, default to the simpler
# implementation that fits within the above scope.
```

> Any time Claude proposes something outside your defined scope, respond with: **"That is out of scope for this version per our CLAUDE.md. What is the simplest implementation within scope that addresses the same need?"** This re-anchors Claude without losing momentum.

Scope is not permanent. Update the in-scope and out-of-scope lists as your build evolves. Moving an item from "not in scope" to "in scope" in CLAUDE.md is an explicit, documented decision — not something that happens accidentally through an ambiguous prompt.

### Sketch the data model before session one

```markdown
## Data Model (sketch — before writing any code)

### Entities
User        id, email, passwordHash, role (customer|agent|admin),
            createdAt

Ticket      id, title, description, status (open|in_progress|resolved),
            priority (low|medium|high), createdById (FK: User),
            assignedToId (FK: User, nullable), createdAt, updatedAt

Comment     id, body, ticketId (FK: Ticket), authorId (FK: User),
            createdAt

### Key relationships
- A User creates many Tickets (as customer)
- A User is assigned many Tickets (as agent)
- A Ticket has many Comments
- A User writes many Comments

### Deliberate decisions
- No separate Organization entity in v1 (single-tenant)
- Tags deferred to v2
- Soft deletes not needed in v1 (hard delete is acceptable)
```

## Order to Scaffold

1. Initialize the repository
2. Scaffold the backend
3. Setup the databse
4. Scaffold the frontend
5. Finalize claude.md

> Sending "scaffold my entire full-stack project" to Claude in one prompt is tempting but risky. Claude will produce hundreds of files, none of which you have reviewed, many of which will need adjustment. Scaffolding one layer at a time keeps each diff small enough to read and understand before moving on.

### Scaffold the backend

```markdown
# Session prompt: scaffold the backend only
> Scaffold the Node.js + Express + TypeScript backend
  for the HelpDesk project. Create:
  - package.json with Express, TypeScript, ts-node-dev,
    @types/express, dotenv, and Prisma as dependencies
  - tsconfig.json with strict mode enabled
  - src/index.ts as the entry point (port from .env)
  - src/routes/ directory with a health.ts route
    that returns {"status":"ok"} on GET /health
  - .env.example with DATABASE_URL and PORT
  - .gitignore that excludes node_modules and .env
  Do NOT create the database schema yet.
  Do NOT create the frontend.
  After creating the files, run the dev server and
  confirm GET /health returns the expected response.
```

### Scaffold the Database schema

```markdown
# Reference your planning doc with @
> Generate the Prisma schema for the HelpDesk project.
  Use this data model exactly:
  User: id (uuid), email (unique), passwordHash, role
        (enum: CUSTOMER, AGENT, ADMIN), createdAt
  Ticket: id (uuid), title, description, status
          (enum: OPEN, IN_PROGRESS, RESOLVED), priority
          (enum: LOW, MEDIUM, HIGH), createdById (User FK),
          assignedToId (User FK, optional), createdAt, updatedAt
  Comment: id (uuid), body, ticketId (Ticket FK),
           authorId (User FK), createdAt
  Write the schema to prisma/schema.prisma. Then run
  prisma migrate dev --name init to create the database.
  Do not add any fields not listed above.
```

### Folder structure and claude.md
With the structure set, run `/init` to generate a claude.md file. 

## Building core features

### Sequence features to minimize dependencies

1. authentication
	1. build step by step
2. role-based access control
```markdown
   > We need role-based access control. Our roles are already
  in the User model (CUSTOMER, AGENT, ADMIN enum).
  Add a single requireRole middleware factory to
  server/src/middleware/auth.ts:
  requireRole(...roles: Role[]): RequestHandler
    Returns a middleware that checks req.user.role against
    the allowed roles. Returns 403 if the role is not
    in the list. Must be chained after the auth middleware.
  Do NOT create a separate permissions system or database
  tables for roles. The enum on the User model is sufficient
  for our v1 scope. Keep it simple.
```
3. core data CRUD
4. secondary data features
5. polish and ai features

### multi-session feature builds

Session 1Ticket CRUD — Backend Routes

▶POST /tickets — create ticket (auth required, any role)

▶GET /tickets — list tickets (agents/admins see all, customers see their own)

▶GET /tickets/:id — detail view (owner or assigned agent or admin)

▶PATCH /tickets/:id/status — update status (agent or admin only)

✓**End state:**all four routes pass type-check and manual curl tests. Commit before next session.

Session 2Ticket CRUD — Frontend Pages

▶TicketList page — fetch and display tickets, handle loading and error states

▶TicketDetail page — full ticket view with status badge and metadata

▶CreateTicket form — title, description, submit to POST /tickets

✓**End state:**all three pages render with real data from the backend. No placeholder data. Commit.

Session 3Ticket CRUD — Tests

▶Unit tests for each route: happy path, unauthorized access, not found, validation errors

▶Integration test: customer creates ticket, agent reads and updates status, admin deletes

✓**End state:**all tests pass, coverage covers the RBAC logic. Commit with message "add ticket CRUD with tests".

> Every session that continues a multi-session feature build must start with a re-orientation prompt: _"We are building the HelpDesk ticket system. Authentication and RBAC are complete. Today we are building Session 2 of ticket CRUD — the frontend pages. Read @client/src/pages/ to see what exists. Then read @server/src/routes/tickets.ts to understand the API we are connecting to."_ Without this, Claude starts guessing about the current state.

### commits
> In a traditional build, commits happen when a developer thinks the code is ready. In an AI-assisted build, commits need to happen on a tighter cadence — not because the code changes faster, but because the context window resets between sessions and commits are the only reliable boundary between "what worked before" and "what we are building now."

When to commit

**After every verified slice.** A vertical slice that passes type-check and a manual or automated test is commit-ready. Do not accumulate multiple slices in one uncommitted working tree.

**Before every session break.** If you stop mid-session for any reason, commit what works. An uncommitted partial state is a trap — the next session starts with unknown ground.

**Before any refactor.** A clean commit before a refactor means you can revert to a known-good state if the refactor goes wrong, without undoing other unrelated work.

**Never commit broken code.** The baseline must always be a working state. Committing broken code means your recovery point is also broken — which defeats the purpose of having one.

```markdown
# Ask Claude to write the commit message — it produces
# consistent, descriptive messages that are useful for git log
> The auth routes and middleware are working and tests pass.
  Commit this with a descriptive message following
  conventional commits format.

# Claude will produce something like:
feat(auth): add JWT authentication with register and login routes
- Add userService with bcrypt password hashing
- Add JWT sign/verify utility with 24h expiry
- Add POST /auth/register and POST /auth/login routes
- Add auth middleware that attaches user to req
- Add requireRole factory for RBAC enforcement
- Add tests covering happy path and all error cases
```

## Adding a Simple AI Powered Feature

Golden rule: API calls stay on the server

### Reply polisher

Focused, single purpose AI feature. An agent types a draft response to a customer ticket -- casual, sometimes incomplete, occasionally blunt. 

System Prompt is the most important part of any AI feature. A vague system prompt produces inconsistent output. A precise one produces output that feels like it came from a well trained member.

```markdown
// server/src/services/aiService.ts

const POLISH_SYSTEM_PROMPT = `You are a professional customer support writing assistant.
Your job is to rewrite support agent replies to be:

- Professional and empathetic in tone
- Clear and easy for customers to understand
- Free of slang, contractions, and informal language
- Concise — do not add content that was not in the original
- Honest — do not make promises the original did not make

Rules:
- Preserve the core meaning and any specific facts (dates,
  versions, ticket numbers) exactly as given
- Do not add apologies if none were in the original
- Return ONLY the rewritten reply — no preamble, no explanation
- If the input is already professional, return it unchanged`;

export async function polishReply(
  draft: string,
  tone: 'formal' | 'friendly' = 'professional'
): Promise<string> {
  // API call added in the next code block
}
```

> A good system prompt defines the role, the output format, what to include, and what to exclude. "Return ONLY the rewritten reply" is more reliable than "return the reply." The negative constraints — what not to do — are often more important than the positive ones for producing consistent, usable output.

```python
// server/src/services/aiService.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function polishReply(draft: string): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: POLISH_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: draft }],
  });

  const block = message.content[0];
  if (block.type !== 'text') throw new Error('Unexpected response type');
  return block.text.trim();
}

// server/src/routes/ai.ts
import { Router } from 'express';
import { auth } from '../middleware/auth';
import { requireRole } from '../middleware/auth';
import { polishReply } from '../services/aiService';

const router = Router();

router.post('/polish-reply', auth, requireRole('AGENT', 'ADMIN'),
  async (req, res) => {
    const { draft } = req.body;
    if (!draft || draft.trim().length === 0) {
      return res.status(400).json({ error: 'draft is required' });
    }
    try {
      const polished = await polishReply(draft);
      res.json({ polished });
    } catch (err) {
      console.error('AI service error:', err);
      res.status(503).json({ error: 'AI service temporarily unavailable' });
    }
  }
);
```

## Testing

The three things tests catch that code review misses

**Edge cases Claude did not consider.** Empty arrays, null values, zero quantities, very long strings. Claude tests the happy path mentally when generating code. Automated tests run the cases it skipped.

**Regressions introduced by later changes.** A refactor in session 4 breaks something Claude built correctly in session 1. Without tests, you find out when a user hits the bug. With tests, you find out in the next 30 seconds.

**Integration failures between layers.** The service function returns one shape, the route handler expects another. Unit tests on each layer pass. An integration test catches the mismatch before your frontend does.

Testing early is important to avoid forgettings scenarios. Add tests before moving onto the next slice.

1. Build the slice. Write the service function or route. Run type-check. Verify manually with curl or the browser.
2. Ask Claude to write the tests for that slice immediately, while the code is still fresh in its context. Specify the cases to cover.
3. Run the tests. Fix any failures. Do not move to the next slice until this slice is green.
4. Commit the slice and its tests together. One commit, one message: "feat(auth): add register route with tests." The tests document the behavior permanently.

### Testing AI without live API calls

unit

```javascript
// aiService.test.ts — tests the service, not the AI output
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the entire Anthropic module before importing our service
vi.mock('@anthropic-ai/sdk', () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: {
      create: vi.fn().mockResolvedValue({
        content: [{ type: 'text', text: 'Polished reply text.' }]
      })
    }
  }))
}));

describe('polishReply', () => {
  it('returns the text from the API response', async () => {
    const { polishReply } = await import('./aiService');
    const result = await polishReply('rough draft text');
    expect(result).toBe('Polished reply text.');
  });

  it('throws when given an empty string', async () => {
    const { polishReply } = await import('./aiService');
    await expect(polishReply('')).rejects.toThrow();
  });
});
```

integeration

```javascript

// ai.route.test.ts — tests auth, validation, and routing
import request from 'supertest';
import { vi } from 'vitest';

// Mock the AI service — isolate route logic from AI logic
vi.mock('../services/aiService', () => ({
  polishReply: vi.fn().mockResolvedValue('Professional response.')
}));

it('returns 401 for unauthenticated requests', async () => {
  const res = await request(app)
    .post('/api/polish-reply')
    .send({ draft: 'test' });
  expect(res.status).toBe(401);
});

it('returns 403 for customer role', async () => {
  const res = await request(app)
    .post('/api/polish-reply')
    .set('Authorization', 'Bearer ' + customerToken)
    .send({ draft: 'test' });
  expect(res.status).toBe(403);
});

it('returns polished reply for agent role', async () => {
  const res = await request(app)
    .post('/api/polish-reply')
    .set('Authorization', 'Bearer ' + agentToken)
    .send({ draft: 'rough text here' });
  expect(res.status).toBe(200);
  expect(res.body.polished).toBe('Professional response.');
});
```

what not to test

**The quality of the AI output.** Do not write a test that asserts the polished reply "sounds professional." That is a human judgment call, not a verifiable binary condition. Your test suite will become fragile and meaningless the moment the model changes.

**The exact wording of AI responses.** Claude outputs are non-deterministic. A test that checks for a specific word or phrase will fail randomly. Test the shape and structure of the response — not the specific content.

**The AI service against the live API in CI.** Live API calls in CI are slow, flaky on network issues, and cost money on every pipeline run. Mock the API in all automated tests. Reserve live API verification for manual QA checks before major releases.

### Test Writing Prompt

```markdown
> Write integration tests for the ticket routes in
  @server/src/routes/tickets.ts using Vitest and Supertest.
  Follow the test structure in @server/src/routes/auth.test.ts.
  Cover the following cases for each route:
  POST /tickets:
    - Valid creation by customer (201 with ticket object)
    - Missing title field (400)
    - Unauthenticated (401)
  GET /tickets:
    - Agent sees all tickets
    - Customer sees only their own tickets
    - Unauthenticated (401)
  PATCH /tickets/:id/status:
    - Agent can update status (200)
    - Customer cannot update status (403)
    - Non-existent ticket ID (404)
  Use the seed helper from @server/src/test/helpers.ts
  to create test users and tickets. Do not use real passwords.
```

- Review code like any other code
> The most dangerous test Claude occasionally writes is one where the assertion is trivially true regardless of the code under test. For example: **expect(result).toBeDefined()** passes even when result is an empty object or an error. Review every assertion and ask: would this test catch a real bug in the code it is testing? If not, it needs to be strengthened.

## Production

> The three most common launch-day environment mistakes are: forgetting to set a production-strength JWT secret, leaving CORS open with a wildcard, and leaving **LOG_LEVEL=debug** which can expose request bodies and internal errors to your logging system. All three are trivial to fix — and trivial to miss.

Your repository should contain a **.env.example** file with every required variable listed but no actual values. This file is committed. Your actual **.env** is in **.gitignore** and never committed. When you deploy, you set the real values in your hosting platform's environment configuration. This pattern prevents secrets from ever entering your git history.

### Security Middleware

```markdown
> Read @server/src/index.ts. Add the following production
  security middleware to the Express app, in this order
  before all route handlers:
  1. helmet() — sets secure HTTP headers
  2. cors() — allow only ALLOWED_ORIGIN from process.env,
     restrict to GET, POST, PATCH, DELETE methods
  3. express-rate-limit — 100 requests per 15 minutes per IP
     on all routes, stricter limit of 10 per 15 minutes
     on /auth routes only
  4. express.json({ limit: '10kb' }) — reject oversized bodies
  Install the required packages. Do not change any route
  handler or middleware that already exists.
  Run npm run type-check after.
```

> **Helmet** sets 11 HTTP response headers that prevent common browser attacks (clickjacking, MIME sniffing, cross-site scripting via CSP). **CORS** tells browsers which domains can read responses — a wildcard lets any site make authenticated requests on behalf of your users. **Rate limiting** prevents credential stuffing on login endpoints. **Body size limit** prevents memory exhaustion from oversized payloads.

### Production Checklist

Security

- [ ] JWT_SECRET is a strong random value (32+ characters)
- [ ] ALLOWED_ORIGIN is set to exact production domain
- [ ] Helmet middleware is added before all routes
- [ ] Reate liiting is active on auth routes
- [ ] No secrets or credentials in git history

Configuration

- [ ] NODE_ENV=production is set in hosting platform
- [ ] LOG_LEVEL=warn and PRETTY_LOGS=false
- [ ] DATABASE_URL points to production database
- [ ] All required env var pass startup validation
- [ ] .env is in ,gitignore and.env.example is comitted

Reliability

- [ ] GET /health returns 200 and verifies DB connection
- [ ] All tests pass on the production build
- [ ] npm run build completes with no Typescript errors
- [ ] Request body size limit is set

Cleanup

- [ ] console.log statements replaces with structured logging
- [ ] No TODO on placeholder code remains in critical paths

### Running a pre-deployment audit with claude

Ask Claude to auti it. 

```markdown
> Perform a production readiness audit of this codebase.
  Read the following files:
  @server/src/index.ts
  @server/src/routes/
  @server/src/middleware/
  @server/src/services/
  @.env.example
  Check for and report on:
  1. Any route that is missing authentication middleware
  2. Any place where process.env values are used without
     a fallback check or startup validation
  3. Any console.log statements that should be replaced
     with structured logging
  4. Any error handler that exposes stack traces to clients
  5. Any hardcoded values that should be environment variables
  Do not fix anything yet. List the issues first so I can
  review and prioritize before you make changes.
```

### Healthchecks and startup validation

```typescript
// server/src/config.ts — validate required env vars at startup
const REQUIRED_VARS = [
  'DATABASE_URL',
  'JWT_SECRET',
  'ANTHROPIC_API_KEY',
  'ALLOWED_ORIGIN',
];

export function validateConfig() {
  const missing = REQUIRED_VARS.filter(v => !process.env[v]);
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    process.exit(1);  ← fail fast, do not start with broken config
  }
}

// server/src/routes/health.ts — what deployment platforms poll
router.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;  ← verify DB is reachable
    res.json({ status: 'ok', db: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', db: 'unreachable' });
  }
});

// server/src/index.ts — call validateConfig before listening
validateConfig();
app.listen(port, () => console.log(`Server running on port ${port}`));
```

## Using Claude to analyze your logs

Three log analysis prompt patterns

Pattern 1 — Incident investigation

"I am seeing 503 errors from 14:30 to 14:45 UTC today. Here are the server logs from that window: [paste logs]. What sequence of events led to the 503s and what is the most likely root cause?"

Pattern 2 — Pattern detection

"Here are the last 200 error logs from the past week: [paste logs]. Group them by root cause and tell me which error type is occurring most frequently and at what times."

Pattern 3 — Proactive review

"Here are the warning-level logs from the past 24 hours: [paste logs]. What patterns do you see that might indicate a problem before it becomes an error? Flag anything that looks like degraded performance or unusual behavior."

> A structured error log is only useful if it contains: **timestamp** (exact time the error occurred), **level** (error, warn, fatal), **requestId** (to trace the full request sequence), **userId** (who was affected, if known), and **err** (the error message and stack trace). Without all five, logs answer fewer questions than they should.

## Post-production fix

```markdown
# 1. Start a fresh session oriented to the bug
> Production bug — PATCH /tickets/:id/status returns 500
  when the ticket status is already RESOLVED.
  Sentry event ID: abc-123. Stack trace:
  Error: Cannot transition from RESOLVED to RESOLVED
    at validateTransition (src/services/ticketService.ts:78)
  Read @src/services/ticketService.ts.
  Do not change anything yet. Explain the root cause.

# Claude reads the file and identifies the missing guard
Root cause: validateTransition throws when from === to.
Fix needed: return early if status is already the target value.
Affected: only PATCH /status with identical current and target status.

# 2. Write the failing test first
> Write a test that reproduces this exact case:
  PATCH /tickets/:id/status with status=RESOLVED
  on a ticket already in RESOLVED status should return
  200 (idempotent), not 500. Put it in tickets.test.ts.

# 3. Apply the fix after the test is written
> Now apply the fix in ticketService.ts. If the ticket
  is already in the target status, return early with
  the existing ticket — do not throw. Run all tests.

✓ Tests: 28/28 passing  ← including the new regression test
```

## When to use Claude

### Four situations on when to use

✓ Category 1 — Boilerplate and repetitive patterns

CRUD routes, form validation, migration files, test fixtures, TypeScript interfaces from a JSON schema, Docker configurations. Tasks you have done dozens of times and where the pattern is consistent. Claude has seen thousands of these and produces them faster than you can type them — and just as accurately.

✓ Category 2 — Exploration and explanation

Understanding an unfamiliar codebase, explaining what a complex function does, comparing two approaches before choosing one. Claude can read and summarize code faster than you can, and it can hold more context simultaneously. Use it as a thinking partner when you need to orient yourself quickly.

✓ Category 3 — Well-specified additions to existing patterns

Adding a new route that follows the existing route pattern, extracting a hook that follows the existing hook pattern, writing a test that follows the existing test structure. When a pattern already exists in your codebase and you want Claude to replicate it, the output is consistently high quality because Claude has a concrete reference to anchor to.

✓ Category 4 — Multi-step automation

Tasks that involve reading many files, running commands, and making coordinated changes across the codebase. This is where the agent loop earns its keep. The cognitive load of a 12-file refactor is enormous for a human. For Claude, coordinating multiple reads and writes in sequence is routine.

### Five situations where your better off without it

🚫 **Security-critical cryptography and auth primitives**

Do not ask Claude to implement bcrypt alternatives, custom token schemes, or novel auth flows. Use battle-tested libraries. Claude knows the libraries well — have it configure them, not reinvent them.

🚫 **Problems you have not yet defined clearly**

If you cannot write a one-sentence description of what the code should do, Claude cannot either — it will invent a plausible interpretation. Define the problem yourself first, then bring Claude in for implementation.

🚫 **Novel algorithms that require deep domain knowledge**

A real-time collision detection algorithm for your specific game physics, a novel graph traversal optimized for your data shape, a machine learning architecture for your particular dataset. These require thinking that Claude does not have context for. Use Claude to implement once you have designed.

🚫 **Small tasks that take longer to describe than to do**

Renaming a single variable, fixing a typo in a string, adding one line to a config file. Writing a quality prompt for these tasks takes more time than just doing them. Reach for Claude when the task would take you five-plus minutes manually.

🚫 **Tasks where you need to deeply understand the result**

If this is a core part of your system that you will be maintaining and extending for years, implementing it yourself teaches you something Claude cannot. The five hours of manual implementation is also five hours of understanding that compounds over time

### What belongs to you

**System architecture decisions.** Which services should exist, how they communicate, what the data flow is. These decisions compound across the entire lifetime of a product. Own them.

**Understanding the domain.** What your users actually need, what the business model requires, what makes a feature worth building at all. Claude has no context for any of this.

**Security threat modeling.** What are the ways a feature could be misused? What happens when an attacker controls an input? This thinking requires adversarial creativity Claude does not naturally apply.

**Code review judgment.** Is this the right abstraction? Does this fit the codebase? Will this make sense to the next developer? These are taste questions. Taste develops through deliberate practice, not delegation

> Use Claude Code to remove the mechanical overhead from coding — the boilerplate, the repetition, the multi-file coordination — so you have more energy and time for the thinking that only you can do. The goal is not to think less. It is to think about more important things.

## Reorientation Prompt

> Keep a text file with this template and fill it in at the start of each session: _"We are building [project]. Completed so far: [features done]. Today's goal: [single goal]. Please read [file references] to orient yourself. Do not start building yet — confirm your understanding of the goal first."_ The last sentence is the most important: it prevents Claude from immediately starting to code before it has confirmed what you want

## Daily workflow

```markdown
## Claude Code Daily Workflow

### Session Start (~4 min)
1. Read CLAUDE.md — correct anything that drifted since last session
2. Run /context — start fresh or check existing context level
3. Send re-orientation prompt with: what is done, today's goal, file refs
4. One goal per session — if you have three, pick one

### During the Session
- Every slice: read diff → type-check → verify manually → commit
- Every 45 min: check /context — compact at 55%, not 80%
- Drift signal (wrong imports, ignored constraints): correct + compact
- After every fix: "What was the root cause — fix or mask?"
- Every prompt: specific action verb + at least one constraint

### Session End (~5 min)
1. Commit everything that passes — no uncommitted working tree overnight
2. Update CLAUDE.md if any architecture or convention changed
3. Write tomorrow's start prompt now while context is fresh

### Weekly
Mon: Full test suite + CLAUDE.md review
Wed: npm audit + security review of new routes
Fri: Code quality review — identify (do not fix yet)
Pre-deploy: Production readiness checklist (Lesson 4.1)

### The Eight Habit Reminders
1. One feature per session. One commit per slice.
2. Root cause check after every fix.
3. Every prompt has a verb and a constraint.
4. Commit before the next slice.
5. CLAUDE.md updated at session end if anything changed.
6. Tests are part of the slice, not an afterthought.
7. Compact at 55%, not 80%.
8. Security review on every auth and mutation route.
```