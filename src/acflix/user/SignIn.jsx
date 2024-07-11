import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAcMemDB, setAcMemDB, getAcFavDB, setAcFavDB } from "../js/db";

const SignIn = () => {

  // Hook
  const [uId, setUId] = useState('');
  const [uPw, setUPw] = useState('');
  const [uMail, setUMail] = useState('');
  const [uPhone, setUPhone] = useState('');
  const navigate = useNavigate();

  // Handler
  const uIdChangeHandler = (e) => {
      console.log('[SignIn] uIdChangeHandler()');
      setUId(e.target.value);
  }

  const uPwChangeHandler = (e) => {
      console.log('[SignIn] uPwChangeHandler()');
      setUPw(e.target.value);
  }

  const uMailChangeHandler = (e) => {
      console.log('[SignIn] uMailChangeHandler()');
      setUMail(e.target.value);
  }

  const uPhoneChangeHandler = (e) => {
      console.log('[SignIn] uPhoneChangeHandler()');
      setUPhone(e.target.value);
  }
  
  const signUpBtnClickHandler = () => {
      console.log('[SignIn] signUpBtnClickHandler()');

      // 회원가입 데이터 입력
      let acMemDB = getAcMemDB();
      if (acMemDB === null) {
          let newMemObj = {
              [uId] : {
                  'uId': uId,
                  'uPw': uPw,
                  'uMail': uMail,
                  'uPhone': uPhone,    
              }
          }
        
          setAcMemDB(newMemObj);
        
      } else {
      
          let aldAcMem = JSON.parse(acMemDB);
          aldAcMem[uId] = {
              'uId': uId,
              'uPw': uPw,
              'uMail': uMail,
              'uPhone': uPhone,         
          }
        
          setAcMemDB(aldAcMem);
        
      }

      // 찜 목록 생성
      let acFavDB = getAcFavDB();
      if (acFavDB === null) {
          let newFavs = {
              [uId]: {}
          }
        
          setAcFavDB(newFavs);
        
      } else {
      
          let aldAcFavDB = JSON.parse(acFavDB)
          aldAcFavDB[uId] = {}
      
          setAcFavDB(aldAcFavDB);
      
      }

      alert('회원가입이 완료되었습니다.');
      
      navigate('/');

  }

  return(
    <div className="log_in">
        <h3>회원 가입</h3>
        <input className="txt_basic" type="text" onChange={uIdChangeHandler} placeholder="아이디"/>
        <br />
        <input className="txt_basic" type="password" onChange={uPwChangeHandler} placeholder="비밀번호"/>
        <br />
        <input className="txt_basic" type="email" onChange={uMailChangeHandler} placeholder="이메일 주소"/>
        <br />
        <input className="txt_basic" type="text" onChange={uPhoneChangeHandler} placeholder="휴대전화번호"/>
        <br />
        <button className="btn_basic" onClick={signUpBtnClickHandler}>회원 가입</button>
    </div>
  );
}

export default SignIn;