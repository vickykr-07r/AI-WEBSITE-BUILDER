import express from "express"
const app=express();

import dotenv from "dotenv"
dotenv.config();

import cookieParser from "cookie-parser";
app.use(cookieParser())

app.use(express.json())

import cors from "cors"
app.use(cors(
    {
        origin:"http://localhost:5173/",
        credentials:true
    }
))

import dbconnect from "./db/db.connect.js";

import { authRouter } from "./Routes/auth.routes.js";
app.use("/api/auth",authRouter)

app.listen(process.env.PORT,()=>{
    console.log("the app is listening")
    dbconnect();  
}) 
