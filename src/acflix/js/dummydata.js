import { setAcMemDB, setAcFavDB, ACFLIX_MEMBER_DB_IN_LOCALSTORAGE, ACFLIX_FAVORITE_DB_IN_LOCALSTORAGE } from "./db";

export const initializeLocalStorage = () => {
    const dummyMemberData = {
        "gildong@naver.com": {
            'uId': 'gildong@naver.com',
            'uPw': 'bqwctSj6f8gEqm0vuzZEelfy',
            'uNick': '홍길동',
            'uGender': 'M',
            'uAge': '20',
            'uPhone': '010-1232-8438',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "wewe@naver.com": {
            'uId': 'wewe@naver.com',
            'uPw': 'bApCtvhBfipaqFQsuuUienNJ',
            'uNick': '위위',
            'uGender': 'F',
            'uAge': '20',
            'uPhone': '010-1882-8008',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "haha@naver.com": {
            'uId': 'haha@naver.com',
            'uPw': 'biZrtweefmkLqQBtufZGegsW',
            'uNick': '하하',
            'uGender': 'M',
            'uAge': '20',
            'uPhone': '010-3464-8766',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "hoho@naver.com": {
            'uId': 'hoho@naver.com',
            'uPw': 'bqwctSj6f8gEqm0vuzZEelfy',
            'uNick': '호호',
            'uGender': 'F',
            'uAge': '20',
            'uPhone': '010-9482-8768',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "gogo@naver.com": {
            'uId': 'gogo@naver.com',
            'uPw': 'bApCtvhBfipaqFQsuuUienNJ',
            'uNick': '고고',
            'uGender': 'M',
            'uAge': '20',
            'uPhone': '010-1436-9064',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "hihi@naver.com": {
            'uId': 'hihi@naver.com',
            'uPw': 'biZrtweefmkLqQBtufZGegsW',
            'uNick': '히히',
            'uGender': 'F',
            'uAge': '30',
            'uPhone': '010-9148-2725',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "huhu@naver.com": {
            'uId': 'huhu@naver.com',
            'uPw': 'bqwctSj6f8gEqm0vuzZEelfy',
            'uNick': '후후',
            'uGender': 'M',
            'uAge': '30',
            'uPhone': '010-8926-0234',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "hehe@naver.com": {
            'uId': 'hehe@naver.com',
            'uPw': 'bApCtvhBfipaqFQsuuUienNJ',
            'uNick': '해해',
            'uGender': 'F',
            'uAge': '30',
            'uPhone': '010-3232-7158',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "hyhy@naver.com": {
            'uId': 'hyhy@naver.com',
            'uPw': 'bqwctSj6f8gEqm0vuzZEelfy',
            'uNick': '혀혀',
            'uGender': 'M',
            'uAge': '30',
            'uPhone': '010-8542-9854',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "anka@naver.com": {
            'uId': 'anka@naver.com',
            'uPw': 'biZrtweefmkLqQBtufZGegsW',
            'uNick': '안카',
            'uGender': 'F',
            'uAge': '30',
            'uPhone': '010-1434-1268',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "huja@naver.com": {
            'uId': 'huja@naver.com',
            'uPw': 'bqwctSj6f8gEqm0vuzZEelfy',
            'uNick': '후자',
            'uGender': 'M',
            'uAge': '40',
            'uPhone': '010-5482-8643',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "paod@naver.com": {
            'uId': 'paod@naver.com',
            'uPw': 'bApCtvhBfipaqFQsuuUienNJ',
            'uNick': '파오드',
            'uGender': 'F',
            'uAge': '40',
            'uPhone': '010-5482-8118',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "uga@naver.com": {
            'uId': 'uga@naver.com',
            'uPw': 'biZrtweefmkLqQBtufZGegsW',
            'uNick': '우가',
            'uGender': 'M',
            'uAge': '40',
            'uPhone': '010-2382-8774',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "mama@naver.com": {
            'uId': 'mama@naver.com',
            'uPw': 'bqwctSj6f8gEqm0vuzZEelfy',
            'uNick': '마마',
            'uGender': 'F',
            'uAge': '40',
            'uPhone': '010-3582-8768',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "tata@naver.com": {
            'uId': 'tata@naver.com',
            'uPw': 'bApCtvhBfipaqFQsuuUienNJ',
            'uNick': '타타',
            'uGender': 'M',
            'uAge': '40',
            'uPhone': '010-9482-7288',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "huja@naver.com": {
            'uId': 'huja@naver.com',
            'uPw': 'biZrtweefmkLqQBtufZGegsW',
            'uNick': '후자',
            'uGender': 'F',
            'uAge': '50',
            'uPhone': '010-8484-4318',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "papta@naver.com": {
            'uId': 'papta@naver.com',
            'uPw': 'bqwctSj6f8gEqm0vuzZEelfy',
            'uNick': '팝프타',
            'uGender': 'M',
            'uAge': '50',
            'uPhone': '010-9231-0232',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "yiud@naver.com": {
            'uId': 'yiud@naver.com',
            'uPw': 'bApCtvhBfipaqFQsuuUienNJ',
            'uNick': '유이드',
            'uGender': 'F',
            'uAge': '50',
            'uPhone': '010-1637-8475',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "vdnsjik@naver.com": {
            'uId': 'vdnsjik@naver.com',
            'uPw': 'biZrtweefmkLqQBtufZGegsW',
            'uNick': '아몰랑',
            'uGender': 'M',
            'uAge': '50',
            'uPhone': '010-3542-7534',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        },
        "vdsiubo@naver.com": {
            'uId': 'vdsiubo@naver.com',
            'uPw': 'bqwctSj6f8gEqm0vuzZEelfy',
            'uNick': '아무개',
            'uGender': 'F',
            'uAge': '50',
            'uPhone': '010-1252-5334',
            'uPicture': process.env.PUBLIC_URL + '/imgs/none.png',
        }
        // 추가적인 더미 데이터는 필요에 따라 추가할 수 있음
    };

    const dummyFavoriteData = {
        "gildong@naver.com": [762441, 718821, 1191610, 560016, 693134],
        "wewe@naver.com": [729165, 974262, 786892, 639720, 704673],
        "haha@naver.com": [823464, 519182, 280180, 1022789, 573435],
        "hoho@naver.com": [729165, 786892, 704673, 718821, 560016],
        "gogo@naver.com": [823464, 280180, 573435, 974262, 639720],
        "hihi@naver.com": [762441, 1191610, 693134, 519182, 1022789],
        "huhu@naver.com": [786892, 639720, 704673, 762441, 718821],
        "hehe@naver.com": [693134, 823464, 519182, 280180, 1022789],
        "hyhy@naver.com": [762441, 718821, 1191610, 560016, 693134],
        "anka@naver.com": [573435, 762441, 729165, 1191610, 639720],
        "huja@naver.com": [823464, 786892, 704673, 573435, 639720],
        "paod@naver.com": [502356, 786892, 1191610, 639720, 704673],
        "uga@naver.com": [729165, 280180, 1191610, 639720, 762441],
        "mama@naver.com": [786892, 729165, 280180, 762441, 718821],
        "tata@naver.com": [729165, 762441, 718821, 560016, 693134],
        "huja@naver.com": [502356, 786892, 280180, 762441, 718821],
        "papta@naver.com": [704673, 560016, 693134, 823464, 519182],
        "yiud@naver.com": [786892, 1191610, 823464, 519182, 280180],
        "vdnsjik@naver.com": [704673, 560016, 823464, 280180, 573435],
        "vdsiubo@naver.com": [502356, 729165, 693134, 823464, 639720],
    };

    // 로컬 스토리지가 비어 있는지 체크하여 초기화
    if (!localStorage.getItem(ACFLIX_MEMBER_DB_IN_LOCALSTORAGE)) {
        setAcMemDB(dummyMemberData);
    }

    if (!localStorage.getItem(ACFLIX_FAVORITE_DB_IN_LOCALSTORAGE)) {
        setAcFavDB(dummyFavoriteData);
    }
};