require('dotenv').config();

const normalizeOrigin = (value) => {
  try {
    return new URL(value).origin;
  } catch (error) {
    return null;
  }
};

const frontendUrls = [...new Set(
  [process.env.FRONTEND_URL, process.env.FRONTEND_URLS]
    .filter(Boolean)
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter(Boolean)
    .map(normalizeOrigin)
    .filter(Boolean)
)];

const requiredEnvs = ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET'];
const missingEnvs = requiredEnvs.filter(env => !process.env[env]);

if (frontendUrls.length === 0) {
  missingEnvs.push('FRONTEND_URL or FRONTEND_URLS');
}

if (missingEnvs.length > 0) {
  console.error(`❌ FATAL ERROR: Missing Required Environment Variables: ${missingEnvs.join(', ')}`);
  process.exit(1);
}

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  dbConfig: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  },
  frontendUrl: frontendUrls[0],
  frontendUrls
};
