import { isDisplayBlock, Confirm } from '../../../js-advanced/_pgkUtils.js'
import { CheckOffscreenCanvas } from '../../../js-advanced/pgkToTSUtils.js'
import {
    Params,
    ParmsDefinition,
    NameEventChangeStatusBrownianMotion,
    NameEventStepByStepBrownianMotion
} from './bmParams.js'
import { ViewBrownianMotion } from '../ts/view/viewBrownianMotion.js'
const IsUndefinedOffScreenCanvas: string = 'OffScreenCanvas is undefined';
const IsDefinedOffScreenCanvas: string = 'OffScreenCanvas is defined';

class Simulation {

    private constructor(
        isUseOffscreenCanvas: HTMLElement,
        settings: HTMLElement,
        redraw: HTMLElement,
        stepByStep: HTMLElement,
        launch: HTMLElement,
        boxForAreaOfMotion: HTMLElement,
        brownianMotionArea: HTMLCanvasElement,
        //
        modalConfirm: HTMLElement,
        modalConfirmYes: HTMLElement,
        modalConfirmNo: HTMLElement,
        confirmHeader: HTMLElement,
        confirmAbout: HTMLElement,
        //
        showParms: HTMLElement,
        modalParms: HTMLElement,
        modalParmsSpeedPanel: HTMLElement,
        modalParmsShowAmountValue: HTMLLabelElement,
        modalParmsAmount: HTMLInputElement,
        modalParmsElementKindPanel: HTMLElement,
        modalParmsFillTypePanel: HTMLElement,
        modalParmsShowSizeValue: HTMLElement,
        modalParmsSize: HTMLInputElement,
        modalParmsShowPathFromValue: HTMLElement,
        modalParmsPathFrom: HTMLInputElement,
        modalParmsShowPathToValue: HTMLElement,
        modalParmsPathTo: HTMLInputElement,
        modalParmsScaleArea: HTMLElement,
        modalParmsIsOffscreenCanvas: HTMLInputElement,
        modalParmsIsTrackProportionsAreaMotion: HTMLInputElement,
        modalParmsIsTranslucentModal: HTMLInputElement,
        modalParmsSetDefault: HTMLElement,
        modalParmsOK: HTMLElement,
        //
        menuSelect: HTMLElement
    ) {
        this._isUseOffscreenCanvas = isUseOffscreenCanvas;
        this._settings = settings;
        this._redraw = redraw;
        this._stepByStep = stepByStep;
        this._launch = launch;
        this._boxForAreaOfMotion = boxForAreaOfMotion;
        this._brownianMotionArea = brownianMotionArea;
        //
        this._modalConfirm = modalConfirm;
        this._modalConfirmYes = modalConfirmYes;
        this._modalConfirmNo = modalConfirmNo;
        this._confirmHeader = confirmHeader;
        this._confirmAbout = confirmAbout;
        //
        this._showParms = showParms;
        this._modalParms = modalParms;
        this._modalParmsSpeedPanel = modalParmsSpeedPanel;
        this._modalParmsShowAmountValue = modalParmsShowAmountValue;
        this._modalParmsAmount = modalParmsAmount;
        this._modalParmsElementKindPanel = modalParmsElementKindPanel;
        this._modalParmsFillTypePanel = modalParmsFillTypePanel;
        this._modalParmsShowSizeValue = modalParmsShowSizeValue;
        this._modalParmsSize = modalParmsSize;
        this._modalParmsShowPathFromValue = modalParmsShowPathFromValue;
        this._modalParmsPathFrom = modalParmsPathFrom;
        this._modalParmsShowPathToValue = modalParmsShowPathToValue;
        this._modalParmsPathTo = modalParmsPathTo;
        this._modalParmsScaleArea = modalParmsScaleArea;
        this._modalParmsIsOffscreenCanvas = modalParmsIsOffscreenCanvas;
        this._modalParmsIsTrackProportionsAreaMotion = modalParmsIsTrackProportionsAreaMotion;
        this._modalParmsIsTranslucentModal = modalParmsIsTranslucentModal;
        this._modalParmsSetDefault = modalParmsSetDefault;
        this._modalParmsOK = modalParmsOK;
        //
        this._menuSelect = menuSelect;
        //
        this._aspectRatio = this._boxForAreaOfMotion.clientWidth / this._boxForAreaOfMotion.clientHeight;
        //this._brownianMotionArea.width = 1200;
        //this._brownianMotionArea.height = 600;
        this.DependencyResolutions();
        this.SetEvents();
        //
        this.EnambelLog();
        //
        this.IsDefinedOffScreenCanvas();
    }

