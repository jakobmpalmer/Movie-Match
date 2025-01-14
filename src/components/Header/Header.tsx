// Header.js

import React from 'react';
import styles from './Header.module.scss'; 

const Header = () => {
  return (
    <header className={styles.header}> 
      <a href={'/match'}><h3 className={styles.headerItem}>Match</h3></a>
      <a href={'/search'}><h3 className={styles.headerItem}>Search</h3></a>
      <a href={'/'}><h1 className={styles.headerTitle}>Movie Match</h1></a>
      <a href={'/profile'}><h3 className={styles.headerItem}>Profile</h3></a>
      <a href={'/about'}><h3 className={styles.headerItem}>About</h3></a>
    </header>
  );
};

export default Header;