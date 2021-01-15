!function(t){var e={};function s(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(i,a,function(e){return t[e]}.bind(null,a));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=5)}({5:function(t,e){let s=t=>document.getElementById(t);function i(t){return"block"===t.style.display||"block"===window.getComputedStyle(t,null).display}function a(t){s("cacheMessage").textContent=`${new Date(Date.now()).toLocaleTimeString()} ${t}`}function n(t){let e=document.createElement("div");e.className="row";let i=document.createElement("div");i.className="cell w10prc fsize-0x7rem",i.textContent=new Date(Date.now()).toLocaleDateString(),e.appendChild(i),i=document.createElement("div"),i.className="cell w10prc fsize-0x7rem",i.textContent=new Date(Date.now()).toLocaleTimeString(),e.appendChild(i),i=document.createElement("div"),i.className="cell fsize-0x7rem cell-horizontal-left",i.textContent=""+t,e.appendChild(i),s("logTable").insertBefore(e,s("logTable").firstChild),o()}function r(t){a(`${t}, ${c()}`),n(`${t}, ${c()}`)}function c(){return["Не кэшировано","Бездействующий","Проверка","Загрузка","Готовый к обновлению","Кэш устарел"][window.applicationCache.status]}function o(t=!0){if(!i(s("logPanel"))){let e=s("appIsWorking").getBoundingClientRect();s("logPanel").style.left=e.left+"px",s("logPanel").style.top=e.bottom+10+"px",s("logPanel").style.display="block",s("logPanel").style.opacity=1,t&&setTimeout(()=>{l()},7e3)}}function l(){s("logPanel").style.opacity=0,setTimeout(()=>{i(s("logPanel"))&&(s("logPanel").style.display="none")},450)}function h(){s("historyPanel").style.opacity=0,setTimeout(()=>{i(s("historyPanel"))&&(s("historyPanel").style.display="none")},450)}function u(){s("memoryPanel").style.opacity=0,setTimeout(()=>{i(s("memoryPanel"))&&(s("memoryPanel").style.display="none")},450)}function p(){s("helpPanel").style.opacity=0,setTimeout(()=>{i(s("helpPanel"))&&(s("helpPanel").style.display="none")},450)}function m(t){if(0===t.charCode)switch(t.keyCode){case 8:d(y("Clear","Backspace"));break;case 27:i(s("logPanel"))&&l(),i(s("historyPanel"))&&h(),i(s("helpPanel"))&&p(),i(s("memoryPanel"))&&u()}else if(t.shiftKey||t.ctrlKey||t.altKey){if(t.shiftKey&&!t.ctrlKey&&!t.altKey)switch(String.fromCharCode(t.charCode)){case"H":d(y("History"));break;case"M":d(y("Memory","Panel"));break;case"R":d(y("Memory","Read"));break;case"S":d(y("Memory","Save"));break;case"+":case"I":d(y("ExtOper","Increment"));break;case"Y":d(y("ExtOper","Exponent"));break;case"?":d(y("Help"));break;case"E":d(y("Clear","Essensial"));break;case"C":d(y("Clear","Full"))}}else switch(String.fromCharCode(t.charCode)){case"1":d(y("Digit","One"));break;case"2":d(y("Digit","Two"));break;case"3":d(y("Digit","Three"));break;case"4":d(y("Digit","Four"));break;case"5":d(y("Digit","Five"));break;case"6":d(y("Digit","Six"));break;case"7":d(y("Digit","Seven"));break;case"8":d(y("Digit","Eight"));break;case"9":d(y("Digit","Nine"));break;case"0":d(y("Digit","Zero"));break;case".":d(y("Digit","Point"));break;case"/":d(y("Oper","Division"));break;case"*":d(y("Oper","Multiplication"));break;case"-":d(y("Oper","Minus"));break;case"+":d(y("Oper","Plus"));break;case"=":d(y("Equal"));break;default:switch(t.charCode){case 104:d(y("History"));break;case 13:d(y("Equal"));break;case 109:d(y("Memory","Panel"));break;case 114:d(y("Memory","Read"));break;case 115:d(y("Memory","Save"));break;case 105:d(y("ExtOper","Increment"));break;case 121:d(y("ExtOper","Exponent"));break;case 101:d(y("Clear","Essensial"));break;case 99:d(y("Clear","Full"))}}}function y(t,e=null){let s,i=document.getElementsByName("Button");for(let a of i)(a.dataset.type===t&&null===e||a.dataset.type===t&&a.dataset.act===e)&&(s=a);return s}function d(t){!function(t){t.classList.toggle("btn-active"),setTimeout(()=>{t.classList.toggle("btn-active")},100)}(t),t.click()}function g(t){s("accuracy").textContent=t}let b=new class{constructor(t,e,s,i,a,n,r){this.states={idle:0,input:1,calc:2,setObjExpression:3,calculation:4,loadHistoty:5,writeHistory:6},this.acts={empty:-1,signPlus:0,signMinus:1,minus:2,plus:3,increment:4,devide:5,multiply:6,percent:7,squareRoot:8,degreeTwo:9,exponent:10,hyperbola:11},this.typesExpression={empty:-1,act:0,calculator:1},this.kindDigital={digit:0,point:1},this.calculationPriorities={unary:0,extension:1,multiply:2,pm:3},this.memoryActs={clear:0,read:1,plus:2,minus:3,save:4},this.emptyItem={typeAct:this.typesExpression.empty,act:this.acts.empty,value:"",unary:this.acts.empty},this.uiNumber=t,this.uiExpression=e,this.uiState=s,this.uiHistoryTable=i,this.uiCurrentMemory=a,this.uiMemoryTable=n,this.buttonShowMemory=r,this.state,this.inputValue="",this.expression="",this.memory=this.getEmptyItem(),this.objExpression=new Array,this.accuracy=3,this.setState(this.states.idle),this.loadHistory()}getEmptyItem(){return JSON.parse(JSON.stringify(this.emptyItem))}setState(t){this.state=t,this.setUiState()}getNameState(){switch(this.state){case this.states.idle:return"idle";case this.states.input:return"input";case this.states.calc:return"calc";case this.states.setObjExpression:return"set expression";case this.states.loadHistoty:return"load history";case this.states.writeHistory:return"write history";default:return""}}getNameMemoryAct(t){switch(t){case this.memoryActs.clear:return"clear";case this.memoryActs.minus:return"minus";case this.memoryActs.plus:return"plus";case this.memoryActs.read:return"read";case this.memoryActs.save:return"save";default:return""}}setUiState(){this.uiState.textContent=this.getNameState()}setUiNumber(){this.isInputValueNumber()||"-"===this.inputValue?this.uiNumber.textContent=this.inputValue:this.uiNumber.innerHTML="&nbsp"}setUiMemory(){if(this.memory.typeAct===this.typesExpression.act){let t=(this.memory.act===this.acts.signMinus?"-":"")+this.memory.value;this.uiCurrentMemory.textContent=t,this.buttonShowMemory.title=t}else this.uiCurrentMemory.textContent="",this.buttonShowMemory.title=""}setUiMemoryTable(t,e){let s=Date.now(),i=new Date(s).toLocaleTimeString()+new Date(s).toISOString().slice(19,-1),a=document.createElement("div");a.className="row";let n=document.createElement("div");n.className="cell w35prc",n.textContent=i,a.appendChild(n),n=document.createElement("div"),n.className="cell w15prc",n.textContent=this.getNameMemoryAct(t),a.appendChild(n),n=document.createElement("div"),n.className="cell cell-horizontal-left",n.textContent=this.getStringExpression(e),a.appendChild(n),this.uiMemoryTable.insertBefore(a,this.uiMemoryTable.firstChild)}loadHistory(){let t,e,s,i=new Array,a=this.state;this.setState(this.states.loadHistoty);try{for(let e=0;e<localStorage.length;e++)t=localStorage.key(e).split("#")[0],"CALC"===t&&i.push(localStorage.key(e));i.sort();for(let t=0;t<i.length;t++)e=i[t].split("#")[1],s=i[t].split("#")[2],this.addHistoryTable(e,s,localStorage[i[t]])}catch(t){console.log("error load history: "+t.message)}this.setState(a)}addHistoryTable(t,e,s){let i=s.split("#"),a=JSON.parse(i[0]),n=JSON.parse(i[1]),r=this.getStringExpression(a),c=this.getStringExpression(n),o=document.createElement("div");o.className="row";let l=document.createElement("div");l.className="cell w10prc fsize-0x7rem",l.textContent=t,o.appendChild(l),l=document.createElement("div"),l.className="cell w10prc fsize-0x7rem",l.textContent=e,o.appendChild(l),l=document.createElement("div"),l.className="cell fsize-0x7rem cell-horizontal-left",l.innerHTML=`${r} = ${c}`,o.appendChild(l),this.uiHistoryTable.insertBefore(o,this.uiHistoryTable.firstChild)}writeHistory(t){let e=this.state;this.setState(this.states.loadHistoty);let s=new Date(Date.now()).toLocaleDateString(),i=new Date(Date.now()).toLocaleTimeString(),a=JSON.stringify(t)+"#"+JSON.stringify(this.objExpression);try{localStorage.setItem(`CALC#${s}#${i}`,a)}catch(t){console.log(t),addHistoryTable(s,i,t.message)}this.addHistoryTable(s,i,a),this.setState(e)}setObjExpression(t,e=!1){let s=this.state;this.setState(this.states.setObjExpression),e?this.objExpression.push(t):"string"==typeof t?this.objExpression[this.objExpression.length-1].value=t:"object"==typeof t&&(this.objExpression[this.objExpression.length-1]=JSON.parse(JSON.stringify(t))),this.setUiExpression(),this.setState(s)}setUiExpression(){let t=this.getStringExpression(this.objExpression);0===t.length?this.uiExpression.innerHTML="&nbsp;":this.uiExpression.innerHTML=t}getStringExpression(t){let e="",s=0,i=this.acts.empty;for(let a=0;a<t.length;a++)if(t[a].typeAct===this.typesExpression.act)switch(t[a].act){case this.acts.signMinus:if(t[a].unary===this.acts.empty)e+="-"+t[a].value;else{let n=this.getNumberItem(JSON.parse(JSON.stringify(t[a])));switch(t[a].unary){case this.acts.degreeTwo:n*=n,e+=n.toFixed(this.accuracy)+`<sub>[-${t[a].value}^2]</sub>`;break;case this.acts.hyperbola:n=1/n,e+=n.toFixed(this.accuracy)+`<sub>[1/-${t[a].value}]</sub>`;break;case this.acts.percent:t[a-2].act!==this.acts.signMinus&&t[a-2].act!==this.acts.signPlus||(s=this.getNumberItem(JSON.parse(JSON.stringify(t[a-2]))),i=t[a-1].act,i===this.acts.plus||i===this.acts.minus?n*=s/100:i!==this.acts.devide&&i!==this.acts.multiply||(n/=100),e+=n.toFixed(this.accuracy)+`<sub>[%(-${t[a].value})]</sub>`)}}break;case this.acts.signPlus:if(t[a].unary===this.acts.empty)e+=t[a].value;else{let n=this.getNumberItem(JSON.parse(JSON.stringify(t[a])));switch(t[a].unary){case this.acts.degreeTwo:n*=n,e+=n.toFixed(this.accuracy)+`<sub>[${t[a].value}^2]</sub>`;break;case this.acts.hyperbola:n=1/n,e+=n.toFixed(this.accuracy)+`<sub>[1/${t[a].value}]</sub>`;break;case this.acts.percent:t[a-2].act!==this.acts.signMinus&&t[a-2].act!==this.acts.signPlus||(s=this.getNumberItem(JSON.parse(JSON.stringify(t[a-2]))),i=t[a-1].act,i===this.acts.plus||i===this.acts.minus?n*=s/100:i!==this.acts.devide&&i!==this.acts.multiply||(n/=100),e+=n.toFixed(this.accuracy)+`<sub>[%${t[a].value}]</sub>`);break;case this.acts.squareRoot:n=Math.sqrt(n),e+=n.toFixed(this.accuracy)+`<sub>[√${t[a].value}]</sub>`}}break;case this.acts.plus:e+=" + ";break;case this.acts.minus:e+=" - ";break;case this.acts.multiply:e+=" * ";break;case this.acts.devide:e+=" / ";break;case this.acts.exponent:e+=" ^ "}return e}getKindDigital(t){return"number"==typeof t||"object"==typeof t&&t.constructor===Number?this.kindDigital.digit:"."===t?this.kindDigital.point:-1}isInputValueDecimal(){return this.inputValue.indexOf(".")>=0}isInputValueNumber(){return!isNaN(this.inputValue)&&!isNaN(parseFloat(this.inputValue))}isNumber(t){return!isNaN(t)&&!isNaN(parseFloat(t))}isSwitchToIdle(){return!this.isInputValueNumber()&&0===this.objExpression.length}isCurrentExpressionNumber(){return(this.getCurrentExpression().act===this.acts.signPlus||this.getCurrentExpression().act===this.acts.signMinus)&&this.isNumber(this.getCurrentExpression().value)}getCurrentExpression(){return this.objExpression.length>0?this.objExpression[this.objExpression.length-1]:(console.log("error 001: object expression is empty"),this.emptyItem)}changeSign(){this.getCurrentExpression().act===this.acts.signPlus?this.inputValue=this.inputValue.startsWith("-")?this.inputValue.slice(1):this.inputValue:this.inputValue=this.inputValue.startsWith("-")?this.inputValue:"-"+this.inputValue,this.setUiNumber(),this.setUiExpression()}addInputValue(t){this.getKindDigital(t)===this.kindDigital.digit?this.inputValue+=t.toString():this.getKindDigital(t)!==this.kindDigital.point||this.isInputValueDecimal()||(this.inputValue+=t),this.setUiNumber()}getNumber(t){return parseFloat((this.objExpression[t].act===this.acts.signMinus?"-":"")+this.objExpression[t].value)}getNumberItem(t){return parseFloat((t.act===this.acts.signMinus?"-":"")+t.value)}calculation(t){if(this.objExpression.length>1){let e=0,s=0,i=0,a=0,n=this.acts.empty,r=0,c=!1;for(let o=0;o<this.objExpression.length;o++)if(t===this.calculationPriorities.unary){if(this.objExpression[o].unary!==this.acts.empty){switch(i=this.getNumber(o),this.objExpression[o].unary){case this.acts.degreeTwo:i*=i;break;case this.acts.hyperbola:i=1/i;break;case this.acts.percent:this.objExpression[o-2].act!==this.acts.signMinus&&this.objExpression[o-2].act!==this.acts.signPlus||(a=this.getNumber(o-2),n=this.objExpression[o-1].act,n===this.acts.plus||n===this.acts.minus?i*=a/100:n!==this.acts.devide&&n!==this.acts.multiply||(i/=100));break;case this.acts.squareRoot:i=Math.sqrt(i)}this.objExpression[o].unary=this.acts.empty,this.objExpression[o].act=i<0?this.acts.signMinus:this.acts.signPlus,this.objExpression[o].value=Math.abs(i).toFixed(this.accuracy),c=!0;break}}else if(t===this.calculationPriorities.extension){if(this.objExpression[o].act===this.acts.exponent){e=o-1,s=o+1,a=this.getNumber(e),r=this.getNumber(s),i=Math.pow(a,r),this.objExpression[e].act=i<0?this.acts.signMinus:this.acts.signPlus,this.objExpression[e].value=Math.abs(i).toFixed(this.accuracy),this.objExpression.splice(o,2),c=!0;break}}else if(t===this.calculationPriorities.multiply){if(this.objExpression[o].act===this.acts.devide||this.objExpression[o].act===this.acts.multiply){switch(e=o-1,s=o+1,a=this.getNumber(e),r=this.getNumber(s),this.objExpression[o].act){case this.acts.devide:i=a/r;break;case this.acts.multiply:i=a*r;break;default:console.log("error: trying to calculate wrong action")}this.objExpression[e].act=i<0?this.acts.signMinus:this.acts.signPlus,this.objExpression[e].value=Math.abs(i).toFixed(this.accuracy),this.objExpression.splice(o,2),c=!0;break}}else if(t===this.calculationPriorities.pm&&(this.objExpression[o].act===this.acts.minus||this.objExpression[o].act===this.acts.plus)){switch(e=o-1,s=o+1,a=this.getNumber(e),r=this.getNumber(s),this.objExpression[o].act){case this.acts.plus:i=a+r;break;case this.acts.minus:i=a-r;break;default:console.log("error: trying to calculate wrong action")}this.objExpression[e].act=i<0?this.acts.signMinus:this.acts.signPlus,this.objExpression[e].value=Math.abs(i).toFixed(this.accuracy),this.objExpression.splice(o,2),c=!0;break}c||t++,this.calculation(t)}}memoryCalculation(t){if(3===t.length){let e=0,s=0,i=0;switch(s=this.getNumberItem(t[0]),i=this.getNumberItem(t[2]),t[1].act){case this.acts.plus:e=s+i;break;case this.acts.minus:e=s-i;break;default:console.log("error: trying to memory calculate wrong action")}this.memory.typeAct=this.typesExpression.act,this.memory.act=e<0?this.acts.signMinus:this.acts.signPlus,this.memory.value=Math.abs(e).toFixed(this.accuracy)}}setInputValue(t){this.state===this.states.idle?(this.setState(this.states.input),this.addInputValue(t),this.setObjExpression({typeAct:this.typesExpression.act,act:this.acts.signPlus,value:this.inputValue,unary:this.acts.empty},!0)):this.state===this.states.input&&(this.addInputValue(t),this.setObjExpression(this.getCurrentExpression().act===this.acts.signMinus&&this.inputValue.startsWith("-")?this.inputValue.slice(1):this.inputValue))}clear(){this.getCurrentExpression().typeAct!==this.typesExpression.empty&&(this.inputValue="",this.objExpression=new Array,this.setUiNumber(),this.setUiExpression(),this.isSwitchToIdle()&&this.setState(this.states.idle))}clearEssential(){this.getCurrentExpression().typeAct!==this.typesExpression.empty&&(this.state!==this.states.input||this.getCurrentExpression().act!==this.acts.signMinus&&this.getCurrentExpression().act!==this.acts.signPlus||this.getCurrentExpression().unary===this.acts.empty?(this.inputValue="",this.objExpression.pop(),this.getCurrentExpression().act!==this.acts.signMinus&&this.getCurrentExpression().act!==this.acts.signPlus||(this.inputValue=this.getCurrentExpression().value,this.setState(this.states.input))):this.getCurrentExpression().unary=this.acts.empty,this.setUiNumber(),this.setUiExpression(),this.isSwitchToIdle()&&this.setState(this.states.idle))}backspace(){this.state===this.states.input&&this.isInputValueNumber()&&(this.inputValue=this.inputValue.slice(0,-1),this.setUiNumber(),this.setObjExpression(this.getCurrentExpression().value.slice(0,-1)),this.isSwitchToIdle()&&this.setState(this.states.idle))}sign(){if(this.state===this.states.idle)this.setState(this.states.input),this.setObjExpression({typeAct:this.typesExpression.act,act:this.acts.signMinus,value:"",unary:this.acts.empty},!0),this.changeSign();else if(this.state===this.states.input){let t=-1;this.getCurrentExpression().act===this.acts.signPlus?t=this.acts.signMinus:this.getCurrentExpression().act===this.acts.signMinus&&(t=this.acts.signPlus),t!==this.acts.signPlus&&t!==this.acts.signMinus||(this.getCurrentExpression().act=t,this.changeSign())}}arithmeticOperation(t){this.getCurrentExpression().act!==this.acts.signMinus&&this.getCurrentExpression().act!==this.acts.signPlus||!this.isInputValueNumber()||(this.setObjExpression({typeAct:this.typesExpression.act,act:t,value:"",unary:this.acts.empty},!0),this.inputValue="",this.setUiNumber(),this.setState(this.states.idle))}unaryOperation(t){if(this.state===this.states.input&&(this.getCurrentExpression().act===this.acts.signMinus||this.getCurrentExpression().act===this.acts.signPlus)&&this.isInputValueNumber()){if(this.getCurrentExpression().act===this.acts.signMinus&&t===this.acts.squareRoot)return;let e=this.objExpression.length-1;if(t===this.acts.percent&&this.objExpression.length<3||t===this.acts.percent&&this.objExpression.length>=3&&this.objExpression[e-1].act!==this.acts.devide&&this.objExpression[e-1].act!==this.acts.multiply&&this.objExpression[e-1].act!==this.acts.plus&&this.objExpression[e-1].act!==this.acts.minus)return;this.getCurrentExpression().unary=t,this.setUiExpression()}}countUp(){if(this.objExpression.length<3||!this.isCurrentExpressionNumber())return;let t=JSON.parse(JSON.stringify(this.objExpression));this.setState(this.states.calculation);let e=this.calculationPriorities.unary;this.calculation(e),this.inputValue=(this.getCurrentExpression().act===this.acts.signMinus?"-":"")+this.getCurrentExpression().value,this.setUiNumber(),this.setUiExpression(),this.setState(this.states.writeHistory),this.writeHistory(t),this.setState(this.states.input)}memoryClear(){this.memory.typeAct===this.typesExpression.act&&(this.memory=this.getEmptyItem(),this.setUiMemory(),this.setUiMemoryTable(this.memoryActs.clear,new Array))}memoryRead(){this.memory.typeAct===this.typesExpression.act&&"0"!==this.memory.value&&(this.state===this.states.idle?(this.setState(this.states.input),this.inputValue=this.memory.value,this.setObjExpression(JSON.parse(JSON.stringify(this.memory)),!0)):this.state===this.states.input&&(this.inputValue=this.memory.value,this.setObjExpression(JSON.parse(JSON.stringify(this.memory)))),this.setUiNumber())}memorySave(){if(this.getCurrentExpression().typeAct===this.typesExpression.empty||!this.isInputValueNumber())return;this.memory=JSON.parse(JSON.stringify(this.getCurrentExpression()));let t=new Array;t.push(this.memory),this.setUiMemory(),this.setUiMemoryTable(this.memoryActs.save,t)}memoryPlus(){if(this.getCurrentExpression().typeAct===this.typesExpression.empty||!this.isInputValueNumber())return;let t=new Array,e=JSON.parse(JSON.stringify(this.memory));e.typeAct===this.typesExpression.empty&&(e.typeAct=this.typesExpression.act,e.act=this.acts.signPlus,e.value="0",this.memory=JSON.parse(JSON.stringify(e))),t.push(e),t.push({typeAct:this.typesExpression.act,act:this.acts.plus,value:""}),t.push(this.getCurrentExpression()),this.memoryCalculation(t),this.setUiMemory(),this.setUiMemoryTable(this.memoryActs.plus,t)}memoryMinus(){if(this.getCurrentExpression().typeAct===this.typesExpression.empty||!this.isInputValueNumber())return;let t=new Array,e=JSON.parse(JSON.stringify(this.memory));e.typeAct===this.typesExpression.empty&&(e.typeAct=this.typesExpression.act,e.act=this.acts.signPlus,e.value="0",this.memory=JSON.parse(JSON.stringify(e))),t.push(e),t.push({typeAct:this.typesExpression.act,act:this.acts.minus,value:""}),t.push(this.getCurrentExpression()),this.memoryCalculation(t),this.setUiMemory(),this.setUiMemoryTable(this.memoryActs.plus,t)}increment(){if(this.state===this.states.idle)this.setInputValue(1);else if(this.state===this.states.input){if(this.isCurrentExpressionNumber()){let t=this.getNumberItem(this.getCurrentExpression())+1;this.getCurrentExpression().act=t<0?this.acts.signMinus:this.acts.signPlus,this.getCurrentExpression().value=Math.abs(t).toFixed(this.accuracy),this.inputValue=(this.getCurrentExpression().act===this.acts.signMinus?"-":"")+this.getCurrentExpression().value}else this.getCurrentExpression().act!==this.acts.signPlus&&this.getCurrentExpression().act!==this.acts.signMinus||this.isNumber(this.getCurrentExpression().value)||(this.getCurrentExpression().act=this.acts.signPlus,this.getCurrentExpression().value="1");this.setUiNumber(),this.setUiExpression()}}}(s("number"),s("expression"),s("state"),s("historyTable"),s("currentMemory"),s("memoryTable"),y("Memory","Panel"));g(s("rangeAccuracy").value),b.accuracy=Number(s("rangeAccuracy").value),window.addEventListener("load",(function(){const t="Автономные приложения поддерживаются данным браузером.",e="Автономные приложения не поддерживаются данным браузером.";if(!window.applicationCache)return a(e),s("manageAppCache").classList.add("b-color-monza"),void n(e);a(t),s("manageAppCache").classList.add("b-color-palegreen"),n(t),window.applicationCache.addEventListener("checking",()=>{r("Проверка обновлений.")},!1),window.applicationCache.addEventListener("noupdate",()=>{r("Обновления не найдены.")},!1),window.applicationCache.addEventListener("obsolete",()=>{r("Данные приложения устарели.")},!1),window.applicationCache.addEventListener("cached",()=>{r("Данные помещены в кэш.")},!1),window.applicationCache.addEventListener("updateready",()=>{window.applicationCache.swapCache(),r("Доступна новая версия приложения.")},!1),window.applicationCache.addEventListener("error",t=>{console.log("error",t),"manifest"!==t.reason&&a(t.message),n(t.message)},!1)}),!1),s("logPanel").addEventListener("mouseleave",()=>{l()},!1),window.addEventListener("scroll",()=>{l(),h(),u(),p()},!1),window.addEventListener("resize",()=>{l(),h(),u(),p()},!1),s("appIsWorking").addEventListener("click",()=>{i(s("logPanel"))?l():o(!1)},!1),s("refresh").addEventListener("click",()=>{try{window.applicationCache.update()}catch(t){window.applicationCache.onerror()}},!1),s("status").addEventListener("click",()=>{a(""+c()),n(""+c())},!1),s("rangeAccuracy").addEventListener("change",()=>{g(s("rangeAccuracy").value),b.accuracy=Number(s("rangeAccuracy").value)},!1),s("rangeAccuracy").addEventListener("input",()=>{g(s("rangeAccuracy").value),b.accuracy=Number(s("rangeAccuracy").value)},!1),s("historyPanel").addEventListener("mouseleave",()=>{h()},!1),y("History").addEventListener("click",()=>{i(s("historyPanel"))?h():function(){if(!i(s("historyPanel"))){let t=s("logo").getBoundingClientRect();s("historyPanel").style.left=t.left+10+"px",s("historyPanel").style.top=t.bottom+20+"px",s("historyPanel").style.display="block",s("historyPanel").style.opacity=1}}()},!1),s("body").addEventListener("keypress",t=>{m(t)},!1),s("body").addEventListener("keydown",t=>{m(t)},!1),y("Help").addEventListener("click",()=>{i(s("helpPanel"))?p():function(){if(!i(s("helpPanel"))){let t=s("logo").getBoundingClientRect();s("helpPanel").style.left=t.left+10+"px",s("helpPanel").style.top=t.bottom+20+"px",s("helpPanel").style.display="block",s("helpPanel").style.opacity=1}}()},!1),s("helpPanel").addEventListener("mouseleave",()=>{p()},!1),y("Memory","Clear").addEventListener("click",t=>{b.memoryClear()},!1),y("Memory","Read").addEventListener("click",t=>{b.memoryRead()},!1),y("Memory","Plus").addEventListener("click",t=>{b.memoryPlus()},!1),y("Memory","Minus").addEventListener("click",t=>{b.memoryMinus()},!1),y("Memory","Save").addEventListener("click",t=>{b.memorySave()},!1),y("Memory","Panel").addEventListener("click",t=>{i(s("memoryPanel"))?u():function(){if(!i(s("memoryPanel"))){let t=s("memoryClear").getBoundingClientRect(),e=s("memoryShow").getBoundingClientRect();s("memoryPanel").style.left=t.left+Math.floor((e.left-t.left)/2)+"px",s("memoryPanel").style.top=t.bottom+14+"px",s("memoryPanel").style.display="block",s("memoryPanel").style.opacity=1}}()},!1),s("memoryPanel").addEventListener("mouseleave",()=>{u()},!1),y("ExtOper","Percent").addEventListener("click",t=>{b.unaryOperation(b.acts.percent)},!1),y("ExtOper","Square-root").addEventListener("click",t=>{b.unaryOperation(b.acts.squareRoot)},!1),y("ExtOper","Degree-two").addEventListener("click",t=>{b.unaryOperation(b.acts.degreeTwo)},!1),y("ExtOper","Exponent").addEventListener("click",t=>{b.arithmeticOperation(b.acts.exponent)},!1),y("ExtOper","Hyperbola").addEventListener("click",t=>{b.unaryOperation(b.acts.hyperbola)},!1),y("ExtOper","Increment").addEventListener("click",t=>{b.increment()},!1),y("Digit","One").addEventListener("click",t=>{b.setInputValue(1)},!1),y("Digit","Two").addEventListener("click",t=>{b.setInputValue(2)},!1),y("Digit","Three").addEventListener("click",t=>{b.setInputValue(3)},!1),y("Digit","Four").addEventListener("click",t=>{b.setInputValue(4)},!1),y("Digit","Five").addEventListener("click",t=>{b.setInputValue(5)},!1),y("Digit","Six").addEventListener("click",t=>{b.setInputValue(6)},!1),y("Digit","Seven").addEventListener("click",t=>{b.setInputValue(7)},!1),y("Digit","Eight").addEventListener("click",t=>{b.setInputValue(8)},!1),y("Digit","Nine").addEventListener("click",t=>{b.setInputValue(9)},!1),y("Digit","Zero").addEventListener("click",t=>{b.setInputValue(0)},!1),y("Oper","Sign").addEventListener("click",t=>{b.sign()},!1),y("Digit","Point").addEventListener("click",t=>{b.setInputValue(".")},!1),y("Oper","Division").addEventListener("click",t=>{b.arithmeticOperation(b.acts.devide)},!1),y("Oper","Multiplication").addEventListener("click",t=>{b.arithmeticOperation(b.acts.multiply)},!1),y("Oper","Minus").addEventListener("click",t=>{b.arithmeticOperation(b.acts.minus)},!1),y("Oper","Plus").addEventListener("click",t=>{b.arithmeticOperation(b.acts.plus)},!1),y("Equal").addEventListener("click",t=>{b.countUp()},!1),y("Clear","Essensial").addEventListener("click",t=>{b.clearEssential()},!1),y("Clear","Full").addEventListener("click",t=>{b.clear()},!1),y("Clear","Backspace").addEventListener("click",t=>{b.backspace()},!1)}});