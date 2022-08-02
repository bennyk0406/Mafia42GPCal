const getElement = (id) => document.getElementById(id);

const changeViewMode = function() {
    const theme = document.documentElement.getAttribute('color-theme');
    if (theme === 'dark') {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        getElement('view-mode-svg').setAttribute('src', './assets/moon.svg');
        getElement('header-img').setAttribute('src','./assets/logo-light.png');
        getElement('logo-img').setAttribute('src',`./assets/logo-light.png`);
    }
    else {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        getElement('view-mode-svg').setAttribute('src', './assets/sun.svg');
        getElement('header-img').setAttribute('src','./assets/logo-dark.png');
        getElement('logo-img').setAttribute('src',`./assets/logo-dark.png`);
    }
}

const userColorTheme = localStorage.getItem('color-theme');
const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const colorTheme = userColorTheme ? userColorTheme : osColorTheme;
localStorage.setItem('color-theme', colorTheme);
getElement('header-img').setAttribute('src',`./assets/logo-${colorTheme}.png`);
getElement('logo-img').setAttribute('src',`./assets/logo-${colorTheme}.png`);
document.documentElement.setAttribute('color-theme', colorTheme);
if (colorTheme === 'dark') {
    getElement('view-mode-svg').setAttribute('src', './assets/sun.svg');
} else {
    getElement('view-mode-svg').setAttribute('src', './assets/moon.svg');
}