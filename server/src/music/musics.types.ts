export interface Music {
    id?: number; 
    artist_id: number;
    title: string;
    album_name: string; 
    genre: 'rnb' | 'country' | 'classic' | 'rock' | 'jazz';
    createdAt?: Date;
    updatedAt?: Date; 
}
