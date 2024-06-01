export interface Artist {
  id?: number;
  name: string;
  dob: Date;
  gender: "m" | "f" | "o";
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
  created_at?: Date;
  updated_at?: Date;
}
