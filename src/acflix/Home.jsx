import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  const startClickHandler = () => {
    navigate('/login');
  }

  return(
    <>
    <div style={{textAlign: 'center', color: '#fff', marginTop: '200px' }}>
      <h2>회원님, 반갑습니다.</h2>
      <br />
      <h1>영화, 시리즈 등을 무제한으로</h1>
      <br />
      <h2>어디서나 자유롭게 시청하세요. 해지는 언제든 가능합니다.</h2>
      <button className="btn_basic" type="text" onClick={startClickHandler}>가입하고 시작하기 &nbsp; &nbsp;{'>'}</button>
    </div>
    <div style={{color: '#fff', margin: '0, auto',
                 backgroundColor: '#000000', height: '350px',
                 display: 'flex'}}>
      <div style={{textAlign: 'center', padding: '100px'}}>
        <h1>TV로 즐기세요</h1>
        <br />
        <h2>스마트 TV, PlayStation, Xbox, Chromecast, Apple<br /> TV, 블루레이 플레이어 등 다양한 디바이스에서 시청하세요.</h2>
      </div>
      <div style={{textAlign: 'center', paddingLeft: '300px'}}>
        <img src={process.env.PUBLIC_URL + '/imgs/tv.png'} style={{height: '300px'}} />
        <video autoplay="0" playsinline="" muted="" loop="">
        <source src={process.env.PUBLIC_URL + '/imgs/video.mp4'} type="video/mp4" /></video>
        
      </div>
    </div>
    </>
  );
}

export default Home;