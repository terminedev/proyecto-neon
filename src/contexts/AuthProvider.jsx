import { createContext, useContext, useState } from 'react';

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

    const contextValue = useMemo(() => ({
        user,
        setUser,
        loginDB
    }), [user, setUser, loginDB]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}