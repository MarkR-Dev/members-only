const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

// Uses custom username/password field values, could probably name variables and properties better in the future to avoid this
passport.use(
  new LocalStrategy(
    { usernameField: "username_login", passwordField: "password_login" },
    async (username, password, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM accounts WHERE username = $1",
          [username],
        );
        const user = rows[0];

        if (!user) {
          // Username doesn't exist
          return done(null, false, { message: "Incorrect username." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // Passwords do not match!
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// Stores the users id from the database into a session cookie, cryptographically signed on the browser end
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieves the user record from the database and stores it into req.user when the session is read
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM accounts WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
