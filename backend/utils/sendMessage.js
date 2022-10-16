var messaging = require("firebase-admin/messaging");

async function sendMessage(token, title, body, channelId) {
  const message = {
    data: {
      notifee: JSON.stringify({
        title,
        body,
        android: {
          channelId: `${channelId}`,
          actions: [
            {
              title: "Mark as Read",
              pressAction: {
                id: "read",
              },
            },
          ],
        },
      }),
    },
    token,
  };

  // Send a message to devices with the registered tokens
  try {
    await messaging.getMessaging().send(message);
  } catch (err) {
    console.log({ err });
    throw new Error("Something went wrong");
  }
}

module.exports = { sendMessage };
