import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./user/Login";
import SignIn from "./user/SignIn";
import UserProfile from "./user/UserProfile";
import ContentsList from "./contents/ContentsList";
import NG from "./NG";
import './css/index.css'
import MainHeader from "./MainHeader";

const Wrap = () => {

  // hook
  const [isLogined, setIsLogined] = useState(false);

  const location = useLocation();

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
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
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

export default App;
