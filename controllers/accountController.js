async function getAccount(req, res) {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  } else {
    console.log(res.locals.currentUser);
    res.render("account", { title: "Members Only | Account" });
  }
}

// TODO: style the account page, log out btn

module.exports = { getAccount };
