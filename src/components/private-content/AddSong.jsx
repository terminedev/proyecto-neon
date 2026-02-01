import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddSong() {

    const [urlYTLocal, setUrlYTLocal] = useState('');
    const [YTOEobject, setYTOEobject] = useState(null);


    const {
        register,
        handleSubmit,
        reset,
        // formState: { errors },
    } = useForm();

    const handleDddedMusic = (songData) => {
        console.log('Datos Musica -->', songData);
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
        };

        getApiYT();
    }, [urlYTLocal]);


    // Actualización del Formulario al obtener datos.
    useEffect(() => {
        reset({
            thumbnail_url: YTOEobject?.thumbnail_url,
            thumbnail_width: YTOEobject?.thumbnail_width,
            thumbnail_height: YTOEobject?.thumbnail_height,
            title: YTOEobject?.title,
            html: YTOEobject?.html,
        });
    }, [YTOEobject, reset]);

    return (
        <>
            {/* Formulario de obtención de objeto YouTube OEmbed */}

            <form>
                <label htmlFor='urlVideoTY'>Añade la URL de una canción de Youtube:</label>
                <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=ZaFaxmaSSCU"
                    id='urlVideoTY'
                    value={urlYTLocal}
                    onChange={(e) => setUrlYTLocal(e.target.value)}
                />
            </form>


            {/* 
                Formulario para agregar canción al sistema.
                Sólo aparece si hay un objeto YouTube OEmbed.
            */}

            {
                YTOEobject &&
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


                        {/* OBTENER EL ID DEL VÍDEO */}
                        <label htmlFor='html'>ID Vídeo:</label>
                        <input
                            type="text"
                            placeholder="Iframe Original del Vídeo"
                            id='html'
                            {...register("html", {

                                // INTRODUCIR UNA VALIDACIÓN
                                // validate: (value) => {
                                //     const esValido = value.includes('@'); // Tu lógica aquí
                                //     return esValido || "Formato de correo no válido";
                                // }

                            })}
                        />
                        {/* {errors.emailLogin && <span>{errors.emailLogin.message}</span>} */}
                    </fieldset>


                    {/* (Dirección / Nombre) Autor */}
                    <fieldset>
                        <legend>Copyright:</legend>

                        <p>Autor:</p>
                        <a href={YTOEobject.author_url} target="_blank" rel="noreferrer">
                            {YTOEobject.author_name}
                        </a>
                    </fieldset>

                    {/* Miniatura Vídeo */}
                    <fieldset>
                        <legend>Miniatura:</legend>

                        <img src={YTOEobject.thumbnail_url} />

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


                        <label htmlFor='thumbnail_width'>Ancho:</label>
                        <input
                            type="number"
                            placeholder="Ancho Miniatura del Vídeo"
                            id='thumbnail_width'
                            {...register("thumbnail_width", {

                                // INTRODUCIR UNA VALIDACIÓN
                                // validate: (value) => {
                                //     const esValido = value.includes('@'); // Tu lógica aquí
                                //     return esValido || "Formato de correo no válido";
                                // }

                            })}
                        />
                        {/* {errors.emailLogin && <span>{errors.emailLogin.message}</span>} */}


                        <label htmlFor='thumbnail_height'>Altura:</label>
                        <input
                            type="number"
                            placeholder="Altura Miniatura del Vídeo"
                            id='thumbnail_height'
                            {...register("thumbnail_height", {

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
                            thumbnail_width: YTOEobject?.thumbnail_width,
                            thumbnail_height: YTOEobject?.thumbnail_height,
                            title: YTOEobject?.title,
                            html: YTOEobject?.html,
                        });
                    }}>Establecer Datos por Defecto</button>
                    <button type="submit">Guardar Música</button>
                </form>
            }
        </>
    );
};

