export const CustomEventOverFill = 'CustomEventOverFill';
export const CustomEventIsSelected = 'CustomEventIsSelected';
export const ScaleArea = new Map([
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
export const FillTypeAny = 'Любая';
export const FillTypeColor = 'Цветная';
export const FillTypeLinearGradient = 'Линейный градиент';
export const FillTypeRadialGradient = 'Радиальный градиент';
export const FillType = new Map([[FillTypeAny, 0], [FillTypeColor, 1], [FillTypeLinearGradient, 2], [FillTypeRadialGradient, 3]]);
class LSKeyParams {
    constructor() {
        this.app = 'MultiSystemWindowModeling-Params';
    }
}
class LSValueParams {
    constructor() {
        this.wPropStored = new WPropStored();
    }
}
export class WPropStored {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.kind = ['', -1];
        this.serialNumber = 0;
        this.isSelected = false;
        this.width = 0;
        this.widthOriginal = 0;
        this.waveLength = 0;
        this.waveAmplitude = 0;
        this.wavePeriod = 0;
        this.waveShading = 0;
        this.height = 0;
        this.heightOriginal = 0;
        this.borderWidth = 0;
        this.aspectRatio = 0;
        this.country = ['', -1];
        this.insideX = 0;
        this.insideY = 0;
        this.insideWidth = 0;
        this.insideHeight = 0;
        this.url = '';
        this.headerHeight = 0;
        this.fillType = FillType.entries().next().value;
        this.colorFill = '';
        this.colorStroke = '';
    }
}
class Default {
    constructor() {
        this._fill = Array.from(FillType.entries()).find(pair => pair[0] === FillTypeColor);
        this._scale = Array.from(ScaleArea.entries()).find(pair => pair[1] === 1900);
        this._isOffScreenCanvas = false;
        this._isTrackProportionsAreaMotion = true;
        this._isTranslucentModal = false;
    }
    get fill() { return this._fill; }
    get scale() { return this._scale; }
    get isOffScreenCanvas() { return this._isOffScreenCanvas; }
    get isTrackProportionsAreaMotion() { return this._isTrackProportionsAreaMotion; }
    get isTranslucentModal() { return this._isTranslucentModal; }
}
export class Params {
    constructor() {
        this._default = new Default();
        this._fill = this._default.fill;
        this._scale = this._default.scale;
        this._isTrackProportionsAreaMotion = this._default.isTrackProportionsAreaMotion;
        this._isOffScreenCanvas = this._default.isOffScreenCanvas;
        this._isTranslucentModal = this._default.isTranslucentModal;
        this._localKey = new LSKeyParams();
        this._localParms = new LSValueParams();
        this._wPropStored = new WPropStored();
        this._canvasCoordinates = [0, 0];
        this._serialNumberTracking = 0;
        this._switchSerialNumber = 0;
        this._nameEventFillChange = 'mwsFillChange';
        this._nameEventScaleChange = 'mwsScaleChange';
        this._nameEventIsOffScreenCanvas = 'mwsClick-IsOffScreenCanvas';
        this._nameEventIsTrackProportionsAreaMotion = 'mwsClick-IsTrackProportionsAreaMotion';
        this._nameEventIsTranslucent = 'mwsClick-IsTranslucentModal';
        this._nameEventCanvasCoordinates = 'mwsCanvas-Coordinates';
        this._nameEventSerialNumberTracking = 'mwsCanvas-SerialNumberTracking';
        this._nameEventWPropStored = 'mwsWindow-Properties-Stored';
        this._nameEventWPropStoredWidthChanged = 'mwsWindow-Properties-Stored-Width-Changed';
        this._nameEventWPropStoredHeightChanged = 'mwsWindow-Properties-Stored-Height-Changed';
        this._nameEventWPropStoredLengthWaveChanged = 'mwsWindow-Properties-Stored-Length-Wave-Changed';
        this._nameEventWPropStoredAmplitudeWaveChanged = 'mwsWindow-Properties-Stored-Amplitude-Wave-Changed';
        this._nameEventWPropStoredPeriodWaveChanged = 'mwsWindow-Properties-Stored-Period-Wave-Changed';
        this._nameEventWPropStoredShadingWaveChanged = 'mwsWindow-Properties-Stored-Shading-Wave-Changed';
        this._localParms.fill = this._fill;
        this._localParms.scale = this._scale;
        this._localParms.isOffScreenCanvas = this._isOffScreenCanvas;
        this._localParms.isTrackProportionsAreaMotion = this._isTrackProportionsAreaMotion;
        this._localParms.isTranslucentModal = this._isTranslucentModal;
        this.Load();
        this.DefineEvents();
    }
    get nameEventFillChange() { return this._nameEventFillChange; }
    get nameEventScaleChange() { return this._nameEventScaleChange; }
    get nameEventIsOffScreenCanvas() { return this._nameEventIsOffScreenCanvas; }
    get nameEventIsTrackProportionsAreaMotion() { return this._nameEventIsTrackProportionsAreaMotion; }
    get nameEventIsTranslucent() { return this._nameEventIsTranslucent; }
    get nameEventCanvasCoordinates() { return this._nameEventCanvasCoordinates; }
    get nameEventSerialNumberTracking() { return this._nameEventSerialNumberTracking; }
    get nameEventWPropStored() { return this._nameEventWPropStored; }
    get nameEventWPropStoredWidthChanged() { return this._nameEventWPropStoredWidthChanged; }
    get nameEventWPropStoredHeightChanged() { return this._nameEventWPropStoredHeightChanged; }
    get nameEventWPropStoredLengthWaveChanged() { return this._nameEventWPropStoredLengthWaveChanged; }
    get nameEventWPropStoredAmplitudeWaveChanged() { return this._nameEventWPropStoredAmplitudeWaveChanged; }
    get nameEventWPropStoredPeriodWaveChanged() { return this._nameEventWPropStoredPeriodWaveChanged; }
    get nameEventWPropStoredShadingWaveChanged() { return this._nameEventWPropStoredShadingWaveChanged; }
    static get instance() {
        if (!Params._instance) {
            Params._instance = new Params();
        }
        return Params._instance;
    }
    get default() { return this._default; }
    get fill() { return this._fill; }
    set fill(value) {
        this._fill = value;
        this._localParms.fill = this.fill;
        this.wPropStored.fillType = value;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventFillChange, { bubbles: true, detail: { value: value } }));
    }
    get scale() { return this._scale; }
    set scale(value) {
        this._scale = value;
        this._localParms.scale = this.scale;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventScaleChange, { bubbles: true, detail: { value: value } }));
    }
    get isOffScreenCanvas() { return this._isOffScreenCanvas; }
    set isOffScreenCanvas(value) {
        this._isOffScreenCanvas = value;
        this._localParms.isOffScreenCanvas = this.isOffScreenCanvas;
        this.Save();
        document.dispatchEvent(new CustomEvent(this._nameEventIsOffScreenCanvas, { bubbles: true, detail: { value: value } }));
    }
    get isTrackProportionsAreaMotion() { return this._isTrackProportionsAreaMotion; }
    set isTrackProportionsAreaMotion(value) {
        this._isTrackProportionsAreaMotion = value;
        this._localParms.isTrackProportionsAreaMotion = this.isTrackProportionsAreaMotion;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventIsTrackProportionsAreaMotion, { bubbles: true, detail: { value: value } }));
    }
    get isTranslucentModal() { return this._isTranslucentModal; }
    set isTranslucentModal(value) {
        this._isTranslucentModal = value;
        this._localParms.isTranslucentModal = this.isTranslucentModal;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventIsTranslucent, { bubbles: true, detail: { value: value } }));
    }
    get canvasCoordinates() { return this._canvasCoordinates; }
    set canvasCoordinates(value) {
        this._canvasCoordinates = value;
        document.dispatchEvent(new CustomEvent(this.nameEventCanvasCoordinates, { bubbles: true, detail: { value: value, event: this.nameEventCanvasCoordinates } }));
    }
    get serialNumberTracking() { return this._serialNumberTracking; }
    set serialNumberTracking(value) {
        this._serialNumberTracking = value;
        document.dispatchEvent(new CustomEvent(this.nameEventSerialNumberTracking, { bubbles: true, detail: { value: value, event: this.nameEventSerialNumberTracking } }));
    }
    get switchSerialNumber() { return this._switchSerialNumber; }
    set switchSerialNumber(value) { this._switchSerialNumber = value; }
    get wPropStored() { return this._wPropStored; }
    set wPropStored(value) {
        this._wPropStored = value;
        this._localParms.wPropStored = this.wPropStored;
        document.dispatchEvent(new CustomEvent(this.nameEventWPropStored, { bubbles: true, detail: { value: value, event: this.nameEventWPropStored } }));
        this.Save();
    }
    DefineEvents() {
        document.addEventListener(this.nameEventWPropStoredWidthChanged, (e) => { this.Save(); }, false);
        document.addEventListener(this.nameEventWPropStoredHeightChanged, (e) => { this.Save(); }, false);
        document.addEventListener(this.nameEventWPropStoredLengthWaveChanged, (e) => { this.Save(); }, false);
        document.addEventListener(this.nameEventWPropStoredAmplitudeWaveChanged, (e) => { this.Save(); }, false);
        document.addEventListener(this.nameEventWPropStoredPeriodWaveChanged, (e) => { this.Save(); }, false);
        document.addEventListener(this.nameEventWPropStoredShadingWaveChanged, (e) => { this.Save(); }, false);
    }
    Save() {
        localStorage.setItem(JSON.stringify(this._localKey), JSON.stringify(this._localParms));
    }
    Load() {
        if (localStorage.getItem(JSON.stringify(this._localKey))) {
            this._localParms = JSON.parse(localStorage.getItem(JSON.stringify(this._localKey)));
            this._scale = this._localParms.scale;
            this._isTrackProportionsAreaMotion = this._localParms.isTrackProportionsAreaMotion;
            this._isTranslucentModal = this._localParms.isTranslucentModal;
        }
    }
}
Params._instance = undefined;
//# sourceMappingURL=mwsParams.js.map