import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getLoginedSessionID, setLoginedSessionID } from "./js/session.js"

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./user/Login";
import SignIn from "./user/SignIn";
import UserProfile from "./user/UserProfile";
import ContentsList from "./contents/ContentsList";
import NG from "./NG";
import MainHeader from "./MainHeader";

import './css/index.css';


const Wrap = () => {

  // Hook 로그인 인증
  // const [isSignIned, setIsSignIned] = useState(false);

  const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const onlineUser = getLoginedSessionID();
  //   if (onlineUser) {
  //     setIsSignIned(true);
  //   }
  // }, []);

  // const loginClickHandler = (userId) => {
  //   setIsSignIned(true);
  //   setLoginedSessionID(userId);
  // };

  // const logOutClickHandler = () => {
  //   setIsSignIned(false);
  //   setLoginedSessionID('');
  //   navigate("/login");
  // };

  // if (!isSignIned && location.pathname !== '/login' && location.pathname !== '/signin') {
  //   return navigate("/login");
  // }

  return (
    <div>
      {location.pathname === "/contentslist" ? (
        <div id="main_wrap">
          <MainHeader />
          <Routes>
            <Route path="/contentslist" element={<ContentsList />} />
            <Route path="/*" element={<NG />} />
          </Routes>
        </div>
      ) : (
        <div id="wrap">
          <Header /*onLogout={logOutClickHandler} isSignIned={isSignIned}*/ />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login /*onLogin={loginClickHandler}*/ />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/*" element={<NG />} />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

const App = () => (
  <BrowserRouter>
    <Wrap />
  </BrowserRouter>
);

export default Wrap;
