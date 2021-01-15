import { isDisplayBlock } from '../../../js-advanced/_pgkUtils'

// Step motion at pixels
export const Speed: Map<string, number> = new Map([['Любая', 0], ['Один', 1], ['Два', 2], ['Три', 3], ['Четыре', 4], ['Пять', 5]]);
export const ElementAny: string = 'Любая';
export const ElementSquare: string = 'Квадрат';
export const ElementCircle: string = 'Круг';
export const ElementKind: Map<string, number> = new Map([[ElementAny, 0], [ElementSquare, 1], [ElementCircle, 2]]);
export const FillTypeAny: string = 'Любая';
export const FillTypeColor: string = 'Цветная';
export const FillTypeInitialGradient: string = 'Начальный градиент';
export const FillTypeRedrawGradient: string = 'Перерисовка градиента';
export const FillType: Map<string, number> = new Map([[FillTypeAny, 0], [FillTypeColor, 1], [FillTypeInitialGradient, 2], [FillTypeRedrawGradient, 3]]);
export const ScaleArea: Map<string, number> = new Map([
    ['300 x 150', 300],
    ['600 x 300', 600],
    ['900 x 450', 900],
    ['1200 x 600', 1200],
    ['1600 x 800', 1600],
    ['1900 x 950', 1900],
    ['2560 x 1280', 2560],
    ['3200 x 1600', 3200],
    ['4800 x 2400', 4800],
    ['5600 x 2800', 5600]
]);
const enum PathConstraintType { From, To };
const MinPath: number = 1;
const MaxPath: number = 300;
const MinSize: number = 10;
const MaxSize: number = 50;
const MinAmount: number = 1;
const MaxAmount: number = 100000;
export const NameEventChangeStatusBrownianMotion: string = 'change-status-brownian-motion';
export const NameEventStepByStepBrownianMotion: string = 'step-by-step-brownian-motion';
//
class LSKey {
    app: string = 'BrownianMotionSimulation';
}
class LSValue {
    speed: [string, number];
    amount: number;
    kind: [string, number];
    size: number;
    path: [number, number];
    fill: [string, number];
    scale: [string, number];
    isOffScreenCanvas: boolean;
    isTrackProportionsAreaMotion: boolean;
    isTranslucentModal: boolean;
}
//
class Default {
    private _speed: [string, number] = Array.from(Speed.entries()).find((pair) => pair[0] === 'Один');
    private _amount: number = 50;
    private _kind: [string, number] = ElementKind.entries().next().value;
    private _size: number = 30;
    private _path: [number, number] = [50, 200];
    private _fill: [string, number] = FillType.entries().next().value;
    private _scale: [string, number] = ScaleArea.entries().next().value;
    private _isOffScreenCanvas: boolean = false;
    private _isTrackProportionsAreaMotion: boolean = true;
    private _isTranslucentModal: boolean = false;
    //
    get speed(): [string, number] { return this._speed; }
    get amount(): number { return this._amount; }
    get kind(): [string, number] { return this._kind; }
    get size(): number { return this._size; }
    get path(): [number, number] { return this._path; }
    get fill(): [string, number] { return this._fill; }
    get scale(): [string, number] { return this._scale; }
    get isOffScreenCanvas(): boolean { return this._isOffScreenCanvas; }
    get isTrackProportionsAreaMotion(): boolean { return this._isTrackProportionsAreaMotion; }
    get isTranslucentModal(): boolean { return this._isTranslucentModal; }
}
//
export class Params {
    private constructor() {
        this._localParms.amount = this._amount;
        this._localParms.fill = this._fill;
        this._localParms.kind = this._kind;
        this._localParms.path = this._path;
        this._localParms.size = this._size;
        this._localParms.speed = this._speed;
        this._localParms.scale = this._scale;
        this._localParms.isOffScreenCanvas = this._isOffScreenCanvas;
        this._localParms.isTrackProportionsAreaMotion = this._isTrackProportionsAreaMotion;
        this._localParms.isTranslucentModal = this._isTranslucentModal;
        this.Load();
    }

    // Fields - self management
    private static _instance: Params = undefined;
    // Fields - Params
    private _default: Default = new Default();
    private _speed: [string, number] = this._default.speed;
    private _amount: number = this._default.amount;
    private _kind: [string, number] = this._default.kind;
    private _size: number = this._default.size;
    private _path: [number, number] = this._default.path;
    private _fill: [string, number] = this._default.fill;
    private _scale: [string, number] = this._default.scale;
    private _isTrackProportionsAreaMotion: boolean = this._default.isTrackProportionsAreaMotion;
    private _isOffScreenCanvas: boolean = this._default.isOffScreenCanvas;
    private _isTranslucentModal: boolean = this._default.isTranslucentModal;
    private _localKey: LSKey = new LSKey();
    private _localParms: LSValue = new LSValue();

