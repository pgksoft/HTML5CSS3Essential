export class VGaDomItems {
    constructor(files, addFiles, openView, mainShowLoader, parmsShow, posters, videoContainer, video, posterScreenshot, rateSlower, rateMedium, rateFaster, playbackRate, currentTime, workView, closeView) {
        this._files = files;
        this._addFiles = addFiles;
        this._openView = openView;
        this._mainShowLoader = mainShowLoader;
        this._parmsShow = parmsShow;
        this._posters = posters;
        this._videoContainer = videoContainer;
        this._video = video;
        this._posterScreenshot = posterScreenshot;
        this._rateSlower = rateSlower;
        this._rateMedium = rateMedium;
        this._rateFaster = rateFaster;
        this._playbackRate = playbackRate;
        this._currentTime = currentTime;
        this._workView = workView;
        this._closeView = closeView;
    }
    static get instance() {
        if (!VGaDomItems._instance) {
            throw new Error('Instance of VGaDomItems was not created.');
        }
        return VGaDomItems._instance;
    }
    get files() { return this._files; }
    get addFiles() { return this._addFiles; }
    get openView() { return this._openView; }
    get mainShowLoader() { return this._mainShowLoader; }
    get parmsShow() { return this._parmsShow; }
    get posters() { return this._posters; }
    get videoContainer() { return this._videoContainer; }
    get video() { return this._video; }
    get posterScreenshot() { return this._posterScreenshot; }
    get rateSlower() { return this._rateSlower; }
    get rateMedium() { return this._rateMedium; }
    get rateFaster() { return this._rateFaster; }
    get playbackRate() { return this._playbackRate; }
    get currentTime() { return this._currentTime; }
    get workView() { return this._workView; }
    get closeView() { return this._closeView; }
    static Create(files, addFiles, openView, mainShowLoader, parmsShow, posters, videoContainer, video, posterScreenshot, rateSlower, rateMedium, rateFaster, playbackRate, currentTime, workView, closeView) {
        if (!VGaDomItems._instance) {
            this._instance = new VGaDomItems(files, addFiles, openView, mainShowLoader, parmsShow, posters, videoContainer, video, posterScreenshot, rateSlower, rateMedium, rateFaster, playbackRate, currentTime, workView, closeView);
        }
        return VGaDomItems.instance;
    }
}
VGaDomItems._instance = undefined;
//# sourceMappingURL=vgaItems.js.map