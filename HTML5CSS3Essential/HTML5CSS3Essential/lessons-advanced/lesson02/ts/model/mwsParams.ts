// Multi-System Window Modeling 
// Model of Parameters

// CustomEvents
export const CustomEventOverFill: string = 'CustomEventOverFill';
export const CustomEventIsSelected: string = 'CustomEventIsSelected';

export const ScaleArea: Map<string, number> = new Map([
    ['300 x 150', 300],
    ['600 x 300', 600],
    ['900 x 450', 900],
    ['1200 x 600', 1200],
    ['1600 x 800', 1600],
    ['1900 x 950', 1900],
    ['2560 x 1280', 2560],
    ['3200 x 1600', 3200],
    ['4800 x 2400', 4800],
    ['5600 x 2800', 5600]
]);

export const FillTypeAny: string = 'Любая';
export const FillTypeColor: string = 'Цветная';
export const FillTypeLinearGradient: string = 'Линейный градиент';
export const FillTypeRadialGradient: string = 'Радиальный градиент';
export const FillType: Map<string, number> = new Map([[FillTypeAny, 0], [FillTypeColor, 1], [FillTypeLinearGradient, 2], [FillTypeRadialGradient, 3]]);

class LSKeyParams {
    app: string = 'MultiSystemWindowModeling-Params';
}

class LSValueParams {
    fill: [string, number];
    scale: [string, number];
    isOffScreenCanvas: boolean;
    isTrackProportionsAreaMotion: boolean;
    isTranslucentModal: boolean;
    wPropStored: WPropStored = new WPropStored();
}

export class WPropStored {
    // from Point
    x: number = 0;
    y: number = 0;
    kind: [string, number] = ['', -1];
    serialNumber: number = 0;
    isSelected: boolean = false;
    // from Figure
    width: number = 0;
    widthOriginal: number = 0;
    // from Wave
    waveLength: number = 0;
    waveAmplitude: number = 0;
    wavePeriod: number = 0;
    waveShading: number = 0;
    // from Rectangle
    height: number = 0;
    heightOriginal: number = 0;
    borderWidth: number = 0;
    aspectRatio: number = 0;
    // from Flag
    country: [string, number] = ['', -1];
    insideX: number = 0;
    insideY: number = 0;
    insideWidth: number = 0;
    insideHeight: number = 0;
    // from FlagImg
    url: string = '';
    // from ViewRect
    headerHeight: number = 0;
    measureCaptionHead: TextMetrics;
    measureCaptionClose: TextMetrics;
    measureCaptionMinimize: TextMetrics;
    measureCaptionMaximize: TextMetrics;
    measureCaptionRestoreDown: TextMetrics;
    fillType: [string, number] = FillType.entries().next().value;
    colorFill: string = '';
    colorStroke: string = '';
}

class Default {
    private _fill: [string, number] = Array.from(FillType.entries()).find(pair => pair[0] === FillTypeColor);
    private _scale: [string, number] = Array.from(ScaleArea.entries()).find(pair => pair[1] === 1900);
    private _isOffScreenCanvas: boolean = false;
    private _isTrackProportionsAreaMotion: boolean = true;
    private _isTranslucentModal: boolean = false;
    //
    get fill(): [string, number] { return this._fill; }
    get scale(): [string, number] { return this._scale; }
    get isOffScreenCanvas(): boolean { return this._isOffScreenCanvas; }
    get isTrackProportionsAreaMotion(): boolean { return this._isTrackProportionsAreaMotion; }
    get isTranslucentModal(): boolean { return this._isTranslucentModal; }
}

