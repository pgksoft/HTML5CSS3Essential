import { GradientProperties, Colors } from '../../../../js-advanced/colorManagement.js';
import { ElementKind, FillTypeColor, FillTypeInitialGradient, FillTypeRedrawGradient, FillType } from '../bmParams.js';
export class Figure {
    constructor(kind) {
        this._ordinal = 0;
        this._startX = 0;
        this._startY = 0;
        this._x = 0;
        this._y = 0;
        this._size = 30;
        this._borderWidth = 5;
        this._angleAlfa = 1;
        this._speed = 1;
        this._countSteps = 0;
        this._lengthPath = 0;
        this._step = 0;
        this._fillType = FillType.entries().next().value;
        this._isGradientDefined = null;
        this._gradientPropertiesInside = new GradientProperties();
        this._gradientPropertiesBorder = new GradientProperties();
        this._isInitLog = false;
        this._kind = kind;
    }
    get kind() { return this._kind; }
    get ordinal() { return this._ordinal; }
    set ordinal(value) { this._ordinal = value; }
    get startX() { return this._startX; }
    set startX(value) { this._startX = value; }
    get startY() { return this._startY; }
    set startY(value) { this._startY = value; }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
    get size() { return this._size; }
    set size(value) { this._size = value; }
    get borderWidth() { return this._borderWidth; }
    set borderWidth(value) { this._borderWidth = value; }
    get angleAlfa() { return this._angleAlfa; }
    set angleAlfa(value) { this._angleAlfa = value; }
    get speed() { return this._speed; }
    set speed(value) { this._speed = value; }
    get countSteps() { return this._countSteps; }
    set countSteps(value) { this._countSteps = value; }
    get lengthPath() { return this._lengthPath; }
    set lengthPath(value) { this._lengthPath = value; }
    get step() { return this._step; }
    set step(value) { this._step = value; }
    get fillType() { return this._fillType; }
    set fillType(value) { this._fillType = value; }
    get colorInside() { return this._colorInside; }
    set colorInside(value) { this._colorInside = value; }
    get colorBorder() { return this._colorBorder; }
    set colorBorder(value) { this._colorBorder = value; }
    get isGradientDefined() { return this._isGradientDefined; }
    set isGradientDefined(value) { this._isGradientDefined = value; }
    get gradientInside() { return this._gradientInside; }
    set gradientInside(value) { this._gradientInside = value; }
    get gradientBorder() { return this._gradientBorder; }
    set gradientBorder(value) { this._gradientBorder = value; }
    get gradientPropertiesInside() { return this._gradientPropertiesInside; }
    set gradientPropertiesInside(value) { this._gradientPropertiesInside = value; }
    get gradientPropertiesBorder() { return this._gradientPropertiesBorder; }
    set gradientPropertiesBorder(value) { this._gradientPropertiesBorder = value; }
    get isInitLog() { return this._isInitLog; }
    set isInitLog(value) { this._isInitLog = value; }
    Draw(context) { }
    toString() {
        if (!this.isInitLog) {
            return this.toInitLog();
        }
        else {
            return this.toLog();
        }
    }
    toInitLog() {
        this.isInitLog = true;
        return `</br>${this.ordinal}: lengthPath=${this.lengthPath}` +
            `${this.toLog()}`;
    }
    toLog() {
        return `</br>${this.ordinal}: step=${this.step}, X=${this.x}, Y=${this.y}, countSteps=${this.countSteps}, statrtX=${this.startX}, startY=${this.startY},  angleAlfa=${this.angleAlfa}`;
    }
}
export class Square extends Figure {
    constructor() {
        super(Array.from(ElementKind.entries()).find((pair) => pair[0] === 'Квадрат'));
    }
    Draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.size, this.size);
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorBorder;
        }
        else if (this.fillType[0] === FillTypeInitialGradient || this.fillType[0] === FillTypeRedrawGradient) {
            if (this.fillType[0] === FillTypeRedrawGradient) {
                this.gradientBorder = Colors.instance.RestoreFillBoxLineGradient(context, this.x, this.y, this.size, this.gradientPropertiesBorder);
            }
            context.fillStyle = this.gradientBorder;
        }
        context.fill();
        context.beginPath();
        context.rect(this.x + this.borderWidth, this.y + this.borderWidth, this.size - this.borderWidth * 2, this.size - this.borderWidth * 2);
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorInside;
        }
        else if (this.fillType[0] === FillTypeInitialGradient || this.fillType[0] === FillTypeRedrawGradient) {
            if (this.fillType[0] === FillTypeRedrawGradient) {
                this.gradientInside = Colors.instance.RestoreFillBoxLineGradient(context, this.x + this.borderWidth, this.y + this.borderWidth, this.size - this.borderWidth * 2, this.gradientPropertiesInside);
            }
            context.fillStyle = this.gradientInside;
        }
        context.fill();
    }
}
export class Circle extends Figure {
    constructor() {
        super(Array.from(ElementKind.entries()).find((pair) => pair[0] === 'Круг'));
    }
    Draw(context) {
        context.beginPath();
        let radius = this.size / 2;
        let degrees = Math.PI * 2;
        context.arc(this.x + radius, this.y + radius, radius, 0, degrees, false);
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorBorder;
        }
        else if (this.fillType[0] === FillTypeInitialGradient || this.fillType[0] === FillTypeRedrawGradient) {
            if (this.fillType[0] == FillTypeRedrawGradient) {
                this.gradientBorder = Colors.instance.RestoreFillBoxLineGradient(context, this.x, this.y, this.size, this.gradientPropertiesBorder);
            }
            context.fillStyle = this.gradientBorder;
        }
        context.fill();
        context.beginPath();
        context.arc(this.x + radius, this.y + radius, radius - this.borderWidth, 0, degrees, false);
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorInside;
        }
        else if (this.fillType[0] === FillTypeInitialGradient || this.fillType[0] === FillTypeRedrawGradient) {
            if (this.fillType[0] === FillTypeRedrawGradient) {
                this.gradientInside = Colors.instance.RestoreFillBoxLineGradient(context, this.x + this.borderWidth, this.y + this.borderWidth, this.size - this.borderWidth * 2, this.gradientPropertiesInside);
            }
            context.fillStyle = this.gradientInside;
        }
        context.fill();
    }
}
//# sourceMappingURL=brownianMotion.js.map