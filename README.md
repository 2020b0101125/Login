## 🌐 MERN Stack User Auth Project

A full-stack MERN (MongoDB, Express, React, Node.js) application implementing user authentication. Cleanly structured backend and frontend to handle registration, login, and secure data exchange.

## 🚀 Features

📝 User registration & login

🔐 JWT-based authentication

🔄 Role-based access control

📦 Modular folder structure (MVC pattern)

🌐 Responsive React frontend

## 🛠️ Tech Stack

Frontend:

    React
    React Router
    CSS

Backend:

    Node.js
    Express.js
    MongoDB with Mongoose

## 📁 Folder Structure

```

MERN-PROJECT/
│
├── back-end/
│ ├── server.js
│ └── src/
│ ├── config/ # DB config & schema
│ ├── controller/ # Route logic
│ ├── middleware/ # Error handlers, auth checks
│ ├── model/ # Mongoose models
│ └── router/ # API routes
│
├── front-end/
│ ├── public/
│ └── src/
│ ├── login.js
│ ├── registration.js
│ ├── App.js
│ └── index.js
│
├── package.json (root)
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
    JWT_SECRET=your_super_secret_key (create a .env file in the root of your project)
    node server.js (run the server)

    Server will run at http://localhost:3000

## Frontend Setup

    cd front-end (Navigate to frontend)
    npm install (install dependecies)
    npm start (start the frontend)

    Frontend will run at http://localhost:5173 or similar (Vite default)

## 🔐 Security Notes

    Passwords are hashed using bcrypt before storage.

    JWTs are signed using a secure, environment-based secret (from .env).

    Protected routes will reject invalid or missing tokens.

    Error handling middleware is implemented globally.

## 🧪 Future Improvements

    Protected routes check for valid token before proceeding.

    Add user profile dashboard

    Enable persistent login (cookie or localStorage)

    Add email verification and password reset

    Connect frontend and backend with a proxy

## 👨‍💻 Author

Arnav Chaturvedi
Computer Science Engineering student, passionate about full-stack development and clean code.
