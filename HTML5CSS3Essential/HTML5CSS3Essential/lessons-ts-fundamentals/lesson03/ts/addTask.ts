import { Confirm } from "../../../js-advanced/_pgkUtils.js";

interface CountableEqualityComparer<T> {
    count: number;
    Equals(item: T): boolean;
}

class ValueString implements CountableEqualityComparer<ValueString> {
    static maxLengthValue: number;
    static maxLengthCount: number;
    private _count: number = 0;
    private _dateCreate: string;
    private _value: string;
    constructor(value: string) {
        this._value = value;
        let dt = new Date(Date.now());
        this._dateCreate = `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}.${dt.getMilliseconds()}`;
    }
    get value(): string {
        return this._value;
    }
    get dateCreate(): string {
        return this._dateCreate;
    }
    set dateCreate(value: string) {
        this._dateCreate = value;
    }
    get count(): number {
        return this._count;
    }
    set count(value: number) {
        this._count = value;
    }
    Equals(item: ValueString): boolean {
        return item.count == this.count;
    }
    toString(): string {
        return ` ${this._count.toString().padStart(ValueString.maxLengthCount)} | ${this._value.padEnd(ValueString.maxLengthValue)} | ${this._dateCreate} `;
    }
}

class SortableUniqueCollection<T extends CountableEqualityComparer<T>> {
    private _isSorted: boolean = false;
    private _isReverseSorted: boolean = false;
    private _sequence: number = 0;

    private data: T[] = [];

    get maxLengthCount(): number {
        return this._sequence.toString().length;
    }

    get length(): number {
        return this.data.length;
    }

    get list(): IterableIterator<T> {
        this.Sorted();
        return this.GetValues();
    }

    get reverseList(): IterableIterator<T> {
        this.ReverseSorted();
        return this.GetValues();
    }

    get firstItem(): T {
        if (this.data.length != 0) {
            return this.data[0];
        } else {
            return undefined;
        }
    }

    get lastItem(): T {
        if (this.data.length != 0) {
            return this.data[this.data.length - 1];
        } else {
            return undefined;
        }
    }

    public add(item: T) {
        item.count = ++this._sequence;
        let unique: boolean = this.data.every(x => !x.Equals(item));
        if (unique) {
            this.data.push(item);
            this._isSorted = false;
            this._isReverseSorted = false;
        }
    }

    public loadItem(item: T) {
        let unique: boolean = this.data.every(x => !x.Equals(item));
        if (unique) {
            this._sequence = item.count > this._sequence ? item.count : this._sequence;
            this.data.push(item);
            this._isSorted = false;
            this._isReverseSorted = false;
        }
    }

