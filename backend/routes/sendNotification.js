const express = require("express");
const { sendMessage } = require("../utils/sendMessage");
const router = express.Router();

router.route("/sendNotification").post(async (req, res) => {
  const { token } = req.query;
  const { title, body, channelId } = req.body;
  const notification = {
    token,
  };
  console.log(notification);
  try {
    await sendMessage(token, title, body, channelId);
    res.send({ status: "ok" });
  } catch (err) {
    console.log({ err });
  }
});

module.exports = router;
