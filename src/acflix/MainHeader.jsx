import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MainHeader = ({ isSignIned, setIsSignIned }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsSignIned(false); // 로그아웃 상태로 설정
    navigate('/'); // 홈 페이지로 이동
  };

  return (
    <div className="header">
      <Link to="/contentlist"><img src={process.env.PUBLIC_URL + '/imgs/logo.png'} alt="" /></Link>
      <ul>
        {isSignIned ? (
          <>
            <li><Link to="/userprofile">내 프로필</Link></li>
            <li><button onClick={handleLogout}>로그아웃</button></li>
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
