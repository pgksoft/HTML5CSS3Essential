export class ConfirmItems {
    private constructor(
        confirm: HTMLElement,
        header: HTMLElement,
        about: HTMLElement,
        yes: HTMLElement,
        no: HTMLElement
    ) {
        this._confirm = confirm;
        this._header = header;
        this._about = about;
        this._yes = yes;
        this._no = no;
    }

    // Fields
    private static _instance: ConfirmItems = undefined;
    private _confirm: HTMLElement;
    private _header: HTMLElement;
    private _about: HTMLElement;
    private _yes: HTMLElement;
    private _no: HTMLElement;

    // Properties
    static get instance(): ConfirmItems {
        if (!ConfirmItems._instance) {
            throw new Error('Instance of ../../../../model/confirmItems.ts was not created.');
        }
        return ConfirmItems._instance;
    }
    get confirm(): HTMLElement { return this._confirm; }
    get header(): HTMLElement { return this._header; }
    get about(): HTMLElement { return this._about; }
    get yes(): HTMLElement { return this._yes; }
    get no(): HTMLElement { return this._no; }

    // Methods
    static Create(
        confirm: HTMLElement,
        header: HTMLElement,
        about: HTMLElement,
        yes: HTMLElement,
        no: HTMLElement
    ): ConfirmItems {
        if (!ConfirmItems._instance) {
            this._instance = new ConfirmItems(
                confirm,
                header,
                about,
                yes,
                no
            )
        }
        return ConfirmItems._instance;
    }
}