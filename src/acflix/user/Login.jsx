import React, { useState } from "react";
import { getMyInfo } from "../js/db"
import { setLoginedSessionID } from "../js/session"
import { useNavigate } from "react-router-dom";


const Login = () => {

  // Hook
  const [uId, setUId] = useState('');
  const [uPw, setUPw] = useState('');
  const navigate = useNavigate();

  // Handler
  const uIdChangeHandler = (e) => {
    console.log('uIdChangeHandler()');
    setUId(e.target.value)

  }

  const uPwChangeHandler = (e) => {
    console.log('uPwChangeHandler()');
    setUPw(e.target.value)

  }

  const loginBtnClickHandler = () => {
    console.log('loginBtnClickHandler()');

    // 로그인 데이터 확인
    let myInfo = getMyInfo(uId);
    if (myInfo !== undefined && myInfo.uPw === uPw) {
        alert('SIGNIN SUCCESS!!');

        setLoginedSessionID(uId);
        navigate('/');

    } else {
        alert('SIGNIN FAIL!!');

        setLoginedSessionID('');        
        setUId('');
        setUPw('');
    }
    // 로그인 데이터 확인 끝

  }

  const signInBtnClickHandler = () => {
    console.log('signInBtnClickHandler()');

    navigate('/signin');

  }

  return(
    <>
    
        <div className="log_in">
            <h2>로그인</h2>
            <input className="txt_basic" type="text" onChange={uIdChangeHandler} placeholder="아이디를 입력하시오"/>
            <br />
            <input className="txt_basic" type="password" onChange={uPwChangeHandler} placeholder="비밀번호를 입력하시오"/>
            <br />
            <button className="btn_basic" onClick={loginBtnClickHandler}>로그인</button>
            <button className="btn_basic" onClick={signInBtnClickHandler}>회원가입</button>
        
        </div>
        
        </>
  );
}

export default Login;