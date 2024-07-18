import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const MainImg = () => {
    // Hook

    const [modalOpen, setModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

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

    // Handler

    const playMainImg = (url) => {
        setVideoUrl(url);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setVideoUrl("");
    };

    // ↓↓↓ 이런식으로 메인 이미지에 맞는 영화 URL 삽입해서 모달창으로 재생하게끔 할수있음 ↓↓↓
    // The 8 쇼
    // <img className="logo1" src={process.env.PUBLIC_URL + '/imgs/main1_logo.png'} alt="main1" onClick={() => playMainImg("https://www.youtube.com/embed/CWfWMxDqbN0?si=rgHmbQqoUNPY0RzS")} />
    // 서울의 봄
    // <img className="logo2" src={process.env.PUBLIC_URL + '/imgs/main2_logo.png'} alt="main2" onClick={() => playMainImg("https://www.youtube.com/embed/-AZ7cnwn2YI?si=_V31nZuLpAPN_WLh")}/>

    return (
        <>
            <Slider {...settings} className="mainimg">
                <div className="main1">
                    <a href="#none">
                        <img className="img1" src={process.env.PUBLIC_URL + '/imgs/main1.jpg'} alt="main1" />
                        <img className="logo1" src={process.env.PUBLIC_URL + '/imgs/main1_logo.png'} alt="main1" />
                        <p className="comment">빚더미에 올라앉은 남자가 구원의 동아줄을 불잡는다. 엄청난 상금의<br /> 유혹에 넘어가 쇼에 참여하는 남자.
                            오래지 않아 그는 짐작했던것보다<br /> 가혹한 대가를 치를지 모른다는 사실을 깨닫는다.
                        </p>
                        <p className="play" onClick={() => playMainImg("https://www.youtube.com/embed/CWfWMxDqbN0?si=rgHmbQqoUNPY0RzS")}>▶ 재생</p>
                    </a>
                </div>
                <div className="main2">
                    <a href="#none">
                        <img className="img2" src={process.env.PUBLIC_URL + '/imgs/main2.jpg'} alt="main2"/>
                        <img className="logo2" src={process.env.PUBLIC_URL + '/imgs/main2_logo.png'} alt="main2" />
                        <p className="comment">드라마 장르의 역사 영화, 대통령 암살 사건 후 쿠데타를 일으킨<br /> 보안사령관과 그를 막으려는
                            수도경비사령관의 대치 상황을 그린다
                        </p>
                        <p className="play" onClick={() => playMainImg("https://www.youtube.com/embed/-AZ7cnwn2YI?si=_V31nZuLpAPN_WLh")}>▶ 재생</p>
                    </a>
                </div>
                <div className="main3">
                    <a href="#none">
                        <img className="img3" src={process.env.PUBLIC_URL + '/imgs/main3.jpg'} alt="main3" />
                        <img className="logo3" src={process.env.PUBLIC_URL + '/imgs/main3_logo.png'} alt="main3" />
                        <p className="comment">퇴마사 흉내를 내며 소셜 미디어에서 활동하는 무당의 손자.<br /> 그런데 기이한 사건을 통해
                            자기 가족을 해친 악귀와 마주치게 되면서<br /> 진심으로 사건 해결에 나선다.
                        </p>
                        <p className="play" onClick={() => playMainImg("https://www.youtube.com/embed/jUWCJwTuGAI?si=P2ewcuie7xyyfIXV")}>▶ 재생</p>
                    </a>
                </div>
                <div className="main4">
                    <a href="#none">
                        <img className="img4" src={process.env.PUBLIC_URL + '/imgs/main4.jpg'} alt="main4" />
                        <img className="logo4" src={process.env.PUBLIC_URL + '/imgs/main4_logo.png'} alt="main4" />
                        <p className="comment">배우 김고은이 백상예술대상에서 여우주연상을 받은 작품. 저주받은<br /> 무덤의 위험천만한
                        이장을 수행하는 용한 무당으로 열연했다.
                        </p>
                        <p className="play" onClick={() => playMainImg("https://www.youtube.com/embed/rjW9E1BR_30?si=Yj21e92lsg932QhC")}>▶ 재생</p>
                    </a>
                </div>
            </Slider>

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                    <p className="m_close" onClick={handleCloseModal}>&times;</p>
                        <iframe
                            width="900"
                            height="600"
                            src={videoUrl}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            title="video"
                        ></iframe>                        
                    </div>
                </div>
            )}
        </>
    );
}

export default MainImg;
