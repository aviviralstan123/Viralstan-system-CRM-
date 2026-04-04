// FILE: server/src/config/database.js

const mysql = require('mysql2/promise');
const { dbConfig } = require('./env');
const logger = require('../utils/logger');

const dbConnectionConfig = {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};

let pool;

const connectDB = async (retries = 5) => {
    while (retries) {
        try {
            pool = mysql.createPool(dbConnectionConfig);
            const connection = await pool.getConnection();
            logger.info('✅ MySQL Connected Successfully to pool');
            connection.release();
            return pool;
        } catch (err) {
            logger.error(`❌ MySQL Connection Error: ${err.message}`);
            retries -= 1;
            if (retries === 0) {
                logger.error('Could not connect to database. Exiting...');
                process.exit(1);
            }
            logger.info(`Retrying connection... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
};

connectDB();

module.exports = {
    query: (sql, params) => pool.query(sql, params),
    getConnection: () => pool.getConnection(),
    pool
};
