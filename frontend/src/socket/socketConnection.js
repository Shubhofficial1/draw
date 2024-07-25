import { io } from "socket.io-client";

let socket;

export const socketConnection = () => {
  socket = io("http://localhost:3000");
  socket.on("connect", () => {
    console.log("Connected to socket.io server");
  });
};