    // Fields - name user events
    private _nameEventAmountChange: string = 'bmAmountChange';
    private _nameEventSpeedChange: string = 'bmSpeedChange';
    private _nameEventSizeChange: string = 'bmSizeChange';
    private _nameEventKindChange: string = 'bmKindChange';
    private _nameEventFillChange: string = 'bmFillChange';
    private _nameEventPathChange: string = 'bmPathChange';
    private _nameEventScaleChange: string = 'bmScaleChange';
    private _nameEventIsOffScreenCanvas: string = 'bmClick-IsOffScreenCanvas';
    private _nameEventIsTrackProportionsAreaMotion: string = 'bmClick-IsTrackProportionsAreaMotion';
    private _nameEventIsTranslucent: string = 'bmClick-IsTranslucentModal';

    // Properties - Self management
    static get instance(): Params {
        if (!Params._instance) {
            Params._instance = new Params();
        }
        return Params._instance;
    }

    // Properties - Parameters
    get default(): Default {
        return this._default;
    }
    get speed(): [string, number] {
        return this._speed;
    }
    set speed(value: [string, number]) {
        this._speed = value;
        this._localParms.speed = this.speed;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventSpeedChange, { bubbles: true, detail: { value: value } }));
    }
    get amount(): number {
        return this._amount;
    }
    set amount(value: number) {
        this._amount = value;
        this._localParms.amount = this.amount;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventAmountChange, { bubbles: true, detail: { value: value } }));
    }
    get kind(): [string, number] {
        return this._kind;
    }
    set kind(value: [string, number]) {
        this._kind = value;
        this._localParms.kind = this.kind;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventKindChange, { bubbles: true, detail: { value: value } }));
    }
    get size(): number {
        return this._size;
    }
    set size(value: number) {
        this._size = value;
        this._localParms.size = this.size;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventSizeChange, { bubbles: true, detail: { value: value } }));
    }
    get path(): [number, number] {
        return this._path;
    }
    set path(value: [number, number]) {
        this._path = value;
        this._localParms.path = this.path;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventPathChange, { bubbles: true, detail: { value: value } }));
    }
    get fill(): [string, number] {
        return this._fill;
    }
    set fill(value: [string, number]) {
        this._fill = value;
        this._localParms.fill = this.fill;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventFillChange, { bubbles: true, detail: { value: value } }));
    }
    get scale(): [string, number] {
        return this._scale;
    }
    set scale(value: [string, number]) {
        this._scale = value;
        this._localParms.scale = this.scale;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventScaleChange, { bubbles: true, detail: { value: value } }));
    }
    get isOffScreenCanvas(): boolean {
        return this._isOffScreenCanvas;
    }
    set isOffScreenCanvas(value: boolean) {
        this._isOffScreenCanvas = value;
        this._localParms.isOffScreenCanvas = this.isOffScreenCanvas;
        this.Save();
        document.dispatchEvent(new CustomEvent(this._nameEventIsOffScreenCanvas, { bubbles: true, detail: { value: value } }));
    }
    get isTrackProportionsAreaMotion(): boolean {
        return this._isTrackProportionsAreaMotion;
    }
    set isTrackProportionsAreaMotion(value: boolean) {
        this._isTrackProportionsAreaMotion = value;
        this._localParms.isTrackProportionsAreaMotion = this.isTrackProportionsAreaMotion;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventIsTrackProportionsAreaMotion, { bubbles: true, detail: { value: value } }));
    }
    get isTranslucentModal(): boolean {
        return this._isTranslucentModal;
    }
    set isTranslucentModal(value: boolean) {
        this._isTranslucentModal = value;
        this._localParms.isTranslucentModal = this.isTranslucentModal;
        this.Save();
        document.dispatchEvent(new CustomEvent(this.nameEventIsTranslucent, { bubbles: true, detail: { value: value } }));
    }

    // Properties - name user events
    get nameEventAmountChange(): string { return this._nameEventAmountChange; }
    get nameEventSpeedChange(): string { return this._nameEventSpeedChange; }
    get nameEventSizeChange(): string { return this._nameEventSizeChange; }
    get nameEventKindChange(): string { return this._nameEventKindChange; }
    get nameEventFillChange(): string { return this._nameEventFillChange; }
    get nameEventPathChange(): string { return this._nameEventPathChange; }
    get nameEventScaleChange(): string { return this._nameEventScaleChange; }
    get nameEventIsOffScreenCanvas(): string { return this._nameEventIsOffScreenCanvas; }
    get nameEventIsTrackProportionsAreaMotion(): string { return this._nameEventIsTrackProportionsAreaMotion; }
    get nameEventIsTranslucent(): string { return this._nameEventIsTranslucent; }

    private Save(): void {
        localStorage.setItem(JSON.stringify(this._localKey), JSON.stringify(this._localParms));
    }

    private Load(): void {
        if (localStorage.getItem(JSON.stringify(this._localKey))) {
            this._localParms = JSON.parse(localStorage.getItem(JSON.stringify(this._localKey)));
            this._amount = this._localParms.amount;
            this._fill = this._localParms.fill;
            this._kind = this._localParms.kind;
            this._path = this._localParms.path;
            this._size = this._localParms.size;
            this._speed = this._localParms.speed;
            this._scale = this._localParms.scale;
            this._isOffScreenCanvas = this._localParms.isOffScreenCanvas;
            this._isTrackProportionsAreaMotion = this._localParms.isTrackProportionsAreaMotion;
            this._isTranslucentModal = this._localParms.isTranslucentModal;
        }
    }
}

