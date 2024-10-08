import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(cors());

let elements = [];

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A User Connected");

  io.to(socket.id).emit("whiteboard-state", elements);

  socket.on("element-update", (elementData) => {
    updateElementInElements(elementData);
    socket.broadcast.emit("element-update", elementData);
  });

  socket.on("whiteboard-clear", () => {
    elements = [];
    socket.broadcast.emit("whiteboard-clear");
  });

  socket.on("cursor-position", (cursorData) =>
    socket.broadcast.emit("cursor-position", {
      ...cursorData,
      userId: socket.id,
    })
  );
});

app.get("/", (req, res) => {
  res.send("Home Route is Working");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const updateElementInElements = (elementData) => {
  const index = elements.findIndex((element) => element.id === elementData.id);
  if (index === -1) return elements.push(elementData);
  elements[index] = elementData;
};
