import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import databaseConnect from "../config/db";
import authRoutes from "../routes/auth";

dotenv.config();
databaseConnect();

const app = express();
const PORT: number = Number(process.env.PORT) || 4001;
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("welcome to home page");
});
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log("server is running at " + PORT);
});
