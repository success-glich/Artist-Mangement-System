import { z } from "zod";

export const userSchema = z.object({
    first_name: z.string().min(2, {
        message: 'first name must be at least 2 characters.',
    }),
    last_name: z.string().min(2, {
        message: 'last name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Invalid email address.',
    }).min(2, {
        message: 'email must be at least 2 characters.',
    }),
    phone: z
        .string()
        .regex(
            /^(\+977)?9\d{9}$/,
            'Invalid phone number format'
        ),
    password: z.string().min(6, {
        message: 'password must be at least 6 characters.',
    }),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format, should be YYYY-MM-DD.' }),
    gender: z.enum(['m', 'f', 'o']),
    address: z.string().max(255).optional()
});