import { CustomEventContentsChange } from '../model/vgaParams.js';
import { TypeLocation } from '../model/vgaContent.js';
export class ViewParams {
    constructor(params, domItems) {
        this._params = params;
        this._domItems = domItems;
        this.DefineEvents();
    }
    static get instance() {
        if (!this._instance) {
            throw new Error('Instance of ../view/viewParms.ts was not created.');
        }
        return this._instance;
    }
    get params() { return this._params; }
    get domItems() { return this._domItems; }
    static Create(params, domItems) {
        if (!this._instance) {
            this._instance = new ViewParams(params, domItems);
        }
        return this._instance;
    }
    DefineEvents() {
        document.addEventListener(CustomEventContentsChange, () => { this.Show(); }, false);
    }
    Show() {
        this.domItems.parmsShow.innerHTML = '';
        if (this.params.currentIndexContent >= 0) {
            let p = document.createElement('p');
            let content = this.params.contents[this.params.currentIndexContent];
            p.innerHTML = `Name:&nbsp;<span>${content.name}</span>,`
                + `&nbsp;&nbsp; Location:&nbsp;<span>${TypeLocation[content.typeLocation]}</span>,`
                + `&nbsp;&nbsp; Duration:&nbsp;<span>${content.duration.toFixed(2)}</span>,`
                + `&nbsp;&nbsp; Poster&nbsp;time:&nbsp;<span>${content.posterTime.toFixed(2)}</span>,`
                + `&nbsp;&nbsp; Playback&nbsp;rate:&nbsp;<span>${content.playbackRate.toFixed(2)}</span>,`
                + `&nbsp;&nbsp; ${content.isMuted ? '<span>muted</span>' : `Volume:&nbsp;<span>${content.volume.toFixed(2)}</span>`}`;
            this.domItems.parmsShow.appendChild(p);
        }
    }
}
ViewParams._instance = undefined;
//# sourceMappingURL=viewParms.js.map