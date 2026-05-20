import express from "express"
import isAuth from "../Middlewares/IsAuth.js";
import { changes, deploy, generatewebsite, getall, getbyslug, getwebsitebyid } from "../Controllers/Website.controller.js";
export const websiteRouter=express.Router();

websiteRouter.post("/generate",isAuth,generatewebsite)
websiteRouter.get("/get-by-id/:id",isAuth,getwebsitebyid)
websiteRouter.post("/update/:id",isAuth,changes)
websiteRouter.get("/getall",isAuth,getall)
websiteRouter.get("/deploy/:id",isAuth,deploy)
websiteRouter.get("/getbyslug/:slug",isAuth,getbyslug)