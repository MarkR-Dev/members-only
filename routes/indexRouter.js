const { Router } = require("express");
const { getIndexMessages } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getIndexMessages);

module.exports = indexRouter;
