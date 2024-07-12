import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  const startClickHandler = () => {
    navigate('/login');
  }

  return(
    <div>
      <button onClick={startClickHandler} style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold', }}>시작하기</button>
    </div>
  );
}

export default Home;