var icecream;
(function (icecream) {
    let TypeItem;
    (function (TypeItem) {
        TypeItem[TypeItem["Big"] = 0] = "Big";
        TypeItem[TypeItem["Small"] = 1] = "Small";
        TypeItem[TypeItem["Chocolate"] = 2] = "Chocolate";
        TypeItem[TypeItem["Caramel"] = 3] = "Caramel";
        TypeItem[TypeItem["Strawberry"] = 4] = "Strawberry";
        TypeItem[TypeItem["Lozenges"] = 5] = "Lozenges";
    })(TypeItem || (TypeItem = {}));
    class SelectedItem {
        constructor(type, defItem, calcItem, price, isSelected = false) {
            this._type = type;
            this._defItem = defItem;
            this._calcItem = calcItem;
            this._price = price;
            this._isSelected = isSelected;
        }
        get type() {
            return this._type;
        }
        get defItem() {
            return this._defItem;
        }
        get calcItem() {
            return this._calcItem;
        }
        get isSelected() {
            return this._isSelected;
        }
        get price() {
            return this._price;
        }
        set isSelected(value) {
            this._isSelected = value;
        }
    }
    class OrderIceCream {
        constructor(listItems, costItem) {
            this._classItemSelected = 'item-card-selected';
            this._cost = 0;
            this._listItems = listItems;
            this._costItem = costItem;
            this.showSelected();
            this.calculated();
            this.setOnClick();
        }
        setOnClick() {
            for (let item of this._listItems) {
                item.defItem.addEventListener('click', (e) => {
                    if ([TypeItem.Big, TypeItem.Small].some(type => type === item.type)) {
                        let big = item.type == TypeItem.Big ? item : this._listItems.filter(obj => obj.type === TypeItem.Big)[0];
                        let small = item.type == TypeItem.Small ? item : this._listItems.filter(obj => obj.type === TypeItem.Small)[0];
                        big.isSelected = !big.isSelected;
                        small.isSelected = !small.isSelected;
                    }
                    else if ([TypeItem.Chocolate, TypeItem.Caramel, TypeItem.Strawberry].some(type => type === item.type)) {
                        let listSelected = this._listItems.filter(obj => (obj.type === TypeItem.Chocolate || obj.type === TypeItem.Caramel || obj.type === TypeItem.Strawberry) && obj.isSelected);
                        if (listSelected.length === 1 && listSelected[0].type !== item.type) {
                            item.isSelected = !item.isSelected;
                        }
                        else if (listSelected.length > 1) {
                            item.isSelected = !item.isSelected;
                        }
                    }
                    else {
                        item.isSelected = !item.isSelected;
                    }
                    this.showSelected();
                    this.calculated();
                }, false);
            }
        }
        setCost() {
            this._costItem.innerHTML = this._cost.toString();
        }
        showSelected() {
            for (let item of this._listItems) {
                if (item.isSelected) {
                    item.calcItem.style.display = 'flex';
                    if (!item.defItem.classList.contains(this._classItemSelected)) {
                        item.defItem.classList.add(this._classItemSelected);
                    }
                }
                else {
                    item.calcItem.style.display = 'none';
                    if (item.defItem.classList.contains(this._classItemSelected)) {
                        item.defItem.classList.remove(this._classItemSelected);
                    }
                }
            }
        }
        calculated() {
            this._cost = 0;
            for (let item of this._listItems) {
                if (item.isSelected) {
                    this._cost += item.price;
                }
            }
            this.setCost();
        }
    }
    let orderIceCream = new OrderIceCream([
        new SelectedItem(TypeItem.Big, document.getElementById('big'), document.getElementById('cardBig'), 25, true),
        new SelectedItem(TypeItem.Small, document.getElementById('small'), document.getElementById('cardSmall'), 10),
        new SelectedItem(TypeItem.Chocolate, document.getElementById('chocolate'), document.getElementById('cardChocolate'), 5, true),
        new SelectedItem(TypeItem.Caramel, document.getElementById('caramel'), document.getElementById('cardCaramel'), 6),
        new SelectedItem(TypeItem.Strawberry, document.getElementById('strawberry'), document.getElementById('cardStrawberry'), 10),
        new SelectedItem(TypeItem.Lozenges, document.getElementById('lozenges'), document.getElementById('cardLozenges'), 5)
    ], document.getElementById('cost'));
})(icecream || (icecream = {}));
//# sourceMappingURL=independentTask.js.map