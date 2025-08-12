# Stadium Management System

readme_content = # Stadium Management System

**Project:** Stadium Management System (MERN Stack)

**Author:** K.J.D.R. Perera (Johen Perera)

**Description**  
A full-stack web application to manage stadiums, events, tickets, and user-admin communication (CRM). Built with the MERN stack (MongoDB, Express, React, Node.js), it includes role-based authentication (JWT), OTP-based password recovery, image upload for stadiums, and an admin dashboard to manage all resources.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables (.env examples)](#environment-variables-env-examples)
- [Database Seeding / Sample Data](#database-seeding--sample-data)
- [Running the App](#running-the-app)
  - [Development](#development)
- [API Endpoints (Summary)](#api-endpoints-summary)
- [Authentication & Security](#authentication--security)
- [Testing](#testing)
- [Deployment](#deployment)
- [Known Issues & TODOs](#known-issues--todos)
- [Contributing](#contributing)

---

## Features

- User registration & login
- Role-based access control (Admin / User)
- JWT authentication for protected routes
- OTP-based password recovery via email
- Stadium management (CRUD) with image upload
- Event management (CRUD) and ticket creation
- Event booking by users (ticket booking flow)
- CRM (users can send comments/feedback to admin)
- Admin dashboard listing users, stadiums, events, bookings, CRM messages
- Ownership checks so users can view/update/delete only their own comments/bookings

---

## Tech Stack

- Frontend: React.js (React Router, Axios, react-data-table-component)
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Auth: JWT, bcrypt
- File Uploads: multer (for stadium images)
- Email/OTP: nodemailer (or other SMTP provider)
- HTTP client: Axios

---

## Architecture & Folder Structure (example)
project-root/
├─ backend/ or server/
│ ├─ controllers/
│ ├─ middlewares/
│ ├─ models/
│ ├─ routes/
│ ├─ utils/
│ ├─ uploads/ (or public/uploads)
│ ├─ config/
│ └─ server.js (or app.js)
├─ frontend/ or client/
│ ├─ src/
│ │ ├─ components/
│ │ ├─ pages/
│ │ ├─ services/ (api helpers)
│ │ ├─ utils/
│ │ └─ App.jsx
│ └─ package.json
├─ .env.example
└─ README.md


---

## Prerequisites

- Node.js (>= 16)
- npm or yarn
- MongoDB instance (local or cloud: MongoDB Atlas)
- SMTP credentials for sending OTP emails (Gmail SMTP, SendGrid, Mailgun, etc.)

---

## Installation

Clone the repo and install dependencies for backend and frontend.

##Backend Setup

cd backend
npm install

Create a .env file in the backend folder (see example below) and fill the values.

##Frontend Setup

cd frontend
npm install

Create a .env file in the frontend folder for any client-side variables (e.g., REACT_APP_API_URL).

#Environment Variables (.env examples)
##Backend .env
- PORT=5000
- MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/stadiumdb?retryWrites=true&w=majority
- JWT_SECRET=your_super_secret_jwt_key
- JWT_EXPIRES_IN=7d
- BCRYPT_SALT_ROUNDS=10
- EMAIL_HOST=smtp.gmail.com
- EMAIL_PORT=587
- EMAIL_USER=your-email@example.com
- EMAIL_PASS=your-email-password-or-app-password
- CLIENT_URL=http://localhost:3000

##Frontend .env (React)

REACT_APP_API_URL=http://localhost:5000/api
Security note: Never commit .env with secrets. Add .env and uploads/ (if used) to .gitignore.

#Database Seeding / Sample Data
You can either create seed scripts or insert sample documents via a MongoDB GUI (MongoDB Compass) or by calling your API endpoints.

##Example seed items to create:

- Admin user (role: admin)

- Several stadiums with capacities and images

- Events connected to stadiums

- A few normal users

- A seed script (e.g., seed.js) can use your Mongoose models to insert test data and then exit.


#Running the App
#Development
##Start backend:

cd backend
npm run dev
(e.g., nodemon server.js)

##Start frontend:

cd frontend
npm start
Visit http://localhost:3000.


##API Endpoints (Summary)
These are example routes — adjust according to your actual implementation.

##Auth

- POST /api/auth/register — register new user

- POST /api/auth/login — login and receive JWT

- POST /api/auth/forgot-password — request OTP

- POST /api/auth/verify-otp — verify OTP

- POST /api/auth/reset-password — set new password

##Users

- GET /api/users — (admin) list users

- GET /api/users/:id — get user details

- PUT /api/users/:id — update user

##Stadiums

- POST /api/stadiums — (admin) create stadium with image

- GET /api/stadiums — list stadiums

- GET /api/stadiums/:id — stadium details

- PUT /api/stadiums/:id — (admin) update stadium

- DELETE /api/stadiums/:id — (admin) delete stadium

##Events

- POST /api/events — (admin) create event

- GET /api/events — list events

- GET /api/events/:id — event details

- PUT /api/events/:id — (admin) update event

- DELETE /api/events/:id — (admin) delete event

##Bookings / Tickets

- POST /api/bookings — create booking (user)

- GET /api/bookings — (admin) list all bookings

- GET /api/bookings/user — list bookings for current user

- PUT /api/bookings/:id/cancel — cancel booking (user/admin)

##CRM (Comments)

- POST /api/crm — create comment (user)

- GET /api/crm/user — get comments by current user

- GET /api/crm — (admin) get all CRM messages

- PUT /api/crm/:id — update comment (owner)

- DELETE /api/crm/:id — delete comment (owner/admin)

#Authentication & Security
- Passwords hashed with bcrypt before saving to the DB.

- JWT tokens issued at login and verified with middleware for protected routes.

- Role checks (e.g., isAdmin middleware) for admin-only endpoints.

- Ownership checks on resources (e.g., only the creator can modify their CRM comment).

- OTP flow: OTP stored temporarily (in DB with short expiry or in-memory store) and verified before allowing password reset.

#Testing
- Manual testing via the frontend UI.

- Use Postman or Insomnia to test API endpoints.

- Optionally add automated tests with Jest + Supertest for API routes.

#Deployment
Options:

- Deploy backend to Heroku / Render / DigitalOcean / AWS.

- Deploy frontend to Netlify / Vercel / Surge.

- Use MongoDB Atlas for production database.

Important: Set environment variables on your hosting provider and configure CORS to allow your frontend domain.

#Known Issues & TODOs
- Improve token storage & refresh strategy (use refresh tokens / HTTP-only cookies)

- Implement rate limiting on OTP endpoints

- Add input validation & sanitization everywhere (express-validator)

- Add automated test coverage

- Support image CDN / cloud storage (e.g., AWS S3) for uploads

#Contributing
Contributions are welcome!

1.Fork the repository

2.Create a feature branch (git checkout -b feature/your-feature)

3.Commit your changes (git commit -m "feat: add ...")

4.Push to the branch (git push origin feature/your-feature)

5.Open a pull request

