// Lesson 4
class GradientProperties {
    constructor() {
        this.typeGradient;
        this.listColors;
    }
}
class ColorsStop {
    constructor(position, color) {
        this.position = position;
        this.color = color;
    }
}
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

// Gradient <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let $ = (id) => document.getElementById(id);
let canvas = $('canvas');
let colors = new Colors();
let interval;
colors.setFillLineGradient(canvas.getContext('2d'), $('typeFill'));
canvas.addEventListener('mouseenter', () => colors.setFillLineGradient(canvas.getContext('2d'), $('typeFill')));
canvas.addEventListener('mouseleave', () => colors.setFillLineGradient(canvas.getContext('2d'), $('typeFill')));
function autoFill(e) {
    if (e.target.innerHTML.trim() === 'Старт') {
        e.target.innerHTML = 'Стоп';
        interval = setInterval(() => colors.setFillLineGradient(canvas.getContext('2d'), $('typeFill')), Number($('intervalAutoFill').value));
    } else {
        e.target.innerHTML = 'Старт';
        clearInterval(interval);
    }
}
function reNewAutoFill() {
    if ($('autoFill').innerHTML === 'Стоп') {
        clearInterval(interval);
        interval = setInterval(() => colors.setFillLineGradient(canvas.getContext('2d'), $('typeFill')), Number($('intervalAutoFill').value));
    }
}
$('autoFill').addEventListener('click', autoFill, false);
$('intervalAutoFill').addEventListener('change', () => { reNewAutoFill(); }, false);
$('typeFill').addEventListener('change', () => { reNewAutoFill(); }, false);


// Img <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let imgList = new Array();
let imgCount = 317;
for (let count = 0; count < imgCount; count++) {
    imgList.push(`img/${1 + count}.jpg`);
}

// Cell Img
$('imgCell').src = imgList[colors.getRandomInt(0, imgCount - 1)];
$('imgCell').addEventListener('mouseenter', () => $('imgCell').src = imgList[colors.getRandomInt(0, imgCount - 1)], false);
$('imgCell').addEventListener('mouseleave', () => $('imgCell').src = imgList[colors.getRandomInt(0, imgCount - 1)], false);

// Cell Canvas Img
let canvasCell = $('canvasCell');
let loadImg = new Image();
function drawImgToCanvas() {
    let screenHeight = canvasCell.width * loadImg.height / loadImg.width;
    canvasCell.height = screenHeight;
    canvasCell.getContext('2d').drawImage(loadImg, 0, 0, loadImg.width, loadImg.height, 0, 0, canvasCell.width, canvasCell.height);
}
loadImg.addEventListener('load', drawImgToCanvas, false);
loadImg.src = imgList[colors.getRandomInt(0, imgCount - 1)];
canvasCell.addEventListener('mouseenter', () => { loadImg.src = imgList[colors.getRandomInt(0, imgCount - 1)]; }, false);
canvasCell.addEventListener('mouseleave', () => { loadImg.src = imgList[colors.getRandomInt(0, imgCount - 1)]; }, false);

