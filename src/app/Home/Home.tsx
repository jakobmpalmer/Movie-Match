"use client"
import React, { useState } from 'react';
import GenreSelection from '../../components/GenreSelector/GenreSelector';
import MovieDisplay from '../../components/MovieDisplay';
import TMovieDisplay from '../../components/TMovieDisplay/TMovieDisplay';
// import { Genres, GenreKey } from '../../components/GenreSelector/GenreSelector';
import Header from '@/components/Header/Header';
import Movie from '../../models/Movie'

const HomePage = () => {
//   const [selectedGenres, setSelectedGenres] = useState<GenreKey[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]); 
  const [showMovie, setShowMovie] = useState<boolean>(false);
  const [searchedMovie, setSearchedMovie] = useState<Movie | null>(null);

  const handleGenresSelected = (genres: number[]) => { 
    setSelectedGenres(genres);
    setShowMovie(true);
  };

  return (
    <div style={{maxWidth: '80%', margin: '0px auto'}}>        
        <h1>Welcome to Movie Matcher</h1>
        <div style={{border: '1px solid black', 
          borderRadius: '10px', 
          textAlign: 'center', 
          backgroundColor: 'white', 
          color: 'black', 
          width: '15vw', 
          height:'15vh'}}>
          <div>
            <h1>Match</h1>
          </div>
        </div>
    </div>
  );
};

export default HomePage;