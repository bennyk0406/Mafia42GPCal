import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

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

const readProductData = async function () {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, 'product/'));
    if (snapshot.exists()) {
        return snapshot.val();
    }
    else {
        return null;
    }
};

const writeProductData = async function (name, comment, date, amountList, priceList) {
    const db = getDatabase();
    const result = await readProductData();
    let index;
    if (result === null) {
        index = 0;
    }
    else {
        index = result.length;
    }
    set(ref(db, 'product/' + index), {
        name,
        comment,
        date,
        amount: amountList,
        price: priceList,
    });
    return true;
};

const readUserData = async function () {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, 'user/'));
    if (snapshot.exists()) {
        return snapshot.val();
    }
    else {
        return null;
    }
}

const writeUserdata = async function (email, name) {
    const db = getDatabase();
    const result = await readUserData();
    set(ref(db, 'user/' + email), {
        name
    });
    return true;
}

const googleLogin = function () {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const email = user.email;
        console.log(email);
    }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
    });
}

export { firebaseConfig, app, analytics, writeProductData, readProductData, googleLogin };