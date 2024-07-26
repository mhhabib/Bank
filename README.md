
# Bank Application

A comprehensive banking solution built with modern web technologies. This application includes a full-featured backend and frontend, enabling user registration, authentication, account management, and balance transfers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)

## Features

- **User Registration and Authentication**: Secure JWT-based authentication.
- **Account Management**: Create and manage multiple bank accounts.
- **Balance Transfer**: Transfer balance between accounts.
- **View Balance History**: Detailed view of balance transfer history.

## Technologies Used

### Backend

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **SQLite**
- **TypeScript**
- **JWT Authentication**

### Frontend

- **React.js**
- **Tailwind CSS**

## API Endpoints

### User Routes

- **Register a new user**
  - `POST /api/users/register`

- **Login an existing user**
  - `POST /api/users/login`

- **Get authenticated user profile**
  - `GET /api/users/me`

### Account Routes

- **Create a new account**
  - `POST /api/accounts/`

- **Get all accounts**
  - `GET /api/accounts/`

- **Transfer balance between accounts**
  - `POST /api/accounts/transfer`

- **Get balance transfer history for a specific account**
  - `GET /api/accounts/:userId/balance-history/:accountId/`

- **Get all accounts for all users**
  - `GET /api/accounts/all`

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **npm**: Node Package Manager comes with Node.js.

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/mhhabib/Bank.git
cd Bank
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

### Running the Application

1. **Start the backend server**

```bash
cd backend
npm run dev
```

2. **Start the frontend server**

```bash
cd ../frontend
npm start
```

The application should now be running. The frontend is accessible at `http://localhost:3000` and the backend API at `http://localhost:3001`.

## Usage

1. **Register a new user** via the frontend registration form or using the `POST /api/users/register` API endpoint.
2. **Login** using the `POST /api/users/login` endpoint to receive a JWT token.
3. **Create an account** via the frontend or using the `POST /api/accounts/` endpoint.
4. **Transfer balance** between accounts using the frontend form or the `POST /api/accounts/transfer` endpoint.
5. **View balance history** through the frontend interface or using the `GET /api/accounts/:userId/balance-history/:accountId/` endpoint.

