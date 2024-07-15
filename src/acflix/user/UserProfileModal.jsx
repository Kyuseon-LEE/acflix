import React, { useEffect, useState } from "react";
import api from '../js/api.js';
import requests from '../js/requests.js';
import { getMyFavDB, setMyFavDB } from '../js/db.js';
import { getLoginedSessionID } from '../js/session.js';

const UserProfileModal = ({ movieInfo, closeModal }) => {

    // Hook
    const [play, setPlay] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {

        fetchPlay(movieInfo.id);
        fetchData(requests.fetchTopRated, setMovieList);

    }, [movieInfo.id]);

    // 모달창 띄울 시 스크롤 방지
    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = '';
          window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
      }, []);

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

     // get api
     const fetchData = async (request, setData) => {
        try {
            const response = await api.get(request);
            setData(response.data.results);
        } catch (error) {
            console.log('Error fetching data:', error);
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


            // 찜 목록 삭제 알림
            if(window.confirm(`${movieInfo.title}을 찜 목록에서 삭제하시겠습니까?`)){

                myFavs = myFavs.filter((e) => e !== movieInfo.id);
                setMyFavDB(getLoginedSessionID(), myFavs);
                alert(`${movieInfo.title}을 찜 목록에서 삭제하셨습니다!!`);


            } else {
                alert('찜 목록 삭제를 취소하셨습니다.');
            }
        }
    };

    const movieInfoClickHandler = (item) => {
        setSelectedMovie(item);
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
                
                <img src={`http://image.tmdb.org/t/p/w200${movieInfo.poster_path}`} alt={movieInfo.title} />
                <h2>{movieInfo.title}</h2>
                
                <p className="m_info">상세정보: {movieInfo.overview}</p><br />
                <p className="m_score">평점: {`${Math.round(movieInfo.vote_average * 100) / 100}점`}</p><br />
                <p className="m_audi">관객수: {`${Math.floor(movieInfo.popularity)}만 명`}</p>
                <img src={process.env.PUBLIC_URL + '/imgs/ytb.png'} className="ytb" onClick={playBtnClickHandler} />
                <button className='favbtn' onClick={favBtnClickHandler}></button>
                <span className="close" onClick={closeModal}>&times;</span>
                <div className="modal-list">
                <h2>추천 컨텐츠</h2>
                {movieList.slice(0,5).map((item, idx) => (
                    <label key={idx} onClick={() => movieInfoClickHandler(item)}>
                        <div className="modal-item">
                            <img src={`http://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title} />
                            <br />
                            <a href="#none" className="modal-title">{item.title}</a>
                        </div>
                    </label>
                ))}
                {movieList.slice(6,11).map((item, idx) => (
                    <label key={idx} onClick={() => movieInfoClickHandler(item)}>
                        <div className="modal-item">
                            <img src={`http://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title} />
                            <br />
                            <a href="#none" className="modal-title">{item.title}</a>
                        </div>
                    </label>
                ))}
                
            </div>
            </div>
        </div>
    );
}

export default UserProfileModal;