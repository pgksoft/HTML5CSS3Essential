let $$ = (id) => document.getElementById(id);
defineRS();

// Helpers <==================================================================================================================
function defineRS() {
    let coefHandleSize = 6.25;
    let coefWidth = 7;
    let coefFontSize = 7.5;
    let handleSize = `+${Math.floor($$('cellRange').clientWidth / coefHandleSize)}`;
    let width = Math.floor($$('cellRange').clientWidth / coefWidth);
    let radius = Math.floor($$('cellRange').clientWidth / 2);
    $("#myRange").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: handleSize,
        width: width, // width of the roundSlider
        radius: radius, // radius size
        min: 100,
        max: 700
    });
    handleSize = `+${Math.floor($$('cellRange1').clientWidth / coefHandleSize)}`;
    width = Math.floor($$('cellRange1').clientWidth / coefWidth);
    radius = Math.floor($$('cellRange1').clientWidth / 2);
    $("#myRange1").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: handleSize,
        width: width, // width of the roundSlider
        radius: radius, // radius size
        min: 100,
        max: 700
    });
    handleSize = `+${Math.floor($$('cellRange2').clientWidth / coefHandleSize)}`;
    width = Math.floor($$('cellRange2').clientWidth / coefWidth);
    radius = Math.floor($$('cellRange2').clientWidth / 2);
    $("#myRange2").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: handleSize,
        width: width, // width of the roundSlider
        radius: radius, // radius size
        min: 100,
        max: 700
    });
    handleSize = `+${Math.floor($$('cellRange3').clientWidth / coefHandleSize)}`;
    width = Math.floor($$('cellRange3').clientWidth / coefWidth);
    radius = Math.floor($$('cellRange3').clientWidth / 2);
    $("#myRange3").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: handleSize,
        width: width, // width of the roundSlider
        radius: radius, // radius size
        min: 100,
        max: 700
    });
    for (item of document.getElementsByClassName('rs-tooltip-text')) {
        item.style.fontSize = `${Math.floor($$('cellRange').clientWidth / coefFontSize)}px`;
    }
}
function onresizeWindow() {
    defineRS();
    $$('cellWidth').innerHTML = $$('cellRange').clientWidth;
    $$('cellHeight').innerHTML = $$('cellRange').clientHeight;
    $$('cellScroolWidth').innerHTML = $$('cellRange').scrollWidth;
    $$('cellScroolHeight').innerHTML = $$('cellRange').scrollHeight;
}

// Define manage <============================================================================================================
window.addEventListener('resize', onresizeWindow, false);