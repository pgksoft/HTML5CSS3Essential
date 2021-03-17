export class VGaDomItems {
    private constructor(
        files: HTMLInputElement,
        addFiles: HTMLElement,
        openView: HTMLElement,
        mainShowLoader: HTMLElement,
        parmsShow: HTMLElement,
        //
        posters: HTMLElement,
        videoContainer: HTMLElement,
        video: HTMLVideoElement,
        posterScreenshot: HTMLElement,
        rateSlower: HTMLElement,
        rateMedium: HTMLElement,
        rateFaster: HTMLElement,
        playbackRate: HTMLElement,
        currentTime: HTMLElement,
        //
        workView: HTMLElement,
        closeView: HTMLElement
    ) {
        this._files = files;
        this._addFiles = addFiles;
        this._openView = openView;
        this._mainShowLoader = mainShowLoader;
        this._parmsShow = parmsShow;
        //
        this._posters = posters;
        this._videoContainer = videoContainer;
        this._video = video;
        this._posterScreenshot = posterScreenshot;
        this._rateSlower = rateSlower;
        this._rateMedium = rateMedium;
        this._rateFaster = rateFaster;
        this._playbackRate = playbackRate;
        this._currentTime = currentTime;
        //
        this._workView = workView;
        this._closeView = closeView;
    }
    // Fields itself
    private static _instance: VGaDomItems = undefined;
    // Fields like Dom Items
    private _files: HTMLInputElement;
    private _addFiles: HTMLElement;
    private _openView: HTMLElement;
    private _mainShowLoader: HTMLElement;
    private _parmsShow: HTMLElement;
    //
    private _posters: HTMLElement;
    private _videoContainer: HTMLElement;
    private _video: HTMLVideoElement;
    private _posterScreenshot: HTMLElement;
    private _rateSlower: HTMLElement;
    private _rateMedium: HTMLElement;
    private _rateFaster: HTMLElement;
    private _playbackRate: HTMLElement;
    private _currentTime: HTMLElement;
    //
    private _workView: HTMLElement;
    private _closeView: HTMLElement;

    // Properties itself
    static get instance(): VGaDomItems {
        if (!VGaDomItems._instance) {
            throw new Error('Instance of VGaDomItems was not created.');
        }
        return VGaDomItems._instance;
    }
    // Properties like Dom Items
    get files(): HTMLInputElement { return this._files; }
    get addFiles(): HTMLElement { return this._addFiles; }
    get openView(): HTMLElement { return this._openView; }
    get mainShowLoader(): HTMLElement { return this._mainShowLoader; }
    get parmsShow(): HTMLElement { return this._parmsShow; }
    //
    get posters(): HTMLElement { return this._posters; }
    get videoContainer(): HTMLElement { return this._videoContainer; }
    get video(): HTMLVideoElement { return this._video; }
    get posterScreenshot(): HTMLElement { return this._posterScreenshot; }
    get rateSlower(): HTMLElement { return this._rateSlower; }
    get rateMedium(): HTMLElement { return this._rateMedium; }
    get rateFaster(): HTMLElement { return this._rateFaster; }
    get playbackRate(): HTMLElement { return this._playbackRate; }
    get currentTime(): HTMLElement { return this._currentTime; }
    //
    get workView(): HTMLElement { return this._workView; }
    get closeView(): HTMLElement { return this._closeView; }

    // Methods
    static Create(
        files: HTMLInputElement,
        addFiles: HTMLElement,
        openView: HTMLElement,
        mainShowLoader: HTMLElement,
        parmsShow: HTMLElement,
        //
        posters: HTMLElement,
        videoContainer: HTMLElement,
        video: HTMLVideoElement,
        posterScreenshot: HTMLElement,
        rateSlower: HTMLElement,
        rateMedium: HTMLElement,
        rateFaster: HTMLElement,
        playbackRate: HTMLElement,
        currentTime: HTMLElement,
        //
        workView: HTMLElement,
        closeView: HTMLElement
    ): VGaDomItems {
        if (!VGaDomItems._instance) {
            this._instance = new VGaDomItems(
                files,
                addFiles,
                openView,
                mainShowLoader,
                parmsShow,
                //
                posters,
                videoContainer,
                video,
                posterScreenshot,
                rateSlower,
                rateMedium,
                rateFaster,
                playbackRate,
                currentTime,
                //
                workView,
                closeView
            );
        }
        return VGaDomItems.instance;
    }
}