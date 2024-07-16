# Real-Time Chatting App

This is a real-time chatting application built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- Real-time messaging
- User authentication
- User profiles
- Image sharing
- Responsive design

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Render (Backend), Vercel (Frontend)

## How to Run

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following environment variables:
     ```plaintext
     PORT=5000  # Or any preferred port
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

4. Start the backend server:

   ```bash
   npm start
   ```

   This will start the backend server at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   This will start the frontend server in development mode at `http://localhost:3000`.

4. Open your browser and navigate to `http://localhost:3000` to use the application.

## Deployment

- **Backend**: Deploy your Node.js backend on a platform like Render, Heroku, or AWS.
- **Frontend**: Deploy your Vite frontend on Vercel, Netlify, or any static hosting provider.
