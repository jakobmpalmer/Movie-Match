"use client"
import GenreSelector from '@/components/GenreSelector/GenreSelector';
import TMovieDisplay from '@/components/TMovieDisplay/TMovieDisplay';
import React, { useState } from 'react';
import Movie from '@/models/Movie';
import styles from './search.module.scss'
import MovieDetails from './MovieDetails'
import MovieSearch from '@/components/MovieSearch/MovieSearch';

const SearchPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]); 
  const [showMovie, setShowMovie] = useState<boolean>(false);
  const [selectedMovie, setSearchedMovie] = useState<Movie>();

  const handleGenresSelected = (genres: number[]) => { 
    setSelectedGenres(genres);
    setShowMovie(true);
  };

  return (
    <div style={{maxWidth: '80%', margin: '0px auto'}}>     
      <div style={{ marginBottom: '20px' }}>
        <MovieSearch />
      </div>           
        {!showMovie  ? (
          <div style={{ width: '50%', margin: '10px auto'}}>
            <GenreSelector onGenresSelected={handleGenresSelected} />
          </div>
        ) : (
          <div style={{display: 'flex'}}>
            <div style={{ margin: '0px auto'}}>
              {showMovie && (
                <TMovieDisplay
                  selectedGenres={selectedGenres}
                  setSearchedMovie={setSearchedMovie}
                />
              )}
            </div>

            <MovieDetails selectedMovie={selectedMovie} />
                        
          </div>
        )}



    </div>
  );
};

export default SearchPage;