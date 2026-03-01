# Task Manager App

Fullstack home assignment built with React (Vite) and Node.js (Express).

## Setup

### Backend
cd backend  
npm install  
npm start  

Runs on port 4000.

### Frontend
cd frontend  
npm install  
npm run dev  

Runs on port 5173.  
No environment variables required.

## API

Base URL: http://localhost:4000/api/tasks

GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  
PATCH /api/tasks/:id/toggle  

Each task includes: title, description, priority (low/medium/high), completed (boolean).

## Features

- Full CRUD operations  
- Toggle completion  
- Filter (All / Completed / Pending)  
- Infinite carousel (active only when 4+ tasks exist)  
- Priority color indication  
- Responsive UI  
- Basic title validation  

## Design Notes

- Carousel shows 3 tasks at a time and disables navigation when fewer than 4 tasks exist to keep the infinite logic consistent.
- API calls are separated into a services layer for cleaner structure.
- A proxy configuration was used in the frontend (Vite) to simplify API calls.

## Time Spent

Backend: ~40 minutes  
Frontend: ~2 hours  
Styling: ~30 minutes  

Thank you for your understanding given the current war situation, and thank you for the opportunity.
