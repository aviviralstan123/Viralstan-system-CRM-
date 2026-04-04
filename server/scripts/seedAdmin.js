const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'viralstan_crm',
    port: process.env.DB_PORT || 3306
};

async function seed() {
    try {
        const pool = mysql.createPool(dbConfig);
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', ['admin@viralstan.com']);
        
        if (users.length > 0) {
            console.log('✅ Admin user already exists!');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            ['Admin', 'admin@viralstan.com', hashedPassword, 'admin']
        );

        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@viralstan.com');
        console.log('Password: admin123');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
        process.exit(1);
    }
}

seed();
