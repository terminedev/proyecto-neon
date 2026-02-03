import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const listaUsuariosRegistrados = [{
    uid: '123',
    email: 'gaston',
    password: '123',
    songList: [],
    playlist: [],
}];

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        uid: '123',
        email: 'gaston',
        password: '123',
        songList: [],
        playlist: [],
    });

    const registerNewUser = (userData) => {
        if (!listaUsuariosRegistrados.some(user => user.email === userData.email)) {
            const user = { uid: crypto.randomUUID(), ...userData };
            listaUsuariosRegistrados.push(user);
            setUser(user);
            return userData;
        } else {
            throw new Error('Correo electonico ya existente')
        }
    };

    const userLogin = ({ email, password }) => {
        const user = listaUsuariosRegistrados.find(user => user.email === email && user.password === password);
        if (user) {
            setUser(user)
            return user;
        } else {
            throw new Error('Usuario no existente');
        }
    };

    const addSong = (uid, songData) => {
        const user = listaUsuariosRegistrados.find(user => user.uid === uid);

        if (user) {
            const { songList } = user;
            if (songList.some(song => song.idVideo === songData.idVideo)) throw new Error('Vídeo ya registrado');
            setUser(prevUser => ({
                ...prevUser,
                songList: [...prevUser.songList, songData]
            }));
            return songData;
        } else {
            throw new Error('Usuario no existente');
        }
    };

    const addPlaylist = (uid, playlistData) => {
        const user = listaUsuariosRegistrados.find(user => user.uid === uid);

        if (user) {
            setUser(prevUser => ({
                ...prevUser,
                playlist: [...prevUser.playlist, playlistData]
            }));
            return playlistData;
        } else {
            throw new Error('Usuario no existente');
        }
    };

    const editSong = (newSongData) => {
        if (user) {
            setUser(prevUser => ({
                ...prevUser,
                songList: prevUser.songList.map(song =>
                    song.idVideo === newSongData.idVideo ? { ...song, ...newSongData } : song
                )
            }));

            return newSongData;
        } else {
            throw new Error('Usuario no autenticado');
        }
    };

    const editPlaylist = (newPlaylistData) => {
        if (user) {
            setUser(prevUser => ({
                ...prevUser,
                playlist: prevUser.playlist.map(pl =>
                    pl.id === newPlaylistData.id ? { ...pl, ...newPlaylistData } : pl
                )
            }));

            return newPlaylistData;
        } else {
            throw new Error('Usuario no autenticado');
        }
    };

    const deleteSong = (songToDelete) => {
        const updatedList = user.songList.filter(song => song.idVideo !== songToDelete.idVideo);
        setUser({ ...user, songList: updatedList });
    };

    const deletePlaylist = (playlistToDelete) => {
        const updatedList = user.playlist.filter(list => list.id !== playlistToDelete.id);
        setUser({ ...user, playlist: updatedList });
    };

    const addSongToPlaylist = (playlistId, songData) => {
        if (user) {
            setUser(prevUser => ({
                ...prevUser,
                playlist: prevUser.playlist.map(list => {
                    if (list.id === playlistId) {

                        if (list.songs.some(song => song.idVideo === songData.idVideo)) throw new Error('La canción ya está en esta playlist');
                        return { ...list, songs: [...list.songs, songData] };
                    }
                    return list;
                })
            }));
        } else {
            throw new Error('Usuario no autenticado');
        }
    };

    return (
        <AuthContext.Provider value={{ user, registerNewUser, userLogin, addSong, addPlaylist, editSong, editPlaylist, deleteSong, deletePlaylist, addSongToPlaylist }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}