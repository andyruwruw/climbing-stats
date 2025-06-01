# Climbing Stats API Specification

## Base URL
```
/api
```

## Authentication

### Register New User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response: 201 Created**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "createdAt": "string (ISO date)",
  "token": "string (JWT)"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input data
- `409 Conflict`: Username or email already exists

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response: 200 OK**
```json
{
  "token": "string (JWT)",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Invalid input data

### Refresh Token
```http
POST /auth/refresh
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
{
  "token": "string (JWT)"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token

## Climbing Sessions

### Get All Sessions
```http
GET /sessions
```

**Query Parameters:**
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string
- `limit` (optional): number (default: 20)
- `offset` (optional): number (default: 0)

**Request Headers:**
```
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
{
  "total": "number",
  "sessions": [
    {
      "id": "string",
      "date": "string (ISO date)",
      "location": "string",
      "duration": "number (minutes)",
      "climbs": [
        {
          "id": "string",
          "grade": "string",
          "type": "boulder | sport | trad",
          "status": "attempt | send | project",
          "notes": "string"
        }
      ],
      "notes": "string"
    }
  ]
}
```

### Get Single Session
```http
GET /sessions/{id}
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
{
  "id": "string",
  "date": "string (ISO date)",
  "location": "string",
  "duration": "number (minutes)",
  "climbs": [
    {
      "id": "string",
      "grade": "string",
      "type": "boulder | sport | trad",
      "status": "attempt | send | project",
      "notes": "string"
    }
  ],
  "notes": "string"
}
```

**Error Responses:**
- `404 Not Found`: Session not found
- `401 Unauthorized`: Invalid token

### Create Session
```http
POST /sessions
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "date": "string (ISO date)",
  "location": "string",
  "duration": "number (minutes)",
  "climbs": [
    {
      "grade": "string",
      "type": "boulder | sport | trad",
      "status": "attempt | send | project",
      "notes": "string"
    }
  ],
  "notes": "string"
}
```

**Response: 201 Created**
```json
{
  "id": "string",
  "date": "string (ISO date)",
  "location": "string",
  "duration": "number (minutes)",
  "climbs": [
    {
      "id": "string",
      "grade": "string",
      "type": "boulder | sport | trad",
      "status": "attempt | send | project",
      "notes": "string"
    }
  ],
  "notes": "string"
}
```

### Update Session
```http
PUT /sessions/{id}
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "date": "string (ISO date)",
  "location": "string",
  "duration": "number (minutes)",
  "climbs": [
    {
      "id": "string (optional)",
      "grade": "string",
      "type": "boulder | sport | trad",
      "status": "attempt | send | project",
      "notes": "string"
    }
  ],
  "notes": "string"
}
```

**Response: 200 OK**
```json
{
  "id": "string",
  "date": "string (ISO date)",
  "location": "string",
  "duration": "number (minutes)",
  "climbs": [
    {
      "id": "string",
      "grade": "string",
      "type": "boulder | sport | trad",
      "status": "attempt | send | project",
      "notes": "string"
    }
  ],
  "notes": "string"
}
```

### Delete Session
```http
DELETE /sessions/{id}
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Response: 204 No Content**

## Statistics

### Get Overview Statistics
```http
GET /stats/overview
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string

**Response: 200 OK**
```json
{
  "totalSessions": "number",
  "totalClimbs": "number",
  "totalTime": "number (minutes)",
  "sendRate": "number (percentage)",
  "gradeDistribution": {
    "boulder": {
      "grade": "count"
    },
    "sport": {
      "grade": "count"
    },
    "trad": {
      "grade": "count"
    }
  },
  "typeDistribution": {
    "boulder": "number",
    "sport": "number",
    "trad": "number"
  }
}
```

### Get Progress Statistics
```http
GET /stats/progress
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string
- `type` (optional): "boulder" | "sport" | "trad"
- `interval` (optional): "day" | "week" | "month" (default: "week")

**Response: 200 OK**
```json
{
  "progression": [
    {
      "date": "string (ISO date)",
      "averageGrade": "string",
      "maxGrade": "string",
      "totalClimbs": "number",
      "sendRate": "number"
    }
  ]
}
```

### Get Grade Statistics
```http
GET /stats/grades
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string
- `type`: "boulder" | "sport" | "trad"

**Response: 200 OK**
```json
{
  "grades": [
    {
      "grade": "string",
      "sends": "number",
      "attempts": "number",
      "projects": "number"
    }
  ],
  "maxGrade": "string",
  "averageGrade": "string",
  "mostFrequentGrade": "string"
}
```

## User Profile

### Get User Profile
```http
GET /user/profile
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "createdAt": "string (ISO date)",
  "preferences": {
    "defaultClimbingType": "boulder | sport | trad",
    "defaultLocation": "string",
    "gradeSystem": {
      "boulder": "string",
      "sport": "string",
      "trad": "string"
    }
  }
}
```

### Update User Profile
```http
PUT /user/profile
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "currentPassword": "string",
  "newPassword": "string (optional)"
}
```

**Response: 200 OK**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "updatedAt": "string (ISO date)"
}
```

### Get User Preferences
```http
GET /user/preferences
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
{
  "defaultClimbingType": "boulder | sport | trad",
  "defaultLocation": "string",
  "gradeSystem": {
    "boulder": "string",
    "sport": "string",
    "trad": "string"
  }
}
```

### Update User Preferences
```http
PUT /user/preferences
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "defaultClimbingType": "boulder | sport | trad",
  "defaultLocation": "string",
  "gradeSystem": {
    "boulder": "string",
    "sport": "string",
    "trad": "string"
  }
}
```

**Response: 200 OK**
```json
{
  "defaultClimbingType": "boulder | sport | trad",
  "defaultLocation": "string",
  "gradeSystem": {
    "boulder": "string",
    "sport": "string",
    "trad": "string"
  }
}
```

## Error Responses

All endpoints may return the following error responses:

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Description of the error",
  "details": {
    "field": "Error description"
  }
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

The API implements rate limiting with the following defaults:
- 100 requests per minute per IP address
- 1000 requests per hour per user

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1619083200
```

## Authentication

All authenticated endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer {token}
```

Tokens expire after 24 hours. Use the refresh token endpoint to obtain a new token.

## Pagination

Endpoints that return lists support pagination through query parameters:
- `limit`: Number of items per page (default: 20, max: 100)
- `offset`: Number of items to skip (default: 0)

Response includes pagination metadata:
```json
{
  "total": "number",
  "limit": "number",
  "offset": "number",
  "items": []
}
``` 