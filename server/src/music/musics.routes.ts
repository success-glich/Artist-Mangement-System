import { Router } from "express";
import AuthMiddleware from "../auth/auth.middleware";
import { validateArtist } from "../middleware/validators";
import MusicController from "./musics.controller";

const musicRouter = Router();

musicRouter.use(AuthMiddleware.isAuthenticated);

musicRouter
  .route("/")
  .get(MusicController.getMusics)
  .post(validateArtist, MusicController.createMusic);

musicRouter
  .route("/:id")
   .put(validateArtist,MusicController.updateMusic)
  .delete(MusicController.deleteMusics);

musicRouter
.route( "/:artistId/:id")
.get(MusicController.getMusicsByArtistId)

export default musicRouter;