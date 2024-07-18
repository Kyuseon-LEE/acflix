import { setAcMemDB, setAcFavDB, ACFLIX_MEMBER_DB_IN_LOCALSTORAGE, ACFLIX_FAVORITE_DB_IN_LOCALSTORAGE } from "./db";

export const initializeLocalStorage = () => {
    const dummyMemberData = {
        "gildong@naver.com": {
            'uId': 'gildong@naver.com',
            'uPw': 'bqwctSj6f8gEqm0vuzZEelfy',
            'uNick': '홍길동',
            'uGender': 'M',
            'uAge': '20',
            'uPhone': '010-9482-8768',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        }
        // 추가적인 더미 데이터는 필요에 따라 추가할 수 있음
    };

    const dummyFavoriteData = {
        "gildong@naver.com": ['519182', '280180', '1022789', '573435']     // 초기 찜 목록 데이터
    };

    // 로컬 스토리지가 비어 있는지 체크하여 초기화
    if (!localStorage.getItem(ACFLIX_MEMBER_DB_IN_LOCALSTORAGE)) {
        setAcMemDB(dummyMemberData);
    }

    if (!localStorage.getItem(ACFLIX_FAVORITE_DB_IN_LOCALSTORAGE)) {
        setAcFavDB(dummyFavoriteData);
    }
};