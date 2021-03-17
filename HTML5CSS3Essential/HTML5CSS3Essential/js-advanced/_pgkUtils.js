if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
export var TypeAction;
(function (TypeAction) {
    TypeAction[TypeAction["Add"] = 0] = "Add";
    TypeAction[TypeAction["Edit"] = 1] = "Edit";
    TypeAction[TypeAction["Reproduce"] = 2] = "Reproduce";
    TypeAction[TypeAction["Info"] = 3] = "Info";
    TypeAction[TypeAction["Remove"] = 4] = "Remove";
    TypeAction[TypeAction["Find"] = 5] = "Find";
    TypeAction[TypeAction["ClearFind"] = 6] = "ClearFind";
    TypeAction[TypeAction["SelectLocalFiles"] = 7] = "SelectLocalFiles";
    TypeAction[TypeAction["IsSelected"] = 8] = "IsSelected";
    TypeAction[TypeAction["ToState"] = 9] = "ToState";
})(TypeAction || (TypeAction = {}));
;
export var CommandState;
(function (CommandState) {
    CommandState[CommandState["Disable"] = 0] = "Disable";
    CommandState[CommandState["Enable"] = 1] = "Enable";
})(CommandState || (CommandState = {}));
;
export let dateToString = (dt) => `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}.${dt.getMilliseconds()}`;
export let dateToValue = (dt) => `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`;
export let isDisplayBlock = (element) => element.style.display === "block" ||
    window.getComputedStyle(element, null)["display"] === "block" ||
    element.style.display === "flex" ||
    window.getComputedStyle(element, null)["display"] === "flex";
