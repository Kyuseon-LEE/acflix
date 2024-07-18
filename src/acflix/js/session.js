// 아이디 확인
export const SESSION_STORAGE_KEY = 'loginedSessionID';

export const getLoginedSessionID = () => {
    console.log('[Session] getLoginedSessionID()');

    return sessionStorage.getItem(SESSION_STORAGE_KEY);

}

export const setLoginedSessionID = (id = '') => {
    console.log('[Session] setLoginedSessionID()');

    sessionStorage.setItem(SESSION_STORAGE_KEY, id);

}

export const clearLoginedSessionID = () => {
    console.log('[Session] clearLoginedSessionID()');

    sessionStorage.removeItem(SESSION_STORAGE_KEY);

}
// 아이디 확인 종료