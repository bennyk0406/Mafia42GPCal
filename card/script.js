import { writeProductData } from "./module.js";

const openFirstWindow = function () {
    const bodyWidth = document.body.offsetWidth;
    const addWindow = document.getElementById('add-window-1');
    addWindow.setAttribute('emphasized','true');
    addWindow.style.left = `${bodyWidth/2 - addWindow.offsetWidth/2}px`;
    document.getElementById('add-window-2').setAttribute('emphasized','false');
};

const openSecondWindow = function () {
    const bodyWidth = document.body.offsetWidth;
    const addWindow = document.getElementById('add-window-2');
    addWindow.setAttribute('emphasized','true');
    addWindow.style.left = `${bodyWidth/2 - addWindow.offsetWidth/2}px`;
    document.getElementById('add-window-1').setAttribute('emphasized','false');
    document.getElementById('add-window-3').setAttribute('emphasized','false');
};

const openThirdWindow = function () {
    const bodyWidth = document.body.offsetWidth;
    const addWindow = document.getElementById('add-window-3');
    addWindow.setAttribute('emphasized','true');
    addWindow.style.left = `${bodyWidth/2 - addWindow.offsetWidth/2}px`;
    document.getElementById('add-window-2').setAttribute('emphasized','false');
};

const onCloseButtonClick = function() {
    document.getElementById('add-window-1').setAttribute('emphasized','false');
    document.getElementById('add-window-2').setAttribute('emphasized','false');
    document.getElementById('add-window-3').setAttribute('emphasized','false');
}

const submit = function() {
    const author = document.getElementById('author').value;
    const amountData = [];
    const priceData = [];
    for (let team in priceList) {
        for (let job in priceList[team]) {
            const amountInputs = [...document.getElementById(`amount-${job}`).getElementsByClassName('amount')];
            const amountList = amountInputs.map(i => i.value);
            amountData.push({
                job,
                others: amountList[0],
                hot: amountList[1],
                cool: amountList[2],
                insurance: amountList[3]
            });
            const priceInputs = [...document.getElementById(`price-${job}`).getElementsByClassName('price')]
            const priceList = priceInputs.map(i => i.value);
            priceData.push({
                job,
                others: priceList[0],
                hot: priceList[1],
                cool: priceList[2],
                insurance: priceList[3]
            });
        }
    }
    writeProductData(author, amountData, priceData);
}

window.onload = function () {
    //set user color theme
    /*
    const userColorTheme = localStorage.getItem('color-theme');
    const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const colorTheme = userColorTheme ? userColorTheme : osColorTheme;
    if (colorTheme === 'dark') {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        document.getElementById('dark-checkbox').setAttribute('checked', true);
        document.getElementById('header-img').setAttribute('src','../images/logo-dark.png');
        document.getElementById('plus-img').innerHTML = '<defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:150px;}</style></defs><g id="레이어_9" data-name="레이어 9"><line class="cls-1" x1="500" y1="221" x2="500" y2="779"/><line class="cls-1" x1="221" y1="500" x2="779" y2="500"/></g>';
    } else {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        document.getElementById('header-img').setAttribute('src','../images/logo-light.png');
        document.getElementById('plus-img').innerHTML = '<defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:150px;}</style></defs><g id="레이어_9" data-name="레이어 9"><line class="cls-1" x1="500" y1="221" x2="500" y2="779"/><line class="cls-1" x1="221" y1="500" x2="779" y2="500"/></g>';
    }
    */
    document.documentElement.setAttribute('color-theme', 'light');

    const jobPrice = document.getElementById('job-price');
    for (let team in priceList) {
        for (let job in priceList[team]) {
            const price = priceList[team][job].price;
            const tr = document.createElement('tr');
            tr.setAttribute('id', `price-${job}`);
            tr.innerHTML = `<td class='${team}'>
                ${job}
            </td>
            <td>
                <input class='price' type='number' min='0' max='99' value='${price.others}'>
            </td>
            <td>
                <input class='price' type='number' min='0' max='99' value='${price.hot}'>
            </td>
            <td>
                <input class='price' type='number' min='0' max='99' value='${price.cool}'>
            </td>
            <td>
                <input class='price' type='number' min='0' max='99' value='${price.insurance}'>
            </td>`;
            jobPrice.appendChild(tr);
        }
    }

    const jobAmount = document.getElementById('job-amount');
    for (let team in priceList) {
        for (let job in priceList[team]) {
            const tr = document.createElement('tr');
            tr.setAttribute('id', `amount-${job}`);
            tr.innerHTML = `<td class='${team}'>
                ${job}
            </td>
            <td>
                <input class='amount' type='number' value='0' min='0' max='99'>
            </td>
            <td>
                <input class='amount' type='number' value='0' min='0' max='99'>
            </td>
            <td>
                <input class='amount' type='number' value='0' min='0' max='99'>
            </td>
            <td>
                <input class='amount' type='number' value='0' min='0' max='99'>
            </td>`;
            jobAmount.appendChild(tr);
        }
    }
}

export { openFirstWindow, openSecondWindow, openThirdWindow, submit, onCloseButtonClick };