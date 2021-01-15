import { CountableEqualityComparer, SortableUniqueCollection, dateToString } from "../../../js-advanced/_pgkutils.js";
import { RecDefinition } from "./_firstwebdb.js";

export enum SortKind { Key, Code, Value, Create, Update };
enum SortState { No, Ascending, Descending };

export interface IDicDefinition<T> extends CountableEqualityComparer<T> {
    primaryKey: number;
    code: string;
    value: string;
    description: string;
    dateCreate: Date;
    dateUpdate: Date;
    Equals(item: T): boolean;
}

export class DicDefinitionSortable<T extends IDicDefinition<T>> extends SortableUniqueCollection<T>{
    private _sortKind: SortKind = SortKind.Key;
    private _sortState: SortState = SortState.No;
    get sortKind(): SortKind {
        return this._sortKind;
    }
    set sortKind(value: SortKind) {
        this._sortKind = value;
    }

    get IsMustBeSorted(): boolean {
        return this._sortKind != SortKind.Key;
    }

    get sorted(): IterableIterator<T> {
        if (this._sortState == SortState.Ascending || this._sortState == SortState.No) {
            return this.list;
        } else {
            return this.reverseList;
        }
    }

    updateItem(rec: T): boolean {
        if (this.data.some(item => item.primaryKey == rec.primaryKey)) {
            let item = this.data.find(item => item.primaryKey == rec.primaryKey);
            item.code = rec.code;
            item.value = rec.value;
            item.description = rec.description;
            item.dateUpdate = rec.dateUpdate;
            return true;
        } else {
            return false;
        }
    }

    Includes(element: T): boolean {
        return this.data.some(item => item.Equals(element));
    }

