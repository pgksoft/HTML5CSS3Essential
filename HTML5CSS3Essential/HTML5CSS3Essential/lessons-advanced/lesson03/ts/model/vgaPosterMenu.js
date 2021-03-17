import { Menu, MenuSelectionRule } from '../../../../model/abstractMenu.js';
export class PosterMenu extends Menu {
    constructor(box, content) {
        super(box);
        this._content = content;
        this.SetClick();
    }
    get content() { return this._content; }
    OnClick() {
        this.SetActive(MenuSelectionRule.One);
        PosterMenu.setVideo.call(PosterMenu.context, this.content);
    }
}
PosterMenu.cssSetMenu = 'set-poster';
PosterMenu.cssPosterMenu = 'item-poster';
//# sourceMappingURL=vgaPosterMenu.js.map