interface Music {
    id: number; 
    artistId: number;
    title: string;
    albumName: string; 
    genre: 'rnb' | 'country' | 'classic' | 'rock' | 'jazz';
    createdAt: Date;
    updatedAt: Date; 
}
