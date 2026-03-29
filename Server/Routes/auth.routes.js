import express from "express"
import { googleauth, logout } from "../Controllers/auth.controllers.js";

export const authRouter =express.Router();

authRouter.post("/google",googleauth)
authRouter.post("/logout",logout)

