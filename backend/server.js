const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const server = require("http").createServer(app);
const sendNotification = require("./routes/sendNotification");
const admin = require("firebase-admin");
const order = require("./routes/order");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");

dotenv.config();

app.use(express.json());

app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.CLIENT_EMAIL,
  }),
  databaseURL: process.env.DATABASE_URL,
});

app.use("/", sendNotification);
app.use("/", order);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("server is running on port 5000");
});
