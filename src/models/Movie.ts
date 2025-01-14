export default interface Movie {
    adult: boolean;
    backdrop_path: string | null; 
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string | null; 
    popularity: number;
    poster_path: string | null; 
    release_date: string | null; 
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }