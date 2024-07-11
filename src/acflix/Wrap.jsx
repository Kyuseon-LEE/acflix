import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./user/Login";
import SignIn from "./user/SignIn";
import UserProfile from "./user/UserProfile";
import ContentsList from "./contents/ContentsList";
import NG from "./NG";
import './css/index.css'


const Wrap = () => {
  return(
    <BrowserRouter>
      
        <div id="wrap">
        <Header/>
            <Routes>
              <Route path="/" element={<Home/>}></Route>                          {/* 홈 */}
              <Route path="/signin" element={<SignIn/>}></Route>                  {/* 회원가입 */}
              <Route path="/login" element={<Login/>}></Route>                    {/* 로그인 */}
              <Route path="/userprofile" element={<UserProfile/>}></Route>        {/* 유저프로필 */}
              <Route path="/contentslist" element={<ContentsList/>}></Route>      {/* 영화리스트 */}
              <Route path="/*" element={<NG/>}></Route>                           {/* 404 페이지 */}
            </Routes>
            <Footer/>
        </div>
      
    </BrowserRouter>
  );
}

export default Wrap;