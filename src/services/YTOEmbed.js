// Función para obtener datos de OEmbed al obtener la url de Youtube.
export async function getOEmbedDataYT(url) {
    try {
        const response = await fetch(`https://noembed.com/embed?url=${url}`);

        if (response.ok) {
            const data = await response.json();
            return data;
        }

        const errorData = await response.json().catch(() => null);

        switch (response.status) {
            case 400:
                console.error("Error de validación:", errorData);
                throw new Error(errorData.message || "Datos incorrectos");
            case 401:
                console.warn("Sesión expirada");
                throw new Error("No autorizado");
            case 404:
                throw new Error("El recurso que buscas no existe");
            case 500:
                throw new Error("Error interno del servidor, intenta más tarde");
            default:
                throw new Error(`Error inesperado: ${response.status}`);
        }

    } catch (error) {
        console.error("Hubo un problema con la petición:", error.message);
        throw error;
    }
}

// Función para extraer el ID de YouTube
export const extractVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};