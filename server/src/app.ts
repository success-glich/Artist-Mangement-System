import express from "express";
import router from "./router";

const app =express();

app.get("/get-health",(_,res)=>{

    res.status(200).send("Healthy");
});

//* middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1",router);

app.use("*",(_,res)=>{
    res.status(404).send("Not Found");
})


export default app;