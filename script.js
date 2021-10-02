const imageUrlList = [
    './images/low.png',
    './images/high.png'
];

let songpyeonAmount = {
    'pink': 0,
    'songgi': 0,
    'flower': 0,
    'pig': 0
};

const onCheckboxClick = function(level) {
    const pinkAmount = document.getElementById('pink-amount').value;
    const songgiAmount = document.getElementById('songgi-amount').value;
    const flowerAmount = document.getElementById('flower-amount').value;
    const pigAmount = document.getElementById('pig-amount').value;
    const addedProbability = 2.5 * pinkAmount + 5 * songgiAmount + 10 * flowerAmount + 20 * pigAmount;
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
    for (let k = 0; k < equipList.length; k++) {
        equipList[k].probability += equipList[k].probability * addedProbability / 100;
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

const onDaehyunButtonClick = function() {
    window.open("http://대현.com");
};

const onDarkCheckboxClick = function() {
    const darkCheckbox = document.getElementById('dark-checkbox');
    const isDark = darkCheckbox.checked;
    if (isDark) {
        document.documentElement.setAttribute('color-theme', 'dark');
        localStorage.setItem('color-theme', 'dark');
        document.getElementById('header-img').setAttribute('src','./images/logo-dark.png');
        document.getElementById('setting-img').setAttribute('src','./images/setting-dark.png');
    } else {
        document.documentElement.setAttribute('color-theme', 'light');
        localStorage.setItem('color-theme', 'light');
        document.getElementById('header-img').setAttribute('src','./images/logo-light.png');
        document.getElementById('setting-img').setAttribute('src','./images/setting-light.png');
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

window.onload = function () {
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

    //move setting window
    const dragState = {
        dragging: false,
        dragStartOffset: [ 0, 0 ]
    };
    const settingWindow = document.getElementById('setting-window');
    const head = document.getElementById('setting-window-header');
    head.addEventListener('mousedown', event => {
        dragState.dragging = true;
        const boundingClientRect = settingWindow.getBoundingClientRect();
        dragState.dragStartOffset = [ event.pageX - boundingClientRect.x, event.pageY - boundingClientRect.y ];
    });
    document.addEventListener('mousemove', event => {
        if (dragState.dragging) {
            settingWindow.style.left = `${event.pageX - dragState.dragStartOffset[0]}px`;
            settingWindow.style.top = `${event.pageY - dragState.dragStartOffset[1]}px`;
        }
    });
    document.addEventListener('mouseup', () => {
        if (dragState.dragging) {
            dragState.dragging = false;
        }
    });

    document.getElementById('setting-window').setAttribute('emphasized','false');
    setTable(itemData.high, 'high');
};