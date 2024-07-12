import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import api from '../js/api.js';
import requests from '../js/requests.js';

import ContentsModal from "./ContentsModal.jsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MainImg from "./MainImg.jsx";


import '../css/modal.css'

const ContentsList = () => {

    // Hook
    const [movieList, setMovieList] = useState([]);
    const [actionList, setActionList] = useState([]);
    const [comedyList, setComedyList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {
        // 로그인 상태 확인
       
        
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

    // Slide button
    const NextArrow = ({ onClick }) => { 
        return (
            <img src={process.env.PUBLIC_URL + '/imgs/right.png'} className="right" onClick={onClick} type='button' />
        );
    };
    
    const PrevArrow = ({ onClick }) => {
        return (
            <img src={process.env.PUBLIC_URL + '/imgs/left.png'} className="left" onClick={onClick} type='button' />
               
        );
    };

    // Slide
    const sliderSettings = {
        infinite: true,
        speed: 800,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows : true,
        nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
        draggable:false,
        initialSlide: 0
    };
    

    return (
        <>
        <MainImg />
        <div className="content-list">            
            <h2 className="info">TOP 20</h2>
            <Slider {...sliderSettings}>                
                {movieList.map((item, idx) => (
                    <label key={idx} onClick={() => movieInfoClickHandler(item)}>
                        <div className="movie-item">
                            <img src={`http://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                            <br />
                            <a href="#none" className="title">{item.title}</a>
                        </div>
                    </label>
                ))}
            </Slider>
            <h2 className="info">액션</h2>
            <Slider {...sliderSettings}> 
                {actionList.map((item, idx) => (
                    <label key={idx} onClick={() => movieInfoClickHandler(item)}>
                        <div className="movie-item">
                            <img src={`http://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                            <br />
                            <a href="#none" className="title">{item.title}</a>
                        </div>
                    </label>
                ))}
            </Slider>
            <h2 className="info">코미디</h2>
            <Slider {...sliderSettings}>
                {comedyList.map((item, idx) => (
                    <label key={idx} onClick={() => movieInfoClickHandler(item)}>
                        <div className="movie-item">
                            <img src={`http://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                            <br />
                            <a href="#none" className="title">{item.title}</a>
                        </div>
                    </label>
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
