import express from "express";
import { Server } from "socket.io";

const io = new Server();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

io.listen(4000, () => {
  console.log("Socket.IO server is running on port 4000");
});
