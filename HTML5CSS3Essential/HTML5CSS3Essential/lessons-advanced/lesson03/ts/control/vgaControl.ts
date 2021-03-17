import { VGaDomItems } from '../model/vgaItems.js'
import { Params } from '../model/vgaParams.js'
import { ViewVG } from '../view/viewVideoGallery.js'
import { ViewContents } from '../view/viewContents.js'
import { ViewParams } from '../view/viewParms.js'
import { DOMViewItems } from '../model/modelViewItems.js'
import { ConfirmItems } from '../../../../model/confirmItems.js'

class VideoGallery {
    private constructor(
        domItems: VGaDomItems,
        domViewItems: DOMViewItems,
        confirmItems: ConfirmItems
    ) {
        this._domItems = domItems;
        this._domViewItems = domViewItems;
        this._confirmItems = confirmItems;
        //
        this.DefineEvents();
        this.DependencyResolutions();
    }

    // Fields
    private static _instance: VideoGallery = undefined;

    // Fields: dependencies
    private _params: Params = Params.instance;
    private _viewParams: ViewParams;
    private _domItems: VGaDomItems;
    private _domViewItems: DOMViewItems;
    private _confirmItems: ConfirmItems;
    private _viewVideoGallery: ViewVG;
    private _viewContents: ViewContents;

    // Properties
    static get instance(): VideoGallery {
        if (!VideoGallery._instance) {
            throw new Error('Instance of ../js-advanced/colorManagement.js was not created.');
        }
        return VideoGallery._instance;
    }
    get params(): Params { return this._params; }
    get viewParams(): ViewParams { return this._viewParams; }
    get domItems(): VGaDomItems { return this._domItems; }
    get domViewItems(): DOMViewItems { return this._domViewItems; }
    get confirmItems(): ConfirmItems { return this._confirmItems; }
    get viewContents(): ViewContents { return this._viewContents; }

    // Methods
    static Create(
        domItems: VGaDomItems,
        domViewItems: DOMViewItems,
        confirmItems: ConfirmItems
    ): VideoGallery {
        if (!VideoGallery._instance) {
            VideoGallery._instance = new VideoGallery(
                domItems,
                domViewItems,
                confirmItems
            );
        }
        return VideoGallery._instance;
    }

    // Helpers
    private DefineEvents(): void {
    }

    private DependencyResolutions(): void {
        this._viewParams = ViewParams.Create(
            this.params,
            this.domItems
        );
        //
        this._viewContents = ViewContents.Create(
            this.domItems,
            this.domViewItems
        );
        //
        this._viewVideoGallery = ViewVG.Create(
            this.domItems,
            this._params,
            this.viewContents
        );
    }

}

VideoGallery.Create(
    VGaDomItems.Create(
        <HTMLInputElement>document.getElementById('files'),
        document.getElementById('select-files'),
        document.getElementById('open-view'),
        document.getElementById('main-show-loader'),
        document.getElementById('parms-show'),
        //
        document.getElementById('posters'),
        document.getElementById('video-container'),
        <HTMLVideoElement>document.getElementById('video'),
        document.getElementById('poster-screenshot'),
        document.getElementById('rate-slow'),
        document.getElementById('rate-medium'),
        document.getElementById('rate-faster'),
        document.getElementById('playback-rate'),
        document.getElementById('current-time'),
        //
        document.getElementById('work-view'),
        document.getElementById('close-view')
    ),
    //
    DOMViewItems.Create(
        document.getElementById('show-find-parms'),
        //
        <HTMLInputElement>document.getElementById('dic-files'),
        document.getElementById('dic-select-files'),
        document.getElementById('dic-to-watch'),
        document.getElementById('dic-to-state'),
        document.getElementById('dic-remove'),
        document.getElementById('dic-search'),
        document.getElementById('dic-clear-search'),
        document.getElementById('show-loader'),
        //
        document.getElementById('dic-t-heder'),
        document.getElementById('dic-row-header'),
        <HTMLInputElement>document.getElementById('markAllRows'),
        <HTMLImageElement>document.getElementById('imgMarkAllRows'),
        document.getElementById('dic-t-body'),
        //
        document.getElementById('dicContextMenu'),
        document.getElementById('cm-select-files'),
        document.getElementById('cm-to-watch'),
        document.getElementById('cm-to-state'),
        document.getElementById('cm-del'),
        document.getElementById('cm-find'),
        document.getElementById('cm-clear-find')
    ),
    //
    ConfirmItems.Create(
        document.getElementById('confirm-modal'),
        document.getElementById('confirm-modal-Header'),
        document.getElementById('confirmAbout'),
        document.getElementById('confirmYes'),
        document.getElementById('confirmNo')
    )
);
