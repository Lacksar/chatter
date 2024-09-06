import { Server } from "socket.io";

export default function socketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    return res.end();
  }

  const io = new Server(res.socket.server);

  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("send-message", (obj) => {
      socket.broadcast.emit("receive-message", obj);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  console.log("Socket server initialized");
  res.end();
}
