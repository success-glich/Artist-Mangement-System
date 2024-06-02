import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../helper/ApiResponse";
import createHttpError from "http-errors";
import musicServices from ".";

const MusicController = {

  createMusic: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        artist_id,
        title,
        album_name,
        genre,
        } = req.body;

        // * business logic
     const newMusic = await musicServices.createMusic({
        artist_id,
        title,
        album_name,
        genre,
      });
   

      return res
        .status(201)
        .json(
          new ApiResponse(201, newMusic, "Music created Successfully1!")
        );
    } catch (err: any) {
      console.log("Error creating artist:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
  getMusics: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;

      // * business logic
      const musics = await musicServices.getMusics(page, limit);
      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            { currentPage: page, total: musics.length, musics },
            "Musics fetched Successfully1!"
          )
        );
    } catch (err: any) {
      console.log("Error while fetching artists:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
  deleteMusics: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      // * business logic
    //   const rows = await userServices.deleteUserById(id);

    //   if (rows.length < 1) {
    //     throw new Error("User not found");
    //   }
      return res
        .status(201)
        .json(new ApiResponse(200, null, "Artist deleted successfully!"));
    } catch (err: any) {
      console.log("Error while deleting artists:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
  updateMusic: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const {
        artist_id,
        genre,
        title,
        album_name,
        } = req.body;

      const existingArtist = await musicServices.getMusicById(id);
      if (!existingArtist) {
         return next(createHttpError(404, "Musics not found") );
      } 
     
      await musicServices.updateMusicById({id,artist_id,genre,title,album_name});
  

      return res
        .status(201)
        .json(new ApiResponse(200, null, "Musics updated successfully!"));
    } catch (err: any) {
      console.log("Error while updating musics:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
  getMusicsByArtistId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      // * business logic
      const music = await musicServices.getMusicByArtistId(id);
      return res
        .status(200)
        .json(new ApiResponse(200, music, "Music fetched successfully!"));
    } catch (err: any) {
      console.log("Error while fetching musics:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
};

export default MusicController;
