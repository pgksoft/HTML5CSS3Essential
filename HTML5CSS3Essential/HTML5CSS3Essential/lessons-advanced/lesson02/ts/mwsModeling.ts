// Multi-System Window Modeling 
// Control
import { isDisplayBlock } from '../../../js-advanced/_pgkUtils'
import {
    CustomEventOverFill,
    CustomEventChangeStatusWaveMotion,
    CustomEventPermissionsIsSelected,
    Params
} from './model/mwsParams';
import { ViewParams } from './view/viewMwsParams';
import { ViewMWS } from '../ts/view/viewMWS'

const IsUndefinedOffScreenCanvas: string = 'OffScreenCanvas is undefined';
const IsDefinedOffScreenCanvas: string = 'OffScreenCanvas is defined';

class Modeling {
    private constructor(
        isUseOffscreenCanvas: HTMLElement,
        settings: HTMLElement,
        manager: HTMLElement,
        redraw: HTMLElement,
        overfill: HTMLElement,
        launch: HTMLElement,
        //
        showParms: HTMLElement,
        //
        mwsmContainer: HTMLElement,
        mwsmArea: HTMLCanvasElement,
        //
        modalParms: HTMLElement,
        modalParmsOK: HTMLElement,
        modalParmsScaleAreaPanel: HTMLElement,
        modalParmsFillTypePanel: HTMLElement,
        modalParmsSelectedItemInfo: HTMLElement,
        modalParmsShowSelectedItemWidthValue: HTMLElement,
        modalParmsSelectedItemWidth: HTMLInputElement,
        modalParmsSelectedItemWidthRange: HTMLElement,
        modalParmsShowSelectedItemHeightValue: HTMLElement,
        modalParmsSelectedItemHeight: HTMLInputElement,
        modalParmsSelectedItemHeightRange: HTMLElement,
        modalParmsShowSelectedItemLengthwaveValue: HTMLElement,
        modalParmsSelectedItemLengthwave: HTMLInputElement,
        modalParmsSelectedItemLengthwaveRange: HTMLElement,
        modalParmsShowSelectedItemAmplitudewaveValue: HTMLElement,
        modalParmsSelectedItemAmplitudewave: HTMLInputElement,
        modalParmsSelectedItemAmplitudewaveRange: HTMLElement,
        modalParmsShowSelectedItemPeriodwaveValue: HTMLElement,
        modalParmsSelectedItemPeriodwave: HTMLInputElement,
        modalParmsSelectedItemPeriodwaveRange: HTMLElement,
        modalParmsShowSelectedItemShadingwaveValue: HTMLElement,
        modalParmsSelectedItemShadingwave: HTMLInputElement,
        modalParmsSelectedItemShadingwaveRange: HTMLElement,
        //
        modalParmsIsOffscreenCanvas: HTMLInputElement,
        modalParmsIsTrackProportionsAreaMotion: HTMLInputElement,
        modalParmsIsTranslucentModal: HTMLInputElement,
        modalParmsSetDefault: HTMLElement,
        //
        mwsmStart: HTMLElement,
        menuStart: HTMLElement,
        mwsmTaskBar: HTMLElement,
        //
        menuSelect: HTMLElement
    ) {
        this._isUseOffscreenCanvas = isUseOffscreenCanvas;
        this._settings = settings;
        this._redraw = redraw;
        this._overfill = overfill;
        this._manager = manager;
        this._launch = launch;
        this._mwsmContainer = mwsmContainer;
        this._mwsmArea = mwsmArea;
        //
        this._showParms = showParms;
        //
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
        //
        this._modalParmsIsOffscreenCanvas = modalParmsIsOffscreenCanvas;
        this._modalParmsIsTrackProportionsAreaMotion = modalParmsIsTrackProportionsAreaMotion;
        this._modalParmsIsTranslucentModal = modalParmsIsTranslucentModal;
        this._modalParmsSetDefault = modalParmsSetDefault;
        //
        this._mwsmStart = mwsmStart;
        this._menuStart = menuStart;
        this._mwsmTaskBar = mwsmTaskBar;
        //
        this._menuSelect = menuSelect;
        //
        this._aspectRatio = this._mwsmContainer.clientWidth / this._mwsmContainer.clientHeight;
        //
        this.DependencyResolutions();
        this.SetEvents();
    }
    // Fields
    private static _instance: Modeling = undefined;
    private _isMotion: boolean = false;
    private readonly _launchStop: string = 'Стоп';
    private readonly _launchStart: string = 'Старт';
    private _aspectRatio: number = 1.5;