export class Params {
    private constructor() {
        this._localParms.fill = this._fill;
        this._localParms.scale = this._scale;
        this._localParms.isOffScreenCanvas = this._isOffScreenCanvas;
        this._localParms.isTrackProportionsAreaMotion = this._isTrackProportionsAreaMotion;
        this._localParms.isTranslucentModal = this._isTranslucentModal;
        this.Load();
        this.DefineEvents();
    }
    // Fields
    private static _instance: Params = undefined;
    private _default: Default = new Default();
    private _fill: [string, number] = this._default.fill;
    private _scale: [string, number] = this._default.scale;
    private _isTrackProportionsAreaMotion: boolean = this._default.isTrackProportionsAreaMotion;
    private _isOffScreenCanvas: boolean = this._default.isOffScreenCanvas;
    private _isTranslucentModal: boolean = this._default.isTranslucentModal;
    private _localKey: LSKeyParams = new LSKeyParams();
    private _localParms: LSValueParams = new LSValueParams();
    // Fields - model
    private _wPropStored: WPropStored = new WPropStored();
    // Fields - view MWS
    private _canvasCoordinates: [number, number] = [0, 0];
    private _serialNumberTracking: number = 0;
    private _switchSerialNumber: number = 0;
    // Fields - name user events
    private _nameEventFillChange: string = 'mwsFillChange';
    private _nameEventScaleChange: string = 'mwsScaleChange';
    private _nameEventIsOffScreenCanvas: string = 'mwsClick-IsOffScreenCanvas';
    private _nameEventIsTrackProportionsAreaMotion: string = 'mwsClick-IsTrackProportionsAreaMotion';
    private _nameEventIsTranslucent: string = 'mwsClick-IsTranslucentModal';
    private _nameEventCanvasCoordinates: string = 'mwsCanvas-Coordinates';
    private _nameEventSerialNumberTracking: string = 'mwsCanvas-SerialNumberTracking';
    private _nameEventWPropStored: string = 'mwsWindow-Properties-Stored';
    private _nameEventWPropStoredWidthChanged: string = 'mwsWindow-Properties-Stored-Width-Changed';
    private _nameEventWPropStoredHeightChanged: string = 'mwsWindow-Properties-Stored-Height-Changed';
    private _nameEventWPropStoredLengthWaveChanged: string = 'mwsWindow-Properties-Stored-Length-Wave-Changed';
    private _nameEventWPropStoredAmplitudeWaveChanged: string = 'mwsWindow-Properties-Stored-Amplitude-Wave-Changed';
    private _nameEventWPropStoredPeriodWaveChanged: string = 'mwsWindow-Properties-Stored-Period-Wave-Changed';
    private _nameEventWPropStoredShadingWaveChanged: string = 'mwsWindow-Properties-Stored-Shading-Wave-Changed';

    // Properties - name user events
    get nameEventFillChange(): string { return this._nameEventFillChange; }
    get nameEventScaleChange(): string { return this._nameEventScaleChange; }
    get nameEventIsOffScreenCanvas(): string { return this._nameEventIsOffScreenCanvas; }
    get nameEventIsTrackProportionsAreaMotion(): string { return this._nameEventIsTrackProportionsAreaMotion; }
    get nameEventIsTranslucent(): string { return this._nameEventIsTranslucent; }
    get nameEventCanvasCoordinates(): string { return this._nameEventCanvasCoordinates; }
    get nameEventSerialNumberTracking(): string { return this._nameEventSerialNumberTracking; }
    get nameEventWPropStored(): string { return this._nameEventWPropStored; }
    get nameEventWPropStoredWidthChanged(): string { return this._nameEventWPropStoredWidthChanged; }
    get nameEventWPropStoredHeightChanged(): string { return this._nameEventWPropStoredHeightChanged; }
    get nameEventWPropStoredLengthWaveChanged(): string { return this._nameEventWPropStoredLengthWaveChanged; }
    get nameEventWPropStoredAmplitudeWaveChanged(): string { return this._nameEventWPropStoredAmplitudeWaveChanged; }
    get nameEventWPropStoredPeriodWaveChanged(): string { return this._nameEventWPropStoredPeriodWaveChanged; }
    get nameEventWPropStoredShadingWaveChanged(): string { return this._nameEventWPropStoredShadingWaveChanged; }