    public remove(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    public toString(): string {
        this.ReverseSorted();
        let value: string = this.data.reduce((prev, current) => `${prev}\n${current.toString()}`, '');
        return value;
    }

    private Sorted() {
        if (!this._isSorted) {
            this.data = this.data.sort((a, b) => a.count - b.count);
            this._isSorted = true;
            this._isReverseSorted = false;
        }
    }

    private ReverseSorted() {
        if (!this._isReverseSorted) {
            this.data = this.data.sort((a, b) => b.count - a.count);
            this._isSorted = false;
            this._isReverseSorted = true;
        }
    }

    private *GetValues() {
        for (let i = 0; i < this.data.length; i++) {
            yield this.data[i];
        }
    }

}

class MarkRow {
    static imgCheckBlankOutlineBlack: string = '../../img/checkbox-blank-outline-black.png';
    static imgCheckBoxOutline: string = '../../img/check-box-outline.png';
    protected _checkBox: HTMLInputElement;
    protected _img: HTMLImageElement;
    protected _isMarkAll: boolean = false;
    private _valueString: ValueString;
    private _row: HTMLElement;
    protected _eventChangeMarkRow: Event = new CustomEvent('changeMarkRow', { bubbles: true, detail: { content: this } });
    constructor(
        checkBox: HTMLInputElement,
        img: HTMLImageElement
    ) {
        this._checkBox = checkBox;
        this._img = img;
        this._img.src = MarkRow.imgCheckBlankOutlineBlack;
        this._checkBox.addEventListener('change', () => { this.OnChange(); }, false);
    }
    get valueString(): ValueString {
        return this._valueString;
    }
    set valueString(value: ValueString) {
        this._valueString = value;
    }
    get row(): HTMLElement {
        return this._row;
    }
    set row(value: HTMLElement) {
        this._row = value;
    }
    get isMarkAll(): boolean {
        return this._isMarkAll;
    }
    get checked(): boolean {
        return this._checkBox.checked;
    }
    set checked(value: boolean) {
        this._checkBox.checked = value;
    }
    get isDisable(): boolean {
        return this._checkBox.disabled;
    }
    set isDisable(value: boolean) {
        this._checkBox.disabled = value;
    }
    public OnChange(): void {
        if (this._checkBox.checked) {
            this._img.src = MarkRow.imgCheckBoxOutline;
        } else {
            this._img.src = MarkRow.imgCheckBlankOutlineBlack;
        };
        document.dispatchEvent(this._eventChangeMarkRow);
    }
}

class MarkAllRows extends MarkRow {
    constructor(
        checkBox: HTMLInputElement,
        img: HTMLImageElement
    ) {
        super(checkBox, img);
        this.isDisable = true;
        this._isMarkAll = true;
        this._eventChangeMarkRow = new CustomEvent('changeMarkAllRows', { bubbles: true, detail: { content: this } })
    }
}

class LSKey {
    type: string = 'valueString';
    count: number;
    constructor(count: number) {
        this.count = count;
    }
}

class LSValue {
    constructor(public value: string, public created: string) { }
}

class StringsManagement {
    // Fields
    private _enter: HTMLInputElement;
    private _field: HTMLInputElement;
    private _counter: HTMLLabelElement;
    private _collection: SortableUniqueCollection<ValueString> = new SortableUniqueCollection();
    private _tableOfLog: HTMLElement;
    private _markRows: MarkRow[] = [];
    private _markAllRows: MarkAllRows;
    private _remove: HTMLButtonElement;
    private _logRowHeader: HTMLElement;
    private _modalConfirm: HTMLElement;
    private _modalConfirmYes: HTMLElement;
    private _modalConfirmNo: HTMLElement;
    private _confirmHeader: HTMLElement;
    private _confirmAbout: HTMLElement;

    constructor(
        enter: HTMLInputElement,
        field: HTMLInputElement,
        counter: HTMLLabelElement,
        tableOfLog: HTMLElement,
        markAllRows: HTMLInputElement,
        imgMarkAllRows: HTMLImageElement,
        remove: HTMLButtonElement,
        logRowHeader: HTMLElement,
        modalConfirm: HTMLElement,
        modalConfirmYes: HTMLElement,
        modalConfirmNo: HTMLElement,
        confirmHeader: HTMLElement,
        confirmAbout: HTMLElement
    ) {
        this._enter = enter;
        this._field = field;
        this._counter = counter;
        this._tableOfLog = tableOfLog;
        this._markAllRows = new MarkAllRows(markAllRows, imgMarkAllRows);
        this._remove = remove;
        this._logRowHeader = logRowHeader;
        this._modalConfirm = modalConfirm;
        this._modalConfirmYes = modalConfirmYes;
        this._modalConfirmNo = modalConfirmNo;
        this._confirmHeader = confirmHeader;
        this._confirmAbout = confirmAbout;
        this._field.maxLength = this.maxLength;
        ValueString.maxLengthValue = this.maxLength;
        this.SetEvents();
        this.toEnterDisabled = true;
        this.toRemoveDisabled = true;
        this.InitCollection();
        this.SetCounter();
    }

    // Properties
    get maxLength(): number {
        return 160;
    }

    get isString(): boolean {
        return isNaN(+this._field.value);
    }

    set toVerify(value: string) {
        this._field.dataset.verify = value;
    }

    set toEnterDisabled(value: boolean) {
        this._enter.disabled = value;
    }

    set toRemoveDisabled(value: boolean) {
        this._remove.disabled = value;
    }

