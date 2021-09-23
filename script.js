const imageUrlList = [
    './image/low.png',
    './image/high.png'
];

const onClickCheckbox = function(level) {
    const checkList = [...document.querySelectorAll('input[type="checkbox"]')].map(e => e.checked);
    const itemList = itemData[level].map(value => ({...value}));
    let checkedProbability = 0;
    for (let i = 0; i < checkList.length; i++) {
        if (checkList[i]) {
            checkedProbability += itemList[i].probability; 
            itemList[i].probability = 0; 
        }
    }
    for (let j = 0; j < itemList.length; j++) {
        itemList[j].probability = Math.round(itemList[j].probability * 100 / (100 - checkedProbability) * 1000) / 1000; 
    }
    const probabilityList = [...document.querySelectorAll('.probability')]; 
    for (let k = 0; k < probabilityList.length; k++) {
        probabilityList[k].innerText = `${itemList[k].probability}%`;
    }
    const equipItemList = itemList.filter(i => i.isEquipItem); 
    const equipItemProbability = Math.round(equipItemList.map(i => i.probability).reduce((a,b) => a + b) * 1000) / 1000; 
    const totalProbability = document.getElementById('total-probability');
    totalProbability.innerText = `장착 아이템 확률 : ${equipItemProbability}%`;
}

const onClickChangeButton = function() {
    const img = document.getElementsByClassName('gashapon-img')[0]; 
    if (img.id === "low-gashapon-img") {
        img.setAttribute('id', 'high-gashapon-img');
        img.setAttribute('src', imageUrlList[1]);
        setTable(itemData.high, 'high');
    } else {
        img.setAttribute('id', 'low-gashapon-img');
        img.setAttribute('src', imageUrlList[0]);
        setTable(itemData.low, 'low');
    }
};

const setTable = function(itemList, level) {
    const table = document.getElementById('item-table');
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
            <input type='checkbox' onclick='onClickCheckbox("${level}")'>
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
}

setTable(itemData.high, 'high');