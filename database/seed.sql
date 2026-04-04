USE viralstan_crm;

-- Dummy Users (Password: password123)
-- bcrypt hash of 'password123'
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@viralstan.com', '$2a$10$xPb1WvKHlhtRMTEZrgb.8O8AfYdsZa9Zf4/2RHsOlD2So/fdAWQWm', 'admin'),
('Editor User', 'editor@viralstan.com', '$2a$10$xPb1WvKHlhtRMTEZrgb.8O8AfYdsZa9Zf4/2RHsOlD2So/fdAWQWm', 'editor');

-- Dummy Clients
INSERT INTO clients (name, email, phone, company, address, status) VALUES 
('Alex Thompson', 'alex@techcorp.com', '+1 555-0101', 'TechCorp', '123 Tech Lane', 'active'),
('Sarah Chen', 'sarah@innovate.io', '+1 555-0102', 'Innovate.io', '456 Design St', 'active'),
('James Park', 'james@startupx.com', '+1 555-0105', 'StartupX', '789 Startup Blvd', 'prospect');

-- Dummy Services
INSERT INTO services (title, description, price, category, meta_title, meta_description) VALUES 
('SEO Optimization', 'Boost your website ranking', 2500.00, 'SEO', 'SEO Optimization | Viralstan', 'Professional SEO services'),
('Web Development', 'Custom website building', 8000.00, 'Development', 'Web Development | Viralstan', 'Web development services');

-- Dummy Leads
INSERT INTO leads (name, email, phone, company, source, status, value, message) VALUES 
('Robert Chen', 'robert@futuretech.com', '+1 555-0110', 'FutureTech', 'Website', 'new', 15000.00, 'Looking for SEO help'),
('Amanda Foster', 'amanda@greenleaf.co', '+1 555-0111', 'GreenLeaf', 'Referral', 'contacted', 8000.00, 'Interested in social media');

-- Dummy Invoices
INSERT INTO invoices (invoice_number, client_id, issue_date, due_date, subtotal, total_amount, status) VALUES 
('INV-001', 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), 2500.00, 2500.00, 'paid'),
('INV-002', 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 8000.00, 8000.00, 'sent');

-- Dummy Invoice Items
INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, total_price) VALUES 
(1, 'SEO Service', 1, 2500.00, 2500.00),
(2, 'Web Development', 1, 8000.00, 8000.00);

-- Dummy Payments
INSERT INTO payments (invoice_id, amount, payment_method, transaction_id, status) VALUES 
(1, 2500.00, 'online', 'TXN_123456', 'completed');
