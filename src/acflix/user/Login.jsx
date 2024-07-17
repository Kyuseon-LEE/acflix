import React, { useState } from "react";
import { getMyInfo } from "../js/db"
import { setLoginedSessionID } from "../js/session"
import { useNavigate } from "react-router-dom";

// 비밀번호 암호화 정의
const txtToNum = {
  'b': '1', 't': '2', 'f': '3', 'q': '4', 'u': '5',
  'e': '6', 'c': '7', 'j': '8', 'z': '9', 'n': '0'
};

const numToTxt = {
  '1': 'b', '2': 't', '3': 'f', '4': 'q', '5': 'u',
  '6': 'e', '7': 'c', '8': 'j', '9': 'z', '0': 'n'
};

const generateRandomData = (length) => {
  const txts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += txts.charAt(Math.floor(Math.random() * txts.length));
  }
  return result;
}

const decrypt = (encryptedValue) => {
  let decrypted = '';
  for (let i = 0; i < encryptedValue.length; i += 4) {
      const num = encryptedValue.charAt(i);
      if (txtToNum[num]) {
          decrypted += txtToNum[num]
      } else {
          decrypted += num;
      }
  }
  return decrypted;
}

const Login = ({setIsSignIned}) => {

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
    if (myInfo !== undefined) {
      const decryptedPw = decrypt(myInfo.uPw);
      if (decryptedPw === uPw) {
        alert('로그인되었습니다.');
        setLoginedSessionID(uId);
        setIsSignIned(true);
        navigate('/contentslist');

      } else {
          alert('아이디 또는 비밀번호가 맞지 않습니다.');
          setLoginedSessionID('');
          setUId('');
          setUPw('');
      }
    } else {
        alert('아이디 또는 비밀번호가 맞지 않습니다.');
        setLoginedSessionID('');
        setUId('');
        setUPw('');
    }
    // 로그인 데이터 확인 끝
  }

  // 엔터키 적용
  const enterKeyHandler = (e) => {
    if (e.key === 'Enter') {
      loginBtnClickHandler();
    }
  }

  const signInBtnClickHandler = () => {
    console.log('signInBtnClickHandler()');
    
    navigate('/signin');
  }


  return (
    <>
      <div className="log_in">
        <h2>로그인</h2>
        <input className="txt_basic" type="text" value={uId} onChange={uIdChangeHandler} placeholder="이메일을 입력하세요" />
        <br />
        <input className="txt_basic" type="password" value={uPw} onChange={uPwChangeHandler} onKeyDown={enterKeyHandler} placeholder="비밀번호를 입력하세요" />
        <br />
        <button className="btn_basic" onClick={loginBtnClickHandler}>로그인</button>
        <button className="btn_basic" onClick={signInBtnClickHandler}>회원가입</button>
      </div>
    </>
  );
}

export default Login;
