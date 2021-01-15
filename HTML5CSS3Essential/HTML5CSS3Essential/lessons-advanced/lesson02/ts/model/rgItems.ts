export class RgDomItems {
    private constructor(
        settings: HTMLElement,
        overFill: HTMLElement,
        showParms: HTMLElement,
        boxForRGArea: HTMLElement,
        rgArea: HTMLCanvasElement,
        //
        modalParms: HTMLElement,
        modalParmsScaleArea: HTMLElement,
        modalParmsFillingDirectionArea: HTMLElement,
        modalParmsColorSchemeArea: HTMLElement,
        modalParmsAllColorsArea: HTMLElement,
        //
        modalParmsX: HTMLInputElement,
        modalParmsShowRangeX: HTMLElement,
        modalParmsShowValueX: HTMLElement,
        modalParmsY: HTMLInputElement,
        modalParmsShowRangeY: HTMLElement,
        modalParmsShowValueY: HTMLElement,
        modalParmsWidth: HTMLInputElement,
        modalParmsShowRangeWidth: HTMLElement,
        modalParmsShowValueWidth: HTMLElement,
        modalParmsHeight: HTMLInputElement,
        modalParmsShowRangeHeight: HTMLElement,
        modalParmsShowValueHeight: HTMLElement,
        modalParmsOneX: HTMLInputElement,
        modalParmsShowRangeOneX: HTMLElement,
        modalParmsShowValueOneX: HTMLElement,
        modalParmsOneY: HTMLInputElement,
        modalParmsShowRangeOneY: HTMLElement,
        modalParmsShowValueOneY: HTMLElement,
        modalParmsOneR: HTMLInputElement,
        modalParmsShowRangeOneR: HTMLElement,
        modalParmsShowValueOneR: HTMLElement,
        modalParmsTwoX: HTMLInputElement,
        modalParmsShowRangeTwoX: HTMLElement,
        modalParmsShowValueTwoX: HTMLElement,
        modalParmsTwoY: HTMLInputElement,
        modalParmsShowRangeTwoY: HTMLElement,
        modalParmsShowValueTwoY: HTMLElement,
        modalParmsTwoR: HTMLInputElement,
        modalParmsShowRangeTwoR: HTMLElement,
        modalParmsShowValueTwoR: HTMLElement,
        //
        modalParmsIsAutoColorScheme: HTMLInputElement,
        modalParmsIsTrackProportionsAreaRG: HTMLInputElement,
        modalParmsIsTranslucentModal: HTMLInputElement,
        modalParmsOK: HTMLElement,
        //
        menuSelect: HTMLElement
    ) {
        this._settings = settings;
        this._overFill = overFill;
        this._showParms = showParms;
        this._boxForRGArea = boxForRGArea;
        this._rgArea = rgArea;
        //
        this._modalParms = modalParms;
        this._modalParmsScaleArea = modalParmsScaleArea;
        this._modalParmsFillingDirectionArea = modalParmsFillingDirectionArea;
        this._modalParmsColorSchemeArea = modalParmsColorSchemeArea;
        this._modalParmsAllColorsArea = modalParmsAllColorsArea;
        //
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
        //
        this._modalParmsIsAutoColorScheme = modalParmsIsAutoColorScheme;
        this._modalParmsIsTrackProportionsAreaRG = modalParmsIsTrackProportionsAreaRG;
        this._modalParmsIsTranslucentModal = modalParmsIsTranslucentModal;
        this._modalParmsOK = modalParmsOK;
        //
        this._menuSelect = menuSelect;
    }
    // Fields itself
    private static _instance: RgDomItems = undefined;
    // Fields like Dom Items
    private _settings: HTMLElement;
    private _overFill: HTMLElement;
    private _boxForRGArea: HTMLElement;
    private _rgArea: HTMLCanvasElement;
    //
    private _showParms: HTMLElement;
    private _modalParms: HTMLElement;
    private _modalParmsScaleArea: HTMLElement;
    private _modalParmsFillingDirectionArea: HTMLElement;
    private _modalParmsColorSchemeArea: HTMLElement;
    private _modalParmsAllColorsArea: HTMLElement;
    //
    private _modalParmsX: HTMLInputElement;
    private _modalParmsShowRangeX: HTMLElement;
    private _modalParmsShowValueX: HTMLElement;
    private _modalParmsY: HTMLInputElement;
    private _modalParmsShowRangeY: HTMLElement;
    private _modalParmsShowValueY: HTMLElement;
    private _modalParmsWidth: HTMLInputElement;
    private _modalParmsShowRangeWidth: HTMLElement;
    private _modalParmsShowValueWidth: HTMLElement;
    private _modalParmsHeight: HTMLInputElement;
    private _modalParmsShowRangeHeight: HTMLElement;
    private _modalParmsShowValueHeight: HTMLElement;
    private _modalParmsOneX: HTMLInputElement;
    private _modalParmsShowRangeOneX: HTMLElement;
    private _modalParmsShowValueOneX: HTMLElement;
    private _modalParmsOneY: HTMLInputElement;
    private _modalParmsShowRangeOneY: HTMLElement;
    private _modalParmsShowValueOneY: HTMLElement;
    private _modalParmsOneR: HTMLInputElement;
    private _modalParmsShowRangeOneR: HTMLElement;
    private _modalParmsShowValueOneR: HTMLElement;
    private _modalParmsTwoX: HTMLInputElement;
    private _modalParmsShowRangeTwoX: HTMLElement;
    private _modalParmsShowValueTwoX: HTMLElement;
    private _modalParmsTwoY: HTMLInputElement;
    private _modalParmsShowRangeTwoY: HTMLElement;
    private _modalParmsShowValueTwoY: HTMLElement;
    private _modalParmsTwoR: HTMLInputElement;
    private _modalParmsShowRangeTwoR: HTMLElement;
    private _modalParmsShowValueTwoR: HTMLElement;
    //
    private _modalParmsIsAutoColorScheme: HTMLInputElement;
    private _modalParmsIsTrackProportionsAreaRG: HTMLInputElement;
    private _modalParmsIsTranslucentModal: HTMLInputElement;
    private _modalParmsOK: HTMLElement;
    //
    private _menuSelect: HTMLElement;

    // Fields - name events

    // Properties itself
    static get instance(): RgDomItems {
        if (!RgDomItems._instance) {
            throw new Error('Instance of RgDomItems was not created.');
        }
        return RgDomItems._instance;
    }

    // Properties like Dom Items
    get settings(): HTMLElement { return this._settings; }
    get overFill(): HTMLElement { return this._overFill; }
    get boxForRGArea(): HTMLElement { return this._boxForRGArea; }
    get rgArea(): HTMLCanvasElement { return this._rgArea; }
    //
    get showParms(): HTMLElement { return this._showParms; }
    get modalParms(): HTMLElement { return this._modalParms; }
    get modalParmsScaleArea(): HTMLElement { return this._modalParmsScaleArea; }
    get modalParmsFillingDirectionArea(): HTMLElement { return this._modalParmsFillingDirectionArea; }
    get modalParmsColorSchemeArea(): HTMLElement { return this._modalParmsColorSchemeArea }
    get modalParmsAllColorsArea(): HTMLElement { return this._modalParmsAllColorsArea; }
    //
    get modalParmsX(): HTMLInputElement { return this._modalParmsX; }
    get modalParmsShowRangeX(): HTMLElement { return this._modalParmsShowRangeX; }
    get modalParmsShowValueX(): HTMLElement { return this._modalParmsShowValueX; }
    get modalParmsY(): HTMLInputElement { return this._modalParmsY; }
    get modalParmsShowRangeY(): HTMLElement { return this._modalParmsShowRangeY; }
    get modalParmsShowValueY(): HTMLElement { return this._modalParmsShowValueY; }
    get modalParmsWidth(): HTMLInputElement { return this._modalParmsWidth; }
    get modalParmsShowRangeWidth(): HTMLElement { return this._modalParmsShowRangeWidth; }
    get modalParmsShowValueWidth(): HTMLElement { return this._modalParmsShowValueWidth; }
    get modalParmsHeight(): HTMLInputElement { return this._modalParmsHeight; }
    get modalParmsShowRangeHeight(): HTMLElement { return this._modalParmsShowRangeHeight; }
    get modalParmsShowValueHeight(): HTMLElement { return this._modalParmsShowValueHeight; }
    get modalParmsOneX(): HTMLInputElement { return this._modalParmsOneX; }
    get modalParmsShowRangeOneX(): HTMLElement { return this._modalParmsShowRangeOneX; }
    get modalParmsShowValueOneX(): HTMLElement { return this._modalParmsShowValueOneX; }
    get modalParmsOneY(): HTMLInputElement { return this._modalParmsOneY; }
    get modalParmsShowRangeOneY(): HTMLElement { return this._modalParmsShowRangeOneY; }
    get modalParmsShowValueOneY(): HTMLElement { return this._modalParmsShowValueOneY; }
    get modalParmsOneR(): HTMLInputElement { return this._modalParmsOneR; }
    get modalParmsShowRangeOneR(): HTMLElement { return this._modalParmsShowRangeOneR; }
    get modalParmsShowValueOneR(): HTMLElement { return this._modalParmsShowValueOneR; }
    get modalParmsTwoX(): HTMLInputElement { return this._modalParmsTwoX; }
    get modalParmsShowRangeTwoX(): HTMLElement { return this._modalParmsShowRangeTwoX; }
    get modalParmsShowValueTwoX(): HTMLElement { return this._modalParmsShowValueTwoX; }
    get modalParmsTwoY(): HTMLInputElement { return this._modalParmsTwoY; }
    get modalParmsShowRangeTwoY(): HTMLElement { return this._modalParmsShowRangeTwoY; }
    get modalParmsShowValueTwoY(): HTMLElement { return this._modalParmsShowValueTwoY; }
    get modalParmsTwoR(): HTMLInputElement { return this._modalParmsTwoR; }
    get modalParmsShowRangeTwoR(): HTMLElement { return this._modalParmsShowRangeTwoR; }
    get modalParmsShowValueTwoR(): HTMLElement { return this._modalParmsShowValueTwoR; }
    //
    get modalParmsIsAutoColorScheme(): HTMLInputElement { return this._modalParmsIsAutoColorScheme; }
    get modalParmsIsTrackProportionsAreaRG(): HTMLInputElement { return this._modalParmsIsTrackProportionsAreaRG; }
    get modalParmsIsTranslucentModal(): HTMLInputElement { return this._modalParmsIsTranslucentModal; }
    get modalParmsOK(): HTMLElement { return this._modalParmsOK; }
    //
    get menuSelect(): HTMLElement { return this._menuSelect; }

    // Methods
    static Create(
        settings: HTMLElement,
        overFill: HTMLElement,
        showParms: HTMLElement,
        boxForRGArea: HTMLElement,
        rgArea: HTMLCanvasElement,
        //
        modalParms: HTMLElement,
        modalParmsScaleArea: HTMLElement,
        modalParmsFillingDirectionArea: HTMLElement,
        modalParmsColorSchemeArea: HTMLElement,
        modalParmsAllColorsArea: HTMLElement,
        //
        modalParmsX: HTMLInputElement,
        modalParmsShowRangeX: HTMLElement,
        modalParmsShowValueX: HTMLElement,
        modalParmsY: HTMLInputElement,
        modalParmsShowRangeY: HTMLElement,
        modalParmsShowValueY: HTMLElement,
        modalParmsWidth: HTMLInputElement,
        modalParmsShowRangeWidth: HTMLElement,
        modalParmsShowValueWidth: HTMLElement,
        modalParmsHeight: HTMLInputElement,
        modalParmsShowRangeHeight: HTMLElement,
        modalParmsShowValueHeight: HTMLElement,
        modalParmsOneX: HTMLInputElement,
        modalParmsShowRangeOneX: HTMLElement,
        modalParmsShowValueOneX: HTMLElement,
        modalParmsOneY: HTMLInputElement,
        modalParmsShowRangeOneY: HTMLElement,
        modalParmsShowValueOneY: HTMLElement,
        modalParmsOneR: HTMLInputElement,
        modalParmsShowRangeOneR: HTMLElement,
        modalParmsShowValueOneR: HTMLElement,
        modalParmsTwoX: HTMLInputElement,
        modalParmsShowRangeTwoX: HTMLElement,
        modalParmsShowValueTwoX: HTMLElement,
        modalParmsTwoY: HTMLInputElement,
        modalParmsShowRangeTwoY: HTMLElement,
        modalParmsShowValueTwoY: HTMLElement,
        modalParmsTwoR: HTMLInputElement,
        modalParmsShowRangeTwoR: HTMLElement,
        modalParmsShowValueTwoR: HTMLElement,
        //
        modalParmsIsAutoColorScheme: HTMLInputElement,
        modalParmsIsTrackProportionsAreaRG: HTMLInputElement,
        modalParmsIsTranslucentModal: HTMLInputElement,
        modalParmsOK: HTMLElement,
        //
        menuSelect: HTMLElement
    ): RgDomItems {
        if (!RgDomItems._instance) {
            RgDomItems._instance = new RgDomItems(
                settings,
                overFill,
                showParms,
                boxForRGArea,
                rgArea,
                //
                modalParms,
                modalParmsScaleArea,
                modalParmsFillingDirectionArea,
                modalParmsColorSchemeArea,
                modalParmsAllColorsArea,
                //
                modalParmsX,
                modalParmsShowRangeX,
                modalParmsShowValueX,
                modalParmsY,
                modalParmsShowRangeY,
                modalParmsShowValueY,
                modalParmsWidth,
                modalParmsShowRangeWidth,
                modalParmsShowValueWidth,
                modalParmsHeight,
                modalParmsShowRangeHeight,
                modalParmsShowValueHeight,
                modalParmsOneX,
                modalParmsShowRangeOneX,
                modalParmsShowValueOneX,
                modalParmsOneY,
                modalParmsShowRangeOneY,
                modalParmsShowValueOneY,
                modalParmsOneR,
                modalParmsShowRangeOneR,
                modalParmsShowValueOneR,
                modalParmsTwoX,
                modalParmsShowRangeTwoX,
                modalParmsShowValueTwoX,
                modalParmsTwoY,
                modalParmsShowRangeTwoY,
                modalParmsShowValueTwoY,
                modalParmsTwoR,
                modalParmsShowRangeTwoR,
                modalParmsShowValueTwoR,
                //
                modalParmsIsAutoColorScheme,
                modalParmsIsTrackProportionsAreaRG,
                modalParmsIsTranslucentModal,
                modalParmsOK,
                //
                menuSelect
            );
        }
        return RgDomItems._instance;
    }

    // Helpers

}