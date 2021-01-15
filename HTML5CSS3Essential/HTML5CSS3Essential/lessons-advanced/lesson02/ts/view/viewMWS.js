import { Colors, GradientProperties, RadialDirection } from '../../../../js-advanced/colorManagement.js';
import { CustomEventOverFill, CustomEventIsSelected, WPropStored, Params, FillType, FillTypeAny, FillTypeColor, FillTypeLinearGradient, FillTypeRadialGradient } from '../model/mwsParams.js';
import { MwsConstraints, NameKindFigureRectangle, NameKindFigureFlag, Point, Rect, FigureKind, RecoveryParameters } from '../model/modelMWS.js';
import { isDisplayBlock } from '../../../../js-advanced/_pgkUtils.js';
class LSKeyList {
    constructor() {
        this.app = 'MultiSystemWindowModeling-List';
    }
}
class LSValueList {
    constructor() {
        this.list = [];
    }
}
const CustomEventIsResize = 'mwsmIsResize';
const CustomEventIsMove = 'mwsmIsMove';
const CustomEventCLoseClick = 'mwsm-CLose-click';
const CustomEventMinimizeClick = 'mwsm-Minimize-click';
const CustomEventMaximizeClick = 'mwsm-Maxmize-click';
const CustomEventRestoreDownClick = 'mwsm-RestoreDown-click';
const cursorDefault = 'default';
const cursorPointer = 'pointer';
const cursorResizeEW = 'ew-resize';
const cursorResizeNS = 'ns-resize';
const cursorResizeNESW = 'nesw-resize';
const cursorResizeNWSE = 'nwse-resize';
const commandCreateTaskBar = 'create';
const commandWindowSelectedTaskBar = 'selected';
const commandOverFillTaskBar = 'over-fill';
const symbolClose = '´';
const symbolMinimize = '‒';
const symbolMaximize = '1';
const symbolRestoreDown = '2';
const nameFontSymbolClose = 'Symbol';
const nameFontSymbolMinimize = 'Roboto Condensed';
const nameFontSymbolMaximize = 'Webdings';
const nameFontSymbolRestoreDown = 'Webdings';
var DirectionOfResizing;
(function (DirectionOfResizing) {
    DirectionOfResizing[DirectionOfResizing["NoDirection"] = 0] = "NoDirection";
    DirectionOfResizing[DirectionOfResizing["EastWestLeft"] = 1] = "EastWestLeft";
    DirectionOfResizing[DirectionOfResizing["EastWestRight"] = 2] = "EastWestRight";
    DirectionOfResizing[DirectionOfResizing["NorthSouthTop"] = 3] = "NorthSouthTop";
    DirectionOfResizing[DirectionOfResizing["NorthSouthDown"] = 4] = "NorthSouthDown";
    DirectionOfResizing[DirectionOfResizing["NESWTopRight"] = 5] = "NESWTopRight";
    DirectionOfResizing[DirectionOfResizing["NESWBootomLeft"] = 6] = "NESWBootomLeft";
    DirectionOfResizing[DirectionOfResizing["NWSELeftTop"] = 7] = "NWSELeftTop";
    DirectionOfResizing[DirectionOfResizing["NWSERightBottom"] = 8] = "NWSERightBottom";
})(DirectionOfResizing || (DirectionOfResizing = {}));
class EventHandlers {
    constructor() {
        this._mouseMove = new Map();
        this._mouseDown = new Map();
        this._mouseUp = new Map();
        this._mouseClick = new Map();
    }
    get mouseMove() { return this._mouseMove; }
    get mouseDown() { return this._mouseDown; }
    get mouseUp() { return this._mouseUp; }
    get mouseClick() { return this._mouseClick; }
}
class StatesKeeper {
    constructor() {
        this._serialNumberResizeEW = 0;
        this._serialNumberResizeNS = 0;
        this._serialNumberResizeNESW = 0;
        this._serialNumberResizeNWSE = 0;
        this._directResizing = DirectionOfResizing.NoDirection;
        this._sizeResizingZone = 0;
        this._serialNumberHoverClose = 0;
        this._serialNumberHoverMinimize = 0;
        this._serialNumberHoverMaximize = 0;
        this._serialNumberHoverRestoreDown = 0;
    }
    static get instance() {
        if (!StatesKeeper._instance) {
            StatesKeeper._instance = new StatesKeeper();
        }
        return StatesKeeper._instance;
    }
    get serialNumberResizeEW() { return this._serialNumberResizeEW; }
    set serialNumberResizeEW(value) { this._serialNumberResizeEW = value; }
    get serialNumberResizeNS() { return this._serialNumberResizeNS; }
    set serialNumberResizeNS(value) { this._serialNumberResizeNS = value; }
    get serialNumberResizeNESW() { return this._serialNumberResizeNESW; }
    set serialNumberResizeNESW(value) { this._serialNumberResizeNESW = value; }
    get serialNumberResizeNWSE() { return this._serialNumberResizeNWSE; }
    set serialNumberResizeNWSE(value) { this._serialNumberResizeNWSE = value; }
    get directResizing() { return this._directResizing; }
    set directResizing(value) { this._directResizing = value; }
    get sizeResizingZone() { return this._sizeResizingZone; }
    set sizeResizingZone(value) { this._sizeResizingZone = value; }
    get serialNumberHoverClose() { return this._serialNumberHoverClose; }
    set serialNumberHoverClose(value) { this._serialNumberHoverClose = value; }
    get serialNumberHoverMinimize() { return this._serialNumberHoverMinimize; }
    set serialNumberHoverMinimize(value) { this._serialNumberHoverMinimize = value; }
    get serialNumberHoverMaximize() { return this._serialNumberHoverMaximize; }
    set serialNumberHoverMaximize(value) { this._serialNumberHoverMaximize = value; }
    get serialNumberHoverRestoreDown() { return this._serialNumberHoverRestoreDown; }
    set serialNumberHoverRestoreDown(value) { this._serialNumberHoverRestoreDown = value; }
    Clear() {
        this.serialNumberResizeEW = 0;
        this.serialNumberResizeNS = 0;
        this.serialNumberResizeNESW = 0;
        this.serialNumberResizeNWSE = 0;
        this.directResizing = DirectionOfResizing.NoDirection;
    }
}
StatesKeeper._instance = undefined;
class ViewRect {
    constructor(rect, colorFill = 'yellow', colorStroke = 'darkred') {
        this._statesKeeper = StatesKeeper.instance;
        this._recoveryParameters = new RecoveryParameters();
        this._headerHeight = 0;
        this._fillType = FillType.entries().next().value;
        this._propertiesGradientInside = new GradientProperties();
        this._propertiesGradientBorder = new GradientProperties();
        this._fontSize = 10;
        this._isMouseDown = false;
        this._isResize = false;
        this._isResizeEW = false;
        this._isResizeNS = false;
        this._isResizeNESW = false;
        this._isResizeNWSE = false;
        this._startMove = new Point(0, 0);
        this._newMove = new Point(0, 0);
        this._isMaximize = false;
        this._isMinimize = false;
        this._rect = rect;
        this._colorFill = colorFill;
        this._colorStroke = colorStroke;
        this.DefineEvents();
    }
    get statesKeeper() { return this._statesKeeper; }
    get rect() { return this._rect; }
    get headerHeight() { return this._headerHeight; }
    set headerHeight(value) { this._headerHeight = value; }
    get fillType() { return this._fillType; }
    set fillType(value) { this._fillType = value; }
    get colorFill() { return this._colorFill; }
    set colorFill(value) { this._colorFill = value; }
    get colorStroke() { return this._colorStroke; }
    set colorStroke(value) { this._colorStroke = value; }
    get gradientInside() { return this._gradientInside; }
    set gradientInside(value) { this._gradientInside = value; }
    get gradientBorder() { return this._gradientBorder; }
    set gradientBorder(value) { this._gradientBorder = value; }
    get propertiesGradientInside() { return this._propertiesGradientInside; }
    set propertiesGradientInside(value) { this._propertiesGradientInside = value; }
    get propertiesGradientBorder() { return this._propertiesGradientBorder; }
    set propertiesGradientBorder(value) { this._propertiesGradientBorder = value; }
    get measureCaptionHead() { return this._measureCaptionHead; }
    ;
    set measureCaptionHead(value) { this._measureCaptionHead = value; }
    ;
    get measureCaptionMinimize() { return this._measureCaptionMinimize; }
    set measureCaptionMinimize(value) { this._measureCaptionMinimize = value; }
    get measureCaptionRestoreDown() { return this._measureCaptionRestoreDown; }
    set measureCaptionRestoreDown(value) { this._measureCaptionRestoreDown = value; }
    get measureCaptionMaximize() { return this._measureCaptionMaximize; }
    set measureCaptionMaximize(value) { this._measureCaptionMaximize = value; }
    get measureCaptionClose() { return this._measureCaptionClose; }
    ;
    set measureCaptionClose(value) { this._measureCaptionClose = value; }
    ;
    get fontSize() { return this._fontSize; }
    set fontSize(value) { this._fontSize = value; }
    get isMouseDown() { return this._isMouseDown; }
    get isResize() { return this._isResize; }
    set isResize(value) { this._isResize = value; }
    get isResizeEW() { return this._isResizeEW; }
    set isResizeEW(value) { this._isResizeEW = value; }
    get isResizeNS() { return this._isResizeNS; }
    set isResizeNS(value) { this._isResizeNS = value; }
    get isResizeNESW() { return this._isResizeNESW; }
    set isResizeNESW(value) { this._isResizeNESW = value; }
    get isResizeNWSE() { return this._isResizeNWSE; }
    set isResizeNWSE(value) { this._isResizeNWSE = value; }
    get startMove() { return this._startMove; }
    get newMove() { return this._newMove; }
    get isMaximize() { return this._isMaximize; }
    set isMaximize(value) { this._isMaximize = value; }
    get isMinimize() { return this._isMinimize; }
    set isMinimize(value) { this._isMinimize = value; }
    get recoveryParameters() { return this._recoveryParameters; }
    draw(context) {
        this.drawHeader(context);
        context.globalAlpha = 1;
        context.beginPath();
        context.rect(this.rect.x, this.rect.y + this.headerHeight, this.rect.width, this.rect.height - this.headerHeight);
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorStroke;
        }
        else if (this.fillType[0] === FillTypeLinearGradient) {
            this.gradientBorder = Colors.instance.RestoreFillRectLineGradient(context, this.rect.x, this.rect.y + this.headerHeight, this.rect.width, this.rect.height - this.headerHeight, this.propertiesGradientBorder);
            context.fillStyle = this.gradientBorder;
        }
        else if (this.fillType[0] === FillTypeRadialGradient) {
            this.gradientBorder = Colors.instance.GetFillRectRadialGradient(context, Colors.instance.GetRadialParams(this.rect.x, this.rect.y + this.headerHeight, this.rect.width, this.rect.height - this.headerHeight, this.propertiesGradientBorder.radialDirection), this.propertiesGradientBorder.colorScheme);
            context.fillStyle = this.gradientBorder;
        }
        context.fill();
        context.beginPath();
        context.rect(this.rect.x + this.rect.borderWidth, this.rect.y + this.headerHeight + this.rect.borderWidth, this.rect.width - this.rect.borderWidth * 2, this.rect.height - this.headerHeight - this.rect.borderWidth * 2);
        if (this.fillType[0] === FillTypeColor) {
            context.fillStyle = this.colorFill;
        }
        else if (this.fillType[0] === FillTypeLinearGradient) {
            this.gradientInside = Colors.instance.RestoreFillRectLineGradient(context, this.rect.x + this.rect.borderWidth, this.rect.y + this.headerHeight + this.rect.borderWidth, this.rect.width - this.rect.borderWidth * 2, this.rect.height - this.headerHeight - this.rect.borderWidth * 2, this.propertiesGradientInside);
            context.fillStyle = this.gradientInside;
        }
        else if (this.fillType[0] === FillTypeRadialGradient) {
            this.gradientInside = Colors.instance.GetFillRectRadialGradient(context, Colors.instance.GetRadialParams(this.rect.x + this.rect.borderWidth, this.rect.y + this.headerHeight + this.rect.borderWidth, this.rect.width - this.rect.borderWidth * 2, this.rect.height - this.headerHeight - this.rect.borderWidth * 2, this.propertiesGradientInside.radialDirection), this.propertiesGradientInside.colorScheme);
            context.fillStyle = this.gradientInside;
        }
        context.fill();
        this._contextData = context.getImageData(this.rect.x, this.rect.y, this.rect.width, this.rect.height).data;
    }
    mouseDownHandler(x, y, canvas, sizeResizingZone, windows) {
        if (this.isMinimize)
            return 0;
        let maxLayer = this.GetMaxLayer(x, y, sizeResizingZone, windows);
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
        }
        else {
            return 0;
        }
    }
    mouseMoveHandler(x, y, canvas, sizeResizingZone, windows) {
        if (this.isMinimize)
            return 0;
        if (!this.isMouseDown && !windows.some(item => item.isMouseDown)) {
            let maxLayer = this.GetMaxLayer(x, y, sizeResizingZone, windows);
            if (this.isInside(x, y, maxLayer, sizeResizingZone)) {
                if ((this.isLeftResizeEW(x, sizeResizingZone) || this.isRightResizeEW(x, sizeResizingZone)) && this.isYResizeEW(y, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeEW = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeEW;
                    this.isResize = true;
                    this.isResizeEW = true;
                    this.statesKeeper.directResizing = this.isLeftResizeEW(x, sizeResizingZone) ? DirectionOfResizing.EastWestLeft : DirectionOfResizing.EastWestRight;
                }
                else if ((this.isTopResizeNS(y, sizeResizingZone) || this.isDownResizeNS(y, sizeResizingZone)) && this.isXResizeNS(x, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeNS = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeNS;
                    this.isResize = true;
                    this.isResizeNS = true;
                    this.statesKeeper.directResizing = this.isTopResizeNS(y, sizeResizingZone) ? DirectionOfResizing.NorthSouthTop : DirectionOfResizing.NorthSouthDown;
                }
                else if (this.isResizeNESWTopRight(x, y, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeNESW = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeNESW;
                    this.isResize = true;
                    this.isResizeNESW = true;
                    this.statesKeeper.directResizing = DirectionOfResizing.NESWTopRight;
                }
                else if (this.isResizeNESWBottomLeft(x, y, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeNESW = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeNESW;
                    this.isResize = true;
                    this.isResizeNESW = true;
                    this.statesKeeper.directResizing = DirectionOfResizing.NESWBootomLeft;
                }
                else if (this.isResizeNWSELeftTop(x, y, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeNESW = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeNWSE;
                    this.isResize = true;
                    this.isResizeNWSE = true;
                    this.statesKeeper.directResizing = DirectionOfResizing.NWSELeftTop;
                }
                else if (this.isResizeNWSERightBottom(x, y, sizeResizingZone)) {
                    this.statesKeeper.serialNumberResizeNESW = this.rect.serialNumber;
                    canvas.dataset.cursor = cursorResizeNWSE;
                    this.isResize = true;
                    this.isResizeNWSE = true;
                    this.statesKeeper.directResizing = DirectionOfResizing.NWSERightBottom;
                }
                else if (this.isCloseButton(x, y)) {
                    this.ResetMoveMouse(canvas);
                    this.statesKeeper.serialNumberHoverClose = this.rect.serialNumber;
                    let context = canvas.getContext('2d');
                    this.DrawHeaderHoverClose(context, this.GetFontSize(context));
                }
                else if (this.isMinimizeButton(x, y)) {
                    this.ResetMoveMouse(canvas);
                    this.statesKeeper.serialNumberHoverMinimize = this.rect.serialNumber;
                    let context = canvas.getContext('2d');
                    this.DrawHeaderHoverMinimize(context, this.GetFontSize(context));
                }
                else if (!this.isMaximize && this.isMaximizeButton(x, y)) {
                    this.ResetMoveMouse(canvas);
                    this.statesKeeper.serialNumberHoverMaximize = this.rect.serialNumber;
                    let context = canvas.getContext('2d');
                    this.DrawHeaderHoverMaximize(context, this.GetFontSize(context));
                }
                else if (this.isMaximize && this.isRestoreDownButton(x, y)) {
                    this.ResetMoveMouse(canvas);
                    this.statesKeeper.serialNumberHoverRestoreDown = this.rect.serialNumber;
                    let context = canvas.getContext('2d');
                    this.DrawHeaderHoverRestoreDown(context, this.GetFontSize(context));
                }
                else {
                    this.statesKeeper.Clear();
                    this.ResizeOff();
                    this.ResetMoveMouse(canvas);
                    canvas.dataset.cursor = cursorDefault;
                }
                Params.instance.serialNumberTracking = this.rect.serialNumber;
                return this.rect.serialNumber;
            }
            else {
                this.ResetMoveMouse(canvas);
                return 0;
            }
        }
        else if (this.isMouseDown) {
            let isResizeXY = false;
            if (this.isResize && this.isResizeEW && this.statesKeeper.directResizing == DirectionOfResizing.EastWestLeft) {
                if (x > 0 && x < this.rect.x + this.rect.width - Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth())) {
                    if (this.rect.x !== x) {
                        if (x < this.rect.x)
                            this.rect.width += this.rect.x - x;
                        if (x > this.rect.x)
                            this.rect.width -= x - this.rect.x;
                        this.rect.x = x;
                        document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                    }
                }
            }
            else if (this.isResize && this.isResizeEW && this.statesKeeper.directResizing == DirectionOfResizing.EastWestRight) {
                if (x > this.rect.x + Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth()) && x < canvas.width) {
                    if (this.rect.x + this.rect.width !== x) {
                        this.rect.width = x - this.rect.x;
                        document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                    }
                }
                document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
            }
            else if (this.isResize && this.isResizeNS && this.statesKeeper.directResizing == DirectionOfResizing.NorthSouthTop) {
                if (y > 0 && y < this.rect.y + this.rect.height - (this.fontSize + 2) - this.rect.borderWidth * 2 - 5) {
                    if (y !== this.rect.y) {
                        if (y < this.rect.y)
                            this.rect.height += this.rect.y - y;
                        if (y > this.rect.y)
                            this.rect.height -= y - this.rect.y;
                        this.rect.y = y;
                        document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                    }
                }
            }
            else if (this.isResize && this.isResizeNS && this.statesKeeper.directResizing == DirectionOfResizing.NorthSouthDown) {
                if (y > this.rect.y + (this.fontSize + 2) + this.rect.borderWidth * 2 + 5 && y < canvas.height) {
                    if (y !== this.rect.y + this.rect.height) {
                        this.rect.height = y - this.rect.y;
                        document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                    }
                }
            }
            else if (this.isResize && this.isResizeNESW && this.statesKeeper.directResizing == DirectionOfResizing.NESWTopRight) {
                isResizeXY = false;
                if (x > this.rect.x + Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth()) && x < canvas.width) {
                    if (this.rect.x + this.rect.width !== x) {
                        this.rect.width = x - this.rect.x;
                        isResizeXY = true;
                    }
                }
                if (y > 0 && y < this.rect.y + this.rect.height - (this.fontSize + 2) - this.rect.borderWidth * 2 - 5) {
                    if (y !== this.rect.y) {
                        if (y < this.rect.y)
                            this.rect.height += this.rect.y - y;
                        if (y > this.rect.y)
                            this.rect.height -= y - this.rect.y;
                        this.rect.y = y;
                        isResizeXY = true;
                    }
                }
                if (isResizeXY) {
                    document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                }
            }
            else if (this.isResize && this.isResizeNESW && this.statesKeeper.directResizing == DirectionOfResizing.NESWBootomLeft) {
                isResizeXY = false;
                if (x > 0 && x < this.rect.x + this.rect.width - Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth())) {
                    if (this.rect.x !== x) {
                        if (x < this.rect.x)
                            this.rect.width += this.rect.x - x;
                        if (x > this.rect.x)
                            this.rect.width -= x - this.rect.x;
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
            }
            else if (this.isResize && this.isResizeNWSE && this.statesKeeper.directResizing == DirectionOfResizing.NWSELeftTop) {
                isResizeXY = false;
                if (x > 0 && x < this.rect.x + this.rect.width - Math.max(MwsConstraints.figureWidthMin, this.GetMinCaptionWidth())) {
                    if (this.rect.x !== x) {
                        if (x < this.rect.x)
                            this.rect.width += this.rect.x - x;
                        if (x > this.rect.x)
                            this.rect.width -= x - this.rect.x;
                        this.rect.x = x;
                        isResizeXY = true;
                    }
                }
                if (y > 0 && y < this.rect.y + this.rect.height - (this.fontSize + 2) - this.rect.borderWidth * 2 - 5) {
                    if (y !== this.rect.y) {
                        if (y < this.rect.y)
                            this.rect.height += this.rect.y - y;
                        if (y > this.rect.y)
                            this.rect.height -= y - this.rect.y;
                        this.rect.y = y;
                        isResizeXY = true;
                    }
                }
                if (isResizeXY) {
                    document.dispatchEvent(new CustomEvent(CustomEventIsResize, { bubbles: true }));
                }
            }
            else if (this.isResize && this.isResizeNWSE && this.statesKeeper.directResizing == DirectionOfResizing.NWSERightBottom) {
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
            }
            else {
                let xShift = x - this.startMove.x;
                let yShift = y - this.startMove.y;
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
    mouseUpHandler(x, y, canvas, sizeResizingZone, windows) {
        if (this.isMinimize)
            return 0;
        if (!this.isMouseDown && !windows.some(item => item.isMouseDown)) {
            let maxLayer = this.GetMaxLayer(x, y, sizeResizingZone, windows);
            if (this.isInside(x, y, maxLayer, sizeResizingZone)) {
                Params.instance.serialNumberTracking = this.rect.serialNumber;
                this._isMouseDown = false;
                return this.rect.serialNumber;
            }
            else {
                return 0;
            }
        }
        else if (this.isMouseDown) {
            this.statesKeeper.Clear();
            if (this.isResize) {
                this.ResizeOff();
                canvas.dataset.cursor = cursorDefault;
            }
            this._isMouseDown = false;
            return 0;
        }
    }
    mouseClickHandler(x, y, canvas, sizeResizingZone, windows) {
        if (this.isMinimize)
            return 0;
        let maxLayer = this.GetMaxLayer(x, y, sizeResizingZone, windows);
        if (this.isInside(x, y, maxLayer, sizeResizingZone)) {
            Params.instance.serialNumberTracking = this.rect.serialNumber;
            if (this.isCloseButton(x, y) && this.statesKeeper.serialNumberHoverClose == this.rect.serialNumber) {
                document.dispatchEvent(new CustomEvent(CustomEventCLoseClick, { bubbles: true, detail: { serialNumber: this.rect.serialNumber } }));
            }
            else if (this.isMinimizeButton(x, y) && this.statesKeeper.serialNumberHoverMinimize == this.rect.serialNumber) {
                document.dispatchEvent(new CustomEvent(CustomEventMinimizeClick, { bubbles: true, detail: { serialNumber: this.rect.serialNumber } }));
            }
            else if (!this.isMaximize && this.isMaximizeButton(x, y) && this.statesKeeper.serialNumberHoverMaximize == this.rect.serialNumber) {
                document.dispatchEvent(new CustomEvent(CustomEventMaximizeClick, { bubbles: true, detail: { serialNumber: this.rect.serialNumber } }));
            }
            else if (this.isMaximize && this.isRestoreDownButton(x, y) && this.statesKeeper.serialNumberHoverRestoreDown == this.rect.serialNumber) {
                document.dispatchEvent(new CustomEvent(CustomEventRestoreDownClick, { bubbles: true, detail: { serialNumber: this.rect.serialNumber } }));
            }
            ;
            return this.rect.serialNumber;
        }
        else {
            return 0;
        }
    }
    DefineEvents() {
        document.addEventListener(CustomEventIsResize, () => { if (this.rect.isSelected) {
            this.SetRecoveryParameters();
        } }, false);
        document.addEventListener(CustomEventIsMove, () => { if (this.rect.isSelected) {
            this.SetRecoveryParameters();
        } }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredWidthChanged, () => { if (this.rect.isSelected) {
            this.SetRecoveryParameters();
        } }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredHeightChanged, () => { if (this.rect.isSelected) {
            this.SetRecoveryParameters();
        } }, false);
    }
    drawHeader(context) {
        let fontSize = this.GetFontSize(context);
        this.headerHeight = fontSize + 2;
        context.clearRect(this.rect.x, this.rect.y, this.rect.width, this.headerHeight);
        context.beginPath();
        context.rect(this.rect.x, this.rect.y, this.rect.width, this.headerHeight);
        context.fillStyle = 'hsl(0,0%,75%)';
        context.fill();
        context.font = `${fontSize}px Roboto Condensed`;
        if (this.rect.isSelected) {
            context.fillStyle = 'black';
        }
        else {
            context.fillStyle = 'gray';
        }
        context.textAlign = 'left';
        context.textBaseline = "top";
        let captionHead = `${this.rect.serialNumber}-${this.rect.kind[0]}`;
        context.fillText(captionHead, this.rect.x + 1, this.rect.y + 1);
        this.DrawHeaderClose(context, fontSize);
        if (!this.isMaximize) {
            this.DrawHeaderMaximize(context, fontSize);
        }
        else {
            this.DrawHeaderRestoreDown(context, fontSize);
        }
        this.DrawHeaderMinimize(context, fontSize);
    }
    DrawHeaderMinimize(context, fontSize) {
        context.font = `${fontSize}px ${nameFontSymbolMinimize}`;
        context.textAlign = 'right';
        context.fillText(symbolMinimize, this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone - this.measureCaptionClose.width -
            StatesKeeper.instance.sizeResizingZone * 2 - this.measureCaptionMaximize.width - StatesKeeper.instance.sizeResizingZone * 2, this.rect.y + 1);
    }
    DrawHeaderMaximize(context, fontSize) {
        context.font = `${fontSize}px ${nameFontSymbolMaximize}`;
        context.textAlign = 'right';
        context.fillText(symbolMaximize, this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone - this.measureCaptionClose.width - StatesKeeper.instance.sizeResizingZone * 2, this.rect.y + 1);
    }
    DrawHeaderRestoreDown(context, fontSize) {
        context.font = `${fontSize}px ${nameFontSymbolRestoreDown}`;
        context.textAlign = 'right';
        context.fillText(symbolRestoreDown, this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone - this.measureCaptionClose.width - StatesKeeper.instance.sizeResizingZone * 2, this.rect.y + 1);
    }
    DrawHeaderClose(context, fontSize) {
        context.font = `${fontSize}px ${nameFontSymbolClose}`;
        context.textAlign = 'right';
        context.fillText(symbolClose, this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone, this.rect.y + 1);
    }
    DrawHeaderHoverClose(context, fontSize, isHover = true) {
        let widthHover = StatesKeeper.instance.sizeResizingZone * 2 + this.measureCaptionClose.width;
        context.beginPath();
        context.rect(this.rect.x + this.rect.width - widthHover, this.rect.y, widthHover, this.headerHeight);
        if (isHover) {
            context.fillStyle = 'hsl(0,0%,90%)';
        }
        else {
            context.fillStyle = 'hsl(0,0%,75%)';
        }
        context.fill();
        context.closePath();
        if (this.rect.isSelected) {
            context.fillStyle = 'black';
        }
        else {
            context.fillStyle = 'gray';
        }
        context.font = `${fontSize}px ${nameFontSymbolClose}`;
        context.textAlign = 'right';
        context.textBaseline = "top";
        context.fillText(symbolClose, this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone, this.rect.y + 1);
    }
    DrawHeaderHoverMinimize(context, fontSize, isHover = true) {
        let widthHover = StatesKeeper.instance.sizeResizingZone * 2 + this.measureCaptionMinimize.width;
        let maximizeButtonWidth = this.isMaximize ? this.measureCaptionRestoreDown.width : this.measureCaptionMaximize.width;
        let withBetween = StatesKeeper.instance.sizeResizingZone * 2;
        context.beginPath();
        context.rect(this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - maximizeButtonWidth - widthHover, this.rect.y, widthHover, this.headerHeight);
        if (isHover) {
            context.fillStyle = 'hsl(0,0%,90%)';
        }
        else {
            context.fillStyle = 'hsl(0,0%,75%)';
        }
        context.fill();
        context.closePath();
        if (this.rect.isSelected) {
            context.fillStyle = 'black';
        }
        else {
            context.fillStyle = 'gray';
        }
        context.font = `${fontSize}px ${nameFontSymbolMinimize}`;
        context.textAlign = 'right';
        context.textBaseline = "top";
        context.fillText(symbolMinimize, this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - maximizeButtonWidth - StatesKeeper.instance.sizeResizingZone, this.rect.y + 1);
    }
    DrawHeaderHoverMaximize(context, fontSize, isHover = true) {
        let widthHover = StatesKeeper.instance.sizeResizingZone * 2 + this.measureCaptionMaximize.width;
        let withBetween = StatesKeeper.instance.sizeResizingZone * 2;
        context.beginPath();
        context.rect(this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - widthHover, this.rect.y, widthHover, this.headerHeight);
        if (isHover) {
            context.fillStyle = 'hsl(0,0%,90%)';
        }
        else {
            context.fillStyle = 'hsl(0,0%,75%)';
        }
        context.fill();
        context.closePath();
        if (this.rect.isSelected) {
            context.fillStyle = 'black';
        }
        else {
            context.fillStyle = 'gray';
        }
        context.font = `${fontSize}px ${nameFontSymbolMaximize}`;
        context.textAlign = 'right';
        context.textBaseline = "top";
        context.fillText(symbolMaximize, this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - StatesKeeper.instance.sizeResizingZone, this.rect.y + 1);
    }
    DrawHeaderHoverRestoreDown(context, fontSize, isHover = true) {
        let widthHover = StatesKeeper.instance.sizeResizingZone * 2 + this.measureCaptionRestoreDown.width;
        let withBetween = StatesKeeper.instance.sizeResizingZone * 2;
        context.beginPath();
        context.rect(this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - widthHover, this.rect.y, widthHover, this.headerHeight);
        if (isHover) {
            context.fillStyle = 'hsl(0,0%,90%)';
        }
        else {
            context.fillStyle = 'hsl(0,0%,75%)';
        }
        context.fill();
        context.closePath();
        if (this.rect.isSelected) {
            context.fillStyle = 'black';
        }
        else {
            context.fillStyle = 'gray';
        }
        context.font = `${fontSize}px ${nameFontSymbolRestoreDown}`;
        context.textAlign = 'right';
        context.textBaseline = "top";
        context.fillText(symbolRestoreDown, this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - StatesKeeper.instance.sizeResizingZone, this.rect.y + 1);
    }
    ResetMoveMouse(canvas) {
        if (this.statesKeeper.serialNumberResizeEW === this.rect.serialNumber) {
            this.statesKeeper.serialNumberResizeEW = 0;
            canvas.dataset.cursor = cursorDefault;
        }
        else if (this.statesKeeper.serialNumberResizeNS === this.rect.serialNumber) {
            this.statesKeeper.serialNumberResizeNS = 0;
            canvas.dataset.cursor = cursorDefault;
        }
        else if (this.statesKeeper.serialNumberResizeNESW === this.rect.serialNumber) {
            this.statesKeeper.serialNumberResizeNESW = 0;
            canvas.dataset.cursor = cursorDefault;
        }
        else if (this.statesKeeper.serialNumberResizeNWSE === this.rect.serialNumber) {
            this.statesKeeper.serialNumberResizeNWSE = 0;
            canvas.dataset.cursor = cursorDefault;
        }
        else if (this.statesKeeper.serialNumberHoverClose === this.rect.serialNumber) {
            this.statesKeeper.serialNumberHoverClose = 0;
            let context = canvas.getContext('2d');
            this.DrawHeaderHoverClose(context, this.GetFontSize(context), false);
        }
        else if (this.statesKeeper.serialNumberHoverMinimize === this.rect.serialNumber) {
            this.statesKeeper.serialNumberHoverMinimize = 0;
            let context = canvas.getContext('2d');
            this.DrawHeaderHoverMinimize(context, this.GetFontSize(context), false);
        }
        else if (this.statesKeeper.serialNumberHoverMaximize === this.rect.serialNumber) {
            this.statesKeeper.serialNumberHoverMaximize = 0;
            let context = canvas.getContext('2d');
            this.DrawHeaderHoverMaximize(context, this.GetFontSize(context), false);
        }
        else if (this.statesKeeper.serialNumberHoverRestoreDown === this.rect.serialNumber) {
            this.statesKeeper.serialNumberHoverRestoreDown = 0;
            let context = canvas.getContext('2d');
            this.DrawHeaderHoverRestoreDown(context, this.GetFontSize(context), false);
        }
    }
    GetMaxLayer(x, y, sizeResizingZone, windows) {
        let maxLayer = 0;
        let serialNumber = 0;
        let layers = new Array();
        for (let i = 0; i < windows.length; i++) {
            let w = windows[i];
            if (x >= w.rect.x - sizeResizingZone && x <= w.rect.x + w.rect.width + sizeResizingZone && y >= w.rect.y - sizeResizingZone && y <= w.rect.y + w.rect.height + sizeResizingZone) {
                layers.push([i, w.rect.serialNumber]);
            }
        }
        if (layers.length > 1) {
            maxLayer = layers.reduce((prev, current) => current[0] > prev ? current[0] : prev, 0);
            serialNumber = layers.find(item => item[0] === maxLayer)[1];
        }
        else if (layers.length === 1) {
            serialNumber = layers[0][1];
        }
        return serialNumber;
    }
    ResizeOff() {
        this.isResize = false;
        this.isResizeEW = false;
        this.isResizeNS = false;
        this.isResizeNESW = false;
        this.isResizeNWSE = false;
    }
    isInside(x, y, maxLayer, sizeResizingZone) {
        if (this.rect.serialNumber === maxLayer) {
            return x >= this.rect.x - sizeResizingZone && x <= this.rect.x + this.rect.width + sizeResizingZone &&
                y >= this.rect.y - sizeResizingZone && y <= this.rect.y + this.rect.height + sizeResizingZone;
        }
        else {
            return false;
        }
    }
    isLeftResizeEW(x, sizeResizingZone) {
        return x >= this.rect.x - sizeResizingZone && x <= this.rect.x;
    }
    isRightResizeEW(x, sizeResizingZone) {
        return x >= this.rect.x + this.rect.width && x <= this.rect.x + this.rect.width + sizeResizingZone;
    }
    isYResizeEW(y, sizeResizingZone) {
        return y >= this.rect.y + sizeResizingZone && y <= this.rect.y + this.rect.height - sizeResizingZone;
    }
    isTopResizeNS(y, sizeResizingZone) {
        return y >= this.rect.y - sizeResizingZone && y <= this.rect.y;
    }
    isDownResizeNS(y, sizeResizingZone) {
        return y >= this.rect.y + this.rect.height && y <= this.rect.y + this.rect.height + sizeResizingZone;
    }
    isXResizeNS(x, sizeResizingZone) {
        return x >= this.rect.x + sizeResizingZone && x <= this.rect.x + this.rect.width - sizeResizingZone;
    }
    isResizeNESWTopRight(x, y, sizeResizingZone) {
        return x >= this.rect.x + this.rect.width && x <= this.rect.x + this.rect.width + sizeResizingZone
            && y >= this.rect.y - sizeResizingZone && y <= this.rect.y;
    }
    isResizeNESWBottomLeft(x, y, sizeResizingZone) {
        return x >= this.rect.x - sizeResizingZone && x <= this.rect.x
            && y >= this.rect.y + this.rect.height && y <= this.rect.y + this.rect.height + sizeResizingZone;
    }
    isResizeNWSELeftTop(x, y, sizeResizingZone) {
        return x >= this.rect.x - sizeResizingZone && x <= this.rect.x
            && y >= this.rect.y - sizeResizingZone && y <= this.rect.y;
    }
    isResizeNWSERightBottom(x, y, sizeResizingZone) {
        return x >= this.rect.x + this.rect.width && x <= this.rect.x + this.rect.width + sizeResizingZone
            && y >= this.rect.y + this.rect.height && y <= this.rect.y + this.rect.height + sizeResizingZone;
    }
    isMinimizeButton(x, y) {
        let maximizeButtonWidth = this.isMaximize ? this.measureCaptionRestoreDown.width : this.measureCaptionMaximize.width;
        let withBetween = StatesKeeper.instance.sizeResizingZone * 2;
        return x > this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - maximizeButtonWidth - withBetween - this.measureCaptionMinimize.width + 1
            && x < this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - maximizeButtonWidth - 1
            && y > this.rect.y + 1 && y < this.rect.y + this.headerHeight - 1;
    }
    isMaximizeButton(x, y) {
        let withBetween = StatesKeeper.instance.sizeResizingZone * 2;
        return x > this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - this.measureCaptionMaximize.width + 1
            && x < this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - 1
            && y > this.rect.y + 1 && y < this.rect.y + this.headerHeight - 1;
    }
    isRestoreDownButton(x, y) {
        let withBetween = StatesKeeper.instance.sizeResizingZone * 2;
        return x > this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - withBetween - this.measureCaptionRestoreDown.width + 1
            && x < this.rect.x + this.rect.width - withBetween - this.measureCaptionClose.width - 1
            && y > this.rect.y + 1 && y < this.rect.y + this.headerHeight - 1;
    }
    isCloseButton(x, y) {
        return x > this.rect.x + this.rect.width - StatesKeeper.instance.sizeResizingZone * 2 - this.measureCaptionClose.width + 1
            && x < this.rect.x + this.rect.width - 1
            && y > this.rect.y + 1 && y < this.rect.y + this.headerHeight - 1;
    }
    GetMinCaptionWidth() {
        return Math.floor(1 + this.measureCaptionHead.width +
            StatesKeeper.instance.sizeResizingZone * 2 +
            this.measureCaptionMinimize.width +
            StatesKeeper.instance.sizeResizingZone * 2 +
            this.measureCaptionMaximize.width +
            StatesKeeper.instance.sizeResizingZone * 2 +
            this.measureCaptionClose.width +
            StatesKeeper.instance.sizeResizingZone);
    }
    GetFontSize(context) {
        let temp = Math.floor(context.canvas.height / 30);
        return temp < 10 ? 10 : temp;
    }
    SetRecoveryParameters() {
        this.recoveryParameters.x = this.rect.x;
        this.recoveryParameters.y = this.rect.y;
        this.recoveryParameters.width = this.rect.width;
        this.recoveryParameters.height = this.rect.height;
    }
}
export class ViewMWS {
    constructor(mwsArea, mwsmStart, menuStart, mwsmTaskBar) {
        this._bufferCanvas = document.createElement('canvas');
        this._bufferContext = this._bufferCanvas.getContext('2d');
        this._windows = [];
        this._canvasEventHandlers = new EventHandlers();
        this._mwsArea = mwsArea;
        this._context = this._mwsArea.getContext('2d');
        this._mwsmStart = mwsmStart;
        this._menuStart = menuStart;
        this._mwsmTaskBar = mwsmTaskBar;
        this.DefineEvents();
        this.InitScaleArea();
    }
    static get instance() {
        if (!ViewMWS._instance) {
            throw new Error('Instance of ViewMWS was not created.');
        }
        return ViewMWS._instance;
    }
    get mwsArea() { return this._mwsArea; }
    get context() { return this._context; }
    get windows() { return this._windows; }
    get fillType() {
        let type = Params.instance.wPropStored.fillType;
        if (type[0] === FillTypeAny) {
            let element = Colors.instance.RandomInt(1, FillType.size - 1);
            type = Array.from(FillType.entries()).find((pair) => pair[1] == element);
        }
        return type;
    }
    static Create(mwsArea, mwsmStart, menuStart, mwsmTaskBar) {
        if (!ViewMWS._instance) {
            ViewMWS._instance = new ViewMWS(mwsArea, mwsmStart, menuStart, mwsmTaskBar);
        }
        return ViewMWS._instance;
    }
    getCoordinates(e) {
        let clientX, clientY;
        let clientRect = e.target.getBoundingClientRect();
        clientX = e.clientX - Math.floor(clientRect.left);
        clientY = e.clientY - Math.floor(clientRect.top);
        let x, y;
        x = Math.floor(e.target.width / clientRect.width * clientX);
        y = Math.floor(e.target.height / clientRect.height * clientY);
        return { x, y };
    }
    drawStar(cx, cy, spikes, outerRadius, innerRadius, lineWidth = 3, strokeStyle = 'blue', fillStyle = 'yellow') {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;
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
    Redraw() {
        this.Draw();
    }
    Draw() {
        this._bufferContext.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
        for (let w of this.windows.filter(item => !item.isMinimize)) {
            w.draw(this._bufferContext);
        }
        this.context.clearRect(0, 0, this.mwsArea.width, this.mwsArea.height);
        this.context.globalAlpha = 1;
        this.context.drawImage(this._bufferCanvas, 0, 0);
    }
    DefineEvents() {
        this.mwsArea.addEventListener('mousedown', (e) => { this.OnMouseDownCanvas(e); }, false);
        this.mwsArea.addEventListener('mousemove', (e) => { this.OnMouseMoveCanvas(e); }, false);
        this.mwsArea.addEventListener('mouseup', (e) => { this.OnMouseUpCanvas(e); }, false);
        this.mwsArea.addEventListener('click', (e) => { this.OnMouseClickCanvas(e); }, false);
        this._mwsmStart.addEventListener('click', (e) => { this.OnStart(e); }, false);
        for (let itemStart of document.getElementsByName('mwsm-task')) {
            itemStart.addEventListener('click', (e) => { this.OnTaskStart(e); }, true);
        }
        document.addEventListener(Params.instance.nameEventFillChange, () => { this.OnFillChange(); }, false);
        document.addEventListener(Params.instance.nameEventScaleChange, () => { this.OnScaleChange(); }, false);
        document.addEventListener(CustomEventOverFill, () => { this.OnOverFill(); }, false);
        document.addEventListener(CustomEventIsSelected, (e) => { this.OnIsSelected(e); }, false);
        document.addEventListener(CustomEventIsResize, () => { this.OnIsResize(); }, false);
        document.addEventListener(CustomEventIsMove, () => { this.OnIsMove(); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredWidthChanged, (e) => { this.OnChangeSelectedWidth(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredHeightChanged, (e) => { this.OnChangeSelectedHeight(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredLengthWaveChanged, (e) => { this.OnChangeSelectedLengthWave(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredAmplitudeWaveChanged, (e) => { this.OnChangeSelectedAmplitudeWave(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredPeriodWaveChanged, (e) => { this.OnChangeSelectedPeriodWave(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStoredShadingWaveChanged, (e) => { this.OnChangeSelectedShadingWave(e); }, false);
        document.addEventListener(CustomEventCLoseClick, (e) => { this.OnCloseClick(e); }, false);
        document.addEventListener(CustomEventMinimizeClick, (e) => { this.OnMinimizeClick(e); }, false);
        document.addEventListener(CustomEventMaximizeClick, (e) => { this.OnMaximizeClick(e); }, false);
        document.addEventListener(CustomEventRestoreDownClick, (e) => { this.OnRestoreDownClick(e); }, false);
        window.addEventListener('resize', () => { this.OnWindowChange(); }, false);
        window.addEventListener('scroll', () => { this.OnWindowChange(); }, false);
    }
    InitScaleArea() {
        if (!Params.instance.isOffScreenCanvas) {
            this._mwsArea.width = Params.instance.scale[1];
            this._mwsArea.height = Math.round(this._mwsArea.width / 2);
            this._bufferCanvas.width = this._mwsArea.width;
            this._bufferCanvas.height = this._mwsArea.height;
            switch (this._mwsArea.width) {
                case 300:
                    this._sizeResizingZone = 6;
                    break;
                case 600:
                    this._sizeResizingZone = 7;
                    break;
                case 900:
                    this._sizeResizingZone = 8;
                    break;
                case 1200:
                    this._sizeResizingZone = 9;
                    break;
                case 1600:
                    this._sizeResizingZone = 10;
                    break;
                case 1900:
                    this._sizeResizingZone = 11;
                    break;
                case 2560:
                    this._sizeResizingZone = 14;
                    break;
                case 3200:
                    this._sizeResizingZone = 16;
                    break;
                case 4800:
                    this._sizeResizingZone = 18;
                    break;
                case 5600:
                    this._sizeResizingZone = 20;
                    break;
            }
            StatesKeeper.instance.sizeResizingZone = this._sizeResizingZone;
        }
    }
    AddToList(kind, country = '') {
        let serialNumber = this.windows.reduce((prev, current) => current.rect.serialNumber > prev ? current.rect.serialNumber : prev, 0) + 1;
        let fontSize = this.GetFontSize();
        switch (kind[0]) {
            case NameKindFigureRectangle: {
                this._context.font = `${fontSize}px Roboto Condensed`;
                let captionHead = `${serialNumber}-${NameKindFigureRectangle}`;
                let measureCaptionHead = this.context.measureText(captionHead);
                this._context.font = `${fontSize}px ${nameFontSymbolClose}`;
                let measureCaptionClose = this.context.measureText(symbolClose);
                this._context.font = `${fontSize}px ${nameFontSymbolMinimize}`;
                let measureCaptionMinimize = this.context.measureText(symbolMinimize);
                this._context.font = `${fontSize}px ${nameFontSymbolMaximize}`;
                let measureCaptionMaximize = this.context.measureText(symbolMaximize);
                this._context.font = `${fontSize}px ${nameFontSymbolRestoreDown}`;
                let measureCaptionRestoreDown = this.context.measureText(symbolRestoreDown);
                let rectWidth = Colors.instance.RandomInt(Math.max(MwsConstraints.figureWidthMin, Math.floor(measureCaptionHead.width +
                    this._sizeResizingZone * 2 +
                    measureCaptionMinimize.width +
                    this._sizeResizingZone * 2 +
                    measureCaptionMaximize.width +
                    this._sizeResizingZone * 2 +
                    measureCaptionClose.width +
                    this._sizeResizingZone)), Math.min(Math.floor(this.mwsArea.width / 2), MwsConstraints.figureWidthMax));
                let rectHeight = Colors.instance.RandomInt(MwsConstraints.figureHeightMin + fontSize + 2, Math.min(Math.floor(this.mwsArea.height / 4), MwsConstraints.figureHeightMax));
                let figure = new ViewRect(new Rect(Colors.instance.RandomInt(1, Math.floor(this.mwsArea.width) - rectWidth), Colors.instance.RandomInt(1, Math.floor(this.mwsArea.height) - rectHeight - (fontSize - 2)), rectWidth, rectHeight, Colors.instance.RandomInt(Math.floor(rectHeight * 0.05), Math.floor(rectHeight * 0.15))), Colors.instance.randomColor, Colors.instance.randomColor);
                figure.rect.serialNumber = serialNumber;
                figure.measureCaptionHead = measureCaptionHead;
                figure.measureCaptionClose = measureCaptionClose;
                figure.measureCaptionMinimize = measureCaptionMinimize;
                figure.measureCaptionMaximize = measureCaptionMaximize;
                figure.measureCaptionRestoreDown = measureCaptionRestoreDown;
                figure.fontSize = fontSize;
                this.NewFill(figure);
                this.windows.push(figure);
                this._canvasEventHandlers.mouseDown.set(serialNumber, (x, y, canvas, sizeResizingZone, windows) => { return figure.mouseDownHandler(x, y, canvas, sizeResizingZone, windows); });
                this._canvasEventHandlers.mouseMove.set(serialNumber, (x, y, canvas, sizeResizingZone, windows) => { return figure.mouseMoveHandler(x, y, canvas, sizeResizingZone, windows); });
                this._canvasEventHandlers.mouseUp.set(serialNumber, (x, y, canvas, sizeResizingZone, windows) => { return figure.mouseUpHandler(x, y, canvas, sizeResizingZone, windows); });
                this._canvasEventHandlers.mouseClick.set(serialNumber, (x, y, canvas, sizeResizingZone, windows) => { return figure.mouseClickHandler(x, y, canvas, sizeResizingZone, windows); });
                break;
            }
            default: {
                throw new Error('Error: Undefined kind of window');
            }
        }
        ;
    }
    OnStart(e) {
        let type = 'start';
        let start = e.target;
        if (isDisplayBlock(this._menuStart) && this._menuStart.dataset.type === type) {
            this.DisableMenuStart();
            return;
        }
        this._menuStart.dataset.type = type;
        let coords = start.getBoundingClientRect();
        this._menuStart.style.left = coords.left + "px";
        this._menuStart.dataset.display = 'true';
        let menuCoords = this._menuStart.getBoundingClientRect();
        this._menuStart.style.top = coords.top - menuCoords.height + "px";
    }
    OnTaskStart(e) {
        let mwsmTask = e.target.closest('[data-kind]');
        let kind = mwsmTask.dataset.kind;
        if (kind == NameKindFigureRectangle) {
            this.AddToList(Array.from(FigureKind.entries()).find((pair) => pair[0] === NameKindFigureRectangle));
            Params.instance.switchSerialNumber = this.windows[this.windows.length - 1].rect.serialNumber;
            this.DefinePropStored(this.windows[this.windows.length - 1]);
            this.SetNewTask();
        }
        else if (kind == NameKindFigureFlag) {
            if (mwsmTask.dataset.country) {
                console.log(mwsmTask.dataset.country);
            }
        }
        this.DisableMenuStart();
    }
    OnFillChange() {
        this.SetFill();
    }
    NewFill(w) {
        let tempNumber = Colors.instance.RandomInt(1, FillType.size - 1);
        let tempFillType = Array.from(FillType.entries()).find((pair) => pair[1] == tempNumber);
        this.InitFillViewRectangle(w, tempFillType);
    }
    InitFillViewRectangle(w, fillType) {
        w.fillType = fillType;
        if (w.fillType[0] === FillTypeColor) {
            w.colorStroke = Colors.instance.randomColor;
            w.colorFill = Colors.instance.randomColor;
        }
        else if (w.fillType[0] === FillTypeLinearGradient) {
            w.gradientBorder = Colors.instance.GetFillRectLineGradient(this.context, w.rect.x, w.rect.y, w.rect.width, w.rect.height, w.propertiesGradientBorder);
            w.gradientInside = Colors.instance.GetFillRectLineGradient(this.context, w.rect.x, w.rect.y, w.rect.width, w.rect.height, w.propertiesGradientInside);
        }
        else if (w.fillType[0] === FillTypeRadialGradient) {
            w.propertiesGradientBorder.radialDirection = Colors.instance.RandomInt(RadialDirection.Centre, RadialDirection.BottomTop);
            w.propertiesGradientBorder.colorScheme = Colors.instance.CreateColorScheme();
            w.propertiesGradientInside.radialDirection = Colors.instance.RandomInt(RadialDirection.Centre, RadialDirection.BottomTop);
            w.propertiesGradientInside.colorScheme = Colors.instance.CreateColorScheme();
        }
        else {
            w.fillType = Array.from(FillType.entries()).find(item => item[0] === FillTypeColor);
            w.colorStroke = Colors.instance.randomColor;
            w.colorFill = Colors.instance.randomColor;
        }
    }
    OnScaleChange() {
        if (!Params.instance.isOffScreenCanvas) {
            let OldWidth = this.mwsArea.width;
            let oldHeight = this.mwsArea.height;
            this.InitScaleArea();
            let ratioWidth = this.mwsArea.width / OldWidth;
            let ratioHeight = this.mwsArea.height / oldHeight;
            let fontSize = this.GetFontSize();
            let captionHead;
            let measureCaptionHead;
            this.context.font = `${fontSize}px ${nameFontSymbolClose}`;
            let measureCaptionClose = this.context.measureText(symbolClose);
            this.context.font = `${fontSize}px ${nameFontSymbolMinimize}`;
            let measureCaptionMinimize = this.context.measureText(symbolMinimize);
            this.context.font = `${fontSize}px ${nameFontSymbolMaximize}`;
            let measureCaptionMaximize = this.context.measureText(symbolMaximize);
            this.context.font = `${fontSize}px ${nameFontSymbolRestoreDown}`;
            let measureCaptionRestoreDown = this.context.measureText(symbolRestoreDown);
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
                    if (w.rect.isSelected)
                        this.DefinePropStored(w);
                }
            }
            this.Draw();
        }
        else {
        }
    }
    OnOverFill() {
        this.SetFill();
    }
    SetFill() {
        let w = this.windows[this.windows.length - 1];
        if (w instanceof ViewRect) {
            this.InitFillViewRectangle(w, this.fillType);
            this.DefinePropStored(w);
            if (!w.isMinimize)
                w.draw(this.context);
            this.UpdateTaskBar(commandOverFillTaskBar);
        }
    }
    OnMouseDownCanvas(e) {
        let serialNumber;
        let coordinates = this.getCoordinates(e);
        let isRect = false;
        let layers = new Array();
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
            let maxLayer = layers.reduce((prev, current) => current[0] > prev ? current[0] : prev, 0);
            Params.instance.serialNumberTracking = layers.find(item => item[0] === maxLayer)[1];
        }
    }
    OnMouseMoveCanvas(e) {
        let serialNumber;
        let coordinates = this.getCoordinates(e);
        let isRect = false;
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
    OnMouseUpCanvas(e) {
        let serialNumber;
        let coordinates = this.getCoordinates(e);
        let isRect = false;
        let layers = new Array();
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
            let maxLayer = layers.reduce((prev, current) => current[0] > prev ? current[0] : prev, 0);
            Params.instance.serialNumberTracking = layers.find(item => item[0] === maxLayer)[1];
        }
    }
    OnMouseClickCanvas(e) {
        let serialNumber;
        let coordinates = this.getCoordinates(e);
        let isRect = false;
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
    OnIsSelected(e) {
        let serialNumber = e.detail.serialNumber;
        let x = e.detail.x;
        let y = e.detail.y;
        let maxLayer = this.windows.findIndex(item => item.rect.serialNumber === serialNumber);
        let layers = new Array();
        for (let i = 0; i < this.windows.length; i++) {
            let w = this.windows[i];
            if (x >= w.rect.x && x <= w.rect.x + w.rect.width && y >= w.rect.y && y <= w.rect.y + w.rect.height) {
                layers.push([i, w.rect.serialNumber]);
            }
        }
        if (layers.length > 1) {
            maxLayer = layers.reduce((prev, current) => current[0] > prev ? current[0] : prev, 0);
            serialNumber = layers.find(item => item[0] === maxLayer)[1];
        }
        Params.instance.switchSerialNumber = serialNumber;
        this.SwitchToSelected();
    }
    SetNewTask() {
        let newW = this.windows.find((item) => item.rect.serialNumber === Params.instance.switchSerialNumber);
        if (this.windows.length > 1) {
            let oldW = this.windows.find((item) => item.rect.isSelected);
            oldW.rect.isSelected = false;
            let temp = this.windows.filter(item => item.rect.serialNumber !== Params.instance.switchSerialNumber);
            temp.push(newW);
            this._windows = temp;
        }
        ;
        newW.rect.isSelected = true;
        this.DefinePropStored(newW);
        this.Draw();
        this.UpdateTaskBar();
    }
    SwitchToSelected() {
        let newW = this.windows.find((item) => item.rect.serialNumber === Params.instance.switchSerialNumber);
        if (!newW.rect.isSelected) {
            if (this.windows.length > 1) {
                let oldW = this.windows.find((item) => item.rect.isSelected);
                oldW.rect.isSelected = false;
                let temp = this.windows.filter(item => item.rect.serialNumber !== Params.instance.switchSerialNumber);
                temp.push(newW);
                this._windows = temp;
            }
            newW.rect.isSelected = true;
            this.DefinePropStored(newW);
            this.Draw();
        }
        this.UpdateTaskBar(commandWindowSelectedTaskBar);
    }
    OnIsResize() {
        this.Draw();
        this.DefinePropStored(this.windows[this.windows.length - 1]);
    }
    OnIsMove() {
        this.Draw();
        this.DefinePropStored(this.windows[this.windows.length - 1]);
    }
    OnChangeSelectedWidth(e) {
        this.windows[this.windows.length - 1].rect.width = e.detail.value;
        this.Draw();
    }
    OnChangeSelectedHeight(e) {
        this.windows[this.windows.length - 1].rect.height = e.detail.value;
        this.Draw();
    }
    OnChangeSelectedLengthWave(e) {
        this.windows[this.windows.length - 1].rect.waveParams.length = e.detail.value;
    }
    OnChangeSelectedAmplitudeWave(e) {
        this.windows[this.windows.length - 1].rect.waveParams.amplitude = e.detail.value;
    }
    OnChangeSelectedPeriodWave(e) {
        this.windows[this.windows.length - 1].rect.waveParams.period = e.detail.value;
    }
    OnChangeSelectedShadingWave(e) {
        this.windows[this.windows.length - 1].rect.waveParams.shading = e.detail.value;
    }
    OnCloseClick(e) {
        let serialNumber = e.detail.serialNumber;
        this._canvasEventHandlers.mouseDown.delete(serialNumber);
        this._canvasEventHandlers.mouseMove.delete(serialNumber);
        this._canvasEventHandlers.mouseUp.delete(serialNumber);
        this._canvasEventHandlers.mouseClick.delete(serialNumber);
        let temp = this.windows.filter(item => item.rect.serialNumber != serialNumber);
        this._windows = temp;
        if (this.windows.length > 0 && !this.windows.some(item => item.rect.isSelected)) {
            this.windows[this.windows.length - 1].rect.isSelected = true;
            this.DefinePropStored(this.windows[this.windows.length - 1]);
        }
        this.Draw();
        this.UpdateTaskBar();
    }
    OnMinimizeClick(e) {
        let serialNumber = e.detail.serialNumber;
        let w = this.windows.find(item => item.rect.serialNumber == serialNumber);
        w.isMinimize = true;
        this.DefinePropStored(w);
        this.Draw();
    }
    OnMaximizeClick(e) {
        console.log(`Maximize-Click-SN: ${e.detail.serialNumber}`);
    }
    OnRestoreDownClick(e) {
        console.log(`RestoreDown-Click-SN: ${e.detail.serialNumber}`);
    }
    DefinePropStored(w) {
        let prop = new WPropStored();
        prop.x = w.rect.x;
        prop.y = w.rect.y;
        prop.kind = w.rect.kind;
        prop.serialNumber = w.rect.serialNumber;
        prop.isSelected = w.rect.isSelected;
        prop.width = w.rect.width;
        prop.widthOriginal = w.rect.widthOriginal;
        prop.waveLength = w.rect.waveParams.length;
        prop.waveAmplitude = w.rect.waveParams.amplitude;
        prop.wavePeriod = w.rect.waveParams.period;
        prop.waveShading = w.rect.waveParams.shading;
        prop.height = w.rect.height;
        prop.heightOriginal = w.rect.heightOriginal;
        prop.borderWidth = w.rect.borderWidth;
        prop.aspectRatio = w.rect.aspectRatio;
        prop.headerHeight = w.headerHeight;
        prop.measureCaptionHead = w.measureCaptionHead;
        prop.measureCaptionClose = w.measureCaptionClose;
        prop.measureCaptionMinimize = w.measureCaptionMinimize;
        prop.measureCaptionMaximize = w.measureCaptionMaximize;
        prop.measureCaptionRestoreDown = w.measureCaptionRestoreDown;
        prop.fillType = w.fillType;
        prop.colorFill = w.colorFill;
        prop.colorStroke = w.colorStroke;
        Params.instance.wPropStored = prop;
    }
    OnWindowChange() {
        this.DisableMenuStart();
    }
    DisableMenuStart() {
        this._menuStart.dataset.type = 'empty';
        this._menuStart.dataset.display = 'false';
    }
    UpdateTaskBar(command = commandCreateTaskBar) {
        switch (command) {
            case commandCreateTaskBar:
                this.CreateTaskBar();
                break;
            case commandWindowSelectedTaskBar:
                for (let task of this._mwsmTaskBar.querySelectorAll('[data-serial-number]')) {
                    let serialNumber = Number(task.dataset.serialNumber);
                    if (serialNumber == Params.instance.switchSerialNumber) {
                        task.dataset.selected = 'true';
                    }
                    else {
                        task.dataset.selected = 'false';
                    }
                }
                break;
            case commandOverFillTaskBar:
                let w = this.windows[this.windows.length - 1];
                for (let task of this._mwsmTaskBar.querySelectorAll('[data-serial-number]')) {
                    let serialNumber = Number(task.dataset.serialNumber);
                    if (serialNumber == w.rect.serialNumber) {
                        let canvas = task.querySelector('canvas');
                        this.FillTaskBar(canvas, w);
                        break;
                    }
                }
                break;
        }
    }
    CreateTaskBar() {
        this._mwsmTaskBar.innerHTML = '';
        let snWindows = this.windows.concat().sort((a, b) => {
            if (a.rect.serialNumber > b.rect.serialNumber)
                return 1;
            if (a.rect.serialNumber < b.rect.serialNumber)
                return -1;
            return 0;
        });
        for (let w of snWindows) {
            let task = document.createElement('div');
            task.className = 'mwsm-task';
            if (w.rect.isSelected) {
                task.dataset.selected = 'true';
            }
            else {
                task.dataset.selected = 'false';
            }
            task.dataset.serialNumber = `${w.rect.serialNumber}`;
            let span = document.createElement('span');
            span.innerHTML = `&nbsp;${w.rect.serialNumber}&nbsp;`;
            let likeness = document.createElement('div');
            likeness.className = 'likeness';
            task.addEventListener('click', (e) => { this.OnTaskSelected(e); }, false);
            task.appendChild(span);
            task.appendChild(likeness);
            let canvas = document.createElement('canvas');
            likeness.appendChild(canvas);
            this.FillTaskBar(canvas, w);
            this._mwsmTaskBar.appendChild(task);
        }
    }
    FillTaskBar(canvas, w) {
        if (w.fillType[0] == FillTypeColor) {
            Colors.instance.FillSchemeColor(canvas.getContext('2d'), w.colorFill);
        }
        else if (w.fillType[0] == FillTypeLinearGradient) {
            Colors.instance.FillSchemeLineGradient(canvas.getContext('2d'), w.propertiesGradientInside);
        }
        else if (w.fillType[0] == FillTypeRadialGradient) {
            Colors.instance.FillSchemeRadialGradient(canvas.getContext('2d'), w.propertiesGradientInside);
        }
    }
    OnTaskSelected(e) {
        let mwsmTask = e.target.closest('[data-serial-number]');
        let serialNumber = Number(mwsmTask.dataset.serialNumber);
        let w = this.windows.find(item => item.rect.serialNumber == serialNumber);
        let isSelected = mwsmTask.dataset.selected == 'true';
        if (!isSelected) {
            if (w.isMinimize)
                w.isMinimize = false;
            mwsmTask.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
            Params.instance.switchSerialNumber = serialNumber;
            setTimeout(() => { this.SwitchToSelected(); }, 20);
        }
        else if (w.isMinimize) {
            w.isMinimize = false;
            mwsmTask.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
            this.Draw();
        }
    }
    GetFontSize() {
        let temp = Math.floor(this.mwsArea.height / 30);
        return temp < 10 ? 10 : temp;
    }
}
ViewMWS._instance = undefined;
//# sourceMappingURL=viewMWS.js.map