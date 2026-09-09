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
