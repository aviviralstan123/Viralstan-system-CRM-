const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Always log to console so Render/cloud platforms can capture logs
logger.add(new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  )
}));

module.exports = logger;
