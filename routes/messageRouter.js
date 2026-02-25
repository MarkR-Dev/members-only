const { Router } = require("express");
const {
  getNewMessage,
  postNewMessage,
} = require("../controllers/messageController");

const messageRouter = Router();

messageRouter.get("/new", getNewMessage);
messageRouter.post("/new", postNewMessage);

module.exports = messageRouter;
