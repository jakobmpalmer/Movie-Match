
import Movie from '@/models/Movie'
import styles from './search.module.scss'
import { getGenreName } from '@/utils/genreUtils'

interface MovieDetailsProps {
    selectedMovie: Movie | undefined; 
  }
  
const MovieDetails = ({ selectedMovie }: MovieDetailsProps) => {
    return (
        <div className={styles.movieDetailsContainer}>
            <div className={styles.movieDetailRow}>
            <strong>Title:</strong>
            <span>{selectedMovie?.title || 'N/A'}</span>
            </div>
            <div className={styles.movieDetailRow}>
            <strong>Release Date:</strong>
            <span>{selectedMovie?.release_date || 'N/A'}</span>
            </div>
            <div className={styles.movieDetailRow}>
            <strong>Genre:</strong>
            <span>
                {selectedMovie?.genre_ids.length
                ? selectedMovie.genre_ids.map((id) => getGenreName(id)).join(', ')
                : 'N/A'}
            </span>
            </div>
            <div className={styles.movieDetailRow}>
            <strong>Language:</strong>
            <span>{selectedMovie?.original_language || 'N/A'}</span>
            </div>
            <div className={styles.movieDetailRow}>
            <strong>Original Title:</strong>
            <span>{selectedMovie?.original_title || 'N/A'}</span>
            </div>
            <div className={styles.movieDetailRow}>
            <strong>Popularity:</strong>
            <span>{selectedMovie?.popularity || 'N/A'}</span>
            </div>
            <div className={styles.movieDetailRow}>
            <strong>Vote Average:</strong>
            <span>{selectedMovie?.vote_average || 'N/A'}</span>
            </div>
            <div className={styles.movieDetailRow}>
            <strong>Vote Count:</strong>
            <span>{selectedMovie?.vote_count || 'N/A'}</span>
            </div>
        </div>
    )
}


export default MovieDetails