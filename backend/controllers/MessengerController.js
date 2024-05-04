const Messenger = require("../model/Messenger");

const addMessage = async (req, res) => {
  const { sender, to, text, author } = req.body;
  if (!sender || !to || !text || !author)
    return res.status(400).json({ message: "info not correct" });

  try {
    await Messenger.create({ sender, to, text, author });
    return res.status(200).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMessageChat = async (req, res) => {
  const { userMessenger, userSender } = req.body;
  console.log(userMessenger, userSender);
  if (!userMessenger || !userSender)
    return res.status(400).json({ message: "info not correct" });

  try {
    const findChat = await getCross(userMessenger, userSender);

    return res.status(200).json({ chat: findChat });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

async function getCross(userMessenger, userSender) {
  return await Messenger.find({
    $or: [
      {
        $and: [
          { sender: userMessenger },
          { $or: [{ to: userMessenger }, { to: userSender }] },
        ],
      },
      {
        $and: [
          { sender: userSender },
          { $or: [{ to: userMessenger }, { to: userSender }] },
        ],
      },
    ],
  });
}

module.exports = {
  addMessage,
  getMessageChat,
  getCross,
};
