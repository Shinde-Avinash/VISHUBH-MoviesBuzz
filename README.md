# MERN Movie Application

## Project Overview
A full-stack movie web application allowing users to browse, search, and sort movies. Administrators can manage movie records.

## Tech Stack
- **Frontend**: React, Vite, Material-UI
- **Backend**: Node.js, Express, MongoDB
- **Auth**: JWT, BCrypt

## Setup Instructions

### 1. Backend
```bash
cd server
npm install
node seeder.js  # Seeds the database with Admin/User
npm run dev
```
Server runs on `http://localhost:5000`.

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

### 3. Usage
- Visit the frontend URL.
- Login with `admin@example.com` / `password123` to access Admin Dashboard.
- Login with `user@example.com` / `password123` or Register a new account.
- Movies will be automatically populated on first access to the Home page.
