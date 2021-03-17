import { VGaDomItems } from '../model/vgaItems.js';
import { Params } from '../model/vgaParams.js';
import { ViewVG } from '../view/viewVideoGallery.js';
import { ViewContents } from '../view/viewContents.js';
import { ViewParams } from '../view/viewParms.js';
import { DOMViewItems } from '../model/modelViewItems.js';
import { ConfirmItems } from '../../../../model/confirmItems.js';
class VideoGallery {
    constructor(domItems, domViewItems, confirmItems) {
        this._params = Params.instance;
        this._domItems = domItems;
        this._domViewItems = domViewItems;
        this._confirmItems = confirmItems;
        this.DefineEvents();
        this.DependencyResolutions();
    }
    static get instance() {
        if (!VideoGallery._instance) {
            throw new Error('Instance of ../js-advanced/colorManagement.js was not created.');
        }
        return VideoGallery._instance;
    }
    get params() { return this._params; }
    get viewParams() { return this._viewParams; }
    get domItems() { return this._domItems; }
    get domViewItems() { return this._domViewItems; }
    get confirmItems() { return this._confirmItems; }
    get viewContents() { return this._viewContents; }
    static Create(domItems, domViewItems, confirmItems) {
        if (!VideoGallery._instance) {
            VideoGallery._instance = new VideoGallery(domItems, domViewItems, confirmItems);
        }
        return VideoGallery._instance;
    }
    DefineEvents() {
    }
    DependencyResolutions() {
        this._viewParams = ViewParams.Create(this.params, this.domItems);
        this._viewContents = ViewContents.Create(this.domItems, this.domViewItems);
        this._viewVideoGallery = ViewVG.Create(this.domItems, this._params, this.viewContents);
    }
}
VideoGallery._instance = undefined;
VideoGallery.Create(VGaDomItems.Create(document.getElementById('files'), document.getElementById('select-files'), document.getElementById('open-view'), document.getElementById('main-show-loader'), document.getElementById('parms-show'), document.getElementById('posters'), document.getElementById('video-container'), document.getElementById('video'), document.getElementById('poster-screenshot'), document.getElementById('rate-slow'), document.getElementById('rate-medium'), document.getElementById('rate-faster'), document.getElementById('playback-rate'), document.getElementById('current-time'), document.getElementById('work-view'), document.getElementById('close-view')), DOMViewItems.Create(document.getElementById('show-find-parms'), document.getElementById('dic-files'), document.getElementById('dic-select-files'), document.getElementById('dic-to-watch'), document.getElementById('dic-to-state'), document.getElementById('dic-remove'), document.getElementById('dic-search'), document.getElementById('dic-clear-search'), document.getElementById('show-loader'), document.getElementById('dic-t-heder'), document.getElementById('dic-row-header'), document.getElementById('markAllRows'), document.getElementById('imgMarkAllRows'), document.getElementById('dic-t-body'), document.getElementById('dicContextMenu'), document.getElementById('cm-select-files'), document.getElementById('cm-to-watch'), document.getElementById('cm-to-state'), document.getElementById('cm-del'), document.getElementById('cm-find'), document.getElementById('cm-clear-find')), ConfirmItems.Create(document.getElementById('confirm-modal'), document.getElementById('confirm-modal-Header'), document.getElementById('confirmAbout'), document.getElementById('confirmYes'), document.getElementById('confirmNo')));
//# sourceMappingURL=vgaControl.js.map