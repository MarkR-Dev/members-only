const { Router } = require("express");
const {
  getAccount,
  postLogout,
  getUpgradeMember,
  postUpgradeMember,
  getUpgradeAdmin,
  postUpgradeAdmin,
} = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.get("/", getAccount);

accountRouter.post("/logout", postLogout);

accountRouter.get("/upgrade/member", getUpgradeMember);
accountRouter.post("/upgrade/member", postUpgradeMember);

accountRouter.get("/upgrade/admin", getUpgradeAdmin);
accountRouter.post("/upgrade/admin", postUpgradeAdmin);

module.exports = accountRouter;
