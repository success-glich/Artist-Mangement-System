import { Router } from "express";
import userRouter from "./user/user.routes";
import authRouter from "./auth/auth.routes";
import musicRouter from "./music/musics.routes";
import artistRouter from "./artists/artists.routes";
const router = Router()

router.use("/users",userRouter);
router.use('/auth',authRouter);
router.use("/music",musicRouter);
router.use("/artists",artistRouter)


export default router;