import pool from "../config/db";
import ArtistServices from "./artists.services";

const artistServices =new ArtistServices(pool);

export default artistServices