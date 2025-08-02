# Portfolio Backend API

This is the backend API for the portfolio application built with Node.js, Express, and MongoDB.

## Features

- RESTful API for managing portfolio data
- MongoDB integration with Mongoose ODM
- CORS configuration for frontend integration
- Error handling middleware
- Project, Achievement, and Experience management

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Achievements

- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/featured` - Get featured achievements
- `GET /api/achievements/:id` - Get achievement by ID
- `POST /api/achievements` - Create new achievement
- `PUT /api/achievements/:id` - Update achievement
- `DELETE /api/achievements/:id` - Delete achievement

### Experiences

- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID
- `POST /api/experiences` - Create new experience
- `PUT /api/experiences/:id` - Update experience
- `DELETE /api/experiences/:id` - Delete experience

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with your MongoDB URI:

   ```
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── middleware/
│   ├── errorHandler.js     # Error handling middleware
│   └── notFound.js        # 404 middleware
├── models/
│   ├── Project.js         # Project model
│   ├── Achievement.js     # Achievement model
│   └── Experience.js      # Experience model
├── routes/
│   ├── projects.js        # Project routes
│   ├── achievements.js    # Achievement routes
│   └── experiences.js     # Experience routes
├── utils/
│   └── asyncHandler.js    # Async handler utility
├── server.js              # Main server file
└── package.json           # Dependencies
```
