class DragDrop {
    constructor() {
    }
    start(e) {
        if (e.target.dataset.drag) {
            dragged = e.target;
            e.target.style.border = '3px solid red';
            e.dataTransfer.effectAllowed = "copy";
            e.dataTransfer.setData('Text', e.target.id);
        } else {
            dragged = undefined;
        }
    }
    end(e) {
        dragged = undefined;
        e.target.classList.add(this.backgroundTransparent);
        e.target.style.border = '';
    }
    enter(e) {
        if(dragged) e.target.classList.add('b-color-yellow', 'box-shadow-red');
    }
    leave(e) {
        if(dragged) e.target.classList.remove('b-color-yellow', 'box-shadow-red');
    }
    over(e) {
        if (e.preventDefault) e.preventDefault();
        return false;
    }
    drop(e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        e.target.classList.remove('b-color-yellow', 'box-shadow-red');
        let id = e.dataTransfer.getData('Text');
        manageBasket.add(id);
    }
    removeStart(e) {
        removed = e.target;
        e.target.style.border = '1px solid black';
    }
    removeLeave(e) {
        if (removed.id === e.target.id && e.target.dataset.remove) {
            e.target.classList.add('b-color-red');
        }
    }
    removeEnd(e) {
        if (e.target.classList.contains('b-color-red')) {
            let confirmRemove = confirm(`Подтвердите удаление одной товарной позиции из заказа.\nID = ${e.target.id}\n${manageBasket.getProductId(e.target.id).name}`);
            if (confirmRemove) manageBasket.remove(e.target.id);
        }
        removed = undefined;
        e.target.style.border = '';
        e.target.classList.remove('b-color-red');
    }
    setManageDrag(source) {
        source.addEventListener('dragstart', this.start, false);
        source.addEventListener('dragend', this.end, false);
    }
    setManageDrop(source) {
        source.addEventListener('dragenter', this.enter, false);
        source.addEventListener('dragleave', this.leave, false);
        source.addEventListener('dragover', this.over, false);
        source.addEventListener('drop', this.drop, false);
    }
    setManageRemove(source) {
        source.addEventListener('dragstart', this.removeStart, false);
        source.addEventListener('dragleave', this.removeLeave, false);
        source.addEventListener('dragend', this.removeEnd, false);
    }
}
// 
class Product {
    constructor(img, name, price, id) {
        this.img = img;
        this.name = name;
        this.price = price;
        this.id = id;
    }
}
//
class ManageBasket {
    constructor(goods, counterBasket, basketList) {
        this.goodsInBasket = new Array();
        this.mapBasket = new Map();
        this.goods = goods;
        this.counterBasket = counterBasket;
        this.basketList = basketList;
    }
    add(id) {
        let instance = this.getProductId(id);
        if (instance) {
            this.goodsInBasket.push(instance);
            this.counterBasket.innerHTML = this.goodsInBasket.length;
            this.mapBasket.set(id, this.mapBasket.has(id) ? this.mapBasket.get(id) + 1 : 1);
            this.createList();
        }
    }
    remove(id) {
        let instance = this.getProductId(id);
        if (instance) {
            this.goodsInBasket.pop(instance);
            this.counterBasket.innerHTML = this.goodsInBasket.length;
            if (this.mapBasket.get(id) === 1) {
                this.mapBasket.delete(id);
                console.log(this.mapBasket);
            } else {
                this.mapBasket.set(id, this.mapBasket.get(id) - 1);
            }
            this.createList();
        }
    }
    getProductId(id) {
        let instance;
        for (item of this.goods) {
            if (item.id === Number(id)) {
                instance = item;
            }
        }
        return instance;
    }
    createList() {
        if (this.mapBasket.size === 0) {
            basketList.innerHTML = '';
            return;
        }
        let column = 0;
        let maxColumn = 3;
        let rowBasket;
        let tableBasket = new Set();
        for (let key of this.mapBasket.keys()) {
            if (column === 0) {
                rowBasket = document.createElement('div');
                rowBasket.className = 'basket-list-row';
                column++;
            } else {
                column++;
                if (column === maxColumn) {
                    column = 0;
                    if (tableBasket.size > 0) tableBasket.add(this.getSeparRow());
                    tableBasket.add(rowBasket);
                }
            }
            let cell = document.createElement('div');
            cell.className = 'basket-list-product background-transparent-50';
            cell.draggable = 'true';
            cell.id = key;
            cell.dataset.remove = 'true';
            drag.setManageRemove(cell);
            let img = document.createElement('img');
            img.src = this.getProductId(key).img;
            img.alt = '';
            let counter = document.createElement('p');
            counter.className = 'basket-list-product-counter';
            counter.innerHTML = this.mapBasket.get(key);
            cell.appendChild(img);
            cell.appendChild(counter);
            if (rowBasket.firstChild) rowBasket.appendChild(this.getSeparCell());
            rowBasket.appendChild(cell);
        }
        if (!tableBasket.has(rowBasket)) {
            if (tableBasket.size > 0) tableBasket.add(this.getSeparRow());
            let countCellsRowBasket = Array.from(rowBasket.childNodes)
                .filter(childNode => typeof childNode.className !== 'undefined')
                .filter(childNode => childNode.className.includes('basket-list-product'))
                .length;
            //add up to maxColumn cells
            for (let numb = countCellsRowBasket; numb < maxColumn; numb++) {
                rowBasket.appendChild(this.getSeparCell());
                let cell = document.createElement('div');
                cell.className = 'basket-list-product background-transparent-50';
                rowBasket.appendChild(cell);
            }
            tableBasket.add(rowBasket);
        }
        basketList.innerHTML = '';
        for (let item of tableBasket) {
            basketList.appendChild(item);
        }
    }
    getSeparCell() {
        let cell = document.createElement('div');
        cell.className = 'basket-list-separ-cell';
        return cell;
    }
    getSeparRow() {
        let row = document.createElement('div');
        row.className = 'basket-list-separ-row';
        return row;
    }
}
// Helpers
const nl = '<br/>';
let backgroundTransparent60 = 'background-transparent-60';
let backgroundTransparent10 = 'background-transparent-10';
let dragged;
let removed;

