import React, { useEffect, useState } from "react";
import api from '../js/api.js';


const ContentsModal = ({ movieInfo, closeModal }) => {

    // Hook
    const [play, setPlay] = useState(null);

    useEffect(() => {
        fetchPlay(movieInfo.id);
    }, [movieInfo.id]);

    const fetchPlay = async (movieId) => {
        try {
            const response = await api.get(`/movie/${movieId}/videos`);
            const videos = response.data.results;
            
            if (videos.length > 0) {
                setPlay(videos[0].key);
            }
        } catch (error) {
            console.log('Error fetching video data:', error);
        }
    };


    // Handler
    const handlePlayClick = () => {
        if (play) {
            
            const iframe = document.createElement('iframe');
            iframe.width = '560';
            iframe.height = '315';
            iframe.src = `https://www.youtube.com/embed/${play}`;
            iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;


            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = '';
            modalContent.appendChild(iframe);

            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.addEventListener('click', handleCloseModal);
            modalContent.appendChild(closeButton);
        }
    }

    // Function
    const handleCloseModal = () => {

        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = '';

        closeModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <img src={`http://image.tmdb.org/t/p/w200${movieInfo.poster_path}`} alt={movieInfo.title} />
                <h2>{movieInfo.title}</h2>
                <button onClick={handlePlayClick}>▶</button>
                <p>상세정보: {movieInfo.overview}</p>
                <p>평점: {movieInfo.vote_average}</p>
                <p>관객수: {`${Math.floor(movieInfo.popularity)}만 명`}</p>
            </div>
            <button>♡</button>
        </div>
    );
}

export default ContentsModal;