import React from "react";


const MainHeader = () => {
  return(
    <div class="header">
            <a href="/"><img src={process.env.PUBLIC_URL + '/imgs/logo.png'} alt="" /></a>
            <ul>
            <li><a href="/userprofile">내프로필</a></li>
            <li><a href="/">로그아웃</a></li>
            </ul>
        </div>
  );
}

export default MainHeader;