import React from "react";


const MainHeader = () => {
  return(
    <div className="header">
            <a href="#none"><img src={process.env.PUBLIC_URL + '/imgs/logo.png'} alt="" /></a>
            <ul>
            <li><a href="#none">내프로필</a></li>
            <li><a href="#none">로그아웃</a></li>
            </ul>
        </div>
  );
}

export default MainHeader;