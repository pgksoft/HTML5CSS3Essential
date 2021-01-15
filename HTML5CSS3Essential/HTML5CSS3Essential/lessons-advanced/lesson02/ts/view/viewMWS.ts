// Multi-System Window Modeling 
// View of Multi-System Window

import {
    Colors,
    GradientProperties,
    RadialDirection
} from '../../../../js-advanced/colorManagement.js'
import {
    CustomEventOverFill,
    CustomEventIsSelected,
    WPropStored,
    Params,
    FillType,
    FillTypeAny,
    FillTypeColor,
    FillTypeLinearGradient,
    FillTypeRadialGradient
} from '../model/mwsParams.js'
import {
    MwsConstraints,
    NameKindFigureRectangle,
    NameKindFigureFlag,
    NameCountryUSA,
    Point,
    Rect,
    FlagUSA,
    FlagImg,
    FigureKind,
    RecoveryParameters
} from '../model/modelMWS.js'
import { isDisplayBlock } from '../../../../js-advanced/_pgkUtils.js'


class LSKeyList {
    app: string = 'MultiSystemWindowModeling-List';
}

class LSValueList {
    list: WPropStored[] = [];
}

interface IMouseAction {
    (x: number, y: number, canvas: HTMLCanvasElement, sizeResizingZone: number, windows: ViewRect[]): number;
}

// Custom Events
const CustomEventIsResize: string = 'mwsmIsResize';
const CustomEventIsMove: string = 'mwsmIsMove';
const CustomEventCLoseClick: string = 'mwsm-CLose-click';
const CustomEventMinimizeClick: string = 'mwsm-Minimize-click';
const CustomEventMaximizeClick: string = 'mwsm-Maxmize-click';
const CustomEventRestoreDownClick: string = 'mwsm-RestoreDown-click';
// 
const cursorDefault: string = 'default';
const cursorPointer: string = 'pointer';
const cursorResizeEW: string = 'ew-resize';       //  East-West Восток-Запад
const cursorResizeNS: string = 'ns-resize';       //  North-South Север-Юг
const cursorResizeNESW: string = 'nesw-resize';   //  North-East/South-West Север-Восток/Юг-Запад
const cursorResizeNWSE: string = 'nwse-resize';   //  North-West/South-East Север-Запад/Юг-Восток
//
const commandCreateTaskBar: string = 'create';
const commandWindowSelectedTaskBar: string = 'selected';
const commandOverFillTaskBar: string = 'over-fill';
//
const symbolClose: string = '´';
const symbolMinimize: string = '‒';
const symbolMaximize: string = '1';
const symbolRestoreDown: string = '2';
const nameFontSymbolClose: string = 'Symbol';
const nameFontSymbolMinimize: string = 'Roboto Condensed';
const nameFontSymbolMaximize: string = 'Webdings';
const nameFontSymbolRestoreDown: string = 'Webdings';

enum DirectionOfResizing { NoDirection, EastWestLeft, EastWestRight, NorthSouthTop, NorthSouthDown, NESWTopRight, NESWBootomLeft, NWSELeftTop, NWSERightBottom }

class EventHandlers {
    // Fields 
    private _mouseMove: Map<number, IMouseAction> = new Map();
    private _mouseDown: Map<number, IMouseAction> = new Map();
    private _mouseUp: Map<number, IMouseAction> = new Map();
    private _mouseClick: Map<number, IMouseAction> = new Map();
    // Properties
    get mouseMove(): Map<number, IMouseAction> { return this._mouseMove; }
    get mouseDown(): Map<number, IMouseAction> { return this._mouseDown; }
    get mouseUp(): Map<number, IMouseAction> { return this._mouseUp; }
    get mouseClick(): Map<number, IMouseAction> { return this._mouseClick; }
}

class StatesKeeper {
    private constructor() { }
    // Fields
    private static _instance: StatesKeeper = undefined;
    private _serialNumberResizeEW: number = 0;
    private _serialNumberResizeNS: number = 0;
    private _serialNumberResizeNESW: number = 0;
    private _serialNumberResizeNWSE: number = 0;
    private _directResizing: DirectionOfResizing = DirectionOfResizing.NoDirection;
    private _sizeResizingZone: number = 0;
    private _serialNumberHoverClose: number = 0;
    private _serialNumberHoverMinimize: number = 0;
    private _serialNumberHoverMaximize: number = 0;
    private _serialNumberHoverRestoreDown: number = 0;

    // Properties
    static get instance(): StatesKeeper {
        if (!StatesKeeper._instance) {
            StatesKeeper._instance = new StatesKeeper();
        }
        return StatesKeeper._instance;
    }
    get serialNumberResizeEW(): number { return this._serialNumberResizeEW; }
    set serialNumberResizeEW(value: number) { this._serialNumberResizeEW = value; }
    get serialNumberResizeNS(): number { return this._serialNumberResizeNS; }
    set serialNumberResizeNS(value: number) { this._serialNumberResizeNS = value; }
    get serialNumberResizeNESW(): number { return this._serialNumberResizeNESW; }
    set serialNumberResizeNESW(value: number) { this._serialNumberResizeNESW = value; }
    get serialNumberResizeNWSE(): number { return this._serialNumberResizeNWSE; }
    set serialNumberResizeNWSE(value: number) { this._serialNumberResizeNWSE = value; }
    get directResizing(): DirectionOfResizing { return this._directResizing; }
    set directResizing(value: DirectionOfResizing) { this._directResizing = value; }
    get sizeResizingZone(): number { return this._sizeResizingZone; }
    set sizeResizingZone(value: number) { this._sizeResizingZone = value; }
    get serialNumberHoverClose(): number { return this._serialNumberHoverClose; }
    set serialNumberHoverClose(value: number) { this._serialNumberHoverClose = value; }
    get serialNumberHoverMinimize() { return this._serialNumberHoverMinimize; }
    set serialNumberHoverMinimize(value: number) { this._serialNumberHoverMinimize = value; }
    get serialNumberHoverMaximize(): number { return this._serialNumberHoverMaximize; }
    set serialNumberHoverMaximize(value: number) { this._serialNumberHoverMaximize = value; }
    get serialNumberHoverRestoreDown(): number { return this._serialNumberHoverRestoreDown; }
    set serialNumberHoverRestoreDown(value: number) { this._serialNumberHoverRestoreDown = value; }
    // Methods
    Clear(): void {
        this.serialNumberResizeEW = 0;
        this.serialNumberResizeNS = 0;
        this.serialNumberResizeNESW = 0;
        this.serialNumberResizeNWSE = 0;
        this.directResizing = DirectionOfResizing.NoDirection;
    }
}

class ViewRect {
    constructor(
        rect: Rect,
        colorFill: string = 'yellow',
        colorStroke: string = 'darkred'
    ) {
        this._rect = rect;
        this._colorFill = colorFill;
        this._colorStroke = colorStroke;
        //
        this.DefineEvents();
    }
    // Fields
    private _statesKeeper: StatesKeeper = StatesKeeper.instance;
    private _recoveryParameters: RecoveryParameters = new RecoveryParameters();
    private _rect: Rect;
    private _headerHeight: number = 0;
    private _fillType: [string, number] = FillType.entries().next().value;
    private _colorStroke: string;
    private _colorFill: string;
    private _gradientInside: CanvasGradient;
    private _gradientBorder: CanvasGradient;
    private _propertiesGradientInside: GradientProperties = new GradientProperties();
    private _propertiesGradientBorder: GradientProperties = new GradientProperties();
    private _measureCaptionHead: TextMetrics;
    private _measureCaptionMinimize: TextMetrics;
    private _measureCaptionRestoreDown: TextMetrics;
    private _measureCaptionMaximize: TextMetrics;
    private _measureCaptionClose: TextMetrics;
    private _fontSize: number = 10;
    private _contextData: Uint8ClampedArray;
    private _isMouseDown: boolean = false;
    private _isResize: boolean = false;
    private _isResizeEW: boolean = false;
    private _isResizeNS: boolean = false;
    private _isResizeNESW: boolean = false;
    private _isResizeNWSE: boolean = false;
    private _startMove: Point = new Point(0, 0);
    private _newMove: Point = new Point(0, 0);
    private _isMaximize: boolean = false;
    private _isMinimize: boolean = false;
    // Properties
    get statesKeeper(): StatesKeeper { return this._statesKeeper; }
    get rect(): Rect { return this._rect; }
    get headerHeight(): number { return this._headerHeight; }
    set headerHeight(value: number) { this._headerHeight = value; }
    get fillType(): [string, number] { return this._fillType; }
    set fillType(value: [string, number]) { this._fillType = value; }
    get colorFill(): string { return this._colorFill; }
    set colorFill(value: string) { this._colorFill = value; }
    get colorStroke(): string { return this._colorStroke; }
    set colorStroke(value: string) { this._colorStroke = value; }
    get gradientInside(): CanvasGradient { return this._gradientInside; }
    set gradientInside(value: CanvasGradient) { this._gradientInside = value; }
    get gradientBorder(): CanvasGradient { return this._gradientBorder; }
    set gradientBorder(value: CanvasGradient) { this._gradientBorder = value; }
    get propertiesGradientInside(): GradientProperties { return this._propertiesGradientInside; }
    set propertiesGradientInside(value: GradientProperties) { this._propertiesGradientInside = value; }
    get propertiesGradientBorder(): GradientProperties { return this._propertiesGradientBorder; }
    set propertiesGradientBorder(value: GradientProperties) { this._propertiesGradientBorder = value; }
    get measureCaptionHead(): TextMetrics { return this._measureCaptionHead };
    set measureCaptionHead(value: TextMetrics) { this._measureCaptionHead = value };
    get measureCaptionMinimize(): TextMetrics { return this._measureCaptionMinimize; }
    set measureCaptionMinimize(value: TextMetrics) { this._measureCaptionMinimize = value; }
    get measureCaptionRestoreDown(): TextMetrics { return this._measureCaptionRestoreDown; }
    set measureCaptionRestoreDown(value: TextMetrics) { this._measureCaptionRestoreDown = value; }
    get measureCaptionMaximize(): TextMetrics { return this._measureCaptionMaximize; }
    set measureCaptionMaximize(value: TextMetrics) { this._measureCaptionMaximize = value; }
    get measureCaptionClose(): TextMetrics { return this._measureCaptionClose };
    set measureCaptionClose(value: TextMetrics) { this._measureCaptionClose = value };
    get fontSize(): number { return this._fontSize; }
    set fontSize(value: number) { this._fontSize = value; }
    get isMouseDown(): boolean { return this._isMouseDown; }
    get isResize(): boolean { return this._isResize; }
    set isResize(value: boolean) { this._isResize = value; }
    get isResizeEW(): boolean { return this._isResizeEW; }
    set isResizeEW(value: boolean) { this._isResizeEW = value; }
    get isResizeNS(): boolean { return this._isResizeNS; }
    set isResizeNS(value: boolean) { this._isResizeNS = value; }
    get isResizeNESW(): boolean { return this._isResizeNESW; }
    set isResizeNESW(value: boolean) { this._isResizeNESW = value; }
    get isResizeNWSE(): boolean { return this._isResizeNWSE; }
    set isResizeNWSE(value: boolean) { this._isResizeNWSE = value; }
    get startMove(): Point { return this._startMove; }
    get newMove(): Point { return this._newMove; }
    get isMaximize(): boolean { return this._isMaximize; }
    set isMaximize(value: boolean) { this._isMaximize = value; }
    get isMinimize(): boolean { return this._isMinimize; }
    set isMinimize(value: boolean) { this._isMinimize = value; }
    get recoveryParameters(): RecoveryParameters { return this._recoveryParameters; }

