import { Socket, Server } from "socket.io";

const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("socket connection stablished");
    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    socket.on("chatMessage", (room, message) => {
      io.to(room).emit("message", message);
    });

    socket.on("joinRoom", () => {
      console.log("user disconnected");
    });
  });
};

export default socketHandler;