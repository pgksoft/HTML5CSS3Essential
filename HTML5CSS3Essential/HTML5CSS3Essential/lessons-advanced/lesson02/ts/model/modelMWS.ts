// Multi-System Window Modeling 
// Model of Multi-System Window

export class MwsConstraints {
    static waveLenghthMin: number = 5;
    static waveLenghthMax: number = 100;
    static waveAmplitudeMin: number = 1;
    static waveAmplitudeMax: number = 100;
    static wavePeriodMin: number = 1;
    static wavePeriodMax: number = 999;
    static waveShadingMin: number = 1;
    static waveShadingMax: number = 200;
    static figureWidthMin: number = 100;
    static figureWidthMax: number = 5000;
    static figureHeightMin: number = 50;
    static figureHeightMax: number = 3000;
}

export const NameKindFigurePoint: string = 'point';
export const NameKindFigure: string = 'figure';
export const NameKindFigureRectangle: string = 'rectangle';
export const NameKindFigureCircle: string = 'circle';
export const NameKindFigureFlag: string = 'flag';

export const FigureKind: Map<string, number> = new Map([
    [NameKindFigurePoint, 0],
    [NameKindFigure, 1],
    [NameKindFigureRectangle, 2],
    [NameKindFigureCircle, 3],
    [NameKindFigureFlag, 4]
]);

export const NameCountryBelarus = 'Belarus';
export const NameCountryGermany = 'Germany';
export const NameCountryHungary = 'Hungary';
export const NameCountryKazakhstan = 'Kazakhstan';
export const NameCountryPoland = 'Poland';
export const NameCountryRussia = 'Russia';
export const NameCountryUkraine = 'Ukraine';
export const NameCountryUnitedKingdom = 'United Kingdom';
export const NameCountryUSA = 'USA';

export class Country {
    constructor(
        public name: string,
        public url: string,
        public aspectRatio: number
    ) { }
}

export const Countries: Country[] = [
    new Country(NameCountryBelarus, '../../img-mwsm/belarus.png', 2),
    new Country(NameCountryGermany, '../../img-mwsm/germany.png', 1.67),
    new Country(NameCountryHungary, '../../img-mwsm/hungary.png', 1.5),
    new Country(NameCountryKazakhstan, '../../img-mwsm/kazakhstan.png', 2),
    new Country(NameCountryPoland, '../../img-mwsm/poland.png', 1.6),
    new Country(NameCountryRussia, '../../img-mwsm/russia.png', 2),
    new Country(NameCountryUkraine, '../../img-mwsm/ukraine.png', 2),
    new Country(NameCountryUnitedKingdom, '../../img-mwsm/united-kingdom.png', 2),
    new Country(NameCountryUSA, '../../img-mwsm/usa.png', 1.9)
];

export class RectWave {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;
}

export class Point {
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
    // Fields
    private _kind: [string, number] = Array.from(FigureKind).find((pair) => pair[0] === NameKindFigurePoint);
    private _x: number;
    private _y: number;
    private _isAnimate: boolean = false;
    private _wasAnimate: boolean = false;
    private _serialNumber: number = 0;
    private _isSelected: boolean = false;
    // Properies
    get kind(): [string, number] { return this._kind; }
    set kind(value: [string, number]) { this._kind = value; }
    get x(): number { return this._x; }
    set x(value: number) { this._x = value; }
    get y(): number { return this._y; }
    set y(value: number) { this._y = value; }
    get isAnimate(): boolean { return this._isAnimate; }
    set isAnimate(value: boolean) { this._isAnimate = value; }
    get wasAnimate(): boolean { return this._wasAnimate; }
    set wasAnimate(value: boolean) { this._wasAnimate = value; }
    get serialNumber(): number { return this._serialNumber; }
    set serialNumber(value: number) { this._serialNumber = value; }
    get isSelected(): boolean { return this._isSelected; }
    set isSelected(value: boolean) { this._isSelected = value; }
    // Metods
    toString(): string {
        return `${this.serialNumber}. ${this.kind[0]} ${Math.round(this.x)}x${Math.round(this.y)}.`;
    }
}

export class Figure extends Point {
    constructor(x: number, y: number, width: number) {
        super(x, y);
        this._widthOriginal = width;
        this._width = this._widthOriginal;
        this.kind = Array.from(FigureKind).find((pair) => pair[0] === NameKindFigure);
    }
    // Fields
    private _widthOriginal: number;
    private _width: number;
    //Properties
    get widthOriginal(): number { return this._widthOriginal; }
    set widthOriginal(value: number) { this._widthOriginal = value; }
    get width(): number { return this._width; }
    set width(value: number) { this._width = value; }
    //Methods
    toString() {
        return `${this.serialNumber}. ${this.kind[0]} ${Math.round(this.x)}x${Math.round(this.y)}/w${Math.round(this.width)}.`;
    }
    restoreWidth() {
        this.width = this.widthOriginal;
    }
}

export class WaveParameters {
    constructor(length = 20, amplitude = 30, period = 100, shading = 50) {
        this._length = length;
        this._amplitude = amplitude;
        this._period = period;
        this._shading = shading;
    }
    // Fields
    private _length: number;
    private _amplitude: number;
    private _period: number;
    private _shading: number;
    // Properties
    get length(): number { return this._length; }
    set length(value: number) { this._length = value; }
    get amplitude(): number { return this._amplitude; }
    set amplitude(value: number) { this._amplitude = value; }
    get period(): number { return this._period; }
    set period(value: number) { this._period = value; }
    get shading(): number { return this._shading; }
    set shading(value: number) { this._shading = value; }
}

