<div align="center">

<br/><br/>

<h1>🚀 SkillPulse</h1>

<p><strong>A consent-based, longitudinal outcome tracking system for skilling programs — built for the Government of Maharashtra.</strong></p>

<br/>

<img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Team-Hacksmiths-success.svg" />
<img src="https://img.shields.io/badge/Event-SIH%202026-blue.svg" />

<br/><br/>

</div>

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution Design](#solution-design)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Design Decisions](#key-design-decisions)
- [Environment Configuration](#environment-configuration)
- [Running Locally & Setup](#running-locally--setup)
- [Testing & Data Seeding](#testing--data-seeding)
- [Implementation Status](#implementation-status)
- [API Reference](#api-reference)
- [Security Hardening & Privacy](#security-hardening--privacy)
- [Contributors](#contributors)

---

## Problem Statement

**Problem Statement ID: 26135** | **Organization:** Government of Maharashtra

Current training systems reliably capture enrolment, attendance, assessment, and certification—but fundamentally fail to track long-term outcomes like employment retention, wage progression, and career mobility. Without longitudinal outcome data, assessing the true public value and ROI of skilling investments is nearly impossible.

**SkillPulse** aims to solve this by building a credible, low-burden, privacy-conscious tracking system that tracks a trainee's outcomes over time and turns that raw data into actionable insights for policymakers.

---

## Solution Design

The core insight driving the SkillPulse architecture is **minimizing friction for all stakeholders** while maintaining strict **data privacy**:

- **Frictionless Employer Verification**: Employers can verify employment status without complex onboarding.
- **Unified Longitudinal Identity**: A single data structure follows the trainee across multiple courses and employment events over years, preserving macro-analytics integrity.
- **AI-Driven Skill Gap Analysis (Prototype)**: A Node.js module simulates AI-driven analysis to calculate the delta between course curriculums and employer-required skills, serving as a foundation for future integration of true machine learning models.
- **Privacy First**: Explicit opt-in consent for trainees, with the ability to manage data privacy while retaining anonymized macro-level data for government dashboards.

---

## System Architecture

### 1. High-Level Architecture
```mermaid
flowchart TD
    subgraph Frontend Clients
        DASH[React Analytics Dashboard\nPolicymakers]
        PORTAL[React Provider Portal\nTraining Providers]
        EMP[Employer UI]
    end

    subgraph Backend Core (Node.js)
        API[Express REST API]
        AUTH[JWT Authentication & RBAC]
        AGG[MongoDB Aggregation Service]
        AI[Mock AI/Intelligence Service]
    end

    DASH --> API
    PORTAL --> API
    EMP --> API

    API --> AUTH
    API --> AGG
    API <--> AI

    AGG --> DB[(MongoDB\nPrimary Database)]
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Backend Framework | Node.js + Express.js | High-throughput REST API and authentication |
| Frontend | React.js (v19) + Tailwind CSS | Interactive UIs for Providers and Government |
| Data Visualization| Recharts | Dynamic, aggregated dashboard charts |
| Database | MongoDB + Mongoose | Flexible document storage for complex longitudinal records |
| AI/Intelligence | Node.js Mock Services | Skill-gap analysis prototype using synthesized logical rules |
| Auth | Custom JWT (HS256) | Role-Based Access Control (RBAC) |

---

## Project Structure

```text
skillpulse/
|
+-- backend/
|   +-- src/
|   |   +-- controllers/     # Route logic (Auth, Trainee, Analytics, AI)
|   |   +-- models/          # Mongoose Schemas (Trainee, Course, Employment, SkillGap, etc.)
|   |   +-- routes/          # Express route definitions
|   |   +-- middlewares/     # JWT verification, RBAC, Error handling
|   |   +-- services/        # Business logic, Mock AI methods & MongoDB aggregations
|   |   +-- scripts/         # Database seeders (seed.js)
|   +-- .env                 # Backend configuration
|   +-- package.json         # Node.js dependencies
|
+-- frontend/
|   +-- src/
|   |   +-- components/      # Reusable React components
|   |   +-- pages/           # Dashboard, Provider Portal, etc.
|   |   +-- services/        # API clients
|   +-- tailwind.config.js
|   +-- package.json         # React dependencies
|
+-- README.md
```

---

## Key Design Decisions

**Why MongoDB instead of a Relational Database?**
Skilling outcomes are highly variable. A trainee might have multiple overlapping courses, self-employment records, standard employment, and apprenticeship records. MongoDB's document model allows us to store an array of structured outcome events within a single unified Trainee document (or tightly related collections), making longitudinal queries significantly faster than complex SQL joins.

**Why Rule-Based Fallbacks for the MVP instead of true Machine Learning?**
Given the 48-hour SIH build constraint, deploying true predictive ML models immediately is high-risk. The architecture is designed to use simple mock rule-based heuristics initially for detecting skill gaps and employment probabilities, simulating an AI service entirely within Node.js. These can seamlessly be swapped with dedicated AI microservices later.

---

## Environment Configuration

Create a `.env` file in the `backend/` directory and configure the following:

| Environment Variable | Description | Default Value |
|---|---|---|
| `PORT` | Local server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/skillpulse` |
| `JWT_SECRET` | Secret for signing auth tokens | *None (Required)* |
| `JWT_EXPIRE` | Expiry duration for JWT tokens | `30d` |

*(Note: The frontend also requires configuration pointing to the backend API, typically through Vite configuration or a `.env` file).*

---

## Running Locally & Setup

### 1. Database Setup
Ensure MongoDB is installed and running locally on port `27017`, or provision a cloud MongoDB Atlas cluster and update the `MONGO_URI`.

### 2. Backend (Node.js)
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

---

## Testing & Data Seeding

- **Database Seeding**: A robust `seed.js` script inside `backend/src/scripts/` generates synthetic records across multiple collections (Outcome, WageHistory, Skill Requirement, Trainees, etc.). This allows us to simulate and test real-world dashboard aggregations without exposing real Personally Identifiable Information (PII).

---

## Implementation Status

**Fully Implemented:**
- **Authentication & RBAC:** JWT-based login for multiple roles (government, training_provider, employer).
- **Trainee & Course Management:** Registration of trainees and enrollments.
- **Longitudinal Tracking:** Database models and routes for tracking wage history, employment outcomes, and follow-ups.
- **Consent Management:** Schema and endpoints for tracking trainee opt-ins for data processing.
- **Aggregated Analytics:** MongoDB aggregations powering the dashboard.

**Partially Implemented / Prototype Features:**
- **Employer Verification:** Basic CRUD logic for verification workflows (no actual automated email/SMS dispatching implemented yet).
- **Skill-Gap Analysis:** Mapped via rule-based simulations in `aiService.js` (no real NLP/Python model).
- **Employment Prediction:** Simulates probability scoring using randomized heuristics in Node.js.

---

## API Reference

### Authentication
*Note: Endpoints requiring Auth expect the `Authorization: Bearer <token>` header.*

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticates user and returns JWT. |
| `POST` | `/api/auth/register` | Registers a new user. |

### Core Entities
| Method | Endpoint | Description |
|---|---|---|
| `GET/POST` | `/api/trainees` | Manage trainees. |
| `GET/POST` | `/api/training` | Manage courses and enrollments. |
| `GET/POST` | `/api/employment` | Manage employment records. |
| `GET` | `/api/verification/pending` | Fetch pending employer verifications. |
| `PUT` | `/api/verification/:id` | Process an employer verification. |
| `GET/POST` | `/api/consent` | Manage trainee consent records. |
| `GET/POST` | `/api/followup` | Manage follow-up assessments. |

### Outcome Intelligence & Analytics
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/analytics/government`| Returns aggregated KPIs for the dashboard. |
| `POST` | `/api/ai/skill-gap` | Calls mock AI service to identify delta in required vs taught skills. |
| `POST` | `/api/ai/predict-employment`| Calls mock AI service to predict employment probability. |

---

## Security Hardening & Privacy

- **Consent Architecture**: Schema supports explicit consent tracking.
- **Strict RBAC Middleware**: Routes are protected by Role-Based Access Control logic within Express.
- **Data Validation**: Express backend implements structured error handling and validation logic.

---

## Contributors

<div align="center">

*SkillPulse — Team Hacksmiths*

</div>

| Name | Role / Focus | GitHub |
|---|---|---|
| Areesh Ahmed | Full-Stack & Integration | [@areesh-ahmed](https://github.com/areesh-ahmed) |
| Vedant Shukla | Backend & Database | [@vedantshukla](https://github.com/vedantshukla) |
| Yashita Naik | Frontend & UI/UX | [@yashitanaik](https://github.com/yashitanaik) |
| Ziyan Shailk | Analytics & ML | [@ziyanshailk](https://github.com/ziyanshailk) |
| Sami Patel | Cloud & Security | [@samipatel](https://github.com/samipatel) |

<div align="center">
  <br/>
  <i>Built with ❤️ for Smart India Hackathon 2026</i>
</div>