export let requestFrame = (callback) => {
    var f = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 300);
        };
    f(callback);
};
export const CustomEventChangeMarkAllRows = 'changeMarkAllRows';
export const CustomEventchangeMarkRow = 'changeMarkRow';
export class Confirm {
    constructor(modal, header, content, yes, no) {
        this._modal = modal;
        this._header = header;
        this._content = content;
        this._yes = yes;
        this._no = no;
    }
    static get instance() {
        return this._instance;
    }
    static Create(modal, header, content, yes, no) {
        if (!Confirm._instance) {
            this._instance = new Confirm(modal, header, content, yes, no);
        }
    }
    get nameEventDeleteConfirm() {
        return 'modalConfirm-delete-confirm';
    }
    get nameEventDeleteRefuse() {
        return 'modalConfirm-delete-refuse';
    }
    get nameEventSureConfirm() {
        return 'modalConfirm-sure-confirm';
    }
    get nameEventSureRefuse() {
        return 'modalConfirm-sure-refuse';
    }
    get nameEventCaution() {
        return 'modalConfirm-caution';
    }
    get eventDeleteConfirm() {
        return new CustomEvent(this.nameEventDeleteConfirm, { bubbles: true });
    }
    get eventDeleteRefuse() {
        return new CustomEvent(this.nameEventDeleteRefuse, { bubbles: true });
    }
    get eventCaution() {
        return new CustomEvent(this.nameEventCaution, { bubbles: true });
    }
    OpenConfirmDelete(content, resolve = null) {
        this._header.innerText = 'Подтвердите удаление';
        this._content.innerText = content;
        this.SetButtonDefault();
        if (resolve) {
            this._yes.onclick = () => { document.dispatchEvent(new CustomEvent(this.nameEventDeleteConfirm, { bubbles: true, detail: { resolve: resolve('yes') } })); };
            this._no.onclick = () => { document.dispatchEvent(new CustomEvent(this.nameEventDeleteRefuse, { bubbles: true, detail: { resolve: resolve('no') } })); };
        }
        else {
            this._yes.onclick = () => { document.dispatchEvent(this.eventDeleteConfirm); };
            this._no.onclick = () => { document.dispatchEvent(this.eventDeleteRefuse); };
        }
        this._modal.style.display = 'block';
    }
    OpenSure(resolve) {
        this._header.innerText = 'Are you sure?';
        this._content.innerText = 'Please confirm the action';
        this.SetButtonDefault();
        this._yes.onclick = () => { document.dispatchEvent(new CustomEvent(this.nameEventSureConfirm, { bubbles: true, detail: { resolve: resolve('yes') } })); };
        this._no.onclick = () => { document.dispatchEvent(new CustomEvent(this.nameEventSureRefuse, { bubbles: true, detail: { resolve: resolve('no') } })); };
        this._modal.style.display = 'block';
    }
    OpenCaution(content) {
        this._header.innerText = '!!! Внимание';
        this._content.innerText = content;
        this.SetButtonCaution();
        this._yes.onclick = () => { document.dispatchEvent(this.eventCaution); };
        this._modal.style.display = 'block';
    }
    SetButtonDefault() {
        this.ToVisibilityBtn(this._yes);
        this.ToVisibilityBtn(this._no);
        this._yes.innerText = 'Confirm';
        this._no.innerText = 'Refuse';
    }
    SetButtonCaution() {
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
}
Confirm._instance = undefined;
export class SortableUniqueCollection {
    constructor() {
        this._isSorted = false;
        this._isReverseSorted = false;
        this._sequence = 0;
        this._data = [];
    }
    get isSorted() {
        return this._isSorted;
    }
    set isSorted(value) {
        this._isSorted = value;
    }
    get isReverseSorted() {
        return this._isReverseSorted;
    }
    set isReverseSorted(value) {
        this._isReverseSorted = value;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
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
    find(primaryKey) {
        return this.data.find(item => item.primaryKey == primaryKey);
    }
    isIt(primaryKey) {
        return this.data.some(item => item.primaryKey == primaryKey);
    }
    add(item) {
        item.primaryKey = ++this._sequence;
        let unique = this.data.every(x => !x.Equals(item));
        if (unique) {
            this.data.push(item);
            this._isSorted = false;
            this._isReverseSorted = false;
            return true;
        }
        else {
            return false;
        }
    }
    loadItem(rec) {
        let unique = this.data.every(x => !x.Equals(rec));
        if (unique) {
            this._sequence = rec.primaryKey > this._sequence ? rec.primaryKey : this._sequence;
            this.data.push(rec);
            this._isSorted = false;
            this._isReverseSorted = false;
            return true;
        }
        else {
            return false;
        }
    }
    remove(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    clear() {
        this.data.length = 0;
    }
    toString() {
        this.ReverseSorted();
        let value = this.data.reduce((prev, current) => `${prev}\n${current.toString()}`, '');
        return value;
    }
    Sorted() {
        if (!this.isSorted) {
            this.data = this.data.sort((a, b) => a.primaryKey - b.primaryKey);
            this.isSorted = true;
            this.isReverseSorted = false;
        }
    }
    ReverseSorted() {
        if (!this.isReverseSorted) {
            this.data = this.data.sort((a, b) => b.primaryKey - a.primaryKey);
            this.isSorted = false;
            this.isReverseSorted = true;
        }
    }
    *GetValues() {
        for (let i = 0; i < this.data.length; i++) {
            yield this.data[i];
        }
    }
}
export class MarkRow {
    constructor(checkBox, img) {
        this._eventChangeMarkRow = new CustomEvent(CustomEventchangeMarkRow, { bubbles: true, detail: { content: this } });
        this._checkBox = checkBox;
        this._img = img;
        this._img.src = MarkRow.imgCheckBlankOutlineBlack;
        this._checkBox.addEventListener('change', () => { this.OnChange(); }, false);
    }
    get valueRow() {
        return this._valueRow;
    }
    set valueRow(value) {
        this._valueRow = value;
    }
    get row() {
        return this._row;
    }
    set row(value) {
        this._row = value;
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
export class MarkAllRows extends MarkRow {
    constructor(checkBox, img) {
        super(checkBox, img);
        this.isDisable = true;
        this._eventChangeMarkRow = new CustomEvent(CustomEventChangeMarkAllRows, { bubbles: true, detail: { content: this } });
    }
}
export class ContextMenu {
    constructor(panel) {
        this._panel = panel;
        this.SetEvents();
    }
    get isOn() {
        return isDisplayBlock(this._panel);
    }
    On(e) {
        let coord = this.GetMouseCoordinates(e);
        if (!this.isOn) {
            this._panel.style.left = `${coord.x}px`;
            this._panel.style.top = `${coord.y}px`;
            this._panel.style.display = 'block';
            setTimeout(() => { this._panel.style.opacity = '1'; }, 50);
        }
        else {
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
    SetEvents() {
        this._panel.addEventListener('contextmenu', (e) => { e.preventDefault(); this.Off(); }, false);
        this._panel.addEventListener('mouseleave', () => { this.Off(); }, false);
        this._panel.addEventListener('click', () => { this.Off(); }, false);
        window.addEventListener('resize', () => { this.Off(); }, false);
        window.addEventListener('scroll', () => { this.Off(); }, false);
    }
    GetMouseCoordinates(e) {
        let pageX = 0;
        let pageY = 0;
        if (e.pageX || e.pageY) {
            pageX = e.pageX - 10;
            pageY = e.pageY - document.documentElement.scrollTop - 21;
        }
        else if (e.clientX || e.clientY) {
            pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return {
            x: pageX,
            y: pageY
        };
    }
}
export class Command {
    constructor(name, typeAction, state, action, context) {
        this._name = name;
        this._typeAction = typeAction;
        this._state = state;
        this._action = action;
        this._context = context;
    }
    get name() {
        return this._name;
    }
    get typeAction() {
        return this._typeAction;
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
        document.dispatchEvent(this.eventChangeState);
    }
    get isEnabled() {
        return this.state == CommandState.Enable ? true : false;
    }
    get eventChangeState() {
        return new CustomEvent(Command.eventNameChangeState, { bubbles: true, detail: { command: this } });
    }
    Execute() {
        if (this.isEnabled) {
            this._action.call(this._context);
        }
    }
}
Command.eventNameChangeState = 'command-change-state';
export class Control {
    constructor(element, command) {
        this._element = element;
        this._command = command;
        this.Installation();
    }
    get element() {
        return this._element;
    }
    get command() {
        return this._command;
    }
    get isEnabled() {
        if (this.element.dataset.enabled) {
            return this.element.dataset.enabled == true.toString() ? true : false;
        }
        else {
            return false;
        }
    }
    set isEnabled(value) {
        this.element.dataset.enabled = value.toString();
    }
    Installation() {
        this.isEnabled = this.command.isEnabled;
        this.element.addEventListener('click', () => { this.command.Execute(); }, false);
        document.addEventListener(Command.eventNameChangeState, (e) => { this.OnCommandChangeState(e); }, false);
    }
    OnCommandChangeState(e) {
        if (e.detail.command) {
            let cmd = e.detail.command;
            if (this.command.name == cmd.name) {
                this.isEnabled = cmd.isEnabled;
            }
        }
    }
}
//# sourceMappingURL=_pgkUtils.js.map