    // Methods
    draw(context: CanvasRenderingContext2D) {
        this.drawHeader(context);
        //
        context.globalAlpha = 1;
        context.beginPath();
        context.rect(
            this.rect.x,
            this.rect.y + this.headerHeight,
            this.rect.width,
            this.rect.height - this.headerHeight
        );
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorStroke;
        } else if (this.fillType[0] === FillTypeLinearGradient) {
            this.gradientBorder = Colors.instance.RestoreFillRectLineGradient(
                context,
                this.rect.x, this.rect.y + this.headerHeight, this.rect.width, this.rect.height - this.headerHeight,
                this.propertiesGradientBorder
            );
            context.fillStyle = this.gradientBorder;
        } else if (this.fillType[0] === FillTypeRadialGradient) {
            this.gradientBorder = Colors.instance.GetFillRectRadialGradient(
                context,
                Colors.instance.GetRadialParams(
                    this.rect.x,
                    this.rect.y + this.headerHeight,
                    this.rect.width,
                    this.rect.height - this.headerHeight,
                    this.propertiesGradientBorder.radialDirection
                ),
                this.propertiesGradientBorder.colorScheme
            );
            context.fillStyle = this.gradientBorder;
        }
        context.fill();
        //
        context.beginPath();
        context.rect(
            this.rect.x + this.rect.borderWidth,
            this.rect.y + this.headerHeight + this.rect.borderWidth,
            this.rect.width - this.rect.borderWidth * 2,
            this.rect.height - this.headerHeight - this.rect.borderWidth * 2
        );
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorFill;
        } else if (this.fillType[0] === FillTypeLinearGradient) {
            this.gradientInside = Colors.instance.RestoreFillRectLineGradient(
                context,
                this.rect.x + this.rect.borderWidth,
                this.rect.y + this.headerHeight + this.rect.borderWidth,
                this.rect.width - this.rect.borderWidth * 2,
                this.rect.height - this.headerHeight - this.rect.borderWidth * 2,
                this.propertiesGradientInside
            );
            context.fillStyle = this.gradientInside;
        } else if (this.fillType[0] === FillTypeRadialGradient) {
            this.gradientInside = Colors.instance.GetFillRectRadialGradient(
                context,
                Colors.instance.GetRadialParams(
                    this.rect.x + this.rect.borderWidth,
                    this.rect.y + this.headerHeight + this.rect.borderWidth,
                    this.rect.width - this.rect.borderWidth * 2,
                    this.rect.height - this.headerHeight - this.rect.borderWidth * 2,
                    this.propertiesGradientInside.radialDirection
                ),
                this.propertiesGradientInside.colorScheme
            );
            context.fillStyle = this.gradientInside;
        }
        context.fill();
        // After drawing, be sure to keep the original state of the flag.
        this._contextData = context.getImageData(this.rect.x, this.rect.y, this.rect.width, this.rect.height).data;
    }

    // Event Handling Methods
    mouseDownHandler(x: number, y: number, canvas: HTMLCanvasElement, sizeResizingZone: number, windows: ViewRect[]): number {
        if (this.isMinimize) return 0;
        let maxLayer: number = this.GetMaxLayer(x, y, sizeResizingZone, windows); // as serialNumber
        if (this.isInside(x, y, maxLayer, sizeResizingZone)) {
            Params.instance.serialNumberTracking = this.rect.serialNumber;
            this._isMouseDown = true;
            this.rect.setOriginal();
            this.startMove.x = x;
            this.startMove.y = y;
            if (!this.rect.isSelected) {
                document.dispatchEvent(new CustomEvent(CustomEventIsSelected, { bubbles: true, detail: { serialNumber: this.rect.serialNumber, x: x, y: y } }));
            }
            return this.rect.serialNumber;
        } else {
            return 0;
        }
    }

    mouseMoveHandler(x: number, y: number, canvas: HTMLCanvasElement, sizeResizingZone: number, windows: ViewRect[]): number {
        if (this.isMinimize) return 0;
        if (!this.isMouseDown && !windows.some(item => item.isMouseDown)) {
            let maxLayer: number = this.GetMaxLayer(x, y, sizeResizingZone, windows); // as serialNumber
            if (this.isInside(x, y, maxLayer, sizeResizingZone)) {
                // Getting into the resizing zone
                if ((this.isLeftResizeEW(x, sizeResizingZone) || this.isRightResizeEW(x, sizeResizingZone)) && this.isYResizeEW(y, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeEW = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeEW;
                    this.isResize = true;
                    this.isResizeEW = true;
                    this.statesKeeper.directResizing = this.isLeftResizeEW(x, sizeResizingZone) ? DirectionOfResizing.EastWestLeft : DirectionOfResizing.EastWestRight;
                } else if ((this.isTopResizeNS(y, sizeResizingZone) || this.isDownResizeNS(y, sizeResizingZone)) && this.isXResizeNS(x, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeNS = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeNS;
                    this.isResize = true;
                    this.isResizeNS = true;
                    this.statesKeeper.directResizing = this.isTopResizeNS(y, sizeResizingZone) ? DirectionOfResizing.NorthSouthTop : DirectionOfResizing.NorthSouthDown;
                } else if (this.isResizeNESWTopRight(x, y, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeNESW = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeNESW;
                    this.isResize = true;
                    this.isResizeNESW = true;
                    this.statesKeeper.directResizing = DirectionOfResizing.NESWTopRight;
                } else if (this.isResizeNESWBottomLeft(x, y, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeNESW = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeNESW;
                    this.isResize = true;
                    this.isResizeNESW = true;
                    this.statesKeeper.directResizing = DirectionOfResizing.NESWBootomLeft;
                } else if (this.isResizeNWSELeftTop(x, y, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeNESW = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeNWSE;
                    this.isResize = true;
                    this.isResizeNWSE = true;
                    this.statesKeeper.directResizing = DirectionOfResizing.NWSELeftTop;
                } else if (this.isResizeNWSERightBottom(x, y, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeNESW = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeNWSE;
                    this.isResize = true;
                    this.isResizeNWSE = true;
                    this.statesKeeper.directResizing = DirectionOfResizing.NWSERightBottom;
                } else if (this.isCloseButton(x, y)) {
                    this.ResetMoveMouse(canvas);
                    this.statesKeeper.serialNumberHoverClose = this.rect.serialNumber;
                    let context: CanvasRenderingContext2D = canvas.getContext('2d');
                    this.DrawHeaderHoverClose(context, this.GetFontSize(context));
                } else if (this.isMinimizeButton(x, y)) {
                    this.ResetMoveMouse(canvas);
                    this.statesKeeper.serialNumberHoverMinimize = this.rect.serialNumber;
                    let context: CanvasRenderingContext2D = canvas.getContext('2d');
                    this.DrawHeaderHoverMinimize(context, this.GetFontSize(context));
                } else if (!this.isMaximize && this.isMaximizeButton(x, y)) {
                    this.ResetMoveMouse(canvas);
                    this.statesKeeper.serialNumberHoverMaximize = this.rect.serialNumber;
                    let context: CanvasRenderingContext2D = canvas.getContext('2d');
                    this.DrawHeaderHoverMaximize(context, this.GetFontSize(context));
                } else if (this.isMaximize && this.isRestoreDownButton(x, y)) {
                    this.ResetMoveMouse(canvas);
                    this.statesKeeper.serialNumberHoverRestoreDown = this.rect.serialNumber;
                    let context: CanvasRenderingContext2D = canvas.getContext('2d');
                    this.DrawHeaderHoverRestoreDown(context, this.GetFontSize(context));
                } else {
                    this.statesKeeper.Clear();
                    this.ResizeOff();
                    this.ResetMoveMouse(canvas);
                    canvas.dataset.cursor = cursorDefault;
                }
                Params.instance.serialNumberTracking = this.rect.serialNumber;
                return this.rect.serialNumber;
            } else {
                this.ResetMoveMouse(canvas);
                return 0;
            }
        } else if (this.isMouseDown) {
            let isResizeXY: boolean = false;
            if (this.isResize && this.isResizeEW && this.statesKeeper.directResizing == DirectionOfResizing.EastWestLeft) {
                if (x > 0 && x < this.rect.x + this.rect.width - Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth())) {
                    if (this.rect.x !== x) {
                        if (x < this.rect.x) this.rect.width += this.rect.x - x;
                        if (x > this.rect.x) this.rect.width -= x - this.rect.x;
                        this.rect.x = x;
                        document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                    }
                }
            } else if (this.isResize && this.isResizeEW && this.statesKeeper.directResizing == DirectionOfResizing.EastWestRight) {
                if (x > this.rect.x + Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth()) && x < canvas.width) {
                    if (this.rect.x + this.rect.width !== x) {
                        this.rect.width = x - this.rect.x;
                        document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                    }
                }
                document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
            } else if (this.isResize && this.isResizeNS && this.statesKeeper.directResizing == DirectionOfResizing.NorthSouthTop) {
                if (y > 0 && y < this.rect.y + this.rect.height - (this.fontSize + 2) - this.rect.borderWidth * 2 - 5) {
                    if (y !== this.rect.y) {
                        if (y < this.rect.y) this.rect.height += this.rect.y - y;
                        if (y > this.rect.y) this.rect.height -= y - this.rect.y;
                        this.rect.y = y;
                        document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                    }
                }
            } else if (this.isResize && this.isResizeNS && this.statesKeeper.directResizing == DirectionOfResizing.NorthSouthDown) {
                if (y > this.rect.y + (this.fontSize + 2) + this.rect.borderWidth * 2 + 5 && y < canvas.height) {
                    if (y !== this.rect.y + this.rect.height) {
                        this.rect.height = y - this.rect.y;
                        document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                    }
                }
            } else if (this.isResize && this.isResizeNESW && this.statesKeeper.directResizing == DirectionOfResizing.NESWTopRight) {
                isResizeXY = false;
                if (x > this.rect.x + Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth()) && x < canvas.width) {
                    if (this.rect.x + this.rect.width !== x) {
                        this.rect.width = x - this.rect.x;
                        isResizeXY = true;
                    }
                }
                if (y > 0 && y < this.rect.y + this.rect.height - (this.fontSize + 2) - this.rect.borderWidth * 2 - 5) {
                    if (y !== this.rect.y) {
                        if (y < this.rect.y) this.rect.height += this.rect.y - y;
                        if (y > this.rect.y) this.rect.height -= y - this.rect.y;
                        this.rect.y = y;
                        isResizeXY = true;
                    }
                }
                if (isResizeXY) {
                    document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                }
            } else if (this.isResize && this.isResizeNESW && this.statesKeeper.directResizing == DirectionOfResizing.NESWBootomLeft) {
                isResizeXY = false;
                if (x > 0 && x < this.rect.x + this.rect.width - Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth())) {
                    if (this.rect.x !== x) {
                        if (x < this.rect.x) this.rect.width += this.rect.x - x;
                        if (x > this.rect.x) this.rect.width -= x - this.rect.x;
                        this.rect.x = x;
                        isResizeXY = true;
                    }
                }
                if (y > this.rect.y + (this.fontSize + 2) + this.rect.borderWidth * 2 + 5 && y < canvas.height) {
                    if (y !== this.rect.y + this.rect.height) {
                        this.rect.height = y - this.rect.y;
                        isResizeXY = true;
                    }
                }
                if (isResizeXY) {
                    document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                }
            } else if (this.isResize && this.isResizeNWSE && this.statesKeeper.directResizing == DirectionOfResizing.NWSELeftTop) {
                isResizeXY = false;
                if (x > 0 && x < this.rect.x + this.rect.width - Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth())) {
                    if (this.rect.x !== x) {
                        if (x < this.rect.x) this.rect.width += this.rect.x - x;
                        if (x > this.rect.x) this.rect.width -= x - this.rect.x;
                        this.rect.x = x;
                        isResizeXY = true;
                    }
                }
                if (y > 0 && y < this.rect.y + this.rect.height - (this.fontSize + 2) - this.rect.borderWidth * 2 - 5) {
                    if (y !== this.rect.y) {
                        if (y < this.rect.y) this.rect.height += this.rect.y - y;
                        if (y > this.rect.y) this.rect.height -= y - this.rect.y;
                        this.rect.y = y;
                        isResizeXY = true;
                    }
                }
                if (isResizeXY) {
                    document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                }
            } else if (this.isResize && this.isResizeNWSE && this.statesKeeper.directResizing == DirectionOfResizing.NWSERightBottom) {
                isResizeXY = false;
                if (x > this.rect.x + Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth()) && x < canvas.width) {
                    if (this.rect.x + this.rect.width !== x) {
                        this.rect.width = x - this.rect.x;
                        isResizeXY = true;
                    }
                }
                if (y > this.rect.y + (this.fontSize + 2) + this.rect.borderWidth * 2 + 5 && y < canvas.height) {
                    if (y !== this.rect.y + this.rect.height) {
                        this.rect.height = y - this.rect.y;
                        isResizeXY = true;
                    }
                }
                if (isResizeXY) {
                    document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                }
            } else {
                // IsMove
                let xShift: number = x - this.startMove.x;
                let yShift: number = y - this.startMove.y;
                this.newMove.x = this.rect.x + xShift;
                this.newMove.y = this.rect.y + yShift;
                if (this.newMove.x > 0 && this.newMove.y > 0 && this.newMove.x + this.rect.width <= canvas.width && this.newMove.y + this.rect.height <= canvas.height) {
                    this.rect.x = this.newMove.x;
                    this.rect.y = this.newMove.y;
                    this.startMove.x = x;
                    this.startMove.y = y;
                    document.dispatchEvent(new CustomEvent(CustomEventIsMove, { bubbles: true }));
                }
            }
            return this.rect.serialNumber;
        }
    }

    mouseUpHandler(x: number, y: number, canvas: HTMLCanvasElement, sizeResizingZone: number, windows: ViewRect[]): number {
        if (this.isMinimize) return 0;
        if (!this.isMouseDown && !windows.some(item => item.isMouseDown)) {
            let maxLayer: number = this.GetMaxLayer(x, y, sizeResizingZone, windows); // as serialNumber
            if (this.isInside(x, y, maxLayer, sizeResizingZone)) {
                Params.instance.serialNumberTracking = this.rect.serialNumber;
                this._isMouseDown = false;
                return this.rect.serialNumber;
            } else {
                return 0;
            }
        } else if (this.isMouseDown) {
            this.statesKeeper.Clear();
            if (this.isResize) {
                this.ResizeOff();
                canvas.dataset.cursor = cursorDefault;
            }
            this._isMouseDown = false;
            return 0;
        }
    }

    mouseClickHandler(x: number, y: number, canvas: HTMLCanvasElement, sizeResizingZone: number, windows: ViewRect[]): number {
        if (this.isMinimize) return 0;
        let maxLayer: number = this.GetMaxLayer(x, y, sizeResizingZone, windows); // as serialNumber
        if (this.isInside(x, y, maxLayer, sizeResizingZone)) {
            Params.instance.serialNumberTracking = this.rect.serialNumber;
            if (this.isCloseButton(x, y) && this.statesKeeper.serialNumberHoverClose == this.rect.serialNumber) {
                document.dispatchEvent(new CustomEvent(CustomEventCLoseClick, { bubbles: true, detail: { serialNumber: this.rect.serialNumber } }));
            } else if (this.isMinimizeButton(x, y) && this.statesKeeper.serialNumberHoverMinimize == this.rect.serialNumber) {
                document.dispatchEvent(new CustomEvent(CustomEventMinimizeClick, { bubbles: true, detail: { serialNumber: this.rect.serialNumber } }));
            } else if (!this.isMaximize && this.isMaximizeButton(x, y) && this.statesKeeper.serialNumberHoverMaximize == this.rect.serialNumber) {
                document.dispatchEvent(new CustomEvent(CustomEventMaximizeClick, { bubbles: true, detail: { serialNumber: this.rect.serialNumber } }));
            } else if (this.isMaximize && this.isRestoreDownButton(x, y) && this.statesKeeper.serialNumberHoverRestoreDown == this.rect.serialNumber) {
                document.dispatchEvent(new CustomEvent(CustomEventRestoreDownClick, { bubbles: true, detail: { serialNumber: this.rect.serialNumber } }));
            };
            return this.rect.serialNumber;
        } else {
            return 0;
        }
    }

    // Helpers
    private DefineEvents(): void {
        document.addEventListener(CustomEventIsResize, () => { if (this.rect.isSelected) { this.SetRecoveryParameters(); } }, false);
        document.addEventListener(CustomEventIsMove, () => { if (this.rect.isSelected) { this.SetRecoveryParameters(); } }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredWidthChanged, () => { if (this.rect.isSelected) { this.SetRecoveryParameters(); } }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredHeightChanged, () => { if (this.rect.isSelected) { this.SetRecoveryParameters(); } }, false);
    }

    private drawHeader(context: CanvasRenderingContext2D) {
        let fontSize: number = this.GetFontSize(context);
        this.headerHeight = fontSize + 2;
        context.clearRect(this.rect.x, this.rect.y, this.rect.width, this.headerHeight);
        context.beginPath();
        context.rect(
            this.rect.x,
            this.rect.y,
            this.rect.width,
            this.headerHeight
        );
        context.fillStyle = 'hsl(0,0%,75%)';
        context.fill();
        context.font = `${fontSize}px Roboto Condensed`;
        if (this.rect.isSelected) {
            context.fillStyle = 'black';
        } else {
            context.fillStyle = 'gray';
        }
        context.textAlign = 'left';
        context.textBaseline = "top";
        let captionHead: string = `${this.rect.serialNumber}-${this.rect.kind[0]}`;
        context.fillText(captionHead, this.rect.x + 1, this.rect.y + 1);
        //
        this.DrawHeaderClose(context, fontSize);
        if (!this.isMaximize) {
            this.DrawHeaderMaximize(context, fontSize);
        } else {
            this.DrawHeaderRestoreDown(context, fontSize);
        }
        this.DrawHeaderMinimize(context, fontSize);
    }

    private DrawHeaderMinimize(context: CanvasRenderingContext2D, fontSize: number): void {
        context.font = `${fontSize}px ${nameFontSymbolMinimize}`;
        context.textAlign = 'right';
        context.fillText(symbolMinimize, this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone - this.measureCaptionClose.width -
            StatesKeeper.instance.sizeResizingZone * 2 - this.measureCaptionMaximize.width - StatesKeeper.instance.sizeResizingZone * 2, this.rect.y + 1);
    }

    private DrawHeaderMaximize(context: CanvasRenderingContext2D, fontSize: number): void {
        context.font = `${fontSize}px ${nameFontSymbolMaximize}`;
        context.textAlign = 'right';
        context.fillText(symbolMaximize, this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone - this.measureCaptionClose.width - StatesKeeper.instance.sizeResizingZone * 2, this.rect.y + 1);
    }

    private DrawHeaderRestoreDown(context: CanvasRenderingContext2D, fontSize: number): void {
        context.font = `${fontSize}px ${nameFontSymbolRestoreDown}`;
        context.textAlign = 'right';
        context.fillText(symbolRestoreDown, this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone - this.measureCaptionClose.width - StatesKeeper.instance.sizeResizingZone * 2, this.rect.y + 1);
    }

    private DrawHeaderClose(context: CanvasRenderingContext2D, fontSize: number): void {
        context.font = `${fontSize}px ${nameFontSymbolClose}`;
        context.textAlign = 'right';
        context.fillText(symbolClose, this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone, this.rect.y + 1);
    }

    private DrawHeaderHoverClose(context: CanvasRenderingContext2D, fontSize: number, isHover: boolean = true): void {
        let widthHover: number = StatesKeeper.instance.sizeResizingZone * 2 + this.measureCaptionClose.width;
        context.beginPath();
        context.rect(
            this.rect.x + this.rect.width - widthHover,
            this.rect.y,
            widthHover,
            this.headerHeight
        );
        if (isHover) {
            context.fillStyle = 'hsl(0,0%,90%)';
        } else {
            context.fillStyle = 'hsl(0,0%,75%)';
        }
        context.fill();
        context.closePath();
        if (this.rect.isSelected) {
            context.fillStyle = 'black';
        } else {
            context.fillStyle = 'gray';
        }
        context.font = `${fontSize}px ${nameFontSymbolClose}`;
        context.textAlign = 'right';
        context.textBaseline = "top";
        context.fillText(symbolClose, this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone, this.rect.y + 1);
    }

    private DrawHeaderHoverMinimize(context: CanvasRenderingContext2D, fontSize: number, isHover: boolean = true): void {
        let widthHover: number = StatesKeeper.instance.sizeResizingZone * 2 + this.measureCaptionMinimize.width;
        let maximizeButtonWidth: number = this.isMaximize ? this.measureCaptionRestoreDown.width : this.measureCaptionMaximize.width;
        let withBetween: number = StatesKeeper.instance.sizeResizingZone * 2;
        context.beginPath();
        context.rect(
            this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - maximizeButtonWidth - widthHover,
            this.rect.y,
            widthHover,
            this.headerHeight
        );
        if (isHover) {
            context.fillStyle = 'hsl(0,0%,90%)';
        } else {
            context.fillStyle = 'hsl(0,0%,75%)';
        }
        context.fill();
        context.closePath();
        if (this.rect.isSelected) {
            context.fillStyle = 'black';
        } else {
            context.fillStyle = 'gray';
        }
        context.font = `${fontSize}px ${nameFontSymbolMinimize}`;
        context.textAlign = 'right';
        context.textBaseline = "top";
        context.fillText(symbolMinimize, this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - maximizeButtonWidth - StatesKeeper.instance.sizeResizingZone, this.rect.y + 1);
    }

    private DrawHeaderHoverMaximize(context: CanvasRenderingContext2D, fontSize: number, isHover: boolean = true): void {
        let widthHover: number = StatesKeeper.instance.sizeResizingZone * 2 + this.measureCaptionMaximize.width;
        let withBetween: number = StatesKeeper.instance.sizeResizingZone * 2;
        context.beginPath();
        context.rect(
            this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - widthHover,
            this.rect.y,
            widthHover,
            this.headerHeight
        );
        if (isHover) {
            context.fillStyle = 'hsl(0,0%,90%)';
        } else {
            context.fillStyle = 'hsl(0,0%,75%)';
        }
        context.fill();
        context.closePath();
        if (this.rect.isSelected) {
            context.fillStyle = 'black';
        } else {
            context.fillStyle = 'gray';
        }
        context.font = `${fontSize}px ${nameFontSymbolMaximize}`;
        context.textAlign = 'right';
        context.textBaseline = "top";
        context.fillText(symbolMaximize, this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - StatesKeeper.instance.sizeResizingZone, this.rect.y + 1);
    }

    private DrawHeaderHoverRestoreDown(context: CanvasRenderingContext2D, fontSize: number, isHover: boolean = true): void {
        let widthHover: number = StatesKeeper.instance.sizeResizingZone * 2 + this.measureCaptionRestoreDown.width;
        let withBetween: number = StatesKeeper.instance.sizeResizingZone * 2;
        context.beginPath();
        context.rect(
            this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - widthHover,
            this.rect.y,
            widthHover,
            this.headerHeight
        );
        if (isHover) {
            context.fillStyle = 'hsl(0,0%,90%)';
        } else {
            context.fillStyle = 'hsl(0,0%,75%)';
        }
        context.fill();
        context.closePath();
        if (this.rect.isSelected) {
            context.fillStyle = 'black';
        } else {
            context.fillStyle = 'gray';
        }
        context.font = `${fontSize}px ${nameFontSymbolRestoreDown}`;
        context.textAlign = 'right';
        context.textBaseline = "top";
        context.fillText(symbolRestoreDown, this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - StatesKeeper.instance.sizeResizingZone, this.rect.y + 1);
    }

    private ResetMoveMouse(canvas: HTMLCanvasElement) {
        if (this.statesKeeper.serialNumberResizeEW === this.rect.serialNumber) {
            this.statesKeeper.serialNumberResizeEW = 0;
            canvas.dataset.cursor = cursorDefault;
        } else if (this.statesKeeper.serialNumberResizeNS === this.rect.serialNumber) {
            this.statesKeeper.serialNumberResizeNS = 0;
            canvas.dataset.cursor = cursorDefault;
        } else if (this.statesKeeper.serialNumberResizeNESW === this.rect.serialNumber) {
            this.statesKeeper.serialNumberResizeNESW = 0;
            canvas.dataset.cursor = cursorDefault;
        } else if (this.statesKeeper.serialNumberResizeNWSE === this.rect.serialNumber) {
            this.statesKeeper.serialNumberResizeNWSE = 0;
            canvas.dataset.cursor = cursorDefault;
        } else if (this.statesKeeper.serialNumberHoverClose === this.rect.serialNumber) {
            this.statesKeeper.serialNumberHoverClose = 0;
            let context: CanvasRenderingContext2D = canvas.getContext('2d');
            this.DrawHeaderHoverClose(context, this.GetFontSize(context), false);
        } else if (this.statesKeeper.serialNumberHoverMinimize === this.rect.serialNumber) {
            this.statesKeeper.serialNumberHoverMinimize = 0;
            let context: CanvasRenderingContext2D = canvas.getContext('2d');
            this.DrawHeaderHoverMinimize(context, this.GetFontSize(context), false);
        } else if (this.statesKeeper.serialNumberHoverMaximize === this.rect.serialNumber) {
            this.statesKeeper.serialNumberHoverMaximize = 0;
            let context: CanvasRenderingContext2D = canvas.getContext('2d');
            this.DrawHeaderHoverMaximize(context, this.GetFontSize(context), false);
        } else if (this.statesKeeper.serialNumberHoverRestoreDown === this.rect.serialNumber) {
            this.statesKeeper.serialNumberHoverRestoreDown = 0;
            let context: CanvasRenderingContext2D = canvas.getContext('2d');
            this.DrawHeaderHoverRestoreDown(context, this.GetFontSize(context), false);
        }
    }

    private GetMaxLayer(x: number, y: number, sizeResizingZone: number, windows: ViewRect[]): number {
        let maxLayer: number = 0;
        let serialNumber: number = 0;
        let layers: [number, number][] = new Array(); // first - index, second - serialNumber
        for (let i = 0; i < windows.length; i++) {
            let w: ViewRect = windows[i];
            if (x >= w.rect.x - sizeResizingZone && x <= w.rect.x + w.rect.width + sizeResizingZone && y >= w.rect.y - sizeResizingZone && y <= w.rect.y + w.rect.height + sizeResizingZone) {
                layers.push([i, w.rect.serialNumber]);
            }
        }
        if (layers.length > 1) {
            maxLayer = layers.reduce((prev: number, current: [number, number]) => current[0] > prev ? current[0] : prev, 0);
            serialNumber = layers.find(item => item[0] === maxLayer)[1];
        } else if (layers.length === 1) {
            serialNumber = layers[0][1];
        }
        return serialNumber;
    }

    private ResizeOff(): void {
        this.isResize = false;
        this.isResizeEW = false;
        this.isResizeNS = false;
        this.isResizeNESW = false;
        this.isResizeNWSE = false;
    }

    private isInside(x: number, y: number, maxLayer: number, sizeResizingZone: number): boolean {
        if (this.rect.serialNumber === maxLayer) {
            return x >= this.rect.x - sizeResizingZone && x <= this.rect.x + this.rect.width + sizeResizingZone &&
                y >= this.rect.y - sizeResizingZone && y <= this.rect.y + this.rect.height + sizeResizingZone;
        } else {
            return false;
        }
    }

    private isLeftResizeEW(x: number, sizeResizingZone: number): boolean {
        return x >= this.rect.x - sizeResizingZone && x <= this.rect.x;
    }

    private isRightResizeEW(x: number, sizeResizingZone: number): boolean {
        return x >= this.rect.x + this.rect.width && x <= this.rect.x + this.rect.width + sizeResizingZone;
    }

    private isYResizeEW(y: number, sizeResizingZone: number): boolean {
        return y >= this.rect.y + sizeResizingZone && y <= this.rect.y + this.rect.height - sizeResizingZone;
    }

    private isTopResizeNS(y: number, sizeResizingZone: number): boolean {
        return y >= this.rect.y - sizeResizingZone && y <= this.rect.y;
    }

    private isDownResizeNS(y: number, sizeResizingZone: number): boolean {
        return y >= this.rect.y + this.rect.height && y <= this.rect.y + this.rect.height + sizeResizingZone;
    }

    private isXResizeNS(x: number, sizeResizingZone: number): boolean {
        return x >= this.rect.x + sizeResizingZone && x <= this.rect.x + this.rect.width - sizeResizingZone;
    }

    private isResizeNESWTopRight(x: number, y: number, sizeResizingZone: number): boolean {
        return x >= this.rect.x + this.rect.width && x <= this.rect.x + this.rect.width + sizeResizingZone
            && y >= this.rect.y - sizeResizingZone && y <= this.rect.y;
    }

    private isResizeNESWBottomLeft(x: number, y: number, sizeResizingZone: number): boolean {
        return x >= this.rect.x - sizeResizingZone && x <= this.rect.x
            && y >= this.rect.y + this.rect.height && y <= this.rect.y + this.rect.height + sizeResizingZone;
    }

    private isResizeNWSELeftTop(x: number, y: number, sizeResizingZone: number): boolean {
        return x >= this.rect.x - sizeResizingZone && x <= this.rect.x
            && y >= this.rect.y - sizeResizingZone && y <= this.rect.y;
    }

    private isResizeNWSERightBottom(x: number, y: number, sizeResizingZone: number): boolean {
        return x >= this.rect.x + this.rect.width && x <= this.rect.x + this.rect.width + sizeResizingZone
            && y >= this.rect.y + this.rect.height && y <= this.rect.y + this.rect.height + sizeResizingZone;
    }

    private isMinimizeButton(x: number, y: number): boolean {
        let maximizeButtonWidth: number = this.isMaximize ? this.measureCaptionRestoreDown.width : this.measureCaptionMaximize.width;
        let withBetween: number = StatesKeeper.instance.sizeResizingZone * 2;
        return x > this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - maximizeButtonWidth - withBetween - this.measureCaptionMinimize.width + 1
            && x < this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - maximizeButtonWidth - 1
            && y > this.rect.y + 1 && y < this.rect.y + this.headerHeight - 1;
    }

    private isMaximizeButton(x: number, y: number): boolean {
        let withBetween: number = StatesKeeper.instance.sizeResizingZone * 2;
        return x > this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - this.measureCaptionMaximize.width + 1
            && x < this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - 1
            && y > this.rect.y + 1 && y < this.rect.y + this.headerHeight - 1;
    }

    private isRestoreDownButton(x: number, y: number): boolean {
        let withBetween: number = StatesKeeper.instance.sizeResizingZone * 2;
        return x > this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - this.measureCaptionRestoreDown.width + 1
            && x < this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - 1
            && y > this.rect.y + 1 && y < this.rect.y + this.headerHeight - 1;
    }

    private isCloseButton(x: number, y: number): boolean {
        return x > this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone * 2 - this.measureCaptionClose.width + 1
            && x < this.rect.x + this.rect.width - 1
            && y > this.rect.y + 1 && y < this.rect.y + this.headerHeight - 1;
    }

    private GetMinCaptionWidth(): number {
        return Math.floor(
            1 + this.measureCaptionHead.width +
            StatesKeeper.instance.sizeResizingZone * 2 +
            this.measureCaptionMinimize.width +
            StatesKeeper.instance.sizeResizingZone * 2 +
            this.measureCaptionMaximize.width +
            StatesKeeper.instance.sizeResizingZone * 2 +
            this.measureCaptionClose.width +
            StatesKeeper.instance.sizeResizingZone
        );
    }

    private GetFontSize(context: CanvasRenderingContext2D): number {
        let temp: number = Math.floor(context.canvas.height / 30);
        return temp < 10 ? 10 : temp;
    }

    private SetRecoveryParameters(): void {
        this.recoveryParameters.x = this.rect.x;
        this.recoveryParameters.y = this.rect.y;
        this.recoveryParameters.width = this.rect.width;
        this.recoveryParameters.height = this.rect.height;
    }

}

