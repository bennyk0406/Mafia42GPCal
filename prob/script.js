const getElement = (id) => document.getElementById(id);
 
const imageUrlList = [
    '../assets/low.png',
    '../assets/high.png'
];

const songpyeonAmount = {
    'pink': 0,
    'songgi': 0,
    'flower': 0,
    'pig': 0
};

const onCheckboxClick = function(level) {
    const checkList = [...document.getElementsByClassName(`${level}-item-checkbox`)].map(e => e.checked);
    const selectAllCheckbox = document.getElementsByClassName('select-all-checkbox')[0];
    selectAllCheckbox.checked = checkList.every(e => e);
    const itemList = itemData[level].map(value => ({...value}));
    const equipList = itemList.filter(i => i.isEquipItem);
    const otherList = itemList.filter(i => !i.isEquipItem);
    let checkedProbability = 0;
    for (let i = 0; i < checkList.length; i++) {
        if (checkList[i]) {
            checkedProbability += itemList[i].probability; 
            itemList[i].probability = 0; 
        }
    }
    for (let j = 0; j < itemList.length; j++) {
        itemList[j].probability *= 100 / (100 - checkedProbability); 
    }
    const equipItemTotalProbability = equipList.map(i => i.probability).reduce((a,b) => a+b);
    const otherItemTotalProbability = otherList.map(j => j.probability).reduce((c,d) => c+d);
    for (let l = 0; l < otherList.length; l++) {
        otherList[l].probability *= (100 - equipItemTotalProbability) / otherItemTotalProbability; 
    }
    const probabilityList = [...document.getElementsByClassName('probability')]; 
    for (let m = 0; m < probabilityList.length; m++) {
        probabilityList[m].innerText = `${Math.round(itemList[m].probability * 1000) / 1000}%`;
    }
    const totalProbability = getElement('total-probability');
    totalProbability.innerText = `장착 아이템 확률 : ${Math.round(equipItemTotalProbability * 1000)/1000}%`;
};

const onChangeButtonClick = function() {
    const img = document.getElementsByClassName('gashapon-img')[0]; 
    const table = document.getElementsByClassName('item-table')[0];
    if (img.id === "low-gashapon-img") {
        img.setAttribute('id', 'high-gashapon-img');
        img.setAttribute('src', imageUrlList[1]);
        table.setAttribute('id', 'high-item-table');
        setTable(itemData.high, 'high');
    } else {
        img.setAttribute('id', 'low-gashapon-img');
        img.setAttribute('src', imageUrlList[0]);
        table.setAttribute('id', 'low-item-table');
        setTable(itemData.low, 'low');
    }
};

const setTable = function(itemList, level) {
    const table = document.getElementsByClassName('item-table')[0];
    table.innerHTML = `<tr id='item-table-header'>
        <th id='checkbox-raw'>
            <input class='select-all-checkbox' id='select-all-checkbox-${level}' type='checkbox' onclick='onSelectAllCheckboxClick("${level}")'>
        </th>
        <th id='name-raw'>
            아이템
        </th>
        <th id='probability-raw'>
            확률
        </th>
    </tr>`;
    const equipItemList = itemList.filter(i => i.isEquipItem);
    const otherItemList = itemList.filter(i => !i.isEquipItem);
    for (const i of equipItemList) {
        const item = document.createElement('tr');
        item.innerHTML = `<td class='has-item'>
            <input type='checkbox' class='${level}-item-checkbox' onclick='onCheckboxClick("${level}")'>
        </td>
        <td class='name'>
            ${i.name}
        </td>
        <td class='probability'>
            ${i.probability}%
        </td>`;
        table.append(item);
    }
    for (const j of otherItemList) {
        const item = document.createElement('tr');
        item.innerHTML = `<td>
        </td>
        <td class='name'>
            ${j.name}
        </td>
        <td class='probability'>
            ${j.probability}%
        </td>`;
        table.append(item);
    }
    const equipItemProbability = Math.round(equipItemList.map(i => i.probability).reduce((a,b) => a + b) * 1000) / 1000; 
    const img = document.getElementsByClassName('gashapon-img')[0];
    switch (level) {
        case 'high': 
            img.setAttribute('id', 'high-gashapon-img');
            img.setAttribute('src', imageUrlList[1]);
            break;
        case 'low':
            img.setAttribute('id', 'low-gashapon-img');
            img.setAttribute('src', imageUrlList[0]);
            break;
    }
    const totalProbability = getElement('total-probability');
    totalProbability.innerText = `장착 아이템 확률 : ${equipItemProbability}%`;
};

