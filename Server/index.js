import express from "express"
const app=express();

import dotenv from "dotenv"
dotenv.config();

import cors from "cors"
app.use(cors(
    {
        origin:"http://localhost:5173/",
        credentials:true
    }
))

import dbconnect from "./db/db.connect.js";

app.listen(process.env.PORT,()=>{
    console.log("the app is listening")
    dbconnect();  
})
