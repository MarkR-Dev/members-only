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

module.exports = { getAccount, postLogout };
