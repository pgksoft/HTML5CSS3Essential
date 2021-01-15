import { isDisplayBlock } from '../../../js-advanced/_pgkUtils.js';
import { CustomEventOverFill, Params } from './model/mwsParams.js';
import { ViewParams } from './view/viewMwsParams.js';
import { ViewMWS } from '../ts/view/viewMWS.js';
const IsUndefinedOffScreenCanvas = 'OffScreenCanvas is undefined';
const IsDefinedOffScreenCanvas = 'OffScreenCanvas is defined';
class Modeling {
    constructor(isUseOffscreenCanvas, settings, manager, redraw, overfill, launch, showParms, mwsmContainer, mwsmArea, modalParms, modalParmsOK, modalParmsScaleAreaPanel, modalParmsFillTypePanel, modalParmsSelectedItemInfo, modalParmsShowSelectedItemWidthValue, modalParmsSelectedItemWidth, modalParmsSelectedItemWidthRange, modalParmsShowSelectedItemHeightValue, modalParmsSelectedItemHeight, modalParmsSelectedItemHeightRange, modalParmsShowSelectedItemLengthwaveValue, modalParmsSelectedItemLengthwave, modalParmsSelectedItemLengthwaveRange, modalParmsShowSelectedItemAmplitudewaveValue, modalParmsSelectedItemAmplitudewave, modalParmsSelectedItemAmplitudewaveRange, modalParmsShowSelectedItemPeriodwaveValue, modalParmsSelectedItemPeriodwave, modalParmsSelectedItemPeriodwaveRange, modalParmsShowSelectedItemShadingwaveValue, modalParmsSelectedItemShadingwave, modalParmsSelectedItemShadingwaveRange, modalParmsIsOffscreenCanvas, modalParmsIsTrackProportionsAreaMotion, modalParmsIsTranslucentModal, modalParmsSetDefault, mwsmStart, menuStart, mwsmTaskBar, menuSelect) {
        this._isMotion = false;
        this._launchStop = 'Стоп';
        this._launchStart = 'Старт';
        this._aspectRatio = 1.5;
        this._parms = Params.instance;
        this._isUseOffscreenCanvas = isUseOffscreenCanvas;
        this._settings = settings;
        this._redraw = redraw;
        this._overfill = overfill;
        this._manager = manager;
        this._launch = launch;
        this._mwsmContainer = mwsmContainer;
        this._mwsmArea = mwsmArea;
        this._showParms = showParms;
        this._modalParms = modalParms;
        this._modalParmsOK = modalParmsOK;
        this._modalParmsScaleAreaPanel = modalParmsScaleAreaPanel;
        this._modalParmsFillTypePanel = modalParmsFillTypePanel;
        this._modalParmsSelectedItemInfo = modalParmsSelectedItemInfo;
        this._modalParmsShowSelectedItemWidthValue = modalParmsShowSelectedItemWidthValue;
        this._modalParmsSelectedItemWidth = modalParmsSelectedItemWidth;
        this._modalParmsSelectedItemWidthRange = modalParmsSelectedItemWidthRange;
        this._modalParmsShowSelectedItemHeightValue = modalParmsShowSelectedItemHeightValue;
        this._modalParmsSelectedItemHeight = modalParmsSelectedItemHeight;
        this._modalParmsSelectedItemHeightRange = modalParmsSelectedItemHeightRange;
        this._modalParmsShowSelectedItemLengthwaveValue = modalParmsShowSelectedItemLengthwaveValue;
        this._modalParmsSelectedItemLengthwave = modalParmsSelectedItemLengthwave;
        this._modalParmsSelectedItemLengthwaveRange = modalParmsSelectedItemLengthwaveRange;
        this._modalParmsShowSelectedItemAmplitudewaveValue = modalParmsShowSelectedItemAmplitudewaveValue;
        this._modalParmsSelectedItemAmplitudewave = modalParmsSelectedItemAmplitudewave;
        this._modalParmsSelectedItemAmplitudewaveRange = modalParmsSelectedItemAmplitudewaveRange;
        this._modalParmsShowSelectedItemPeriodwaveValue = modalParmsShowSelectedItemPeriodwaveValue;
        this._modalParmsSelectedItemPeriodwave = modalParmsSelectedItemPeriodwave;
        this._modalParmsSelectedItemPeriodwaveRange = modalParmsSelectedItemPeriodwaveRange;
        this._modalParmsShowSelectedItemShadingwaveValue = modalParmsShowSelectedItemShadingwaveValue;
        this._modalParmsSelectedItemShadingwave = modalParmsSelectedItemShadingwave;
        this._modalParmsSelectedItemShadingwaveRange = modalParmsSelectedItemShadingwaveRange;
        this._modalParmsIsOffscreenCanvas = modalParmsIsOffscreenCanvas;
        this._modalParmsIsTrackProportionsAreaMotion = modalParmsIsTrackProportionsAreaMotion;
        this._modalParmsIsTranslucentModal = modalParmsIsTranslucentModal;
        this._modalParmsSetDefault = modalParmsSetDefault;
        this._mwsmStart = mwsmStart;
        this._menuStart = menuStart;
        this._mwsmTaskBar = mwsmTaskBar;
        this._menuSelect = menuSelect;
        this._aspectRatio = this._mwsmContainer.clientWidth / this._mwsmContainer.clientHeight;
        this.DependencyResolutions();
        this.SetEvents();
    }
    static get instance() {
        if (!Modeling._instance) {
            throw new Error('Instance of Simulation was not created.');
        }
        return Modeling._instance;
    }
    static Create(isUseOffscreenCanvas, settings, manager, redraw, overfill, launch, showParms, mwsmContainer, mwsmArea, modalParms, modalParmsOK, modalParmsScaleAreaPanel, modalParmsFillTypePanel, modalParmsSelectedItemInfo, modalParmsShowSelectedItemWidthValue, modalParmsSelectedItemWidth, modalParmsSelectedItemWidthRange, modalParmsShowSelectedItemHeightValue, modalParmsSelectedItemHeight, modalParmsSelectedItemHeightRange, modalParmsShowSelectedItemLengthwaveValue, modalParmsSelectedItemLengthwave, modalParmsSelectedItemLengthwaveRange, modalParmsShowSelectedItemAmplitudewaveValue, modalParmsSelectedItemAmplitudewave, modalParmsSelectedItemAmplitudewaveRange, modalParmsShowSelectedItemPeriodwaveValue, modalParmsSelectedItemPeriodwave, modalParmsSelectedItemPeriodwaveRange, modalParmsShowSelectedItemShadingwaveValue, modalParmsSelectedItemShadingwave, modalParmsSelectedItemShadingwaveRange, modalParmsIsOffscreenCanvas, modalParmsIsTrackProportionsAreaMotion, modalParmsIsTranslucentModal, modalParmsSetDefault, mwsmStart, menuStart, mwsmTaskBar, menuSelect) {
        if (!Modeling._instance) {
            Modeling._instance = new Modeling(isUseOffscreenCanvas, settings, manager, redraw, overfill, launch, showParms, mwsmContainer, mwsmArea, modalParms, modalParmsOK, modalParmsScaleAreaPanel, modalParmsFillTypePanel, modalParmsSelectedItemInfo, modalParmsShowSelectedItemWidthValue, modalParmsSelectedItemWidth, modalParmsSelectedItemWidthRange, modalParmsShowSelectedItemHeightValue, modalParmsSelectedItemHeight, modalParmsSelectedItemHeightRange, modalParmsShowSelectedItemLengthwaveValue, modalParmsSelectedItemLengthwave, modalParmsSelectedItemLengthwaveRange, modalParmsShowSelectedItemAmplitudewaveValue, modalParmsSelectedItemAmplitudewave, modalParmsSelectedItemAmplitudewaveRange, modalParmsShowSelectedItemPeriodwaveValue, modalParmsSelectedItemPeriodwave, modalParmsSelectedItemPeriodwaveRange, modalParmsShowSelectedItemShadingwaveValue, modalParmsSelectedItemShadingwave, modalParmsSelectedItemShadingwaveRange, modalParmsIsOffscreenCanvas, modalParmsIsTrackProportionsAreaMotion, modalParmsIsTranslucentModal, modalParmsSetDefault, mwsmStart, menuStart, mwsmTaskBar, menuSelect);
        }
        return Modeling.instance;
    }
    DependencyResolutions() {
        this._viewMWS = ViewMWS.Create(this._mwsmArea, this._mwsmStart, this._menuStart, this._mwsmTaskBar);
        this._viewParams = ViewParams.Create(this._parms, this._showParms, this._modalParms, this._modalParmsOK, this._modalParmsScaleAreaPanel, this._modalParmsFillTypePanel, this._modalParmsSelectedItemInfo, this._modalParmsShowSelectedItemWidthValue, this._modalParmsSelectedItemWidth, this._modalParmsSelectedItemWidthRange, this._modalParmsShowSelectedItemHeightValue, this._modalParmsSelectedItemHeight, this._modalParmsSelectedItemHeightRange, this._modalParmsShowSelectedItemLengthwaveValue, this._modalParmsSelectedItemLengthwave, this._modalParmsSelectedItemLengthwaveRange, this._modalParmsShowSelectedItemAmplitudewaveValue, this._modalParmsSelectedItemAmplitudewave, this._modalParmsSelectedItemAmplitudewaveRange, this._modalParmsShowSelectedItemPeriodwaveValue, this._modalParmsSelectedItemPeriodwave, this._modalParmsSelectedItemPeriodwaveRange, this._modalParmsShowSelectedItemShadingwaveValue, this._modalParmsSelectedItemShadingwave, this._modalParmsSelectedItemShadingwaveRange, this._modalParmsIsOffscreenCanvas, this._modalParmsIsTrackProportionsAreaMotion, this._modalParmsIsTranslucentModal, this._modalParmsSetDefault, this._menuSelect);
    }
    SetEvents() {
        window.addEventListener('resize', () => { this.OnWindowResize(); }, false);
        document.body.addEventListener('keydown', (e) => { this.ListeningToKeystrokes(e); }, false);
        this._menuSelect.addEventListener('mouseleave', () => { if (isDisplayBlock(this._menuSelect))
            this.DisableMenuSelect(); }, false);
        this._menuStart.addEventListener('mouseleave', () => { if (isDisplayBlock(this._menuStart))
            this.DisableMenuStart(); }, false);
        this._settings.addEventListener('click', () => { this.DefineSettings(); }, false);
        this._redraw.addEventListener('click', () => { this._viewMWS.Redraw(); }, false);
        this._overfill.addEventListener('click', () => { document.dispatchEvent(new CustomEvent(CustomEventOverFill, { bubbles: true })); }, false);
    }
    OnWindowResize() {
        if (this._parms.isTrackProportionsAreaMotion) {
            this._mwsmContainer.style.height = `${Math.floor(this._mwsmContainer.clientWidth / this._aspectRatio)}px`;
        }
    }
    ListeningToKeystrokes(e) {
        if (e.charCode === 0) {
            switch (e.keyCode) {
                case 27:
                    for (let modal of document.getElementsByClassName('w3-modal')) {
                        if (isDisplayBlock(modal))
                            modal.style.display = 'none';
                    }
                    ;
                    if (isDisplayBlock(this._menuSelect))
                        this.DisableMenuSelect();
                    if (isDisplayBlock(this._menuStart))
                        this.DisableMenuStart();
                    break;
                default:
                    break;
            }
        }
    }
    DefineSettings() {
        this._viewParams.Open();
    }
    DisableMenuSelect() {
        this._menuSelect.dataset.type = 'empty';
        this._menuSelect.style.display = 'none';
    }
    DisableMenuStart() {
        this._menuStart.dataset.type = 'empty';
        this._menuStart.dataset.display = 'false';
    }
}
Modeling._instance = undefined;
Modeling.Create(document.getElementById('is-use-off-screen-canvas'), document.getElementById('settings'), document.getElementById('window-manager'), document.getElementById('redraw'), document.getElementById('overfill'), document.getElementById('launch'), document.getElementById('parms-show'), document.getElementById('mwsm-container'), document.getElementById('mwsm-area'), document.getElementById('parms-modal'), document.getElementById('parmsOK'), document.getElementById('parms-scale-area-panel'), document.getElementById('parms-fill-type-panel'), document.getElementById('selected-item-info'), document.getElementById('show-selected-item-width-value'), document.getElementById('parms-selected-item-width'), document.getElementById('show-selected-item-width-range'), document.getElementById('show-selected-item-height-value'), document.getElementById('parms-selected-item-height'), document.getElementById('show-selected-item-height-range'), document.getElementById('show-selected-item-lengthwave-value'), document.getElementById('parms-selected-item-lengthwave'), document.getElementById('show-selected-item-lengthwave-range'), document.getElementById('show-selected-item-amplitudewave-value'), document.getElementById('parms-selected-item-amplitudewave'), document.getElementById('show-selected-item-amplitudewave-range'), document.getElementById('show-selected-item-periodwave-value'), document.getElementById('parms-selected-item-periodwave'), document.getElementById('show-selected-item-periodwave-range'), document.getElementById('show-selected-item-shading-value'), document.getElementById('parms-selected-item-shading'), document.getElementById('show-selected-item-shadingwave-range'), document.getElementById('is-off-screen-canvas'), document.getElementById('is-track-proportions-area-motion'), document.getElementById('is-translucent-modal'), document.getElementById('set-default-parms'), document.getElementById('mwsm-start'), document.getElementById('menu-start'), document.getElementById('mwsm-task-bar'), document.getElementById('menu-select'));
//# sourceMappingURL=mwsModeling.js.map