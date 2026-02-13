const { Router } = require("express");
const {
  getIndexMessages,
  getSignUp,
  postSignUp,
  getLogin,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getIndexMessages);

indexRouter.get("/sign-up", getSignUp);
indexRouter.post("/sign-up", postSignUp);

indexRouter.get("/login", getLogin);
indexRouter.post("/login", (req, res) => {
  res.send("login");
});

module.exports = indexRouter;
