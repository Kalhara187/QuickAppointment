# QuickAppointment Backend

Node.js + Express + MySQL backend for authentication and protected routes.

## Endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/appointments/me (protected)
- GET /api/admin/overview (protected + admin)

## Setup

1. Copy .env.example to .env and update credentials.
2. Run SQL from sql/schema.sql in MySQL.
3. Install dependencies:

```bash
npm install
```

4. Start server:

```bash
npm run dev
```

## Sample Register Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPass123!"
}
```

## Sample Login Payload

```json
{
  "email": "john@example.com",
  "password": "StrongPass123!"
}
```
