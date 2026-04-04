# API Documentation - Viralstan CRM

## Base URL
`http://localhost:5000/api`

## Authentication
- **Register**: `POST /auth/register`
- **Login**: `POST /auth/login`

## Users (Admin Only)
- **List Users**: `GET /users`
- **Update Role**: `PATCH /users/:id/role`
- **Delete User**: `DELETE /users/:id`

## Clients
- **List Clients**: `GET /clients`
- **Get Client**: `GET /clients/:id`
- **Create Client**: `POST /clients`
- **Update Client**: `PUT /clients/:id`
- **Delete Client**: `DELETE /clients/:id`

## Leads
- **Public Create**: `POST /leads/public` (No Auth)
- **List Leads**: `GET /leads`
- **Get Lead**: `GET /leads/:id`
- **Create Lead**: `POST /leads`
- **Update Lead**: `PUT /leads/:id`
- **Delete Lead**: `DELETE /leads/:id`

## Blogs
- **Public List**: `GET /blogs` (No Auth)
- **Public Get**: `GET /blogs/:slug` (No Auth)
- **Create Blog**: `POST /blogs`
- **Update Blog**: `PUT /blogs/:id`
- **Delete Blog**: `DELETE /blogs/:id`

## Services
- **Public List**: `GET /services` (No Auth)
- **Get Service**: `GET /services/:id`
- **Create Service**: `POST /services`
- **Update Service**: `PUT /services/:id`
- **Delete Service**: `DELETE /services/:id`

## Invoices
- **List Invoices**: `GET /invoices`
- **Get Invoice**: `GET /invoices/:id`
- **Create Invoice**: `POST /invoices`
- **Update Status**: `PATCH /invoices/:id/status`
- **Delete Invoice**: `DELETE /invoices/:id`

## Payments
- **List Payments**: `GET /payments`
- **Create Payment**: `POST /payments`
