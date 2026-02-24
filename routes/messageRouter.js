const { Router } = require("express");
const { getNewMessage } = require("../controllers/messageController");

const messageRouter = Router();

messageRouter.get("/new", getNewMessage);

messageRouter.post("/new", (req, res) => {
  res.send("POST new message");
});

module.exports = messageRouter;