    private get countRemove(): number {
        return this._markRows.reduce((prev, current) => prev + (current.checked ? 1 : 0), 0);
    }

    private get isMarkedRemove(): boolean {
        return this.countRemove > 0;
    }

    // Helpers
    private SetEvents(): void {
        Confirm.Create(
            this._modalConfirm,
            this._confirmHeader,
            this._confirmAbout,
            this._modalConfirmYes,
            this._modalConfirmNo
        );
        this._field.addEventListener('input', () => {
            if (this.isString) {
                this.toVerify = 'true';
                this.toEnterDisabled = false;
                this.SetCounter();
            } else {
                this.toVerify = 'false';
                this.toEnterDisabled = true;
                this.ClearCounter();
            }
        }, false);
        this._enter.addEventListener('click', (e) => { this.OnEnter(e); }, false);
        this._remove.addEventListener('click', () => { this.OnRemove(); }, false);
        document.addEventListener('changeMarkRow', (e: CustomEvent) => { this.OnChangeMarkRow(); }, false);
        document.addEventListener('changeMarkAllRows', (e: CustomEvent) => { this.OnChangeMarkAllRows(); }, false);
        this._logRowHeader.addEventListener('click', (e) => { this.OnClickRowLog(e); }, false);
        document.addEventListener(Confirm.instance.nameEventDeleteConfirm, () => { this.OnDeleteConfirm(); }, false);
        document.addEventListener(Confirm.instance.nameEventDeleteRefuse, () => { this.OnDeleteRefuse(); }, false);
        document.addEventListener(Confirm.instance.nameEventCaution, () => { this.OnCaution(); }, false);
    }

    private OnEnter(e: Event) {
        e.preventDefault();
        this._collection.add(new ValueString(this._field.value));
        ValueString.maxLengthCount = this._collection.maxLengthCount;
        this.toVerify = 'false';
        this.toEnterDisabled = true;
        this._field.value = '';
        this.SetCounter();
        this._markAllRows.isDisable = false;
        this.ShowLogItem(this._collection.lastItem);
        this.SetToStorage(this._collection.lastItem);
        this.OnChangeMarkRow();
    }

    private OnRemove() {
        Confirm.instance.OpenConfirmDelete(`Удалить ${this.countRemove} из ${this._markRows.length}`);
    }

    private SetCounter() {
        this._counter.innerText = `${this._field.value.length} /${this.maxLength}`;
    }

    private ClearCounter() {
        this._counter.innerText = `0/${this.maxLength}`;
    }

    private ShowLogItem(item: ValueString) {
        let row = document.createElement('div');
        row.className = 'row';
        row.dataset.count = item.count.toString();
        row.addEventListener('click', (e) => { this.OnClickRowLog(e); }, false);
        // check
        let cell = document.createElement('div');
        cell.className = 'cell w1prc cell-horizontal-center cell-vertical-center';
        let check = document.createElement('input');
        check.type = 'checkbox';
        check.id = item.count.toString();
        cell.appendChild(check);
        let lbl = document.createElement('label');
        lbl.htmlFor = check.id;
        let img = document.createElement('img');
        lbl.appendChild(img);
        cell.appendChild(lbl);
        let markRow = new MarkRow(check, img);
        markRow.valueString = item;
        markRow.row = row;
        this._markRows.push(markRow);
        row.appendChild(cell);
        // counter
        cell = document.createElement('div');
        cell.className = 'cell w5prc cell-h-right';
        cell.textContent = item.count.toString();
        row.appendChild(cell);
        // value
        cell = document.createElement('div');
        cell.className = 'cell w70prc';
        cell.textContent = item.value;
        row.appendChild(cell);
        // dt create
        cell = document.createElement('div');
        cell.className = 'cell cell-h-right fsize-0x7rem';
        cell.textContent = item.dateCreate;
        row.appendChild(cell);
        //
        this._tableOfLog.insertBefore(row, this._tableOfLog.firstChild);
    }

