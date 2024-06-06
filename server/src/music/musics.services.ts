import { Pool } from "pg";
import { Music } from "./musics.types";

class MusicService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
    this.pool.connect();
  }
  async createMusic({ artist_id, title, album_name, genre }: Music) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(
        'INSERT INTO "music" (artist_id,title,album_name, genre) VALUES ($1, $2, $3, $4) RETURNING *',
        [artist_id, title, album_name, genre]
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
    album_name,
    genre,
  }: Omit<Music, "artist_id">) {
    const client = await this.pool.connect();

    try {
      const query = `
      UPDATE "music"
      SET 
      title = $1,
      album_name = $2,
      genre = $3
      WHERE id = $4`;
      const values = [title, album_name, genre, id];

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
      const res = await client.query('DELETE FROM "music" WHERE id = $1', [id]);
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
  async getMusicByArtistId(id: number, page: number = 1, limit: number = 10) {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const query = `SELECT m.id, m.artist_id,a.name artist_name,m.title,m.album_name,m.genre,m.created_at,m.updated_at FROM "music" m INNER JOIN "artist" a ON a.id =m.artist_id WHERE artist_id = $1 LIMIT $2 OFFSET $3`;
      const res = await client.query(query, [id, limit, offset]);
      const totalMusicsRow = await client.query(
        'SELECT COUNT(*) FROM "music" WHERE artist_id = $1',
        [id]
      );
      return { musics: res.rows, totalMusic: totalMusicsRow.rows[0].count };
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
}
export default MusicService;
