# 📝 Blog Application

A full-stack blog application built with **React**, **TypeScript**, and **Node.js/Express**, featuring user authentication, rich blog post management, and a modern responsive UI.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **User Authentication** — Secure sign-up, login, and session management with JWT
- **Blog Post CRUD** — Create, read, update, and delete blog posts
- **Rich Text Editing** — Full-featured content editor for writing posts
- **Responsive Design** — Mobile-first UI built with Tailwind CSS
- **State Management** — Centralized state management with Redux Toolkit
- **RESTful API** — Clean, well-structured Express.js backend
- **Type Safety** — End-to-end TypeScript across frontend and backend
- **Middleware & Guards** — Route protection and request validation
- **Service Layer Architecture** — Separation of concerns with controllers, services, and models

---

## 🛠 Tech Stack

### Frontend

| Technology       | Purpose                     |
| ---------------- | --------------------------- |
| **React 18**     | UI library                  |
| **TypeScript**   | Type-safe JavaScript        |
| **Vite**         | Build tool & dev server     |
| **Tailwind CSS** | Utility-first CSS framework |
| **PostCSS**      | CSS processing              |
| **ESLint**       | Code linting                |

### Backend

| Technology     | Purpose              |
| -------------- | -------------------- |
| **Node.js**    | Runtime environment  |
| **Express.js** | Web framework        |
| **TypeScript** | Type-safe JavaScript |
| **MongoDB**    | NoSQL database       |

---

## 📁 Project Structure

```
Blog-App/
├── README.md
├── backend/
│   ├── .env                    # Backend environment variables
│   ├── package.json            # Backend dependencies & scripts
│   ├── tsconfig.json           # TypeScript configuration
│   ├── index.d.ts              # Global type declarations
│   └── src/
│       ├── index.ts            # Application entry point
│       ├── config/             # App configuration (DB, env, etc.)
│       ├── constants/          # Shared constants & enums
│       ├── controllers/        # Route handler logic
│       ├── middleware/         # Express middleware (auth, validation, etc.)
│       ├── models/             # Database models/schemas
│       ├── routes/             # API route definitions
│       ├── services/           # Business logic layer
│       └── utils/              # Utility/helper functions
├── frontend/
│   ├── .env                    # Frontend environment variables
│   ├── index.html              # HTML entry point
│   ├── package.json            # Frontend dependencies & scripts
│   ├── vite.config.ts          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── tsconfig.app.json       # App-specific TS config
│   ├── tsconfig.node.json      # Node-specific TS config
│   ├── .eslintrc.cjs           # ESLint configuration
│   ├── public/                 # Static assets
│   └── src/
│       ├── main.tsx            # React entry point
│       ├── App.tsx             # Root application component
│       ├── index.css           # Global styles
│       ├── vite-env.d.ts       # Vite type declarations
│       ├── app/                # App-level setup (store, hooks, etc.)
│       ├── assets/             # Images, fonts, icons
│       ├── components/         # Reusable UI components
│       ├── config/             # Frontend configuration
│       └── constants/          # Frontend constants
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x — [Download](https://nodejs.org/)
- **npm** >= 9.x or **yarn** >= 1.22.x
- **MongoDB** — Local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster
- **Git** — [Download](https://git-scm.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables (see Environment Variables section)
cp .env.example .env

# Start the development server
npm run dev
```

The backend server will start on the port specified in your `.env` file (default: `http://localhost:5000`).

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the development server
npm run dev
```

The frontend development server will start at `http://localhost:5173`.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/blog-app

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# CORS
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> ⚠️ **Note:** Never commit `.env` files with real secrets to version control. The `.env` files in this repo should serve as templates only.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| `POST` | `/api/auth/register` | Register a new user            |
| `POST` | `/api/auth/login`    | Log in an existing user        |
| `GET`  | `/api/auth/me`       | Get current authenticated user |

### Blog Posts

| Method   | Endpoint         | Description                       |
| -------- | ---------------- | --------------------------------- |
| `GET`    | `/api/posts`     | Get all blog posts                |
| `GET`    | `/api/posts/:id` | Get a single post by ID           |
| `POST`   | `/api/posts`     | Create a new post (auth required) |
| `PUT`    | `/api/posts/:id` | Update a post (auth required)     |
| `DELETE` | `/api/posts/:id` | Delete a post (auth required)     |

---

## 📜 Scripts

### Backend

| Script  | Command         | Description                         |
| ------- | --------------- | ----------------------------------- |
| `dev`   | `npm run dev`   | Start dev server with hot-reloading |
| `build` | `npm run build` | Compile TypeScript to JavaScript    |
| `start` | `npm start`     | Start production server             |

### Frontend

| Script    | Command           | Description                      |
| --------- | ----------------- | -------------------------------- |
| `dev`     | `npm run dev`     | Start Vite dev server            |
| `build`   | `npm run build`   | Build for production             |
| `preview` | `npm run preview` | Preview production build locally |
| `lint`    | `npm run lint`    | Run ESLint                       |

---

## 🏗 Architecture Overview

```
Client (React + Vite)
    │
    ▼
API Requests (Axios / Fetch)
    │
    ▼
Express.js Server
    │
    ├── Middleware (Auth, Validation, Error Handling)
    │
    ├── Routes → Controllers → Services → Models
    │
    ▼
MongoDB Database
```

The backend follows a **layered architecture**:

- **Routes** — Define API endpoints and map them to controllers
- **Controllers** — Handle HTTP request/response logic
- **Services** — Contain business logic, decoupled from HTTP layer
- **Models** — Define database schemas and data access
- **Middleware** — Cross-cutting concerns (authentication, error handling, validation)
- **Utils** — Shared helper functions and utilities

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix      | Purpose                                   |
| ----------- | ----------------------------------------- |
| `feat:`     | New feature                               |
| `fix:`      | Bug fix                                   |
| `docs:`     | Documentation changes                     |
| `style:`    | Code style (formatting, semicolons, etc.) |
| `refactor:` | Code refactoring                          |
| `test:`     | Adding or updating tests                  |
| `chore:`    | Maintenance tasks                         |

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Node.js**

</div>
