export var MenuSelectionRule;
(function (MenuSelectionRule) {
    MenuSelectionRule[MenuSelectionRule["One"] = 0] = "One";
    MenuSelectionRule[MenuSelectionRule["Several"] = 1] = "Several";
})(MenuSelectionRule || (MenuSelectionRule = {}));
;
export class Menu {
    constructor(box) {
        this._isActive = false;
        this._box = box;
    }
    get box() {
        return this._box;
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = value;
    }
    SetClick() {
        this.box.addEventListener('click', () => {
            this.OnClick();
        }, false);
    }
    UnActive() {
        if (!this.box.classList.contains(Menu.cssDefault)) {
            this.box.classList.add(Menu.cssDefault);
        }
        ;
        if (this.box.classList.contains(Menu.cssActive)) {
            this.box.classList.remove(Menu.cssActive);
        }
        ;
        this.isActive = false;
    }
    ToActive() {
        this.isActive = true;
        this.box.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
        if (this.box.classList.contains(Menu.cssDefault)) {
            this.box.classList.remove(Menu.cssDefault);
        }
        ;
        if (!this.box.classList.contains(Menu.cssActive)) {
            this.box.classList.add(Menu.cssActive);
        }
        ;
    }
    SetActive(rule) {
        if (rule === MenuSelectionRule.Several) {
            if (this.isActive) {
                this.UnActive();
            }
            else {
                this.ToActive();
            }
        }
        else if (rule === MenuSelectionRule.One) {
            this.ToActive();
        }
    }
}
Menu.cssDefault = 'default';
Menu.cssActive = 'active';
//# sourceMappingURL=abstractMenu.js.map