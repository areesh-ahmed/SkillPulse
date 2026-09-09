# SkillPulse — PR Distribution Plan

**Event:** Smart India Hackathon 2026 · **Problem Statement:** 26135 · **Team:** Hacksmiths
**Timeline:** 2-day build · **Priority:** working MVP over feature completeness

This file is written to be pasted directly into a coding agent (Claude Code or similar) — one PR block per session. Each block is self-contained: paste the **Shared Context** once at the start of a session, then the specific PR block.

---

## Shared Context — paste this before every PR

```
You are working on SkillPulse, an SIH 2026 project for Problem Statement 26135
(longitudinal skilling-outcomes tracking for the Government of Maharashtra).

Tech Stack:
- Backend: Node.js + Express.js
- API: REST APIs, consistent response format
- Authentication: JWT
- Database: MongoDB + Mongoose
- Frontend: React.js + Tailwind CSS + Recharts (built separately, not in this PR)
- AI/Analytics: Python + FastAPI + ML/NLP models (integration surface only in these PRs)

Ground rules:
- We have very limited development time. Build a clean, practical MVP.
  Do NOT over-engineer, do NOT add abstractions we don't need yet.
- Where a real external integration is unavailable (SMS/WhatsApp gateway,
  government data feeds), use a mock/sample integration with the same interface
  so it can be swapped later.
- Document every endpoint / aggregation in the PR description with a
  request/response example.
- Use only synthetic data — never real personal information.
```

---

## Team Split

| Owner | Track | PRs | Depends on |
|---|---|---|---|
| Person 1 | Backend | PR #1, PR #2 | PR #3 schema (coordinate early) |
| Person 2 | Database | PR #3, PR #4 | — (unblocks Person 1) |

**Suggested order:** Start PR #3 and PR #1 in parallel — Person 1 builds against draft Mongoose models while Person 2 finalizes them, then Person 1 swaps in the real models once ready. PR #2 and PR #4 both start once PR #1/#3 are stable, and should sync on the analytics data shape before either is far along.

---

## PR #1 — Backend Core + Authentication + Trainee/Training

**Owner:** Person 1 (Backend) · **Branch:** `feature/backend-core-auth-training`
**Depends on:** draft Mongoose models from PR #3 (don't block on final schema — coordinate and adjust)

### Prompt for the agent

```
Create PR #1: "Backend Core + Authentication + Training APIs"

Implement the complete backend foundation:

1. Project structure
   - Express server, environment configuration, MongoDB connection
   - Error handling middleware, CORS, request validation
   - Consistent API response format

2. Authentication & RBAC
   - JWT authentication, password hashing, login/register
   - Protected routes, role-based access control
   - Roles: trainee, employer, training_provider, government

3. Trainee APIs
   - Create / get / update / list / search trainees
   - Trainee profile: education, district, contact info, consent status

4. Training & certification APIs
   - Training providers, courses, course enrollment
   - Training history, attendance, assessment, certification

5. Consent management
   - Store trainee consent status, timestamp, purpose
   - Allow consent withdrawal

6. API documentation
   - Document every endpoint with request/response examples and auth requirements

7. Basic validation and security best practices.

Coordinate with the database developer — use their MongoDB/Mongoose models
rather than creating duplicate schemas.

Expected result: a user can register/login, receive a JWT, create a trainee,
enroll them in a course, record training/certification info, and manage consent.
Keep it simple enough to integrate with the React frontend quickly.
```

### Definition of Done
- [ ] Register/login issues a valid JWT; protected routes reject missing/invalid tokens
- [ ] All 4 roles enforced via RBAC middleware, tested against at least one restricted route each
- [ ] Trainee CRUD + search working against real Mongoose models (not mocks)
- [ ] Enrollment → attendance → assessment → certification chain works end-to-end for one trainee
- [ ] Consent can be granted and withdrawn, with timestamp stored on both actions
- [ ] Every endpoint documented with a request/response example

---

## PR #2 — Employment + Follow-up + Verification + Analytics + AI Integration

