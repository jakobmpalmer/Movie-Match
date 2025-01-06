"use client"
import React, { useState } from 'react';
import GenreSelection from '../../components/GenreSelector/GenreSelector';
import MovieDisplay from '../../components/MovieDisplay';
import TMovieDisplay from '../../components/TMovieDisplay/TMovieDisplay';
import { Genres, GenreKey } from '../../components/GenreSelector/GenreSelector';
import Header from '@/components/Header/Header';
import Movie from '../../models/Movie'

const HomePage = () => {
//   const [selectedGenres, setSelectedGenres] = useState<GenreKey[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]); 
  const [showMovie, setShowMovie] = useState<boolean>(false);
  const [searchedMovie, setSearchedMovie] = useState<Movie>();

  const handleGenresSelected = (genres: number[]) => { // Changed to number[]
    setSelectedGenres(genres);
    setShowMovie(true);
  };

  return (
    <div style={{maxWidth: '80%', margin: '0px auto'}}>        
        {!showMovie && (
            <GenreSelection onGenresSelected={handleGenresSelected} />
        )}
        {showMovie && <TMovieDisplay selectedGenres={selectedGenres} setSearchedMovie={setSearchedMovie}/>}
    </div>
  );
};

export default HomePage;