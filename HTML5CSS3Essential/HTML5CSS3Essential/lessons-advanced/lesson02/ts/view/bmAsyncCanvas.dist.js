!function(e){var t={};function i(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t){class i{constructor(){this._canvas=new OffscreenCanvas(300,150)}static get instance(){return i._instance||(i._instance=new i),i._instance}get width(){return this._canvas.width}set width(e){this._canvas.width=e}get height(){return this._canvas.height}set height(e){this._canvas.height=e}get canvas(){return this._canvas}get context(){return this._canvas.getContext("2d")}}let r;i._instance=void 0,function(e){e[e.LeftToRight=1]="LeftToRight",e[e.TopToBottom=2]="TopToBottom",e[e.LeftTopToBottomRight=3]="LeftTopToBottomRight",e[e.RightTopToLeftBottom=4]="RightTopToLeftBottom"}(r||(r={}));class n{constructor(){this._scheme=[]}get list(){return this.getScheme()}Add(e){this._scheme.push(e)}*getScheme(){for(let e=0;e<this._scheme.length;e++)yield this._scheme[e]}}class s{constructor(){this._mapColors=new Map([["Aliceblue","#f0f8ff"],["Antiquewhite","#FAEBD7"],["Aqua","#00FFFF"],["Aquamarine","#7FFFD4"],["Azure","#F0FFFF"],["Beige","#F5F5DC"],["Bisque","#FFE4C4"],["Black","#000000"],["Blanchedalmond","#FFEBCD"],["Blue","#0000ff"],["Blueviolet","#8A2BE2"],["Brown","#A52A2A"],["Burlywood","#DEB887"],["Cadetblue","#5F9EA0"],["Chartreuse","#7FFF00"],["Chocolate","#D2691E"],["Coral","#FF7F50"],["Cornflowerblue","#6495ED"],["Cornsilk","#FFF8DC"],["Crimson","#DC143C"],["Cyan","#00FFFF"],["Darkblue","#00008B"],["Darkcyan","#008B8B"],["Darkgoldenrod","#B8860B"],["Darkgray","#A9A9A9"],["Darkgreen","#006400"],["Darkkhaki","#BDB76B"],["Darkmagenta","#8B008B"],["Darkolivegreen","#556B2F"],["Darkorange","#FF8C00"],["Darkorchid","#9932CC"],["Darkred","#8B0000"],["Darksalmon","#E9967A"],["Darkseagreen","#8FBC8B"],["Darkslateblue","#483D8B"],["Darkslategray","#2F4F4F"],["Darkturquoise","#00CED1"],["Darkviolet","#9400D3"],["Deeppink","#FF1493"],["Deepskyblue","#00BFFF"],["Dimgray","#696969"],["Dodgerblue","#1E90FF"],["Firebrick","#B22222"],["Floralwhite","#FFFAF0"],["Forestgreen","#228B22"],["Fuchsia","#FF00FF"],["Gainsboro","#DCDCDC"],["Ghostwhite","#F8F8FF"],["Gold","#FFD700"],["Goldenrod","#DAA520"],["Gray","#808080"],["Green","#008000"],["Greenyellow","#ADFF2F"],["Honeydew","#F0FFF0"],["Hotpink","#FF69B4"],["Indianred","#CD5C5C"],["Indigo","#4B0082"],["Ivory","#FFFFF0"],["Khaki","#F0E68C"],["Lavender","#E6E6FA"],["Lavenderblush","#FFF0F5"],["Lawngreen","#7CFC00"],["Lemonchiffon","#FFFACD"],["Lightblue","#ADD8E6"],["Lightcoral","#F08080"],["Lightcyan","#E0FFFF"],["Lightgoldenrod","#EEDD82"],["Lightgoldenrodyellow","#FAFAD2"],["Lightgray","#D3D3D3"],["Lightgreen","#90EE90"],["Lightpink","#FFB6C1"],["Lightsalmon","#FFA07A"],["Lightseagreen","#20B2AA"],["Lightskyblue","#87CEFA"],["Lightslateblue","#8470FF"],["Lightslategray","#778899"],["Lightsteelblue","#B0C4DE"],["Lightyellow","#FFFFE0"],["Lime","#00FF00"],["Limegreen","#32CD32"],["Linen","#FAF0E6"],["Magenta","#FF00FF"],["Maroon","#800000"],["Mediumaquamarine","#66CDAA"],["Mediumblue","#0000CD"],["Mediumorchid","#BA55D3"],["Mediumpurple","#9370DB"],["Mediumseagreen","#3CB371"],["Mediumslateblue","#7B68EE"],["Mediumspringgreen","#00FA9A"],["Mediumturquoise","#48D1CC"],["Mediumvioletred","#C71585"],["Midnightblue","#191970"],["Mintcream","#F5FFFA"],["Mistyrose","#FFE4E1"],["Moccasin","#FFE4B5"],["Navajowhite","#FFDEAD"],["Navy","#000080"],["Navyblue","#A0B0E0"],["Oldlace","#FDF5E6"],["Olive","#808000"],["Olivedrab","#6B8E23"],["Orange","#FFA500"],["Orangered","#FF4500"],["Orchid","#DA70D6"],["Palegoldenrod","#EEE8AA"],["Palegreen","#98FB98"],["Paleturquoise","#AFEEEE"],["Palevioletred","#DB7093"],["Papayawhip","#FFEFD5"],["Peachpuff","#FFDAB9"],["Peru","#CD853F"],["Pink","#FFC0CB"],["Plum","#DDA0DD"],["Powderblue","#B0E0E6"],["Purple","#800080"],["Red","#FF0000"],["Rosybrown","#BC8F8F"],["Royalblue","#4169E1"],["Saddlebrown","#8B4513"],["Salmon","#FA8072"],["Sandybrown","#F4A460"],["Seagreen","#2E8B57"],["Seashell","#FFF5EE"],["Sienna","#A0522D"],["Silver","#C0C0C0"],["Skyblue","#87CEEB"],["Slateblue","#6A5ACD"],["Slategray","#708090"],["Snow","#FFFAFA"],["Springgreen","#00FF7F"],["Steelblue","#4682B4"],["Tan","#D2B48C"],["Teal","#008080"],["Thistle","#D8BFD8"],["Tomato","#FF6347"],["Turquoise","#40E0D0"],["Violet","#EE82EE"],["Violetred","#D02090"],["Wheat","#F5DEB3"],["White","#FFFFFF"],["Whitesmoke","#F5F5F5"],["Yellow","#FFFF00"],["Yellowgreen","#9ACD32"]]),this._minLayersGradient=3,this._maxLayersGradient=10}static get instance(){return s._instance||(this._instance=new s),this._instance}get randomColor(){let e,t=this.RandomInt(1,this._mapColors.size),i=0;for(let r of this._mapColors.keys())if(i++,i===t){e=this._mapColors.get(r);break}return e}get minLayersGradient(){return this._minLayersGradient}set minLayersGradient(e){this._minLayersGradient=e}get maxLayersGradient(){return this._maxLayersGradient}set maxLayersGradient(e){this._maxLayersGradient=e}FillLineGradient(e,t){let i;i=this.GetLinerGradient(t,e,0,0,e.canvas.width,e.canvas.height),this.GetLinerGradientColorScheme(i),e.fillStyle=i,e.fillRect(0,0,e.canvas.width,e.canvas.height)}GetFillBoxLineGradient(e,t,i,r,n){let s;return n.direction=this.RandomInt(1,4),s=this.GetLinerGradient(n.direction,e,t,i,r,r),n.colorScheme=this.GetLinerGradientColorScheme(s),s}RestoreFillBoxLineGradient(e,t,i,r,n){let s;s=this.GetLinerGradient(n.direction,e,t,i,r,r);for(let e of n.colorScheme._scheme)s.addColorStop(e[0],e[1]);return s}RandomInt(e,t){return Math.floor(Math.random()*(t-e+1))+e}GetLinerGradient(e,t,i,n,s,a){return e===r.LeftToRight?t.createLinearGradient(i,n,i,n+a):e===r.TopToBottom?t.createLinearGradient(i,n,i+s,n):e===r.LeftTopToBottomRight?t.createLinearGradient(i,n,i+a,n+s):e===r.RightTopToLeftBottom?t.createLinearGradient(i,n+s,i+a,0):t.createLinearGradient(i,n,i,n+a)}GetLinerGradientColorScheme(e){let t,i,r=new n,s=this.RandomInt(this.minLayersGradient,this.maxLayersGradient);for(let n=0;n<s;n++)t=n/s,i=this.randomColor,r.Add([t,i]),e.addColorStop(t,i);return t=1,i=this.randomColor,r.Add([t,i]),e.addColorStop(t,i),r}}s._instance=void 0;class a{constructor(){this._canvas,this._context,this._bufferCanvas,this._bufferContext,this._item,this._nameSquare=1,this._nameCircle=2}static get instance(){return a._instance||(a._instance=new a),a._instance}get item(){return this._item}set item(e){this._item=e}get canvas(){return this._canvas}set canvas(e){this._canvas=e}get context(){return this._context}set context(e){this._context=e}get bufferCanvas(){return this._bufferCanvas}set bufferCanvas(e){this._bufferCanvas=e}get bufferContext(){return this._bufferContext}set bufferContext(e){this._bufferContext=e}get nameSquare(){return this._nameSquare}get nameCircle(){return this._nameCircle}Draw(){let e=this.item._kind[1];e===this.nameCircle?this.DrawCircle():e===this.nameSquare&&this.DrawSquare()}DrawSquare(){2!==this.item._fillType[1]||this.item._isGradientDefined||(this.item._gradientBorder=s.instance.GetFillBoxLineGradient(this.bufferContext,this.item._x,this.item._y,this.item._size,this.item._gradientPropertiesBorder),this.item._gradientInside=s.instance.GetFillBoxLineGradient(this.bufferContext,this.item._x+this.item._borderWidth,this.item._y+this.item._borderWidth,this.item._size-2*this.item._borderWidth,this.item._gradientPropertiesInside),this.item._isGradientDefined=!0),this.bufferContext.beginPath(),this.bufferContext.rect(this.item._x,this.item._y,this.item._size,this.item._size),1===this.item._fillType[1]?this.bufferContext.fillStyle=this.item._colorBorder:2!==this.item._fillType[1]&&3!==this.item._fillType[1]||(3===this.item._fillType[1]&&(this.item._gradientBorder=s.instance.RestoreFillBoxLineGradient(this.bufferContext,this.item._x,this.item._y,this.item._size,this.item._gradientPropertiesBorder)),this.bufferContext.fillStyle=this.item._gradientBorder),this.bufferContext.fill(),this.bufferContext.beginPath(),this.bufferContext.rect(this.item._x+this.item._borderWidth,this.item._y+this.item._borderWidth,this.item._size-2*this.item._borderWidth,this.item._size-2*this.item._borderWidth),1===this.item._fillType[1]?this.bufferContext.fillStyle=this.item._colorInside:2!==this.item._fillType[1]&&3!==this.item._fillType[1]||(3===this.item._fillType[1]&&(this.item._gradientInside=s.instance.RestoreFillBoxLineGradient(this.bufferContext,this.item._x+this.item._borderWidth,this.item._y+this.item._borderWidth,this.item._size-2*this.item._borderWidth,this.item._gradientPropertiesInside)),this.bufferContext.fillStyle=this.item._gradientInside),this.bufferContext.fill()}DrawCircle(){2!==this.item._fillType[1]||this.item._isGradientDefined||(this.item._gradientBorder=s.instance.GetFillBoxLineGradient(this.bufferContext,this.item._x,this.item._y,this.item._size,this.item._gradientPropertiesBorder),this.item._gradientInside=s.instance.GetFillBoxLineGradient(this.bufferContext,this.item._x+this.item._borderWidth,this.item._y+this.item._borderWidth,this.item._size-2*this.item._borderWidth,this.item._gradientPropertiesInside),this.item._isGradientDefined=!0),this.bufferContext.beginPath();let e=this.item._size/2,t=2*Math.PI;this.bufferContext.arc(this.item._x+e,this.item._y+e,e,0,t,!1),1===this.item._fillType[1]?this.bufferContext.fillStyle=this.item._colorBorder:2!==this.item._fillType[1]&&3!==this.item._fillType[1]||(3===this.item._fillType[1]&&(this.item._gradientBorder=s.instance.RestoreFillBoxLineGradient(this.bufferContext,this.item._x,this.item._y,this.item._size,this.item._gradientPropertiesBorder)),this.bufferContext.fillStyle=this.item._gradientBorder),this.bufferContext.fill(),this.bufferContext.beginPath(),this.bufferContext.arc(this.item._x+e,this.item._y+e,e-this.item._borderWidth,0,t,!1),1===this.item._fillType[1]?this.bufferContext.fillStyle=this.item._colorInside:2!==this.item._fillType[1]&&3!==this.item._fillType[1]||(3===this.item._fillType[1]&&(this.item._gradientInside=s.instance.RestoreFillBoxLineGradient(this.bufferContext,this.item._x+this.item._borderWidth,this.item._y+this.item._borderWidth,this.item._size-2*this.item._borderWidth,this.item._gradientPropertiesInside)),this.bufferContext.fillStyle=this.item._gradientInside),this.bufferContext.fill()}}a._instance=void 0,onmessage=function({data:{command:e,figures:t,offScreenCanvas:i,offCanvasBuffer:r,item:n,width:s,height:o}}){if(void 0!==i&&(a.instance.canvas=i,a.instance.context=a.instance.canvas.getContext("2d")),void 0!==r&&(a.instance.bufferCanvas=r,a.instance.bufferContext=a.instance.bufferCanvas.getContext("2d")),void 0!==s&&void 0!==o&&(a.instance.canvas.width=s,a.instance.canvas.height=o,a.instance.bufferCanvas.width=s,a.instance.bufferCanvas.height=o),void 0!==t){a.instance.bufferContext.clearRect(0,0,a.instance.bufferCanvas.width,a.instance.bufferCanvas.height);for(let e of t)a.instance.item=e,a.instance.Draw();if(a.instance.context.clearRect(0,0,a.instance.canvas.width,a.instance.canvas.height),a.instance.context.drawImage(a.instance.bufferCanvas,0,0),void 0!==a.instance.canvas){postMessage({step:"ItWasAnimated"})}}}}]);