export class ParmsDefinition {
    private constructor(
        params: Params,
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
        modalParmsIsOffScreenCanvas: HTMLInputElement,
        modalParmsIsTrackProportionsAreaMotion: HTMLInputElement,
        modalParmsIsTranslucentModal: HTMLInputElement,
        modalParmsSetDefault: HTMLElement,
        modalParmsOK: HTMLElement,
        //
        menuSelect: HTMLElement
    ) {
        this._params = params;
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
        this._modalParmsIsOffScreenCanvas = modalParmsIsOffScreenCanvas;
        this._modalParmsIsTrackProportionsAreaMotion = modalParmsIsTrackProportionsAreaMotion;
        this._modalParmsIsTranslucentModal = modalParmsIsTranslucentModal;
        this._modalParmsSetDefault = modalParmsSetDefault;
        this._modalParmsOK = modalParmsOK;
        //
        this._menuSelect = menuSelect;
        //
        this.CreateItemsOfSpeedPanel(this._modalParmsSpeedPanel);
        this.InitAmount();
        this.CreateItemsOfElenetKindPanel(this._modalParmsElementKindPanel);
        this.CreateItemsOfFillTypePanel(this._modalParmsFillTypePanel);
        this.CreateItemsOfScaleAreaPanel(this._modalParmsScaleArea);
        this.InitSize();
        this.InitPath();
        this.InitIsOffscreenCanvas();
        //
        this.DefineEvents();
        this.Show();
    }

    // Fields - self management
    private static _instance: ParmsDefinition = undefined;
    // Fields - Fields: dependencies
    private _params: Params;
    // Fields like DOM elements
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
    private _modalParmsIsOffScreenCanvas: HTMLInputElement;
    private _modalParmsIsTrackProportionsAreaMotion: HTMLInputElement;
    private _modalParmsIsTranslucentModal: HTMLInputElement;
    private _modalParmsSetDefault: HTMLElement;
    private _modalParmsOK: HTMLElement;
    //
    private _menuSelect: HTMLElement;

    // Methods - self management
    static Create(
        params: Params,
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
        modalParmsIsOffScreenCanvas: HTMLInputElement,
        modalParmsIsTrackProportionsAreaMotion: HTMLInputElement,
        modalParmsIsTranslucentModal: HTMLInputElement,
        modalParmsSetDefault: HTMLElement,
        modalParmsOK: HTMLElement,
        //
        menuSelect: HTMLElement
    ): ParmsDefinition {
        if (!ParmsDefinition._instance) {
            ParmsDefinition._instance = new ParmsDefinition(
                params,
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
                modalParmsIsOffScreenCanvas,
                modalParmsIsTrackProportionsAreaMotion,
                modalParmsIsTranslucentModal,
                modalParmsSetDefault,
                modalParmsOK,
                //
                menuSelect
            );
        }
        return ParmsDefinition._instance;
    }

    // Methods
    Open() {
        // Setting actual values
        for (let speed of document.getElementsByName('speed')) {
            if (this._params.speed[1] == Number(speed.dataset.speed)) {
                (<HTMLInputElement>speed).checked = true;
            }
        }
        for (let kind of document.getElementsByName('kind')) {
            if (this._params.kind[1] == Number(kind.dataset.kind)) {
                (<HTMLInputElement>kind).checked = true;
            }
        }
        for (let fill of document.getElementsByName('fill')) {
            if (this._params.fill[1] == Number(fill.dataset.fill)) {
                (<HTMLInputElement>fill).checked = true;
            }
        }
        for (let scale of document.getElementsByName('scale')) {
            if (this._params.scale[1] == Number(scale.dataset.scale)) {
                (<HTMLInputElement>scale).checked = true;
            }
        }
        //
        this._modalParmsOK.onclick = () => { this._modalParms.style.display = 'none'; };
        this._modalParms.style.display = 'block';
    }

