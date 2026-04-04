# Database Design

## MySQL Tables

### 1. `users`
- Stores administrative and editor accounts.
- Roles: `admin`, `editor`, `viewer`.

### 2. `clients`
- Stores customer information.
- Linked to `invoices`.

### 3. `leads`
- Stores potential customer inquiries.
- Status: `new`, `contacted`, `qualified`, `converted`, `lost`.

### 4. `services`
- Stores offered services and prices.

### 5. `blogs`
- Content management system for the website.
- Linked to `users` (author).

### 6. `invoices`
- Billing management.
- Linked to `clients`.
- Contains `invoice_items`.

### 7. `payments`
- Tracks payments for invoices.

## Relationships
- `blogs.author_id` → `users.id`
- `invoices.client_id` → `clients.id`
- `invoice_items.invoice_id` → `invoices.id`
- `payments.invoice_id` → `invoices.id`
