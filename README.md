# Personalized Wealth Management Dashboard

A comprehensive wealth management application with a React frontend and FastAPI (Python) + MongoDB backend.

## Prerequisites

1.  **Node.js** (v18+)
2.  **Python** (v3.9+)
3.  **MongoDB** (Community Server) running locally on default port `27017`.

## Setup & Run Instructions

### 1. Database
Ensure your MongoDB server is running.
```bash
# Verify MongoDB is up
mongod --version
```
*Note: If you installed MongoDB as a service, it should be running automatically.*

### 2. Backend (FastAPI)
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create and activate virtual environment (if not done):
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Start the server:
    ```bash
    uvicorn app.main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

### 3. Frontend (React)
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

## Tech Stack
-   **Frontend**: React, TypeScript, Tailwind CSS, Recharts, Lucide React.
-   **Backend**: FastAPI, Beanie (MongoDB ODM), Motor, Pydantic.
-   **Database**: MongoDB.
-   **Auth**: JWT (JSON Web Tokens).