    // Helpers
    private CreateItemsOfSpeedPanel(panel: HTMLElement, isMenu: boolean = false): void {
        let rb: HTMLInputElement;
        let lbl: HTMLLabelElement;
        for (let speed of Speed.entries()) {
            rb = document.createElement('input');
            rb.type = 'radio';
            rb.name = !isMenu ? 'speed' : 'menu-speed';
            rb.id = !isMenu ? `speed-${speed[1]}` : `menu-speed-${speed[1]}`;
            rb.dataset.speed = `${speed[1]}`;
            lbl = document.createElement('label');
            lbl.htmlFor = rb.id;
            lbl.innerText = speed[0];
            if (speed[1] == this._params.speed[1]) {
                rb.checked = true;
            }
            if (isMenu) {
                rb.onclick = (e) => {
                    let button: HTMLInputElement = <HTMLInputElement>e.target;
                    this._params.speed = Array.from(Speed.entries()).find((pair) => pair[1] === Number(button.dataset.speed));
                    this.Show();
                    this._menuSelect.style.display = 'none';
                };
            }
            panel.appendChild(rb);
            panel.appendChild(lbl);
        }
    }

    private InitAmount() {
        this._modalParmsAmount.min = MinAmount.toString();
        this._modalParmsAmount.max = MaxAmount.toString();
        this._modalParmsAmount.addEventListener('change', () => {
            this._params.amount = Number(this._modalParmsAmount.value);
            this.Show();
        }, false);
        this._modalParmsAmount.addEventListener('input', () => {
            this._modalParmsShowAmountValue.innerText = this._modalParmsAmount.value;
        }, false);
        this._modalParmsAmount.value = this._params.amount.toString();
        this._modalParmsShowAmountValue.innerText = this._modalParmsAmount.value;
    }

    private CreateItemsOfElenetKindPanel(panel: HTMLElement, isMenu: boolean = false) {
        let rb: HTMLInputElement;
        let lbl: HTMLLabelElement;
        for (let kind of ElementKind.entries()) {
            rb = document.createElement('input');
            rb.type = 'radio';
            rb.name = !isMenu ? 'kind' : 'menu-kind';
            rb.id = !isMenu ? `kind-${kind[1]}` : `menu-kind-${kind[1]}`;
            rb.dataset.kind = `${kind[1]}`;
            lbl = document.createElement('label');
            lbl.htmlFor = rb.id;
            lbl.innerText = kind[0];
            if (kind[1] == this._params.kind[1]) {
                rb.checked = true;
            }
            if (isMenu) {
                rb.onclick = (e) => {
                    let button: HTMLInputElement = <HTMLInputElement>e.target;
                    this._params.kind = Array.from(ElementKind.entries()).find((pair) => pair[1] === Number(button.dataset.kind));
                    this.Show();
                    this._menuSelect.style.display = 'none';
                };
            }
            panel.appendChild(rb);
            panel.appendChild(lbl);
        }
    }

    private CreateItemsOfFillTypePanel(panel: HTMLElement, isMenu: boolean = false) {
        let rb: HTMLInputElement;
        let lbl: HTMLLabelElement;
        for (let fill of FillType.entries()) {
            rb = document.createElement('input');
            rb.type = 'radio';
            rb.name = !isMenu ? 'fill' : 'menu-fill';
            rb.id = !isMenu ? `fill-${fill[1]}` : `menu-fill-${fill[1]}`;
            rb.dataset.fill = `${fill[1]}`;
            lbl = document.createElement('label');
            lbl.htmlFor = rb.id;
            lbl.innerText = fill[0];
            if (fill[1] == this._params.fill[1]) {
                rb.checked = true;
            }
            if (isMenu) {
                rb.onclick = (e) => {
                    let button: HTMLInputElement = <HTMLInputElement>e.target;
                    this._params.fill = Array.from(FillType.entries()).find((pair) => pair[1] === Number(button.dataset.fill));
                    this.Show();
                    this._menuSelect.style.display = 'none';
                };
            }
            panel.appendChild(rb);
            panel.appendChild(lbl);
            if (this._params.isOffScreenCanvas && fill[0] === FillTypeInitialGradient) {
                rb.disabled = true;
            }
        }
    }

    private CreateItemsOfScaleAreaPanel(panel: HTMLElement, isMenu: boolean = false) {
        let rb: HTMLInputElement;
        let lbl: HTMLLabelElement;
        for (let scale of ScaleArea.entries()) {
            rb = document.createElement('input');
            rb.type = 'radio';
            rb.name = !isMenu ? 'scale' : 'menu-scale';
            rb.id = !isMenu ? `scale-${scale[1]}` : `menu-scale-${scale[1]}`;
            rb.dataset.scale = `${scale[1]}`;
            lbl = document.createElement('label');
            lbl.htmlFor = rb.id;
            lbl.innerText = scale[0];
            if (scale[1] == this._params.scale[1]) {
                rb.checked = true;
            }
            if (isMenu) {
                rb.onclick = (e) => {
                    let button: HTMLInputElement = <HTMLInputElement>e.target;
                    this._params.scale = Array.from(ScaleArea.entries()).find((pair) => pair[1] === Number(button.dataset.scale));
                    this.Show();
                    this._menuSelect.style.display = 'none';
                };
            }
            panel.appendChild(rb);
            panel.appendChild(lbl);
        }
    }

