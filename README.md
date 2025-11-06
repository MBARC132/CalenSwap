# Calendar Slot Swap Application

A web application that allows users to create, manage, and swap calendar time slots with others. This project consists of a frontend built with React and a backend built with Node.js, Express, and MongoDB Atlas.

## Features

-> User authentication: signup and login with JWT.

-> Create, update, and delete calendar events.

-> Mark time slots as swappable and busy.

-> Browse and request swaps for other users' swappable slots.

-> Respond to incoming swap requests (accept/reject).

-> Real-time updates in dashboard (frontend fetches updated events after changes).

## Tech Stack

-> Frontend: React, Axios, React Router, Material UI

-> Backend: Node.js, Express, Mongoose, JWT, CORS

-> Database: MongoDB Atlas

-> Deployment: Vercel (frontend), Render (backend)

## Backend Setup

# Clone the repository: 
-> git clone <https://github.com/MBARC132/CalenSwap>.
-> cd slot-swapper-backend
-> npm install express mongoose dotenv cors jsonwebtoken bcryptjs
-> npm install
-> npm start

# Frontend Setup
-> Navigate to frontend folder:
-> cd Frontend
-> npm install
-> npm run dev


The CalenSwap project is a full-stack calendar management and slot-swapping application. It allows users to create, manage, and mark their time slots as swappable, while also browsing and requesting swaps for available slots from other users.

The backend is built with Node.js, Express, MongoDB, and JWT authentication, providing secure user management and data storage. The frontend, developed using React, offers a clean, responsive, and user-friendly interface.

This project demonstrates full-stack development skills, including RESTful API design, authentication, database integration, state management, and deployment. By implementing real-time slot management and swap requests, it provides a practical solution for scheduling conflicts and collaborative calendar management.

