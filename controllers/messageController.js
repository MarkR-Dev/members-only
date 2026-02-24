async function getNewMessage(req, res) {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  } else {
    res.render("new-message", { title: "Members Only | New Message" });
  }
}

module.exports = {
  getNewMessage,
};
