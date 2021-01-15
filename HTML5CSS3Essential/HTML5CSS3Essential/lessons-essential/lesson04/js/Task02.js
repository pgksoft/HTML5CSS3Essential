// Lesson 4
class Colors {
    constructor() {
        this.mapColors = new Map([
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
    }
    setFillLineGradient(context, typeFill) {
        let gradient;
        let type = Number(typeFill.value) === 0 ? colors.getRandomInt(1, 4) : Number(typeFill.value);
        gradient = this.getLinerGradient(type, context, 0, 0, context.canvas.width, context.canvas.height);
        this.setLinerGradient(gradient, 3, 10);
        context.fillStyle = gradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
    getFillBoxLineGradient(context, x, y, size, gradientProperties) {
        let gradient;
        let type = colors.getRandomInt(1, 4);
        gradientProperties.typeGradient = type;
        gradient = this.getLinerGradient(type, context, x, y, size, size);
        gradientProperties.listColors = this.setLinerGradient(gradient, 3, 10);
        return gradient;
    }
    restoreFillBoxLineGradient(context, x, y, size, gradientProperties) {
        let gradient;
        gradient = this.getLinerGradient(gradientProperties.typeGradient, context, x, y, size, size);
        for (let colorStop of gradientProperties.listColors) {
            gradient.addColorStop(colorStop.position, colorStop.color);
        }
        return gradient;
    }
    // Helpers
    getLinerGradient(type, context, x, y, width, height) {
        return type === 1 ? context.createLinearGradient(x, y, x, y + height) :
            type === 2 ? context.createLinearGradient(x, y, x + width, y) :
                type === 3 ? context.createLinearGradient(x, y, x + height, y + width) :
                    type === 4 ? context.createLinearGradient(x, y + width, x + height, 0) :
                        context.createLinearGradient(x, y, x, y + height);
    }
    setLinerGradient(gradient, minLine, maxLine) {
        let listColorStop = new Array();
        let colorStop;
        let lines = this.getRandomInt(minLine, maxLine);
        for (let line = 0; line < lines; line++) {
            colorStop = new ColorsStop(line / lines, this.getRandomColor());
            listColorStop.push(colorStop);
            gradient.addColorStop(colorStop.position, colorStop.color);
        }
        colorStop = new ColorsStop(1, this.getRandomColor());
        listColorStop.push(colorStop);
        gradient.addColorStop(colorStop.position, colorStop.color);
        return listColorStop;
    }
    getRandomColor() {
        let color;
        let numberColor = this.getRandomInt(1, this.mapColors.size);
        let index = 0;
        for (let key of this.mapColors.keys()) {
            index++;
            if (index === numberColor) {
                color = this.mapColors.get(key);
                break;
            }
        }
        return color;
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
} //class Colors
// ==============================================================================================================
class EventHandlers {
    constructor() {
        this.mousemove = new Map();
        this.mousedown = new Map();
        this.mouseup = new Map();
    }
    set(map, key, value) {
        map.set(key, value);
    }
    delete(map, key) {
        map.delete(key);
    }
}
class FigureKind {
    constructor() {
        this.kind = {
            point: 0,
            figure: 1,
            rectangle: 2,
            circle: 3,
            flag: 4
        };
    }
    static getName(kind) {
        switch (kind) {
            case new FigureKind().kind.point: return 'point';
            case new FigureKind().kind.figure: return 'figure';
            case new FigureKind().kind.rectangle: return 'rectangle';
            case new FigureKind().kind.circle: return 'circle';
            case new FigureKind().kind.flag: return 'flag';
            default: return 'undefined kind figure';
        }
    }
}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isAnimate = false;
        this.wasAnimate = false;
        this.serialNumber = 0;
        this.kind = new FigureKind().kind.point;
        this.isSelected = false;
        this.canvas;
        this.bufferCanvas;
        this.contextData;
        this.contextKind;
    }
    toString() {
        return `${this.serialNumber}. ${FigureKind.getName(this.kind)} ${Math.round(this.x)}x${Math.round(this.y)}.`;
    }
    getCoords(e) {
        let x, y;
        x = e.pageX - $$('canvas').offsetLeft;
        y = e.pageY - $$('canvas').offsetTop;
        return { x: x, y: y };
    }
}
class Figure extends Point {
    constructor(x, y, width) {
        super(x, y);
        this.widthOriginal = width;
        this.width = this.widthOriginal;
        this.kind = new FigureKind().kind.figure;
    }
    toString() {
        return `${this.serialNumber}. ${FigureKind.getName(this.kind)} ${Math.round(this.x)}x${Math.round(this.y)}/w${Math.round(this.width)}.`;
    }
    restoreWidth() {
        this.width = this.widthOriginal;
    }
    drawFigureStar(context, spikes, outerRadius, innerRadius, lineWidth = 3, strokeStyle = 'red', fillStyle = 'yellow') {
        this.drawStar(context, this.x, this.y, spikes, outerRadius, innerRadius, lineWidth, strokeStyle, fillStyle);
    }
    static drawStar(context, cx, cy, spikes, outerRadius, innerRadius, lineWidth = 3, strokeStyle = 'blue', fillStyle = 'skyblue') {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        context.strokeSyle = "#000";
        context.beginPath();
        context.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            context.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            context.lineTo(x, y);
            rot += step;
        }
        context.lineTo(cx, cy - outerRadius);
        context.closePath();
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.stroke();
        context.fillStyle = fillStyle;
        context.fill();
    }
}
class Wave {
    constructor(length = 20, amplitude = 30, period = 100, shading = 50) {
        this.length = length;
        this.amplitude = amplitude;
        this.period = period;
        this.shading = shading;
    }
}
class Rect extends Figure {
    constructor(x, y, width, height = 0, colorFill = 'yellow', colorStroke = 'darkred', borderWidth = 2) {
        super(x, y, width);
        this.heightOriginal = height;
        this.height = this.heightOriginal;
        this.borderWidth = borderWidth;
        this.colorFill = colorFill;
        this.colorStroke = colorStroke;
        this.aspectRatio;
        this.kind = new FigureKind().kind.rectangle;
        this.parmWave = new Wave();
        this.isDragAndDrop = false;
        this.startMove = new Point(0, 0);
        this.currentMove = new Point(0, 0);
        this.currentPoint = new Point(0, 0);
        this.setAspectRatio();
    }
    toString() {
        return `${this.serialNumber}. ${FigureKind.getName(this.kind)} ${Math.round(this.x)}x${Math.round(this.y)} w${Math.round(this.width)}/h${Math.round(this.height)}.`;
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
    clear(context) {
        context.clearRect(this.x, this.y, this.width, this.height);
    }
    draw(context) {
        context.beginPath();
        context.rect(
            this.x,
            this.y,
            this.width,
            this.height
        );
        context.fillStyle = this.colorStroke;
        context.fill();
        context.beginPath();
        context.rect(
            this.x + this.borderWidth,
            this.y + this.borderWidth,
            this.width - this.borderWidth * 2,
            this.height - this.borderWidth * 2
        );
        context.fillStyle = this.colorFill;
        context.fill();
        // After drawing, be sure to keep the original state of the flag.
        this.contextKind = context.getImageData(this.x, this.y, this.width, this.height);
        this.contextData = this.contextKind.data;
    }
    wave(context) {
        if (this.isAnimate) {
            let id = context.getImageData(this.x, this.y, this.width, this.height);
            let d = id.data;
            let now = new Date / this.parmWave.period;
            for (let y = 0; y < this.height; ++y) {
                let lastO = 0, shade = 0;
                for (let x = 0; x < this.width; ++x) {
                    let px = (y * this.width + x) * 4;
                    let o = Math.sin(x / this.parmWave.length - now) * this.parmWave.amplitude * x / this.width;
                    let opx = ((y + o << 0) * this.width + x) * 4;
                    shade = (o - lastO) * this.parmWave.shading;
                    d[px] = this.contextData[opx] + shade;
                    d[px + 1] = this.contextData[opx + 1] + shade;
                    d[px + 2] = this.contextData[opx + 2] + shade;
                    d[px + 3] = this.contextData[opx + 3];
                    lastO = o;
                }
            }
            context.putImageData(id, this.x, this.y);
            requestFrame(() => this.wave(context));
        }
    }
    mouseDownHandler(e) {
        this.startMove.x = this.getCoords(e).x;
        this.startMove.y = this.getCoords(e).y;
        if (this.isSelected && this.startMove.x >= this.x && this.startMove.x <= this.x + this.width && this.startMove.y >= this.y && this.startMove.y <= this.y + this.height) {
            this.isDragAndDrop = true;
        }
    }
    mouseUpHandler() {
        if (this.isDragAndDrop) {
            this.isDragAndDrop = false;
            this.x = this.currentPoint.x;
            this.y = this.currentPoint.y;
            throughtBuffer();
            redefinitionListSelected();
        }
    }
    mouseMoveHandler(e) {
        if (this.isDragAndDrop) {
            this.currentMove.x = this.getCoords(e).x;
            this.currentMove.y = this.getCoords(e).y;
            throughtBuffer();
            this.currentPoint = new Point(this.x + (this.currentMove.x - this.startMove.x), this.y + (this.currentMove.y - this.startMove.y));
            if (this instanceof Flag) {
                this.transform(this.grayscale, 180, this.currentPoint);
            } else {
                this.moveTemplate(this.currentPoint);
            }
        }
    }
    transform(fn, factor, point) {
        let newdata = this.canvas.getContext('2d').getImageData(this.x, this.y, this.width, this.height);
        let newpx = newdata.data;
        let res = [];
        let len = newpx.length;
        for (var i = 0; i < len; i += 4) {
            res = fn.call(this, this.contextData[i], this.contextData[i + 1], this.contextData[i + 2], this.contextData[i + 3], factor, i);
            newpx[i] = res[0];     // r
            newpx[i + 1] = res[1]; // g
            newpx[i + 2] = res[2]; // b
            newpx[i + 3] = res[3]; // a
        }
        this.canvas.getContext('2d').putImageData(newdata, point.x, point.y);
    }
    grayscale(r, g, b, factor, newFactor) {
        var avg = 0.3 * r + 0.59 * g + 0.11 * b;
        return [avg, avg, avg, newFactor];
    }
    moveTemplate(point) {
        this.canvas.getContext('2d').beginPath();
        this.canvas.getContext('2d').rect(
            point.x,
            point.y,
            this.width,
            this.height
        );
        this.canvas.getContext('2d').fillStyle = 'gray';
        this.canvas.getContext('2d').fill();
        let transparent = this.canvas.getContext('2d').createLinearGradient(
            point.x + this.borderWidth,
            point.y + this.borderWidth,
            point.x + this.borderWidth,
            point.y + this.height - this.borderWidth * 2 - 1
        );
        transparent.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        transparent.addColorStop(0.5, "rgba(255, 255, 255, 0.75)");
        transparent.addColorStop(1, "rgba(255, 255, 255, 0.6)");
        this.canvas.getContext('2d').fillStyle = transparent;
        this.canvas.getContext('2d').fillRect(
            point.x + this.borderWidth,
            point.y + this.borderWidth,
            this.width - this.borderWidth * 2,
            this.height - this.borderWidth * 2
        );
    }
}
class Flag extends Rect {
    constructor(x, y, width, country) {
        super(x, y, width);
        this.country = country;
        this.kind = new FigureKind().kind.flag;
        this.borderWidth = 3;
        this.insideX = 0;
        this.insideY = 0;
        this.insideWidth = 0;
        this.insideHeight = 0;
    }
    toString() {
        return `${this.serialNumber}. ${FigureKind.getName(this.kind)} ${new Country().getName(this.country)} ${Math.round(this.x)}x${Math.round(this.y)} w${Math.round(this.width)}/h${Math.round(this.height)}.`;
    }
}
class FlagUSA extends Flag {
    // http://www.montney.com/flag/proportions.htm
    constructor(x, y, width) {
        super(x, y, width, country.country.usa);
        this.calcStandardProportions();
    }
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
    draw(context) {
        this.calcStandardProportions();
        // check size of flag regarding to canvas
        if (context.canvas.width < this.width + this.x) {
            this.width = context.canvas.width - this.x;
            this.calcStandardProportions();
        }
        if (context.canvas.height < this.height + this.y) {
            this.width = (context.canvas.height - this.y) * 1.9;
            this.calcStandardProportions();
        }
        // Border
        context.beginPath();
        context.rect(
            this.x,
            this.y,
            this.width,
            this.height
        );
        context.fillStyle = 'rgba(169,169,169,0.8)';
        context.fill();
        // Stripes
        context.fillStyle = '#fff';
        context.fillRect(this.insideX, this.insideY, this.insideWidth, this.insideHeight);
        context.fillStyle = '#d00';
        for (let i = 0; i < 13; i += 2) {
            context.fillRect(
                this.insideX,
                this.insideY + i * this.heightStripe,
                this.insideWidth,
                this.heightStripe
            );
        }
        // Union
        context.fillStyle = '#00b';
        context.fillRect(this.insideX, this.insideY, this.widthUnion, this.heightUnion);
        // Stars
        context.fillStyle = '#fff';
        for (let row = 1; row <= 9; ++row) {
            for (let col = 1; col <= 11; ++col) {
                if (row % 2 === 1 && col % 2 === 0 || row % 2 === 0 && col % 2 === 1) continue;
                Figure.drawStar(
                    context,
                    this.insideX + col * this.vStepUnion,
                    this.insideY + row * this.hStepUnion,
                    5,
                    this.diameterStar / 2,
                    this.diameterStar / 5,
                    1,
                    'white',
                    'white'
                );
            }
        }
        // After drawing, be sure to keep the original state of the flag.
        this.contextKind = context.getImageData(this.x, this.y, this.width, this.height);
        this.contextData = this.contextKind.data;
    }
}
class FlagImg extends Flag {
    constructor(x, y, width, country, url, aspectRatio = 2) {
        super(x, y, width, country);
        this.url = url;
        this.aspectRatio = aspectRatio;
        this.isLoad = false;
        this.img = new Image();
        this.img.addEventListener('load', () => { this.load(); }, false);
        this.img.src = this.url;
        this.calcStandardProportions();
    }
    load() {
        this.isLoad = true;
    }
    calcStandardProportions() {
        this.height = Math.round(this.width / this.aspectRatio);
        this.insideX = this.x + this.borderWidth;
        this.insideY = this.y + this.borderWidth;
        this.insideWidth = this.width - this.borderWidth * 2;
        this.insideHeight = this.height - this.borderWidth * 2;
    }
    draw(context) {
        this.calcStandardProportions();
        // check size of flag regarding to canvas
        if (context.canvas.width < this.width + this.x) {
            this.width = context.canvas.width - this.x;
            this.calcStandardProportions();
        }
        if (context.canvas.height < this.height + this.y) {
            this.width = (context.canvas.height - this.y) * this.aspectRatio;
            this.calcStandardProportions();
        }
        if (this.isLoad) {
            // Border
            context.beginPath();
            context.rect(
                this.x,
                this.y,
                this.width,
                this.height
            );
            context.fillStyle = 'rgba(169,169,169,0.8)';
            context.fill();
            // Img
            context.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.insideX, this.insideY, this.insideWidth, this.insideHeight);
            this.contextKind = context.getImageData(this.x, this.y, this.width, this.height);
            this.contextData = this.contextKind.data;
        }
        if (!this.isLoad) requestFrame(() => this.draw(context));
    }
}
class Country {
    constructor() {
        this.country = {
            any: 0,
            belarus: 1,
            germany: 2,
            hungary: 3,
            kazakhstan: 4,
            poland: 5,
            russia: 6,
            ukraine: 7,
            unitedKingdom: 8,
            usa: 9
        };
    }
    getName(country) {
        switch (country) {
            case this.country.any: return 'any country';
            case this.country.belarus: return 'Belarus';
            case this.country.germany: return 'Germany';
            case this.country.hungary: return 'Hungary';
            case this.country.kazakhstan: return 'Kazakhstan';
            case this.country.poland: return 'Poland';
            case this.country.russia: return 'Russia';
            case this.country.ukraine: return 'Ukraine';
            case this.country.unitedKingdom: return 'United Kingdom';
            case this.country.usa: return 'USA';
            default: return 'unknown country';
        }
    }
}

// Initialization <==================================================================================================================
const startAnimate = 'Start wave';
const stopAnimate = 'Stop wave';
let isRestoreRsWave = false;
let isRestoreRsFigureParams = false;
let waveParams = {
    length: 0,
    amplitude: 0,
    period: 0,
    shading: 0
};
let figureParams = {
    length: 0,
    height: 0
};
let serialNumber = 0;
let selectedFigure = false;
let $$ = (id) => document.getElementById(id);
$$('canvas').width = $$('boxCanvas').scrollWidth;
$$('canvas').height = $$('boxCanvas').scrollHeight;
let country = new Country();
let colors = new Colors();
let figureKind = new FigureKind();
let bufferCanvas = document.createElement("canvas");
let flags = new Array();
let canvasEventHandlers = new EventHandlers();
setEnableResore();
setEnableChangeColorFill();
setEnableRemoveFigure();
createListFigures();
defineRS();
let rsWaveLength = $("#waveLength").data("roundSlider");
let rsWaveAmplitude = $("#waveAmplitude").data("roundSlider");
let rsWavePeriod = $("#wavePeriod").data("roundSlider");
let rsWaveShading = $("#waveShading").data("roundSlider");
let rsWidth = $("#figureWidth").data("roundSlider");
let rsHeight = $("#figureHeight").data("roundSlider");
let isRsChange = false;

//let figure1 = new Figure(250, 20, 200);
//let figure2 = new Figure(250, 40, 200);
//figure1.drawFigureStar($$('canvas').getContext('2d'), 5, 5, 2.5);
//figure2.drawFigureStar($$('canvas').getContext('2d'), 5, 5, 2.5);

// Helpers <==================================================================================================================
window.requestFrame = function (callback) {
    var f = window.mozRequestAnimationFrame ||
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 100);
        };
    f(callback);
};
function isDisplayBlock(element) {
    return element.style.display === "block" || window.getComputedStyle(element, null)["display"] === "block";
}
function onclickAnimate(e) {
    triggerAnimate(e.target);
}
function triggerAnimate(button) {
    if (button.innerHTML.trim() === startAnimate) {
        button.innerHTML = stopAnimate;
        if (!selectedFigure) {
            for (let flag of flags) {
                startWave(flag);
            }
        } else {
            if (!selectedFigure.isAnimate) {
                startWave(selectedFigure);
            }
        }
    } else {
        button.innerHTML = startAnimate;
        if (!selectedFigure) {
            for (let flag of flags) {
                flag.isAnimate = false;
            }
        } else {
            selectedFigure.isAnimate = false;
        }
    }
    setEnableResore();
    setEnableChangeColorFill();
    setEnableRemoveFigure();
}
function setActualAnimate() {
    if (selectedFigure) {
        $$('btnAnimate').innerHTML = selectedFigure.isAnimate ? stopAnimate : startAnimate;
    } else {
        let countIsAnimate = 0;
        let countNotAnimate = 0;
        for (let figure of flags) {
            if (figure.isAnimate) {
                countIsAnimate++;
            } else {
                countNotAnimate++;
            }
        }
        if (flags.length > 0) {
            if (countIsAnimate > 0 && countNotAnimate > 0 || countIsAnimate === 0 && countNotAnimate > 0) {
                $$('btnAnimate').innerHTML = startAnimate;
            } else {
                $$('btnAnimate').innerHTML = stopAnimate;
            }
        }
    }
}
function startWave(item) {
    item.isAnimate = true;
    item.wave($$('canvas').getContext('2d'));
}
function getIsAnimate() {
    let isAnimate = false;
    for (let flag of flags) {
        isAnimate = flag.isAnimate;
        break;
    }
    return isAnimate;
}
function onchangeWaveLength(e) {
    isRsChange = e.type === 'start' ? true : false;
    SetWaveLength(e.value);
}
function SetWaveLength(value) {
    if (selectedFigure) {
        selectedFigure.parmWave.length = value;
    } else {
        for (let flag of flags) {
            flag.parmWave.length = value;
        }
        saveWaveParams();
    }
    if (isRsChange) {
        requestFrame(() => SetWaveLength(rsWaveLength.option('value')));
    }
}
function onchangeWaveAmplitude(e) {
    isRsChange = e.type === 'start' ? true : false;
    SetWaveAmplitude(e.value);
}
function SetWaveAmplitude(value) {
    if (selectedFigure) {
        selectedFigure.parmWave.amplitude = value;
    } else {
        for (let flag of flags) {
            flag.parmWave.amplitude = value;
        }
        saveWaveParams();
    }
    if (isRsChange) {
        requestFrame(() => SetWaveAmplitude(rsWaveAmplitude.option('value')));
    }
}
function onchangeWavePeriod(e) {
    isRsChange = e.type === 'start' ? true : false;
    SetWavePeriod(e.value);
}
function SetWavePeriod(value) {
    if (selectedFigure) {
        selectedFigure.parmWave.period = value;
    } else {
        for (let flag of flags) {
            flag.parmWave.period = value;
        }
        saveWaveParams();
    }
    if (isRsChange) {
        requestFrame(() => SetWavePeriod(rsWavePeriod.option('value')));
    }
}
function onchangeWaveShading(e) {
    isRsChange = e.type === 'start' ? true : false;
    SetWaveShading(e.value);
}
function SetWaveShading(value) {
    if (selectedFigure) {
        selectedFigure.parmWave.shading = value;
    } else {
        for (let flag of flags) {
            flag.parmWave.shading = value;
        }
        saveWaveParams();
    }
    if (isRsChange) {
        requestFrame(() => SetWaveShading(rsWaveShading.option('value')));
    }
}
function onchangeFigureWidth(e) {
    isRsChange = e.type === 'start' ? true : false;
    SetFigureWidth(e.value);
}
function SetFigureWidth(value) {
    if (selectedFigure) {
        if (selectedFigure.isAnimate) {
            selectedFigure.isAnimate = false;
            setActualAnimate();
        }
        selectedFigure.width = Number(value);
        if (selectedFigure instanceof Rect) selectedFigure.setOriginal();
        throughtBuffer();
        if (selectedFigure instanceof Flag) {
            rsHeight.option('value', selectedFigure.height);
        }
        redefinitionListSelected();
        if (isRsChange) {
            requestFrame(() => SetFigureWidth(rsWidth.option('value')));
        }
    }
}
function onchangeFigureHeight(e) {
    isRsChange = e.type === 'start' ? true : false;
    SetFigureHeight(e.value);
}
function SetFigureHeight(value) {
    if (selectedFigure) {
        if (selectedFigure.isAnimate) {
            selectedFigure.isAnimate = false;
            setActualAnimate();
        }
        selectedFigure.height = Number(value);
        if (selectedFigure instanceof Rect) selectedFigure.setOriginal();
        throughtBuffer();
        redefinitionListSelected();
        if (isRsChange) {
            requestFrame(() => SetFigureHeight(rsHeight.option('value')));
        }
    }
}
function deselectFigure() {
    if (selectedFigure.isSelected) selectedFigure.isSelected = false;
    selectedFigure = false;
    $$('deselectFigure').style.display = 'none';
    setAccessManageSizeFigure();
    setEnableResore();
    setEnableChangeColorFill();
    setEnableRemoveFigure();
    $$('listFigures').options[0].selected = true;
    restoreRsWaveValue();
    restoreRsFigureParams();
}
function selectFigure(figure) {
    if (selectedFigure && selectedFigure.isSelected) deselectFigure();
    let isAnimate = figure.isAnimate;
    selectedFigure = figure;
    selectedFigure.isSelected = true;
    selectedFigure.canvas = $$('canvas');
    selectedFigure.bufferCanvas = bufferCanvas;
    showSelectedFigure();
    $$('deselectFigure').style.display = 'block';
    setEnableResore();
    setEnableChangeColorFill();
    setEnableRemoveFigure();
    restoreRsWaveValue(figure);
    restoreRsFigureParams(figure);
    //On top
    if (isAnimate) selectedFigure.isAnimate = false;
    selectedFigure.draw($$('canvas').getContext('2d'));
    if (isAnimate) startWave(selectedFigure);
}
function showSelectedFigure() {
    if (selectedFigure) {
        for (let option of $$('listFigures').options) {
            if (Number(option.value) === selectedFigure.serialNumber) {
                option.selected = true;
                break;
            }
        }
    }
}
function setAccessManageSizeFigure() {
    if (selectedFigure) {
        if (rsWidth.option('disabled')) {
            rsWidth.option('disabled', false);
        }
        $$('lblFigureWidth').style.color = 'black';
        if (selectedFigure instanceof Flag) {
            if (!rsHeight.option('disabled')) {
                rsHeight.option('disabled', true);
            }
            $$('lblFigureHeight').style.color = 'darkgray';
        } else {
            if (rsHeight.option('disabled')) {
                rsHeight.option('disabled', false);
            }
            $$('lblFigureHeight').style.color = 'black';
        }
    } else {
        if (!rsWidth.option('disabled')) {
            rsWidth.option('disabled', true);
        }
        $$('lblFigureWidth').style.color = 'darkgray';
        if (!rsHeight.option('disabled')) {
            rsHeight.option('disabled', true);
        }
        $$('lblFigureHeight').style.color = 'darkgray';
    }
}
function getCountFiguresAnimate() {
    let countIsAnimate = 0;
    let countNotAnimate = 0;
    for (let figure of flags) {
        if (figure.isAnimate) {
            countIsAnimate++;
        } else {
            countNotAnimate++;
        }
    }
    return {
        countIsAnimate: countIsAnimate,
        countNotAnimate: countNotAnimate
    };
}
function getIsAllAnimate() {
    let isAllAnimate = false;
    if (flags.length > 0) {
        let state = getCountFiguresAnimate();
        if (state.countIsAnimate === flags.length) isAllAnimate = true;
    }
    return isAllAnimate;
}
function getNotAllAnimate() {
    let notAllAnimate = false;
    if (flags.length > 0) {
        let state = getCountFiguresAnimate();
        if (state.countNotAnimate === flags.length) notAllAnimate = true;
    }
    return notAllAnimate;
}
function onclickRestore() {
    if (selectedFigure && !selectedFigure.isAnimate) {
        selectedFigure.clear($$('canvas').getContext('2d'));
        selectedFigure.draw($$('canvas').getContext('2d'));
    } else if (!getIsAllAnimate()) {
        for (let figure of flags) {
            if (!figure.isAnimate) {
                figure.clear($$('canvas').getContext('2d'));
                figure.draw($$('canvas').getContext('2d'));
            }
        }
    }
}
function setEnableResore() {
    let isEnable = false;
    if (selectedFigure) {
        if (!selectedFigure.isAnimate) isEnable = true;
    } else if (flags.length > 0 && !getIsAllAnimate()) {
        isEnable = true;
    }
    if (isEnable) {
        $$('restore').addEventListener('click', onclickRestore, false);
        if ($$('restore').classList.contains('background-transparent-50')) {
            $$('restore').classList.remove('background-transparent-50');
        }
        if (!$$('restore').classList.contains('button-with-hover-blue')) {
            $$('restore').classList.add('button-with-hover-blue');
        }
    } else {
        $$('restore').removeEventListener('click', onclickRestore, false);
        if ($$('restore').classList.contains('button-with-hover-blue')) {
            $$('restore').classList.remove('button-with-hover-blue');
        }
        if (!$$('restore').classList.contains('background-transparent-50')) {
            $$('restore').classList.add('background-transparent-50');
        }
    }
}
function onclickChangeColorFill() {
    if (selectedFigure && !(selectedFigure instanceof Flag) && !selectedFigure.isAnimate) {
        selectedFigure.colorFill = colors.getRandomColor();
        selectedFigure.colorStroke = colors.getRandomColor();
        selectedFigure.draw($$('canvas').getContext('2d'));
    }
}
function setEnableChangeColorFill() {
    let isEnable = false;
    if (selectedFigure && !(selectedFigure instanceof Flag)) {
        if (!selectedFigure.isAnimate) isEnable = true;
    }
    let element = $$('changeColorFill');
    if (isEnable) {
        element.addEventListener('click', onclickChangeColorFill, false);
        if (element.classList.contains('background-transparent-50')) {
            element.classList.remove('background-transparent-50');
        }
        if (!element.classList.contains('button-with-hover-blue')) {
            element.classList.add('button-with-hover-blue');
        }
    } else {
        element.removeEventListener('click', onclickChangeColorFill, false);
        if (element.classList.contains('button-with-hover-blue')) {
            element.classList.remove('button-with-hover-blue');
        }
        if (!element.classList.contains('background-transparent-50')) {
            element.classList.add('background-transparent-50');
        }
    }
}
function setEnableRemoveFigure() {
    let isEnable = false;
    if (selectedFigure) {
        if (!selectedFigure.isAnimate) isEnable = true;
    }
    let element = $$('removeFigure');
    if (isEnable) {
        element.addEventListener('click', onclickConfirmDel, false);
        if (element.classList.contains('background-transparent-50')) {
            element.classList.remove('background-transparent-50');
        }
        if (!element.classList.contains('button-with-hover-blue')) {
            element.classList.add('button-with-hover-blue');
        }
    } else {
        element.removeEventListener('click', onclickConfirmDel, false);
        if (element.classList.contains('button-with-hover-blue')) {
            element.classList.remove('button-with-hover-blue');
        }
        if (!element.classList.contains('background-transparent-50')) {
            element.classList.add('background-transparent-50');
        }
    }
}
function onclickCanvas(e) {
    let x, y;
    x = e.pageX - $$('canvas').offsetLeft;
    y = e.pageY - $$('canvas').offsetTop;
    //console.log(e);
    console.log(x,y);
    for (let flag of flags) {
        if (x >= flag.x && x <= flag.x + flag.width && y >= flag.y && y <= flag.y + flag.height) {
            if (!selectedFigure) {
                selectFigure(flag);
            } else {
                if (flag === selectedFigure) {
                    deselectFigure();
                } else {
                    deselectFigure();
                    selectFigure(flag);
                }
            }
            setActualAnimate();
            setAccessManageSizeFigure();
        }
    }
}
function onmousedownCanvas(e) {
    for (fn of canvasEventHandlers.mousedown.values()) {
        fn(e);
    }
}
function onmousemoveCanvas(e) {
    for (fn of canvasEventHandlers.mousemove.values()) {
        fn(e);
    }
}
function onmouseupCanvas(e) {
    for (fn of canvasEventHandlers.mouseup.values()) {
        fn(e);
    }
}
function onscroolWindow(e) {
    hideAddPanel();
    hideConfirmDel();
}
// Панель добавления фигур
function onclickAddFifure(e) {
    if (isDisplayBlock($$('addPanel'))) {
        hideAddPanel();
    } else {
        let coords = e.target.getBoundingClientRect();
        $$('addPanel').style.left = coords.left + "px";
        $$('addPanel').style.top = coords.bottom + 5 + "px";
        $$('addPanel').style.display = 'block';
        $$('addPanel').style.opacity = 1;
    }
}
function hideAddPanel() {
    $$('addPanel').style.opacity = 0;
    setTimeout(() => {
        if (isDisplayBlock($$('addPanel'))) $$('addPanel').style.display = 'none';
    }, 450);
}
// Панель подтверждения удаления фигуры
function hideConfirmDel() {
    $$('confirmDel').style.opacity = 0;
    setTimeout(() => {
        if (isDisplayBlock($$('confirmDel'))) $$('confirmDel').style.display = 'none';
    }, 450);
}
function onclickConfirmDel(e) {
    if (selectedFigure) {
        if (isDisplayBlock($$('confirmDel'))) {
            hideConfirmDel();
        } else {
            let coords = e.target.getBoundingClientRect();
            $$('confirmDel').style.left = coords.left + "px";
            $$('confirmDel').style.top = coords.bottom + 5 + "px";
            $$('confirmDel').style.display = 'block';
            $$('confirmDel').style.opacity = 1;
            $$('confirmAbout').innerHTML = selectedFigure;
        }
    }
}
// Добавление новой фигуры
function onAddFigure(e) {
    if (e.target.dataset.country) {
        let nation = Number(e.target.dataset.country);
        addFigure(figureKind.kind.flag, nation);
    } else if (e.target.dataset.figure) {
        let figure = Number(e.target.dataset.figure);
        addFigure(figure, 0);
    }
}
function createListFigures() {
    for (item of flags) {
        $$('listFigures').appendChild(new Option(item, item.serialNumber));
    }
}
function redefinitionListFigures() {
    for (let item of flags) {
        for (let option of $$('listFigures').options) {
            if (Number(option.value) === item.serialNumber) {
                option.text = item;
                break;
            }
        }
    }
}
function redefinitionListSelected() {
    if (selectedFigure) {
        for (let item of flags) {
            if (item === selectedFigure) {
                for (let option of $$('listFigures').options) {
                    if (Number(option.value) === item.serialNumber) {
                        option.text = item;
                        break;
                    }
                }
                break;
            }
        }
    }
}
function onselectedListFigure() {
    let serialNumber = Number($$('listFigures').value);
    if (serialNumber > 0) {
        for (let item of flags) {
            if (item.serialNumber === serialNumber) {
                selectFigure(item);
                break;
            }
        }
        setActualAnimate();
        setAccessManageSizeFigure();
        setEnableResore();
        setEnableChangeColorFill();
        setEnableRemoveFigure();
    }
}
function defineRS() {
    let coefHandleSize = 6.25;
    let coefWidth = 7;
    let coefFontSize = 7.5;
    let handleSize = `+${Math.floor($$('cellWaveLength').clientWidth / coefHandleSize)}`;
    let width = Math.floor($$('cellWaveLength').clientWidth / coefWidth);
    let radius = Math.floor($$('cellWaveLength').clientWidth / 2);
    $("#waveLength").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: handleSize,
        width: width,
        radius: radius,
        min: 5,
        max: 100,
        change: (e) => { onchangeWaveLength(e); },
        start: (e) => { onchangeWaveLength(e); }
    });
    handleSize = `+${Math.floor($$('cellWaveAmplitude').clientWidth / coefHandleSize)}`;
    width = Math.floor($$('cellWaveAmplitude').clientWidth / coefWidth);
    radius = Math.floor($$('cellWaveAmplitude').clientWidth / 2);
    $("#waveAmplitude").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: handleSize,
        width: width,
        radius: radius,
        min: 1,
        max: 100,
        change: (e) => { onchangeWaveAmplitude(e); },
        start: (e) => { onchangeWaveAmplitude(e); }
    });
    handleSize = `+${Math.floor($$('cellWavePeriod').clientWidth / coefHandleSize)}`;
    width = Math.floor($$('cellWavePeriod').clientWidth / coefWidth);
    radius = Math.floor($$('cellWavePeriod').clientWidth / 2);
    $("#wavePeriod").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: handleSize,
        width: width,
        radius: radius,
        min: 1,
        max: 999,
        change: (e) => { onchangeWavePeriod(e); },
        start: (e) => { onchangeWavePeriod(e); }
    });
    handleSize = `+${Math.floor($$('cellWaveShading').clientWidth / coefHandleSize)}`;
    width = Math.floor($$('cellWaveShading').clientWidth / coefWidth);
    radius = Math.floor($$('cellWaveShading').clientWidth / 2);
    $("#waveShading").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: handleSize,
        width: width,
        radius: radius,
        min: 1,
        max: 200,
        change: (e) => { onchangeWaveShading(e); },
        start: (e) => { onchangeWaveShading(e); }
    });
    handleSize = `+${Math.floor($$('cellFigureWidth').clientWidth / coefHandleSize)}`;
    width = Math.floor($$('cellFigureWidth').clientWidth / coefWidth);
    radius = Math.floor($$('cellFigureWidth').clientWidth / 2);
    $("#figureWidth").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: handleSize,
        width: width,
        radius: radius,
        min: 20,
        max: 700,
        change: (e) => { onchangeFigureWidth(e); },
        start: (e) => { onchangeFigureWidth(e); }
    });
    handleSize = `+${Math.floor($$('cellFigureHeight').clientWidth / coefHandleSize)}`;
    width = Math.floor($$('cellFigureHeight').clientWidth / coefWidth);
    radius = Math.floor($$('cellFigureHeight').clientWidth / 2);
    $("#figureHeight").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: handleSize,
        width: width,
        radius: radius,
        min: 20,
        max: 400,
        change: (e) => { onchangeFigureHeight(e); },
        start: (e) => { onchangeFigureHeight(e); }
    });
    for (item of document.getElementsByClassName('rs-tooltip-text')) {
        item.style.fontSize = `${Math.floor($$('cellWaveLength').clientWidth / coefFontSize)}px`;
    }
}
function saveWaveParams() {
    waveParams.length = rsWaveLength.option('value');
    waveParams.amplitude = rsWaveAmplitude.option('value');
    waveParams.period = rsWavePeriod.option('value');
    waveParams.shading = rsWaveShading.option('value');
}
function restoreRsWaveValue(item) {
    isRestoreRsWave = true;
    if (item) {
        rsWaveLength.option('value', item.parmWave.length);
        rsWaveAmplitude.option('value', item.parmWave.amplitude);
        rsWavePeriod.option('value', item.parmWave.period);
        rsWaveShading.option('value', item.parmWave.shading);
    } else {
        rsWaveLength.option('value', waveParams.length);
        rsWaveAmplitude.option('value', waveParams.amplitude);
        rsWavePeriod.option('value', waveParams.period);
        rsWaveShading.option('value', waveParams.shading);
    }
    isRestoreRsWave = false;
}
function saveFigreParams() {
    figureParams.length = rsWidth.option('value');
    figureParams.height = rsHeight.option('value');
}
function restoreRsFigureParams(item) {
    isRestoreRsFigureParams = true;
    if (item) {
        rsWidth.option('value', item.width);
        rsHeight.option('value', item.height);
    } else {
        rsWidth.option('value', figureParams.length);
        rsHeight.option('value', figureParams.height);
    }
    isRestoreRsFigureParams = false;
}
function showStateCanvas() {
    $$('lblSizeCanvas').innerHTML = `Canvas: w${Math.round($$('canvas').width)} h${Math.round($$('canvas').height)}`;
}
function setSizeBuffer() {
    bufferCanvas.width = $$('canvas').width;
    bufferCanvas.height = $$('canvas').height;
}
function throughtBuffer() {
    bufferCanvas.getContext('2d').clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
    if (selectedFigure) {
        for (item of flags) {
            if (!item.isSelected) {
                item.draw(bufferCanvas.getContext('2d'));
            }
        }
        selectedFigure.draw(bufferCanvas.getContext('2d'));
    } else {
        for (item of flags) {
            item.draw(bufferCanvas.getContext('2d'));
        }
    }
    $$('canvas').getContext('2d').clearRect(0, 0, $$('canvas').width, $$('canvas').height);
    $$('canvas').getContext('2d').drawImage(bufferCanvas, 0, 0);
}
function addFigure(kind, nation) {
    let flag = null;
    let rectWidth = colors.getRandomInt(100, Math.round($$('canvas').width / 2));
    let rectHeight = colors.getRandomInt(50, Math.round($$('canvas').height / 4));
    let rectBorderWith = colors.getRandomInt(3, Math.floor(Math.min(rectWidth, rectHeight) / 7));
    let rect = new Rect(
        colors.getRandomInt(1, Math.floor($$('canvas').width) - rectWidth),
        colors.getRandomInt(1, Math.floor($$('canvas').height) - rectHeight),
        rectWidth,
        rectHeight,
        colors.getRandomColor(),
        colors.getRandomColor(),
        rectBorderWith
    );
    rect.serialNumber = getNewSerialNumber();
    switch (kind) {
        case figureKind.kind.rectangle: {
            flags.push(rect);
            $$('listFigures').appendChild(new Option(rect, rect.serialNumber));
            selectFigure(rect);
            canvasEventHandlers.set(canvasEventHandlers.mousedown, rect.serialNumber, (e) => { rect.mouseDownHandler(e); });
            canvasEventHandlers.set(canvasEventHandlers.mousemove, rect.serialNumber, (e) => { rect.mouseMoveHandler(e); });
            canvasEventHandlers.set(canvasEventHandlers.mouseup, rect.serialNumber, (e) => { rect.mouseUpHandler(e); });
            rect.draw($$('canvas').getContext('2d'));
            break;
        }
        case figureKind.kind.flag: {
            switch (nation) {
                case country.country.belarus: {
                    flag = new FlagImg(rect.x, rect.y, rect.width, nation, 'img-figures/belarus.png');
                    break;
                }
                case country.country.germany: {
                    flag = new FlagImg(rect.x, rect.y, rect.width, nation, 'img-figures/germany.png', 1.67);
                    break;
                }
                case country.country.hungary: {
                    flag = new FlagImg(rect.x, rect.y, rect.width, nation, 'img-figures/hungary.png', 1.5);
                    break;
                }
                case country.country.kazakhstan: {
                    flag = new FlagImg(rect.x, rect.y, rect.width, nation, 'img-figures/kazakhstan.png');
                    break;
                }
                case country.country.poland: {
                    flag = new FlagImg(rect.x, rect.y, rect.width, nation, 'img-figures/poland.png', 1.6);
                    break;
                }
                case country.country.russia: {
                    flag = new FlagImg(rect.x, rect.y, rect.width, nation, 'img-figures/russia.png');
                    break;
                }
                case country.country.ukraine: {
                    flag = new FlagImg(rect.x, rect.y, rect.width, nation, 'img-figures/ukraine.png');
                    break;
                }
                case country.country.unitedKingdom: {
                    flag = new FlagImg(rect.x, rect.y, rect.width, nation, 'img-figures/united-kingdom.png');
                    break;
                }
                case country.country.usa: {
                    flag = new FlagUSA(rect.x, rect.y, rect.width);
                    break;
                }
                default: {
                    i = 0;
                }
            }
            if (flag) {
                flag.serialNumber = getNewSerialNumber();
                flags.push(flag);
                $$('listFigures').appendChild(new Option(flag, flag.serialNumber));
                selectFigure(flag);
                canvasEventHandlers.set(canvasEventHandlers.mousedown, flag.serialNumber, (e) => { flag.mouseDownHandler(e); });
                canvasEventHandlers.set(canvasEventHandlers.mousemove, flag.serialNumber, (e) => { flag.mouseMoveHandler(e); });
                canvasEventHandlers.set(canvasEventHandlers.mouseup, flag.serialNumber, (e) => { flag.mouseUpHandler(e); });
                flag.draw($$('canvas').getContext('2d'));
            }
            break;
        }
        default: {
            flags.push(rect);
            $$('listFigures').appendChild(new Option(rect, rect.serialNumber));
            selectFigure(rect);
            canvasEventHandlers.set(canvasEventHandlers.mousedown, rect.serialNumber, (e) => { rect.mouseDownHandler(e); });
            canvasEventHandlers.set(canvasEventHandlers.mousemove, rect.serialNumber, (e) => { rect.mouseMoveHandler(e); });
            canvasEventHandlers.set(canvasEventHandlers.mouseup, rect.serialNumber, (e) => { rect.mouseUpHandler(e); });
            rect.draw($$('canvas').getContext('2d'));
        }
    }
    //flags.push(new FlagUSA(20, 10, Math.floor($$('figureWidth').value)));
}
function getNewSerialNumber() {
    let sn = 0;
    if (flags.length === 0) { sn = 1; } else {
        let number = 0;
        for (item of flags) {
            if (item.serialNumber > number) number = item.serialNumber;
        }
        sn = number + 1;
    }
    return sn;
}

