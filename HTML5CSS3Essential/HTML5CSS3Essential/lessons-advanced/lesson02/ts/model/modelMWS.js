export class MwsConstraints {
}
MwsConstraints.waveLenghthMin = 5;
MwsConstraints.waveLenghthMax = 100;
MwsConstraints.waveAmplitudeMin = 1;
MwsConstraints.waveAmplitudeMax = 100;
MwsConstraints.wavePeriodMin = 1;
MwsConstraints.wavePeriodMax = 999;
MwsConstraints.waveShadingMin = 1;
MwsConstraints.waveShadingMax = 200;
MwsConstraints.figureWidthMin = 100;
MwsConstraints.figureWidthMax = 5000;
MwsConstraints.figureHeightMin = 50;
MwsConstraints.figureHeightMax = 3000;
export const NameKindFigurePoint = 'point';
export const NameKindFigure = 'figure';
export const NameKindFigureRectangle = 'rectangle';
export const NameKindFigureCircle = 'circle';
export const NameKindFigureFlag = 'flag';
export const FigureKind = new Map([
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
    constructor(name, url, aspectRatio) {
        this.name = name;
        this.url = url;
        this.aspectRatio = aspectRatio;
    }
}
export const Countries = [
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
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
}
export class Point {
    constructor(x, y) {
        this._kind = Array.from(FigureKind).find((pair) => pair[0] === NameKindFigurePoint);
        this._isAnimate = false;
        this._wasAnimate = false;
        this._serialNumber = 0;
        this._isSelected = false;
        this._x = x;
        this._y = y;
    }
    get kind() { return this._kind; }
    set kind(value) { this._kind = value; }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
    get isAnimate() { return this._isAnimate; }
    set isAnimate(value) { this._isAnimate = value; }
    get wasAnimate() { return this._wasAnimate; }
    set wasAnimate(value) { this._wasAnimate = value; }
    get serialNumber() { return this._serialNumber; }
    set serialNumber(value) { this._serialNumber = value; }
    get isSelected() { return this._isSelected; }
    set isSelected(value) { this._isSelected = value; }
    toString() {
        return `${this.serialNumber}. ${this.kind[0]} ${Math.round(this.x)}x${Math.round(this.y)}.`;
    }
}
export class Figure extends Point {
    constructor(x, y, width) {
        super(x, y);
        this._widthOriginal = width;
        this._width = this._widthOriginal;
        this.kind = Array.from(FigureKind).find((pair) => pair[0] === NameKindFigure);
    }
    get widthOriginal() { return this._widthOriginal; }
    set widthOriginal(value) { this._widthOriginal = value; }
    get width() { return this._width; }
    set width(value) { this._width = value; }
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
    get length() { return this._length; }
    set length(value) { this._length = value; }
    get amplitude() { return this._amplitude; }
    set amplitude(value) { this._amplitude = value; }
    get period() { return this._period; }
    set period(value) { this._period = value; }
    get shading() { return this._shading; }
    set shading(value) { this._shading = value; }
}
export class Rect extends Figure {
    constructor(x, y, width, height = 0, borderWidth = 2) {
        super(x, y, width);
        this._waveParams = new WaveParameters();
        this._heightOriginal = height;
        this._height = this._heightOriginal;
        this._borderWidth = borderWidth;
        this.kind = Array.from(FigureKind).find((pair) => pair[0] === NameKindFigureRectangle);
        this.setAspectRatio();
    }
    get heightOriginal() { return this._heightOriginal; }
    set heightOriginal(value) { this._heightOriginal = value; }
    get height() { return this._height; }
    set height(value) { this._height = value; }
    get borderWidth() { return this._borderWidth; }
    set borderWidth(value) { this._borderWidth = value; }
    get aspectRatio() { return this._aspectRatio; }
    set aspectRatio(value) { this._aspectRatio = value; }
    get waveParams() { return this._waveParams; }
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
        }
        else {
            this.aspectRatio = this.width / this.height;
        }
    }
}
export class Flag extends Rect {
    constructor(x, y, width, country) {
        super(x, y, width);
        this._insideX = 0;
        this._insideY = 0;
        this._insideWidth = 0;
        this._insideHeight = 0;
        this.kind = Array.from(FigureKind).find((pair) => pair[0] === NameKindFigureFlag);
        this._country = country;
        this.borderWidth = 3;
    }
    get country() { return this._country; }
    get insideX() { return this._insideX; }
    set insideX(value) { this._insideX = value; }
    get insideY() { return this._insideY; }
    set insideY(value) { this._insideY = value; }
    get insideWidth() { return this._insideWidth; }
    set insideWidth(value) { this._insideWidth = value; }
    get insideHeight() { return this._insideHeight; }
    set insideHeight(value) { this._insideHeight = value; }
    toString() {
        return `${this.serialNumber}. ${this.kind[0]} ${this.country[0]} ${Math.round(this.x)}x${Math.round(this.y)} w${Math.round(this.width)}/h${Math.round(this.height)}.`;
    }
}
export class FlagUSA extends Flag {
    constructor(x, y, width) {
        super(x, y, width, NameCountryUSA);
        this._heightUnion = 0;
        this._widthUnion = 0;
        this._hIndentUnion = 0;
        this._hStepUnion = 0;
        this._vIndentUnion = 0;
        this._vStepUnion = 0;
        this._diameterStar = 0;
        this._heightStripe = 0;
        this.calcStandardProportions();
    }
    get heightUnion() { return this._heightUnion; }
    set heightUnion(value) { this._heightUnion = value; }
    get widthUnion() { return this._widthUnion; }
    set widthUnion(value) { this._widthUnion = value; }
    get hIndentUnion() { return this._hIndentUnion; }
    set hIndentUnion(value) { this._hIndentUnion = value; }
    get hStepUnion() { return this._hStepUnion; }
    set hStepUnion(value) { this._hStepUnion = value; }
    get vIndentUnion() { return this._vIndentUnion; }
    set vIndentUnion(value) { this._vIndentUnion = value; }
    get vStepUnion() { return this._vStepUnion; }
    set vStepUnion(value) { this._vStepUnion = value; }
    get diameterStar() { return this._diameterStar; }
    set diameterStar(value) { this._diameterStar = value; }
    get heightStripe() { return this._heightStripe; }
    set heightStripe(value) { this._heightStripe = value; }
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
    constructor(x, y, width, country, url, aspectRatio = 2) {
        super(x, y, width, country);
        this._url = '';
        this._isLoad = false;
        this._img = new Image();
        this._url = url;
        this.aspectRatio = aspectRatio;
        this.img.addEventListener('load', () => { this._isLoad = true; }, false);
        this.img.src = this.url;
    }
    get url() { return this._url; }
    get isLoad() { return this._isLoad; }
    get img() { return this._img; }
}
//# sourceMappingURL=modelMWS.js.map