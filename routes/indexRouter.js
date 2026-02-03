const { Router } = require("express");
const { getIndexMessages } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getIndexMessages);

indexRouter.get("/sign-up", (req, res) => {
  res.send("sign up");
});

indexRouter.get("/login", (req, res) => {
  res.send("login");
});

module.exports = indexRouter;
