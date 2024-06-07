import { Router } from "express";
import AuthMiddleware from "../auth/auth.middleware";
import ArtistController from "./artists.controller";
import { validateArtist } from "../middleware/validators";
import { upload } from "../middleware/multer.middleware";
import UserController from "../user/user.controller";

const artistRouter = Router();

artistRouter.use(AuthMiddleware.isAuthenticated);

  

artistRouter.get("/count",ArtistController.getArtistCount)
artistRouter
.route("/export")
.get(ArtistController.exportArtists)

artistRouter
.route("/import")
.post(upload.single("file"),ArtistController.importArtists)


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