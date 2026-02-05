export const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {

        // --- AUTENTICACIÓN: LOGIN Y REGISTRO ---

        case 'auth/invalid-email':
            return 'El formato del correo electrónico no es válido.';

        case 'auth/user-disabled':
            return 'Esta cuenta ha sido deshabilitada por el administrador.';

        case 'auth/user-not-found':
            return 'No encontramos ninguna cuenta asociada a este correo.';

        case 'auth/wrong-password':
            return 'La contraseña es incorrecta. Inténtalo de nuevo.';

        case 'auth/invalid-credential':
            return 'Las credenciales no son válidas o han expirado.';

        case 'auth/email-already-in-use':
            return 'Ya existe una cuenta registrada con este correo electrónico.';

        case 'auth/weak-password':
            return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';

        case 'auth/requires-recent-login':
            return 'Por seguridad, necesitas volver a iniciar sesión para realizar esta acción.';

        case 'auth/popup-closed-by-user':
            return 'El proceso de inicio de sesión fue cancelado antes de terminar.';

        // --- PROTECCIÓN Y LÍMITES ---

        case 'auth/too-many-requests':
            return 'Demasiados intentos fallidos. Por favor, espera unos minutos e inténtalo de nuevo.';

        // --- ERRORES CRÍTICOS / SISTEMA ---

        case 'auth/network-request-failed':
            return 'Error de conexión. Por favor, revisa tu conexión a internet.';

        case 'auth/internal-error':
            return 'Ocurrió un error interno en el servidor. Inténtalo más tarde.';

        case 'unavailable':
            return 'El servicio está temporalmente no disponible.';

        // --- DEFAULT (Fallback) ---
        default:
            console.warn('Error de Firebase no controlado:', errorCode);
            return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
    }
};