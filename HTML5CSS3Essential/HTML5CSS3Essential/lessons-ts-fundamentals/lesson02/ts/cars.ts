namespace Cars {
    enum Concerns { Fiat, Daimler, 'General Motors', Mazda, 'Volkswagen Auto Group', 'Tesla Motors' };
    enum Brands { 'Alfa Romeo', 'Aston Martin', Chevrolet, Ferrari, Mazda, Porsche, Tesla };
    enum RuleSelectBrand { One, Several };

    interface IShowMenuModels {
        (currentBrand: Brands): void;
    }

    interface IShowModelDescription {
        (model: Car): void;
    }

    interface ICar {
        concern: Concerns;
        brand: Brands;
        model: string;
        imgSrcs: string[];
        configurations: ModelConfiguration[];
    }

    class ListFS {
        constructor(public input: HTMLInputElement, public label: HTMLLabelElement) { }
    }

    class Brand {
        private _brand: Brands;
        private _headNote: string;
        constructor(brand: Brands, headNote: string) {
            this._brand = brand;
            this._headNote = headNote;
        }
        get brand(): Brands {
            return this._brand;
        }
        get headNote(): string {
            return this._headNote;
        }
    }

    let $ = (id: string) => document.getElementById(id);

    abstract class Menu {
        static cssDefault: string = 'default';
        static cssActive: string = 'active';
        static contextCars: ControlCars;
        private _box: HTMLElement;
        private _isActive: boolean = false;
        constructor(box: HTMLElement) {
            this._box = box;
        }
        get box(): HTMLElement {
            return this._box;
        }
        get isActive(): boolean {
            return this._isActive;
        }
        set isActive(value: boolean) {
            this._isActive = value;
        }
        protected SetClick(): void {
            this.box.addEventListener('click', () => {
                this.OnClick();
            }, false);
        }
        abstract OnClick(): void;
        UnActive(): void {
            if (!this.box.classList.contains(Menu.cssDefault)) {
                this.box.classList.add(Menu.cssDefault);
            };
            if (this.box.classList.contains(Menu.cssActive)) {
                this.box.classList.remove(Menu.cssActive);
            };
            this.isActive = false;
        }
        ToActive(): void {
            this.isActive = true;
            if (this.box.classList.contains(Menu.cssDefault)) {
                this.box.classList.remove(Menu.cssDefault);
            };
            if (!this.box.classList.contains(Menu.cssActive)) {
                this.box.classList.add(Menu.cssActive);
            };
        }
        // use for OnClick in first line 
        protected SetActive(): void {
            if (MenuBrand.ruleSelectBrand === RuleSelectBrand.Several) {
                if (this.isActive) {
                    this.UnActive();
                } else {
                    this.ToActive();
                }
            } else if (MenuBrand.ruleSelectBrand === RuleSelectBrand.One) {
                this.ToActive();
            }
        }
    }

    class MenuBrand extends Menu {
        static ruleSelectBrand: RuleSelectBrand = RuleSelectBrand.One;
        static showMenuModels: IShowMenuModels;
        private _brand: Brands;
        constructor(box: HTMLElement, brand: Brands) {
            super(box);
            this._brand = brand;
            this.SetClick();
        }
        get brand(): Brands {
            return this._brand;
        }
        OnClick(): void {
            this.SetActive();
            MenuBrand.showMenuModels.call(Menu.contextCars, this.brand);
        }
    }

    class MenuModel extends Menu {
        static showModelDescription: IShowModelDescription;
        private _car: Car;
        constructor(box: HTMLElement, car: Car) {
            super(box);
            this._car = car;
            this.SetClick();
        }
        get car(): Car {
            return this._car;
        }
        OnClick(): void {
            this.SetActive();
            this.box.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
            MenuModel.showModelDescription.call(Menu.contextCars, this.car);
        }
    }

    class CarParms {
        static cssConfParms: string = 'conf-parms';
        static cssCaptionPparam: string = 'caption-param';
        static cssValueParam: string = 'value-param';
        static cssDelemiter: string = 'w5prc';
        constructor(
            public power: number = 210,                             // Мощность, л.с.: 210
            public curbWeight: number = 1525,                       // Снаряженная масса, кг
            public engine: string = '2.2d MultiJet',                // Двигатель: 2.2d MultiJet
            public compressionRatio: string = '15.5: 1',            // Степень сжатия: 15.5: 1 
            public transmissionType: string = 'Автомат',            // Тип коробки передач: Автомат
            public accelerationTime: number = 6.8,                  // Время разгона(0 - 100 км / ч), с:
            public cearBox: string = '8-АКП',                       // Коробка передач: 8 - АКП
            public gearboxCompany: string = 'ZF',                   // Фирма КПП: ZF
            public cylinderArrangement: string = 'Рядное',          // Расположение цилиндров: Рядное
            public numberOfSeats: number = 5,                       // Количество мест: 5
            public heightMM: number = 1436,                         // Высота, мм: 1436
            public fuelConsumptionExtraUrbanCycle: number = 4,      // Расход топлива(загородный цикл), л.на 100 км: 4
            public fuelConsumptionMixedCycle: number = 4.7,         // Расход топлива(смешанный цикл), л.на 100 км: 4.7
            public fuelConsumptionUrbanCycle: number = 5.8,         // Расход топлива(городской цикл), л.на 100 км: 5.8
            public speedMaxMoment: string = '1750',                   // Обороты макс.момента, об./ мин: 1750
            public numberOfGears: number = 8,                       // Кол - во передач: 8
            public lengthMM: number = 4643,                         // Длина, мм: 4643
            public maximumSpeed: number = 235,                      // Максимальная скорость, км / ч.: 235
            public speedMaxPower: number = 3750,                    // Обороты макс.мощности, об./ мин.: 3750
            public engineType: string = 'ДВС',                      // Тип двигателя: ДВС
            public wheelBaseMM: number = 2820,                      // Колесная база, мм: 2820
            public fuelType: string = 'Дизель',                     // Тип топлива: Дизель
            public widthMM: number = 2024,                          // Ширина, мм: 2024
            public engineSisplacementCC: number = 2143,             // Объем двигателя, куб.см: 2143
            public torqueNM: number = 470,                          // Крутящий момент, Нм: 470
            public drive: string = 'Полный',                        // Привод: Полный
            public numberOfCylinders: number = 4,                   // Количество цилиндров: 4
            public numberOfValves: number = 16                      // Количество клапанов: 16
        ) { }
        getHTMLElement(): HTMLElement {
            let element: HTMLElement = document.createElement('div');
            let ul: HTMLUListElement = document.createElement('ul');
            this.SetLi(ul,'Мощность, л.с.', `${this.power}`);
            this.SetLi(ul,'Снаряженная масса, кг', `${this.curbWeight}`);
            this.SetLi(ul,'Двигатель', `${this.engine}`);
            this.SetLi(ul,'Степень сжатия', `${this.compressionRatio}`);
            this.SetLi(ul,'Тип коробки передач', `${this.transmissionType}`);
            this.SetLi(ul,'Время разгона(0 - 100 км / ч), с', `${this.accelerationTime}`);
            this.SetLi(ul,'Коробка передач', `${this.cearBox}`);
            this.SetLi(ul,'Фирма КПП', `${this.gearboxCompany}`);
            this.SetLi(ul,'Расположение цилиндров', `${this.cylinderArrangement}`);
            this.SetLi(ul,'Количество мест', `${this.numberOfSeats}`);
            this.SetLi(ul,'Высота, мм', `${this.heightMM}`);
            this.SetLi(ul,'Расход топлива(загородный цикл), л.на 100 км', `${this.fuelConsumptionExtraUrbanCycle}`);
            this.SetLi(ul,'Расход топлива(смешанный цикл), л.на 100 км', `${this.fuelConsumptionMixedCycle}`);
            this.SetLi(ul,'Расход топлива(городской цикл), л.на 100 км', `${this.fuelConsumptionUrbanCycle}`);
            this.SetLi(ul,'Обороты макс.момента, об./мин', `${this.speedMaxMoment}`);
            this.SetLi(ul,'Количество передач', `${this.numberOfGears}`);
            this.SetLi(ul,'Длина, мм', `${this.lengthMM}`);
            this.SetLi(ul,'Максимальная скорость, км/ч.', `${this.maximumSpeed}`);
            this.SetLi(ul,'Обороты макс.мощности, об./мин.', `${this.speedMaxPower}`);
            this.SetLi(ul,'Тип двигателя', `${this.engineType}`);
            this.SetLi(ul,'Колесная база, мм', `${this.wheelBaseMM}`);
            this.SetLi(ul,'Тип топлива', `${this.fuelType}`);
            this.SetLi(ul,'Ширина, мм', `${this.widthMM}`);
            this.SetLi(ul,'Объем двигателя, куб.см', `${this.engineSisplacementCC}`);
            this.SetLi(ul,'Крутящий момент, Нм', `${this.torqueNM}`);
            this.SetLi(ul,'Привод', `${this.drive}`);
            this.SetLi(ul,'Количество цилиндров', `${this.numberOfCylinders}`);
            this.SetLi(ul,'Количество клапанов', `${this.numberOfValves}`);
            element.appendChild(ul);
            return element;
        }
        private SetLi(ul: HTMLUListElement, caption: string, value: string): void {
            if (value.length === 0 || +value === 0) {
                return;
            }
            let li = document.createElement('li');
            let briefInfo = document.createElement('div');
            briefInfo.classList.add(CarParms.cssConfParms);
            let pCaption = document.createElement('p');
            pCaption.classList.add(CarParms.cssCaptionPparam);
            pCaption.innerText = caption;
            let pValue = document.createElement('p');
            pValue.classList.add(CarParms.cssValueParam);
            pValue.innerText = value;
            let pDelimiter = document.createElement('p');
            pDelimiter.classList.add(CarParms.cssDelemiter);
            briefInfo.appendChild(pCaption);
            briefInfo.appendChild(pDelimiter);
            briefInfo.appendChild(pValue);
            li.appendChild(briefInfo);
            ul.appendChild(li);
        }
    }

    class ModelConfiguration {
        private _name: string;
        private _carParms: CarParms;
        constructor(name: string, carParms: CarParms) {
            this._name = name;
            this._carParms = carParms;
        }
        get name(): string {
            return this._name;
        }
        get carParms(): CarParms {
            return this._carParms;
        }
    }

    class Car implements ICar {
        private _concern: Concerns;
        private _brand: Brands;
        private _model: string;
        private _imgSrcs: string[];
        private _configurations: ModelConfiguration[];
        constructor(concern: Concerns,
            brand: Brands,
            model: string,
            imgSrcs: string[],
            configurations: ModelConfiguration[]
        ) {
            this._concern = concern;
            this._brand = brand;
            this._model = model;
            this._imgSrcs = imgSrcs;
            this._configurations = configurations;
        }
        get concern(): Concerns {
            return this._concern;
        }
        get brand(): Brands {
            return this._brand;
        }
        get model(): string {
            return this._model;
        }
        get imgSrcs(): string[] {
            return this._imgSrcs;
        }
        get configurations(): ModelConfiguration[] {
            return this._configurations;
        }
    }

    class ControlCars {
        constructor(
            ruleSelectBrands: NodeListOf<HTMLElement>,
            brands: Brand[],
            menuBrands: MenuBrand[],
            navModels: HTMLElement,
            imagesOff: HTMLElement,
            showLeftOff: HTMLElement,
            showRightOff: HTMLElement,
            showCollapsOff: HTMLElement,
            headnote: HTMLElement,
            navConfigurations: HTMLElement,
            features: HTMLElement,
            fullScreen: HTMLElement,
            fullScreenImage: HTMLElement,
            fullScreenClose: HTMLElement,
            fullScreenImageLeft: HTMLElement,
            fullScreenImageRight: HTMLElement,
            fullScreenList: HTMLElement,
            cars: Car[]
        ) {
            this._ruleSelectBrands = ruleSelectBrands;
            this._brands = brands;
            this._menuBrands = menuBrands;
            this._navModels = navModels;
            this._imagesOff = imagesOff;
            this._showLeftOff = showLeftOff;
            this._showRightOff = showRightOff;
            this._showCollapsOff = showCollapsOff;
            this._headnote = headnote;
            this._navConfigurations = navConfigurations;
            this._features = features;
            this._fullScreen = fullScreen;
            this._fullScreenImage = fullScreenImage;
            this._fullScreenClose = fullScreenClose;
            this._fullScreenImageLeft = fullScreenImageLeft;
            this._fullScreenImageRight = fullScreenImageRight;
            this._fullScreenList = fullScreenList;
            this._cars = cars;
            Menu.contextCars = this;
            MenuBrand.showMenuModels = this.ShowModels;
            MenuModel.showModelDescription = this.ShowModelDescription;
            this.SetOnLoadImage();
            this.SetOnClickRuleSelectBrands();
            this.SetWindowResize();
            this.SetOnClickOff();
            this.SetOnClickFullScreen();
            this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
        }

        // Fields
        static cssMenuModel: string = 'car-model';
        static cssFullScreeListRadio: string = 'radio';
        static cssFullScreeListItem: string = 'item';
        private _ruleSelectBrands: NodeListOf<HTMLElement>;
        private _menuBrands: MenuBrand[];
        private _menuModels: MenuModel[] = new Array;
        private _brands: Brand[];
        private _cars: Car[];
        private _navModels: HTMLElement;
        private _imgWidth: number;
        private _imgHeight: number;
        private _imagesOff: HTMLElement;
        private _showLeftOff: HTMLElement;
        private _showRightOff: HTMLElement;
        private _showCollapsOff: HTMLElement;
        private _headnote: HTMLElement;
        private _navConfigurations: HTMLElement;
        private _features: HTMLElement;
        private _imageRate: number = 1.8225;
        private _selectedModel: Car;
        private _clipTimeOut: number;
        private _interval: number = 2100;
        private _indexImg: number = 1;
        private _image: HTMLImageElement = new Image();
        private _fullScreen: HTMLElement;
        private _fullScreenImage: HTMLElement;
        private _fullScreenClose: HTMLElement;
        private _fullScreenImageLeft: HTMLElement;
        private _fullScreenImageRight: HTMLElement;
        private _fullScreenList: HTMLElement;
        private _isFullScreen: boolean = false;
        private _listFSImages: ListFS[] = new Array();

        // Methids
        Start(): void {
            this._menuBrands[0].OnClick();
        }

        // Helpers
        private SetOnClickRuleSelectBrands() {
            for (let i = 0; i < this._ruleSelectBrands.length; i++) {
                this._ruleSelectBrands[i].addEventListener('change', (e) => { this.OnClickRuleSelectBrands(e); }, false);
            }
        }

        private OnClickRuleSelectBrands(e: Event) {
            if ((e.target as HTMLInputElement).checked) {
                if ((e.target as HTMLElement).id === 'ruleSelectBrandOne') {
                    MenuBrand.ruleSelectBrand = RuleSelectBrand.One;
                    // Leave only one selected brand
                    let activeBrand: Brands;
                    if (this._menuBrands.some(menuItem => menuItem.isActive)) {
                        activeBrand = this._menuBrands.filter(menuItem => menuItem.isActive)[0].brand;
                        this._menuBrands.forEach(menuItem => {
                            if (menuItem.brand !== activeBrand) {
                                menuItem.UnActive();
                            }
                        });
                    } else {
                        this._menuBrands[0].ToActive();
                        activeBrand = this._menuBrands[0].brand;
                    }
                    this.ShowModels(activeBrand);
                } else if ((e.target as HTMLElement).id === 'ruleSelectBrandSeveral') {
                    MenuBrand.ruleSelectBrand = RuleSelectBrand.Several;
                }
            }
        }

        private ShowModels(activeBrand: Brands): void {
            if (MenuBrand.ruleSelectBrand === RuleSelectBrand.One) {
                // Inactive menu item should be to redraw
                let listInActive = this._menuBrands.filter(menuItem => menuItem.isActive && menuItem.brand !== activeBrand);
                for (let menuItem of listInActive) {
                    menuItem.UnActive();
                }
            } else if (MenuBrand.ruleSelectBrand === RuleSelectBrand.Several) {

            }
            this.CreateMenuModels();
        }

        private CreateMenuModels(): void {
            this._navModels.innerHTML = '';
            this._menuModels.length = 0;
            let isActiveCount = this._menuBrands.filter(brand => brand.isActive).length;
            for (let menuBrand of this._menuBrands.filter(brand => isActiveCount > 0 && brand.isActive || isActiveCount === 0)) {
                for (let car of this._cars.filter(car => car.brand === menuBrand.brand)) {
                    let div = document.createElement('div');
                    div.classList.add(ControlCars.cssMenuModel);
                    div.classList.add(Menu.cssDefault);
                    div.style.backgroundImage = `url('${car.imgSrcs[0]}')`;
                    let p = document.createElement('p');
                    p.innerText = car.model;
                    div.appendChild(p);
                    this._navModels.appendChild(div);
                    // Binding menu
                    this._menuModels.push(new MenuModel(div, car));
                }
            }
            this._menuModels[0].OnClick();
        }

        private ShowModelDescription(car: Car): void {
            // Previously active menu must be inactive
            for (let item of this._menuModels.filter(item => item.isActive && item.car.model !== car.model)) {
                item.UnActive();
            }
            // creation of a navigation panel for vehicle configuration
            this._features.innerHTML = '';
            this._navConfigurations.innerHTML = '';
            for (let iConf = 0; iConf < car.configurations.length; iConf++) {
                let rb = document.createElement('input');
                rb.type = 'radio';
                rb.id = `conf${iConf}`;
                rb.name = car.model;
                rb.dataset['indexConf'] = `${iConf}`;
                rb.addEventListener('change', (e) => { this.OnSelectedCarConfiguration(e); }, false); 
                let lb = document.createElement('label');
                lb.htmlFor = rb.id;
                lb.innerText = car.configurations[iConf].name;
                this._navConfigurations.appendChild(rb);
                this._navConfigurations.appendChild(lb);
            }
            // Load image and start animation of clip
            clearTimeout(this._clipTimeOut);
            this._selectedModel = car;
            this._indexImg = 1;
            this.ShowModel(car);
            this._headnote.innerHTML = '';
            let p = document.createElement('p');
            p.innerText = `Концерн: ${Concerns[car.concern]}`;
            this._headnote.appendChild(p);
            p = document.createElement('p');
            p.innerText = this._brands.filter(obj => obj.brand === car.brand)[0].headNote;
            this._headnote.appendChild(p);
            this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
            this.clipRandomAnimate(this._interval, this._imagesOff);
        }

        private ShowModel(car: Car): void {
            this._image.src = car.imgSrcs[this._indexImg];
        }

        private SetWindowResize(): void {
            window.addEventListener('resize', () => {
                this._imagesOff.style.height = `${this._imagesOff.clientWidth / this._imageRate}px`;
            }, false);
        }

        private clipRandomAnimate(interval, box: HTMLElement): void {
            clearTimeout(this._clipTimeOut);
            this._clipTimeOut = window.setTimeout(() => {
                this._indexImg = (this._indexImg < this._selectedModel.imgSrcs.length - 1) ? (this._indexImg + 1) : 1;
                this.ShowModel(this._selectedModel);
                if (!this._isFullScreen) {
                    this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
                } else {
                    this.SetEnableShowLeftRight(this._fullScreenImageLeft, this._fullScreenImageRight);
                }
                this._clipTimeOut = window.setTimeout(() => { this.clipRandomAnimate(interval, box); }, interval);
            }, interval);
        }

        private SetOnClickOff(): void {
            //
            this._showLeftOff.addEventListener('click', () => {
                if (this._indexImg > 1) {
                    this._indexImg -= 1;
                    this.ShowModel(this._selectedModel);
                };
                this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
            }, false);
            //
            this._showRightOff.addEventListener('click', () => {
                if (this._indexImg < this._selectedModel.imgSrcs.length - 1) {
                    this._indexImg += 1;
                    this.ShowModel(this._selectedModel);
                };
                this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
            }, false);
            //
            this._showCollapsOff.addEventListener('click', () => {
                document.getElementsByTagName('html')[0].style.overflow = 'hidden';
                this._isFullScreen = true;
                this.ShowModel(this._selectedModel);
                this.SetEnableShowLeftRight(this._fullScreenImageLeft, this._fullScreenImageRight);
                clearTimeout(this._clipTimeOut);
                this._fullScreen.style.display = 'flex';
                setTimeout(() => { this._fullScreen.style.opacity = '1'; }, 50);
                // Create list images
                this._fullScreenList.innerHTML = '';
                this._listFSImages.length = 0;
                for (let item = 1; item < this._selectedModel.imgSrcs.length; item++) {
                    let rb = document.createElement('input');
                    rb.type = 'radio';
                    rb.name = 'listImgs';
                    rb.id = `img${item}`;
                    rb.dataset['indexImg'] = `${item}`;
                    rb.className = ControlCars.cssFullScreeListRadio;
                    if (item === this._indexImg) {
                        rb.checked = true;
                    }
                    rb.addEventListener('change', (e) => { this.OnChangeFullScreenList(e); }, false);
                    let lb = document.createElement('label');
                    lb.htmlFor = rb.id;
                    lb.className = ControlCars.cssFullScreeListItem;
                    let img = document.createElement('img');
                    let preloadImg: HTMLImageElement = new Image();
                    preloadImg.addEventListener('load', () => { img.src = preloadImg.src; }, false);
                    preloadImg.src = this._selectedModel.imgSrcs[item];
                    lb.appendChild(img);
                    this._listFSImages.push(new ListFS(rb, lb));
                    this._fullScreenList.appendChild(rb);
                    this._fullScreenList.appendChild(lb);
                }
            }, false);

            this._imagesOff.addEventListener('mouseenter', () => {
                clearTimeout(this._clipTimeOut);
            }, false);
            //
            this._imagesOff.addEventListener('mouseleave', () => {
                clearTimeout(this._clipTimeOut);
                if (!this._isFullScreen) {
                    this.clipRandomAnimate(this._interval, this._imagesOff);
                }
            }, false);
        }

        private SetEnableShowLeftRight(arrowLeft: HTMLElement, arrowRight: HTMLElement): void {
            if (this._indexImg === 1) {
                arrowLeft.dataset.enable = 'false';
                arrowRight.dataset.enable = 'true';
            } else if (this._indexImg === this._selectedModel.imgSrcs.length - 1) {
                arrowLeft.dataset.enable = 'true';
                arrowRight.dataset.enable = 'false';
            } else {
                arrowLeft.dataset.enable = 'true';
                arrowRight.dataset.enable = 'true';
            }
        }

        private SetOnLoadImage(): void {
            this._image.addEventListener('load', () => {
                if (!this._isFullScreen) {
                    this._imagesOff.style.backgroundImage = `url('${this._image.src}')`;
                } else {
                    this._fullScreenImage.style.backgroundImage = `url('${this._image.src}')`;
                }
            }, false);
        }

        private SetOnClickFullScreen(): void {
            //
            this._fullScreenClose.addEventListener('click', () => {
                this._isFullScreen = false;
                this._fullScreen.style.opacity = '0';
                setTimeout(() => {
                    document.getElementsByTagName('html')[0].style.overflow = 'auto';
                    this._fullScreen.style.display = 'none';
                    clearTimeout(this._clipTimeOut);
                    this.clipRandomAnimate(this._interval, this._imagesOff);
                    this._fullScreenList.innerHTML = '';
                    this._listFSImages.length = 0;
                }, 450);
            }, false);
            //
            this._fullScreenImageLeft.addEventListener('click', () => {
                if (this._indexImg > 1) {
                    this._indexImg -= 1;
                    this.ToChangeFullScreenImage();
                    this.ShowModel(this._selectedModel);
                };
                this.SetEnableShowLeftRight(this._fullScreenImageLeft, this._fullScreenImageRight);
            }, false);
            //
            this._fullScreenImageRight.addEventListener('click', () => {
                if (this._indexImg < this._selectedModel.imgSrcs.length - 1) {
                    this._indexImg += 1;
                    this.ToChangeFullScreenImage();
                    this.ShowModel(this._selectedModel);
                };
                this.SetEnableShowLeftRight(this._fullScreenImageLeft, this._fullScreenImageRight);
            }, false);
        }

        private ToChangeFullScreenImage(): void {
            let selected = this._listFSImages.filter(elem => elem.input.dataset['indexImg'] === this._indexImg.toString());
            if (selected.length && selected.length === 1) {
                selected[0].input.checked = true;
                selected[0].label.scrollIntoView({ block: "center", behavior: "smooth" });
            }
        }

        private OnChangeFullScreenList(e: Event): void {
            let selected: HTMLInputElement = e.target as HTMLInputElement;
            if (selected.checked) {
                this._indexImg = Number(selected.dataset['indexImg']);
                this.ShowModel(this._selectedModel);
                this.SetEnableShowLeftRight(this._fullScreenImageLeft, this._fullScreenImageRight);
                this._listFSImages.filter(elem => elem.input.dataset['indexImg'] === selected.dataset['indexImg'])[0].label.scrollIntoView({ block: "center", behavior: "smooth" });
            }
        }

        private OnSelectedCarConfiguration(e: Event) {
            let selected: HTMLInputElement = e.target as HTMLInputElement;
            console.log(this._selectedModel.configurations[Number(selected.dataset['indexConf'])].name);
            if (selected.checked) {
                console.log(this._selectedModel.configurations[Number(selected.dataset['indexConf'])].name);
                this._features.innerHTML = '';
                this._features.appendChild(this._selectedModel.configurations[Number(selected.dataset['indexConf'])].carParms.getHTMLElement());
            }
        }

    }

    //****************************************************************************************************************************************

    let controlCars = new ControlCars(
        document.getElementsByName('rule-select-brand'),
        [
            new Brand(Brands["Alfa Romeo"],
                'Alfa Romeo (Альфа Ромео) – марка итальянских автомобилей. Компания A. L. F. A была основана в 1910 году, а первой моделью стала НР24, которая в следующем году сразу же приняла участие в автогонках. Эмблема компании содержит сразу несколько символов Милана, в окрестностях которого и был открыт первый завод – зеленую змею, а также красный крест на белом фоне. ' +
                'Сейчас компания выпускает следующие модели машин: MiTo (супермини), Giulietta (семейный автомобиль), 4С (купе), 4С Spider (кабриолет), Giulia (седан) и Stelvio (кроссовер). Компания хорошо известна благодаря своему сотрудничеству с итальянскими силовыми ведомствами – различные модели машин Alfa Romeo использовали как карабинеры, так и полиция.'
            ),
            new Brand(Brands["Aston Martin"],
                'Aston Martin (Астон Мартин) – британская автомобильная компания, основанная в 1913 году. С того времени компания неоднократно меняла владельца, а с 1987 по 2007 год принадлежала концерну Ford. Сейчас Aston Martin принадлежит британскому консорциуму Investindustrial. Основное производство сосредоточено в британском Гейдоне,а также частично в Австрии. ' +
                'Сейчас с конвейеров заводов Aston Martin сходят такие модели машин, как Cygnet (микроавтомобиль), спортивные V8 Vantage, мощные DB9, DB11 и Vanquish, спортивный седан Rapide S, а недавно был презентован суперкар Valkyrie с гибридной силовой установкой (планируется выпуск 150 автомобилей ценой 2,5 миллиона фунтов). Компания известна тем, что большинство моделей изготовлено вручную – так, в 2007 Aston Martin выпустил всего 7224 машины. Кроме этого, Aston Martin (особенно модель DB5) можно назвать самой любимой машиной Джеймса Бонда.'
            ),
            new Brand(Brands.Chevrolet,
                'Chevrolet (Шевроле) - американский производитель легковых и грузовых автомобилей, пикапов и автобусов. Основана в 1911 году швейцарским гонщиком и механиком Луи Жозефом Шевроле вместе с предпринимателем по имени Уильям Дюран, который за три года до того совместно с Фредериком Смитом начал компанию General Motors. Почти с самого начала фирма Chevrolet была и остается дочерней маркой "Дженерал Моторс". Штаб-квартира компании расположена в пригороде Детройта. ' +
                'Первым серийным автомобилем марки стал Chevrolet Classic-Six, который оказался слишком дорогим, чтобы конкурировать с популярным в то время Ford Model T. Тогда компания перешла к выпуску дешевых, "народных" автомобилей, чем быстро завоевала себе расположение покупателей. Популярными моделями марки были такие автомобили, как Chevrolet Bel Air, Corvette, Impala, Malibu, Camaro, Monte Carlo, пикапы Chevrolet Suburban, Blazer, Silverado.'
            ),
            new Brand(Brands.Ferrari,
                'Ferrari (Феррари) - итальянская компания-производитель спортивных автомобилей класса люкс и ультра люкс. Основана в 1928 году Энцо Феррари как Scuderia Ferrari (Скудерия Феррари). С начала своей истории является постоянным участником, поставщиком двигателей и спонсором наиболее выдающихся автоспортивных соревнований. Особенно богаты достижения Ferrari на на чемпионате Формула-1. Штаб-квартира в Маранелло (Италия). ' +
                'Многие автомобили марки имеют коллекционную ценность, некоторые уникальны. Ferrari принадлежат многочисленные рекорды не только на треках - 9 из 12 самых дорогих автомобилей мира, проданных с молотка до 2018 года, - марки Ferrari. А самая большая сумма, заплаченная за автомобиль до сих пор (2018 год) составляет 70 миллионов долларов за Ferrari 250 GTO 1963 года выпуска. ' +
                'В 2007 году Ferrari была поглощена концерном Fiat, образовав Fiat Group, а с присоединением к ним Chrysler, концерн трансформировался в Fiat Chrysler Automobiles (FCA). В 2017 году Ferrari стала самой прибыльной компанией по размеру чистого дохода с каждого проданного автомобиля, зарабатывая в среднем 70 тысяч евро на одной машине. По данным на 2018 год, всего компания Ferrari за всю свою историю построила и продала около 190 тысяч автомобилей. В 2017 году было продано 8398 машин. Чистая прибыль компании составила 537 миллионов евро.'
            ),
            new Brand(Brands.Mazda,
                'Mazda (Мазда) - японская компания, выпускающая легковые и грузовые автомобили. Входит в состав корпорации Sumitomo. Основана в 1920 году как Toyo Kogyo Company - компания по выпуску изделий из пробкового дерева. Название Mazda впервые использовано в 1931 году. Штаб-квартира Mazda находится в городе Хиросима. ' +
                'В 1931 году Toyo Kogyo Company, которая в то время занималась выпуском мотоциклов и небольших грузовых трициклов, изменила название на Mazda, использовав имя верховного зороастрийского бога Ахура Мазда, созвучное с фамилией основателя концерна Дзюдзиро Мацуда. ' +
                'В 1978 году Mazda подарила миру одну из самых популярных своих моделей - Savanna RX-7 и версию спорт-купе RX-7, а также отметила выпуск миллионного автомобиля с роторным двигателем. Общий объем выпущенных к тому времени машин приближался к отметке в 10 млн. ' +
                'В 1970-х и в начале 80-х Mazda развернула бурную деятельность: строились новые заводы, марка вышла на новые рынки, в частности в США. Огромную популярность в Америке получила модель Mazda MX-5 Miata - компактный спортивный родстер с привлекательной ценой. ' +
                'С 2000-х Mazda выпускает автомобили с бензиновыми и дизельными двигателями внутреннего сгорания с особой технологией SkyActive, которая обеспечивает хорошую отдачу мотора при небольшом расходе горючего. Актуальными моделями марки являются Mazda2, Mazda3, Mazda6, CX-3, СХ-5, СВ-8, СХ-9 и Mazda MX-5 Miata. В 2017 году Mazda продала 1 559 000 автомобилей, а чистая прибыль компании составила почти 845 миллионов долларов.'
            ),
            new Brand(Brands.Porsche,
                'Porsche (Порше) - немецкая компания, специализирующаяся на выпуске высокопроизводительных скоростных автомобилей премиум-класса, гоночных автомобилей и двигателей. Основана в 1931 году конструктором Фердинандом Порше. Штаб-квартира компании находится в городе Штутгарт, где расположен и главный завод. Долгое время компания оставалась подконтрольной семье Порше, однако в 2009 году 49,9% акций компании приобрел концерн Volkswagen AG. ' +
                'Porsche является одной из самых высокодоходных автомобильных компаний мира, если считать прибыль от каждого проданного автомобиля. Долгое время Порше выпускала только спортивные автомобили в кузове купе, однако в 2002 году фирма начала продавать спортивный кроссовер класса люкс, а в 2009 года на рынок вышла четырехдверная модель Panamera. ' +
                'В 2000-х фирма активно работает над серией электрокаров. Porsche 918 Spyder, который выпускался в 2013-2015 годах, стал одним из первых серийных гибридов среди суперкаров. А в 2019 году на рынок выйдет первый стопроцентный электрокар, разработанный с нуля - электрический спортседан Porsche Taycan. Популярными моделями Porsche на сегодня являются Panamera, Macan и Cayenne, 911 в различных модификациях, 718 Boxster/Cayman. В 2017 году компания Porsche продала более 246 тысяч автомобилей, а чистый доход составил 3,139 млрд евро, что означает чистая прибыль с каждой проданной машины в 12,7 тысяч евро.'
            ),
            new Brand(Brands.Tesla,
                'Компания Tesla (Тесла) - американский производитель электромобилей нового поколения. Штаб-квартира компании, основанной в 2003 году, расположена в знаменитом городе Пало-Альто - сердце Кремниевой долины. Компания получила название в честь Николы Теслы - знаменитого физика начала ХХ века. Главой компании является всемирно известный инженер и предприниматель Илон Маск. ' +
                'Первый автомобиль Tesla Roadster был представлен в 2006 году. Всего в линейке Tesla есть 4 модели машин - кроме Roadster это Model S (хэтчбек), Model X (кроссовер) и Model 3 (седан). В 2017 году компания анонсировала также электрогрузовик Tesla Semi. ' +
                'Кроме этого, Tesla активно развивает сеть станций для подзарядок собственных машин под названием Supercharger. Во втором квартале 2018 было изготовлено более 53 000 автомобилей Tesla. В 2018 году электромобиль Tesla Model 3 установил рекорд, проехав тысячи километров на одном заряде.'
            )
        ],
        [
            new MenuBrand($('brandAlfaRomeo'), Brands["Alfa Romeo"]),
            new MenuBrand($('brandAstonMartin'), Brands["Aston Martin"]),
            new MenuBrand($('brandChevrolet'), Brands.Chevrolet),
            new MenuBrand($('brandFerrari'), Brands.Ferrari),
            new MenuBrand($('brandMazda'), Brands.Mazda),
            new MenuBrand($('brandPorsche'), Brands.Porsche),
            new MenuBrand($('brandTesla'), Brands.Tesla)
        ],
        $('nav-models'),
        $('imagesOff'),
        $('images-show-left'),
        $('images-show-right'),
        $('show-collaps-off'),
        $('headnote'),
        $('nav-car-configurations'),
        $('features'),
        $('show-full-screen'),
        $('full-screen-image'),
        $('full-screen-close'),
        $('images-fs-left'),
        $('images-fs-right'),
        $('full-screen-list'),
        [
            new Car(Concerns.Fiat, Brands["Alfa Romeo"], 'Giulia 2016',
                [
                    'img/cars/alfa-romeo-Giulia-2016-00.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-01.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-02.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-03.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-04.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-05.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-06.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-07.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-08.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-09.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-10.png',
                ],
                [
                    new ModelConfiguration('Alfa Romeo Giulia 2.2d MultiJet(210 л.с.) 8 - АКП 4x4',
                        new CarParms()
                    ),
                    new ModelConfiguration('Alfa Romeo Giulia 2.9i V6 (510 л.с.) 8-АКП',
                        new CarParms(
                            510,            // Мощность, л.с.
                            1525,           // Снаряженная масса, кг
                            '2,9i V6',      // Двигатель
                            '9.3 : 1',      // Степень сжатия 
                            'Автомат',      // Тип коробки передач
                            3.9,            // Время разгона(0 - 100 км / ч), с
                            '8-АКП',        // Коробка передач
                            'ZF',           // Фирма КПП
                            'V-образное',   // Расположение цилиндров
                            5,              // Количество мест
                            1436,           // Высота, мм
                            5.7,            // Расход топлива(загородный цикл), л.на 100 км
                            8.2,            // Расход топлива(смешанный цикл), л.на 100 км
                            12.4,           // Расход топлива(городской цикл), л.на 100 км
                            '2500-5000',    // Обороты макс.момента, об./ мин
                            8,              // Кол - во передач
                            4643,           // Длина, мм
                            307,            // Максимальная скорость, км / ч.
                            6500,           // Обороты макс.мощности, об./ мин.
                            'ДВС',          // Тип двигателя
                            2820,           // Колесная база, мм
                            'Бензин',       // Тип топлива
                            2024,           // Ширина, мм
                            2891,           // Объем двигателя, куб.см
                            600,            // Крутящий момент, Нм
                            'Задний',       // Привод
                            6,              // Количество цилиндров
                            24              // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns.Fiat, Brands["Alfa Romeo"], 'Spider 2015',
                [
                    'img/cars/alfa-romeo-4C-Spider-2015-00.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-01.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-02.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-03.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-04.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-05.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-06.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-07.png',
                    'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-08.png'
                ],
                [
                    new ModelConfiguration('Alfa Romeo 4C Spider 240i AT',
                        new CarParms(
                            240,                // Мощность, л.с.
                            940,                // Снаряженная масса, кг
                            '1,8i',             // Двигатель
                            '9.5 : 1',          // Степень сжатия 
                            'Робот 2 сцепл',    // Тип коробки передач
                            4.5,                // Время разгона(0 - 100 км / ч), с
                            '6-DDCT',           // Коробка передач
                            'Fiat (FPT)',       // Фирма КПП
                            'Рядное',           // Расположение цилиндров
                            2,                  // Количество мест
                            1183,               // Высота, мм
                            5.1,                // Расход топлива(загородный цикл), л.на 100 км
                            6.9,                // Расход топлива(смешанный цикл), л.на 100 км
                            10.1,               // Расход топлива(городской цикл), л.на 100 км
                            '1700',             // Обороты макс.момента, об./ мин
                            6,                  // Кол - во передач
                            3989,               // Длина, мм
                            257,                // Максимальная скорость, км / ч.
                            6000,               // Обороты макс.мощности, об./ мин.
                            'ДВС',              // Тип двигателя
                            2380,               // Колесная база, мм
                            'Бензин',           // Тип топлива
                            1864,               // Ширина, мм
                            1749,               // Объем двигателя, куб.см
                            350,                // Крутящий момент, Нм
                            'Задний',           // Привод
                            4,                  // Количество цилиндров
                            15                  // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns.Daimler, Brands["Aston Martin"], 'DBS Superleggera 2018',
                [
                    'img/cars/aston-martin-DBS-Superleggera-2018-00.png',
                    'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-01.png',
                    'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-02.png',
                    'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-03.png',
                    'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-04.png',
                    'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-05.png',
                    'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-06.png',
                    'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-07.png'
                ],
                [
                    new ModelConfiguration('Aston Martin DBS Superleggera 5.2i (715 л.с.) 8-АКП',
                        new CarParms(
                            715,            // Мощность, л.с.
                            1693,           // Снаряженная масса, кг
                            '5,2i',         // Двигатель
                            '9.3 : 1',      // Степень сжатия 
                            'Автомат',      // Тип коробки передач
                            3.4,            // Время разгона(0 - 100 км / ч), с
                            '8-АКП',        // Коробка передач
                            'ZF',           // Фирма КПП
                            'V-образное',   // Расположение цилиндров
                            2,              // Количество мест
                            1280,           // Высота, мм
                            9.1,            // Расход топлива(загородный цикл), л.на 100 км
                            12.4,           // Расход топлива(смешанный цикл), л.на 100 км
                            18,             // Расход топлива(городской цикл), л.на 100 км
                            '1800-5000',    // Обороты макс.момента, об./ мин
                            8,              // Кол - во передач
                            4712,           // Длина, мм
                            340,            // Максимальная скорость, км / ч.
                            6500,           // Обороты макс.мощности, об./ мин.
                            'ДВС',          // Тип двигателя
                            2805,           // Колесная база, мм
                            'Бензин',       // Тип топлива
                            2146,           // Ширина, мм
                            5204,           // Объем двигателя, куб.см
                            900,            // Крутящий момент, Нм
                            'Задний',       // Привод
                            12,             // Количество цилиндров
                            48              // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns.Daimler, Brands["Aston Martin"], 'DB11 2016',
                [
                    'img/cars/aston-martin-DB11-2016-00.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-01.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-02.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-03.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-04.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-05.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-06.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-07.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-08.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-09.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-10.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-11.png',
                    'img/cars/Aston-Martin/aston-martin-DB11-2016-12.png'
                ],
                [
                    new ModelConfiguration('Aston Martin DB11 DB11 AMR',
                        new CarParms(
                            639,            // Мощность, л.с.
                            0,              // Снаряженная масса, кг
                            '5.2i',         // Двигатель
                            '',             // Степень сжатия 
                            'Автомат',      // Тип коробки передач
                            3.7,            // Время разгона(0 - 100 км / ч), с
                            '8-АКП',        // Коробка передач
                            'ZF',           // Фирма КПП
                            'V-образное',   // Расположение цилиндров
                            4,              // Количество мест
                            1279,           // Высота, мм
                            8.5,            // Расход топлива(загородный цикл), л.на 100 км
                            11.4,           // Расход топлива(смешанный цикл), л.на 100 км
                            16.6,           // Расход топлива(городской цикл), л.на 100 км
                            '1500',         // Обороты макс.момента, об./ мин
                            8,              // Кол - во передач
                            4739,           // Длина, мм
                            334,            // Максимальная скорость, км / ч.
                            6500,           // Обороты макс.мощности, об./ мин.
                            'ДВС',          // Тип двигателя
                            2805,           // Колесная база, мм
                            'Бензин',       // Тип топлива
                            2060,           // Ширина, мм
                            5204,           // Объем двигателя, куб.см
                            700,            // Крутящий момент, Нм
                            'Задний',       // Привод
                            12,             // Количество цилиндров
                            48              // Количество клапанов
                        )
                    ),
                    new ModelConfiguration('Aston Martin DB11 DB11 V8',
                        new CarParms(
                            510,            // Мощность, л.с.
                            0,              // Снаряженная масса, кг
                            '4.0i',         // Двигатель
                            '',             // Степень сжатия 
                            'Автомат',      // Тип коробки передач
                            4,              // Время разгона(0 - 100 км / ч), с
                            '8-АКП',        // Коробка передач
                            'ZF',           // Фирма КПП
                            'V-образное',   // Расположение цилиндров
                            4,              // Количество мест
                            1279,           // Высота, мм
                            7.6,            // Расход топлива(загородный цикл), л.на 100 км
                            9.9,            // Расход топлива(смешанный цикл), л.на 100 км
                            13.5,           // Расход топлива(городской цикл), л.на 100 км
                            '2000-5000',    // Обороты макс.момента, об./ мин
                            8,              // Кол - во передач
                            4739,           // Длина, мм
                            300,            // Максимальная скорость, км / ч.
                            6000,           // Обороты макс.мощности, об./ мин.
                            'ДВС',          // Тип двигателя
                            2805,           // Колесная база, мм
                            'Бензин',       // Тип топлива
                            2060,           // Ширина, мм
                            3982,           // Объем двигателя, куб.см
                            675,            // Крутящий момент, Нм
                            'Задний',       // Привод
                            8,              // Количество цилиндров
                            32              // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns["General Motors"], Brands.Chevrolet, 'Camaro 2018',
                [
                    'img/cars/chevrolet-Camaro-2018-00.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2018-01.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2018-02.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2018-03.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2018-04.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2018-05.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2018-06.png'
                ],
                [
                    new ModelConfiguration('Chevrolet Camaro 6.2i (650 л.с.) 10-АКП',
                        new CarParms(
                            650,            // Мощность, л.с.
                            1521,           // Снаряженная масса, кг
                            '6,2i',         // Двигатель
                            '',             // Степень сжатия 
                            'Автомат',      // Тип коробки передач
                            3.5,            // Время разгона(0 - 100 км / ч), с
                            '10-АКП',       // Коробка передач
                            'GM',           // Фирма КПП
                            'V-образное',   // Расположение цилиндров
                            4,              // Количество мест
                            1349,           // Высота, мм
                            0,              // Расход топлива(загородный цикл), л.на 100 км
                            0,              // Расход топлива(смешанный цикл), л.на 100 км
                            0,              // Расход топлива(городской цикл), л.на 100 км
                            '3600',         // Обороты макс.момента, об./ мин
                            10,             // Кол - во передач
                            4783,           // Длина, мм
                            319,            // Максимальная скорость, км / ч.
                            6400,           // Обороты макс.мощности, об./ мин.
                            'ДВС',          // Тип двигателя
                            2812,           // Колесная база, мм
                            'Бензин',       // Тип топлива
                            0,              // Ширина, мм
                            6162,           // Объем двигателя, куб.см
                            881,            // Крутящий момент, Нм
                            'Задний',       // Привод
                            8,              // Количество цилиндров
                            16              // Количество клапанов
                        )
                    ),
                    new ModelConfiguration('Chevrolet Camaro 6.2i (650 л.с.) 6-мех',
                        new CarParms(
                            650,            // Мощность, л.с.
                            1521,           // Снаряженная масса, кг
                            '6,2i',         // Двигатель
                            '',      // Степень сжатия 
                            'Механика',      // Тип коробки передач
                            3.7,            // Время разгона(0 - 100 км / ч), с
                            '6-мех',        // Коробка передач
                            '',           // Фирма КПП
                            'V-образное',   // Расположение цилиндров
                            4,              // Количество мест
                            1349,           // Высота, мм
                            0,            // Расход топлива(загородный цикл), л.на 100 км
                            0,           // Расход топлива(смешанный цикл), л.на 100 км
                            0,             // Расход топлива(городской цикл), л.на 100 км
                            '3600',    // Обороты макс.момента, об./ мин
                            6,              // Кол - во передач
                            4783,           // Длина, мм
                            319,            // Максимальная скорость, км / ч.
                            6400,           // Обороты макс.мощности, об./ мин.
                            'ДВС',          // Тип двигателя
                            2812,           // Колесная база, мм
                            'Бензин',       // Тип топлива
                            0,           // Ширина, мм
                            6162,           // Объем двигателя, куб.см
                            881,            // Крутящий момент, Нм
                            'Задний',       // Привод
                            8,             // Количество цилиндров
                            16              // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns["General Motors"], Brands.Chevrolet, 'Camaro 2015',
                [
                    'img/cars/chevrolet-Camaro-2015-00.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-01.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-02.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-03.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-04.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-05.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-06.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-07.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-08.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-09.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-10.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-11.png',
                    'img/cars/Chevrolet/chevrolet-Camaro-2015-12.png'
                ],
                [
                    new ModelConfiguration('Chevrolet Camaro 6.2i (650 л.с.) 10-АКП',
                        new CarParms(
                            650,            // Мощность, л.с.
                            1521,           // Снаряженная масса, кг
                            '6.2i',         // Двигатель
                            '',             // Степень сжатия 
                            'Автомат',      // Тип коробки передач
                            3.5,            // Время разгона(0 - 100 км / ч), с
                            '10-АКП',       // Коробка передач
                            'GM',           // Фирма КПП
                            'V-образное',   // Расположение цилиндров
                            4,              // Количество мест
                            1349,           // Высота, мм
                            12,             // Расход топлива(загородный цикл), л.на 100 км
                            14.6,           // Расход топлива(смешанный цикл), л.на 100 км
                            17.2,           // Расход топлива(городской цикл), л.на 100 км
                            '3600',         // Обороты макс.момента, об./ мин
                            10,             // Кол - во передач
                            478.,           // Длина, мм
                            318,            // Максимальная скорость, км / ч.
                            6400,           // Обороты макс.мощности, об./ мин.
                            'ДВС',          // Тип двигателя
                            2812,           // Колесная база, мм
                            'Бензин',       // Тип топлива
                            0,              // Ширина, мм
                            6162,           // Объем двигателя, куб.см
                            881,            // Крутящий момент, Нм
                            'Задний',       // Привод
                            8,              // Количество цилиндров
                            32              // Количество клапанов
                        )
                    ),
                    new ModelConfiguration('Chevrolet Camaro 6.2i (650 л.с.) 6-мех',
                        new CarParms(
                            650,            // Мощность, л.с.
                            1521,           // Снаряженная масса, кг
                            '6,2i',         // Двигатель
                            '',             // Степень сжатия 
                            'Механика',     // Тип коробки передач
                            3.6,            // Время разгона(0 - 100 км / ч), с
                            '6-МКП',        // Коробка передач
                            'Tremec',       // Фирма КПП
                            'V-образное',   // Расположение цилиндров
                            4,              // Количество мест
                            1349,           // Высота, мм
                            12,             // Расход топлива(загородный цикл), л.на 100 км
                            14.6,           // Расход топлива(смешанный цикл), л.на 100 км
                            17.2,           // Расход топлива(городской цикл), л.на 100 км
                            '3600',         // Обороты макс.момента, об./ мин
                            6,              // Кол - во передач
                            4783,           // Длина, мм
                            318,            // Максимальная скорость, км / ч.
                            6400,           // Обороты макс.мощности, об./ мин.
                            'ДВС',          // Тип двигателя
                            2812,           // Колесная база, мм
                            'Бензин',       // Тип топлива
                            0,              // Ширина, мм
                            6162,           // Объем двигателя, куб.см
                            881,            // Крутящий момент, Нм
                            'Задний',       // Привод
                            8,              // Количество цилиндров
                            32              // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns.Fiat, Brands.Ferrari, '488 Pista 2018',
                [
                    'img/cars/ferrari-488-Pista-2018-00.png',
                    'img/cars/Ferrari/ferrari-488-Pista-2018-01.png',
                    'img/cars/Ferrari/ferrari-488-Pista-2018-02.png',
                    'img/cars/Ferrari/ferrari-488-Pista-2018-03.png',
                    'img/cars/Ferrari/ferrari-488-Pista-2018-04.png',
                    'img/cars/Ferrari/ferrari-488-Pista-2018-05.png',
                    'img/cars/Ferrari/ferrari-488-Pista-2018-06.png',
                    'img/cars/Ferrari/ferrari-488-Pista-2018-07.png',
                    'img/cars/Ferrari/ferrari-488-Pista-2018-08.png'
                ],
                [
                    new ModelConfiguration('Ferrari 488 Pista 3.9i V8(720 л.с.) 7 - авт DCT',
                        new CarParms(
                            720,             // Мощность, л.с.
                            1280,            // Снаряженная масса, кг
                            '3.9i V8',       // Двигатель
                            '9.6 : 1',       // Степень сжатия 
                            'Робот 2 сцепл', // Тип коробки передач
                            2.85,            // Время разгона(0 - 100 км / ч), с
                            '7-авт DCT',     // Коробка передач
                            'Getrag',        // Фирма КПП
                            'V-образное',    // Расположение цилиндров
                            2,               // Количество мест
                            1206,            // Высота, мм
                            11,              // Расход топлива(загородный цикл), л.на 100 км
                            12.8,            // Расход топлива(смешанный цикл), л.на 100 км
                            19.4,            // Расход топлива(городской цикл), л.на 100 км
                            '3000',          // Обороты макс.момента, об./ мин
                            7,               // Кол - во передач
                            4605,            // Длина, мм
                            340,             // Максимальная скорость, км / ч.
                            8000,            // Обороты макс.мощности, об./ мин.
                            'ДВС',           // Тип двигателя
                            2650,            // Колесная база, мм
                            'Бензин',        // Тип топлива
                            0,               // Ширина, мм
                            3902,            // Объем двигателя, куб.см
                            770,             // Крутящий момент, Нм
                            'Задний',        // Привод
                            8,               // Количество цилиндров
                            32               // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns.Fiat, Brands.Ferrari, '812superfast 2017',
                [
                    'img/cars/ferrari-812superfast-2017-00.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-01.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-02.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-03.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-04.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-05.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-06.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-07.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-08.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-09.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-10.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-11.png',
                    'img/cars/Ferrari/ferrari-812superfast-2017-12.png'

                ],
                [
                    new ModelConfiguration('Ferrari 812superfast 6.5i V12 (800 л.с.) 7-авт DCT',
                        new CarParms(
                            800,             // Мощность, л.с.
                            1630,            // Снаряженная масса, кг
                            '6.5i V12',      // Двигатель
                            '13.6 : 1',      // Степень сжатия 
                            'Робот 2 сцепл', // Тип коробки передач
                            2.9,             // Время разгона(0 - 100 км / ч), с
                            '7-авт DCT',     // Коробка передач
                            'Getrag',        // Фирма КПП
                            'W-образное',    // Расположение цилиндров
                            2,               // Количество мест
                            1276,            // Высота, мм
                            0,               // Расход топлива(загородный цикл), л.на 100 км
                            14.9,            // Расход топлива(смешанный цикл), л.на 100 км
                            0,               // Расход топлива(городской цикл), л.на 100 км
                            '7000',          // Обороты макс.момента, об./ мин
                            7,               // Кол - во передач
                            4657,            // Длина, мм
                            340,             // Максимальная скорость, км / ч.
                            8500,            // Обороты макс.мощности, об./ мин.
                            'ДВС',           // Тип двигателя
                            2720,            // Колесная база, мм
                            'Бензин',        // Тип топлива
                            1971,            // Ширина, мм
                            696,             // Объем двигателя, куб.см
                            718,             // Крутящий момент, Нм
                            'Задний',        // Привод
                            12,              // Количество цилиндров
                            48               // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns.Mazda, Brands.Mazda, 'Mazda3 Sedan 2019',
                [
                    'img/cars/mazda-Mazda3-Sedan-2019-00.png',
                    'img/cars/Mazda/mazda-Mazda3-Sedan-2019-01.png',
                    'img/cars/Mazda/mazda-Mazda3-Sedan-2019-02.png',
                    'img/cars/Mazda/mazda-Mazda3-Sedan-2019-03.png',
                    'img/cars/Mazda/mazda-Mazda3-Sedan-2019-04.png',
                    'img/cars/Mazda/mazda-Mazda3-Sedan-2019-05.png',
                    'img/cars/Mazda/mazda-Mazda3-Sedan-2019-06.png',
                    'img/cars/Mazda/mazda-Mazda3-Sedan-2019-07.png'
                ],
                [
                    new ModelConfiguration('Mazda 3 Sedan 1.8 SKYACTIV-D',
                        new CarParms(
                            116,             // Мощность, л.с.
                            1436,            // Снаряженная масса, кг
                            '1.8 SKYACTIV-D 116',   // Двигатель
                            '14.8 : 1',      // Степень сжатия 
                            'Автомат', // Тип коробки передач
                            12.1,            // Время разгона(0 - 100 км / ч), с
                            '6-АКП SkyActiv-Drive', // Коробка передач
                            'Mazda',         // Фирма КПП
                            'Рядное',        // Расположение цилиндров
                            5,               // Количество мест
                            1440,            // Высота, мм
                            4.4,             // Расход топлива(загородный цикл), л.на 100 км
                            4.8,             // Расход топлива(смешанный цикл), л.на 100 км
                            5.3,             // Расход топлива(городской цикл), л.на 100 км
                            '1600-2600',     // Обороты макс.момента, об./ мин
                            6,               // Кол - во передач
                            4660,            // Длина, мм
                            199,             // Максимальная скорость, км / ч.
                            4000,            // Обороты макс.мощности, об./ мин.
                            'ДВС',           // Тип двигателя
                            2725,            // Колесная база, мм
                            'Дизель',        // Тип топлива
                            0,               // Ширина, мм
                            1759,            // Объем двигателя, куб.см
                            270,             // Крутящий момент, Нм
                            'Передний',      // Привод
                            4,               // Количество цилиндров
                            16               // Количество клапанов
                        )
                    ),
                    new ModelConfiguration('Mazda 3 Sedan 2.0 SKYACTIV-X',
                        new CarParms(
                            180,             // Мощность, л.с.
                            1436,            // Снаряженная масса, кг
                            '2.0 SKYACTIV-X 181',   // Двигатель
                            '15.0 : 1',      // Степень сжатия 
                            'Автомат',       // Тип коробки передач
                            0,               // Время разгона(0 - 100 км / ч), с
                            '6-АКП SkyActiv-Drive', // Коробка передач
                            'Mazda',         // Фирма КПП
                            'Рядное',        // Расположение цилиндров
                            5,               // Количество мест
                            1440,            // Высота, мм
                            0,               // Расход топлива(загородный цикл), л.на 100 км
                            0,               // Расход топлива(смешанный цикл), л.на 100 км
                            0,               // Расход топлива(городской цикл), л.на 100 км
                            '3000',          // Обороты макс.момента, об./ мин
                            6,               // Кол - во передач
                            4660,            // Длина, мм
                            0,               // Максимальная скорость, км / ч.
                            6000,            // Обороты макс.мощности, об./ мин.
                            'ДВС',           // Тип двигателя
                            2725,            // Колесная база, мм
                            'Бензин',        // Тип топлива
                            0,               // Ширина, мм
                            1998,            // Объем двигателя, куб.см
                            224,             // Крутящий момент, Нм
                            'Передний',      // Привод
                            4,               // Количество цилиндров
                            16               // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns.Mazda, Brands.Mazda, 'Mazda6 Sedan 2018',
                [
                    'img/cars/mazda-Mazda6-Sedan-2018-00.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-01.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-02.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-03.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-04.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-05.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-06.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-07.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-08.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-09.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-10.png',
                    'img/cars/Mazda/mazda-Mazda6-Sedan-2018-11.png',
                ],
                [
                    new ModelConfiguration('Mazda 6 Sedan 2.5 AT Top',
                        new CarParms(
                            194,             // Мощность, л.с.
                            1532,            // Снаряженная масса, кг
                            '2.5 SKYACTIV-G 194',   // Двигатель
                            '13.0 : 1',      // Степень сжатия 
                            'Автомат',       // Тип коробки передач
                            8.1,             // Время разгона(0 - 100 км / ч), с
                            '6-АКП SkyActiv-Drive', // Коробка передач
                            'Mazda',         // Фирма КПП
                            'Рядное',        // Расположение цилиндров
                            5,               // Количество мест
                            1450,            // Высота, мм
                            5.4,             // Расход топлива(загородный цикл), л.на 100 км
                            6.7,             // Расход топлива(смешанный цикл), л.на 100 км
                            8.8,             // Расход топлива(городской цикл), л.на 100 км
                            '4000',          // Обороты макс.момента, об./ мин
                            6,               // Кол - во передач
                            0,               // Длина, мм
                            223,             // Максимальная скорость, км / ч.
                            6000,            // Обороты макс.мощности, об./ мин.
                            'ДВС',           // Тип двигателя
                            2830,            // Колесная база, мм
                            'Бензин',        // Тип топлива
                            2090,            // Ширина, мм
                            2488,            // Объем двигателя, куб.см
                            258,             // Крутящий момент, Нм
                            'Передний',      // Привод
                            4,               // Количество цилиндров
                            16               // Количество клапанов
                        )
                    ),
                    new ModelConfiguration('Mazda 6 Sedan 2.5 AT Topwinter',
                        new CarParms(
                            194,             // Мощность, л.с.
                            1532,            // Снаряженная масса, кг
                            '2.0 SKYACTIV-X 181',   // Двигатель
                            '13.0 : 1',      // Степень сжатия 
                            'Автомат',       // Тип коробки передач
                            8.1,             // Время разгона(0 - 100 км / ч), с
                            '6-АКП SkyActiv-Drive', // Коробка передач
                            'Mazda',         // Фирма КПП
                            'Рядное',        // Расположение цилиндров
                            5,               // Количество мест
                            1450,            // Высота, мм
                            5.4,             // Расход топлива(загородный цикл), л.на 100 км
                            6.7,             // Расход топлива(смешанный цикл), л.на 100 км
                            8.8,             // Расход топлива(городской цикл), л.на 100 км
                            '4000',          // Обороты макс.момента, об./ мин
                            6,               // Кол - во передач
                            0,               // Длина, мм
                            223,             // Максимальная скорость, км / ч.
                            6000,            // Обороты макс.мощности, об./ мин.
                            'ДВС',           // Тип двигателя
                            2830,            // Колесная база, мм
                            'Бензин',        // Тип топлива
                            2090,            // Ширина, мм
                            2488,            // Объем двигателя, куб.см
                            258,             // Крутящий момент, Нм
                            'Передний',      // Привод
                            4,               // Количество цилиндров
                            16               // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns["Volkswagen Auto Group"], Brands.Porsche, 'Panamera Sport Turismo 2017',
                [
                    'img/cars/porsche-Panamera-Sport-Turismo-2017-00.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-01.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-02.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-03.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-04.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-05.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-06.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-07.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-08.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-09.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-10.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-11.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-12.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-13.png',
                    'img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-14.png'
                ],
                [
                    new ModelConfiguration('Porsche Panamera Sport Turismo Panamera Turbo S E-Hybrid ST',
                        new CarParms(
                            680,             // Мощность, л.с.
                            1990,            // Снаряженная масса, кг
                            '4.0 V8 E-Hybrid', // Двигатель
                            '',              // Степень сжатия 
                            'Робот 2 сцепл', // Тип коробки передач
                            3.4,             // Время разгона(0 - 100 км / ч), с
                            '8-PDK',         // Коробка передач
                            'ZF',            // Фирма КПП
                            'V-образное',    // Расположение цилиндров
                            4,               // Количество мест
                            1428,            // Высота, мм
                            0,               // Расход топлива(загородный цикл), л.на 100 км
                            3,               // Расход топлива(смешанный цикл), л.на 100 км
                            0,               // Расход топлива(городской цикл), л.на 100 км
                            '',              // Обороты макс.момента, об./ мин
                            8,               // Кол - во передач
                            5049,            // Длина, мм
                            310,             // Максимальная скорость, км / ч.
                            0,               // Обороты макс.мощности, об./ мин.
                            'Гибрид',        // Тип двигателя
                            2950,            // Колесная база, мм
                            'Бензин',        // Тип топлива
                            2165,            // Ширина, мм
                            3996,            // Объем двигателя, куб.см
                            850,             // Крутящий момент, Нм
                            'Полный',        // Привод
                            8,               // Количество цилиндров
                            32               // Количество клапанов
                        )
                    ),
                    new ModelConfiguration('Porsche Panamera Sport Turismo Panamera Turbo ST',
                        new CarParms(
                            550,             // Мощность, л.с.
                            2035,            // Снаряженная масса, кг
                            '4.0 V8',        // Двигатель
                            '10.1 : 1',      // Степень сжатия 
                            'Робот 2 сцепл', // Тип коробки передач
                            3.8,             // Время разгона(0 - 100 км / ч), с
                            '8-PDK',         // Коробка передач
                            'ZF',            // Фирма КПП
                            'V-образное',    // Расположение цилиндров
                            4,               // Количество мест
                            1432,            // Высота, мм
                            7.4,             // Расход топлива(загородный цикл), л.на 100 км
                            9.5,             // Расход топлива(смешанный цикл), л.на 100 км
                            13.1,            // Расход топлива(городской цикл), л.на 100 км
                            '1960-4500',     // Обороты макс.момента, об./ мин
                            8,               // Кол - во передач
                            5049,            // Длина, мм
                            304,             // Максимальная скорость, км / ч.
                            6000,            // Обороты макс.мощности, об./ мин.
                            'ДВС',           // Тип двигателя
                            2650,            // Колесная база, мм
                            'Бензин',        // Тип топлива
                            2165,            // Ширина, мм
                            3996,            // Объем двигателя, куб.см
                            770,             // Крутящий момент, Нм
                            'Полный',        // Привод
                            8,               // Количество цилиндров
                            32               // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns["Volkswagen Auto Group"], Brands.Porsche, '718 Cayman 2016',
                [
                    'img/cars/porsche-718-Cayman-2016-00.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-01.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-02.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-03.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-04.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-05.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-06.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-07.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-08.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-09.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-10.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-11.png',
                    'img/cars/Porsche/porsche-718-Cayman-2016-12.png',
                ],
                [
                    new ModelConfiguration('Porsche 718 Cayman 2.5 AT GTS',
                        new CarParms(
                            365,             // Мощность, л.с.
                            1430,            // Снаряженная масса, кг
                            '2.5i',          // Двигатель
                            ' ',             // Степень сжатия 
                            'Робот 2 сцепл', // Тип коробки передач
                            4.3,             // Время разгона(0 - 100 км / ч), с
                            '7-PDK',         // Коробка передач
                            'ZF',            // Фирма КПП
                            'Оппозитное',    // Расположение цилиндров
                            2,               // Количество мест
                            1295,            // Высота, мм
                            6.6,             // Расход топлива(загородный цикл), л.на 100 км
                            8.2,             // Расход топлива(смешанный цикл), л.на 100 км
                            10.9,            // Расход топлива(городской цикл), л.на 100 км
                            '1900-5500',     // Обороты макс.момента, об./ мин
                            7,               // Кол - во передач
                            4379,            // Длина, мм
                            290,             // Максимальная скорость, км / ч.
                            6500,            // Обороты макс.мощности, об./ мин.
                            'ДВС',           // Тип двигателя
                            2475,            // Колесная база, мм
                            'Бензин',        // Тип топлива
                            1994,            // Ширина, мм
                            2497,            // Объем двигателя, куб.см
                            430,             // Крутящий момент, Нм
                            'Задний',        // Привод
                            4,               // Количество цилиндров
                            16               // Количество клапанов
                        )
                    ),
                    new ModelConfiguration('Porsche 718 Cayman 2.5 AT S',
                        new CarParms(
                            350,             // Мощность, л.с.
                            1460,            // Снаряженная масса, кг
                            '2.5i',          // Двигатель
                            '9.5 : 1',       // Степень сжатия 
                            'Робот 2 сцепл', // Тип коробки передач
                            4.4,             // Время разгона(0 - 100 км / ч), с
                            '7-PDK',         // Коробка передач
                            'ZF',            // Фирма КПП
                            'Оппозитное',    // Расположение цилиндров
                            2,               // Количество мест
                            1295,            // Высота, мм
                            6.0,             // Расход топлива(загородный цикл), л.на 100 км
                            7.3,             // Расход топлива(смешанный цикл), л.на 100 км
                            9.5,             // Расход топлива(городской цикл), л.на 100 км
                            '1900-4500',     // Обороты макс.момента, об./ мин
                            7,               // Кол - во передач
                            4379,            // Длина, мм
                            285,             // Максимальная скорость, км / ч.
                            6500,            // Обороты макс.мощности, об./ мин.
                            'ДВС',           // Тип двигателя
                            2475,            // Колесная база, мм
                            'Бензин',        // Тип топлива
                            1994,            // Ширина, мм
                            2497,            // Объем двигателя, куб.см
                            420,             // Крутящий момент, Нм
                            'Задний',        // Привод
                            4,               // Количество цилиндров
                            16               // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns["Tesla Motors"], Brands.Tesla, 'Model 3 2017',
                [
                    'img/cars/tesla-Model-3-2017-00.png',
                    'img/cars/Tesla/tesla-Model-3-2017-01.png',
                    'img/cars/Tesla/tesla-Model-3-2017-02.png',
                    'img/cars/Tesla/tesla-Model-3-2017-03.png',
                    'img/cars/Tesla/tesla-Model-3-2017-04.png',
                    'img/cars/Tesla/tesla-Model-3-2017-05.png',
                    'img/cars/Tesla/tesla-Model-3-2017-06.png',
                    'img/cars/Tesla/tesla-Model-3-2017-07.png',
                    'img/cars/Tesla/tesla-Model-3-2017-08.png',
                    'img/cars/Tesla/tesla-Model-3-2017-09.png',
                    'img/cars/Tesla/tesla-Model-3-2017-10.png'
                ],
                [
                    new ModelConfiguration('Tesla Model 3 Performance',
                        new CarParms(
                            428,         // Мощность, л.с.
                            1725,        // Снаряженная масса, кг
                            '75D',       // Двигатель
                            '',          // Степень сжатия 
                            'Редуктор',  // Тип коробки передач
                            3.5,         // Время разгона(0 - 100 км / ч), с
                            ' ',         // Коробка передач
                            ' ',         // Фирма КПП
                            ' ',         // Расположение цилиндров
                            5,           // Количество мест
                            1443,        // Высота, мм
                            0,           // Расход топлива(загородный цикл), л.на 100 км
                            0,           // Расход топлива(смешанный цикл), л.на 100 км
                            0,           // Расход топлива(городской цикл), л.на 100 км
                            '',         // Обороты макс.момента, об./ мин
                            0,           // Кол - во передач
                            4694,        // Длина, мм
                            250,         // Максимальная скорость, км / ч.
                            0,           // Обороты макс.мощности, об./ мин.
                            'Электро',   // Тип двигателя
                            2875,        // Колесная база, мм
                            '',          // Тип топлива
                            2088,        // Ширина, мм
                            0,           // Объем двигателя, куб.см
                            660,         // Крутящий момент, Нм
                            'Полный',    // Привод
                            0,           // Количество цилиндров
                            0            // Количество клапанов
                        )
                    ),
                    new ModelConfiguration('Tesla Model 3 Long Range',
                        new CarParms(
                            428,         // Мощность, л.с.
                            1725,        // Снаряженная масса, кг
                            '75D',       // Двигатель
                            '',          // Степень сжатия 
                            'Редуктор',  // Тип коробки передач
                            4.5,         // Время разгона(0 - 100 км / ч), с
                            ' ',         // Коробка передач
                            ' ',         // Фирма КПП
                            ' ',         // Расположение цилиндров
                            5,           // Количество мест
                            1443,        // Высота, мм
                            0,           // Расход топлива(загородный цикл), л.на 100 км
                            0,           // Расход топлива(смешанный цикл), л.на 100 км
                            0,           // Расход топлива(городской цикл), л.на 100 км
                            '',         // Обороты макс.момента, об./ мин
                            0,           // Кол - во передач
                            4694,        // Длина, мм
                            233,         // Максимальная скорость, км / ч.
                            0,           // Обороты макс.мощности, об./ мин.
                            'Электро',   // Тип двигателя
                            2875,        // Колесная база, мм
                            '',          // Тип топлива
                            2088,        // Ширина, мм
                            0,           // Объем двигателя, куб.см
                            660,         // Крутящий момент, Нм
                            'Полный',    // Привод
                            0,           // Количество цилиндров
                            0            // Количество клапанов
                        )
                    )
                ]
            ),
            new Car(Concerns["Tesla Motors"], Brands.Tesla, 'Model S 2016',
                [
                    'img/cars/tesla-Model-S-2016-00.png',
                    'img/cars/Tesla/tesla-Model-S-2016-01.png',
                    'img/cars/Tesla/tesla-Model-S-2016-02.png',
                    'img/cars/Tesla/tesla-Model-S-2016-03.png',
                    'img/cars/Tesla/tesla-Model-S-2016-04.png',
                    'img/cars/Tesla/tesla-Model-S-2016-05.png',
                    'img/cars/Tesla/tesla-Model-S-2016-06.png',
                    'img/cars/Tesla/tesla-Model-S-2016-07.png',
                    'img/cars/Tesla/tesla-Model-S-2016-08.png',
                    'img/cars/Tesla/tesla-Model-S-2016-09.png',
                    'img/cars/Tesla/tesla-Model-S-2016-10.png',
                    'img/cars/Tesla/tesla-Model-S-2016-11.png'
                ],
                [
                    new ModelConfiguration('Tesla Model S P100D',
                        new CarParms(
                            700,         // Мощность, л.с.
                            0,           // Снаряженная масса, кг
                            'P100D',     // Двигатель
                            '',          // Степень сжатия 
                            'Редуктор',  // Тип коробки передач
                            2.7,         // Время разгона(0 - 100 км / ч), с
                            ' ',         // Коробка передач
                            ' ',         // Фирма КПП
                            ' ',         // Расположение цилиндров
                            5,           // Количество мест
                            1430,        // Высота, мм
                            0,           // Расход топлива(загородный цикл), л.на 100 км
                            0,           // Расход топлива(смешанный цикл), л.на 100 км
                            0,           // Расход топлива(городской цикл), л.на 100 км
                            '',          // Обороты макс.момента, об./ мин
                            0,           // Кол - во передач
                            4978,         // Длина, мм
                            250,         // Максимальная скорость, км / ч.
                            0,           // Обороты макс.мощности, об./ мин.
                            'Электро',   // Тип двигателя
                            2946,        // Колесная база, мм
                            '',          // Тип топлива
                            2184,        // Ширина, мм
                            0,           // Объем двигателя, куб.см
                            0,           // Крутящий момент, Нм
                            'Полный',    // Привод
                            0,           // Количество цилиндров
                            0            // Количество клапанов
                        )
                    ),
                    new ModelConfiguration('Tesla Model S 100D',
                        new CarParms(
                            428,         // Мощность, л.с.
                            0,           // Снаряженная масса, кг
                            '100D',      // Двигатель
                            '',          // Степень сжатия 
                            'Редуктор',  // Тип коробки передач
                            4.3,         // Время разгона(0 - 100 км / ч), с
                            ' ',         // Коробка передач
                            ' ',         // Фирма КПП
                            ' ',         // Расположение цилиндров
                            5,           // Количество мест
                            1430,        // Высота, мм
                            0,           // Расход топлива(загородный цикл), л.на 100 км
                            0,           // Расход топлива(смешанный цикл), л.на 100 км
                            0,           // Расход топлива(городской цикл), л.на 100 км
                            '',          // Обороты макс.момента, об./ мин
                            0,           // Кол - во передач
                            4978,        // Длина, мм
                            250,         // Максимальная скорость, км / ч.
                            0,           // Обороты макс.мощности, об./ мин.
                            'Электро',   // Тип двигателя
                            2946,        // Колесная база, мм
                            '',          // Тип топлива
                            2184,        // Ширина, мм
                            0,           // Объем двигателя, куб.см
                            660,         // Крутящий момент, Нм
                            'Полный',    // Привод
                            0,           // Количество цилиндров
                            0            // Количество клапанов
                        )
                    )
                ]
            )
        ]
    );

    controlCars.Start();
} 