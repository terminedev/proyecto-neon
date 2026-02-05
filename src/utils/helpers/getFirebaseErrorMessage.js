export const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {

        // --- REGISTRO DE USUARIOS ---

        case 'auth/email-already-in-use':
            return 'Este correo electrónico ya está registrado. Intenta iniciar sesión.';

        case 'auth/weak-password':
            return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';

        case 'auth/operation-not-allowed':
            return 'El método de registro seleccionado no está habilitado. Contacta al soporte.';

        case 'auth/account-exists-with-different-credential':
            return 'Ya existe una cuenta con este correo, pero fue creada con otro método (Google, Facebook, etc.).';

        case 'auth/credential-already-in-use':
            return 'Esta cuenta (Google/Facebook) ya está vinculada a otro usuario.';

        // --- INICIO DE SESIÓN / AUTENTICACIÓN ---

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

        case 'auth/requires-recent-login':
            return 'Por seguridad, necesitas volver a iniciar sesión para realizar esta acción.';

        case 'auth/popup-closed-by-user':
            return 'El proceso de inicio de sesión fue cancelado antes de terminar.';

        case 'auth/popup-blocked':
            return 'El navegador bloqueó la ventana emergente. Por favor, permítela e inténtalo de nuevo.';

        // --- PROTECCIÓN Y LÍMITES ---

        case 'auth/too-many-requests':
            return 'Demasiados intentos fallidos. Por favor, espera unos minutos e inténtalo de nuevo.';

        // --- ERRORES DE SISTEMA / RED ---

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