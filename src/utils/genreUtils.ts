// genreUtils.ts

export const genreMap: { [key: string]: number } = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    ScienceFiction: 878, // Note: "Science Fiction" is "ScienceFiction" in the key
    TVMovie: 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
  };
  
  export const getGenreId = (genreName: string): number | undefined => {
    return genreMap[genreName];
  };
  
  export const getGenreName = (genreId: number): string | undefined => {
    // Find the key (genre name) that corresponds to the given genreId
    for (const genreName in genreMap) {
      if (genreMap[genreName] === genreId) {
        return genreName;
      }
    }
    return undefined; // Or return a default value like "Unknown Genre"
  };