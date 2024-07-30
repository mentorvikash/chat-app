import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import http from "http"
import databaseConnect from "../config/db";
import authRoutes from "../routes/auth";
import { Server } from "socket.io";
import socketHandler from "../utils/socket";

dotenv.config();
databaseConnect();
const PORT: number = Number(process.env.PORT) || 4001;

const app = express();
const server = http.createServer(app)
const io = new Server(server);  

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", authRoutes);
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("welcome to home page");
});

socketHandler(io)

app.listen(PORT, () => {
  console.log("server is running at " + PORT);
});
