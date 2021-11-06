import { readRegisterData } from "../login.js";

window.onload = async function () {
    const registerData = await readRegisterData();
    console.log(registerData);
}