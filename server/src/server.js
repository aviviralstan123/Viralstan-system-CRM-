const { port, nodeEnv } = require('./config/env');
const app = require('./app');
const logger = require('./utils/logger');

app.listen(port, () => {
  logger.info(`Server is running on port ${port} in ${nodeEnv} mode`);
});

// hello 
