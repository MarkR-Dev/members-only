const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function getIndexMessages(req, res) {
  res.render("index", { title: "Members Only | Messages" });
}

async function getSignUp(req, res) {
  res.render("sign-up", { title: "Members Only | Sign Up" });
}

// todo: go over what each form input needs to be validated as
// todo: custom validator to verify password is the same as confirm password
// todo: sanitise inputs after validation in db/html
// todo: secure passwords with bcyrpt
// todo: passport stuff
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
    .withMessage("Username length must be between 1-50 letters.")
    .custom(async (usernameValue) => {
      const user = await db.findAccountByUsername(usernameValue);

      // If the returned query row length is truthy E.g not 0, that means an account exists with that username already
      if (user.length) {
        throw new Error("Username already in use.");
      }
    }),
];

const postSignUp = [
  validateSignUp,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const prevData = matchedData(req, { onlyValidData: false });

      return res.status(400).render("sign-up", {
        title: "Members Only | Sign Up",
        errors: errors.array(),
        prevFirstName: prevData.first_name,
        prevLastName: prevData.last_name,
        prevUsername: prevData.username,
      });
    } else {
      //todo: successfully validated -> look at authentication/passport/bcrypt
      console.log(matchedData(req));

      res.redirect("/sign-up");
    }
  },
];

module.exports = { getIndexMessages, getSignUp, postSignUp };
