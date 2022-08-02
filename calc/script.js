const getElement = (id) => document.getElementById(id);

const changeViewMode = function() {
    const theme = document.documentElement.getAttribute('color-theme')
    if (theme === 'light') {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        document.getElementsByClassName('view-mode-svg')[0].outerHTML = '<svg class="view-mode-svg" id="view-mode-svg-dark" onclick="changeViewMode(\'dark\')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;}</style></defs><g id="레이어_7" data-name="레이어 7"><path class="cls-1" d="M153.28,72A72,72,0,1,0,216.8,181.32s-45.54,1.13-66.2-34.67S153.28,72,153.28,72Z"/></g></svg>';
        getElement('header-img').setAttribute('src','../assets/logo-light.png');
        getElement('menu-img').setAttribute('src','../assets/menu-light.png');
    }
    else {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        document.getElementsByClassName('view-mode-svg')[0].outerHTML = '<svg class="view-mode-svg" id="view-mode-svg-light" onclick="changeViewMode(\'light\')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;}</style></defs><g id="레이어_6" data-name="레이어 6"><circle class="cls-1" cx="150" cy="150" r="54"/><line class="cls-1" x1="150" y1="56.5" x2="150" y2="74.91"/><line class="cls-1" x1="150" y1="225.5" x2="150" y2="243.91"/><line class="cls-1" x1="56.29" y1="150.21" x2="74.71" y2="150.21"/><line class="cls-1" x1="225.29" y1="150.21" x2="243.71" y2="150.21"/><line class="cls-1" x1="83.74" y1="83.95" x2="96.76" y2="96.97"/><line class="cls-1" x1="203.24" y1="203.45" x2="216.26" y2="216.47"/><line class="cls-1" x1="216.26" y1="83.95" x2="203.24" y2="96.97"/><line class="cls-1" x1="96.76" y1="203.45" x2="83.74" y2="216.47"/></g></svg>';
        getElement('header-img').setAttribute('src','../assets/logo-dark.png');
        getElement('menu-img').setAttribute('src','../assets/menu-dark.png');
    }
}

$("#tier-3, #tier-4, #tier-5").on("keyup input paste", () => {
    const tierThreeAmount = getElement("tier-3").valueAsNumber || 0;
    const tierFourAmount = getElement("tier-4").valueAsNumber || 0;
    const tierFiveAmount = getElement("tier-5").valueAsNumber || 0;
    const rawRequiredAmount = 120 - tierThreeAmount - 4 * tierFourAmount - 20 * tierFiveAmount;
    const requiredAmount = rawRequiredAmount > 0 ? rawRequiredAmount : 0;
    const rawRequiredRuble = 100000 * ((tierThreeAmount + requiredAmount) / 4) + 500000 * (6 - tierFiveAmount) + 1000000;
    const requiredRuble = rawRequiredRuble > 0 ? rawRequiredRuble : 0;
    getElement("card-required-amount").innerText = `추가로 필요한 3티어 카드 개수 : ${requiredAmount}`;
    getElement("card-required-ruble").innerText = `6티어 강화까지 필요한 루블 : ${requiredRuble.toLocaleString()}`;
});

$(".select").on("change", () => {
    const ruble = getElement("ruble");
    const luna = getElement("luna");
    if (getElement("sell").checked) {
        ruble.value = 0;
        ruble.disabled = false;
        luna.value = null;
        luna.disabled = true;
        getElement("gettable-money").innerText = `얻을 수 있는 루나 : 0`;
    }
    else {
        ruble.value = null;
        ruble.disabled = true;
        luna.value = 0;
        luna.disabled = false;
        getElement("gettable-money").innerText = `얻을 수 있는 루블 : 0`;
    }
});

$("#ruble, #luna, #rate").on("keyup input paste", () => {
    const rubleAmount = getElement("ruble").valueAsNumber || 0;
    const lunaAmount = getElement("luna").valueAsNumber || 0;
    const rate = getElement("rate").valueAsNumber || 0;
    if (getElement("sell").checked) {
        const gettableLuna = Math.floor(rubleAmount * rate / 1000000);
        getElement("gettable-money").innerText = `얻을 수 있는 루나 : ${gettableLuna.toLocaleString()}`;
    }
    else {
        const gettableRuble = Math.floor(lunaAmount / rate * 1000000 / 1.35 / 1000) * 1000;
        getElement("gettable-money").innerText = `얻을 수 있는 루블 : ${gettableRuble.toLocaleString()}`;
    }
});

$("#current-mailbox, #goal-mailbox").on("keyup input paste", () => {
    const current = getElement("current-mailbox").valueAsNumber || 0;
    const goal = getElement("goal-mailbox").valueAsNumber || 0;
    const rawRequiredRuble = 50 * (goal - current) * (current + goal - 74);
    const requiredRuble = rawRequiredRuble > 0 ? rawRequiredRuble : 0;
    getElement("mailbox-required-ruble").innerText = `필요한 루블 : ${requiredRuble.toLocaleString()}`;
});

$("#current-mailbox, #goal-mailbox").on("focusout", () => {
    const currentMailbox = getElement("current-mailbox");
    const current = currentMailbox.valueAsNumber || 0;
    const goalMailbox = getElement("goal-mailbox");
    const goal = goalMailbox.valueAsNumber || 0;
    if (current < 42) currentMailbox.value = 42;
    if (current % 10 !== 2) currentMailbox.value = Math.ceil((current - 2) / 10) * 10 + 2;
    if (goal < current) goalMailbox.value = currentMailbox.value;
    if (goal < 42) goalMailbox.value = 42;
    if (goal % 10 !== 2) goalMailbox.value = Math.ceil((goal - 2) / 10) * 10 + 2;
    $("#current-mailbox").trigger("input");
})

$("#fame").on("keyup input paste", () => {
    const currentFame = getElement("fame").valueAsNumber || 0;
    const postcardFame = 20 + Math.floor(currentFame * 0.015);
    getElement("postcard-fame").innerText = `권위의 엽서 명성 : -${postcardFame.toLocaleString()}`; 
});

const userColorTheme = localStorage.getItem('color-theme');
const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const colorTheme = userColorTheme ? userColorTheme : osColorTheme;
localStorage.setItem('color-theme', colorTheme);
getElement('header-img').setAttribute('src',`../assets/logo-${colorTheme}.png`);
document.documentElement.setAttribute('color-theme', colorTheme);
if (colorTheme === 'dark') {
    getElement('svg-container').innerHTML = '<img src="../assets/moon.svg" class="view-mode-svg" onclick="changeViewMode()"></svg>';
} else {
    getElement('svg-container').innerHTML = '<img src="../assets/sun.svg" class="view-mode-svg" onclick="changeViewMode()"></svg>';
}