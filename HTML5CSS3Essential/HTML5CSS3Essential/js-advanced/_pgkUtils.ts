

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

export enum TypeAction { Add, Edit, Reproduce, Info, Remove, Find, ClearFind };
export enum CommandState { Disable, Enable };

export let dateToString = (dt: Date) => `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}.${dt.getMilliseconds()}`;
export let dateToValue = (dt: Date) => `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`;
export let isDisplayBlock = (element: HTMLElement) =>
    element.style.display === "block" ||
    window.getComputedStyle(element, null)["display"] === "block" ||
    element.style.display === "flex" ||
    window.getComputedStyle(element, null)["display"] === "flex"
    ;

export class Confirm {

    private static _instance: Confirm = undefined;
    private _modal: HTMLElement;
    private _header: HTMLElement;
    private _content: HTMLElement;
    private _yes: HTMLElement;
    private _no: HTMLElement;

    private constructor(
        modal: HTMLElement,
        header: HTMLElement,
        content: HTMLElement,
        yes: HTMLElement,
        no: HTMLElement
    ) {
        this._modal = modal;
        this._header = header;
        this._content = content;
        this._yes = yes;
        this._no = no;
    }

    static get instance(): Confirm {
        return this._instance;
    }

    static Create(
        modal: HTMLElement,
        header: HTMLElement,
        content: HTMLElement,
        yes: HTMLElement,
        no: HTMLElement
    ): void {
        if (!Confirm._instance) {
            this._instance = new Confirm(
                modal,
                header,
                content,
                yes,
                no
            );
        }
    }

    // Name events
    get nameEventDeleteConfirm(): string {
        return 'modalConfirm-delete-confirm';
    }
    get nameEventDeleteRefuse(): string {
        return 'modalConfirm-delete-refuse';
    }
    get nameEventSureConfirm(): string {
        return 'modalConfirm-sure-confirm';
    }
    get nameEventSureRefuse(): string {
        return 'modalConfirm-sure-refuse';
    }
    get nameEventCaution(): string {
        return 'modalConfirm-caution';
    }

    // Events
    private get eventDeleteConfirm(): Event {
        return new CustomEvent(this.nameEventDeleteConfirm, { bubbles: true });
    }
    private get eventDeleteRefuse(): Event {
        return new CustomEvent(this.nameEventDeleteRefuse, { bubbles: true });
    }
    private get eventCaution(): Event {
        return new CustomEvent(this.nameEventCaution, { bubbles: true });
    }

    // Helpers of define
    OpenConfirmDelete(content: string, resolve = null) {
        this._header.innerText = 'Подтвердите удаление';
        this._content.innerText = content;
        this.SetButtonDefault();
        if (resolve) {
            this._yes.onclick = () => { document.dispatchEvent(new CustomEvent(this.nameEventDeleteConfirm, { bubbles: true, detail: { resolve: resolve } })) };
            this._no.onclick = () => { document.dispatchEvent(new CustomEvent(this.nameEventDeleteRefuse, { bubbles: true, detail: { resolve: resolve } })) };
        } else {
            this._yes.onclick = () => { document.dispatchEvent(this.eventDeleteConfirm) };
            this._no.onclick = () => { document.dispatchEvent(this.eventDeleteRefuse) };
        }
        this._modal.style.display = 'block';
    }

    OpenSure(resolve) {
        this._header.innerText = 'Are you sure?';
        this._content.innerText = 'Please confirm the action';
        this.SetButtonDefault();
        this._yes.onclick = () => { document.dispatchEvent(new CustomEvent(this.nameEventSureConfirm, { bubbles: true, detail: { resolve: resolve } })) };
        this._no.onclick = () => { document.dispatchEvent(new CustomEvent(this.nameEventSureRefuse, { bubbles: true, detail: { resolve: resolve } })) };
        this._modal.style.display = 'block';
    }

