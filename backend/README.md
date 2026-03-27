# QuickAppointment Backend

Node.js + Express + MySQL backend for authentication, contact requests, and dynamic home page APIs.

## Endpoints

- GET /api/health
- POST /api/auth/register
- POST /api/auth/login
- POST /api/contact
- GET /api/services
- GET /api/services/featured
- GET /api/testimonials
- GET /api/home
- GET /api/appointments/me (protected)
- GET /api/admin/overview (protected + admin)

## Home Page APIs

### GET /api/services
Returns all available services.

Query params:
- limit (optional, max 50)

### GET /api/services/featured
Returns featured services only.

Query params:
- limit (optional, max 50)

### GET /api/testimonials
Returns published testimonials.

Query params:
- limit (optional, max 50)

### GET /api/home
Returns a combined payload for homepage rendering.

Query params:
- servicesLimit (optional, max 50)
- featuredLimit (optional, max 50)
- testimonialsLimit (optional, max 50)

Example response:

```json
{
  "services": [],
  "featured": [],
  "testimonials": []
}
```

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

## Environment Variables

Required:
- PORT
- NODE_ENV
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
- JWT_SECRET
- JWT_EXPIRES_IN

Optional for home page API tuning:
- HOMEPAGE_FEATURED_LIMIT
- HOMEPAGE_TESTIMONIALS_LIMIT
- HOMEPAGE_CACHE_TTL_MS

Optional for contact email notifications:
- CONTACT_ADMIN_EMAIL
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- SMTP_FROM
- SMTP_SECURE

## Sample Auth Payloads

Register:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPass123!"
}
```

Login:

```json
{
  "email": "john@example.com",
  "password": "StrongPass123!"
}
```

Contact:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Need help booking",
  "message": "I need support with appointment booking."
}
```