// Define manage <==================================================================================================================
SetWaveLength(rsWaveLength.option('value'));
SetWaveAmplitude(rsWaveAmplitude.option('value'));
SetWavePeriod(rsWavePeriod.option('value'));
SetWaveShading(rsWaveShading.option('value'));
saveWaveParams();
saveFigreParams();
setAccessManageSizeFigure();
showStateCanvas();
setSizeBuffer();
$$('btnAnimate').addEventListener('click', onclickAnimate, false);
window.addEventListener('resize', () => {
    let isAnimate = getIsAnimate();
    if (isAnimate) {
        for (let flag of flags) {
            flag.wasAnimate = flag.isAnimate;
            flag.isAnimate = !isAnimate;
        }
    }
    $$('canvas').getContext('2d').clearRect(0, 0, $$('canvas').width, $$('canvas').height);
    $$('canvas').width = $$('boxCanvas').scrollWidth;
    $$('canvas').height = $$('boxCanvas').scrollHeight;
    for (let flag of flags) {
        if (flag instanceof Flag) {
            flag.restoreWidth();
        }
        flag.draw($$('canvas').getContext('2d'));
    }
    if (isAnimate) {
        for (let flag of flags) {
            if (flag.wasAnimate) startWave(flag);
        }
    }
    redefinitionListFigures();
    hideAddPanel();
    hideConfirmDel();
    defineRS();
    showStateCanvas();
    setSizeBuffer();
}, false);
$$('canvas').addEventListener('click', onclickCanvas, false);
$$('canvas').addEventListener('mousedown', (e) => { onmousedownCanvas(e); }, false);
$$('canvas').addEventListener('mousemove', (e) => { onmousemoveCanvas(e); }, false);
$$('canvas').addEventListener('mouseup', (e) => { onmouseupCanvas(e); }, false);
$$('deselectFigure').addEventListener('click', deselectFigure, false);
$$('addFifure').addEventListener('click', onclickAddFifure, false);
$$('addPanel').addEventListener('mouseleave', hideAddPanel, false);
$$('confirmDel').addEventListener('mouseleave', hideConfirmDel, false);
window.addEventListener('scroll', onscroolWindow, false);
for (let elem of document.getElementsByName('flag')) {
    elem.addEventListener('click', onAddFigure, false);
}
for (let elem of document.getElementsByName('figure')) {
    elem.addEventListener('click', onAddFigure, false);
}
$$('listFigures').addEventListener('change', onselectedListFigure, false);
$$('confirmDelCancel').addEventListener('click', hideConfirmDel, false);
$$('confirmDelOk').addEventListener('click', () => {
    if (selectedFigure) {
        if (selectedFigure.isAnimate) selectedFigure.isAnimate = false;
        let selectedIndex = $$('listFigures').options.selectedIndex;
        if (selectedFigure instanceof Rect) {
            canvasEventHandlers.delete(canvasEventHandlers.mouseup, selectedFigure.serialNumber);
            canvasEventHandlers.delete(canvasEventHandlers.mousemove, selectedFigure.serialNumber);
            canvasEventHandlers.delete(canvasEventHandlers.mousedown, selectedFigure.serialNumber);
        }
        flags.splice(flags.indexOf(selectedFigure), 1);
        deselectFigure();
        $$('listFigures').options[selectedIndex] = null;
        let isAnimate = getIsAnimate();
        if (isAnimate) {
            for (let flag of flags) {
                flag.wasAnimate = flag.isAnimate;
                flag.isAnimate = !isAnimate;
            }
        }
        throughtBuffer();
        if (isAnimate) {
            for (let flag of flags) {
                if (flag.wasAnimate) startWave(flag);
            }
        }
    }
    hideConfirmDel();
}, false);