const FillTypeColor = 1;
const FillTypeInitialGradient = 2;
const FillTypeRedrawGradient = 3;

class AsyncCanvas {
    constructor() {
        this._canvas = new OffscreenCanvas(300, 150);
    }
    // Properties
    static get instance() {
        if (!AsyncCanvas._instance) {
            AsyncCanvas._instance = new AsyncCanvas();
        }
        return AsyncCanvas._instance;
    }
    get width() { return this._canvas.width; }
    set width(value) { this._canvas.width = value; }
    get height() { return this._canvas.height; }
    set height(value) { this._canvas.height = value; }
    get canvas() { return this._canvas; }
    get context() { return this._canvas.getContext('2d'); }
}
AsyncCanvas._instance = undefined;

let GradientDirection;
(function (GradientDirection) {
    GradientDirection[GradientDirection["LeftToRight"] = 1] = "LeftToRight";
    GradientDirection[GradientDirection["TopToBottom"] = 2] = "TopToBottom";
    GradientDirection[GradientDirection["LeftTopToBottomRight"] = 3] = "LeftTopToBottomRight";
    GradientDirection[GradientDirection["RightTopToLeftBottom"] = 4] = "RightTopToLeftBottom";
})(GradientDirection || (GradientDirection = {}));

class GradientColorScheme {
    constructor() {
        this._scheme = [];
    }
    get list() {
        return this.getScheme();
    }
    Add(value) {
        this._scheme.push(value);
    }
    *getScheme() {
        for (let i = 0; i < this._scheme.length; i++) {
            yield this._scheme[i];
        }
    }
}
class Colors {
    constructor() {
        this._mapColors = new Map([
            ['Aliceblue', '#f0f8ff'],
            ['Antiquewhite', '#FAEBD7'],
            ['Aqua', '#00FFFF'],
            ['Aquamarine', '#7FFFD4'],
            ['Azure', '#F0FFFF'],
            ['Beige', '#F5F5DC'],
            ['Bisque', '#FFE4C4'],
            ['Black', '#000000'],
            ['Blanchedalmond', '#FFEBCD'],
            ['Blue', '#0000ff'],
            ['Blueviolet', '#8A2BE2'],
            ['Brown', '#A52A2A'],
            ['Burlywood', '#DEB887'],
            ['Cadetblue', '#5F9EA0'],
            ['Chartreuse', '#7FFF00'],
            ['Chocolate', '#D2691E'],
            ['Coral', '#FF7F50'],
            ['Cornflowerblue', '#6495ED'],
            ['Cornsilk', '#FFF8DC'],
            ['Crimson', '#DC143C'],
            ['Cyan', '#00FFFF'],
            ['Darkblue', '#00008B'],
            ['Darkcyan', '#008B8B'],
            ['Darkgoldenrod', '#B8860B'],
            ['Darkgray', '#A9A9A9'],
            ['Darkgreen', '#006400'],
            ['Darkkhaki', '#BDB76B'],
            ['Darkmagenta', '#8B008B'],
            ['Darkolivegreen', '#556B2F'],
            ['Darkorange', '#FF8C00'],
            ['Darkorchid', '#9932CC'],
            ['Darkred', '#8B0000'],
            ['Darksalmon', '#E9967A'],
            ['Darkseagreen', '#8FBC8B'],
            ['Darkslateblue', '#483D8B'],
            ['Darkslategray', '#2F4F4F'],
            ['Darkturquoise', '#00CED1'],
            ['Darkviolet', '#9400D3'],
            ['Deeppink', '#FF1493'],
            ['Deepskyblue', '#00BFFF'],
            ['Dimgray', '#696969'],
            ['Dodgerblue', '#1E90FF'],
            ['Firebrick', '#B22222'],
            ['Floralwhite', '#FFFAF0'],
            ['Forestgreen', '#228B22'],
            ['Fuchsia', '#FF00FF'],
            ['Gainsboro', '#DCDCDC'],
            ['Ghostwhite', '#F8F8FF'],
            ['Gold', '#FFD700'],
            ['Goldenrod', '#DAA520'],
            ['Gray', '#808080'],
            ['Green', '#008000'],
            ['Greenyellow', '#ADFF2F'],
            ['Honeydew', '#F0FFF0'],
            ['Hotpink', '#FF69B4'],
            ['Indianred', '#CD5C5C'],
            ['Indigo', '#4B0082'],
            ['Ivory', '#FFFFF0'],
            ['Khaki', '#F0E68C'],
            ['Lavender', '#E6E6FA'],
            ['Lavenderblush', '#FFF0F5'],
            ['Lawngreen', '#7CFC00'],
            ['Lemonchiffon', '#FFFACD'],
            ['Lightblue', '#ADD8E6'],
            ['Lightcoral', '#F08080'],
            ['Lightcyan', '#E0FFFF'],
            ['Lightgoldenrod', '#EEDD82'],
            ['Lightgoldenrodyellow', '#FAFAD2'],
            ['Lightgray', '#D3D3D3'],
            ['Lightgreen', '#90EE90'],
            ['Lightpink', '#FFB6C1'],
            ['Lightsalmon', '#FFA07A'],
            ['Lightseagreen', '#20B2AA'],
            ['Lightskyblue', '#87CEFA'],
            ['Lightslateblue', '#8470FF'],
            ['Lightslategray', '#778899'],
            ['Lightsteelblue', '#B0C4DE'],
            ['Lightyellow', '#FFFFE0'],
            ['Lime', '#00FF00'],
            ['Limegreen', '#32CD32'],
            ['Linen', '#FAF0E6'],
            ['Magenta', '#FF00FF'],
            ['Maroon', '#800000'],
            ['Mediumaquamarine', '#66CDAA'],
            ['Mediumblue', '#0000CD'],
            ['Mediumorchid', '#BA55D3'],
            ['Mediumpurple', '#9370DB'],
            ['Mediumseagreen', '#3CB371'],
            ['Mediumslateblue', '#7B68EE'],
            ['Mediumspringgreen', '#00FA9A'],
            ['Mediumturquoise', '#48D1CC'],
            ['Mediumvioletred', '#C71585'],
            ['Midnightblue', '#191970'],
            ['Mintcream', '#F5FFFA'],
            ['Mistyrose', '#FFE4E1'],
            ['Moccasin', '#FFE4B5'],
            ['Navajowhite', '#FFDEAD'],
            ['Navy', '#000080'],
            ['Navyblue', '#A0B0E0'],
            ['Oldlace', '#FDF5E6'],
            ['Olive', '#808000'],
            ['Olivedrab', '#6B8E23'],
            ['Orange', '#FFA500'],
            ['Orangered', '#FF4500'],
            ['Orchid', '#DA70D6'],
            ['Palegoldenrod', '#EEE8AA'],
            ['Palegreen', '#98FB98'],
            ['Paleturquoise', '#AFEEEE'],
            ['Palevioletred', '#DB7093'],
            ['Papayawhip', '#FFEFD5'],
            ['Peachpuff', '#FFDAB9'],
            ['Peru', '#CD853F'],
            ['Pink', '#FFC0CB'],
            ['Plum', '#DDA0DD'],
            ['Powderblue', '#B0E0E6'],
            ['Purple', '#800080'],
            ['Red', '#FF0000'],
            ['Rosybrown', '#BC8F8F'],
            ['Royalblue', '#4169E1'],
            ['Saddlebrown', '#8B4513'],
            ['Salmon', '#FA8072'],
            ['Sandybrown', '#F4A460'],
            ['Seagreen', '#2E8B57'],
            ['Seashell', '#FFF5EE'],
            ['Sienna', '#A0522D'],
            ['Silver', '#C0C0C0'],
            ['Skyblue', '#87CEEB'],
            ['Slateblue', '#6A5ACD'],
            ['Slategray', '#708090'],
            ['Snow', '#FFFAFA'],
            ['Springgreen', '#00FF7F'],
            ['Steelblue', '#4682B4'],
            ['Tan', '#D2B48C'],
            ['Teal', '#008080'],
            ['Thistle', '#D8BFD8'],
            ['Tomato', '#FF6347'],
            ['Turquoise', '#40E0D0'],
            ['Violet', '#EE82EE'],
            ['Violetred', '#D02090'],
            ['Wheat', '#F5DEB3'],
            ['White', '#FFFFFF'],
            ['Whitesmoke', '#F5F5F5'],
            ['Yellow', '#FFFF00'],
            ['Yellowgreen', '#9ACD32']
        ]);
        this._minLayersGradient = 3;
        this._maxLayersGradient = 10;
    }
    static get instance() {
        if (!Colors._instance) {
            this._instance = new Colors();
        }
        return this._instance;
    }
    get randomColor() {
        let color;
        let numberColor = this.RandomInt(1, this._mapColors.size);
        let index = 0;
        for (let key of this._mapColors.keys()) {
            index++;
            if (index === numberColor) {
                color = this._mapColors.get(key);
                break;
            }
        }
        return color;
    }
    get minLayersGradient() {
        return this._minLayersGradient;
    }
    set minLayersGradient(value) {
        this._minLayersGradient = value;
    }
    get maxLayersGradient() {
        return this._maxLayersGradient;
    }
    set maxLayersGradient(value) {
        this._maxLayersGradient = value;
    }
    FillLineGradient(context, direct) {
        let gradient;
        gradient = this.GetLinerGradient(direct, context, 0, 0, context.canvas.width, context.canvas.height);
        this.GetLinerGradientColorScheme(gradient);
        context.fillStyle = gradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
    GetFillBoxLineGradient(context, x, y, size, gradientProperties) {
        let gradient;
        gradientProperties.direction = this.RandomInt(1, 4);
        gradient = this.GetLinerGradient(gradientProperties.direction, context, x, y, size, size);
        gradientProperties.colorScheme = this.GetLinerGradientColorScheme(gradient);
        return gradient;
    }
    RestoreFillBoxLineGradient(context, x, y, size, gradientProperties) {
        let gradient;
        gradient = this.GetLinerGradient(gradientProperties.direction, context, x, y, size, size);
        for (let layer of gradientProperties.colorScheme._scheme) {
            gradient.addColorStop(layer[0], layer[1]);
        }
        return gradient;
    }
    RandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    GetLinerGradient(direction, context, x, y, width, height) {
        return direction === GradientDirection.LeftToRight ? context.createLinearGradient(x, y, x, y + height) :
            direction === GradientDirection.TopToBottom ? context.createLinearGradient(x, y, x + width, y) :
                direction === GradientDirection.LeftTopToBottomRight ? context.createLinearGradient(x, y, x + height, y + width) :
                    direction === GradientDirection.RightTopToLeftBottom ? context.createLinearGradient(x, y + width, x + height, 0) :
                        context.createLinearGradient(x, y, x, y + height);
    }
    GetLinerGradientColorScheme(gradient) {
        let colorScheme = new GradientColorScheme();
        let lines = this.RandomInt(this.minLayersGradient, this.maxLayersGradient);
        let position;
        let color;
        for (let line = 0; line < lines; line++) {
            position = line / lines;
            color = this.randomColor;
            colorScheme.Add([position, color]);
            gradient.addColorStop(position, color);
        }
        position = 1;
        color = this.randomColor;
        colorScheme.Add([position, color]);
        gradient.addColorStop(position, color);
        return colorScheme;
    }
}
Colors._instance = undefined;

class Draughters {
    constructor() {
        this._canvas;
        this._context;
        this._bufferCanvas;
        this._bufferContext;
        this._item;
        this._nameSquare = 1;
        this._nameCircle = 2;
    }
    // Properties
    static get instance() {
        if (!Draughters._instance) {
            Draughters._instance = new Draughters();
        }
        return Draughters._instance;
    }
    get item() { return this._item; }
    set item(value) { this._item = value; }
    get canvas() { return this._canvas; }
    set canvas(value) { this._canvas = value; }
    get context() { return this._context; }
    set context(value) { this._context = value; }
    get bufferCanvas() { return this._bufferCanvas; }
    set bufferCanvas(value) { this._bufferCanvas = value; }
    get bufferContext() { return this._bufferContext; }
    set bufferContext(value) { this._bufferContext = value; }
    get nameSquare() { return this._nameSquare; }
    get nameCircle() { return this._nameCircle; }
    // Methods
    Draw() {
        let kind = this.item._kind[1];
        if (kind === this.nameCircle) {
            this.DrawCircle();
        } else if (kind === this.nameSquare) {
            this.DrawSquare();
        }
    }
    DrawSquare() {
        if (this.item._fillType[1] === FillTypeInitialGradient && !this.item._isGradientDefined) {
            this.item._gradientBorder = Colors.instance.GetFillBoxLineGradient(this.bufferContext, this.item._x, this.item._y, this.item._size, this.item._gradientPropertiesBorder);
            this.item._gradientInside = Colors.instance.GetFillBoxLineGradient(this.bufferContext, this.item._x + this.item._borderWidth, this.item._y + this.item._borderWidth, this.item._size - this.item._borderWidth * 2, this.item._gradientPropertiesInside);
            this.item._isGradientDefined = true;
        }
        this.bufferContext.beginPath();
        this.bufferContext.rect(
            this.item._x,
            this.item._y,
            this.item._size,
            this.item._size
        );
        if (this.item._fillType[1] === FillTypeColor) {
            this.bufferContext.fillStyle = this.item._colorBorder;
        } else if (this.item._fillType[1] === FillTypeInitialGradient || this.item._fillType[1] === FillTypeRedrawGradient) {
            if (this.item._fillType[1] === FillTypeRedrawGradient) {
                this.item._gradientBorder = Colors.instance.RestoreFillBoxLineGradient(this.bufferContext, this.item._x, this.item._y, this.item._size, this.item._gradientPropertiesBorder);
            }
            this.bufferContext.fillStyle = this.item._gradientBorder;
        }
        this.bufferContext.fill();
        //
        this.bufferContext.beginPath();
        this.bufferContext.rect(
            this.item._x + this.item._borderWidth,
            this.item._y + this.item._borderWidth,
            this.item._size - this.item._borderWidth * 2,
            this.item._size - this.item._borderWidth * 2
        );
        if (this.item._fillType[1] === FillTypeColor) {
            this.bufferContext.fillStyle = this.item._colorInside;
        } else if (this.item._fillType[1] === FillTypeInitialGradient || this.item._fillType[1] === FillTypeRedrawGradient) {
            if (this.item._fillType[1] === FillTypeRedrawGradient) {
                this.item._gradientInside = Colors.instance.RestoreFillBoxLineGradient(this.bufferContext, this.item._x + this.item._borderWidth, this.item._y + this.item._borderWidth, this.item._size - this.item._borderWidth * 2, this.item._gradientPropertiesInside);
            }
            this.bufferContext.fillStyle = this.item._gradientInside;
        }
        this.bufferContext.fill();
    }
    DrawCircle() {
        if (this.item._fillType[1] === FillTypeInitialGradient && !this.item._isGradientDefined) {
            this.item._gradientBorder = Colors.instance.GetFillBoxLineGradient(this.bufferContext, this.item._x, this.item._y, this.item._size, this.item._gradientPropertiesBorder);
            this.item._gradientInside = Colors.instance.GetFillBoxLineGradient(this.bufferContext, this.item._x + this.item._borderWidth, this.item._y + this.item._borderWidth, this.item._size - this.item._borderWidth * 2, this.item._gradientPropertiesInside);
            this.item._isGradientDefined = true;
        }
        this.bufferContext.beginPath();
        let radius = this.item._size / 2;
        let degrees = Math.PI * 2;
        this.bufferContext.arc(this.item._x + radius, this.item._y + radius, radius, 0, degrees, false); // ¬нешн€€ окружность
        if (this.item._fillType[1] === FillTypeColor) {
            this.bufferContext.fillStyle = this.item._colorBorder;
        } else if (this.item._fillType[1] === FillTypeInitialGradient || this.item._fillType[1] === FillTypeRedrawGradient) {
            if (this.item._fillType[1] === FillTypeRedrawGradient) {
                this.item._gradientBorder = Colors.instance.RestoreFillBoxLineGradient(this.bufferContext, this.item._x, this.item._y, this.item._size, this.item._gradientPropertiesBorder);
            }
            this.bufferContext.fillStyle = this.item._gradientBorder;
        }
        //
        this.bufferContext.fill();
        this.bufferContext.beginPath();
        this.bufferContext.arc(this.item._x + radius, this.item._y + radius, radius - this.item._borderWidth, 0, degrees, false); // ¬нешн€€ окружность
        if (this.item._fillType[1] === FillTypeColor) {
            this.bufferContext.fillStyle = this.item._colorInside;
        } else if (this.item._fillType[1] === FillTypeInitialGradient || this.item._fillType[1] === FillTypeRedrawGradient) {
            if (this.item._fillType[1] === FillTypeRedrawGradient) {
                this.item._gradientInside = Colors.instance.RestoreFillBoxLineGradient(this.bufferContext, this.item._x + this.item._borderWidth, this.item._y + this.item._borderWidth, this.item._size - this.item._borderWidth * 2, this.item._gradientPropertiesInside);
            }
            this.bufferContext.fillStyle = this.item._gradientInside;
        }
        this.bufferContext.fill();
    }
}
Draughters._instance = undefined;

onmessage = function ({ data: { command, figures, offScreenCanvas, offCanvasBuffer, item, width, height } }) {
    if (offScreenCanvas !== undefined) {
        Draughters.instance.canvas = offScreenCanvas;
        Draughters.instance.context = Draughters.instance.canvas.getContext('2d');
    }
    if (offCanvasBuffer !== undefined) {
        Draughters.instance.bufferCanvas = offCanvasBuffer;
        Draughters.instance.bufferContext = Draughters.instance.bufferCanvas.getContext('2d');
    }
    if (width !== undefined && height !== undefined) {
        Draughters.instance.canvas.width = width;
        Draughters.instance.canvas.height = height;
        Draughters.instance.bufferCanvas.width = width;
        Draughters.instance.bufferCanvas.height = height;
    }
    if (figures !== undefined) {
        Draughters.instance.bufferContext.clearRect(0, 0, Draughters.instance.bufferCanvas.width, Draughters.instance.bufferCanvas.height);
        for (let figure of figures) {
            Draughters.instance.item = figure;
            Draughters.instance.Draw();
        }
        Draughters.instance.context.clearRect(0, 0, Draughters.instance.canvas.width, Draughters.instance.canvas.height);
        Draughters.instance.context.drawImage(Draughters.instance.bufferCanvas, 0, 0);
        if (Draughters.instance.canvas !== undefined) {
            let step = 'ItWasAnimated';
            postMessage({ step });
        }
    }
};
