import { readAllRegisterData } from "../login.js";

window.onload = async function () {
    const registerData = await readAllRegisterData();
    console.log(registerData);
}