var Cars;
(function (Cars) {
    let Concerns;
    (function (Concerns) {
        Concerns[Concerns["Fiat"] = 0] = "Fiat";
        Concerns[Concerns["Daimler"] = 1] = "Daimler";
        Concerns[Concerns["General Motors"] = 2] = "General Motors";
        Concerns[Concerns["Mazda"] = 3] = "Mazda";
        Concerns[Concerns["Volkswagen Auto Group"] = 4] = "Volkswagen Auto Group";
        Concerns[Concerns["Tesla Motors"] = 5] = "Tesla Motors";
    })(Concerns || (Concerns = {}));
    ;
    let Brands;
    (function (Brands) {
        Brands[Brands["Alfa Romeo"] = 0] = "Alfa Romeo";
        Brands[Brands["Aston Martin"] = 1] = "Aston Martin";
        Brands[Brands["Chevrolet"] = 2] = "Chevrolet";
        Brands[Brands["Ferrari"] = 3] = "Ferrari";
        Brands[Brands["Mazda"] = 4] = "Mazda";
        Brands[Brands["Porsche"] = 5] = "Porsche";
        Brands[Brands["Tesla"] = 6] = "Tesla";
    })(Brands || (Brands = {}));
    ;
    let RuleSelectBrand;
    (function (RuleSelectBrand) {
        RuleSelectBrand[RuleSelectBrand["One"] = 0] = "One";
        RuleSelectBrand[RuleSelectBrand["Several"] = 1] = "Several";
    })(RuleSelectBrand || (RuleSelectBrand = {}));
    ;
    class ListFS {
        constructor(input, label) {
            this.input = input;
            this.label = label;
        }
    }
    class Brand {
        constructor(brand, headNote) {
            this._brand = brand;
            this._headNote = headNote;
        }
        get brand() {
            return this._brand;
        }
        get headNote() {
            return this._headNote;
        }
    }
    let $ = (id) => document.getElementById(id);
    class Menu {
        constructor(box) {
            this._isActive = false;
            this._box = box;
        }
        get box() {
            return this._box;
        }
        get isActive() {
            return this._isActive;
        }
        set isActive(value) {
            this._isActive = value;
        }
        SetClick() {
            this.box.addEventListener('click', () => {
                this.OnClick();
            }, false);
        }
        UnActive() {
            if (!this.box.classList.contains(Menu.cssDefault)) {
                this.box.classList.add(Menu.cssDefault);
            }
            ;
            if (this.box.classList.contains(Menu.cssActive)) {
                this.box.classList.remove(Menu.cssActive);
            }
            ;
            this.isActive = false;
        }
        ToActive() {
            this.isActive = true;
            if (this.box.classList.contains(Menu.cssDefault)) {
                this.box.classList.remove(Menu.cssDefault);
            }
            ;
            if (!this.box.classList.contains(Menu.cssActive)) {
                this.box.classList.add(Menu.cssActive);
            }
            ;
        }
        SetActive() {
            if (MenuBrand.ruleSelectBrand === RuleSelectBrand.Several) {
                if (this.isActive) {
                    this.UnActive();
                }
                else {
                    this.ToActive();
                }
            }
            else if (MenuBrand.ruleSelectBrand === RuleSelectBrand.One) {
                this.ToActive();
            }
        }
    }
    Menu.cssDefault = 'default';
    Menu.cssActive = 'active';
    class MenuBrand extends Menu {
        constructor(box, brand) {
            super(box);
            this._brand = brand;
            this.SetClick();
        }
        get brand() {
            return this._brand;
        }
        OnClick() {
            this.SetActive();
            MenuBrand.showMenuModels.call(Menu.contextCars, this.brand);
        }
    }
    MenuBrand.ruleSelectBrand = RuleSelectBrand.One;
    class MenuModel extends Menu {
        constructor(box, car) {
            super(box);
            this._car = car;
            this.SetClick();
        }
        get car() {
            return this._car;
        }
        OnClick() {
            this.SetActive();
            this.box.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
            MenuModel.showModelDescription.call(Menu.contextCars, this.car);
        }
    }
    class CarParms {
        constructor(power = 210, curbWeight = 1525, engine = '2.2d MultiJet', compressionRatio = '15.5: 1', transmissionType = 'Автомат', accelerationTime = 6.8, cearBox = '8-АКП', gearboxCompany = 'ZF', cylinderArrangement = 'Рядное', numberOfSeats = 5, heightMM = 1436, fuelConsumptionExtraUrbanCycle = 4, fuelConsumptionMixedCycle = 4.7, fuelConsumptionUrbanCycle = 5.8, speedMaxMoment = '1750', numberOfGears = 8, lengthMM = 4643, maximumSpeed = 235, speedMaxPower = 3750, engineType = 'ДВС', wheelBaseMM = 2820, fuelType = 'Дизель', widthMM = 2024, engineSisplacementCC = 2143, torqueNM = 470, drive = 'Полный', numberOfCylinders = 4, numberOfValves = 16) {
            this.power = power;
            this.curbWeight = curbWeight;
            this.engine = engine;
            this.compressionRatio = compressionRatio;
            this.transmissionType = transmissionType;
            this.accelerationTime = accelerationTime;
            this.cearBox = cearBox;
            this.gearboxCompany = gearboxCompany;
            this.cylinderArrangement = cylinderArrangement;
            this.numberOfSeats = numberOfSeats;
            this.heightMM = heightMM;
            this.fuelConsumptionExtraUrbanCycle = fuelConsumptionExtraUrbanCycle;
            this.fuelConsumptionMixedCycle = fuelConsumptionMixedCycle;
            this.fuelConsumptionUrbanCycle = fuelConsumptionUrbanCycle;
            this.speedMaxMoment = speedMaxMoment;
            this.numberOfGears = numberOfGears;
            this.lengthMM = lengthMM;
            this.maximumSpeed = maximumSpeed;
            this.speedMaxPower = speedMaxPower;
            this.engineType = engineType;
            this.wheelBaseMM = wheelBaseMM;
            this.fuelType = fuelType;
            this.widthMM = widthMM;
            this.engineSisplacementCC = engineSisplacementCC;
            this.torqueNM = torqueNM;
            this.drive = drive;
            this.numberOfCylinders = numberOfCylinders;
            this.numberOfValves = numberOfValves;
        }
        getHTMLElement() {
            let element = document.createElement('div');
            let ul = document.createElement('ul');
            this.SetLi(ul, 'Мощность, л.с.', `${this.power}`);
            this.SetLi(ul, 'Снаряженная масса, кг', `${this.curbWeight}`);
            this.SetLi(ul, 'Двигатель', `${this.engine}`);
            this.SetLi(ul, 'Степень сжатия', `${this.compressionRatio}`);
            this.SetLi(ul, 'Тип коробки передач', `${this.transmissionType}`);
            this.SetLi(ul, 'Время разгона(0 - 100 км / ч), с', `${this.accelerationTime}`);
            this.SetLi(ul, 'Коробка передач', `${this.cearBox}`);
            this.SetLi(ul, 'Фирма КПП', `${this.gearboxCompany}`);
            this.SetLi(ul, 'Расположение цилиндров', `${this.cylinderArrangement}`);
            this.SetLi(ul, 'Количество мест', `${this.numberOfSeats}`);
            this.SetLi(ul, 'Высота, мм', `${this.heightMM}`);
            this.SetLi(ul, 'Расход топлива(загородный цикл), л.на 100 км', `${this.fuelConsumptionExtraUrbanCycle}`);
            this.SetLi(ul, 'Расход топлива(смешанный цикл), л.на 100 км', `${this.fuelConsumptionMixedCycle}`);
            this.SetLi(ul, 'Расход топлива(городской цикл), л.на 100 км', `${this.fuelConsumptionUrbanCycle}`);
            this.SetLi(ul, 'Обороты макс.момента, об./мин', `${this.speedMaxMoment}`);
            this.SetLi(ul, 'Количество передач', `${this.numberOfGears}`);
            this.SetLi(ul, 'Длина, мм', `${this.lengthMM}`);
            this.SetLi(ul, 'Максимальная скорость, км/ч.', `${this.maximumSpeed}`);
            this.SetLi(ul, 'Обороты макс.мощности, об./мин.', `${this.speedMaxPower}`);
            this.SetLi(ul, 'Тип двигателя', `${this.engineType}`);
            this.SetLi(ul, 'Колесная база, мм', `${this.wheelBaseMM}`);
            this.SetLi(ul, 'Тип топлива', `${this.fuelType}`);
            this.SetLi(ul, 'Ширина, мм', `${this.widthMM}`);
            this.SetLi(ul, 'Объем двигателя, куб.см', `${this.engineSisplacementCC}`);
            this.SetLi(ul, 'Крутящий момент, Нм', `${this.torqueNM}`);
            this.SetLi(ul, 'Привод', `${this.drive}`);
            this.SetLi(ul, 'Количество цилиндров', `${this.numberOfCylinders}`);
            this.SetLi(ul, 'Количество клапанов', `${this.numberOfValves}`);
            element.appendChild(ul);
            return element;
        }
        SetLi(ul, caption, value) {
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
    CarParms.cssConfParms = 'conf-parms';
    CarParms.cssCaptionPparam = 'caption-param';
    CarParms.cssValueParam = 'value-param';
    CarParms.cssDelemiter = 'w5prc';
    class ModelConfiguration {
        constructor(name, carParms) {
            this._name = name;
            this._carParms = carParms;
        }
        get name() {
            return this._name;
        }
        get carParms() {
            return this._carParms;
        }
    }
    class Car {
        constructor(concern, brand, model, imgSrcs, configurations) {
            this._concern = concern;
            this._brand = brand;
            this._model = model;
            this._imgSrcs = imgSrcs;
            this._configurations = configurations;
        }
        get concern() {
            return this._concern;
        }
        get brand() {
            return this._brand;
        }
        get model() {
            return this._model;
        }
        get imgSrcs() {
            return this._imgSrcs;
        }
        get configurations() {
            return this._configurations;
        }
    }
    class ControlCars {
        constructor(ruleSelectBrands, brands, menuBrands, navModels, imagesOff, showLeftOff, showRightOff, showCollapsOff, headnote, navConfigurations, features, fullScreen, fullScreenImage, fullScreenClose, fullScreenImageLeft, fullScreenImageRight, fullScreenList, cars) {
            this._menuModels = new Array;
            this._imageRate = 1.8225;
            this._interval = 2100;
            this._indexImg = 1;
            this._image = new Image();
            this._isFullScreen = false;
            this._listFSImages = new Array();
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
        Start() {
            this._menuBrands[0].OnClick();
        }
        SetOnClickRuleSelectBrands() {
            for (let i = 0; i < this._ruleSelectBrands.length; i++) {
                this._ruleSelectBrands[i].addEventListener('change', (e) => { this.OnClickRuleSelectBrands(e); }, false);
            }
        }
        OnClickRuleSelectBrands(e) {
            if (e.target.checked) {
                if (e.target.id === 'ruleSelectBrandOne') {
                    MenuBrand.ruleSelectBrand = RuleSelectBrand.One;
                    let activeBrand;
                    if (this._menuBrands.some(menuItem => menuItem.isActive)) {
                        activeBrand = this._menuBrands.filter(menuItem => menuItem.isActive)[0].brand;
                        this._menuBrands.forEach(menuItem => {
                            if (menuItem.brand !== activeBrand) {
                                menuItem.UnActive();
                            }
                        });
                    }
                    else {
                        this._menuBrands[0].ToActive();
                        activeBrand = this._menuBrands[0].brand;
                    }
                    this.ShowModels(activeBrand);
                }
                else if (e.target.id === 'ruleSelectBrandSeveral') {
                    MenuBrand.ruleSelectBrand = RuleSelectBrand.Several;
                }
            }
        }
        ShowModels(activeBrand) {
            if (MenuBrand.ruleSelectBrand === RuleSelectBrand.One) {
                let listInActive = this._menuBrands.filter(menuItem => menuItem.isActive && menuItem.brand !== activeBrand);
                for (let menuItem of listInActive) {
                    menuItem.UnActive();
                }
            }
            else if (MenuBrand.ruleSelectBrand === RuleSelectBrand.Several) {
            }
            this.CreateMenuModels();
        }
        CreateMenuModels() {
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
                    this._menuModels.push(new MenuModel(div, car));
                }
            }
            this._menuModels[0].OnClick();
        }
        ShowModelDescription(car) {
            for (let item of this._menuModels.filter(item => item.isActive && item.car.model !== car.model)) {
                item.UnActive();
            }
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
        ShowModel(car) {
            this._image.src = car.imgSrcs[this._indexImg];
        }
        SetWindowResize() {
            window.addEventListener('resize', () => {
                this._imagesOff.style.height = `${this._imagesOff.clientWidth / this._imageRate}px`;
            }, false);
        }
        clipRandomAnimate(interval, box) {
            clearTimeout(this._clipTimeOut);
            this._clipTimeOut = window.setTimeout(() => {
                this._indexImg = (this._indexImg < this._selectedModel.imgSrcs.length - 1) ? (this._indexImg + 1) : 1;
                this.ShowModel(this._selectedModel);
                if (!this._isFullScreen) {
                    this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
                }
                else {
                    this.SetEnableShowLeftRight(this._fullScreenImageLeft, this._fullScreenImageRight);
                }
                this._clipTimeOut = window.setTimeout(() => { this.clipRandomAnimate(interval, box); }, interval);
            }, interval);
        }
        SetOnClickOff() {
            this._showLeftOff.addEventListener('click', () => {
                if (this._indexImg > 1) {
                    this._indexImg -= 1;
                    this.ShowModel(this._selectedModel);
                }
                ;
                this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
            }, false);
            this._showRightOff.addEventListener('click', () => {
                if (this._indexImg < this._selectedModel.imgSrcs.length - 1) {
                    this._indexImg += 1;
                    this.ShowModel(this._selectedModel);
                }
                ;
                this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
            }, false);
            this._showCollapsOff.addEventListener('click', () => {
                document.getElementsByTagName('html')[0].style.overflow = 'hidden';
                this._isFullScreen = true;
                this.ShowModel(this._selectedModel);
                this.SetEnableShowLeftRight(this._fullScreenImageLeft, this._fullScreenImageRight);
                clearTimeout(this._clipTimeOut);
                this._fullScreen.style.display = 'flex';
                setTimeout(() => { this._fullScreen.style.opacity = '1'; }, 50);
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
                    let preloadImg = new Image();
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
            this._imagesOff.addEventListener('mouseleave', () => {
                clearTimeout(this._clipTimeOut);
                if (!this._isFullScreen) {
                    this.clipRandomAnimate(this._interval, this._imagesOff);
                }
            }, false);
        }
        SetEnableShowLeftRight(arrowLeft, arrowRight) {
            if (this._indexImg === 1) {
                arrowLeft.dataset.enable = 'false';
                arrowRight.dataset.enable = 'true';
            }
            else if (this._indexImg === this._selectedModel.imgSrcs.length - 1) {
                arrowLeft.dataset.enable = 'true';
                arrowRight.dataset.enable = 'false';
            }
            else {
                arrowLeft.dataset.enable = 'true';
                arrowRight.dataset.enable = 'true';
            }
        }
        SetOnLoadImage() {
            this._image.addEventListener('load', () => {
                if (!this._isFullScreen) {
                    this._imagesOff.style.backgroundImage = `url('${this._image.src}')`;
                }
                else {
                    this._fullScreenImage.style.backgroundImage = `url('${this._image.src}')`;
                }
            }, false);
        }
        SetOnClickFullScreen() {
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
            this._fullScreenImageLeft.addEventListener('click', () => {
                if (this._indexImg > 1) {
                    this._indexImg -= 1;
                    this.ToChangeFullScreenImage();
                    this.ShowModel(this._selectedModel);
                }
                ;
                this.SetEnableShowLeftRight(this._fullScreenImageLeft, this._fullScreenImageRight);
            }, false);
            this._fullScreenImageRight.addEventListener('click', () => {
                if (this._indexImg < this._selectedModel.imgSrcs.length - 1) {
                    this._indexImg += 1;
                    this.ToChangeFullScreenImage();
                    this.ShowModel(this._selectedModel);
                }
                ;
                this.SetEnableShowLeftRight(this._fullScreenImageLeft, this._fullScreenImageRight);
            }, false);
        }
        ToChangeFullScreenImage() {
            let selected = this._listFSImages.filter(elem => elem.input.dataset['indexImg'] === this._indexImg.toString());
            if (selected.length && selected.length === 1) {
                selected[0].input.checked = true;
                selected[0].label.scrollIntoView({ block: "center", behavior: "smooth" });
            }
        }
        OnChangeFullScreenList(e) {
            let selected = e.target;
            if (selected.checked) {
                this._indexImg = Number(selected.dataset['indexImg']);
                this.ShowModel(this._selectedModel);
                this.SetEnableShowLeftRight(this._fullScreenImageLeft, this._fullScreenImageRight);
                this._listFSImages.filter(elem => elem.input.dataset['indexImg'] === selected.dataset['indexImg'])[0].label.scrollIntoView({ block: "center", behavior: "smooth" });
            }
        }
        OnSelectedCarConfiguration(e) {
            let selected = e.target;
            console.log(this._selectedModel.configurations[Number(selected.dataset['indexConf'])].name);
            if (selected.checked) {
                console.log(this._selectedModel.configurations[Number(selected.dataset['indexConf'])].name);
                this._features.innerHTML = '';
                this._features.appendChild(this._selectedModel.configurations[Number(selected.dataset['indexConf'])].carParms.getHTMLElement());
            }
        }
    }
    ControlCars.cssMenuModel = 'car-model';
    ControlCars.cssFullScreeListRadio = 'radio';
    ControlCars.cssFullScreeListItem = 'item';
    let controlCars = new ControlCars(document.getElementsByName('rule-select-brand'), [
        new Brand(Brands["Alfa Romeo"], 'Alfa Romeo (Альфа Ромео) – марка итальянских автомобилей. Компания A. L. F. A была основана в 1910 году, а первой моделью стала НР24, которая в следующем году сразу же приняла участие в автогонках. Эмблема компании содержит сразу несколько символов Милана, в окрестностях которого и был открыт первый завод – зеленую змею, а также красный крест на белом фоне. ' +
            'Сейчас компания выпускает следующие модели машин: MiTo (супермини), Giulietta (семейный автомобиль), 4С (купе), 4С Spider (кабриолет), Giulia (седан) и Stelvio (кроссовер). Компания хорошо известна благодаря своему сотрудничеству с итальянскими силовыми ведомствами – различные модели машин Alfa Romeo использовали как карабинеры, так и полиция.'),
        new Brand(Brands["Aston Martin"], 'Aston Martin (Астон Мартин) – британская автомобильная компания, основанная в 1913 году. С того времени компания неоднократно меняла владельца, а с 1987 по 2007 год принадлежала концерну Ford. Сейчас Aston Martin принадлежит британскому консорциуму Investindustrial. Основное производство сосредоточено в британском Гейдоне,а также частично в Австрии. ' +
            'Сейчас с конвейеров заводов Aston Martin сходят такие модели машин, как Cygnet (микроавтомобиль), спортивные V8 Vantage, мощные DB9, DB11 и Vanquish, спортивный седан Rapide S, а недавно был презентован суперкар Valkyrie с гибридной силовой установкой (планируется выпуск 150 автомобилей ценой 2,5 миллиона фунтов). Компания известна тем, что большинство моделей изготовлено вручную – так, в 2007 Aston Martin выпустил всего 7224 машины. Кроме этого, Aston Martin (особенно модель DB5) можно назвать самой любимой машиной Джеймса Бонда.'),
        new Brand(Brands.Chevrolet, 'Chevrolet (Шевроле) - американский производитель легковых и грузовых автомобилей, пикапов и автобусов. Основана в 1911 году швейцарским гонщиком и механиком Луи Жозефом Шевроле вместе с предпринимателем по имени Уильям Дюран, который за три года до того совместно с Фредериком Смитом начал компанию General Motors. Почти с самого начала фирма Chevrolet была и остается дочерней маркой "Дженерал Моторс". Штаб-квартира компании расположена в пригороде Детройта. ' +
            'Первым серийным автомобилем марки стал Chevrolet Classic-Six, который оказался слишком дорогим, чтобы конкурировать с популярным в то время Ford Model T. Тогда компания перешла к выпуску дешевых, "народных" автомобилей, чем быстро завоевала себе расположение покупателей. Популярными моделями марки были такие автомобили, как Chevrolet Bel Air, Corvette, Impala, Malibu, Camaro, Monte Carlo, пикапы Chevrolet Suburban, Blazer, Silverado.'),
        new Brand(Brands.Ferrari, 'Ferrari (Феррари) - итальянская компания-производитель спортивных автомобилей класса люкс и ультра люкс. Основана в 1928 году Энцо Феррари как Scuderia Ferrari (Скудерия Феррари). С начала своей истории является постоянным участником, поставщиком двигателей и спонсором наиболее выдающихся автоспортивных соревнований. Особенно богаты достижения Ferrari на на чемпионате Формула-1. Штаб-квартира в Маранелло (Италия). ' +
            'Многие автомобили марки имеют коллекционную ценность, некоторые уникальны. Ferrari принадлежат многочисленные рекорды не только на треках - 9 из 12 самых дорогих автомобилей мира, проданных с молотка до 2018 года, - марки Ferrari. А самая большая сумма, заплаченная за автомобиль до сих пор (2018 год) составляет 70 миллионов долларов за Ferrari 250 GTO 1963 года выпуска. ' +
            'В 2007 году Ferrari была поглощена концерном Fiat, образовав Fiat Group, а с присоединением к ним Chrysler, концерн трансформировался в Fiat Chrysler Automobiles (FCA). В 2017 году Ferrari стала самой прибыльной компанией по размеру чистого дохода с каждого проданного автомобиля, зарабатывая в среднем 70 тысяч евро на одной машине. По данным на 2018 год, всего компания Ferrari за всю свою историю построила и продала около 190 тысяч автомобилей. В 2017 году было продано 8398 машин. Чистая прибыль компании составила 537 миллионов евро.'),
        new Brand(Brands.Mazda, 'Mazda (Мазда) - японская компания, выпускающая легковые и грузовые автомобили. Входит в состав корпорации Sumitomo. Основана в 1920 году как Toyo Kogyo Company - компания по выпуску изделий из пробкового дерева. Название Mazda впервые использовано в 1931 году. Штаб-квартира Mazda находится в городе Хиросима. ' +
            'В 1931 году Toyo Kogyo Company, которая в то время занималась выпуском мотоциклов и небольших грузовых трициклов, изменила название на Mazda, использовав имя верховного зороастрийского бога Ахура Мазда, созвучное с фамилией основателя концерна Дзюдзиро Мацуда. ' +
            'В 1978 году Mazda подарила миру одну из самых популярных своих моделей - Savanna RX-7 и версию спорт-купе RX-7, а также отметила выпуск миллионного автомобиля с роторным двигателем. Общий объем выпущенных к тому времени машин приближался к отметке в 10 млн. ' +
            'В 1970-х и в начале 80-х Mazda развернула бурную деятельность: строились новые заводы, марка вышла на новые рынки, в частности в США. Огромную популярность в Америке получила модель Mazda MX-5 Miata - компактный спортивный родстер с привлекательной ценой. ' +
            'С 2000-х Mazda выпускает автомобили с бензиновыми и дизельными двигателями внутреннего сгорания с особой технологией SkyActive, которая обеспечивает хорошую отдачу мотора при небольшом расходе горючего. Актуальными моделями марки являются Mazda2, Mazda3, Mazda6, CX-3, СХ-5, СВ-8, СХ-9 и Mazda MX-5 Miata. В 2017 году Mazda продала 1 559 000 автомобилей, а чистая прибыль компании составила почти 845 миллионов долларов.'),
        new Brand(Brands.Porsche, 'Porsche (Порше) - немецкая компания, специализирующаяся на выпуске высокопроизводительных скоростных автомобилей премиум-класса, гоночных автомобилей и двигателей. Основана в 1931 году конструктором Фердинандом Порше. Штаб-квартира компании находится в городе Штутгарт, где расположен и главный завод. Долгое время компания оставалась подконтрольной семье Порше, однако в 2009 году 49,9% акций компании приобрел концерн Volkswagen AG. ' +
            'Porsche является одной из самых высокодоходных автомобильных компаний мира, если считать прибыль от каждого проданного автомобиля. Долгое время Порше выпускала только спортивные автомобили в кузове купе, однако в 2002 году фирма начала продавать спортивный кроссовер класса люкс, а в 2009 года на рынок вышла четырехдверная модель Panamera. ' +
            'В 2000-х фирма активно работает над серией электрокаров. Porsche 918 Spyder, который выпускался в 2013-2015 годах, стал одним из первых серийных гибридов среди суперкаров. А в 2019 году на рынок выйдет первый стопроцентный электрокар, разработанный с нуля - электрический спортседан Porsche Taycan. Популярными моделями Porsche на сегодня являются Panamera, Macan и Cayenne, 911 в различных модификациях, 718 Boxster/Cayman. В 2017 году компания Porsche продала более 246 тысяч автомобилей, а чистый доход составил 3,139 млрд евро, что означает чистая прибыль с каждой проданной машины в 12,7 тысяч евро.'),
        new Brand(Brands.Tesla, 'Компания Tesla (Тесла) - американский производитель электромобилей нового поколения. Штаб-квартира компании, основанной в 2003 году, расположена в знаменитом городе Пало-Альто - сердце Кремниевой долины. Компания получила название в честь Николы Теслы - знаменитого физика начала ХХ века. Главой компании является всемирно известный инженер и предприниматель Илон Маск. ' +
            'Первый автомобиль Tesla Roadster был представлен в 2006 году. Всего в линейке Tesla есть 4 модели машин - кроме Roadster это Model S (хэтчбек), Model X (кроссовер) и Model 3 (седан). В 2017 году компания анонсировала также электрогрузовик Tesla Semi. ' +
            'Кроме этого, Tesla активно развивает сеть станций для подзарядок собственных машин под названием Supercharger. Во втором квартале 2018 было изготовлено более 53 000 автомобилей Tesla. В 2018 году электромобиль Tesla Model 3 установил рекорд, проехав тысячи километров на одном заряде.')
    ], [
        new MenuBrand($('brandAlfaRomeo'), Brands["Alfa Romeo"]),
        new MenuBrand($('brandAstonMartin'), Brands["Aston Martin"]),
        new MenuBrand($('brandChevrolet'), Brands.Chevrolet),
        new MenuBrand($('brandFerrari'), Brands.Ferrari),
        new MenuBrand($('brandMazda'), Brands.Mazda),
        new MenuBrand($('brandPorsche'), Brands.Porsche),
        new MenuBrand($('brandTesla'), Brands.Tesla)
    ], $('nav-models'), $('imagesOff'), $('images-show-left'), $('images-show-right'), $('show-collaps-off'), $('headnote'), $('nav-car-configurations'), $('features'), $('show-full-screen'), $('full-screen-image'), $('full-screen-close'), $('images-fs-left'), $('images-fs-right'), $('full-screen-list'), [
        new Car(Concerns.Fiat, Brands["Alfa Romeo"], 'Giulia 2016', [
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
        ], [
            new ModelConfiguration('Alfa Romeo Giulia 2.2d MultiJet(210 л.с.) 8 - АКП 4x4', new CarParms()),
            new ModelConfiguration('Alfa Romeo Giulia 2.9i V6 (510 л.с.) 8-АКП', new CarParms(510, 1525, '2,9i V6', '9.3 : 1', 'Автомат', 3.9, '8-АКП', 'ZF', 'V-образное', 5, 1436, 5.7, 8.2, 12.4, '2500-5000', 8, 4643, 307, 6500, 'ДВС', 2820, 'Бензин', 2024, 2891, 600, 'Задний', 6, 24))
        ]),
        new Car(Concerns.Fiat, Brands["Alfa Romeo"], 'Spider 2015', [
            'img/cars/alfa-romeo-4C-Spider-2015-00.png',
            'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-01.png',
            'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-02.png',
            'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-03.png',
            'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-04.png',
            'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-05.png',
            'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-06.png',
            'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-07.png',
            'img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-08.png'
        ], [
            new ModelConfiguration('Alfa Romeo 4C Spider 240i AT', new CarParms(240, 940, '1,8i', '9.5 : 1', 'Робот 2 сцепл', 4.5, '6-DDCT', 'Fiat (FPT)', 'Рядное', 2, 1183, 5.1, 6.9, 10.1, '1700', 6, 3989, 257, 6000, 'ДВС', 2380, 'Бензин', 1864, 1749, 350, 'Задний', 4, 15))
        ]),
        new Car(Concerns.Daimler, Brands["Aston Martin"], 'DBS Superleggera 2018', [
            'img/cars/aston-martin-DBS-Superleggera-2018-00.png',
            'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-01.png',
            'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-02.png',
            'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-03.png',
            'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-04.png',
            'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-05.png',
            'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-06.png',
            'img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-07.png'
        ], [
            new ModelConfiguration('Aston Martin DBS Superleggera 5.2i (715 л.с.) 8-АКП', new CarParms(715, 1693, '5,2i', '9.3 : 1', 'Автомат', 3.4, '8-АКП', 'ZF', 'V-образное', 2, 1280, 9.1, 12.4, 18, '1800-5000', 8, 4712, 340, 6500, 'ДВС', 2805, 'Бензин', 2146, 5204, 900, 'Задний', 12, 48))
        ]),
        new Car(Concerns.Daimler, Brands["Aston Martin"], 'DB11 2016', [
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
        ], [
            new ModelConfiguration('Aston Martin DB11 DB11 AMR', new CarParms(639, 0, '5.2i', '', 'Автомат', 3.7, '8-АКП', 'ZF', 'V-образное', 4, 1279, 8.5, 11.4, 16.6, '1500', 8, 4739, 334, 6500, 'ДВС', 2805, 'Бензин', 2060, 5204, 700, 'Задний', 12, 48)),
            new ModelConfiguration('Aston Martin DB11 DB11 V8', new CarParms(510, 0, '4.0i', '', 'Автомат', 4, '8-АКП', 'ZF', 'V-образное', 4, 1279, 7.6, 9.9, 13.5, '2000-5000', 8, 4739, 300, 6000, 'ДВС', 2805, 'Бензин', 2060, 3982, 675, 'Задний', 8, 32))
        ]),
        new Car(Concerns["General Motors"], Brands.Chevrolet, 'Camaro 2018', [
            'img/cars/chevrolet-Camaro-2018-00.png',
            'img/cars/Chevrolet/chevrolet-Camaro-2018-01.png',
            'img/cars/Chevrolet/chevrolet-Camaro-2018-02.png',
            'img/cars/Chevrolet/chevrolet-Camaro-2018-03.png',
            'img/cars/Chevrolet/chevrolet-Camaro-2018-04.png',
            'img/cars/Chevrolet/chevrolet-Camaro-2018-05.png',
            'img/cars/Chevrolet/chevrolet-Camaro-2018-06.png'
        ], [
            new ModelConfiguration('Chevrolet Camaro 6.2i (650 л.с.) 10-АКП', new CarParms(650, 1521, '6,2i', '', 'Автомат', 3.5, '10-АКП', 'GM', 'V-образное', 4, 1349, 0, 0, 0, '3600', 10, 4783, 319, 6400, 'ДВС', 2812, 'Бензин', 0, 6162, 881, 'Задний', 8, 16)),
            new ModelConfiguration('Chevrolet Camaro 6.2i (650 л.с.) 6-мех', new CarParms(650, 1521, '6,2i', '', 'Механика', 3.7, '6-мех', '', 'V-образное', 4, 1349, 0, 0, 0, '3600', 6, 4783, 319, 6400, 'ДВС', 2812, 'Бензин', 0, 6162, 881, 'Задний', 8, 16))
        ]),
        new Car(Concerns["General Motors"], Brands.Chevrolet, 'Camaro 2015', [
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
        ], [
            new ModelConfiguration('Chevrolet Camaro 6.2i (650 л.с.) 10-АКП', new CarParms(650, 1521, '6.2i', '', 'Автомат', 3.5, '10-АКП', 'GM', 'V-образное', 4, 1349, 12, 14.6, 17.2, '3600', 10, 478., 318, 6400, 'ДВС', 2812, 'Бензин', 0, 6162, 881, 'Задний', 8, 32)),
            new ModelConfiguration('Chevrolet Camaro 6.2i (650 л.с.) 6-мех', new CarParms(650, 1521, '6,2i', '', 'Механика', 3.6, '6-МКП', 'Tremec', 'V-образное', 4, 1349, 12, 14.6, 17.2, '3600', 6, 4783, 318, 6400, 'ДВС', 2812, 'Бензин', 0, 6162, 881, 'Задний', 8, 32))
        ]),
        new Car(Concerns.Fiat, Brands.Ferrari, '488 Pista 2018', [
            'img/cars/ferrari-488-Pista-2018-00.png',
            'img/cars/Ferrari/ferrari-488-Pista-2018-01.png',
            'img/cars/Ferrari/ferrari-488-Pista-2018-02.png',
            'img/cars/Ferrari/ferrari-488-Pista-2018-03.png',
            'img/cars/Ferrari/ferrari-488-Pista-2018-04.png',
            'img/cars/Ferrari/ferrari-488-Pista-2018-05.png',
            'img/cars/Ferrari/ferrari-488-Pista-2018-06.png',
            'img/cars/Ferrari/ferrari-488-Pista-2018-07.png',
            'img/cars/Ferrari/ferrari-488-Pista-2018-08.png'
        ], [
            new ModelConfiguration('Ferrari 488 Pista 3.9i V8(720 л.с.) 7 - авт DCT', new CarParms(720, 1280, '3.9i V8', '9.6 : 1', 'Робот 2 сцепл', 2.85, '7-авт DCT', 'Getrag', 'V-образное', 2, 1206, 11, 12.8, 19.4, '3000', 7, 4605, 340, 8000, 'ДВС', 2650, 'Бензин', 0, 3902, 770, 'Задний', 8, 32))
        ]),
        new Car(Concerns.Fiat, Brands.Ferrari, '812superfast 2017', [
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
        ], [
            new ModelConfiguration('Ferrari 812superfast 6.5i V12 (800 л.с.) 7-авт DCT', new CarParms(800, 1630, '6.5i V12', '13.6 : 1', 'Робот 2 сцепл', 2.9, '7-авт DCT', 'Getrag', 'W-образное', 2, 1276, 0, 14.9, 0, '7000', 7, 4657, 340, 8500, 'ДВС', 2720, 'Бензин', 1971, 696, 718, 'Задний', 12, 48))
        ]),
        new Car(Concerns.Mazda, Brands.Mazda, 'Mazda3 Sedan 2019', [
            'img/cars/mazda-Mazda3-Sedan-2019-00.png',
            'img/cars/Mazda/mazda-Mazda3-Sedan-2019-01.png',
            'img/cars/Mazda/mazda-Mazda3-Sedan-2019-02.png',
            'img/cars/Mazda/mazda-Mazda3-Sedan-2019-03.png',
            'img/cars/Mazda/mazda-Mazda3-Sedan-2019-04.png',
            'img/cars/Mazda/mazda-Mazda3-Sedan-2019-05.png',
            'img/cars/Mazda/mazda-Mazda3-Sedan-2019-06.png',
            'img/cars/Mazda/mazda-Mazda3-Sedan-2019-07.png'
        ], [
            new ModelConfiguration('Mazda 3 Sedan 1.8 SKYACTIV-D', new CarParms(116, 1436, '1.8 SKYACTIV-D 116', '14.8 : 1', 'Автомат', 12.1, '6-АКП SkyActiv-Drive', 'Mazda', 'Рядное', 5, 1440, 4.4, 4.8, 5.3, '1600-2600', 6, 4660, 199, 4000, 'ДВС', 2725, 'Дизель', 0, 1759, 270, 'Передний', 4, 16)),
            new ModelConfiguration('Mazda 3 Sedan 2.0 SKYACTIV-X', new CarParms(180, 1436, '2.0 SKYACTIV-X 181', '15.0 : 1', 'Автомат', 0, '6-АКП SkyActiv-Drive', 'Mazda', 'Рядное', 5, 1440, 0, 0, 0, '3000', 6, 4660, 0, 6000, 'ДВС', 2725, 'Бензин', 0, 1998, 224, 'Передний', 4, 16))
        ]),
        new Car(Concerns.Mazda, Brands.Mazda, 'Mazda6 Sedan 2018', [
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
        ], [
            new ModelConfiguration('Mazda 6 Sedan 2.5 AT Top', new CarParms(194, 1532, '2.5 SKYACTIV-G 194', '13.0 : 1', 'Автомат', 8.1, '6-АКП SkyActiv-Drive', 'Mazda', 'Рядное', 5, 1450, 5.4, 6.7, 8.8, '4000', 6, 0, 223, 6000, 'ДВС', 2830, 'Бензин', 2090, 2488, 258, 'Передний', 4, 16)),
            new ModelConfiguration('Mazda 6 Sedan 2.5 AT Topwinter', new CarParms(194, 1532, '2.0 SKYACTIV-X 181', '13.0 : 1', 'Автомат', 8.1, '6-АКП SkyActiv-Drive', 'Mazda', 'Рядное', 5, 1450, 5.4, 6.7, 8.8, '4000', 6, 0, 223, 6000, 'ДВС', 2830, 'Бензин', 2090, 2488, 258, 'Передний', 4, 16))
        ]),
        new Car(Concerns["Volkswagen Auto Group"], Brands.Porsche, 'Panamera Sport Turismo 2017', [
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
        ], [
            new ModelConfiguration('Porsche Panamera Sport Turismo Panamera Turbo S E-Hybrid ST', new CarParms(680, 1990, '4.0 V8 E-Hybrid', '', 'Робот 2 сцепл', 3.4, '8-PDK', 'ZF', 'V-образное', 4, 1428, 0, 3, 0, '', 8, 5049, 310, 0, 'Гибрид', 2950, 'Бензин', 2165, 3996, 850, 'Полный', 8, 32)),
            new ModelConfiguration('Porsche Panamera Sport Turismo Panamera Turbo ST', new CarParms(550, 2035, '4.0 V8', '10.1 : 1', 'Робот 2 сцепл', 3.8, '8-PDK', 'ZF', 'V-образное', 4, 1432, 7.4, 9.5, 13.1, '1960-4500', 8, 5049, 304, 6000, 'ДВС', 2650, 'Бензин', 2165, 3996, 770, 'Полный', 8, 32))
        ]),
        new Car(Concerns["Volkswagen Auto Group"], Brands.Porsche, '718 Cayman 2016', [
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
        ], [
            new ModelConfiguration('Porsche 718 Cayman 2.5 AT GTS', new CarParms(365, 1430, '2.5i', ' ', 'Робот 2 сцепл', 4.3, '7-PDK', 'ZF', 'Оппозитное', 2, 1295, 6.6, 8.2, 10.9, '1900-5500', 7, 4379, 290, 6500, 'ДВС', 2475, 'Бензин', 1994, 2497, 430, 'Задний', 4, 16)),
            new ModelConfiguration('Porsche 718 Cayman 2.5 AT S', new CarParms(350, 1460, '2.5i', '9.5 : 1', 'Робот 2 сцепл', 4.4, '7-PDK', 'ZF', 'Оппозитное', 2, 1295, 6.0, 7.3, 9.5, '1900-4500', 7, 4379, 285, 6500, 'ДВС', 2475, 'Бензин', 1994, 2497, 420, 'Задний', 4, 16))
        ]),
        new Car(Concerns["Tesla Motors"], Brands.Tesla, 'Model 3 2017', [
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
        ], [
            new ModelConfiguration('Tesla Model 3 Performance', new CarParms(428, 1725, '75D', '', 'Редуктор', 3.5, ' ', ' ', ' ', 5, 1443, 0, 0, 0, '', 0, 4694, 250, 0, 'Электро', 2875, '', 2088, 0, 660, 'Полный', 0, 0)),
            new ModelConfiguration('Tesla Model 3 Long Range', new CarParms(428, 1725, '75D', '', 'Редуктор', 4.5, ' ', ' ', ' ', 5, 1443, 0, 0, 0, '', 0, 4694, 233, 0, 'Электро', 2875, '', 2088, 0, 660, 'Полный', 0, 0))
        ]),
        new Car(Concerns["Tesla Motors"], Brands.Tesla, 'Model S 2016', [
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
        ], [
            new ModelConfiguration('Tesla Model S P100D', new CarParms(700, 0, 'P100D', '', 'Редуктор', 2.7, ' ', ' ', ' ', 5, 1430, 0, 0, 0, '', 0, 4978, 250, 0, 'Электро', 2946, '', 2184, 0, 0, 'Полный', 0, 0)),
            new ModelConfiguration('Tesla Model S 100D', new CarParms(428, 0, '100D', '', 'Редуктор', 4.3, ' ', ' ', ' ', 5, 1430, 0, 0, 0, '', 0, 4978, 250, 0, 'Электро', 2946, '', 2184, 0, 660, 'Полный', 0, 0))
        ])
    ]);
    controlCars.Start();
})(Cars || (Cars = {}));
//# sourceMappingURL=cars.js.map