const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'viralstan_crm',
    port: process.env.DB_PORT || 3306
};

async function checkServices() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query('SELECT id, title FROM services');
        console.log('--- Services in Database ---');
        console.log(JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('❌ Error reading services:', error.message);
        process.exit(1);
    }
}

checkServices();
