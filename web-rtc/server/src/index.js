import express from "express";
import { Server } from "socket.io";

const io = new Server({
  cors: true,
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const emailToSocketMap = new Map();
const socketIdToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("join-room", (data) => {
    console.log(`User with ${data.emailId} joined room ${data.roomId}`);
    const { roomId, emailId } = data;
    emailToSocketMap.set(emailId, socket.id);
    socketIdToEmailMap.set(socket.id, emailId);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });

  socket.on("call-user", (data) => {
    const { emailId, offer } = data;
    const fromEmail = socketIdToEmailMap.get(socket.id);
    const socketId = emailToSocketMap.get(emailId);
    if (socketId) {
      io.to(socketId).emit("incoming-call", { from: fromEmail, offer });
    }
  });

  socket.on("call-accepted", (data) => {
    const { emailId, ans } = data;
    const socketId = emailToSocketMap.get(emailId);
    socket.to(socketId).emit("call-accepted", { ans });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

io.listen(4000, () => {
  console.log("Socket.IO server is running on port 4000");
});