// Animation <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Create manage
// Speed
for (let i = 0; i < 6; i++) {
    $('speedAnimate').appendChild(i === 0 ? new Option("Все", "0") : new Option(i, i));
}
// Count figures
for (let i = 1; i < 1001; i++) {
    $('countFigure').appendChild(new Option(i, i));
}
// Size Figure
for (let i = 10; i < 51; i++) {
    $('sizeFigure').appendChild(new Option(i, i));
}
// Length Way
for (let i = 1; i < Math.max($('canvasAnimate').width, $('canvasAnimate').height) + 1; i++) {
    $('minStep').appendChild(new Option(i, i));
    $('maxStep').appendChild(new Option(i, i));
}
// Defenition
let primaryCanvas = $('canvasAnimate');
let primaryContext = $('canvasAnimate').getContext('2d');
let buffer = document.createElement("canvas");
buffer.width = primaryCanvas.width;
buffer.height = primaryCanvas.height;
let figures = new Set();
let typeFigure = {
    figure: 0,
    square: 1,
    circle: 2
};
let typeFillFigure = {
    any: 0,
    color: 1,
    gradientWithoutManageMove: 2,
    gradientWithManageMove: 3
};
let typeGradient = {
    LeftToRight: 1,
    TopToBottom: 2,
    LeftTopToBottomRight: 3,
    RightTopToLeftBottom: 4
};
class Figure {
    constructor(type) {
        this.type = type;
        this.ordinal;
        this.x = 0;
        this.y = 0;
        this.size = 30;
        this.borderWidth = 5;
        this.colorFill;
        this.colorStroke;
        this.direct;
        this.speed;
        this.countStep = 0;
        this.step = 0;
        this.isGradientManageMove = false;
        this.propertiesFill = new GradientProperties();
        this.propertiesStroke = new GradientProperties();
    }
    calcAnimate(item, canvas) {
        let newX;
        let newY;
        let isNewMove = false;
        item.step++;
        if (item.step < item.countStep) {
            if (item.direct === directMove.hLeftRight) {
                newX = item.x + item.speed;
                if (newX < canvas.width - item.size) {
                    item.x = newX;
                } else isNewMove = true;
            } else if (item.direct === directMove.hRightLeft) {
                newX = item.x - item.speed;
                if (newX >= 0) {
                    item.x = newX;
                } else isNewMove = true;
            } else if (item.direct === directMove.vTopDown) {
                newY = item.y + item.speed;
                if (newY < canvas.height - item.size) {
                    item.y = newY;
                } else isNewMove = true;
            } else if (item.direct === directMove.vDownTop) {
                newY = item.y - item.speed;
                if (newY >= 0) {
                    item.y = newY;
                } else isNewMove = true;
            } else if (item.direct === directMove.biasLeftTop) {
                newX = item.x + item.speed;
                newY = item.y + item.speed;
                if (newX < canvas.width - item.size && newY < canvas.height - item.size) {
                    item.x = newX;
                    item.y = newY;
                } else isNewMove = true;
            } else if (item.direct === directMove.biasRightTop) {
                newX = item.x - item.speed;
                newY = item.y + item.speed;
                if (newX >= 0 && newY < canvas.height - item.size) {
                    item.x = newX;
                    item.y = newY;
                } else isNewMove = true;
            } else if (item.direct === directMove.biasLeftBottom) {
                newX = item.x + item.speed;
                newY = item.y - item.speed;
                if (newX < canvas.width - item.size && newY >= 0) {
                    item.x = newX;
                    item.y = newY;
                } else isNewMove = true;
            } else if (item.direct === directMove.biasRightBottom) {
                newX = item.x - item.speed;
                newY = item.y - item.speed;
                if (newX >= 0 && newY >= 0) {
                    item.x = newX;
                    item.y = newY;
                } else isNewMove = true;
            }
        } else isNewMove = true;
        if (isNewMove) {
            item.step = 0;
            item.countStep = getCountStep();
            item.direct = getDirect();
            item.speed = getSpeed();
            item.colorFill = getFill(canvas.getContext('2d'), item.x + item.borderWidth, item.y + this.borderWidth, item.size - item.borderWidth * 2, item.propertiesFill);
            item.colorStroke = getFill(canvas.getContext('2d'), item.x, item.y, item.size, item.propertiesStroke);
        }
        return isNewMove;
    }
}
class Square extends Figure {
    constructor() {
        super(typeFigure.square);
    }
    draw(context) {
        context.beginPath();
        context.rect(
            this.x,
            this.y,
            this.size,
            this.size
        );
        if (this.isGradientManageMove) {
            this.colorStroke = colors.restoreFillBoxLineGradient(context, this.x, this.y, this.size, this.propertiesStroke);
        }
        context.fillStyle = this.colorStroke;
        context.fill();
        context.beginPath();
        context.rect(
            this.x + this.borderWidth,
            this.y + this.borderWidth,
            this.size - this.borderWidth * 2,
            this.size - this.borderWidth * 2
        );
        if (this.isGradientManageMove) {
            this.colorFill = colors.restoreFillBoxLineGradient(context, this.x, this.y, this.size, this.propertiesFill);
        }
        context.fillStyle = this.colorFill;
        context.fill();
    }
}
class Circle extends Figure {
    constructor() {
        super(typeFigure.circle);
    }
    draw(context) {
        context.beginPath();
        let radius = this.size / 2;
        let degrees = Math.PI * 2;
        context.arc(this.x + radius, this.y + radius, radius, 0, degrees, false); // Внешняя окружность
        if (this.isGradientManageMove) {
            this.colorStroke = colors.restoreFillBoxLineGradient(context, this.x, this.y, this.size, this.propertiesStroke);
        }
        context.fillStyle = this.colorStroke;
        context.fill();
        context.beginPath();
        context.arc(this.x + radius, this.y + radius, radius - this.borderWidth, 0, degrees, false); // Внешняя окружность
        if (this.isGradientManageMove) {
            this.colorFill = colors.restoreFillBoxLineGradient(context, this.x, this.y, this.size, this.propertiesFill);
        }
        context.fillStyle = this.colorFill;
        context.fill();
    }
}
let isAnimate = false;
window.requestFrame = function (callback) {
    var f = window.mozRequestAnimationFrame ||
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 500);
        };
    f(callback);
};
let directMove = {
    hLeftRight: 10,
    hRightLeft: 11,
    vTopDown: 12,
    vDownTop: 13,
    biasLeftTop: 14,
    biasRightTop: 15,
    biasLeftBottom: 16,
    biasRightBottom: 17,
    //
    countHLeftRight: 0,
    countHRightLeft: 0,
    countVTopDown: 0,
    countVDownTop: 0,
    countBiasLeftTop: 0,
    countBiasRightTop: 0,
    countBiasLeftBottom: 0,
    countBiasRightBottom: 0
};
function getCountStep() {
    return colors.getRandomInt(Number($('minStep').value), Number($('maxStep').value));
}
function getDirect() {
    let direction = colors.getRandomInt(directMove.hLeftRight, directMove.biasRightBottom);
    if (direction === directMove.hLeftRight) { directMove.countHLeftRight++; }
    else if (direction === directMove.hRightLeft) { directMove.countHRightLeft++; }
    else if (direction === directMove.vTopDown) { directMove.countVTopDown++; }
    else if (direction === directMove.vDownTop) { directMove.countVDownTop++; }
    else if (direction === directMove.biasLeftTop) { directMove.countBiasLeftTop++; }
    else if (direction === directMove.biasRightTop) { directMove.countBiasRightTop++; }
    else if (direction === directMove.biasLeftBottom) { directMove.countBiasLeftBottom++; }
    else if (direction === directMove.biasRightBottom) { directMove.countBiasRightBottom++; }
    return direction;
}
function getSpeed() {
    let speed = 1;
    if (Number($('speedAnimate').value) === 0) {
        speed = colors.getRandomInt(1, 5);
    } else {
        speed = Number($('speedAnimate').value);
    }
    return speed;
}
function getFill(context, x, y, size, gradientProperties) {
    let type = typeFillFigure.color;
    let fill = colors.getRandomColor();
    if (Number($('typeFillAnimate').value) === typeFillFigure.any) {
        type = colors.getRandomInt(typeFillFigure.color, typeFillFigure.gradientWithoutManageMove);
    } else {
        type = Number($('typeFillAnimate').value);
    }
    if (type === typeFillFigure.color) {
        fill = colors.getRandomColor();
    } else if (type === typeFillFigure.gradientWithoutManageMove || type === typeFillFigure.gradientWithManageMove) {
        fill = colors.getFillBoxLineGradient(context, x, y, size, gradientProperties);
    }
    return fill;
}
function getFigure() {
    let type = typeFigure.figure;
    let figure = new Square();
    if (Number($('typeFigure').value) === typeFigure.figure) {
        type = colors.getRandomInt(typeFigure.square, typeFigure.circle);
    } else {
        type = Number($('typeFigure').value);
    }
    if (type === typeFigure.square) {
        figure = new Square();
    } else if (type === typeFigure.circle) {
        figure = new Circle();
    }
    return figure;
}
function initFigure(item) {
    item.size = Number($('sizeFigure').value);
    item.x = colors.getRandomInt(0, primaryCanvas.width - item.size);
    item.y = colors.getRandomInt(0, primaryCanvas.height - item.size);
    item.isGradientManageMove = Number($('typeFillAnimate').value) === typeFillFigure.gradientWithManageMove ? true : false;
    if (!isAnimate) {
        item.colorFill = getFill(primaryContext, item.x + item.borderWidth, item.y + item.borderWidth, item.size - item.borderWidth * 2, item.propertiesFill);
        item.colorStroke = getFill(primaryContext, item.x, item.y, item.size, item.propertiesStroke);
    } else {
        item.colorFill = getFill(buffer.getContext('2d'), item.x + item.borderWidth, item.y + item.borderWidth, item.size - item.borderWidth * 2, item.propertiesFill);
        item.colorStroke = getFill(buffer.getContext('2d'), item.x, item.y, item.size, item.propertiesStroke);
    }
    item.direct = getDirect();
    item.speed = getSpeed();
    item.countStep = getCountStep();
    item.step = 0;
    item.borderWidth = Math.floor(item.size / 6);
    item.ordinal = figures.size + 1;
    return item;
}

