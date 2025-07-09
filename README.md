## 🌐 MERN Stack Role-Based Task Management App

A full-stack MERN (MongoDB, Express, React, Node.js) application implementing user authentication, role-based access, task assignment, and image uploads. Built with a modular structure for clean code and scalability.

## 🚀 Features

📝 User Registration & Login

🔐 JWT-Based Authentication

🎭 Role-Based Access Control (Admin, Manager, Employee)

📦 Modular MVC Architecture

📸 Photo Upload (Local & Cloudinary)

🧾 Auto-Incrementing IDs for Users and Tasks

📋 Task Creation, Viewing, Updating & Deletion

🌍 Responsive React Frontend

🛡️ Security with Helmet, Rate Limiting, CORS, MongoDB Sanitization, XSS Protection

## 🛠️ Tech Stack

Frontend:

    React
    React Router
    CSS

Backend:

    Node.js
    Express.js
    MongoDB (Mongoose)
    JWT for auth
    bcrypt for password hashing
    multer + Cloudinary for image uploads
    mongoose-sequence for auto-incremented IDs
    dotenv, helmet, express-rate-limit, xss-clean, mongo-sanitize

## 📁 Folder Structure

```

MERN-PROJECT/
│
├── back-end/
│   ├── server.js
│   └── src/
│       ├── config/       # DB config, schema, Cloudinary
│       ├── controller/   # Route logic
│       ├── middleware/   # Auth, Role Check, Error Handler, Uploads
│       ├── model/        # DB queries and business logic
│       └── router/       # API route definitions
│
├── front-end/
│   ├── public/
│   └── src/
│       ├── login.js
│       ├── registration.js
│       ├── App.js
│       └── index.js
│
├── .env (create manually)
├── package.json
└── README.md

```

## ⚙️ Getting Started

Prerequisites

    Node.js (v14+)
    MongoDB (running locally or Atlas)
    npm or yarn

## Backend Setup

    cd back-end (navigate to backe-end folder)
    npm install (install dependecies)

    Create a .env file inside back-end/ with:

        JWT_SECRET=your_super_secret_key
        CLOUDINARY_CLOUD_NAME=your_cloud_name
        CLOUDINARY_API_KEY=your_api_key
        CLOUDINARY_API_SECRET=your_api_secret


    Server will run at http://localhost:8000

## Frontend Setup

    cd front-end (Navigate to frontend)
    npm install (install dependecies)
    npm start (start the frontend)

    Frontend will run at http://localhost:5173 or similar (Vite default)

## 🔐 Security Notes

    ✅ Passwords hashed with bcrypt
    ✅ JWT auth stored securely and verified via middleware
    ✅ Helmet sets secure HTTP headers
    ✅ CORS configured to allow frontend only
    ✅ Rate limiting applied to prevent abuse
    ✅ xss-clean and mongo-sanitize to prevent XSS/NoSQL injection

## 📸 Image Upload

    Local upload: /uploads/members/filename
    Cloudinary upload via memory stream
    File filter ensures only image MIME types are allowed

## 🧪 Future Improvements

    🔄 Persistent login using cookies/localStorage
    ✉️ Email verification and password reset via token
    📅 Task filtering by status, priority, due date
    🔎 Search and pagination for tasks
    📬 Email notifications for new assignments
    📊 Dashboard with task statistics
    🚨 Deadline reminders via cron job
    🧪 Add unit tests with Jest and Supertest

## 👨‍💻 Author

Arnav Chaturvedi
Computer Science Engineering student, passionate about full-stack development and clean code.
