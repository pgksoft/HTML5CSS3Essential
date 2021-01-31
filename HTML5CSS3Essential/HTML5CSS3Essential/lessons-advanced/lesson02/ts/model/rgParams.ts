import {
    RadialDirection,
    GradientColorScheme,
    Colors,
    RadialParams
} from '../../../../js-advanced/colorManagement'

export const CustomEventOverFill: string = 'rg-OverFill';

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

export const FillingDirectionManual: string = 'Ручное управление';
export const FillingDirectionCentre: string = 'По центру';
export const FillingDirectionLeftRight: string = 'Слева направо';
export const FillingDirectionRightLeft: string = 'Справа налево';
export const FillingDirectionTopBottom: string = 'Сверху вниз';
export const FillingDirectionBottomTop: string = 'Снизу вверх';
export const FillingDirectionRandom: string = 'Случайный выбор';
// Нумерация соответсвует перечислению RadialDirection в colorManagement.ts
export const RGFillingDirection: Map<string, number> = new Map([
    [FillingDirectionManual, 0],
    [FillingDirectionCentre, 1],
    [FillingDirectionLeftRight, 2],
    [FillingDirectionRightLeft, 3],
    [FillingDirectionTopBottom, 4],
    [FillingDirectionBottomTop, 5],
    [FillingDirectionRandom, 6],
]);

class LSKeyParams {
    app: string = 'Studying-radial-gradient-Params';
}

class LSValueParams {
    scale: [string, number];
    fillingDirection: [string, number];
    x: number;
    y: number;
    width: number;
    height: number;
    xOne: number;
    yOne: number;
    rOne: number;
    xTwo: number;
    yTwo: number;
    rTwo: number;
    direct: RadialDirection;
    colorScheme: [number, string][] = [];
    isAutoColorScheme: boolean;
    isTrackProportionsAreaRG: boolean;
    isTranslucentModal: boolean;
}

class Default {
    private _scale: [string, number] = Array.from(ScaleArea.entries()).find(pair => pair[1] === 1900);
    private _fillingDirection: [string, number] = Array.from(RGFillingDirection.entries()).find(pair => pair[0] === FillingDirectionRandom);
    private _areaWidth: number = this._scale[1];
    private _areaHeight: number = Math.floor(this._areaWidth / 2);
    private _x: number = 0;
    private _y: number = 0;
    private _width: number = 1900;
    private _height: number = 950;
    private _xOne: number = 950; //Math.floor(this._width / 2 + this._x)
    private _yOne: number = 475; //Math.floor(this._height / 2 + this._y)
    private _rOne: number = 33;
    private _xTwo: number = 950; //Math.floor(this._width / 2 + this._x)
    private _yTwo: number = 475; //Math.floor(this._height / 2 + this._y)
    private _rTwo: number = 940; //Math.floor(Math.min(this._width, this._height) + (Math.max(this._width, this._height) - Math.min(this._width, this._height)) / 3)
    private _direct: RadialDirection = RadialDirection.Centre;
    private _gradientScheme: GradientColorScheme = Colors.instance.CreateColorScheme([
        [0, Colors.instance.mapColors.get('Palegoldenrod')],
        [0.2, Colors.instance.mapColors.get('Darkolivegreen')],
        [0.4, Colors.instance.mapColors.get('Blanchedalmond')],
        [0.6, Colors.instance.mapColors.get('Peru')],
        [0.8, Colors.instance.mapColors.get('Gold')],
        [1, Colors.instance.mapColors.get('Salmon')]
    ]);
    private _isAutoColorScheme: boolean = true;
    private _isTrackProportionsAreaRG: boolean = true;
    private _isTranslucentModal: boolean = false;
    //
    get scale(): [string, number] { return this._scale; }
    get fillingDirection(): [string, number] { return this._fillingDirection; }
    get x(): number { return this._x; }
    get y(): number { return this._y; }
    get areaWidth(): number { return this._areaWidth; }
    get areaHeight(): number { return this._areaHeight; }
    get width(): number { return this._width; }
    get height(): number { return this._height; }
    get xOne(): number { return this._xOne; }
    get yOne(): number { return this._yOne; }
    get rOne(): number { return this._rOne; }
    get xTwo(): number { return this._xTwo; }
    get yTwo(): number { return this._yTwo; }
    get rTwo(): number { return this._rTwo; }
    get direct(): RadialDirection { return this._direct; }
    get gradientScheme(): GradientColorScheme { return this._gradientScheme; }
    get isAutoColorScheme(): boolean { return this._isAutoColorScheme; }
    get isTrackProportionsAreaRG(): boolean { return this._isTrackProportionsAreaRG; }
    get isTranslucentModal(): boolean { return this._isTranslucentModal; }
}

