# Food Cravings Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express.js-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)

A robust backend API for Food Cravings, enabling food discovery, user authentication, and social interactions for a modern food platform.

---

## Table of Contents
1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [License](#license)
10. [Acknowledgements](#acknowledgements)
11. [Architecture Diagram](#architecture-diagram)

---

## About the Project
Food Cravings Backend powers the core functionalities of a food-centric social platform. It provides RESTful APIs for user management, food partners, food items, bookmarks, likes, and comments. The backend is designed for scalability, security, and ease of integration with frontend/mobile clients.

> **Screenshots / GIFs:**
> _Add screenshots or GIFs here to showcase API responses, Postman collections, or architecture._

---

## Features
- User authentication (JWT-based)
- Food partner onboarding & management
- CRUD operations for food items
- Social features: likes, comments, bookmarks
- Secure RESTful API endpoints
- Modular MVC architecture
- MongoDB integration
- Middleware for authentication & error handling

---

## Tech Stack
- **Node.js** (v18+)
- **Express.js**
- **MongoDB** (with Mongoose)
- **JWT** for authentication
- **dotenv** for environment management

---

## Project Structure
```text
backend/
├── package.json
├── server.js
└── src/
    ├── app.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── food-partner.controller.js
    │   └── food.controller.js
    ├── db/
    │   └── db.js
    ├── middlewares/
    │   └── auth.middleware.js
    ├── models/
    │   ├── bookmark.model.js
    │   ├── commentFood.model.js
    │   ├── food-partner.model.js
    │   ├── food.model.js
    │   ├── likes.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── auth.route.js
    │   ├── food-partner.route.js
    │   └── food.route.js
    └── services/
        └── storage.service.js
```

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm (comes with Node.js)
- MongoDB instance (local or cloud)

### Installation
```bash
# Clone the repository
git clone <REPO_URL>
cd backend

# Install dependencies
npm install
```

### Local Development
```bash
# Start the development server
npm start
```

The server will run on `http://localhost:3000` by default.

---

## Environment Variables
Create a `.env` file in the root directory with the following keys:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
# Add other environment variables as needed
```

---

## Deployment

You can deploy this backend to platforms like **Render**, **Heroku**, **Vercel (Serverless Functions)**, or **Netlify Functions**.

1. Set environment variables in your hosting dashboard.
2. Push your code to the connected repository.
3. Configure build/start commands (usually `npm install` and `npm start`).
4. Ensure MongoDB is accessible from your deployment environment.

Refer to your chosen platform's documentation for detailed steps.

---

## Acknowledgements
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [dotenv](https://github.com/motdotla/dotenv)
- [JWT](https://jwt.io/)

---

## Architecture Diagram

```mermaid
graph TD
    A[Client (Frontend/Mobile)] -->|HTTP Requests| B[Express.js Server]
    B --> C[Auth Middleware]
    C --> D[Controllers]
    D --> E[Services]
    E --> F[MongoDB Database]
    D -->|Response| A
    B -->|Static Files / Docs| G[Other Services]
```

---

> _For questions or support, please open an issue or contact the maintainer._
