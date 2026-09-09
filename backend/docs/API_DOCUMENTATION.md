# SkillPulse API Documentation

Base URL: `/api`

## Authentication

### Register a User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth required**: No
- **Payload**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "trainee" // 'trainee', 'employer', 'training_provider', 'government'
  }
  ```
- **Success Response**:
  ```json
  {
    "statusCode": 201,
    "data": {
      "_id": "64f1...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "trainee",
      "token": "eyJhb..."
    },
    "message": "User registered successfully",
    "success": true
  }
  ```

### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth required**: No
- **Payload**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: Same as register but `statusCode: 200` and message `Login successful`.

## Trainees

### Create Trainee Profile
- **URL**: `/trainees`
- **Method**: `POST`
- **Auth required**: Yes (`trainee` role only)
- **Payload**:
  ```json
  {
    "educationLevel": "12th Pass",
    "district": "Pune",
    "contactNumber": "9876543210",
    "dateOfBirth": "2000-01-01"
  }
  ```
- **Success Response**: Returns created profile (status 201).

### Get Current Trainee Profile
- **URL**: `/trainees/me`
- **Method**: `GET`
- **Auth required**: Yes (`trainee` role only)
- **Success Response**: Returns populated trainee profile (status 200).

### Get All Trainees (Search)
- **URL**: `/trainees?district=Pune&educationLevel=12th%20Pass`
- **Method**: `GET`
- **Auth required**: Yes (`government`, `training_provider`, `employer`)
- **Success Response**: Returns array of trainee profiles matching filters (status 200).

## Training & Certification

### Create Training Provider Profile
- **URL**: `/training/provider`
- **Method**: `POST`
- **Auth required**: Yes (`training_provider` role only)
- **Payload**:
  ```json
  {
    "organizationName": "SkillHub India",
    "registrationNumber": "REG12345",
    "address": {
      "district": "Mumbai",
      "city": "Andheri"
    }
  }
  ```
- **Success Response**: Returns provider profile (status 201).

### Create Course
- **URL**: `/training/courses`
- **Method**: `POST`
- **Auth required**: Yes (`training_provider` role only)
- **Payload**:
  ```json
  {
    "title": "Full Stack Web Development",
    "sector": "IT",
    "durationHours": 120,
    "description": "Learn MERN stack",
    "curriculum": ["HTML", "CSS", "React", "Node"]
  }
  ```
- **Success Response**: Returns created course (status 201).

### Enroll in Course
- **URL**: `/training/enroll`
- **Method**: `POST`
- **Auth required**: Yes (`trainee` role only)
- **Payload**:
  ```json
  {
    "courseId": "64f2..."
  }
  ```
- **Success Response**: Returns enrollment details (status 201).

### Update Enrollment (Attendance & Certification)
- **URL**: `/training/enrollments/:id`
- **Method**: `PUT`
- **Auth required**: Yes (`training_provider` role only)
- **Payload**:
  ```json
  {
    "status": "completed",
    "attendancePercentage": 95,
    "assessmentScore": 88,
    "isCertified": true
  }
  ```
- **Success Response**: Returns updated enrollment (status 200).

## Consent Management

### Grant / Update Consent
- **URL**: `/consent`
- **Method**: `POST`
- **Auth required**: Yes (`trainee` role only)
- **Payload**:
  ```json
  {
    "purpose": "data_sharing", // 'data_sharing', 'employment_tracking', 'marketing'
    "status": "granted" // 'granted', 'withdrawn'
  }
  ```
- **Success Response**: Returns updated consent record (status 200).

### Get Consents
- **URL**: `/consent`
- **Method**: `GET`
- **Auth required**: Yes (`trainee` role only)
- **Success Response**: Returns array of consents for the current trainee (status 200).

## Employment Tracking

### Create Employment Record
- **URL**: `/employment`
- **Method**: `POST`
- **Auth required**: Yes (`trainee`)
- **Payload**:
  ```json
  {
    "employerName": "Tech Solutions",
    "jobRole": "Software Engineer",
    "joiningDate": "2024-01-15",
    "employmentType": "full_time",
    "salary": 45000,
    "trainingRelevance": "highly_relevant"
  }
  ```
- **Success Response**: Returns created record (status 201).

### Update Employment Record
- **URL**: `/employment/:id`
- **Method**: `PUT`
- **Auth required**: Yes (`trainee`)
- **Payload**:
  ```json
  {
    "currentStatus": "unemployed",
    "salary": 50000
  }
  ```
- **Success Response**: Returns updated record (status 200).

## Follow-ups

### Schedule Follow-up
- **URL**: `/follow-ups/schedule`
- **Method**: `POST`
- **Auth required**: Yes (`government`, `training_provider`)
- **Payload**:
  ```json
  {
    "traineeId": "64f1...",
    "scheduledDate": "2024-04-15",
    "type": "3_month",
    "channel": "whatsapp"
  }
  ```
- **Success Response**: Returns scheduled follow-up (status 201).

### Record Follow-up Response (Mock Webhook)
- **URL**: `/follow-ups/:id/response`
- **Method**: `POST`
- **Auth required**: Yes
- **Payload**:
  ```json
  {
    "employmentStatus": "unemployed",
    "attritionReason": "low_salary",
    "notes": "Looking for better opportunities."
  }
  ```
- **Success Response**: Returns updated follow-up (status 200).

## Verification

### Process Verification
- **URL**: `/verification/:id`
- **Method**: `PUT`
- **Auth required**: Yes (`employer`)
- **Payload**:
  ```json
  {
    "status": "verified",
    "confidenceScore": 95,
    "verificationNotes": "Confirmed employment details."
  }
  ```
- **Success Response**: Returns updated verification record (status 200).

## AI Integration (Mock)

### Detect Skill Gap
- **URL**: `/ai/skill-gap`
- **Method**: `POST`
- **Auth required**: Yes (`government`, `training_provider`)
- **Payload**:
  ```json
  {
    "courseId": "64f2...",
    "requiredSkills": ["React", "Python"]
  }
  ```
- **Success Response**: Returns mock AI skill gap analysis (status 200).

## Analytics Dashboard

### Government Dashboard
- **URL**: `/dashboard/government`
- **Method**: `GET`
- **Auth required**: Yes (`government`)
- **Success Response**: Returns aggregated KPIs and chart data (status 200).
