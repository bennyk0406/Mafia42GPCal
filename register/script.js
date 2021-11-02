import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDLRwSfrRvfXP9ZSip82Nf1RDCVP7VW16c",
    authDomain: "jaricom-5b794.firebaseapp.com",
    projectId: "jaricom-5b794",
    storageBucket: "jaricom-5b794.appspot.com",
    messagingSenderId: "578428983641",
    appId: "1:578428983641:web:4c9b525843c72886de5448",
    measurementId: "G-1LFGZP1XZT"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

window.readRegisterData = async function (email) {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `register/${email}`));
    if (snapshot.exists()) {
        return snapshot.val();
    }
    else {
        return null;
    }
}

window.writeRegisterData = async function () {
    const email = location.href.split("=")[1];
    const db = getDatabase();
    const userData = await readRegisterData(email);
    if (userData !== null) {
        alert('이미 회원가입 신청이 되어있습니다.');
        return;
    }
    const nickname = document.getElementById('nickname').value;
    if (nickname === '') {
        alert('인게임 닉네임을 입력해주세요!');
    }
    set(ref(db, `register/${email}`), {
        nickname
    });
}

window.onload = async function () {
    document.documentElement.setAttribute('color-theme', 'dark');
    const email = location.href.split("=")[1];
    document.getElementById('email').innerText = email;
}