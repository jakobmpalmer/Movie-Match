/*
Author: Jakob M Paulson-Palmer
The purpose of this class is to provide an interface to select genres provided by the tmdb. 
*/

"use client";
import React, { useState } from "react";
import styles from "./GenreSelector.module.scss";
import GenreTag from "../GenreTag/GenreTag";
import { genreMap, getGenreId } from "../../utils/genreUtils";

const availableGenres = Object.keys(genreMap);

interface GenreSelectionProps {
  onGenresSelected: (genres: number[]) => void;
}

const GenreSelector: React.FC<GenreSelectionProps> = ({ onGenresSelected }) => {
  const [movieGenre, setMovieGenre] = useState<{ [key: string]: boolean }>(
    availableGenres.reduce((obj, genre) => {
      obj[genre] = false;
      return obj;
    }, {} as { [key: string]: boolean })
  );

  const handleGenreClick = (genreName: string) => {
    setMovieGenre((prevGenres) => ({
      ...prevGenres,
      [genreName]: !prevGenres[genreName],
    }));
  };

  const handleSubmit = () => {
    const selectedGenreIds = availableGenres
      .filter((genreName) => movieGenre[genreName])
      .map((genreName) => getGenreId(genreName))
      .filter((id) => id !== undefined) as number[];

    onGenresSelected(selectedGenreIds);
  };

  return (
    <div>
      <h2>Choose your genre:</h2>
      <div className={styles.genreButtons}>
        {availableGenres.map((genreName) => (
          <GenreTag
            key={genreName}
            genre={genreName}
            isActive={movieGenre[genreName]}
            onClick={() => handleGenreClick(genreName)}
          />
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
