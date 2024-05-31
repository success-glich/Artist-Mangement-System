import { Router } from "express";
import userRouter from "./user/user.routes";
import authRouter from "./auth/auth.routes";
import songRouter from "./songs/songs.routes";
import artistRouter from "./artists/artists.routes";
const router = Router()

router.use("/users",userRouter);
router.use('/auth',authRouter);
router.use("/songs",songRouter);
router.use("/artists",artistRouter)


export default router;