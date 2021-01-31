// Multi-System Window Modeling 
// View for Model of Parameters

import {
    FillType,
    ScaleArea,
    Params,    CustomEventPermissionsIsSelected,
} from '../model/mwsParams';
import {
    MwsConstraints,
    NameKindFigureFlag,
    NameKindFigureRectangle
} from '../model/modelMWS';
import { isDisplayBlock } from '../../../../js-advanced/_pgkUtils'

export class ViewParams {
    private constructor(
        params: Params,
        //
        showParms: HTMLElement,
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
        menuSelect: HTMLElement
    ) {
        this._params = params;
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
        this._menuSelect = menuSelect;
        //
        this.CreateItemsOfFillTypePanel(this._modalParmsFillTypePanel);
        this.CreateItemsOfScaleAreaPanel(this._modalParmsScaleAreaPanel);
        this.InitSelectedItemInfo();
        //
        this.DefineEvents();
        this.Show();
    }
    // Fields
    private static _instance: ViewParams = undefined;
    // Fields - Fields: dependencies
    private _params: Params;
    // Fields like DOM elements
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
    private _menuSelect: HTMLElement;

    // Properties
    static get instance(): ViewParams {
        if (!ViewParams._instance) {
            throw new Error('Instance of ViewParams was not created.');
        }
        return ViewParams._instance;
    }

    // Methods
    static Create(
        params: Params,
        showParms: HTMLElement,
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
        menuSelect: HTMLElement
    ): ViewParams {
        if (!ViewParams._instance) {
            ViewParams._instance = new ViewParams(
                params,
                //
                showParms,
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
                menuSelect
            );
        }
        return ViewParams._instance;
    }

    Open(): void {
        // Setting actual values
        for (let scale of document.getElementsByName('scale')) {
            if (this._params.scale[1] == Number(scale.dataset.scale)) {
                (<HTMLInputElement>scale).checked = true;
            }
        }
        this._modalParmsIsTrackProportionsAreaMotion.checked = this._params.isTrackProportionsAreaMotion;
        this._modalParmsIsTranslucentModal.checked = this._params.isTranslucentModal;
        this.SetOpacityModal(this._params.isTranslucentModal);
        // To Active
        this._modalParmsOK.onclick = () => { this._modalParms.style.display = 'none'; };
        this._modalParms.style.display = 'block';
    }

    // Helpers
    private DefineEvents(): void {
        for (let fill of document.getElementsByName('fill')) {
            fill.addEventListener('click', () => {
                this._params.fill = Array.from(FillType.entries()).find((pair) => pair[1] === Number(fill.dataset.fill));
            }, false);
        }
        for (let scale of document.getElementsByName('scale')) {
            scale.addEventListener('click', () => {
                this._params.scale = Array.from(ScaleArea.entries()).find((pair) => pair[1] === Number(scale.dataset.scale));
            }, false);
        }
        this._modalParmsIsOffscreenCanvas.addEventListener('click', () => { this._params.isOffScreenCanvas = this._modalParmsIsOffscreenCanvas.checked; }, false);
        this._modalParmsIsTranslucentModal.addEventListener('click', () => { this._params.isTranslucentModal = this._modalParmsIsTranslucentModal.checked; }, false);
        this._modalParmsIsTrackProportionsAreaMotion.addEventListener('click', () => { this._params.isTrackProportionsAreaMotion = this._modalParmsIsTrackProportionsAreaMotion.checked; }, false);
        //
        document.addEventListener(this._params.nameEventIsTranslucent, (e: CustomEvent) => { this.OnIsTranslucentModal(e); }, false);
        document.addEventListener(Params.instance.nameEventCanvasCoordinates, (e: CustomEvent) => { this.OnChangeCanvasCoordinates(e); }, false);
        document.addEventListener(Params.instance.nameEventSerialNumberTracking, (e: CustomEvent) => { this.OnSerialNumberTracking(e); }, false);
        document.addEventListener(Params.instance.nameEventWPropStored, (e: CustomEvent) => { this.OnChangeWPropStored(e); }, false);
        document.addEventListener(CustomEventPermissionsIsSelected, (e: CustomEvent) => { this.PermissionsIsSelected(e); }, false);
        //
        window.addEventListener('resize', () => { this.OnWindowChange(); }, false);
        window.addEventListener('scroll', () => { this.OnWindowChange(); }, false);
    }

