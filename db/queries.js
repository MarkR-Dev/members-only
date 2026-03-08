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

// The date/timestamp is stored in the DB via the NOW() function but I didn't want that format to display in the view, decided to format it here when retrieving from the DB, orders the messages by id in descending order to have the newest created messages at the top. For the future, theres probably better ways to handle this
async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT messages.id, messages.title, messages.message, accounts.username, to_char(messages.date_posted, 'DD/MM/YYYY HH24:MI:SS') AS formatted_date FROM messages JOIN accounts ON messages.account_id = accounts.id ORDER BY id DESC;`,
  );
  return rows;
}

async function updateIsMember(userId) {
  await pool.query(
    `
    UPDATE accounts SET is_member = TRUE WHERE id = $1;`,
    [userId],
  );
}

module.exports = {
  findAccountByUsername,
  createNewAccount,
  createNewMessage,
  getAllMessages,
  updateIsMember,
};
