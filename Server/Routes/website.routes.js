import express from "express"
import isAuth from "../Middlewares/IsAuth.js";
import { generatewebsite } from "../Controllers/Website.controller.js";
export const websiteRouter=express.Router();

websiteRouter.post("/generate",isAuth,generatewebsite)