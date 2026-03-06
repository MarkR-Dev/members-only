const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function getAccount(req, res) {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  } else {
    res.render("account", { title: "Members Only | Account" });
  }
}

async function postLogout(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function getUpgradeMember(req, res) {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  } else {
    res.render("upgrade-member", { title: "Members Only | Account Upgrade" });
  }
}

const validateUpgradeMember = [
  body("member_password")
    .trim()
    .notEmpty()
    .withMessage("Member password is required.")
    .isLength({ min: 8, max: 20 })
    .withMessage("Member password length must be between 8-20 characters."),
];

const postUpgradeMember = [
  validateUpgradeMember,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("upgrade-member", {
        title: "Members Only | Account Upgrade",
        errors: errors.array(),
      });
    } else {
      // TODO: where/how to store the saved member password, how to compare it against the entered user password, redirect to member upgrade page on failed attempt, with an error message to display in the errors-list
      res.send("valid attempt");
    }
  },
];

module.exports = {
  getAccount,
  postLogout,
  getUpgradeMember,
  postUpgradeMember,
};
