import pool from "../config/db";
import MusicService from "./musics.services";

const musicService = new MusicService(pool);

export default musicService;