**Owner:** Person 1 (Backend) · **Branch:** `feature/employment-outcome-intelligence`
**Depends on:** PR #1 merged; analytics data shape agreed with Person 2 (PR #4)

### Prompt for the agent

```
Continue the SkillPulse SIH 2026 project. Create PR #2:
"Employment Tracking + Outcome Intelligence APIs"

Build all remaining backend functionality required for the MVP.

1. Employment tracking
   APIs for: job role, employer, joining date, current employment status,
   salary, employment type, job relevance to training, self-employment,
   apprenticeship, unemployed/seeking status.

2. Longitudinal follow-ups
   - Schedule follow-ups, store follow-up attempts and trainee responses
   - Track 3/6/12-month outcomes
   - Record reasons for unemployment/attrition, track job changes

3. Employer verification
   - Verification requests, employer confirmation/rejection
   - Verification status, verification evidence/signals, outcome confidence score

4. Analytics APIs
   Aggregation endpoints for: overall employment rate, placement rate,
   3/6/12-month retention, median salary, wage progression, training-to-job
   relevance, self-employment rate, apprenticeship rate, attrition reasons,
   provider performance, course performance, district performance,
   demographic/cohort analytics.

5. Skill-gap API integration
   Endpoints that send course skills + employer-required skills to the
   Python FastAPI AI service, receive identified skill gaps, store results,
   return recommendations to the frontend.

6. AI/ML integration
   Clean service layer for the FastAPI models to plug into later:
   employment probability, attrition probability, skill-gap detection,
   outcome classification, AI-generated insights.

7. Government dashboard API
   A single endpoint returning the KPIs and analytics the React dashboard needs.

8. Security (RBAC)
   - Trainees access their own records only
   - Employers access relevant verification records only
   - Providers access their own cohorts only
   - Government users access aggregated statewide/district/provider analytics

Do NOT build a separate job portal. Focus on making the complete
Training → Employment → Follow-up → Verification → Analytics pipeline
work end-to-end. Use mock external integrations where real
government/WhatsApp/SMS APIs are unavailable.
```

### Definition of Done
- [ ] One trainee record can move through employment → follow-up → verification and show up correctly in analytics
- [ ] Skill-gap endpoint returns a real (even if rule-based) result on seeded data — not a stub
- [ ] Single dashboard endpoint returns everything the frontend needs in one call
- [ ] RBAC verified for all 4 roles against at least one restricted analytics route each
- [ ] Every mocked external integration documented as mocked in the PR description

---

## PR #3 — Complete Database Schema + Seed Data

**Owner:** Person 2 (Database) · **Branch:** `feature/db-schema-seed-data`
**Depends on:** none — this unblocks PR #1, start immediately

### Prompt for the agent

```
You are the Database Engineer for SkillPulse, an SIH 2026 project for
Problem Statement 26135. Build a practical MVP database — do NOT over-engineer.

Create PR #3: "Database Architecture + Core Schemas + Seed Data"

Required collections/models:
1. Users — authentication, role, profile
2. Trainees — profile, education, district, contact, consent status,
   unified SkillPulse trainee identifier
3. Training Providers — info, location, courses
4. Courses — info, sector, duration, curriculum, skills taught
5. Enrollments — trainee, course, provider, enrollment date, attendance,
   assessment, completion, certification
6. Skills — name, category, level
7. Employers — info, industry, location
8. Employment Records — trainee, employer, job role, salary, joining date,
   status, employment type, training relevance
9. Wage History — trainee, employment record, salary, date
10. Follow-ups — trainee, scheduled date, channel, response, employment
    status, reason for unemployment/attrition
11. Employer Verification — employment record, employer, verification
    status, signals, confidence score
12. Skill Requirements — employer, job role, required skills
13. Skill Gaps — course, required skill, available skill, gap score,
    recommendation
14. Outcomes — employment, retention, wage progression, relevance,
    outcome score
15. Consents — trainee, consent type, purpose, timestamp, status

Requirements:
- Proper references between collections
- Indexes for district, course, provider, employer, trainee searches
- Validation rules, createdAt/updatedAt timestamps
- Avoid storing unnecessary sensitive information; use privacy-conscious identifiers
- Include an ER/data relationship diagram in the PR description

Synthetic seed data (no real personal information):
- 100+ trainees across multiple Maharashtra districts
- Multiple training providers, courses, skills
- Employers, employment records, follow-up records, wage history
- Skill requirements, skill-gap examples, verification records

Seed data must be rich enough for the dashboard to demonstrate employment,
retention, wage progression, district comparison, and skill-gap analytics.
```

