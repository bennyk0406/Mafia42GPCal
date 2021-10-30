import { getAuth, getRedirectResult, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const googleLogin = function () {
    const auth = getAuth();
    getRedirectResult(auth).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(credential, token, user);
    }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
    });
}

export { googleLogin };