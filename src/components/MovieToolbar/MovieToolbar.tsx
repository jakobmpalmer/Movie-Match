import styles from './movietoolbar.module.scss'

const MovieToolbar = () => {

    return (
        <div style={{display: 'flex', margin: '10px'}}>
            <div className={styles.button}>Add To List</div>
            <div className={styles.button}>Watched</div>
            <div className={styles.button}>3</div>
        </div>
    )
}

export default MovieToolbar