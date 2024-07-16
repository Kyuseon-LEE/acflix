import React, { useEffect, useState } from "react";
import api from '../js/api.js';
import requests from '../js/requests.js';
import { getMyFavDB, setMyFavDB } from '../js/db.js';
import { getLoginedSessionID } from '../js/session.js';

const ContentsModal = ({ movieInfo, closeModal }) => {

    // Hook
    const [play, setPlay] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [myFavs, setMyFavs] = useState([]);

    useEffect(() => {

        fetchPlay(movieInfo.id);
        fetchData(requests.fetchTopRated, setMovieList);


        setMyFavs(getMyFavDB(getLoginedSessionID()));

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
            iframe.width = '900';
            iframe.height = '600';
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

        let updatedFavs = [...myFavs]; // 현재 찜하기 업데이트
        const movieId = movieInfo.id;

        // 찜 목록 중복체크
        if (!updatedFavs.includes(movieId)) {

            updatedFavs.push(movieId);
            setMyFavDB(getLoginedSessionID(), updatedFavs);
            setMyFavs(updatedFavs); 
            alert(`${movieInfo.title}을 찜하셨습니다!!`);

        } else {

            alert(`${movieInfo.title}가 이미 찜 목록에 있습니다!!`);

            // 찜 목록 삭제 알림
            if (window.confirm(`${movieInfo.title}을 찜 목록에서 삭제하시겠습니까?`)) {

                updatedFavs = updatedFavs.filter((e) => e !== movieId);
                setMyFavDB(getLoginedSessionID(), updatedFavs);
                setMyFavs(updatedFavs); 
                alert(`${movieInfo.title}을 찜 목록에서 삭제하셨습니다!!`);

            } else {
                alert('찜 목록 삭제를 취소하셨습니다.');
            }
        }
    };

    const movieInfoClickHandler = (movie) => {
        setSelectedMovie(movie);
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
        {selectedMovie ? (
                    <>
                        <img src={`http://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                        <h2>{selectedMovie.title}</h2>
                        <p className="m_info">상세정보: {selectedMovie.overview}</p><br />
                        <p className="m_score">평점: {`${Math.round(selectedMovie.vote_average * 100) / 100}점`}</p><br />
                        <p className="m_audi">관객수: {`${Math.floor(selectedMovie.popularity)}만 명`}</p>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                    </>
                ) : (
                    <>
                        <img src={`http://image.tmdb.org/t/p/w200${movieInfo.poster_path}`} alt={movieInfo.title} />
                        <h2>{movieInfo.title}</h2>
                        <p className="m_info">상세정보: {movieInfo.overview}</p><br />
                        <p className="m_score">평점: {`${Math.round(movieInfo.vote_average * 100) / 100}점`}</p><br />
                        <p className="m_audi">관객수: {`${Math.floor(movieInfo.popularity)}만 명`}</p>
                        <img src={process.env.PUBLIC_URL + '/imgs/ytb.png'} className="ytb" onClick={playBtnClickHandler} />
                        <div className='favbtn' onClick={favBtnClickHandler}>
                            {Array.isArray(myFavs) && myFavs.includes(movieInfo.id) ? (
                                <img src="/imgs/heart1.png" alt="favMv" />
                            ) : (
                                <img src="/imgs/heart2.png" alt="noFavMv" />
                            )}
                        </div>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                    </>
                )}
            <div className="modal-list">
                <h2>추천 컨텐츠</h2>
                {movieList.slice(0,5).map((movie, idx) => (
                    <label key={idx} onClick={() => movieInfoClickHandler(movie)}>
                        <div className="modal-item">
                            <img src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <br />
                            <a href="#none" className="modal-title">{movie.title}</a>
                        </div>
                    </label>
                ))}
                {movieList.slice(6,11).map((movie, idx) => (
                    <label key={idx} onClick={() => movieInfoClickHandler(movie)}>
                        <div className="modal-item">
                            <img src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <br />
                            <a href="#none" className="modal-title">{movie.title}</a>
                        </div>
                    </label>
                ))}    
            </div>
        </div>
    </div>
    );
}

export default ContentsModal;
