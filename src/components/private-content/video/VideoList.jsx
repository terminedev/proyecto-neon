import VideoCard from 'components/private-content/video/VideoCard'

export default function VideoList({ videos }) {

    if (!videos || videos.length <= 0) return <p>No hay videos qué mostrar.</p>;

    return (
        <ul>
            {videos.map((video) => (
                <li key={video.original_url}>
                    <VideoCard
                        videoData={video}
                    />
                </li>
            ))}
        </ul>
    );
}

