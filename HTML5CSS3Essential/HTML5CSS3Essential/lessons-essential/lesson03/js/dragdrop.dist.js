!function(e){var t={};function a(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(r,s,function(t){return e[t]}.bind(null,s));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=1)}([,function(e,t){class a{constructor(e,t,a,r){this.img=e,this.name=t,this.price=a,this.id=r}}document.getElementById("log");let r,s,n=document.getElementById("orderDeskGoods"),d=document.getElementById("orderDeskBasketCounter"),o=document.getElementById("orderDeskBasket"),i=document.getElementById("basketList"),l=()=>Math.floor(2147473646*Math.random())+10001,c=new Set([new a("img/s10e_yellow.jpg","Samsung Galaxy S10е 128GB Yellow (SM-G970FZYDSEK)",24999,l()),new a("img/s10_white.jpg","Samsung Galaxy S10 128GB White (SM-G973FZWDSEK)",29999,l()),new a("img/s10plus_black.jpg","Samsung Galaxy S10 Plus 128GB Black (SM-G975FZKDSEK)",32999,l()),new a("img/snote9_blue.jpg","Samsung Galaxy Note 9 2018 128GB Ocean blue (SM-N960FZBDSEK)",30999,l()),new a("img/Huawei_p20pro_purple.jpg","Huawei P20 Pro 6/128 GB Purple (51092FFA)",22999,l()),new a("img/Huawei_p30pro_black.jpg","Huawei P30 Pro 8/256 GB Black (51093NFQ)",32999,l()),new a("img/Lenovo-legion-Y530-15.jpg","Ноутбук Lenovo Legion Y530-15 (81FV015QRA)",38845,l()),new a("img/HP_PavilionGaming-15-cx0039ur.jpg","Ноутбук HP Pavilion Gaming 15-cx0039ur (4PR95EA)",34999,l()),new a("img/AsusTUFGaming-FX504GE-E4075T-Black.jpg","Ноутбук Asus TUF Gaming FX504GE-E4075T (90NR00I3-M00870) Black",38999,l())]),g=new class{constructor(e,t,a){this.goodsInBasket=new Array,this.mapBasket=new Map,this.goods=e,this.counterBasket=t,this.basketList=a}add(e){let t=this.getProductId(e);t&&(this.goodsInBasket.push(t),this.counterBasket.innerHTML=this.goodsInBasket.length,this.mapBasket.set(e,this.mapBasket.has(e)?this.mapBasket.get(e)+1:1),this.createList())}remove(e){let t=this.getProductId(e);t&&(this.goodsInBasket.pop(t),this.counterBasket.innerHTML=this.goodsInBasket.length,1===this.mapBasket.get(e)?(this.mapBasket.delete(e),console.log(this.mapBasket)):this.mapBasket.set(e,this.mapBasket.get(e)-1),this.createList())}getProductId(e){let t;for(item of this.goods)item.id===Number(e)&&(t=item);return t}createList(){if(0===this.mapBasket.size)return void(i.innerHTML="");let e,t=0,a=new Set;for(let r of this.mapBasket.keys()){0===t?(e=document.createElement("div"),e.className="basket-list-row",t++):(t++,3===t&&(t=0,a.size>0&&a.add(this.getSeparRow()),a.add(e)));let s=document.createElement("div");s.className="basket-list-product background-transparent-50",s.draggable="true",s.id=r,s.dataset.remove="true",m.setManageRemove(s);let n=document.createElement("img");n.src=this.getProductId(r).img,n.alt="";let d=document.createElement("p");d.className="basket-list-product-counter",d.innerHTML=this.mapBasket.get(r),s.appendChild(n),s.appendChild(d),e.firstChild&&e.appendChild(this.getSeparCell()),e.appendChild(s)}if(!a.has(e)){a.size>0&&a.add(this.getSeparRow());for(let t=Array.from(e.childNodes).filter(e=>void 0!==e.className).filter(e=>e.className.includes("basket-list-product")).length;t<3;t++){e.appendChild(this.getSeparCell());let t=document.createElement("div");t.className="basket-list-product background-transparent-50",e.appendChild(t)}a.add(e)}i.innerHTML="";for(let e of a)i.appendChild(e)}getSeparCell(){let e=document.createElement("div");return e.className="basket-list-separ-cell",e}getSeparRow(){let e=document.createElement("div");return e.className="basket-list-separ-row",e}}(c,d,i),m=new class{constructor(){}start(e){e.target.dataset.drag?(r=e.target,e.target.style.border="3px solid red",e.dataTransfer.effectAllowed="copy",e.dataTransfer.setData("Text",e.target.id)):r=void 0}end(e){r=void 0,e.target.classList.add(this.backgroundTransparent),e.target.style.border=""}enter(e){r&&e.target.classList.add("b-color-yellow","box-shadow-red")}leave(e){r&&e.target.classList.remove("b-color-yellow","box-shadow-red")}over(e){return e.preventDefault&&e.preventDefault(),!1}drop(e){e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.target.classList.remove("b-color-yellow","box-shadow-red");let t=e.dataTransfer.getData("Text");g.add(t)}removeStart(e){s=e.target,e.target.style.border="1px solid black"}removeLeave(e){s.id===e.target.id&&e.target.dataset.remove&&e.target.classList.add("b-color-red")}removeEnd(e){if(e.target.classList.contains("b-color-red")){confirm(`Подтвердите удаление одной товарной позиции из заказа.\nID = ${e.target.id}\n${g.getProductId(e.target.id).name}`)&&g.remove(e.target.id)}s=void 0,e.target.style.border="",e.target.classList.remove("b-color-red")}setManageDrag(e){e.addEventListener("dragstart",this.start,!1),e.addEventListener("dragend",this.end,!1)}setManageDrop(e){e.addEventListener("dragenter",this.enter,!1),e.addEventListener("dragleave",this.leave,!1),e.addEventListener("dragover",this.over,!1),e.addEventListener("drop",this.drop,!1)}setManageRemove(e){e.addEventListener("dragstart",this.removeStart,!1),e.addEventListener("dragleave",this.removeLeave,!1),e.addEventListener("dragend",this.removeEnd,!1)}},p=!0,u="";for(item of c){u=p?"background-transparent-60":"background-transparent-10",p=!p;let e=document.createElement("div");e.draggable="true",e.id=item.id,e.dataset.drag="true",m.setManageDrag(e);let t=document.createElement("div");t.className="product-img "+u;let a=document.createElement("img");a.src=item.img,a.alt="",t.appendChild(a);let r=document.createElement("div");r.className="product-info "+u;let s=document.createElement("p");s.className="margin0",s.innerHTML=item.name;let d=document.createElement("p");d.className="margin0 darkred",d.innerHTML=item.price,r.appendChild(s),r.appendChild(d),e.appendChild(t),e.appendChild(r),n.appendChild(e)}d.innerHTML=g.goodsInBasket.length,m.setManageDrop(o)}]);