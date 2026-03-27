# QuickAppointment Backend

Node.js + Express + MySQL backend for authentication, contact requests, and dynamic home/services page APIs.

## Endpoints

- GET /api/health
- POST /api/auth/register
- POST /api/auth/login
- POST /api/contact
- GET /api/services
- GET /api/services/:id
- POST /api/services (admin)
- PUT /api/services/:id (admin)
- DELETE /api/services/:id (admin)
- GET /api/services/featured
- GET /api/testimonials
- GET /api/home
- GET /api/appointments/me (protected)
- GET /api/admin/overview (protected + admin)

## Home Page APIs

### GET /api/services
Returns all available services.

Query params:
- limit (optional, max 50, default 30)
- search (optional, filters by name or description)
- sortBy (optional, default 'id', valid: id, name, price, created_at, updated_at)
- sortOrder (optional, default 'DESC', valid: ASC, DESC)

### GET /api/services/featured
Returns featured services only (cached).

Query params:
- limit (optional, max 50, default 6)

### GET /api/testimonials
Returns published testimonials (cached).

Query params:
- limit (optional, max 50, default 6)

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

## Services Page APIs (CRUD)

### GET /api/services/:id
Retrieve a single service by ID.

Response:
```json
{
  "success": true,
  "message": "Service fetched successfully.",
  "data": {
    "service": {
      "id": 1,
      "name": "General Consultation",
      "description": "Fast appointments for checkups.",
      "price": 49.99,
      "image": null,
      "icon": "GC",
      "isAvailable": true,
      "isFeatured": true,
      "createdAt": "2026-03-27T10:00:00.000Z",
      "updatedAt": "2026-03-27T10:00:00.000Z"
    }
  }
}
```

### POST /api/services (Admin only)
Create a new service. Requires authentication + admin role.

Request body:
```json
{
  "name": "Service Name",
  "description": "Detailed service description...",
  "price": 99.99,
  "imageUrl": "https://...",
  "icon": "SN",
  "isFeatured": false
}
```

Validation:
- name: 3-120 characters (required)
- description: 10-2000 characters (required)
- price: 0-999999.99 (optional, can be null)
- imageUrl: URL string (optional)
- icon: short code (optional)

Response:
```json
{
  "success": true,
  "message": "Service created successfully.",
  "data": {
    "serviceId": 7
  }
}
```

### PUT /api/services/:id (Admin only)
Update an existing service. Requires authentication + admin role.

Request body (all fields optional):
```json
{
  "name": "Updated Name",
  "description": "Updated description...",
  "price": 149.99,
  "imageUrl": "https://...",
  "icon": "UN",
  "isAvailable": true,
  "isFeatured": true,
  "featuredRank": 2
}
```

Response:
```json
{
  "success": true,
  "message": "Service updated successfully."
}
```

### DELETE /api/services/:id (Admin only)
Delete a service. Requires authentication + admin role.

Response:
```json
{
  "success": true,
  "message": "Service deleted successfully."
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
