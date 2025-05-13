import { Server } from "socket.io";
import http from "http";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

var io: Server;
export const InitSocket = async (server: http.Server) => {
  try {
    await Promise.all([pubClient.connect(), subClient.connect()]);

    io = new Server(server, {
      adapter: createAdapter(pubClient, subClient),
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("join_room", (data) => {
        console.log("data: ", data);
        socket.join(data.room_id);
        console.log("A user joined room: ", data.room_id, data.user);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
  } catch (error) {
    return;
  }
};

export { io };
