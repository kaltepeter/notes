---
title: FEM Enterprise Architecture Patterns
date: 2022-02-12
tags:
- workshop
- front-end-masters
---

## Course Info

- https://frontendmasters.com/courses/enterprise-patterns/
- https://github.com/onehungrymind/fem-enterprise-patterns

## Complexity

- https://moss.cs.iit.edu/cs100/papers/out-of-the-tar-pit.pdf

The Iron Triangle
- State
- Code Volume
- Flow Control

### State

- Shared mutable state is incredibly dangerous

**Solution**: Refactor Methods to depend on inputs and outputs only. i.e. pure functions

### Flow Control

- Air traffic control or sequencing methods does not violate SRP, they control flow or coordinate/delegate

### Axis of Evil

It's impossible to write good tests for bad code

- Hidden State
- Violating the SRP
- Nested logic

#### Fixes

- dependency injection
- extract to function

## Four Elements of Programming

- Data structures
- Functions
- Conditionals
- Repeating via Iteration

## Data Structures

- Objects are nouns
- Methods are verbs

## Redux Pattern

- https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867

- Imutable data is key
- Slice your state

## Time Management

The fifth element of programming.

- https://frontendmasters.com/courses/asynchronous-javascript/

### Obserable Streams

Encapsulate, transport and transform data from user interactions.

If you are transforming in the subscribe, you are doing wrong. Use the observable to transform to the shape you need.

Combines the Iterator pattern and Observer pattern.


## Angular Courses

- https://frontendmasters.com/courses/production-angular/