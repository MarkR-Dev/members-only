const { Router } = require("express");
const {
  getAccount,
  postLogout,
  getUpgradeMember,
  postUpgradeMember,
  getUpgradeAdmin,
} = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.get("/", getAccount);

accountRouter.post("/logout", postLogout);

accountRouter.get("/upgrade/member", getUpgradeMember);
accountRouter.post("/upgrade/member", postUpgradeMember);

accountRouter.get("/upgrade/admin", getUpgradeAdmin);

module.exports = accountRouter;
