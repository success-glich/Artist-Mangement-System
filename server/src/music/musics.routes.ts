import { Router } from "express";
import AuthMiddleware from "../auth/auth.middleware";
import ArtistController from "./artists.controller";
import { validateArtist } from "../middleware/validators";

const artistRouter = Router();

artistRouter.use(AuthMiddleware.isAuthenticated);

artistRouter
  .route("/")
  .get(ArtistController.getArtists)
  .post(validateArtist, ArtistController.createArtist);

artistRouter
  .route("/:id")
   .put(validateArtist,ArtistController.updateArtist)
  .delete(ArtistController.deleteArtist);


export default artistRouter;