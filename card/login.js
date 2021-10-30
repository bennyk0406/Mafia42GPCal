import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

const googleLogin = function () {
    const auth = getAuth();
    getRedirectResult(auth).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.timeLog(credential, token, user);
    }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
    });
}

export { googleLogin };