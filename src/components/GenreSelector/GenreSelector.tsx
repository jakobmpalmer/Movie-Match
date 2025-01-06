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
      Choose your genre:
      <div className={styles.genreButtons}>
        {availableGenres.map((genre) => (
          <button 
          className={`${styles.genreButton} ${movieGenre[genre as GenreKey] ? styles.active : ''}`} 
          key={genre} 
          onClick={() => handleGenreClick(genre as GenreKey)}>
            {genre} 
          </button>
        ))}
      </div>
      {/* <div>
        <h3>Selected Genres:</h3>
        <ul>
          {(Object.keys(movieGenre) as GenreKey[]).map((genre) => (
            <li key={genre}>
              {genre}: {movieGenre[genre] ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      </div> */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GenreSelector;