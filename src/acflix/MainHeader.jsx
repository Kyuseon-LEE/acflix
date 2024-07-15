import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MainHeader = ({ isSignIned, setIsSignIned }) => {

  // Hook
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  // Handler
  const logoutClickHandler = () => {
    setIsSignIned(false);
    navigate('/');
  };

  const searchHandler = (e) => {
    console.log('[MainHeader] searchHandler()');
    setSearch(e.target.value);
  }


  return (
    <div className="header">
      <Link to="/contentslist"><img src={process.env.PUBLIC_URL + '/imgs/logo.png'} alt="" /></Link>
      <ul>
        {isSignIned ? (
          <>
            <li><input className="search" placeholder="찾으시는 영화가 있으신가요?" onChange={searchHandler} value={search}/></li>
            <li><Link to="/searchview" state={{ search: search }} >검색</Link></li>
            <li><Link to="/userprofile">내 프로필</Link></li>
            <li><button onClick={logoutClickHandler}><span>로그아웃</span></button></li>
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
