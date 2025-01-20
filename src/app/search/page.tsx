"use client";
import GenreSelector from '@/components/GenreSelector/GenreSelector';
import TMovieDisplay from '@/components/TMovieDisplay/TMovieDisplay';
import React, { useState } from 'react';
import Movie from '@/models/Movie';
import styles from './search.module.scss';
import MovieDetails from './MovieDetails';
import MovieSearch from '@/components/MovieSearch/MovieSearch';

const SearchPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [showMovie, setShowMovie] = useState<boolean>(false);
  const [adult, setAdult] = useState<boolean>(false);
  const [selectedMovie, setSearchedMovie] = useState<Movie | null>(null);

  const handleGenresSelected = (genres: number[]) => {
    setSelectedGenres(genres);
    fetchNewMovie(genres);
    setShowMovie(true);
  };

  const fetchNewMovie = async (genres: number[]) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const genresString = genres.join(',');
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genresString}&include_adult=false`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const selectedMovie = data.results[randomIndex];
        setSearchedMovie(selectedMovie);
      } else {
        console.error('No movies found for these genres.');
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  };

  const handleToggle = () => {
    setAdult((prev) => !prev);
  };

  return (
    <div style={{ maxWidth: '80%', margin: '0px auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <MovieSearch />
        <button onClick={handleToggle}>
          {adult ? "Set Not Adult" : "Set Adult"}
        </button>
      </div>
      {!showMovie ? (
        <div style={{ width: '50%', margin: '10px auto' }}>
          <GenreSelector onGenresSelected={handleGenresSelected} />
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', gap: '20px' }}>
          <div
            style={{
              flex: 1,
              margin: '0px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'auto',
              maxHeight: 'calc(100vh - 150px)',
              width: '100%',
            }}
          >
            <TMovieDisplay
              selectedGenres={selectedGenres}
              setSearchedMovie={setSearchedMovie}
              searchedMovie={selectedMovie}
            />
          </div>
          <div style={{ flex: 2, margin: '0px auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <MovieDetails selectedMovie={selectedMovie} />
          </div>
        </div>
      )}
      <footer style={{ textAlign: 'center', marginTop: 'auto', padding: '10px 0' }}>
        Footer Content
      </footer>
    </div>
  );
};

export default SearchPage;
