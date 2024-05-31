import express from "express";
import { config } from "./config/config";

const app =express();

app.get("/get-health",(req,res)=>{

    res.status(200).send("Healthy");
})


export default app;