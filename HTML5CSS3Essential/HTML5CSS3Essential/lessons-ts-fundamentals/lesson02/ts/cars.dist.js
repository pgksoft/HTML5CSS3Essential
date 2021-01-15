!function(e){var a={};function t(i){if(a[i])return a[i].exports;var s=a[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=a,t.d=function(e,a,i){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var s in e)t.d(i,s,function(a){return e[a]}.bind(null,s));return i},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=1)}([,function(e,a){var t;!function(e){let a,t,i;!function(e){e[e.Fiat=0]="Fiat",e[e.Daimler=1]="Daimler",e[e["General Motors"]=2]="General Motors",e[e.Mazda=3]="Mazda",e[e["Volkswagen Auto Group"]=4]="Volkswagen Auto Group",e[e["Tesla Motors"]=5]="Tesla Motors"}(a||(a={})),function(e){e[e["Alfa Romeo"]=0]="Alfa Romeo",e[e["Aston Martin"]=1]="Aston Martin",e[e.Chevrolet=2]="Chevrolet",e[e.Ferrari=3]="Ferrari",e[e.Mazda=4]="Mazda",e[e.Porsche=5]="Porsche",e[e.Tesla=6]="Tesla"}(t||(t={})),function(e){e[e.One=0]="One",e[e.Several=1]="Several"}(i||(i={}));class s{constructor(e,a){this.input=e,this.label=a}}class r{constructor(e,a){this._brand=e,this._headNote=a}get brand(){return this._brand}get headNote(){return this._headNote}}let n=e=>document.getElementById(e),o=(()=>{class e{constructor(e){this._isActive=!1,this._box=e}get box(){return this._box}get isActive(){return this._isActive}set isActive(e){this._isActive=e}SetClick(){this.box.addEventListener("click",()=>{this.OnClick()},!1)}UnActive(){this.box.classList.contains(e.cssDefault)||this.box.classList.add(e.cssDefault),this.box.classList.contains(e.cssActive)&&this.box.classList.remove(e.cssActive),this.isActive=!1}ToActive(){this.isActive=!0,this.box.classList.contains(e.cssDefault)&&this.box.classList.remove(e.cssDefault),this.box.classList.contains(e.cssActive)||this.box.classList.add(e.cssActive)}SetActive(){l.ruleSelectBrand===i.Several?this.isActive?this.UnActive():this.ToActive():l.ruleSelectBrand===i.One&&this.ToActive()}}return e.cssDefault="default",e.cssActive="active",e})(),l=(()=>{class e extends o{constructor(e,a){super(e),this._brand=a,this.SetClick()}get brand(){return this._brand}OnClick(){this.SetActive(),e.showMenuModels.call(o.contextCars,this.brand)}}return e.ruleSelectBrand=i.One,e})();class c extends o{constructor(e,a){super(e),this._car=a,this.SetClick()}get car(){return this._car}OnClick(){this.SetActive(),this.box.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"}),c.showModelDescription.call(o.contextCars,this.car)}}let h=(()=>{class e{constructor(e=210,a=1525,t="2.2d MultiJet",i="15.5: 1",s="Автомат",r=6.8,n="8-АКП",o="ZF",l="Рядное",c=5,h=1436,m=4,g=4.7,d=5.8,p="1750",u=8,f=4643,S=235,M=3750,C="ДВС",_=2820,w="Дизель",v=2024,T=2143,A=470,b="Полный",L=4,P=16){this.power=e,this.curbWeight=a,this.engine=t,this.compressionRatio=i,this.transmissionType=s,this.accelerationTime=r,this.cearBox=n,this.gearboxCompany=o,this.cylinderArrangement=l,this.numberOfSeats=c,this.heightMM=h,this.fuelConsumptionExtraUrbanCycle=m,this.fuelConsumptionMixedCycle=g,this.fuelConsumptionUrbanCycle=d,this.speedMaxMoment=p,this.numberOfGears=u,this.lengthMM=f,this.maximumSpeed=S,this.speedMaxPower=M,this.engineType=C,this.wheelBaseMM=_,this.fuelType=w,this.widthMM=v,this.engineSisplacementCC=T,this.torqueNM=A,this.drive=b,this.numberOfCylinders=L,this.numberOfValves=P}getHTMLElement(){let e=document.createElement("div"),a=document.createElement("ul");return this.SetLi(a,"Мощность, л.с.",""+this.power),this.SetLi(a,"Снаряженная масса, кг",""+this.curbWeight),this.SetLi(a,"Двигатель",""+this.engine),this.SetLi(a,"Степень сжатия",""+this.compressionRatio),this.SetLi(a,"Тип коробки передач",""+this.transmissionType),this.SetLi(a,"Время разгона(0 - 100 км / ч), с",""+this.accelerationTime),this.SetLi(a,"Коробка передач",""+this.cearBox),this.SetLi(a,"Фирма КПП",""+this.gearboxCompany),this.SetLi(a,"Расположение цилиндров",""+this.cylinderArrangement),this.SetLi(a,"Количество мест",""+this.numberOfSeats),this.SetLi(a,"Высота, мм",""+this.heightMM),this.SetLi(a,"Расход топлива(загородный цикл), л.на 100 км",""+this.fuelConsumptionExtraUrbanCycle),this.SetLi(a,"Расход топлива(смешанный цикл), л.на 100 км",""+this.fuelConsumptionMixedCycle),this.SetLi(a,"Расход топлива(городской цикл), л.на 100 км",""+this.fuelConsumptionUrbanCycle),this.SetLi(a,"Обороты макс.момента, об./мин",""+this.speedMaxMoment),this.SetLi(a,"Количество передач",""+this.numberOfGears),this.SetLi(a,"Длина, мм",""+this.lengthMM),this.SetLi(a,"Максимальная скорость, км/ч.",""+this.maximumSpeed),this.SetLi(a,"Обороты макс.мощности, об./мин.",""+this.speedMaxPower),this.SetLi(a,"Тип двигателя",""+this.engineType),this.SetLi(a,"Колесная база, мм",""+this.wheelBaseMM),this.SetLi(a,"Тип топлива",""+this.fuelType),this.SetLi(a,"Ширина, мм",""+this.widthMM),this.SetLi(a,"Объем двигателя, куб.см",""+this.engineSisplacementCC),this.SetLi(a,"Крутящий момент, Нм",""+this.torqueNM),this.SetLi(a,"Привод",""+this.drive),this.SetLi(a,"Количество цилиндров",""+this.numberOfCylinders),this.SetLi(a,"Количество клапанов",""+this.numberOfValves),e.appendChild(a),e}SetLi(a,t,i){if(0===i.length||0==+i)return;let s=document.createElement("li"),r=document.createElement("div");r.classList.add(e.cssConfParms);let n=document.createElement("p");n.classList.add(e.cssCaptionPparam),n.innerText=t;let o=document.createElement("p");o.classList.add(e.cssValueParam),o.innerText=i;let l=document.createElement("p");l.classList.add(e.cssDelemiter),r.appendChild(n),r.appendChild(l),r.appendChild(o),s.appendChild(r),a.appendChild(s)}}return e.cssConfParms="conf-parms",e.cssCaptionPparam="caption-param",e.cssValueParam="value-param",e.cssDelemiter="w5prc",e})();class m{constructor(e,a){this._name=e,this._carParms=a}get name(){return this._name}get carParms(){return this._carParms}}class g{constructor(e,a,t,i,s){this._concern=e,this._brand=a,this._model=t,this._imgSrcs=i,this._configurations=s}get concern(){return this._concern}get brand(){return this._brand}get model(){return this._model}get imgSrcs(){return this._imgSrcs}get configurations(){return this._configurations}}new((()=>{class e{constructor(e,a,t,i,s,r,n,h,m,g,d,p,u,f,S,M,C,_){this._menuModels=new Array,this._imageRate=1.8225,this._interval=2100,this._indexImg=1,this._image=new Image,this._isFullScreen=!1,this._listFSImages=new Array,this._ruleSelectBrands=e,this._brands=a,this._menuBrands=t,this._navModels=i,this._imagesOff=s,this._showLeftOff=r,this._showRightOff=n,this._showCollapsOff=h,this._headnote=m,this._navConfigurations=g,this._features=d,this._fullScreen=p,this._fullScreenImage=u,this._fullScreenClose=f,this._fullScreenImageLeft=S,this._fullScreenImageRight=M,this._fullScreenList=C,this._cars=_,o.contextCars=this,l.showMenuModels=this.ShowModels,c.showModelDescription=this.ShowModelDescription,this.SetOnLoadImage(),this.SetOnClickRuleSelectBrands(),this.SetWindowResize(),this.SetOnClickOff(),this.SetOnClickFullScreen(),this.SetEnableShowLeftRight(this._showLeftOff,this._showRightOff)}Start(){this._menuBrands[0].OnClick()}SetOnClickRuleSelectBrands(){for(let e=0;e<this._ruleSelectBrands.length;e++)this._ruleSelectBrands[e].addEventListener("change",e=>{this.OnClickRuleSelectBrands(e)},!1)}OnClickRuleSelectBrands(e){if(e.target.checked)if("ruleSelectBrandOne"===e.target.id){let e;l.ruleSelectBrand=i.One,this._menuBrands.some(e=>e.isActive)?(e=this._menuBrands.filter(e=>e.isActive)[0].brand,this._menuBrands.forEach(a=>{a.brand!==e&&a.UnActive()})):(this._menuBrands[0].ToActive(),e=this._menuBrands[0].brand),this.ShowModels(e)}else"ruleSelectBrandSeveral"===e.target.id&&(l.ruleSelectBrand=i.Several)}ShowModels(e){if(l.ruleSelectBrand===i.One){let a=this._menuBrands.filter(a=>a.isActive&&a.brand!==e);for(let e of a)e.UnActive()}else l.ruleSelectBrand,i.Several;this.CreateMenuModels()}CreateMenuModels(){this._navModels.innerHTML="",this._menuModels.length=0;let a=this._menuBrands.filter(e=>e.isActive).length;for(let t of this._menuBrands.filter(e=>a>0&&e.isActive||0===a))for(let a of this._cars.filter(e=>e.brand===t.brand)){let t=document.createElement("div");t.classList.add(e.cssMenuModel),t.classList.add(o.cssDefault),t.style.backgroundImage=`url('${a.imgSrcs[0]}')`;let i=document.createElement("p");i.innerText=a.model,t.appendChild(i),this._navModels.appendChild(t),this._menuModels.push(new c(t,a))}this._menuModels[0].OnClick()}ShowModelDescription(e){for(let a of this._menuModels.filter(a=>a.isActive&&a.car.model!==e.model))a.UnActive();this._features.innerHTML="",this._navConfigurations.innerHTML="";for(let a=0;a<e.configurations.length;a++){let t=document.createElement("input");t.type="radio",t.id="conf"+a,t.name=e.model,t.dataset.indexConf=""+a,t.addEventListener("change",e=>{this.OnSelectedCarConfiguration(e)},!1);let i=document.createElement("label");i.htmlFor=t.id,i.innerText=e.configurations[a].name,this._navConfigurations.appendChild(t),this._navConfigurations.appendChild(i)}clearTimeout(this._clipTimeOut),this._selectedModel=e,this._indexImg=1,this.ShowModel(e),this._headnote.innerHTML="";let t=document.createElement("p");t.innerText="Концерн: "+a[e.concern],this._headnote.appendChild(t),t=document.createElement("p"),t.innerText=this._brands.filter(a=>a.brand===e.brand)[0].headNote,this._headnote.appendChild(t),this.SetEnableShowLeftRight(this._showLeftOff,this._showRightOff),this.clipRandomAnimate(this._interval,this._imagesOff)}ShowModel(e){this._image.src=e.imgSrcs[this._indexImg]}SetWindowResize(){window.addEventListener("resize",()=>{this._imagesOff.style.height=this._imagesOff.clientWidth/this._imageRate+"px"},!1)}clipRandomAnimate(e,a){clearTimeout(this._clipTimeOut),this._clipTimeOut=window.setTimeout(()=>{this._indexImg=this._indexImg<this._selectedModel.imgSrcs.length-1?this._indexImg+1:1,this.ShowModel(this._selectedModel),this._isFullScreen?this.SetEnableShowLeftRight(this._fullScreenImageLeft,this._fullScreenImageRight):this.SetEnableShowLeftRight(this._showLeftOff,this._showRightOff),this._clipTimeOut=window.setTimeout(()=>{this.clipRandomAnimate(e,a)},e)},e)}SetOnClickOff(){this._showLeftOff.addEventListener("click",()=>{this._indexImg>1&&(this._indexImg-=1,this.ShowModel(this._selectedModel)),this.SetEnableShowLeftRight(this._showLeftOff,this._showRightOff)},!1),this._showRightOff.addEventListener("click",()=>{this._indexImg<this._selectedModel.imgSrcs.length-1&&(this._indexImg+=1,this.ShowModel(this._selectedModel)),this.SetEnableShowLeftRight(this._showLeftOff,this._showRightOff)},!1),this._showCollapsOff.addEventListener("click",()=>{document.getElementsByTagName("html")[0].style.overflow="hidden",this._isFullScreen=!0,this.ShowModel(this._selectedModel),this.SetEnableShowLeftRight(this._fullScreenImageLeft,this._fullScreenImageRight),clearTimeout(this._clipTimeOut),this._fullScreen.style.display="flex",setTimeout(()=>{this._fullScreen.style.opacity="1"},50),this._fullScreenList.innerHTML="",this._listFSImages.length=0;for(let a=1;a<this._selectedModel.imgSrcs.length;a++){let t=document.createElement("input");t.type="radio",t.name="listImgs",t.id="img"+a,t.dataset.indexImg=""+a,t.className=e.cssFullScreeListRadio,a===this._indexImg&&(t.checked=!0),t.addEventListener("change",e=>{this.OnChangeFullScreenList(e)},!1);let i=document.createElement("label");i.htmlFor=t.id,i.className=e.cssFullScreeListItem;let r=document.createElement("img"),n=new Image;n.addEventListener("load",()=>{r.src=n.src},!1),n.src=this._selectedModel.imgSrcs[a],i.appendChild(r),this._listFSImages.push(new s(t,i)),this._fullScreenList.appendChild(t),this._fullScreenList.appendChild(i)}},!1),this._imagesOff.addEventListener("mouseenter",()=>{clearTimeout(this._clipTimeOut)},!1),this._imagesOff.addEventListener("mouseleave",()=>{clearTimeout(this._clipTimeOut),this._isFullScreen||this.clipRandomAnimate(this._interval,this._imagesOff)},!1)}SetEnableShowLeftRight(e,a){1===this._indexImg?(e.dataset.enable="false",a.dataset.enable="true"):this._indexImg===this._selectedModel.imgSrcs.length-1?(e.dataset.enable="true",a.dataset.enable="false"):(e.dataset.enable="true",a.dataset.enable="true")}SetOnLoadImage(){this._image.addEventListener("load",()=>{this._isFullScreen?this._fullScreenImage.style.backgroundImage=`url('${this._image.src}')`:this._imagesOff.style.backgroundImage=`url('${this._image.src}')`},!1)}SetOnClickFullScreen(){this._fullScreenClose.addEventListener("click",()=>{this._isFullScreen=!1,this._fullScreen.style.opacity="0",setTimeout(()=>{document.getElementsByTagName("html")[0].style.overflow="auto",this._fullScreen.style.display="none",clearTimeout(this._clipTimeOut),this.clipRandomAnimate(this._interval,this._imagesOff),this._fullScreenList.innerHTML="",this._listFSImages.length=0},450)},!1),this._fullScreenImageLeft.addEventListener("click",()=>{this._indexImg>1&&(this._indexImg-=1,this.ToChangeFullScreenImage(),this.ShowModel(this._selectedModel)),this.SetEnableShowLeftRight(this._fullScreenImageLeft,this._fullScreenImageRight)},!1),this._fullScreenImageRight.addEventListener("click",()=>{this._indexImg<this._selectedModel.imgSrcs.length-1&&(this._indexImg+=1,this.ToChangeFullScreenImage(),this.ShowModel(this._selectedModel)),this.SetEnableShowLeftRight(this._fullScreenImageLeft,this._fullScreenImageRight)},!1)}ToChangeFullScreenImage(){let e=this._listFSImages.filter(e=>e.input.dataset.indexImg===this._indexImg.toString());e.length&&1===e.length&&(e[0].input.checked=!0,e[0].label.scrollIntoView({block:"center",behavior:"smooth"}))}OnChangeFullScreenList(e){let a=e.target;a.checked&&(this._indexImg=Number(a.dataset.indexImg),this.ShowModel(this._selectedModel),this.SetEnableShowLeftRight(this._fullScreenImageLeft,this._fullScreenImageRight),this._listFSImages.filter(e=>e.input.dataset.indexImg===a.dataset.indexImg)[0].label.scrollIntoView({block:"center",behavior:"smooth"}))}OnSelectedCarConfiguration(e){let a=e.target;console.log(this._selectedModel.configurations[Number(a.dataset.indexConf)].name),a.checked&&(console.log(this._selectedModel.configurations[Number(a.dataset.indexConf)].name),this._features.innerHTML="",this._features.appendChild(this._selectedModel.configurations[Number(a.dataset.indexConf)].carParms.getHTMLElement()))}}return e.cssMenuModel="car-model",e.cssFullScreeListRadio="radio",e.cssFullScreeListItem="item",e})())(document.getElementsByName("rule-select-brand"),[new r(t["Alfa Romeo"],"Alfa Romeo (Альфа Ромео) – марка итальянских автомобилей. Компания A. L. F. A была основана в 1910 году, а первой моделью стала НР24, которая в следующем году сразу же приняла участие в автогонках. Эмблема компании содержит сразу несколько символов Милана, в окрестностях которого и был открыт первый завод – зеленую змею, а также красный крест на белом фоне. Сейчас компания выпускает следующие модели машин: MiTo (супермини), Giulietta (семейный автомобиль), 4С (купе), 4С Spider (кабриолет), Giulia (седан) и Stelvio (кроссовер). Компания хорошо известна благодаря своему сотрудничеству с итальянскими силовыми ведомствами – различные модели машин Alfa Romeo использовали как карабинеры, так и полиция."),new r(t["Aston Martin"],"Aston Martin (Астон Мартин) – британская автомобильная компания, основанная в 1913 году. С того времени компания неоднократно меняла владельца, а с 1987 по 2007 год принадлежала концерну Ford. Сейчас Aston Martin принадлежит британскому консорциуму Investindustrial. Основное производство сосредоточено в британском Гейдоне,а также частично в Австрии. Сейчас с конвейеров заводов Aston Martin сходят такие модели машин, как Cygnet (микроавтомобиль), спортивные V8 Vantage, мощные DB9, DB11 и Vanquish, спортивный седан Rapide S, а недавно был презентован суперкар Valkyrie с гибридной силовой установкой (планируется выпуск 150 автомобилей ценой 2,5 миллиона фунтов). Компания известна тем, что большинство моделей изготовлено вручную – так, в 2007 Aston Martin выпустил всего 7224 машины. Кроме этого, Aston Martin (особенно модель DB5) можно назвать самой любимой машиной Джеймса Бонда."),new r(t.Chevrolet,'Chevrolet (Шевроле) - американский производитель легковых и грузовых автомобилей, пикапов и автобусов. Основана в 1911 году швейцарским гонщиком и механиком Луи Жозефом Шевроле вместе с предпринимателем по имени Уильям Дюран, который за три года до того совместно с Фредериком Смитом начал компанию General Motors. Почти с самого начала фирма Chevrolet была и остается дочерней маркой "Дженерал Моторс". Штаб-квартира компании расположена в пригороде Детройта. Первым серийным автомобилем марки стал Chevrolet Classic-Six, который оказался слишком дорогим, чтобы конкурировать с популярным в то время Ford Model T. Тогда компания перешла к выпуску дешевых, "народных" автомобилей, чем быстро завоевала себе расположение покупателей. Популярными моделями марки были такие автомобили, как Chevrolet Bel Air, Corvette, Impala, Malibu, Camaro, Monte Carlo, пикапы Chevrolet Suburban, Blazer, Silverado.'),new r(t.Ferrari,"Ferrari (Феррари) - итальянская компания-производитель спортивных автомобилей класса люкс и ультра люкс. Основана в 1928 году Энцо Феррари как Scuderia Ferrari (Скудерия Феррари). С начала своей истории является постоянным участником, поставщиком двигателей и спонсором наиболее выдающихся автоспортивных соревнований. Особенно богаты достижения Ferrari на на чемпионате Формула-1. Штаб-квартира в Маранелло (Италия). Многие автомобили марки имеют коллекционную ценность, некоторые уникальны. Ferrari принадлежат многочисленные рекорды не только на треках - 9 из 12 самых дорогих автомобилей мира, проданных с молотка до 2018 года, - марки Ferrari. А самая большая сумма, заплаченная за автомобиль до сих пор (2018 год) составляет 70 миллионов долларов за Ferrari 250 GTO 1963 года выпуска. В 2007 году Ferrari была поглощена концерном Fiat, образовав Fiat Group, а с присоединением к ним Chrysler, концерн трансформировался в Fiat Chrysler Automobiles (FCA). В 2017 году Ferrari стала самой прибыльной компанией по размеру чистого дохода с каждого проданного автомобиля, зарабатывая в среднем 70 тысяч евро на одной машине. По данным на 2018 год, всего компания Ferrari за всю свою историю построила и продала около 190 тысяч автомобилей. В 2017 году было продано 8398 машин. Чистая прибыль компании составила 537 миллионов евро."),new r(t.Mazda,"Mazda (Мазда) - японская компания, выпускающая легковые и грузовые автомобили. Входит в состав корпорации Sumitomo. Основана в 1920 году как Toyo Kogyo Company - компания по выпуску изделий из пробкового дерева. Название Mazda впервые использовано в 1931 году. Штаб-квартира Mazda находится в городе Хиросима. В 1931 году Toyo Kogyo Company, которая в то время занималась выпуском мотоциклов и небольших грузовых трициклов, изменила название на Mazda, использовав имя верховного зороастрийского бога Ахура Мазда, созвучное с фамилией основателя концерна Дзюдзиро Мацуда. В 1978 году Mazda подарила миру одну из самых популярных своих моделей - Savanna RX-7 и версию спорт-купе RX-7, а также отметила выпуск миллионного автомобиля с роторным двигателем. Общий объем выпущенных к тому времени машин приближался к отметке в 10 млн. В 1970-х и в начале 80-х Mazda развернула бурную деятельность: строились новые заводы, марка вышла на новые рынки, в частности в США. Огромную популярность в Америке получила модель Mazda MX-5 Miata - компактный спортивный родстер с привлекательной ценой. С 2000-х Mazda выпускает автомобили с бензиновыми и дизельными двигателями внутреннего сгорания с особой технологией SkyActive, которая обеспечивает хорошую отдачу мотора при небольшом расходе горючего. Актуальными моделями марки являются Mazda2, Mazda3, Mazda6, CX-3, СХ-5, СВ-8, СХ-9 и Mazda MX-5 Miata. В 2017 году Mazda продала 1 559 000 автомобилей, а чистая прибыль компании составила почти 845 миллионов долларов."),new r(t.Porsche,"Porsche (Порше) - немецкая компания, специализирующаяся на выпуске высокопроизводительных скоростных автомобилей премиум-класса, гоночных автомобилей и двигателей. Основана в 1931 году конструктором Фердинандом Порше. Штаб-квартира компании находится в городе Штутгарт, где расположен и главный завод. Долгое время компания оставалась подконтрольной семье Порше, однако в 2009 году 49,9% акций компании приобрел концерн Volkswagen AG. Porsche является одной из самых высокодоходных автомобильных компаний мира, если считать прибыль от каждого проданного автомобиля. Долгое время Порше выпускала только спортивные автомобили в кузове купе, однако в 2002 году фирма начала продавать спортивный кроссовер класса люкс, а в 2009 года на рынок вышла четырехдверная модель Panamera. В 2000-х фирма активно работает над серией электрокаров. Porsche 918 Spyder, который выпускался в 2013-2015 годах, стал одним из первых серийных гибридов среди суперкаров. А в 2019 году на рынок выйдет первый стопроцентный электрокар, разработанный с нуля - электрический спортседан Porsche Taycan. Популярными моделями Porsche на сегодня являются Panamera, Macan и Cayenne, 911 в различных модификациях, 718 Boxster/Cayman. В 2017 году компания Porsche продала более 246 тысяч автомобилей, а чистый доход составил 3,139 млрд евро, что означает чистая прибыль с каждой проданной машины в 12,7 тысяч евро."),new r(t.Tesla,"Компания Tesla (Тесла) - американский производитель электромобилей нового поколения. Штаб-квартира компании, основанной в 2003 году, расположена в знаменитом городе Пало-Альто - сердце Кремниевой долины. Компания получила название в честь Николы Теслы - знаменитого физика начала ХХ века. Главой компании является всемирно известный инженер и предприниматель Илон Маск. Первый автомобиль Tesla Roadster был представлен в 2006 году. Всего в линейке Tesla есть 4 модели машин - кроме Roadster это Model S (хэтчбек), Model X (кроссовер) и Model 3 (седан). В 2017 году компания анонсировала также электрогрузовик Tesla Semi. Кроме этого, Tesla активно развивает сеть станций для подзарядок собственных машин под названием Supercharger. Во втором квартале 2018 было изготовлено более 53 000 автомобилей Tesla. В 2018 году электромобиль Tesla Model 3 установил рекорд, проехав тысячи километров на одном заряде.")],[new l(n("brandAlfaRomeo"),t["Alfa Romeo"]),new l(n("brandAstonMartin"),t["Aston Martin"]),new l(n("brandChevrolet"),t.Chevrolet),new l(n("brandFerrari"),t.Ferrari),new l(n("brandMazda"),t.Mazda),new l(n("brandPorsche"),t.Porsche),new l(n("brandTesla"),t.Tesla)],n("nav-models"),n("imagesOff"),n("images-show-left"),n("images-show-right"),n("show-collaps-off"),n("headnote"),n("nav-car-configurations"),n("features"),n("show-full-screen"),n("full-screen-image"),n("full-screen-close"),n("images-fs-left"),n("images-fs-right"),n("full-screen-list"),[new g(a.Fiat,t["Alfa Romeo"],"Giulia 2016",["img/cars/alfa-romeo-Giulia-2016-00.png","img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-01.png","img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-02.png","img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-03.png","img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-04.png","img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-05.png","img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-06.png","img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-07.png","img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-08.png","img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-09.png","img/cars/Alfa-Romeo/alfa-romeo-Giulia-2016-10.png"],[new m("Alfa Romeo Giulia 2.2d MultiJet(210 л.с.) 8 - АКП 4x4",new h),new m("Alfa Romeo Giulia 2.9i V6 (510 л.с.) 8-АКП",new h(510,1525,"2,9i V6","9.3 : 1","Автомат",3.9,"8-АКП","ZF","V-образное",5,1436,5.7,8.2,12.4,"2500-5000",8,4643,307,6500,"ДВС",2820,"Бензин",2024,2891,600,"Задний",6,24))]),new g(a.Fiat,t["Alfa Romeo"],"Spider 2015",["img/cars/alfa-romeo-4C-Spider-2015-00.png","img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-01.png","img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-02.png","img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-03.png","img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-04.png","img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-05.png","img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-06.png","img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-07.png","img/cars/Alfa-Romeo/alfa-romeo-4C-Spider-2015-08.png"],[new m("Alfa Romeo 4C Spider 240i AT",new h(240,940,"1,8i","9.5 : 1","Робот 2 сцепл",4.5,"6-DDCT","Fiat (FPT)","Рядное",2,1183,5.1,6.9,10.1,"1700",6,3989,257,6e3,"ДВС",2380,"Бензин",1864,1749,350,"Задний",4,15))]),new g(a.Daimler,t["Aston Martin"],"DBS Superleggera 2018",["img/cars/aston-martin-DBS-Superleggera-2018-00.png","img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-01.png","img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-02.png","img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-03.png","img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-04.png","img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-05.png","img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-06.png","img/cars/Aston-Martin/aston-martin-DBS-Superleggera-2018-07.png"],[new m("Aston Martin DBS Superleggera 5.2i (715 л.с.) 8-АКП",new h(715,1693,"5,2i","9.3 : 1","Автомат",3.4,"8-АКП","ZF","V-образное",2,1280,9.1,12.4,18,"1800-5000",8,4712,340,6500,"ДВС",2805,"Бензин",2146,5204,900,"Задний",12,48))]),new g(a.Daimler,t["Aston Martin"],"DB11 2016",["img/cars/aston-martin-DB11-2016-00.png","img/cars/Aston-Martin/aston-martin-DB11-2016-01.png","img/cars/Aston-Martin/aston-martin-DB11-2016-02.png","img/cars/Aston-Martin/aston-martin-DB11-2016-03.png","img/cars/Aston-Martin/aston-martin-DB11-2016-04.png","img/cars/Aston-Martin/aston-martin-DB11-2016-05.png","img/cars/Aston-Martin/aston-martin-DB11-2016-06.png","img/cars/Aston-Martin/aston-martin-DB11-2016-07.png","img/cars/Aston-Martin/aston-martin-DB11-2016-08.png","img/cars/Aston-Martin/aston-martin-DB11-2016-09.png","img/cars/Aston-Martin/aston-martin-DB11-2016-10.png","img/cars/Aston-Martin/aston-martin-DB11-2016-11.png","img/cars/Aston-Martin/aston-martin-DB11-2016-12.png"],[new m("Aston Martin DB11 DB11 AMR",new h(639,0,"5.2i","","Автомат",3.7,"8-АКП","ZF","V-образное",4,1279,8.5,11.4,16.6,"1500",8,4739,334,6500,"ДВС",2805,"Бензин",2060,5204,700,"Задний",12,48)),new m("Aston Martin DB11 DB11 V8",new h(510,0,"4.0i","","Автомат",4,"8-АКП","ZF","V-образное",4,1279,7.6,9.9,13.5,"2000-5000",8,4739,300,6e3,"ДВС",2805,"Бензин",2060,3982,675,"Задний",8,32))]),new g(a["General Motors"],t.Chevrolet,"Camaro 2018",["img/cars/chevrolet-Camaro-2018-00.png","img/cars/Chevrolet/chevrolet-Camaro-2018-01.png","img/cars/Chevrolet/chevrolet-Camaro-2018-02.png","img/cars/Chevrolet/chevrolet-Camaro-2018-03.png","img/cars/Chevrolet/chevrolet-Camaro-2018-04.png","img/cars/Chevrolet/chevrolet-Camaro-2018-05.png","img/cars/Chevrolet/chevrolet-Camaro-2018-06.png"],[new m("Chevrolet Camaro 6.2i (650 л.с.) 10-АКП",new h(650,1521,"6,2i","","Автомат",3.5,"10-АКП","GM","V-образное",4,1349,0,0,0,"3600",10,4783,319,6400,"ДВС",2812,"Бензин",0,6162,881,"Задний",8,16)),new m("Chevrolet Camaro 6.2i (650 л.с.) 6-мех",new h(650,1521,"6,2i","","Механика",3.7,"6-мех","","V-образное",4,1349,0,0,0,"3600",6,4783,319,6400,"ДВС",2812,"Бензин",0,6162,881,"Задний",8,16))]),new g(a["General Motors"],t.Chevrolet,"Camaro 2015",["img/cars/chevrolet-Camaro-2015-00.png","img/cars/Chevrolet/chevrolet-Camaro-2015-01.png","img/cars/Chevrolet/chevrolet-Camaro-2015-02.png","img/cars/Chevrolet/chevrolet-Camaro-2015-03.png","img/cars/Chevrolet/chevrolet-Camaro-2015-04.png","img/cars/Chevrolet/chevrolet-Camaro-2015-05.png","img/cars/Chevrolet/chevrolet-Camaro-2015-06.png","img/cars/Chevrolet/chevrolet-Camaro-2015-07.png","img/cars/Chevrolet/chevrolet-Camaro-2015-08.png","img/cars/Chevrolet/chevrolet-Camaro-2015-09.png","img/cars/Chevrolet/chevrolet-Camaro-2015-10.png","img/cars/Chevrolet/chevrolet-Camaro-2015-11.png","img/cars/Chevrolet/chevrolet-Camaro-2015-12.png"],[new m("Chevrolet Camaro 6.2i (650 л.с.) 10-АКП",new h(650,1521,"6.2i","","Автомат",3.5,"10-АКП","GM","V-образное",4,1349,12,14.6,17.2,"3600",10,478,318,6400,"ДВС",2812,"Бензин",0,6162,881,"Задний",8,32)),new m("Chevrolet Camaro 6.2i (650 л.с.) 6-мех",new h(650,1521,"6,2i","","Механика",3.6,"6-МКП","Tremec","V-образное",4,1349,12,14.6,17.2,"3600",6,4783,318,6400,"ДВС",2812,"Бензин",0,6162,881,"Задний",8,32))]),new g(a.Fiat,t.Ferrari,"488 Pista 2018",["img/cars/ferrari-488-Pista-2018-00.png","img/cars/Ferrari/ferrari-488-Pista-2018-01.png","img/cars/Ferrari/ferrari-488-Pista-2018-02.png","img/cars/Ferrari/ferrari-488-Pista-2018-03.png","img/cars/Ferrari/ferrari-488-Pista-2018-04.png","img/cars/Ferrari/ferrari-488-Pista-2018-05.png","img/cars/Ferrari/ferrari-488-Pista-2018-06.png","img/cars/Ferrari/ferrari-488-Pista-2018-07.png","img/cars/Ferrari/ferrari-488-Pista-2018-08.png"],[new m("Ferrari 488 Pista 3.9i V8(720 л.с.) 7 - авт DCT",new h(720,1280,"3.9i V8","9.6 : 1","Робот 2 сцепл",2.85,"7-авт DCT","Getrag","V-образное",2,1206,11,12.8,19.4,"3000",7,4605,340,8e3,"ДВС",2650,"Бензин",0,3902,770,"Задний",8,32))]),new g(a.Fiat,t.Ferrari,"812superfast 2017",["img/cars/ferrari-812superfast-2017-00.png","img/cars/Ferrari/ferrari-812superfast-2017-01.png","img/cars/Ferrari/ferrari-812superfast-2017-02.png","img/cars/Ferrari/ferrari-812superfast-2017-03.png","img/cars/Ferrari/ferrari-812superfast-2017-04.png","img/cars/Ferrari/ferrari-812superfast-2017-05.png","img/cars/Ferrari/ferrari-812superfast-2017-06.png","img/cars/Ferrari/ferrari-812superfast-2017-07.png","img/cars/Ferrari/ferrari-812superfast-2017-08.png","img/cars/Ferrari/ferrari-812superfast-2017-09.png","img/cars/Ferrari/ferrari-812superfast-2017-10.png","img/cars/Ferrari/ferrari-812superfast-2017-11.png","img/cars/Ferrari/ferrari-812superfast-2017-12.png"],[new m("Ferrari 812superfast 6.5i V12 (800 л.с.) 7-авт DCT",new h(800,1630,"6.5i V12","13.6 : 1","Робот 2 сцепл",2.9,"7-авт DCT","Getrag","W-образное",2,1276,0,14.9,0,"7000",7,4657,340,8500,"ДВС",2720,"Бензин",1971,696,718,"Задний",12,48))]),new g(a.Mazda,t.Mazda,"Mazda3 Sedan 2019",["img/cars/mazda-Mazda3-Sedan-2019-00.png","img/cars/Mazda/mazda-Mazda3-Sedan-2019-01.png","img/cars/Mazda/mazda-Mazda3-Sedan-2019-02.png","img/cars/Mazda/mazda-Mazda3-Sedan-2019-03.png","img/cars/Mazda/mazda-Mazda3-Sedan-2019-04.png","img/cars/Mazda/mazda-Mazda3-Sedan-2019-05.png","img/cars/Mazda/mazda-Mazda3-Sedan-2019-06.png","img/cars/Mazda/mazda-Mazda3-Sedan-2019-07.png"],[new m("Mazda 3 Sedan 1.8 SKYACTIV-D",new h(116,1436,"1.8 SKYACTIV-D 116","14.8 : 1","Автомат",12.1,"6-АКП SkyActiv-Drive","Mazda","Рядное",5,1440,4.4,4.8,5.3,"1600-2600",6,4660,199,4e3,"ДВС",2725,"Дизель",0,1759,270,"Передний",4,16)),new m("Mazda 3 Sedan 2.0 SKYACTIV-X",new h(180,1436,"2.0 SKYACTIV-X 181","15.0 : 1","Автомат",0,"6-АКП SkyActiv-Drive","Mazda","Рядное",5,1440,0,0,0,"3000",6,4660,0,6e3,"ДВС",2725,"Бензин",0,1998,224,"Передний",4,16))]),new g(a.Mazda,t.Mazda,"Mazda6 Sedan 2018",["img/cars/mazda-Mazda6-Sedan-2018-00.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-01.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-02.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-03.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-04.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-05.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-06.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-07.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-08.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-09.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-10.png","img/cars/Mazda/mazda-Mazda6-Sedan-2018-11.png"],[new m("Mazda 6 Sedan 2.5 AT Top",new h(194,1532,"2.5 SKYACTIV-G 194","13.0 : 1","Автомат",8.1,"6-АКП SkyActiv-Drive","Mazda","Рядное",5,1450,5.4,6.7,8.8,"4000",6,0,223,6e3,"ДВС",2830,"Бензин",2090,2488,258,"Передний",4,16)),new m("Mazda 6 Sedan 2.5 AT Topwinter",new h(194,1532,"2.0 SKYACTIV-X 181","13.0 : 1","Автомат",8.1,"6-АКП SkyActiv-Drive","Mazda","Рядное",5,1450,5.4,6.7,8.8,"4000",6,0,223,6e3,"ДВС",2830,"Бензин",2090,2488,258,"Передний",4,16))]),new g(a["Volkswagen Auto Group"],t.Porsche,"Panamera Sport Turismo 2017",["img/cars/porsche-Panamera-Sport-Turismo-2017-00.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-01.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-02.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-03.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-04.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-05.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-06.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-07.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-08.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-09.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-10.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-11.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-12.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-13.png","img/cars/Porsche/porsche-Panamera-Sport-Turismo-2017-14.png"],[new m("Porsche Panamera Sport Turismo Panamera Turbo S E-Hybrid ST",new h(680,1990,"4.0 V8 E-Hybrid","","Робот 2 сцепл",3.4,"8-PDK","ZF","V-образное",4,1428,0,3,0,"",8,5049,310,0,"Гибрид",2950,"Бензин",2165,3996,850,"Полный",8,32)),new m("Porsche Panamera Sport Turismo Panamera Turbo ST",new h(550,2035,"4.0 V8","10.1 : 1","Робот 2 сцепл",3.8,"8-PDK","ZF","V-образное",4,1432,7.4,9.5,13.1,"1960-4500",8,5049,304,6e3,"ДВС",2650,"Бензин",2165,3996,770,"Полный",8,32))]),new g(a["Volkswagen Auto Group"],t.Porsche,"718 Cayman 2016",["img/cars/porsche-718-Cayman-2016-00.png","img/cars/Porsche/porsche-718-Cayman-2016-01.png","img/cars/Porsche/porsche-718-Cayman-2016-02.png","img/cars/Porsche/porsche-718-Cayman-2016-03.png","img/cars/Porsche/porsche-718-Cayman-2016-04.png","img/cars/Porsche/porsche-718-Cayman-2016-05.png","img/cars/Porsche/porsche-718-Cayman-2016-06.png","img/cars/Porsche/porsche-718-Cayman-2016-07.png","img/cars/Porsche/porsche-718-Cayman-2016-08.png","img/cars/Porsche/porsche-718-Cayman-2016-09.png","img/cars/Porsche/porsche-718-Cayman-2016-10.png","img/cars/Porsche/porsche-718-Cayman-2016-11.png","img/cars/Porsche/porsche-718-Cayman-2016-12.png"],[new m("Porsche 718 Cayman 2.5 AT GTS",new h(365,1430,"2.5i"," ","Робот 2 сцепл",4.3,"7-PDK","ZF","Оппозитное",2,1295,6.6,8.2,10.9,"1900-5500",7,4379,290,6500,"ДВС",2475,"Бензин",1994,2497,430,"Задний",4,16)),new m("Porsche 718 Cayman 2.5 AT S",new h(350,1460,"2.5i","9.5 : 1","Робот 2 сцепл",4.4,"7-PDK","ZF","Оппозитное",2,1295,6,7.3,9.5,"1900-4500",7,4379,285,6500,"ДВС",2475,"Бензин",1994,2497,420,"Задний",4,16))]),new g(a["Tesla Motors"],t.Tesla,"Model 3 2017",["img/cars/tesla-Model-3-2017-00.png","img/cars/Tesla/tesla-Model-3-2017-01.png","img/cars/Tesla/tesla-Model-3-2017-02.png","img/cars/Tesla/tesla-Model-3-2017-03.png","img/cars/Tesla/tesla-Model-3-2017-04.png","img/cars/Tesla/tesla-Model-3-2017-05.png","img/cars/Tesla/tesla-Model-3-2017-06.png","img/cars/Tesla/tesla-Model-3-2017-07.png","img/cars/Tesla/tesla-Model-3-2017-08.png","img/cars/Tesla/tesla-Model-3-2017-09.png","img/cars/Tesla/tesla-Model-3-2017-10.png"],[new m("Tesla Model 3 Performance",new h(428,1725,"75D","","Редуктор",3.5," "," "," ",5,1443,0,0,0,"",0,4694,250,0,"Электро",2875,"",2088,0,660,"Полный",0,0)),new m("Tesla Model 3 Long Range",new h(428,1725,"75D","","Редуктор",4.5," "," "," ",5,1443,0,0,0,"",0,4694,233,0,"Электро",2875,"",2088,0,660,"Полный",0,0))]),new g(a["Tesla Motors"],t.Tesla,"Model S 2016",["img/cars/tesla-Model-S-2016-00.png","img/cars/Tesla/tesla-Model-S-2016-01.png","img/cars/Tesla/tesla-Model-S-2016-02.png","img/cars/Tesla/tesla-Model-S-2016-03.png","img/cars/Tesla/tesla-Model-S-2016-04.png","img/cars/Tesla/tesla-Model-S-2016-05.png","img/cars/Tesla/tesla-Model-S-2016-06.png","img/cars/Tesla/tesla-Model-S-2016-07.png","img/cars/Tesla/tesla-Model-S-2016-08.png","img/cars/Tesla/tesla-Model-S-2016-09.png","img/cars/Tesla/tesla-Model-S-2016-10.png","img/cars/Tesla/tesla-Model-S-2016-11.png"],[new m("Tesla Model S P100D",new h(700,0,"P100D","","Редуктор",2.7," "," "," ",5,1430,0,0,0,"",0,4978,250,0,"Электро",2946,"",2184,0,0,"Полный",0,0)),new m("Tesla Model S 100D",new h(428,0,"100D","","Редуктор",4.3," "," "," ",5,1430,0,0,0,"",0,4978,250,0,"Электро",2946,"",2184,0,660,"Полный",0,0))])]).Start()}(t||(t={}))}]);