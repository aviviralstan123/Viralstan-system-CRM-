const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateSchema() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306
    });

    try {
        console.log('Adding reset_password_token to users table...');
        await connection.query(`ALTER TABLE users ADD COLUMN reset_password_token VARCHAR(255)`);
        console.log('Success!');
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log('reset_password_token already exists.');
        } else {
            console.error('Error adding reset_password_token:', error.message);
        }
    }

    try {
        console.log('Adding reset_password_expires to users table...');
        await connection.query(`ALTER TABLE users ADD COLUMN reset_password_expires TIMESTAMP NULL`);
        console.log('Success!');
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log('reset_password_expires already exists.');
        } else {
            console.error('Error adding reset_password_expires:', error.message);
        }
    } finally {
        await connection.end();
    }
}

updateSchema();
