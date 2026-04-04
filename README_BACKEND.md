# Sant Kabir Public School - Custom Backend (MongoDB)

This project has been migrated from Supabase to a custom Node.js/Express backend with MongoDB.

## Backend Structure
- **Folder**: `/backend`
- **Database**: MongoDB (Local or Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **API Base URL**: `http://localhost:5000/api`

## Prerequisites
1. [Node.js](https://nodejs.org/) installed.
2. [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, OR a MongoDB Atlas URI.

## How to Run the Backend
1. Open a terminal in the `/backend` folder.
2. Ensure you have a `.env` file (one has been created for you).
3. Run `npm install` (if not already done).
4. Run `npm start` or `npm run dev` to start the server.

## How to Run the Frontend
1. Open a terminal in the root folder.
2. Run `npm run dev`.
3. The frontend is configured to talk to the backend via `src/api/client.ts`.

## Initial Setup (Admin Account)
To create the primary admin account for the school:
1. Go to the `/admin` page on the website.
2. Click **Sign Up**.
3. Use the email: `santkabirschool@gmail.com`
4. Use the password: `santkabirschool@789`
5. Click **Sign Up**.
6. Switch back to **Sign In** and use the same credentials.

## API Endpoints
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET/POST /api/admissions` - Manage student applications (GET requires Admin token)
- `GET/POST/PUT/DELETE /api/syllabus` - Manage class syllabus
- `GET/POST/PUT/DELETE /api/gallery` - Manage school gallery photos
