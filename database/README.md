# Database Setup - Viralstan CRM

This folder contains the database schema and seeds for the Viralstan CRM system using MySQL.

## Prerequisites
- MySQL Server installed and running.
- A user with permissions to create databases.

## Setup Instructions

1. **Create the Database and Tables:**
   Import the `schema.sql` file into your MySQL server.
   ```bash
   mysql -u your_username -p < schema.sql
   ```

2. **Seed Initial Data:**
   Import the `seed.sql` file to add initial admin users and dummy data.
   ```bash
   mysql -u your_username -p < seed.sql
   ```

3. **Configure Environment Variables:**
   Make sure to update the `.env` file in the `server/` directory with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=viralstan_crm
   ```

## Tables
- `users`: Authentication and roles.
- `clients`: Client information.
- `leads`: Sales leads.
- `services`: Offered services.
- `blogs`: Content management.
- `invoices`: Billing information.
- `invoice_items`: Items within an invoice.
- `payments`: Payment tracking.
