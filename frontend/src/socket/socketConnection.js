import { io } from "socket.io-client";
import store from "../redux/store/store";
import {
  setElements,
  updateElementInStore,
} from "../redux/slices/whiteboardSlice";

let socket;

export const socketConnection = () => {
  socket = io("http://localhost:3000");
  socket.on("connect", () => {
    console.log("Connected to socket.io server");
  });

  socket.on("whiteboard-state", (elements) => {
    store.dispatch(setElements(elements));
  });

  socket.on("element-update", (elementData) => {
    store.dispatch(updateElementInStore(elementData));
  });

  socket.on("whiteboard-clear", () => {
    store.dispatch(setElements([]));
  });
};

export const emitElementUpdate = (elementData) => {
  socket.emit("element-update", elementData);
};

export const emitClearWhiteboard = () => {
  socket.emit("whiteboard-clear");
};
