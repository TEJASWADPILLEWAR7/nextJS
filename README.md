# Next.js Authentication Project

## 🚀 Overview

This is an authentication system built with Next.js, featuring email verification and password reset functionality. It includes user registration, login, email verification, and forgot password flows.

## 🛠 Tech Stack

- **Next.js** – React framework for server-side rendering
- **TypeScript** – Ensures type safety and better development experience
- **MongoDB** – NoSQL database for user storage
- **Mailtrap** – Email testing and delivery for verification and password reset emails
- **Tailwind CSS** – Utility-first styling for a responsive and modern UI

## ✨ Features

- User Registration & Login
- Email Verification (via Mailtrap)
- Forgot Password & Reset Password Functionality
- JWT Authentication & Authorization
- Secure Password Hashing (bcrypt)
- Responsive UI with Tailwind CSS

## 📂 Project Structure

```
nextjs-auth/
│-- src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Next.js API routes & frontend pages
│   ├── utils/        # Helper functions (e.g., JWT, hashing)
│   ├── models/       # Mongoose models
│   ├── styles/       # Tailwind styles
│-- .env.example      # Environment variables setup
│-- package.json      # Project dependencies
│-- README.md         # Project documentation
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/TEJASWADPILLEWAR7/nextJS.git
cd nextJS
```

### 2️⃣ Install Dependencies

```bash
yarn install  # or npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory and add the required variables:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4️⃣ Run the Development Server

```bash
yarn dev  # or npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## 📩 Email Functionality

- Mailtrap is used for email verification and password reset emails.
- Make sure to configure `MAILTRAP_USER` and `MAILTRAP_PASS` in your `.env.local` file.

## 🔐 Authentication Flow

1. **User registers** → Receives verification email → Clicks the link → Account is activated.
2. **Forgot password** → User enters email → Receives reset link → Resets password.

## 🛠 API Routes

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| POST   | /api/auth/register | Registers a new user      |
| POST   | /api/auth/login    | Logs in a user            |
| POST   | /api/auth/verify   | Verifies email address    |
| POST   | /api/auth/forgot   | Sends reset password link |
| POST   | /api/auth/reset    | Resets password           |

## 📜 License

This project is licensed under the **MIT License**.

---

### 🔗 Connect with Me

If you like this project, give it a ⭐ on GitHub!

👨‍💻 **Tejas Wadpillewar**
[GitHub](https://github.com/TEJASWADPILLEWAR7) • [LinkedIn](www.linkedin.com/in/tejas-wadpillewar7)
