import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainImg = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
            <Slider {...settings} className="mainimg">
                <div>
                    <a href="#none">
                        <img src={process.env.PUBLIC_URL + '/imgs/main1.jpg'} alt="main1" />
                    </a>
                </div>
                <div>
                    <a href="#none">
                        <img src={process.env.PUBLIC_URL + '/imgs/main2.jpg'} alt="main2" />
                    </a>
                </div>
            </Slider>
    );
}

export default MainImg;
