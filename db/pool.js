const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  connectionString: process.env.NEON_DB_CONNECTION_STRING,
});
