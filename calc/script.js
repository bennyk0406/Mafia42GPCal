const getElement = (id) => document.getElementById(id);

const changeViewMode = function() {
    const theme = document.documentElement.getAttribute('color-theme');
    if (theme === 'dark') {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        getElement('view-mode-svg').setAttribute('src', '../assets/moon.svg');
        getElement('header-img').setAttribute('src','../assets/logo-light.png');
    }
    else {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        getElement('view-mode-svg').setAttribute('src', '../assets/sun.svg');
        getElement('header-img').setAttribute('src','../assets/logo-dark.png');
    }
}

$("#tier-3, #tier-4, #tier-5").on("keyup input paste", () => {
    const rawTierThreeAmount = getElement("tier-3").valueAsNumber || 0;
    if (rawTierThreeAmount > 120) getElement("tier-3").value = 120;
    const rawTierFourAmount = getElement("tier-4").valueAsNumber || 0;
    if (rawTierFourAmount > 30) getElement("tier-4").value = 30;
    const rawTierFiveAmount = getElement("tier-5").valueAsNumber || 0;
    if (rawTierFiveAmount > 6) getElement("tier-5").value = 6;
    const tierThreeAmount = getElement("tier-3").valueAsNumber || 0;
    const tierFourAmount = getElement("tier-4").valueAsNumber || 0;
    const tierFiveAmount = getElement("tier-5").valueAsNumber || 0;
    const rawRequiredAmount = 120 - tierThreeAmount - 4 * tierFourAmount - 20 * tierFiveAmount;
    const requiredTierThreeAmount = rawRequiredAmount > 0 ? rawRequiredAmount : 0;
    const requiredTierFourAmount = (6 - tierFiveAmount) * 5 > tierFourAmount ? (6 - tierFiveAmount) * 5 - tierFourAmount : 0;
    const rawRequiredRuble = 1000000 + 500000 * (6 - tierFiveAmount) + 100000 * requiredTierFourAmount;
    const requiredRuble = rawRequiredRuble > 0 ? rawRequiredRuble : 0;
    getElement("card-required-amount").innerText = `추가로 필요한 3티어 카드 개수 : ${requiredTierThreeAmount}`;
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

$(window).on("resize", () => {
    getElement("root").style.height = window.innerHeight;
})

const userColorTheme = localStorage.getItem('color-theme');
const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const colorTheme = userColorTheme ? userColorTheme : osColorTheme;
localStorage.setItem('color-theme', colorTheme);
getElement('header-img').setAttribute('src',`../assets/logo-${colorTheme}.png`);
document.documentElement.setAttribute('color-theme', colorTheme);
if (colorTheme === 'dark') {
    getElement('view-mode-svg').setAttribute('src', '../assets/sun.svg');
} else {
    getElement('view-mode-svg').setAttribute('src', '../assets/moon.svg');
}