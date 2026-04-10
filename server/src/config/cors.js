// FILE: server/src/config/cors.js

const { frontendUrl } = require('./env');

// Extract only the origin (protocol + host) from FRONTEND_URL.
// This prevents CORS failures if the env var accidentally includes a path (e.g. /login).
const allowedOrigin = frontendUrl ? new URL(frontendUrl).origin : '';

const corsOptions = {
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
