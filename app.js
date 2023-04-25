import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddlewares } from "./middlewares/error.js";
import cors from "cors";
export const app = express();

config({
  path: "./data/config.env",
});

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
); //database and localserver cross connection deploy korrar tym  e possible nh so cors use kora hy
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

//error middleware
app.use(errorMiddlewares);
