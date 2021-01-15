//LESSON 6. Task 2

// Initialization <==================================================================================================================
let $$ = (id) => document.getElementById(id);
let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const startAnimate = 'START';
const stopAnimate = 'STOP';
const intervalAnimateAny = 30;
const intervalAnimateZero = 180;
let typeRGB = {
    red: 0,
    green: 1,
    blue: 2,
    intervalRed: getRandomInt(5, 50),
    intervalGreen: getRandomInt(5, 50),
    intervalBlue: getRandomInt(5, 50),
    isRedAnimate: false,
    isGreenAnimate: false,
    isBlueAnimate: false,
    isAnimate: (type = false) => {
        if (type) {
            switch (type) {
                case typeRGB.red: return typeRGB.isRedAnimate;
                case typeRGB.green: return typeRGB.isGreenAnimate;
                case typeRGB.blue: return typeRGB.isBlueAnimate;
                default: return false;
            }
        } else {
            return typeRGB.isRedAnimate || typeRGB.isGreenAnimate || typeRGB.isBlueAnimate ? true : false;
        }
    }
};
let isHSLAnimate = false;
let isRsChange = false;

defineRS();
let rsRed = $("#redRS").data("roundSlider");
let rsGreen = $("#greenRS").data("roundSlider");
let rsBlue = $("#blueRS").data("roundSlider");
let rsHue = $("#hueRS").data("roundSlider");
let rsSaturation = $("#saturationRS").data("roundSlider");
let rsLightnes = $("#lightnesRS").data("roundSlider");
let hslTimeout;
let redTimeout;
let greenTimeout;
let blueTimeout;
setBackgroundRGB();
setBackgroundHSL();
setEnableRGBAnimation();

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
function defineRS() {
    $("#redRS").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: 30,
        width: 18,
        radius: 50,
        min: 0,
        max: 255,
        value: getRandomInt(0, 255),
        change: (e) => { onChangeRGB(e);},
        start: (e) => { onChangeRGB(e); }
    });
    $("#greenRS").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: 30,
        width: 18,
        radius: 50,
        min: 0,
        max: 255,
        value: getRandomInt(0, 255),
        change: (e) => { onChangeRGB(e); },
        start: (e) => { onChangeRGB(e); }
    });
    $("#blueRS").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: 30,
        width: 18,
        radius: 50,
        min: 0,
        max: 255,
        value: getRandomInt(0, 255),
        change: (e) => { onChangeRGB(e); },
        start: (e) => { onChangeRGB(e); }
    });
    $("#hueRS").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: 30,
        width: 18,
        radius: 50,
        min: 0,
        max: 360,
        value: getRandomInt(0, 360),
        change: (e) => { onChangeHSL(e); },
        start: (e) => { onChangeHSL(e); }
    });
    $("#saturationRS").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: 30,
        width: 18,
        radius: 50,
        min: 0,
        max: 100,
        value: getRandomInt(0, 100),
        change: (e) => { onChangeHSL(e); },
        start: (e) => { onChangeHSL(e); }
    });
    $("#lightnesRS").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: 30,
        width: 18,
        radius: 50,
        min: 0,
        max: 100,
        value: getRandomInt(0, 100),
        change: (e) => { onChangeHSL(e); },
        start: (e) => { onChangeHSL(e); }
    });
}
function onChangeRGB(e) {
    type = Number(e.control.context.dataset.type);
    if (!typeRGB.isAnimate(type)) {
        isRsChange = e.type === 'start' ? true : false;
        setBackgroundRGB();
    }
}
function setBackgroundRGB() {
    $$('rgbaBox').style.backgroundColor = `rgba(${rsRed.option('value')},${rsGreen.option('value')},${rsBlue.option('value')},1)`;
    if (isRsChange) {
        requestFrame(() => setBackgroundRGB());
    }
}
function onChangeHSL(e) {
    isRsChange = e.type === 'start' ? true : false;
    setBackgroundHSL();
}
function setHueHandleColor() {
    let handle = document.querySelector('#hueRS .rs-handle');
    let handleFucus = document.querySelector('#hueRS .rs-handle.rs-focus');
    if (handle) {
        handle.style.backgroundColor = `hsla(${rsHue.option('value')},100%,50%,1)`;
    }
    if (handleFucus) {
        handleFucus.style.backgroundColor = `hsla(${rsHue.option('value')},100%,50%,1)`;
    }
}
function setHueRangeColor() {
    let range = document.querySelector('#hueRS .rs-range-color');
    if (range) {
        range.style.backgroundColor = `hsla(${rsHue.option('value')},${rsSaturation.option('value')}%,${rsLightnes.option('value')}%,1)`;
    }
} 

