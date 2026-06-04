const path = require('path');
const dotenv = require('dotenv');

const loadEnv = () => {
  dotenv.config({ path: path.join(__dirname, '../.env') });
};

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === 'your_jwt_secret' || secret === 'your_jwt_secret_here') {
    throw new Error('JWT_SECRET must be set to a strong secret in backend/.env');
  }
  return secret;
};

const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  getJwtSecret();
};

module.exports = {
  loadEnv,
  validateEnv,
  getJwtSecret
};
