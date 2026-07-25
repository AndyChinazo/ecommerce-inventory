# TARS SPORT

## Software Architecture Document

---

# 1. Project Overview

TARS SPORT is a responsive Single Page Application (SPA) that allows customers to purchase sports equipment through a secure payment flow.

The application integrates with a payment gateway Sandbox environment to simulate real credit card transactions.

The system also manages products, stock, customers, deliveries and payment transactions.

---

# 2. Goals

• Responsive Mobile First Design

• Clean Architecture

• Hexagonal Architecture

• REST API

• PostgreSQL Database

• Secure Payment Flow

• Unit Tests (>80%)

• Cloud Deployment

---

# 3. Main Technologies

Frontend

- React
- TypeScript
- Redux Toolkit
- TailwindCSS
- Axios
- React Hook Form
- Zod

Backend

- NestJS
- Prisma ORM
- PostgreSQL
- Swagger
- Jest

Infrastructure

- Docker
- Railway
- Vercel

---

# 4. Functional Modules

- Product
- Inventory
- Customer
- Delivery
- Transaction
- Payment

---

# 5. User Flow

1. User opens the store.
2. Products are loaded from Backend.
3. User selects a product.
4. User enters delivery information.
5. User enters payment information.
6. System creates a pending transaction.
7. Backend processes the payment.
8. Stock is updated.
9. Delivery is created.
10. User sees payment result.

---

# 6. Architecture Style

Hexagonal Architecture

Ports & Adapters

Railway Oriented Programming (ROP)

RESTful API

---

# 7. Security

- HTTPS
- Environment Variables
- Sensitive information never stored
- Server-side payment processing
- Input validation

---

# 8. Deployment

Frontend → Vercel

Backend → Railway

Database → PostgreSQL

---

# 9. Testing

Frontend

- Components
- Redux
- Utilities

Backend

- Services
- Use Cases
- Repositories

Coverage > 80%