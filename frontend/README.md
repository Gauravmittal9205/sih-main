# Farm Health Guardian

A comprehensive farm risk assessment and management application.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher) installed and running locally

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory (copy from .env.example):
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/farm_guardian
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will be available at `http://localhost:3001`

### 2. Frontend Setup

1. Navigate to the project root directory (if not already there):
   ```bash
   cd ..
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## Available Scripts

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests

## Project Structure

```
project/
├── backend/                 # Backend server code
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── server.js            # Main server file
│   └── package.json         # Backend dependencies
├── public/                  # Static files
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── contexts/            # React contexts
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Entry point
├── .env.example            # Example environment variables
└── package.json            # Frontend dependencies
```

## MongoDB Setup

1. Install MongoDB Community Edition from [MongoDB's official website](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - On Windows: Run `net start MongoDB` (if installed as a service)
   - On macOS: `brew services start mongodb-community`
   - On Linux: `sudo systemctl start mongod`

3. Verify MongoDB is running by connecting to the MongoDB shell:
   ```bash
   mongosh
   ```

## Environment Variables

### Backend (`.env`)
- `PORT` - Port to run the backend server (default: 3001)
- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017/farm_guardian)
- `JWT_SECRET` - Secret key for JWT token generation
- `NODE_ENV` - Application environment (development/production)

## API Documentation

The API documentation is available at `http://localhost:3001/api-docs` when the backend server is running.

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
