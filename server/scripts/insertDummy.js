const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'viralstan_crm',
    port: process.env.DB_PORT || 3306
};

async function insertDummy() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.query(
            'INSERT INTO industries (title, slug, content) VALUES (?, ?, ?)',
            ['Dummy Industry Test', 'dummy-test', 'Testing database connection']
        );
        console.log('✅ Dummy row inserted! ID:', result.insertId);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error inserting dummy:', error.message);
        process.exit(1);
    }
}

insertDummy();
