const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
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
      const { member_password: userPasswordInput } = matchedData(req);

      const match = await bcrypt.compare(
        userPasswordInput,
        process.env.MEMBERS_ONLY_MEMBER_PASSWORD,
      );

      if (!match) {
        // Passwords do NOT match!
        return res.status(400).render("upgrade-member", {
          title: "Members Only | Account Upgrade",
          upgradeErrors: ["Incorrect member password."],
        });
      } else {
        // Passwords do match!
        try {
          const userId = res.locals.currentUser.id;

          await db.updateIsMember(userId);

          return res.redirect("/account");
        } catch (error) {
          console.log(error);
          next(error);
        }
      }
    }
  },
];

async function getUpgradeAdmin(req, res) {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  } else {
    res.render("upgrade-admin", { title: "Members Only | Account Upgrade" });
  }
}

const validateUpgradeAdmin = [
  body("admin_password")
    .trim()
    .notEmpty()
    .withMessage("Admin password is required.")
    .isLength({ min: 8, max: 20 })
    .withMessage("Admin password length must be between 8-20 characters."),
];

const postUpgradeAdmin = [
  validateUpgradeAdmin,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("upgrade-admin", {
        title: "Members Only | Account Upgrade",
        errors: errors.array(),
      });
    } else {
      const { admin_password: userPasswordInput } = matchedData(req);

      const match = await bcrypt.compare(
        userPasswordInput,
        process.env.MEMBERS_ONLY_ADMIN_PASSWORD,
      );

      if (!match) {
        // Passwords do NOT match!
        return res.status(400).render("upgrade-admin", {
          title: "Members Only | Account Upgrade",
          upgradeErrors: ["Incorrect admin password."],
        });
      } else {
        // Passwords do match!
        try {
          const userId = res.locals.currentUser.id;

          await db.updateIsAdmin(userId);

          return res.redirect("/account");
        } catch (error) {
          console.log(error);
          next(error);
        }
      }
    }
  },
];

async function postDelete(req, res, next) {
  const userId = res.locals.currentUser.id;

  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });

  try {
    await db.deleteAccount(userId);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  getAccount,
  postLogout,
  getUpgradeMember,
  postUpgradeMember,
  getUpgradeAdmin,
  postUpgradeAdmin,
  postDelete,
};