export class Rect extends Figure {
    constructor(x: number, y: number, width: number, height: number = 0, borderWidth: number = 2) {
        super(x, y, width);
        this._heightOriginal = height;
        this._height = this._heightOriginal;
        this._borderWidth = borderWidth;
        this.kind = Array.from(FigureKind).find((pair) => pair[0] === NameKindFigureRectangle);
        this.setAspectRatio();
    }
    // Fields
    private _heightOriginal: number;
    private _height: number;
    private _borderWidth: number;
    private _aspectRatio: number;
    private _waveParams: WaveParameters = new WaveParameters();
    // Properties
    get heightOriginal(): number { return this._heightOriginal; }
    set heightOriginal(value: number) { this._heightOriginal = value; }
    get height(): number { return this._height; }
    set height(value: number) { this._height = value; }
    get borderWidth(): number { return this._borderWidth; }
    set borderWidth(value: number) { this._borderWidth = value; }
    get aspectRatio(): number { return this._aspectRatio; }
    set aspectRatio(value: number) { this._aspectRatio = value; }
    get waveParams(): WaveParameters { return this._waveParams; }
    // Methods
    toString() {
        return `${this.serialNumber}. ${this.kind[0]} ${Math.round(this.x)}x${Math.round(this.y)} w${Math.round(this.width)}/h${Math.round(this.height)}.`;
    }
    restoreHeight() {
        this.height = this.heightOriginal;
    }
    setOriginal() {
        this.widthOriginal = this.width;
        this.heightOriginal = this.height;
    }
    setAspectRatio() {
        if (this.height === 0) {
            this.aspectRatio = NaN;
        } else {
            this.aspectRatio = this.width / this.height;
        }
    }
}

export class Flag extends Rect {
    constructor(x: number, y: number, width: number, country: string) {
        super(x, y, width);
        this.kind = Array.from(FigureKind).find((pair) => pair[0] === NameKindFigureFlag);
        this._country = country;
        this.borderWidth = 3;
    }
    // Fields
    private _country: string;
    private _insideX: number = 0;
    private _insideY: number = 0;
    private _insideWidth: number = 0;
    private _insideHeight: number = 0;
    // Property
    get country(): string { return this._country; }
    get insideX(): number { return this._insideX; }
    set insideX(value: number) { this._insideX = value; }
    get insideY(): number { return this._insideY; }
    set insideY(value: number) { this._insideY = value; }
    get insideWidth(): number { return this._insideWidth; }
    set insideWidth(value: number) { this._insideWidth = value; }
    get insideHeight(): number { return this._insideHeight; }
    set insideHeight(value: number) { this._insideHeight = value; }
    // Methods
    toString() {
        return `${this.serialNumber}. ${this.kind[0]} ${this.country[0]} ${Math.round(this.x)}x${Math.round(this.y)} w${Math.round(this.width)}/h${Math.round(this.height)}.`;
    }
}

export class FlagUSA extends Flag {
    // http://www.montney.com/flag/proportions.htm
    constructor(x: number, y: number, width: number) {
        super(x, y, width, NameCountryUSA);
        this.calcStandardProportions();
    }
    // Fields
    private _heightUnion: number = 0;
    private _widthUnion: number = 0;
    private _hIndentUnion: number = 0;
    private _hStepUnion: number = 0;
    private _vIndentUnion: number = 0;
    private _vStepUnion: number = 0;
    private _diameterStar: number = 0;
    private _heightStripe: number = 0;
    // Properties
    get heightUnion(): number { return this._heightUnion; }
    set heightUnion(value: number) { this._heightUnion = value; }
    get widthUnion(): number { return this._widthUnion; }
    set widthUnion(value: number) { this._widthUnion = value; }
    get hIndentUnion(): number { return this._hIndentUnion; }
    set hIndentUnion(value: number) { this._hIndentUnion = value; }
    get hStepUnion(): number { return this._hStepUnion; }
    set hStepUnion(value: number) { this._hStepUnion = value; }
    get vIndentUnion(): number { return this._vIndentUnion; }
    set vIndentUnion(value: number) { this._vIndentUnion = value; }
    get vStepUnion(): number { return this._vStepUnion; }
    set vStepUnion(value: number) { this._vStepUnion = value; }
    get diameterStar(): number { return this._diameterStar; }
    set diameterStar(value: number) { this._diameterStar = value; }
    get heightStripe(): number { return this._heightStripe; }
    set heightStripe(value: number) { this._heightStripe = value; }
    // Methods
    calcStandardProportions() {
        this.height = Math.round(this.width / 1.9);
        this.insideX = this.x + this.borderWidth;
        this.insideY = this.y + this.borderWidth;
        this.insideWidth = this.width - this.borderWidth * 2;
        this.insideHeight = this.height - this.borderWidth * 2;
        this.heightUnion = 7 * this.insideHeight / 13;
        this.widthUnion = 0.76 * this.insideHeight;
        this.hIndentUnion = 0.054 * this.insideHeight;
        this.hStepUnion = 0.054 * this.insideHeight;
        this.vIndentUnion = 0.063 * this.insideHeight;
        this.vStepUnion = 0.063 * this.insideHeight;
        this.diameterStar = 0.0616 * this.insideHeight;
        this.heightStripe = this.insideHeight / 13;
    }
}

export class FlagImg extends Flag {
    constructor(x: number, y: number, width: number, country: string, url: string, aspectRatio: number = 2) {
        super(x, y, width, country);
        this._url = url;
        this.aspectRatio = aspectRatio;
        this.img.addEventListener('load', () => { this._isLoad = true; }, false);
        this.img.src = this.url;
    }
    // Fields
    private _url: string = '';
    private _isLoad: boolean = false;
    private _img: HTMLImageElement = new Image();
    // Properties
    get url(): string { return this._url; }
    get isLoad(): boolean { return this._isLoad; }
    get img(): HTMLImageElement { return this._img; }
}


