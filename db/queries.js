const pool = require("./pool");

async function findAccountByUsername(username) {
  const { rows } = await pool.query(
    `SELECT * FROM accounts WHERE username = $1`,
    [username],
  );
  return rows;
}

async function createNewAccount(accountData) {
  const { first_name, last_name, username, password } = accountData;

  await pool.query(
    `INSERT INTO accounts (first_name, last_name, username, password, is_member, is_admin) VALUES ($1, $2, $3, $4, FALSE, FALSE);`,
    [first_name, last_name, username, password],
  );
}

module.exports = { findAccountByUsername, createNewAccount };
