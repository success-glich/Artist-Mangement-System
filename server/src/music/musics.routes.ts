import { Router } from "express";
import AuthMiddleware from "../auth/auth.middleware";
import {validateMusic } from "../middleware/validators";
import MusicController from "./musics.controller";

const musicRouter = Router();

musicRouter.use(AuthMiddleware.isAuthenticated);

musicRouter
  .route("/")
  .get(MusicController.getMusics)
  .post(validateMusic, MusicController.createMusic);

musicRouter
  .route("/:artistId/:id")
   .put(validateMusic,MusicController.updateMusic)
  .delete(MusicController.deleteMusics);

musicRouter
.route( "/:artistId")
.get(MusicController.getMusicsByArtistId)

export default musicRouter;