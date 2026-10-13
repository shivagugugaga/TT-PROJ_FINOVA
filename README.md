# 💎 Finova — Next-Generation Wealth & Expense Intelligence Platform

<p align="center">
  <img alt="Spring Boot" src="https://img.shields.io/badge/Spring%20Boot-3.2.1-darkgreen?style=for-the-badge&logo=springboot">
  <img alt="React.js" src="https://img.shields.io/badge/React.js-18.2.0-blue?style=for-the-badge&logo=react">
  <img alt="MySQL" src="https://img.shields.io/badge/MySQL-8.0-red?style=for-the-badge&logo=mysql">
  <img alt="JWT" src="https://img.shields.io/badge/JWT-Secured-orange?style=for-the-badge&logo=jsonwebtokens">
  <img alt="Design" src="https://img.shields.io/badge/UI%2FUX-FinTech%20Aesthetic-purple?style=for-the-badge">
</p>

---

## 🌟 Overview

**Finova** is a full-stack financial intelligence and expense management web application engineered with **Spring Boot 3.2.1**, **React 18**, and **MySQL**. It features a modern fintech interface with deep dark/light mode theming, real-time KPI metrics, visual budget limits, recurring payment tracking, and multi-role security.

---

## ✨ Key Features & Aesthetic Upgrades

### 🎨 Modernized User Interface
- **FinTech Visual Aesthetic**: Re-engineered with modern typography (**Plus Jakarta Sans** & **Space Grotesk**), smooth glassmorphism, responsive grid layouts, and ambient glow accents.
- **Persistent Theming**: Dual `.light` and `.dark` modes with automatic system preference detection and localStorage persistence.
- **Interactive KPI Cards**: Real-time monthly metrics (Total Income, Total Expenses, Cash in Hand, and Activity Logs) with dynamic trend badges and colored gradients.
- **Dynamic Charts**:
  - **Category Breakdown Donut Chart**: Harmonic palette with centered donut cutout and clean tooltips powered by Recharts.
  - **Monthly Budget Half-Gauge**: Visual progress indicator showing real-time budget utilization, warnings, and quick ceiling editing.
  - **12-Month Area Cashflow Trajectory**: Gradient area chart contrasting monthly income vs. expenditures.
- **Smart Recurring & Saved Plans**: Manage subscriptions (Netflix, Rent, VPS) with overdue status chips, one-click logging, and skip options.
- **Role-Based Admin Console**: Comprehensive administration suite for user management, system-wide transaction ledger inspection, and transaction categories.

---

## 🏗️ Project Architecture

```
finova-expense-tracker/
├── backend/                             # Spring Boot 3.2.1 Microservice
│   ├── pom.xml                          # Maven build dependencies (JPA, Security, JJWT, MySQL)
│   ├── mvnw / mvnw.cmd                  # Maven wrappers
│   ├── src/main/java/com/fullStack/expenseTracker/
│   │   ├── ExpenseTrackerApplication.java
│   │   ├── controllers/                 # REST Endpoints (Auth, Budget, Category, Transaction, etc.)
│   │   ├── dataSeeders/                 # Role & TransactionType seeders
│   │   ├── dto/                         # Request and Response DTOs
│   │   ├── enums/                       # ERole, ETransactionType, ETransactionFrequency
│   │   ├── exceptions/                  # Global business exceptions
│   │   ├── handlers/                    # Global exception advisors
│   │   ├── models/                      # JPA Entities (User, Transaction, Budget, Category)
│   │   ├── repository/                  # Spring Data JPA Repositories
│   │   ├── security/                    # Spring Security 6 & JJWT Filters
│   │   └── services/                    # Service layer contracts & implementations
│   └── src/main/resources/
│       └── application.properties       # Database, JWT Secret, and Mail configuration
│
├── frontend/                            # React 18 Application
│   ├── package.json                     # NPM Dependencies (React Router v6, Recharts, React Hook Form)
│   ├── public/
│   │   ├── index.html                   # HTML template with Google Fonts & FontAwesome 6
│   │   └── favicon.ico
│   └── src/
│       ├── App.js                       # Route declarations & Protected Routes
│       ├── index.js / index.css         # Design tokens, CSS variables, typography
│       ├── assets/styles/               # Modular CSS (welcome, dashboard, sidebar, header, etc.)
│       ├── components/                  # Reusable widgets (KPI cards, charts, sidebar, logo)
│       ├── pages/                       # Views (Welcome hero, Dashboard, Transactions, Settings, Admin)
│       └── services/                    # Axios API integration with JWT Interceptor
│
└── README.md                            # Documentation
```

---

## 🚀 Quickstart Guide

### 1. Database & Backend Configuration

1. Create a MySQL database named `expensetracker`:
   ```sql
   CREATE DATABASE expensetracker;
   ```
2. Open [`backend/src/main/resources/application.properties`](backend/src/main/resources/application.properties) and update your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/expensetracker
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD

   # Email service configuration (for registration verification and password reset)
   spring.mail.username=YOUR_GMAIL_ADDRESS
   spring.mail.password=YOUR_GMAIL_APP_PASSWORD
   ```
3. Run the Spring Boot application:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   *The backend will automatically create all tables and seed the initial security roles.*

---

### 2. Frontend Launch

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Launch the React development server:
   ```bash
   npm start
   ```
4. Access the application in your browser at [`http://localhost:3000`](http://localhost:3000).

---

## 🔒 Multi-Role Authentication

- **User Access**: Register an account on the sign-up page, verify via email code, and sign in to manage transactions, budgets, recurring bills, and view real-time statistics.
- **Admin Access**: To access the Admin Console (`/admin/transactions`, `/admin/users`, `/admin/categories`), assign the `ROLE_ADMIN` role to a user record in the `users_roles` join table in MySQL.

---

## 🛡️ Technology Stack

- **Frontend**: React 18, React Router DOM v6, Recharts, React Hook Form, React Hot Toast, FontAwesome 6.
- **Backend**: Spring Boot 3.2.1, Java 21, Spring Data JPA, Spring Security 6, JJWT (io.jsonwebtoken 0.11.5).
- **Database**: MySQL 8.0.
- **Styling**: Modern CSS3 Custom Properties with full Dark/Light theme token architecture.
