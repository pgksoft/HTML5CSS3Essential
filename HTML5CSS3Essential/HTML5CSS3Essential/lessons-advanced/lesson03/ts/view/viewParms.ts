import {
    CustomEventContentsChange,
    Params
} from '../model/vgaParams.js'
import { VGaDomItems } from '../model/vgaItems.js'
import { VideoContent, TypeLocation } from '../model/vgaContent.js';

export class ViewParams {
    private constructor(
        params: Params,
        domItems: VGaDomItems
    ) {
        this._params = params;
        this._domItems = domItems;
        //
        this.DefineEvents();
    }

    // Fields
    private static _instance: ViewParams = undefined;
    private _params: Params;
    private _domItems: VGaDomItems;

    // Properties
    static get instance(): ViewParams {
        if (!this._instance) {
            throw new Error('Instance of ../view/viewParms.ts was not created.');
        }
        return this._instance;
    }
    get params(): Params { return this._params; }
    get domItems(): VGaDomItems { return this._domItems; }

    // Methods
    static Create(
        params: Params,
        domItems: VGaDomItems
    ): ViewParams {
        if (!this._instance) {
            this._instance = new ViewParams(
                params,
                domItems
            );
        }
        return this._instance;
    }

    // Helpers
    private DefineEvents(): void {
        document.addEventListener(CustomEventContentsChange, () => { this.Show(); }, false);
    }

    private Show(): void {
        this.domItems.parmsShow.innerHTML = '';
        if (this.params.currentIndexContent >= 0) {
            let p = document.createElement('p');
            let content: VideoContent = this.params.contents[this.params.currentIndexContent];
            p.innerHTML = `Name:&nbsp;<span>${content.name}</span>,`
                + `&nbsp;&nbsp; Location:&nbsp;<span>${TypeLocation[content.typeLocation]}</span>,`
                + `&nbsp;&nbsp; Duration:&nbsp;<span>${content.duration.toFixed(2)}</span>,`
                + `&nbsp;&nbsp; Poster&nbsp;time:&nbsp;<span>${content.posterTime.toFixed(2)}</span>,`
                + `&nbsp;&nbsp; Playback&nbsp;rate:&nbsp;<span>${content.playbackRate.toFixed(2)}</span>,`
                + `&nbsp;&nbsp; ${content.isMuted ? '<span>muted</span>' : `Volume:&nbsp;<span>${content.volume.toFixed(2)}</span>`}`
            this.domItems.parmsShow.appendChild(p);
        }
    }
}