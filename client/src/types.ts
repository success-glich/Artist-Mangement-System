

export interface User  {
    id?: number,
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