    private InitSize() {
        this._modalParmsSize.min = MinSize.toString();
        this._modalParmsSize.max = MaxSize.toString();
        this._modalParmsSize.addEventListener('change', () => {
            this._params.size = Number(this._modalParmsSize.value);
            this.Show();
        }, false);
        this._modalParmsSize.addEventListener('input', () => {
            this._modalParmsShowSizeValue.innerText = this._modalParmsSize.value;
        }, false);
        this._modalParmsSize.value = this._params.size.toString();
        this._modalParmsShowSizeValue.innerText = this._modalParmsSize.value;
    }

    private InitPath() {
        // Init Path From
        this._modalParmsPathFrom.min = MinPath.toString();
        this._modalParmsPathFrom.max = MaxPath.toString();
        this._modalParmsPathFrom.addEventListener('change', () => {
            this._params.path = [Number(this._modalParmsPathFrom.value), this._params.path[1]];
            this.Show();
        }, false);
        this._modalParmsPathFrom.addEventListener('input', () => {
            this.PathConsistency(PathConstraintType.From);
            this._modalParmsShowPathFromValue.innerText = this._modalParmsPathFrom.value;
        }, false);
        this._modalParmsPathFrom.value = this._params.path[0].toString();
        this._modalParmsShowPathFromValue.innerText = this._modalParmsPathFrom.value;
        // Init Path From
        this._modalParmsPathTo.min = MinPath.toString();
        this._modalParmsPathTo.max = MaxPath.toString();
        this._modalParmsPathTo.addEventListener('change', () => {
            this._params.path = [this._params.path[0], Number(this._modalParmsPathTo.value)];
            this.Show();
        }, false);
        this._modalParmsPathTo.addEventListener('input', () => {
            this.PathConsistency(PathConstraintType.To);
            this._modalParmsShowPathToValue.innerText = this._modalParmsPathTo.value;
        }, false);
        this._modalParmsPathTo.value = this._params.path[1].toString();
        this._modalParmsShowPathToValue.innerText = this._modalParmsPathTo.value;
    };

    private InitIsOffscreenCanvas(): void {
        this._modalParmsIsOffScreenCanvas.checked = this._params.isOffScreenCanvas;
    }

    private PathConsistency(constraint: PathConstraintType, input: HTMLInputElement = undefined): void {
        if (Number(this._modalParmsPathFrom.value) > Number(this._modalParmsPathTo.value)) {
            if (constraint == PathConstraintType.From) {
                this._modalParmsPathFrom.value = this._modalParmsPathTo.value;
                this._modalParmsShowPathFromValue.innerText = this._modalParmsPathFrom.value;
                if (input) {
                    input.value = this._modalParmsPathTo.value;
                }
            } else if (constraint == PathConstraintType.To) {
                this._modalParmsPathTo.value = this._modalParmsPathFrom.value;
                this._modalParmsShowPathToValue.innerText = this._modalParmsPathTo.value;
                if (input) {
                    input.value = this._modalParmsPathFrom.value;
                }
            }
        }
    }

    private DefineEvents(): void {
        for (let speed of document.getElementsByName('speed')) {
            speed.addEventListener('click', () => {
                this._params.speed = Array.from(Speed.entries()).find((pair) => pair[1] === Number(speed.dataset.speed));
                this.Show();
            }, false);
        }
        for (let kind of document.getElementsByName('kind')) {
            kind.addEventListener('click', () => {
                this._params.kind = Array.from(ElementKind.entries()).find((pair) => pair[1] === Number(kind.dataset.kind));
                this.Show();
            }, false);
        }
        for (let fill of document.getElementsByName('fill')) {
            fill.addEventListener('click', () => {
                this._params.fill = Array.from(FillType.entries()).find((pair) => pair[1] === Number(fill.dataset.fill));
                this.Show();
            }, false);
        }
        for (let scale of document.getElementsByName('scale')) {
            scale.addEventListener('click', () => {
                this._params.scale = Array.from(ScaleArea.entries()).find((pair) => pair[1] === Number(scale.dataset.scale));
                this.Show();
            }, false);
        }
        this._modalParmsIsOffScreenCanvas.addEventListener('click', () => { this._params.isOffScreenCanvas = this._modalParmsIsOffScreenCanvas.checked; }, false);
        this._modalParmsIsTranslucentModal.addEventListener('click', () => { this._params.isTranslucentModal = this._modalParmsIsTranslucentModal.checked; }, false);
        this._modalParmsIsTrackProportionsAreaMotion.addEventListener('click', () => { this._params.isTrackProportionsAreaMotion = this._modalParmsIsTrackProportionsAreaMotion.checked; }, false);
        this._modalParmsSetDefault.addEventListener('click', () => { this.SetDefault(); }, false);
        window.addEventListener('resize', () => { this.OnWindowChange(); }, false);
        window.addEventListener('scroll', () => { this.OnWindowChange(); }, false);
    }

