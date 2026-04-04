const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'viralstan_crm',
    port: process.env.DB_PORT || 3306
};

async function checkData() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query('SELECT * FROM industries');
        console.log('--- Industries in Database ---');
        console.log(JSON.stringify(rows, null, 2));
        console.log('Total rows:', rows.length);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error reading database:', error.message);
        process.exit(1);
    }
}

checkData();
