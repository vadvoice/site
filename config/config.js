let config = {};
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  const { env } = process;

  config = {
    mongo: {
      user: env.MONGO_USER,
      pass: env.MONGO_PASS,
      db: env.MONGO_DB,
      port: env.MONGO_PORT,
      uri: env.MONGODB_URI
    }
  }
}

module.exports = {...config}