    private DefineEventsContenteditable(): void {
        for (let span of document.querySelectorAll('[contenteditable]')) {
            (<HTMLElement>span).oninput = (e) => { this.RangeContenteditableValidate(e); };
            (<HTMLElement>span).onblur = (e) => { this.SetRangeContenteditable(e); };
            (<HTMLElement>span).onkeydown = (e) => { this.RangeEnter(e); };
        }
    }

    private DefineEventsParamSelect(): void {
        for (let span of document.querySelectorAll('[data-menu]')) {
            (<HTMLElement>span).onclick = (e) => { this.OnParamMenuClick(e); };
        }
    }

    private DefineEventsRange(): void {
        for (let span of document.querySelectorAll('[data-range]')) {
            (<HTMLElement>span).onclick = (e) => { this.OnParamRangeClick(e); };
        }
    }

    private OnParamRangeClick(e: MouseEvent): void {
        let span: HTMLElement = <HTMLElement>e.target;
        if (isDisplayBlock(this._menuSelect) && this._menuSelect.dataset.type === span.dataset.range) {
            this._menuSelect.dataset.type = 'empty';
            this._menuSelect.style.display = 'none';
            return;
        }
        this._menuSelect.dataset.type = span.dataset.range;
        this._menuSelect.innerHTML = '';
        let coords = span.getBoundingClientRect();
        this._menuSelect.style.left = coords.left + 5 + "px";
        this._menuSelect.style.top = coords.bottom + "px";
        this._menuSelect.className = 'pop-up-range';
        switch (span.dataset.range) {
            case 'amount':
                this.CreatePopUpRange(span.dataset.range, this._params.amount, [Number(this._modalParmsAmount.min), Number(this._modalParmsAmount.max)]);
                break;
            case 'size':
                this.CreatePopUpRange(span.dataset.range, this._params.size, [Number(this._modalParmsSize.min), Number(this._modalParmsSize.max)]);
                break;
            case 'path-from':
                this.CreatePopUpRange(span.dataset.range, this._params.path[0], [Number(this._modalParmsPathFrom.min), Number(this._modalParmsPathFrom.max)]);
                break;
            case 'path-to':
                this.CreatePopUpRange(span.dataset.range, this._params.path[1], [Number(this._modalParmsPathTo.min), Number(this._modalParmsPathTo.max)]);
                break;
            default:
                this._menuSelect.innerHTML = `<p>${span.dataset.range}</p>`
                break;

        }
        this._menuSelect.style.display = 'flex';
    }

    private CreatePopUpRange(
        dataRange: string,
        value: number,
        range: [number, number]
    ): void {
        let header: HTMLElement = document.createElement('div');
        header.innerHTML = `${range[0]}/${range[1]}`;
        let inputWrapper: HTMLElement = document.createElement('div');
        inputWrapper.className = 'range-wrapper';
        let input: HTMLInputElement = document.createElement('input');
        input.type = 'range';
        input.dataset.popUpRange = dataRange;
        input.addEventListener('change', (e: Event) => { this.OnPopUpRangeChange(e); }, false);
        input.addEventListener('input', (e: Event) => { this.OnPopUpRangeChange(e); }, false);
        input.min = range[0].toString();
        input.max = range[1].toString();
        input.value = value.toString();
        inputWrapper.appendChild(input);
        this._menuSelect.appendChild(header);
        this._menuSelect.appendChild(inputWrapper);
    }

    private OnPopUpRangeChange(e: Event) {
        let input: HTMLInputElement = <HTMLInputElement>e.target;
        let data: string = input.dataset.popUpRange;
        switch (data) {
            case 'amount':
                this._modalParmsAmount.value = input.value;
                this._modalParmsAmount.dispatchEvent(new Event('input'));
                this._modalParmsAmount.dispatchEvent(new Event('change'));
                break;
            case 'size':
                this._modalParmsSize.value = input.value;
                this._modalParmsSize.dispatchEvent(new Event('input'));
                this._modalParmsSize.dispatchEvent(new Event('change'));
                break;
            case 'path-from':
                this._modalParmsPathFrom.value = input.value;
                this.PathConsistency(PathConstraintType.From, input);
                this._modalParmsPathFrom.dispatchEvent(new Event('input'));
                this._modalParmsPathFrom.dispatchEvent(new Event('change'));
                break;
            case 'path-to':
                this._modalParmsPathTo.value = input.value;
                this.PathConsistency(PathConstraintType.To, input);
                this._modalParmsPathTo.dispatchEvent(new Event('input'));
                this._modalParmsPathTo.dispatchEvent(new Event('change'));
                break;
            default:
                break;
        }
        this.Show();
    }