    protected Sorted() {
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

    protected ReverseSorted() {
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

    NextSortStep(kind: SortKind): void {
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

export class Definition implements IDicDefinition<Definition> {
    static maxLengthCode: number = 20;
    static maxLengthValue: number = 160;
    static maxLengthDescription: number = 4000;
    static maxLengthPriamryKeyToString: number = 2;
    static maxLengthValueToString: number = 10;
    private _primaryKey: number;
    private _code: string;
    private _value: string;
    private _description: string;
    private _dateCreate: Date;
    private _dateUpdate: Date;
    constructor(
        primaryKey: number,
        code: string,
        value: string,
        description: string = '',
        dateCreate: Date = new Date(Date.now()),
        dateUpdate: Date = dateCreate
    ) {
        this._primaryKey = primaryKey;
        this._code = code;
        this._value = value;
        this._description = description;
        this._dateCreate = dateCreate;
        this._dateUpdate = dateUpdate;
    }
    get primaryKey(): number {
        return this._primaryKey;
    }
    set primaryKey(value: number) {
        this._primaryKey = value;
    }
    get code(): string {
        return this._code;
    }
    set code(value: string) {
        this.dateUpdate = new Date(Date.now());
        this._code = value;
    }
    get value(): string {
        return this._value;
    }
    set value(value: string) {
        this.dateUpdate = new Date(Date.now());
        this._value = value;
    }
    get description(): string {
        return this._description;
    }
    set description(value: string) {
        this.dateUpdate = new Date(Date.now());
        this._description = value;
    }
    get dateCreate(): Date {
        return this._dateCreate;
    }
    set dateCreate(value: Date) {
        this._dateCreate = value;
    }
    get dateUpdate(): Date {
        return this._dateUpdate;
    }
    set dateUpdate(value: Date) {
        this._dateUpdate = value;
    }
    Equals(item: Definition): boolean {
        return item.primaryKey == this.primaryKey || item.code === this.code || item.value === this.value;
    }
    toString(): string {
        return ` ${this.primaryKey.toString().padStart(Definition.maxLengthPriamryKeyToString)} |` +
            ` ${this.code.padEnd(Definition.maxLengthCode)} |` +
            ` ${this.value.padEnd(Definition.maxLengthValueToString)} |` +
            ` ${dateToString(this.dateUpdate)} |` +
            ` ${dateToString(this.dateCreate)} |` +
            ` ${this.description}`;
    }
}

export class FindParms {
    isCreationDate: boolean;
    isDateOfChange: boolean;
    noDate: boolean;
    periodFrom: Date;
    periodTo: Date;
    code: string;
    value: string;
}

export class FindDefinition {

    private static _instance: FindDefinition;
    private _modal: HTMLElement;
    private _yes: HTMLElement;
    private _no: HTMLElement;
    private _isCreationDate: HTMLInputElement;
    private _isDateOfChange: HTMLInputElement;
    private _noDate: HTMLInputElement;
    private _periodFrom: HTMLInputElement;
    private _periodTo: HTMLInputElement;
    private _code: HTMLInputElement;
    private _value: HTMLInputElement;
    private _current: FindParms = new FindParms();

    private constructor(
        modal: HTMLElement,
        isCreationDate: HTMLInputElement,
        isDateOfChange: HTMLInputElement,
        noDate: HTMLInputElement,
        periodFrom: HTMLInputElement,
        periodTo: HTMLInputElement,
        code: HTMLInputElement,
        value: HTMLInputElement,
        yes: HTMLElement,
        no: HTMLElement
    ) {
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
    static get instance(): FindDefinition {
        return this._instance;
    }
    static Create(
        modal: HTMLElement,
        isCreationDate: HTMLInputElement,
        isDateOfChange: HTMLInputElement,
        noDate: HTMLInputElement,
        periodFrom: HTMLInputElement,
        periodTo: HTMLInputElement,
        code: HTMLInputElement,
        value: HTMLInputElement,
        yes: HTMLElement,
        no: HTMLElement
    ): void {
        if (!FindDefinition._instance) {
            this._instance = new FindDefinition(
                modal,
                isCreationDate,
                isDateOfChange,
                noDate,
                periodFrom,
                periodTo,
                code,
                value,
                yes,
                no
            );
        }
    }
    // Properties
    get current(): FindParms {
        return this._current;
    }
    set current(value: FindParms) {
        this._current = value;
    }
    // Properties: Name events
    get nameEventApply(): string {
        return 'modalDicDefinitionFind-Apply';
    }
    get nameEventRefuse(): string {
        return 'modalDicDefinitionFind-Refuse';
    }
    // Properties: Events
    private get eventApply(): Event {
        return new CustomEvent(this.nameEventApply, { bubbles: true });
    }
    private get eventRefuse(): Event {
        return new CustomEvent(this.nameEventRefuse, { bubbles: true });
    }
    // Helpers of define
    SetCurrent(): void {
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
    isFind(): boolean {
        let isFind: boolean = false;
        if (
            this._isCreationDate.checked ||
            this._isDateOfChange.checked ||
            this._code.value.length > 0 ||
            this._value.value.length > 0) isFind = true;
        return isFind;
    }
    isSatisfy(item: RecDefinition): boolean {
        return (!this.current.isCreationDate || this.current.isCreationDate && this.current.periodFrom <= item.dateCreate && item.dateCreate <= this.current.periodTo)
            && (!this.current.isDateOfChange || this.current.isDateOfChange && this.current.periodFrom <= item.dateUpdate && item.dateUpdate <= this.current.periodTo)
            && (this.current.code.length == 0 || this.current.code.length > 0 && item.code.includes(this.current.code))
            && (this.current.value.length == 0 || this.current.value.length > 0 && item.value.includes(this.current.value));
    }
    Clear(): void {
        this._noDate.checked = true;
        this._code.value = '';
        this._value.value = '';
        this.SetCurrent();
    }
    Show(idom: HTMLElement): void {
        idom.innerHTML = '';
        let span = document.createElement('span');
        if (this._isCreationDate.checked) { span.innerHTML = 'Дата создания: '; }
        else if (this._isDateOfChange.checked) { span.innerHTML = 'Дата изменения: '; };
        if (!this._noDate.checked) {
            let from: Date = new Date(this._periodFrom.value);
            let to: Date = new Date(this._periodTo.value);
            span.innerHTML += `с <b>${from.toLocaleDateString()}</b> по <b>${to.toLocaleDateString()}</b>;  `;
        }
        if (this._code.value.length > 0) {
            span.innerHTML += `ключ: <b>${this._code.value}</b>;  `
        }
        if (this._value.value.length > 0) {
            span.innerHTML += `значение: <b>${this._value.value}</b>;  `
        }
        idom.appendChild(span);
    }
}

enum Mode { Add, Edit, Reduce, Info };

export class EditDefinition {

    private static _instance: EditDefinition;
    private _modal: HTMLElement;
    private _header: HTMLElement;
    private _imgHeader: HTMLImageElement;
    private _code: HTMLInputElement;
    private _codeCounter: HTMLElement;
    private _value: HTMLInputElement;
    private _valueCounter: HTMLElement;
    private _description: HTMLTextAreaElement;
    private _descriptionCounter: HTMLElement;
    private _dateCreate: HTMLElement;
    private _dateUpdate: HTMLElement;
    private _yes: HTMLButtonElement;
    private _no: HTMLButtonElement;
    //
    static imgAdd: string;
    static imgEdit: string;
    static imgReproduce: string;
    static imgInfo: string;
    //
    private _mode: Mode;
    private _old: Definition;
    private _new: Definition;

    private constructor(
        modal: HTMLElement,
        header: HTMLElement,
        imgHeader: HTMLImageElement,
        code: HTMLInputElement,
        codeCounter: HTMLElement,
        value: HTMLInputElement,
        valueCounter: HTMLElement,
        description: HTMLTextAreaElement,
        descriptionCounter: HTMLElement,
        dateCreate: HTMLElement,
        dateUpdate: HTMLElement,
        yes: HTMLButtonElement,
        no: HTMLButtonElement
    ) {
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

    static get instance(): EditDefinition {
        return this._instance;
    }
    static Create(
        modal: HTMLElement,
        header: HTMLElement,
        imgHeader: HTMLImageElement,
        code: HTMLInputElement,
        codeCounter: HTMLElement,
        value: HTMLInputElement,
        valueCounter: HTMLElement,
        description: HTMLTextAreaElement,
        descriptionCounter: HTMLElement,
        dateCreate: HTMLElement,
        dateUpdate: HTMLElement,
        yes: HTMLButtonElement,
        no: HTMLButtonElement
    ): void {
        if (!EditDefinition._instance) {
            this._instance = new EditDefinition(
                modal,
                header,
                imgHeader,
                code,
                codeCounter,
                value,
                valueCounter,
                description,
                descriptionCounter,
                dateCreate,
                dateUpdate,
                yes,
                no
            );
        }
    }

    // Properties: Name events
    get nameEventAddApply(): string {
        return 'modalDicDefinitionAdd-Apply';
    }
    get nameEventAddRefuse(): string {
        return 'modalDicDefinitionAdd-Refuse';
    }
    get nameEventEditApply(): string {
        return 'modalDicDefinitionEdit-Apply';
    }
    get nameEventEditRefuse(): string {
        return 'modalDicDefinitionEdit-Refuse';
    }
    get nameEventInfoOk(): string {
        return 'modalDicDefinitionInfo-OK';
    }

    // Properties: Events
    private get eventAddApply(): Event {
        return new CustomEvent(this.nameEventAddApply, { bubbles: true });
    }
    private get eventAddRefuse(): Event {
        return new CustomEvent(this.nameEventAddRefuse, { bubbles: true });
    }
    private get eventEditApply(): Event {
        return new CustomEvent(this.nameEventEditApply, { bubbles: true });
    }
    private get eventEditRefuse(): Event {
        return new CustomEvent(this.nameEventEditRefuse, { bubbles: true });
    }
    private get eventInfoOk(): Event {
        return new CustomEvent(this.nameEventInfoOk, { bubbles: true });
    }

    // Properties of fields
    private get isCodeString(): boolean {
        return isNaN(+this._code.value);
    }
    private get isValueString(): boolean {
        return isNaN(+this._value.value);
    }
    private set toCodeVerify(value: boolean) {
        this._code.dataset.verify = value.toString();
    }
    private set toValueVerify(value: boolean) {
        this._value.dataset.verify = value.toString();
    }

    // Helpers of define
    OpenAdd() {
        this._mode = Mode.Add;
        this._header.innerText = 'Добавить';
        this._imgHeader.src = EditDefinition.imgAdd;
        this._yes.onclick = () => { document.dispatchEvent(this.eventAddApply) };
        this._no.onclick = () => { document.dispatchEvent(this.eventAddRefuse) };
        this.SetButtonDefault();
        this._old = new Definition(0, '', '', '');
        this._new = new Definition(1, '', '', '');
        this.Init();
        this.ShowGets();
        this._modal.style.display = 'block';
    }

    OpenReproduce(rec: Definition) {
        this._mode = Mode.Reduce;
        this._header.innerText = 'Размножить';
        this._imgHeader.src = EditDefinition.imgReproduce;
        this._yes.onclick = () => { document.dispatchEvent(this.eventAddApply) };
        this._no.onclick = () => { document.dispatchEvent(this.eventAddRefuse) };
        this.SetButtonDefault();
        this._old = rec;
        this._new = new Definition(
            rec.primaryKey,
            rec.code,
            rec.value,
            rec.description,
            rec.dateCreate,
            rec.dateUpdate
        );
        this.Init();
        this.ShowGets();
        this._modal.style.display = 'block';
    }

    OpenEdit(rec: Definition) {
        this._mode = Mode.Edit;
        this._header.innerText = 'Исправить';
        this._imgHeader.src = EditDefinition.imgEdit;
        this._yes.onclick = () => { document.dispatchEvent(this.eventEditApply) };
        this._no.onclick = () => { document.dispatchEvent(this.eventEditRefuse) };
        this.SetButtonDefault();
        this._old = rec;
        this._new = new Definition(
            rec.primaryKey,
            rec.code,
            rec.value,
            rec.description,
            rec.dateCreate,
            rec.dateUpdate
        );
        this.Init();
        this.ShowGets();
        this._modal.style.display = 'block';
    }

    OpenInfo(rec: Definition) {
        this._mode = Mode.Info;
        this._header.innerText = 'Информация';
        this._imgHeader.src = EditDefinition.imgInfo;
        this._yes.onclick = () => { document.dispatchEvent(this.eventInfoOk) };
        this._no.onclick = () => { document.dispatchEvent(this.eventEditRefuse) };
        this.SetButtonInfo();
        this._old = rec;
        this._new = new Definition(
            rec.primaryKey,
            rec.code,
            rec.value,
            rec.description,
            rec.dateCreate,
            rec.dateUpdate
        );
        this.Init();
        this._modal.style.display = 'block';
    }

    // Helpers
    private SetEvents(): void {
        this._code.addEventListener('input', () => { this.OnInputCode(); }, false);
        this._value.addEventListener('input', () => { this.OnInputValue(); }, false);
        this._description.addEventListener('input', () => { this.OnInputDescription(); }, false);
        document.addEventListener(this.nameEventInfoOk, () => { this._modal.style.display = 'none'; });
    }

    private ShowGets(): void {
        // Set state of apply button
        if (
            this.isCodeString && this.isValueString && (
                (
                    this._code.value !== this._old.code
                    && this._value.value !== this._old.value
                    && (this._mode == Mode.Add || this._mode == Mode.Reduce)
                )
                ||
                (
                    this._mode == Mode.Edit && (
                        this._code.value !== this._old.code
                        || this._value.value !== this._old.value
                        || this._description.value !== this._old.description
                    )
                )

            )
            || this._mode == Mode.Info
        ) {
            this._yes.disabled = false;
        } else {
            this._yes.disabled = true;
        }
    }

    private Init(): void {
        this._code.value = this._old.code;
        this._value.value = this._old.value;
        this._description.value = this._old.description;
        if (this._mode == Mode.Add) {
            this._dateCreate.textContent = '';
            this._dateUpdate.textContent = '';
        } else {
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
        } else {
            this._code.readOnly = false;
            this._value.readOnly = false;
            this._description.readOnly = false;
        }
    }

    private SetButtonDefault(): void {
        this.ToVisibilityBtn(this._yes);
        this.ToVisibilityBtn(this._no);
        this._yes.innerText = 'Apply';
        this._no.innerText = 'Refuse';
    }

    private SetButtonInfo(): void {
        this.ToVisibilityBtn(this._yes);
        this.ToUnVisibilityBtn(this._no);
        this._yes.innerText = 'OK';
    }

    private ToVisibilityBtn(btn: HTMLElement) {
        btn.style.position = 'static';
        btn.style.visibility = 'visible';
    }

    private ToUnVisibilityBtn(btn: HTMLElement) {
        btn.style.position = 'absolute ';
        btn.style.visibility = 'hidden';
    }

    private SetCounterCode(isClear: boolean = false): void {
        this._codeCounter.innerText = `${isClear ? 0 : this._code.value.length} /${Definition.maxLengthCode}`;
    }

    private SetCounterValue(isClear: boolean = false): void {
        this._valueCounter.innerText = `${isClear ? 0 : this._value.value.length} /${Definition.maxLengthValue}`;
    }

    private SetCounterDescription(): void {
        this._descriptionCounter.innerText = `${this._description.value.length} /${Definition.maxLengthDescription}`;
    }

    private OnInputCode(): void {
        if (this.isCodeString) {
            this.toCodeVerify = true;
            this.SetCounterCode();
        } else {
            this.toCodeVerify = false;
            this.SetCounterCode(true);
        };
        this.ShowGets();
    }

    private OnInputValue(): void {
        if (this.isValueString) {
            this.toValueVerify = true;
            this.SetCounterValue();
        } else {
            this.toValueVerify = false;
            this.SetCounterValue(true);
        };
        this.ShowGets();
    }

    private OnInputDescription(): void {
        this.SetCounterDescription();
        this.ShowGets();
    }

}

