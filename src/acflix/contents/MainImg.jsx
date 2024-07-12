import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const MainImg = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade:true,
        pauseOnHover :false,
    };

    return (
            <Slider {...settings} className="mainimg">
                <div className="main1">
                    <a href="#none">
                         <img className="img1" src={process.env.PUBLIC_URL + '/imgs/main1.jpg'} alt="main1" />
                         <img className="logo1" src={process.env.PUBLIC_URL + '/imgs/main1_logo.png'} alt="main1" />
                    </a>
                </div>
                <div className="main2">
                    <a href="#none">
                        <img className="img2" src={process.env.PUBLIC_URL + '/imgs/main2.jpg'} alt="main2" />
                        <img className="logo2" src={process.env.PUBLIC_URL + '/imgs/main2_logo.png'} alt="" />             
                    </a>
                    
                </div>
                
            </Slider>
    );
}

export default MainImg;