### Definition of Done
- [ ] All 15 collections created with references, validation, and indexes
- [ ] ER diagram included in the PR description
- [ ] Seed script runs cleanly and produces 100+ trainees with varied outcomes (not all identical)
- [ ] Seed data spans 3+ districts, 3+ courses, mixed employment/self-employment/unemployed status
- [ ] Person 1 confirms the models cover every field PR #1/#2 need before this is called done

---

## PR #4 — Analytics + Skill Gap + Dashboard Queries

**Owner:** Person 2 (Database) · **Branch:** `feature/analytics-data-layer`
**Depends on:** PR #3 merged (needs real seed data to validate against)

### Prompt for the agent

```
Continue the SkillPulse SIH 2026 database work. Create PR #4:
"Analytics + Skill Gap + Outcome Intelligence Data Layer"

Using the existing schemas, implement the complete data/analytics layer
the government dashboard needs. Build reusable MongoDB aggregation
pipelines/services for:

1. Employment analytics — totals, certified, employed, employment rate,
   placement rate, self-employment rate, apprenticeship rate, unemployment rate
2. Retention analytics — 3/6/12-month retention, attrition rate, job-switch rate
3. Wage analytics — median/average salary, by course, by district,
   progression over time, wage growth %
4. Training relevance — % in jobs related to training, course-to-job
   relevance, skill utilization
5. Provider analytics — placement rate, retention rate, wage outcomes,
   overall outcome score
6. Course analytics — completion, certification, employment, retention,
   wage growth, relevance
7. District analytics (Maharashtra) — trainee count, employment, retention,
   wage, attrition, top courses, skill gaps
8. Attrition analysis — categorize reasons: low salary, skill mismatch,
   relocation, better opportunity, work environment, personal, other
9. Skill-gap analytics — compare course skills vs. employer-required
   skills; calculate missing skills, demand frequency, gap score,
   affected courses/districts
10. Outcome/Impact Score — transparent, explainable, configurable formula
    using employment, retention, wage progression, relevance, verification
11. Government dashboard data — single service returning KPI cards,
    district data, course/provider performance, retention chart data,
    wage progression, skill-gap data, attrition reasons, AI-insight input
12. AI-ready data — clean structured queries for the FastAPI service:
    skill-gap detection, employment prediction, attrition prediction,
    natural-language insight generation

Use only synthetic data. Optimize enough for a working prototype — do not
spend time on premature optimization. Document every important
aggregation/service with sample API output in the PR description.

The final result must let the frontend team build the SkillPulse
government dashboard directly from these analytics with no further backend work.
```

### Definition of Done
- [ ] All 12 aggregation groups return real numbers against the PR #3 seed data
- [ ] District and course breakdowns show meaningfully different values (not flat/identical across all rows)
- [ ] Outcome/Impact Score formula documented in plain language in the PR description
- [ ] Single dashboard service returns everything the frontend needs in one call
- [ ] Sample output for each aggregation included in the PR description

---

## Coordination Checkpoints

| When | Sync on |
|---|---|
| Before starting PR #1 | Person 1 + Person 2 agree on draft field names for Trainee/Enrollment/Employment |
| Mid-Day 1 | PR #3 core schemas mergeable; PR #1 auth + trainee CRUD working against them |
| Start of PR #2 / PR #4 | Agree on the exact JSON shape of the government dashboard endpoint, so both sides build to the same contract |
| End of Day 1 | One trainee record provably flows through: register → enroll → certify → employ → follow-up, in the database, callable via API |
| Day 2 | Both PRs' analytics outputs feed the frontend dashboard without further backend changes |