    private InitRangesTitle(): void {
        for (let span of document.querySelectorAll('[contenteditable]')) {
            let name: string = (<HTMLElement>span).dataset.name;
            switch (name) {
                case 'amount':
                    (<HTMLElement>span).title = `${this._modalParmsAmount.min}/${this._modalParmsAmount.max}`;
                    break;
                case 'size':
                    (<HTMLElement>span).title = `${this._modalParmsSize.min}/${this._modalParmsSize.max}`;
                    break;
                case 'path-from':
                    (<HTMLElement>span).title = `${this._modalParmsPathFrom.min}/${this._modalParmsPathFrom.max}`;
                    break;
                case 'path-to':
                    (<HTMLElement>span).title = `${this._modalParmsPathTo.min}/${this._modalParmsPathTo.max}`;
                    break;            }
        }
    }

    private Show(): void {
        this._showParms.innerHTML = '';
        let p = document.createElement('p');
        p.innerHTML = `<span data-range="amount">Количество:</span>&nbsp;<span contenteditable="true" data-name="amount" data-validate="true">${this._params.amount}</span>`
            + `&nbsp;&nbsp; Скорость:&nbsp<span data-menu="speed">${this._params.speed[0]}</span>`
            + `&nbsp;&nbsp; <span data-range="size">Размер:</span>&nbsp<span contenteditable="true" data-name="size" data-validate="true">${this._params.size}</span>`
            + `&nbsp;&nbsp; Вид&nbspфигуры:&nbsp<span data-menu="kind">${this._params.kind[0]}</span>`
            + `&nbsp;&nbsp; Тип&nbspзаливки:&nbsp<span data-menu="fill">${this._params.fill[0]}</span>`
            + `&nbsp;&nbsp; Длина&nbspпути:`
            + `&nbsp<span data-range="path-from">от</span>&nbsp<span contenteditable="true" data-name="path-from" data-validate="true">${this._params.path[0]}</span>`
            + `&nbsp<span data-range="path-to">до</span>&nbsp<span contenteditable="true" data-name="path-to" data-validate="true">${this._params.path[1]}</span >`
            + `&nbsp;&nbsp; Масштабность:&nbsp;<span data-menu="scale">${this._params.scale[0]}</span>`;
        this._showParms.appendChild(p);
        this.DefineEventsContenteditable();
        this.DefineEventsParamSelect();
        this.DefineEventsRange();
        this.InitRangesTitle();
    }

    private SetDefault(): void {
        // Speed
        for (let speed of document.getElementsByName('speed')) {
            if (Number(speed.dataset.speed) == this._params.default.speed[1]) {
                (<HTMLInputElement>speed).checked = true;
                speed.click();
            }
        }
        // Amount
        this._modalParmsAmount.value = this._params.default.amount.toString();
        this._modalParmsAmount.dispatchEvent(new Event('input'));
        this._modalParmsAmount.dispatchEvent(new Event('change'));
        // Kind
        for (let kind of document.getElementsByName('kind')) {
            if (Number(kind.dataset.kind) == this._params.default.kind[1]) {
                (<HTMLInputElement>kind).checked = true;
                kind.click();
            }
        }
        // Fill
        for (let fill of document.getElementsByName('fill')) {
            if (Number(fill.dataset.fill) == this._params.default.fill[1]) {
                (<HTMLInputElement>fill).checked = true;
                fill.click();
            }
        }
        // Scale
        for (let scale of document.getElementsByName('scale')) {
            if (Number(scale.dataset.scale) == this._params.default.scale[1]) {
                (<HTMLInputElement>scale).checked = true;
                scale.click();
            }
        }
        // Size
        this._modalParmsSize.value = this._params.default.size.toString();
        this._modalParmsSize.dispatchEvent(new Event('input'));
        this._modalParmsSize.dispatchEvent(new Event('change'));
        // Path
        this._modalParmsPathFrom.value = this._params.default.path[0].toString();
        this._modalParmsPathTo.value = this._params.default.path[1].toString();
        this._modalParmsPathFrom.dispatchEvent(new Event('input'));
        this._modalParmsPathTo.dispatchEvent(new Event('input'));
        this._modalParmsPathFrom.dispatchEvent(new Event('change'));
        this._modalParmsPathTo.dispatchEvent(new Event('change'));
    }

    private RangeContenteditableValidate(e: Event) {
        let span: HTMLElement = <HTMLElement>e.target;
        // Проверка на ведущие нули
        if (/^0+/.test(span.innerText)) span.innerText = span.innerText.replace(/^0+/, '');
        // Проверка на перевод строки
        if (/\n/g.test(span.innerText)) span.innerText = span.innerText.replace(/\n/g, '');
        span.dataset.validate = this.IsRangeContenteditableValidate(span.innerText, span.dataset.name).toString();
    }

