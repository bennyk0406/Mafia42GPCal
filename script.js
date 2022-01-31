const changeViewMode = function(theme) {
    if (theme === 'light') {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        document.getElementsByClassName('view-mode-svg')[0].outerHTML = '<svg class="view-mode-svg" id="view-mode-svg-dark" onclick="changeViewMode(\'dark\')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;}</style></defs><g id="레이어_7" data-name="레이어 7"><path class="cls-1" d="M153.28,72A72,72,0,1,0,216.8,181.32s-45.54,1.13-66.2-34.67S153.28,72,153.28,72Z"/></g></svg>';
        document.getElementById('header-img').setAttribute('src', './images/logo-light.png');
        document.getElementById('menu-img').setAttribute('src','./images/menu-light.png');
        document.getElementById('logo-img').setAttribute('src','./images/logo-light.png');
    }
    else {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        document.getElementsByClassName('view-mode-svg')[0].outerHTML = '<svg class="view-mode-svg" id="view-mode-svg-light" onclick="changeViewMode(\'light\')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;}</style></defs><g id="레이어_6" data-name="레이어 6"><circle class="cls-1" cx="150" cy="150" r="54"/><line class="cls-1" x1="150" y1="56.5" x2="150" y2="74.91"/><line class="cls-1" x1="150" y1="225.5" x2="150" y2="243.91"/><line class="cls-1" x1="56.29" y1="150.21" x2="74.71" y2="150.21"/><line class="cls-1" x1="225.29" y1="150.21" x2="243.71" y2="150.21"/><line class="cls-1" x1="83.74" y1="83.95" x2="96.76" y2="96.97"/><line class="cls-1" x1="203.24" y1="203.45" x2="216.26" y2="216.47"/><line class="cls-1" x1="216.26" y1="83.95" x2="203.24" y2="96.97"/><line class="cls-1" x1="96.76" y1="203.45" x2="83.74" y2="216.47"/></g></svg>';
        document.getElementById('header-img').setAttribute('src','./images/logo-dark.png');
        document.getElementById('menu-img').setAttribute('src','./images/menu-dark.png');
        document.getElementById('logo-img').setAttribute('src','./images/logo-dark.png');
    }
}

window.onload = function () {
    const userColorTheme = localStorage.getItem('color-theme');
    const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const colorTheme = userColorTheme ? userColorTheme : osColorTheme;
    if (colorTheme === 'dark') {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        document.getElementsByClassName('view-mode-svg')[0].outerHTML = '<svg class="view-mode-svg" id="view-mode-svg-dark" onclick="changeViewMode(\'light\')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;}</style></defs><g id="레이어_6" data-name="레이어 6"><circle class="cls-1" cx="150" cy="150" r="54"/><line class="cls-1" x1="150" y1="56.5" x2="150" y2="74.91"/><line class="cls-1" x1="150" y1="225.5" x2="150" y2="243.91"/><line class="cls-1" x1="56.29" y1="150.21" x2="74.71" y2="150.21"/><line class="cls-1" x1="225.29" y1="150.21" x2="243.71" y2="150.21"/><line class="cls-1" x1="83.74" y1="83.95" x2="96.76" y2="96.97"/><line class="cls-1" x1="203.24" y1="203.45" x2="216.26" y2="216.47"/><line class="cls-1" x1="216.26" y1="83.95" x2="203.24" y2="96.97"/><line class="cls-1" x1="96.76" y1="203.45" x2="83.74" y2="216.47"/></g></svg>';
        document.getElementById('header-img').setAttribute('src','./images/logo-dark.png');
        document.getElementById('menu-img').setAttribute('src','./images/menu-dark.png');
        document.getElementById('logo-img').setAttribute('src','./images/logo-dark.png');
    } else {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        document.getElementsByClassName('view-mode-svg')[0].outerHTML = '<svg class="view-mode-svg" id="view-mode-svg-dark" onclick="changeViewMode(\'dark\')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;}</style></defs><g id="레이어_7" data-name="레이어 7"><path class="cls-1" d="M153.28,72A72,72,0,1,0,216.8,181.32s-45.54,1.13-66.2-34.67S153.28,72,153.28,72Z"/></g></svg>';
        document.getElementById('header-img').setAttribute('src','./images/logo-light.png');
        document.getElementById('menu-img').setAttribute('src','./images/menu-light.png');
        document.getElementById('logo-img').setAttribute('src','./images/logo-light.png');
    }
}