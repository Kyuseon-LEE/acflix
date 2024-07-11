import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAcMemDB, setAcMemDB, getAcFavDB, setAcFavDB } from "../js/db";

const SignIn = () => {  

    // Hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uNick, setUNick] = useState('');
    const [uGender, setUGender] = useState(0);
    const [uAge, setUAge] = useState(0);
    const [uPhone, setUPhone] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // 유효성 검사 로직
    const validateInputs = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const pwRegex = /^.{6,}$/;
        const nickRegex = /^[가-힣a-zA-Z0-9]{2,6}$/;
        const phoneRegex = /^\d{3} \d{4} \d{4}$/;

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
            newErrors.uPhone = "전화번호는 '000 0000 0000' 형식이어야 합니다.";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Handlers
    const uIdChangeHandler = (e) => {
        setUId(e.target.value);
    }

    const uPwChangeHandler = (e) => {
        setUPw(e.target.value);
    }

    const uNickChangeHandler = (e) => {
        setUNick(e.target.value);
    }

    const uGenderChangeHandler = (e) => {
        setUGender(e.target.value);
    }

    const uAgeChangeHandler = (e) => {
        setUAge(e.target.value);
    }

    const uPhoneChangeHandler = (e) => {
        setUPhone(e.target.value);
    }

    const closeClickHandler = () => {
        navigate('/login');
    }

    const signUpBtnClickHandler = () => {
        if (!validateInputs()) {
            return;
        }

        let acMemDB = getAcMemDB();
        if (acMemDB === null) {
            let newMemObj = {
                [uId]: {
                    'uId': uId,
                    'uPw': uPw,
                    'uNick': uNick,
                    'uGender': uGender,
                    'uAge': uAge,
                    'uPhone': uPhone,    
                }
            }
            setAcMemDB(newMemObj);
        } else {
            let aldAcMem = JSON.parse(acMemDB);
            aldAcMem[uId] = {
                'uId': uId,
                'uPw': uPw,
                'uNick': uNick,
                'uGender': uGender,
                'uAge': uAge,
                'uPhone': uPhone,         
            }
            setAcMemDB(aldAcMem);
        }
  
        let acFavDB = getAcFavDB();
        if (acFavDB === null) {
            let newFavs = {
                [uId]: {}
            }
            setAcFavDB(newFavs);
        } else {
            let aldAcFavDB = JSON.parse(acFavDB);
            aldAcFavDB[uId] = {};
            setAcFavDB(aldAcFavDB);
        }
  
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
    }

    return(
        <div id="sign_up_modal">
            <div className="sign_up_modal_content">
                <div className="close" onClick={closeClickHandler}>
                    X
                </div>
                <h2>회원 가입</h2>
                <input className="txt_basic" type="email" onChange={uIdChangeHandler} placeholder="이메일 주소(아이디)" />
                {errors.uId && <p style={{ color: 'red', textAlign: 'center' }}>{errors.uId}</p>}
                <br />
                <input className="txt_basic" type="password" onChange={uPwChangeHandler} placeholder="비밀번호" />
                {errors.uPw && <p style={{ color: 'red', textAlign: 'center' }}>{errors.uPw}</p>}
                <br />
                <input className="txt_basic" type="text" onChange={uNickChangeHandler} placeholder="닉네임" />
                {errors.uNick && <p style={{ color: 'red', textAlign: 'center' }}>{errors.uNick}</p>}
                <br />
                <select name="gender" id="gen" onChange={uGenderChangeHandler}>
                    <option value="0">성별</option>
                    <option value="m">남성</option>
                    <option value="w">여성</option>
                </select>
                <select name="u_age" id="age" onChange={uAgeChangeHandler}>
                    <option value="0">나이</option>
                    <option value="10">10대</option>
                    <option value="20">20대</option>
                    <option value="30">30대</option>
                    <option value="40">40대</option>
                    <option value="50">50대</option>
                    <option value="60">60대</option>
                    <option value="70">70대</option>
                    <option value="80">80대</option>
                    <option value="90">90대</option>
                </select>
                <br />
                <input className="txt_basic" type="text" onChange={uPhoneChangeHandler} placeholder="휴대전화번호" />
                {errors.uPhone && <p style={{ color: 'red', textAlign: 'center' }}>{errors.uPhone}</p>}
                <br />
                <button className="btn_basic" onClick={signUpBtnClickHandler}>회원 가입</button>
            </div>
        </div>
    );
}

export default SignIn;
