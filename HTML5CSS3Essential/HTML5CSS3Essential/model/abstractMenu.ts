export enum MenuSelectionRule { One, Several };

export abstract class Menu {
    static cssDefault: string = 'default';
    static cssActive: string = 'active';
    private _box: HTMLElement;
    private _isActive: boolean = false;
    constructor(box: HTMLElement) {
        this._box = box;
    }
    get box(): HTMLElement {
        return this._box;
    }
    get isActive(): boolean {
        return this._isActive;
    }
    set isActive(value: boolean) {
        this._isActive = value;
    }
    protected SetClick(): void {
        this.box.addEventListener('click', () => {
            this.OnClick();
        }, false);
    }
    abstract OnClick(): void;
    UnActive(): void {
        if (!this.box.classList.contains(Menu.cssDefault)) {
            this.box.classList.add(Menu.cssDefault);
        };
        if (this.box.classList.contains(Menu.cssActive)) {
            this.box.classList.remove(Menu.cssActive);
        };
        this.isActive = false;
    }
    ToActive(): void {
        this.isActive = true;
        this.box.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
        if (this.box.classList.contains(Menu.cssDefault)) {
            this.box.classList.remove(Menu.cssDefault);
        };
        if (!this.box.classList.contains(Menu.cssActive)) {
            this.box.classList.add(Menu.cssActive);
        };
    }
    // use for OnClick in first line 
    protected SetActive(rule: MenuSelectionRule): void {
        if (rule === MenuSelectionRule.Several) {
            if (this.isActive) {
                this.UnActive();
            } else {
                this.ToActive();
            }
        } else if (rule === MenuSelectionRule.One) {
            this.ToActive();
        }
    }
}