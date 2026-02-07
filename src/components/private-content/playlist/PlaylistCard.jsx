import { useState } from "react";
import { Link } from "react-router-dom";
import DeletePlaylist from "components/private-content/playlist/DeletePlaylist";

import styles from 'styles/Card.module.css';

export default function PlaylistCard({ playlistData }) {

    const {
        playlist_id,
        name,
        cover,
    } = playlistData;

    return (
        <>
            <article className={styles.card}>
                <header className={styles.content}>
                    <h3>{name}</h3>
                </header>
                <main>
                    <img
                        src={cover}
                        alt={`Portada de ${name}`}
                        className={styles.thumbnail}
                    />
                </main>
                <footer className={styles.footer}>
                    <Link to={`/playlist/${playlist_id}`} className={styles.button}>
                        Play
                    </Link>

                    <Link to={`/editar-playlist/${playlist_id}`} className={styles.button}>
                        Editar
                    </Link>

                    <Link to={`/borrar-playlist/${playlist_id}`} className={styles.button}>
                        Borrar
                    </Link>
                </footer>
            </article>
        </>
    );
};