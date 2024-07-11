// 데이터 베이스
// VARIABLE
export const ACFLIX_MEMBER_DB_IN_LOCALSTORAGE = 'acMemDB'
export const ACFLIX_FAVORITE_DB_IN_LOCALSTORAGE = 'acFavDB'

// 멤버
export const getAcMemDB = () => {
    console.log('getAcMemDB()');

    return localStorage.getItem(ACFLIX_MEMBER_DB_IN_LOCALSTORAGE);

}

export const setAcMemDB = (member) => {
    console.log('setAcMemDB()');

    return localStorage.setItem(ACFLIX_MEMBER_DB_IN_LOCALSTORAGE, JSON.stringify(member));
    
}
// 멤버 종료

// 정보 가져오기
export const getMyInfo = (uId) => {
    console.log('getMyInfo()');

    if (getAcMemDB() === null) {
        return undefined;
    }

    let mems = JSON.parse(getAcMemDB());
    let myInfo = mems[uId];

    return myInfo;

}

export const setMyInfo = (uId, myInfo) => {
    console.log('setMyInfo()');

    let mems = JSON.parse(getAcMemDB());
    mems[uId] = myInfo;

    setAcMemDB(mems);

}

// 찜
export const getAcFavDB = () => {
    console.log('getAcFavDB()');

    return localStorage.getItem(ACFLIX_FAVORITE_DB_IN_LOCALSTORAGE);

}

export const setAcFavDB = (favs) => {
    console.log('setAcFavDB()');

    return localStorage.setItem(ACFLIX_FAVORITE_DB_IN_LOCALSTORAGE, JSON.stringify(favs));
    
}
// 찜 종료
// 데이터 베이스 종료

/*
// 회원가입 데이터 입력
let acMemDB = getAcMemDB();
if (getAcMemDB === null) {
    let newMemObj = {
        [uId] : {
            'uId': uId,
            'uPw': uPw,
            'uMail': uMail,
            'uPhone': uPhone,
            'uRegDate': uRegDate,
            'uModDate': uModDate,
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
        'uRegDate': uRegDate,
        'uModDate': uModDate,
    }

    setAcMemDB(aldAcMem);

}

// 찜 목록 생성
let acFavDB = getAcFavDB();
if (acFavDB === null) {
    let newFavObj = {
        [uId]: {}
    }

    setAcFavDB(newFavObj);

} else {

    let aldAcFavDB = JSON.parse(aldAcFavDB)
    aldAcFavDB[uId] = {}

    setAcFavDB(aldAcFavDB);

}

alert('회원가입이 완료되었습니다.');

navigate('/');
// 찜 목록 생성 종료
// 회원가입 데이터 입력 종료

// 회원가입 유효성 검사

const [validateUId, setValidateUId] = useState();

let idCheck = /^[A-Za-z0-9]{1,6}$/;	//영문자 + 숫자만 , 2자 이상 7자 이내

if (idCheck.test(e.target.value)) {	
    setValidateUId(true);	//검증 성공
} else {
    setValidateUId(false);	//검증 실패 >> 에러메세지 출력
}

//위에서 체크한 상태값과 uId가 있는지 없는지 체크해서 에러 메세지를 출력함.
{!validateUId &&
    member.uId ? (
        <label
            style={{
                color: "red",
                lineHeight: 2.5
            }}
        >
            아이디는 2자이상
            7자이하 영문,숫자
            조합이여야됩니다.
        </label>
    ) : null}

// 회원가입 유효성 검사 종료
*/