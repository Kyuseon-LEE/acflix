import React, { useEffect, useState } from "react";
import api from '../js/api.js';
import { getMyFavDB, setMyFavDB } from '../js/db.js';
import { getLoginedSessionID } from '../js/session.js';

const ContentsModal = ({ movieInfo, closeModal }) => {

    // Hook
    const [play, setPlay] = useState(null);

    useEffect(() => {

        fetchPlay(movieInfo.id);

    }, [movieInfo.id]);


    // GET Movie Streaming API 
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
    const playBtnClickHandler = () => {
        if (play !== null) {

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

        } else {

            alert('예고편이 존재하지 않습니다.');

        }
    }

    const favBtnClickHandler = () => {
        // Get current user's favorites from localStorage
        let myFavs = getMyFavDB(getLoginedSessionID());
    
        // Ensure myFavs is an array (handle case when null or undefined)
        if (!Array.isArray(myFavs)) {
            myFavs = [];
        }
    
        // Check if the movieInfo.id is already in myFavs
        if (!myFavs.includes(movieInfo.id)) {
            // Add movieInfo.id to myFavs
            myFavs.push(movieInfo.id);
            setMyFavDB(getLoginedSessionID(), myFavs);
            alert(`${movieInfo.title}을 찜하셨습니다!!`);
        } else {
            alert(`${movieInfo.title}가 이미 찜 목록에 있습니다!!`);
        }
    };

    
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
                <button onClick={playBtnClickHandler}>▶</button>
                <p>상세정보: {movieInfo.overview}</p>
                <p>평점: {movieInfo.vote_average}</p>
                <p>관객수: {`${Math.floor(movieInfo.popularity)}만 명`}</p>
            </div>
            <button onClick={favBtnClickHandler}>♡</button>
        </div>
    );
}

export default ContentsModal;