export class ViewMWS {
    private constructor(
        mwsArea: HTMLCanvasElement,
        mwsmStart: HTMLElement,
        menuStart: HTMLElement,
        mwsmTaskBar: HTMLElement
    ) {
        this._mwsArea = mwsArea;
        this._context = this._mwsArea.getContext('2d');
        this._mwsmStart = mwsmStart;
        this._menuStart = menuStart;
        this._mwsmTaskBar = mwsmTaskBar;
        //
        this.DefineEvents();
        this.InitScaleArea();
        //
    }

    // Fields - self management
    private static _instance: ViewMWS = undefined;

    // Fields
    private _mwsArea: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _bufferCanvas: HTMLCanvasElement = document.createElement('canvas');
    private _bufferContext: CanvasRenderingContext2D = this._bufferCanvas.getContext('2d');
    private _windows: ViewRect[] = [];
    private _canvasEventHandlers: EventHandlers = new EventHandlers();
    private _sizeResizingZone: number;
    private _mwsmStart: HTMLElement;
    private _menuStart: HTMLElement;
    private _mwsmTaskBar: HTMLElement;

    // Properties
    static get instance(): ViewMWS {
        if (!ViewMWS._instance) {
            throw new Error('Instance of ViewMWS was not created.');
        }
        return ViewMWS._instance;
    }
    get mwsArea(): HTMLCanvasElement { return this._mwsArea; }
    get context(): CanvasRenderingContext2D { return this._context; }

