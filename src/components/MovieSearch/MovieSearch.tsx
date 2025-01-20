"use client";
import React, { useState } from "react";
import styles from "./moviesearch.module.scss";

const SearchMovies = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      if (data.results) {
        setResults(data.results);
        console.log('setting results:', data.results)
      } else {
        setError("No results found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.resultsContainer}>
        {results.map((movie) => (
          <div key={movie.id} className={styles.resultCard}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.png"
              }
              alt={movie.title}
              className={styles.resultPoster}
            />
            <div className={styles.resultDetails}>
              <h3>{movie.title}</h3>
                {movie.adult && <p>ADULT</p>}
              <p>{movie.release_date || "N/A"}</p>
              <p>{movie.overview || "No description available."}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
