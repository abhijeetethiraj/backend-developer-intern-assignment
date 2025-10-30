# Backend Developer Intern – Assignment (Project)

## Overview

This project implements a secure and scalable REST API with JWT authentication and a simple frontend built using Tailwind CSS and JavaScript.  
It demonstrates complete user authentication and task management functionalities.

---

## Tech Stack

**Backend:** Node.js, Express, MongoDB, JWT, bcrypt  
**Frontend:** HTML, Tailwind CSS (CDN), JavaScript (Fetch API)  
**Database:** MongoDB Atlas

---

## Features

### Authentication

- User registration and login using JWT tokens
- Password hashing with bcrypt
- Protected routes secured with JWT middleware
- Role-based authorization (admin/user) support

### Tasks Module

- Create new tasks
- View all tasks for the logged-in user
- Delete specific tasks by ID  
  (CRUD functionalities demonstrated through Create, Read, and Delete)

### Security

- Helmet, xss-clean, and express-mongo-sanitize for enhanced security
- Input validation using express-validator
- Centralized error handling for consistent API responses

---

## API Endpoints

| Method     | Route                | Description                    |
| ---------- | -------------------- | ------------------------------ |
| **POST**   | `/api/auth/register` | Register a new user            |
| **POST**   | `/api/auth/login`    | Login and get JWT token        |
| **GET**    | `/api/auth/me`       | Fetch user profile (protected) |
| **POST**   | `/api/tasks`         | Create a new task (protected)  |
| **GET**    | `/api/tasks`         | Get all tasks (protected)      |
| **DELETE** | `/api/tasks/:id`     | Delete task by ID (protected)  |

---

## Frontend Pages

| Page               | Description                                 |
| ------------------ | ------------------------------------------- |
| **index.html**     | User registration page                      |
| **login.html**     | Login page                                  |
| **dashboard.html** | Displays user information and logout option |
| **tasks.html**     | Add, view, and delete tasks                 |

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas connection string

Install dependencies

npm install

Create a .env file in the root directory and add the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start the server

npm run dev

Open your browser and navigate to:

http://localhost:5000

Testing the API

Use Postman or Thunder Client to test the endpoints.

Export your Postman collection as Backend_Assignment_Postman_Collection.json for submission.

## Folder Structure

```
backend-assignment/
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── public/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   └── tasks.html
├── .env
├── server.js
├── package.json
└── README.md
```
