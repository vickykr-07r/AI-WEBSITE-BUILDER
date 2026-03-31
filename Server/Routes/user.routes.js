import express from "express"
import isAuth from "../Middlewares/IsAuth.js";
import { getcurrentuser } from "../Controllers/user.controllers.js";
export const userRouter=express.Router();

userRouter.get("/getcurrentuser",isAuth,getcurrentuser)