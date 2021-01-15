import { SortableUniqueCollection, dateToString } from "../../../js-advanced/_pgkutils.js";
export var SortKind;
(function (SortKind) {
    SortKind[SortKind["Key"] = 0] = "Key";
    SortKind[SortKind["Code"] = 1] = "Code";
    SortKind[SortKind["Value"] = 2] = "Value";
    SortKind[SortKind["Create"] = 3] = "Create";
    SortKind[SortKind["Update"] = 4] = "Update";
})(SortKind || (SortKind = {}));
;
var SortState;
(function (SortState) {
    SortState[SortState["No"] = 0] = "No";
    SortState[SortState["Ascending"] = 1] = "Ascending";
    SortState[SortState["Descending"] = 2] = "Descending";
})(SortState || (SortState = {}));
;
export class DicDefinitionSortable extends SortableUniqueCollection {
    constructor() {
        super(...arguments);
        this._sortKind = SortKind.Key;
        this._sortState = SortState.No;
    }
    get sortKind() {
        return this._sortKind;
    }
    set sortKind(value) {
        this._sortKind = value;
    }
    get IsMustBeSorted() {
        return this._sortKind != SortKind.Key;
    }
    get sorted() {
        if (this._sortState == SortState.Ascending || this._sortState == SortState.No) {
            return this.list;
        }
        else {
            return this.reverseList;
        }
    }
    updateItem(rec) {
        if (this.data.some(item => item.primaryKey == rec.primaryKey)) {
            let item = this.data.find(item => item.primaryKey == rec.primaryKey);
            item.code = rec.code;
            item.value = rec.value;
            item.description = rec.description;
            item.dateUpdate = rec.dateUpdate;
            return true;
        }
        else {
            return false;
        }
    }
    Includes(element) {
        return this.data.some(item => item.Equals(element));
    }
    Sorted() {
        if (!this.isSorted) {
            switch (this.sortKind) {
                case SortKind.Key:
                    this.data = this.data.sort((a, b) => a.primaryKey - b.primaryKey);
                    break;
                case SortKind.Code:
                    this.data = this.data.sort((a, b) => a.code.localeCompare(b.code));
                    break;
                case SortKind.Value:
                    this.data = this.data.sort((a, b) => a.value.localeCompare(b.value));
                    break;
                case SortKind.Create:
                    this.data = this.data.sort((a, b) => {
                        if (a.dateCreate < b.dateCreate)
                            return -1;
                        if (a.dateCreate > b.dateCreate)
                            return 1;
                        return 0;
                    });
                    break;
                case SortKind.Update:
                    this.data = this.data.sort((a, b) => {
                        if (a.dateUpdate < b.dateUpdate)
                            return -1;
                        if (a.dateUpdate > b.dateUpdate)
                            return 1;
                        return 0;
                    });
                    break;
            }
            this.isSorted = true;
            this.isReverseSorted = false;
        }
    }
    ReverseSorted() {
        if (!this.isReverseSorted) {
            switch (this.sortKind) {
                case SortKind.Key:
                    this.data = this.data.sort((a, b) => b.primaryKey - a.primaryKey);
                    break;
                case SortKind.Code:
                    this.data = this.data.sort((a, b) => b.code.localeCompare(a.code));
                    break;
                case SortKind.Value:
                    this.data = this.data.sort((a, b) => b.value.localeCompare(a.value));
                    break;
                case SortKind.Create:
                    this.data = this.data.sort((a, b) => {
                        if (b.dateCreate < a.dateCreate)
                            return -1;
                        if (b.dateCreate > a.dateCreate)
                            return 1;
                        return 0;
                    });
                    break;
                case SortKind.Update:
                    this.data = this.data.sort((a, b) => {
                        if (b.dateUpdate < a.dateUpdate)
                            return -1;
                        if (b.dateUpdate > a.dateUpdate)
                            return 1;
                        return 0;
                    });
                    break;
            }
            this.isSorted = false;
            this.isReverseSorted = true;
        }
    }
    NextSortStep(kind) {
        if (this._sortKind != SortKind.Key && kind != this._sortKind) {
            this.ClearSort();
        }
        this._sortKind = kind;
        switch (this._sortState) {
            case SortState.No:
                this._sortState = SortState.Ascending;
                document.getElementById(`img-ascending-${kind}`).style.display = 'inline';
                document.getElementById(`img-descending-${kind}`).style.display = 'none';
                break;
            case SortState.Ascending:
                this._sortState = SortState.Descending;
                document.getElementById(`img-ascending-${kind}`).style.display = 'none';
                document.getElementById(`img-descending-${kind}`).style.display = 'inline';
                break;
            case SortState.Descending:
                this.ClearSort();
                break;
        }
    }
    ClearSort() {
        this._sortState = SortState.No;
        document.getElementById(`img-ascending-${this._sortKind}`).style.display = 'none';
        document.getElementById(`img-descending-${this._sortKind}`).style.display = 'none';
        this._sortKind = SortKind.Key;
    }
}
export class Definition {
    constructor(primaryKey, code, value, description = '', dateCreate = new Date(Date.now()), dateUpdate = dateCreate) {
        this._primaryKey = primaryKey;
        this._code = code;
        this._value = value;
        this._description = description;
        this._dateCreate = dateCreate;
        this._dateUpdate = dateUpdate;
    }
    get primaryKey() {
        return this._primaryKey;
    }
    set primaryKey(value) {
        this._primaryKey = value;
    }
    get code() {
        return this._code;
    }
    set code(value) {
        this.dateUpdate = new Date(Date.now());
        this._code = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this.dateUpdate = new Date(Date.now());
        this._value = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this.dateUpdate = new Date(Date.now());
        this._description = value;
    }
    get dateCreate() {
        return this._dateCreate;
    }
    set dateCreate(value) {
        this._dateCreate = value;
    }
    get dateUpdate() {
        return this._dateUpdate;
    }
    set dateUpdate(value) {
        this._dateUpdate = value;
    }
    Equals(item) {
        return item.primaryKey == this.primaryKey || item.code === this.code || item.value === this.value;
    }
    toString() {
        return ` ${this.primaryKey.toString().padStart(Definition.maxLengthPriamryKeyToString)} |` +
            ` ${this.code.padEnd(Definition.maxLengthCode)} |` +
            ` ${this.value.padEnd(Definition.maxLengthValueToString)} |` +
            ` ${dateToString(this.dateUpdate)} |` +
            ` ${dateToString(this.dateCreate)} |` +
            ` ${this.description}`;
    }
}
Definition.maxLengthCode = 20;
Definition.maxLengthValue = 160;
Definition.maxLengthDescription = 4000;
Definition.maxLengthPriamryKeyToString = 2;
Definition.maxLengthValueToString = 10;
export class FindParms {
}
export class FindDefinition {
    constructor(modal, isCreationDate, isDateOfChange, noDate, periodFrom, periodTo, code, value, yes, no) {
        this._current = new FindParms();
        this._modal = modal;
        this._isCreationDate = isCreationDate;
        this._isDateOfChange = isDateOfChange;
        this._noDate = noDate;
        this._periodFrom = periodFrom;
        this._periodTo = periodTo;
        this._code = code;
        this._value = value;
        this._yes = yes;
        this._no = no;
    }
    static get instance() {
        return this._instance;
    }
    static Create(modal, isCreationDate, isDateOfChange, noDate, periodFrom, periodTo, code, value, yes, no) {
        if (!FindDefinition._instance) {
            this._instance = new FindDefinition(modal, isCreationDate, isDateOfChange, noDate, periodFrom, periodTo, code, value, yes, no);
        }
    }
    get current() {
        return this._current;
    }
    set current(value) {
        this._current = value;
    }
    get nameEventApply() {
        return 'modalDicDefinitionFind-Apply';
    }
    get nameEventRefuse() {
        return 'modalDicDefinitionFind-Refuse';
    }
    get eventApply() {
        return new CustomEvent(this.nameEventApply, { bubbles: true });
    }
    get eventRefuse() {
        return new CustomEvent(this.nameEventRefuse, { bubbles: true });
    }
    SetCurrent() {
        this.current.isCreationDate = this._isCreationDate.checked;
        this.current.isDateOfChange = this._isDateOfChange.checked;
        this.current.noDate = this._noDate.checked;
        this.current.periodFrom = new Date(this._periodFrom.value);
        this.current.periodTo = new Date(this._periodTo.value);
        this.current.code = this._code.value;
        this.current.value = this._value.value;
    }
    OpenFinder() {
        this._yes.onclick = () => {
            this.SetCurrent();
            document.dispatchEvent(this.eventApply);
        };
        this._no.onclick = () => { document.dispatchEvent(this.eventRefuse); };
        this._modal.style.display = 'block';
    }
    isFind() {
        let isFind = false;
        if (this._isCreationDate.checked ||
            this._isDateOfChange.checked ||
            this._code.value.length > 0 ||
            this._value.value.length > 0)
            isFind = true;
        return isFind;
    }
    isSatisfy(item) {
        return (!this.current.isCreationDate || this.current.isCreationDate && this.current.periodFrom <= item.dateCreate && item.dateCreate <= this.current.periodTo)
            && (!this.current.isDateOfChange || this.current.isDateOfChange && this.current.periodFrom <= item.dateUpdate && item.dateUpdate <= this.current.periodTo)
            && (this.current.code.length == 0 || this.current.code.length > 0 && item.code.includes(this.current.code))
            && (this.current.value.length == 0 || this.current.value.length > 0 && item.value.includes(this.current.value));
    }
    Clear() {
        this._noDate.checked = true;
        this._code.value = '';
        this._value.value = '';
        this.SetCurrent();
    }
    Show(idom) {
        idom.innerHTML = '';
        let span = document.createElement('span');
        if (this._isCreationDate.checked) {
            span.innerHTML = 'Дата создания: ';
        }
        else if (this._isDateOfChange.checked) {
            span.innerHTML = 'Дата изменения: ';
        }
        ;
        if (!this._noDate.checked) {
            let from = new Date(this._periodFrom.value);
            let to = new Date(this._periodTo.value);
            span.innerHTML += `с <b>${from.toLocaleDateString()}</b> по <b>${to.toLocaleDateString()}</b>;  `;
        }
        if (this._code.value.length > 0) {
            span.innerHTML += `ключ: <b>${this._code.value}</b>;  `;
        }
        if (this._value.value.length > 0) {
            span.innerHTML += `значение: <b>${this._value.value}</b>;  `;
        }
        idom.appendChild(span);
    }
}
var Mode;
(function (Mode) {
    Mode[Mode["Add"] = 0] = "Add";
    Mode[Mode["Edit"] = 1] = "Edit";
    Mode[Mode["Reduce"] = 2] = "Reduce";
    Mode[Mode["Info"] = 3] = "Info";
})(Mode || (Mode = {}));
;
export class EditDefinition {
    constructor(modal, header, imgHeader, code, codeCounter, value, valueCounter, description, descriptionCounter, dateCreate, dateUpdate, yes, no) {
        this._modal = modal;
        this._header = header;
        this._imgHeader = imgHeader;
        this._code = code;
        this._codeCounter = codeCounter;
        this._value = value;
        this._valueCounter = valueCounter;
        this._description = description;
        this._descriptionCounter = descriptionCounter;
        this._dateCreate = dateCreate;
        this._dateUpdate = dateUpdate;
        this._yes = yes;
        this._no = no;
        this.SetEvents();
        this.ShowGets();
    }
    static get instance() {
        return this._instance;
    }
    static Create(modal, header, imgHeader, code, codeCounter, value, valueCounter, description, descriptionCounter, dateCreate, dateUpdate, yes, no) {
        if (!EditDefinition._instance) {
            this._instance = new EditDefinition(modal, header, imgHeader, code, codeCounter, value, valueCounter, description, descriptionCounter, dateCreate, dateUpdate, yes, no);
        }
    }
    get nameEventAddApply() {
        return 'modalDicDefinitionAdd-Apply';
    }
    get nameEventAddRefuse() {
        return 'modalDicDefinitionAdd-Refuse';
    }
    get nameEventEditApply() {
        return 'modalDicDefinitionEdit-Apply';
    }
    get nameEventEditRefuse() {
        return 'modalDicDefinitionEdit-Refuse';
    }
    get nameEventInfoOk() {
        return 'modalDicDefinitionInfo-OK';
    }
    get eventAddApply() {
        return new CustomEvent(this.nameEventAddApply, { bubbles: true });
    }
    get eventAddRefuse() {
        return new CustomEvent(this.nameEventAddRefuse, { bubbles: true });
    }
    get eventEditApply() {
        return new CustomEvent(this.nameEventEditApply, { bubbles: true });
    }
    get eventEditRefuse() {
        return new CustomEvent(this.nameEventEditRefuse, { bubbles: true });
    }
    get eventInfoOk() {
        return new CustomEvent(this.nameEventInfoOk, { bubbles: true });
    }
    get isCodeString() {
        return isNaN(+this._code.value);
    }
    get isValueString() {
        return isNaN(+this._value.value);
    }
    set toCodeVerify(value) {
        this._code.dataset.verify = value.toString();
    }
    set toValueVerify(value) {
        this._value.dataset.verify = value.toString();
    }
    OpenAdd() {
        this._mode = Mode.Add;
        this._header.innerText = 'Добавить';
        this._imgHeader.src = EditDefinition.imgAdd;
        this._yes.onclick = () => { document.dispatchEvent(this.eventAddApply); };
        this._no.onclick = () => { document.dispatchEvent(this.eventAddRefuse); };
        this.SetButtonDefault();
        this._old = new Definition(0, '', '', '');
        this._new = new Definition(1, '', '', '');
        this.Init();
        this.ShowGets();
        this._modal.style.display = 'block';
    }
    OpenReproduce(rec) {
        this._mode = Mode.Reduce;
        this._header.innerText = 'Размножить';
        this._imgHeader.src = EditDefinition.imgReproduce;
        this._yes.onclick = () => { document.dispatchEvent(this.eventAddApply); };
        this._no.onclick = () => { document.dispatchEvent(this.eventAddRefuse); };
        this.SetButtonDefault();
        this._old = rec;
        this._new = new Definition(rec.primaryKey, rec.code, rec.value, rec.description, rec.dateCreate, rec.dateUpdate);
        this.Init();
        this.ShowGets();
        this._modal.style.display = 'block';
    }
    OpenEdit(rec) {
        this._mode = Mode.Edit;
        this._header.innerText = 'Исправить';
        this._imgHeader.src = EditDefinition.imgEdit;
        this._yes.onclick = () => { document.dispatchEvent(this.eventEditApply); };
        this._no.onclick = () => { document.dispatchEvent(this.eventEditRefuse); };
        this.SetButtonDefault();
        this._old = rec;
        this._new = new Definition(rec.primaryKey, rec.code, rec.value, rec.description, rec.dateCreate, rec.dateUpdate);
        this.Init();
        this.ShowGets();
        this._modal.style.display = 'block';
    }
    OpenInfo(rec) {
        this._mode = Mode.Info;
        this._header.innerText = 'Информация';
        this._imgHeader.src = EditDefinition.imgInfo;
        this._yes.onclick = () => { document.dispatchEvent(this.eventInfoOk); };
        this._no.onclick = () => { document.dispatchEvent(this.eventEditRefuse); };
        this.SetButtonInfo();
        this._old = rec;
        this._new = new Definition(rec.primaryKey, rec.code, rec.value, rec.description, rec.dateCreate, rec.dateUpdate);
        this.Init();
        this._modal.style.display = 'block';
    }
    SetEvents() {
        this._code.addEventListener('input', () => { this.OnInputCode(); }, false);
        this._value.addEventListener('input', () => { this.OnInputValue(); }, false);
        this._description.addEventListener('input', () => { this.OnInputDescription(); }, false);
        document.addEventListener(this.nameEventInfoOk, () => { this._modal.style.display = 'none'; });
    }
    ShowGets() {
        if (this.isCodeString && this.isValueString && ((this._code.value !== this._old.code
            && this._value.value !== this._old.value
            && (this._mode == Mode.Add || this._mode == Mode.Reduce))
            ||
                (this._mode == Mode.Edit && (this._code.value !== this._old.code
                    || this._value.value !== this._old.value
                    || this._description.value !== this._old.description)))
            || this._mode == Mode.Info) {
            this._yes.disabled = false;
        }
        else {
            this._yes.disabled = true;
        }
    }
    Init() {
        this._code.value = this._old.code;
        this._value.value = this._old.value;
        this._description.value = this._old.description;
        if (this._mode == Mode.Add) {
            this._dateCreate.textContent = '';
            this._dateUpdate.textContent = '';
        }
        else {
            this._dateCreate.textContent = dateToString(this._old.dateCreate);
            this._dateUpdate.textContent = dateToString(this._old.dateUpdate);
        }
        this.OnInputCode();
        this.OnInputValue();
        this.OnInputDescription();
        if (this._mode == Mode.Info) {
            this._code.readOnly = true;
            this._value.readOnly = true;
            this._description.readOnly = true;
        }
        else {
            this._code.readOnly = false;
            this._value.readOnly = false;
            this._description.readOnly = false;
        }
    }
    SetButtonDefault() {
        this.ToVisibilityBtn(this._yes);
        this.ToVisibilityBtn(this._no);
        this._yes.innerText = 'Apply';
        this._no.innerText = 'Refuse';
    }
    SetButtonInfo() {
        this.ToVisibilityBtn(this._yes);
        this.ToUnVisibilityBtn(this._no);
        this._yes.innerText = 'OK';
    }
    ToVisibilityBtn(btn) {
        btn.style.position = 'static';
        btn.style.visibility = 'visible';
    }
    ToUnVisibilityBtn(btn) {
        btn.style.position = 'absolute ';
        btn.style.visibility = 'hidden';
    }
    SetCounterCode(isClear = false) {
        this._codeCounter.innerText = `${isClear ? 0 : this._code.value.length} /${Definition.maxLengthCode}`;
    }
    SetCounterValue(isClear = false) {
        this._valueCounter.innerText = `${isClear ? 0 : this._value.value.length} /${Definition.maxLengthValue}`;
    }
    SetCounterDescription() {
        this._descriptionCounter.innerText = `${this._description.value.length} /${Definition.maxLengthDescription}`;
    }
    OnInputCode() {
        if (this.isCodeString) {
            this.toCodeVerify = true;
            this.SetCounterCode();
        }
        else {
            this.toCodeVerify = false;
            this.SetCounterCode(true);
        }
        ;
        this.ShowGets();
    }
    OnInputValue() {
        if (this.isValueString) {
            this.toValueVerify = true;
            this.SetCounterValue();
        }
        else {
            this.toValueVerify = false;
            this.SetCounterValue(true);
        }
        ;
        this.ShowGets();
    }
    OnInputDescription() {
        this.SetCounterDescription();
        this.ShowGets();
    }
}
//# sourceMappingURL=_dicdefinitioneditmoodalform.js.map