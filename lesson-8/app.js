'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

const cartBtn = document.querySelector('.cartIconWrap');
const cartBtnSpan = cartBtn.querySelector('span');
const cartPanel = document.querySelector('.basket');
const basketBody = document.querySelector('.basketBody');
const featuredItems = document.querySelector('.featuredItems');
const basketTotalValue = document.querySelector('.basketTotalValue');

let sales = localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')) : [];

let isShowCartPanel = false;

cartBtnSpan.textContent = getTotalCount();

function getTotalCount() {
    let count = 0;
    sales.forEach(sale => {
        count += sale.count;
    });
    return count;
}

function getTotalCountPrise() {
    let prise = 0;
    sales.forEach(sale => {
        prise += sale.count * sale.prise;
    });
    return Math.round(prise * 100) / 100;
}

const clearSales = () => {
    basketBody.innerHTML = "";
}

const renderSales = () => {
    clearSales();
    for (const sale of sales) {
        basketBody.innerHTML += `<div class="basketRow">
            <div>${sale.name}</div>
            <div>${sale.count}</div>
            <div>$${sale.prise.toFixed(2)}</div>
            <div>$${(Math.round(sale.count * sale.prise * 100) / 100).toFixed(2)}</div>
        </div>`;
    }
    basketTotalValue.textContent = getTotalCountPrise().toFixed(2);
}

cartBtn.addEventListener('click', () => {
    isShowCartPanel = !isShowCartPanel;
    if (isShowCartPanel) {
        renderSales();
    } else {
        clearSales();
    }
    cartPanel.classList.toggle('hidden');
});

const addSale = (id, name, prise) => {
    name = name.trim();
    id = Number(id);
    const oldSale = sales.filter(el => el.id === id);
    if (oldSale[0]) {
        oldSale[0].count++;
    } else {
        const sale = {
            id: Number(id),
            name,
            prise: Number(prise.trim().slice(1)),
            count: 1
        };
        sales.push(sale);
    }
    localStorage.setItem('sales', JSON.stringify(sales));
    renderSales();
    cartBtnSpan.textContent = getTotalCount();
}

featuredItems.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() !== 'button') return;
    const featureItem = e.target.closest('.featuredItem');
    const id = featureItem.dataset.id;
    const name = featureItem.querySelector('.featuredName').textContent;
    const prise = featureItem.querySelector('.featuredPrice').textContent;
    addSale(id, name, prise);
});


