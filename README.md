# TaskFlow

## Project Description

**TaskFlow** is a full-stack task management web application that allows users to register, log in, and manage their personal tasks. The system supports **role-based access**, ensuring certain actions are restricted to admins while regular users can manage their own tasks.

The backend is built with **Node.js, Express, and MySQL**, implementing **secure authentication with JWT and password hashing**. The frontend is built using **React.js**, providing a responsive, modern interface for interacting with the APIs.

This application demonstrates good **API design, modularity, security, and scalability**, making it ideal for internship submissions or portfolio projects.

---

## Features

### Backend
- User registration and login with **hashed passwords** and **JWT authentication**
- **Role-based access control** (user/admin)
- CRUD operations for tasks
- **API versioning** (`/api/v1/...`)
- Input validation and error handling
- Modular project structure for easy expansion

### Frontend
- Registration and login forms
- JWT-protected dashboard
- Create, read, update, and delete tasks
- Display success/error messages from API responses
- Styled with **CSS cards, buttons, and hover effects**

### Security & Scalability
- Secure JWT token handling
- Input sanitization and validation
- Scalable folder structure for adding new modules
- Ready for deployment with separate frontend/backend

---

## Folder Structure
TaskFlow/
│
├── backend/
│ ├── server.js
│ ├── app.js
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── config/
│ └── package.json
│
└── frontend/
├── src/
├── public/
└── package.json



---

## Installation & Running


Server runs on http://localhost:5000

##Frontend
cd frontend
npm install
npm start
App runs on http://localhost:3000

### Backend
```bash
cd backend
npm install
npm start
