export class RgDomItems {
    constructor(settings, overFill, showParms, boxForRGArea, rgArea, modalParms, modalParmsScaleArea, modalParmsFillingDirectionArea, modalParmsColorSchemeArea, modalParmsAllColorsArea, modalParmsX, modalParmsShowRangeX, modalParmsShowValueX, modalParmsY, modalParmsShowRangeY, modalParmsShowValueY, modalParmsWidth, modalParmsShowRangeWidth, modalParmsShowValueWidth, modalParmsHeight, modalParmsShowRangeHeight, modalParmsShowValueHeight, modalParmsOneX, modalParmsShowRangeOneX, modalParmsShowValueOneX, modalParmsOneY, modalParmsShowRangeOneY, modalParmsShowValueOneY, modalParmsOneR, modalParmsShowRangeOneR, modalParmsShowValueOneR, modalParmsTwoX, modalParmsShowRangeTwoX, modalParmsShowValueTwoX, modalParmsTwoY, modalParmsShowRangeTwoY, modalParmsShowValueTwoY, modalParmsTwoR, modalParmsShowRangeTwoR, modalParmsShowValueTwoR, modalParmsIsAutoColorScheme, modalParmsIsTrackProportionsAreaRG, modalParmsIsTranslucentModal, modalParmsOK, menuSelect) {
        this._settings = settings;
        this._overFill = overFill;
        this._showParms = showParms;
        this._boxForRGArea = boxForRGArea;
        this._rgArea = rgArea;
        this._modalParms = modalParms;
        this._modalParmsScaleArea = modalParmsScaleArea;
        this._modalParmsFillingDirectionArea = modalParmsFillingDirectionArea;
        this._modalParmsColorSchemeArea = modalParmsColorSchemeArea;
        this._modalParmsAllColorsArea = modalParmsAllColorsArea;
        this._modalParmsX = modalParmsX;
        this._modalParmsShowRangeX = modalParmsShowRangeX;
        this._modalParmsShowValueX = modalParmsShowValueX;
        this._modalParmsY = modalParmsY;
        this._modalParmsShowRangeY = modalParmsShowRangeY;
        this._modalParmsShowValueY = modalParmsShowValueY;
        this._modalParmsWidth = modalParmsWidth;
        this._modalParmsShowRangeWidth = modalParmsShowRangeWidth;
        this._modalParmsShowValueWidth = modalParmsShowValueWidth;
        this._modalParmsHeight = modalParmsHeight;
        this._modalParmsShowRangeHeight = modalParmsShowRangeHeight;
        this._modalParmsShowValueHeight = modalParmsShowValueHeight;
        this._modalParmsOneX = modalParmsOneX;
        this._modalParmsShowRangeOneX = modalParmsShowRangeOneX;
        this._modalParmsShowValueOneX = modalParmsShowValueOneX;
        this._modalParmsOneY = modalParmsOneY;
        this._modalParmsShowRangeOneY = modalParmsShowRangeOneY;
        this._modalParmsShowValueOneY = modalParmsShowValueOneY;
        this._modalParmsOneR = modalParmsOneR;
        this._modalParmsShowRangeOneR = modalParmsShowRangeOneR;
        this._modalParmsShowValueOneR = modalParmsShowValueOneR;
        this._modalParmsTwoX = modalParmsTwoX;
        this._modalParmsShowRangeTwoX = modalParmsShowRangeTwoX;
        this._modalParmsShowValueTwoX = modalParmsShowValueTwoX;
        this._modalParmsTwoY = modalParmsTwoY;
        this._modalParmsShowRangeTwoY = modalParmsShowRangeTwoY;
        this._modalParmsShowValueTwoY = modalParmsShowValueTwoY;
        this._modalParmsTwoR = modalParmsTwoR;
        this._modalParmsShowRangeTwoR = modalParmsShowRangeTwoR;
        this._modalParmsShowValueTwoR = modalParmsShowValueTwoR;
        this._modalParmsIsAutoColorScheme = modalParmsIsAutoColorScheme;
        this._modalParmsIsTrackProportionsAreaRG = modalParmsIsTrackProportionsAreaRG;
        this._modalParmsIsTranslucentModal = modalParmsIsTranslucentModal;
        this._modalParmsOK = modalParmsOK;
        this._menuSelect = menuSelect;
    }
    static get instance() {
        if (!RgDomItems._instance) {
            throw new Error('Instance of RgDomItems was not created.');
        }
        return RgDomItems._instance;
    }
    get settings() { return this._settings; }
    get overFill() { return this._overFill; }
    get boxForRGArea() { return this._boxForRGArea; }
    get rgArea() { return this._rgArea; }
    get showParms() { return this._showParms; }
    get modalParms() { return this._modalParms; }
    get modalParmsScaleArea() { return this._modalParmsScaleArea; }
    get modalParmsFillingDirectionArea() { return this._modalParmsFillingDirectionArea; }
    get modalParmsColorSchemeArea() { return this._modalParmsColorSchemeArea; }
    get modalParmsAllColorsArea() { return this._modalParmsAllColorsArea; }
    get modalParmsX() { return this._modalParmsX; }
    get modalParmsShowRangeX() { return this._modalParmsShowRangeX; }
    get modalParmsShowValueX() { return this._modalParmsShowValueX; }
    get modalParmsY() { return this._modalParmsY; }
    get modalParmsShowRangeY() { return this._modalParmsShowRangeY; }
    get modalParmsShowValueY() { return this._modalParmsShowValueY; }
    get modalParmsWidth() { return this._modalParmsWidth; }
    get modalParmsShowRangeWidth() { return this._modalParmsShowRangeWidth; }
    get modalParmsShowValueWidth() { return this._modalParmsShowValueWidth; }
    get modalParmsHeight() { return this._modalParmsHeight; }
    get modalParmsShowRangeHeight() { return this._modalParmsShowRangeHeight; }
    get modalParmsShowValueHeight() { return this._modalParmsShowValueHeight; }
    get modalParmsOneX() { return this._modalParmsOneX; }
    get modalParmsShowRangeOneX() { return this._modalParmsShowRangeOneX; }
    get modalParmsShowValueOneX() { return this._modalParmsShowValueOneX; }
    get modalParmsOneY() { return this._modalParmsOneY; }
    get modalParmsShowRangeOneY() { return this._modalParmsShowRangeOneY; }
    get modalParmsShowValueOneY() { return this._modalParmsShowValueOneY; }
    get modalParmsOneR() { return this._modalParmsOneR; }
    get modalParmsShowRangeOneR() { return this._modalParmsShowRangeOneR; }
    get modalParmsShowValueOneR() { return this._modalParmsShowValueOneR; }
    get modalParmsTwoX() { return this._modalParmsTwoX; }
    get modalParmsShowRangeTwoX() { return this._modalParmsShowRangeTwoX; }
    get modalParmsShowValueTwoX() { return this._modalParmsShowValueTwoX; }
    get modalParmsTwoY() { return this._modalParmsTwoY; }
    get modalParmsShowRangeTwoY() { return this._modalParmsShowRangeTwoY; }
    get modalParmsShowValueTwoY() { return this._modalParmsShowValueTwoY; }
    get modalParmsTwoR() { return this._modalParmsTwoR; }
    get modalParmsShowRangeTwoR() { return this._modalParmsShowRangeTwoR; }
    get modalParmsShowValueTwoR() { return this._modalParmsShowValueTwoR; }
    get modalParmsIsAutoColorScheme() { return this._modalParmsIsAutoColorScheme; }
    get modalParmsIsTrackProportionsAreaRG() { return this._modalParmsIsTrackProportionsAreaRG; }
    get modalParmsIsTranslucentModal() { return this._modalParmsIsTranslucentModal; }
    get modalParmsOK() { return this._modalParmsOK; }
    get menuSelect() { return this._menuSelect; }
    static Create(settings, overFill, showParms, boxForRGArea, rgArea, modalParms, modalParmsScaleArea, modalParmsFillingDirectionArea, modalParmsColorSchemeArea, modalParmsAllColorsArea, modalParmsX, modalParmsShowRangeX, modalParmsShowValueX, modalParmsY, modalParmsShowRangeY, modalParmsShowValueY, modalParmsWidth, modalParmsShowRangeWidth, modalParmsShowValueWidth, modalParmsHeight, modalParmsShowRangeHeight, modalParmsShowValueHeight, modalParmsOneX, modalParmsShowRangeOneX, modalParmsShowValueOneX, modalParmsOneY, modalParmsShowRangeOneY, modalParmsShowValueOneY, modalParmsOneR, modalParmsShowRangeOneR, modalParmsShowValueOneR, modalParmsTwoX, modalParmsShowRangeTwoX, modalParmsShowValueTwoX, modalParmsTwoY, modalParmsShowRangeTwoY, modalParmsShowValueTwoY, modalParmsTwoR, modalParmsShowRangeTwoR, modalParmsShowValueTwoR, modalParmsIsAutoColorScheme, modalParmsIsTrackProportionsAreaRG, modalParmsIsTranslucentModal, modalParmsOK, menuSelect) {
        if (!RgDomItems._instance) {
            RgDomItems._instance = new RgDomItems(settings, overFill, showParms, boxForRGArea, rgArea, modalParms, modalParmsScaleArea, modalParmsFillingDirectionArea, modalParmsColorSchemeArea, modalParmsAllColorsArea, modalParmsX, modalParmsShowRangeX, modalParmsShowValueX, modalParmsY, modalParmsShowRangeY, modalParmsShowValueY, modalParmsWidth, modalParmsShowRangeWidth, modalParmsShowValueWidth, modalParmsHeight, modalParmsShowRangeHeight, modalParmsShowValueHeight, modalParmsOneX, modalParmsShowRangeOneX, modalParmsShowValueOneX, modalParmsOneY, modalParmsShowRangeOneY, modalParmsShowValueOneY, modalParmsOneR, modalParmsShowRangeOneR, modalParmsShowValueOneR, modalParmsTwoX, modalParmsShowRangeTwoX, modalParmsShowValueTwoX, modalParmsTwoY, modalParmsShowRangeTwoY, modalParmsShowValueTwoY, modalParmsTwoR, modalParmsShowRangeTwoR, modalParmsShowValueTwoR, modalParmsIsAutoColorScheme, modalParmsIsTrackProportionsAreaRG, modalParmsIsTranslucentModal, modalParmsOK, menuSelect);
        }
        return RgDomItems._instance;
    }
}
RgDomItems._instance = undefined;
//# sourceMappingURL=rgItems.js.map