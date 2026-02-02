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


    return (
        <AuthContext.Provider value={{ user, registerNewUser, userLogin, addSong, addPlaylist }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}