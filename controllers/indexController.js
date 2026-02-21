const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");

async function getIndexMessages(req, res) {
  res.render("index", { title: "Members Only | Messages" });
}

async function getSignUp(req, res) {
  res.render("sign-up", { title: "Members Only | Sign Up" });
}

const validateSignUp = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 1, max: 50 })
    .withMessage("First name length must be between 1-50 letters.")
    .isAlpha()
    .withMessage("First name must only contain alphabet letters."),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name length must be between 1-50 letters.")
    .isAlpha()
    .withMessage("Last name must only contain alphabet letters."),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Username length must be between 1-50 characters.")
    .custom(async (usernameValue) => {
      // Custom validator to check for username already in use
      const user = await db.findAccountByUsername(usernameValue);

      // If the returned query row length is truthy E.g not 0, that means an account exists with that username already
      if (user.length) {
        throw new Error("Username is already in use.");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password length must be between 8-20 characters."),
  body("confirm_password")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required.")
    .isLength({ min: 8, max: 20 })
    .withMessage("Confirm password length must be between 8-20 characters.")
    .custom((confirmValue, { req }) => {
      // Custom validator to check that password and confirm password input fields are identical
      if (confirmValue !== req.body.password) {
        throw new Error(
          "Confirm password must match the previously entered password.",
        );
      } else {
        return true;
      }
    }),
];

const postSignUp = [
  validateSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const prevData = matchedData(req, { onlyValidData: false });

      return res.status(400).render("sign-up", {
        title: "Members Only | Sign Up",
        errors: errors.array(),
        prevFirstName: prevData.first_name,
        prevLastName: prevData.last_name,
        prevUsername: prevData.username,
        prevPassword: prevData.password,
        prevConfirm: prevData.confirm_password,
      });
    } else {
      try {
        const validatedData = matchedData(req);

        // Hash user entered password with a salt of 10 before storing password in DB
        validatedData.password = await bcrypt.hash(validatedData.password, 10);

        await db.createNewAccount(validatedData);

        res.redirect("/login");
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  },
];

async function getLogin(req, res) {
  res.render("login", {
    title: "Members Only | Login",
    loginErrors: req.session.messages,
  });

  // Clear the session errors after sending them to the view to avoid a backlog
  if (req.session.messages) {
    req.session.messages = [];
  }
}

const validateLogin = [
  body("username_login")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Username length must be between 1-50 characters."),
  body("password_login")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password length must be between 8-20 characters."),
];

const postLogin = [
  validateLogin,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const prevData = matchedData(req, { onlyValidData: false });

      return res.status(400).render("login", {
        title: "Members Only | Login",
        errors: errors.array(),
        prevUsernameLogin: prevData.username_login,
      });
    } else {
      next();
    }
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }),
];

module.exports = {
  getIndexMessages,
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
};
