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

const validateUpgradeMember = [];

// todo: fix view to show alternate html if the user is already a member, validate password field, how to store and compare this?
// todo: fix view to show alternate html if the user is already a member, validate password field, how to store and compare this?
// todo: fix view to show alternate html if the user is already a member, validate password field, how to store and compare this?

module.exports = { getAccount, postLogout, getUpgradeMember };
