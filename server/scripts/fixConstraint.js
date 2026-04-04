const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'viralstan_crm',
    port: process.env.DB_PORT || 3306
};

async function fixConstraint() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // Find constraint name (usually industries_ibfk_1)
        console.log('--- Removing Foreign Key Constraint ---');
        await connection.query('ALTER TABLE industries DROP FOREIGN KEY industries_ibfk_1');
        console.log('✅ Foreign Key Constraint "industries_ibfk_1" removed!');
        process.exit(0);
    } catch (error) {
        console.log('⚠️ Note: Constraint not found or already removed (Continuing...).');
        process.exit(0);
    }
}

fixConstraint();
