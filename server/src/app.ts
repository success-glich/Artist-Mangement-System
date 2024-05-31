import express from "express";

const app =express();

app.get("/get-health",(_,res)=>{

    res.status(200).send("Healthy");
})


export default app;