    // Properties - helpers
    get windows(): ViewRect[] { return this._windows; }
    private get fillType(): [string, number] {
        let type: [string, number] = Params.instance.wPropStored.fillType;
        if (type[0] === FillTypeAny) {
            let element: number = Colors.instance.RandomInt(1, FillType.size - 1);
            type = Array.from(FillType.entries()).find((pair) => pair[1] == element);
        }
        return type;
    }

    // Methods
    static Create(
        mwsArea: HTMLCanvasElement,
        mwsmStart: HTMLElement,
        menuStart: HTMLElement,
        mwsmTaskBar: HTMLElement
    ): ViewMWS {
        if (!ViewMWS._instance) {
            ViewMWS._instance = new ViewMWS(
                mwsArea,
                mwsmStart,
                menuStart,
                mwsmTaskBar
            );
        }
        return ViewMWS._instance;
    }

    getCoordinates(e: MouseEvent): { x: number, y: number } {
        let clientX: number, clientY: number;
        let clientRect = (<HTMLCanvasElement>e.target).getBoundingClientRect();
        clientX = e.clientX - Math.floor(clientRect.left);
        clientY = e.clientY - Math.floor(clientRect.top);
        // Getting normalized coordinates
        let x: number, y: number;
        x = Math.floor((<HTMLCanvasElement>e.target).width / clientRect.width * clientX);
        y = Math.floor((<HTMLCanvasElement>e.target).height / clientRect.height * clientY);
        return { x, y };
    }

