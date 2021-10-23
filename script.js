window.onload = function () {
    /*
    //set user color theme
    const userColorTheme = localStorage.getItem('color-theme');
    const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const colorTheme = userColorTheme ? userColorTheme : osColorTheme;
    if (colorTheme === 'dark') {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        document.getElementById('dark-checkbox').setAttribute('checked', true);
        document.getElementById('header-img').setAttribute('src','./images/logo-dark.png');
        document.getElementById('setting-img').setAttribute('src','./images/setting-dark.png');
    } else {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        document.getElementById('header-img').setAttribute('src','./images/logo-light.png');
        document.getElementById('setting-img').setAttribute('src','./images/setting-light.png');
    }
    */
    document.documentElement.setAttribute('color-theme', 'dark');
}