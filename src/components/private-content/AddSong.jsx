import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "contexts/AuthProvider";

export default function AddSong({
    closeModal
}) {

    const { user, addSong } = useAuth();
    const [error, setError] = useState(null);

    const [urlYTLocal, setUrlYTLocal] = useState('');
    const [YTOEobject, setYTOEobject] = useState(null);


    const {
        register,
        handleSubmit,
        reset,
        // formState: { errors },
    } = useForm();

    const handleDddedMusic = (songData) => {
        const songDataFinal = {
            author_name: YTOEobject.author_name,
            author_url: YTOEobject.author_url,
            thumbnail_url: songData.thumbnail_url,
            title: songData.title,
            idVideo: extractVideoID(urlYTLocal)
        };

        try {
            setError(null);
            addSong(user.uid, songDataFinal);
            closeModal();
        } catch (error) {
            setError(error.message)
        }
    };

    const extractVideoID = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };


    /*
        Obtención de JSON de la API de YouTube OEmbed.
        Sin Link no se realiza petición.
    */
    useEffect(() => {

        if (urlYTLocal.trim().length <= 0) return;

        const getApiYT = async () => {
            const res = await fetch(`https://www.youtube.com/oembed?url=${urlYTLocal}&format=json`);
            const data = await res.json();

            setYTOEobject(data);
            console.log('Objeto OEmbed -->', data);
            console.log('ID Video -->', extractVideoID(urlYTLocal));
        };

        getApiYT();
    }, [urlYTLocal]);


    // Actualización del Formulario al obtener datos.
    useEffect(() => {
        reset({
            thumbnail_url: YTOEobject?.thumbnail_url,
            title: YTOEobject?.title,
        });
    }, [YTOEobject, reset]);


    return (
        <>
            {error && <p>{error}</p>}
            <button onClick={() => closeModal()}>Cancelar pedido</button>
            {/* Formulario de obtención de objeto YouTube OEmbed */}

            <form>
                <label htmlFor='urlVideoTY'>Añade la URL de una canción de Youtube:</label>
                <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=ZaFaxmaSSCU"
                    id='urlVideoTY'
                    onChange={(e) => setUrlYTLocal(e.target.value)}
                />
            </form>


            {/* 
                Formulario para agregar canción al sistema.
                Sólo aparece si hay un objeto YouTube OEmbed.
            */}

            {
                YTOEobject &&
                <>
                    <form onSubmit={handleSubmit(handleDddedMusic)} noValidate>

                        {/* Datos Vídeo */}
                        <fieldset>
                            <legend>Datos Príncipales:</legend>

                            <label htmlFor='title'>Título:</label>
                            <input
                                type="text"
                                placeholder="Título Original del Vídeo"
                                id='title'
                                {...register("title", {

                                    // INTRODUCIR UNA VALIDACIÓN
                                    // validate: (value) => {
                                    //     const esValido = value.includes('@'); // Tu lógica aquí
                                    //     return esValido || "Formato de correo no válido";
                                    // }

                                })}
                            />
                            {/* {errors.emailLogin && <span>{errors.emailLogin.message}</span>} */}
                        </fieldset>

                        {/* Miniatura Vídeo */}
                        <fieldset>
                            <legend>Miniatura:</legend>

                            <label htmlFor='thumbnail_url'>Imagen:</label>
                            <input
                                type="text"
                                placeholder="Miniatura del Vídeo"
                                id='thumbnail_url'
                                {...register("thumbnail_url", {

                                    // INTRODUCIR UNA VALIDACIÓN
                                    // validate: (value) => {
                                    //     const esValido = value.includes('@'); // Tu lógica aquí
                                    //     return esValido || "Formato de correo no válido";
                                    // }

                                })}
                            />
                            {/* {errors.emailLogin && <span>{errors.emailLogin.message}</span>} */}
                        </fieldset>


                        <button type="button" onClick={() => {
                            reset({
                                thumbnail_url: YTOEobject?.thumbnail_url,
                                title: YTOEobject?.title,
                            });
                        }}>Establecer Datos por Defecto</button>
                        <button type="submit">Guardar Música</button>
                    </form>

                    {/* Sección no editable */}
                    <section>
                        <img src={YTOEobject.thumbnail_url} />

                        <p>Autor:</p>
                        <a href={YTOEobject.author_url} target="_blank" rel="noreferrer">
                            {YTOEobject.author_name}
                        </a>
                    </section>
                </>
            }
        </>
    );
};

