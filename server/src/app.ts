import express from "express";
import router from "./router";
import globalErrorHandler from "./middleware/global.error.handler";

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

// * Global Error Handler
app.use(globalErrorHandler)


export default app;