    OpenCaution(content: string): void {
        this._header.innerText = '!!! Внимание';
        this._content.innerText = content;
        this.SetButtonCaution();
        this._yes.onclick = () => { document.dispatchEvent(this.eventCaution) };
        this._modal.style.display = 'block';
    }

    // Helpers
    private SetButtonDefault(): void {
        this.ToVisibilityBtn(this._yes);
        this.ToVisibilityBtn(this._no);
        this._yes.innerText = 'Confirm';
        this._no.innerText = 'Refuse';
    }

    private SetButtonCaution(): void {
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

}

export interface CountableEqualityComparer<T> {
    primaryKey: number;
    Equals(item: T): boolean;
}

export class SortableUniqueCollection<T extends CountableEqualityComparer<T>> {
    private _isSorted: boolean = false;
    private _isReverseSorted: boolean = false;
    private _sequence: number = 0;

    private _data: T[] = [];

    protected get isSorted(): boolean {
        return this._isSorted;
    }

    protected set isSorted(value: boolean) {
        this._isSorted = value;
    }


    protected get isReverseSorted(): boolean {
        return this._isReverseSorted;
    }

    protected set isReverseSorted(value: boolean) {
        this._isReverseSorted = value;
    }

    protected get data(): T[] {
        return this._data;
    }

