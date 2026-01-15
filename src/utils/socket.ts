// socket.ts
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "./api";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      transports: ["polling"],
      autoConnect: false, // prevent immediate connection
    });

    socket.connect(); // manually connect only when needed
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
