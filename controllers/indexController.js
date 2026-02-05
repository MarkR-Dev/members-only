async function getIndexMessages(req, res) {
  res.render("index", { title: "Members Only | Messages" });
}

async function getSignUp(req, res) {
  res.render("sign-up", { title: "Members Only | Sign Up" });
}

async function postSignUp(req, res) {}

module.exports = { getIndexMessages, getSignUp, postSignUp };