function setBackgroundHSL() {
    $$('hslBox').style.backgroundColor = `hsla(${rsHue.option('value')},${rsSaturation.option('value')}%,${rsLightnes.option('value')}%,1)`;
    setHueHandleColor();
    setHueRangeColor();
    if (isRsChange) {
        requestFrame(() => setBackgroundHSL());
    }
}
function hslAnimate(value, interval) {
    hslTimeout = setTimeout(function go(value, interval) {
        rsHue.option('value', value);
        $$('hslBox').style.backgroundColor = `hsla(${value},${rsSaturation.option('value')}%,${rsLightnes.option('value')}%,1)`;
        setHueHandleColor();
        setHueRangeColor();
        value = value < 360 ? ++value : 0;
        if (value === 0) {
            clearTimeout(hslTimeout);
            isHSLAnimate = false;
            hslTimeout = setTimeout(() => { isHSLAnimate = true; hslAnimate(0, intervalAnimateZero); }, 600);
        } else {
            if (value > 10 && interval === intervalAnimateZero) interval = intervalAnimateAny;
            if (isHSLAnimate) {
                hslTimeout = setTimeout(go, interval, value, interval);
            } else {
                clearTimeout(hslTimeout);
            }
        }
    }, interval, value, interval);
}
function triggerHSLAnimate(button) {
    if (button.innerHTML.trim() === startAnimate) {
        button.innerHTML = stopAnimate;
        isHSLAnimate = true;
        hslAnimate(Number(rsHue.option('value')), intervalAnimateAny);
    } else {
        button.innerHTML = startAnimate;
        isHSLAnimate = false;
    }
}
function setEnableRGBAnimation() {
    if ($$('redAnimation').checked || $$('greenAnimation').checked || $$('blueAnimation').checked) {
        $$('animationRGB').disabled = false;
        if (typeRGB.isAnimate()) {
            // Switch off
            if (!$$('redAnimation').checked && typeRGB.isRedAnimate) {
                clearTimeout(redTimeout);
                typeRGB.isRedAnimate = false;
            }
            if (!$$('greenAnimation').checked && typeRGB.isGreenAnimate) {
                clearTimeout(greenTimeout);
                typeRGB.isGreenAnimate = false;
            }
            if (!$$('blueAnimation').checked && typeRGB.isBlueAnimate) {
                clearTimeout(blueTimeout);
                typeRGB.isBlueAnimate = false;
            }
            // Switch on
            if ($$('redAnimation').checked && !typeRGB.isRedAnimate) {
                typeRGB.isRedAnimate = true;
                redAnimate(Number(rsRed.option('value')), typeRGB.intervalRed);
            }
            if ($$('greenAnimation').checked && !typeRGB.isGreenAnimate) {
                typeRGB.isGreenAnimate = true;
                greenAnimate(Number(rsGreen.option('value')), typeRGB.intervalGreen);
            }
            if ($$('blueAnimation').checked && !typeRGB.isBlueAnimate) {
                typeRGB.isBlueAnimate = true;
                blueAnimate(Number(rsBlue.option('value')), typeRGB.intervalBlue);
            }
        }
    } else {
        if (typeRGB.isAnimate()) {
            triggerRGBAnimate($$('animationRGB'));
        }
        $$('animationRGB').disabled = true;
    }
}
function setIntervalRGB(type) {
    let interval = getRandomInt(5, 50);
    switch (type) {
        case typeRGB.red: typeRGB.intervalRed = interval; break;
        case typeRGB.green: typeRGB.intervalGreen = interval; break;
        case typeRGB.blue: typeRGB.intervalBlue = interval; break;
        default: break;
    }
    showIntervalRGB(type);
}
function showIntervalRGB(type, isClear = false) {
    const lbl = 'animation';
    switch (type) {
        case typeRGB.red: $$('lblRedAnimation').innerHTML = `${lbl}<sub>${isClear ? '' : typeRGB.intervalRed}</sub>`;
            break;
        case typeRGB.green: $$('lblGreenAnimation').innerHTML = `${lbl}<sub>${isClear ? '' : typeRGB.intervalGreen}</sub>`;
            break;
        case typeRGB.blue: $$('lblBlueAnimation').innerHTML = `${lbl}<sub>${isClear ? '' : typeRGB.intervalBlue}</sub>`; 
            break;
        default: break;
    }
}
function goRGBAnimation(e) {
    type = Number(e.target.dataset.type);
    if (e.target.checked) {
        setIntervalRGB(type);
    } else {
        showIntervalRGB(type, true);
    }
    setEnableRGBAnimation();
}
function redAnimate(value, interval) {
    redTimeout = setTimeout(function go(value, interval) {
        rsRed.option('value', value);
        $$('rgbaBox').style.backgroundColor = `rgba(${rsRed.option('value')},${rsGreen.option('value')},${rsBlue.option('value')},1)`;
        value = value < 255 ? ++value : 0;
        if (value === 0) {
            clearTimeout(redTimeout);
            typeRGB.isRedAnimate = false;
            redTimeout = setTimeout(() => { typeRGB.isRedAnimate = true; redAnimate(0, intervalAnimateZero); }, 600);
        } else {
            if (value > 10 && interval === intervalAnimateZero) interval = typeRGB.intervalRed;
            if (typeRGB.isRedAnimate) {
                redTimeout = setTimeout(go, interval, value, interval);
            } else {
                clearTimeout(redTimeout);
            }
        }
    }, interval, value, interval);
}
function greenAnimate(value, interval) {
    greenTimeout = setTimeout(function go(value, interval) {
        rsGreen.option('value', value);
        $$('rgbaBox').style.backgroundColor = `rgba(${rsRed.option('value')},${rsGreen.option('value')},${rsBlue.option('value')},1)`;
        value = value < 255 ? ++value : 0;
        if (value === 0) {
            clearTimeout(greenTimeout);
            typeRGB.isGreenAnimate = false;
            greenTimeout = setTimeout(() => { typeRGB.isGreenAnimate = true; greenAnimate(0, intervalAnimateZero); }, 600);
        } else {
            if (value > 10 && interval === intervalAnimateZero) interval = typeRGB.intervalGreen;
            if (typeRGB.isGreenAnimate) {
                greenTimeout = setTimeout(go, interval, value, interval);
            } else {
                clearTimeout(greenTimeout);
            }
        }
    }, interval, value, interval);
}
function blueAnimate(value, interval) {
    blueTimeout = setTimeout(function go(value, interval) {
        rsBlue.option('value', value);
        $$('rgbaBox').style.backgroundColor = `rgba(${rsRed.option('value')},${rsGreen.option('value')},${rsBlue.option('value')},1)`;
        value = value < 255 ? ++value : 0;
        if (value === 0) {
            clearTimeout(blueTimeout);
            typeRGB.isBlueAnimate = false;
            blueTimeout = setTimeout(() => { typeRGB.isBlueAnimate = true; blueAnimate(0, intervalAnimateZero); }, 600);
        } else {
            if (value > 10 && interval === intervalAnimateZero) interval = typeRGB.intervalBlue;
            if (typeRGB.isBlueAnimate) {
                blueTimeout = setTimeout(go, interval, value, interval);
            } else {
                clearTimeout(blueTimeout);
            }
        }
    }, interval, value, interval);
}
function triggerRGBAnimate(button) {
    if (button.innerHTML.trim() === startAnimate) {
        button.innerHTML = stopAnimate;
        if ($$('redAnimation').checked) {
            typeRGB.isRedAnimate = true;
            redAnimate(Number(rsRed.option('value')), typeRGB.intervalRed);
        }
        if ($$('greenAnimation').checked) {
            typeRGB.isGreenAnimate = true;
            greenAnimate(Number(rsGreen.option('value')), typeRGB.intervalGreen);
        }
        if ($$('blueAnimation').checked) {
            typeRGB.isBlueAnimate = true;
            blueAnimate(Number(rsBlue.option('value')), typeRGB.intervalBlue);
        }
    } else {
        button.innerHTML = startAnimate;
        clearTimeout(redTimeout);
        clearTimeout(greenTimeout);
        clearTimeout(blueTimeout);
        typeRGB.isRedAnimate = false;
        typeRGB.isGreenAnimate = false;
        typeRGB.isBlueAnimate = false;
    }
}

// Define manage <==================================================================================================================
$$('animationHSL').addEventListener('click', (e) => { triggerHSLAnimate(e.target); }, false);
$$('redAnimation').addEventListener('change', goRGBAnimation, false);
$$('greenAnimation').addEventListener('change', goRGBAnimation, false);
$$('blueAnimation').addEventListener('change', goRGBAnimation, false);
$$('animationRGB').addEventListener('click', (e) => { triggerRGBAnimate(e.target); }, false);
