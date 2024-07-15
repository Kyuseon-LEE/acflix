import React, { useEffect, useState } from "react";
// 캐러셀
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// API
import api from '../js/api.js';
import requests from '../js/requests.js';

// Modal
import ContentsModal from "./ContentsModal.jsx";

// Main 이미지
import MainImg from "./MainImg.jsx";

// CSS
import '../css/modal.css'


const ContentsList = () => {

    // Hook
    const [movieList, setMovieList] = useState([]);
    const [actionList, setActionList] = useState([]);
    const [comedyList, setComedyList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    
    useEffect(() => {
        
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
        slidesToScroll: 5,
        arrows : true,
        nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
        draggable:false,
        padding : '70px',
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
