import { genres } from "@/types/types";
import { z } from "zod";

export const musicSchema = z.object({
    title: z.string().min(4, {
        message: 'title must be at least 4 characters.',
    }),
    album_name: z.string().min(4,{
        message: 'album_name must be at least 4 characters.',
    }),
    genre:z.enum(genres,{message:"Genre is required"} ),
    artist_id: z.string()
    
});