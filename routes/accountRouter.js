const { Router } = require("express");
const {
  getAccount,
  postLogout,
  getUpgradeMember,
} = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.get("/", getAccount);

accountRouter.post("/logout", postLogout);

accountRouter.get("/upgrade/member", getUpgradeMember);
accountRouter.post("/upgrade/member", (req, res) => {
  res.send("member upgrade POST");
});

module.exports = accountRouter;
