require('dotenv').config();
const emailService = require('./src/utils/emailService');

async function testConnection() {
    console.log('Testing Email Connection...');
    const result = await emailService.verifyConnection();
    if (result) {
        console.log('✅ Connection Successful!');
    } else {
        console.log('❌ Connection Failed. Check your EMAIL_USER and EMAIL_PASS in .env');
    }
    process.exit(0);
}

testConnection();
