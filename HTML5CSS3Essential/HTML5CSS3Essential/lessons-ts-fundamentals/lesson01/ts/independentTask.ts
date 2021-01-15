namespace icecream {
    enum TypeItem { Big, Small, Chocolate, Caramel, Strawberry, Lozenges }
    class SelectedItem {
        private _type: TypeItem;
        private _defItem: HTMLElement;
        private _calcItem: HTMLElement;
        private _price: number;
        private _isSelected: boolean;
        constructor(type: TypeItem, defItem: HTMLElement, calcItem: HTMLElement, price: number, isSelected: boolean = false) {
            this._type = type;
            this._defItem = defItem;
            this._calcItem = calcItem;
            this._price = price;
            this._isSelected = isSelected;
        }
        get type(): TypeItem {
            return this._type;
        }
        get defItem(): HTMLElement {
            return this._defItem;
        }
        get calcItem(): HTMLElement {
            return this._calcItem;
        }
        get isSelected(): boolean {
            return this._isSelected;
        }
        get price(): number {
            return this._price;
        }
        set isSelected(value: boolean) {
            this._isSelected = value;
        }
    }
    class OrderIceCream {
        private _classItemSelected: string = 'item-card-selected';
        private _listItems: SelectedItem[];
        private _costItem: HTMLElement;
        private _cost: number = 0;
        constructor(listItems: SelectedItem[], costItem: HTMLElement) {
            this._listItems = listItems;
            this._costItem = costItem;
            this.showSelected();
            this.calculated();
            this.setOnClick();
        }
        setOnClick(): void {
            for (let item of this._listItems) {
                item.defItem.addEventListener('click', (e) => {
                    // Check some conditions
                    if ([TypeItem.Big, TypeItem.Small].some(type => type === item.type)) {
                        // 1. Only one of type: Big or Small
                        let big: SelectedItem = item.type == TypeItem.Big ? item : this._listItems.filter(obj => obj.type === TypeItem.Big)[0];
                        let small: SelectedItem = item.type == TypeItem.Small ? item : this._listItems.filter(obj => obj.type === TypeItem.Small)[0];
                        big.isSelected = !big.isSelected;
                        small.isSelected = !small.isSelected;
                    } else if ([TypeItem.Chocolate, TypeItem.Caramel, TypeItem.Strawberry].some(type => type === item.type)) {
                        // 2. One of the elements must be required
                        let listSelected = this._listItems.filter(
                            obj => (obj.type === TypeItem.Chocolate || obj.type === TypeItem.Caramel || obj.type === TypeItem.Strawberry) && obj.isSelected
                        );
                        if (listSelected.length === 1 && listSelected[0].type !== item.type) {
                            item.isSelected = !item.isSelected;
                        } else if (listSelected.length > 1) {
                            item.isSelected = !item.isSelected;
                        }
                    } else {
                        item.isSelected = !item.isSelected;
                    }
                    this.showSelected();
                    this.calculated();
                }, false);
            }
        }
        setCost(): void {
            this._costItem.innerHTML = this._cost.toString();
        }
        showSelected(): void {
            for (let item of this._listItems) {
                if (item.isSelected) {
                    item.calcItem.style.display = 'flex';
                    if (!item.defItem.classList.contains(this._classItemSelected)) {
                        item.defItem.classList.add(this._classItemSelected);
                    }
                } else {
                    item.calcItem.style.display = 'none';
                    if (item.defItem.classList.contains(this._classItemSelected)) {
                        item.defItem.classList.remove(this._classItemSelected);
                    }
                }
            }
        }
        calculated(): void {
            this._cost = 0;
            for (let item of this._listItems) {
                if (item.isSelected) {
                    this._cost += item.price;
                }
            }
            this.setCost();
        }
    }

    let orderIceCream: OrderIceCream = new OrderIceCream(
        [
            new SelectedItem(TypeItem.Big, document.getElementById('big'), document.getElementById('cardBig'), 25, true),
            new SelectedItem(TypeItem.Small, document.getElementById('small'), document.getElementById('cardSmall'), 10),
            new SelectedItem(TypeItem.Chocolate, document.getElementById('chocolate'), document.getElementById('cardChocolate'), 5, true),
            new SelectedItem(TypeItem.Caramel, document.getElementById('caramel'), document.getElementById('cardCaramel'), 6),
            new SelectedItem(TypeItem.Strawberry, document.getElementById('strawberry'), document.getElementById('cardStrawberry'), 10),
            new SelectedItem(TypeItem.Lozenges, document.getElementById('lozenges'), document.getElementById('cardLozenges'), 5)
        ],
        document.getElementById('cost')
    );
}