# DevLog - Coding Session & Learning Resource Tracker


A full‑stack MERN productivity web application that helps developers log their coding sessions and manage learning resources in one place.

Live Demo: https://devlogapp.duckdns.org/

---

## Preview

![Preview](assets/preview.png)

---

## Features

### Coding Sessions 

Each coding session includes:

- Title 
- Date
- Duration (minutes)
- Type (Project, Tutorial, Interview Prep, DSA, etc.)
- Tech stack (tags like React, Node.js, MongoDB)
- Notes 

Supported actions:

- Create a session
- View all sessions
- Edit a session
- Delete a session

### Learning Resources

Each resource includes:

- Title
- Category (Video, Repo / Code Sample, Documentation)
- Topic (React, MongoDB, Algorithms, etc.)
- Status (To Watch, In Progress, Completed)
- URL
- Notes

Supported actions:

- Create a resource
- View all resources
- Edit a resource
- Delete a resource

### Dashboard overview

A high‑level overview of 
- Total sessions logged and total time spent coding in the last 30 days
- Number of resources marked To Watch or In Progress
- A daily streak count for coding sessions
- Weekly activity chart displaying the number of hours spent coding everyday

### Searching, Filtering & Sorting

To improve usability: 

- Search bar for searching sessions (by title) and resources (by title and topics)
- Sessions can be filtered by session type and sorted by date (asc or desc)
- Resources can be filtered by resource status and category 

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB (Mongoose)

### Infrastructure & DevOps

- AWS EC2 (Ubuntu)
- Nginx (reverse proxy)
- PM2 (process manager for Node)
- DuckDNS (custom domain)
- Certbot + Let’s Encrypt (HTTPS)
- GitHub Actions (auto deployment)
  
---

## Database Schema
```
Session {
_id: ObjectId,
title: String,
date: Date,
durationMinutes: Number,
type: String,
techStack: [String],
notes: String,
createdAt: Date,
updatedAt: Date
}
```

```
Resource {
_id: ObjectId,
title: String,
category: String,
topics: [String],
status: String,
url: String,
notes: String,
createdAt: Date,
updatedAt: Date
}
```
---

## API Endpoints
### Sessions
```
GET /v1/sessions
POST /v1/sessions
GET /v1/sessions/:id
PUT /v1/sessions/:id
DELETE /v1/sessions/:id
```
### Resources
```
GET /v1/resources
POST /v1/resources
GET /v1/resources/:id
PUT /v1/resources/:id
DELETE /v1/resources/:id
```
---

## Running Locally
### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas connection string
- Clone this repository:
  ```
  git clone https://github.com/<your-username>/dev-log.git
  ```
### Backend Setup
1) Install dependencies
```
cd backend
npm install
```
2) Create a .env file:
```
PORT=4000
MONGODB_URI=<your_mongodb_connection_string>
```
3) Start the backend:
```
npm run dev
```
4) Backend runs at:
```
http://localhost:4000
```

### Frontend Setup
1) Install dependencies
```
cd frontend
npm install
```
2) Create a .env.local file:
```
VITE_API_BASE_URL=http://localhost:4000
VITE_USERNAME=<your-name>
```
3) Start the frontend:
```
npm run dev
```
4) Frontend runs at:
```
http://localhost:5173
```
---
## GitHub Actions Workflow (optional)
If project is deployed on AWS EC2, the workflow in .github/workflows/deploy.yml can : 
- SSH into EC2
- Pull latest code
- Install dependencies
- Restart PM2
- Rebuild frontend
- Reload Nginx

Required GitHub repository secrets:
- `EC2_HOST`: Public IP or DNS of the EC2 instance
- `EC2_USER`: SSH username for the instance (`ubuntu` on Ubuntu AMIs)
- `EC2_SSH_KEY`: Private SSH key contents used to connect to the instance
