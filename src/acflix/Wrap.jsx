import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Header from "./Header";
import MainHeader from "./MainHeader"; // MainHeader 추가
import Footer from "./Footer";
import Home from "./Home";
import Login from "./user/Login";
import SignIn from "./user/SignIn";
import UserProfile from "./user/UserProfile";
import ContentsList from "./contents/ContentsList";
import NG from "./NG";
import './css/index.css'

const PrivateRoute = ({ element, isSignIned }) => {
  const navigate = useNavigate();

  if (!isSignIned) {
    navigate('/');
    return null;
  }

  return element;
};

const Wrap = () => {
  const [isSignIned, setIsSignIned] = useState(false);

  return (
    <BrowserRouter>
      <div id="wrap">
        {isSignIned ? <MainHeader /> : <Header />} {/* 로그인 상태에 따라 다른 헤더 보이기 */}
        <Routes>
          <Route path="/" element={isSignIned ? <ContentsList /> : <Home />} />
          <Route path="/signin" element={<SignIn setIsSignIned={setIsSignIned} />} />
          <Route path="/login" element={<Login setIsSignIned={setIsSignIned} />} />
          <Route path="/userprofile" element={<PrivateRoute element={<UserProfile />} isSignIned={isSignIned} />} />
          <Route path="/contentslist" element={<PrivateRoute element={<ContentsList />} isSignIned={isSignIned} />} />
          <Route path="/*" element={<NG />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Wrap;
