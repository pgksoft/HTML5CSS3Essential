var TS_F_L02_AddTask;
(function (TS_F_L02_AddTask) {
    let TypesPet;
    (function (TypesPet) {
        TypesPet[TypesPet["Fish"] = 0] = "Fish";
        TypesPet[TypesPet["Cat"] = 1] = "Cat";
        TypesPet[TypesPet["Birds"] = 2] = "Birds";
    })(TypesPet || (TypesPet = {}));
    ;
    let GroupAquariumFish;
    (function (GroupAquariumFish) {
        GroupAquariumFish[GroupAquariumFish["\u0425\u0438\u0449\u043D\u0438\u043A\u0438"] = 0] = "\u0425\u0438\u0449\u043D\u0438\u043A\u0438";
        GroupAquariumFish[GroupAquariumFish["\u041D\u0435\u043E\u0431\u044B\u0447\u043D\u044B\u0435"] = 1] = "\u041D\u0435\u043E\u0431\u044B\u0447\u043D\u044B\u0435";
        GroupAquariumFish[GroupAquariumFish["\u0412\u044C\u044E\u043D\u043E\u0432\u044B\u0435"] = 2] = "\u0412\u044C\u044E\u043D\u043E\u0432\u044B\u0435";
        GroupAquariumFish[GroupAquariumFish["\u0417\u043E\u043B\u043E\u0442\u044B\u0435"] = 3] = "\u0417\u043E\u043B\u043E\u0442\u044B\u0435";
        GroupAquariumFish[GroupAquariumFish["\u041A\u0430\u0440\u043F\u043E\u0432\u044B\u0435"] = 4] = "\u041A\u0430\u0440\u043F\u043E\u0432\u044B\u0435";
        GroupAquariumFish[GroupAquariumFish["\u0425\u0430\u0440\u0430\u0446\u0438\u043D\u043E\u0432\u044B\u0435"] = 5] = "\u0425\u0430\u0440\u0430\u0446\u0438\u043D\u043E\u0432\u044B\u0435";
        GroupAquariumFish[GroupAquariumFish["\u0421\u043E\u043C\u043E\u043E\u0431\u0440\u0430\u0437\u043D\u044B\u0435"] = 6] = "\u0421\u043E\u043C\u043E\u043E\u0431\u0440\u0430\u0437\u043D\u044B\u0435";
        GroupAquariumFish[GroupAquariumFish["\u0421\u043E\u043C\u0438\u043A\u0438 \u041A\u043E\u0440\u0438\u0434\u043E\u0440\u0430\u0441"] = 7] = "\u0421\u043E\u043C\u0438\u043A\u0438 \u041A\u043E\u0440\u0438\u0434\u043E\u0440\u0430\u0441";
        GroupAquariumFish[GroupAquariumFish["\u0416\u0438\u0432\u043E\u0440\u043E\u0434\u044F\u0449\u0438\u0435"] = 8] = "\u0416\u0438\u0432\u043E\u0440\u043E\u0434\u044F\u0449\u0438\u0435";
        GroupAquariumFish[GroupAquariumFish["\u041B\u0430\u0431\u0438\u0440\u0438\u043D\u0442\u043E\u0432\u044B\u0435"] = 9] = "\u041B\u0430\u0431\u0438\u0440\u0438\u043D\u0442\u043E\u0432\u044B\u0435";
        GroupAquariumFish[GroupAquariumFish["\u0420\u0430\u0434\u0443\u0436\u043D\u0438\u0446\u044B"] = 10] = "\u0420\u0430\u0434\u0443\u0436\u043D\u0438\u0446\u044B";
        GroupAquariumFish[GroupAquariumFish["\u0420\u044B\u0431\u043A\u0438 \u041A\u0438\u043B\u043B\u0438"] = 11] = "\u0420\u044B\u0431\u043A\u0438 \u041A\u0438\u043B\u043B\u0438";
        GroupAquariumFish[GroupAquariumFish["\u0426\u0438\u0445\u043B\u0438\u0434\u044B"] = 12] = "\u0426\u0438\u0445\u043B\u0438\u0434\u044B";
    })(GroupAquariumFish || (GroupAquariumFish = {}));
    ;
    class BriefInfoFish {
        constructor(aquariumVolume, temperature, valuePH, hardnessOfWater, substrateType, lighting, brackishWater, waterMovement, fishSize, nutrition, temperament, content) {
            this.aquariumVolume = aquariumVolume;
            this.temperature = temperature;
            this.valuePH = valuePH;
            this.hardnessOfWater = hardnessOfWater;
            this.substrateType = substrateType;
            this.lighting = lighting;
            this.brackishWater = brackishWater;
            this.waterMovement = waterMovement;
            this.fishSize = fishSize;
            this.nutrition = nutrition;
            this.temperament = temperament;
            this.content = content;
        }
        getHTMLElement() {
            let element = document.createElement('div');
            let ul = document.createElement('ul');
            ul.appendChild(this.getLi('Объём аквариума', this.aquariumVolume));
            ul.appendChild(this.getLi('Температура', this.temperature));
            ul.appendChild(this.getLi('Значение pH', this.valuePH));
            ul.appendChild(this.getLi('Жёсткость воды', this.hardnessOfWater));
            ul.appendChild(this.getLi('Тип субстрата', this.substrateType));
            ul.appendChild(this.getLi('Освещение', this.lighting));
            ul.appendChild(this.getLi('Солоноватая вода', this.brackishWater));
            ul.appendChild(this.getLi('Движение воды', this.waterMovement));
            ul.appendChild(this.getLi('Размер рыбы', this.fishSize));
            ul.appendChild(this.getLi('Питание', this.nutrition));
            ul.appendChild(this.getLi('Темперамент', this.temperament));
            ul.appendChild(this.getLi('Содержание', this.content));
            element.appendChild(ul);
            return element;
        }
        getLi(caption, value) {
            let li = document.createElement('li');
            let briefInfo = document.createElement('div');
            briefInfo.classList.add(BriefInfoFish.cssBrieInfo);
            let pCaption = document.createElement('p');
            pCaption.classList.add(BriefInfoFish.cssBrieInfoCaption);
            pCaption.innerText = caption;
            let pValue = document.createElement('p');
            pValue.classList.add(BriefInfoFish.cssBriefInfoValue);
            pValue.innerText = value;
            briefInfo.appendChild(pCaption);
            briefInfo.appendChild(pValue);
            li.appendChild(briefInfo);
            return li;
        }
    }
    BriefInfoFish.cssBrieInfo = 'brief-info';
    BriefInfoFish.cssBrieInfoCaption = 'brief-info-caption';
    BriefInfoFish.cssBriefInfoValue = 'brief-info-value';
    let $ = (id) => document.getElementById(id);
    class MenuItem {
        constructor(boxItem, imgItem, imgSrcDefault, imgSrcActive, type) {
            this._isActive = false;
            this._boxItem = boxItem;
            this._imgItem = imgItem;
            this._imgSrcDefault = imgSrcDefault;
            this._imgSrcActive = imgSrcActive;
            this._type = type;
            this.SetClick();
        }
        get boxItem() {
            return this._boxItem;
        }
        get imgItem() {
            return this._imgItem;
        }
        get imgSrcDefault() {
            return this._imgSrcDefault;
        }
        get imgSrcActive() {
            return this._imgSrcActive;
        }
        get isActive() {
            return this._isActive;
        }
        set isActive(value) {
            this._isActive = value;
        }
        get type() {
            return this._type;
        }
        SetClick() {
            this._boxItem.addEventListener('click', () => {
                this.OnClick();
            }, false);
        }
        OnClick() {
            this.isActive = true;
            if (!this.boxItem.classList.contains(MenuItem.nameActiveClass)) {
                this.boxItem.classList.add(MenuItem.nameActiveClass);
            }
            this._imgItem.src = this.imgSrcActive;
            MenuItem.showMenuTypeOfPets.call(MenuItem.contextPets, this.type);
        }
    }
    MenuItem.nameActiveClass = 'nav-animal-item-active';
    class MenuTypePetItem {
        constructor(boxItem) {
            this._isActive = false;
            this._boxItem = boxItem;
            this.SetClick();
        }
        get boxItem() {
            return this._boxItem;
        }
        get isActive() {
            return this._isActive;
        }
        set isActive(value) {
            this._isActive = value;
        }
        get pet() {
            return this._pet;
        }
        set pet(value) {
            this._pet = value;
        }
        SetClick() {
            this._boxItem.addEventListener('click', () => {
                this.OnClick();
            }, false);
        }
        OnClick() {
            this.isActive = true;
            if (!this.boxItem.classList.contains(MenuTypePetItem.cssActive)) {
                this.boxItem.classList.add(MenuTypePetItem.cssActive);
            }
            MenuTypePetItem.showDescription.call(MenuTypePetItem.contextPets, this.pet);
        }
    }
    MenuTypePetItem.cssDefault = 'menu-type-animal-item-default';
    MenuTypePetItem.cssActive = 'menu-type-animal-item-active';
    class Pet {
        constructor(nameKind, imgSrc, headNote) {
            this._nameKind = nameKind;
            this._imgSrc = imgSrc;
            this._headNote = headNote;
        }
        get type() {
            return this._type;
        }
        get nameKind() {
            return this._nameKind;
        }
        get imgSrc() {
            return this._imgSrc;
        }
        get headNote() {
            return this._headNote;
        }
    }
    class Cat extends Pet {
        constructor(nameKind, imgSrc, headNote) {
            super(nameKind, imgSrc, headNote);
            this._type = TypesPet.Cat;
        }
    }
    class Bird extends Pet {
        constructor(nameKind, imgSrc, headNote) {
            super(nameKind, imgSrc, headNote);
            this._type = TypesPet.Birds;
        }
    }
    class Fish extends Pet {
        constructor(nameKind, imgSrc, group, briefInfo, headNote) {
            super(nameKind, imgSrc, headNote);
            this._type = TypesPet.Fish;
            this._groupAquariumFish = group;
            this._briefInfo = briefInfo;
        }
        get groupAquariumFish() {
            return this._groupAquariumFish;
        }
        get briefInfo() {
            return this._briefInfo;
        }
    }
    class Pets {
        constructor(menuItems, navMenuTypeAnimal, imgPet, headnotePet, featuresPet, addConditions) {
            this._menuTypePetItems = new Array();
            this._listCheckedGroupAquariumFish = new Array();
            this._list = new Array();
            this._menuItems = menuItems;
            this._navMenuTypeAnimal = navMenuTypeAnimal;
            this._imgPet = imgPet;
            this._headnotePet = headnotePet;
            this._featuresPet = featuresPet;
            this._addConditions = addConditions;
            MenuItem.contextPets = this;
            MenuTypePetItem.contextPets = this;
            this.SubscribeMenuOnClick();
            this.SubscribeMenuTypeOfPetsOnClick();
        }
        get list() {
            return this._list;
        }
        set list(value) {
            value.forEach(element => this._list.push(element));
        }
        get navMenuTypeAnimal() {
            return this._navMenuTypeAnimal;
        }
        Start() {
            this._menuItems[0].OnClick();
        }
        SubscribeMenuOnClick() {
            MenuItem.showMenuTypeOfPets = this.ShowTypePets;
        }
        ShowTypePets(activeType) {
            let listInActive = this._menuItems.filter(menuItem => menuItem.isActive && menuItem.type !== activeType);
            for (let menuItem of listInActive) {
                if (menuItem.boxItem.classList.contains(MenuItem.nameActiveClass)) {
                    menuItem.boxItem.classList.remove(MenuItem.nameActiveClass);
                }
                menuItem.imgItem.src = menuItem.imgSrcDefault;
                menuItem.isActive = false;
            }
            this._addConditions.innerHTML = '';
            this._listCheckedGroupAquariumFish.length = 0;
            if (activeType === TypesPet.Fish) {
                for (let i in GroupAquariumFish) {
                    if (!isNaN(Number(i))) {
                        this.appendInputCheckBox(i, GroupAquariumFish[i]);
                    }
                }
            }
            this.CreateAnimalTypeMenu(activeType);
        }
        SubscribeMenuTypeOfPetsOnClick() {
            MenuTypePetItem.showDescription = this.ShowDescription;
        }
        ShowDescription(pet) {
            let listInActive = this._menuTypePetItems.filter(menuItem => menuItem.isActive && menuItem.pet !== pet);
            for (let menuItem of listInActive) {
                if (menuItem.boxItem.classList.contains(MenuTypePetItem.cssActive)) {
                    menuItem.boxItem.classList.remove(MenuTypePetItem.cssActive);
                }
                menuItem.isActive = false;
            }
            this._imgPet.src = pet.imgSrc;
            if (pet.type === TypesPet.Fish) {
                this._headnotePet.innerHTML = `Группа: ${GroupAquariumFish[pet.groupAquariumFish]} <br /> ${pet.headNote}`;
            }
            else {
                this._headnotePet.innerHTML = pet.headNote;
            }
            this._featuresPet.innerHTML = '';
            if (pet.type === TypesPet.Fish) {
                this._featuresPet.appendChild(pet.briefInfo.getHTMLElement());
            }
        }
        CreateAnimalTypeMenu(activeType, inputGroupAquariumFish = null) {
            this.navMenuTypeAnimal.innerHTML = '';
            this._menuTypePetItems.length = 0;
            for (let pet of this.list.filter(item => (item.type === activeType && activeType !== TypesPet.Fish) ||
                (item.type === activeType && activeType === TypesPet.Fish &&
                    (this._listCheckedGroupAquariumFish.filter(element => element.checked).length === 0 ||
                        this._listCheckedGroupAquariumFish.filter(element => element.checked && GroupAquariumFish[element.id] === GroupAquariumFish[item.groupAquariumFish]).length !== 0)))) {
                let div = document.createElement('div');
                div.classList.add(Pets.classMenuTypePetItem);
                div.classList.add(MenuTypePetItem.cssDefault);
                div.style.backgroundImage = `url('${pet.imgSrc}')`;
                let p = document.createElement('p');
                p.innerText = pet.nameKind;
                div.appendChild(p);
                this.navMenuTypeAnimal.appendChild(div);
                let menuItem = new MenuTypePetItem(div);
                menuItem.pet = pet;
                this._menuTypePetItems.push(menuItem);
            }
            this._menuTypePetItems[0].OnClick();
        }
        appendInputCheckBox(key, value) {
            let input = document.createElement('input');
            input.type = 'checkbox';
            input.id = key;
            let label = document.createElement('label');
            label.htmlFor = key;
            label.innerText = value;
            this._addConditions.appendChild(input);
            this._addConditions.appendChild(label);
            this._listCheckedGroupAquariumFish.push(input);
            input.addEventListener('click', (e) => { this.OnClickCheckedGroupAquariumFish(e); }, false);
        }
        OnClickCheckedGroupAquariumFish(e) {
            let target = e.target;
            this.CreateAnimalTypeMenu(TypesPet.Fish, target);
        }
    }
    Pets.classMenuTypePetItem = 'menu-type-animal-item';
    let pets = new Pets([
        new MenuItem($('itemMenuFish'), $('imgMenuFish'), 'img/pets/fish-menu-white.png', 'img/pets/fish-menu-black.png', TypesPet.Fish),
        new MenuItem($('itemMenuCat'), $('imgMenuCat'), 'img/pets/cat-menu-white.png', 'img/pets/cat-menu-black.png', TypesPet.Cat),
        new MenuItem($('itemMenuBird'), $('imgMenuBird'), 'img/pets/bird-menu-white.png', 'img/pets/bird-menu-black.png', TypesPet.Birds),
    ], $('menuTypeAnimal'), $('img-pet'), $('headnote-pet'), $('features-pet'), $('addConditions'));
    pets.list = [
        new Cat('Бирманская', 'img/pets/cat-Бирманская.jpg', 'История происхождения породы точно не известна и ее окутывают легенды. По одной из них, сама богиня Цуань Хуаньце помогла переселиться душе погибшего буддийского монаха в тело своего при жизни любимого кота и с тех пор глаза кота приобрели необыкновенный сапфировый цвет, шерсть на теле стала золотой, а кончики лап окрасились в белоснежный цвет. После чего эта перемена во внешнем виде коснулась и других кошек, проживающих в монастыре. Впервые Священная Бирма была представлена на выставке кошек в Париже в 1926 году, но только в 1950 году порода получила свое официальное название. С тех пор бирманская кошка начала распространяться и завоевывать популярность и в других странах Европы и Америки, выйдя за пределы страны своего происхождения – Франции.'),
        new Cat('Домашняя длинношерстная', 'img/pets/cat-Домашняя-длинношерстная.jpg', 'Известно, что длинношерстные кошки произошли от короткошерстных. Ген длинной шерсти стал результатом естественной мутации, спровоцированной холодными условиями жизни. Долгое пребывание в условиях снега и низких температур вызвало потребность в приспособлении животных к суровым условиям жизни, кошки, имеющие длинный и плотный мех, смогли выжить и дать рождение таким же длинношерстным потомкам. Местом рождения длинношерстных кошек считают восточную Турцию, именно оттуда были завезены в Европу длинношерстные кошки в 16 веке. Велика вероятность того, что и Россия могла стать родиной этой породы кошек. Этих пушистых кошек так и называли русскими длинношерстными кошками. После появления этих кошек в Англии они получили распространение на всю территорию земного шара. Кстати домашняя длинношерстная кошка является предком американской породы мейн-кун.'),
        new Cat('Невская маскарадная', 'img/pets/cat-Невская-маскарадная.jpg', 'Из названия породы понятно, что невская маскарадная кошка была выведена в России, в Санкт-Петербурге. Это сибирские кошки, имеющие оригинальный окрас. Эти кошки сочетают в себе великолепный сиамский окрас и мощь крупных сибирский кошек. Существует несколько предположений о возникновении этой породы, по одной – кошки получили окрас благодаря частичному альбинизму, по другой версии – возможно сибирских кошек скрещивали с сиамскими или гималайскими, но точной информации нет. Порода официально была признана организацией WCF в 1992 году.'),
        new Cat('Норвежский лесной', 'img/pets/cat-Норвежский-лесной.jpg', 'Согласно одной из историй возникновения данной породы кошек, прародителями лесного норвежского кота являются длинношерстные коты, завезенные викингами из Турции. Постепенно при скрещивании с другими короткошерстными европейскими породами появилась скандинавская аборигенная кошка. Под воздействие окружающей среды обитания в породе оставались наиболее сильные, выносливые, обладающие отличным здоровьем особи. Первые упоминания о лесных котах появились в детской книге, написанной в 1912 году. В этот период норвежские лесные коты, получили официальное признание. Для того чтобы сохранить этот вид в 30-х годах прошлого века начались работы по разведение лесного кота. На сегодняшний момент это самая популярная порода кошек в Норвегии. Она всегда привлекает большой интерес и симпатию среди посетителей выставок. В России норвежская лесная порода пока не так распространена, но это временно, так как норвеги покоряют многих любителей кошек с первого взгляда своим обворожительным внешним видом.'),
        new Cat('Сибирская', 'img/pets/cat-Сибирская.jpg', 'По одной из версий сибирская кошка появилась не на территории Сибири, а берет свое начало в Азии. Первые упоминания об этой кошке встречаются во времена Бухарского Эмирата, существовавшего в период с 1785 по 1920 годы. Сейчас на этой территории расположены Узбекистан, Таджикистан и часть Туркменистана. В те времена сибирские кошки назывались бухарскими. Никто не знает каким образом, и когда бухарские кошки появились в Сибири. Эта порода сформировалась на Востоке Урала. Благодаря суровым климатическим условиям в генотипе этой кошки закрепились гены, отвечающие за густую, теплую и длинную шерсть. По другой теории сибирские кошки появились на территории Сибири. Считается, что они произошли от диких котов, живущих в лесах и степях Сибири, благодаря скрещиванию с другими кошками, привезенными новыми переселенцами.'),
        new Cat('Скоттиш-страйт ( Скоттиш, Шотландская )', 'img/pets/cat-Скоттиш-страйт.png', 'По стандарту существует целых 10 отличительных характеристик этой породы от британской короткошерстной кошки, но на практике выявить хотя бы три из них бывает трудно. И вся эта неразбериха наблюдается от того, что на протяжении долгого времени представителей этих двух пород относили к одной породе - британской короткошерстной. Лишь в 2005 году выделили новую породу кошек - шотландская прямоухая.')
    ];
    pets.list = [
        new Bird('Волнистый попугай', 'img/pets/bird-волнистый-попугай.jpg', 'Волнистый попугай (Melopsittacus undulatus) — это вид птиц из отряда попугаеобразных, семейства попугаевых, единственный представитель рода волнистых попугаев (Melopsittacus). Латинское наименование вида образовано 3 словами: греческим словом «melos», означающим «пение», словом «psittacos» — «попугай» и латинским словом «undulatus», что означает «волнистый».Поэтому в дословном переводе название птицы звучит, как поющий волнистый попугай.Ряд орнитологов предлагает называть птицу певец волнистый.'),
        new Bird('Голубь', 'img/pets/bird-Голубь.jpg', 'Голуби, или настоящие голуби (Columba) – птицы из отряда голубеобразные, семейства голубиные. Приручен дикий голубь был около 5 000, а возможно и 10 000 лет назад. Окрас голубей может быть совершенно разным. Некоторые виды и породы голубей разноцветные, как попугаи, или же с хвостами как у павлинов. Неудивительны розовые расцветки голубей, желтые, персиковые или кофейные. Голуби могут быть одного цвета, разноцветными или иметь рисунок в своем оперении. Есть виды с кучерявым оперением или же большим количеством перьев возле головы или лап.'),
        new Bird('Индейка (индюк)', 'img/pets/bird-Индейка-(индюк).jpg', 'Индейка (Meleagris gallopavo) – это крупная птица из отряда курообразных, семейства фазановых, рода индеек. Название самца – индюк, название птенцов – индюшата. Индюки обладают обтекаемым телом с длинными мощными лапами, которые дают им возможность бегать со скоростью до 50 км/ч. Небольшая голова с прочным клювом среднего размера подвижно прикреплена к довольно длинной шее. Характерной особенностью индюшек является частичное или полное отсутствие перьев на голове и шее. Остальное тело покрыто крупными маховыми, рулевыми, а также мелкими кроющими перьями. Всего их насчитывается около 6000 штук. Индюк весит 11 — 13 кг, а вес индейки самки не превышает 5,5 — 6 кг. Небольшие крылья индейки позволяют птицам совершать перелеты до 150 м. Размер индюка, конечно же, больше, чем у индейки: длина самца составляет 100-110 см, длина самки — 85 см.'),
        new Bird('Курица', 'img/pets/bird-Курица.jpg', 'Курица – один самых популярных и распространенных видов домашней птицы. Относится к семейству фазановых, роду гребенчатых кур. Самец курицы называется петухом, птенец – цыпленком. Прародительницей домашней курицы считается банкивская джунглевая курица. В зависимости от породы, куры имеют различный вес, примерно 0,8 – 5 кг, а также различаются по окраске пера, цвету яиц, размеру и некоторым внешним признакам (характерным для декоративных пород). Официально зарегистрировано около 200 пород домашних кур, но на самом деле их больше.'),
        new Bird('Павлин обыкновенный (индийский)', 'img/pets/bird-Павлин-обыкновенный-(индийский).jpg', 'Павлин считается самой красивой птицей в мире, а хвост павлина имеет необычайную красоту. Павлин обыкновенный (Pavo cristatus), или индийский павлин, является самым многочисленным видом павлинов, относится к отряду курообразных, семейству фазановых, роду павлины. У обыкновенных павлинов длинная грациозная шея и маленькая голова с небольшим хохолком: у самцов хохолок синий, а у самок бурый, под цвет оперения. Голос павлина резкий и не очень приятный. Длина тела павлина самца достигает 100-125 см, длина хвоста – 40-50 см, при этом длина кроющих перьев надхвостья равна 120-160 см. Вес павлина самца составляет 4 – 4,25 кг. В оперении этой красивой птицы присутствуют самые разнообразные цвета: спина зеленая, голова, часть груди и шея синие, низ тела черный. Самка павлина индийского мельче и имеет более скромный, коричневый окрас.'),
        new Bird('Попугай', 'img/pets/bird-Попугай.jpg', 'Попугай относится к классу птицы, отряду попугаеобразные, семейству попугаевые (Psittacidae). Характерной особенностью попугая является его яркая окраска: синяя, красная или зеленая, у многих развиты длинные хохолки и хвосты. Большинство видов этих птиц прекрасно летают и лазят по деревьям. Лапы попугая имеют по четыре пальца, попарно направленных вперед и назад. Плохо летающие виды часто имеют зеленоватую окраску, позволяющую им прятаться в кустарниках или травяных зарослях. Подвижный мощный и острый крючкообразный клюв попугая позволяет не только измельчить добытую пищу, но и служит птице для обороны, а во время путешествия по ветвям деревьев служит дополнительной опорой – «третьей лапой». Вес попугаев колеблется от десятков грамм до килограмма. Самки обычно бывают меньше самцов. Как долго живут попугаи? В естественных условиях возраст некоторых видов попугаев достигает 50 лет, а при содержании в неволе редко превышает 35. Попугаеобразные обладают скрипучим, крикливым голосом, но способность к звукоподражанию и хорошо развитая память позволяют им копировать голоса других птиц, животных и даже человека.'),
        new Bird('Утка', 'img/pets/bird-Утка.jpg', 'Утка — это птица из отряда Гусеобразные, семейства Утиные (Anatidae). Для всех многочисленных представителей утиных можно назвать характерные черты, выделяющие их среди прочих пернатых: уплощенное и обтекаемой формы тело; довольно короткая шея; небольшая голова; широкий и плоский клюв с роговыми пластинами или зубцами по бокам; наличие подкожного слоя жира; мощные лапы, снабженные перепонками, которые напоминают ласты.'),
        new Bird('Фазан обыкновенный', 'img/pets/bird-Фазан-обыкновенный.jpg', 'Фазан обыкновенный относится к отряду курообразных, подсемейсву Phasianinae, является одним из одомашненных видов, в природе подвергается опасности со стороны охотников. Самцы фазаны всегда крупнее самок. Длина тельца птицы составляет 85 сантиметров, при этом вес тушки может достигать двух килограмм. Отличительной особенностью обыкновенного фазана является неоперенное кольцо вокруг глаз. У фазана очень длинный клиноподобный пестрый хвост, маховые крылья округленные. У самца фазана на лапах шпоры, которые он использует во время боев за самку.')
    ];
    pets.list = [
        new Fish('Золотой леопард', 'img/pets/fish-01-Золотой-леопард.jpg', GroupAquariumFish.Хищники, new BriefInfoFish('от 470 л.', '23–28°C', '7.0-8.0', 'средней и высокой жёсткости (10–25 dH)', 'песок или мелкий гравий с нагромождениями камней', ' умеренное', 'допустима в концентрации 1,0002', 'умеренное/сильное', 'до 25 см.', 'мясной корм с небольшим количеством растительных добавок', 'самцы нетерпимы друг к другу, в небольшом резервуаре', 'рекомендуется содержать гаремом, когда на одного самца приходится 3–4 самки.'), 'Золотой леопард, научное наименование Nimbochromis venustus, принадлежит семейству Cichlidae. Засадный хищник, родом из озера Малави в Африке, выработавший уникальную технику охоты. Он претворяется мёртвым лёжа не дне возле берега или в скалах в ожидании добычи. Стоит ничего не подозревающей рыбке оказаться рядом, и молниеносная атака поставит точку.'),
        new Fish('Тигровый окунь', 'img/pets/fish-01-Тигровый-окунь.jpg', GroupAquariumFish.Хищники, new BriefInfoFish('от 600 л.', '22–26°C', '6.5–7.5', 'мягкая и средней жёсткости (2–15 dGH)', 'любой', 'умеренное', 'нет', 'слабое, умеренное', 'до 50 см.', 'мясные свежие и живые корма', 'условно мирный', 'одиночное совместно с другими видами'), 'Тигровый сиамский окунь или Индонезийский тигровый окунь, научное наименование Datnioides microlepis, принадлежит семейству Datnioididae. Крупная хищная рыба с яркой контрастной окраской. Не смотря на статус хищника может содержаться с другими крупными рыбами в общем аквариуме. Содержание требует не малых финансовых затрат из-за необходимости приобретения большого аквариума и дорогостоящего оборудования.'),
        new Fish('Имперский-пескарь', 'img/pets/fish-02-Имперский-пескарь.jpg', GroupAquariumFish.Необычные, new BriefInfoFish('от 80 л.', '15–35°C', '5.0–9.0', '2–26 dGH', 'любой', 'любое', 'обязательна в концентрации 5–10 гр на 1 литр', 'слабое', '10–12 см.', 'любые разнообразные корма', 'мирная', 'в группе'), 'Имперский пескарь или Гипсэлеотрис императорский, научное наименование Hypseleotris compressa, принадлежит семейству Eleotridae. Яркая неприхотливая рыбка, прекрасно уживается с другими видами. Единственная сложность при содержании связана с необходимостью создания солоноватой среды обитания.'),
        new Fish('Стеклянный ангел', 'img/pets/fish-02-Стеклянный-ангел.jpg', GroupAquariumFish.Необычные, new BriefInfoFish('от 100 л.', '20–28°C', '4.0–6.0', '1–5 dGH', 'любой мягкий', 'приглушённый', 'нет', 'слабое или отсутствует', 'около 3-х см.', 'любые корма', 'мирная', 'в стае численностью 8–10 особей'), 'Рыбка «Стеклянный ангел» или Окунь стеклянный нитевидный, научное наименование Gymnochanda filamentosa, принадлежит семейству Ambassidae (Стеклянные окуни). Название говорит само за себя и указывает на главную отличительную особенность этой рыбки — это её внешний вид. Не самая простая в содержании и требует тщательного выбора соседей по аквариуму, поэтому не рекомендуется для новичков.'),
        new Fish('Амурский вьюн', 'img/pets/fish-03-Амурский-вьюн.jpg', GroupAquariumFish.Вьюновые, new BriefInfoFish('от 200 л.', ' 5–25°C (оптимальная 17–23°C)', '6.0–8.0', 'мягкая и средней жёсткости (1–12 dGH)', 'мягкий песчаный', 'приглушённое', 'нет', 'слабое или отсутствует', 'до 20 см', 'любые тонущие корма', 'мирный', 'поодиночке или в группе'), 'Амурский вьюн, научное наименование Misgurnus anguillicaudatus, принадлежит семейству Cobitidae (Гольцы). Довольно распространённая рыбка, но известна в первую очередь среди рыболовов, поскольку является популярной наживкой. В аквариумах встречается редко. Считается простой в содержании и прекрасно дополнит сообщество холодноводных (не тропических) видов.'),
        new Fish('Вуалехвост', 'img/pets/fish-04-Вуалехвост.jpg', GroupAquariumFish.Золотые, new BriefInfoFish('от 40 л.', '18–22°C', '6.0–8.0', 'от мягкой до средней жёсткости (5–19 dH)', 'любой', 'умеренное', 'нет', 'слабая или стоячая', '15–18 см.', 'любой', 'мирный', ''), 'Вуалехвост (Veiltail Goldfish) является одной из красивейших разновидностей, но вместе с тем наиболее сложной в содержании и разведении. Встречается достаточно редко, в основном в профессиональных аквариумах. Главная особенность – очень длинные и тонкие плавники, словно вуаль, которые достигают впечатляющих размеров.'),
        new Fish('Акулий бала', 'img/pets/fish-05-Акулий-бала.jpg', GroupAquariumFish.Карповые, new BriefInfoFish('от 560 л.', '22–28°C', '6.0–8.0', 'мягкая (5–12 dH)', 'любой', 'умеренное', 'нет', 'умеренное', ' до 30 см.', 'любое с растительными и мясными добавками', 'миролюбивая, рыб в 2–3 см длиной содержать уже опасно', 'стайная рыба'), 'Трёхцветная акула или Акулий бала, научное наименование Balantiocheilos melanopterus, принадлежит семейству Cyprinidae. Название указывает на внешнее сходство с грозным представителем хищного мира — акулой, однако, от неё унаследован лишь облик. Рыба миролюбива и может содержаться вместе даже с небольшими видами, несмотря на свои внушительные размеры, главное условие — соседи по аквариуму должны быть достаточно крупными, чтобы не поместиться в рот Трёхцветной акуле.'),
        new Fish('Абрамитес мраморный', 'img/pets/fish-06-Абрамитес-мраморный.jpg', GroupAquariumFish.Харациновые, new BriefInfoFish('от 150 л.', '24–28°C', '6.0–7.0', 'от мягкой до средней жёсткости (2-16dGH)', 'песчаный или мелкая галька', 'умеренное', 'нет', 'слабое', 'до 14 см.', 'сочетание живого корма с растительными добавками', 'условно мирный, содержание поодиночке, может повредить длинные плавники у других рыб', 'рыбка весьма не прихотлива, склонность поедать растения с мягкими листьями'), 'Абрамитес мраморный, научное наименование Abramites hypselonotus, принадлежит семейству Anostomidae. Достаточно экзотичный вид для домашнего аквариума, в силу его слабой распространённости из-за проблем с разведением, а также сложным характером. В настоящее время подавляющее большинство рыб этого вида, представленных в продаже, вылавливаются в дикой природе.'),
        new Fish('Агуаруна', 'img/pets/fish-07-Агуаруна.jpg', GroupAquariumFish.Сомообразные, new BriefInfoFish('от 500 л.', '22–27°C', '5.8–7.2', '5–15 dGH', 'любой', 'любое', 'нет', 'слабое или умеренное', 'до 34 см.', 'тонущие корма для плотоядных видов', 'неуживчивый', 'одиночное'), 'Мускулистый сомик или Агуаруна, научное наименование Aguarunichthys torosus, принадлежит семейству Pimelodidae (Пимелодовые или Плоскоголовые сомы). Второе название этого вида дано в честь племени индейцев, живущих в перуанских джунглях на реке Мараньон, где исследователи впервые обнаружили этого сома. В сравнении с другими плотоядными хищными рыбами довольно прост в содержании при соблюдении ряда условий, тем не менее не рекомендуется начинающим аквариумистам.'),
        new Fish('Брохис носатый', 'img/pets/fish-08-Брохис-носатый.jpg', GroupAquariumFish["Сомики Коридорас"], new BriefInfoFish('от 240 л.', '20–26°C', '6.0–7.0', 'мягкая (2–12 dGH)', 'песчаный', 'приглушённое или умеренное', 'нет', 'слабое или умеренное', '8–10 см.', 'любой', 'мирный', 'в группе от 6–8 особей'), 'Брохис носатый или Коридорас длинноребристый, научное наименование Corydoras multiradiatus, принадлежит семейству Callichthyidae. Вторая часть название происходит от латинского слова multi, означающего «много», и radiatus - «лучистый», что указывает на большое количество лучей в спинном плавнике у этого вида. Крупный и неприхотливый представитель сомиков коридорас, прекрасно уживается с большинством других видов рыб, не требует особых условий для своего содержания и даже способен адаптироваться к дефициту растворённого в воде кислорода.'),
        new Fish('Красный принц', 'img/pets/fish-09-Красный-принц.jpg', GroupAquariumFish.Живородящие, new BriefInfoFish('от 100 л.', '18–24°C', '6.0–8.0', 'от мягкой до средней жёсткости (5–15 dGH)', 'мелко зернистый', 'умеренное', 'нет', 'слабое', '5–6 см.', 'мясные корма с растительными добавками', 'условно мирный', 'поодиночке или в группе'), 'Рыбка «Красный принц», научное наименование Characodon lateralis, принадлежит семейству Goodeidae. Неприхотливый и выносливый вид, прост в содержании и разведении, а селекционные формы отличаются яркой окраской. Всё это делает рыбку прекрасным кандидатом в общий аквариум. Может быть рекомендован начинающим аквариумистам.'),
        new Fish('Брунейская красавица', 'img/pets/fish-10-Брунейская-красавица.jpg', GroupAquariumFish.Лабиринтовые, new BriefInfoFish('от 80 л.', '20–25°C', '4.0–6.0', '0–5 dGH', 'любой тёмный', 'приглушённое', 'нет', 'слабое или отсутствует', '9–10 см.', 'любые корма', 'условно мирный', 'в малом аквариуме поодиночке или в паре самец/самка'), 'Петушок «Брунейская красавица», научное наименование Betta macrostoma, принадлежит семейству Osphronemidae. Темпераментная яркая рыбка, привлекающая не только своим внешним видом, но и поведением. В просторном аквариуме самцы и самки устраивают «бои» за установление иерархии, за что были отнесены к группе Бойцовых рыбок. Стоит отметить, что в малом резервуаре подобные стычки могут привести к печальным результатам для слабой особи.'),
        new Fish('Вильчатохвостая синеглазка', 'img/pets/fish-11-Вильчатохвостая-синеглазка.jpg', GroupAquariumFish.Радужницы, new BriefInfoFish('от 60 л.', '24–28°C', '7.0–8.0', 'средняя и высокая (15–30 dGH)', 'любой', 'приглушённое', 'нет', 'слабое', 'до 6 см.', 'любой', 'мирный', 'стайное не менее 8–10 особей'), 'Вильчатохвостая синеглазка или Попондетта фурката, научное наименование Pseudomugil furcatus, принадлежит семейству Pseudomugilidae. Красивая яркая рыбка, способная украсить собой любой пресноводный аквариум. Появилась в аквариумистике сравнительно недавно с 1980-х годов. Рыбки не вылавливаются из дикой природы, все представленные в продаже особи выращены в искусственной среде коммерческих и любительских аквариумов.'),
        new Fish('Азракский карпозубик', 'img/pets/fish-12-Азракский-карпозубик.jpg', GroupAquariumFish["Рыбки Килли"], new BriefInfoFish('от 100 л.', '10 — 35°C', '7.5–8.5', 'от средней жёсткости до жёсткой (10–26 dGH)', 'крупный песок и/или мелкий гравий', 'умеренное/яркое', 'нет', 'слабое или стоячая', 'около 5 см.', 'любой', 'агрессивное поведение во время нереста', 'в сообществе своего вида'), 'Азракский карпозубик, научное наименование Aphanius sirhani, принадлежит семейству Cyprinodontidae. Красивая оригинальная рыбка с трагической судьбой своих сородичей в дикой природе, естественный ареал которых практически исчез в начале 90-х из-за деятельности человека. В настоящее время ситуация стабилизировалась благодаря усилиям международных экологических организаций.'),
        new Fish('Принцесса Бурунди', 'img/pets/fish-13-Принцесса-Бурунди.jpg', GroupAquariumFish.Цихлиды, new BriefInfoFish('от 50 л.', '24–28°C', '8.0–9.0', 'от средней до высокой жёсткости (8–26 dGH)', 'каменистый', 'умеренное', 'нет', ' слабое, умеренное', '7–9 см.', 'мясные корма', 'условно мирный', 'в паре или в гареме с одним самцом и несколькими самками'), 'Цихлида «Принцесса Бурунди», Неолампрологус пульхер или Цихлида-фея, научное наименование Neolamprologus pulcher, принадлежит семейству Cichlidae. Свое название получила от местности где была впервые обнаружена — побережье озера, относящегося государству Бурунди. Считается одной из самых популярных цихлид озера Танганьика, благодаря относительной простоте в содержании и разведении.В больших аквариумах способна уживаться с представители других видов.')
    ];
    pets.Start();
})(TS_F_L02_AddTask || (TS_F_L02_AddTask = {}));
//# sourceMappingURL=addTask.js.map