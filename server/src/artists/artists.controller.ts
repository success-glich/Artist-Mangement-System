import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../helper/ApiResponse";
import createHttpError from "http-errors";
import artistServices from ".";

const ArtistController = {

  createArtist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released
      } = req.body;

     // * business logic
     const newArtist = await artistServices.createArtist({
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released
      });
   

      return res
        .status(201)
        .json(
          new ApiResponse(201, newArtist, "Artist created Successfully1!")
        );
    } catch (err: any) {
      console.log("Error creating artist:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
  getArtists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;

      // * business logic
      const {artists,totalArtists} = await artistServices.getArtists(page, limit);
      
      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            { currentPage: page, total: totalArtists, artists },
            "Artist fetched Successfully1!"
          )
        );
    } catch (err: any) {
      console.log("Error while fetching artists:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
  deleteArtist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      // * business logic
      const rows = await artistServices.deleteArtistById(id);

      if (!rows) {
        throw new Error("User not found");
      }
      return res
        .status(201)
        .json(new ApiResponse(200, null, "Artist deleted successfully!"));
    } catch (err: any) {
      console.log("Error while deleting artists:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
  updateArtist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const {
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released
      } = req.body;

      const existingArtist = await artistServices.getArtistById(id);
      if (!existingArtist) {
         return next(createHttpError(404, "Artist not found") );
      } 
     
      await artistServices.updateArtistById({
        id,
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released
      });
  

      return res
        .status(201)
        .json(new ApiResponse(200, null, "Artist updated successfully!"));
    } catch (err: any) {
      console.log("Error while updating artist:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
  getArtist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      // * business logic
      const artist = await artistServices.getArtistById(id);

      return res
        .status(200)
        .json(new ApiResponse(200, artist, "Artist fetched successfully!"));
    } catch (err: any) {
      console.log("Error while fetching artist:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
  getArtistCount:async(req:Request, res:Response, next:NextFunction)=>{

    try {
      const count = await artistServices.getArtistCount();
      return res
        .status(200)
        .json(new ApiResponse(200, count, "Artist count fetched successfully!"));
    } catch (err: any) {
      console.log("Error while fetching artist count:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  }
};

export default ArtistController;
