import React, { useEffect, useState } from "react";
import api from "../js/api.js";

import { getLoginedSessionID } from '../js/session.js';
import { getMyFavDB } from '../js/db.js';
import { useNavigate } from "react-router-dom";

import '../css/index.css';


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
  

    const fetchMyFav = async () => {
          let myFavMovies = getMyFavDB(getLoginedSessionID());
          console.log('session',getLoginedSessionID());
          
          // 유저 찜 목록 배열 체크
          if (!Array.isArray(myFavMovies)) {
            myFavMovies = [];
          }

          // 찜 목록 Movie id 조회
          const movies = await Promise.all(
            myFavMovies.map(async (id) => {
              try {
                const response = await api.get(`/movie/${id}`);
                return response.data;
              } catch (error) {
                console.error("Failed to fetch movie details for id:", id);
                return null;
              }
            })
          );

          // null 값 체크
          setMyFav(movies.filter((movie) => movie !== null));

        };

        fetchMyFav();

    }, []);

  // Handler



<<<<<<< HEAD
  return(

=======
  return (
>>>>>>> 11f9c67931443131d888426d777e50a49e91021d
    <div>
      <h2 className="user-profile-h2">내가 찜한 영화 목록</h2>
      <ul className="user-profile-list">
        {myFav.map((movie) => (
          <li key={movie.id}>
            <img src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
            <h3>{movie.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;