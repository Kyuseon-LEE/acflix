import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import api from '../js/api.js';
import requests from '../js/requests.js';

import ContentsModal from "./ContentsModal.jsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MainImg from "./MainImg.jsx";

import { getLoginedSessionID } from "../js/session.js";

import '../css/modal.css'



const ContentsList = () => {

    // Hook
    const [movieList, setMovieList] = useState([]);
    const [actionList, setActionList] = useState([]);
    const [comedyList, setComedyList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const navigate = useNavigate();
    

    useEffect(() => {
        // // 도메인 유효성 검사 
        // console.log('[ContentsList] useEffect()');
        // if (getLoginedSessionID() === ''){
        //     alert('로그인 하시겠습니까?');

        //     navigate('/signin');
        //     return;

        // }
        
            fetchData(requests.fetchNowPlaying, setMovieList);
        
            fetchData(requests.fetchActionMovies, setActionList);

            fetchData(requests.fetchComedyMovies, setComedyList);

    }, []);


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
    const movieInfoClickHandler = (item) => {
        setSelectedMovie(item);
    }

    // Function
    const closeModal = () => {
        setSelectedMovie(null);
    }

    // Slide
    const sliderSettings = {
        infinite: true,
        speed: 1,
        slidesToShow: 7.5,
        slidesToScroll: 7.5,
    };

    return (
        <>
        <MainImg/>
        <div className="content-list">            
            <h2 className="info">TOP 20</h2>
            <Slider {...sliderSettings}>                
                    {movieList.map((item, idx) => (
                        <div key={idx} className="movie-item">
                            <img src={`http://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                            <br />
                            <a href="#none" className="title" onClick={() => movieInfoClickHandler(item)}>{item.title}</a>
                        </div>
                    ))}
                    </Slider>
                <h2 className="info">액션</h2>
                <Slider {...sliderSettings}> 
                    {actionList.map((item, idx) => (
                        <div key={idx} className="movie-item">
                            <img src={`http://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                            <br />
                            <a href="#none" className="title" onClick={() => movieInfoClickHandler(item)}>{item.title}</a>
                        </div>
                    ))}
                    </Slider>
                <h2 className="info">코미디</h2>
                <Slider {...sliderSettings}>
                    {comedyList.map((item, idx) => (
                        <div key={idx} className="movie-item">
                            <img src={`http://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                            <br />
                            <a href="#none" className="title" onClick={() => movieInfoClickHandler(item)}>{item.title}</a>
                        </div>
                    ))}
                   </Slider>
            {selectedMovie && (
                <ContentsModal movieInfo={selectedMovie} closeModal={closeModal} />
            )}
        </div>  
        </>
    );
}

export default ContentsList;
