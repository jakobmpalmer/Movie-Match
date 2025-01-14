"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./moviedetails.module.scss";

const MovieDetailsPage = () => {
  const router = useRouter();
  const { moviename } = router.query;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!moviename) return;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            moviename as string
          )}`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setMovie(data.results[0]);
        } else {
          setError("Movie not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [moviename]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.movieDetailsContainer}>
      <h1>{movie.title}</h1>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.png"
        }
        alt={movie.title}
        className={styles.moviePoster}
      />
      <p>
        <strong>Release Date:</strong> {movie.release_date || "N/A"}
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview || "No description available."}
      </p>
      <p>
        <strong>Language:</strong> {movie.original_language || "N/A"}
      </p>
      <p>
        <strong>Popularity:</strong> {movie.popularity || "N/A"}
      </p>
      <p>
        <strong>Vote Average:</strong> {movie.vote_average || "N/A"}
      </p>
      <p>
        <strong>Vote Count:</strong> {movie.vote_count || "N/A"}
      </p>
    </div>
  );
};

export default MovieDetailsPage;
