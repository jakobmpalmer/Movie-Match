"use client"
import React, { useState, useEffect } from 'react';
import { GenreKey } from './GenreSelector/GenreSelector'; // Import GenreKey

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  // Add other properties as needed from the OMDB API
}

interface MovieDisplayProps {
  selectedGenres: GenreKey[];
}

const MovieDisplay: React.FC<MovieDisplayProps> = ({ selectedGenres }) => {
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

      // Use a random selected genre for the API call
      const randomGenre =
        selectedGenres[Math.floor(Math.random() * selectedGenres.length)];

      const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY; // Replace with your actual API key
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${randomGenre}&type=movie`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
          // Fetch more details for the selected movie
          if (data.Search && data.Search.length > 0) {
            const imdbID = data.Search[0].imdbID; // Get the IMDb ID of the first movie
            const detailsUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();

            setMovie(detailsData);
          } else {
            setError('No movies found for this genre.');
            setMovie(null);
          }
        } else {
          setError(data.Error || 'Movie not found!');
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

      {movie && (
        <div>
          <h2>{movie.Title}</h2>
          <p>Year: {movie.Year}</p>
          {movie.Poster !== 'N/A' && (
            <img src={movie.Poster} alt={movie.Title} />
          )}
          {/* Display other movie details here */}
        </div>
      )}
    </div>
  );
};

export default MovieDisplay;