const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function getNewMessage(req, res) {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  } else {
    res.render("new-message", { title: "Members Only | New Message" });
  }
}

const validateMessage = [
  body("message_title")
    .trim()
    .notEmpty()
    .withMessage("Message title is required.")
    .isLength({ min: 1, max: 75 })
    .withMessage("Message title length must be between 1-75 characters."),
  body("message_body")
    .trim()
    .notEmpty()
    .withMessage("Message body is required.")
    .isLength({ min: 1, max: 255 })
    .withMessage("Message body length must be between 1-255 characters."),
];

const postNewMessage = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const prevData = matchedData(req, { onlyValidData: false });

      return res.status(400).render("new-message", {
        title: "Members Only | New Message",
        errors: errors.array(),
        prevTitle: prevData.message_title,
        prevBody: prevData.message_body,
      });
    } else {
      try {
        const validatedData = matchedData(req);

        const messageData = {
          ...validatedData,
          accountId: res.locals.currentUser.id,
        };

        await db.createNewMessage(messageData);

        res.redirect("/");
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  },
];

module.exports = {
  getNewMessage,
  postNewMessage,
};
