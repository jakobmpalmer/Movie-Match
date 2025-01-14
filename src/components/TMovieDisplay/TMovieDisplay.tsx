"use client"
import React, { useState, useEffect } from 'react';
import { getGenreName } from '../../utils/genreUtils';
import Movie from '@/models/Movie';

// interface Movie {
//   title: string;
//   release_date: string;
//   poster_path: string;
//   genre_ids: number[];
// }

interface MovieDisplayProps {
  selectedGenres: number[]; 
  setSearchedMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>; 
}

const MovieDisplay: React.FC<MovieDisplayProps> = ({ selectedGenres, setSearchedMovie }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (selectedGenres.length === 0) {
        setError('No genres selected.');
        setMovie(null);
        return;
      }

      setLoading(true);
      setError(null);

      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; 

      const genresString = selectedGenres.join(','); 
  
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genresString}`; 
  
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          const selectedMovie = data.results[randomIndex];

          const posterPath = selectedMovie.poster_path
            ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
            : 'N/A';

            setMovie({
              title: selectedMovie.title,
              release_date: selectedMovie.release_date,
              poster_path: posterPath,
              genre_ids: selectedMovie.genre_ids,
              adult: selectedMovie.adult,
              backdrop_path: selectedMovie.backdrop_path,
              id: selectedMovie.id,
              original_language: selectedMovie.original_language,
              original_title: selectedMovie.original_title,
              overview: selectedMovie.overview,
              popularity: selectedMovie.popularity,
              video: selectedMovie.video,
              vote_average: selectedMovie.vote_average,
              vote_count: selectedMovie.vote_count,
            });
            
          setSearchedMovie(selectedMovie); 
        } else {
          setError('No movies found for this genre.');
          setMovie(null);
        }

      } catch (err) {
        setError('Error fetching movie data. Please try again later.');
        setMovie(null);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [selectedGenres]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    <div>
      {movie && (
        <div>
            <div>
              <h2>{movie.title}</h2>
              <p>Year: {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</p>            
              {movie.poster_path !== 'N/A' && (
                <img
                  src={movie.poster_path || '/images/placeholder.png'}
                  alt={movie.title}
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px'
                  }}
                />
              )}
            </div>
            {/* <div>
              <h3>Genres:</h3>
              <ul>
                {movie.genre_ids.map((genreId: number) => (
                  <li key={genreId}>{getGenreName(genreId)}</li>
                ))}
              </ul>
            </div> */}
        </div>
      )}
    </div>

    </div>
  );
};

export default MovieDisplay;