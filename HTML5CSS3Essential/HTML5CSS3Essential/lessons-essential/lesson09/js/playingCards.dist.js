!function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([,function(e,t){let r,s=new Map([["C","Clubs"],["D","Diamonds"],["H","Hears"],["S","Spades"]]),n=new Map([["A","Ack"],["Q","Queen"],["K","King"],["A","Ace"]]),o=new Array;for(let e of s.keys()){for(let t=2;t<=10;t++)o.push(`playing-card/${t}${e}.png`);for(let t of n.keys())o.push(`playing-card/${t}${e}.png`)}o.push("playing-card/Joker1.png");let a=e=>document.getElementById(e),l=(e,t)=>Math.floor(Math.random()*(t-e+1))+e;function c(){let e,t,s,n;r=JSON.parse(JSON.stringify(o)),a("cardtable").innerHTML="";for(let e=0;e<6;e++)s=document.createElement("img"),t=l(0,r.length-1),s.src=r[t],s.className="card shake-at-the-end-of-random-rotate",s.alt=s.src,n=document.createElement("div"),n.className="card-place",n.appendChild(s),a("cardtable").appendChild(n),r.splice(t,1);e=document.getElementsByClassName("card");for(let t of e)t.addEventListener("mouseover",()=>{if("rotate(0deg)"===t.style.transform){let e=l(0,1),r=l(10,350);t.style.transform=`rotate(${0===e?"":"-"}${r}deg)`,setTimeout(()=>{t.style.setProperty("--ten-percent",`${0===e?"":"-"}${r+10}deg`),t.style.setProperty("--twenty-percent",`${0===e?"":"-"}${r-9}deg`),t.style.setProperty("--thirty-percent",`${0===e?"":"-"}${r+7}deg`),t.style.setProperty("--forty-percent",`${0===e?"":"-"}${r-6}deg`),t.style.setProperty("--fifty-percent",`${0===e?"":"-"}${r+5}deg`),t.style.setProperty("--sixty-percent",`${0===e?"":"-"}${r-4}deg`),t.style.setProperty("--seventy-percent",`${0===e?"":"-"}${r+3}deg`),t.style.setProperty("--eighty-percent",`${0===e?"":"-"}${r-2}deg`),t.style.setProperty("--ninety-percent",`${0===e?"":"-"}${r+1}deg`),t.style.setProperty("--hundred-percent",`${0===e?"":"-"}${r}deg`),t.classList.contains("shake")||t.classList.add("shake"),setTimeout(()=>{t.classList.contains("shake")&&t.classList.remove("shake")},700)},1e3)}else t.style.transform="rotate(0deg)",setTimeout(()=>{t.classList.contains("swing-rotate")||t.classList.add("swing-rotate"),setTimeout(()=>{t.classList.contains("swing-rotate")&&t.classList.remove("swing-rotate")},700)},1e3)},!1);setTimeout(()=>{for(let t of e){let e=l(0,1),r=l(10,350);t.style.transform=`rotate(${0===e?"":"-"}${r}deg)`,setTimeout(()=>{t.style.setProperty("--ten-percent",`${0===e?"":"-"}${r+10}deg`),t.style.setProperty("--twenty-percent",`${0===e?"":"-"}${r-9}deg`),t.style.setProperty("--thirty-percent",`${0===e?"":"-"}${r+7}deg`),t.style.setProperty("--forty-percent",`${0===e?"":"-"}${r-6}deg`),t.style.setProperty("--fifty-percent",`${0===e?"":"-"}${r+5}deg`),t.style.setProperty("--sixty-percent",`${0===e?"":"-"}${r-4}deg`),t.style.setProperty("--seventy-percent",`${0===e?"":"-"}${r+3}deg`),t.style.setProperty("--eighty-percent",`${0===e?"":"-"}${r-2}deg`),t.style.setProperty("--ninety-percent",`${0===e?"":"-"}${r+1}deg`),t.style.setProperty("--hundred-percent",`${0===e?"":"-"}${r}deg`),t.classList.contains("shake")||t.classList.add("shake"),setTimeout(()=>{t.classList.contains("shake")&&t.classList.remove("shake")},700)},1e3)}},50)}c(),a("dealCards").addEventListener("click",()=>{c()},!1)}]);