    // Fields
    private static _instance: Simulation = undefined;
    private _isMotion: boolean = false;
    private readonly _launchStop: string = 'Стоп';
    private readonly _launchStart: string = 'Старт';
    private _aspectRatio: number = 1.5;
    private _bmView: ViewBrownianMotion;

    // Fields like DOM elements
    private _isUseOffscreenCanvas: HTMLElement;
    private _settings: HTMLElement;
    private _redraw: HTMLElement;
    private _stepByStep: HTMLElement;
    private _launch: HTMLElement;
    private _boxForAreaOfMotion: HTMLElement;
    private _brownianMotionArea: HTMLCanvasElement;
    //
    private _modalConfirm: HTMLElement;
    private _modalConfirmYes: HTMLElement;
    private _modalConfirmNo: HTMLElement;
    private _confirmHeader: HTMLElement;
    private _confirmAbout: HTMLElement;
    //
    private _showParms: HTMLElement;
    private _modalParms: HTMLElement;
    private _modalParmsSpeedPanel: HTMLElement;
    private _modalParmsShowAmountValue: HTMLLabelElement;
    private _modalParmsAmount: HTMLInputElement;
    private _modalParmsElementKindPanel: HTMLElement;
    private _modalParmsFillTypePanel: HTMLElement;
    private _modalParmsShowSizeValue: HTMLElement;
    private _modalParmsSize: HTMLInputElement;
    private _modalParmsShowPathFromValue: HTMLElement;
    private _modalParmsPathFrom: HTMLInputElement;
    private _modalParmsShowPathToValue: HTMLElement;
    private _modalParmsPathTo: HTMLInputElement;
    private _modalParmsScaleArea: HTMLElement;
    private _modalParmsIsOffscreenCanvas: HTMLInputElement;
    private _modalParmsIsTrackProportionsAreaMotion: HTMLInputElement;
    private _modalParmsIsTranslucentModal: HTMLInputElement;
    private _modalParmsSetDefault: HTMLElement;
    private _modalParmsOK: HTMLElement;
    //
    private _menuSelect: HTMLElement;

    // Fields: dependencies
    private _parms: Params = Params.instance;
    private _parmsDefinition: ParmsDefinition;

    // Properties
    static get instance(): Simulation {
        if (!Simulation._instance) {
            throw new Error('Instance of Simulation was not created.');
        }
        return Simulation._instance;
    }

    // Methods
    static Create(
        isUseOffscreenCanvas: HTMLElement,
        settings: HTMLElement,
        redraw: HTMLElement,
        stepByStep: HTMLElement,
        launch: HTMLElement,
        boxForAreaOfMotion: HTMLElement,
        brownianMotionArea: HTMLCanvasElement,
        //
        modalConfirm: HTMLElement,
        modalConfirmYes: HTMLElement,
        modalConfirmNo: HTMLElement,
        confirmHeader: HTMLElement,
        confirmAbout: HTMLElement,
        //
        showParms: HTMLElement,
        modalParms: HTMLElement,
        modalParmsSpeedPanel: HTMLElement,
        modalParmsShowAmountValue: HTMLLabelElement,
        modalParmsAmount: HTMLInputElement,
        modalParmsElementKindPanel: HTMLElement,
        modalParmsFillTypePanel: HTMLElement,
        modalParmsShowSizeValue: HTMLElement,
        modalParmsSize: HTMLInputElement,
        modalParmsShowPathFromValue: HTMLElement,
        modalParmsPathFrom: HTMLInputElement,
        modalParmsShowPathToValue: HTMLElement,
        modalParmsPathTo: HTMLInputElement,
        modalParmsScaleArea: HTMLElement,
        madalParmsIsOffscreenCanvas: HTMLInputElement,
        modalParmsIsTrackProportionsAreaMotion: HTMLInputElement,
        modalParmsIsTranslucentModal: HTMLInputElement,
        modalParmsSetDefault: HTMLElement,
        modalParmsOK: HTMLElement,
        //
        menuSelect: HTMLElement
    ): Simulation {
        if (!Simulation._instance) {
            Simulation._instance = new Simulation(
                isUseOffscreenCanvas,
                settings,
                redraw,
                stepByStep,
                launch,
                boxForAreaOfMotion,
                brownianMotionArea,
                //
                modalConfirm,
                modalConfirmYes,
                modalConfirmNo,
                confirmHeader,
                confirmAbout,
                //
                showParms,
                modalParms,
                modalParmsSpeedPanel,
                modalParmsShowAmountValue,
                modalParmsAmount,
                modalParmsElementKindPanel,
                modalParmsFillTypePanel,
                modalParmsShowSizeValue,
                modalParmsSize,
                modalParmsShowPathFromValue,
                modalParmsPathFrom,
                modalParmsShowPathToValue,
                modalParmsPathTo,
                modalParmsScaleArea,
                madalParmsIsOffscreenCanvas,
                modalParmsIsTrackProportionsAreaMotion,
                modalParmsIsTranslucentModal,
                modalParmsSetDefault,
                modalParmsOK,
                //
                menuSelect
            );
        }
        return Simulation._instance;
    }