    // Properties
    static get instance(): Params {
        if (!Params._instance) {
            Params._instance = new Params();
        }
        return Params._instance;
    }
    get default(): Default { return this._default; }
    get fill(): [string, number] { return this._fill; }
    set fill(value: [string, number]) {
        this._fill = value;
        this._localParms.fill = this.fill;
        this.wPropStored.fillType = value;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventFillChange, { bubbles: true, detail: { value: value } }));
    }
    get scale(): [string, number] { return this._scale; }
    set scale(value: [string, number]) {
        this._scale = value;
        this._localParms.scale = this.scale;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventScaleChange, { bubbles: true, detail: { value: value } }));
    }
    get isOffScreenCanvas(): boolean { return this._isOffScreenCanvas; }
    set isOffScreenCanvas(value: boolean) {
        this._isOffScreenCanvas = value;
        this._localParms.isOffScreenCanvas = this.isOffScreenCanvas;
        this.Save();
        document.dispatchEvent(new CustomEvent(this._nameEventIsOffScreenCanvas, { bubbles: true, detail: { value: value } }));
    }
    get isTrackProportionsAreaMotion(): boolean { return this._isTrackProportionsAreaMotion; }
    set isTrackProportionsAreaMotion(value: boolean) {
        this._isTrackProportionsAreaMotion = value;
        this._localParms.isTrackProportionsAreaMotion = this.isTrackProportionsAreaMotion;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventIsTrackProportionsAreaMotion, { bubbles: true, detail: { value: value } }));
    }
    get isTranslucentModal(): boolean { return this._isTranslucentModal; }
    set isTranslucentModal(value: boolean) {
        this._isTranslucentModal = value;
        this._localParms.isTranslucentModal = this.isTranslucentModal;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventIsTranslucent, { bubbles: true, detail: { value: value } }));
    }
    // Properties ViewMWS
    get canvasCoordinates(): [number, number] { return this._canvasCoordinates; }
    set canvasCoordinates(value: [number, number]) {
        this._canvasCoordinates = value;
        document.dispatchEvent(new CustomEvent(this.nameEventCanvasCoordinates, { bubbles: true, detail: { value: value, event: this.nameEventCanvasCoordinates } }));
    }
    get serialNumberTracking(): number { return this._serialNumberTracking; }
    set serialNumberTracking(value: number) {
        this._serialNumberTracking = value;
        document.dispatchEvent(new CustomEvent(this.nameEventSerialNumberTracking, { bubbles: true, detail: { value: value, event: this.nameEventSerialNumberTracking } }));
    }
    get switchSerialNumber(): number { return this._switchSerialNumber; }
    set switchSerialNumber(value: number) { this._switchSerialNumber = value; }
    // Properties Model
    get wPropStored(): WPropStored { return this._wPropStored; }
    set wPropStored(value: WPropStored) {
        this._wPropStored = value;
        this._localParms.wPropStored = this.wPropStored;
        document.dispatchEvent(new CustomEvent(this.nameEventWPropStored, { bubbles: true, detail: { value: value, event: this.nameEventWPropStored } }));
        this.Save();
    }

    // Helpers
    private DefineEvents() {
        document.addEventListener(this.nameEventWPropStoredWidthChanged, (e: CustomEvent) => { this.Save(); }, false);
        document.addEventListener(this.nameEventWPropStoredHeightChanged, (e: CustomEvent) => { this.Save(); }, false);
        document.addEventListener(this.nameEventWPropStoredLengthWaveChanged, (e: CustomEvent) => { this.Save(); }, false);
        document.addEventListener(this.nameEventWPropStoredAmplitudeWaveChanged, (e: CustomEvent) => { this.Save(); }, false);
        document.addEventListener(this.nameEventWPropStoredPeriodWaveChanged, (e: CustomEvent) => { this.Save(); }, false);
        document.addEventListener(this.nameEventWPropStoredShadingWaveChanged, (e: CustomEvent) => { this.Save(); }, false);
    }

    private Save(): void {
        localStorage.setItem(JSON.stringify(this._localKey), JSON.stringify(this._localParms));
    }
    private Load(): void {
        if (localStorage.getItem(JSON.stringify(this._localKey))) {
            this._localParms = JSON.parse(localStorage.getItem(JSON.stringify(this._localKey)));
            this._scale = this._localParms.scale;
            this._isTrackProportionsAreaMotion = this._localParms.isTrackProportionsAreaMotion;
            this._isTranslucentModal = this._localParms.isTranslucentModal;
        }
    }
}



