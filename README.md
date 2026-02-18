# Wealth Management System

A full-stack wealth management application that helps users track their finances, manage transactions, set financial goals, and monitor their assets. Built with React (TypeScript) frontend and FastAPI (Python) backend, using MongoDB as the database.

## 🏗️ System Architecture

### Overview
The application follows a modern three-tier architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                        │
│  - React 19 + TypeScript                                    │
│  - Vite Build Tool                                          │
│  - TailwindCSS for Styling                                  │
│  - Recharts for Data Visualization                          │
│  - React Router for Navigation                              │
│  - Axios for API Communication                              │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP/REST API
                   │ (JSON)
┌──────────────────▼──────────────────────────────────────────┐
│                    Backend (FastAPI)                        │
│  - FastAPI Framework                                        │
│  - JWT Authentication                                       │
│  - Beanie ODM (MongoDB ORM)                                 │
│  - Pydantic for Validation                                  │
│  - CORS Middleware                                          │
└──────────────────┬──────────────────────────────────────────┘
                   │ Motor (Async Driver)
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                    Database (MongoDB)                       │
│  - Collections: users, transactions, goals, assets          │
│  - Document-based NoSQL Storage                             │
└─────────────────────────────────────────────────────────────┘
```

### Tech Stack

#### Frontend
- **Framework**: React 19.2 with TypeScript
- **Build Tool**: Vite 7.2
- **Styling**: TailwindCSS 4.1
- **Charts**: Recharts 3.6
- **Routing**: React Router DOM 7.12
- **HTTP Client**: Axios 1.13
- **Icons**: Lucide React

#### Backend
- **Framework**: FastAPI
- **Server**: Uvicorn (ASGI)
- **Database ODM**: Beanie (built on Motor)
- **Authentication**: python-jose (JWT)
- **Password Hashing**: passlib with bcrypt
- **Validation**: Pydantic

#### Database
- **MongoDB**: Document-based NoSQL database
- **Collections**: users, transactions, goals, assets

### Project Structure

```
wealthmanagement-system/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app initialization
│   │   ├── database.py          # MongoDB connection & initialization
│   │   ├── models.py            # Beanie document models
│   │   ├── schemas.py           # Pydantic schemas for validation
│   │   ├── crud.py              # Database operations
│   │   ├── auth_utils.py        # JWT & password utilities
│   │   ├── gemini_utils.py      # AI integration utilities
│   │   └── routers/
│   │       ├── auth.py          # Authentication endpoints
│   │       ├── transactions.py  # Transaction management
│   │       ├── goals.py         # Financial goals
│   │       ├── assets.py        # Asset management
│   │       └── dashboard.py     # Dashboard analytics
│   ├── requirements.txt
│   └── test_mongodb_connection.py
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # Main application component
│   │   ├── main.tsx             # Application entry point
│   │   ├── api/                 # API client modules
│   │   │   ├── auth.ts
│   │   │   ├── transactions.ts
│   │   │   ├── goals.ts
│   │   │   ├── assets.ts
│   │   │   └── dashboard.ts
│   │   ├── components/          # Reusable components
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── charts/
│   │   │   └── layout/
│   │   ├── context/             # React context providers
│   │   │   └── AuthContext.tsx
│   │   ├── layouts/             # Page layouts
│   │   │   └── DashboardLayout.tsx
│   │   ├── pages/               # Application pages
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Transactions.tsx
│   │   │   ├── Goals.tsx
│   │   │   ├── Budget.tsx
│   │   │   ├── Investments.tsx
│   │   │   └── Profile.tsx
│   │   └── utils/               # Utility functions
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 📚 API Documentation

### Base URL
```
http://localhost:8000
```

### Authentication Endpoints

#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

Request Body:
{
  "name": "string",
  "email": "string",
  "password": "string"
}

Response: 200 OK
{
  "id": "string",
  "name": "string",
  "email": "string",
  "created_at": "datetime"
}
```

#### 2. Login (Get Access Token)
```http
POST /auth/token
Content-Type: application/x-www-form-urlencoded

Request Body:
username=user@example.com&password=yourpassword

Response: 200 OK
{
  "access_token": "string",
  "token_type": "bearer"
}
```

### Transaction Endpoints

#### 3. Create Transaction
```http
POST /transactions/
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "amount": 100.50,
  "type": "income | expense",
  "category": "string",
  "description": "string",
  "date": "datetime"
}

Response: 200 OK
{
  "id": "string",
  "user_id": "string",
  "amount": 100.50,
  "type": "income",
  "category": "salary",
  "description": "Monthly salary",
  "date": "datetime"
}
```

#### 4. Get All Transactions
```http
GET /transactions/?skip=0&limit=100
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "string",
    "user_id": "string",
    "amount": 100.50,
    "type": "income",
    "category": "string",
    "description": "string",
    "date": "datetime"
  }
]
```

### Goal Endpoints

#### 5. Create Goal
```http
POST /goals/
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "name": "string",
  "target_amount": 5000.00,
  "current_amount": 1000.00,
  "deadline": "datetime",
  "completed": false
}

Response: 200 OK
{
  "id": "string",
  "user_id": "string",
  "name": "Emergency Fund",
  "target_amount": 5000.00,
  "current_amount": 1000.00,
  "deadline": "datetime",
  "completed": false
}
```

#### 6. Get All Goals
```http
GET /goals/?skip=0&limit=100
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "string",
    "user_id": "string",
    "name": "string",
    "target_amount": 5000.00,
    "current_amount": 1000.00,
    "deadline": "datetime",
    "completed": false
  }
]
```

### Asset Endpoints

#### 7. Create Asset
```http
POST /assets/
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "name": "string",
  "type": "real_estate | vehicle | investment | cash | other",
  "current_value": 50000.00,
  "purchase_date": "datetime",
  "notes": "string"
}