    // Helpers
    private DependencyResolutions(): void {
        Confirm.Create(
            this._modalConfirm,
            this._confirmHeader,
            this._confirmAbout,
            this._modalConfirmYes,
            this._modalConfirmNo
        );
        this._parmsDefinition = ParmsDefinition.Create(
            this._parms,
            //
            this._showParms,
            this._modalParms,
            this._modalParmsSpeedPanel,
            this._modalParmsShowAmountValue,
            this._modalParmsAmount,
            this._modalParmsElementKindPanel,
            this._modalParmsFillTypePanel,
            this._modalParmsShowSizeValue,
            this._modalParmsSize,
            this._modalParmsShowPathFromValue,
            this._modalParmsPathFrom,
            this._modalParmsShowPathToValue,
            this._modalParmsPathTo,
            this._modalParmsScaleArea,
            this._modalParmsIsOffscreenCanvas,
            this._modalParmsIsTrackProportionsAreaMotion,
            this._modalParmsIsTranslucentModal,
            this._modalParmsSetDefault,
            this._modalParmsOK,
            //
            this._menuSelect
        );
        this._bmView = ViewBrownianMotion.Create(
            this._brownianMotionArea
        );
    }

    private SetEvents(): void {
        window.addEventListener('resize', () => { this.OnWindowResize(); }, false);
        document.body.addEventListener('keydown', (e: KeyboardEvent) => { this.ListeningToKeystrokes(e); }, false);
        //
        this._settings.addEventListener('click', () => { this.DefineSettings(); }, false);
        this._redraw.addEventListener('click', () => { this._bmView.Redraw(); }, false);
        this._stepByStep.addEventListener('click', () => { document.dispatchEvent(new CustomEvent(NameEventStepByStepBrownianMotion, { bubbles: true })); }, false);
        this._launch.addEventListener('click', () => { this.SwitchStatusLaunch(); }, false);
        // User Events of Params
        document.addEventListener(this._parms.nameEventIsTranslucent, (e: CustomEvent) => { this.OnIsTranslucentModal(e); }, false);
        document.addEventListener(this._parms.nameEventAmountChange, () => { this.EnambelLog(); }, false);
        document.addEventListener(this._parms.nameEventIsOffScreenCanvas, () => { this.OnIsOffscreenCanvas(); }, false);
        //
        this._menuSelect.addEventListener('mouseleave', () => { if (isDisplayBlock(this._menuSelect)) this._menuSelect.style.display = 'none'; }, false);
    }

    private DefineSettings(): void {
        this._parmsDefinition.Open();
    }

    private SwitchStatusLaunch(): void {
        if (!this._isMotion) {
            this._launch.innerHTML = `<span>${this._launchStop}</span>`;
            this._launch.dataset.simulation = 'isMotion';
        } else {
            this._launch.innerHTML = `<span>${this._launchStart}</span>`;
            this._launch.dataset.simulation = 'isStop';
        }
        this._isMotion = !this._isMotion;
        document.dispatchEvent(new CustomEvent(NameEventChangeStatusBrownianMotion, { bubbles: true, detail: { value: this._isMotion } }));
    }

    private OnWindowResize(): void {
        if (this._parms.isTrackProportionsAreaMotion) {
            this._boxForAreaOfMotion.style.height = `${Math.floor(this._boxForAreaOfMotion.clientWidth / this._aspectRatio)}px`;
        }
    }

