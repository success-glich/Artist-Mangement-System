import { z } from "zod";

export const artistSchema = z.object({
    name: z.string().min(4, {
        message: 'name must be at least 4 characters.',
    }),
    first_release_year: z.string().min(4,{
        message: 'first_release_year must be at least 4 characters.',
    }),
    no_of_albums_released:z.string(),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format, should be YYYY-MM-DD.' }),
    gender: z.enum(['m', 'f', 'o']),
    address: z.string().max(255).optional()
});