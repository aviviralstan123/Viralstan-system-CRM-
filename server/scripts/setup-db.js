const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

console.log('🚀 Starting database setup script...');

const setupDB = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        multipleStatements: true
    });

    console.log('✅ Connected to MySQL server.');

    try {
        const schemaPath = path.join(__dirname, '../../database/schema.sql');
        const seedPath = path.join(__dirname, '../../database/seed.sql');

        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        const seedSql = fs.readFileSync(seedPath, 'utf8');

        console.log('⚡ Initializing database schema...');
        await connection.query(schemaSql);
        console.log('✅ Schema initialized successfully.');

        console.log('🌱 Seeding database...');
        await connection.query(seedSql);
        console.log('✅ Database seeded successfully.');

    } catch (error) {
        const errorMsg = `❌ Error setting up database:\nCode: ${error.code}\nMessage: ${error.message}\nStack: ${error.stack}`;
        console.error(errorMsg);
        fs.appendFileSync(path.join(__dirname, '../setup_error_log.txt'), errorMsg);
    } finally {
        await connection.end();
        console.log('👋 Connection closed.');
    }
};

setupDB();
