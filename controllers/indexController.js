async function getIndexMessages(req, res) {
  res.render("index", { title: "Members Only | Messages" });
}

module.exports = { getIndexMessages };
