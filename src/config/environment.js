require("dotenv").config()

const env = {
  DATABASE_URI: process.env.DB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  PORT: process.env.PORT
}

module.exports = env