    // Fields like DOM elements
    private _isUseOffscreenCanvas: HTMLElement;
    private _settings: HTMLElement;
    private _manager: HTMLElement;
    private _redraw: HTMLElement;
    private _overfill: HTMLElement;
    private _launch: HTMLElement;
    private _mwsmContainer: HTMLElement;
    private _mwsmArea: HTMLCanvasElement;
    //
    private _showParms: HTMLElement;
    //
    private _modalParms: HTMLElement;
    private _modalParmsOK: HTMLElement;
    private _modalParmsScaleAreaPanel: HTMLElement;
    private _modalParmsFillTypePanel: HTMLElement;
    private _modalParmsSelectedItemInfo: HTMLElement;
    private _modalParmsShowSelectedItemWidthValue: HTMLElement;
    private _modalParmsSelectedItemWidth: HTMLInputElement;
    private _modalParmsSelectedItemWidthRange: HTMLElement;
    private _modalParmsShowSelectedItemHeightValue: HTMLElement;
    private _modalParmsSelectedItemHeight: HTMLInputElement;
    private _modalParmsSelectedItemHeightRange: HTMLElement;
    private _modalParmsShowSelectedItemLengthwaveValue: HTMLElement;
    private _modalParmsSelectedItemLengthwave: HTMLInputElement;
    private _modalParmsSelectedItemLengthwaveRange: HTMLElement;
    private _modalParmsShowSelectedItemAmplitudewaveValue: HTMLElement;
    private _modalParmsSelectedItemAmplitudewave: HTMLInputElement;
    private _modalParmsSelectedItemAmplitudewaveRange: HTMLElement;
    private _modalParmsShowSelectedItemPeriodwaveValue: HTMLElement;
    private _modalParmsSelectedItemPeriodwave: HTMLInputElement;
    private _modalParmsSelectedItemPeriodwaveRange: HTMLElement;
    private _modalParmsShowSelectedItemShadingwaveValue: HTMLElement;
    private _modalParmsSelectedItemShadingwave: HTMLInputElement;
    private _modalParmsSelectedItemShadingwaveRange: HTMLElement;
    //
    private _modalParmsIsOffscreenCanvas: HTMLInputElement;
    private _modalParmsIsTrackProportionsAreaMotion: HTMLInputElement;
    private _modalParmsIsTranslucentModal: HTMLInputElement;
    private _modalParmsSetDefault: HTMLElement;
    //
    private _mwsmStart: HTMLElement;
    private _menuStart: HTMLElement;
    private _mwsmTaskBar: HTMLElement;
    //
    private _menuSelect: HTMLElement;

    // Fields: dependencies
    private _parms: Params = Params.instance;
    private _viewMWS: ViewMWS;
    private _viewParams: ViewParams;

    // Properties
    static get instance(): Modeling {
        if (!Modeling._instance) {
            throw new Error('Instance of Simulation was not created.');
        }
        return Modeling._instance;
    }

