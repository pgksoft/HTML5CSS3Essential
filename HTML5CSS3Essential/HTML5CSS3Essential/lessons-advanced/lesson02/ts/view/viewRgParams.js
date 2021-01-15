import { ScaleArea, CustomEventOverFill, RGFillingDirection, FillingDirectionManual } from '../model/rgParams.js';
import { Colors, GradientColorScheme } from '../../../../js-advanced/colorManagement.js';
import { isDisplayBlock } from '../../../../js-advanced/_pgkUtils.js';
export class ViewRGParmsDefinition {
    constructor(params, domItems) {
        this._params = params;
        this._domItems = domItems;
        this.CreateItemsOfScaleAreaPanel(this._domItems.modalParmsScaleArea);
        this.CreateItemsOfFillingDirectionAreaPanel(this._domItems.modalParmsFillingDirectionArea);
        this.CreateItemsOfAllColorsAreaPanel(this._domItems.modalParmsAllColorsArea);
        this.CreateItemsOfColorSchemeAreaPanel(this._domItems.modalParmsColorSchemeArea);
        this.InitRanages();
        this.DefineEvents();
        this.OnFillingDirectionChange();
        this.Show();
    }
    static get instance() {
        if (!ViewRGParmsDefinition._instance) {
            throw new Error('Instance of ViewParams was not created.');
        }
        return ViewRGParmsDefinition._instance;
    }
    static Create(params, domItems) {
        if (!ViewRGParmsDefinition._instance) {
            ViewRGParmsDefinition._instance = new ViewRGParmsDefinition(params, domItems);
        }
        return ViewRGParmsDefinition._instance;
    }
    Open() {
        for (let scale of document.getElementsByName('scale')) {
            if (this._params.scale[1] == Number(scale.dataset.scale)) {
                scale.checked = true;
            }
        }
        for (let fillingDirection of document.getElementsByName('filling-direction')) {
            if (this._params.fillingDirection[1] == Number(fillingDirection.dataset.fillingDirection)) {
                fillingDirection.checked = true;
            }
        }
        this.InitRanages();
        this._domItems.modalParmsIsAutoColorScheme.checked = this._params.isAutoColorScheme;
        this._domItems.modalParmsIsTrackProportionsAreaRG.checked = this._params.isTrackProportionsAreaRG;
        this._domItems.modalParmsIsTranslucentModal.checked = this._params.isTranslucentModal;
        this.SetOpacityModal(this._params.isTranslucentModal);
        this._domItems.modalParmsOK.onclick = () => { this._domItems.modalParms.style.display = 'none'; };
        this._domItems.modalParms.style.display = 'block';
    }
    DefineEvents() {
        for (let scale of document.getElementsByName('scale')) {
            scale.addEventListener('click', () => {
                this._params.scale = Array.from(ScaleArea.entries()).find((pair) => pair[1] === Number(scale.dataset.scale));
                this.Show();
            }, false);
        }
        for (let fillingDirection of document.getElementsByName('filling-direction')) {
            fillingDirection.addEventListener('click', () => {
                this._params.fillingDirection = Array.from(RGFillingDirection.entries()).find((pair) => pair[1] === Number(fillingDirection.dataset.fillingDirection));
                this.Show();
            }, false);
        }
        for (let element of document.querySelectorAll('[data-scheme=scheme]')) {
            element.onclick = (e) => { this.OnAllSchemeClick(e); };
        }
        this.DefineEventsColorScheme();
        this._domItems.modalParmsX.addEventListener('change', () => { this.OnChangeX(); }, false);
        this._domItems.modalParmsX.addEventListener('input', () => { this.OnChangeX(); }, false);
        this._domItems.modalParmsY.addEventListener('change', () => { this.OnChangeY(); }, false);
        this._domItems.modalParmsY.addEventListener('input', () => { this.OnChangeY(); }, false);
        this._domItems.modalParmsWidth.addEventListener('change', () => { this.OnChangeWidth(); }, false);
        this._domItems.modalParmsWidth.addEventListener('input', () => { this.OnChangeWidth(); }, false);
        this._domItems.modalParmsHeight.addEventListener('change', () => { this.OnChangeHeight(); }, false);
        this._domItems.modalParmsHeight.addEventListener('input', () => { this.OnChangeHeight(); }, false);
        this._domItems.modalParmsOneX.addEventListener('change', () => { this.OnChangeOneX(); }, false);
        this._domItems.modalParmsOneX.addEventListener('input', () => { this.OnChangeOneX(); }, false);
        this._domItems.modalParmsOneY.addEventListener('change', () => { this.OnChangeOneY(); }, false);
        this._domItems.modalParmsOneY.addEventListener('input', () => { this.OnChangeOneY(); }, false);
        this._domItems.modalParmsOneR.addEventListener('change', () => { this.OnChangeOneR(); }, false);
        this._domItems.modalParmsOneR.addEventListener('input', () => { this.OnChangeOneR(); }, false);
        this._domItems.modalParmsTwoX.addEventListener('change', () => { this.OnChangeTwoX(); }, false);
        this._domItems.modalParmsTwoX.addEventListener('input', () => { this.OnChangeTwoX(); }, false);
        this._domItems.modalParmsTwoY.addEventListener('change', () => { this.OnChangeTwoY(); }, false);
        this._domItems.modalParmsTwoY.addEventListener('input', () => { this.OnChangeTwoY(); }, false);
        this._domItems.modalParmsTwoR.addEventListener('change', () => { this.OnChangeTwoR(); }, false);
        this._domItems.modalParmsTwoR.addEventListener('input', () => { this.OnChangeTwoR(); }, false);
        this._domItems.modalParmsIsAutoColorScheme.addEventListener('click', () => { this._params.isAutoColorScheme = this._domItems.modalParmsIsAutoColorScheme.checked; }, false);
        this._domItems.modalParmsIsTranslucentModal.addEventListener('click', () => { this._params.isTranslucentModal = this._domItems.modalParmsIsTranslucentModal.checked; }, false);
        this._domItems.modalParmsIsTrackProportionsAreaRG.addEventListener('click', () => { this._params.isTrackProportionsAreaRG = this._domItems.modalParmsIsTrackProportionsAreaRG.checked; }, false);
        document.addEventListener(this._params.nameEventIsTranslucent, (e) => { this.OnIsTranslucentModal(e); }, false);
        document.addEventListener(this._params.nameEventScaleChange, () => { this.InitRanages(); }, false);
        document.addEventListener(CustomEventOverFill, () => {
            this.Show();
            this.CreateItemsOfColorSchemeAreaPanel(this._domItems.modalParmsColorSchemeArea);
            this.DefineEventsColorScheme();
        }, false);
        document.addEventListener(this._params.nameEventFillingDirectionChange, () => {
            this.Show();
            this.OnFillingDirectionChange();
        }, false);
        window.addEventListener('resize', () => { this.OnWindowChange(); }, false);
        window.addEventListener('scroll', () => { this.OnWindowChange(); }, false);
    }
    DefineEventsColorScheme() {
        for (let element of document.querySelectorAll('[data-scheme=color-scheme]')) {
            element.onclick = (e) => { this.OnColorSchemeClick(e); };
        }
    }
    OnChangeX() {
        this._params.x = Number(this._domItems.modalParmsX.value);
        this.ShowParmsX();
        this.Show();
    }
    OnChangeY() {
        this._params.y = Number(this._domItems.modalParmsY.value);
        this.ShowParmsY();
        this.Show();
    }
    OnChangeWidth() {
        this._params.width = Number(this._domItems.modalParmsWidth.value);
        this.ShowParmsWidth();
        this.Show();
    }
    OnChangeHeight() {
        this._params.height = Number(this._domItems.modalParmsHeight.value);
        this.ShowParmsHeight();
        this.Show();
    }
    OnChangeOneX() {
        this._params.xOne = Number(this._domItems.modalParmsOneX.value);
        this.ShowParmsOneX();
        this.Show();
    }
    OnChangeOneY() {
        this._params.yOne = Number(this._domItems.modalParmsOneY.value);
        this.ShowParmsOneY();
        this.Show();
    }
    OnChangeOneR() {
        this._params.rOne = Number(this._domItems.modalParmsOneR.value);
        this.ShowParmsOneR();
        this.Show();
    }
    OnChangeTwoX() {
        this._params.xTwo = Number(this._domItems.modalParmsTwoX.value);
        this.ShowParmsTwoX();
        this.Show();
    }
    OnChangeTwoY() {
        this._params.yTwo = Number(this._domItems.modalParmsTwoY.value);
        this.ShowParmsTwoY();
        this.Show();
    }
    OnChangeTwoR() {
        this._params.rTwo = Number(this._domItems.modalParmsTwoR.value);
        this.ShowParmsTwoR();
        this.Show();
    }
    OnFillingDirectionChange() {
        let isDisabled = true;
        if (this._params.fillingDirection[0] === FillingDirectionManual) {
            isDisabled = false;
        }
        this._domItems.modalParmsOneX.disabled = isDisabled;
        this._domItems.modalParmsOneY.disabled = isDisabled;
        this._domItems.modalParmsOneR.disabled = isDisabled;
        this._domItems.modalParmsTwoX.disabled = isDisabled;
        this._domItems.modalParmsTwoY.disabled = isDisabled;
        this._domItems.modalParmsTwoR.disabled = isDisabled;
        this._domItems.modalParmsShowValueOneX.contentEditable = (!isDisabled).toString();
        this._domItems.modalParmsShowValueOneY.contentEditable = (!isDisabled).toString();
        this._domItems.modalParmsShowValueOneR.contentEditable = (!isDisabled).toString();
        this._domItems.modalParmsShowValueTwoX.contentEditable = (!isDisabled).toString();
        this._domItems.modalParmsShowValueTwoY.contentEditable = (!isDisabled).toString();
        this._domItems.modalParmsShowValueTwoR.contentEditable = (!isDisabled).toString();
    }
    InitRanages() {
        this.InitRangeRect();
        this._domItems.modalParmsX.value = this._params.x.toString();
        this._domItems.modalParmsY.value = this._params.y.toString();
        this._domItems.modalParmsWidth.value = this._params.width.toString();
        this._domItems.modalParmsHeight.value = this._params.height.toString();
        this.ShowParmsX();
        this.ShowParmsY();
        this.ShowParmsWidth();
        this.ShowParmsHeight();
        this.InitRangeOneCircle();
        this._domItems.modalParmsOneX.value = this._params.xOne.toString();
        this._domItems.modalParmsOneY.value = this._params.yOne.toString();
        this._domItems.modalParmsOneR.value = this._params.rOne.toString();
        this.ShowParmsOneX();
        this.ShowParmsOneY();
        this.ShowParmsOneR();
        this.InitRangeTwoCircle();
        this._domItems.modalParmsTwoX.value = this._params.xTwo.toString();
        this._domItems.modalParmsTwoY.value = this._params.yTwo.toString();
        this._domItems.modalParmsTwoR.value = this._params.rTwo.toString();
        this.ShowParmsTwoX();
        this.ShowParmsTwoY();
        this.ShowParmsTwoR();
        this.InitRangesTitle();
    }
    InitRangesTitle() {
        for (let span of document.querySelectorAll('[contenteditable]')) {
            let name = span.dataset.name;
            switch (name) {
                case 'X':
                    span.title = `${this._domItems.modalParmsX.min}/${this._domItems.modalParmsX.max}`;
                    break;
                case 'Y':
                    span.title = `${this._domItems.modalParmsY.min}/${this._domItems.modalParmsY.max}`;
                    break;
                case 'width':
                    span.title = `${this._domItems.modalParmsWidth.min}/${this._domItems.modalParmsWidth.max}`;
                    break;
                case 'height':
                    span.title = `${this._domItems.modalParmsHeight.min}/${this._domItems.modalParmsHeight.max}`;
                    break;
                case 'one-X':
                    span.title = `${this._domItems.modalParmsOneX.min}/${this._domItems.modalParmsOneX.max}`;
                    break;
                case 'one-Y':
                    span.title = `${this._domItems.modalParmsOneY.min}/${this._domItems.modalParmsOneY.max}`;
                    break;
                case 'one-R':
                    span.title = `${this._domItems.modalParmsOneR.min}/${this._domItems.modalParmsOneR.max}`;
                    break;
                case 'two-X':
                    span.title = `${this._domItems.modalParmsTwoX.min}/${this._domItems.modalParmsTwoX.max}`;
                    break;
                case 'two-Y':
                    span.title = `${this._domItems.modalParmsTwoY.min}/${this._domItems.modalParmsTwoY.max}`;
                    break;
                case 'two-R':
                    span.title = `${this._domItems.modalParmsTwoR.min}/${this._domItems.modalParmsTwoR.max}`;
                    break;
            }
        }
    }
    InitRangeRect() {
        this._domItems.modalParmsX.min = '0';
        this._domItems.modalParmsX.max = this._params.areaWidth.toString();
        this._domItems.modalParmsY.min = '0';
        this._domItems.modalParmsY.max = this._params.areaHeight.toString();
        this._domItems.modalParmsWidth.min = '0';
        this._domItems.modalParmsWidth.max = this._params.areaWidth.toString();
        this._domItems.modalParmsHeight.min = '0';
        this._domItems.modalParmsHeight.max = this._params.areaHeight.toString();
    }
    InitRangeOneCircle() {
        this._domItems.modalParmsOneX.min = Math.floor(-this._params.areaWidth / 2).toString();
        this._domItems.modalParmsOneX.max = Math.floor(this._params.areaWidth * 2).toString();
        this._domItems.modalParmsOneY.min = Math.floor(-this._params.areaHeight / 2).toString();
        this._domItems.modalParmsOneY.max = Math.floor(this._params.areaHeight * 2).toString();
        this._domItems.modalParmsOneR.min = '0';
        this._domItems.modalParmsOneR.max = Math.floor(Math.max(this._params.areaWidth, this._params.areaHeight) * 2).toString();
    }
    InitRangeTwoCircle() {
        this._domItems.modalParmsTwoX.min = Math.floor(-this._params.areaWidth / 2).toString();
        this._domItems.modalParmsTwoX.max = Math.floor(this._params.areaWidth * 2).toString();
        this._domItems.modalParmsTwoY.min = Math.floor(-this._params.areaHeight / 2).toString();
        this._domItems.modalParmsTwoY.max = Math.floor(this._params.areaHeight * 2).toString();
        this._domItems.modalParmsTwoR.min = '0';
        this._domItems.modalParmsTwoR.max = Math.floor(Math.max(this._params.areaWidth, this._params.areaHeight) * 2).toString();
    }
    ShowParmsX(isDataRange = false) {
        if (!isDataRange) {
            this._domItems.modalParmsShowValueX.innerHTML = this._domItems.modalParmsX.value;
            this._domItems.modalParmsShowRangeX.innerHTML = `${this._domItems.modalParmsX.min}/${this._domItems.modalParmsX.max}`;
        }
        return `${this._domItems.modalParmsX.min}/${this._domItems.modalParmsX.max}`;
    }
    ShowParmsY(isDataRange = false) {
        if (!isDataRange) {
            this._domItems.modalParmsShowValueY.innerHTML = this._domItems.modalParmsY.value;
            this._domItems.modalParmsShowRangeY.innerHTML = `${this._domItems.modalParmsY.min}/${this._domItems.modalParmsY.max}`;
        }
        return `${this._domItems.modalParmsY.min}/${this._domItems.modalParmsY.max}`;
    }
    ShowParmsWidth(isDataRange = false) {
        if (!isDataRange) {
            this._domItems.modalParmsShowValueWidth.innerHTML = this._domItems.modalParmsWidth.value;
            this._domItems.modalParmsShowRangeWidth.innerHTML = `${this._domItems.modalParmsWidth.min}/${this._domItems.modalParmsWidth.max}`;
        }
        return `${this._domItems.modalParmsWidth.min}/${this._domItems.modalParmsWidth.max}`;
    }
    ShowParmsHeight(isDataRange = false) {
        if (!isDataRange) {
            this._domItems.modalParmsShowValueHeight.innerHTML = this._domItems.modalParmsHeight.value;
            this._domItems.modalParmsShowRangeHeight.innerHTML = `${this._domItems.modalParmsHeight.min}/${this._domItems.modalParmsHeight.max}`;
        }
        return `${this._domItems.modalParmsHeight.min}/${this._domItems.modalParmsHeight.max}`;
    }
    ShowParmsOneX(isDataRange = false) {
        if (!isDataRange) {
            this._domItems.modalParmsShowValueOneX.innerHTML = this._domItems.modalParmsOneX.value;
            this._domItems.modalParmsShowRangeOneX.innerHTML = `${this._domItems.modalParmsOneX.min}/${this._domItems.modalParmsOneX.max}`;
        }
        return `${this._domItems.modalParmsOneX.min}/${this._domItems.modalParmsOneX.max}`;
    }
    ShowParmsOneY(isDataRange = false) {
        if (!isDataRange) {
            this._domItems.modalParmsShowValueOneY.innerHTML = this._domItems.modalParmsOneY.value;
            this._domItems.modalParmsShowRangeOneY.innerHTML = `${this._domItems.modalParmsOneY.min}/${this._domItems.modalParmsOneY.max}`;
        }
        return `${this._domItems.modalParmsOneY.min}/${this._domItems.modalParmsOneY.max}`;
    }
    ShowParmsOneR(isDataRange = false) {
        if (!isDataRange) {
            this._domItems.modalParmsShowValueOneR.innerHTML = this._domItems.modalParmsOneR.value;
            this._domItems.modalParmsShowRangeOneR.innerHTML = `${this._domItems.modalParmsOneR.min}/${this._domItems.modalParmsOneR.max}`;
        }
        return `${this._domItems.modalParmsOneR.min}/${this._domItems.modalParmsOneR.max}`;
    }
    ShowParmsTwoX(isDataRange = false) {
        if (!isDataRange) {
            this._domItems.modalParmsShowValueTwoX.innerHTML = this._domItems.modalParmsTwoX.value;
            this._domItems.modalParmsShowRangeTwoX.innerHTML = `${this._domItems.modalParmsTwoX.min}/${this._domItems.modalParmsTwoX.max}`;
        }
        return `${this._domItems.modalParmsTwoX.min}/${this._domItems.modalParmsTwoX.max}`;
    }
    ShowParmsTwoY(isDataRange = false) {
        if (!isDataRange) {
            this._domItems.modalParmsShowValueTwoY.innerHTML = this._domItems.modalParmsTwoY.value;
            this._domItems.modalParmsShowRangeTwoY.innerHTML = `${this._domItems.modalParmsTwoY.min}/${this._domItems.modalParmsTwoY.max}`;
        }
        return `${this._domItems.modalParmsTwoY.min}/${this._domItems.modalParmsTwoY.max}`;
    }
    ShowParmsTwoR(isDataRange = false) {
        if (!isDataRange) {
            this._domItems.modalParmsShowValueTwoR.innerHTML = this._domItems.modalParmsTwoR.value;
            this._domItems.modalParmsShowRangeTwoR.innerHTML = `${this._domItems.modalParmsTwoR.min}/${this._domItems.modalParmsTwoR.max}`;
        }
        return `${this._domItems.modalParmsTwoR.min}/${this._domItems.modalParmsTwoR.max}`;
    }
    Show() {
        this._domItems.showParms.innerHTML = '';
        let p = document.createElement('p');
        if (this._params.fillingDirection[0] === FillingDirectionManual) {
            p.innerHTML = `Масштабность:&nbsp;<span data-menu="scale">${this._params.scale[0]}</span>`
                + `Направление заливки:&nbsp;<span data-menu="filling-direction">${this._params.fillingDirection[0]}</span>`
                + `<b> &nbsp;Rectangle</b>`
                + `&nbsp; <span data-range="X">X:</span>&nbsp<span contenteditable="true" data-name="X" data-validate="true">${this._params.x}</span>`
                + `&nbsp; <span data-range="Y">Y:</span>&nbsp<span contenteditable="true" data-name="Y" data-validate="true">${this._params.y}</span>`
                + `&nbsp; <span data-range="width">Width:</span>&nbsp<span contenteditable="true" data-name="width" data-validate="true">${this._params.width}</span>`
                + `&nbsp; <span data-range="height">Height:</span>&nbsp<span contenteditable="true" data-name="height" data-validate="true">${this._params.height}</span>`
                + `<br/>`
                + `<b>First&nbspcircle</b>`
                + `&nbsp; <span data-range="one-X">X1:</span>&nbsp<span contenteditable="true" data-name="one-X" data-validate="true">${this._params.xOne}</span>`
                + `&nbsp; <span data-range="one-Y">Y1:</span>&nbsp<span contenteditable="true" data-name="one-Y" data-validate="true">${this._params.yOne}</span>`
                + `&nbsp; <span data-range="one-R">R1:</span>&nbsp<span contenteditable="true" data-name="one-R" data-validate="true">${this._params.rOne}</span>`
                + `&nbsp; <b>Second&nbspcircle</b>`
                + `&nbsp; <span data-range="two-X">X2:</span>&nbsp<span contenteditable="true" data-name="two-X" data-validate="true">${this._params.xTwo}</span>`
                + `&nbsp; <span data-range="two-Y">Y2:</span>&nbsp<span contenteditable="true" data-name="two-Y" data-validate="true">${this._params.yTwo}</span>`
                + `&nbsp; <span data-range="two-R">R2:</span>&nbsp<span contenteditable="true" data-name="two-R" data-validate="true">${this._params.rTwo}</span>`
                + `<br/>`
                + `Цветовая схема:&nbsp;<span data-block-menu="block-scheme"></span>`;
        }
        else {
            p.innerHTML = `Масштабность:&nbsp;<span data-menu="scale">${this._params.scale[0]}</span>`
                + ` &nbsp; Направление заливки:&nbsp;<span data-menu="filling-direction">${this._params.fillingDirection[0]}</span>`
                + `<b> &nbsp;Rectangle</b>`
                + `&nbsp; <span data-range="X">X:</span>&nbsp<span contenteditable="true" data-name="X" data-validate="true">${this._params.x}</span>`
                + `&nbsp; <span data-range="Y">Y:</span>&nbsp<span contenteditable="true" data-name="Y" data-validate="true">${this._params.y}</span>`
                + `&nbsp; <span data-range="width">Width:</span>&nbsp<span contenteditable="true" data-name="width" data-validate="true">${this._params.width}</span>`
                + `&nbsp; <span data-range="height">Height:</span>&nbsp<span contenteditable="true" data-name="height" data-validate="true">${this._params.height}</span>`
                + `<br/>`
                + `<b>First&nbspcircle</b>`
                + `&nbsp; X1:&nbsp${this._params.xOne}`
                + `&nbsp; Y1:&nbsp${this._params.yOne}`
                + `&nbsp; R1:&nbsp${this._params.rOne}`
                + `&nbsp; <b>Second&nbspcircle</b>`
                + `&nbsp; X2:&nbsp${this._params.xTwo}`
                + `&nbsp; Y2:&nbsp${this._params.yTwo}`
                + `&nbsp; R2:&nbsp${this._params.rTwo}`
                + `<br/>`
                + `Цветовая схема:&nbsp;<span data-block-menu="block-scheme"></span>`;
        }
        this._domItems.showParms.appendChild(p);
        this.ShowScheme();
        this.DefineEventsContenteditable();
        this.DefineEventsRange();
        this.DefineEventsParamSelect();
        this.InitRangesTitle();
    }
    ShowScheme() {
        let spanScheme = document.querySelector('[data-block-menu=block-scheme]');
        let color;
        for (let item of this._params.gradientScheme.list) {
            color = item[1];
            let div = document.createElement('div');
            div.style.backgroundColor = color;
            div.title = Array.from(Colors.instance.mapColors.entries()).find((pair) => pair[1] === color)[0];
            div.dataset.menu = `scheme-${color}`;
            spanScheme.appendChild(div);
        }
    }
    DefineEventsContenteditable() {
        for (let span of document.querySelectorAll('[contenteditable]')) {
            span.oninput = (e) => { this.RangeContenteditableValidate(e); };
            span.onblur = (e) => { this.SetRangeContenteditable(e); };
            span.onkeydown = (e) => { this.RangeEnter(e); };
        }
    }
    DefineEventsRange() {
        for (let span of document.querySelectorAll('[data-range]')) {
            span.onclick = (e) => { this.OnParamRangeClick(e); };
        }
    }
    DefineEventsParamSelect() {
        for (let span of document.querySelectorAll('[data-menu]')) {
            span.onclick = (e) => { this.OnParamMenuClick(e); };
        }
        for (let span of document.querySelectorAll('[data-block-menu]')) {
            span.onclick = (e) => { this.OnParamBlockMenuClick(e); };
        }
    }
    RangeContenteditableValidate(e) {
        let span = e.target;
        if (/^0+/.test(span.innerText) && span.innerText.length > 1)
            span.innerText = span.innerText.replace(/^0+/, '');
        if (/\n/g.test(span.innerText))
            span.innerText = span.innerText.replace(/\n/g, '');
        span.dataset.validate = this.IsRangeContenteditableValidate(span.innerText, span.dataset.name).toString();
    }
    RangeEnter(e) {
        if (e.keyCode == 13) {
            let span = e.target;
            if (this.IsRangeContenteditableValidate(span.innerText, span.dataset.name) && !this.IsEqualNewOld(Number(span.innerText), span.dataset.name)) {
                span.blur();
            }
        }
    }
    SetRangeContenteditable(e) {
        let span = e.target;
        if (this.IsRangeContenteditableValidate(span.innerText, span.dataset.name) && !this.IsEqualNewOld(Number(span.innerText), span.dataset.name)) {
            switch (span.dataset.name) {
                case 'X':
                    this._domItems.modalParmsX.value = span.innerText;
                    this._domItems.modalParmsX.dispatchEvent(new Event('input'));
                    this._domItems.modalParmsX.dispatchEvent(new Event('change'));
                    break;
                case 'Y':
                    this._domItems.modalParmsY.value = span.innerText;
                    this._domItems.modalParmsY.dispatchEvent(new Event('input'));
                    this._domItems.modalParmsY.dispatchEvent(new Event('change'));
                    break;
                case 'width':
                    this._domItems.modalParmsWidth.value = span.innerText;
                    this._domItems.modalParmsWidth.dispatchEvent(new Event('input'));
                    this._domItems.modalParmsWidth.dispatchEvent(new Event('change'));
                    break;
                case 'height':
                    this._domItems.modalParmsHeight.value = span.innerText;
                    this._domItems.modalParmsHeight.dispatchEvent(new Event('input'));
                    this._domItems.modalParmsHeight.dispatchEvent(new Event('change'));
                    break;
                case 'one-X':
                    this._domItems.modalParmsOneX.value = span.innerText;
                    this._domItems.modalParmsOneX.dispatchEvent(new Event('input'));
                    this._domItems.modalParmsOneX.dispatchEvent(new Event('change'));
                    break;
                case 'one-Y':
                    this._domItems.modalParmsOneY.value = span.innerText;
                    this._domItems.modalParmsOneY.dispatchEvent(new Event('input'));
                    this._domItems.modalParmsOneY.dispatchEvent(new Event('change'));
                    break;
                case 'one-R':
                    this._domItems.modalParmsOneR.value = span.innerText;
                    this._domItems.modalParmsOneR.dispatchEvent(new Event('input'));
                    this._domItems.modalParmsOneR.dispatchEvent(new Event('change'));
                    break;
                case 'two-X':
                    this._domItems.modalParmsTwoX.value = span.innerText;
                    this._domItems.modalParmsTwoX.dispatchEvent(new Event('input'));
                    this._domItems.modalParmsTwoX.dispatchEvent(new Event('change'));
                    break;
                case 'two-Y':
                    this._domItems.modalParmsTwoY.value = span.innerText;
                    this._domItems.modalParmsTwoY.dispatchEvent(new Event('input'));
                    this._domItems.modalParmsTwoY.dispatchEvent(new Event('change'));
                    break;
                case 'two-R':
                    this._domItems.modalParmsTwoR.value = span.innerText;
                    this._domItems.modalParmsTwoR.dispatchEvent(new Event('input'));
                    this._domItems.modalParmsTwoR.dispatchEvent(new Event('change'));
                    break;
            }
        }
        else {
            this._domItems.modalParmsX.dispatchEvent(new Event('input'));
            this._domItems.modalParmsY.dispatchEvent(new Event('input'));
            this._domItems.modalParmsWidth.dispatchEvent(new Event('input'));
            this._domItems.modalParmsHeight.dispatchEvent(new Event('input'));
            this._domItems.modalParmsOneX.dispatchEvent(new Event('input'));
            this._domItems.modalParmsOneY.dispatchEvent(new Event('input'));
            this._domItems.modalParmsOneR.dispatchEvent(new Event('input'));
            this._domItems.modalParmsTwoX.dispatchEvent(new Event('input'));
            this._domItems.modalParmsTwoY.dispatchEvent(new Event('input'));
            this._domItems.modalParmsTwoR.dispatchEvent(new Event('input'));
        }
    }
    IsRangeContenteditableValidate(span, name) {
        let isValidate = false;
        if (/^[0-9]+$/.test(span)) {
            isValidate = true;
            let range = Number(span);
            switch (name) {
                case 'X':
                    if (range < Number(this._domItems.modalParmsX.min) || range > Number(this._domItems.modalParmsX.max))
                        isValidate = false;
                    break;
                case 'Y':
                    if (range < Number(this._domItems.modalParmsY.min) || range > Number(this._domItems.modalParmsY.max))
                        isValidate = false;
                    break;
                case 'width':
                    if (range < Number(this._domItems.modalParmsWidth.min) || range > Number(this._domItems.modalParmsWidth.max))
                        isValidate = false;
                    break;
                case 'height':
                    if (range < Number(this._domItems.modalParmsHeight.min) || range > Number(this._domItems.modalParmsHeight.max))
                        isValidate = false;
                    break;
                case 'one-X':
                    if (range < Number(this._domItems.modalParmsOneX.min) || range > Number(this._domItems.modalParmsOneX.max))
                        isValidate = false;
                    break;
                case 'one-Y':
                    if (range < Number(this._domItems.modalParmsOneY.min) || range > Number(this._domItems.modalParmsOneY.max))
                        isValidate = false;
                    break;
                case 'one-R':
                    if (range < Number(this._domItems.modalParmsOneR.min) || range > Number(this._domItems.modalParmsOneR.max))
                        isValidate = false;
                    break;
                case 'two-X':
                    if (range < Number(this._domItems.modalParmsTwoX.min) || range > Number(this._domItems.modalParmsTwoX.max))
                        isValidate = false;
                    break;
                case 'two-Y':
                    if (range < Number(this._domItems.modalParmsTwoY.min) || range > Number(this._domItems.modalParmsTwoY.max))
                        isValidate = false;
                    break;
                case 'two-R':
                    if (range < Number(this._domItems.modalParmsTwoR.min) || range > Number(this._domItems.modalParmsTwoR.max))
                        isValidate = false;
                    break;
            }
        }
        ;
        return isValidate;
    }
    IsEqualNewOld(newParm, name) {
        let isEqual = false;
        switch (name) {
            case 'X':
                if (newParm == this._params.x)
                    isEqual = true;
                break;
            case 'Y':
                if (newParm == this._params.y)
                    isEqual = true;
                break;
            case 'width':
                if (newParm == this._params.width)
                    isEqual = true;
                break;
            case 'height':
                if (newParm == this._params.height)
                    isEqual = true;
                break;
            case 'one-X':
                if (newParm == this._params.xOne)
                    isEqual = true;
                break;
            case 'one-Y':
                if (newParm == this._params.yOne)
                    isEqual = true;
                break;
            case 'one-R':
                if (newParm == this._params.rOne)
                    isEqual = true;
                break;
            case 'two-X':
                if (newParm == this._params.xTwo)
                    isEqual = true;
                break;
            case 'two-Y':
                if (newParm == this._params.yTwo)
                    isEqual = true;
                break;
            case 'two-R':
                if (newParm == this._params.rTwo)
                    isEqual = true;
                break;
        }
        return isEqual;
    }
    OnParamRangeClick(e) {
        let span = e.target;
        if (isDisplayBlock(this._domItems.menuSelect) && this._domItems.menuSelect.dataset.type === span.dataset.range) {
            this._domItems.menuSelect.dataset.type = 'empty';
            this._domItems.menuSelect.style.display = 'none';
            return;
        }
        this._domItems.menuSelect.dataset.type = span.dataset.range;
        this._domItems.menuSelect.innerHTML = '';
        let coords = span.getBoundingClientRect();
        this._domItems.menuSelect.style.left = coords.left + 5 + "px";
        this._domItems.menuSelect.style.top = coords.bottom + "px";
        this._domItems.menuSelect.className = 'pop-up-range';
        switch (span.dataset.range) {
            case 'X':
                this.CreatePopUpRange(span.dataset.range, this.ShowParmsX(true), this._params.x, [0, this._params.areaWidth]);
                break;
            case 'Y':
                this.CreatePopUpRange(span.dataset.range, this.ShowParmsY(true), this._params.y, [0, this._params.areaHeight]);
                break;
            case 'width':
                this.CreatePopUpRange(span.dataset.range, this.ShowParmsWidth(true), this._params.width, [0, this._params.areaWidth]);
                break;
            case 'height':
                this.CreatePopUpRange(span.dataset.range, this.ShowParmsHeight(true), this._params.height, [0, this._params.areaHeight]);
                break;
            case 'one-X':
                this.CreatePopUpRange(span.dataset.range, this.ShowParmsOneX(true), this._params.xOne, [Math.floor(-this._params.areaWidth / 2), Math.floor(this._params.areaWidth * 2)]);
                break;
            case 'one-Y':
                this.CreatePopUpRange(span.dataset.range, this.ShowParmsOneY(true), this._params.yOne, [Math.floor(-this._params.areaHeight / 2), Math.floor(this._params.areaHeight * 2)]);
                break;
            case 'one-R':
                this.CreatePopUpRange(span.dataset.range, this.ShowParmsOneR(true), this._params.rOne, [0, Math.floor(Math.max(this._params.areaWidth, this._params.areaHeight) * 2)]);
                break;
            case 'two-X':
                this.CreatePopUpRange(span.dataset.range, this.ShowParmsTwoX(true), this._params.xTwo, [Math.floor(-this._params.areaWidth / 2), Math.floor(this._params.areaWidth * 2)]);
                break;
            case 'two-Y':
                this.CreatePopUpRange(span.dataset.range, this.ShowParmsTwoY(true), this._params.yTwo, [Math.floor(-this._params.areaHeight / 2), Math.floor(this._params.areaHeight * 2)]);
                break;
            case 'two-R':
                this.CreatePopUpRange(span.dataset.range, this.ShowParmsTwoR(true), this._params.rTwo, [0, Math.floor(Math.max(this._params.areaWidth, this._params.areaHeight) * 2)]);
                break;
            default:
                this._domItems.menuSelect.innerHTML = `<p>${span.dataset.range}</p>`;
                break;
        }
        this._domItems.menuSelect.style.display = 'flex';
    }
    CreatePopUpRange(dataRange, caption, value, range) {
        let header = document.createElement('div');
        header.innerHTML = caption;
        let inputWrapper = document.createElement('div');
        inputWrapper.className = 'range-wrapper';
        let input = document.createElement('input');
        input.type = 'range';
        input.dataset.popUpRange = dataRange;
        input.addEventListener('change', (e) => { this.OnPopUpRangeChange(e); }, false);
        input.addEventListener('input', (e) => { this.OnPopUpRangeChange(e); }, false);
        input.min = range[0].toString();
        input.max = range[1].toString();
        input.value = value.toString();
        inputWrapper.appendChild(input);
        this._domItems.menuSelect.appendChild(header);
        this._domItems.menuSelect.appendChild(inputWrapper);
    }
    OnPopUpRangeChange(e) {
        let input = e.target;
        let data = input.dataset.popUpRange;
        switch (data) {
            case 'X':
                this._params.x = Number(input.value);
                break;
            case 'Y':
                this._params.y = Number(input.value);
                break;
            case 'width':
                this._params.width = Number(input.value);
                break;
            case 'height':
                this._params.height = Number(input.value);
                break;
            case 'one-X':
                this._params.xOne = Number(input.value);
                break;
            case 'one-Y':
                this._params.yOne = Number(input.value);
                break;
            case 'one-R':
                this._params.rOne = Number(input.value);
                break;
            case 'two-X':
                this._params.xTwo = Number(input.value);
                break;
            case 'two-Y':
                this._params.yTwo = Number(input.value);
                break;
            case 'two-R':
                this._params.rTwo = Number(input.value);
                break;
            default:
                break;
        }
        this.Show();
    }
    OnParamBlockMenuClick(e) {
        let span = e.target;
        if (isDisplayBlock(this._domItems.menuSelect) && this._domItems.menuSelect.dataset.type === span.dataset.blockMenu) {
            this._domItems.menuSelect.dataset.type = 'empty';
            this._domItems.menuSelect.style.display = 'none';
            return;
        }
        let menu = span.dataset.blockMenu;
        this._domItems.menuSelect.dataset.type = menu;
        this._domItems.menuSelect.innerHTML = '';
        let coords = span.getBoundingClientRect();
        this._domItems.menuSelect.style.left = coords.left + 5 + "px";
        this._domItems.menuSelect.style.top = coords.bottom + "px";
        switch (menu) {
            case 'block-scheme':
                this.CreatingPanelToCustomizeColorScheme();
                this.DefineEventsMenuAllScheme();
                this.DefineEventsMenuColorScheme();
                break;
            default:
                this._domItems.menuSelect.innerHTML = `<p>${span.dataset.menu}</p>`;
                break;
        }
        this._domItems.menuSelect.style.display = 'flex';
    }
    OnParamMenuClick(e) {
        let span = e.target;
        if (isDisplayBlock(this._domItems.menuSelect) && this._domItems.menuSelect.dataset.type === span.dataset.menu) {
            this._domItems.menuSelect.dataset.type = 'empty';
            this._domItems.menuSelect.style.display = 'none';
            return;
        }
        this._domItems.menuSelect.dataset.type = span.dataset.menu;
        this._domItems.menuSelect.innerHTML = '';
        let coords = span.getBoundingClientRect();
        this._domItems.menuSelect.style.left = coords.left + 5 + "px";
        this._domItems.menuSelect.style.top = coords.bottom + "px";
        let menu = span.dataset.menu;
        if (menu.substr(0, 6) === 'scheme')
            menu = 'scheme';
        switch (menu) {
            case 'scheme':
                event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
                this.CreatingPanelToCustomizeColorScheme();
                this.DefineEventsMenuAllScheme();
                this.DefineEventsMenuColorScheme();
                break;
            case 'scale':
                this.CreateItemsOfScaleAreaPanel(this._domItems.menuSelect, true);
                this._domItems.menuSelect.className = 'overflow-auto add-conditions';
                break;
            case 'filling-direction':
                this.CreateItemsOfFillingDirectionAreaPanel(this._domItems.menuSelect, true);
                this._domItems.menuSelect.className = 'overflow-auto add-conditions';
                break;
            default:
                this._domItems.menuSelect.innerHTML = `<p>${span.dataset.menu}</p>`;
                break;
        }
        this._domItems.menuSelect.style.display = 'flex';
    }
    DefineEventsMenuAllScheme() {
        for (let element of document.querySelectorAll('[data-scheme=menu-scheme]')) {
            element.onclick = (e) => { this.OnAllSchemeClick(e); };
        }
    }
    DefineEventsMenuColorScheme() {
        for (let element of document.querySelectorAll('[data-scheme=menu-color-scheme]')) {
            element.onclick = (e) => { this.OnColorSchemeClick(e); };
        }
    }
    CreateItemsOfScaleAreaPanel(panel, isMenu = false) {
        let rb;
        let lbl;
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
                    let button = e.target;
                    this._params.scale = Array.from(ScaleArea.entries()).find((pair) => pair[1] === Number(button.dataset.scale));
                    this.Show();
                    this._domItems.menuSelect.style.display = 'none';
                    this._domItems.menuSelect.dataset.type = 'empty';
                };
            }
            panel.appendChild(rb);
            panel.appendChild(lbl);
        }
    }
    CreateItemsOfFillingDirectionAreaPanel(panel, isMenu = false) {
        let rb;
        let lbl;
        for (let fillingDirection of RGFillingDirection.entries()) {
            rb = document.createElement('input');
            rb.type = 'radio';
            rb.name = !isMenu ? 'filling-direction' : 'menu-filling-direction';
            rb.id = !isMenu ? `filling-direction-${fillingDirection[1]}` : `menu-filling-direction-${fillingDirection[1]}`;
            rb.dataset.fillingDirection = `${fillingDirection[1]}`;
            lbl = document.createElement('label');
            lbl.htmlFor = rb.id;
            lbl.innerText = fillingDirection[0];
            if (fillingDirection[1] == this._params.fillingDirection[1]) {
                rb.checked = true;
            }
            if (isMenu) {
                rb.onclick = (e) => {
                    let button = e.target;
                    this._params.fillingDirection = Array.from(RGFillingDirection.entries()).find((pair) => pair[1] === Number(button.dataset.fillingDirection));
                    this.Show();
                    this._domItems.menuSelect.style.display = 'none';
                    this._domItems.menuSelect.dataset.type = 'empty';
                };
            }
            panel.appendChild(rb);
            panel.appendChild(lbl);
        }
    }
    CreatingPanelToCustomizeColorScheme() {
        let schemePanel = document.createElement('div');
        let allColorsPanel = document.createElement('div');
        schemePanel.className = 'color-scheme';
        schemePanel.dataset.isColorScheme = 'true';
        allColorsPanel.className = 'overflow-auto color-scheme';
        this.CreateItemsOfColorSchemeAreaPanel(schemePanel, true);
        this.CreateItemsOfAllColorsAreaPanel(allColorsPanel, true);
        this._domItems.menuSelect.appendChild(schemePanel);
        this._domItems.menuSelect.appendChild(allColorsPanel);
    }
    CreateItemsOfAllColorsAreaPanel(panel, isMenu = false) {
        let colors = Array.from(Colors.instance.mapColors.entries()).sort((a, b) => {
            let rgbA = 0.2126 * parseInt(a[1].substr(1, 2), 16) + 0.7152 * parseInt(a[1].substr(3, 2), 16) + 0.0722 * parseInt(a[1].substr(5, 2), 16);
            let rgbB = 0.2126 * parseInt(b[1].substr(1, 2), 16) + 0.7152 * parseInt(b[1].substr(3, 2), 16) + 0.0722 * parseInt(b[1].substr(5, 2), 16);
            if (rgbA < rgbB)
                return 1;
            if (rgbA > rgbB)
                return -1;
            return 0;
        });
        let div;
        let name;
        let color;
        for (let element of colors) {
            name = element[0];
            color = element[1];
            div = document.createElement('div');
            div.className = 'color-input';
            div.dataset.scheme = !isMenu ? 'scheme' : 'menu-scheme';
            div.id = !isMenu ? `scheme-${name}` : `menu-scheme-${name}`;
            div.dataset.color = `${name}`;
            div.title = name;
            div.style.backgroundColor = color;
            panel.appendChild(div);
        }
    }
    CreateItemsOfColorSchemeAreaPanel(panel, isMenu = false) {
        for (let element of document.querySelectorAll(`[data-scheme=${isMenu ? 'menu-color-scheme' : 'color-scheme'}]`)) {
            element.parentNode.removeChild(element);
        }
        let div;
        let name;
        let color;
        let index = 0;
        for (let item of this._params.gradientScheme.list) {
            color = item[1];
            name = Array.from(Colors.instance.mapColors.entries()).find((pair) => pair[1] === color)[0];
            div = document.createElement('div');
            div.className = 'color-input';
            div.dataset.scheme = !isMenu ? 'color-scheme' : 'menu-color-scheme';
            div.id = !isMenu ? `color-scheme-${name}` : `menu-color-scheme-${name}`;
            div.dataset.color = `${name}`;
            div.dataset.index = index.toString();
            div.title = name;
            div.style.backgroundColor = color;
            panel.appendChild(div);
            index++;
        }
    }
    OnAllSchemeClick(e) {
        let element = e.target;
        let scheme = new GradientColorScheme();
        let intervals = this._params.gradientScheme.list.length;
        let position;
        for (let line = 0; line < this._params.gradientScheme.list.length; line++) {
            position = line / intervals;
            scheme.Add([position, this._params.gradientScheme.list[line][1]]);
        }
        position = 1;
        scheme.Add([position, Array.from(Colors.instance.mapColors.entries()).find((pair) => pair[0] === element.dataset.color)[1]]);
        this._params.gradientScheme = scheme;
        document.dispatchEvent(new CustomEvent(CustomEventOverFill, { bubbles: true }));
        if (element.dataset.scheme === 'menu-scheme') {
            this.CreateItemsOfColorSchemeAreaPanel(document.querySelector('[data-is-color-scheme]'), true);
            this.DefineEventsMenuColorScheme();
        }
    }
    OnColorSchemeClick(e) {
        let element = e.target;
        let scheme = new GradientColorScheme();
        let color = element.dataset.color;
        let listColor = this._params.gradientScheme.list.filter(item => item[1] !== Array.from(Colors.instance.mapColors.entries()).find((pair) => pair[0] === color)[1]);
        let intervals = listColor.length - 1;
        let position;
        for (let line = 0; line < listColor.length; line++) {
            position = line / intervals;
            scheme.Add([position, listColor[line][1]]);
        }
        this._params.gradientScheme = scheme;
        document.dispatchEvent(new CustomEvent(CustomEventOverFill, { bubbles: true }));
        if (element.dataset.scheme === 'menu-color-scheme') {
            this.CreateItemsOfColorSchemeAreaPanel(document.querySelector('[data-is-color-scheme]'), true);
            this.DefineEventsMenuColorScheme();
        }
    }
    OnIsTranslucentModal(e) {
        this.SetOpacityModal(e.detail.value);
    }
    SetOpacityModal(isTranslucent) {
        if (isTranslucent) {
            this._domItems.modalParms.style.opacity = '0.7';
        }
        else {
            this._domItems.modalParms.style.opacity = '1';
        }
    }
    OnWindowChange() {
        this._domItems.menuSelect.dataset.type = 'empty';
        this._domItems.menuSelect.style.display = 'none';
    }
}
ViewRGParmsDefinition._instance = undefined;
//# sourceMappingURL=viewRgParams.js.map