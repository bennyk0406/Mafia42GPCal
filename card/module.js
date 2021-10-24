import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
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
    const snapshot = await get(child(dbRef, `product/`));
    if (snapshot.exists()) {
        return snapshot.val();
    }
    else {
        return null;
    }
};

const writeProductData = async function (name, date, amountList, priceList) {
    const db = getDatabase();
    const result = readProductData();
    let index;
    if (result === null) {
        index = 0;
    }
    else {
        index = result.length;
    }
    console.log(index);
    set(ref(db, 'product/' + index), {
        name,
        date,
        amount: amountList,
        price: priceList,
    });
    return true;
};

export { firebaseConfig, app, analytics, writeProductData, readProductData };