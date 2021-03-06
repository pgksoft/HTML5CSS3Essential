import { isDisplayBlock } from '../../../js-advanced/_pgkUtils';
import { Params, CustomEventOverFill, FillingDirectionRandom, FillingDirectionManual } from './model/rgParams';
import { RgDomItems } from './model/rgItems';
import { ViewRGParmsDefinition } from './view/viewRgParams';
import { Colors } from '../../../js-advanced/colorManagement';
class RGLearning {
    constructor(domItems) {
        this._aspectRatio = 1.5;
        this._parms = Params.instance;
        this._domItems = domItems;
        this._aspectRatio = this._domItems.boxForRGArea.clientWidth / this._domItems.boxForRGArea.clientHeight;
        this._context = this._domItems.rgArea.getContext('2d');
        this.SetScaleArea();
        this.SetEvents();
        this.DependencyResolutions();
        this.Draw();
        this.OnIsAutoColorScheme();
    }
    static get instance() {
        if (!RGLearning._instance) {
            throw new Error('Instance of ../js-advanced/colorManagement.js was not created.');
        }
        return RGLearning._instance;
    }
    get context() { return this._context; }
    static Create(domItems) {
        if (!RGLearning._instance) {
            RGLearning._instance = new RGLearning(domItems);
        }
        return RGLearning._instance;
    }
    SetScaleArea() {
        this._domItems.rgArea.width = this._parms.areaWidth;
        this._domItems.rgArea.height = this._parms.areaHeight;
    }
    DependencyResolutions() {
        this._parmsDefinition = ViewRGParmsDefinition.Create(this._parms, this._domItems);
    }
    SetEvents() {
        window.addEventListener('resize', () => { this.OnWindowResize(); }, false);
        document.body.addEventListener('keydown', (e) => { this.ListeningToKeystrokes(e); }, false);
        this._domItems.menuSelect.addEventListener('mouseleave', () => { if (isDisplayBlock(this._domItems.menuSelect))
            this.SetEmptyMenuSelect(); }, false);
        this._domItems.settings.addEventListener('click', () => { this.DefineSettings(); }, false);
        this._domItems.overFill.addEventListener('click', () => { this.OverFill(); }, false);
        document.addEventListener(this._parms.nameEventScaleChange, () => { this.OnScaleChange(); this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventXChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventYChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventWidthChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventHeightChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventXOneChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventYOneChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventROneChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventXTwoChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventYTwoChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventRTwoChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventGradientSchemeChange, () => { this.Draw(); }, false);
        document.addEventListener(this._parms.nameEventDirectionChange, () => { this.OnDirectionChange(); }, false);
        document.addEventListener(this._parms.nameEventFillingDirectionChange, () => { this.OnRandomDirectionChange(); }, false);
        document.addEventListener(this._parms.nameEventisAutoColorScheme, () => { this.OnIsAutoColorScheme(); }, false);
    }
    DefineSettings() {
        this._parmsDefinition.Open();
    }
    OverFill() {
        let colorScheme = Colors.instance.CreateColorScheme();
        if (this._parms.fillingDirection[0] !== FillingDirectionManual) {
            this._parms.SetRandomFillingDiirection();
            this._parms.SetRadialParameters();
        }
        this._parms.gradientScheme = colorScheme;
        document.dispatchEvent(new CustomEvent(CustomEventOverFill, { bubbles: true }));
    }
    OnWindowResize() {
        if (this._parms.isTrackProportionsAreaRG) {
            this._domItems.boxForRGArea.style.height = `${Math.floor(this._domItems.boxForRGArea.clientWidth / this._aspectRatio)}px`;
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
                    if (isDisplayBlock(this._domItems.menuSelect))
                        this.SetEmptyMenuSelect();
                    break;
                default:
                    break;
            }
        }
    }
    OnScaleChange() {
        let OldWidth = this._domItems.rgArea.width;
        let oldHeight = this._domItems.rgArea.height;
        this.SetScaleArea();
        let ratioWidth = this._parms.areaWidth / OldWidth;
        let ratioHeight = this._parms.areaHeight / oldHeight;
        let parms = { x: 0, y: 0, w: 0, h: 0, oneX: 0, oneY: 0, oneR: 0, twoX: 0, twoY: 0, twoR: 0 };
        parms.x = Math.floor(this._parms.x * ratioWidth);
        parms.y = Math.floor(this._parms.y * ratioHeight);
        parms.w = Math.floor(this._parms.width * ratioWidth);
        parms.h = Math.floor(this._parms.height * ratioHeight);
        parms.oneX = Math.floor(this._parms.xOne * ratioWidth);
        parms.oneY = Math.floor(this._parms.yOne * ratioHeight);
        parms.oneR = Math.floor(this._parms.rOne * Math.max(ratioWidth, ratioHeight));
        parms.twoX = Math.floor(this._parms.xTwo * ratioWidth);
        parms.twoY = Math.floor(this._parms.yTwo * ratioHeight);
        parms.twoR = Math.floor(this._parms.rTwo * Math.max(ratioWidth, ratioHeight));
        this._parms.x = parms.x;
        this._parms.y = parms.y;
        this._parms.width = parms.w;
        this._parms.height = parms.h;
        this._parms.xOne = parms.oneX;
        this._parms.yOne = parms.oneY;
        this._parms.rOne = parms.oneR;
        this._parms.xTwo = parms.twoX;
        this._parms.yTwo = parms.twoY;
        this._parms.rTwo = parms.twoR;
    }
    OnIsAutoColorScheme() {
        this._domItems.overFill.dataset.visible = this._parms.isAutoColorScheme.toString();
    }
    OnDirectionChange() {
        this._parms.SetRadialParameters();
        this.Draw();
    }
    OnRandomDirectionChange() {
        if (this._parms.fillingDirection[0] === FillingDirectionRandom) {
            this._parms.SetRandomFillingDiirection();
            this._parms.SetRadialParameters();
            this.Draw();
        }
    }
    Draw() {
        this.context.clearRect(0, 0, this._domItems.rgArea.width, this._domItems.rgArea.height);
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;
        this.context.strokeRect(this._parms.x, this._parms.y, this._parms.width, this._parms.height);
        Colors.instance.FillRectRadialGradiant(this.context, this._parms.x, this._parms.y, this._parms.width, this._parms.height, this._parms.xOne, this._parms.yOne, this._parms.rOne, this._parms.xTwo, this._parms.yTwo, this._parms.rTwo, this._parms.gradientScheme);
    }
    SetEmptyMenuSelect() {
        this._domItems.menuSelect.dataset.type = 'empty';
        this._domItems.menuSelect.style.display = 'none';
    }
}
RGLearning._instance = undefined;
RGLearning.Create(RgDomItems.Create(document.getElementById('settings'), document.getElementById('overfill'), document.getElementById('parms-show'), document.getElementById('rg-container'), document.getElementById('rg-area'), document.getElementById('parms-modal'), document.getElementById('parms-scale-area-panel'), document.getElementById('parms-direction-area-panel'), document.getElementById('parms-color-scheme-area-panel'), document.getElementById('parms-all-colors-area-panel'), document.getElementById('parms-x-top'), document.getElementById('show-x-top-range'), document.getElementById('show-x-top-value'), document.getElementById('parms-y-top'), document.getElementById('show-y-top-range'), document.getElementById('show-y-top-value'), document.getElementById('parms-width'), document.getElementById('show-width-range'), document.getElementById('show-width-value'), document.getElementById('parms-height'), document.getElementById('show-height-range'), document.getElementById('show-height-value'), document.getElementById('parms-one-x'), document.getElementById('show-one-x-range'), document.getElementById('show-one-x-value'), document.getElementById('parms-one-y'), document.getElementById('show-one-y-range'), document.getElementById('show-one-y-value'), document.getElementById('parms-one-r'), document.getElementById('show-one-r-range'), document.getElementById('show-one-r-value'), document.getElementById('parms-two-x'), document.getElementById('show-two-x-range'), document.getElementById('show-two-x-value'), document.getElementById('parms-two-y'), document.getElementById('show-two-y-range'), document.getElementById('show-two-y-value'), document.getElementById('parms-two-r'), document.getElementById('show-two-r-range'), document.getElementById('show-two-r-value'), document.getElementById('is-auto-color-scheme'), document.getElementById('is-track-proportions-area-rg'), document.getElementById('is-translucent-modal'), document.getElementById('parmsOK'), document.getElementById('menu-select')));
//# sourceMappingURL=rgControl.js.map