    private Show(): void {
        let isContentEditable: boolean = false;
        let isSelectFlag: boolean = false;
        if (this._params.wPropStored.serialNumber > 0) {
            isContentEditable = true;
            isSelectFlag = this._params.wPropStored.kind[0] == NameKindFigureFlag;
        }
        this._showParms.innerHTML = '';
        let p = document.createElement('p');
        p.innerHTML = `Тип&nbspзаливки:&nbsp<span ` + `${!isSelectFlag ? 'data-menu="fill"' : ''}` + `>${this._params.wPropStored.fillType[0]}</span>`
            + `&nbsp; Масштабность:&nbsp;<span data-menu="scale">${this._params.scale[0]}</span>`
            + `&nbsp; SN-tracking:&nbsp${this._params.serialNumberTracking}`
            + `&nbsp; <b>${this._params.wPropStored.kind[0].charAt(0).toUpperCase()}${this._params.wPropStored.kind[0].slice(1)}-${this._params.wPropStored.serialNumber}</b>`
            + `&nbsp; X:&nbsp${this._params.wPropStored.x}`
            + `&nbsp; Y:&nbsp${this._params.wPropStored.y}`
            + `&nbsp; <span data-range="width">Width:</span>&nbsp<span contenteditable="${isContentEditable}" data-name="width" data-validate="true">${this._params.wPropStored.width}</span>`
            + `&nbsp; <span ` + `${!isSelectFlag ? 'data-range="height"' : ''}` + `>Height:</span>&nbsp<span contenteditable="${isContentEditable && !isSelectFlag}" data-name="height" data-validate="true">${this._params.wPropStored.height}</span>`
            + `&nbsp; <b>Колебания</b>`
            + `&nbsp; <span data-range="lengthwave">Длина:</span>&nbsp<span contenteditable="${isContentEditable}" data-name="lengthwave" data-validate="true">${this._params.wPropStored.waveLength}</span>`
            + `&nbsp; <span data-range="amplitudewave">Амплитуда:</span>&nbsp<span contenteditable="${isContentEditable}" data-name="amplitudewave" data-validate="true">${this._params.wPropStored.waveAmplitude}</span>`
            + `&nbsp; <span data-range="periodwave">Период:</span>&nbsp<span contenteditable="${isContentEditable}" data-name="periodwave" data-validate="true">${this._params.wPropStored.wavePeriod}</span>`
            + `&nbsp; <span data-range="shading">Затенение:</span>&nbsp<span contenteditable="${isContentEditable}" data-name="shading" data-validate="true">${this._params.wPropStored.waveShading}</span>`
            + `&nbsp; Координаты:&nbsp${this._params.canvasCoordinates}`
            ;
        this._modalParmsShowSelectedItemWidthValue.contentEditable = `${isContentEditable}`;
        this._modalParmsShowSelectedItemHeightValue.contentEditable = `${isContentEditable && !isSelectFlag}`;
        this._modalParmsShowSelectedItemLengthwaveValue.contentEditable = `${isContentEditable}`;
        this._modalParmsShowSelectedItemAmplitudewaveValue.contentEditable = `${isContentEditable}`;
        this._modalParmsShowSelectedItemPeriodwaveValue.contentEditable = `${isContentEditable}`;
        this._modalParmsShowSelectedItemShadingwaveValue.contentEditable = `${isContentEditable}`;
        this._showParms.appendChild(p);
        this.DefineEventsContenteditable();
        this.DefineEventsParamSelect();
        this.DefineEventsRange();
        this.InitRangesTitle();
    }