    drawStar(
        cx: number,
        cy: number,
        spikes: number,
        outerRadius: number,
        innerRadius: number,
        lineWidth: number = 3,
        strokeStyle: string = 'blue',
        fillStyle: string = 'yellow'
    ) {
        let rot: number = Math.PI / 2 * 3;
        let x: number = cx;
        let y: number = cy;
        let step: number = Math.PI / spikes;

        this.context.strokeStyle = "#000";
        this.context.beginPath();
        this.context.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.context.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.context.lineTo(x, y);
            rot += step;
        }
        this.context.lineTo(cx, cy - outerRadius);
        this.context.closePath();
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = strokeStyle;
        this.context.stroke();
        this.context.fillStyle = fillStyle;
        this.context.fill();
    }

    //clear(rect: Rect) {
    //    this.context.clearRect(rect.x, rect.y, rect.width, rect.height);
    //}

    Redraw(): void {
        this.Draw();
    }

    // HELPERS

    private Draw() {
        this._bufferContext.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
        for (let w of this.windows.filter(item => !item.isMinimize)) {
            w.draw(this._bufferContext);
        }
        this.context.clearRect(0, 0, this.mwsArea.width, this.mwsArea.height);
        this.context.globalAlpha = 1;
        this.context.drawImage(this._bufferCanvas, 0, 0);
    }

    private DefineEvents(): void {
        // DOM events
        this.mwsArea.addEventListener('mousedown', (e) => { this.OnMouseDownCanvas(e); }, false);
        this.mwsArea.addEventListener('mousemove', (e) => { this.OnMouseMoveCanvas(e); }, false);
        this.mwsArea.addEventListener('mouseup', (e) => { this.OnMouseUpCanvas(e); }, false);
        this.mwsArea.addEventListener('click', (e) => { this.OnMouseClickCanvas(e); }, false);
        //
        this._mwsmStart.addEventListener('click', (e: MouseEvent) => { this.OnStart(e); }, false);
        for (let itemStart of document.getElementsByName('mwsm-task')) {
            itemStart.addEventListener('click', (e: MouseEvent) => { this.OnTaskStart(e); }, true);
        }
        // Custom events
        document.addEventListener(Params.instance.nameEventFillChange, () => { this.OnFillChange(); }, false);
        document.addEventListener(Params.instance.nameEventScaleChange, () => { this.OnScaleChange(); }, false);
        document.addEventListener(CustomEventOverFill, () => { this.OnOverFill(); }, false);
        document.addEventListener(CustomEventIsSelected, (e: CustomEvent) => { this.OnIsSelected(e); }, false);
        document.addEventListener(CustomEventIsResize, () => { this.OnIsResize(); }, false);
        document.addEventListener(CustomEventIsMove, () => { this.OnIsMove(); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredWidthChanged, (e: CustomEvent) => { this.OnChangeSelectedWidth(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredHeightChanged, (e: CustomEvent) => { this.OnChangeSelectedHeight(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredLengthWaveChanged, (e: CustomEvent) => { this.OnChangeSelectedLengthWave(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredAmplitudeWaveChanged, (e: CustomEvent) => { this.OnChangeSelectedAmplitudeWave(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredPeriodWaveChanged, (e: CustomEvent) => { this.OnChangeSelectedPeriodWave(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredShadingWaveChanged, (e: CustomEvent) => { this.OnChangeSelectedShadingWave(e); }, false);
        document.addEventListener(CustomEventCLoseClick, (e: CustomEvent) => { this.OnCloseClick(e); }, false);
        document.addEventListener(CustomEventMinimizeClick, (e: CustomEvent) => { this.OnMinimizeClick(e); }, false);
        document.addEventListener(CustomEventMaximizeClick, (e: CustomEvent) => { this.OnMaximizeClick(e); }, false);
        document.addEventListener(CustomEventRestoreDownClick, (e: CustomEvent) => { this.OnRestoreDownClick(e); }, false);
        //
        window.addEventListener('resize', () => { this.OnWindowChange(); }, false);
        window.addEventListener('scroll', () => { this.OnWindowChange(); }, false);
    }

    private InitScaleArea(): void {
        if (!Params.instance.isOffScreenCanvas) {
            this._mwsArea.width = Params.instance.scale[1];
            this._mwsArea.height = Math.round(this._mwsArea.width / 2);
            this._bufferCanvas.width = this._mwsArea.width;
            this._bufferCanvas.height = this._mwsArea.height;
            switch (this._mwsArea.width) {
                case 300: this._sizeResizingZone = 6; break;
                case 600: this._sizeResizingZone = 7; break;
                case 900: this._sizeResizingZone = 8; break;
                case 1200: this._sizeResizingZone = 9; break;
                case 1600: this._sizeResizingZone = 10; break;
                case 1900: this._sizeResizingZone = 11; break;
                case 2560: this._sizeResizingZone = 14; break;
                case 3200: this._sizeResizingZone = 16; break;
                case 4800: this._sizeResizingZone = 18; break;
                case 5600: this._sizeResizingZone = 20; break;
            }
            StatesKeeper.instance.sizeResizingZone = this._sizeResizingZone;
        }
    }

    AddToList(kind: [string, number], country: string = '') {
        let serialNumber: number = this.windows.reduce((prev: number, current: ViewRect) => current.rect.serialNumber > prev ? current.rect.serialNumber : prev, 0) + 1;
        let fontSize: number = this.GetFontSize();
        switch (kind[0]) {
            case NameKindFigureRectangle: {
                // Estimating the size of the window title text
                this._context.font = `${fontSize}px Roboto Condensed`;
                let captionHead: string = `${serialNumber}-${NameKindFigureRectangle}`;
                let measureCaptionHead: TextMetrics = this.context.measureText(captionHead);
                this._context.font = `${fontSize}px ${nameFontSymbolClose}`;
                let measureCaptionClose: TextMetrics = this.context.measureText(symbolClose);
                this._context.font = `${fontSize}px ${nameFontSymbolMinimize}`;
                let measureCaptionMinimize: TextMetrics = this.context.measureText(symbolMinimize);
                this._context.font = `${fontSize}px ${nameFontSymbolMaximize}`;
                let measureCaptionMaximize: TextMetrics = this.context.measureText(symbolMaximize);
                this._context.font = `${fontSize}px ${nameFontSymbolRestoreDown}`;
                let measureCaptionRestoreDown: TextMetrics = this.context.measureText(symbolRestoreDown);
                //
                let rectWidth: number = Colors.instance.RandomInt(
                    Math.max(
                        MwsConstraints.figureWidthMin,
                        Math.floor(
                            measureCaptionHead.width +
                            this._sizeResizingZone * 2 +
                            measureCaptionMinimize.width +
                            this._sizeResizingZone * 2 +
                            measureCaptionMaximize.width +
                            this._sizeResizingZone * 2 +
                            measureCaptionClose.width +
                            this._sizeResizingZone
                        )
                    ),
                    Math.min(Math.floor(this.mwsArea.width / 2), MwsConstraints.figureWidthMax)
                );
                let rectHeight: number = Colors.instance.RandomInt(
                    MwsConstraints.figureHeightMin + fontSize + 2,
                    Math.min(Math.floor(this.mwsArea.height / 4), MwsConstraints.figureHeightMax)
                );
                let figure: ViewRect = new ViewRect(
                    new Rect(
                        Colors.instance.RandomInt(1, Math.floor(this.mwsArea.width) - rectWidth),
                        Colors.instance.RandomInt(1, Math.floor(this.mwsArea.height) - rectHeight - (fontSize - 2)),
                        rectWidth,
                        rectHeight,
                        Colors.instance.RandomInt(Math.floor(rectHeight * 0.05), Math.floor(rectHeight * 0.15))
                    ),
                    Colors.instance.randomColor,
                    Colors.instance.randomColor
                )
                figure.rect.serialNumber = serialNumber;
                figure.measureCaptionHead = measureCaptionHead;
                figure.measureCaptionClose = measureCaptionClose;
                figure.measureCaptionMinimize = measureCaptionMinimize;
                figure.measureCaptionMaximize = measureCaptionMaximize;
                figure.measureCaptionRestoreDown = measureCaptionRestoreDown;
                figure.fontSize = fontSize;
                this.NewFill(figure);
                this.windows.push(figure);
                this._canvasEventHandlers.mouseDown.set(serialNumber, (x: number, y: number, canvas: HTMLCanvasElement, sizeResizingZone: number, windows: ViewRect[]) => { return figure.mouseDownHandler(x, y, canvas, sizeResizingZone, windows); });
                this._canvasEventHandlers.mouseMove.set(serialNumber, (x: number, y: number, canvas: HTMLCanvasElement, sizeResizingZone: number, windows: ViewRect[]) => { return figure.mouseMoveHandler(x, y, canvas, sizeResizingZone, windows); });
                this._canvasEventHandlers.mouseUp.set(serialNumber, (x: number, y: number, canvas: HTMLCanvasElement, sizeResizingZone: number, windows: ViewRect[]) => { return figure.mouseUpHandler(x, y, canvas, sizeResizingZone, windows); });
                this._canvasEventHandlers.mouseClick.set(serialNumber, (x: number, y: number, canvas: HTMLCanvasElement, sizeResizingZone: number, windows: ViewRect[]) => { return figure.mouseClickHandler(x, y, canvas, sizeResizingZone, windows); });
                break;
            }
            default: {
                throw new Error('Error: Undefined kind of window');
            }
        };
    }

    private OnStart(e: MouseEvent): void {
        let type = 'start';
        let start: HTMLElement = <HTMLElement>e.target;
        if (isDisplayBlock(this._menuStart) && this._menuStart.dataset.type === type) {
            this.DisableMenuStart();
            return;
        }
        this._menuStart.dataset.type = type;
        let coords = start.getBoundingClientRect();
        this._menuStart.style.left = coords.left + "px";
        //
        this._menuStart.dataset.display = 'true';
        let menuCoords = this._menuStart.getBoundingClientRect();
        this._menuStart.style.top = coords.top - menuCoords.height + "px";
    }

    private OnTaskStart(e: MouseEvent): void {
        let mwsmTask: HTMLElement = <HTMLElement>(<HTMLElement>e.target).closest('[data-kind]');
        let kind: string = mwsmTask.dataset.kind;
        if (kind == NameKindFigureRectangle) {
            this.AddToList(Array.from(FigureKind.entries()).find((pair) => pair[0] === NameKindFigureRectangle));
            Params.instance.switchSerialNumber = this.windows[this.windows.length - 1].rect.serialNumber;
            this.DefinePropStored(this.windows[this.windows.length - 1]);
            this.SetNewTask();
        } else if (kind == NameKindFigureFlag) {
            if (mwsmTask.dataset.country) {
                console.log(mwsmTask.dataset.country);
            }
        }
        this.DisableMenuStart();
    }

    private OnFillChange(): void {
        this.SetFill();
    }

    private NewFill(w: ViewRect) {
        let tempNumber: number = Colors.instance.RandomInt(1, FillType.size - 1);
        let tempFillType: [string, number] = Array.from(FillType.entries()).find((pair) => pair[1] == tempNumber);
        this.InitFillViewRectangle(w, tempFillType);
    }

    private InitFillViewRectangle(w: ViewRect, fillType: [string, number]) {
        w.fillType = fillType;
        if (w.fillType[0] === FillTypeColor) {
            w.colorStroke = Colors.instance.randomColor;
            w.colorFill = Colors.instance.randomColor;
        } else if (w.fillType[0] === FillTypeLinearGradient) {
            w.gradientBorder = Colors.instance.GetFillRectLineGradient(
                this.context,
                w.rect.x, w.rect.y, w.rect.width, w.rect.height,
                w.propertiesGradientBorder
            );
            w.gradientInside = Colors.instance.GetFillRectLineGradient(
                this.context,
                w.rect.x, w.rect.y, w.rect.width, w.rect.height,
                w.propertiesGradientInside
            );
        } else if (w.fillType[0] === FillTypeRadialGradient) {
            w.propertiesGradientBorder.radialDirection = Colors.instance.RandomInt(RadialDirection.Centre, RadialDirection.BottomTop);
            w.propertiesGradientBorder.colorScheme = Colors.instance.CreateColorScheme();
            w.propertiesGradientInside.radialDirection = Colors.instance.RandomInt(RadialDirection.Centre, RadialDirection.BottomTop);
            w.propertiesGradientInside.colorScheme = Colors.instance.CreateColorScheme();
        } else {
            w.fillType = Array.from(FillType.entries()).find(item => item[0] === FillTypeColor);
            w.colorStroke = Colors.instance.randomColor;
            w.colorFill = Colors.instance.randomColor;
        }
    }

    private OnScaleChange(): void {
        if (!Params.instance.isOffScreenCanvas) {
            let OldWidth: number = this.mwsArea.width;
            let oldHeight: number = this.mwsArea.height;
            this.InitScaleArea();
            let ratioWidth: number = this.mwsArea.width / OldWidth;
            let ratioHeight: number = this.mwsArea.height / oldHeight;
            let fontSize: number = this.GetFontSize();
            let captionHead: string;
            let measureCaptionHead: TextMetrics;
            this.context.font = `${fontSize}px ${nameFontSymbolClose}`;
            let measureCaptionClose: TextMetrics = this.context.measureText(symbolClose);
            this.context.font = `${fontSize}px ${nameFontSymbolMinimize}`;
            let measureCaptionMinimize: TextMetrics = this.context.measureText(symbolMinimize);
            this.context.font = `${fontSize}px ${nameFontSymbolMaximize}`;
            let measureCaptionMaximize: TextMetrics = this.context.measureText(symbolMaximize);
            this.context.font = `${fontSize}px ${nameFontSymbolRestoreDown}`;
            let measureCaptionRestoreDown: TextMetrics = this.context.measureText(symbolRestoreDown);
            for (let w of this.windows) {
                if (w instanceof ViewRect) {
                    captionHead = `${w.rect.serialNumber}-${NameKindFigureRectangle}`;
                    this.context.font = `${fontSize}px Roboto Condensed`;
                    measureCaptionHead = this.context.measureText(captionHead);
                    w.rect.x = Math.floor(w.rect.x * ratioWidth);
                    w.rect.y = Math.floor(w.rect.y * ratioHeight);
                    w.rect.width = Math.floor(w.rect.width * ratioWidth);
                    w.rect.height = Math.floor(w.rect.height * ratioHeight);
                    w.rect.borderWidth = Math.floor(w.rect.borderWidth * ratioHeight);
                    w.measureCaptionHead = measureCaptionHead;
                    w.measureCaptionClose = measureCaptionClose;
                    w.measureCaptionMinimize = measureCaptionMinimize;
                    w.measureCaptionMaximize = measureCaptionMaximize;
                    w.measureCaptionRestoreDown = measureCaptionRestoreDown;
                    w.fontSize = fontSize;
                    if (w.rect.isSelected) this.DefinePropStored(w);
                }
            }
            this.Draw();
        } else {
        }
    }

    private OnOverFill(): void {
        this.SetFill();
    }

    private SetFill(): void {
        let w: ViewRect = this.windows[this.windows.length - 1];
        if (w instanceof ViewRect) {
            this.InitFillViewRectangle(w, this.fillType);
            this.DefinePropStored(w);
            if (!w.isMinimize) w.draw(this.context);
            this.UpdateTaskBar(commandOverFillTaskBar);
        }
    }

    private OnMouseDownCanvas(e: MouseEvent) {
        let serialNumber: number;
        let coordinates = this.getCoordinates(e);
        let isRect: boolean = false;
        let layers: [number, number][] = new Array(); // first - index, second - serialNumber
        Params.instance.canvasCoordinates = [coordinates.x, coordinates.y];
        for (let fn of this._canvasEventHandlers.mouseDown.values()) {
            serialNumber = fn(coordinates.x, coordinates.y, this.mwsArea, this._sizeResizingZone, this.windows);
            if (serialNumber > 0) {
                layers.push([this.windows.findIndex(item => item.rect.serialNumber === serialNumber), serialNumber]);
                isRect = true;
            }
        }
        if (!isRect) {
            Params.instance.serialNumberTracking = 0;
        }
        if (layers.length > 1) {
            let maxLayer: number = layers.reduce((prev: number, current: [number, number]) => current[0] > prev ? current[0] : prev, 0);
            Params.instance.serialNumberTracking = layers.find(item => item[0] === maxLayer)[1];
        }
    }

    private OnMouseMoveCanvas(e: MouseEvent) {
        let serialNumber: number;
        let coordinates = this.getCoordinates(e);
        let isRect: boolean = false;
        Params.instance.canvasCoordinates = [coordinates.x, coordinates.y];
        for (let fn of this._canvasEventHandlers.mouseMove.values()) {
            serialNumber = fn(coordinates.x, coordinates.y, this.mwsArea, this._sizeResizingZone, this.windows);
            if (serialNumber > 0) {
                isRect = true;
            }
        }
        if (!isRect) {
            Params.instance.serialNumberTracking = 0;
        }
    }

    private OnMouseUpCanvas(e: MouseEvent) {
        let serialNumber: number;
        let coordinates = this.getCoordinates(e);
        let isRect: boolean = false;
        let layers: [number, number][] = new Array();
        Params.instance.canvasCoordinates = [coordinates.x, coordinates.y];
        for (let fn of this._canvasEventHandlers.mouseUp.values()) {
            serialNumber = fn(coordinates.x, coordinates.y, this.mwsArea, this._sizeResizingZone, this.windows);
            if (serialNumber > 0) {
                layers.push([this.windows.findIndex(item => item.rect.serialNumber === serialNumber), serialNumber]);
                isRect = true;
            }
        }
        if (!isRect) {
            Params.instance.serialNumberTracking = 0;
        }
        if (layers.length > 1) {
            let maxLayer: number = layers.reduce((prev: number, current: [number, number]) => current[0] > prev ? current[0] : prev, 0);
            Params.instance.serialNumberTracking = layers.find(item => item[0] === maxLayer)[1];
        }
    }

    private OnMouseClickCanvas(e: MouseEvent) {
        let serialNumber: number;
        let coordinates = this.getCoordinates(e);
        let isRect: boolean = false;
        Params.instance.canvasCoordinates = [coordinates.x, coordinates.y];
        for (let fn of this._canvasEventHandlers.mouseClick.values()) {
            serialNumber = fn(coordinates.x, coordinates.y, this.mwsArea, this._sizeResizingZone, this.windows);
            if (serialNumber > 0) {
                isRect = true;
            }
        }
        if (!isRect) {
            Params.instance.serialNumberTracking = 0;
        }
    }

    private OnIsSelected(e: CustomEvent) {
        let serialNumber: number = <number>e.detail.serialNumber;
        // Select maximum layer
        let x: number = <number>e.detail.x;
        let y: number = <number>e.detail.y;
        let maxLayer: number = this.windows.findIndex(item => item.rect.serialNumber === serialNumber);
        let layers: [number, number][] = new Array(); // first - index, second - serialNumber
        for (let i = 0; i < this.windows.length; i++) {
            let w: ViewRect = this.windows[i];
            if (x >= w.rect.x && x <= w.rect.x + w.rect.width && y >= w.rect.y && y <= w.rect.y + w.rect.height) {
                layers.push([i, w.rect.serialNumber]);
            }
        }
        if (layers.length > 1) {
            maxLayer = layers.reduce((prev: number, current: [number, number]) => current[0] > prev ? current[0] : prev, 0);
            serialNumber = layers.find(item => item[0] === maxLayer)[1];
        }
        //
        Params.instance.switchSerialNumber = serialNumber;
        this.SwitchToSelected();
    }

    private SetNewTask() {
        let newW: ViewRect = this.windows.find((item) => item.rect.serialNumber === Params.instance.switchSerialNumber);
        if (this.windows.length > 1) {
            let oldW: ViewRect = this.windows.find((item) => item.rect.isSelected);
            oldW.rect.isSelected = false;
            let temp: ViewRect[] = this.windows.filter(item => item.rect.serialNumber !== Params.instance.switchSerialNumber);
            temp.push(newW);
            this._windows = temp;
        };
        newW.rect.isSelected = true;
        this.DefinePropStored(newW);
        this.Draw();
        this.UpdateTaskBar();
    }

    private SwitchToSelected() {
        let newW: ViewRect = this.windows.find((item) => item.rect.serialNumber === Params.instance.switchSerialNumber);
        if (!newW.rect.isSelected) {
            if (this.windows.length > 1) {
                let oldW: ViewRect = this.windows.find((item) => item.rect.isSelected);
                oldW.rect.isSelected = false;
                let temp: ViewRect[] = this.windows.filter(item => item.rect.serialNumber !== Params.instance.switchSerialNumber);
                temp.push(newW);
                this._windows = temp;
            }
            newW.rect.isSelected = true;
            this.DefinePropStored(newW);
            this.Draw();
        }
        this.UpdateTaskBar(commandWindowSelectedTaskBar);
    }

    private OnIsResize(): void {
        this.Draw();
        this.DefinePropStored(this.windows[this.windows.length - 1]);
    }

    private OnIsMove(): void {
        this.Draw();
        this.DefinePropStored(this.windows[this.windows.length - 1]);
    }

    private OnChangeSelectedWidth(e: CustomEvent) {
        this.windows[this.windows.length - 1].rect.width = e.detail.value;
        this.Draw();
    }

    private OnChangeSelectedHeight(e: CustomEvent) {
        this.windows[this.windows.length - 1].rect.height = e.detail.value;
        this.Draw();
    }

    private OnChangeSelectedLengthWave(e: CustomEvent) {
        this.windows[this.windows.length - 1].rect.waveParams.length = e.detail.value;
    }

    private OnChangeSelectedAmplitudeWave(e: CustomEvent) {
        this.windows[this.windows.length - 1].rect.waveParams.amplitude = e.detail.value;
    }

    private OnChangeSelectedPeriodWave(e: CustomEvent) {
        this.windows[this.windows.length - 1].rect.waveParams.period = e.detail.value;
    }

    private OnChangeSelectedShadingWave(e: CustomEvent) {
        this.windows[this.windows.length - 1].rect.waveParams.shading = e.detail.value;
    }

    private OnCloseClick(e: CustomEvent) {
        let serialNumber: number = e.detail.serialNumber;
        this._canvasEventHandlers.mouseDown.delete(serialNumber);
        this._canvasEventHandlers.mouseMove.delete(serialNumber);
        this._canvasEventHandlers.mouseUp.delete(serialNumber);
        this._canvasEventHandlers.mouseClick.delete(serialNumber);
        let temp: ViewRect[] = this.windows.filter(item => item.rect.serialNumber != serialNumber);
        this._windows = temp;
        if (this.windows.length > 0 && !this.windows.some(item => item.rect.isSelected)) {
            this.windows[this.windows.length - 1].rect.isSelected = true;
            this.DefinePropStored(this.windows[this.windows.length - 1]);
        }
        this.Draw();
        this.UpdateTaskBar();
    }

    private OnMinimizeClick(e: CustomEvent) {
        let serialNumber: number = e.detail.serialNumber;
        let w: ViewRect = this.windows.find(item => item.rect.serialNumber == serialNumber);
        w.isMinimize = true;
        this.DefinePropStored(w);
        this.Draw();
    }

    private OnMaximizeClick(e: CustomEvent) {
        console.log(`Maximize-Click-SN: ${e.detail.serialNumber}`);
    }

    private OnRestoreDownClick(e: CustomEvent) {
        console.log(`RestoreDown-Click-SN: ${e.detail.serialNumber}`);
    }

    private DefinePropStored(w: ViewRect) {
        let prop: WPropStored = new WPropStored();
        //
        prop.x = w.rect.x;
        prop.y = w.rect.y;
        prop.kind = w.rect.kind;
        prop.serialNumber = w.rect.serialNumber;
        prop.isSelected = w.rect.isSelected;
        // from Figure
        prop.width = w.rect.width;
        prop.widthOriginal = w.rect.widthOriginal;
        // from Wave
        prop.waveLength = w.rect.waveParams.length;
        prop.waveAmplitude = w.rect.waveParams.amplitude;
        prop.wavePeriod = w.rect.waveParams.period;
        prop.waveShading = w.rect.waveParams.shading;
        // from Rectangle
        prop.height = w.rect.height;
        prop.heightOriginal = w.rect.heightOriginal;
        prop.borderWidth = w.rect.borderWidth;
        prop.aspectRatio = w.rect.aspectRatio;
        // from Flag
        //prop.country = 
        //prop.insideX= 
        //prop.insideY= 
        //prop.insideWidth= 
        //prop.insideHeight= 
        // from FlagImg
        //prop.url= 
        // from ViewRect
        prop.headerHeight = w.headerHeight;
        prop.measureCaptionHead = w.measureCaptionHead;
        prop.measureCaptionClose = w.measureCaptionClose;
        prop.measureCaptionMinimize = w.measureCaptionMinimize;
        prop.measureCaptionMaximize = w.measureCaptionMaximize;
        prop.measureCaptionRestoreDown = w.measureCaptionRestoreDown;
        prop.fillType = w.fillType;
        prop.colorFill = w.colorFill;
        prop.colorStroke = w.colorStroke;
        //
        Params.instance.wPropStored = prop;
    }

    private OnWindowChange(): void {
        this.DisableMenuStart();
    }

    private DisableMenuStart(): void {
        this._menuStart.dataset.type = 'empty';
        this._menuStart.dataset.display = 'false';
    }

    private UpdateTaskBar(command: string = commandCreateTaskBar) {
        switch (command) {
            case commandCreateTaskBar:
                this.CreateTaskBar();
                break;
            case commandWindowSelectedTaskBar:
                for (let task of this._mwsmTaskBar.querySelectorAll('[data-serial-number]')) {
                    let serialNumber: number = Number((<HTMLElement>task).dataset.serialNumber);
                    if (serialNumber == Params.instance.switchSerialNumber) {
                        (<HTMLElement>task).dataset.selected = 'true';
                    } else {
                        (<HTMLElement>task).dataset.selected = 'false';
                    }
                }
                break;
            case commandOverFillTaskBar:
                let w: ViewRect = this.windows[this.windows.length - 1];
                for (let task of this._mwsmTaskBar.querySelectorAll('[data-serial-number]')) {
                    let serialNumber: number = Number((<HTMLElement>task).dataset.serialNumber);
                    if (serialNumber == w.rect.serialNumber) {
                        let canvas: HTMLCanvasElement = task.querySelector('canvas');
                        this.FillTaskBar(canvas, w);
                        break;
                    }
                }
                break
        }
    }

    private CreateTaskBar() {
        this._mwsmTaskBar.innerHTML = '';
        let snWindows: ViewRect[] = this.windows.concat().sort((a, b) => {
            if (a.rect.serialNumber > b.rect.serialNumber) return 1;
            if (a.rect.serialNumber < b.rect.serialNumber) return -1;
            return 0;
        });
        for (let w of snWindows) {
            let task = document.createElement('div');
            task.className = 'mwsm-task';
            if (w.rect.isSelected) {
                task.dataset.selected = 'true';
            } else {
                task.dataset.selected = 'false';
            }
            task.dataset.serialNumber = `${w.rect.serialNumber}`;
            let span = document.createElement('span');
            span.innerHTML = `&nbsp;${w.rect.serialNumber}&nbsp;`;
            let likeness = document.createElement('div');
            likeness.className = 'likeness';
            task.addEventListener('click', (e: MouseEvent) => { this.OnTaskSelected(e); }, false);
            task.appendChild(span);
            task.appendChild(likeness);
            let canvas = document.createElement('canvas');
            likeness.appendChild(canvas);
            // Filling
            this.FillTaskBar(canvas, w);
            //
            this._mwsmTaskBar.appendChild(task);
        }
    }

    private FillTaskBar(canvas: HTMLCanvasElement, w: ViewRect) {
        if (w.fillType[0] == FillTypeColor) {
            Colors.instance.FillSchemeColor(canvas.getContext('2d'), w.colorFill);
        } else if (w.fillType[0] == FillTypeLinearGradient) {
            Colors.instance.FillSchemeLineGradient(canvas.getContext('2d'), w.propertiesGradientInside);
        } else if (w.fillType[0] == FillTypeRadialGradient) {
            Colors.instance.FillSchemeRadialGradient(canvas.getContext('2d'), w.propertiesGradientInside);
        }
    }

    private OnTaskSelected(e: MouseEvent): void {
        let mwsmTask: HTMLElement = <HTMLElement>(<HTMLElement>e.target).closest('[data-serial-number]');
        let serialNumber: number = Number(mwsmTask.dataset.serialNumber);
        let w: ViewRect = this.windows.find(item => item.rect.serialNumber == serialNumber);
        let isSelected: boolean = mwsmTask.dataset.selected == 'true';
        if (!isSelected) {
            if (w.isMinimize) w.isMinimize = false;
            mwsmTask.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
            Params.instance.switchSerialNumber = serialNumber;
            setTimeout(() => { this.SwitchToSelected(); }, 20);
        } else if (w.isMinimize) {
            w.isMinimize = false;
            mwsmTask.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
            this.Draw();
        }
    }

    private GetFontSize(): number {
        let temp: number = Math.floor(this.mwsArea.height / 30);
        return temp < 10 ? 10 : temp;
    }

}

