const { Router } = require("express");
const { getAccount } = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.get("/", getAccount);

module.exports = accountRouter;
