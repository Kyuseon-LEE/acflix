import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyInfo } from "./js/db"
import { getLoginedSessionID } from "./js/session"

const MainHeader = ({ isSignIned, setIsSignIned }) => {

  // Hook
  const [uId, setUId] = useState('');
  const [uPicture, setUPicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[UserProfile] useEffect()');

    let myInfo = getMyInfo(getLoginedSessionID());
    setUId(myInfo.uId);
    setUPicture(myInfo.uPicture);
  });

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
            <li><img src={uPicture} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} /></li>
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
