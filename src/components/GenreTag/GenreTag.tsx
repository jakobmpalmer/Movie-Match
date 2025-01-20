import React from 'react';
import styles from './GenreTag.module.scss'

interface GenreTagProps {
  genre: string;
  isActive: boolean;
  onClick: () => void;
}

function GenreTag({ genre, isActive, onClick }: GenreTagProps) {
  return (
    <span
      className={`${styles.genreTag} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      role="button"
      aria-pressed={isActive}
    >
      {genre}
    </span>
  );
}

export default GenreTag;