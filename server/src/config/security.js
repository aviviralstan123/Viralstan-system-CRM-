const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

/**
 * Security middleware configuration.
 */
const securityMiddleware = (app) => {
    // 1. Helmet for security headers
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'", "https:"]
            }
        },
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" }
    }));

    // 2. Global Rate Limiting
    const globalLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: {
            success: false,
            message: 'Too many requests from this IP, please try again after 15 minutes'
        },
        standardHeaders: true,
        legacyHeaders: false
    });

    // 3. Login specific rate limiting (Stricter)
    const loginLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 10, // Limit each IP to 10 login attempts (increase a bit for production)
        message: {
            success: false,
            message: 'Too many login attempts, please try again after 15 minutes'
        },
        standardHeaders: true,
        legacyHeaders: false
    });

    app.use('/api', globalLimiter);
    app.use('/api/auth/login', loginLimiter);
};

module.exports = securityMiddleware;
