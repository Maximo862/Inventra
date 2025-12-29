# 🧾 Inventory Management System

Fullstack inventory management system built with **React + Vite + TailwindCSS** and **Express + MySQL**.

---

## 🚀 Features

- Authentication system with roles (admin / employee)
- Full CRUD for:
  - Categories
  - Products
  - Suppliers
  - Users
  - Orders
- Orders system (entries and exits)
- Real-time stock calculation based on orders
- Low stock alerts
- Expiration date alerts
- Filters for:
  - Expired products
  - Near-to-expire products
  - Low stock products
  - Entry / Exit order types
- Dashboard with analytics:
  - Top 10 best selling products
  - Monthly and total profits
  - Stock by category
  - Top 3 products
  - Alerts overview
- Toast notifications using **react-hot-toast**
- Charts built with **Recharts**

---


## 🛠️ Tech Stack

### Frontend

- React 
- TypeScript
- Vite
- TailwindCSS
- React Router
- React Hot Toast
- Recharts
- DayJS

### Backend

- Node.js
- Express
- MySQL
- JWT Authentication
- bcrypt
- Zod for validation
- Cookie Parser
- CORS
- Dotenv

---

## Database Design

The system uses a relational database designed to handle users, products,
categories, suppliers, and stock movements.

Key aspects:
- One-to-many relationships between users and orders
- Many-to-many relationship between products and suppliers
- Normalized structure for scalability and maintainability

![Database Schema](Frontend/Frontend/src/docs/InventoryManagement_Tables.png)

---

## Author
Maximo Kugler — Fullstack Developer
GitHub: https://github.com/Maximo862
Email: rodri7.9.02313@gmail.com
