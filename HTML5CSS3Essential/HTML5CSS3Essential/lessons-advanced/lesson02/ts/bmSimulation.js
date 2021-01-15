import { isDisplayBlock, Confirm } from '../../../js-advanced/_pgkUtils.js';
import { CheckOffscreenCanvas } from '../../../js-advanced/pgkToTSUtils.js';
import { Params, ParmsDefinition, NameEventChangeStatusBrownianMotion, NameEventStepByStepBrownianMotion } from './bmParams.js';
import { ViewBrownianMotion } from '../ts/view/viewBrownianMotion.js';
const IsUndefinedOffScreenCanvas = 'OffScreenCanvas is undefined';
const IsDefinedOffScreenCanvas = 'OffScreenCanvas is defined';
class Simulation {
    constructor(isUseOffscreenCanvas, settings, redraw, stepByStep, launch, boxForAreaOfMotion, brownianMotionArea, modalConfirm, modalConfirmYes, modalConfirmNo, confirmHeader, confirmAbout, showParms, modalParms, modalParmsSpeedPanel, modalParmsShowAmountValue, modalParmsAmount, modalParmsElementKindPanel, modalParmsFillTypePanel, modalParmsShowSizeValue, modalParmsSize, modalParmsShowPathFromValue, modalParmsPathFrom, modalParmsShowPathToValue, modalParmsPathTo, modalParmsScaleArea, modalParmsIsOffscreenCanvas, modalParmsIsTrackProportionsAreaMotion, modalParmsIsTranslucentModal, modalParmsSetDefault, modalParmsOK, menuSelect) {
        this._isMotion = false;
        this._launchStop = 'Стоп';
        this._launchStart = 'Старт';
        this._aspectRatio = 1.5;
        this._parms = Params.instance;
        this._isUseOffscreenCanvas = isUseOffscreenCanvas;
        this._settings = settings;
        this._redraw = redraw;
        this._stepByStep = stepByStep;
        this._launch = launch;
        this._boxForAreaOfMotion = boxForAreaOfMotion;
        this._brownianMotionArea = brownianMotionArea;
        this._modalConfirm = modalConfirm;
        this._modalConfirmYes = modalConfirmYes;
        this._modalConfirmNo = modalConfirmNo;
        this._confirmHeader = confirmHeader;
        this._confirmAbout = confirmAbout;
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
        this._menuSelect = menuSelect;
        this._aspectRatio = this._boxForAreaOfMotion.clientWidth / this._boxForAreaOfMotion.clientHeight;
        this.DependencyResolutions();
        this.SetEvents();
        this.EnambelLog();
        this.IsDefinedOffScreenCanvas();
    }
    static get instance() {
        if (!Simulation._instance) {
            throw new Error('Instance of Simulation was not created.');
        }
        return Simulation._instance;
    }
    static Create(isUseOffscreenCanvas, settings, redraw, stepByStep, launch, boxForAreaOfMotion, brownianMotionArea, modalConfirm, modalConfirmYes, modalConfirmNo, confirmHeader, confirmAbout, showParms, modalParms, modalParmsSpeedPanel, modalParmsShowAmountValue, modalParmsAmount, modalParmsElementKindPanel, modalParmsFillTypePanel, modalParmsShowSizeValue, modalParmsSize, modalParmsShowPathFromValue, modalParmsPathFrom, modalParmsShowPathToValue, modalParmsPathTo, modalParmsScaleArea, madalParmsIsOffscreenCanvas, modalParmsIsTrackProportionsAreaMotion, modalParmsIsTranslucentModal, modalParmsSetDefault, modalParmsOK, menuSelect) {
        if (!Simulation._instance) {
            Simulation._instance = new Simulation(isUseOffscreenCanvas, settings, redraw, stepByStep, launch, boxForAreaOfMotion, brownianMotionArea, modalConfirm, modalConfirmYes, modalConfirmNo, confirmHeader, confirmAbout, showParms, modalParms, modalParmsSpeedPanel, modalParmsShowAmountValue, modalParmsAmount, modalParmsElementKindPanel, modalParmsFillTypePanel, modalParmsShowSizeValue, modalParmsSize, modalParmsShowPathFromValue, modalParmsPathFrom, modalParmsShowPathToValue, modalParmsPathTo, modalParmsScaleArea, madalParmsIsOffscreenCanvas, modalParmsIsTrackProportionsAreaMotion, modalParmsIsTranslucentModal, modalParmsSetDefault, modalParmsOK, menuSelect);
        }
        return Simulation._instance;
    }
    DependencyResolutions() {
        Confirm.Create(this._modalConfirm, this._confirmHeader, this._confirmAbout, this._modalConfirmYes, this._modalConfirmNo);
        this._parmsDefinition = ParmsDefinition.Create(this._parms, this._showParms, this._modalParms, this._modalParmsSpeedPanel, this._modalParmsShowAmountValue, this._modalParmsAmount, this._modalParmsElementKindPanel, this._modalParmsFillTypePanel, this._modalParmsShowSizeValue, this._modalParmsSize, this._modalParmsShowPathFromValue, this._modalParmsPathFrom, this._modalParmsShowPathToValue, this._modalParmsPathTo, this._modalParmsScaleArea, this._modalParmsIsOffscreenCanvas, this._modalParmsIsTrackProportionsAreaMotion, this._modalParmsIsTranslucentModal, this._modalParmsSetDefault, this._modalParmsOK, this._menuSelect);
        this._bmView = ViewBrownianMotion.Create(this._brownianMotionArea);
    }
    SetEvents() {
        window.addEventListener('resize', () => { this.OnWindowResize(); }, false);
        document.body.addEventListener('keydown', (e) => { this.ListeningToKeystrokes(e); }, false);
        this._settings.addEventListener('click', () => { this.DefineSettings(); }, false);
        this._redraw.addEventListener('click', () => { this._bmView.Redraw(); }, false);
        this._stepByStep.addEventListener('click', () => { document.dispatchEvent(new CustomEvent(NameEventStepByStepBrownianMotion, { bubbles: true })); }, false);
        this._launch.addEventListener('click', () => { this.SwitchStatusLaunch(); }, false);
        document.addEventListener(this._parms.nameEventIsTranslucent, (e) => { this.OnIsTranslucentModal(e); }, false);
        document.addEventListener(this._parms.nameEventAmountChange, () => { this.EnambelLog(); }, false);
        document.addEventListener(this._parms.nameEventIsOffScreenCanvas, () => { this.OnIsOffscreenCanvas(); }, false);
        this._menuSelect.addEventListener('mouseleave', () => { if (isDisplayBlock(this._menuSelect))
            this._menuSelect.style.display = 'none'; }, false);
    }
    DefineSettings() {
        this._parmsDefinition.Open();
    }
    SwitchStatusLaunch() {
        if (!this._isMotion) {
            this._launch.innerHTML = `<span>${this._launchStop}</span>`;
            this._launch.dataset.simulation = 'isMotion';
        }
        else {
            this._launch.innerHTML = `<span>${this._launchStart}</span>`;
            this._launch.dataset.simulation = 'isStop';
        }
        this._isMotion = !this._isMotion;
        document.dispatchEvent(new CustomEvent(NameEventChangeStatusBrownianMotion, { bubbles: true, detail: { value: this._isMotion } }));
    }
    OnWindowResize() {
        if (this._parms.isTrackProportionsAreaMotion) {
            this._boxForAreaOfMotion.style.height = `${Math.floor(this._boxForAreaOfMotion.clientWidth / this._aspectRatio)}px`;
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
                        this._menuSelect.style.display = 'none';
                    break;
                default:
                    break;
            }
        }
    }
    OnIsTranslucentModal(e) {
        if (e.detail.value) {
            this._modalParms.style.opacity = '0.7';
        }
        else {
            this._modalParms.style.opacity = '1';
        }
    }
    EnambelLog() {
        if (Params.instance.amount == 1) {
            for (let item of document.getElementsByName('log')) {
                item.style.setProperty('--isLog', 'block');
                item.dataset.display = 'true';
            }
            for (let item of document.getElementsByName('log-flex')) {
                item.style.setProperty('--isLogFlex', 'flex');
            }
        }
        else {
            for (let item of document.getElementsByName('log')) {
                item.style.setProperty('--isLog', 'none');
                item.dataset.display = 'false';
            }
            for (let item of document.getElementsByName('log-flex')) {
                item.style.setProperty('--isLogFlex', 'none');
            }
        }
    }
    IsDefinedOffScreenCanvas(checkControlItems = true) {
        var isDefined;
        if (CheckOffscreenCanvas()) {
            isDefined = true;
            this._isUseOffscreenCanvas.dataset.use = 'yes';
            this._modalParmsIsOffscreenCanvas.labels[0].title = IsDefinedOffScreenCanvas;
            this._isUseOffscreenCanvas.title = IsDefinedOffScreenCanvas;
            this.OnIsOffscreenCanvas();
        }
        else {
            isDefined = false;
            this._modalParmsIsOffscreenCanvas.setAttribute("disabled", "true");
            this._modalParmsIsOffscreenCanvas.labels[0].title = IsUndefinedOffScreenCanvas;
            this._isUseOffscreenCanvas.dataset.use = 'no';
            this._isUseOffscreenCanvas.title = IsUndefinedOffScreenCanvas;
        }
        return isDefined;
    }
    OnIsOffscreenCanvas() {
        if (this._parms.isOffScreenCanvas) {
            this._isUseOffscreenCanvas.dataset.use = 'switch-on';
        }
        else {
            this._isUseOffscreenCanvas.dataset.use = 'yes';
        }
    }
}
Simulation._instance = undefined;
Simulation.Create(document.getElementById('is-use-off-screen-canvas'), document.getElementById('settings'), document.getElementById('redraw'), document.getElementById('step-by-step'), document.getElementById('launch'), document.getElementById('box-for-area-of-motion'), document.getElementById('brownian-motion-area'), document.getElementById('confirm-modal'), document.getElementById('confirmYes'), document.getElementById('confirmNo'), document.getElementById('confirm-modal-Header'), document.getElementById('confirmAbout'), document.getElementById('parms-show'), document.getElementById('parms-modal'), document.getElementById('parms-speed-panel'), document.getElementById('show-amount-value'), document.getElementById('parms-amount'), document.getElementById('parms-element-kind-panel'), document.getElementById('parms-fill-type-panel'), document.getElementById('show-size-value'), document.getElementById('parms-size'), document.getElementById('show-path-from-value'), document.getElementById('parms-path-from'), document.getElementById('show-path-to-value'), document.getElementById('parms-path-to'), document.getElementById('parms-scale-area-panel'), document.getElementById('is-off-screen-canvas'), document.getElementById('is-track-proportions-area-motion'), document.getElementById('is-translucent-modal'), document.getElementById('set-default-parms'), document.getElementById('parmsOK'), document.getElementById('menu-select'));
//# sourceMappingURL=bmSimulation.js.map