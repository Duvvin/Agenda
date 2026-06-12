require('dotenv').config();

const requiredEnvVars = ['MONGODB_URI'];

const missing = requiredEnvVars.filter((key) => !process.env[key]);

if (missing.length > 0) {
  throw new Error(
    `Variáveis de ambiente obrigatórias não definidas: ${missing.join(', ')}`
  );
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodbUri: process.env.MONGODB_URI,
  isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
