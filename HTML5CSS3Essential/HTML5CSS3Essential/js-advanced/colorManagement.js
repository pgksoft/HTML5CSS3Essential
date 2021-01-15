const minLayersGradient = 5;
const maxLayersGradient = 15;
export var GradientDirection;
(function (GradientDirection) {
    GradientDirection[GradientDirection["LeftToRight"] = 1] = "LeftToRight";
    GradientDirection[GradientDirection["TopToBottom"] = 2] = "TopToBottom";
    GradientDirection[GradientDirection["LeftTopToBottomRight"] = 3] = "LeftTopToBottomRight";
    GradientDirection[GradientDirection["RightTopToLeftBottom"] = 4] = "RightTopToLeftBottom";
})(GradientDirection || (GradientDirection = {}));
export var RadialDirection;
(function (RadialDirection) {
    RadialDirection[RadialDirection["Centre"] = 1] = "Centre";
    RadialDirection[RadialDirection["LeftRight"] = 2] = "LeftRight";
    RadialDirection[RadialDirection["RightLeft"] = 3] = "RightLeft";
    RadialDirection[RadialDirection["TopBottom"] = 4] = "TopBottom";
    RadialDirection[RadialDirection["BottomTop"] = 5] = "BottomTop";
})(RadialDirection || (RadialDirection = {}));
export class GradientProperties {
    GetGradientProperties() {
        this.direction = Colors.instance.RandomInt(1, 4);
        this.colorScheme = new GradientColorScheme();
        let lines = Colors.instance.RandomInt(minLayersGradient, maxLayersGradient);
        let position;
        let color;
        for (let line = 0; line < lines; line++) {
            position = line / lines;
            color = Colors.instance.randomColor;
            this.colorScheme.Add([position, color]);
        }
        position = 1;
        color = Colors.instance.randomColor;
        this.colorScheme.Add([position, color]);
        return this;
    }
}
export class GradientColorScheme {
    constructor() {
        this._scheme = [];
    }
    get list() {
        return this._scheme;
    }
    Add(value) {
        this._scheme.push(value);
    }
    Clear() {
        this._scheme.length = 0;
    }
}
export class RadialParams {
    constructor(oneX, oneY, oneR, twoX, twoY, twoR) {
        this._oneX = 0;
        this._oneY = 0;
        this._oneR = 0;
        this._twoX = 0;
        this._twoY = 0;
        this._twoR = 0;
        this._oneX = oneX;
        this._oneY = oneY;
        this._oneR = oneR;
        this._twoX = twoX;
        this._twoY = twoY;
        this._twoR = twoR;
    }
    get oneX() { return this._oneX; }
    set oneX(value) { this._oneX = value; }
    get oneY() { return this._oneY; }
    set oneY(value) { this._oneY = value; }
    get oneR() { return this._oneR; }
    set oneR(value) { this._oneR = value; }
    get twoX() { return this._twoX; }
    set twoX(value) { this._twoX = value; }
    get twoY() { return this._twoY; }
    set twoY(value) { this._twoY = value; }
    get twoR() { return this._twoR; }
    set twoR(value) { this._twoR = value; }
}
export class Colors {
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
        this._minLayersGradient = 5;
        this._maxLayersGradient = 15;
    }
    static get instance() {
        if (!Colors._instance) {
            this._instance = new Colors();
        }
        return this._instance;
    }
    get mapColors() { return this._mapColors; }
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
    CreateColorScheme(scheme = []) {
        let colorScheme = new GradientColorScheme();
        if (scheme.length == 0) {
            let lines = this.RandomInt(this.minLayersGradient, this.maxLayersGradient);
            let position;
            let color;
            for (let line = 0; line < lines; line++) {
                position = line / lines;
                color = Colors.instance.randomColor;
                colorScheme.Add([position, color]);
            }
            position = 1;
            color = Colors.instance.randomColor;
            colorScheme.Add([position, color]);
        }
        else {
            scheme.forEach((item) => { colorScheme.Add(item); });
        }
        return colorScheme;
    }
    FillSchemeColor(context, color = null) {
        if (!color) {
            color = this.randomColor;
        }
        context.beginPath();
        context.rect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = color;
        context.fill();
    }
    FillSchemeLineGradient(context, gradientProperties) {
        context.beginPath();
        context.rect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = this.RestoreFillRectLineGradient(context, 0, 0, context.canvas.width, context.canvas.height, gradientProperties);
        context.fill();
    }
    FillSchemeRadialGradient(context, gradientProperties) {
        context.beginPath();
        context.rect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = this.GetFillRectRadialGradient(context, this.GetRadialParams(0, 0, context.canvas.width, context.canvas.height, gradientProperties.radialDirection), gradientProperties.colorScheme);
        context.fill();
    }
    FillLineGradient(context, direct) {
        let gradient;
        gradient = this.GetLinerGradient(direct, context, 0, 0, context.canvas.width, context.canvas.height);
        this.GetLinerGradientColorScheme(gradient);
        context.fillStyle = gradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
    FillRectRadialGradiant(context, x, y, width, height, oneX, oneY, oneR, twoX, twoY, twoR, gradientScheme) {
        let gradient = context.createRadialGradient(oneX, oneY, oneR, twoX, twoY, twoR);
        gradientScheme.list.forEach((item) => { gradient.addColorStop(item[0], item[1]); });
        context.fillStyle = gradient;
        context.fillRect(x, y, width, height);
    }
    GetFillRectRadialGradient(context, circleParameters, gradientScheme) {
        let gradient = context.createRadialGradient(circleParameters.oneX, circleParameters.oneY, circleParameters.oneR, circleParameters.twoX, circleParameters.twoY, circleParameters.twoR);
        gradientScheme.list.forEach((item) => { gradient.addColorStop(item[0], item[1]); });
        return gradient;
    }
    GetRadialParams(x, y, width, height, direction) {
        let circleParameters = new RadialParams(0, 0, 0, 0, 0, 0);
        switch (direction) {
            case RadialDirection.Centre:
                circleParameters.oneR = Math.ceil(Math.min(width, height) / 30);
                circleParameters.oneX = Math.ceil(x + width / 2);
                circleParameters.oneY = Math.ceil(y + height / 2);
                circleParameters.twoR = Math.ceil(Math.min(width, height) * 0.9);
                circleParameters.twoX = Math.ceil(x + width / 2);
                circleParameters.twoY = Math.ceil(y + height / 2);
                break;
            case RadialDirection.LeftRight:
                circleParameters.oneR = Math.ceil(height / 2);
                circleParameters.oneX = Math.ceil(x + circleParameters.oneR * 2 / 3);
                circleParameters.oneY = Math.ceil(y + height / 2);
                circleParameters.twoR = circleParameters.oneR;
                circleParameters.twoX = Math.ceil(x + width + circleParameters.twoR);
                circleParameters.twoY = Math.ceil(y + height / 2);
                break;
            case RadialDirection.RightLeft:
                circleParameters.oneR = Math.ceil(height / 2);
                circleParameters.oneX = Math.ceil(x + width - circleParameters.oneR * 2 / 3);
                circleParameters.oneY = Math.ceil(y + height / 2);
                circleParameters.twoR = circleParameters.oneR;
                circleParameters.twoX = Math.ceil(x - circleParameters.twoR);
                circleParameters.twoY = Math.ceil(y + height / 2);
                break;
            case RadialDirection.TopBottom:
                circleParameters.oneR = Math.ceil(width / 2);
                circleParameters.oneX = Math.ceil(x + width / 2);
                circleParameters.oneY = Math.ceil(y + circleParameters.oneR * 2 / 3);
                circleParameters.twoR = circleParameters.oneR;
                circleParameters.twoX = Math.ceil(x + width / 2);
                circleParameters.twoY = Math.ceil(y + height + circleParameters.oneR);
                break;
            case RadialDirection.BottomTop:
                circleParameters.oneR = Math.ceil(width / 2);
                circleParameters.oneX = Math.ceil(x + width / 2);
                circleParameters.oneY = Math.ceil(y + height - circleParameters.oneR * 2 / 3);
                circleParameters.twoR = circleParameters.oneR;
                circleParameters.twoX = Math.ceil(x + width / 2);
                circleParameters.twoY = Math.ceil(y - circleParameters.oneR);
                break;
        }
        return circleParameters;
    }
    GetFillBoxLineGradient(context, x, y, size, gradientProperties) {
        let gradient;
        gradientProperties.direction = this.RandomInt(1, 4);
        gradient = this.GetLinerGradient(gradientProperties.direction, context, x, y, size, size);
        gradientProperties.colorScheme = this.GetLinerGradientColorScheme(gradient);
        return gradient;
    }
    GetFillRectLineGradient(context, x, y, width, height, gradientProperties) {
        let gradient;
        gradientProperties.direction = this.RandomInt(1, 4);
        gradient = this.GetLinerGradient(gradientProperties.direction, context, x, y, width, height);
        gradientProperties.colorScheme = this.GetLinerGradientColorScheme(gradient);
        return gradient;
    }
    RestoreFillBoxLineGradient(context, x, y, size, gradientProperties) {
        let gradient;
        gradient = this.GetLinerGradient(gradientProperties.direction, context, x, y, size, size);
        for (let layer of gradientProperties.colorScheme.list) {
            gradient.addColorStop(layer[0], layer[1]);
        }
        return gradient;
    }
    RestoreFillRectLineGradient(context, x, y, width, height, gradientProperties) {
        let gradient;
        gradient = this.GetLinerGradient(gradientProperties.direction, context, x, y, width, height);
        for (let layer of gradientProperties.colorScheme.list) {
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
//# sourceMappingURL=colorManagement.js.map