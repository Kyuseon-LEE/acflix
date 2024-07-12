import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MainHeader = ({ isSignIned, setIsSignIned }) => {
  const navigate = useNavigate();

  // Handler
  const logoutClickHandler = () => {
    setIsSignIned(false);
    navigate('/');
  };

  return (
    <div className="header">
      <Link to="/contentslist"><img src={process.env.PUBLIC_URL + '/imgs/logo.png'} alt="" /></Link>
      <ul>
        {isSignIned ? (
          <>
            <li><Link to="/userprofile">내 프로필</Link></li>
            <li><button onClick={logoutClickHandler}>로그아웃</button></li>
          </>
        ) : (
          <>
            <Link to ="/login"></Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default MainHeader;
