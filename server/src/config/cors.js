// FILE: server/src/config/cors.js

const { frontendUrls, nodeEnv } = require('./env');

const allowedOrigins = new Set(frontendUrls);
const isLocalOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
// Allow any Vercel preview/production URL for the viralstan project
const isVercelPreview = (origin) => /^https:\/\/viralstan[^.]*\.vercel\.app$/i.test(origin);

const corsOptions = {
    origin(origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (
            allowedOrigins.has(origin) ||
            isVercelPreview(origin) ||
            (nodeEnv !== 'production' && isLocalOrigin(origin))
        ) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
