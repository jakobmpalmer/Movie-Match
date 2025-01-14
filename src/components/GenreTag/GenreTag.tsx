import React from 'react';
import styles from './GenreTag.module.scss'

interface GenreTagProps {
  genre: string; 
}

function GenreTag({ genre }: GenreTagProps) {
  return (
    <span className={styles.genreTag}>
      {genre}
    </span>
  );
}

export default GenreTag;