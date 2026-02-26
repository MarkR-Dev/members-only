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

async function createNewMessage(messageData) {
  const { message_title, message_body, accountId } = messageData;

  await pool.query(
    `INSERT INTO messages (title, message, account_id, date_posted) VALUES ($1, $2, $3, NOW());`,
    [message_title, message_body, accountId],
  );
}

module.exports = { findAccountByUsername, createNewAccount, createNewMessage };
