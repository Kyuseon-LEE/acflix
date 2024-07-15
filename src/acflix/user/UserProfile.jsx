import React, { useEffect, useState } from "react";
import api from "../js/api.js";
import Slider2 from "react-slick";

import { getLoginedSessionID, setLoginedSessionID } from '../js/session.js';
import { getMyFavDB, getMyInfo, setMyInfo, getAllFavDB, setAcMemDB, setAcFavDB, getAllMemInfo, getAllFavInfo } from '../js/db.js';
import { useNavigate } from "react-router-dom";

import 'slick-carousel/slick/slick.css';



import '../css/index.css';
import UserProfileModal from "./UserProfileModal.jsx";


const UserProfile = ({setIsSignIned}) => {

  // Hook
  const [uId, setUId] = useState('');
  const [uPw, setUPw] = useState('');
  const [uNick, setUNick] = useState('');
  const [uGender, setUGender] = useState(0);
  const [uAge, setUAge] = useState(0);
  const [uPhone, setUPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [myFav, setMyFav] = useState([]);
  const [allFav, setAllFav] = useState([]);
  const [uPicture, setUPicture] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwRegex = /^.{6,}$/;
    const nickRegex = /^[가-힣a-zA-Z0-9]{2,6}$/;
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;

    if (!emailRegex.test(uId)) {
        newErrors.uId = "올바른 이메일 주소를 입력하세요.";
    }
    if (!pwRegex.test(uPw)) {
        newErrors.uPw = "비밀번호는 6자 이상이어야 합니다.";
    }
    if (!nickRegex.test(uNick)) {
        newErrors.uNick = "닉네임은 2자 이상 6자 이하의 한글, 영어 또는 숫자여야 합니다.";
    }
    if (!phoneRegex.test(uPhone)) {
        newErrors.uPhone = "전화번호는 '000-0000-0000' 형식이어야 합니다.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    }

  useEffect(() => {
    console.log('[UserProfile] useEffect()');

    let myInfo = getMyInfo(getLoginedSessionID());
    

    if(myInfo === undefined){
      alert('로그인이 필요합니다.');

      navigate('/login');
      return;
      
    }

    setUId(myInfo.uId);
    setUPw(myInfo.uPw);
    setUNick(myInfo.uNick);
    setUGender(myInfo.uGender);
    setUAge(myInfo.uAge);
    setUPhone(myInfo.uPhone);
    setUPicture(myInfo.uPicture);
    

    // 유저 찜 목록 Function START
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
    
  // ACFLIX 인기순위 Function START
  const fetchAllFav = async () => {
    try {
      const allFavMovies = await getAllFavDB();
  
      // DB에 Obj 체크
      if (typeof allFavMovies !== 'object' || allFavMovies === null) {
        console.error('Expected getAllFavDB() to return an object, but received:', allFavMovies);
        return [];
      }
  
      // Obj에서 영화 ID 값 가져오기 
      const movieIds = Object.values(allFavMovies).flatMap(movieIds => movieIds);
  
      // 영화 ID값 세기
      const movieCounts = {};
      movieIds.forEach(movieId => {
        if (movieCounts[movieId]) {
          movieCounts[movieId]++;
        } else {
          movieCounts[movieId] = 1;
        }
      });
  
      //배열 값으로 영화 ID 수 변환
      const sortedMovies = Object.keys(movieCounts).map(id => ({
        id,
        count: movieCounts[id]
      }));
  
      // 인기순위 오름차순 정렬
      sortedMovies.sort((a, b) => b.count - a.count);
  
      // 인기순위 영화 정보 가져오기
      const popularMovies = await Promise.all(
        sortedMovies.slice(0, 10).map(async (movie) => {
          try {
            const response = await api.get(`/movie/${movie.id}`);
            return response.data;
          } catch (error) {
            console.error("Failed to fetch movie details for id:", movie.id);
            return null;
          }
        })
      );
  
      // null 값 체크
      setAllFav(popularMovies.filter((movie) => movie !== null));
  
    } catch (error) {
      console.error('Failed to fetch all favorites:', error);

    }
  };

  fetchAllFav();

  }, [refresh]);

  // Handler

  const uPwChangeHandler = (e) => {
    console.log('[UserProfile] uPwChangeHandler()');
    setUPw(e.target.value);
  }

  const uNickChangeHandler = (e) => {
    console.log('[UserProfile] uNickChangeHandler()');
    setUNick(e.target.value);
  }

  const uPhoneChangeHandler = (e) => {
    console.log('[UserProfile] uPhoneChangeHandler()');
    setUPhone(e.target.value);
  }

  const profilePicChangeHandler = (e) => {
    console.log('[UserProfile] profilePicChangeHandler()');
    const file = e.target.files[0];
    setUPicture(URL.createObjectURL(file));
  }
  
  const modifyBtnClickHandler = () => {
    console.log('[UserProfile] modifyBtnClickHandler()');

    let myInfo = getMyInfo(getLoginedSessionID());
    
    if (!validateInputs()) {
      return;
    }

    myInfo.uPw = uPw;
    myInfo.uNick = uNick;
    myInfo.uPhone = uPhone;
    myInfo.uPicture = uPicture;

    setMyInfo(getLoginedSessionID(), myInfo);

    alert("회원정보가 수정되었습니다.");

    setLoginedSessionID();
    setIsSignIned(false);

    navigate('/login');
  }

  const deleteBtnClickHandler = () => {
    console.log('[UserProfile] deleteBtnClickHandler()');

    if (window.confirm('정말 탈퇴하시겠어요?')) {
      // 맴버 삭제
      let allMemInfo = getAllMemInfo();
      delete allMemInfo[getLoginedSessionID()];
      setAcMemDB(allMemInfo);

      // 찜 삭제 getAllFavInfo
      let allFavInfo = getAllFavInfo();
      delete allFavInfo[uId];
      setAcFavDB(allFavInfo);

      alert('회원탈퇴가 완료되었습니다.');

      setLoginedSessionID();
      setIsSignIned(false);
      navigate('/')
    } else {
      alert('회원탈퇴가 취소되었습니다.');
    }
  }

  // 찜목록 Slide
  const sliderSettings = {
    infinite: false,
    speed: 400,
    slidesToShow: 8.5,
    slidesToScroll: 3,
    arrows: false,
  };
  //순위 슬라이드
  const sliderSettings2 = {
   infinite: false,
   speed: 400,
   slidesToShow: 4.5,
   slidesToScroll: 3,
   arrows: false
  };

  const movieInfoClickHandler = (movie) => {
  setSelectedMovie(movie);
  }



  // Function
  const closeModal = () => {
    setSelectedMovie(null);
  
    setRefresh(v => !v);
  }


  return (
    <>
    <div className="user_wrap">
    <div className="user-profile1">
      {uPicture && <img src={uPicture} alt="Profile" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />}
      <h3>{uNick}님의 페이지</h3>
        <input className="txt_basic1" type="file" accept="image/*" onChange={profilePicChangeHandler} />
        <br />
        <input className="txt_basic1" type="email" value={uId} readOnly/>
        <br />
        <input className="txt_basic1" type="password" value={uPw} onChange={uPwChangeHandler} placeholder="비밀번호" />
        {errors.uPw && <p style={{ color: 'red', textAlign: 'center' }}>{errors.uPw}</p>}
        <br />
        <input className="txt_basic1" type="text" value={uNick} onChange={uNickChangeHandler} placeholder="닉네임" />
        {errors.uNick && <p style={{ color: 'red', textAlign: 'center' }}>{errors.uNick}</p>}
        <br />
        <input className="txt_basic1" name="gender" id="gen" value={uGender} readOnly>  
        </input>
        <br />
        <input className="txt_basic1" name="u_age" id="age" value={uAge} readOnly>
        </input>
        <br />
        <input className="txt_basic1" type="text" value={uPhone} onChange={uPhoneChangeHandler} placeholder="휴대전화번호" />
        {errors.uPhone && <p style={{ color: 'red', textAlign: 'center' }}>{errors.uPhone}</p>}
        <br />
        <button className="btn_basic" onClick={modifyBtnClickHandler}>정보 수정</button>
        <button className="btn_basic" onClick={deleteBtnClickHandler}>회원 탈퇴</button>
    </div>
    <div className="user-profile2">
      <h2 className="user-profile-h2">내가 찜한 영화 목록</h2>
      {myFav.length >= 9 ? (
          <Slider2 {...sliderSettings}>
            {myFav.map((movie) => (
              <li key={movie.id} onClick={() => movieInfoClickHandler(movie)}>
                <img src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <a href="#none" className="title">{movie.title}</a>
              </li>
            ))}
          </Slider2>
        ) : (
          <ul className="user-profile-list">
            {myFav.map((movie) => (
              <li key={movie.id} onClick={() => movieInfoClickHandler(movie)}>
                <img src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <a href="#none" className="title">{movie.title}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    <div className="user-profile3">
      <h2 className= "user-profile-h2">ACFILX 인기순위</h2>
      <ul className="user-profile-list">
      <Slider2 {...sliderSettings2}>
        {allFav.map((movie, index) => (
          <li key={movie.id} onClick={() => movieInfoClickHandler(movie)}>
            <h3 className="rank">{index + 1}</h3>
            <img src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <h3>{movie.title}</h3>
          </li>
        ))}
        </Slider2>  
      </ul>
    </div>
    {selectedMovie && (
        <UserProfileModal movieInfo={selectedMovie} closeModal={closeModal} />
    )}
    </div>
    </> 

  );
}

export default UserProfile;