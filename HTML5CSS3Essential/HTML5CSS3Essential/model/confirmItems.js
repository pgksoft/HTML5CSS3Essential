export class ConfirmItems {
    constructor(confirm, header, about, yes, no) {
        this._confirm = confirm;
        this._header = header;
        this._about = about;
        this._yes = yes;
        this._no = no;
    }
    static get instance() {
        if (!ConfirmItems._instance) {
            throw new Error('Instance of ../../../../model/confirmItems.ts was not created.');
        }
        return ConfirmItems._instance;
    }
    get confirm() { return this._confirm; }
    get header() { return this._header; }
    get about() { return this._about; }
    get yes() { return this._yes; }
    get no() { return this._no; }
    static Create(confirm, header, about, yes, no) {
        if (!ConfirmItems._instance) {
            this._instance = new ConfirmItems(confirm, header, about, yes, no);
        }
        return ConfirmItems._instance;
    }
}
ConfirmItems._instance = undefined;
//# sourceMappingURL=confirmItems.js.map