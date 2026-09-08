<div align="center">
  <h1>🚀 SkillPulse</h1>
  <p><b>Smart India Hackathon 2026 Submission</b></p>
  <p><i>A consent-based, longitudinal outcome tracking system for skilling programs.</i></p>
  
  [![Hackathon](https://img.shields.io/badge/Event-SIH_2026-blue.svg)](#)
  [![Status](https://img.shields.io/badge/Status-MVP_Development-orange.svg)](#)
  [![Team](https://img.shields.io/badge/Team-Hacksmiths-success.svg)](#)
</div>

<hr />

## 📖 Table of Contents
- [🎯 Problem & Objective](#-problem--objective)
- [👥 User Personas](#-user-personas)
- [⚡ MVP Scope & Technical Fallbacks](#-mvp-scope--technical-fallbacks)
- [📝 User Stories & Acceptance Criteria](#-user-stories--acceptance-criteria)
- [🛡️ Edge Cases & Handling](#️-edge-cases--handling)
- [⚠️ Risk Register](#️-risk-register)

---

## 🎯 Problem & Objective

**Problem Statement ID: 26135** | **Organization:** Government of Maharashtra  
Training systems reliably capture enrolment, attendance, assessment, and certification—but fail to track long-term outcomes like employment retention and wage progression. Without longitudinal outcome data, assessing the true public value of skilling investments is nearly impossible.

**Objective:** Build a credible, low-burden, privacy-conscious system that tracks a trainee's outcomes over time—from training to career growth—and turns that data into actionable insights.

---

## 👥 User Personas

| Persona | Role | Goal | Frustration |
| :--- | :--- | :--- | :--- |
| **Rahul** | Trainee | To maintain a verified record of his skills to secure employment without registering on multiple portals. | Changed his phone number recently, lost access to his old training records, and cannot prove his certification. |
| **Priya** | Training Provider | To accurately track and report 6-month placement outcomes to secure future government funding. | Spends hours making manual phone calls to past trainees who don't answer, resulting in "unknown outcomes." |
| **Mr. Sharma** | Govt. Policy Maker | To allocate skilling budgets based on long-term wage progression and retention, not just certifications. | Only receives data on "enrolled" vs. "certified," lacking visibility into actual career impact. |
| **Amit** | SME Employer | To quickly verify a candidate's training credentials before making a hiring decision. | Refuses to create an account on a complex government portal just to click "yes, I hired this person." |

---

## ⚡ MVP Scope & Technical Fallbacks

> [!WARNING]
> **2-Day Build Constraint:** Implementing true ML/NLP models for skill-gap analysis in 48 hours by a small team is highly risky. The following MVP scope prioritizes **Technical Feasibility** to guarantee a working demo.

| Feature | Original Scope | 2-Day MVP Fallback (Build This First) | Judging Criterion Alignment |
| :--- | :--- | :--- | :--- |
| **Skill-Gap Analysis** | Python/FastAPI ML model for predicting attrition. | **Rule-based Flagging (Node.js)**: Simple IF/THEN logic (e.g., `IF cert > 3 months AND placement = false THEN flag = "At Risk"`). | **Technical Feasibility**: Ensures a working, bug-free demo within 48 hours. |
| **Follow-ups** | Real SMS/WhatsApp API integration. | **Simulated Webhooks & Email**: Use a free tier email service or display simulated trigger logs in the UI. | **Innovation**: Proves the architecture of automated triggers without getting blocked by API approvals. |
| **Employer Verification** | Self-service employer portal. | **Magic Links (No-Auth)**: Email sent to employer with a unique, expiring JWT token in the URL for 1-click verification. | **Scalability / Adoption**: Removes friction, ensuring realistic adoption by SMEs. |
| **Analytics** | Real-time multi-dimensional OLAP cubes. | **Static Mock Dashboard (Recharts)**: Hardcoded JSON data to show the UI, wiring up basic MongoDB aggregations only if time permits. | **Social/Economic Impact**: Demonstrates how policymakers will optimize funding. |
| **Trainee Identity** | Complex DEPA consent framework. | **Simple Checkbox + Hash ID**: A unified UUID per trainee with a boolean `consent_granted` flag in MongoDB. | **Privacy/Security**: Demonstrates consent architecture without full protocol overhead. |

---

## 📝 User Stories & Acceptance Criteria (P0)

### 1️⃣ Consent & Longitudinal Registration
**As a** Trainee, **I want** to register and provide explicit consent for data tracking, **so that** my privacy is maintained.
- [x] **AC1:** The registration form requires a mandatory `consent_granted` checkbox.
- [x] **AC2:** The system generates a single, unified UUID for the trainee.
- [x] **AC3:** The backend logs the timestamp and IP address of the consent action.

### 2️⃣ Placement & Outcome Tracking
**As a** Training Provider, **I want** to update a trainee's employment status, **so that** I can report my placement success rate.
- [x] **AC1:** Provider can search for a trainee using their ID or phone number.
- [x] **AC2:** Provider can set status to `Employed`, `Self-Employed`, `Apprenticeship`, or `Unemployed`.
- [x] **AC3:** If `Employed` is selected, fields for `Employer Name`, `Role`, and `Starting Wage` become mandatory.

### 3️⃣ Frictionless Employer Verification
**As an** Employer, **I want** to verify a new hire's employment via a secure link, **so that** I don't have to create an account.
- [x] **AC1:** Triggering a verification sends an email to the employer with a unique URL containing an expiring token.
- [x] **AC2:** Clicking the link opens a public React route displaying the trainee's name, role, and "Confirm" / "Deny" buttons.
- [x] **AC3:** Clicking "Confirm" updates the trainee's `verification_status` to `true` in the database and invalidates the token.

### 4️⃣ Outcome Analytics Dashboard
**As a** Policy Maker, **I want** to view placement rates grouped by training provider, **so that** I can evaluate program effectiveness.
- [x] **AC1:** Dashboard renders a Recharts bar chart showing total certified vs. total placed.
- [x] **AC2:** A dropdown filter allows filtering the chart data by specific training providers.

---

## 🛡️ Edge Cases & Handling

<details>
<summary><b>Trainee ignores automated follow-ups</b></summary>
After 3 failed automated attempts (e.g., no click on SMS link), the system changes the record status to <code>Stale</code>. The Training Provider's dashboard prioritizes Stale records in a "Requires Manual Call" queue.
</details>

<details>
<summary><b>Employer disputes an outcome (Clicks "Deny" on Magic Link)</b></summary>
The trainee's <code>verification_status</code> becomes <code>Disputed</code>. An automated alert is generated for the Training Provider to investigate and manually resolve the discrepancy.
</details>

<details>
<summary><b>Trainee has concurrent or sequential training records</b></summary>
The system enforces a unified longitudinal ID (UUID). New courses or certifications are appended to the <code>training_history</code> array within the existing document, preventing duplicate profiles.
</details>

<details>
<summary><b>Trainee revokes consent</b></summary>
UI provides a "Revoke Consent" button. Backend nullifies PII (name, phone) but retains anonymized outcome data (e.g., "Trainee X completed Course Y and was Placed") to preserve macro-analytics integrity.
</details>

---

## ⚠️ Risk Register

| Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Contact Data Decay:** Trainees change phone numbers, breaking the automated follow-up loop. | High | High | Require an alternate contact method (e.g., family member's phone number or WhatsApp) during initial registration. |
| **Magic Link Abuse:** Employer verification links are forwarded or clicked maliciously. | Medium | High | Embed a 48-hour expiration in the JWT payload. Log the IP and User-Agent upon click to audit suspicious activity. |
| **Time Crunch on Dashboard:** Complex D3/Recharts integrations consume too much development time. | High | High | Build the dashboard UI using hardcoded JSON fixtures on Day 1. Only connect real endpoints if all P0 features are stable. |
| **Provider Data Entry Fatigue:** Training providers fail to input placement data due to complex forms. | Medium | Medium | Implement bulk CSV upload for placements on the backend, or keep the UI form to a strict maximum of 4 essential fields. |

---
<div align="center">
  <i>Built with ❤️ by Hacksmiths for SIH 2026</i>
</div>