    // Methods
    static Create(
        isUseOffscreenCanvas: HTMLElement,
        settings: HTMLElement,
        manager: HTMLElement,
        redraw: HTMLElement,
        overfill: HTMLElement,
        launch: HTMLElement,
        //
        showParms: HTMLElement,
        //
        mwsmContainer: HTMLElement,
        mwsmArea: HTMLCanvasElement,
        //
        modalParms: HTMLElement,
        modalParmsOK: HTMLElement,
        modalParmsScaleAreaPanel: HTMLElement,
        modalParmsFillTypePanel: HTMLElement,
        modalParmsSelectedItemInfo: HTMLElement,
        modalParmsShowSelectedItemWidthValue: HTMLElement,
        modalParmsSelectedItemWidth: HTMLInputElement,
        modalParmsSelectedItemWidthRange: HTMLElement,
        modalParmsShowSelectedItemHeightValue: HTMLElement,
        modalParmsSelectedItemHeight: HTMLInputElement,
        modalParmsSelectedItemHeightRange: HTMLElement,
        modalParmsShowSelectedItemLengthwaveValue: HTMLElement,
        modalParmsSelectedItemLengthwave: HTMLInputElement,
        modalParmsSelectedItemLengthwaveRange: HTMLElement,
        modalParmsShowSelectedItemAmplitudewaveValue: HTMLElement,
        modalParmsSelectedItemAmplitudewave: HTMLInputElement,
        modalParmsSelectedItemAmplitudewaveRange: HTMLElement,
        modalParmsShowSelectedItemPeriodwaveValue: HTMLElement,
        modalParmsSelectedItemPeriodwave: HTMLInputElement,
        modalParmsSelectedItemPeriodwaveRange: HTMLElement,
        modalParmsShowSelectedItemShadingwaveValue: HTMLElement,
        modalParmsSelectedItemShadingwave: HTMLInputElement,
        modalParmsSelectedItemShadingwaveRange: HTMLElement,
        //
        modalParmsIsOffscreenCanvas: HTMLInputElement,
        modalParmsIsTrackProportionsAreaMotion: HTMLInputElement,
        modalParmsIsTranslucentModal: HTMLInputElement,
        modalParmsSetDefault: HTMLElement,
        //
        mwsmStart: HTMLElement,
        menuStart: HTMLElement,
        mwsmTaskBar: HTMLElement,
        //
        menuSelect: HTMLElement
    ): Modeling {
        if (!Modeling._instance) {
            Modeling._instance = new Modeling(
                isUseOffscreenCanvas,
                settings,
                manager,
                redraw,
                overfill,
                launch,
                //
                showParms,
                //
                mwsmContainer,
                mwsmArea,
                //
                modalParms,
                modalParmsOK,
                modalParmsScaleAreaPanel,
                modalParmsFillTypePanel,
                modalParmsSelectedItemInfo,
                modalParmsShowSelectedItemWidthValue,
                modalParmsSelectedItemWidth,
                modalParmsSelectedItemWidthRange,
                modalParmsShowSelectedItemHeightValue,
                modalParmsSelectedItemHeight,
                modalParmsSelectedItemHeightRange,
                modalParmsShowSelectedItemLengthwaveValue,
                modalParmsSelectedItemLengthwave,
                modalParmsSelectedItemLengthwaveRange,
                modalParmsShowSelectedItemAmplitudewaveValue,
                modalParmsSelectedItemAmplitudewave,
                modalParmsSelectedItemAmplitudewaveRange,
                modalParmsShowSelectedItemPeriodwaveValue,
                modalParmsSelectedItemPeriodwave,
                modalParmsSelectedItemPeriodwaveRange,
                modalParmsShowSelectedItemShadingwaveValue,
                modalParmsSelectedItemShadingwave,
                modalParmsSelectedItemShadingwaveRange,
                //
                modalParmsIsOffscreenCanvas,
                modalParmsIsTrackProportionsAreaMotion,
                modalParmsIsTranslucentModal,
                modalParmsSetDefault,
                //
                mwsmStart,
                menuStart,
                mwsmTaskBar,
                //
                menuSelect
            );
        }
        return Modeling.instance;
    }

    // Helpers
    private DependencyResolutions(): void {
        this._viewParams = ViewParams.Create(
            this._parms,
            //
            this._showParms,
            //
            this._modalParms,
            this._modalParmsOK,
            this._modalParmsScaleAreaPanel,
            this._modalParmsFillTypePanel,
            this._modalParmsSelectedItemInfo,
            this._modalParmsShowSelectedItemWidthValue,
            this._modalParmsSelectedItemWidth,
            this._modalParmsSelectedItemWidthRange,
            this._modalParmsShowSelectedItemHeightValue,
            this._modalParmsSelectedItemHeight,
            this._modalParmsSelectedItemHeightRange,
            this._modalParmsShowSelectedItemLengthwaveValue,
            this._modalParmsSelectedItemLengthwave,
            this._modalParmsSelectedItemLengthwaveRange,
            this._modalParmsShowSelectedItemAmplitudewaveValue,
            this._modalParmsSelectedItemAmplitudewave,
            this._modalParmsSelectedItemAmplitudewaveRange,
            this._modalParmsShowSelectedItemPeriodwaveValue,
            this._modalParmsSelectedItemPeriodwave,
            this._modalParmsSelectedItemPeriodwaveRange,
            this._modalParmsShowSelectedItemShadingwaveValue,
            this._modalParmsSelectedItemShadingwave,
            this._modalParmsSelectedItemShadingwaveRange,
            //
            this._modalParmsIsOffscreenCanvas,
            this._modalParmsIsTrackProportionsAreaMotion,
            this._modalParmsIsTranslucentModal,
            this._modalParmsSetDefault,
            //
            this._menuSelect
        );
        //
        this._viewMWS = ViewMWS.Create(
            this._mwsmArea,
            this._mwsmStart,
            this._menuStart,
            this._mwsmTaskBar
        );
    }

    private SetEvents(): void {
        window.addEventListener('resize', () => { this.OnWindowResize(); }, false);
        document.body.addEventListener('keydown', (e: KeyboardEvent) => { this.ListeningToKeystrokes(e); }, false);
        this._menuSelect.addEventListener('mouseleave', () => { if (isDisplayBlock(this._menuSelect)) this.DisableMenuSelect(); }, false);
        this._menuStart.addEventListener('mouseleave', () => { if (isDisplayBlock(this._menuStart)) this.DisableMenuStart(); }, false);
        //
        this._settings.addEventListener('click', () => { this.DefineSettings(); }, false);
        this._redraw.addEventListener('click', () => { this._viewMWS.Redraw(); }, false);
        this._launch.addEventListener('click', () => { this.SwitchStatusLaunch(); }, false);
        //
        // Custom Events
        this._overfill.addEventListener('click', () => { document.dispatchEvent(new CustomEvent(CustomEventOverFill, { bubbles: true })); }, false);
        document.addEventListener(CustomEventPermissionsIsSelected, (e: CustomEvent) => { this.PermissionsIsSelected(e); }, false);
    }

