import React from "react";
import Movie from "../../models/Movie";

interface TMovieDisplayProps {
  selectedGenres: number[];
  setSearchedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  searchedMovie: Movie | null;
}

const TMovieDisplay: React.FC<TMovieDisplayProps> = ({
  selectedGenres,
  searchedMovie,
}) => {
  return (
    <div style={{ position: "relative" }}>
      {searchedMovie ? (
        <div>
          {/* <h2>{searchedMovie.title}</h2> */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={
                searchedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${searchedMovie.poster_path}`
                  : "/placeholder.png"
              }
              alt={searchedMovie.title}
              style={{ display: "block" }}
            />
            <img
              src="/images/tmdb_attribution_logo.svg"
              alt="TMDB Logo"
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                width: "50px",
                height: "auto",
              }}
            />
          </div>
        </div>
      ) : (
        <p>No movie selected</p>
      )}
    </div>
  );
};

export default TMovieDisplay;
