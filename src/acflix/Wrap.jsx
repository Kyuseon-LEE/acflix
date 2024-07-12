import React, { useState } from "react";
import { Route, Routes, Navigate, Outlet, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Login from "./user/Login";
import SignIn from "./user/SignIn";
import UserProfile from "./user/UserProfile";
import ContentsList from "./contents/ContentsList";
import Layout from "./LayOut";
import NG from "./NG";
import './css/index.css'

const PrivateRoute = ({ isSignIned }) => {
    console.log("PrivateRoute----------", isSignIned);
    return isSignIned ? <Outlet /> : <Navigate to="/" />;
};

const Wrap = () => {
    const [isSignIned, setIsSignIned] = useState(false);

    return (
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout isSignIned={isSignIned} setIsSignIned={setIsSignIned} />}>
                    <Route index element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/login" element={<Login setIsSignIned={setIsSignIned}/>} />
                    <Route path="/*" element={<NG />} />

                    {/* 보호된 경로 */}
                    <Route element={<PrivateRoute isSignIned={isSignIned}/>}>
                        <Route path="/userprofile" element={<UserProfile />} />
                        <Route path="/contentslist" element={<ContentsList />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Wrap;