    protected set data(value: T[]) {
        this._data = value;
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

    public find(primaryKey: number): T {
        return this.data.find(item => item.primaryKey == primaryKey);
    }

    public isIt(primaryKey: number): boolean {
        return this.data.some(item => item.primaryKey == primaryKey);
    }

    public add(item: T): boolean {
        item.primaryKey = ++this._sequence;
        let unique: boolean = this.data.every(x => !x.Equals(item));
        if (unique) {
            this.data.push(item);
            this._isSorted = false;
            this._isReverseSorted = false;
            return true;
        } else {
            return false;
        }
    }

    public loadItem(rec: T): boolean {
        let unique: boolean = this.data.every(x => !x.Equals(rec));
        if (unique) {
            this._sequence = rec.primaryKey > this._sequence ? rec.primaryKey : this._sequence;
            this.data.push(rec);
            this._isSorted = false;
            this._isReverseSorted = false;
            return true;
        } else {
            return false;
        }
    }

    public remove(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    public clear(): void {
        this.data.length = 0;
    }

    public toString(): string {
        this.ReverseSorted();
        let value: string = this.data.reduce((prev, current) => `${prev}\n${current.toString()}`, '');
        return value;
    }

    protected Sorted() {
        if (!this.isSorted) {
            this.data = this.data.sort((a, b) => a.primaryKey - b.primaryKey);
            this.isSorted = true;
            this.isReverseSorted = false;
        }
    }

    protected ReverseSorted() {
        if (!this.isReverseSorted) {
            this.data = this.data.sort((a, b) => b.primaryKey - a.primaryKey);
            this.isSorted = false;
            this.isReverseSorted = true;
        }
    }

    private *GetValues() {
        for (let i = 0; i < this.data.length; i++) {
            yield this.data[i];
        }
    }
}

export class MarkRow<T extends CountableEqualityComparer<T>> {
    static imgCheckBlankOutlineBlack: string;
    static imgCheckBoxOutline: string;
    protected _checkBox: HTMLInputElement;
    protected _img: HTMLImageElement;
    private _valueRow: T;
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
    get valueRow(): T {
        return this._valueRow;
    }
    set valueRow(value: T) {
        this._valueRow = value;
    }
    get row(): HTMLElement {
        return this._row;
    }
    set row(value: HTMLElement) {
        this._row = value;
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

export class MarkAllRows<T extends CountableEqualityComparer<T>> extends MarkRow<T> {
    constructor(
        checkBox: HTMLInputElement,
        img: HTMLImageElement
    ) {
        super(checkBox, img);
        this.isDisable = true;
        this._eventChangeMarkRow = new CustomEvent('changeMarkAllRows', { bubbles: true, detail: { content: this } })
    }
}

export class ContextMenu {
    private _panel: HTMLElement;
    constructor(
        panel: HTMLElement
    ) {
        this._panel = panel;
        this.SetEvents();
    }

    // Properties
    get isOn(): boolean {
        return isDisplayBlock(this._panel);
    }

    // Methods
    On(e: MouseEvent) {
        let coord = this.GetMouseCoordinates(e);
        if (!this.isOn) {
            this._panel.style.left = `${coord.x}px`;
            this._panel.style.top = `${coord.y}px`;
            this._panel.style.display = 'block';
            setTimeout(() => { this._panel.style.opacity = '1'; }, 50);
        } else {
            this.Off();
            this.On(e);
        }
    }

    Off() {
        if (this.isOn) {
            this._panel.style.opacity = '0';
            setTimeout(() => { this._panel.style.display = 'none'; }, 290);
        }
    }

    // Helpers
    private SetEvents() {
        this._panel.addEventListener('contextmenu', (e) => { e.preventDefault(); this.Off(); }, false);
        this._panel.addEventListener('mouseleave', () => { this.Off(); }, false);
        this._panel.addEventListener('click', () => { this.Off(); }, false);
        window.addEventListener('resize', () => { this.Off(); }, false);
        window.addEventListener('scroll', () => { this.Off(); }, false);
    }

    private GetMouseCoordinates(e: MouseEvent) {
        let pageX: number = 0;
        let pageY: number = 0;
        if (e.pageX || e.pageY) {
            pageX = e.pageX - 10;
            pageY = e.pageY - document.documentElement.scrollTop - 21;
        } else if (e.clientX || e.clientY) {
            pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return {
            x: pageX,
            y: pageY
        }
    }
}

interface ICommandAction {
    (): void;
}

export class Command {
    static eventNameChangeState: string = 'command-change-state';
    // Fields
    private _name: string;
    private _typeAction: TypeAction;
    private _state: CommandState;
    private _action: ICommandAction;
    private _context;

    constructor(
        name: string,
        typeAction: TypeAction,
        state: CommandState,
        action: ICommandAction,
        context
    ) {
        this._name = name;
        this._typeAction = typeAction;
        this._state = state;
        this._action = action;
        this._context = context;
    }

    // Properties
    get name(): string {
        return this._name;
    }
    get typeAction(): TypeAction {
        return this._typeAction;
    }
    get state(): CommandState {
        return this._state;
    }
    set state(value: CommandState) {
        this._state = value;
        document.dispatchEvent(this.eventChangeState);
    }
    get isEnabled(): boolean {
        return this.state == CommandState.Enable ? true : false;
    }
    // Events
    private get eventChangeState(): CustomEvent {
        return new CustomEvent(Command.eventNameChangeState, { bubbles: true, detail: { command: this } });
    }

    // Methods
    Execute(): void {
        if (this.isEnabled) {
            this._action.call(this._context);
        }
    }

}

export class Control {
    private _element: HTMLElement;
    private _command: Command;
    constructor(
        element: HTMLElement,
        command: Command
    ) {
        this._element = element;
        this._command = command;
        this.Installation();
    }
    get element(): HTMLElement {
        return this._element;
    }
    get command(): Command {
        return this._command;
    }
    get isEnabled(): boolean {
        if (this.element.dataset.enabled) {
            return this.element.dataset.enabled == true.toString() ? true : false;
        } else {
            return false;
        }
    }
    set isEnabled(value: boolean) {
        this.element.dataset.enabled = value.toString();
    }
    // Helpers
    private Installation() {
        this.isEnabled = this.command.isEnabled;
        this.element.addEventListener('click', () => { this.command.Execute(); }, false);
        document.addEventListener(Command.eventNameChangeState, (e: CustomEvent) => { this.OnCommandChangeState(e); }, false);
    }
    private OnCommandChangeState(e: CustomEvent) {
        if (e.detail.command) {
            let cmd = <Command>e.detail.command;
            if (this.command.name == cmd.name) {
                this.isEnabled = cmd.isEnabled;
            }
        }
    }

}

