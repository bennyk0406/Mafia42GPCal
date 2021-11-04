window.onload = async function () {
    document.documentElement.setAttribute('color-theme', 'dark');
    const email = location.href.split("=")[1];
    document.getElementById('email').innerText = email;
}