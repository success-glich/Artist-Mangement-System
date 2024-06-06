import { Router } from "express";
import AuthMiddleware from "../auth/auth.middleware";
import ArtistController from "./artists.controller";
import { validateArtist } from "../middleware/validators";

const artistRouter = Router();

artistRouter.use(AuthMiddleware.isAuthenticated);

artistRouter.get("/count",ArtistController.getArtistCount)
artistRouter
  .route("/")
  .get(ArtistController.getArtists)
  .post(validateArtist, ArtistController.createArtist);

artistRouter
  .route("/:id")
  .get(ArtistController.getArtist)
   .put(validateArtist,ArtistController.updateArtist)
  .delete(ArtistController.deleteArtist);


export default artistRouter;