function animate(items, canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (item of items) {
        item.calcAnimate(item, canvas);
        item.draw(context);
    }
    primaryContext.clearRect(0, 0, primaryCanvas.width, primaryCanvas.height);
    primaryContext.drawImage(canvas, 0, 0);
    if (isAnimate) requestFrame(() => animate(items, canvas, context));
}

function triggerAnimate(e) {
    if (e.target.innerHTML.trim() === 'Старт') {
        e.target.innerHTML = 'Стоп';
        isAnimate = true;
        animate(figures, buffer, buffer.getContext('2d'));
    } else {
        e.target.innerHTML = 'Старт';
        isAnimate = false;
        // Show statistiks
        $('countHLeftRight').innerHTML = directMove.countHLeftRight;
        $('countHRightLeft').innerHTML = directMove.countHRightLeft;
        $('countVTopDown').innerHTML = directMove.countVTopDown;
        $('countVDownTop').innerHTML = directMove.countVDownTop;
        $('countBiasLeftTop').innerHTML = directMove.countBiasLeftTop;
        $('countBiasRightTop').innerHTML = directMove.countBiasRightTop;
        $('countBiasLeftBottom').innerHTML = directMove.countBiasLeftBottom;
        $('countBiasRightBottom').innerHTML = directMove.countBiasRightBottom;
    }
}
// Init figures
for (let i = 0; i < Number($('countFigure').value); i++) {
    figures.add(initFigure(getFigure()));
}
let ordinal = 0;
for (let figure of figures) {
    figure.draw(primaryContext);
}
// Define manage
$('btnAnimate').addEventListener('click', triggerAnimate, false);
$('countFigure').addEventListener('change', () => {
    if (Number($('countFigure').value) < figures.size) {
        let countRemove = figures.size - Number($('countFigure').value);
        for (let item of figures) {
            figures.delete(item);
            countRemove--;
            if (countRemove === 0) break;
        }
        if (!isAnimate) {
            primaryContext.clearRect(0, 0, primaryCanvas.width, primaryCanvas.height);
            for (let item of figures) {
                item.draw(primaryContext);
            }
        }
    } else if (Number($('countFigure').value) > figures.size) {
        let countAdd = Number($('countFigure').value) - figures.size;
        for (let i = 0; i < countAdd; i++) {
            let item = initFigure(getFigure());
            if (!isAnimate) item.draw(primaryContext);
            figures.add(item);
        }
    }
}, false);
$('sizeFigure').addEventListener('change', () => {
    if(!isAnimate) primaryContext.clearRect(0, 0, primaryCanvas.width, primaryCanvas.height);
    figures.clear();
    for (let i = 0; i < Number($('countFigure').value); i++) {
        let item = initFigure(getFigure());
        if (!isAnimate) item.draw(primaryContext);
        figures.add(item);
    }
}, false);
$('speedAnimate').addEventListener('change', () => {
    for (item of figures) {
        item.speed = getSpeed();
    }
}, false);
$('minStep').addEventListener('change', () => {
    for (item of figures) {
        item.countStep = getCountStep();
    }
}, false);
$('maxStep').addEventListener('change', () => {
    for (item of figures) {
        item.countStep = getCountStep();
    }
}, false);
$('typeFigure').addEventListener('change', () => {
    if (!isAnimate) primaryContext.clearRect(0, 0, primaryCanvas.width, primaryCanvas.height);
    figures.clear();
    for (let i = 0; i < Number($('countFigure').value); i++) {
        let item = initFigure(getFigure());
        if (!isAnimate) item.draw(primaryContext);
        figures.add(item);
    }
}, false);
$('typeFillAnimate').addEventListener('change', () => {
    for (item of figures) {
        item.isGradientManageMove = Number($('typeFillAnimate').value) === typeFillFigure.gradientWithManageMove ? true : false;
        if (!isAnimate) {
            item.colorFill = getFill(primaryContext, item.x + item.borderWidth, item.y + item.borderWidth, item.size - item.borderWidth * 2, item.propertiesFill);
            item.colorStroke = getFill(primaryContext, item.x, item.y, item.size, item.propertiesStroke);
        } else {
            item.colorFill = getFill(buffer.getContext('2d'), item.x + item.borderWidth, item.y + item.borderWidth, item.size - item.borderWidth * 2, item.propertiesFill);
            item.colorStroke = getFill(buffer.getContext('2d'), item.x, item.y, item.size, item.propertiesStroke);
        }
        if (!isAnimate) item.draw(primaryContext);
    }
}, false);

