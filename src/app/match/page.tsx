"use client";
import React, { useState } from "react";
import GenreSelection from "../../components/GenreSelector/GenreSelector";
import TMovieDisplay from "../../components/TMovieDisplay/TMovieDisplay";
import Movie from "../../models/Movie";
import styles from "./match.module.scss";
import MovieToolbar from "../../components/MovieToolbar/MovieToolbar";

const MatchPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [showMovie, setShowMovie] = useState<boolean>(false);
  const [searchedMovie, setSearchedMovie] = useState<Movie | null>(null);
  const [count, setCount] = useState<number>(0);

  const handleGenresSelected = (genres: number[]) => {
    setSelectedGenres(genres);
    fetchNewMovie(genres);
    setShowMovie(true);
  };

  const fetchNewMovie = async (genres: number[]) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const genresString = genres.join(",");
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genresString}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const selectedMovie = data.results[randomIndex];
        setSearchedMovie(selectedMovie);
        console.log('searchedMovie:', searchedMovie);
      } else {
        console.error("No movies found for these genres.");
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const handleButtonClick = () => {
    setCount((prevCount) => prevCount + 1);
    fetchNewMovie(selectedGenres);
  };

  return (
    <div style={{ maxWidth: "80%", margin: "0px auto" }}>
      {!showMovie && (
        <GenreSelection onGenresSelected={handleGenresSelected} />
      )}
      {showMovie && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <h2>Count: {count}</h2>
          <TMovieDisplay
            selectedGenres={selectedGenres}
            setSearchedMovie={setSearchedMovie}
            searchedMovie={searchedMovie}
          />
          <MovieToolbar />
          <p>{searchedMovie?.overview}</p>
          <div style={{ display: "flex", justifyContent: "column", gap: "20px" }}>
            <div
              className={styles.button}
              onClick={handleButtonClick}
            >
              Left
            </div>
            <div
              className={styles.button}
              onClick={handleButtonClick}
            >
              Right
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchPage;
