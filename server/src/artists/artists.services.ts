import { Pool } from "pg";
import { Artist } from "./artists.types";

class ArtistServices {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
    this.pool.connect();
  }
  async createArtist({
    name,
    first_release_year,
    dob,
    gender,
    address,
    no_of_albums_released,
  }: Artist) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(
        'INSERT INTO "artist" (name,dob, gender,address,first_release_year,no_of_albums_released) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *',
        [name, dob, gender, address, first_release_year, no_of_albums_released]
      );

      const newArtist = res.rows[0];
      return newArtist;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }

  //* list artists with pagination
  async getArtists(page: number = 1, limit: number = 10) {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;

    try {
      const res = await client.query(
        'SELECT * FROM "artist" LIMIT $1 OFFSET $2',
        [limit, offset]
      );

      const totalArtists = await client.query('SELECT COUNT(*) FROM "artist"');

      return{
         artists:res.rows,
         totalArtists:Number(totalArtists.rows[0].count)
      };
      

    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
  async updateArtistById({
    id,
    name,
    first_release_year,
    dob,
    gender,
    address,
    no_of_albums_released,
  }: Artist) {
    const client = await this.pool.connect();

    try {
      const query = `
      UPDATE "artist"
      SET 
        name = $1,
        first_release_year = $2,
        dob = $3,
        gender = $4,
        address = $5,
        no_of_albums_released = $6
        WHERE id = $7`;
      const values = [
        name,
        first_release_year,
        dob,
        gender,
        address,
        no_of_albums_released,
        id,
      ];

      const res = await client.query(query, values);

      if (res.rowCount === 0)
        throw new Error("Something wrong when updating users");
      return;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }

  async deleteArtistById(id: number) {
    const client = await this.pool.connect();
    try {
      const res = await client.query('DELETE FROM "artist" WHERE id = $1', [
        id,
      ]);
      return res.rows;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
  async getArtistById(id: number) {
    const client = await this.pool.connect();
    try {
      const res = await client.query('SELECT * FROM "artist" WHERE id = $1', [
        id,
      ]);
      return res.rows[0];
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
  async getArtistCount(){

    const client = await this.pool.connect();
    try {
      const res = await client.query('SELECT COUNT(*) FROM "artist"');
      return res.rows[0];
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
}
export default ArtistServices;
