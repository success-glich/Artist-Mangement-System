import { Router } from "express";

const songRouter = Router();


songRouter.route("/").get((req, res) => {
    res.send("Hello World!");
});


export default songRouter;