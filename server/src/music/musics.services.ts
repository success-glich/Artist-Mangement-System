import { Pool } from "pg";
import { Music } from "./musics.types";

class MusicService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
    this.pool.connect();
  }
  async createMusic({
    artistId,
    title,
    albumName,
    genre
      }: Music) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(
        'INSERT INTO "music" (artistId,title,albumName, genre) VALUES ($1, $2, $3, $4) RETURNING *',
        [artistId, title, albumName, genre]
      );

      const newSong = res.rows[0];
      return newSong;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
  //* list Music with pagination
  async getMusics(page: number = 1, limit: number = 10) {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;

    try {
      const res = await client.query(
        'SELECT * FROM "music" LIMIT $1 OFFSET $2',
        [limit, offset]
      );

      return res.rows;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
  async updateMusicById({
    id,
    title,
    albumName,
    genre
    
  }: Music) {
    const client = await this.pool.connect();

    try {
      const query = `
      UPDATE "Song"
      SET 
      title = $1,
      albumName = $2,
      genre = $3,
      WHERE id = $4`;
      const values = [
        title,
        albumName,
        genre,
        id,
      ];

      const res = await client.query(query, values);

      if (res.rowCount === 0)
        throw new Error("Something wrong when updating musics");
      return;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }

  async deleteMusicById(id: number) {
    const client = await this.pool.connect();
    try {
      const res = await client.query('DELETE FROM "music" WHERE id = $1', [
        id,
      ]);
      return res.rows;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
  async getMusicById(id: number) {
    const client = await this.pool.connect();
    try {
      const res = await client.query('SELECT * FROM "music" WHERE id = $1', [
        id,
      ]);
      return res.rows[0];
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
}
export default MusicService;
