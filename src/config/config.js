import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp_dev',
    port: process.env.PORT || 3000,
    node_env: 'development',
    logging: true
  },
  test: {
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp_test',
    port: process.env.PORT || 3000,
    node_env: 'test',
    logging: false
  },
  production: {
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp_prod',
    port: process.env.PORT || 3000,
    node_env: 'production',
    logging: false
  }
};
