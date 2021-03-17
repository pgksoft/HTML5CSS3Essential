import { Menu, MenuSelectionRule } from '../../../../model/abstractMenu.js'
import { VideoContent } from '../model/vgaContent.js'

interface ISetVideo {
    (content: VideoContent): void;
}

export class PosterMenu extends Menu {
    constructor(box: HTMLElement, content: VideoContent) {
        super(box);
        this._content = content;
        this.SetClick();
    }
    // Fields
    static context: Object;
    static setVideo: ISetVideo;
    static cssSetMenu: string = 'set-poster';
    static cssPosterMenu: string = 'item-poster';
    private _content: VideoContent;
    // Properties
    get content(): VideoContent { return this._content; }
    // Methods
    OnClick(): void {
        this.SetActive(MenuSelectionRule.One);
        PosterMenu.setVideo.call(PosterMenu.context, this.content);
    }
    // Helpers
}