import {
    createContext,
    useCallback,
    useContext,
    useState,
    useMemo
} from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const loginDB = useCallback(async (email = '', password = '') => {
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            setUser(user);

            return { success: true };

        } catch (error) {

            console.error("Error al iniciar sesión:", error.code, error.message);

            throw error;
        }
    }, []);

    const registerDB = useCallback(async (email = '', password = '') => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            setUser(newUser);
            return { success: true };
        } catch (error) {
            console.error("Error al registrar usuario:", error.code, error.message);
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await signOut(auth);
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error("Error al cerrar sesión:", error.code, error.message);
            throw error;
        }
    }, []);

    const addVideoDB = useCallback(async (dataToAdd) => {
        if (!user) throw new Error("Usuario no autenticado");

        try {
            await addDoc(collection(db, 'videos'), {
                user_id: user.uid,
                created_at: serverTimestamp(),
                ...dataToAdd
            });

            return { success: true };
        } catch (error) {
            console.error("Error al agregar vídeo:", error.code, error.message);
            throw error;
        }
    }, [user]);

    const addPlaylistDB = useCallback(async (dataToAdd) => {
        if (!user) throw new Error("Usuario no autenticado");

        try {
            await addDoc(collection(db, 'playlists'), {
                user_id: user.uid,
                created_at: serverTimestamp(),
                ...dataToAdd
            });

            return { success: true };
        } catch (error) {
            console.error("Error al agregar playlist:", error.code, error.message);
            throw error;
        }
    }, [user]);

    const getLatestVideos = useCallback(async () => {
        if (!user) throw new Error("Usuario no autenticado");

        try {
            const q = query(
                collection(db, "videos"),
                where("user_id", "==", user.uid),
                orderBy('created_at', 'desc'),
                limit(7)
            )

            const querySnapshot = await getDocs(q);

            const list = [];

            querySnapshot.forEach((doc) => list.push({
                video_id: doc.id,
                ...doc.data()
            }));

            return list;
        } catch (error) {
            console.error("Error al obtener los últimos 7 vídeos:", error.code, error.message);
            throw error;
        }
    }, [user]);

    const getPlaylistDB = useCallback(async () => {
        try {
            const q = query(
                collection(db, "playlists"),
                where("user_id", "==", user.uid),
                orderBy('created_at', 'desc'));

            const querySnapshot = await getDocs(q);

            const list = [];

            querySnapshot.forEach((doc) => list.push({
                playlist_id: doc.id,
                ...doc.data()
            }));

            return list;
        } catch (error) {
            console.error("Error al obtener la playlist:", error.code, error.message);
            throw error;
        }
    }, [user]);

    const addSongToPlaylist = useCallback(async (playlist_id, video_id) => {
        try {
            const docRef = doc(db, "playlists", playlist_id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                await updateDoc(docRef, {
                    video_ids: arrayUnion(video_id)
                });
            } else {
                console.log("No se encontró la playlist con ese ID");
            }
        } catch (error) {
            console.error("Error al agregar canción a playlists:", error);
            throw error;
        }
    }, []);

    const deletePlaylistDB = useCallback(async (playlist_id) => {
        try {
            const docRef = doc(db, "playlists", playlist_id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error al eliminar la playlist:", error);
            throw error;
        }
    }, []);

    const getVideoDB = useCallback(async (video_id) => {
        try {
            const docRef = doc(db, "videos", video_id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    video_id: docSnap.id,
                    ...docSnap.data()
                }
            } else {
                console.log("No se encontró el vídeo con ese ID");
            }
        } catch (error) {
            console.error("Error al obtener el vídeo:", error);
            throw error;
        }
    }, []);

    const updateVideoDB = useCallback(async (video_id, newData) => {
        if (!user) throw new Error("Usuario no autenticado");

        try {
            const docRef = doc(db, "videos", video_id);

            await updateDoc(docRef, {
                ...newData
            });

            return { success: true };
        } catch (error) {
            console.error("Error al actualizar el vídeo:", error.code, error.message);
            throw error;
        }
    }, [user]);

    const getLatestPlaylist = useCallback(async () => {
        if (!user) throw new Error("Usuario no autenticado");

        try {
            const q = query(
                collection(db, "playlists"),
                where("user_id", "==", user.uid),
                orderBy('created_at', 'desc'),
                limit(7)
            )

            const querySnapshot = await getDocs(q);

            const list = [];

            querySnapshot.forEach((doc) => list.push({
                playlist_id: doc.id, // <--- Aquí estaba el error, decía video_id
                ...doc.data()
            }));

            return list;
        } catch (error) {
            console.error("Error al obtener las últimas 7 playlist:", error.code, error.message);
            throw error;
        }
    }, [user]);

    const getPlaylistByIdDB = useCallback(async (playlist_id) => {
        try {
            const docRef = doc(db, "playlists", playlist_id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    playlist_id: docSnap.id,
                    ...docSnap.data()
                }
            } else {
                console.log("No se encontró la playlist con ese ID");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener la playlist:", error);
            throw error;
        }
    }, []);

    const updatePlaylistDB = useCallback(async (playlist_id, newData) => {
        if (!user) throw new Error("Usuario no autenticado");

        try {
            const docRef = doc(db, "playlists", playlist_id);

            await updateDoc(docRef, {
                ...newData
            });

            return { success: true };
        } catch (error) {
            console.error("Error al actualizar la playlist:", error.code, error.message);
            throw error;
        }
    }, [user]);

    const removeSongFromPlaylist = useCallback(async (playlist_id, video_id) => {
        try {
            const docRef = doc(db, "playlists", playlist_id);
            await updateDoc(docRef, {
                video_ids: arrayRemove(video_id)
            });
            return { success: true };
        } catch (error) {
            console.error("Error al eliminar canción de playlist:", error);
            throw error;
        }
    }, []);

    const getAllVideos = useCallback(async () => {
        if (!user) throw new Error("Usuario no autenticado");

        try {
            const q = query(
                collection(db, "videos"),
                where("user_id", "==", user.uid),
                orderBy('created_at', 'desc')
            );

            const querySnapshot = await getDocs(q);

            const list = [];

            querySnapshot.forEach((doc) => list.push({
                video_id: doc.id,
                ...doc.data()
            }));

            return list;
        } catch (error) {
            console.error("Error al obtener todos los vídeos:", error.code, error.message);
            throw error;
        }
    }, [user]);


    // --------------------------------------

    const contextValue = useMemo(() => ({
        user,
        setUser,
        loginDB,
        registerDB,
        logout,
        addVideoDB,
        getLatestVideos,
        getVideoDB,
        updateVideoDB,
        addPlaylistDB,
        getPlaylistDB,
        getLatestPlaylist,
        getPlaylistByIdDB,
        updatePlaylistDB,
        deletePlaylistDB,
        addSongToPlaylist,
        removeSongFromPlaylist,
        getAllVideos
    }), [
        user,
        setUser,
        loginDB,
        registerDB,
        logout,
        addVideoDB,
        addPlaylistDB,
        getLatestVideos,
        getPlaylistDB,
        addSongToPlaylist,
        deletePlaylistDB,
        getVideoDB,
        updateVideoDB,
        getLatestPlaylist,
        getPlaylistByIdDB,
        updatePlaylistDB,
        removeSongFromPlaylist,
        getAllVideos
    ]);
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}