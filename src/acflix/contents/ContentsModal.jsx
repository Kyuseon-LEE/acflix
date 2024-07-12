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
            iframe.width = '1000';
            iframe.height = '700';
            iframe.src = `https://www.youtube.com/embed/${play}`;
            iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;


            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = '';
            modalContent.appendChild(iframe);

            const closeButton = document.createElement('button');
            closeButton.textContent = 'CLOSE';
            closeButton.addEventListener('click', handleCloseModal);
            modalContent.appendChild(closeButton);

        } else {

            alert('예고편이 존재하지 않습니다.');

        }
    }

    const favBtnClickHandler = () => {

        let myFavs = getMyFavDB(getLoginedSessionID());

        if (!Array.isArray(myFavs)) {
            myFavs = [];
        }
    
        // 찜 목록 중복체크
        if (!myFavs.includes(movieInfo.id)) {

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
                <img src={process.env.PUBLIC_URL + '/imgs/ytb.png'} className="ytb" onClick={playBtnClickHandler} />
                <p>상세정보: {movieInfo.overview}</p><br />
                <p>평점: {`${Math.round(movieInfo.vote_average * 100) / 100}점`}</p><br />
                <p>관객수: {`${Math.floor(movieInfo.popularity)}만 명`}</p>
                
            <button onClick={favBtnClickHandler}>♡</button>
            </div>
        </div>
    );
}

export default ContentsModal;