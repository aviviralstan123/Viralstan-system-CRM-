const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'viralstan_crm',
    port: process.env.DB_PORT || 3306
};

async function seedServices() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('--- Seeding Services ---');
        
        const services = [
            ['SEO Optimization', 'Full SEO audit and optimization', 2500, 'SEO', 'seo-optimization-viralstan', 'Professional SEO services', 1],
            ['Social Media Management', 'Complete social media strategy and management', 3000, 'Social', 'social-media-management-viralstan', 'Social media strategy', 1],
            ['Content Marketing', 'Blog posts, whitepapers, and content strategy', 2000, 'Content', 'content-marketing-viralstan', 'Content strategy services', 1]
        ];

        for (const s of services) {
            await connection.query(
                'INSERT IGNORE INTO services (title, description, price, category, meta_title, meta_description, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
                s
            );
        }

        console.log('✅ Services seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
}

seedServices();
