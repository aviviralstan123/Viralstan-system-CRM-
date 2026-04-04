const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'viralstan_crm',
    port: process.env.DB_PORT || 3306
};

async function checkAllData() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('--- Tables info ---');
        
        const [industries] = await connection.query('SELECT * FROM industries');
        console.log('Industries count:', industries.length);
        
        const [services] = await connection.query('SELECT * FROM services');
        console.log('Services count:', services.length);
        if (services.length > 0) {
            console.log('Services IDs:', services.map(s => s.id));
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error reading database:', error.message);
        process.exit(1);
    }
}

checkAllData();
