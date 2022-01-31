const imageUrlList = [
    '../images/low.png',
    '../images/high.png'
];

let songpyeonAmount = {
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
    const totalProbability = document.getElementById('total-probability');
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
    const totalProbability = document.getElementById('total-probability');
    totalProbability.innerText = `장착 아이템 확률 : ${equipItemProbability}%`;
};

const onAmountChange = function (name) {
    let pinkAmount = document.getElementById('pink-amount').value === '' ? 0 : parseInt(document.getElementById('pink-amount').value);
    let songgiAmount = document.getElementById('songgi-amount').value === '' ? 0 : parseInt(document.getElementById('songgi-amount').value);
    let flowerAmount = document.getElementById('flower-amount').value === '' ? 0 : parseInt(document.getElementById('flower-amount').value);
    let pigAmount = document.getElementById('pig-amount').value === '' ? 0 : parseInt(document.getElementById('pig-amount').value);
    if (pinkAmount + songgiAmount + flowerAmount + pigAmount > 4) {
        document.getElementById(`${name}-amount`).value = songpyeonAmount[`${name}`];
        alert('넣을 수 있는 송편의 최대 개수는 4개입니다.');
        return;
    }
    songpyeonAmount[name] = document.getElementById(`${name}-amount`).value;
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
    const totalProbability = document.getElementById('total-probability');
    totalProbability.innerText = `장착 아이템 확률 : ${Math.round(equipItemTotalProbability * 1000)/1000}%`;
};

const onDarkCheckboxClick = function() {
    const darkCheckbox = document.getElementById('dark-checkbox');
    const isDark = darkCheckbox.checked;
    if (isDark) {
        document.documentElement.setAttribute('color-theme', 'dark');
        localStorage.setItem('color-theme', 'dark');
        document.getElementById('header-img').setAttribute('src','../images/logo-dark.png');
        document.getElementById('setting-img').setAttribute('src','../images/setting-dark.png');
    } else {
        document.documentElement.setAttribute('color-theme', 'light');
        localStorage.setItem('color-theme', 'light');
        document.getElementById('header-img').setAttribute('src','../images/logo-light.png');
        document.getElementById('setting-img').setAttribute('src','../images/setting-light.png');
    }
} 

const onSettingButtonClick = function() {
    const bodyWidth = document.getElementsByTagName('body')[0].offsetWidth;
    const settingWindow = document.getElementById('setting-window');
    settingWindow.style.display = 'block';
    settingWindow.style.left = `${bodyWidth/2 - settingWindow.offsetWidth/2}px`;
    document.getElementById('setting-window').setAttribute('emphasized','true');

};

const onCloseButtonClick = function() {
    const settingWindow = document.getElementById('setting-window');
    settingWindow.style.display = 'none';
    document.getElementById('setting-window').setAttribute('emphasized','false');
}

const onSelectAllCheckboxClick = function(level) {
    const selectAllCheckbox = document.getElementsByClassName('select-all-checkbox')[0];
    const checkboxList = document.getElementsByClassName(`${level}-item-checkbox`);
    for (i = 0; i < checkboxList.length; i++) {
        checkboxList[i].checked = selectAllCheckbox.checked;
    }
    onCheckboxClick(level);
}

const changeViewMode = function(theme) {
    if (theme === 'light') {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        document.getElementsByClassName('view-mode-svg')[0].outerHTML = '<svg class="view-mode-svg" id="view-mode-svg-dark" onclick="changeViewMode(\'dark\')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;}</style></defs><g id="레이어_7" data-name="레이어 7"><path class="cls-1" d="M153.28,72A72,72,0,1,0,216.8,181.32s-45.54,1.13-66.2-34.67S153.28,72,153.28,72Z"/></g></svg>';
        document.getElementById('header-img').setAttribute('src','../images/logo-light.png');
        document.getElementById('menu-img').setAttribute('src','../images/menu-light.png');
    }
    else {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        document.getElementsByClassName('view-mode-svg')[0].outerHTML = '<svg class="view-mode-svg" id="view-mode-svg-light" onclick="changeViewMode(\'light\')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;}</style></defs><g id="레이어_6" data-name="레이어 6"><circle class="cls-1" cx="150" cy="150" r="54"/><line class="cls-1" x1="150" y1="56.5" x2="150" y2="74.91"/><line class="cls-1" x1="150" y1="225.5" x2="150" y2="243.91"/><line class="cls-1" x1="56.29" y1="150.21" x2="74.71" y2="150.21"/><line class="cls-1" x1="225.29" y1="150.21" x2="243.71" y2="150.21"/><line class="cls-1" x1="83.74" y1="83.95" x2="96.76" y2="96.97"/><line class="cls-1" x1="203.24" y1="203.45" x2="216.26" y2="216.47"/><line class="cls-1" x1="216.26" y1="83.95" x2="203.24" y2="96.97"/><line class="cls-1" x1="96.76" y1="203.45" x2="83.74" y2="216.47"/></g></svg>';
        document.getElementById('header-img').setAttribute('src','../images/logo-dark.png');
        document.getElementById('menu-img').setAttribute('src','../images/menu-dark.png');
    }
}

window.onload = function () {
    //set user color theme
    const userColorTheme = localStorage.getItem('color-theme');
    const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const colorTheme = userColorTheme ? userColorTheme : osColorTheme;
    if (colorTheme === 'dark') {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        document.getElementsByClassName('view-mode-svg')[0].outerHTML = '<svg class="view-mode-svg" id="view-mode-svg-dark" onclick="changeViewMode(\'light\')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;}</style></defs><g id="레이어_6" data-name="레이어 6"><circle class="cls-1" cx="150" cy="150" r="54"/><line class="cls-1" x1="150" y1="56.5" x2="150" y2="74.91"/><line class="cls-1" x1="150" y1="225.5" x2="150" y2="243.91"/><line class="cls-1" x1="56.29" y1="150.21" x2="74.71" y2="150.21"/><line class="cls-1" x1="225.29" y1="150.21" x2="243.71" y2="150.21"/><line class="cls-1" x1="83.74" y1="83.95" x2="96.76" y2="96.97"/><line class="cls-1" x1="203.24" y1="203.45" x2="216.26" y2="216.47"/><line class="cls-1" x1="216.26" y1="83.95" x2="203.24" y2="96.97"/><line class="cls-1" x1="96.76" y1="203.45" x2="83.74" y2="216.47"/></g></svg>';
        document.getElementById('header-img').setAttribute('src','../images/logo-dark.png');
        document.getElementById('menu-img').setAttribute('src','../images/menu-dark.png');
    } else {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        document.getElementsByClassName('view-mode-svg')[0].outerHTML = '<svg class="view-mode-svg" id="view-mode-svg-dark" onclick="changeViewMode(\'dark\')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;}</style></defs><g id="레이어_7" data-name="레이어 7"><path class="cls-1" d="M153.28,72A72,72,0,1,0,216.8,181.32s-45.54,1.13-66.2-34.67S153.28,72,153.28,72Z"/></g></svg>';
        document.getElementById('header-img').setAttribute('src','../images/logo-light.png');
        document.getElementById('menu-img').setAttribute('src','../images/menu-light.png');
    }

    setTable(itemData.high, 'high');
};