    private OnWindowResize(): void {
        if (this._parms.isTrackProportionsAreaMotion) {
            this._mwsmContainer.style.height = `${Math.floor(this._mwsmContainer.clientWidth / this._aspectRatio)}px`;
        }
    }

    private ListeningToKeystrokes(e: KeyboardEvent): void {
        if (e.charCode === 0) {
            switch (e.keyCode) {
                case 27:
                    for (let modal of document.getElementsByClassName('w3-modal')) {
                        if (isDisplayBlock(<HTMLElement>modal)) (<HTMLElement>modal).style.display = 'none';
                    };
                    if (isDisplayBlock(this._menuSelect)) this.DisableMenuSelect();
                    if (isDisplayBlock(this._menuStart)) this.DisableMenuStart();
                    break;
                default:
                    break;
            }
        }
    }

    private DefineSettings(): void {
        this._viewParams.Open();
    }

    private SwitchStatusLaunch(): void {
        this._isMotion = !this._isMotion;
        this.SetStateLaunch(this._isMotion);
        document.dispatchEvent(new CustomEvent(CustomEventChangeStatusWaveMotion, { bubbles: true, detail: { value: this._isMotion } }));
    }

    private DisableMenuSelect(): void {
        this._menuSelect.dataset.type = 'empty';
        this._menuSelect.style.display = 'none';
    }

    private DisableMenuStart(): void {
        this._menuStart.dataset.type = 'empty';
        this._menuStart.dataset.display = 'false';
    }

    private PermissionsIsSelected(e: CustomEvent): void {
        this.SetStateLaunch(e.detail.isAnimate);
        this._isMotion = e.detail.isAnimate;
    }

    private SetStateLaunch(isMotion: boolean): void {
        if (isMotion) {
            this._launch.innerHTML = `<span>${this._launchStop}</span>`;
            this._launch.dataset.simulation = 'isMotion';
        } else {
            this._launch.innerHTML = `<span>${this._launchStart}</span>`;
            this._launch.dataset.simulation = 'isStop';
        }
    }
}

Modeling.Create(
    document.getElementById('is-use-off-screen-canvas'),
    document.getElementById('settings'),
    document.getElementById('window-manager'),
    document.getElementById('redraw'),
    document.getElementById('overfill'),
    document.getElementById('launch'),
    //
    document.getElementById('parms-show'),
    //
    document.getElementById('mwsm-container'),
    <HTMLCanvasElement>document.getElementById('mwsm-area'),
    //
    document.getElementById('parms-modal'),
    document.getElementById('parmsOK'),
    document.getElementById('parms-scale-area-panel'),
    document.getElementById('parms-fill-type-panel'),
    document.getElementById('selected-item-info'),
    document.getElementById('show-selected-item-width-value'),
    <HTMLInputElement>document.getElementById('parms-selected-item-width'),
    document.getElementById('show-selected-item-width-range'),
    document.getElementById('show-selected-item-height-value'),
    <HTMLInputElement>document.getElementById('parms-selected-item-height'),
    document.getElementById('show-selected-item-height-range'),
    document.getElementById('show-selected-item-lengthwave-value'),
    <HTMLInputElement>document.getElementById('parms-selected-item-lengthwave'),
    document.getElementById('show-selected-item-lengthwave-range'),
    document.getElementById('show-selected-item-amplitudewave-value'),
    <HTMLInputElement>document.getElementById('parms-selected-item-amplitudewave'),
    document.getElementById('show-selected-item-amplitudewave-range'),
    document.getElementById('show-selected-item-periodwave-value'),
    <HTMLInputElement>document.getElementById('parms-selected-item-periodwave'),
    document.getElementById('show-selected-item-periodwave-range'),
    document.getElementById('show-selected-item-shading-value'),
    <HTMLInputElement>document.getElementById('parms-selected-item-shading'),
    document.getElementById('show-selected-item-shadingwave-range'),
    //
    <HTMLInputElement>document.getElementById('is-off-screen-canvas'),
    <HTMLInputElement>document.getElementById('is-track-proportions-area-motion'),
    <HTMLInputElement>document.getElementById('is-translucent-modal'),
    document.getElementById('set-default-parms'),
    //
    document.getElementById('mwsm-start'),
    document.getElementById('menu-start'),
    document.getElementById('mwsm-task-bar'),
    //
    document.getElementById('menu-select'),
);