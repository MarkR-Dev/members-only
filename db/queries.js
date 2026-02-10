const pool = require("./pool");

async function findAccountByUsername(username) {
  const { rows } = await pool.query(
    `SELECT * FROM accounts WHERE username = $1`,
    [username],
  );
  return rows;
}

module.exports = { findAccountByUsername };