    private ListeningToKeystrokes(e: KeyboardEvent): void {
        if (e.charCode === 0) {
            switch (e.keyCode) {
                case 27:
                    for (let modal of document.getElementsByClassName('w3-modal')) {
                        if (isDisplayBlock(<HTMLElement>modal)) (<HTMLElement>modal).style.display = 'none';
                    };
                    if (isDisplayBlock(this._menuSelect)) this._menuSelect.style.display = 'none';
                    break;
                default:
                    break;
            }
        }
    }

    private OnIsTranslucentModal(e: CustomEvent): void {
        if (e.detail.value) {
            this._modalParms.style.opacity = '0.7';
        } else {
            this._modalParms.style.opacity = '1';
        }
    }

    private EnambelLog() {
        if (Params.instance.amount == 1) {
            for (let item of document.getElementsByName('log')) {
                item.style.setProperty('--isLog', 'block')
                item.dataset.display = 'true';
            }
            for (let item of document.getElementsByName('log-flex')) {
                item.style.setProperty('--isLogFlex', 'flex')
            }
        } else {
            for (let item of document.getElementsByName('log')) {
                item.style.setProperty('--isLog', 'none')
                item.dataset.display = 'false';
            }
            for (let item of document.getElementsByName('log-flex')) {
                item.style.setProperty('--isLogFlex', 'none')
            }
        }
    }

    private IsDefinedOffScreenCanvas(checkControlItems: boolean = true): boolean {
        var isDefined: boolean;
        if (CheckOffscreenCanvas()) {
            isDefined = true;
            this._isUseOffscreenCanvas.dataset.use = 'yes';
            this._modalParmsIsOffscreenCanvas.labels[0].title = IsDefinedOffScreenCanvas;
            this._isUseOffscreenCanvas.title = IsDefinedOffScreenCanvas;
            this.OnIsOffscreenCanvas();
        } else {
            isDefined = false;
            this._modalParmsIsOffscreenCanvas.setAttribute("disabled", "true");
            this._modalParmsIsOffscreenCanvas.labels[0].title = IsUndefinedOffScreenCanvas;
            this._isUseOffscreenCanvas.dataset.use = 'no';
            this._isUseOffscreenCanvas.title = IsUndefinedOffScreenCanvas;
        }
        return isDefined;
    }

    private OnIsOffscreenCanvas(): void {
        if (this._parms.isOffScreenCanvas) {
            this._isUseOffscreenCanvas.dataset.use = 'switch-on'
        } else {
            this._isUseOffscreenCanvas.dataset.use = 'yes'
        }
    }

}

Simulation.Create(
    document.getElementById('is-use-off-screen-canvas'),
    document.getElementById('settings'),
    document.getElementById('redraw'),
    document.getElementById('step-by-step'),
    document.getElementById('launch'),
    document.getElementById('box-for-area-of-motion'),
    <HTMLCanvasElement>document.getElementById('brownian-motion-area'),
    //
    document.getElementById('confirm-modal'),
    document.getElementById('confirmYes'),
    document.getElementById('confirmNo'),
    document.getElementById('confirm-modal-Header'),
    document.getElementById('confirmAbout'),
    //
    document.getElementById('parms-show'),
    document.getElementById('parms-modal'),
    document.getElementById('parms-speed-panel'),
    <HTMLLabelElement>document.getElementById('show-amount-value'),
    <HTMLInputElement>document.getElementById('parms-amount'),
    document.getElementById('parms-element-kind-panel'),
    document.getElementById('parms-fill-type-panel'),
    document.getElementById('show-size-value'),
    <HTMLInputElement>document.getElementById('parms-size'),
    document.getElementById('show-path-from-value'),
    <HTMLInputElement>document.getElementById('parms-path-from'),
    document.getElementById('show-path-to-value'),
    <HTMLInputElement>document.getElementById('parms-path-to'),
    document.getElementById('parms-scale-area-panel'),
    <HTMLInputElement>document.getElementById('is-off-screen-canvas'),
    <HTMLInputElement>document.getElementById('is-track-proportions-area-motion'),
    <HTMLInputElement>document.getElementById('is-translucent-modal'),
    document.getElementById('set-default-parms'),
    document.getElementById('parmsOK'),
    //
    document.getElementById('menu-select')
);