export class Params {
    private constructor() {
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
    // Fields
    private static _instance: Params = undefined;
    private _default: Default = new Default();
    private _scale: [string, number] = this._default.scale;
    private _fillingDirection: [string, number] = this._default.fillingDirection;
    private _areaWidth: number = this.default.areaWidth;
    private _areaHeight: number = this.default.areaHeight;
    private _x: number = this._default.x;
    private _y: number = this._default.y;
    private _width: number = this._default.width;
    private _height: number = this._default.height;
    private _xOne: number = this._default.xOne;
    private _yOne: number = this._default.yOne;
    private _rOne: number = this._default.rOne;
    private _xTwo: number = this._default.xTwo;
    private _yTwo: number = this._default.yTwo;
    private _rTwo: number = this._default.rTwo;
    private _direct: RadialDirection = this._default.direct;
    private _gradientScheme: GradientColorScheme = this._default.gradientScheme;
    private _isAutoColorScheme: boolean = this._default.isAutoColorScheme;
    private _isTrackProportionsAreaRG: boolean = this._default.isTrackProportionsAreaRG;
    private _isTranslucentModal: boolean = this._default.isTranslucentModal;
    private _localKey: LSKeyParams = new LSKeyParams();
    private _localParms: LSValueParams = new LSValueParams();

    // Fields - name user events
    private _nameEventScaleChange: string = 'rgScaleChange';
    private _nameEventFillingDirectionChange: string = 'rgFillingDirectionChange';
    private _nameEventXChange: string = 'rgXChange';
    private _nameEventYChange: string = 'rgYChange';
    private _nameEventWidthChange: string = 'rgWidthChange';
    private _nameEventHeightChange: string = 'rgHeightChange';
    private _nameEventXOneChange: string = 'rgXOneChange';
    private _nameEventYOneChange: string = 'rgYOneChange';
    private _nameEventROneChange: string = 'rgROneChange';
    private _nameEventXTwoChange: string = 'rgXOneChange';
    private _nameEventYTwoChange: string = 'rgYOneChange';
    private _nameEventRTwoChange: string = 'rgROneChange';
    private _nameEventDirectionChange: string = 'rgDirectionChange';
    private _nameEventGradientSchemeChange: string = 'rgGradientSchemeChange'
    private _nameEventisAutoColorScheme: string = 'rgClick-isAutoColorScheme';
    private _nameEventIsTrackProportionsAreaRG: string = 'rgClick-IsTrackProportionsAreaRG';
    private _nameEventIsTranslucent: string = 'rgClick-IsTranslucentModal';

    // Properties - Self management
    static get instance(): Params {
        if (!Params._instance) {
            Params._instance = new Params();
        }
        return Params._instance;
    }
    // Properties - name user events
    get nameEventScaleChange(): string { return this._nameEventScaleChange; }
    get nameEventFillingDirectionChange(): string { return this._nameEventFillingDirectionChange; }
    get nameEventXChange(): string { return this._nameEventXChange; }
    get nameEventYChange(): string { return this._nameEventYChange; }
    get nameEventWidthChange(): string { return this._nameEventWidthChange; }
    get nameEventHeightChange(): string { return this._nameEventHeightChange; }
    get nameEventXOneChange(): string { return this._nameEventXOneChange; }
    get nameEventYOneChange(): string { return this._nameEventYOneChange; }
    get nameEventROneChange(): string { return this._nameEventROneChange; }
    get nameEventXTwoChange(): string { return this._nameEventXTwoChange; }
    get nameEventYTwoChange(): string { return this._nameEventYTwoChange; }
    get nameEventRTwoChange(): string { return this._nameEventRTwoChange; }
    get nameEventDirectionChange(): string { return this._nameEventDirectionChange; }
    get nameEventGradientSchemeChange(): string { return this._nameEventGradientSchemeChange; }
    get nameEventisAutoColorScheme(): string { return this._nameEventisAutoColorScheme; }
    get nameEventIsTrackProportionsAreaRG(): string { return this._nameEventIsTrackProportionsAreaRG; }
    get nameEventIsTranslucent(): string { return this._nameEventIsTranslucent; }
    // Properties - Parameters
    get default(): Default { return this._default; }
    get scale(): [string, number] { return this._scale; }
    set scale(value: [string, number]) {
        this._scale = value;
        this._localParms.scale = this.scale;
        this.Save();
        this.SetAreaScale();
        document.dispatchEvent(new CustomEvent(this.nameEventScaleChange, { bubbles: true, detail: { value: value } }));
    }
    get fillingDirection(): [string, number] { return this._fillingDirection; }
    set fillingDirection(value: [string, number]) {
        this._fillingDirection = value;
        this._localParms.fillingDirection = this.fillingDirection;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventFillingDirectionChange, { bubbles: true, detail: { value: value } }));
        if (this.fillingDirection[1] in RadialDirection) {
            this.direct = this.fillingDirection[1];
        }
    }
    get areaWidth(): number { return this._areaWidth; }
    get areaHeight(): number { return this._areaHeight; }
    get x(): number { return this._x; }
    set x(value: number) {
        this._x = value;
        this._localParms.x = this.x;
        this.SetRadialParameters();
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventXChange, { bubbles: true, detail: { value: value } }));
    }
    get y(): number { return this._y; }
    set y(value: number) {
        this._y = value;
        this._localParms.y = this.y;
        this.SetRadialParameters();
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventYChange, { bubbles: true, detail: { value: value } }));
    }
    get width(): number { return this._width; }
    set width(value: number) {
        this._width = value;
        this._localParms.width = this.width;
        this.SetRadialParameters();
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventWidthChange, { bubbles: true, detail: { value: value } }));
    }
    get height(): number { return this._height; }
    set height(value: number) {
        this._height = value;
        this._localParms.height = this.height;
        this.SetRadialParameters();
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventHeightChange, { bubbles: true, detail: { value: value } }));
    }
    get xOne(): number { return this._xOne; }
    set xOne(value: number) {
        this._xOne = value;
        this._localParms.xOne = this.xOne;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventXOneChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get yOne(): number { return this._yOne; }
    set yOne(value: number) {
        this._yOne = value;
        this._localParms.yOne = this.yOne;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventYOneChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get rOne(): number { return this._rOne; }
    set rOne(value: number) {
        this._rOne = value;
        this._localParms.rOne = this.rOne;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventROneChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get xTwo(): number { return this._xTwo; }
    set xTwo(value: number) {
        this._xTwo = value;
        this._localParms.xTwo = this.xTwo;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventXTwoChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get yTwo(): number { return this._yTwo; }
    set yTwo(value: number) {
        this._yTwo = value;
        this._localParms.yTwo = this.yTwo;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventYTwoChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get rTwo(): number { return this._rTwo; }
    set rTwo(value: number) {
        this._rTwo = value;
        this._localParms.rTwo = this.rTwo;
        this.Save();
        if (this.fillingDirection[0] === FillingDirectionManual) {
            document.dispatchEvent(new CustomEvent(this.nameEventRTwoChange, { bubbles: true, detail: { value: value } }));
        }
    }
    get direct(): RadialDirection { return this._direct; }
    set direct(value: RadialDirection) {
        this._direct = value;
        this._localParms.direct = this.direct;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventDirectionChange, { bubbles: true, detail: { value: value } }));
    }
    get gradientScheme(): GradientColorScheme { return this._gradientScheme; }
    set gradientScheme(value: GradientColorScheme) {
        this._gradientScheme = value;
        this._localParms.colorScheme = this.gradientScheme.list;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventGradientSchemeChange, { bubbles: true, detail: { value: value } }));
    }
    get isAutoColorScheme(): boolean { return this._isAutoColorScheme; }
    set isAutoColorScheme(value: boolean) {
        this._isAutoColorScheme = value;
        this._localParms.isAutoColorScheme = this.isAutoColorScheme;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventisAutoColorScheme, { bubbles: true, detail: { value: value } }));
    }
    get isTrackProportionsAreaRG(): boolean { return this._isTrackProportionsAreaRG; }
    set isTrackProportionsAreaRG(value: boolean) {
        this._isTrackProportionsAreaRG = value;
        this._localParms.isTrackProportionsAreaRG = this.isTrackProportionsAreaRG;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventIsTrackProportionsAreaRG, { bubbles: true, detail: { value: value } }));
    }
    get isTranslucentModal(): boolean {
        return this._isTranslucentModal;
    }
    set isTranslucentModal(value: boolean) {
        this._isTranslucentModal = value;
        this._localParms.isTranslucentModal = this.isTranslucentModal;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventIsTranslucent, { bubbles: true, detail: { value: value } }));
    }

    // Method
    SetRadialParameters(): void {
        if (this.fillingDirection[0] !== FillingDirectionManual) {
            let radialParams: RadialParams = Colors.instance.GetRadialParams(
                this.x, this.y, this.width, this.height,
                this.direct
            );
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

    // Helpers
    private Save(): void {
        localStorage.setItem(JSON.stringify(this._localKey), JSON.stringify(this._localParms));
    }

    private Load(): void {
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

    private SetAreaScale(): void {
        this._areaWidth = this._scale[1];
        this._areaHeight = Math.floor(this._areaWidth / 2);
    }
}
