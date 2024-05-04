require("dotenv").config();
const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectToDB = require("./config/dbConn");
const User = require("./model/User");
const Post = require("./model/Post");
const { getCross } = require("./controllers/MessengerController");

const {
  accessServer,
  errorServer,
  printsEvents,
} = require("./middleware/prints");

ConnectToDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

const corsOptions = require("./config/corsOptins");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credential");
const PORT = process.env.PORT || 7000;

// Middleware
app.use(accessServer);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/", require("./routes/root"));
app.use("/", require("./routes/auth"));
app.use("/upload", require("./routes/filesUpload"));

// Protect routes with JWT authentication
app.use(verifyJWT);

// User and post routes
app.use("/users", require("./routes/user"));
app.use("/posts", require("./routes/post"));
app.use("/messenger", require("./routes/messenger"));

// Handle 404 Not Found
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    return res.json({ message: "Not Found Page 404" });
  } else {
    return res.type("txt").send("Not Found Page");
  }
});

// Error handling middleware
app.use(errorServer);

// Handle MongoDB connection events
mongoose.connection.once("open", () => {
  console.log(`Connected to DB`);
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  printsEvents(
    `${err.no} \t ${err.code}\t  ${err.syscall}\t ${err.hostname}`,
    "mongoErr.log"
  );
});

let Nof = [];
// Socket.io logic
io.on("connection", (socket) => {
  // Join a room for notifications
  socket.on("join_NOF", (room) => {
    socket.join(room);
  });

  // Add a notification
  socket.on("add_NOF", async (data) => {
    try {
      const userFound = await User.findById(data.room).exec();
      if (!userFound) {
        throw new Error("User not found");
      }
      Nof = [...userFound.Nof, data.message];
      io.to(data.room).emit("receive_NOF", Nof);
    } catch (err) {
      console.error("Error adding notification:", err.message);
    }
  });

  // Join a room for comments
  socket.on("join_Comment", (room) => {
    socket.join(room);
  });

  // Add a comment
  socket.on("add_comment", async (data) => {
    try {
      const postFound = await Post.findById(data.room).exec();

      if (!postFound) {
        throw new Error("Post not found");
      }

      postFound.comments.push(data);
      await postFound.save();

      // Emit the updated comments to all clients in the room
      io.to(data.room).emit("receive_comment", postFound.comments);
    } catch (err) {
      console.error("Error adding comment:", err.message);
    }
  });

  // chat
  socket.on("join_chat", (data) => {
    const room = generateRoom(data.sender, data.messenger);
    socket.join(room);
  });

  socket.on("send_message", async (data) => {
    const room = generateRoom(data.sender, data.to);
    const findChat = await getCross(data.to, data.sender);
    io.to(room).emit("receive_message", findChat);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected.`);
  });

  // Handle socket errors
  socket.on("error", (err) => {
    console.error(`Socket error for user ${socket.id}: ${err.message}`);
  });
});

let rooms = [];

function generateRoom(sender, messenger) {
  const reverse = messenger.concat(sender);

  const findRoom = rooms.find((room) => room === reverse);

  if (findRoom) return findRoom;

  const roomExist = rooms.find((room) => room === sender.concat(messenger));
  if (roomExist) return sender.concat(messenger);

  rooms.push(sender.concat(messenger));
  return sender.concat(messenger);
}
