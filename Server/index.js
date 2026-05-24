import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { stripewebhook } from "./Controllers/stripewebhook.controllers.js";

import { authRouter } from "./Routes/auth.routes.js";
import { userRouter } from "./Routes/user.routes.js";
import { websiteRouter } from "./Routes/website.routes.js";
import billingRouter from "./Routes/billing.routes.js";

dotenv.config();

const app = express();

app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripewebhook
);

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/website", websiteRouter);
app.use("/api/website", billingRouter);

app.listen(process.env.PORT, () => {
  console.log("the app is listening");
  dbconnect();
});