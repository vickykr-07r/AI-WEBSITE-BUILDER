import express from "express";
import isAuth from "../Middlewares/IsAuth.js";
import { billing } from "../Controllers/billing.controllers.js";
const billingRouter=express.Router();

billingRouter.post("/billing",isAuth,billing);

export default billingRouter;