    private RangeEnter(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            let span: HTMLElement = <HTMLElement>e.target;
            if (this.IsRangeContenteditableValidate(span.innerText, span.dataset.name) && !this.IsEqualNewOld(Number(span.innerText), span.dataset.name)) {
                span.blur();
            } else if (!this.IsRangeContenteditableValidate(span.innerText, span.dataset.name)) {
                this.SetCorrectRange(span.innerText, span.dataset.name)
            }
        }
    }

    private SetRangeContenteditable(e: FocusEvent) {
        let span: HTMLElement = <HTMLElement>e.target;
        if (this.IsRangeContenteditableValidate(span.innerText, span.dataset.name) && !this.IsEqualNewOld(Number(span.innerText), span.dataset.name)) {
            switch (span.dataset.name) {
                case 'size':
                    this._modalParmsSize.value = span.innerText;
                    this._modalParmsSize.dispatchEvent(new Event('input'));
                    this._modalParmsSize.dispatchEvent(new Event('change'));
                    break;
                case 'amount':
                    this._modalParmsAmount.value = span.innerText;
                    this._modalParmsAmount.dispatchEvent(new Event('input'));
                    this._modalParmsAmount.dispatchEvent(new Event('change'));
                    break;
                case 'path-from':
                    this._modalParmsPathFrom.value = span.innerText;
                    this._modalParmsPathFrom.dispatchEvent(new Event('input'));
                    this._modalParmsPathFrom.dispatchEvent(new Event('change'));
                    break;
                case 'path-to':
                    this._modalParmsPathTo.value = span.innerText;
                    this._modalParmsPathTo.dispatchEvent(new Event('input'));
                    this._modalParmsPathTo.dispatchEvent(new Event('change'));
                    break;
            }
        } else {
            // Restore show
            this._modalParmsSize.dispatchEvent(new Event('input'));
            this._modalParmsAmount.dispatchEvent(new Event('input'));
            this._modalParmsPathFrom.dispatchEvent(new Event('input'));
            this._modalParmsPathTo.dispatchEvent(new Event('input'));
        }
    }

    private IsRangeContenteditableValidate(span: string, name: string): boolean {
        let isValidate: boolean = false;
        if (/^[0-9]+$/.test(span)) {
            isValidate = true;
            // Контроль на допустимый диапазон
            let range: number = Number(span);
            switch (name) {
                case 'size':
                    if (range < MinSize || range > MaxSize) isValidate = false;
                    break;
                case 'amount': ;
                    if (range < MinAmount || range > MaxAmount) isValidate = false;
                    break;
                case 'path-from': ;
                    if ((range < MinPath || range > MaxPath) || (range > this._params.path[1])) isValidate = false;
                    break;
                case 'path-to': ;
                    if ((range < MinPath || range > MaxPath) || (range < this._params.path[0])) isValidate = false;
                    break;
            }
        };
        return isValidate;
    }

    private SetCorrectRange(span: string, name: string): void {
        // Контроль на допустимый диапазон
        let range: number = Number(span);
        switch (name) {
            case 'size':
                span = this._modalParmsSize.value;
                break;
            case 'amount': ;
                span = this._modalParmsAmount.value;
                break;
            case 'path-from': ;
                span = this._modalParmsPathFrom.value;
                break;
            case 'path-to': ;
                span = this._modalParmsPathTo.value;
                break;
        }
    }

    private IsEqualNewOld(newParm: number, name: string): boolean {
        let isEqual: boolean = false;
        switch (name) {
            case 'size':
                if (newParm == this._params.size) isEqual = true;
                break;
            case 'amount':
                if (newParm == this._params.amount) isEqual = true;
                break;
            case 'path-from':
                if (newParm == this._params.path[0]) isEqual = true;
                break;
            case 'path-to':
                if (newParm == this._params.path[1]) isEqual = true;
                break;
        }
        return isEqual;
    }

    private OnParamMenuClick(e: MouseEvent): void {
        let span: HTMLElement = <HTMLElement>e.target;
        if (isDisplayBlock(this._menuSelect) && this._menuSelect.dataset.type === span.dataset.menu) {
            this._menuSelect.dataset.type = 'empty';
            this._menuSelect.style.display = 'none';
            return;
        }
        this._menuSelect.dataset.type = span.dataset.menu;
        this._menuSelect.innerHTML = '';
        let coords = span.getBoundingClientRect();
        this._menuSelect.style.left = coords.left + 5 + "px";
        this._menuSelect.style.top = coords.bottom + "px";
        switch (span.dataset.menu) {
            case 'speed':
                this.CreateItemsOfSpeedPanel(this._menuSelect, true);
                break;
            case 'kind':
                this.CreateItemsOfElenetKindPanel(this._menuSelect, true);
                break;
            case 'fill':
                this.CreateItemsOfFillTypePanel(this._menuSelect, true);
                break;
            case 'scale':
                this.CreateItemsOfScaleAreaPanel(this._menuSelect, true);
                break;
            default:
                this._menuSelect.innerHTML = `<p>${span.dataset.menu}</p>`
                break;
        }
        this._menuSelect.className = 'overflow-auto add-conditions';
        this._menuSelect.style.display = 'flex';
    }

    private OnWindowChange(): void {
        this.SetEmptyMenuSelect();
    }

    private SetEmptyMenuSelect(): void {
        this._menuSelect.dataset.type = 'empty';
        this._menuSelect.style.display = 'none';
    }

}
