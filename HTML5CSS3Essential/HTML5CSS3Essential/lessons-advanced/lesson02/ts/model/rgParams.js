import { RadialDirection, Colors } from '../../../../js-advanced/colorManagement';
export const CustomEventOverFill = 'rg-OverFill';
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
export const FillingDirectionManual = 'Ручное управление';
export const FillingDirectionCentre = 'По центру';
export const FillingDirectionLeftRight = 'Слева направо';
export const FillingDirectionRightLeft = 'Справа налево';
export const FillingDirectionTopBottom = 'Сверху вниз';
export const FillingDirectionBottomTop = 'Снизу вверх';
export const FillingDirectionRandom = 'Случайный выбор';
export const RGFillingDirection = new Map([
    [FillingDirectionManual, 0],
    [FillingDirectionCentre, 1],
    [FillingDirectionLeftRight, 2],
    [FillingDirectionRightLeft, 3],
    [FillingDirectionTopBottom, 4],
    [FillingDirectionBottomTop, 5],
    [FillingDirectionRandom, 6],
]);
class LSKeyParams {
    constructor() {
        this.app = 'Studying-radial-gradient-Params';
    }
}
class LSValueParams {
    constructor() {
        this.colorScheme = [];
    }
}
class Default {
    constructor() {
        this._scale = Array.from(ScaleArea.entries()).find(pair => pair[1] === 1900);
        this._fillingDirection = Array.from(RGFillingDirection.entries()).find(pair => pair[0] === FillingDirectionRandom);
        this._areaWidth = this._scale[1];
        this._areaHeight = Math.floor(this._areaWidth / 2);
        this._x = 0;
        this._y = 0;
        this._width = 1900;
        this._height = 950;
        this._xOne = 950;
        this._yOne = 475;
        this._rOne = 33;
        this._xTwo = 950;
        this._yTwo = 475;
        this._rTwo = 940;
        this._direct = RadialDirection.Centre;
        this._gradientScheme = Colors.instance.CreateColorScheme([
            [0, Colors.instance.mapColors.get('Palegoldenrod')],
            [0.2, Colors.instance.mapColors.get('Darkolivegreen')],
            [0.4, Colors.instance.mapColors.get('Blanchedalmond')],
            [0.6, Colors.instance.mapColors.get('Peru')],
            [0.8, Colors.instance.mapColors.get('Gold')],
            [1, Colors.instance.mapColors.get('Salmon')]
        ]);
        this._isAutoColorScheme = true;
        this._isTrackProportionsAreaRG = true;
        this._isTranslucentModal = false;
    }
    get scale() { return this._scale; }
    get fillingDirection() { return this._fillingDirection; }
    get x() { return this._x; }
    get y() { return this._y; }
    get areaWidth() { return this._areaWidth; }
    get areaHeight() { return this._areaHeight; }
    get width() { return this._width; }
    get height() { return this._height; }
    get xOne() { return this._xOne; }
    get yOne() { return this._yOne; }
    get rOne() { return this._rOne; }
    get xTwo() { return this._xTwo; }
    get yTwo() { return this._yTwo; }
    get rTwo() { return this._rTwo; }
    get direct() { return this._direct; }
    get gradientScheme() { return this._gradientScheme; }
    get isAutoColorScheme() { return this._isAutoColorScheme; }
    get isTrackProportionsAreaRG() { return this._isTrackProportionsAreaRG; }
    get isTranslucentModal() { return this._isTranslucentModal; }
}
export class Params {
    constructor() {
        this._default = new Default();
        this._scale = this._default.scale;
        this._fillingDirection = this._default.fillingDirection;
        this._areaWidth = this.default.areaWidth;
        this._areaHeight = this.default.areaHeight;
        this._x = this._default.x;
        this._y = this._default.y;
        this._width = this._default.width;
        this._height = this._default.height;
        this._xOne = this._default.xOne;
        this._yOne = this._default.yOne;
        this._rOne = this._default.rOne;
        this._xTwo = this._default.xTwo;
        this._yTwo = this._default.yTwo;
        this._rTwo = this._default.rTwo;
        this._direct = this._default.direct;
        this._gradientScheme = this._default.gradientScheme;
        this._isAutoColorScheme = this._default.isAutoColorScheme;
        this._isTrackProportionsAreaRG = this._default.isTrackProportionsAreaRG;
        this._isTranslucentModal = this._default.isTranslucentModal;
        this._localKey = new LSKeyParams();
        this._localParms = new LSValueParams();
        this._nameEventScaleChange = 'rgScaleChange';
        this._nameEventFillingDirectionChange = 'rgFillingDirectionChange';
        this._nameEventXChange = 'rgXChange';
        this._nameEventYChange = 'rgYChange';
        this._nameEventWidthChange = 'rgWidthChange';
        this._nameEventHeightChange = 'rgHeightChange';
        this._nameEventXOneChange = 'rgXOneChange';
        this._nameEventYOneChange = 'rgYOneChange';
        this._nameEventROneChange = 'rgROneChange';
        this._nameEventXTwoChange = 'rgXOneChange';
        this._nameEventYTwoChange = 'rgYOneChange';
        this._nameEventRTwoChange = 'rgROneChange';
        this._nameEventDirectionChange = 'rgDirectionChange';
        this._nameEventGradientSchemeChange = 'rgGradientSchemeChange';
        this._nameEventisAutoColorScheme = 'rgClick-isAutoColorScheme';
        this._nameEventIsTrackProportionsAreaRG = 'rgClick-IsTrackProportionsAreaRG';
        this._nameEventIsTranslucent = 'rgClick-IsTranslucentModal';
        this._localParms.scale = this._scale;
        this._localParms.fillingDirection = this._fillingDirection;
        this._localParms.x = this._x;
        this._localParms.y = this._y;
        this._localParms.width = this._width;
        this._localParms.height = this._height;
        this._localParms.xOne = this._xOne;
        this._localParms.yOne = this._yOne;
        this._localParms.rOne = this._rOne;
        this._localParms.xTwo = this._xTwo;
        this._localParms.yTwo = this._yTwo;
        this._localParms.rTwo = this._rTwo;
        this._localParms.direct = this._direct;
        this._gradientScheme.list.forEach(item => this._localParms.colorScheme.push(item));
        this._localParms.isAutoColorScheme = this._isAutoColorScheme;
        this._localParms.isTrackProportionsAreaRG = this._isTrackProportionsAreaRG;
        this._localParms.isTranslucentModal = this._isTranslucentModal;
        this.Load();
    }
    static get instance() {
        if (!Params._instance) {
            Params._instance = new Params();
        }
        return Params._instance;
    }
    get nameEventScaleChange() { return this._nameEventScaleChange; }
    get nameEventFillingDirectionChange() { return this._nameEventFillingDirectionChange; }
    get nameEventXChange() { return this._nameEventXChange; }
    get nameEventYChange() { return this._nameEventYChange; }
    get nameEventWidthChange() { return this._nameEventWidthChange; }
    get nameEventHeightChange() { return this._nameEventHeightChange; }
    get nameEventXOneChange() { return this._nameEventXOneChange; }
    get nameEventYOneChange() { return this._nameEventYOneChange; }
    get nameEventROneChange() { return this._nameEventROneChange; }
    get nameEventXTwoChange() { return this._nameEventXTwoChange; }
    get nameEventYTwoChange() { return this._nameEventYTwoChange; }
    get nameEventRTwoChange() { return this._nameEventRTwoChange; }
    get nameEventDirectionChange() { return this._nameEventDirectionChange; }
    get nameEventGradientSchemeChange() { return this._nameEventGradientSchemeChange; }
    get nameEventisAutoColorScheme() { return this._nameEventisAutoColorScheme; }
    get nameEventIsTrackProportionsAreaRG() { return this._nameEventIsTrackProportionsAreaRG; }
    get nameEventIsTranslucent() { return this._nameEventIsTranslucent; }
    get default() { return this._default; }
    get scale() { return this._scale; }
    set scale(value) {
        this._scale = value;
        this._localParms.scale = this.scale;
        this.Save();
        this.SetAreaScale();
        document.dispatchEvent(new CustomEvent(this.nameEventScaleChange, { bubbles: true, detail: { value: value } }));
    }
    get fillingDirection() { return this._fillingDirection; }
    set fillingDirection(value) {
        this._fillingDirection = value;
        this._localParms.fillingDirection = this.fillingDirection;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventFillingDirectionChange, { bubbles: true, detail: { value: value } }));
        if (this.fillingDirection[1] in RadialDirection) {
            this.direct = this.fillingDirection[1];
        }
    }
    get areaWidth() { return this._areaWidth; }
    get areaHeight() { return this._areaHeight; }
    get x() { return this._x; }
    set x(value) {
        this._x = value;
        this._localParms.x = this.x;
        this.SetRadialParameters();
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventXChange, { bubbles: true, detail: { value: value } }));
    }
    get y() { return this._y; }
    set y(value) {
        this._y = value;
        this._localParms.y = this.y;
        this.SetRadialParameters();
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventYChange, { bubbles: true, detail: { value: value } }));
    }
    get width() { return this._width; }
    set width(value) {
        this._width = value;
        this._localParms.width = this.width;
        this.SetRadialParameters();
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventWidthChange, { bubbles: true, detail: { value: value } }));
    }
    get height() { return this._height; }
    set height(value) {
        this._height = value;
        this._localParms.height = this.height;
        this.SetRadialParameters();
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventHeightChange, { bubbles: true, detail: { value: value } }));
    }
    get xOne() { return this._xOne; }
    set xOne(value) {
        this._xOne = value;
        this._localParms.xOne = this.xOne;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventXOneChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get yOne() { return this._yOne; }
    set yOne(value) {
        this._yOne = value;
        this._localParms.yOne = this.yOne;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventYOneChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get rOne() { return this._rOne; }
    set rOne(value) {
        this._rOne = value;
        this._localParms.rOne = this.rOne;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventROneChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get xTwo() { return this._xTwo; }
    set xTwo(value) {
        this._xTwo = value;
        this._localParms.xTwo = this.xTwo;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventXTwoChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get yTwo() { return this._yTwo; }
    set yTwo(value) {
        this._yTwo = value;
        this._localParms.yTwo = this.yTwo;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventYTwoChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get rTwo() { return this._rTwo; }
    set rTwo(value) {
        this._rTwo = value;
        this._localParms.rTwo = this.rTwo;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventRTwoChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get direct() { return this._direct; }
    set direct(value) {
        this._direct = value;
        this._localParms.direct = this.direct;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventDirectionChange, { bubbles: true, detail: { value: value } }));
    }
    get gradientScheme() { return this._gradientScheme; }
    set gradientScheme(value) {
        this._gradientScheme = value;
        this._localParms.colorScheme = this.gradientScheme.list;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventGradientSchemeChange, { bubbles: true, detail: { value: value } }));
    }
    get isAutoColorScheme() { return this._isAutoColorScheme; }
    set isAutoColorScheme(value) {
        this._isAutoColorScheme = value;
        this._localParms.isAutoColorScheme = this.isAutoColorScheme;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventisAutoColorScheme, { bubbles: true, detail: { value: value } }));
    }
    get isTrackProportionsAreaRG() { return this._isTrackProportionsAreaRG; }
    set isTrackProportionsAreaRG(value) {
        this._isTrackProportionsAreaRG = value;
        this._localParms.isTrackProportionsAreaRG = this.isTrackProportionsAreaRG;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventIsTrackProportionsAreaRG, { bubbles: true, detail: { value: value } }));
    }
    get isTranslucentModal() {
        return this._isTranslucentModal;
    }
    set isTranslucentModal(value) {
        this._isTranslucentModal = value;
        this._localParms.isTranslucentModal = this.isTranslucentModal;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventIsTranslucent, { bubbles: true, detail: { value: value } }));
    }
    SetRadialParameters() {
        if (this.fillingDirection[0] !== FillingDirectionManual) {
            let radialParams = Colors.instance.GetRadialParams(this.x, this.y, this.width, this.height, this.direct);
            this._xOne = radialParams.oneX;
            this._yOne = radialParams.oneY;
            this._rOne = radialParams.oneR;
            this._xTwo = radialParams.twoX;
            this._yTwo = radialParams.twoY;
            this._rTwo = radialParams.twoR;
            this._localParms.xOne = this._xOne;
            this._localParms.yOne = this._yOne;
            this._localParms.rOne = this._rOne;
            this._localParms.xTwo = this._xTwo;
            this._localParms.yTwo = this._yTwo;
            this._localParms.rTwo = this._rTwo;
            this.Save();
        }
    }
    SetRandomFillingDiirection() {
        if (this.fillingDirection[0] !== FillingDirectionManual && this.fillingDirection[0] === FillingDirectionRandom) {
            this._direct = Colors.instance.RandomInt(RadialDirection.Centre, RadialDirection.BottomTop);
            this._localParms.direct = this._direct;
            this.Save();
        }
    }
    Save() {
        localStorage.setItem(JSON.stringify(this._localKey), JSON.stringify(this._localParms));
    }
    Load() {
        if (localStorage.getItem(JSON.stringify(this._localKey))) {
            this._localParms = JSON.parse(localStorage.getItem(JSON.stringify(this._localKey)));
            this._scale = this._localParms.scale;
            this._fillingDirection = this._localParms.fillingDirection;
            this.SetAreaScale();
            this._x = this._localParms.x;
            this._y = this._localParms.y;
            this._width = this._localParms.width;
            this._height = this._localParms.height;
            this._xOne = this._localParms.xOne;
            this._yOne = this._localParms.yOne;
            this._rOne = this._localParms.rOne;
            this._xTwo = this._localParms.xTwo;
            this._yTwo = this._localParms.yTwo;
            this._rTwo = this._localParms.rTwo;
            this._direct = this._localParms.direct;
            this._gradientScheme.list.length = 0;
            this._localParms.colorScheme.forEach(item => this._gradientScheme.Add(item));
            this._isAutoColorScheme = this._localParms.isAutoColorScheme;
            this._isTrackProportionsAreaRG = this._localParms.isTrackProportionsAreaRG;
            this._isTranslucentModal = this._localParms.isTranslucentModal;
        }
    }
    SetAreaScale() {
        this._areaWidth = this._scale[1];
        this._areaHeight = Math.floor(this._areaWidth / 2);
    }
}
Params._instance = undefined;
//# sourceMappingURL=rgParams.js.map