---
title: Google Associate Cloud Engineer Certification (GCP-ACE) with 10 Practice Exams
date: 2026-03-04
tags:
- cloud
- course
- mammoth-interactive
---

https://mammothclub.com/course-learn/google-associate-cloud-engineer-certification-gcp-ace-with-10-practice-exams/

GCloud launced in April 2008 and provides IaaS, SaaS, FaaS

## Basics

`IaaS`: Infrastructure as a Service. e.g. Compute, Storage, Network

`PaaS`: Platform as a Service. e.g. Application development & deployment, Serverless

`SaaS`: Software as a Service. e.g. Email, Docs, App Stream

## GCP Signup

### GCP Free Tier

- 90 days free trial with $300 credit to use with 20+ GCP services
- Always free, limited access to common resources
    - App Engine (1 GB of egress per day)
    - Google Cloud Firestore (1 GB storage)
    - Google Compute Engine (no windows vm)
    - Google Cloud Storage (5 GB-months of regional storage, US only)
    - Goolge Cloud Pub/Sub (10 GB of messages per month)
    - Goolge Cloud Functions and much more

### Freemium

- use budgets and alerts

## Projects and Billing

### Project

Projects are the basis for creating, enabling, and using GCP services including managing APIs, enabling billing, adding and removing collaborators, and managing permissions for GCP resources.

- Logical unit that encompasses resources
- Associated with accounts and accounts with organizations
- Each project can be thought of as a combination of Resources + Settings + Metadata
- Associated with or defined by the name, ID, and number
- Project ID is unique and permenant. Contains the project name. Unique across GCP globally
- Associated to billing accounts, can only have one billing account. Billing accounts can have many projects.
- All projects and billing accounts can be linked to a single organization, like a root node
- Organization ID is a unique identifier for an organization and is automatically created
- Organizations can have folder, projects and resources

### Billing

- Setup alerts for budgets 
- Setup spending caps
- Project level can have it's own budgets
- Setup budgets requires billing administrator role
- Helps with controlling costs
- Alerts: amount or previous months spend
- Alerts can be email or SMS
- 

Two types: 

self-serve

- Direct to credit, debit or ACH
- Costs are charged automatically
- You can signup online

Invoiced

- Payment can be check or wire transfer
- sent by mail or electronically
- must be elligible

Cycle

- Monthly: charged on regular monthly cycle
- Threshold: charged when a defined limit is hit
- Invoiced are always monthly
- Self-serve can be either

- Billing sub-accounts allows user to group charges from projects together on a separate section of the invoice
- Master billing must be on the invoiced billing

## Cloud Services