Response: 200 OK
{
  "id": "string",
  "user_id": "string",
  "name": "House",
  "type": "real_estate",
  "current_value": 50000.00,
  "purchase_date": "datetime",
  "notes": "string",
  "created_at": "datetime"
}
```

#### 8. Get All Assets
```http
GET /assets/
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "string",
    "user_id": "string",
    "name": "string",
    "type": "string",
    "current_value": 50000.00,
    "purchase_date": "datetime",
    "notes": "string",
    "created_at": "datetime"
  }
]
```

#### 9. Get Asset by ID
```http
GET /assets/{asset_id}
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "string",
  "user_id": "string",
  "name": "string",
  "type": "string",
  "current_value": 50000.00,
  "purchase_date": "datetime",
  "notes": "string",
  "created_at": "datetime"
}
```

#### 10. Update Asset
```http
PUT /assets/{asset_id}
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "name": "string",
  "type": "string",
  "current_value": 55000.00,
  "purchase_date": "datetime",
  "notes": "string"
}

Response: 200 OK
{
  "id": "string",
  "user_id": "string",
  "name": "Updated House",
  "type": "real_estate",
  "current_value": 55000.00,
  "purchase_date": "datetime",
  "notes": "string",
  "created_at": "datetime"
}
```

#### 11. Delete Asset
```http
DELETE /assets/{asset_id}
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Asset deleted successfully"
}
```

### Dashboard Endpoints

#### 12. Get Dashboard Summary
```http
GET /dashboard/summary
Authorization: Bearer <token>

Response: 200 OK
{
  "net_worth": 15000.50,
  "monthly_income": 5000.00,
  "monthly_expenses": 3000.00,
  "category_expenses": [
    {
      "name": "Food",
      "value": 500.00
    },
    {
      "name": "Transport",
      "value": 300.00
    }
  ],
  "monthly_series": [
    {
      "name": "Sep",
      "value": 2000.00
    },
    {
      "name": "Oct",
      "value": 4000.00
    }
  ],
  "user_name": "John Doe"
}
```

### Health Check Endpoints

#### 13. Root Endpoint
```http
GET /

Response: 200 OK
{
  "message": "Welcome to the Wealth Management API (MongoDB)"
}
```

#### 14. Health Check
```http
GET /health

Response: 200 OK
{
  "status": "ok",
  "database": "mongodb"
}
```

## 🔐 Authentication Flow

1. User registers via `/auth/register`
2. User logs in via `/auth/token` and receives JWT token
3. Frontend stores token in localStorage
4. All subsequent requests include token in Authorization header: `Bearer <token>`
5. Backend validates token and extracts user information
6. Protected routes require valid token

## 📊 Data Models

### User
- `id`: ObjectId
- `name`: string
- `email`: string (unique)
- `hashed_password`: string
- `created_at`: datetime

### Transaction
- `id`: ObjectId
- `user_id`: string
- `amount`: float
- `type`: "income" | "expense"
- `category`: string
- `description`: string (optional)
- `date`: datetime

### Goal
- `id`: ObjectId
- `user_id`: string
- `name`: string
- `target_amount`: float
- `current_amount`: float
- `deadline`: datetime (optional)
- `completed`: boolean

### Asset
- `id`: ObjectId
- `user_id`: string
- `name`: string
- `type`: string
- `current_value`: float
- `purchase_date`: datetime (optional)
- `notes`: string (optional)
- `created_at`: datetime

## 🚀 Setup & Installation

### Prerequisites

1.  **Node.js** (v18+)
2.  **Python** (v3.9+)
3.  **MongoDB** (Community Server) running locally on default port `27017`

### 1. Database Setup
Ensure your MongoDB server is running:
```bash
# Verify MongoDB is up
mongod --version
```
*Note: If you installed MongoDB as a service, it should be running automatically.*

### 2. Backend Setup (FastAPI)
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create and activate virtual environment:
    ```bash
    python -m venv venv
    
    # Windows
    .\venv\Scripts\activate
    
    # Linux/Mac
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Create `.env` file (optional):
    ```env
    MONGODB_URL=mongodb://localhost:27017
    SECRET_KEY=your-secret-key-here
    ```
5.  Start the server:
    ```bash
    uvicorn app.main:app --reload
    ```
    The API will be available at `http://localhost:8000`.
    
    Interactive API documentation: `http://localhost:8000/docs`

### 3. Frontend Setup (React)
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
    The app will be available at `http://localhost:5173`.

## 🌐 Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory:
```env
MONGODB_URL=mongodb://localhost:27017
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend
Update the API base URL in `src/api/client.ts` if needed (default: `http://localhost:8000`)

## 🔧 Development

### Backend
- Interactive API docs: `http://localhost:8000/docs`
- Alternative API docs: `http://localhost:8000/redoc`
- Run tests: `python test_mongodb_connection.py`

### Frontend
- Development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint code: `npm run lint`

## 🛠️ Technologies Used

### Frontend
- React 19 with TypeScript
- Vite for fast development and building
- TailwindCSS for styling
- Recharts for data visualization
- Axios for API requests
- React Router for navigation
- Context API for state management

### Backend
- FastAPI for high-performance API
- Beanie ODM for MongoDB object modeling
- JWT for secure authentication
- Pydantic for data validation
- CORS middleware for cross-origin requests
- Uvicorn ASGI server

## 📝 License

This project is open source and available under the MIT License.
