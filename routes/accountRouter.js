const { Router } = require("express");
const { getAccount, postLogout } = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.get("/", getAccount);

accountRouter.post("/logout", postLogout);

module.exports = accountRouter;
