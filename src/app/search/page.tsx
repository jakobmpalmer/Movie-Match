"use client"
import GenreSelector from '@/components/GenreSelector/GenreSelector';
import TMovieDisplay from '@/components/TMovieDisplay/TMovieDisplay';
import React, { useState } from 'react';
import { Movie } from '@/models/Movie';

const SearchPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]); 
  const [showMovie, setShowMovie] = useState<boolean>(false);
  const [selectedMovie, setSearchedMovie] = useState<Movie>();

  const handleGenresSelected = (genres: number[]) => { // Changed to number[]
    setSelectedGenres(genres);
    setShowMovie(true);
  };

  return (
    <div style={{maxWidth: '80%', margin: '0px auto'}}>        
        <h1>Search</h1>
        <div style={{width: '50%', margin: '0px auto'}}>
            <GenreSelector onGenresSelected={handleGenresSelected} />
        </div>

        <div>
            {showMovie && <TMovieDisplay selectedGenres={selectedGenres} setSearchedMovie={setSearchedMovie} />}
        </div>
        <div>
            <h1>{selectedMovie?.title}</h1>
            <h3>{selectedMovie?.release_date}</h3>
            <h2>Lang: {selectedMovie?.original_language}</h2>
            <h2>original_title: {selectedMovie?.original_title}</h2>
            <h2>popularity: {selectedMovie?.popularity}</h2>
            <h2>vote_average: {selectedMovie?.vote_average}</h2>
            <h2>vote_count: {selectedMovie?.vote_count}</h2>
        </div>
    </div>
  );
};

export default SearchPage;