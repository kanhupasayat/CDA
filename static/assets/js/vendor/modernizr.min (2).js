! function(s, f, c) {
    function h(e, t) {
        return typeof e === t
    }

    function a(e) {
        var t, n = d.className,
            o = i._config.classPrefix || "";
        B && (n = n.baseVal), i._config.enableJSClass && (t = new RegExp("(^|\\s)" + o + "no-js(\\s|$)"), n = n.replace(t, "$1" + o + "js$2")), i._config.enableClasses && (n += " " + o + e.join(" " + o), B ? d.className.baseVal = n : d.className = n)
    }

    function l(e, t) {
        if ("object" == typeof e)
            for (var n in e) y(e, n) && l(n, e[n]);
        else {
            var o = (e = e.toLowerCase()).split("."),
                r = i[o[0]];
            if (void 0 !== (r = 2 == o.length ? r[o[1]] : r)) return i;
            t = "function" == typeof t ? t() : t, 1 == o.length ? i[o[0]] = t : (!i[o[0]] || i[o[0]] instanceof Boolean || (i[o[0]] = new Boolean(i[o[0]])), i[o[0]][o[1]] = t), a([(t && 0 != t ? "" : "no-") + o.join("-")]), i._trigger(e, t)
        }
        return i
    }

    function p(e) {
        return "function" != typeof f.createElement ? f.createElement(e) : B ? f.createElementNS.call(f, "http://www.w3.org/2000/svg", e) : f.createElement.apply(f, arguments)
    }

    function r(e, t, n, o) {
        var r, s, i, a, l = "modernizr",
            u = p("div");
        (a = f.body) || ((a = p(B ? "svg" : "body")).fake = !0);
        if (parseInt(n, 10))
            for (; n--;)(s = p("div")).id = o ? o[n] : l + (n + 1), u.appendChild(s);
        return (r = p("style")).type = "text/css", r.id = "s" + l, (a.fake ? a : u).appendChild(r), a.appendChild(u), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(f.createTextNode(e)), u.id = l, a.fake && (a.style.background = "", a.style.overflow = "hidden", i = d.style.overflow, d.style.overflow = "hidden", d.appendChild(a)), r = t(u, e), a.fake ? (a.parentNode.removeChild(a), d.style.overflow = i, d.offsetHeight) : u.parentNode.removeChild(u), !!r
    }

    function u(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }

    function A(e, t) {
        var n = e.length;
        if ("CSS" in s && "supports" in s.CSS) {
            for (; n--;)
                if (s.CSS.supports(u(e[n]), t)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in s) {
            for (var o = []; n--;) o.push("(" + u(e[n]) + ":" + t + ")");
            return r("@supports (" + (o = o.join(" or ")) + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == (e = e, t = null, n = "position", "getComputedStyle" in s ? (o = getComputedStyle.call(s, e, t), r = s.console, null !== o ? n && (o = o.getPropertyValue(n)) : r && r[r.error ? "error" : "log"].call(r, "getComputedStyle returning null, its possible modernizr test results are inaccurate")) : o = !t && e.currentStyle && e.currentStyle[n], o);
                var t, n, o, r
            })
        }
        return c
    }

    function g(e, t, n, o) {
        function r() {
            i && (delete m.style, delete m.modElem)
        }
        if (o = void 0 !== o && o, void 0 !== n) {
            var s = A(e, n);
            if (void 0 !== s) return s
        }
        for (var i, a, l, u, f, d = ["modernizr", "tspan", "samp"]; !m.style && d.length;) i = !0, m.modElem = p(d.shift()), m.style = m.modElem.style;
        for (l = e.length, a = 0; a < l; a++)
            if (u = e[a], f = m.style[u], ~("" + u).indexOf("-") && (u = u.replace(/([a-z])-([a-z])/g, function(e, t, n) {
                    return t + n.toUpperCase()
                }).replace(/^-/, "")), m.style[u] !== c) {
                if (o || void 0 === n) return r(), "pfx" != t || u;
                try {
                    m.style[u] = n
                } catch (e) {}
                if (m.style[u] != f) return r(), "pfx" != t || u
            }
        return r(), !1
    }

    function o(e, t, n, f, d) {
        var o, r, s = e.charAt(0).toUpperCase() + e.slice(1),
            i = (e + " " + j.join(s + " ") + s).split(" ");
        if (h(t, "string") || void 0 === t) return g(i, t, f, d);
        var a = i = (e + " " + O.join(s + " ") + s).split(" "),
            l = t,
            u = n;
        for (r in a)
            if (a[r] in l)
                if (!1 === u) return a[r];
                else {
                    o = l[a[r]];
                    if (h(o, "function")) {
                        var c = o;
                        var p = u || l;
                        return function() {
                            return c.apply(p, arguments)
                        };
                        return
                    } else return o
                }
        return !1
    }

    function v(e, t, n) {
        return o(e, c, c, t, n)
    }
    var y, C, b, w, S, e, x, _, T, t, E, P = [],
        n = {
            _version: "3.6.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, t) {
                var n = this;
                setTimeout(function() {
                    t(n[e])
                }, 0)
            },
            addTest: function(e, t, n) {
                P.push({
                    name: e,
                    fn: t,
                    options: n
                })
            },
            addAsyncTest: function(e) {
                P.push({
                    name: null,
                    fn: e
                })
            }
        },
        i = function() {},
        k = (i.prototype = n, i = new i, []),
        d = f.documentElement,
        B = "svg" === d.nodeName.toLowerCase(),
        z = "Moz O ms Webkit",
        O = n._config.usePrefixes ? z.toLowerCase().split(" ") : [],
        L = (n._domPrefixes = O, n._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""]),
        N = (n._prefixes = L, y = void 0 === (C = {}.hasOwnProperty) || void 0 === C.call ? function(e, t) {
            return t in e && void 0 === e.constructor.prototype[t]
        } : function(e, t) {
            return C.call(e, t)
        }, n._l = {}, n.on = function(e, t) {
            this._l[e] || (this._l[e] = []), this._l[e].push(t), i.hasOwnProperty(e) && setTimeout(function() {
                i._trigger(e, i[e])
            }, 0)
        }, n._trigger = function(e, t) {
            var n;
            this._l[e] && (n = this._l[e], setTimeout(function() {
                for (var e = 0; e < n.length; e++)(0, n[e])(t)
            }, 0), delete this._l[e])
        }, i._q.push(function() {
            n.addTest = l
        }), b = !("onblur" in f.documentElement), function(e, t) {
            var n;
            return !!e && (!(n = (e = "on" + e) in (t = !t || "string" == typeof t ? p(t || "div") : t)) && b && ((t = !t.setAttribute ? p("div") : t).setAttribute(e, ""), n = "function" == typeof t[e], t[e] !== c && (t[e] = c), t.removeAttribute(e)), n)
        }),
        L = (n.hasEvent = N, (w = s.matchMedia || s.msMatchMedia) ? function(e) {
            e = w(e);
            return e && e.matches || !1
        } : function(e) {
            var t = !1;
            return r("@media " + e + " { #modernizr { position: absolute; } }", function(e) {
                t = "absolute" == (s.getComputedStyle ? s.getComputedStyle(e, null) : e.currentStyle).position
            }), t
        }),
        j = (n.mq = L, n.prefixedCSSValue = function(e, t) {
            var n = !1,
                o = p("div").style;
            if (e in o) {
                var r = O.length;
                for (o[e] = t, n = o[e]; r-- && !n;) o[e] = "-" + O[r] + "-" + t, n = o[e]
            }
            return n = "" === n ? !1 : n
        }, n._config.usePrefixes ? z.split(" ") : []),
        R = (n._cssomPrefixes = j, {
            elem: p("modernizr")
        }),
        m = (i._q.push(function() {
            delete R.elem
        }), {
            style: R.elem.style
        }),
        L = (i._q.unshift(function() {
            delete m.style
        }), n.testAllProps = o, n.testAllProps = v, n.testProp = function(e, t, n) {
            return g([e], c, t, n)
        }, n.testStyles = r, i.addTest("customelements", "customElements" in s), i.addTest("history", function() {
            var e = navigator.userAgent;
            return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone") || "file:" === location.protocol) && (s.history && "pushState" in s.history)
        }), i.addTest("pointerevents", function() {
            for (var e = !1, t = O.length, e = i.hasEvent("pointerdown"); t-- && !e;) N(O[t] + "pointerdown") && (e = !0);
            return e
        }), i.addTest("postmessage", "postMessage" in s), i.addTest("webgl", function() {
            var e = p("canvas"),
                t = "probablySupportsContext" in e ? "probablySupportsContext" : "supportsContext";
            return t in e ? e[t]("webgl") || e[t]("experimental-webgl") : "WebGLRenderingContext" in s
        }), !1);
    try {
        L = "WebSocket" in s && 2 === s.WebSocket.CLOSING
    } catch (e) {}
    i.addTest("websockets", L), i.addTest("cssanimations", v("animationName", "a", !0)), i.addTest("csscolumns", function() {
        var e = !1,
            t = v("columnCount");
        try {
            e = (e = !!t) && new Boolean(e)
        } catch (e) {}
        return e
    });
    for (var M, W, q = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], G = 0; G < q.length; G++) M = q[G].toLowerCase(), W = v("column" + q[G]), "breakbefore" !== M && "breakafter" !== M && "breakinside" != M || (W = W || v(q[G])), i.addTest("csscolumns." + M, W);
    for (E in i.addTest("flexbox", v("flexBasis", "1px", !0)), i.addTest("picture", "HTMLPictureElement" in s), i.addAsyncTest(function() {
            var e, t, n = p("img"),
                o = "sizes" in n;
            !o && "srcset" in n ? (e = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", n.onload = t = function() {
                l("sizes", 2 == n.width)
            }, n.onerror = t, n.setAttribute("sizes", "9px"), n.srcset = e + " 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 8w", n.src = e) : l("sizes", o)
        }), i.addTest("srcset", "srcset" in p("img")), i.addTest("webworkers", "Worker" in s), P)
        if (P.hasOwnProperty(E)) {
            if (S = [], (e = P[E]).name && (S.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length))
                for (x = 0; x < e.options.aliases.length; x++) S.push(e.options.aliases[x].toLowerCase());
            for (_ = h(e.fn, "function") ? e.fn() : e.fn, T = 0; T < S.length; T++) 1 === (t = S[T].split(".")).length ? i[t[0]] = _ : (!i[t[0]] || i[t[0]] instanceof Boolean || (i[t[0]] = new Boolean(i[t[0]])), i[t[0]][t[1]] = _), k.push((_ ? "" : "no-") + t.join("-"))
        }
    a(k), delete n.addTest, delete n.addAsyncTest;
    for (var I = 0; I < i._q.length; I++) i._q[I]();
    s.Modernizr = i
}(window, document);