
export interface User  {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone: string,
    dob: string,
    gender: "m" | "f"| "o",
    address: string,
    created_at?: Date,
    updated_at?: Date
}

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