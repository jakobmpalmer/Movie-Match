"use client";
import React, { useState } from "react";
import styles from './GenreSelector.module.scss'
import { getGenreId } from '../../utils/genreUtils'; 

const availableGenres = ["Action", "Adventure", "Mystery", "Comedy", 'Romance', 'Animation', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Science Fiction']; 

export interface Genres {
  Action: boolean;
  Adventure: boolean;
  Mystery: boolean;
  Comedy: boolean;
  Romance: boolean; 
  Animation: boolean; 
  Crime: boolean;
  Drama: boolean;
  Fantasy: boolean;
  Horror: boolean;
  'Science Fiction': boolean; 
}

export type GenreKey = keyof Genres;

interface GenreSelectionProps {
  onGenresSelected: (genres: number[]) => void; // Changed to number[]
}

const GenreSelector: React.FC<GenreSelectionProps> = ({ onGenresSelected }) => {
  const [movieGenre, setMovieGenre] = useState<Genres>(
    availableGenres.reduce((obj, genre) => {
      obj[genre as GenreKey] = false; 
      return obj;
    }, {} as Genres)
  );

  const handleGenreClick = (genre: GenreKey) => {
    setMovieGenre((prevGenres) => ({
      ...prevGenres,
      [genre]: !prevGenres[genre],
    }));
  };

  const handleSubmit = () => {
    const selectedGenreIds = (Object.keys(movieGenre) as GenreKey[])
      .filter((genre) => movieGenre[genre]) 
      .map(genreName => getGenreId(genreName)) 
      .filter(id => id !== undefined) as number[]; 

    onGenresSelected(selectedGenreIds); 
  };

  return (
    <div>
      <h2>Choose your genre:</h2>
      <div className={styles.genreButtons}>
        {availableGenres.map((genre) => (
          <button
            key={genre}
            className={`${styles.genreButton} ${
              movieGenre[genre as GenreKey] ? styles.active : ''
            }`}
            onClick={() => handleGenreClick(genre as GenreKey)}
          >
            {genre}
          </button>
        ))}
      </div>
  
      <div className={styles.buttonContainer}>
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
  
};

export default GenreSelector;