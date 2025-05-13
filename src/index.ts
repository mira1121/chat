import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import MainRouter from "./router";
import * as bodyParser from "body-parser";
import { InitSocket, io } from "./utils/socket";
import { InitDatabase, prisma } from "./utils/database";

const app = express();
const server = http.createServer(app);

InitDatabase();
InitSocket(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/v1", MainRouter);
dotenv.config();

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process
  .on("exit", async () => {
    await prisma.$disconnect();
    await io.close();
    server.close();
  })
  .on("SIGINT", async () => {
    await prisma.$disconnect();
    await io.close();
    server.close();
  });
