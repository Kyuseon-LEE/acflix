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

    localStorage.setItem(ACFLIX_MEMBER_DB_IN_LOCALSTORAGE, JSON.stringify(member));
    
}
// 멤버 종료

// 정보 가져오기
export const getMyInfo = (uId) => {
    console.log('[DB] getMyInfo()');

    if (getAcMemDB() === null) {
        return undefined;
    }

    let mems = JSON.parse(getAcMemDB());
    let myInfo = mems[uId];

    return myInfo;

}

export const setMyInfo = (uId, myInfo) => {
    console.log('[DB] setMyInfo()');

    let mems = JSON.parse(getAcMemDB());
    mems[uId] = myInfo;

    setAcMemDB(mems);

}

export const getAllMemInfo = () => {
    console.log('[DB] getAllMemInfo()');

    return JSON.parse(getAcMemDB());
}

export const getAllFavInfo = () => {
    console.log('[DB] getAllMemInfo()');

    return JSON.parse(getAcFavDB());
}

// 찜
export const getAcFavDB = () => {
    console.log('[DB] getAcFavDB()');

    return localStorage.getItem(ACFLIX_FAVORITE_DB_IN_LOCALSTORAGE);

}

export const setAcFavDB = (favs) => {
    console.log('[DB] setAcFavDB()');

    localStorage.setItem(ACFLIX_FAVORITE_DB_IN_LOCALSTORAGE, JSON.stringify(favs));
    
}

// MY 찜
export const getMyFavDB = (uId) => {
    console.log('[DB] getMyFavDB()');

    let favs = JSON.parse(getAcFavDB());
    let myFavs = favs[uId];

    return myFavs;

}

export const setMyFavDB = (uId, myFavs) => {
    console.log('[DB] setMyFavDB()');

    let favs = JSON.parse(getAcFavDB()) || {};
    favs[uId] = myFavs;

    setAcFavDB(favs);
};

// All 찜
export const getAllFavDB = () => {
    console.log('[DB] getAllFavDB()');

    return JSON.parse(getAcFavDB()) || [];
}