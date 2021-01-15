﻿!function (e, t) {
    "function" === typeof define && define.amd ? define(t) :
        "object" === typeof exports ? module.exports = t() : t();
}(0, function () {
    var o = "details", i = "summary";
    (function () {
        var e = document.createElement(o);
        if (!("open" in e)) return !1;
        e.innerHTML = "<" + i + ">a</" + i + ">b", document.body.appendChild(e);
        var t = e.offsetHeight;
        e.open = !0;
        var n = t !== e.offsetHeight;
        return document.body.removeChild(e), n;
    })() || (document.documentElement.className += " no-details",
        window.addEventListener("click", function (e) {
            if ("summary" === e.target.nodeName.toLowerCase()) {
                var t = e.target.parentNode;
                if (!t) return;
                t.getAttribute("open") ? (t.open = !1, t.removeAttribute("open")) : (t.open = !0, t.setAttribute("open", "open"));
            }
        }),
        function (e, t) {
            if (document.getElementById(e)) return;
            var n = document.createElement("style");
            n.id = e, n.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(n);
        }("details-polyfill-style", "html.no-details " + o + ":not([open]) > :not(" + i + ") { display: none; }\nhtml.no-details " + o + " > " + i + ':before { content: "▶"; display: inline-block; font-size: .8em; width: 1.5em; }\nhtml.no-details ' + o + "[open] > " + i + ':before { content: "▼"; }'));
});