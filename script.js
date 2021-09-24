const imageUrlList = [
    './images/low.png',
    './images/high.png'
];

let songpyeonAmount = {
    'songgi': 0,
    'flower': 0,
    'pig': 0
};

const onCheckboxClick = function(level) {
    const songgiAmount = document.getElementById('songgi-amount').value;
    const flowerAmount = document.getElementById('flower-amount').value;
    const pigAmount = document.getElementById('pig-amount').value;
    const addedProbability = 5 * songgiAmount + 10 * flowerAmount + 20 * pigAmount;
    const checkList = [...document.querySelectorAll('input[type="checkbox"]')].map(e => e.checked);
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
    table.innerHTML = `<tr>
        <th id='checkbox-raw'>
            보유 여부
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
            <input type='checkbox' onclick='onCheckboxClick("${level}")'>
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
    let songgiAmount = document.getElementById('songgi-amount').value === '' ? 0 : parseInt(document.getElementById('songgi-amount').value);
    let flowerAmount = document.getElementById('flower-amount').value === '' ? 0 : parseInt(document.getElementById('flower-amount').value);
    let pigAmount = document.getElementById('pig-amount').value === '' ? 0 : parseInt(document.getElementById('pig-amount').value);
    if (songgiAmount + flowerAmount + pigAmount > 4) {
        document.getElementById(`${name}-amount`).value = songpyeonAmount[`${name}`];
        alert('넣을 수 있는 송편의 최대 개수는 4개입니다.');
        return;
    }
    songpyeonAmount[name] = document.getElementById(`${name}-amount`).value;
    const addedProbability = 5 * songgiAmount + 10 * flowerAmount + 20 * pigAmount;
    const level = document.getElementsByClassName('item-table')[0].id.split('-')[0];
    const checkList = [...document.querySelectorAll('input[type="checkbox"]')].map(e => e.checked);
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

setTable(itemData.high, 'high');