const onAmountChange = function (name) {
    let pinkAmount = getElement('pink-amount').value === '' ? 0 : parseInt(getElement('pink-amount').value);
    let songgiAmount = getElement('songgi-amount').value === '' ? 0 : parseInt(getElement('songgi-amount').value);
    let flowerAmount = getElement('flower-amount').value === '' ? 0 : parseInt(getElement('flower-amount').value);
    let pigAmount = getElement('pig-amount').value === '' ? 0 : parseInt(getElement('pig-amount').value);
    if (pinkAmount + songgiAmount + flowerAmount + pigAmount > 4) {
        getElement(`${name}-amount`).value = songpyeonAmount[`${name}`];
        alert('넣을 수 있는 송편의 최대 개수는 4개입니다.');
        return;
    }
    songpyeonAmount[name] = getElement(`${name}-amount`).value;
    const addedProbability = 2.5 * pinkAmount + 5 * songgiAmount + 10 * flowerAmount + 20 * pigAmount;
    const level = document.getElementsByClassName('item-table')[0].id.split('-')[0];
    const checkList = [...document.getElementsByClassName(`${level}-item-checkbox`)].map(e => e.checked);
    const itemList = itemData[level].map(value => ({...value}));
    const equipList = itemList.filter(i => i.isEquipItem);
    const otherList = itemList.filter(i => !i.isEquipItem);
    let checkedProbability = 0;
    for (let i = 0; i < checkList.length; i++) {
        if (checkList[i]) {
            checkedProbability += itemList[i].probability; 
            itemList[i].probability = 0; 
        }
    }
    for (let j = 0; j < itemList.length; j++) {
        itemList[j].probability *= 100 / (100 - checkedProbability); 
    }
    for (let k = 0; k < equipList.length; k++) {
        equipList[k].probability += equipList[k].probability * addedProbability / 100;
    }
    const equipItemTotalProbability = equipList.map(i => i.probability).reduce((a,b) => a+b);
    const otherItemTotalProbability = otherList.map(j => j.probability).reduce((c,d) => c+d);
    for (let l = 0; l < otherList.length; l++) {
        otherList[l].probability *= (100 - equipItemTotalProbability) / otherItemTotalProbability; 
    }
    const probabilityList = [...document.querySelectorAll('.probability')]; 
    for (let m = 0; m < probabilityList.length; m++) {
        probabilityList[m].innerText = `${Math.round(itemList[m].probability * 1000) / 1000}%`;
    }
    const totalProbability = getElement('total-probability');
    totalProbability.innerText = `장착 아이템 확률 : ${Math.round(equipItemTotalProbability * 1000)/1000}%`;
};

const onDarkCheckboxClick = function() {
    const darkCheckbox = getElement('dark-checkbox');
    const isDark = darkCheckbox.checked;
    if (isDark) {
        document.documentElement.setAttribute('color-theme', 'dark');
        localStorage.setItem('color-theme', 'dark');
        getElement('header-img').setAttribute('src','../assets/logo-dark.png');
        getElement('setting-img').setAttribute('src','../assets/setting-dark.png');
    } else {
        document.documentElement.setAttribute('color-theme', 'light');
        localStorage.setItem('color-theme', 'light');
        getElement('header-img').setAttribute('src','../assets/logo-light.png');
        getElement('setting-img').setAttribute('src','../assets/setting-light.png');
    }
} 


const onSelectAllCheckboxClick = function(level) {
    const selectAllCheckbox = document.getElementsByClassName('select-all-checkbox')[0];
    const checkboxList = document.getElementsByClassName(`${level}-item-checkbox`);
    for (i = 0; i < checkboxList.length; i++) {
        checkboxList[i].checked = selectAllCheckbox.checked;
    }
    onCheckboxClick(level);
}

const changeViewMode = function() {
    const theme = document.documentElement.getAttribute('color-theme')
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

$(window).on("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

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
setTable(itemData.high, "high");