    private OnChangeMarkRow(): void {
        if (this.isMarkedRemove) {
            this.toRemoveDisabled = false;
            this._remove.innerText = `Удалить (${this.countRemove} из ${this._markRows.length})`;
        } else {
            this.toRemoveDisabled = true;
            this._remove.innerText = 'Удалить';
        }
    }

    private OnChangeMarkAllRows() {
        for (let mark of this._markRows) {
            mark.checked = this._markAllRows.checked;
            mark.OnChange();
        }
    }

    private OnClickRowLog(e): void {
        if (e.target.parentElement.id === 'log-row-header') {
            if (!this._markAllRows.isDisable) {
                this._markAllRows.checked = !this._markAllRows.checked;
                this._markAllRows.OnChange();
            }
        } else {
            if (e.target.parentElement.dataset.count) {
                let item: MarkRow = this._markRows.find(element => element.valueString.count === Number(e.target.parentElement.dataset.count));
                item.checked = !item.checked;
                item.OnChange();
            }
        }
    }

    private OnDeleteConfirm(): void {
        let listChecked = this._markRows.filter(item => item.checked);
        for (let mark of listChecked) {
            this._tableOfLog.removeChild(mark.row);
            this.RemoveFromStorage(mark.valueString);
            this._collection.remove(mark.valueString);
            this._markRows.splice(this._markRows.indexOf(mark), 1);
        }
        this._markAllRows.checked = false;
        this.OnChangeMarkRow();
        if (this._collection.length === 0 && this._markRows.length === 0) {
            this._markAllRows.isDisable = true;
        } else if (this._collection.length === this._markRows.length) {
        } else {
            console.log(`error with delete: collection.length = ${this._collection.length}, markRows.length = ${this._markRows.length}`);
        }
        this._modalConfirm.style.display = 'none';
    }

    private OnDeleteRefuse(): void {
        this._modalConfirm.style.display = 'none';
    }

    private OnCaution(): void {
        this._modalConfirm.style.display = 'none';
    }

    private SetToStorage(item: ValueString): void {
        try {
            let key: LSKey = new LSKey(item.count);
            localStorage.setItem(JSON.stringify(key), JSON.stringify(new LSValue(item.value, item.dateCreate)));
        } catch (e) {
            Confirm.instance.OpenCaution(e.message);
        }
    }

    private RemoveFromStorage(item: ValueString): void {
        try {
            let key: LSKey = new LSKey(item.count);
            localStorage.removeItem(JSON.stringify(key));
        } catch (e) {
            Confirm.instance.OpenCaution(e.message);
        }
    }

    private InitCollection(): void {
        for (let i = 0; i < localStorage.length; i++) {
            try {
                let key: LSKey = JSON.parse(localStorage.key(i)) as LSKey;
                let value: LSValue = JSON.parse(localStorage.getItem(JSON.stringify(key))) as LSValue;
                if (key.count != undefined) {
                    let valueString: ValueString = new ValueString(value.value);
                    valueString.count = key.count;
                    valueString.dateCreate = value.created;
                    this._collection.loadItem(valueString);
                }
            } catch (e) { }
        }
        if (this._collection.length > 0) {
            for (let item of this._collection.list) {
                this.ShowLogItem(item);
            }
            this._markAllRows.isDisable = false;
        }
    }

}

let stringsManagement: StringsManagement = new StringsManagement(
    <HTMLInputElement>document.getElementById('enter'),
    <HTMLInputElement>document.getElementById('stringVal'),
    <HTMLLabelElement>document.getElementById('counter'),
    <HTMLLabelElement>document.getElementById('tableOfLog'),
    <HTMLInputElement>document.getElementById('markAllRows'),
    <HTMLImageElement>document.getElementById('imgMarkAllRows'),
    <HTMLButtonElement>document.getElementById('remove'),
    <HTMLElement>document.getElementById('log-row-header'),
    <HTMLElement>document.getElementById('confirm-modal'),
    <HTMLElement>document.getElementById('confirmYes'),
    <HTMLElement>document.getElementById('confirmNo'),
    <HTMLElement>document.getElementById('confirm-modal-Header'),
    <HTMLElement>document.getElementById('confirmAbout')
);

