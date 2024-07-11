import React, { useEffect, useState } from "react";
import requests  from '../js/requests';

import { getLoginedSessionID } from '../js/session.js';
import { useNavigate } from "react-router-dom";


const UserProfile = () => {

  // Hook
  const [myFav, setMyFav] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('[UserProfile] useEffect()');

    // if(getLoginedSessionID() === ''){
    //   alert('로그인이 필요합니다.');

    //   navigate('/login');
    //   return;
      
    // }

  //   const fetchmyFav = async () => {
  //     const myFav = JSON.parse(localStorage.getItem("acFavDB")) || [];
  //     const movies = await Promise.all(
  //         myFav.map(async (id) => {
  //             try {
  //                 const response = await api.get(`/movie/${id}`);
  //                 return response.data;
  //             } catch (error) {
  //                 console.error("Failed to fetch movie details for id:", id);
  //                 return null;
  //             }
  //         })
  //     );

  //     // movies 배열에서 null 값을 제외하고 설정
  //     setMyFav(movies.filter((movie) => movie !== null));
  // };

  // fetchmyFav();

}, []);

  // Handler



  return(
    <div>
        <h2>내가 찜한 영화 목록</h2>
        <ul>
            {myFav.map((movie) => (
                <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                    <p>평점: {movie.vote_average}</p>
                </li>
            ))}
        </ul>
    </div>

  );
}

export default UserProfile;