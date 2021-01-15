import { Confirm } from "../../../js-advanced/_pgkUtils.js";
class ValueString {
    constructor(value) {
        this._count = 0;
        this._value = value;
        let dt = new Date(Date.now());
        this._dateCreate = `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}.${dt.getMilliseconds()}`;
    }
    get value() {
        return this._value;
    }
    get dateCreate() {
        return this._dateCreate;
    }
    set dateCreate(value) {
        this._dateCreate = value;
    }
    get count() {
        return this._count;
    }
    set count(value) {
        this._count = value;
    }
    Equals(item) {
        return item.count == this.count;
    }
    toString() {
        return ` ${this._count.toString().padStart(ValueString.maxLengthCount)} | ${this._value.padEnd(ValueString.maxLengthValue)} | ${this._dateCreate} `;
    }
}
class SortableUniqueCollection {
    constructor() {
        this._isSorted = false;
        this._isReverseSorted = false;
        this._sequence = 0;
        this.data = [];
    }
    get maxLengthCount() {
        return this._sequence.toString().length;
    }
    get length() {
        return this.data.length;
    }
    get list() {
        this.Sorted();
        return this.GetValues();
    }
    get reverseList() {
        this.ReverseSorted();
        return this.GetValues();
    }
    get firstItem() {
        if (this.data.length != 0) {
            return this.data[0];
        }
        else {
            return undefined;
        }
    }
    get lastItem() {
        if (this.data.length != 0) {
            return this.data[this.data.length - 1];
        }
        else {
            return undefined;
        }
    }
    add(item) {
        item.count = ++this._sequence;
        let unique = this.data.every(x => !x.Equals(item));
        if (unique) {
            this.data.push(item);
            this._isSorted = false;
            this._isReverseSorted = false;
        }
    }
    loadItem(item) {
        let unique = this.data.every(x => !x.Equals(item));
        if (unique) {
            this._sequence = item.count > this._sequence ? item.count : this._sequence;
            this.data.push(item);
            this._isSorted = false;
            this._isReverseSorted = false;
        }
    }
    remove(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    toString() {
        this.ReverseSorted();
        let value = this.data.reduce((prev, current) => `${prev}\n${current.toString()}`, '');
        return value;
    }
    Sorted() {
        if (!this._isSorted) {
            this.data = this.data.sort((a, b) => a.count - b.count);
            this._isSorted = true;
            this._isReverseSorted = false;
        }
    }
    ReverseSorted() {
        if (!this._isReverseSorted) {
            this.data = this.data.sort((a, b) => b.count - a.count);
            this._isSorted = false;
            this._isReverseSorted = true;
        }
    }
    *GetValues() {
        for (let i = 0; i < this.data.length; i++) {
            yield this.data[i];
        }
    }
}
class MarkRow {
    constructor(checkBox, img) {
        this._isMarkAll = false;
        this._eventChangeMarkRow = new CustomEvent('changeMarkRow', { bubbles: true, detail: { content: this } });
        this._checkBox = checkBox;
        this._img = img;
        this._img.src = MarkRow.imgCheckBlankOutlineBlack;
        this._checkBox.addEventListener('change', () => { this.OnChange(); }, false);
    }
    get valueString() {
        return this._valueString;
    }
    set valueString(value) {
        this._valueString = value;
    }
    get row() {
        return this._row;
    }
    set row(value) {
        this._row = value;
    }
    get isMarkAll() {
        return this._isMarkAll;
    }
    get checked() {
        return this._checkBox.checked;
    }
    set checked(value) {
        this._checkBox.checked = value;
    }
    get isDisable() {
        return this._checkBox.disabled;
    }
    set isDisable(value) {
        this._checkBox.disabled = value;
    }
    OnChange() {
        if (this._checkBox.checked) {
            this._img.src = MarkRow.imgCheckBoxOutline;
        }
        else {
            this._img.src = MarkRow.imgCheckBlankOutlineBlack;
        }
        ;
        document.dispatchEvent(this._eventChangeMarkRow);
    }
}
MarkRow.imgCheckBlankOutlineBlack = '../../img/checkbox-blank-outline-black.png';
MarkRow.imgCheckBoxOutline = '../../img/check-box-outline.png';
class MarkAllRows extends MarkRow {
    constructor(checkBox, img) {
        super(checkBox, img);
        this.isDisable = true;
        this._isMarkAll = true;
        this._eventChangeMarkRow = new CustomEvent('changeMarkAllRows', { bubbles: true, detail: { content: this } });
    }
}
class LSKey {
    constructor(count) {
        this.type = 'valueString';
        this.count = count;
    }
}
class LSValue {
    constructor(value, created) {
        this.value = value;
        this.created = created;
    }
}
class StringsManagement {
    constructor(enter, field, counter, tableOfLog, markAllRows, imgMarkAllRows, remove, logRowHeader, modalConfirm, modalConfirmYes, modalConfirmNo, confirmHeader, confirmAbout) {
        this._collection = new SortableUniqueCollection();
        this._markRows = [];
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
    get maxLength() {
        return 160;
    }
    get isString() {
        return isNaN(+this._field.value);
    }
    set toVerify(value) {
        this._field.dataset.verify = value;
    }
    set toEnterDisabled(value) {
        this._enter.disabled = value;
    }
    set toRemoveDisabled(value) {
        this._remove.disabled = value;
    }
    get countRemove() {
        return this._markRows.reduce((prev, current) => prev + (current.checked ? 1 : 0), 0);
    }
    get isMarkedRemove() {
        return this.countRemove > 0;
    }
    SetEvents() {
        Confirm.Create(this._modalConfirm, this._confirmHeader, this._confirmAbout, this._modalConfirmYes, this._modalConfirmNo);
        this._field.addEventListener('input', () => {
            if (this.isString) {
                this.toVerify = 'true';
                this.toEnterDisabled = false;
                this.SetCounter();
            }
            else {
                this.toVerify = 'false';
                this.toEnterDisabled = true;
                this.ClearCounter();
            }
        }, false);
        this._enter.addEventListener('click', (e) => { this.OnEnter(e); }, false);
        this._remove.addEventListener('click', () => { this.OnRemove(); }, false);
        document.addEventListener('changeMarkRow', (e) => { this.OnChangeMarkRow(); }, false);
        document.addEventListener('changeMarkAllRows', (e) => { this.OnChangeMarkAllRows(); }, false);
        this._logRowHeader.addEventListener('click', (e) => { this.OnClickRowLog(e); }, false);
        document.addEventListener(Confirm.instance.nameEventDeleteConfirm, () => { this.OnDeleteConfirm(); }, false);
        document.addEventListener(Confirm.instance.nameEventDeleteRefuse, () => { this.OnDeleteRefuse(); }, false);
        document.addEventListener(Confirm.instance.nameEventCaution, () => { this.OnCaution(); }, false);
    }
    OnEnter(e) {
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
    OnRemove() {
        Confirm.instance.OpenConfirmDelete(`Удалить ${this.countRemove} из ${this._markRows.length}`);
    }
    SetCounter() {
        this._counter.innerText = `${this._field.value.length} /${this.maxLength}`;
    }
    ClearCounter() {
        this._counter.innerText = `0/${this.maxLength}`;
    }
    ShowLogItem(item) {
        let row = document.createElement('div');
        row.className = 'row';
        row.dataset.count = item.count.toString();
        row.addEventListener('click', (e) => { this.OnClickRowLog(e); }, false);
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
        cell = document.createElement('div');
        cell.className = 'cell w5prc cell-h-right';
        cell.textContent = item.count.toString();
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell w70prc';
        cell.textContent = item.value;
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell cell-h-right fsize-0x7rem';
        cell.textContent = item.dateCreate;
        row.appendChild(cell);
        this._tableOfLog.insertBefore(row, this._tableOfLog.firstChild);
    }
    OnChangeMarkRow() {
        if (this.isMarkedRemove) {
            this.toRemoveDisabled = false;
            this._remove.innerText = `Удалить (${this.countRemove} из ${this._markRows.length})`;
        }
        else {
            this.toRemoveDisabled = true;
            this._remove.innerText = 'Удалить';
        }
    }
    OnChangeMarkAllRows() {
        for (let mark of this._markRows) {
            mark.checked = this._markAllRows.checked;
            mark.OnChange();
        }
    }
    OnClickRowLog(e) {
        if (e.target.parentElement.id === 'log-row-header') {
            if (!this._markAllRows.isDisable) {
                this._markAllRows.checked = !this._markAllRows.checked;
                this._markAllRows.OnChange();
            }
        }
        else {
            if (e.target.parentElement.dataset.count) {
                let item = this._markRows.find(element => element.valueString.count === Number(e.target.parentElement.dataset.count));
                item.checked = !item.checked;
                item.OnChange();
            }
        }
    }
    OnDeleteConfirm() {
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
        }
        else if (this._collection.length === this._markRows.length) {
        }
        else {
            console.log(`error with delete: collection.length = ${this._collection.length}, markRows.length = ${this._markRows.length}`);
        }
        this._modalConfirm.style.display = 'none';
    }
    OnDeleteRefuse() {
        this._modalConfirm.style.display = 'none';
    }
    OnCaution() {
        this._modalConfirm.style.display = 'none';
    }
    SetToStorage(item) {
        try {
            let key = new LSKey(item.count);
            localStorage.setItem(JSON.stringify(key), JSON.stringify(new LSValue(item.value, item.dateCreate)));
        }
        catch (e) {
            Confirm.instance.OpenCaution(e.message);
        }
    }
    RemoveFromStorage(item) {
        try {
            let key = new LSKey(item.count);
            localStorage.removeItem(JSON.stringify(key));
        }
        catch (e) {
            Confirm.instance.OpenCaution(e.message);
        }
    }
    InitCollection() {
        for (let i = 0; i < localStorage.length; i++) {
            try {
                let key = JSON.parse(localStorage.key(i));
                let value = JSON.parse(localStorage.getItem(JSON.stringify(key)));
                if (key.count != undefined) {
                    let valueString = new ValueString(value.value);
                    valueString.count = key.count;
                    valueString.dateCreate = value.created;
                    this._collection.loadItem(valueString);
                }
            }
            catch (e) { }
        }
        if (this._collection.length > 0) {
            for (let item of this._collection.list) {
                this.ShowLogItem(item);
            }
            this._markAllRows.isDisable = false;
        }
    }
}
let stringsManagement = new StringsManagement(document.getElementById('enter'), document.getElementById('stringVal'), document.getElementById('counter'), document.getElementById('tableOfLog'), document.getElementById('markAllRows'), document.getElementById('imgMarkAllRows'), document.getElementById('remove'), document.getElementById('log-row-header'), document.getElementById('confirm-modal'), document.getElementById('confirmYes'), document.getElementById('confirmNo'), document.getElementById('confirm-modal-Header'), document.getElementById('confirmAbout'));
//# sourceMappingURL=addTask.js.map