    private DefineEventsContenteditable(): void {
        for (let span of document.querySelectorAll('[contenteditable=true]')) {
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

    private InitRangesTitle(): void {
        for (let span of document.querySelectorAll('[contenteditable]')) {
            let name: string = (<HTMLElement>span).dataset.name;
            switch (name) {
                case 'width':
                    (<HTMLElement>span).title = `${this._modalParmsSelectedItemWidth.min}/${this._modalParmsSelectedItemWidth.max}`;
                    break;
                case 'height':
                    (<HTMLElement>span).title = `${this._modalParmsSelectedItemHeight.min}/${this._modalParmsSelectedItemHeight.max}`;
                    break;
                case 'lengthwave':
                    (<HTMLElement>span).title = `${this._modalParmsSelectedItemLengthwave.min}/${this._modalParmsSelectedItemLengthwave.max}`;
                    break;
                case 'amplitudewave':
                    (<HTMLElement>span).title = `${this._modalParmsSelectedItemAmplitudewave.min}/${this._modalParmsSelectedItemAmplitudewave.max}`;
                    break;
                case 'periodwave':
                    (<HTMLElement>span).title = `${this._modalParmsSelectedItemPeriodwave.min}/${this._modalParmsSelectedItemPeriodwave.max}`;
                    break;
                case 'shading':
                    (<HTMLElement>span).title = `${this._modalParmsSelectedItemShadingwave.min}/${this._modalParmsSelectedItemShadingwave.max}`;
                    break;
            }
        }
    }

    private RangeContenteditableValidate(e: Event) {
        let span: HTMLElement = <HTMLElement>e.target;
        // Проверка на ведущие нули
        if (/^0+/.test(span.innerText) && span.innerText.length > 1) span.innerText = span.innerText.replace(/^0+/, '');
        // Проверка на перевод строки
        if (/\n/g.test(span.innerText)) span.innerText = span.innerText.replace(/\n/g, '');
        span.dataset.validate = this.IsRangeContenteditableValidate(span.innerText, span.dataset.name).toString();
    }

    private SetRangeContenteditable(e: FocusEvent) {
        let span: HTMLElement = <HTMLElement>e.target;
        if (this.IsRangeContenteditableValidate(span.innerText, span.dataset.name) && !this.IsEqualNewOld(Number(span.innerText), span.dataset.name)) {
            switch (span.dataset.name) {
                case 'width':
                    this.SetItemWidth(span.innerText);
                    break;
                case 'height':
                    this.SetItemHeight(span.innerText);
                    break;
                case 'lengthwave':
                    this.SetLengthWave(span.innerText);
                    break;
                case 'amplitudewave':
                    this.SetAmplitudeWave(span.innerText);
                    break;
                case 'periodwave':
                    this.SetPeriodWave(span.innerText);
                    break;
                case 'shading':
                    this.SetShadingWave(span.innerText);
                    break;
            }
        } else {
            // Restore show
            this._modalParmsSelectedItemWidth.dispatchEvent(new Event('input'));
            this._modalParmsSelectedItemHeight.dispatchEvent(new Event('input'));
            this._modalParmsSelectedItemLengthwave.dispatchEvent(new Event('input'));
            this._modalParmsSelectedItemAmplitudewave.dispatchEvent(new Event('input'));
            this._modalParmsSelectedItemPeriodwave.dispatchEvent(new Event('input'));
            this._modalParmsSelectedItemShadingwave.dispatchEvent(new Event('input'));
        }
    }

    private RangeEnter(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            let span: HTMLElement = <HTMLElement>e.target;
            if (this.IsRangeContenteditableValidate(span.innerText, span.dataset.name) && !this.IsEqualNewOld(Number(span.innerText), span.dataset.name)) {
                span.blur();
            }
        }
    }

    private IsRangeContenteditableValidate(span: string, name: string): boolean {
        let isValidate: boolean = false;
        if (/^[0-9]+$/.test(span)) {
            isValidate = true;
            // Контроль на допустимый диапазон
            let range: number = Number(span);
            switch (name) {
                case 'width':
                    if (range < Number(this._modalParmsSelectedItemWidth.min) || range > Number(this._modalParmsSelectedItemWidth.max)) isValidate = false;
                    break;
                case 'height':
                    if (range < Number(this._modalParmsSelectedItemHeight.min) || range > Number(this._modalParmsSelectedItemHeight.max)) isValidate = false;
                    break;
                case 'lengthwave':
                    if (range < Number(this._modalParmsSelectedItemLengthwave.min) || range > Number(this._modalParmsSelectedItemLengthwave.max)) isValidate = false;
                    break;
                case 'amplitudewave':
                    if (range < Number(this._modalParmsSelectedItemAmplitudewave.min) || range > Number(this._modalParmsSelectedItemAmplitudewave.max)) isValidate = false;
                    break;
                case 'periodwave':
                    if (range < Number(this._modalParmsSelectedItemPeriodwave.min) || range > Number(this._modalParmsSelectedItemPeriodwave.max)) isValidate = false;
                    break;
                case 'shading':
                    if (range < Number(this._modalParmsSelectedItemShadingwave.min) || range > Number(this._modalParmsSelectedItemShadingwave.max)) isValidate = false;
                    break;
            }
        };
        return isValidate;
    }

    private IsEqualNewOld(newParm: number, name: string): boolean {
        let isEqual: boolean = false;
        switch (name) {
            case 'width':
                if (newParm == this._params.wPropStored.width) isEqual = true;
                break;
            case 'height':
                if (newParm == this._params.wPropStored.height) isEqual = true;
                break;
            case 'lengthwave':
                if (newParm == this._params.wPropStored.waveLength) isEqual = true;
                break;
            case 'amplitudewave':
                if (newParm == this._params.wPropStored.waveAmplitude) isEqual = true;
                break;
            case 'periodwave':
                if (newParm == this._params.wPropStored.wavePeriod) isEqual = true;
                break;
            case 'shading':
                if (newParm == this._params.wPropStored.waveShading) isEqual = true;
                break;
        }
        return isEqual;
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
            if (fill[1] == this._params.wPropStored.fillType[1]) {
                rb.checked = true;
            }
            if (isMenu) {
                rb.onclick = (e) => {
                    let button: HTMLInputElement = <HTMLInputElement>e.target;
                    this._params.fill = Array.from(FillType.entries()).find((pair) => pair[1] === Number(button.dataset.fill));
                    this.Show();
                    this.DisableMenuSelect();
                };
            }
            panel.appendChild(rb);
            panel.appendChild(lbl);
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
                    this.DisableMenuSelect();
                };
            }
            panel.appendChild(rb);
            panel.appendChild(lbl);
        }
    }

    private InitSelectedItemInfo() {
        this.SetSelectedItemInfo();
        // Item Width, Height
        this.SetSizeConstraintsForSelectedItem();
        //
        this._modalParmsSelectedItemWidth.addEventListener('change', () => {
            this._params.wPropStored.width = Number(this._modalParmsSelectedItemWidth.value);
            this.Show();
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredWidthChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemWidth.value) } }));
        }, false);
        this._modalParmsSelectedItemWidth.addEventListener('input', () => {
            this._modalParmsShowSelectedItemWidthValue.innerText = this._modalParmsSelectedItemWidth.value;
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredWidthChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemWidth.value) } }));
        }, false);
        this._modalParmsSelectedItemHeight.addEventListener('change', () => {
            this._params.wPropStored.height = Number(this._modalParmsSelectedItemHeight.value);
            this.Show();
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredHeightChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemHeight.value) } }));
        }, false);
        this._modalParmsSelectedItemHeight.addEventListener('input', () => {
            this._modalParmsShowSelectedItemHeightValue.innerText = this._modalParmsSelectedItemHeight.value;
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredHeightChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemHeight.value) } }));
        }, false);
        //
        this.SetSelectedItemSize();
        //
        // Length Wave
        this._modalParmsSelectedItemLengthwave.addEventListener('change', () => {
            this._params.wPropStored.waveLength = Number(this._modalParmsSelectedItemLengthwave.value);
            this.Show();
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredLengthWaveChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemLengthwave.value) } }));
        }, false);
        this._modalParmsSelectedItemLengthwave.addEventListener('input', () => {
            this._modalParmsShowSelectedItemLengthwaveValue.innerText = this._modalParmsSelectedItemLengthwave.value;
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredLengthWaveChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemLengthwave.value) } }));
        }, false);
        //
        this.SetSelectedItemLengthWave();
        //
        // Amplitude Wave
        this._modalParmsSelectedItemAmplitudewave.addEventListener('change', () => {
            this._params.wPropStored.waveAmplitude = Number(this._modalParmsSelectedItemAmplitudewave.value);
            this.Show();
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredAmplitudeWaveChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemAmplitudewave.value) } }));
        }, false);
        this._modalParmsSelectedItemAmplitudewave.addEventListener('input', () => {
            this._modalParmsShowSelectedItemAmplitudewaveValue.innerText = this._modalParmsSelectedItemAmplitudewave.value;
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredAmplitudeWaveChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemAmplitudewave.value) } }));
        }, false);
        //
        this.SetSelectedItemAmplitudeWave();
        //
        // Period Wave
        this._modalParmsSelectedItemPeriodwave.addEventListener('change', () => {
            this._params.wPropStored.wavePeriod = Number(this._modalParmsSelectedItemPeriodwave.value);
            this.Show();
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredPeriodWaveChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemPeriodwave.value) } }));
        }, false);
        this._modalParmsSelectedItemPeriodwave.addEventListener('input', () => {
            this._modalParmsShowSelectedItemPeriodwaveValue.innerText = this._modalParmsSelectedItemPeriodwave.value;
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredPeriodWaveChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemPeriodwave.value) } }));
        }, false);
        //
        this.SetSelectedItemPeriodWave();
        //
        // Shading Wave
        this._modalParmsSelectedItemShadingwave.addEventListener('change', () => {
            this._params.wPropStored.waveShading = Number(this._modalParmsSelectedItemShadingwave.value);
            this.Show();
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredShadingWaveChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemShadingwave.value) } }));
        }, false);
        this._modalParmsSelectedItemShadingwave.addEventListener('input', () => {
            this._modalParmsShowSelectedItemShadingwaveValue.innerText = this._modalParmsSelectedItemShadingwave.value;
            document.dispatchEvent(new CustomEvent(this._params.nameEventWPropStoredShadingWaveChanged, { bubbles: true, detail: { value: Number(this._modalParmsSelectedItemShadingwave.value) } }));
        }, false);
        //
        this.SetSelectedItemShadingWave();
        this.SetSelectedItemShadingWave();
    }

    private SetSizeConstraintsForSelectedItem(): void {
        if (this._params.wPropStored.serialNumber > 0) {
            let canvasWidth = this._params.scale[1];
            let canvasHeight = Math.round(canvasWidth / 2);
            this._modalParmsSelectedItemWidth.min = Math.max(
                MwsConstraints.figureWidthMin,
                Math.floor(
                    this._params.wPropStored.measureCaptionHead.width +
                    Params.instance.sizeResizingZone * 2 +
                    this._params.wPropStored.measureCaptionMinimize.width +
                    Params.instance.sizeResizingZone * 2 +
                    this._params.wPropStored.measureCaptionMaximize.width +
                    Params.instance.sizeResizingZone * 2 +
                    this._params.wPropStored.measureCaptionClose.width +
                    Params.instance.sizeResizingZone
                )
            ).toString();
            this._modalParmsSelectedItemWidth.max = (canvasWidth - this._params.wPropStored.x - 1).toString();
            this._modalParmsSelectedItemHeight.min = (this._params.wPropStored.headerHeight + this._params.wPropStored.borderWidth * 2 + 5).toString();
            this._modalParmsSelectedItemHeight.max = (canvasHeight - this._params.wPropStored.y - 1).toString();
        } else {
            this._modalParmsSelectedItemWidth.min = '0';
            this._modalParmsSelectedItemWidth.max = '0';
            this._modalParmsSelectedItemHeight.min = '0';
            this._modalParmsSelectedItemHeight.max = '0';
        }
        this._modalParmsSelectedItemWidthRange.innerHTML = `${this._modalParmsSelectedItemWidth.min}/${this._modalParmsSelectedItemWidth.max}`;
        this._modalParmsSelectedItemHeightRange.innerHTML = `${this._modalParmsSelectedItemHeight.min}/${this._modalParmsSelectedItemHeight.max}`;
    }

    private SetSelectedItemInfo(): void {
        if (this._params.wPropStored.serialNumber > 0) {
            this._modalParmsSelectedItemInfo.innerHTML = `${this._params.wPropStored.kind[0].charAt(0).toUpperCase()}${this._params.wPropStored.kind[0].slice(1)}-${this._params.wPropStored.serialNumber}, X:&nbsp${this._params.wPropStored.x}, Y:&nbsp${this._params.wPropStored.y}`;
        } else {
            this._modalParmsSelectedItemInfo.innerHTML = '';
        }
    }

    private SetSelectedItemSize(): void {
        this._modalParmsSelectedItemWidth.value = this._params.wPropStored.width.toString();
        this._modalParmsSelectedItemHeight.value = this._params.wPropStored.height.toString();
        this._modalParmsShowSelectedItemWidthValue.innerText = this._modalParmsSelectedItemWidth.value;
        this._modalParmsShowSelectedItemHeightValue.innerText = this._modalParmsSelectedItemHeight.value;
    }

    private SetSelectedItemLengthWave() {
        if (this._params.wPropStored.serialNumber > 0) {
            this._modalParmsSelectedItemLengthwave.min = MwsConstraints.waveLenghthMin.toString();
            this._modalParmsSelectedItemLengthwave.max = MwsConstraints.waveLenghthMax.toString();
        } else {
            this._modalParmsSelectedItemLengthwave.min = '0';
            this._modalParmsSelectedItemLengthwave.max = '0';
        }
        this._modalParmsSelectedItemLengthwave.value = this._params.wPropStored.waveLength.toString();
        this._modalParmsShowSelectedItemLengthwaveValue.innerText = this._modalParmsSelectedItemLengthwave.value;
        this._modalParmsSelectedItemLengthwaveRange.innerHTML = `${this._modalParmsSelectedItemLengthwave.min}/${this._modalParmsSelectedItemLengthwave.max}`;
    }

    private SetSelectedItemAmplitudeWave() {
        if (this._params.wPropStored.serialNumber > 0) {
            this._modalParmsSelectedItemAmplitudewave.min = MwsConstraints.waveAmplitudeMin.toString();
            this._modalParmsSelectedItemAmplitudewave.max = MwsConstraints.waveAmplitudeMax.toString();
        } else {
            this._modalParmsSelectedItemAmplitudewave.min = '0';
            this._modalParmsSelectedItemAmplitudewave.max = '0';
        }
        this._modalParmsSelectedItemAmplitudewave.value = this._params.wPropStored.waveAmplitude.toString();
        this._modalParmsShowSelectedItemAmplitudewaveValue.innerText = this._modalParmsSelectedItemAmplitudewave.value;
        this._modalParmsSelectedItemAmplitudewaveRange.innerHTML = `${this._modalParmsSelectedItemAmplitudewave.min}/${this._modalParmsSelectedItemAmplitudewave.max}`;
    }

    private SetSelectedItemPeriodWave() {
        if (this._params.wPropStored.serialNumber > 0) {
            this._modalParmsSelectedItemPeriodwave.min = MwsConstraints.wavePeriodMin.toString();
            this._modalParmsSelectedItemPeriodwave.max = MwsConstraints.wavePeriodMax.toString();
        } else {
            this._modalParmsSelectedItemPeriodwave.min = '0';
            this._modalParmsSelectedItemPeriodwave.max = '0';
        }
        this._modalParmsSelectedItemPeriodwave.value = this._params.wPropStored.wavePeriod.toString();
        this._modalParmsShowSelectedItemPeriodwaveValue.innerText = this._modalParmsSelectedItemPeriodwave.value;
        this._modalParmsSelectedItemPeriodwaveRange.innerHTML = `${this._modalParmsSelectedItemPeriodwave.min}/${this._modalParmsSelectedItemPeriodwave.max}`;
    }

    private SetSelectedItemShadingWave() {
        if (this._params.wPropStored.serialNumber > 0) {
            this._modalParmsSelectedItemShadingwave.min = MwsConstraints.waveShadingMin.toString();
            this._modalParmsSelectedItemShadingwave.max = MwsConstraints.waveShadingMax.toString();
        } else {
            this._modalParmsSelectedItemShadingwave.min = '0';
            this._modalParmsSelectedItemShadingwave.max = '0';
        }
        this._modalParmsSelectedItemShadingwave.value = this._params.wPropStored.waveShading.toString();
        this._modalParmsShowSelectedItemShadingwaveValue.innerText = this._modalParmsSelectedItemShadingwave.value;
        this._modalParmsSelectedItemShadingwaveRange.innerHTML = `${this._modalParmsSelectedItemShadingwave.min}/${this._modalParmsSelectedItemShadingwave.max}`;
    }

    private OnParamMenuClick(e: MouseEvent): void {
        let span: HTMLElement = <HTMLElement>e.target;
        if (isDisplayBlock(this._menuSelect) && this._menuSelect.dataset.type === span.dataset.menu) {
            this.DisableMenuSelect();
            return;
        }
        this._menuSelect.dataset.type = span.dataset.menu;
        this._menuSelect.innerHTML = '';
        let coords = span.getBoundingClientRect();
        this._menuSelect.style.left = coords.left + 5 + "px";
        this._menuSelect.style.top = coords.bottom + "px";
        switch (span.dataset.menu) {
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

    private OnParamRangeClick(e: MouseEvent): void {
        let span: HTMLElement = <HTMLElement>e.target;
        if (isDisplayBlock(this._menuSelect) && this._menuSelect.dataset.type === span.dataset.range) {
            this.DisableMenuSelect();
            return;
        }
        this._menuSelect.dataset.type = span.dataset.range;
        this._menuSelect.innerHTML = '';
        let coords = span.getBoundingClientRect();
        this._menuSelect.style.left = coords.left + 5 + "px";
        this._menuSelect.style.top = coords.bottom + "px";
        this._menuSelect.className = 'pop-up-range';
        switch (span.dataset.range) {
            case 'width':
                this.CreatePopUpRange(span.dataset.range, this._params.wPropStored.width, [Number(this._modalParmsSelectedItemWidth.min), Number(this._modalParmsSelectedItemWidth.max)]);
                break;
            case 'height':
                this.CreatePopUpRange(span.dataset.range, this._params.wPropStored.height, [Number(this._modalParmsSelectedItemHeight.min), Number(this._modalParmsSelectedItemHeight.max)]);
                break;
            case 'lengthwave':
                this.CreatePopUpRange(span.dataset.range, this._params.wPropStored.waveLength, [Number(this._modalParmsSelectedItemLengthwave.min), Number(this._modalParmsSelectedItemLengthwave.max)]);
                break;
            case 'amplitudewave':
                this.CreatePopUpRange(span.dataset.range, this._params.wPropStored.waveAmplitude, [Number(this._modalParmsSelectedItemAmplitudewave.min), Number(this._modalParmsSelectedItemAmplitudewave.max)]);
                break;
            case 'periodwave':
                this.CreatePopUpRange(span.dataset.range, this._params.wPropStored.wavePeriod, [Number(this._modalParmsSelectedItemPeriodwave.min), Number(this._modalParmsSelectedItemPeriodwave.max)]);
                break;
            case 'shading':
                this.CreatePopUpRange(span.dataset.range, this._params.wPropStored.waveShading, [Number(this._modalParmsSelectedItemShadingwave.min), Number(this._modalParmsSelectedItemShadingwave.max)]);
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
            case 'width':
                this.SetItemWidth(input.value);
                break;
            case 'height':
                this.SetItemHeight(input.value);
                break;
            case 'lengthwave':
                this.SetLengthWave(input.value);
                break;
            case 'amplitudewave':
                this.SetAmplitudeWave(input.value);
                break;
            case 'periodwave':
                this.SetPeriodWave(input.value);
                break;
            case 'shading':
                this.SetShadingWave(input.value);
                break;
            default:
                break;
        }
        this.Show();
    }

    private SetItemWidth(value: string) {
        this._modalParmsSelectedItemWidth.value = value;
        this._modalParmsSelectedItemWidth.dispatchEvent(new Event('input'));
        this._modalParmsSelectedItemWidth.dispatchEvent(new Event('change'));
    }

    private SetItemHeight(value: string) {
        this._modalParmsSelectedItemHeight.value = value;
        this._modalParmsSelectedItemHeight.dispatchEvent(new Event('input'));
        this._modalParmsSelectedItemHeight.dispatchEvent(new Event('change'));
    }

    private SetLengthWave(value: string) {
        this._modalParmsSelectedItemLengthwave.value = value;
        this._modalParmsSelectedItemLengthwave.dispatchEvent(new Event('input'));
        this._modalParmsSelectedItemLengthwave.dispatchEvent(new Event('change'));
    }

    private SetAmplitudeWave(value: string) {
        this._modalParmsSelectedItemAmplitudewave.value = value;
        this._modalParmsSelectedItemAmplitudewave.dispatchEvent(new Event('input'));
        this._modalParmsSelectedItemAmplitudewave.dispatchEvent(new Event('change'));
    }

    private SetPeriodWave(value: string) {
        this._modalParmsSelectedItemPeriodwave.value = value;
        this._modalParmsSelectedItemPeriodwave.dispatchEvent(new Event('input'));
        this._modalParmsSelectedItemPeriodwave.dispatchEvent(new Event('change'));
    }

    private SetShadingWave(value: string) {
        this._modalParmsSelectedItemShadingwave.value = value;
        this._modalParmsSelectedItemShadingwave.dispatchEvent(new Event('input'));
        this._modalParmsSelectedItemShadingwave.dispatchEvent(new Event('change'));
    }

    private OnIsTranslucentModal(e: CustomEvent) {
        this.SetOpacityModal(e.detail.value);
    }

    private SetOpacityModal(isTranslucent: boolean): void {
        if (isTranslucent) {
            this._modalParms.style.opacity = '0.7';
        } else {
            this._modalParms.style.opacity = '1';
        }
    }

    private OnWindowChange(): void {
        this.DisableMenuSelect();
    }

    private DisableMenuSelect(): void {
        this._menuSelect.dataset.type = 'empty';
        this._menuSelect.style.display = 'none';
    }

    private OnChangeCanvasCoordinates(e: CustomEvent) {
        this.Show();
    }

    private OnSerialNumberTracking(e: CustomEvent) {
        this.Show();
    }

    private OnChangeWPropStored(e: CustomEvent) {
        this.Show();
        // Setting actual values in modal window
        for (let fill of document.getElementsByName('fill')) {
            if (this._params.wPropStored.fillType[1] == Number(fill.dataset.fill)) {
                (<HTMLInputElement>fill).checked = true;
            }
        }
        this.SetSelectedItemInfo();
        this.SetSizeConstraintsForSelectedItem();
        this.SetSelectedItemSize();
        this.SetSelectedItemLengthWave();
        this.SetSelectedItemAmplitudeWave();
        this.SetSelectedItemPeriodWave();
        this.SetSelectedItemShadingWave();
    }

    private PermissionsIsSelected(e: CustomEvent): void {
        if (e.detail.kind[0] == NameKindFigureRectangle) {
            this.SetPermissionIsSelected(false);
        } else if (e.detail.kind[0] == NameKindFigureFlag) {
            this.SetPermissionIsSelected(true);
        }
    }

    private SetPermissionIsSelected(isSelectedFlag: boolean) {
        this.Show();
        this._modalParmsSelectedItemHeight.disabled = isSelectedFlag;
        for (let fill of document.getElementsByName('fill')) {
            (<HTMLInputElement>fill).disabled = isSelectedFlag;
        }
    }

}