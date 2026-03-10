const { Router } = require("express");
const {
  getIndexMessages,
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
  deleteMessage,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getIndexMessages);

indexRouter.post("/delete/:id", deleteMessage);

indexRouter.get("/sign-up", getSignUp);
indexRouter.post("/sign-up", postSignUp);

indexRouter.get("/login", getLogin);
indexRouter.post("/login", postLogin);

module.exports = indexRouter;
