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
    const img = document.getElementById('change-gashapon-img'); 
    if (img.src === imageUrlList[0]) {
        img.setAttribute('src', imageUrlList[1]);
        setTable(itemData.high, 'high');
    } else {
        img.setAttribute('src', imageUrlList[0]);
        setTable(itemData.low, 'low');
    }
};

const setTable = function(itemList, level) {
    const table = document.getElementById('item-table');
    table.innerHTML = `<tr>
        <th>
            보유 여부
        </th>
        <th>
            아이템
        </th>
        <th>
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
    const image = document.getElementById('change-gashapon-img');
    switch (level) {
        case 'high': 
            image.outerHTML = `<img id='change-gashapon-img' src='${imageUrlList[1]}' alt='단계 변경 이미지' />`;
            break;
        case 'low':
            image.outerHTML = `<img id='change-gashapon-img' src='${imageUrlList[0]}' alt='단계 변경 이미지' />`;
            break;
    }
    const totalProbability = document.getElementById('total-probability');
    totalProbability.innerText = `장착 아이템 확률 : ${equipItemProbability}%`;
}

setTable(itemData.high, 'high');