// Define item HTML
let log = document.getElementById('log');
let listGoods = document.getElementById('orderDeskGoods');
let counterBasket = document.getElementById('orderDeskBasketCounter');
let deskBasket = document.getElementById('orderDeskBasket');
let basketList = document.getElementById('basketList');

// Create object
let getRandomInt = () => Math.floor(Math.random() * (2147483647 - 10001)) + 10001;
let goods = new Set([
    new Product('img/s10e_yellow.jpg', 'Samsung Galaxy S10е 128GB Yellow (SM-G970FZYDSEK)', 24999, getRandomInt()),
    new Product('img/s10_white.jpg', 'Samsung Galaxy S10 128GB White (SM-G973FZWDSEK)', 29999, getRandomInt()),
    new Product('img/s10plus_black.jpg', 'Samsung Galaxy S10 Plus 128GB Black (SM-G975FZKDSEK)', 32999, getRandomInt()),
    new Product('img/snote9_blue.jpg', 'Samsung Galaxy Note 9 2018 128GB Ocean blue (SM-N960FZBDSEK)', 30999, getRandomInt()),
    new Product('img/Huawei_p20pro_purple.jpg', 'Huawei P20 Pro 6/128 GB Purple (51092FFA)', 22999, getRandomInt()),
    new Product('img/Huawei_p30pro_black.jpg', 'Huawei P30 Pro 8/256 GB Black (51093NFQ)', 32999, getRandomInt()),
    new Product('img/Lenovo-legion-Y530-15.jpg', 'Ноутбук Lenovo Legion Y530-15 (81FV015QRA)', 38845, getRandomInt()),
    new Product('img/HP_PavilionGaming-15-cx0039ur.jpg', 'Ноутбук HP Pavilion Gaming 15-cx0039ur (4PR95EA)', 34999, getRandomInt()),
    new Product('img/AsusTUFGaming-FX504GE-E4075T-Black.jpg', 'Ноутбук Asus TUF Gaming FX504GE-E4075T (90NR00I3-M00870) Black', 38999, getRandomInt())
]);
let manageBasket = new ManageBasket(goods, counterBasket, basketList);
let drag = new DragDrop();

// Show list goods
let isOdd = true;
let backgroundRow = '';
for (item of goods) {
    backgroundRow = isOdd ? backgroundTransparent60 : backgroundTransparent10;
    isOdd = !isOdd;
    let product = document.createElement('div');
    product.draggable = 'true';
    product.id = item.id;
    product.dataset.drag = 'true';
    drag.setManageDrag(product);
    //
    let cellImg = document.createElement('div');
    cellImg.className = `product-img ${backgroundRow}`;
    let productImg = document.createElement('img');
    productImg.src = item.img;
    productImg.alt = '';
    cellImg.appendChild(productImg);
    //
    let cellProductInfo = document.createElement('div');
    cellProductInfo.className = `product-info ${backgroundRow}`;
    let pName = document.createElement('p');
    pName.className = 'margin0';
    pName.innerHTML = item.name;
    let pPrice = document.createElement('p');
    pPrice.className = 'margin0 darkred';
    pPrice.innerHTML = item.price;
    cellProductInfo.appendChild(pName);
    cellProductInfo.appendChild(pPrice);
    //
    product.appendChild(cellImg);
    product.appendChild(cellProductInfo);
    listGoods.appendChild(product);
}

// Starting init
counterBasket.innerHTML = manageBasket.goodsInBasket.length;
drag.setManageDrop(deskBasket);


