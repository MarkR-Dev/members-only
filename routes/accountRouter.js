const { Router } = require("express");
const {
  getAccount,
  postLogout,
  getUpgradeMember,
  postUpgradeMember,
} = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.get("/", getAccount);

accountRouter.post("/logout", postLogout);

accountRouter.get("/upgrade/member", getUpgradeMember);
accountRouter.post("/upgrade/member", postUpgradeMember);

module.exports = accountRouter;
