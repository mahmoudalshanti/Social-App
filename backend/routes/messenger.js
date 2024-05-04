const router = require("express").Router();
const {
  addMessage,
  getMessageChat,
} = require("../controllers/MessengerController");

router.post("/", addMessage);
router.post("/chat", getMessageChat);

module.exports = router;
