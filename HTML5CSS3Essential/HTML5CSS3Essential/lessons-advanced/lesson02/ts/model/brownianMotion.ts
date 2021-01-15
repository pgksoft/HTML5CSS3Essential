import { GradientProperties, Colors } from '../../../../js-advanced/colorManagement.js'
import {
    ElementKind,
    FillTypeAny,
    FillTypeColor,
    FillTypeInitialGradient,
    FillTypeRedrawGradient,
    FillType
} from '../bmParams.js'

export class Figure {
    constructor(kind: [string, number]) {
        this._kind = kind;
    }

    // Fields - fisure options
    private _kind: [string, number];
    private _ordinal: number = 0;
    private _startX: number = 0;
    private _startY: number = 0;
    private _x: number = 0;
    private _y: number = 0;
    private _size: number = 30;
    private _borderWidth: number = 5;
    // Fields - motion options
    private _angleAlfa: number = 1;
    private _speed: number = 1;
    private _countSteps: number = 0;
    private _lengthPath: number = 0;
    private _step: number = 0;
    private _fillType: [string, number] = FillType.entries().next().value;
    private _colorInside: string;
    private _colorBorder: string;
    private _isGradientDefined: boolean = null;
    private _gradientInside: CanvasGradient;
    private _gradientBorder: CanvasGradient;
    private _gradientPropertiesInside: GradientProperties = new GradientProperties();
    private _gradientPropertiesBorder: GradientProperties = new GradientProperties();
    private _isInitLog: boolean = false;

    // Properties - figure options
    get kind(): [string, number] { return this._kind; }
    get ordinal(): number { return this._ordinal; }
    set ordinal(value: number) { this._ordinal = value; }
    get startX(): number { return this._startX; }
    set startX(value: number) { this._startX = value; }
    get startY(): number { return this._startY; }
    set startY(value: number) { this._startY = value; }
    get x(): number { return this._x; }
    set x(value: number) { this._x = value; }
    get y(): number { return this._y; }
    set y(value: number) { this._y = value; }
    get size(): number { return this._size; }
    set size(value: number) { this._size = value; }
    get borderWidth(): number { return this._borderWidth; }
    set borderWidth(value: number) { this._borderWidth = value; }
    // Properties - motion options
    get angleAlfa(): number { return this._angleAlfa; }
    set angleAlfa(value: number) { this._angleAlfa = value; }
    get speed(): number { return this._speed; }
    set speed(value: number) { this._speed = value; }
    get countSteps(): number { return this._countSteps; }
    set countSteps(value: number) { this._countSteps = value; }
    get lengthPath(): number { return this._lengthPath; }
    set lengthPath(value: number) { this._lengthPath = value; }
    get step(): number { return this._step; }
    set step(value: number) { this._step = value; }
    get fillType(): [string, number] { return this._fillType; }
    set fillType(value: [string, number]) { this._fillType = value; }
    get colorInside(): string { return this._colorInside; }
    set colorInside(value: string) { this._colorInside = value; }
    get colorBorder(): string { return this._colorBorder; }
    set colorBorder(value: string) { this._colorBorder = value; }
    get isGradientDefined(): boolean { return this._isGradientDefined; }
    set isGradientDefined(value: boolean) { this._isGradientDefined = value; }
    get gradientInside(): CanvasGradient { return this._gradientInside; }
    set gradientInside(value: CanvasGradient) { this._gradientInside = value; }
    get gradientBorder(): CanvasGradient { return this._gradientBorder; }
    set gradientBorder(value: CanvasGradient) { this._gradientBorder = value; }
    get gradientPropertiesInside(): GradientProperties { return this._gradientPropertiesInside; }
    set gradientPropertiesInside(value: GradientProperties) { this._gradientPropertiesInside = value; }
    get gradientPropertiesBorder(): GradientProperties { return this._gradientPropertiesBorder; }
    set gradientPropertiesBorder(value: GradientProperties) { this._gradientPropertiesBorder = value; }
    get isInitLog(): boolean { return this._isInitLog; }
    set isInitLog(value: boolean) { this._isInitLog = value }
    //

    // Methods
    Draw(context: CanvasRenderingContext2D): void { }

    toString(): string {
        if (!this.isInitLog) {
            return this.toInitLog();
        } else {
            return this.toLog();
        }
    }

    // Helpers
    private toInitLog(): string {
        this.isInitLog = true;
        return `</br>${this.ordinal}: lengthPath=${this.lengthPath}` +
            `${this.toLog()}`;
    }

    private toLog(): string {
        return `</br>${this.ordinal}: step=${this.step}, X=${this.x}, Y=${this.y}, countSteps=${this.countSteps}, statrtX=${this.startX}, startY=${this.startY},  angleAlfa=${this.angleAlfa}`;
    }
}

export class Square extends Figure {
    constructor() {
        super(Array.from(ElementKind.entries()).find((pair) => pair[0] === 'Квадрат'));
    }
    Draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.rect(
            this.x,
            this.y,
            this.size,
            this.size
        );
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorBorder;
        } else if (this.fillType[0] === FillTypeInitialGradient || this.fillType[0] === FillTypeRedrawGradient) {
            if (this.fillType[0] === FillTypeRedrawGradient) {
                this.gradientBorder = Colors.instance.RestoreFillBoxLineGradient(context, this.x, this.y, this.size, this.gradientPropertiesBorder);
            }
            context.fillStyle = this.gradientBorder;
        }
        context.fill();
        //
        context.beginPath();
        context.rect(
            this.x + this.borderWidth,
            this.y + this.borderWidth,
            this.size - this.borderWidth * 2,
            this.size - this.borderWidth * 2
        );
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorInside;
        } else if (this.fillType[0] === FillTypeInitialGradient || this.fillType[0] === FillTypeRedrawGradient) {
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
    Draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        let radius = this.size / 2;
        let degrees = Math.PI * 2;
        context.arc(this.x + radius, this.y + radius, radius, 0, degrees, false); // Внешняя окружность
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorBorder;
        } else if (this.fillType[0] === FillTypeInitialGradient || this.fillType[0] === FillTypeRedrawGradient) {
            if (this.fillType[0] == FillTypeRedrawGradient) {
                this.gradientBorder = Colors.instance.RestoreFillBoxLineGradient(context, this.x, this.y, this.size, this.gradientPropertiesBorder);
            }
            context.fillStyle = this.gradientBorder;
        }
        //
        context.fill();
        context.beginPath();
        context.arc(this.x + radius, this.y + radius, radius - this.borderWidth, 0, degrees, false); // Внешняя окружность
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorInside;
        } else if (this.fillType[0] === FillTypeInitialGradient || this.fillType[0] === FillTypeRedrawGradient) {
            if (this.fillType[0] === FillTypeRedrawGradient) {
                this.gradientInside = Colors.instance.RestoreFillBoxLineGradient(context, this.x + this.borderWidth, this.y + this.borderWidth, this.size - this.borderWidth * 2, this.gradientPropertiesInside);
            }
            context.fillStyle = this.gradientInside;
        }
        context.fill();
    }
}